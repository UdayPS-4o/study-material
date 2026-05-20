# 124 — Promise.any · Array.reduce · Lodash Flatten · Auto-Retry

---

## 1. Implement `Promise.any` Polyfill

### What is `Promise.any`?

Returns a promise that **resolves as soon as ANY** input promise resolves.  
Only rejects if **ALL** promises reject, with an `AggregateError`.

```
[reject, reject, resolve] → resolves with 3rd value
[reject, reject, reject]  → rejects with AggregateError(['e1','e2','e3'])
```

### Polyfill

```js
function myPromiseAny(promises) {
  return new Promise((resolve, reject) => {
    const promisesArray = [...promises];
    const total = promisesArray.length;

    // Edge case: empty iterable → immediately reject
    if (total === 0) {
      return reject(new AggregateError([], 'All promises were rejected'));
    }

    const errors = [];
    let rejectedCount = 0;

    promisesArray.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          resolve(value);                 // first resolve wins
        })
        .catch((reason) => {
          errors[index] = reason;         // preserve error order
          rejectedCount++;

          if (rejectedCount === total) {  // all rejected
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}
```

### Testing

```js
// Test 1: First to resolve wins
myPromiseAny([
  Promise.reject('fail1'),
  Promise.resolve('success'),
  Promise.reject('fail2'),
]).then(console.log);  // "success"

// Test 2: All reject
myPromiseAny([
  Promise.reject('e1'),
  Promise.reject('e2'),
]).catch(err => {
  console.log(err instanceof AggregateError); // true
  console.log(err.errors);                    // ['e1', 'e2']
});

// Test 3: Empty
myPromiseAny([]).catch(console.error);  // AggregateError: All promises were rejected
```

### Comparison Table

| Method | Resolves when | Rejects when |
|---|---|---|
| `Promise.all` | ALL resolve | ANY rejects |
| `Promise.any` | ANY resolves | ALL reject |
| `Promise.race` | FIRST settles | FIRST settles (if reject) |
| `Promise.allSettled` | ALL settle | Never |

---

## 2. Implement `Array.prototype.reduce` Polyfill

### How `reduce` works

```js
[1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => {
  return accumulator + currentValue;
}, initialValue);
```

- Iterates through each element
- Passes accumulated result + current element to callback
- If no `initialValue`, uses `arr[0]` as start, begins from index 1

### Polyfill

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const arr = this;
  const len = arr.length;

  let accumulator;
  let startIndex;

  if (arguments.length >= 2) {
    // initialValue provided
    accumulator = initialValue;
    startIndex = 0;
  } else {
    // No initialValue: find first non-empty element
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    accumulator = arr[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < len; i++) {
    // skip holes in sparse arrays
    if (i in arr) {
      accumulator = callback(accumulator, arr[i], i, arr);
    }
  }

  return accumulator;
};
```

### Testing

```js
// Sum
[1, 2, 3, 4].myReduce((acc, cur) => acc + cur, 0);  // 10

// Flatten array with reduce
[[1, 2], [3, 4], [5]].myReduce((acc, cur) => acc.concat(cur), []);  // [1,2,3,4,5]

// Count occurrences
['a', 'b', 'a', 'c', 'b', 'a'].myReduce((acc, cur) => {
  acc[cur] = (acc[cur] || 0) + 1;
  return acc;
}, {});  // { a: 3, b: 2, c: 1 }

// No initial value
[1, 2, 3].myReduce((acc, cur) => acc + cur);  // 6

// Edge: empty array, no initial value → throws
[].myReduce((acc, cur) => acc + cur);  // TypeError
```

### Common Interview Follow-ups

```js
// Implement map using reduce
Array.prototype.myMap = function(cb) {
  return this.reduce((acc, val, i) => {
    acc.push(cb(val, i, this));
    return acc;
  }, []);
};

