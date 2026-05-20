# Paper 2 — Complete Solutions
## B.Tech Compiler Design | IPS Academy | Mid Sem I | JAN-JUNE 2026 | 20 Marks

---

# ══════════════════════════════════════════════════════
# Q1(i) — MCQ: Operator Grammar Condition  [1 Mark]
# ══════════════════════════════════════════════════════

## Question:
Grammar: `S → ABC`, `S → a`, `S → aB`
Which production violates the condition of operator grammar?
(a) 1 only  (b) 3 only  (c) Only 2  (d) 1, 2 and 3

## Answer: **(a) 1 only**

### Explanation:
**Operator Grammar** requires that **no production has two adjacent non-terminals** on the right-hand side (and no ε productions).

| Production | RHS | Check | Result |
|---|---|---|---|
| 1. S → ABC | A, B, C (3 non-terminals — A and B are adjacent, B and C are adjacent) | **VIOLATES** ❌ |
| 2. S → a | only terminal `a` | Valid ✓ |
| 3. S → aB | terminal `a` then non-terminal `B` — not adjacent non-terminals | Valid ✓ |

Only **production 1** violates the condition.

---

# ══════════════════════════════════════════════════════
# Q1(ii) — Define Syntax Directed Translation (SDD)  [1 Mark]
# ══════════════════════════════════════════════════════

**Syntax Directed Definition (SDD)** is a generalization of a Context-Free Grammar in which each grammar symbol is associated with a set of **attributes**, and each production rule is associated with **semantic rules** that compute the values of those attributes.

- **Synthesized attributes:** Computed from children's attributes (flow upward)
- **Inherited attributes:** Computed from parent's or sibling's attributes (flow downward)

**Example:**
```
Production: E → E1 + T
Semantic Rule: E.val = E1.val + T.val    ← synthesized attribute
```

---

# ══════════════════════════════════════════════════════
# Q1(iii) — SLR Parsing: S→CC, C→aC|d  [3 Marks]
# ══════════════════════════════════════════════════════

## Grammar (Augmented):
```
0: S' → S
1: S  → CC
2: C  → aC
3: C  → d
```

---

## Step 1: Canonical Collection of LR(0) Items

