# CD Module 1 — Introduction to Compiling & Lexical Analysis

---

## 1. What is a Compiler?

A **compiler** is a program that translates source code written in a high-level programming language (like C, Java) into a lower-level language (like machine code or assembly) that the CPU can execute.

The process is called **compilation**. Unlike an interpreter (which executes code line-by-line at runtime), a compiler translates the **entire** program before execution begins.

**Key Benefits of a Compiler:**
- Faster execution (code is pre-translated, not interpreted at runtime)
- Error detection before running the program
- Platform-specific optimizations

---

## 2. Major Data Structures in a Compiler

| Data Structure | Purpose |
|---|---|
| **Tokens** | Smallest lexical units output by the scanner |
| **Symbol Table** | Stores identifiers, types, scopes, and memory locations |
| **Parse Tree / Syntax Tree** | Hierarchical representation of syntactic structure |
| **Abstract Syntax Tree (AST)** | Condensed parse tree without redundant nodes |
| **DAG (Directed Acyclic Graph)** | Detects common subexpressions in basic blocks |
| **Intermediate Code** | Machine-independent representation (e.g., TAC) |
| **Literal Table** | Stores constants and string literals |

---

## 3. Types of Compilers

| Type | Description | Example |
|---|---|---|
| **Single-Pass Compiler** | Traverses source code only once; fast but limited optimization | Early Pascal compilers |
| **Multi-Pass Compiler** | Traverses IR multiple times; better optimization | Modern GCC |
| **Cross Compiler** | Runs on one machine, generates code for a different machine/OS | ARM compiler on x86 PC |
| **Load-and-Go Compiler** | Directly loads compiled object code into memory and runs it | Used in educational compilers |
| **Incremental Compiler** | Recompiles only the changed parts of the source, not the whole file | IDEs |
| **Just-In-Time (JIT)** | Compiles at runtime, combining interpreter speed with compiled efficiency | Java JVM, .NET CLR |

---

## 4. Front-End and Back-End of a Compiler

**Front-End (Machine Independent):**
Deals with understanding the source language. Produces intermediate representation (IR).
- Lexical Analysis
- Syntax Analysis (Parsing)
- Semantic Analysis
- Intermediate Code Generation

**Back-End (Machine Dependent):**
Deals with generating efficient target code for a specific CPU.
- Code Optimization
- Code Generation
- Target-specific register and instruction selection

The separation enables building a compiler for **M languages** on **N machines** using only **M + N** modules (instead of **M × N**).

---

## 5. Compiler Structure: Analysis–Synthesis Model

The compilation process is divided into two broad phases:

**Analysis Phase (Front-End):**
- Breaks the source program into its constituent parts
- Creates an intermediate representation
- Reports errors

**Synthesis Phase (Back-End):**
- Constructs the target program from the intermediate representation

---

## 6. Phases of a Compiler (in order)

```
Source Code
    ↓
1. Lexical Analysis     → Token Stream
    ↓
2. Syntax Analysis      → Parse Tree
    ↓
3. Semantic Analysis    → Annotated Parse Tree / AST
    ↓
4. Intermediate Code    → Three-Address Code (TAC)
   Generation
    ↓
5. Code Optimization    → Optimized TAC
    ↓
6. Code Generation      → Target Machine Code
```

**Symbol Table** and **Error Handler** interact with every phase.

### Phase-by-Phase Detail:

**1. Lexical Analysis (Scanner):**
Reads characters, groups them into **tokens** (lexemes). Strips whitespace and comments.

**2. Syntax Analysis (Parser):**
Checks if the token stream follows the grammar rules of the language. Builds a **parse tree**.

**3. Semantic Analysis:**
Checks for semantic errors (e.g., type mismatches, undeclared variables). Performs **type checking**.

**4. Intermediate Code Generation:**
Translates the parse tree into a machine-independent IR like Three-Address Code.

**5. Code Optimization:**
Improves the IR for speed/size. Applies transformations like constant folding, dead code elimination.

**6. Code Generation:**
Translates optimized IR into actual machine code or assembly instructions for the target CPU.

---

## 7. Single-Pass vs Multi-Pass Compiler

