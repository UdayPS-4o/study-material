# Module 3 — Detailed Exam Notes
## Type Checking & Runtime Environment

---

## 🔑 TOPIC 1: Type System

**Definition to write in exam:**
> A type system is a collection of rules for assigning type expressions to various parts of a program. It is used to ensure that programs are used in a manner consistent with their intended semantics.

**What a type checker does:**
- Traverses the parse/AST bottom-up
- At each node, checks that operand types are compatible with the operator
- Reports errors when types violate the rules

**Type Expressions:**
| Type | Example | Notes |
|---|---|---|
| Basic types | `int`, `float`, `char`, `bool` | Primitive |
| Array | `array(10, int)` | 10-element int array |
| Pointer | `pointer(float)` | Points to a float |
| Function | `int × float → bool` | Takes int and float, returns bool |
| Record | `record { x: int, y: float }` | Struct |

---

## 🔑 TOPIC 2: Specification of Simple Type Checker

**How to write this in exam:**

A **simple type checker** works on the annotated parse tree using rules tied to grammar productions.

**Rules example:**
```
Production: E → E1 + E2
Rule:
  if E1.type == int AND E2.type == int → E.type = int
  if E1.type == float AND E2.type == float → E.type = float
  if one is int and other is float → coerce int to float; E.type = float
  else → type_error
```

**For array access `E → E1[E2]`:**
```
  if E2.type == int AND E1.type == array(s, t) → E.type = t
  else → type_error
```

**For function call `E → E1(E2)`:**
```
  if E1.type == s → t AND E2.type == s → E.type = t
  else → type_error
```

---

## 🔑 TOPIC 3: Equivalence of Expression Types

**Two approaches — must know both:**

**1. Structural Equivalence:**
> Two types are equivalent if they have the same structure.

```
type A = record { x: int; y: float; }
type B = record { x: int; y: float; }
```
Under structural equivalence: A ≡ B ✓ (same fields, same types)

**Algorithm (structural equivalence check):**
```
sequiv(s, t):
  if s and t are same basic type → return true
  if s = array(n, s1) and t = array(n, t1) → return sequiv(s1, t1)
  if s = pointer(s1) and t = pointer(t1) → return sequiv(s1, t1)
  return false
```

**2. Name Equivalence:**
> Two types are equivalent only if they have the same declared type name.

Using name equivalence: A ≠ B (different names!), even if their structures are identical.

| | Structural | Name |
|---|---|---|
| Strictness | Lenient | Strict |
| Speed | Can be slow (recursive check) | Fast (just compare names) |
| Languages | C (for most types) | Pascal, Ada |

---

## 🔑 TOPIC 4: Type Conversion

**Two types — always define both in exam:**

**Implicit Conversion (Coercion):**
> Automatically performed by the compiler when two types are compatible.

```c
int i = 5;
float f = 2.0;
float result = i + f;   // i is automatically promoted to 5.0
```

Type widening hierarchy (safe path):
```
char → short → int → long → float → double
```

**Explicit Conversion (Casting):**
> Programmer forces the conversion. May lose data.

```c
double d = 9.99;
int x = (int) d;    // x = 9 (truncates — data lost)
```

**Type conversion in widening vs narrowing:**
- **Widening:** int → float (safe, no data loss) → Usually implicit
- **Narrowing:** float → int (unsafe, may lose precision) → Requires explicit cast

---

## 🔑 TOPIC 5: Overloading of Functions and Operators

**Definition:**
> Overloading is using the same name (function or operator) with different meanings depending on the types of the arguments/operands.

**Operator Overloading:**
```
5 + 3       → int addition (result: 8)
5.0 + 3.0   → float addition (result: 8.0)
"ab" + "cd" → string concatenation (result: "abcd")
```
The compiler looks at the **types of the operands** to decide which version to call.

**Function Overloading:**
```c
int    area(int side)           { return side * side; }
float  area(float radius)       { return 3.14 * radius * radius; }
```
Calling `area(5)` → uses the int version.
Calling `area(2.5)` → uses the float version.