// Implement filter using reduce
Array.prototype.myFilter = function(cb) {
  return this.reduce((acc, val, i) => {
    if (cb(val, i, this)) acc.push(val);
    return acc;
  }, []);
};
```

---

## 3. Implement Lodash's `flatten` Method

### Three Variants

| Method | Depth |
|---|---|
| `_.flatten(arr)` | 1 level deep |
| `_.flattenDeep(arr)` | Fully recursive (infinite) |
| `_.flattenDepth(arr, n)` | N levels deep |

### flatten (1 level)

```js
function flatten(arr) {
  return arr.reduce((acc, val) => acc.concat(val), []);
}

flatten([1, [2, [3, [4]]]])  // [1, 2, [3, [4]]]
```

### flattenDeep (infinite depth)

```js
function flattenDeep(arr) {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenDeep(val));  // recurse
    }
    return acc.concat(val);
  }, []);
}

flattenDeep([1, [2, [3, [4, [5]]]]]);  // [1, 2, 3, 4, 5]

// Alternative using flat()
[1, [2, [3, [4]]]].flat(Infinity);    // [1, 2, 3, 4]
```

### flattenDepth (n levels)

```js
function flattenDepth(arr, depth = 1) {
  if (depth <= 0) return arr.slice();  // return copy, no flatten

  return arr.reduce((acc, val) => {
    if (Array.isArray(val)) {
      return acc.concat(flattenDepth(val, depth - 1)); // decrement depth
    }
    return acc.concat(val);
  }, []);
}

flattenDepth([1, [2, [3, [4]]]], 1);  // [1, 2, [3, [4]]]
flattenDepth([1, [2, [3, [4]]]], 2);  // [1, 2, 3, [4]]
flattenDepth([1, [2, [3, [4]]]], 3);  // [1, 2, 3, 4]
```

---

## 4. Implement Auto-Retry for Promises

### The Problem

Network requests fail. We want to retry them automatically N times before giving up.

```
fetch('/api/data') → fails → retry 1 → fails → retry 2 → success ✅
```

### Basic Implementation

```js
function promiseWithRetry(promiseFn, retries = 3, delay = 0) {
  return new Promise((resolve, reject) => {
    function attempt(remainingRetries) {
      promiseFn()
        .then(resolve)
        .catch((err) => {
          console.log(`Failed. Retries left: ${remainingRetries}`);

          if (remainingRetries <= 0) {
            return reject(err);  // out of retries
          }

          if (delay > 0) {
            setTimeout(() => attempt(remainingRetries - 1), delay);
          } else {
            attempt(remainingRetries - 1);
          }
        });
    }

    attempt(retries);
  });
}
```

### With Exponential Backoff

```js
function retryWithBackoff(promiseFn, retries = 3, baseDelay = 1000) {
  return new Promise((resolve, reject) => {
    function attempt(retriesLeft, currentDelay) {
      promiseFn()
        .then(resolve)
        .catch((err) => {
          if (retriesLeft <= 0) {
            return reject(err);
          }

          console.log(`Retrying in ${currentDelay}ms... (${retriesLeft} left)`);

          setTimeout(() => {
            attempt(retriesLeft - 1, currentDelay * 2); // double delay each time
          }, currentDelay);
        });
    }

    attempt(retries, baseDelay);
  });
}
```

### With async/await (Cleaner)

```js
async function retryAsync(promiseFn, retries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await promiseFn();
      return result;
    } catch (err) {
      console.log(`Attempt ${attempt} failed: ${err.message}`);

      if (attempt === retries) {
        throw err;  // final attempt failed
      }

      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
}
```

### Testing

```js
// Simulate a flaky API (succeeds on 3rd try)
let callCount = 0;
const flakyApi = () => new Promise((resolve, reject) => {
  callCount++;
  if (callCount < 3) {
    reject(new Error(`Call ${callCount} failed`));
  } else {
    resolve(`Success on call ${callCount}`);
  }
});

retryAsync(flakyApi, 5, 100)
  .then(console.log)  // "Success on call 3"
  .catch(console.error);
```

### Interview Tip: Retry + Abort

```js
// Cancel retrying after a timeout
async function retryWithTimeout(promiseFn, retries, delay, timeoutMs) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
  );

  const retryPromise = retryAsync(promiseFn, retries, delay);

  return Promise.race([retryPromise, timeoutPromise]);
}
```
