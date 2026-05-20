# Paper 1 — Complete Solutions
## B.Tech Compiler Design | III Year / VI Sem | 20 Marks

---

# ═══════════════════════════════════════
# QUESTION 1(A) — Input Buffering  [5 Marks]
# ═══════════════════════════════════════

## Q: Describe Input Buffering concept in Lexical Analysis.

### What is Input Buffering?

The lexical analyzer reads source code **character by character** to identify tokens. Reading one character at a time directly from disk is **extremely slow** because each disk read is a separate I/O operation. To solve this, compilers use an **Input Buffering** scheme.

---

### The Two-Buffer Scheme (Draw this diagram in exam)

```
Buffer 1 (4096 chars)     |     Buffer 2 (4096 chars)
|  a  |  =  |  b  | ... |eof| |  +  |  c  |  ;  | ... |eof|
 ↑                                ↑
lexemeBegin                     forward
```

**How it works:**
- Two fixed-size buffers are used, each holding **one disk block** (typically 4096 bytes).
- When the `forward` pointer reaches the **end of Buffer 1**, Buffer 2 is immediately loaded from disk.
- When `forward` reaches **end of Buffer 2**, Buffer 1 is reloaded.
- A special **EOF sentinel character** is placed at the end of each buffer to signal the end.

---

### Two Pointers:

| Pointer | Role |
|---|---|
| **lexemeBegin** | Points to the **start** of the current lexeme being scanned |
| **forward** | Scans **ahead** one character at a time to find the end of the token |

**How a token is identified:**
1. `lexemeBegin` marks where the current token starts.
2. `forward` advances until it finds a character that cannot be part of the current token.
3. The substring from `lexemeBegin` to `forward - 1` is the **lexeme**.
4. `lexemeBegin` is then moved to `forward` to start the next token.

---

### Why Two Buffers?

- A **single buffer** would require stopping and waiting for a disk reload every 4096 characters.
- With **two buffers**, while the scanner is reading Buffer 1, Buffer 2 can be loaded in the background → **no waiting**.
- This is called **double buffering** or **ping-pong buffering**.

---

### Handling End-of-Buffer (Sentinel):

A sentinel `eof` character is placed at position `n+1` of each buffer (where n = buffer size).
- If `forward` hits `eof` in the middle of a buffer → genuine end-of-input.
- If `forward` hits `eof` at the boundary → swap buffers.
- Without the sentinel, every character read requires TWO checks (is it eof? is it end-of-buffer?). The sentinel reduces it to **ONE check**.

---

# ═══════════════════════════════════════
# QUESTION 1(B) — Phases of Compiler  [5 Marks]
# ═══════════════════════════════════════

## Q: Explain different phases of a Compiler with the help of a diagram.

### The 6 Phases of a Compiler:

```
Source Program (e.g., a = b + c * 2)
         │
         ▼
┌─────────────────────┐
│  1. Lexical Analysis │ → Tokens: id(a), =, id(b), +, id(c), *, num(2)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  2. Syntax Analysis  │ → Parse Tree (checks grammar rules)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  3. Semantic Analysis│ → Annotated Tree (type checking)
└─────────────────────┘
         │
         ▼
┌──────────────────────────┐
│  4. Intermediate Code Gen│ → t1 = c * 2; t2 = b + t1; a = t2
└──────────────────────────┘
         │
         ▼
┌─────────────────────┐
│  5. Code Optimization│ → t1 = c * 2; a = b + t1 (simplified)
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│  6. Code Generation  │ → MOV R1, c; MUL R1, 2; ADD R1, b; MOV a, R1
└─────────────────────┘
         │
         ▼
  Target Machine Code

(Symbol Table and Error Handler interact with ALL phases)
```

---

### Phase-by-Phase Explanation:

**Phase 1: Lexical Analysis (Scanner)**
- Input: Source characters
- Output: Token stream
- Does: Remove whitespace/comments, group characters into tokens

**Phase 2: Syntax Analysis (Parser)**
- Input: Token stream
- Output: Parse tree
- Does: Checks grammar; detects syntax errors

**Phase 3: Semantic Analysis**
- Input: Parse tree
- Output: Annotated parse tree
- Does: Type checking, scope checking, semantic error detection

**Phase 4: Intermediate Code Generation**
- Input: Annotated parse tree
- Output: Three-Address Code (TAC)
- Does: Translates to machine-independent IR

