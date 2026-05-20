# CD Module 4 — Intermediate Code Generation & Code Generation

---

## 1. What is Intermediate Code Generation?

After semantic analysis, the compiler translates the source program into a **machine-independent intermediate representation (IR)**. This sits between the high-level source and the final machine code.

**Why use Intermediate Code?**
- Separates the compiler into a **language-independent front-end** and a **machine-independent back-end**.
- Enables reuse: the same IR can target different CPUs.
- Easier to apply optimizations on IR than on raw assembly.

**Most common IR: Three-Address Code (TAC)**
Each instruction has at most **one operator** and **three operands**:
```
result = operand1 op operand2
```
Temporaries (`t1`, `t2`, ...) hold intermediate values.

---

## 2. ICG for Declarations

When the compiler encounters a variable declaration, it:
1. Enters the variable into the **symbol table** with its type and size.
2. Allocates an **offset** in the current activation record (for stack-allocated variables).

**Example:**
```c
int a;        // offset 0, size 4 bytes
float b;      // offset 4, size 8 bytes
int c[10];    // offset 12, size 40 bytes
```

---

## 3. ICG for Assignment Statements

Complex arithmetic expressions are broken into a sequence of simple TAC instructions.

**Algorithm:** Perform a **post-order traversal** of the expression's syntax tree. At each node, generate a `temp = left op right` instruction.

**Example:** `a = (b + c) * (b - d)`
```
t1 = b + c
t2 = b - d
t3 = t1 * t2
a  = t3
```

**Unary minus:** `t1 = -b` → `t1 = uminus b`

**Array access:**
- `x = A[i]` → `t1 = 4 * i` (compute byte offset), `x = A[t1]`
- `A[i] = x` → `t1 = 4 * i`, `A[t1] = x`

---

## 4. ICG for Boolean Expressions

Boolean expressions appear in control flow (`if`, `while`) and are handled via **conditional jumps**, not by computing a true/false value.

**Short-circuit evaluation:**
- `A && B`: If A is false, B is not evaluated.
- `A || B`: If A is true, B is not evaluated.

**Example for `if (a < b && c > d) then S`:**
```
if a < b goto L1
goto LFALSE
L1: if c > d goto LTRUE
LFALSE: ...
LTRUE: [code for S]
```

**Relational expressions:** `a < b` generates:
```
if a < b goto Ltrue
goto Lfalse
```

---

## 5. ICG for Case (Switch) Statements

A `switch` statement is translated using a **jump table** for efficiency.

```c
switch (x) {
    case 1: S1; break;
    case 2: S2; break;
    case 3: S3; break;
    default: Sd;
}
```

**Generated code:**
```
t = x
if t == 1 goto L1
if t == 2 goto L2
if t == 3 goto L3
goto Ldefault
L1: [S1 code]; goto Lexit
L2: [S2 code]; goto Lexit
L3: [S3 code]; goto Lexit
Ldefault: [Sd code]
Lexit: ...
```

For dense case values, a **hash table or jump table** (array of addresses indexed by x) is more efficient — O(1) dispatch.

---

## 6. Back Patching

