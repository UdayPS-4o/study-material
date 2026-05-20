# 127 — Object vs Map · PATCH vs PUT · Debounce vs Throttle

---

## 1. Object vs Map in JavaScript

### What's the Core Difference?

A plain `Object` and a `Map` both store key-value pairs, but they're fundamentally different.

---

### Key Comparison Table

| Feature | `Object` | `Map` |
|---|---|---|
| **Key types** | Only strings + Symbols | ANY value (objects, functions, etc.) |
| **Key order** | Not guaranteed (numbers first, then strings) | Insertion order always preserved |
| **Size** | Must use `Object.keys(obj).length` | `.size` property |
| **Iteration** | `for...in`, `Object.keys()` | `.forEach()`, `for...of`, iterable |
| **Default keys** | Inherits from prototype (`toString`, etc.) | No inherited keys |
| **Performance** | Slower for frequent add/delete | Optimised for frequent add/delete |
| **Serialization** | `JSON.stringify` works | Needs custom serialization |

---

### Key Types — The Biggest Difference

```js
// Object: keys are ALWAYS coerced to strings
const obj = {};
const keyObj = { id: 1 };
const keyArr = [1, 2];

obj[keyObj] = 'value';
obj[keyArr] = 'value2';

console.log(Object.keys(obj));
// ["[object Object]", "1,2"]  ← COERCED!

// Map: keys stay as their original type
const map = new Map();
map.set(keyObj, 'value');
map.set(keyArr, 'value2');
map.set(42, 'number key');
map.set(true, 'boolean key');

console.log(map.get(keyObj)); // "value"       ✅
console.log(map.get(keyArr)); // "value2"      ✅
console.log(map.get(42));     // "number key"  ✅
```

---

### Prototype Pollution Risk

```js
const obj = {};

// Dangerous! 'toString' already exists on Object.prototype
console.log('toString' in obj);      // true  (inherited!)
console.log('constructor' in obj);   // true  (inherited!)

// Can cause bugs
obj['__proto__'] = { evil: true };   // prototype pollution possible

// Map is safe
const map = new Map();
console.log(map.has('toString'));    // false  ✅
```

---

### Iteration

```js
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3]
]);

// Map — multiple ways to iterate
for (const [key, val] of map) {
  console.log(key, val);  // 'a' 1, 'b' 2, 'c' 3
}

map.forEach((val, key) => console.log(key, val));

console.log([...map.keys()]);    // ['a', 'b', 'c']
console.log([...map.values()]); // [1, 2, 3]
console.log([...map.entries()]); // [['a',1], ['b',2], ['c',3]]

// Object — more clunky
const obj = { a: 1, b: 2, c: 3 };
for (const key of Object.keys(obj)) { ... }
Object.entries(obj).forEach(([k, v]) => { ... });
```

---

### When to Use Which?

| Use `Map` when | Use `Object` when |
|---|---|
| Keys aren't strings | Keys are always strings |
| Frequent additions/deletions | Structure is mostly static |
| Key insertion order matters | You need JSON serialization |
| Keys are complex types | You need to use dot notation |
| Counting/tracking things | Defining a data shape/schema |

```js
// Map perfect for: frequency counter with any key type
function countBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  }
  return map;
}

// Object perfect for: config, DTOs, API responses
const user = { id: 1, name: 'Alice', role: 'admin' };
```

---

## 2. PATCH vs PUT (HTTP Methods)

### Core Difference

| Method | Meaning | Behaviour |
|---|---|---|
| **PUT** | Replace the entire resource | Sends the **full** updated object |
| **PATCH** | Partially update a resource | Sends only the **changed fields** |

---

### Analogy

> **PUT** = Replace the entire book  
> **PATCH** = Fix just the typo on page 42

---

### PUT Example

```js
// PUT /users/1  — must send ENTIRE user object
// If you omit a field, it gets nulled/removed!

// BEFORE:
{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }

// PUT request body:
{ id: 1, name: 'Alice', age: 26, email: 'alice@example.com' }
//                             ^^^ only age changed, but FULL object required

// AFTER: full replacement
{ id: 1, name: 'Alice', age: 26, email: 'alice@example.com' }

// ❌ If you only send { age: 26 } with PUT:
// AFTER: { id: 1, age: 26 }  — name and email are GONE!
```