**Phase 5: Code Optimization**
- Input: TAC
- Output: Optimized TAC
- Does: Removes redundancy, applies loop/constant optimizations

**Phase 6: Code Generation**
- Input: Optimized TAC
- Output: Machine code / assembly
- Does: Register allocation, instruction selection

---

# ═══════════════════════════════════════════════
# QUESTION 1(A) OR — Compiler vs Interpreter + LEX
# ═══════════════════════════════════════════════

## (i) Differentiate between Compiler and Interpreter  [2.5 Marks]

| Feature | Compiler | Interpreter |
|---|---|---|
| Translation | Translates entire program at once | Translates and executes line by line |
| Speed of execution | Faster (pre-translated) | Slower (translates at runtime) |
| Error detection | All errors reported before running | Stops at first error |
| Output | Produces separate executable | No separate executable |
| Memory usage | More (stores object code) | Less |
| Examples | C, C++, Fortran | Python, JavaScript (interpreted mode) |

---

## (ii) Write the Structure of a LEX Program  [2.5 Marks]

A LEX program has THREE sections separated by `%%`:

```
%{
    /* Section 1: Declarations */
    /* C language includes, global variables, function declarations */
    #include <stdio.h>
    int count = 0;
%}

%%
    /* Section 2: Rules (Pattern — Action pairs) */
    /* Each line: regular_expression { C action code } */

"if"                    { return IF; }
"while"                 { return WHILE; }
[a-zA-Z][a-zA-Z0-9]*  { return IDENTIFIER; }
[0-9]+                  { return NUMBER; }
[ \t\n]                 { /* skip whitespace */ }
.                       { return yytext[0]; }

%%
    /* Section 3: User Code (optional C functions) */
int main() {
    yylex();   /* calls the generated lexer */
    return 0;
}
```

**Key built-in LEX variables:**
- `yytext` — the matched lexeme string
- `yyleng` — length of matched lexeme
- `yylex()` — the generated lexer function

---

# ══════════════════════════════════════════════════════
# QUESTION 1(B) OR — Token Counting  [5 Marks]
# ══════════════════════════════════════════════════════

## Q: Find the number of tokens in the following C/C++ statements.

---

## 📖 HOW TO COUNT TOKENS — RULES FIRST

**What counts as ONE token?**

| Token Type | Examples |
|---|---|
| **Keyword** | `int` `float` `if` `else` `while` `return` → **1 token each** |
| **Identifier** | `a` `b` `Printf` `Main` `myVar` → **1 token each** |
| **Constant/Literal** | `10` `20.5` `'A'` → **1 token each** |
| **String Literal** | `"Hello World"` → **everything inside quotes = 1 token** |
| **Operator** | `=` `>` `-` `+` `*` `&` → **1 token each** |
| **Punctuator** | `(` `)` `{` `}` `;` `,` → **1 token each** |

**What does NOT count as a token?**
- Whitespace (spaces, tabs, newlines)
- Comments

**Important rule:** A string literal `"..."` counts as **ONE single token**, no matter what's inside it.

---

## ✏️ SOLVED WITH UNDERLINES

**Token = underlined. Count shown at end.**

---

### (i) `Printf("Hello World");`

```
Printf  (  "Hello World"  )  ;
  1     2        3        4  5
```

| # | Lexeme | Token Type |
|---|---|---|
| 1 | `Printf` | Identifier |
| 2 | `(` | Punctuator |
| 3 | `"Hello World"` | String Literal |
| 4 | `)` | Punctuator |
| 5 | `;` | Punctuator |

**✅ Total Tokens = 5**

---

### (ii) `Printf("i=%d,& i=% x", i & i);`

```
Printf  (  "i=%d,& i=% x"  ,  i  &  i  )  ;
  1     2          3        4  5  6  7  8  9
```

| # | Lexeme | Token Type |
|---|---|---|
| 1 | `Printf` | Identifier |
| 2 | `(` | Punctuator |
| 3 | `"i=%d,& i=% x"` | String Literal (entire string = 1 token) |
| 4 | `,` | Punctuator |
| 5 | `i` | Identifier |
| 6 | `&` | Operator (bitwise AND) |
| 7 | `i` | Identifier |
| 8 | `)` | Punctuator |
| 9 | `;` | Punctuator |

**✅ Total Tokens = 9**

