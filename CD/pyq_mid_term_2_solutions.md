# Mid Term Test II - Compiler Design (Detailed Solutions)

## QUESTION 1
### Q.1 (A) Discuss Run time environment and important elements of runtime environment. (5 marks)
*   **Run Time Environment (RTE)**: RTE is a state of the memory provided by the operating system for a program to execute. The compiler translates the source code, but the RTE handles memory allocation, execution, and environment interaction while the program structurally runs.
*   **Important Elements of RTE**:
    1.  **Code (Text) Area**: Stores the actual compiled machine code instructions reliably.
    2.  **Static/Global Data Area**: Holds global variables and static variables whose sizes are completely fixed and known right at compile time.
    3.  **Heap Area**: Used explicitly for Dynamic memory allocation while the program securely runs (e.g., using `malloc()` in C or `new` in Java). It grows logically upwards (or downwards) towards the stack.
    4.  **Stack Area**: Used safely for managing active function calls. It uses a LIFO structure. Each function invocation creates an **Activation Record** (or stack frame) containing local variables, return addresses, and parameters. It heavily supports recursion.

### Q.1 (B) Explain the various data structures used for implementing the Symbol table. (5 marks)
A **Symbol Table** is a crucial compiler data structure that continuously tracks program identifiers (variables, functions) and their attributes (scope, data type, size).
*   **Data Structures Used**:
    1.  **Linear List (Array/Linked List)**:
        *   Identifiers are seamlessly added sequentially.
        *   *Advantage*: Very simple to structurally implement.
        *   *Disadvantage*: Searching takes $O(N)$ time, making it exceptionally slow for large applications.
    2.  **Binary Search Trees (BST)**:
        *   Identifiers are inserted hierarchically cleanly based on alphabetical order.
        *   *Advantage*: Searching and insertion operate safely in $O(\log N)$ expected time.
        *   *Disadvantage*: Can strictly degrade natively to $O(N)$ if the structural tree becomes unbalanced.
    3.  **Hash Tables**:
        *   The most distinctly prevalent implementation. The identifier strictly produces a dynamic hash index to logically map directly into an array slot.
        *   *Advantage*: Searching normally explicitly operates in exceptionally fast $O(1)$ constant time.
        *   *Disadvantage*: Safely requires explicit structural collision resolution strategies natively (Chaining/Open Addressing).

---
### OR

### Q.1 (A) Explain the different storage allocation strategies? (5 marks)

Storage allocation strategies define how and when memory is assigned to variables and data structures during a program's execution. There are **three main strategies**:

#### 1. Static Storage Allocation
*   Memory is allocated **at compile time**, before the program begins execution.
*   The size and location of every variable is fixed and known to the compiler.
*   Memory remains allocated for the **entire duration** of the program.
*   **Characteristics**:
    *   No runtime overhead for allocation/deallocation.
    *   Does **not** support recursion, since each function can only have one instance of its local variables.
    *   Does **not** support dynamic data structures (e.g., linked lists, trees).
*   **Example**: Global variables and static local variables in C (`static int count = 0;`).

#### 2. Stack (Dynamic) Storage Allocation
*   Memory is allocated **at runtime** using a **stack (LIFO)** structure.
*   Each time a function is called, a new **Activation Record (Stack Frame)** is pushed onto the runtime stack. It contains:
    *   Local variables
    *   Parameters passed to the function
    *   Return address
    *   Saved registers / control links
*   When the function returns, its stack frame is **popped and deallocated** automatically.
*   **Characteristics**:
    *   Fully supports **recursion** — each recursive call gets its own independent frame.
    *   Memory is automatically reclaimed; no programmer intervention needed.
    *   Cannot support data whose size is unknown at compile time (e.g., dynamic arrays).
*   **Example**: All local variables inside a function in C/Java are stack-allocated.

#### 3. Heap Storage Allocation
*   Memory is allocated **at runtime from a pool called the Heap**, and is managed explicitly by the programmer (or a garbage collector).
*   The programmer requests memory when needed and is responsible for freeing it (in languages like C).
*   **Characteristics**:
    *   Supports **dynamic data structures** of arbitrary and variable size (e.g., linked lists, trees, objects).
    *   Fully supports objects whose size is not known at compile time.
    *   Can lead to **memory leaks** (forgetting to free) or **dangling pointers** (using after free) if managed incorrectly.
    *   Slower than stack allocation because it requires finding a free block.
*   **Example**: `malloc()` / `free()` in C; `new` / `delete` in C++; `new` with garbage collection in Java.

#### Comparison Summary

