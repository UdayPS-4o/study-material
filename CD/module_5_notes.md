# CD Module 5 — Code Optimization

---

## 1. Introduction to Code Optimization

**Code optimization** is a process of transforming a program to make it execute faster, use less memory, or consume less power — **without changing what the program computes**.

It is an optional phase applied to the intermediate representation (IR) or the final target code.

**Principal of Optimization:** Transformations are **safe** (preserve program behavior) and **profitable** (actually improve performance).

**Two main categories:**
- **Machine-Independent Optimization:** Works on intermediate code (TAC). Does not depend on the target CPU.
- **Machine-Dependent Optimization:** Works on target code. Exploits hardware features (registers, instruction set, cache).

---

## 2. Sources of Optimization Within Basic Blocks

Optimizations applied within a single basic block are called **local optimizations**.

### A. Common Subexpression Elimination (CSE)
If the same expression is computed more than once and its operands have not changed between the two computations, replace the second computation with the result of the first.

```
t1 = a + b
t2 = a + b   ← same! Replace with t2 = t1
t3 = t1 * t2
```
After CSE: `t3 = t1 * t1`

### B. Dead Code Elimination
If a variable is assigned a value that is **never subsequently used**, the assignment is "dead" and can be removed.

```
x = y + z   ← x is never read after this line
y = a + b   ← this is the real useful code
```
Remove `x = y + z`.

### C. Constant Folding
If all operands of an expression are constants, **evaluate the expression at compile time** and replace it with the constant result.

```
t1 = 2 * 3.14    →    t1 = 6.28   (computed at compile time)
```

### D. Constant Propagation
If a variable is assigned a constant and never reassigned, replace all uses of that variable with the constant.

```
x = 5
y = x + 3   →   y = 5 + 3   →   y = 8  (after folding)
```

### E. Copy Propagation
After an assignment `x = y`, replace subsequent uses of `x` with `y` (as long as neither x nor y is reassigned in between).

```
x = y
z = x + 1   →   z = y + 1
```

---

## 3. Loops in Flow Graphs

Loops are the **most important** target for optimization because code inside a loop executes many times. Even a small saving inside a loop that runs 1 million times yields a 1 million× improvement.

**Identifying Loops:**
In a control flow graph (CFG), a **back edge** is an edge from node `n` to an ancestor `h` in the DFS spanning tree. This indicates a loop.

The **natural loop** of back edge (n → h) is:
- Header: node `h`
- Body: all nodes from which `n` is reachable without going through `h`

**Loop Properties:**
- A loop has exactly **one entry point** (the header).
- There is at least **one path back to the header** from the loop body.

---

## 4. Dead Code Elimination (Global)

**Global dead code elimination** considers the entire CFG, not just individual basic blocks.

A variable is **live** at a point if its value may be used on some future execution path. If a variable is **dead** (not live) right after an assignment, that assignment can be removed.

This requires **Live Variable Analysis** (backward data flow analysis).

---

## 5. Loop Optimizations

### A. Code Motion (Loop-Invariant Code Motion)
A computation is **loop-invariant** if its operands don't change within the loop. Move it **before the loop** so it executes only once.

```
Before:
  while (i < n) {
    limit = n - 2;    ← loop-invariant! n doesn't change
    a[i] = limit * i;
    i++;
  }

After:
  limit = n - 2;    ← moved outside
  while (i < n) {
    a[i] = limit * i;
    i++;
  }
```

**Safety:** Code motion is safe only if the loop executes at least once (otherwise we might compute something unnecessarily or cause an error).

### B. Strength Reduction
Replace an **expensive** operation with a **cheaper** equivalent.

```
Before: t = i * 4       (multiplication every iteration)
After:  t = t + 4       (addition every iteration, initialized to 0)
```

More specifically: if `t = i * c` where `c` is loop-invariant and `i` is incremented by 1 each iteration, replace with `t = t + c` (increment by c instead of multiplying).

### C. Loop Unrolling
Replicate the loop body **k times** and reduce the number of loop iterations by factor k.