> **Note:** Everything inside `"..."` is part of the string literal — `%d`, `&`, `=`, spaces inside the string are NOT separate tokens.

---

### (iii) `if(a>b) a=a-b; else Printf("b is greater"); b=b-2;`

```
if  (  a  >  b  )  a  =  a  -  b  ;  else  Printf  (  "b is greater"  )  ;  b  =  b  -  2  ;
 1  2  3  4  5  6  7  8  9  10 11 12  13    14      15       16        17 18 19 20 21 22 23 24
```

| # | Lexeme | Type |
|---|---|---|
| 1 | `if` | Keyword |
| 2 | `(` | Punctuator |
| 3 | `a` | Identifier |
| 4 | `>` | Operator |
| 5 | `b` | Identifier |
| 6 | `)` | Punctuator |
| 7 | `a` | Identifier |
| 8 | `=` | Operator |
| 9 | `a` | Identifier |
| 10 | `-` | Operator |
| 11 | `b` | Identifier |
| 12 | `;` | Punctuator |
| 13 | `else` | Keyword |
| 14 | `Printf` | Identifier |
| 15 | `(` | Punctuator |
| 16 | `"b is greater"` | String Literal |
| 17 | `)` | Punctuator |
| 18 | `;` | Punctuator |
| 19 | `b` | Identifier |
| 20 | `=` | Operator |
| 21 | `b` | Identifier |
| 22 | `-` | Operator |
| 23 | `2` | Constant |
| 24 | `;` | Punctuator |

**✅ Total Tokens = 24**

---

### (iv) `int a = 10; float b = 20.5;`

```
int  a  =  10  ;  float  b  =  20.5  ;
 1   2  3   4  5    6    7  8    9   10
```

| # | Lexeme | Type |
|---|---|---|
| 1 | `int` | Keyword |
| 2 | `a` | Identifier |
| 3 | `=` | Operator |
| 4 | `10` | Integer Constant |
| 5 | `;` | Punctuator |
| 6 | `float` | Keyword |
| 7 | `b` | Identifier |
| 8 | `=` | Operator |
| 9 | `20.5` | Float Constant |
| 10 | `;` | Punctuator |

**✅ Total Tokens = 10**

---

### (v) `Main() { int a; }`

```
Main  (  )  {  int  a  ;  }
  1   2  3  4   5   6  7  8
```

| # | Lexeme | Type |
|---|---|---|
| 1 | `Main` | Identifier |
| 2 | `(` | Punctuator |
| 3 | `)` | Punctuator |
| 4 | `{` | Punctuator |
| 5 | `int` | Keyword |
| 6 | `a` | Identifier |
| 7 | `;` | Punctuator |
| 8 | `}` | Punctuator |

**✅ Total Tokens = 8**

---

### Summary Table:
| Statement | Token Count |
|---|---|
| i. Printf("Hello World"); | **5** |
| ii. Printf("i=%d,& i=% x", i & i); | **9** |
| iii. if(a>b) a=a-b; else Printf("b is greater"); b=b-2; | **24** |
| iv. int a = 10; float b = 20.5; | **10** |
| v. Main() { int a; } | **8** |

---

# ═══════════════════════════════════════════
# QUESTION 2(A) — Top Down Parsing  [5 Marks]
# ═══════════════════════════════════════════

## Q: Discuss Top Down Parsing with example.

### Definition:
> Top-Down parsing builds the parse tree starting from the **root (start symbol)** and working downward toward the **leaves (input tokens)**. At each step, a non-terminal is expanded using one of its grammar productions.

### How it works:
1. Start with the start symbol S.
2. Match the leftmost non-terminal with a production.
3. Compare with actual input tokens.
4. If mismatch → backtrack or report error.

### Types of Top-Down Parsers:

**1. Brute Force / Backtracking:**
- Try every production for a non-terminal.
- If the chosen production fails, undo and try the next one.
- Very slow (exponential in worst case). Not used practically.

**2. Recursive Descent Parsing:**
- Implements each non-terminal as a **recursive function**.
- The function for non-terminal A calls functions for the symbols in A's production.
- Simple and easy to handwrite.
- **Fails on left-recursive grammars** (causes infinite recursion).

**3. Predictive Parsing (LL(1)):**
- Uses ONE token of lookahead to select the correct production WITHOUT backtracking.
- Requires the grammar to be LL(1) (no ambiguity, no left recursion, left-factored).
- Implemented via an explicit stack and a parsing table.

