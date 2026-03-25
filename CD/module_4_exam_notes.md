# CD Module 4 — Exam Answer Notes

---

## Q: What is Intermediate Code Generation? Why is it needed?

Intermediate Code Generation is the phase in a compiler that translates the high-level source language abstract syntax tree into a language-independent, lower-level representation called **intermediate code**. This sits between the front-end (parsing + semantic analysis) and the back-end (final code generation for a specific CPU).

**Why it is needed:**
- It separates the compiler into two independent halves: a front-end for each source language and a back-end for each target machine.
- This means a compiler for 3 languages targeting 3 machines needs only 3+3=6 modules (instead of 3×3=9 if languages and machines were coupled directly).
- Intermediate code is easy to optimize — many powerful transformations can be applied before generating final code.

The most common form of intermediate code is **Three-Address Code (TAC)**, where each instruction has at most one operator and three operands: `result = operand1 op operand2`.

---

## Q: Explain Intermediate Code Generation for different constructs.

**1. Declarations:**
When the compiler encounters a variable declaration like `int x`, it makes an entry in the symbol table for `x` with type `int` and allocates the appropriate amount of memory offset in the current activation record.

**2. Assignment Statements:**
Complex arithmetic expressions are broken into a sequence of simple TAC instructions, each using a new temporary variable.
```
Source: A = -B + C * D
TAC:
  t1 = -B
  t2 = C * D
  t3 = t1 + t2
  A  = t3
```

**3. Boolean Expressions:**
Boolean expressions in control flow (like `if (a < b)`) are typically not evaluated to produce a true/false value. Instead, the compiler generates **conditional jump** instructions:
```
if a < b goto L1
goto L2
```
This "short-circuit" approach avoids evaluating the right side of `AND` or `OR` if the result is already determined from the left side.

**4. Case (Switch) Statements:**
A switch statement is translated into a jump table — an array where each entry holds the address of the code for one case. At runtime, the switch variable is used as an index into this table, making the jump O(1) instead of a series of if-else checks.

---

## Q: What is Back Patching? Explain with an example.

**Back Patching** is a technique used during intermediate code generation in a single-pass compiler to handle jump instructions whose target addresses are not yet known at the time the jump is generated.

**The Problem:**
When generating code for an `if` statement, the compiler must generate a `goto` (jump) to the code after the `else` block. But that code hasn't been generated yet, so the address is unknown.

**The Solution — Back Patching:**
1. Generate the `goto ___` instruction with a blank (unresolved) target address.
2. Add this instruction's label to a **list of incomplete jumps** (called `truelist` or `falselist`).
3. Later, when the target is finally generated and its address is known, go back through the list and fill in the blank addresses.

**Example:**
```
Source: if (a < b) then P else Q

Generated code:
100: if a < b goto ___    ← address unknown; added to truelist
101: goto ___              ← address unknown; added to falselist
102: [code for P]
103: goto END
104: [code for Q]          ← address 104 is patched into line 100
105: END                   ← address 105 is patched into line 101
```
Once line 104 is generated, we backpatch line 100's blank with 104. Once line 105 is known, we backpatch line 101's blank with 105.

---

## Q: Explain Quadruples, Triples, and Indirect Triples with examples.

Three-address code can be stored in different data structures internally.

**Quadruples:**
A table with 4 fields: `(op, arg1, arg2, result)`. The result is always stored in an explicit temporary variable.
```
(*, B, C, t1)     →  t1 = B * C
(+, A, t1, t2)    →  t2 = A + t1
```
Advantage: Easy to rearrange instructions. Disadvantage: Many temporary variables are needed.

**Triples:**
Only 3 fields: `(op, arg1, arg2)`. There is no separate result field — the result is implicitly the position (index) of the instruction in the table.
```
(0): (*, B, C)
(1): (+, A, (0))   →  arg2 refers to the result of instruction 0
```
Advantage: Saves space by eliminating explicit temporaries. Disadvantage: Hard to rearrange (indices would break).

**Indirect Triples:**
Adds a separate **pointer array** that lists which triples to execute and in what order. The triples themselves are unchanged; only the pointer array is reordered during optimization.
```
Pointer Array: [35, 36, 37]
(35): (*, B, C)
(36): (+, A, (35))
(37): (=, x, (36))
```
Advantage: Rearranging the pointer array is easy and doesn't break the triple indices.

---

## Q: What is a Basic Block? How do you identify Basic Blocks in a program?

A **Basic Block** is a maximal sequence of consecutive statements with exactly one entry point (at the top) and one exit point (at the bottom), with no jumps into the middle and no jumps out except at the end.

**Rules for identifying leaders (start of a basic block):**
1. The first statement of the program is a leader.
2. Any statement that is the target of a conditional or unconditional goto is a leader.
3. Any statement immediately following a goto is a leader.

Each basic block consists of all statements from one leader up to (but not including) the next leader.

**Example:**
```
1: t1 = a + b       ← Leader (start)
2: t2 = t1 * c
3: if t2 > 0 goto 6
4: t3 = t2 - 1      ← Leader (follows goto)
5: goto 7
6: t3 = t2 + 1      ← Leader (target of goto)
7: x = t3           ← Leader (follows goto)
```
Basic blocks: {1,2,3}, {4,5}, {6}, {7}

---

## Q: What is a Flow Graph? How is it built?

A **Control Flow Graph (CFG)** or simply a **Flow Graph** is a directed graph where:
- Each **node** represents a basic block.
- Each **directed edge** represents a possible flow of control from one block to another.

Edges are added:
- From block A to block B if the last instruction of A is a `goto B`.
- From block A to the next block if A ends with a conditional jump (two edges: one for the true branch, one for false/fall-through).

Flow graphs are essential for understanding program structure. They are used extensively in register allocation, loop detection, code optimization, and data flow analysis.

---

## Q: What is a DAG? How does it help in optimization?

A **DAG (Directed Acyclic Graph)** is a graph representation of computation within a single basic block. It is like an expression tree, but shared sub-expressions point to the same node instead of being duplicated.

**Construction:**
- Operands (variables and constants) are leaf nodes.
- Each operation is an interior node, identified by its operator and the nodes for its operands.
- If the same computation already exists as a node, it is **reused** rather than creating a duplicate.

**How it helps in optimization:**
1. **Common Subexpression Elimination:** If `a + b` appears twice in a block, the DAG has only one node for it. The compiler evaluates it once and reuses the result.
2. **Dead Code Elimination:** If a node's result is never used by any other node or stored into a variable, it is a dead computation and can be removed.
3. **Simplified Code Recreation:** The final optimized TAC is regenerated from the DAG with fewer redundant instructions.

---

## Q: Explain Peephole Optimization with examples.

**Peephole Optimization** is a local optimization technique applied to the final target code (or near-final intermediate code). The compiler examines a small sliding window of 2–4 consecutive instructions at a time and replaces inefficient sequences with faster equivalents.

**Common transformations:**

**1. Redundant Load/Store Elimination:**
```
Before: STORE R1, A
        LOAD  A, R1   ← Useless; A is already in R1
After:  STORE R1, A
```

**2. Algebraic Simplification:**
```
Before: MUL R1, 1     ← Multiplying by 1 is useless
After:  (deleted)
```

**3. Dead Code Elimination:**
```
Before: GOTO L2        ← Unconditional jump
        x = x + 1     ← This can NEVER execute; it's dead
After:  GOTO L2
```

**4. Strength Reduction:**
```
Before: MUL R1, 2     ← Multiplication is slow
After:  ADD R1, R1    ← Addition is faster; equivalent result
```