| Feature | Static | Stack | Heap |
|---|---|---|---|
| Allocation time | Compile time | Runtime (on call) | Runtime (on request) |
| Supports recursion | No | Yes | Yes |
| Supports dynamic size | No | No | Yes |
| Deallocation | Never | Automatic | Manual / GC |
| Speed | Fastest | Fast | Slowest |

### Q.1 (B) Differentiate implicit and explicit type conversion with example? (5 marks)
*   **Implicit Conversion (Coercion)**: Automatic conversion performed by the compiler without programmer intervention.
    *   *Example*: `float a = 5;` (The integer 5 is auto-converted to a float 5.0).
*   **Explicit Conversion (Casting)**: User-defined conversion forcefully written in the code.
    *   *Example*: `int b = (int) 3.14;` (The float 3.14 is manually cast to integer 3).

---
## QUESTION 2
### Q.2 (A) Explain Back Patching with Example. (5 marks)
*   **Back Patching**: Given that intermediate code is typically generated in one pass, the compiler often needs to generate a `GOTO` jump instruction before the target address is known (e.g., jumping out of a loop). The compiler leaves the address blank temporarily and maintains a list of these blank jumps. Once the target instruction is finally generated and its address becomes known, the compiler goes *back* and *patches* the blank addresses.
*   *Example*:
    ```
    10: if False goto __  // Target unknown
    11: ...
    12: 100: ...          // Target found! Backpatch address 100 into line 10.
    ```

### Q.2 (B) Explain Quadruple, Triple and Indirect Triple with suitable example. (5 marks)
Three-Address Code (TAC) can be implemented using these structures:
*   **Quadruples**: Uses 4 fields: `(Operator, Operand 1, Operand 2, Result)`.
*   **Triples**: Uses 3 fields: `(Operator, Operand 1, Operand 2)`. Instead of storing the result in a temporary variable, it refers to the line number/index where the operation was performed.
*   **Indirect Triples**: An array of pointers to Triples. It allows the compiler to easily reorder operations during optimization without changing the actual Triples, just moving the pointers.

---
### OR

### Q.2 (A) Construct Three Address Code for the following expression: (a + b) + (c + d) - (a * b) + (e - f) (5 marks)
*   `t1 = a + b`
*   `t2 = c + d`
*   `t3 = t1 + t2`
*   `t4 = a * b`
*   `t5 = t3 - t4`
*   `t6 = e - f`
*   `t7 = t5 + t6`

### Q.2 (B) Define the role of DAG in optimization with example? (5 marks)
*   **DAG (Directed Acyclic Graph)**: A DAG is a graph representation of a basic block. It displays operands as leaves and operators as interior nodes.
*   **Role in Optimization**: It easily identifies **Common Subexpressions**. If `t1 = a + b` and later `t2 = a + b` exist in the same block, a DAG will automatically route `t2` to the existing `t1` node, proving that `a + b` only needs to be calculated once.

---
## QUESTION 3
### Q.3 (A) Write the advantages and disadvantages of code optimization? (5 marks)
*   **Advantages**:
    1.  Execution is significantly faster.
    2.  Consumes less physical memory structure (RAM).
    3.  Improves target hardware utilization natively.
*   **Disadvantages**:
    1.  Drastically increases total compile time inherently.
    2.  Makes debugging heavily difficult (optimized code rarely matches source accurately).
    3.  Aggressive optimizations can introduce subtle logical bugs.

### Q.3 (B) Explain Peep-hole optimization with example. (5 marks)
*   **Peephole Optimization**: A localized optimization pass reviewing a very small "sliding window" (peephole) of target machine instructions.
*   **Example (Redundant Store/Load)**:
    *   *Before*: `STORE R1, A` -> `LOAD A, R1`
    *   *After*: `STORE R1, A` (The redundant LOAD is securely deleted).

---
### OR

### Q.3 (A) What is machine independent and machine dependent code optimization? (5 marks)
*   **Machine Independent Optimization**: Focuses solely on intermediate representations (TAC). It involves logic transformations explicitly like loop unrolling, constant folding, or dead code elimination uniquely without any knowledge of the final target CPU heavily.
*   **Machine Dependent Optimization**: Focuses perfectly on the specific hardware architecture cleanly. It effectively utilizes physical CPU registers actively, memory addressing modes flawlessly, and deeply leverages physical processing pipelines optimally gracefully.

### Q.3 (B) Explain loop optimization with example. (5 marks)
*   Loop optimization explicitly accelerates structures running heavily iteratively proactively.
*   **Example (Code Motion / Frequency Reduction)**:
    *   *Before*: `while (i < x) { a = y + z; i++; }` (calculates `y+z` strictly every pass cleanly).
    *   *After Code Motion*: `temp = y + z; while (i < x) { a = temp; i++; }` (Calculates only cleanly once).