**I0 = closure({S' → •S})**
```
S' → •S
S  → •CC
C  → •aC
C  → •d
```

**goto(I0, S) = I1:**
```
S' → S•          ← ACCEPT state
```

**goto(I0, C) = I2:**
```
S → C•C
C → •aC
C → •d
```

**goto(I0, a) = I3:**
```
C → a•C
C → •aC
C → •d
```

**goto(I0, d) = I4:**
```
C → d•           ← REDUCE by C→d
```

**goto(I2, C) = I5:**
```
S → CC•          ← REDUCE by S→CC
```

**goto(I2, a) = I3** (same as I3)
**goto(I2, d) = I4** (same as I4)

**goto(I3, C) = I6:**
```
C → aC•          ← REDUCE by C→aC
```

**goto(I3, a) = I3** (loops back)
**goto(I3, d) = I4** (same as I4)

---

## Step 2: FOLLOW Sets

```
FOLLOW(S') = {$}
FOLLOW(S)  = {$}
FOLLOW(C):
  From S → C•C : FIRST(C) = {a, d} → add {a, d}
  From S → CC• : FOLLOW(S) = {$}   → add {$}
  FOLLOW(C) = {a, d, $}
```

---

## Step 3: SLR(1) Parsing Table

| State | **a** | **d** | **$** | **S** | **C** |
|---|---|---|---|---|---|
| **0** | s3 | s4 | — | 1 | 2 |
| **1** | — | — | acc | — | — |
| **2** | s3 | s4 | — | — | 5 |
| **3** | s3 | s4 | — | — | 6 |
| **4** | r3 | r3 | r3 | — | — |
| **5** | — | — | r1 | — | — |
| **6** | r2 | r2 | r2 | — | — |

*s = shift, r = reduce, acc = accept. r1=S→CC, r2=C→aC, r3=C→d*

**No conflicts → Grammar is SLR(1) ✓**

---

## Verification — Parse "aad":
| Stack | Input | Action |
|---|---|---|
| 0 | aad$ | M[0,a]=s3 → shift |
| 0 3 | ad$ | M[3,a]=s3 → shift |
| 0 3 3 | d$ | M[3,d]=s4 → shift |
| 0 3 3 4 | $ | r3: C→d → pop 1, goto(3,C)=6 |
| 0 3 3 6 | $ | r2: C→aC → pop 2, goto(3,C)=6 |
| 0 3 6 | $ | r2: C→aC → pop 2, goto(0,C)=2 |
| 0 2 | $ | M[2,$]=— ? wait...

Let me fix: After "aad", the string represents S→CC where first C="aa...d"... 

Actually "aad" parses as: C="aad"? No. S→CC. C can derive "d" or "ad" or "aad". So "aad" = C("aa...") C("d")... but we need TWO C's.

Valid string: "ad" (first C="a"? No...) 

Actually: C→aC means C derives strings of form a^n d. So C→d, C→aad? No:
C→aC→a(aC)→aa(C)→aad

So valid strings for S=CC: "dd", "adc? no" → "d" + "d" = "dd", "ad"+"d"="add", "d"+"ad"="dad", "ad"+"ad"="adad"

Parse "add":
| Stack | Input | Action |
|---|---|---|
| 0 | add$ | s3 |
| 0 3 | dd$ | s4 |
| 0 3 4 | d$ | r3: C→d, pop 1, goto(3,C)=6 |
| 0 3 6 | d$ | r2: C→aC, pop 2, goto(0,C)=2 |
| 0 2 | d$ | s4 |
| 0 2 4 | $ | r3: C→d, pop 1, goto(2,C)=5 |
| 0 2 5 | $ | r1: S→CC, pop 2, goto(0,S)=1 |
| 0 1 | $ | **ACCEPT ✓** |

---

# ══════════════════════════════════════════════════════
# Q1(iii) OR — LALR Parsing: S→Ba|bAa, A→c, B→t  [3 Marks]
# ══════════════════════════════════════════════════════

## Grammar (Augmented):
```
0: S' → S
1: S  → Ba
2: S  → bAa
3: A  → c
4: B  → t
```

---

## LR(1) Items with Lookaheads

**I0 = closure({S'→•S, $})**
```
S' → •S,   $
S  → •Ba,  $
S  → •bAa, $
B  → •t,   a    ← B is followed by 'a' in S→Ba
```

**goto(I0, S) = I1:**   `S' → S•, $`  [ACCEPT]

**goto(I0, B) = I2:**   `S → B•a, $`

**goto(I0, b) = I3:**
```
S → b•Aa, $
A → •c,   a    ← A is followed by 'a' in S→bAa
```

**goto(I0, t) = I4:**   `B → t•, a`   [REDUCE B→t on lookahead 'a']

**goto(I2, a) = I5:**   `S → Ba•, $`  [REDUCE S→Ba on $]

**goto(I3, A) = I6:**   `S → bA•a, $`

**goto(I3, c) = I7:**   `A → c•, a`   [REDUCE A→c on lookahead 'a']

**goto(I6, a) = I8:**   `S → bAa•, $` [REDUCE S→bAa on $]

**No states share the same core → LR(1) = LALR for this grammar.**

---

## LALR Action/Goto Table

| State | **b** | **t** | **a** | **c** | **$** | **S** | **A** | **B** |
|---|---|---|---|---|---|---|---|---|
| **0** | s3 | s4 | — | — | — | 1 | — | 2 |
| **1** | — | — | — | — | acc | — | — | — |
| **2** | — | — | s5 | — | — | — | — | — |
| **3** | — | — | — | s7 | — | — | 6 | — |
| **4** | — | — | r4 | — | — | — | — | — |
| **5** | — | — | — | — | r1 | — | — | — |
| **6** | — | — | s8 | — | — | — | — | — |
| **7** | — | — | r3 | — | — | — | — | — |
| **8** | — | — | — | — | r2 | — | — | — |

*r1=S→Ba, r2=S→bAa, r3=A→c, r4=B→t*

**No conflicts → Grammar is LALR(1) ✓**

---

# ══════════════════════════════════════════════════════
# Q2(i) — MCQ: FIRST of A  [1 Mark]
# ══════════════════════════════════════════════════════

## Grammar:
```
S → AB
A → a | Bdd
B → ebB | g
```

**FIRST(B):**  B→ebB: starts with `e` → add e; B→g: add g → **FIRST(B) = {e, g}**

**FIRST(A):**  A→a: add `a`; A→Bdd: FIRST(B) = {e, g} (ε ∉ FIRST(B)) → add `e, g`
→ **FIRST(A) = {a, e, g}**

## Answer: **(b) {a, e, g}**

---

# ══════════════════════════════════════════════════════
# Q2(ii) — Define Parsing in Compiler  [1 Mark]
# ══════════════════════════════════════════════════════

**Parsing (Syntax Analysis)** is the second phase of a compiler. It reads the stream of tokens produced by the lexical analyzer and determines whether the token sequence conforms to the grammar rules of the source language.

- **Input:** Token stream  
- **Output:** Parse tree (or syntax tree)  
- **Also does:** Reports syntax errors

**Two types:** Top-Down parsing (LL parsers) and Bottom-Up parsing (LR parsers).

---

# ══════════════════════════════════════════════════════
# Q2(iii) — LL(1) Parsing: S→CC, C→aC|d  [3 Marks]
# ══════════════════════════════════════════════════════

*(Same grammar as Q1(iii) — now build LL(1) table instead)*

## Step 1: FIRST and FOLLOW

**FIRST:**
```
FIRST(C) = {a, d}
FIRST(S) = FIRST(CC) = FIRST(C) = {a, d}
```

**FOLLOW:**
```
FOLLOW(S) = {$}
FOLLOW(C):
  From S → C•C : add FIRST(C) - {ε} = {a, d}
  From S → CC• : add FOLLOW(S) = {$}
  FOLLOW(C) = {a, d, $}
```

---

## Step 2: LL(1) Parsing Table

**Rules:**
- `S → CC`: FIRST = {a, d} → M[S,a] = S→CC, M[S,d] = S→CC
- `C → aC`: FIRST = {a} → M[C,a] = C→aC
- `C → d`: FIRST = {d} → M[C,d] = C→d

| | **a** | **d** | **$** |
|---|---|---|---|
| **S** | S → CC | S → CC | — |
| **C** | C → aC | C → d | — |

**No cell has more than one entry → Grammar is LL(1) ✓**

---

## Step 3: Parse trace for "dad"

| Stack (top→left) | Input | Action |
|---|---|---|
| S $ | dad$ | M[S,d] = S→CC → pop S, push C C |
| C C $ | dad$ | M[C,d] = C→d → pop C, push d |
| d C $ | dad$ | Match d, advance |
| C $ | ad$ | M[C,a] = C→aC → pop C, push a C |
| a C $ | ad$ | Match a, advance |
| C $ | d$ | M[C,d] = C→d → pop C, push d |
| d $ | d$ | Match d, advance |
| $ | $ | **ACCEPT ✓** |

---

# ══════════════════════════════════════════════════════
# Q2(iii) OR — CLR Parsing: S→Aa|Bc, A→d, B→d  [3 Marks]
# ══════════════════════════════════════════════════════

## Grammar (Augmented):
```
0: S' → S
1: S  → Aa
2: S  → Bc
3: A  → d
4: B  → d
```

> 💡 **Key insight:** Both A and B derive `d` — this causes a **reduce-reduce conflict in LALR** but is handled cleanly by **CLR(1)** because CLR uses exact lookaheads per state.

---

## LR(1) Items with Lookaheads

**I0 = closure({S'→•S, $})**
```
S' → •S,  $
S  → •Aa, $
S  → •Bc, $
A  → •d,  a    ← A followed by 'a' in S→Aa → lookahead = a
B  → •d,  c    ← B followed by 'c' in S→Bc → lookahead = c
```

**goto(I0, S) = I1:**
```
S' → S•, $      [ACCEPT on $]
```

**goto(I0, A) = I2:**
```
S → A•a, $
```

**goto(I0, B) = I3:**
```
S → B•c, $
```

**goto(I0, d) = I4:**
```
A → d•, a       [REDUCE A→d only on lookahead 'a']
B → d•, c       [REDUCE B→d only on lookahead 'c']
```

**goto(I2, a) = I5:**
```
S → Aa•, $      [REDUCE S→Aa on $]
```

**goto(I3, c) = I6:**
```
S → Bc•, $      [REDUCE S→Bc on $]
```

---

## CLR(1) Action/Goto Table

| State | **d** | **a** | **c** | **$** | **S** | **A** | **B** |
|---|---|---|---|---|---|---|---|
| **0** | s4 | — | — | — | 1 | 2 | 3 |
| **1** | — | — | — | acc | — | — | — |
| **2** | — | s5 | — | — | — | — | — |
| **3** | — | — | s6 | — | — | — | — |
| **4** | — | r3 | r4 | — | — | — | — |
| **5** | — | — | — | r1 | — | — | — |
| **6** | — | — | — | r2 | — | — | — |

*r1=S→Aa, r2=S→Bc, r3=A→d (on 'a'), r4=B→d (on 'c')*

**No conflicts in CLR(1) ✓**

> **Why not LALR?** If we tried LALR, state I4 would merge into one state with combined lookaheads: `A→d•, {a,c}` and `B→d•, {a,c}` — causing a **reduce-reduce conflict** on 'a' and 'c'. CLR avoids this by keeping the exact lookahead per state.

---

## Parse trace for "da":
| Stack | Input | Action |
|---|---|---|
| 0 | da$ | M[0,d]=s4 → shift |
| 0 4 | a$ | M[4,a]=r3: A→d → pop 1, goto(0,A)=2 |
| 0 2 | a$ | M[2,a]=s5 → shift |
| 0 2 5 | $ | M[5,$]=r1: S→Aa → pop 2, goto(0,S)=1 |
| 0 1 | $ | **ACCEPT ✓** |

---

# ══════════════════════════════════════════════════════
# Q3(i) — MCQ: Type Checker Component  [1 Mark]
# ══════════════════════════════════════════════════════

**Q:** Which component of a type checker verifies whether expressions conform to defined types?
a) Lexical analyzer  b) Parser  c) Semantic analyzer  d) Code generator

## Answer: **(c) Semantic analyzer**

**Why:**
- Lexical analyzer → handles tokens
- Parser → checks grammar/syntax
- **Semantic analyzer → performs type checking** (ensures types are correct and operations are legal)
- Code generator → generates machine code

---

# ══════════════════════════════════════════════════════
# Q3(ii) — Define Type Checking in Compiler Design  [3 Marks]
# ══════════════════════════════════════════════════════

**Type Checking** is a form of semantic analysis in which the compiler verifies that each operator in the program is applied to operands of the **correct type** as per the language's type rules.

### Key Concepts:

**Type System:** A set of rules that assigns a **type expression** to every construct (variable, expression, function) in the program.

**What a type checker does:**
1. Traverses the annotated parse tree (or AST) bottom-up.
2. At each node, determines the types of the children (operands).
3. Applies the type rule for the operator at that node.
4. Returns the resulting type or reports a **type error**.

### Types of Type Checking:

| Type | When | Example |
|---|---|---|
| **Static** | At compile time | C, Java — `int x = "hello"` → error at compile time |
| **Dynamic** | At runtime | Python — type checked when line executes |

### Type Rules Example:
```
E → E1 + E2
  if E1.type = int  AND E2.type = int  → E.type = int
  if E1.type = float AND E2.type = int → E.type = float  (coerce int→float)
  if E1.type = string AND E2.type = int → TYPE ERROR
```

---

# ══════════════════════════════════════════════════════
# Q3(iii) — Explain Type Conversion with Example  [3 Marks]
# ══════════════════════════════════════════════════════

**Type Conversion** is the process of changing one data type to another. There are two kinds:

---

### 1. Implicit Conversion (Coercion)
> The compiler **automatically** converts one type to another when it is safe to do so — no programmer action needed.

**Happens in:** Widening conversions (smaller → larger type, no data loss).

**Type promotion hierarchy:**
```
char → short → int → long → float → double
```

**Example:**
```c
int   i = 5;
float f = 2.5;
float result = i + f;   // i is automatically promoted to 5.0
                         // result = 7.5 (float)
```

The compiler inserts a hidden conversion instruction: `int_to_float(i)`.

---

### 2. Explicit Conversion (Casting)
> The programmer **manually forces** a type conversion using a cast operator. May cause data loss.

**Happens in:** Narrowing conversions (larger → smaller type).

**Example:**
```c
double d = 9.99;
int    x = (int) d;     // Programmer explicitly casts
                         // x = 9  (decimal .99 is truncated — data lost!)
```

---

### Comparison Table:
| Feature | Implicit (Coercion) | Explicit (Casting) |
|---|---|---|
| Who does it | Compiler automatically | Programmer manually |
| Direction | Widening (safe) | Narrowing (may lose data) |
| Data loss | No | Possible |
| Example | `int + float → float` | `(int) 9.99 → 9` |

---

# ══════════════════════════════════════════════════════
# Q3(iii) OR — Explain Runtime Environment  [3 Marks]
# ══════════════════════════════════════════════════════

**Runtime Environment (RTE)** is the memory structure maintained during program execution to support the running program's needs — including function calls, variable storage, and dynamic data.

### Memory Layout of a Running Program:

```
High Address
┌───────────────────────┐
│        STACK          │ ← grows downward
│  (function calls,     │   LIFO structure
│   local variables)    │   managed by compiler
├───────────────────────┤
│          ↕            │   free/available
├───────────────────────┤
│        HEAP           │ ← grows upward
│  (dynamic allocation: │   managed by programmer
│   malloc, new)        │   or garbage collector
├───────────────────────┤
│  STATIC / GLOBAL DATA │ ← fixed size, compile-time
│  (global variables,   │
│   static variables)   │
├───────────────────────┤
│  CODE (TEXT) SEGMENT  │ ← read-only machine code
│  (compiled program)   │
└───────────────────────┘
Low Address
```

### Activation Record (Stack Frame):
Each function call creates an **activation record** pushed onto the stack:
```
┌─────────────────────┐
│ Return Value        │
│ Actual Parameters   │
│ Return Address      │
│ Control Link        │
│ Saved Registers     │
│ Local Variables     │
└─────────────────────┘
```
When the function returns, its frame is **popped** and control returns to the caller.

---

# ══════════════════════════════════════════════════════
# Q4(i) — MCQ: Symbol Table Creation  [1 Mark]
# ══════════════════════════════════════════════════════

**Q:** Who is responsible for the creation of the symbol table?
a) Assembler  b) Compiler  c) Interpreter  d) All of the mentioned

