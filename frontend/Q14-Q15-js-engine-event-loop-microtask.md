# 128 — JavaScript Engine · Event Loop · Microtask Queue

---

## 1. How the JavaScript Engine Works

### Overview

JavaScript engines (like V8 in Chrome/Node.js) turn your JS source code into machine-executable code.

```
Your JS Code
    │
    ▼
┌─────────────┐
│   Parser    │  → Reads source, checks syntax, builds AST
└─────────────┘
    │
    ▼
┌─────────────┐
│  AST (tree) │  → Abstract Syntax Tree representation of code
└─────────────┘
    │
    ▼
┌─────────────┐
│  Interpreter│  → Ignition (V8): converts AST → Bytecode
│  (Ignition) │    Executes immediately (fast startup)
└─────────────┘
    │
    ▼ (hot code detected)
┌─────────────┐
│  JIT Compiler│ → TurboFan (V8): compiles hot bytecode → machine code
│  (TurboFan) │    Much faster execution
└─────────────┘
    │
    ▼
┌─────────────┐
│Machine Code │  → Runs directly on CPU
└─────────────┘
```

---

### Phase 1: Parsing

```js
// Source code: const x = 2 + 3;

// Tokenization (Lexer)
// ["const", "x", "=", "2", "+", "3", ";"]

// AST (Abstract Syntax Tree)
{
  type: "VariableDeclaration",
  kind: "const",
  declarations: [{
    type: "VariableDeclarator",
    id: { type: "Identifier", name: "x" },
    init: {
      type: "BinaryExpression",
      operator: "+",
      left: { type: "Literal", value: 2 },
      right: { type: "Literal", value: 3 }
    }
  }]
}
```

---

### Phase 2: Interpretation vs Compilation

```
Cold code (runs once)     → Interpreter runs bytecode directly
                            (fast startup, slower execution)

Hot code (runs many times) → JIT compiler kicks in
                             Optimized machine code generated
                             Much faster!

De-optimization: if JIT made assumptions that are violated,
it falls back to interpreted mode
```

---

### Memory: Heap and Stack

```
┌─────────────────────────────────────────────┐
│                  MEMORY                     │
│                                             │
│  ┌─────────────┐      ┌──────────────────┐  │
│  │  CALL STACK │      │      HEAP        │  │
│  │             │      │                  │  │
│  │  foo()      │      │  { id: 1, ... }  │  │
│  │  bar()      │      │  [1, 2, 3]       │  │
│  │  main()     │      │  function() {}   │  │
│  │             │      │                  │  │
│  │ Primitives  │      │  Objects, Arrays  │  │
│  │ (by value)  │      │  (by reference)  │  │
│  └─────────────┘      └──────────────────┘  │
└─────────────────────────────────────────────┘
```

```js
// Stack: primitives and references
function add(a, b) {
  const result = a + b;  // stored on stack
  return result;
}

// Heap: objects live here
const user = { name: 'Alice' };  // user variable on stack
                                 // { name: 'Alice' } object on heap
```

---

### Garbage Collection

V8 uses **Mark-and-Sweep** algorithm:
1. **Mark** all reachable objects (from "roots" like global scope, stack)
2. **Sweep** (delete) anything not marked

```js
let obj = { big: 'data' };  // object in heap, referenced by obj
obj = null;                  // reference removed → GC can collect it

// Memory leak example — object stays in memory even when unwanted
const leaks = [];
function createLeak() {
  const big = new Array(1000000).fill('☠️');
  leaks.push(big);  // still referenced! GC can't collect
}
```

---

## 2. The Event Loop and Microtask Queue

### The Big Picture

JavaScript is **single-threaded** — one call stack, one thing at a time.  
The Event Loop allows async operations to work without blocking.

```
┌────────────────────────────────────────────────────┐
│                    BROWSER / NODE                  │
│                                                    │
│  ┌─────────────┐                                   │
│  │ CALL STACK  │  ← JS executes code here          │
│  └─────────────┘                                   │
│         ▲                                          │
│         │ event loop picks next task               │
│  ┌──────┴──────────────────────────────────────┐  │
│  │         EVENT LOOP checks queues             │  │
│  └──────────────────────────────────────────────┘  │
│         │                       │                  │
│  ┌──────▼──────┐     ┌──────────▼──────────┐       │
│  │  MICROTASK  │     │   MACROTASK (Task)   │       │
│  │   QUEUE     │     │     QUEUE            │       │
│  │             │     │                      │       │
│  │ • Promises  │     │ • setTimeout         │       │
│  │ • queueMicro│     │ • setInterval        │       │
│  │ • MutationObs│    │ • I/O callbacks      │       │
│  │             │     │ • UI events          │       │
│  └─────────────┘     └──────────────────────┘       │
│                                                    │
│  ┌───────────────────────────────────────────────┐  │
│  │           WEB APIs / Node APIs                │  │
│  │   setTimeout, fetch, DOM events, fs.readFile  │  │
│  └───────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

---

### Event Loop Algorithm (Simplified)

```
1. Execute all synchronous code (drain call stack)
2. DRAIN microtask queue completely
   - Run all Promises, queueMicrotask callbacks
   - If microtask adds more microtasks, run those too!
