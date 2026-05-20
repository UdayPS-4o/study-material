# 126 — Execute N Async Tasks in Series · Tricky JS Output Predictions

---

## 1. Execute N Callback-Based Async Tasks in Series

### Problem Statement

Given an array of async functions (node-style callbacks: `fn(callback)`), execute them **one after another**, not in parallel.

```js
// Each task looks like this:
const task = (callback) => {
  setTimeout(() => callback(null, 'result'), 1000);
};
```

### Implementation — Recursive

```js
function runInSeries(tasks, finalCallback) {
  const results = [];

  function runNext(index) {
    if (index >= tasks.length) {
      return finalCallback(null, results); // all done
    }

    tasks[index]((err, result) => {
      if (err) {
        return finalCallback(err);  // stop on first error
      }
      results.push(result);
      runNext(index + 1);           // run next task
    });
  }

  runNext(0);
}
```

### Implementation — Iterative with reduce

```js
function runInSeries(tasks, finalCallback) {
  const results = [];

  tasks.reduce((promiseChain, task) => {
    return promiseChain.then(() => {
      return new Promise((resolve, reject) => {
        task((err, result) => {
          if (err) return reject(err);
          results.push(result);
          resolve();
        });
      });
    });
  }, Promise.resolve())
    .then(() => finalCallback(null, results))
    .catch(err => finalCallback(err));
}
```

### Implementation — async/await

```js
async function runInSeries(tasks) {
  const results = [];

  for (const task of tasks) {
    const result = await new Promise((resolve, reject) => {
      task((err, val) => {
        if (err) reject(err);
        else resolve(val);
      });
    });
    results.push(result);
  }

  return results;
}
```

### Testing

```js
const tasks = [
  (cb) => setTimeout(() => { console.log('Task 1'); cb(null, 'A'); }, 1000),
  (cb) => setTimeout(() => { console.log('Task 2'); cb(null, 'B'); }, 500),
  (cb) => setTimeout(() => { console.log('Task 3'); cb(null, 'C'); }, 800),
];

runInSeries(tasks, (err, results) => {
  if (err) return console.error('Error:', err);
  console.log('Results:', results); // ['A', 'B', 'C'] after 2.3s total
});

// Output order: Task 1 → Task 2 → Task 3 (sequential, NOT parallel)
```

### Series vs Parallel Comparison

```js
// PARALLEL (all at once) — 1000ms total
Promise.all([task1(), task2(), task3()]);

// SERIES (one at a time) — 1000 + 500 + 800 = 2300ms total
await runInSeries([task1, task2, task3]);
```

---

## 2. Tricky JavaScript Output Predictions

### Snippet 1: var hoisting

```js
console.log(x);  // ?
var x = 5;
console.log(x);  // ?
```

> **Answer:** `undefined`, then `5`  
> `var` declarations are hoisted to top of scope, but NOT initializations.

---

### Snippet 2: Closures in Loops (Classic)

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output?
```

> **Answer:** `3`, `3`, `3`  
> `var i` is shared. By the time callback runs, loop is done, `i === 3`.

```js
// Fix 1: use let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}

// Fix 2: IIFE
for (var i = 0; i < 3; i++) {
  ((j) => setTimeout(() => console.log(j), 0))(i); // 0, 1, 2
}
```

---

### Snippet 3: Event Loop Order

```js
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');
// Output?
```

> **Answer:** `1`, `4`, `3`, `2`  
> - Sync runs first: `1`, `4`  
> - Microtask queue (Promise): `3`  
> - Macrotask queue (setTimeout): `2`

---

### Snippet 4: typeof null

```js
console.log(typeof null);        // ?
console.log(typeof undefined);   // ?
console.log(null === undefined); // ?
console.log(null == undefined);  // ?
```

> **Answer:**  
> - `"object"` ← historical bug in JS, never fixed  
> - `"undefined"`  
> - `false`  
> - `true` ← loose equality coerces both to nullish

---

### Snippet 5: Prototype chain

```js
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} speaks`;
};

const dog = new Animal('Dog');
console.log(dog.speak());              // ?
console.log(dog.hasOwnProperty('name'));   // ?
console.log(dog.hasOwnProperty('speak')); // ?
```