```
Original (100 iterations):
  for i = 0 to 99: A[i] = 0

Unrolled (25 iterations of 4 copies):
  for i = 0 to 99 step 4:
    A[i] = 0; A[i+1] = 0; A[i+2] = 0; A[i+3] = 0;
```
Reduces loop-control overhead (condition check + increment + branch) by 75%.

### D. Induction Variable Elimination
An **induction variable** is a variable that is incremented by a constant amount each iteration. Multiple induction variables can often be combined or eliminated.

```
i = 0;
j = 0;
while (i < n) {
    a[j] = ...;
    i = i + 1;
    j = j + 4;      ← j is a derived induction variable (j = 4*i)
}
```
If `j` can be fully derived from `i`, and `i` is only used to control the loop, `i` can be eliminated:
```
j = 0;
while (j < 4*n) {
    a[j] = ...;
    j = j + 4;
}
```

---

## 6. Introduction to Global Data Flow Analysis

**Global Data Flow Analysis** gathers information about how values flow through the **entire program** across basic blocks and loops — not just within a single block.

This information is used to safely apply global transformations.

**General Framework:**
For each basic block B, compute two sets:
- **IN[B]:** Information that holds at the **entry** of B.
- **OUT[B]:** Information that holds at the **exit** of B.

These sets satisfy equations of the form:
```
OUT[B] = f_B(IN[B])               (f_B is the transfer function for block B)
IN[B]  = meet of OUT[P] for all predecessors P of B
```

The equations are solved **iteratively** until a fixed point is reached (sets stop changing).

---

## 7. Code Improving Transformations

### A. Live Variable Analysis (Backward Analysis)
**Question:** Which variables hold values that may be **used in the future**?

**Use:** Safe register allocation, dead code elimination.

**Equations (solved backward, from exit to entry):**
```
IN[B]  = use[B] ∪ (OUT[B] - def[B])
OUT[B] = ∪ IN[S]  for all successors S of B
```

Where:
- `use[B]`: Variables **used in B before any definition** in B.
- `def[B]`: Variables **defined (assigned)** in B.

### B. Reaching Definitions (Forward Analysis)
**Question:** Which assignments (definitions) may **reach** a given point without being overwritten?

**Use:** Constant propagation, detecting uninitialized variables.

**Equations (solved forward, from entry to exit):**
```
OUT[B] = gen[B] ∪ (IN[B] - kill[B])
IN[B]  = ∪ OUT[P]  for all predecessors P of B
```

Where:
- `gen[B]`: Definitions generated in B (the last definition of each variable in B).
- `kill[B]`: All other definitions of variables defined in B (they are killed by B's definition).

---

## 8. Data Flow Analysis of Structured Flow Graphs

A **structured flow graph** is one built from well-structured control flow (no arbitrary GOTOs) using:
- **Sequence:** B1 followed by B2
- **If-then-else:** Branch on condition
- **While loop:** Loop with single-entry header

For structured programs, data flow equations can be solved efficiently without full iterative computation — using **interval analysis** or **tree-based methods** by decomposing the graph into nested regions.

---

## 9. Symbolic Debugging of Optimized Code

**The Problem:**
After optimization, the structure of the code is radically different from the source. Variables are eliminated, computations are moved, loops are unrolled. When stepping through optimized code in a debugger, the current "line" may not correspond to the source line in an intuitive way.

**Solutions:**
1. **Debug Information Tables:** The compiler generates metadata linking each machine instruction back to its original source line (DWARF format in Linux, PDB in Windows).
2. **Debug Builds:** Optimizations are turned off for debugging (`-O0` in GCC). The code is slower but directly corresponds to the source.
3. **Restricted Optimization:** Only apply optimizations that preserve easy debugging (like constant folding, but not code motion or induction variable elimination).

---

## 10. Machine-Dependent vs Machine-Independent Optimization

| Feature | Machine-Independent | Machine-Dependent |
|---|---|---|
| Applied to | IR (TAC) | Target/machine code |
| Requires CPU knowledge? | No | Yes |
| Examples | CSE, Dead Code, Loop Invariant Motion, Constant Folding | Peephole, Register Allocation, Instruction Scheduling |
| Goal | Improve algorithm logic | Exploit hardware features |
| Portability | Works for any target | Specific to one CPU architecture |
