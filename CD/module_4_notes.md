# Module 4: Intermediate Code Generation (ICG) & Code Generation

## 1. Intermediate Code Generation
Translating source code into a machine-independent format (like Three-Address Code) before making final machine code.

### Key Operations Handled
*   **Declarations:** Allocating space for declared variables in intermediate representation.
*   **Assignment Statements:** Breaking down complex math into simple steps.
    * *Source:* `A = (-B) + (C * D)`
    * *ICG:* `t1 = -B`, `t2 = C * D`, `A = t1 + t2`
*   **Boolean Expressions:** Using jump logic instead of calculating true/false directly (short-circuit evaluation).
*   **Case Statements:** Translating `switch/case` into efficient jump tables instead of long `if-else` chains.

### Important Techniques
*   **Back Patching:**
    * *Problem:* When generating intermediate code for loops or `if` statements, the compiler doesn't know the exact line number to jump to yet.
    * *Solution:* It generates a blank jump command (`GOTO ____`). Later, when the destination address is finally calculated, it goes back and "patches" the blank space with the correct address.
*   **Procedure Calls:**
    * Setting up intermediate code to push parameters onto the stack before issuing a `CALL` command.

---

## 2. Final Code Generation
Taking the intermediate code and turning it into actual CPU-specific assembly/machine code.

## 3. Issues in the Design of a Code Generator
1.  **Instruction Selection:** Picking the fastest physical CPU instruction for the job (e.g., using `INC R1` instead of `ADD R1, 1`).
2.  **Register Allocation:** CPU registers are super fast but limited in number. Deciding which variables get to stay in registers vs. main memory is critical.
3.  **Evaluation Order:** Deciding which part of an equation to compute first to minimize the number of temporary registers needed.

## 4. Basic Blocks and Flow Graphs
*   **Basic Block:** A straight sequence of code. It has exactly one entry point and one exit point. There are no jumps *inside* the block.
*   **Flow Graph:** A visual map. The nodes are the Basic Blocks, and the arrows (edges) show the logical jumps between them (like loops and if-statements).

## 5. DAG Representation of Basic Blocks
*   **DAG (Directed Acyclic Graph):** A visual tree used inside a *single* basic block.
*   **Why use it?** It easily identifies **Common Sub-expressions**. If you calculate `A + B` twice in the same block, the DAG shows it as a single shared node, proving you only need to calculate it once, saving processing time.

## 6. Peephole Optimization
*   **What it is:** A very quick, localized optimization technique on the final machine code.
*   **How it works:** The compiler looks at a tiny "sliding window" (a peephole) of 2 to 4 instructions at a time and tries to simplify them.
*   **Example (Redundant Load/Store):**
    * *Before:* `STORE R1, A` -> `LOAD A, R1` (The load is useless since `A` is already in `R1`).
    * *After:* `STORE R1, A` (The compiler intelligently deletes the `LOAD` instruction).
