# CD Module 5 — All Numericals & Solved Problems

---

## Topic 1: Common Subexpression Elimination (CSE)

### Problem: Eliminate common subexpressions in this basic block:
```
a = b + c
d = b + c    ← same as a!
e = a * d
f = b + c    ← same again!
g = e + f
```

**Step 1:** Identify repeated expressions:
- `b + c` appears in lines 1, 2, and 4.

**Step 2:** Compute only once and reuse:
```
a = b + c    ← compute once
d = a        ← reuse (d = a)
e = a * d    ← = a * a
f = a        ← reuse (f = a)
g = e + f    ← = (a*a) + a
```

**Optimized:**
```
a = b + c
e = a * a
g = e + a
```

(d and f are now only aliases — may be eliminated too)

---

## Topic 2: Dead Code Elimination

### Problem: Identify and remove dead code:
```
1: x = 5
2: y = x + 3
3: x = 10       ← Redefines x; line 1's assignment is now dead
4: z = x * 2    ← Uses x from line 3
5: w = 99       ← w is never used after this
6: return z
```

**Analysis:**
- Line 1 (`x = 5`): `x` is used in line 2. BUT then re-assigned on line 3 before any other use of x. So the assignment in line 1 contributes to line 2's `y`, which is also never used (`y` never appears in lines 4–6). So `x=5` and `y = x+3` are both dead.
- Line 5 (`w = 99`): `w` is never read → dead.

**After dead code elimination:**
```
x = 10
z = x * 2
return z
```

---

## Topic 3: Constant Folding

### Problem: Apply constant folding:
```
t1 = 3 * 4
t2 = t1 + 2
t3 = t2 * 0
t4 = t3 + x
```

**Step 1:** `t1 = 3 * 4` → `t1 = 12` *(evaluated at compile time)*
**Step 2:** `t2 = 12 + 2` → `t2 = 14`
**Step 3:** `t3 = 14 * 0` → `t3 = 0`
**Step 4:** `t4 = 0 + x` → `t4 = x`

**Optimized code:**
```
t4 = x        ← entire chain collapsed to this
```

---

## Topic 4: Loop Optimization — Code Motion

### Problem: Apply code motion to:
```
i = 1;
while (i <= n) {
    x = a + b;     ← loop-invariant!
    y[i] = x * i;
    i = i + 1;
}
```

**Identify loop-invariant computation:**
- `a + b` does not depend on `i` or any loop variable. → Move outside.

**After code motion:**
```
x = a + b;        ← moved outside
i = 1;
while (i <= n) {
    y[i] = x * i;
    i = i + 1;
}
```

**Savings:** If loop runs 1000 times, we perform 1000 fewer additions.

---

## Topic 5: Strength Reduction

### Problem: Apply strength reduction to this loop:
```
for i = 0 to n-1:
    t = i * 4
    A[t] = 0
```

**Original:** Multiplication `i * 4` is performed on every iteration.

**Strength Reduction:** Replace with an induction variable that is incremented by 4 each time (addition is much cheaper than multiplication):
```
t = 0          ← initialize t = 0 * 4 = 0
for i = 0 to n-1:
    A[t] = 0
    t = t + 4  ← increment by constant 4 instead of multiplying
```

---

## Topic 6: Live Variable Analysis (Backward Data Flow)

**Definition:** A variable `v` is **live** at point `p` if there is a path from `p` to a use of `v` that does not pass through a definition of `v`.

**Equations:**
```
IN[B]  = use[B] ∪ (OUT[B] - def[B])
OUT[B] = ∪ IN[S] for all successors S of B
```

*(Solve iteratively; start with OUT[B] = {} for all B except final block)*

### Problem: Compute live variables for:
```
B1:
  d = 1
  e = d + f       (uses: d, f; defines: d, e)

B2:
  d = d + g       (uses: d, g; defines: d)
  e = d            (uses: d; defines: e)

B3:
  return e         (uses: e)
```
**Flow:** B1 → B2 → B3