---

### PATCH Example

```js
// PATCH /users/1  — send ONLY what changed

// BEFORE:
{ id: 1, name: 'Alice', age: 25, email: 'alice@example.com' }

// PATCH request body:
{ age: 26 }

// AFTER: only age updated, everything else preserved
{ id: 1, name: 'Alice', age: 26, email: 'alice@example.com' }
```

---

### Idempotency

| Method | Idempotent? | Explanation |
|---|---|---|
| PUT | ✅ Yes | Multiple identical PUTs → same result |
| PATCH | ⚠️ Not necessarily | Depends on implementation; `increment: 1` would not be idempotent |

```js
// PUT is idempotent:
// PUT { name: 'Alice', age: 26 } → same result every time

// PATCH can be non-idempotent:
// PATCH { age: +1 }  → 25→26 first time, 26→27 second time
```

---

### Real API Comparison

```js
// Express.js server example

// PUT - replace entire user
app.put('/users/:id', (req, res) => {
  const user = req.body; // must contain ALL fields
  db.users.replace(req.params.id, user);
  res.json(user);
});

// PATCH - partial update with merge
app.patch('/users/:id', (req, res) => {
  const updates = req.body; // only changed fields
  const existing = db.users.findById(req.params.id);
  const updated = { ...existing, ...updates }; // merge
  db.users.update(req.params.id, updated);
  res.json(updated);
});
```

---

### All REST Methods Summary

| Method | Action | Idempotent | Body |
|---|---|---|---|
| GET | Read resource | ✅ | No |
| POST | Create resource | ❌ | Yes |
| PUT | Replace resource | ✅ | Yes (full) |
| PATCH | Update resource | ⚠️ | Yes (partial) |
| DELETE | Remove resource | ✅ | Optional |
| HEAD | Like GET but no body | ✅ | No |
| OPTIONS | Get allowed methods | ✅ | No |

---

## 3. Debounce vs Throttle — Deep Dive

> *(See also file 125 for implementations)*

### Mental Model

```
Stream of events:  ●●●●●●●●●●●●  (rapid keystrokes, scrolls, clicks)

Debounce:                          ●  (fires ONCE after silence)
Throttle:          ●         ●        (fires at max once per interval)
```

### Detailed Comparison

| | Debounce | Throttle |
|---|---|---|
| **Core idea** | Delay + cancel | Rate limit |
| **When it fires** | After N ms of silence | At most every N ms |
| **If called continuously** | Never fires until pause! | Fires at regular intervals |
| **First call behaviour** | Delayed (unless leading) | Fires immediately |
| **Last call behaviour** | Always captured | May be skipped |
| **Timer reset** | Yes, every new call | No |

### Right Tool for the Job

```js
// ✅ DEBOUNCE — "wait until done then act"
const debouncedSearch = debounce(search, 300);
searchInput.addEventListener('input', debouncedSearch);
// Why: We don't want to search on every keystroke

const debouncedResize = debounce(recalcLayout, 200);
window.addEventListener('resize', debouncedResize);
// Why: Recalculate only when resize movement "stops"

// ✅ THROTTLE — "act, but not more than X times/second"
const throttledScroll = throttle(updateNavbar, 100);
window.addEventListener('scroll', throttledScroll);
// Why: Want smooth, regular updates, not huge gaps

const throttledMouseMove = throttle(trackCursor, 50);
document.addEventListener('mousemove', throttledMouseMove);
// Why: 50ms update rate is enough for cursor tracking

const throttledSave = throttle(autoSave, 2000);
editor.addEventListener('input', throttledSave);
// Why: Auto-save at most every 2s even during typing
```

### Interview Question Summary

> "Debounce fires AFTER the user stops. Throttle fires DURING but no more than X times per second."

```
Scenario: User rapidly scrolling a page

Debounce(200ms): 
  - Nothing fires during scroll
  - Fires 200ms AFTER user stops scrolling
  - Problem: No feedback during scroll!
  
Throttle(100ms):
  - Fires every 100ms during scroll
  - Smooth, regular updates
  - Perfect for scroll handlers
```
