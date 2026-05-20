# Module 5 — Detailed Exam Notes
## Code Optimization

---

## 🔑 TOPIC 1: Introduction to Code Optimization

**Definition to write in exam:**
> Code optimization is the process of transforming a program to make it run faster, use less memory, or consume fewer resources — without changing the output of the program. It is applied to the intermediate code or the final target code.

**Principle of Optimization:**
A transformation is valid only if:
1. It preserves the **meaning** of the program (same output for same input)
2. It is **profitable** — actually improves speed or size

**Two main categories:**

| Category | Applied to | Needs CPU knowledge? | Examples |
|---|---|---|---|
| **Machine-Independent** | Intermediate Code (TAC) | No | CSE, Dead Code, Constant Folding, Loop Optimization |
| **Machine-Dependent** | Final target code | Yes | Peephole, Register Allocation |

---

## 🔑 TOPIC 2: Sources of Optimization within Basic Blocks (Local Optimizations)

**These are the most common exam questions. Know all 5 with examples.**

### A. Common Subexpression Elimination (CSE)

**Definition:** If the same expression is computed more than once, and its operands haven't changed between computations, **replace the second computation with the result of the first**.

**Before CSE:**
```
t1 = a + b
t2 = a + b    ← same as t1!
t3 = t1 * t2
```

**After CSE:**
```
t1 = a + b
t3 = t1 * t1  ← t2 eliminated; t1 reused
```

**Key check:** Operands `a` and `b` must not be redefined between the two occurrences of `a + b`.

---

### B. Dead Code Elimination

**Definition:** If the result of a computation is **never used** in any subsequent instruction, that computation is "dead" and can be safely removed.

**Before:**
```
x = y + z     ← x is never read again after this
a = b + c
```

**After:**
```
a = b + c     ← x = y + z removed
```

**How to detect:** A variable `x` is dead after its assignment if no instruction that follows reads `x` before a new assignment to `x`.

---

### C. Constant Folding

**Definition:** If all operands of an expression are **constants**, evaluate the expression at **compile time** and replace it with the constant result.

**Before:**
```
t1 = 2 * 3.14
t2 = t1 + 0
t3 = t2 * 1
```

**After:**
```
t3 = 6.28     ← entire chain evaluated at compile time
```

**Rule:** `x * 0 = 0`, `x * 1 = x`, `x + 0 = x`, `x - x = 0`

---

### D. Constant Propagation