**Problem:** In a single-pass compiler, when generating a `goto L` instruction, the target label `L` may not be known yet (the code it points to hasn't been generated).

**Solution — Back Patching:**
1. Generate the jump instruction with a **blank/unresolved** target.
2. Keep a **list** of all unresolved jumps (called `truelist`, `falselist`, `nextlist`).
3. When the target label is finally created, go **back** through the list and fill in all the blanks.

**Key Functions:**
- `makelist(i)`: Creates a new list with one instruction `i` whose jump target is empty.
- `merge(p1, p2)`: Combines two lists into one.
- `backpatch(list, label)`: Goes through the list and fills in `label` as the target for all entries.

---

## 7. Procedure Calls — ICG

When a function is called, the compiler generates code to:
1. **Evaluate actual parameters** and push them onto the stack.
2. Execute a `CALL` instruction to transfer control and save the return address.
3. On return, retrieve the return value.

**TAC for `call f(a, b)`:**
```
param a
param b
call f, 2     (2 = number of parameters)
```

Inside function `f`, the activation record is set up automatically by the calling convention.

---

## 8. Issues in Code Generator Design

The code generator translates the optimized IR into **target machine instructions** (assembly or machine code).

**Key Issues:**

**1. Instruction Selection:**
Many target machines have multiple instructions that can perform the same operation. The code generator must choose the most efficient one.
```
i = i + 1  →  INC Ri  (better than ADD Ri, Ri, #1)
```

**2. Register Allocation:**
CPU registers are extremely fast but limited in number (typically 8–32). The code generator must decide which variables to keep in registers and which to spill to memory.
- **Register Assignment:** Choose which specific register holds a specific variable.
- **Register Allocation:** Decide which variables get registers at all.
- Solved optimally using **graph coloring** of interference graphs.

**3. Evaluation Order:**
The order in which sub-expressions are evaluated affects register usage. A good order minimizes the number of registers needed simultaneously.

---

## 9. Basic Blocks

A **Basic Block** is a maximal, straight-line sequence of statements with:
- Exactly **one entry point** (no jumps into the middle).
- Exactly **one exit point** (the last instruction, which may be a jump).

**Rules to identify leaders (first statements of basic blocks):**
1. The first statement is always a leader.
2. Any statement that is the **target** of a conditional or unconditional jump is a leader.
3. Any statement **immediately following** a jump is a leader.

Each basic block consists of all statements from one leader up to (not including) the next leader.

---

## 10. Flow Graphs

A **Control Flow Graph (CFG)** represents the possible execution paths through a program.

- **Nodes:** Each basic block is a node.
- **Edges:** A directed edge from block A to block B if execution can flow from A to B (via jump or fall-through).

**Uses of flow graphs:**
- Detecting loops for loop optimization
- Live variable analysis and reaching definitions
- Register allocation
- Dead code detection

---

## 11. DAG Representation of Basic Blocks

A **DAG (Directed Acyclic Graph)** represents the computations within a single basic block.

**Construction:**
- Each **operand** (variable or constant) starts as a leaf node.
- For each statement `x = y op z`:
  - Find or create nodes for `y` and `z`.
  - Check if a node for `y op z` already exists.
    - If YES: attach `x` as a label to the existing node (**Common Subexpression Elimination**).
    - If NO: create a new `op` node pointing to `y` and `z`; label it `x`.

**Benefits:**
- **CSE:** If `a + b` appears twice, it's one node in the DAG — computed once.
- **Dead code:** If a node has no label (result unused), it is dead and can be dropped.
- **Simpler code regeneration:** Walk the DAG to regenerate optimized TAC.

---

## 12. Peephole Optimization

**Peephole optimization** is applied directly to the final target code (or near-final IR). A small sliding window of 2–4 instructions is examined and inefficient sequences are replaced with better ones.

**Common Transformations:**

**1. Redundant Load/Store Elimination:**
```
STORE R1, x         ← store R1 into x
LOAD  x, R1         ← immediately load x back into R1 (useless!)
→ Delete the LOAD
```

**2. Unreachable Code Elimination:**
```
GOTO L5
x = y + 1        ← can never be executed; delete it
L5: ...
```

**3. Algebraic Simplification:**
```
x = x + 0   →  delete (adding 0 changes nothing)
x = x * 1   →  delete (multiplying by 1 changes nothing)
x = x * 2   →  x = x + x  (cheaper than multiply)
```

**4. Strength Reduction:**
```
MUL R1, 2   →  ADD R1, R1   (addition is faster than multiplication)
```

---

## 13. Generating Code from DAG

After constructing the DAG of a basic block:

1. **Determine output variables:** Any variable that is live on exit from the block is a needed output.
2. **Order the nodes:** Process nodes in an order that minimizes register spills (Sethi-Ullman numbering).
3. **Generate instructions:** For each interior node `y op z`, generate:
   - `t = y op z` if both y and z are in registers.
   - Load from memory if needed.
4. **Store back:** If a variable is needed after this block, generate a STORE to save it.
