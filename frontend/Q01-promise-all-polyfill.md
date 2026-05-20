# Q1 — Implement `Promise.all` Polyfill

## What is `Promise.all`?

`Promise.all` takes an **iterable of promises** and returns a **single promise** that:
- **Resolves** when **all** input promises resolve → value is an array of results in order
- **Rejects** as soon as **any** promise rejects → with that rejection reason

```js
Promise.all([p1, p2, p3]).then(([r1, r2, r3]) => console.log(r1, r2, r3));
```

---

## Key Behaviours to Implement

| Behaviour | Detail |
|---|---|
| Empty array | Resolves immediately with `[]` |
| Non-promise values | Wraps them in `Promise.resolve()` |
| Order preserved | Even if promises settle out of order |
| First rejection | Immediately rejects the outer promise |

---

## 🔍 What is `Symbol.iterator`?

`Symbol.iterator` is a well-known **built-in Symbol** in JavaScript that defines the **default iteration behaviour** of an object.

Any object that has a `[Symbol.iterator]()` method is called an **iterable**.

### How it works

```js
// An iterable must implement [Symbol.iterator]()
// which returns an Iterator object with a .next() method

const myIterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next() {
        count++;
        if (count <= 3) {
          return { value: count, done: false };
        }
        return { value: undefined, done: true };
      }
    };
  }
};

for (const val of myIterable) {
  console.log(val); // 1, 2, 3
}

console.log([...myIterable]); // [1, 2, 3]
```

### Built-in iterables in JS

| Type | Has `Symbol.iterator`? |
|---|---|
| `Array` | ✅ Yes |
| `String` | ✅ Yes |
| `Map` | ✅ Yes |
| `Set` | ✅ Yes |
| `NodeList` | ✅ Yes |
| `arguments` | ✅ Yes |
| Plain `{}` object | ❌ No (by default) |

### Why we check it in the polyfill

```js
// This line in the polyfill:
if (!promises[Symbol.iterator]) {
  return reject(new TypeError('Argument must be iterable'));
}
```

We check if the argument has a `[Symbol.iterator]` method, meaning it can be iterated with `for...of` or spread `[...]`.  
Passing a number or plain object would fail this check and we reject early with a clear error.

```js
myPromiseAll(42);         // ❌ TypeError: Argument must be iterable
myPromiseAll({a: 1});     // ❌ TypeError (plain objects aren't iterable)
myPromiseAll([p1, p2]);   // ✅ Array is iterable
myPromiseAll(new Set([p1, p2])); // ✅ Set is iterable
```

### The spread trick

```js
const promisesArray = [...promises]; // works on ANY iterable!
```

The spread operator (`...`) internally calls `promises[Symbol.iterator]()` to walk through the values.  
This is why our polyfill works with **arrays, Sets, Maps, generators** — any iterable.

```js
// All of these work:
myPromiseAll([p1, p2, p3]);                    // Array
myPromiseAll(new Set([p1, p2]));               // Set
myPromiseAll((function*() { yield p1; yield p2; })()); // Generator
```

---

## Polyfill Implementation

```js
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    // Handle non-iterable input
    if (!promises[Symbol.iterator]) {
      return reject(new TypeError('Argument must be iterable'));
    }

    const results = [];
    let resolvedCount = 0;
    const promisesArray = [...promises]; // convert iterable to array
    const total = promisesArray.length;

    // Edge case: empty array
    if (total === 0) {
      return resolve([]);
    }

    promisesArray.forEach((promise, index) => {
      // Wrap in Promise.resolve to handle non-promise values
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;       // preserve order
          resolvedCount++;

          if (resolvedCount === total) {
            resolve(results);           // all done
          }
        })
        .catch((reason) => {
          reject(reason);               // fail fast on first rejection
        });
    });
  });
}
```

---

## Step-by-Step Walkthrough

```
Input: [p1, p2, p3]  (all resolve)

  p1 resolves → results[0] = val1, count = 1
  p3 resolves → results[2] = val3, count = 2   (out of order, still correct index)
  p2 resolves → results[1] = val2, count = 3

  count === total → resolve([val1, val2, val3])  ✅
```

```
Input: [p1, p2, p3]  (p2 rejects)

  p1 resolves → results[0] = val1, count = 1
  p2 rejects  → reject(reason)  ✅ immediately
  p3 resolves → ignored (already rejected)
```

---

## Testing the Polyfill

```js
// Test 1: All resolve
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = new Promise(resolve => setTimeout(() => resolve(3), 100));

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]

// Test 2: One rejects
const p4 = Promise.reject('Error!');
myPromiseAll([p1, p4, p3]).catch(console.error); // "Error!"

// Test 3: Empty array
myPromiseAll([]).then(console.log); // []

// Test 4: Non-promise values
myPromiseAll([1, 'hello', true]).then(console.log); // [1, 'hello', true]

// Test 5: Mixed
myPromiseAll([Promise.resolve(42), 'literal', Promise.resolve('done')])
  .then(console.log); // [42, 'literal', 'done']
```

---

## Common Mistakes

```js
// ❌ WRONG — using a simple counter without tracking index
let count = 0;
promises.forEach((p) => {
  Promise.resolve(p).then((val) => {
    results.push(val);  // ORDER NOT PRESERVED!
    if (++count === total) resolve(results);
  });
});

// ✅ CORRECT — always use results[index] = value
results[index] = value;
```

---

## Difference: `Promise.all` vs `Promise.allSettled`

| Feature | `Promise.all` | `Promise.allSettled` |
|---|---|---|
| Fails on rejection? | Yes (fast-fail) | No, waits for all |
| Result shape | Array of values | Array of `{status, value/reason}` |
| Use case | All must succeed | Want all results regardless |

```js
// Promise.allSettled polyfill (bonus)
function myPromiseAllSettled(promises) {
  return myPromiseAll(
    [...promises].map(p =>
      Promise.resolve(p)
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
    )
  );
}
```

---

## Interview Tips

- Mention **order preservation** — this is a key detail interviewers look for
- Discuss the **fail-fast** behaviour and why it can be useful
- Contrast with `Promise.allSettled` and `Promise.race`
- The polyfill reveals your understanding of the **Promise constructor** and closures