**Definition:** If a variable is assigned a constant value, **replace all subsequent uses** of that variable with the constant (as long as the variable isn't reassigned in between).

**Before:**
```
x = 5
y = x + 3
z = y * 2
```

**After propagation:**
```
x = 5
y = 5 + 3    ← x replaced with 5
z = 8 * 2    ← y replaced with 8 (after folding)
```

**After folding too:**
```
z = 16       ← fully collapsed
```

---

### E. Copy Propagation

**Definition:** After `x = y` (a copy), replace uses of `x` with `y`.

**Before:**
```
x = y
z = x + w
```

**After:**
```
z = y + w    ← x replaced by y; x=y line may now be dead and removed
```

---

## 🔑 TOPIC 3: Loops in Flow Graphs

**Why loops are the #1 optimization target:**
> Code inside a loop executes many times. Saving 1ms per iteration in a loop that runs 10 million times saves 10,000 seconds total. The same saving outside a loop saves only 1ms.

**Identifying Loops in a Flow Graph:**

**Step 1: Dominator:** Node A **dominates** node B if every path from the entry to B must go through A.
- Every node dominates itself.
- `dom(entry)` = {entry}

**Step 2: Back Edge:** An edge `n → h` is a **back edge** if `h` dominates `n` in the DFS spanning tree.
- Back edges indicate loops.

**Step 3: Natural Loop:** For back edge `n → h`:
- Header = h
- Body = all nodes that can reach n without going through h
- Natural loop = {h} ∪ body

**Step 4: Loop Properties to state in exam:**
1. A loop has exactly **one entry point** (the header).
2. At least one path exists back to the header from within the loop.
3. The header dominates all nodes in the loop.

---

## 🔑 TOPIC 4: Dead Code Elimination (Global)

Different from local dead code — this uses **data flow analysis** across the entire CFG.

**A variable `v` is live at point `p` if:**
> There exists a path from `p` to a use of `v` that has no definition of `v` along that path.

**Dead code:** An assignment `v = expr` where `v` is **not live** immediately after the assignment.

**Approach:** Run **Live Variable Analysis** (backward data flow) to compute which variables are live at each point. Then:
- If `v` is not live after `v = expr`, mark `v = expr` as dead code.
- Remove dead assignments.
- Repeat until no more can be removed.

---

## 🔑 TOPIC 5: Loop Optimization Techniques

**Mnemonic: "CS-SR-LU-IV"**
*(Code motion, Strength Reduction, Loop Unrolling, Induction Variable elimination)*

### A. Code Motion (Loop-Invariant Code Motion)

**Definition:** A computation is **loop-invariant** if none of its operands change during any iteration of the loop. Move it **out of the loop** to be computed only once.

**Before:**
```
i = 1
while (i ≤ n) {
    limit = n - 2           ← n doesn't change → loop-invariant
    A[i] = limit * i
    i = i + 1
}
```

**After code motion:**
```
limit = n - 2              ← moved outside the loop
i = 1
while (i ≤ n) {
    A[i] = limit * i
    i = i + 1
}
```

**Safety condition:** Code motion is safe only if the loop executes at least once (or the expression has no side effects).

---

### B. Strength Reduction

**Definition:** Replace an **expensive** operation (like multiplication) with a **cheaper** equivalent operation (like addition) that produces the same result.

**Before:**
```
for i = 1 to n:
    t = i * 4              ← multiplication every iteration
```

**After strength reduction:**
```
t = 4                      ← t = 1 * 4 = 4 initially
for i = 1 to n:
    t = t + 4              ← cheap addition instead of multiply
```

**Rule:** If `t = i * c` where `c` is loop-invariant and `i` is incremented by 1 each iteration, then `t` can be updated by adding `c` per iteration.

**Another example:**
```
t = i * i   →   t = t + 2*i + 1   (using (i+1)² = i² + 2i + 1)
```

---

### C. Loop Unrolling

**Definition:** Replicate the loop body **k times** inside the loop and reduce the number of iterations by factor k. Reduces loop overhead (condition check + branch).

**Before (100 iterations):**
```
for i = 0 to 99:
    A[i] = B[i] + C[i]
```

**After (unrolled by 4 — 25 iterations):**
```
for i = 0 to 96 step 4:
    A[i]   = B[i]   + C[i]
    A[i+1] = B[i+1] + C[i+1]
    A[i+2] = B[i+2] + C[i+2]
    A[i+3] = B[i+3] + C[i+3]
```

**Savings:** Loop condition checked only 25 times (75% fewer) + branch taken 25 times (75% fewer).

---

### D. Induction Variable Elimination

**Induction variable:** A variable that is incremented or decremented by a **constant** amount each loop iteration.

**Example:**
```
i = 0; j = 0
while (i < n) {
    a[j] = 0
    i = i + 1         ← i is the basic induction variable
    j = j + 4         ← j = 4*i is a derived induction variable
}
```

After strength reduction turns `j` into an independent induction variable, we can compare `j < 4*n` instead of `i < n`, and **eliminate `i` entirely**:

```
j = 0
while (j < 4*n) {
    a[j] = 0
    j = j + 4
}
```

---

## 🔑 TOPIC 6: Introduction to Global Data Flow Analysis

**Definition:**
> Global data flow analysis is a technique to collect information about how data values flow across the entire program's control flow graph. This information is used to safely apply global transformations.

**General Framework:**
- For each basic block B, compute **IN[B]** and **OUT[B]**
- These sets satisfy data flow equations solved iteratively until fixed point

**Two types of data flow problems:**

| Analysis | Direction | Equation style | Used for |
|---|---|---|---|
| **Forward** | Entry → Exit | OUT = gen ∪ (IN - kill) | Reaching Definitions, Constant Propagation |
| **Backward** | Exit → Entry | IN = use ∪ (OUT - def) | Live Variables, Available Expressions |

---

## 🔑 TOPIC 7: Live Variable Analysis (Backward Data Flow)

**Definition:**
> A variable `v` is **live** at point `p` if there is a path from `p` to a use of `v` with no definition of `v` along that path. Otherwise, it is **dead**.

**Use:** Safe register allocation (don't spill a dead variable) and dead code elimination.

**Direction:** Backward (we reason from future uses backward to current point).

**For each basic block B, compute:**
- `use[B]`: Variables used in B **before** any definition in B
- `def[B]`: Variables defined (assigned) in B

**Equations:**
```
IN[B]  = use[B] ∪ (OUT[B] - def[B])
OUT[B] = ∪ IN[S],  for all successors S of B
```

**Solving:** Start with `OUT[B] = {}` for all B. Apply equations iteratively until no set changes.

**Example:**
```
B1: d = 1; e = d + f     |  use[B1]={f},  def[B1]={d,e}
B2: d = d + g; e = d     |  use[B2]={d,g}, def[B2]={d,e}
B3: return e              |  use[B3]={e},  def[B3]={}

Flow: B1 → B2 → B3
```

**Iteration:**
- IN[B3] = {e}
- OUT[B2] = IN[B3] = {e}
- IN[B2] = {d,g} ∪ ({e} - {d,e}) = {d,g}
- OUT[B1] = IN[B2] = {d,g}
- IN[B1] = {f} ∪ ({d,g} - {d,e}) = {f,g}

**Result:** Variables `f` and `g` are live on entry to B1 — they must come from outside the code shown.

---

## 🔑 TOPIC 8: Reaching Definitions (Forward Data Flow)

**Definition:**
> A definition `d` of variable `x` (i.e., an assignment `x = ...`) **reaches** point `p` if there is a path from `d` to `p` along which `x` is not redefined.

**Use:** Constant propagation (if only one definition of `x` reaches a use, and it's a constant, replace `x` with the constant).

**Direction:** Forward.

**For each basic block B:**
- `gen[B]`: Definitions generated in B (the last definition of each variable in B)
- `kill[B]`: Definitions of the same variable from other blocks that B's definitions kill

**Equations:**
```
OUT[B] = gen[B] ∪ (IN[B] - kill[B])
IN[B]  = ∪ OUT[P],  for all predecessors P of B
```

**Solving:** Start with `IN[entry] = {}`, `OUT[B] = {}`. Apply forward iteratively.

---

## 🔑 TOPIC 9: Code Improving Transformations Summary

| Transformation | Type | What it does |
|---|---|---|
| **CSE** | Local/Global | Avoids recomputing same expression |
| **Dead Code Elimination** | Local/Global | Removes unused assignments |
| **Constant Folding** | Local | Evaluates constant expressions at compile time |
| **Constant Propagation** | Local/Global | Replaces variable with its constant value |
| **Copy Propagation** | Local/Global | Replaces `x` with `y` after `x = y` |
| **Code Motion** | Loop | Moves loop-invariant code outside loop |
| **Strength Reduction** | Loop | Replaces `*` with `+` in loops |
| **Loop Unrolling** | Loop | Replicates body, reduces iterations |
| **Induction Var. Elim.** | Loop | Removes redundant induction variables |
| **Peephole Opt.** | Machine-Dependent | Replaces inefficient instruction sequences |

---

## 🔑 TOPIC 10: Symbolic Debugging of Optimized Code

**The problem:**
After heavy optimization, the machine code looks very different from the source code:
- Loop unrolling expands the loop body
- Code motion moves statements out of their original location
- CSE merges computations
- Dead code is removed entirely

When a runtime error occurs, the debugger's reported line number in the optimized code may not match any meaningful source line.

**Solutions:**
1. **Debug Information:** Compiler generates a metadata table (DWARF on Linux, PDB on Windows) mapping each machine instruction to the original source file + line number. Debuggers use this to display meaningful location info.

2. **Debug Build:** Compile without optimizations (`-O0` in GCC). Code is slower but directly corresponds to source. Most developers debug this way.

3. **Selective Optimization:** Apply only safe-for-debugging optimizations (e.g., constant folding is fine; code motion is not).

---

## 📝 EXAM TIPS FOR MODULE 5

1. **Know all 5 local optimizations** (CSE, Dead Code, Constant Folding, Propagation, Copy) — give before/after examples
2. **Loop optimization question:** state all 4 (Code Motion, Strength Reduction, Unrolling, Induction Var) with examples
3. **Data flow analysis:** state equations clearly — partial credit if you write the right equations even with wrong numbers
4. **Back edges and natural loops:** draw the CFG, identify dominators, mark back edges
5. **Global vs local optimization:** global = across blocks (needs data flow); local = within one block
6. **Reaching definitions vs Live variables:** know the direction (forward vs backward) and which one is used for what
7. **Machine-independent vs machine-dependent:** always distinguish these — 1 mark guaranteed