3. Pick ONE task from macrotask queue
4. Execute it (draining call stack)
5. DRAIN microtask queue again
6. Render (in browsers, if needed)
7. Go to step 3
```

---

### Microtask vs Macrotask

```
MICROTASKS (higher priority):
  - Promise.then / .catch / .finally
  - async/await (after await)
  - queueMicrotask()
  - MutationObserver callbacks

MACROTASKS (lower priority):
  - setTimeout / setInterval
  - setImmediate (Node.js)
  - MessageChannel
  - I/O events
  - requestAnimationFrame (browser, sort of in-between)
```

---

### Detailed Example — Output Tracing

```js
console.log('-- start --');           // 1. SYNC

setTimeout(() => {
  console.log('setTimeout 1');        // 7. MACRO
  Promise.resolve().then(() => {
    console.log('Promise inside setTimeout'); // 8. MICRO (after macro)
  });
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');         // 3. MICRO
    return Promise.resolve();
  })
  .then(() => {
    console.log('Promise 2');         // 5. MICRO
  });

queueMicrotask(() => {
  console.log('queueMicrotask');      // 4. MICRO
});

setTimeout(() => {
  console.log('setTimeout 2');        // 9. MACRO
}, 0);

console.log('-- end --');             // 2. SYNC

/*
OUTPUT:
  -- start --
  -- end --
  Promise 1
  queueMicrotask
  Promise 2
  setTimeout 1
  Promise inside setTimeout
  setTimeout 2
*/
```

**Why this order?**
```
SYNC:       "-- start --", "-- end --"
MICROTASK:  "Promise 1", "queueMicrotask"
            (Promise 1's .then schedules "Promise 2")
MICROTASK:  "Promise 2"   (from previous micro)
MACROTASK:  "setTimeout 1"  (also schedules another microtask)
MICROTASK:  "Promise inside setTimeout"  (drain again!)
MACROTASK:  "setTimeout 2"
```

---

### async/await Under the Hood

```js
async function foo() {
  console.log('A');
  const result = await fetch('/api');  // suspends here
  console.log('B');                    // resumes here as microtask
}

// Equivalent to:
function foo() {
  console.log('A');
  return fetch('/api').then(result => {
    console.log('B');
  });
}
```

---

### Practical Gotcha: Microtask Starvation

```js
// ⚠️ This can starve macrotasks!
function runForever() {
  return Promise.resolve().then(runForever);
}
runForever();
// setTimeout callbacks will NEVER run because
// microtask queue is never empty!
```

---

### Node.js Specifics

Node has additional phases in its event loop (libuv):

```
Node Event Loop Phases:
  1. timers         (setTimeout, setInterval)
  2. pending I/O    (I/O errors from prev iteration)
  3. idle / prepare (internal)
  4. poll           (new I/O events — blocks if queue empty)
  5. check          (setImmediate)
  6. close callbacks (socket.on('close'))

Between each phase: process.nextTick() and Promises run
process.nextTick() runs BEFORE Promise.then!
```

```js
// Node-specific ordering
process.nextTick(() => console.log('nextTick'));
Promise.resolve().then(() => console.log('Promise'));
setTimeout(() => console.log('setTimeout'), 0);

// Output: nextTick → Promise → setTimeout
```

---

### Interview Quick Reference

| Task Type | Queue | Example | Priority |
|---|---|---|---|
| Synchronous | Call Stack | `console.log()` | Highest |
| `process.nextTick` | Microtask (Node) | `process.nextTick(fn)` | 2nd |
| Promises | Microtask | `.then()`, `async/await` | 3rd |
| `queueMicrotask` | Microtask | `queueMicrotask(fn)` | 3rd |
| `setTimeout(0)` | Macrotask | `setTimeout(fn, 0)` | 4th |
| `setInterval` | Macrotask | `setInterval(fn, n)` | 4th |
| I/O callbacks | Macrotask | `fs.readFile(fn)` | 4th |
