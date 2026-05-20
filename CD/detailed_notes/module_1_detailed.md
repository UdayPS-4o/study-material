# Module 1 — Detailed Exam Notes
## Introduction to Compiling & Lexical Analysis

---

## 🔑 TOPIC 1: What is a Compiler?

**Definition to write in exam:**
> A compiler is a program that reads a source program written in one language (source language) and translates it into an equivalent program in another language (target language), while also reporting errors found during translation.

**Key points to remember:**
- Source language → usually a high-level language (C, Java)
- Target language → usually machine code or assembly
- Compiler translates the **entire** program at once (unlike an interpreter which executes line by line)

---

## 🔑 TOPIC 2: Major Data Structures in a Compiler

**Mnemonic: "TSPIDAL"**
- **T**okens — from lexical analysis
- **S**ymbol Table — stores identifier info
- **P**arse Tree — from syntax analysis
- **I**ntermediate Code — TAC
- **D**AG — for optimization
- **A**ST — abstract syntax tree
- **L**iteral Table — stores constants

| Data Structure | When Used | Purpose |
|---|---|---|
| Tokens | Lexical Analysis | Smallest meaningful units of source |
| Symbol Table | All phases | Stores name, type, scope, address of identifiers |
| Parse Tree | Syntax Analysis | Shows grammatical structure of the program |
| AST | Semantic Analysis | Condensed parse tree without syntactic noise |
| DAG | Code Optimization | Detects common subexpressions in a block |
| Intermediate Code (TAC) | ICG phase | Machine-independent representation |
| Literal Table | ICG | Stores numeric and string constants |

---

## 🔑 TOPIC 3: Types of Compilers

**Mnemonic: "SCI-LJ"**

| Type | Key Idea | Remember As |
|---|---|---|
| **S**ingle-Pass | Reads source once — fast, less optimization | "One shot" |
| **C**ross | Runs on machine A, targets machine B | "Remote builder" |
| **I**ncremental | Recompiles only changed parts | "Smart rebuild" |
| **L**oad-and-Go | Loads and runs immediately after compile | "Instant runner" |
| **J**IT | Compiles at runtime | "On-the-fly" |
| Multi-Pass | Multiple traversals — better optimization | "Thorough" |

---

## 🔑 TOPIC 4: Front-End vs Back-End

**Easy way to remember:**
- **Front-End = Understanding the source** (machine-independent)
- **Back-End = Generating the target** (machine-dependent)

```
Front-End:                    Back-End:
Lexical Analysis              Code Optimization
    ↓                             ↓
Syntax Analysis               Code Generation
    ↓                             ↓
Semantic Analysis          Target Machine Code
    ↓
Intermediate Code Gen
```

**Why split into front/back?**
- M languages × N machines needs only M + N components instead of M × N
- Example: 3 languages + 3 machines = 6 modules (not 9)

---

## 🔑 TOPIC 5: Phases of a Compiler — THE MOST IMPORTANT TOPIC

**Mnemonic: "LS-SI-CO-CG"**
**L**exical → **S**yntax → **S**emantic → **I**ntermediate Code → **C**ode **O**ptimization → **C**ode **G**eneration

### Detailed Phase-by-Phase:

**Phase 1 — Lexical Analysis (Scanner):**
- Input: Raw source characters
- Output: Stream of tokens
- Does: Removes whitespace and comments, groups characters into tokens
- Tool: LEX / Flex

**Phase 2 — Syntax Analysis (Parser):**
- Input: Token stream
- Output: Parse tree
- Does: Checks grammar rules, reports syntax errors
- Tool: YACC / Bison

**Phase 3 — Semantic Analysis:**
- Input: Parse tree
- Output: Annotated parse tree
- Does: Type checking, checks scope rules, checks semantic consistency

**Phase 4 — Intermediate Code Generation:**
- Input: Annotated parse tree
- Output: Three-Address Code (TAC)
- Does: Translates to machine-independent IR

**Phase 5 — Code Optimization:**
- Input: TAC
- Output: Optimized TAC
- Does: Removes redundant code, applies loop/constant optimizations

**Phase 6 — Code Generation:**
- Input: Optimized TAC
- Output: Target machine code / assembly
- Does: Register allocation, instruction selection

> **Note:** Symbol Table and Error Handler interact with **every** phase.

---

## 🔑 TOPIC 6: Analysis-Synthesis Model

**Analysis Phase (Front-End):**
Breaks source program into parts and creates IR.
Three sub-parts:
1. Linear analysis (lexical) — reads characters left to right
2. Hierarchical analysis (syntax) — groups tokens into nested structures
3. Semantic analysis — checks meaning