> **Answer:** `"Dog speaks"`, `true`, `false`  
> `speak` is on the prototype, not own property of `dog`

---

### Snippet 6: Tricky this

```js
const obj = {
  name: 'Alice',
  greet: function() {
    return `Hello, ${this.name}`;
  },
  greetArrow: () => {
    return `Hello, ${this.name}`;
  }
};

console.log(obj.greet());       // ?
console.log(obj.greetArrow());  // ?
```

> **Answer:** `"Hello, Alice"`, `"Hello, undefined"`  
> Arrow functions don't have their own `this` — they inherit from lexical scope (module/global), where `this.name` is `undefined`

---

### Snippet 7: Array == truthy

```js
console.log([] == false);   // ?
console.log([] == ![]);     // ?
console.log([] + []);       // ?
console.log({} + []);       // ?
```

> **Answer:**  
> - `true` — `[]` is coerced to `""`, `false` to `0`, `""` to `0` → `0 == 0`  
> - `true` — `![]` is `false`, `[] == false` → `true`  
> - `""` — both coerce to empty string  
> - `"[object Object]"` — `{}` coerces to string

---

### Snippet 8: Promise chain order

```js
Promise.resolve(1)
  .then(x => {
    console.log(x);   // ?
    return x + 1;
  })
  .then(x => {
    console.log(x);   // ?
    throw new Error('oops');
  })
  .catch(err => {
    console.log(err.message); // ?
    return 10;
  })
  .then(x => {
    console.log(x);   // ?
  });
```

> **Answer:** `1`, `2`, `"oops"`, `10`  
> `.catch` catches errors and returns a resolved promise with value `10`

---

### Snippet 9: Scope and IIFE

```js
(function() {
  var a = b = 5;
})();

console.log(typeof a);  // ?
console.log(typeof b);  // ?
```

> **Answer:** `"undefined"`, `"number"`  
> `var a = b = 5` → `b = 5` (implicit global!) then `var a = b` (local)  
> `a` is local, `b` is accidentally global

---

### Snippet 10: Destructuring defaults

```js
const { a = 10, b = 20 } = { a: 3, b: undefined };
console.log(a); // ?
console.log(b); // ?
```

> **Answer:** `3`, `20`  
> Default only applies when value is `undefined`, not `null`  
> `a` is `3` (explicitly set), `b` is `undefined` so default `20` applies

---

### Snippet 11: Arguments object

```js
function test() {
  const arrow = () => arguments[0];
  return arrow();
}

console.log(test(42));  // ?
```

> **Answer:** `42`  
> Arrow functions don't have `arguments` but inherit it from enclosing function `test`

---

### Snippet 12: NaN comparison

```js
console.log(NaN === NaN);     // ?
console.log(NaN == NaN);      // ?
console.log(isNaN('hello'));  // ?
console.log(Number.isNaN('hello')); // ?
```

> **Answer:** `false`, `false`, `true`, `false`  
> NaN is the only value not equal to itself  
> `isNaN` coerces to Number first → `isNaN('hello')` = `isNaN(NaN)` = `true`  
> `Number.isNaN` is strict — only `true` for actual `NaN` type

---

### Snippet 13: Object reference trap

```js
const obj1 = { a: 1 };
const obj2 = obj1;
obj2.a = 99;

console.log(obj1.a); // ?
```

> **Answer:** `99`  
> Objects are assigned by **reference**, not value. `obj2` and `obj1` point to same memory.

---

### Snippet 14: String methods immutability

```js
let str = 'hello';
str.toUpperCase();
console.log(str); // ?
```

> **Answer:** `"hello"`  
> Strings are **immutable**. `toUpperCase()` returns a new string, doesn't mutate.  
> Must do: `str = str.toUpperCase()`

---

### Snippet 15: Event loop with async/await

```js
async function foo() {
  console.log('A');
  await Promise.resolve();
  console.log('B');
}

console.log('C');
foo();
console.log('D');
// Output?
```

> **Answer:** `C`, `A`, `D`, `B`  
> - `C` runs synchronously  
> - `foo()` starts: prints `A`, hits `await` (suspends)  
> - `D` runs (still sync)  
> - Microtask resumes: prints `B`
