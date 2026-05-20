# Module 4 — Detailed Exam Notes
## Intermediate Code Generation & Code Generation

---

## 🔑 TOPIC 1: What is Intermediate Code Generation?

**Definition to write in exam:**
> Intermediate Code Generation is the phase that translates the annotated parse tree (from semantic analysis) into a machine-independent representation called Intermediate Representation (IR) or Intermediate Code.

**Why intermediate code?**
- Separates the compiler into independent front-end and back-end
- For **M** source languages and **N** target machines: need only **M + N** modules (instead of M × N)
- Makes optimization easier — clean, simple operations
- Portable: same IR can target any CPU

**Most common IR: Three-Address Code (TAC)**
- Each instruction has at most **one operator** and **at most three addresses** (operands)
- Format: `result = operand1 op operand2`
- Temporary variables (`t1`, `t2`, ...) hold intermediate values

**Example:**
```
Source: a = b * c + b * c
TAC:
  t1 = b * c
  t2 = b * c
  t3 = t1 + t2
  a  = t3
```

---

## 🔑 TOPIC 2: ICG for Declarations

When the compiler sees a declaration, it:
1. Adds the identifier to the **symbol table** with its type
2. Computes the **size** in bytes
3. Assigns an **offset** in the activation record

**Size computation (standard):**
```
int    → 4 bytes
float  → 8 bytes
char   → 1 byte
array(n, T) → n × size(T) bytes
pointer(T)  → machine word size (4 or 8 bytes)
```

**TAC for array access:**
```
Source: x = A[i]
TAC:
  t1 = i * 4      (byte offset = index × element size)
  t2 = A[t1]      (indexed memory access)
  x  = t2

Source: A[i] = x
TAC:
  t1 = i * 4
  A[t1] = x
```

---

## 🔑 TOPIC 3: ICG for Assignment Statements

**Method:** Post-order traversal of the expression syntax tree.
At each interior node: create a new temporary, generate one TAC instruction.

**Step-by-step for `a = (b + c) * (b - c)`:**
1. Visit leaf `b` → return `b`
2. Visit leaf `c` → return `c`
3. Visit `+` node: `t1 = b + c`
4. Visit leaf `b` → return `b`
5. Visit leaf `c` → return `c`
6. Visit `-` node: `t2 = b - c`
7. Visit `*` node: `t3 = t1 * t2`
8. Assign: `a = t3`

**Final TAC:**
```
t1 = b + c
t2 = b - c
t3 = t1 * t2
a  = t3
```

**Other assignment operators:**
```
x = -y          →   t1 = uminus y;  x = t1
x = *p          →   t1 = *p;  x = t1  (pointer dereference)
*p = y          →   *p = y
x = &y          →   x = &y (address of y)
```

---

## 🔑 TOPIC 4: ICG for Boolean Expressions

**Key idea:** Boolean expressions in control flow (`if`, `while`) are NOT computed to produce a true/false value. Instead, they generate **conditional jumps**.

**Short-circuit evaluation:**
- `A && B`: if A is false, skip B (jump to false label immediately)
- `A || B`: if A is true, skip B (jump to true label immediately)

**TAC for `if (a < b) S1 else S2`:**
```
  if a < b goto L1
  goto L2
L1: [code for S1]
  goto L_end
L2: [code for S2]
L_end: ...
```

**TAC for `while (E) do S`:**
```
L1: [evaluate E — generates conditional jump]
  if E is false goto L2
  [code for S]
  goto L1
L2: ...
```

**TAC for `a < b && c > d`:**
```
  if a < b goto L1
  goto L_false
L1: if c > d goto L_true
  goto L_false
L_true: ...
L_false: ...
```

---

## 🔑 TOPIC 5: ICG for Case (Switch) Statements

**Naive approach (if-else chain):** Check each case one by one → O(n) time.

**Efficient approach (jump table):** Build an array of target addresses indexed by the case value → O(1) time.

**Example:**
```c
switch (x) {
  case 1: S1; break;
  case 2: S2; break;
  case 3: S3; break;
  default: Sd;
}
```