**Synthesis Phase (Back-End):**
Constructs target program from IR.
Two sub-parts:
1. Optimization
2. Code Generation

---

## 🔑 TOPIC 7: Lexical Analysis — Tokens, Patterns, Lexemes

**Three key terms:**

| Term | Definition | Example (for `int x = 5;`) |
|---|---|---|
| **Token** | Category/class of lexical unit | `KEYWORD`, `IDENTIFIER`, `NUMBER` |
| **Lexeme** | Actual string that matched the token | `int`, `x`, `5` |
| **Pattern** | Rule (regular expression) that defines the token | `[a-zA-Z][a-zA-Z0-9]*` for identifiers |

**Full token table for `int x = 5;`:**
| Lexeme | Token |
|---|---|
| `int` | KEYWORD |
| `x` | IDENTIFIER |
| `=` | ASSIGN_OP |
| `5` | INTEGER_LITERAL |
| `;` | SEMICOLON |

---

## 🔑 TOPIC 8: Input Buffering

**Why needed:** Reading one character at a time from disk is too slow.

**Two-Buffer Scheme:**
- Two buffers, each of fixed size (e.g., 4096 bytes = one disk block)
- When one buffer is exhausted, the other is automatically loaded
- Two pointers:
  - **lexemeBegin:** Start of current token being scanned
  - **forward:** Scans ahead to find end of token
- When `forward` reaches end of buffer 1 → buffer 2 is loaded (and vice versa)
- `eof` sentinel is placed at end of each buffer to signal end of input

---

## 🔑 TOPIC 9: Regular Expressions for Token Specification

**Operators to know:**

| Operation | Notation | Meaning |
|---|---|---|
| Union | `a \| b` | matches `a` or `b` |
| Concatenation | `ab` | matches `a` followed by `b` |
| Kleene star | `a*` | zero or more `a`s |
| Plus | `a+` | one or more `a`s |
| Optional | `a?` | zero or one `a` |
| Character class | `[a-z]` | any lowercase letter |

**Common token REs:**
```
letter      →  [a-zA-Z_]
digit       →  [0-9]
identifier  →  letter (letter | digit)*
integer     →  digit+
float       →  digit+ . digit+
whitespace  →  ( | \t | \n)+
```

---

## 🔑 TOPIC 10: Recognition of Tokens — Finite Automata

**NFA vs DFA:**

| Feature | NFA | DFA |
|---|---|---|
| Transitions | Multiple on same input; ε-transitions allowed | Exactly one per input symbol |
| Size | Smaller (built directly from RE) | Larger (may need exponential states) |
| Simulation speed | Slow | Fast |
| Used for | Building from RE | Implementing the lexer |

**Conversion pipeline (must memorize):**
```
Regular Expression
       ↓  (Thompson's Construction)
      NFA
       ↓  (Subset Construction)
      DFA
       ↓  (Table Filling / Myhill-Nerode)
  Minimized DFA
       ↓
  Transition Table (implemented in lexer)
```

---

## 🔑 TOPIC 11: LEX Tool

**What LEX does:** Takes a `.l` specification file with patterns and actions → generates a C function `yylex()` that tokenizes input.

**Structure of a LEX file:**
```
%{
    C declarations (includes, variables)
%}
%%
    pattern1    { action1; }
    pattern2    { action2; }
%%
    User C code (main, etc.)
```

**LEX conflict resolution rules:**
1. **Longest Match Rule:** Always prefer the longest matching lexeme.
   - `>=` is preferred over `>` when input is `>=`
2. **First-Rule-Wins:** If two patterns match the same (equal length) lexeme, the pattern listed **first** in the .l file wins.
   - Helps handle keywords vs identifiers (list keywords before the identifier pattern)

**Example:**
```
%%
"while"          { return WHILE; }        ← listed first → wins over identifier
[a-zA-Z][a-z]*  { return IDENTIFIER; }
[0-9]+          { return NUMBER; }
[ \t\n]         { /* skip */ }
%%
```

---

## 📝 EXAM TIPS FOR MODULE 1

1. **Always define all three:** Token, Lexeme, Pattern — with examples
2. **Draw the conversion pipeline:** RE → NFA → DFA → Minimized DFA
3. **Two-buffer scheme:** Mention both pointers (lexemeBegin + forward) and the sentinel
4. **LEX questions:** Know the file structure and the two conflict resolution rules
5. **Phase questions:** Write all 6 phases in order with input and output for each