## Answer: **(b) Compiler**

The **compiler** creates and maintains the symbol table during the compilation process. The lexical analyzer makes the first entries (identifiers found as tokens), and subsequent phases (syntax, semantic analysis) add information like types, scopes, and offsets.

---

# ══════════════════════════════════════════════════════
# Q4(ii) — Define Overloading of Functions  [3 Marks]
# ══════════════════════════════════════════════════════

**Function Overloading** is the ability to define **multiple functions with the same name** but with **different parameter types or number of parameters**. The compiler selects the correct version to call based on the types of the arguments at the call site.

### Key Points:
- Resolved at **compile time** (static dispatch)
- Each overloaded version has a different **signature** (parameter types/count)
- Return type alone is NOT sufficient to distinguish overloaded functions

### Example:
```c
// Three overloaded functions with same name "area"
int   area(int side)           { return side * side; }
float area(float r)            { return 3.14f * r * r; }
float area(float l, float b)   { return l * b; }
```

**Calling:**
```c
area(5)       → calls  int area(int side)         = 25
area(3.0)     → calls  float area(float r)        = 28.26
area(4.0,2.0) → calls  float area(float l,float b) = 8.0
```

### Operator Overloading:
The same concept applies to operators:
```
5 + 3       → integer addition   (result: 8)
5.0 + 3.0   → float addition     (result: 8.0)
"ab" + "cd" → string concat      (result: "abcd")
```