**Step 1:** Compute use and def for each block:
| Block | use | def |
|---|---|---|
| B1 | {f} | {d, e} |
| B2 | {d, g} | {d, e} |
| B3 | {e} | {} |

*(In B1: `d = 1` defines d before it's used; `e = d + f` uses d and f — but d is already defined in B1, so f is the only "live-in" use)*

**Step 2:** Initialize OUT[B3] = {} (no successor)

**Iteration 1:**
- **IN[B3]** = use[B3] ∪ (OUT[B3] - def[B3]) = {e} ∪ {} = **{e}**
- **OUT[B2]** = IN[B3] = {e}
- **IN[B2]** = use[B2] ∪ (OUT[B2] - def[B2]) = {d,g} ∪ ({e} - {d,e}) = {d,g} ∪ {} = **{d, g}**
- **OUT[B1]** = IN[B2] = {d, g}
- **IN[B1]** = use[B1] ∪ (OUT[B1] - def[B1]) = {f} ∪ ({d,g} - {d,e}) = {f} ∪ {g} = **{f, g}**

**Final:**
| Block | IN | OUT |
|---|---|---|
| B1 | {f, g} | {d, g} |
| B2 | {d, g} | {e} |
| B3 | {e} | {} |

**Interpretation:** `f` and `g` must be live on entry — they are read without prior definition.

---

## Topic 7: Reaching Definitions (Forward Data Flow)

**Definition:** A definition `d: x = ...` **reaches** point `p` if there is a path from `d` to `p` with no other definition of `x` along the way.

**Equations:**
```
OUT[B] = gen[B] ∪ (IN[B] - kill[B])
IN[B]  = ∪ OUT[P] for all predecessors P of B
```

### Problem: Apply reaching definitions to:
```
B1: d1: x = 1      B1 → B2, B1 → B3
B2: d2: x = 2      B2 → B3
B3: d3: y = x      (use of x)
```

| Block | gen | kill |
|---|---|---|
| B1 | {d1} | {d2} (kills other x defns) |
| B2 | {d2} | {d1} |
| B3 | {} | {} |

**Iteration:**
- IN[B1] = {} (entry)
- OUT[B1] = gen[B1] ∪ (IN[B1] - kill[B1]) = {d1}
- IN[B2] = OUT[B1] = {d1}
- OUT[B2] = {d2} ∪ ({d1} - {d1}) = {d2}
- IN[B3] = OUT[B1] ∪ OUT[B2] = {d1} ∪ {d2} = {d1, d2}

**Conclusion:** At B3, both d1 (x=1) and d2 (x=2) might reach the use of `x`. So `x` is potentially **uninitialized** or **ambiguous** — compiler warns about non-constant reaching definition.

---

## Topic 8: Loop Detection from Flow Graph

### Problem: Identify back edges and natural loops

**Flow graph:**
```
Nodes: 1, 2, 3, 4, 5
Edges: 1→2, 2→3, 3→4, 4→2, 2→5
```

**Depth-First Spanning Tree:**
- Tree edges: 1→2, 2→3, 3→4, 2→5
- Back edges: 4→2 (points to ancestor 2)

**Natural Loop of back edge (4→2):**
- Header: node 2
- Body: all nodes from which 4 is reachable without going through 2 = {3, 4}
- **Loop: {2, 3, 4}** with header 2

**Result:** The while-loop body in the source code corresponds to nodes 2, 3, 4. Code motion can move loop-invariant computations out to node 1 (before node 2).

---

## Topic 9: Loop Unrolling

### Problem: Unroll the loop by factor 4:
```
for (i = 0; i < 100; i++) {
    A[i] = 0;
}
```

**Unrolled (factor 4):**
```
for (i = 0; i < 100; i += 4) {
    A[i]   = 0;
    A[i+1] = 0;
    A[i+2] = 0;
    A[i+3] = 0;
}
```

**Savings:** The loop condition `i < 100` and the increment `i++` are checked/executed 100 times in the original. After unrolling by 4, they are executed only 25 times — a 75% reduction in loop overhead.
