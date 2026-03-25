# CD Module 3 — Exam Answer Notes

---

## Q: What is a Type System? Explain the specification of a simple type checker.

A **type system** is a set of rules that assigns a type (such as integer, float, or boolean) to every construct in a program — including literals, variables, expressions, and functions. The compiler uses these rules to verify that operations are only applied to values of the correct types, catching semantic errors before the program runs.

A **simple type checker** is a component of the semantic analysis phase. It works by traversing the parse tree (or syntax tree) produced by the parser. At each node, it:
1. Determines the types of child nodes (operands).
2. Applies the type rules for the operator at that node.
3. Returns the resulting type.

For example, for the expression `a + b`, the type checker verifies that `a` and `b` are both numeric types. If they are, it assigns the result type as `float` or `int` depending on the rules. If `a` is a string and `b` is an integer, a **type error** is reported.

**Type expressions** are used to describe types formally. Basic type expressions include `int`, `float`, `char`. Constructed types include `array(10, int)` meaning an array of 10 integers, and `pointer(int)` for a pointer to an integer.

---

## Q: Explain Equivalence of Expression Types — Structural vs. Name Equivalence.

When the type checker compares two types, it needs a rule to decide if they are the "same". There are two approaches:

**1. Structural Equivalence:**
Two types are equivalent if they have the exact same structure. For example, the following two records `{age: int, salary: float}` and `{age: int, salary: float}` are structurally equivalent even if they were declared under different names. This approach is more flexible and permissive.

**2. Name Equivalence:**
Two types are equivalent only if they have the exact same declared type name. Even if their structures are identical, different names mean different types. This is stricter and used in languages like Pascal. For instance:
```
type A = record { x: int }
type B = record { x: int }
```
Under name equivalence, `A` and `B` are different types. Under structural equivalence, they are the same.

---

## Q: What is Type Conversion? Explain implicit and explicit conversion with examples.

Type conversion refers to changing the data type of a value from one type to another.

**Implicit Conversion (Coercion):**
The compiler automatically converts one type to another when it is needed and safe to do so. This usually happens in arithmetic expressions where the compiler promotes a smaller type to a larger one to avoid data loss.

Example: In the statement `float result = 5 + 2.5;`, the integer `5` is automatically coerced to `5.0` by the compiler before the addition is performed. The result is `7.5`.

**Explicit Conversion (Casting):**
The programmer manually forces a type conversion using a cast operator. This can result in data loss if the target type is smaller.

Example: `int x = (int) 3.99;` — The programmer explicitly casts the float `3.99` to an integer. The result is `3` because the decimal part is truncated.

---

## Q: What is overloading of functions? What are polymorphic functions?

**Overloading:**
Overloading means using the same function name or operator for different operations depending on the types of the arguments. The compiler resolves overloading at compile-time by examining the types of the arguments.

Example: The `+` operator is overloaded in most languages — it performs integer addition for `int + int` and string concatenation for `string + string`. The function `print()` might be overloaded to accept either an integer or a string argument.

**Polymorphic Functions:**
A polymorphic function is one that can operate on arguments of multiple different types without needing to be rewritten for each type. Unlike overloading (which requires distinct definitions for each type), a polymorphic function has a single definition that works generically.

Example: A `swap(a, b)` function that can swap two integers, two floats, or two strings without being redefined for each. This is achieved through generics or templates (e.g., `template<T>` in C++).

The key difference: **Overloading** has multiple definitions resolved at compile time. **Polymorphism** has one definition that works across types, sometimes resolved at runtime.

---

## Q: Explain Runtime Environment. Describe the storage organization of a running program.

The **runtime environment (RTE)** is the memory structure and system support that exists during a program's execution. It is managed by the operating system and the compiled program together. The compiler generates code that sets up and uses this environment.

When a program is loaded into memory, the OS allocates a large block of memory that is divided into the following sections:

1. **Code (Text) Segment:** Contains the compiled machine instructions. This section is read-only during execution to prevent accidental modification.

2. **Static / Global Data Segment:** Stores all global variables and static variables. The size of this segment is determined at compile time and does not change during execution.

