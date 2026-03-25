# CD Module 5 — Exam Answer Notes

---

## Q: What is Code Optimization? What are its objectives?

Code optimization is the process of transforming a program's intermediate or target code to make it run faster, consume less memory, or use fewer system resources — **without changing the output or the meaning of the program**.

It is an optional phase in the compiler pipeline that sits between intermediate code generation and final code generation.

**Objectives of Code Optimization:**
1. Reduce the execution time of the program.
2. Reduce the memory space used.
3. Reduce power consumption (important for embedded and mobile systems).
4. Improve cache efficiency and reduce CPU pipeline stalls.

**Two main categories:**
- **Machine-Independent Optimization:** Applied to the intermediate code (TAC). These transformations are valid regardless of what CPU the code runs on. Examples: constant folding, dead code elimination, common subexpression elimination, loop optimization.
- **Machine-Dependent Optimization:** Applied to the final target code. These exploit specific CPU features like registers, addressing modes, and instruction sets. Example: peephole optimization, register allocation.

---

## Q: What are the sources of optimization within Basic Blocks? Explain with examples.

Optimizations applied within a single basic block (no loops or jumps) are called **local optimizations**. The main transformations are:

**1. Common Subexpression Elimination (CSE):**
If the same expression is computed more than once in a block and its operands have not been modified in between, the second computation can be replaced by the result of the first.

```
Before:
  t1 = a + b
  t2 = a + b    ← Same computation
  t3 = t1 * t2

After:
  t1 = a + b
  t3 = t1 * t1  ← t2 eliminated; t1 reused
```

**2. Dead Code Elimination:**
If a variable is assigned a value that is never subsequently used, the assignment instruction is useless ("dead") and can be safely removed.

```
Before:
  x = a + b     ← x is never used again
  y = c + d
After:
  y = c + d     ← x = a + b is removed
```

**3. Constant Folding:**
If an expression involves only constant values, the compiler evaluates it at compile time and replaces the expression with the computed constant. This saves runtime computation.

```
Before: x = 2 * 3.14 * r
After:  x = 6.28 * r      ← 2 * 3.14 folded to 6.28 at compile time
```

**4. Constant Propagation:**
If a variable is assigned a constant value and never changed, replace all subsequent uses of that variable with the constant directly.

```
x = 5
y = x + 3   →   y = 5 + 3   →   y = 8   ← After folding too
```

---

## Q: What are Loops in Flow Graphs? Why are they important for optimization?

In a control flow graph (CFG), a **loop** is a set of nodes such that:
- There is a **back edge** — an edge from a node to one of its ancestors in a depth-first spanning tree (i.e., an edge pointing backward in the flow).
- The region forms a **strongly connected component**: every node in the loop is reachable from every other node.

Loops are the single most important target of optimization because most execution time is spent inside loops. Speeding up the body of a loop that executes 1000 times has a 1000× more impact than speeding up equivalent straight-line code.

**Key Loop Terminologies:**
- **Loop Header:** The single entry point into the loop (the node that dominates all others in the loop).
- **Back Edge:** The edge from the loop body back to the header, which defines the loop.

---

## Q: What is Dead Code Elimination?

Dead code is code that will never be executed or whose results are never used by any subsequent instruction.

**Types of Dead Code:**

**1. Unreachable Code:** Code that logically cannot be reached during any execution.
```
return x;
y = x + 1;    ← This line can never execute; it is dead code.
```

**2. Useless Assignments:** Values that are assigned but never read.
```
x = 5;
x = 10;   ← The first assignment to x is dead; it's overwritten before use.
y = x;
```

The compiler identifies dead code through **live variable analysis** (a data flow analysis technique). A variable is "live" at a point if its current value might be used in the future. If a variable is "dead" (not live) immediately after an assignment, that assignment is dead code and can be removed.

---

## Q: Explain Loop Optimizations. Describe the key techniques.

Loop optimization specifically targets the body of loops to reduce work performed per iteration.

**1. Code Motion (Loop-Invariant Code Motion):**
An expression whose value does not change across loop iterations is called "loop-invariant". Moving such expressions outside the loop ensures they are computed only once instead of on every iteration.

```
Before:
  while (i < n) {
    a = y + z;     ← y and z don't change; this is loop-invariant
    b = a * i;
    i++;
  }

After:
  temp = y + z;    ← Moved outside the loop
  while (i < n) {
    b = temp * i;
    i++;
  }
```

**2. Strength Reduction:**
Replacing an expensive operation (like multiplication) with a cheaper equivalent (like addition) that produces the same result.

```
Before: t = i * 4    ← Multiplication on each iteration
After:  t = t + 4    ← t starts at 0 and is incremented by 4 each loop — much faster
```

**3. Loop Unrolling:**
Replicate the loop body multiple times and reduce the number of loop-back jumps. This reduces the overhead of the loop condition check and the back-edge branch.

```
Before:
  for i = 0 to 3: A[i] = 0

After (unrolled):
  A[0] = 0; A[1] = 0; A[2] = 0; A[3] = 0;   ← No loop needed
```

**4. Induction Variable Elimination:**
Variables that change by a constant amount each loop iteration are induction variables. Redundant induction variables (ones that can be derived from others) can be eliminated.

---

## Q: What is Global Data Flow Analysis?

**Global Data Flow Analysis** is a technique to gather information about how data (values of variables) flows through the entire control flow graph — across all basic blocks and loops — not just within a single block.

This information is essential for safe, correct global optimizations. Before the compiler can move a computation or eliminate an assignment across block boundaries, it must prove that doing so is safe throughout the entire program's flow.

**Key Concepts:**

- **IN[B]:** The set of data-flow facts that hold at the entry of block B.
- **OUT[B]:** The set of data-flow facts that hold at the exit of block B.

These sets are computed using **data-flow equations** that model how each block transforms information. The equations are solved iteratively (starting with initial estimates and refining until a fixed-point is reached, i.e., the sets stop changing).

**Common Data Flow Problems:**
1. **Live Variable Analysis (Liveness):** Determines which variables hold values that may be used in the future. A variable `x` is live at point `p` if there is a path from `p` to a use of `x` without passing through a definition of `x`. Used for register allocation and dead code elimination.

2. **Reaching Definitions:** Determines which definitions (assignments) of a variable can "reach" (have their value observed by) a particular point in the program. Used to detect uninitialized variables and for constant propagation.

---

## Q: What is the difference between Machine-Independent and Machine-Dependent optimization?

| Feature | Machine-Independent | Machine-Dependent |
|---|---|---|
| Applied to | Intermediate Code (TAC) | Final Target / Machine Code |
| Knowledge of CPU | Not required | Requires knowledge of specific CPU |
| Examples | CSE, Dead Code Elim., Loop Invariant Code Motion | Peephole Optimization, Register Allocation |
| Goal | Improve algorithm & logic efficiency | Exploit hardware features |
| Portability | Portable across all targets | Specific to one target architecture |