| Feature | Single-Pass | Multi-Pass |
|---|---|---|
| Passes over source | Once | Multiple times |
| Speed | Faster compilation | Slower compilation |
| Optimization quality | Limited | High |
| Memory usage | Lower | Higher |
| Supports forward references? | No (hard) | Yes |
| Example use | Embedded systems | GCC, modern compilers |

---

## 8. Lexical Analysis

### Role of the Lexer (Scanner):
- Reads the source character by character
- Groups characters into **tokens**
- Removes whitespace and comments
- Outputs a stream of tokens to the parser

### Key Terminology:
- **Token:** A category of lexical unit. E.g., `IDENTIFIER`, `NUMBER`, `KEYWORD`, `OPERATOR`
- **Lexeme:** The actual string matched by the token. E.g., `while`, `x123`, `42`
- **Pattern:** The rule (usually a regular expression) describing valid lexemes for a token

**Example:**
For the source code `int x = 5 + y;`
| Lexeme | Token |
|---|---|
| `int` | KEYWORD |
| `x` | IDENTIFIER |
| `=` | ASSIGN_OP |
| `5` | NUMBER |
| `+` | ARITH_OP |
| `y` | IDENTIFIER |
| `;` | SEMICOLON |

---

## 9. Input Buffering

Reading the source file one character at a time is too slow. Instead, the lexer uses a **two-buffer scheme**.

**Two-Buffer Scheme:**
- Two fixed-size buffers (e.g., 4096 bytes each) are alternately loaded with the next chunk of input.
- Two pointers are used:
  - **lexemeBegin:** Points to the start of the current lexeme being scanned.
  - **forward:** Scans ahead one character at a time to find the end of the token.
- When `forward` reaches the end of one buffer, the other buffer is automatically loaded.
- This allows efficient **lookahead** without rereading from disk.

---

## 10. Specification of Tokens — Regular Expressions

Tokens are specified using **regular expressions (RE)**. REs are built from:
- **Single characters:** `a`, `b`, `0`
- **Union:** `a | b` — matches `a` or `b`
- **Concatenation:** `ab` — matches `a` followed by `b`
- **Kleene Star:** `a*` — matches zero or more `a`s
- **Plus:** `a+` — matches one or more `a`s
- **Optional:** `a?` — matches zero or one `a`

**Examples:**
| Token | Regular Expression |
|---|---|
| Identifier | `letter (letter | digit)*` where `letter = [a-zA-Z_]` |
| Integer | `digit+` where `digit = [0-9]` |
| Float | `digit+ . digit+` |
| Whitespace | `( \| \t \| \n)+` |

---

## 11. Recognition of Tokens — Finite Automata

To recognize tokens described by regular expressions, we use **Finite Automata (FA)**.

- **NFA (Non-deterministic Finite Automaton):** Allows multiple transitions on the same input; can have ε-transitions. Easier to build from RE but harder to simulate.
- **DFA (Deterministic Finite Automaton):** Every state has exactly one transition per input symbol. Faster to simulate. Built by converting from NFA.

**Conversion Steps:**
```
Regular Expression → NFA (Thompson's Construction)
                  ↓
             NFA → DFA (Subset Construction)
                  ↓
             DFA → Minimized DFA (Table Filling / Myhill-Nerode)
```

The minimized DFA is then implemented as a **transition table** in the lexer.

---

## 12. Lexical Analyzer Generator — LEX

**LEX** (also called **Flex** in modern systems) is a tool that automatically generates a lexical analyzer from a specification file.

### Structure of a LEX File:
```
%{
/* C declarations and includes */
%}
%%
/* Rules: pattern  { action } */
[a-zA-Z][a-zA-Z0-9]*   { return IDENTIFIER; }
[0-9]+                  { return NUMBER; }
"+"                     { return PLUS; }
[ \t\n]                 { /* skip whitespace */ }
%%
/* User C code */
```

### How LEX Works:
1. User writes patterns (regular expressions) paired with actions (C code).
2. LEX converts the patterns into an NFA, converts NFA to DFA, and minimizes the DFA.
3. It generates a C function `yylex()` that simulates this DFA on the input.
4. On each call to `yylex()`, it returns the next token to the parser.

**LEX handles conflicts using two rules:**
- **Longest match:** Always prefer the longest possible lexeme (e.g., `>=` over `>`).
- **First rule wins:** If two patterns match the same lexeme, the pattern listed first in the LEX file wins.
