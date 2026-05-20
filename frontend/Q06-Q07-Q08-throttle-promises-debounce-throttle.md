# 125 — Throttle Promises · Debouncing · Throttling

---

## 1. Throttle Promises by Batching

### The Problem

You have 100 API calls to make but the server allows only 5 at a time.  
Running all 100 in parallel crashes the server.

```
❌ Promise.all(100 calls)  → overloads server
✅ Run 5 at a time, wait for batch, then next 5
```

### Implementation

```js
async function throttlePromises(tasks, concurrencyLimit) {
  const results = [];
  let index = 0;

  // Worker: picks tasks and runs them
  async function worker() {
    while (index < tasks.length) {
      const currentIndex = index++;       // claim this task
      const task = tasks[currentIndex];

      try {
        results[currentIndex] = await task();  // run and store by index
      } catch (err) {
        results[currentIndex] = { error: err };
      }
    }
  }

  // Create exactly `concurrencyLimit` workers
  const workers = Array.from({ length: concurrencyLimit }, worker);
  await Promise.all(workers);  // wait for all workers to finish

  return results;
}
```

### Testing

```js
// Simulate delayed API calls
const createTask = (id, duration) => () =>
  new Promise(resolve => {
    console.log(`Task ${id} started`);
    setTimeout(() => {
      console.log(`Task ${id} done`);
      resolve(id);
    }, duration);
  });

const tasks = [
  createTask(1, 1000),
  createTask(2, 500),
  createTask(3, 800),
  createTask(4, 300),
  createTask(5, 1200),
  createTask(6, 200),
];

throttlePromises(tasks, 2).then(results => {
  console.log('All done:', results); // [1, 2, 3, 4, 5, 6] in order
});
// Only 2 tasks run at any given time
```

### Alternative: Batch-by-Batch (Simpler but less efficient)

```js
async function batchedPromises(tasks, batchSize) {
  const results = [];

  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map(t => t()));
    results.push(...batchResults);
    console.log(`Batch ${Math.floor(i / batchSize) + 1} complete`);
  }

  return results;
}
// ⚠️ Less efficient: waits for slowest in batch before starting next
```

### Real-World Usage

```js
// Fetching user data for 1000 users, 10 at a time
const userIds = Array.from({ length: 1000 }, (_, i) => i + 1);

const fetchTasks = userIds.map(id => () =>
  fetch(`/api/users/${id}`).then(r => r.json())
);

const users = await throttlePromises(fetchTasks, 10);
```

---

## 2. Debouncing Implementation

### What is Debouncing?

> **Debounce** = "Wait until the user stops doing something, THEN act"

The function fires **only after a pause** of N milliseconds.  
Every new call **resets the timer**.

```
User types: a → b → c → d  (each 50ms apart, debounce=200ms)

                 a     b     c     d       [200ms silence]
                 |     |     |     |              |
Timer reset  ───►reset ►reset ►reset ►reset       ► FIRES!

Result: function only called ONCE after user stops typing
```

### Implementation

```js
function debounce(fn, delay) {
  let timeoutId = null;

  return function (...args) {
    const context = this;

    // Cancel any previously scheduled call
    clearTimeout(timeoutId);

    // Schedule a new call
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
      timeoutId = null;
    }, delay);
  };
}
```

### With Leading Edge (fires immediately, then enforces cooldown)

```js
function debounce(fn, delay, { leading = false } = {}) {
  let timeoutId = null;

  return function (...args) {
    const context = this;
    const shouldCallNow = leading && !timeoutId;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      timeoutId = null;
      if (!leading) fn.apply(context, args);
    }, delay);

    if (shouldCallNow) {
      fn.apply(context, args);
    }
  };
}
```

### Full Featured (with cancel + flush)

```js
function debounce(fn, delay) {
  let timeoutId = null;
  let lastArgs = null;

  const debounced = function (...args) {
    lastArgs = args;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, lastArgs);
      timeoutId = null;
    }, delay);
  };

  debounced.cancel = function () {
    clearTimeout(timeoutId);
    timeoutId = null;
  };

  debounced.flush = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      fn.apply(this, lastArgs);
      timeoutId = null;
    }
  };

  return debounced;
}
```

### Real-World Usage

```js
// Search input — don't query on every keystroke
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  fetch(`/api/search?q=${query}`);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// Window resize
const debouncedResize = debounce(() => {
  recalculateLayout();
}, 200);
window.addEventListener('resize', debouncedResize);
```

---

## 3. Throttling Implementation

### What is Throttling?

> **Throttle** = "Execute at most once per N milliseconds, regardless of how often called"

The function fires **immediately**, then **ignores** calls until the cooldown expires.

```
User scrolls rapidly (events every 10ms), throttle=100ms

Events: - - - - - - - - - - - - - - - - - - - -
         0  10 20 30 40 50 60 70 80 90 100 110...

FIRES:   ↑                           ↑
         (first call)                (after 100ms cooldown)
```

### Implementation — Time-based (most common)

```js
function throttle(fn, limit) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastCallTime >= limit) {
      lastCallTime = now;
      fn.apply(this, args);
    }
    // else: ignore this call
  };
}
```

### Implementation — setTimeout-based (trailing call)

```js
function throttle(fn, limit) {
  let isThrottled = false;
  let pendingArgs = null;
  let pendingContext = null;

  return function (...args) {
    if (isThrottled) {
      // Store the latest call for after cooldown
      pendingArgs = args;
      pendingContext = this;
      return;
    }

    fn.apply(this, args);  // execute immediately
    isThrottled = true;

    setTimeout(() => {
      isThrottled = false;

      if (pendingArgs) {
        fn.apply(pendingContext, pendingArgs);  // run the pending call
        pendingArgs = null;
        pendingContext = null;
      }
    }, limit);
  };
}
```

### Real-World Usage

```js
// Scroll event handler — limit to every 100ms
const throttledScroll = throttle(() => {
  const scrollY = window.scrollY;
  updateProgressBar(scrollY);
}, 100);

window.addEventListener('scroll', throttledScroll);

// Mouse tracking
const throttledMouseMove = throttle((e) => {
  updateTooltipPosition(e.clientX, e.clientY);
}, 16); // ~60fps

document.addEventListener('mousemove', throttledMouseMove);

// Button to prevent double-submit
const throttledSubmit = throttle(() => {
  submitForm();
}, 2000);

submitBtn.addEventListener('click', throttledSubmit);
```

---

## 4. Debounce vs Throttle — Side-by-Side

| | Debounce | Throttle |
|---|---|---|
| **When it fires** | After a pause (silence) | At regular intervals |
| **Use case** | Search input, resize handler | Scroll, mousemove, button spam |
| **Intermediate calls** | Ignored and timer reset | Ignored (within limit) |
| **Guaranteed frequency** | Not guaranteed | At most once per N ms |
| **Leading/trailing** | Both possible | Leading by default |

### Visual Timeline

```
Events:   ┌─┬─┬─┬─────────┬─┬─┬─┐

Debounce: │              │         │
          (only fires after pause)

Throttle: │           │           │
          (fires at max rate, regularly)
```

---

## 5. Interview Trick Questions

```js
// Q: What's wrong here?
window.addEventListener('scroll', debounce(() => {
  console.log(window.scrollY);
}, 300));
// A: Nothing wrong, but if delay is too long user loses scroll position feedback

// Q: Can you debounce an async function?
const debouncedFetch = debounce(async (query) => {
  const data = await fetch(`/search?q=${query}`).then(r => r.json());
  renderResults(data);
}, 300);
// A: Yes! The debounced wrapper doesn't care if fn is async
```