### Problems with Top-Down (and solutions):

**Left Recursion** → Causes infinite loop → **Eliminate** by rewriting grammar.
**Left Factoring** → Ambiguity with 1 lookahead → **Factor** common prefixes.

### Example — Recursive Descent Parser:

Grammar: `E → T + E | T`, `T → id`

```c
void E() {
    T();              // parse T
    if (lookahead == '+') {
        match('+');   // consume '+'
        E();          // parse E recursively
    }
}

void T() {
    match('id');      // consume identifier
}
```

Parsing `id + id`:
```
E()
  T() → matches 'id'
  '+' found → match('+')
  E()
    T() → matches 'id'
    no more '+' → done
ACCEPT ✓
```

---

# ══════════════════════════════════════════════════════════
# QUESTION 2(B)(i) — FIRST and FOLLOW for Grammar 1  [5 Marks]
# ══════════════════════════════════════════════════════════

## Grammar:
```
S → AcB | Cb | ef
A → ae | C
B → b | a
C → g | d
```

---

### Step 1: Compute FIRST Sets

**FIRST(C):** C → g | d → `FIRST(C) = {g, d}`

**FIRST(B):** B → b | a → `FIRST(B) = {b, a}`

**FIRST(A):**
- A → ae → starts with terminal `a` → add `a`
- A → C → FIRST(C) = {g, d} → add `g, d`
- `FIRST(A) = {a, g, d}`

**FIRST(S):**
- S → AcB → FIRST(A) = {a, g, d} (ε ∉ FIRST(A), so stop) → add `a, g, d`
- S → Cb → FIRST(C) = {g, d} → add `g, d`
- S → ef → starts with `e` → add `e`
- `FIRST(S) = {a, g, d, e}`

| Non-Terminal | FIRST |
|---|---|
| C | {g, d} |
| B | {b, a} |
| A | {a, g, d} |
| S | {a, g, d, e} |

---

### Step 2: Compute FOLLOW Sets

**Rule 1:** FOLLOW(S) = {$} (S is the start symbol)

**FOLLOW(A):**
- S → **A**cB: A is followed by terminal `c` → add `c`
- `FOLLOW(A) = {c}`

**FOLLOW(B):**
- S → Ac**B**: B is at the end → add FOLLOW(S) = {$}
- `FOLLOW(B) = {$}`

**FOLLOW(C):**
- S → **C**b: C is followed by terminal `b` → add `b`
- A → **C**: C is at the end → add FOLLOW(A) = {c}
- `FOLLOW(C) = {b, c}`

| Non-Terminal | FOLLOW |
|---|---|
| S | {$} |
| A | {c} |
| B | {$} |
| C | {b, c} |

---

# ══════════════════════════════════════════════════════════
# QUESTION 2(B)(ii) — FIRST and FOLLOW for Grammar 2  [5 Marks]
# ══════════════════════════════════════════════════════════

## Grammar:
```
S → (L) | a
L → ST
T → ,ST | ε
```
*(ε = epsilon = empty string)*

---

### Step 1: FIRST Sets

**FIRST(S):**
- S → (L): starts with `(` → add `(`
- S → a: starts with `a` → add `a`
- `FIRST(S) = {(, a}`

**FIRST(T):**
- T → ,ST: starts with `,` → add `,`
- T → ε → add `ε`
- `FIRST(T) = {,, ε}`

**FIRST(L):**
- L → ST: FIRST(S) = {(, a} (ε ∉ FIRST(S), so stop)
- `FIRST(L) = {(, a}`

| Non-Terminal | FIRST |
|---|---|
| S | {(, a} |
| T | {,, ε} |
| L | {(, a} |

---

### Step 2: FOLLOW Sets

**FOLLOW(S) = {$}** (start symbol, also add from rules below)

**FOLLOW(L):**
- S → (**L**): L is followed by `)` → add `)`
- `FOLLOW(L) = {)}`

**FOLLOW(S) (update):**
- L → **S**T: S is followed by T. FIRST(T) - {ε} = {,} → add `,`
  Since ε ∈ FIRST(T): also add FOLLOW(L) = {)} → add `)`
- T → ,**S**T: same rule — add `,` and `)`
- `FOLLOW(S) = {$, ,, )}`

**FOLLOW(T):**
- L → S**T**: T is at end → add FOLLOW(L) = {)}
- T → ,S**T**: T is at end → add FOLLOW(T) = {)} (same, no new info)
- `FOLLOW(T) = {)}`

