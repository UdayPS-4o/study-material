# Module 5: Code Optimization

## 1. Introduction to Code Optimization
The process of modifying code to make it run faster and use less memory, **without changing the actual output**.

### Two Main Categories:
1.  **Machine Independent Optimization:** 
    * Done on the Intermediate Code (Three-Address Code).
    * Independent of the CPU.
    * *Examples:* Loop unrolling, dead-code elimination.
2.  **Machine Dependent Optimization:** 
    * Done tightly on the final target code.
    * Depends on hardware features like CPU registers and memory addresses.
    * *Example:* Peephole optimization.

## 2. Sources of Optimization (Basic Blocks)
Techniques used to clean up straight-line code chunks:
*   **Common Sub-expression Elimination:** Removing duplicated math. If `x = a + b` and `y = a + b`, change it to `y = x`.
*   **Dead Code Elimination:** Deleting code that will never run (e.g., code placed immediately after a `return` statement).
*   **Constant Folding:** If an equation has all constants (e.g., `A = 2 * 3.14`), the compiler solves it at compile time (`A = 6.28`) so the CPU doesn't have to do it at runtime.

## 3. Loop Optimization
Loops run many times, so optimizing them gives massive speed boosts.
*   **Code Motion (Frequency Reduction):** Moving calculations that don't change outside the loop.
    * *Bad:* `while (i < 10) { a = x + y; i++; }`
    * *Good:* `temp = x + y; while (i < 10) { a = temp; i++; }`
*   **Strength Reduction:** Replacing an expensive math operation with a cheaper one.
    * *Example:* Changing `A * 2` (multiplication is extremely slow) to `A + A` (addition is extremely fast).
*   **Loop Unrolling:** Copying the body of the loop multiple times to reduce the overhead of checking the `while` condition repeatedly.

## 4. Global Data Flow Analysis
*   **What it is:** Analyzing how data moves across the *entire* program's Control Flow Graph (spanning multiple basic blocks).
*   **Goal:** To answer questions like: "Is this variable ever used again?" or "Did this variable's value change before it reaches block B?".
*   **Equations Used:** It uses `IN(B)` and `OUT(B)` mathematical sets for each block to calculate if a variable is "Live" (needed later) or "Dead" (can be deleted).

## 5. Symbolic Debugging of Optimized Code
*   **The Problem:** Once a compiler heavily optimizes code, variables are deleted, loops are unrolled, and lines are skipped. If the program crashes, the debugger struggles to point out which line in the *original source code* caused the error.
*   **The Solution:** Symbolic debuggers maintain complex, hidden metadata tables. These tables constantly map the highly distorted, optimized machine code back to the original source code lines so the programmer can understand error messages.
