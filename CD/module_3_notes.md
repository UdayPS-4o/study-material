# Module 3: Type Checking & Runtime Environment

## 1. Type Checking Basics
*   **What it is:** Checking if variables are used correctly according to their data types.
*   **Purpose:** To catch logical errors before the program runs (e.g., stopping you from adding a string to an integer).
*   **Type System:** The set of rules used by the compiler to assign expected types to expressions.
*   **Simple Type Checker Specification:** A logical component inside the semantic analyzer that enforces the type system rules.

## 2. Equivalence of Expressions & Types
How does the compiler know if two types are the "same"?
*   **Structural Equivalence:** Two types are equal if they have the exact same underlying structure (e.g., both are randomly sized arrays of integers).
*   **Name Equivalence:** Two types are equal ONLY if they share the exact same declared name. (Stricter than structural).

## 3. Type Conversions
Changing a variable from one data type to another.
*   **Implicit (Coercion):** Automatic. Done by the compiler safely. 
    * *Example:* Adding an `int (5)` to a `float (2.5)` automatically makes the integer a `float (5.0)`.
*   **Explicit (Casting):** Manual. Forced by the programmer. 
    * *Example:* `(int) 3.14` drops the decimal and makes it `3`.

## 4. Advanced Typing Concepts
*   **Overloading:** When the same symbol/function name has multiple meanings based on context.
    * *Example:* The `+` operator does **addition** for numbers (`5+5`), but does **concatenation** for strings (`"a"+"b"`).
*   **Polymorphic Functions:** Highly flexible functions that can accept arguments of multiple different data types during runtime.

---

## 5. Runtime Environment (RTE)
The state of memory provided by the Operating System while your program is actively running.

## 6. Storage Organization
When a program runs, the OS gives it a block of memory divided into 4 main areas:
1.  **Code (Text) Area:** Stores the actual compiled machine code instructions.
2.  **Static/Global Area:** Stores global variables. Their size is fixed at compile time.
3.  **Heap Area:** Used for *dynamic* memory allocation (e.g., `malloc` or `new`). Grows downwards.
4.  **Stack Area:** Used for active function calls and local variables. Grows upwards.

## 7. Storage Allocation Strategies
How the compiler plans to use memory:
*   **Static Allocation:** Memory is locked in at compile time. *Drawback:* Recursion is impossible.
*   **Stack Allocation:** Memory is given to functions as they are called (using a LIFO stack). *Benefit:* Perfectly supports recursion.
*   **Heap Allocation:** Memory is requested dynamically by the programmer while the program runs.

## 8. Parameter Passing
How you send data into a function:
*   **Call by Value:** Passes a *copy* of the variable. Changes inside the function don't affect the original variable.
*   **Call by Reference:** Passes the *memory address* of the variable. Changes inside the function *do* change the original variable.
*   **Call by Name:** The actual text of the argument replaces the parameter inside the function. (Rarely used today).

## 9. Symbol Table
*   **What it is:** A database used by the compiler to remember variable names, function names, scopes, and data types.
*   **Data Structures Used:** Usually implemented via fast **Hash Tables** (for O(1) searches) or **Binary Search Trees**.

## 10. Error Detection & Recovery
*   **Goal:** The compiler must find errors (Syntax, Semantic) but shouldn't just crash on the first error.
*   **Recovery Example (Panic-Mode):** When the compiler hits an error, it drops tokens until it finds a safe synchronization token (like a semicolon `;`), then continues parsing to find the rest of the errors efficiently.