**TAC generation:**
```
  t = x
  if t < 1 goto Ldefault
  if t > 3 goto Ldefault
  index into JumpTable[t]
JumpTable: [L1, L2, L3]

L1: [S1]; goto Lexit
L2: [S2]; goto Lexit
L3: [S3]; goto Lexit
Ldefault: [Sd]
Lexit: ...
```

---

## 🔑 TOPIC 6: Back Patching — VERY COMMON EXAM TOPIC

**The Problem:**
In a single-pass compiler, when we generate a `goto L` instruction, the target label `L` may not exist yet (we haven't generated that code yet). We don't know the exact address.

**The Solution — Back Patching:**
1. Generate the jump instruction with a **blank** (unresolved) target.
2. Add this instruction's number to a **list**.
3. When the target is finally created, go **back** and fill in all blanks with the correct label.

**Key terms:**
- `truelist`: List of jumps that should jump to the TRUE label
- `falselist`: List of jumps that should jump to the FALSE label
- `nextlist`: List of jumps that should jump to the code AFTER the current statement

**Key functions:**
| Function | What it does |
|---|---|
| `makelist(i)` | Creates a new list with one entry: instruction i |
| `merge(p, q)` | Returns a new list combining lists p and q |
| `backpatch(list, label)` | Fills instruction `label`'s address into all blanks in `list` |

**Full Example — `if (a < b) then S1 else S2`:**

Step 1: Generate code for `a < b`:
```
100: if a < b goto ____     ← emit to paper, add 100 to truelist
101: goto ____              ← add 101 to falselist
```

Step 2: Start generating S1. Backpatch truelist {100} with 102:
```
100: if a < b goto 102     ← PATCHED!
102: [code for S1]
103: goto ____              ← add to nextlist
```

Step 3: Start generating S2. Backpatch falselist {101} with 104:
```
101: goto 104              ← PATCHED!
104: [code for S2]
```

Step 4: End of if-else. Backpatch nextlist {103} with 105 (next instruction):
```
103: goto 105              ← PATCHED!
105: ...
```

---

## 🔑 TOPIC 7: Procedure Calls — ICG

**What happens when we call `result = f(a, b, c)`:**

Compiler generates:
```
param a         ← push actual parameters
param b
param c
call f, 3       ← call function with 3 params
result = RV     ← retrieve return value
```

**Inside the called function `f`:**
- Accesses parameters via activation record offsets
- Stores return value in a designated location

**Activation record setup for call:**
```
[Caller's frame]
Return value location
Actual param n
...
Actual param 1
Return address   ← pushed by CALL instruction
[Callee's frame starts]
Saved registers
Local variables
```

---

## 🔑 TOPIC 8: Issues in Code Generator Design

**Three main issues (must write all three):**

**1. Instruction Selection:**
The code generator must pick the **best** machine instruction for each TAC operation.
```
t = i + 1
→ Could be: ADD Ri, Ri, #1    (generic add)
→ Better:   INC Ri             (single-cycle increment instruction)
```
The code generator prefers cheaper (faster) instructions when they exist.

**2. Register Allocation and Assignment:**
- CPU has limited registers (e.g., 8–32 in x86)
- **Register Allocation:** Decide which variables get to live in registers
- **Register Assignment:** Decide which specific register holds each variable
- Variables not in registers must be spilled to memory (slow)
- Solved optimally using **graph coloring** — an NP-hard problem in general

**3. Evaluation Order:**
- The order of sub-expression evaluation affects how many registers are needed simultaneously
- Better order → fewer temporary registers → fewer spills
- Example: computing the larger sub-tree first minimizes register use

---

## 🔑 TOPIC 9: Basic Blocks

**Definition:**
> A basic block is a maximal sequence of consecutive three-address instructions such that:
> 1. Control can only enter the block at the first instruction (one entry point).
> 2. Control leaves the block only at the last instruction (one exit point).

**Rules to find leaders (start of each basic block):**
1. First instruction of the program is always a leader
2. Any instruction that is the **target of a goto** is a leader
3. Any instruction that **immediately follows a conditional/unconditional goto** is a leader

**Each basic block = from one leader up to (not including) the next leader**

**Example:**
```
1:  t1 = a + b        ← Leader (rule 1)
2:  t2 = t1 * c
3:  if t2 > 0 goto 6
4:  t3 = t2 - 1       ← Leader (rule 3 — follows conditional)
5:  goto 7
6:  t4 = t2 + 1       ← Leader (rule 2 — target of goto on line 3)
7:  x = t3            ← Leader (rule 2 — target of goto on line 5)
```

**Basic blocks:**
- B1: {1, 2, 3}
- B2: {4, 5}
- B3: {6}
- B4: {7}

---

## 🔑 TOPIC 10: Flow Graphs

**Definition:**
> A flow graph (control flow graph/CFG) is a directed graph where nodes represent basic blocks and edges represent possible control flow between blocks.

**How to build:**
- Each node = one basic block
- Add edge A → B if:
  - Last instruction of A is `goto L` and B starts at L
  - A's last instruction is a conditional jump with B as the true or false branch
  - B immediately follows A (fall-through) and A doesn't end with unconditional goto

**Why flow graphs matter:**
- Identify loops (back edges in the graph)
- Perform data flow analysis (live variables, reaching definitions)
- Guide register allocation and code optimization

---

## 🔑 TOPIC 11: DAG Representation of Basic Blocks

**Definition:**
> A DAG (Directed Acyclic Graph) is a graph representation of a basic block where nodes represent values and interior nodes represent operations. Sharing a node means the value is reused (common subexpression).

**Construction Algorithm:**
For each statement `x = y op z` in the block:
1. Find or create leaf nodes for `y` and `z`
2. Look for existing node with operator `op`, left child `y`, right child `z`
   - If exists: attach `x` as an additional label to that node (**CSE!**)
   - If not: create new node, label it `x`
3. Delete old label `x` from any other node (if x was previously computed)

**Benefits of DAG:**
1. **Detects Common Subexpressions:** Same computation → same node → computed once
2. **Dead Code Elimination:** Nodes with no live output labels → remove them
3. **Simplified code generation:** Walk the DAG to regenerate optimal TAC

**Example — `t1=a+b; t2=a+b; t3=t1*t2`:**
```
     *    ← t3
    / \
  (+)   (+)   ← but SAME node! t1 and t2 point to same (+) node
  / \ 
 a   b
```
Generated code: `t1 = a + b; t3 = t1 * t1` (b+c computed only once)

---

## 🔑 TOPIC 12: Peephole Optimization

**Definition:**
> Peephole optimization is a local optimization technique that examines a small "window" of 2–4 consecutive target instructions and replaces inefficient instruction sequences with better equivalents.

**5 types of transformations (memorize all):**

**1. Redundant Load/Store Elimination:**
```
STORE R1, x    ← save R1 to memory variable x
LOAD  x, R1   ← immediately reload x back into R1 (USELESS!)
→ Delete the LOAD
```

**2. Unreachable Code Elimination:**
```
GOTO L5
t = t + 1     ← can NEVER execute (dead code)
L5: ...
→ Delete t = t + 1
```

**3. Flow-of-Control Optimization:**
```
GOTO L1
...
L1: GOTO L2
→ Replace with GOTO L2 directly
```

**4. Algebraic Simplification:**
```
x = x + 0   → delete (no-op)
x = x * 1   → delete (no-op)
x = x * 0   → x = 0
x = x * 2   → x = x + x
```

**5. Strength Reduction:**
```
MUL R1, 2   → ADD R1, R1     (addition faster than multiplication)
MUL R1, 8   → SHL R1, 3     (left-shift by 3 = multiply by 8, faster)
```

---

## 📝 EXAM TIPS FOR MODULE 4

1. **TAC generation:** Always show temporaries (`t1, t2, ...`) — never skip steps
2. **Back patching:** Draw BEFORE and AFTER state of each instruction; show lists clearly
3. **Basic blocks:** Circle/number each leader, then list which instructions form each block
4. **DAG diagrams:** Draw neatly — show shared nodes explicitly (CSE detection)
5. **Peephole:** Always give before + after pair with explanation
6. **Issues in code generator:** Write all 3 (Instruction Selection, Register Allocation, Evaluation Order) — missing one = losing marks
7. **Boolean TAC:** Use `goto Ltrue` / `goto Lfalse` style — don't compute true/false as a value