### Difference from Polymorphism:
| | Overloading | Polymorphism |
|---|---|---|
| Definitions | Multiple | One |
| Resolution | Compile time | Compile or runtime |
| Type | Ad-hoc | Parametric |

---

# ══════════════════════════════════════════════════════
# Q4(iii) — Explain Dynamic Storage Allocation  [3 Marks]
# ══════════════════════════════════════════════════════

**Dynamic Storage Allocation** is the mechanism by which memory is allocated and freed at **arbitrary times during program execution** — as opposed to static allocation (compile time) or stack allocation (function call time).

### How it works:
- Memory is taken from the **Heap** segment.
- In C: `malloc()` to allocate, `free()` to release.
- In Java/C#: `new` to allocate, **Garbage Collector** frees automatically.

### Example:
```c
int n;
scanf("%d", &n);            // n is not known at compile time

int *arr = malloc(n * sizeof(int));   // allocate n integers at runtime
for (int i = 0; i < n; i++) arr[i] = i;
free(arr);                  // must free manually in C
```

### Heap Management Strategies:

| Strategy | How it works | Best for |
|---|---|---|
| **First Fit** | Allocate first free block large enough | Fast allocation |
| **Best Fit** | Allocate smallest sufficient free block | Minimizes waste |
| **Worst Fit** | Allocate largest free block | Leaves larger remaining blocks |