**Resolution at compile time:** The compiler resolves overloading by examining the types of arguments. This is called **static dispatch**.

---

## 🔑 TOPIC 6: Polymorphic Functions

**Definition:**
> A polymorphic function is one that can operate on values of different types. Unlike overloading (which has multiple definitions), a polymorphic function has ONE definition that works for ANY type.

**Example (using generics):**
```java
<T> void swap(T[] arr, int i, int j) {
    T temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
```
This works for any type T — integers, strings, objects.

**Comparison:**
| Feature | Overloading | Polymorphism |
|---|---|---|
| Number of definitions | Multiple | One |
| Type resolution | Compile-time | Can be compile or runtime |
| Also called | Ad-hoc polymorphism | Parametric polymorphism |

---

## 🔑 TOPIC 7: Runtime Environment

**Definition:**
> The runtime environment (RTE) is the collection of structures maintained at runtime to support the execution of a program. It includes memory organization, function call mechanism, and interaction with the OS.

**Memory Layout of a Running Program (draw this diagram in exam):**
```
High Address ↑
┌─────────────────────┐
│        Stack        │  ← grows ↓ (function calls, local vars)
├─────────────────────┤
│          ↕          │  free space
├─────────────────────┤
│        Heap         │  ← grows ↑ (malloc, new)
├─────────────────────┤
│  Static/Global Data │  ← fixed size, known at compile time
├─────────────────────┤
│   Code (Text)       │  ← read-only machine instructions
└─────────────────────┘
Low Address ↓
```

---

## 🔑 TOPIC 8: Storage Allocation Strategies

**Three strategies — memorize with mnemonic "SSH"**
*(Static, Stack, Heap)*

**1. Static Allocation:**
- Memory allocated at **compile time**, never changes during execution
- Used for: global variables, static local variables, string constants
- Size and address of every object is known before program runs
- **Cannot support recursion** (only one copy of each variable exists)
- **Cannot support dynamic data structures**

**2. Stack Allocation:**
- Memory allocated at **function call time**, freed at function return
- Uses LIFO (Last In, First Out) call stack
- Each call creates an **Activation Record** containing:
  - Return address
  - Parameters
  - Local variables
  - Saved registers
  - Pointer to previous activation record
- **Supports recursion** — each recursive call gets its own frame
- All stack allocation/deallocation is O(1) (just move the stack pointer)

**3. Heap Allocation:**
- Memory allocated and freed at **arbitrary times** by programmer
- Programmer manages: `malloc`/`free` in C, `new`/GC in Java
- Supports dynamically-sized structures (linked lists, trees)
- Slower: must search for free block, manage fragmentation
- **Memory leaks** occur if not freed properly

| Strategy | When allocated | When freed | Recursion | Dynamic structures |
|---|---|---|---|---|
| Static | Compile time | Program end | ✗ No | ✗ No |
| Stack | Function call | Function return | ✓ Yes | ✗ No |
| Heap | Programmer request | Programmer free (or GC) | ✓ Yes | ✓ Yes |

---

## 🔑 TOPIC 9: Activation Records (Stack Frames)

**What goes inside an activation record (draw this in exam):**
```
┌─────────────────────────┐
│ Return Value            │  ← space for function's return value
├─────────────────────────┤
│ Actual Parameters       │  ← pushed by caller
├─────────────────────────┤
│ Return Address          │  ← address to return to after call
├─────────────────────────┤
│ Control Link            │  ← pointer to previous activation record
├─────────────────────────┤
│ Access Link             │  ← pointer for non-local variable access
├─────────────────────────┤
│ Saved Registers         │  ← registers to restore on return
├─────────────────────────┤
│ Local Variables         │  ← space for local vars
├─────────────────────────┤
│ Temporaries             │  ← compiler-generated temporaries
└─────────────────────────┘
```

---

## 🔑 TOPIC 10: Parameter Passing

**Three mechanisms — always write all three with definitions + examples:**