| Non-Terminal | FOLLOW |
|---|---|
| S | {$, ,, )} |
| L | {)} |
| T | {)} |

---

# ══════════════════════════════════════════════════════════
# QUESTION 2(A) OR — LL(1) Parser for E→TT, T→aT|e  [5 Marks]
# ══════════════════════════════════════════════════════════

## Grammar:
```
E → TT
T → aT | e
```
**String to parse: "aeae"**

---

### Step 1: FIRST and FOLLOW

**FIRST(T):** T → aT gives `a`; T → e gives `e` → `FIRST(T) = {a, e}`
**FIRST(E):** E → TT, FIRST(T) = {a, e}, ε ∉ FIRST(T) → `FIRST(E) = {a, e}`

**FOLLOW(E) = {$}**
**FOLLOW(T):**
- E → **T**T: first T followed by second T. FIRST(T) = {a,e}, ε ∉ FIRST(T) → add `a, e`
- E → T**T**: second T at end → add FOLLOW(E) = {$}
- T → a**T**: T at end → add FOLLOW(T) (no new info)
- `FOLLOW(T) = {a, e, $}`

---

### Step 2: LL(1) Parsing Table

**Rule:** For `E → TT`: FIRST = {a, e} → M[E,a] = E→TT, M[E,e] = E→TT
**Rule:** For `T → aT`: FIRST = {a} → M[T,a] = T→aT
**Rule:** For `T → e`: FIRST = {e} → M[T,e] = T→e

| | `a` | `e` | `$` |
|---|---|---|---|
| E | E → TT | E → TT | — |
| T | T → aT | T → e | — |

---

### Step 3: Parse "aeae" — Stack Trace

| Step | Stack (top→left) | Input | Action |
|---|---|---|---|
| 1 | E $ | aeae$ | M[E,a] = E→TT → pop E, push T T |
| 2 | T T $ | aeae$ | M[T,a] = T→aT → pop T, push a T |
| 3 | a T T $ | aeae$ | Match `a`, pop a, advance |
| 4 | T T $ | eae$ | M[T,e] = T→e → pop T, push e |
| 5 | e T $ | eae$ | Match `e`, pop e, advance |
| 6 | T $ | ae$ | M[T,a] = T→aT → pop T, push a T |
| 7 | a T $ | ae$ | Match `a`, pop a, advance |
| 8 | T $ | e$ | M[T,e] = T→e → pop T, push e |
| 9 | e $ | e$ | Match `e`, pop e, advance |
| 10 | $ | $ | **ACCEPT ✓** |

**String "aeae" is valid for this grammar.**

---

# ══════════════════════════════════════════════════════════
# QUESTION 2(B)(i) OR — Remove Left Recursion  [2.5 Marks]
# ══════════════════════════════════════════════════════════

## `E → E + E | E x E | a`

**Identify:**
- Left-recursive productions: `E → E + E` and `E → E x E`
  - These are in the form `A → A α` where α = `+E` and α = `xE`
- Non-left-recursive production: `E → a` (this is β)

**Formula:** `A → Aα1 | Aα2 | β` becomes:
```
A  → β A'
A' → α1 A' | α2 A' | ε
```

**Applying:**
```
E  → a E'
E' → + E E' | x E E' | ε
```

---

# ══════════════════════════════════════════════════════════
# QUESTION 2(B)(ii) OR — Remove Left Factoring  [2.5 Marks]
# ══════════════════════════════════════════════════════════

## `A → aAB | aBc | aAc`

**Step 1: Find common prefix**
All three productions start with `a` → common prefix = `a`

**Formula:** `A → αβ | αγ | αδ` becomes:
```
A  → α A'
A' → β | γ | δ
```

**Applying (factor out `a`):**
```
A  → a A'
A' → AB | Bc | Ac
```

**Step 2: Can A' be further factored?**
- `AB` starts with A (non-terminal)
- `Bc` starts with B (non-terminal)
- `Ac` starts with A (non-terminal)

`AB` and `Ac` both start with A → factor A out of A':
```
A  → a A'
A' → A A'' | Bc
A'' → B | c
```

**Final Grammar:**
```
A   → a A'
A'  → A A'' | Bc
A'' → B | c
```