### Problems with Dynamic Allocation:
1. **Memory Leak:** Memory is allocated but never freed — program runs out of memory.
2. **Dangling Pointer:** Pointer to freed memory — undefined behavior if accessed.
3. **Fragmentation:** Many small scattered free blocks — can't satisfy large requests.

---

# ══════════════════════════════════════════════════════
# Q4(iii) OR — Error Detection & Recovery in Compiler  [3 Marks]
# ══════════════════════════════════════════════════════

## Error Detection:

Compilers detect different errors at different phases:

| Phase | Error Type | Example |
|---|---|---|
| Lexical Analysis | Lexical Error | Invalid character: `@x = 5` |
| Syntax Analysis | Syntax Error | Missing semicolon: `int x = 5` (no `;`) |
| Semantic Analysis | Semantic Error | Type mismatch: `int x = "hello"` |

---

## Error Recovery Strategies:

A good compiler should **not stop at the first error**. It should report as many errors as possible. This requires error recovery.

### 1. Panic-Mode Recovery
**The simplest and most widely used method.**

When an error is detected, the parser **discards input tokens one by one** until it finds a **synchronization token** (e.g., `;`, `}`, `end`). It then resumes parsing from there.

**Example:**
```
Error at token 'x' in:  if (x == y  z = 1;
                                   ↑ error here
```
Parser discards tokens until it finds `;`, then resumes from the next statement.

**Advantage:** Simple to implement. Prevents cascading false errors.  
**Disadvantage:** May skip large chunks of valid code.

---

### 2. Phrase-Level Recovery
When an error is detected, the parser performs a **small local repair**:
- Insert a missing token (e.g., add a missing `;`)
- Delete an extra token
- Replace a wrong token

Then continue parsing as if the repair was the original input.

**Advantage:** More precise; catches more errors per run.  
**Disadvantage:** Wrong repairs can cause false cascade errors.

---

### 3. Error Productions
The grammar is extended with **special error rules** that match common mistakes.

**Example:**
```
stmt → if (expr) stmt        ← correct rule
stmt → if expr then stmt     ← error production (missing parentheses)
```
When the error production fires, the parser reports a helpful error message and continues.

**Advantage:** Produces meaningful, specific error messages.  
**Disadvantage:** Hard to anticipate all possible mistakes in advance.
