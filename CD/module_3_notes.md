# CD Module 3 — Type Checking & Runtime Environment

---

## 1. What is Type Checking?

**Type Checking** is a phase in the compiler (part of semantic analysis) that verifies every operation in the program is applied to operands of the correct types.

It enforces the language's **type system** — the set of rules that assigns types to expressions and variables and determines which operations are valid.

**Two kinds:**
- **Static type checking:** Done at compile time. Catches type errors before the program runs. (C, Java, C++)
- **Dynamic type checking:** Done at runtime. (Python, JavaScript)

---

## 2. Type System

A **type system** is a collection of rules for assigning **type expressions** to program constructs.

**Basic types:** `int`, `float`, `char`, `bool`, `void`

**Constructed types:**
- `array(n, T)` — array of n elements of type T
- `pointer(T)` — pointer to type T
- `record{field, type; ...}` — struct/record
- `T1 → T2` — function from type T1 to type T2

**Example:**
- `int a[10]` → type is `array(10, int)`
- `float (*f)(int)` → type is `pointer(int → float)`

---

## 3. Specification of a Simple Type Checker

A type checker walks the **parse/syntax tree** bottom-up. At each node, it:
1. Gets the types of children (operands)
2. Applies the type rule for the operator at that node
3. Returns the resulting type
4. Reports an error if types don't match

**Type rules example:**
```
If E1 has type int and E2 has type int:
    E1 + E2 has type int

If E1 has type float and E2 has type int:
    E1 + E2 has type float  (int is coerced to float)

If E1 has type string and E2 has type int:
    E1 + E2 → TYPE ERROR
```

---

## 4. Equivalence of Expression Types

When comparing two types, the compiler must define what "same type" means.

**1. Structural Equivalence:**
Two types are equivalent if they have the **same structure**, regardless of their names.
```
type A = array[1..5] of int;
type B = array[1..5] of int;
```
Under structural equivalence, A and B are the **same type**.

**2. Name Equivalence:**
Two types are equivalent **only if they have the same declared name**.
```
type A = array[1..5] of int;
type B = array[1..5] of int;
```
Under name equivalence, A and B are **different types** — they have different names.

| | Structural | Name |
|---|---|---|
| Strictness | Less strict | More strict |
| Used in | C (structs) | Pascal, Ada |
| Anonymous types | Treated as equal if structure matches | Each anonymous type is unique |

---

## 5. Type Conversion

**Implicit Conversion (Coercion):**
The compiler automatically converts one type to a compatible type without programmer intervention.
- Usually happens when types are "compatible" (e.g., int → float)
- Can cause silent data loss (int → char)

```c
int i = 5;
float f = 2.3;
float result = i + f;  // i is implicitly coerced to 5.0
```

**Explicit Conversion (Casting):**
Programmer manually forces a type conversion.
- Can cause truncation or overflow
- Programmer takes responsibility for the conversion

```c
double d = 9.7;
int x = (int) d;   // x = 9 (decimal truncated)
```

---

## 6. Overloading of Functions and Operators

**Overloading** means using the **same name** for multiple operations that work on different types.

**Operator Overloading:**
```
5 + 3       → integer addition
5.0 + 3.0   → floating-point addition
"abc" + "d" → string concatenation
```
The `+` symbol has different meanings determined by the **types of its operands**. The type checker resolves overloading at compile time.

**Function Overloading:**
```c
int max(int a, int b)
float max(float a, float b)
```
The compiler selects the correct version based on the argument types.

---

## 7. Polymorphic Functions

A **polymorphic function** has a **single definition** that works correctly for arguments of many types.

**Parametric Polymorphism (Generics):**
```java
<T> T identity(T x) { return x; }
```
This works for any type T — int, string, float, etc.

**Difference from Overloading:**
- Overloading: **multiple** definitions, selected at compile time by argument types
- Polymorphism: **one** definition, works generically across types

---

## 8. Runtime Environment (RTE)

The **Runtime Environment** is the memory structure provided by the OS while a program executes. It supports:
- Memory allocation for variables
- Function call mechanism (stack)
- Dynamic memory management (heap)

---

## 9. Storage Organization

When a program is loaded, the OS allocates memory broken into these segments:

