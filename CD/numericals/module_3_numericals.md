# CD Module 3 — All Numericals & Solved Problems

---

## Topic 1: Type Checking — Identify Errors

### Problem 1: Identify and explain errors in the following:

```c
int x;
float y;
char c;
x = y + c;      // Line 1
y = x && c;     // Line 2
c = "hello";    // Line 3
```

**Analysis:**
- **Line 1:** `y + c` — float + char. Char is implicitly promoted to int, then int is implicitly promoted to float. `y + c` gives float. Assigning float to `x` (int) causes a **narrowing conversion** — implicit coercion (data may be lost). **Type warning** in most compilers.
- **Line 2:** `&&` is a boolean operator; result is int (0 or 1). Assigning int to float is allowed via coercion. But semantically, `c && x` mixes char and int in a boolean context — **allowed but poor practice**.
- **Line 3:** Assigning a string literal (char*) to a char variable — **type error**. Incompatible types.

---

### Problem 2: Trace the type checker for `a + b * c`

**Symbol table:**
```
a: int
b: float
c: int
```

**Expression tree and type propagation:**
```
           +
          / \
        a     *
              / \
             b   c
```

**Step 1:** `c` is `int` → leaf type = int
**Step 2:** `b` is `float` → leaf type = float
**Step 3:** `b * c` — float * int → coerce c to float → result type = **float**
**Step 4:** `a` is `int` → leaf type = int
**Step 5:** `a + (b*c)` — int + float → coerce a to float → result type = **float**

---

## Topic 2: Structural vs Name Equivalence

### Problem: Given type declarations, decide equivalence

```pascal
type Row = array[1..10] of int;
type Link = ↑Cell;
     Cell = record
       info: int;
       next: Link;
     end;
var a, b: Row;
    c: array[1..10] of int;
```

**Name Equivalence:**
- `a` and `b` are **equivalent** (same declared type name `Row`)
- `a` and `c` are **NOT equivalent** (`c` is a different type expression, even if structurally identical)

**Structural Equivalence:**
- `a` and `c` **are equivalent** (same structure: array of 10 ints)

---

## Topic 3: Storage Allocation — Activation Record Layout

### Problem: Draw the activation record for the following function:
```c
int result;
int factorial(int n) {
    int temp;
    if (n == 0) return 1;
    temp = factorial(n-1);
    return n * temp;
}
```

**Activation Record Layout (stack grows downward):**
```
+---------------------------+
| Return Value (result)     |  ← Caller's area
+---------------------------+
| Actual Parameter (n)      |  ← Caller pushes
+---------------------------+
| Return Address            |  ← Saved by call
+---------------------------+
| Saved Registers / Control |
+---------------------------+
| Local Variable: temp      |  ← Callee allocates
+---------------------------+
```

**For `factorial(3)`, the stack grows with 3 activation records:**
```
factorial(3): n=3, temp=?
factorial(2): n=2, temp=?
factorial(1): n=1, temp=?
factorial(0): n=0 → returns 1
```
Each return unwinds one frame.

---

## Topic 4: Parameter Passing

### Problem 1: Trace call-by-value vs call-by-reference

```c
void swap(int a, int b) {
    int t = a;
    a = b;
    b = t;
}
int x = 5, y = 10;
swap(x, y);
```

**Call by Value:**
- Inside `swap`: a=5, b=10 (copies). After swap: a=10, b=5.
- Original x and y: **unchanged**. x=5, y=10. ❌ Swap doesn't work.

**Call by Reference (using pointers in C):**
```c
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}
swap(&x, &y);
```
- `a` points to x, `b` points to y. After swap: **x=10, y=5**. ✓ Works.

---

### Problem 2: Call-by-Name trace

```
Program:
  x = 1
  procedure p(y: name) is
    begin
      y := y + 1
      print(x)
    end
  call p(x)
```

**In Call-by-Name**, `y` is textually replaced by `x`:
- `y := y + 1` becomes `x := x + 1`
- After call: x = 1 + 1 = 2
- `print(x)` prints **2**

(Compare with Call-by-Value: y=1, y becomes 2, x is unchanged, prints **1**)

---

## Topic 5: Symbol Table — Hash Table

### Problem: Insert identifiers into a hash table of size 7

**Identifiers:** `a, b, c, d, e, f, g`
**Hash function:** `h(id) = ASCII(first_char) mod 7`

| Identifier | ASCII | h = ASCII mod 7 | Slot |
|---|---|---|---|
| `a` | 97 | 97 mod 7 = 6 | 6 |
| `b` | 98 | 98 mod 7 = 0 | 0 |
| `c` | 99 | 99 mod 7 = 1 | 1 |
| `d` | 100 | 100 mod 7 = 2 | 2 |
| `e` | 101 | 101 mod 7 = 3 | 3 |
| `f` | 102 | 102 mod 7 = 4 | 4 |
| `g` | 103 | 103 mod 7 = 5 | 5 |

No collisions here. If `h` was also 6 for another identifier, we'd use **chaining** (linked list at slot 6).

---

## Topic 6: Type Conversion — Implicit vs Explicit

### Problem: Trace the type of each expression

```c
int i = 3;
float f = 2.5;
double d;
char c = 'A';  // ASCII 65
```

| Expression | Types | Coercion Applied | Result Type |
|---|---|---|---|
| `i + f` | int + float | i → float | float (5.5) |
| `i + c` | int + char | c → int (65) | int (68) |
| `d = i + f` | float → double | | double |
| `(int) f` | explicit cast | truncate | int (2) |
| `f + c` | float + char | c → int → float | float (67.5) |
| `i / 2` | int / int | none | int (1) — integer division! |
| `i / 2.0` | int / double | i → double | double (1.5) |