**1. Call by Value:**
- A **copy** of the actual argument is made and passed to the function
- Changes inside the function do NOT affect the original
- Most common mechanism (C, Java for primitives)

```c
void f(int x) { x = 100; }  // modifies copy only
int a = 5;
f(a);
// a is still 5 after the call
```

**2. Call by Reference:**
- The **memory address** of the actual argument is passed
- Function directly reads/writes the original variable
- Changes persist after the function returns

```c
void f(int *x) { *x = 100; }   // modifies original
int a = 5;
f(&a);
// a is now 100
```

**3. Call by Name:**
- The **text (expression)** of the argument is substituted into the function
- Re-evaluated every time the parameter is accessed
- Used in Algol 60; rarely used today
- Can produce surprising results

**Example — Call by Name:**
If `f(y)` where the parameter is `x`:
```
call f(a + b):
    x := x + 1
```
Becomes (substituting `a+b` for `x`):
```
    a+b := (a+b) + 1
```
(Weird and powerful — especially with arrays like `A[i]`)

---

## 🔑 TOPIC 11: Symbol Table

**Definition:**
> A symbol table is a data structure used by the compiler to keep track of each declared identifier (variable, function, class) along with its associated attributes such as type, scope, and memory location.

**Attributes stored for each identifier:**
- Name (the identifier string)
- Type (int, float, char, function type)
- Scope (which block it belongs to)
- Memory address/offset
- For functions: number of params, param types, return type

**Data Structures for Symbol Table:**

**1. Linear List:**
- Store identifiers in an array or linked list
- Insert: O(1) at end; Search: O(n) — too slow for large programs

**2. Binary Search Tree:**
- Sorted by identifier name
- Search: O(log n) average — but O(n) if unbalanced

**3. Hash Table (most widely used):**
- Hash function converts name to an array index
- Search, Insert: O(1) average
- Collisions handled by chaining (linked list at each slot) or open addressing

**Scope Management:**
- **Stack of symbol tables:** One table per active scope
- Entering a block: push a new table
- Exiting a block: pop the table (all local identifiers are removed)
- Searching: start from top of stack (innermost scope) and work outward

---

## 🔑 TOPIC 12: Error Detection and Recovery

**Types of errors:**

| Error Type | Phase | Example |
|---|---|---|
| Lexical | Lexical Analysis | `@name` — invalid character `@` |
| Syntax | Syntax Analysis | `if x then` — missing `(` |
| Semantic | Semantic Analysis | `int x = "hello"` — type mismatch |
| Logical | (Runtime) | `while (true)` — infinite loop (not caught by compiler) |

**Error Recovery Strategies:**

**1. Panic-Mode Recovery:**
- Simplest strategy
- On error: **discard input tokens** one by one until a **synchronization token** is found (e.g., `;`, `}`, `end`)
- Then resume parsing from there
- Advantage: Simple. Disadvantage: May skip code and miss errors.

**2. Phrase-Level Recovery:**
- Make a **local repair** to the token stream (insert, delete, or replace a token)
- Continue parsing immediately
- Example: Insert a missing `;` after detecting one is absent

**3. Error Productions:**
- Add special grammar rules that recognize common mistakes
- Parser detects the error gracefully and reports a helpful message
- Example: Add rule for common typo like `if x then` (missing parentheses)

---

## 📝 EXAM TIPS FOR MODULE 3

1. **Type system question:** Always mention basic + constructed types with examples
2. **Structural vs Name equivalence:** Draw two type declarations and apply BOTH methods
3. **Implicit vs Explicit:** `int + float = float` (widening) is implicit; `(int)float` is explicit
4. **Memory layout diagram:** Always draw this — it scores marks
5. **Activation record:** Draw the frame structure with all 8 fields labeled
6. **Parameter passing:** Give example code for each of the 3 methods showing the difference
7. **Symbol table:** Always mention hash table as the most common implementation
8. **Error recovery:** Panic-mode is easiest — explain discard + synchronization token