```
High Address
+---------------------------+
|         Stack             |  ← grows downward (function calls, locals)
+---------------------------+
|           ↕               |  ← free space
+---------------------------+
|          Heap             |  ← grows upward (dynamic memory: malloc/new)
+---------------------------+
|     Static / Global Data  |  ← fixed size, known at compile time
+---------------------------+
|     Code (Text) Segment   |  ← compiled machine instructions (read-only)
Low Address
```

---

## 10. Storage Allocation Strategies

**1. Static Allocation:**
- Memory is assigned at **compile time** and remains fixed throughout execution.
- Used for: global variables, static local variables, string literals.
- Size and location of every variable is known before the program runs.
- **Drawback:** Cannot support recursion (only one copy of each variable).

**2. Stack Allocation:**
- Memory is allocated at **runtime** when a function is called, freed when it returns.
- Uses a LIFO (Last In First Out) call stack.
- Each function call creates an **Activation Record (Stack Frame)** containing:
  - Local variables
  - Parameters
  - Return address
  - Saved registers
- **Supports recursion:** Each call gets its own frame.

**3. Heap Allocation:**
- Memory is allocated and freed at **arbitrary times** during execution.
- Controlled by programmer (`malloc`/`free` in C, `new`/`delete` in C++/Java GC).
- Used for: dynamically sized data structures (linked lists, trees, objects).
- Slower than stack due to fragmentation and bookkeeping overhead.

---

## 11. Parameter Passing

How data is communicated from caller to callee when a function is called.

**1. Call by Value:**
- A **copy** of the argument is passed.
- Changes inside the function do NOT affect the original variable.
- Safe but creates copies (expensive for large objects).

**2. Call by Reference:**
- The **memory address** of the argument is passed.
- Changes inside the function **directly modify** the original variable.
- Used in C (`&`), C++ references, Fortran.

**3. Call by Name:**
- The **textual expression** of the argument is substituted wherever the parameter appears.
- The expression is re-evaluated every time it is accessed.
- Rare in modern languages; used in Algol 60.

| Method | Copies data? | Changes original? | Cost |
|---|---|---|---|
| By Value | Yes | No | Copy overhead |
| By Reference | No (passes address) | Yes | Minimal |
| By Name | No | Depends | Re-evaluation overhead |

---

## 12. Dynamic Storage Allocation

Covers how the heap manages memory.

**Problems:**
- **Fragmentation:** Small free blocks scattered across the heap that can't satisfy large requests.
- **Memory Leaks:** Allocated memory that is never freed.
- **Dangling Pointers:** Pointers to freed memory.

**Allocation Strategies:**
- **First Fit:** Allocate the first free block that is large enough. Fast.
- **Best Fit:** Allocate the smallest free block that is large enough. Reduces waste but slower.
- **Worst Fit:** Allocate the largest free block. Leaves larger remaining fragments.

**Garbage Collection** (in managed languages like Java): Automatically finds and frees memory that is no longer reachable by the program.

---

## 13. Symbol Table

A **symbol table** is a compiler data structure (like a dictionary) that stores information about every identifier in the program.

**Information stored:**
- Name of the identifier
- Data type
- Scope (which block it belongs to)
- Memory address or offset
- For functions: number and types of parameters, return type

**Data Structures Used:**
| Structure | Search | Insert | Notes |
|---|---|---|---|
| Linear list | O(n) | O(1) | Simple; slow for large programs |
| BST | O(log n) avg | O(log n) | Can become unbalanced |
| Hash Table | O(1) avg | O(1) | Most widely used |

**Scope Management:**
The compiler maintains a **stack of symbol tables** — one per active scope. When entering a new block, a new table is pushed. When exiting, it is popped.

---

## 14. Error Detection & Recovery

**Types of errors detected:**
- **Lexical errors:** Invalid characters (detected by scanner)
- **Syntax errors:** Grammar violations (detected by parser)
- **Semantic errors:** Type mismatches, undeclared variables (detected by semantic analyzer)

**Error Recovery Strategies:**

**1. Panic-Mode Recovery:**
When an error is found, the parser discards input tokens until it hits a "synchronization token" (like `;` or `}`), then continues.
- Simple to implement.
- May skip large chunks of valid code, missing later errors.

**2. Phrase-Level Recovery:**
The parser makes a small local repair (insert a missing `;`, replace a wrong token) and continues.
- More precise; catches more errors per compilation.

**3. Error Productions:**
Add extra grammar rules specifically to match common mistakes. The parser can then recognize and report the error with a helpful message.