3. **Stack Segment:** Grows and shrinks dynamically as functions are called and return. It follows a Last-In-First-Out (LIFO) structure. Each function call creates an **activation record** (also called a stack frame) that stores: local variables, parameters, the return address, and saved register values. The stack grows downward (from high addresses to low) in most architectures.

4. **Heap Segment:** Used for dynamic memory allocation requested at runtime (e.g., via `malloc` in C or `new` in Java). The heap grows upward. The programmer is responsible for freeing heap memory (or the garbage collector does it automatically in managed languages).

---

## Q: What are Storage Allocation Strategies?

Storage allocation is the mechanism by which the compiler assigns memory to program variables and data structures.

**1. Static Allocation:**
Memory is allocated before the program runs and remains fixed throughout the execution. Global variables and static local variables use static allocation. The compiler knows the exact address and size at compile time. Advantage: No overhead during runtime. Disadvantage: Cannot support recursion because each variable has only one fixed location, and recursive calls would overwrite each other.

**2. Stack Allocation:**
Memory is allocated dynamically on the call stack each time a function is invoked, and freed when the function returns. Local variables and parameters are stack-allocated. This is the most common form of allocation for function-level data. Crucially, it supports recursion perfectly: each recursive call gets its own fresh activation record on the stack with its own copy of local variables.

**3. Heap Allocation:**
Memory is allocated and freed at arbitrary times during program execution, controlled by the programmer or garbage collector. Heap allocation supports complex data structures like linked lists, trees, and objects whose size isn't known until runtime. It is slower than stack allocation due to the overhead of finding free memory and managing fragmentation.

---

## Q: Explain Parameter Passing Mechanisms.

When a function is called, arguments must be communicated to the function. There are three main mechanisms:

**1. Call by Value:**
A copy of the argument's value is passed to the function. Any changes made to the parameter inside the function do not affect the original variable in the caller. This is the most common and safest method.
Example: `f(x)` where x=5 — if `f` changes the parameter to 10, `x` in the caller remains 5.

**2. Call by Reference:**
The memory address (reference) of the argument is passed. The function can directly read and modify the original variable. Changes persist after the function returns.
Example: In C, `f(&x)` passes the address of `x`. Any modification inside `f` changes the original `x`.

**3. Call by Name:**
The actual argument expression (as text) replaces the formal parameter wherever it appears inside the function. The expression is re-evaluated every time it is accessed. This is used in some functional languages and macro systems and can produce non-intuitive results.

---

## Q: What is a Symbol Table? What data structures are used to implement it?

A **symbol table** is a data structure maintained by the compiler to store information about every identifier (variable, function, class) it encounters. For each identifier, it typically records: its name, data type, scope, memory location, and number of parameters (for functions).

It is built during the lexical and syntax analysis phases and used throughout compilation — especially during semantic analysis and code generation.

**Data Structures Used:**

**1. Linear List (Array or Linked List):**
Identifiers are stored sequentially. Searching requires scanning the entire list — O(n) time. This is too slow for large programs but simple to implement.

**2. Binary Search Tree (BST):**
Identifiers are stored in sorted order. Search, insert, and delete operations take O(log n) time on a balanced tree. However, an unbalanced BST can degrade to O(n).

**3. Hash Table:**
This is the most widely used structure. A hash function converts the identifier name to an index in an array. Lookups, insertions, and deletions all operate in O(1) average time. Collisions (two names mapping to the same index) are handled via chaining or open addressing.

---

## Q: Explain Error Detection and Recovery in compilers.

During compilation, two main types of errors are detected:
- **Syntax Errors:** Violations of the grammar rules (e.g., missing semicolon).
- **Semantic Errors:** Logically incorrect usage of constructs (e.g., adding a string to an integer).

A good compiler should not stop at the **first** error. It should report as many errors as possible in a single pass, which requires **error recovery**.

**Panic-Mode Recovery:**
When an error is detected, the parser discards input tokens one by one until it finds a designated "synchronization token" (like a semicolon `;` or closing brace `}`). It then continues parsing from that point. This is simple and prevents cascading false errors.

**Phrase-Level Recovery:**
The parser performs a local correction on the input token stream — for example, inserting a missing semicolon or replacing a wrong token. This is more sophisticated and allows parsing to continue smoothly.
