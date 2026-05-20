# CD Module 2 — Syntax Analysis & Syntax Directed Translation

---

## 1. What is Syntax Analysis (Parsing)?

**Syntax Analysis** is the second phase of a compiler. The parser receives the token stream from the lexer and checks whether it conforms to the **grammar** of the source language.

- Input: Token stream (from Lexical Analyzer)
- Output: Parse Tree (or syntax tree)
- Error: Syntax error if the token stream does not match any grammar rule

---

## 2. Context-Free Grammars (CFG)

A **CFG** is used to specify the syntax of a programming language. It consists of:
- **Terminals:** Actual tokens (e.g., `id`, `+`, `(`)
- **Non-terminals:** Syntactic categories (e.g., `E`, `T`, `stmt`)
- **Start Symbol:** The top-level non-terminal (e.g., `S` or `program`)
- **Productions:** Rules of the form `A → α`

**Example Grammar (Arithmetic Expressions):**
```
E → E + T | T
T → T * F | F
F → ( E ) | id
```

**Derivation:** Replacing non-terminals with right-hand sides until only terminals remain.
- **Leftmost Derivation:** Always expand the leftmost non-terminal.
- **Rightmost Derivation:** Always expand the rightmost non-terminal.

**Ambiguous Grammar:** A grammar where one string has two or more distinct parse trees. Compilers must eliminate ambiguity.

---

## 3. Top-Down Parsing

Top-down parsers build the parse tree from the **root (start symbol) down to the leaves (tokens)**.

### Brute Force Approach (Backtracking):
Try every possible production at each step. If a choice fails, backtrack and try the next one.
- Very slow (exponential time in worst case)
- Not used in practice

### Recursive Descent Parsing:
A top-down parser implemented as a set of mutually recursive procedures — one per non-terminal.

```
procedure E():
    T()
    while lookahead == '+':
        match('+')
        T()
```

Simple and easy to write by hand. Fails on **left-recursive grammars**.

### Problems with Top-Down Parsing:

**1. Left Recursion:** A grammar is left-recursive if `A → Aα`. This causes infinite recursion in recursive descent.

**Eliminating Left Recursion:**
```
A → Aα | β
```
becomes:
```
A  → β A'
A' → α A' | ε
```

**2. Left Factoring:** When two productions for the same non-terminal start with the same terminal, the parser can't decide which to use with one token of lookahead.
```
A → α β | α γ
```
becomes:
```
A  → α A'
A' → β | γ
```

---

## 4. Predictive Parsing (LL(1))

**Predictive parsing** is a top-down method that uses a **1-token lookahead** to choose the correct production deterministically (no backtracking).

Works on **LL(1) grammars** — Left-to-right scan, Leftmost derivation, 1 token lookahead.

### FIRST and FOLLOW Sets:
- **FIRST(α):** The set of terminals that can appear as the first symbol of any string derived from α. If α ⟹* ε, then ε ∈ FIRST(α).
- **FOLLOW(A):** The set of terminals that can appear immediately after A in a sentential form. `$` (end of input) is in FOLLOW(Start Symbol).

### Predictive Parsing Table (LL(1) Table):
- For each production `A → α`:
  - For every terminal `a` in FIRST(α), add `A → α` to `M[A, a]`
  - If ε ∈ FIRST(α), for every terminal `b` in FOLLOW(A), add `A → α` to `M[A, b]`
- If any table entry has **two or more** productions, the grammar is **not LL(1)**.

**Predictive Parser Algorithm (Stack-Based):**
```
Stack: [S, $]
Input: token stream ending in $
while stack not empty:
    X = top of stack
    if X == current input token: pop stack, advance input
    elif X is a terminal: ERROR
    else: look up M[X, current token]
          if entry = A → α: pop X, push α (in reverse)
          else: ERROR
```

---

## 5. Bottom-Up Parsing

Bottom-up parsers build the parse tree from the **leaves (tokens) up to the root (start symbol)**.

The core operation is **shift-reduce parsing**:
- **Shift:** Push the next input token onto the stack.
- **Reduce:** When the top of the stack matches the right-hand side of some production, pop it and push the corresponding left-hand side non-terminal.

**Goal:** Reduce the entire input to the start symbol.

### Handles and Viable Prefixes:
- **Handle:** A substring of the current sentential form that matches the RHS of a production; reducing it is a valid step in rightmost derivation (in reverse).

---

## 6. Operator Precedence Parsing

A simple shift-reduce method for grammars where no production has two adjacent non-terminals. Uses a **precedence table** to decide shift or reduce.

Three relations defined between pairs of terminals:
- `a ⋖ b`: `a` yields precedence to `b` (shift)
- `a ≐ b`: Same precedence (shift then reduce)
- `a ⋗ b`: `a` has higher precedence (reduce)

Useful for parsing arithmetic expressions. Limited in applicability.

---

## 7. LR Parsers

**LR parsers** are the most powerful bottom-up parsers. L = Left-to-right scan, R = Rightmost derivation (in reverse), and k = tokens of lookahead.

LR parsers use a **stack of states**, an **action table**, and a **goto table**.

**Algorithm:**
```
while true:
    s = top state on stack, a = current input token
    if action[s, a] = shift s': push s'; advance input
    if action[s, a] = reduce A → β: pop |β| states; s' = top state; push goto[s', A]
    if action[s, a] = accept: success
    if action[s, a] = error: call error recovery
```

### Types of LR Parsers:

**1. SLR (Simple LR):**
- Builds the LR(0) canonical collection of items.
- Uses FOLLOW sets to decide when to reduce.
- Weakest; many grammars cause conflicts.

**2. LR(1) (Canonical LR):**
- Each LR item carries a **lookahead symbol**: `[A → α•β, a]`
- Uses exact lookahead to resolve conflicts.
- Most powerful but produces very large tables.

**3. LALR (Look-Ahead LR):**
- Merges LR(1) states that have the same core (same items, ignoring lookahead).
- Table size same as SLR but power close to LR(1).
- Used by most production tools (YACC, Bison).

| Parser | Power | Table Size | Used By |
|---|---|---|---|
| SLR | Weakest | Small | Learning |
| LALR | Medium | Small | YACC, Bison |
| LR(1) | Strongest | Very Large | Specialized tools |

---

## 8. Parser Generation — YACC

**YACC (Yet Another Compiler-Compiler)** is a tool that generates an LALR parser from a grammar specification file.

```
%{
/* C declarations */
%}
%%
/* Grammar rules and actions */
expr : expr '+' term  { $$ = $1 + $3; }
     | term           { $$ = $1; }
     ;
term : term '*' factor { $$ = $1 * $3; }
     | factor          { $$ = $1; }
     ;
factor : '(' expr ')' { $$ = $2; }
       | NUMBER        { $$ = $1; }
       ;
%%
```

YACC works with LEX: LEX provides the tokens, YACC builds the parse logic.

---

## 9. Syntax Directed Definitions (SDD)

**SDD** attaches semantic rules (equations) to grammar productions. Each grammar symbol has a set of **attributes**.

- **Synthesized Attribute:** Value is computed from the children's attributes in the parse tree. Flows upward. Used in bottom-up translation.
- **Inherited Attribute:** Value is computed from the parent's or sibling's attributes. Flows downward. Used in top-down translation.

An SDD with only synthesized attributes is called an **S-attributed definition**.

**Example (Expression evaluation):**
```
E → E1 + T    { E.val = E1.val + T.val }
E → T         { E.val = T.val }
T → T1 * F   { T.val = T1.val * F.val }
T → F         { T.val = F.val }
F → (E)       { F.val = E.val }
F → digit     { F.val = digit.lexval }
```

---

## 10. Construction of Syntax Trees

A **syntax tree** (abstract syntax tree, AST) is a condensed parse tree where:
- Operators are interior nodes
- Operands are leaves
- Syntactic noise (parentheses, etc.) is removed

**Node construction functions:**
- `mknode(op, left, right)` — creates an interior node for a binary operator
- `mkleaf(id, entry)` — creates a leaf for an identifier
- `mkleaf(num, val)` — creates a leaf for a number

**Example for `a - 4 + c`:**
```
     +
    / \
   -   c
  / \
 a   4
```
Using rules:
```
E → E1 + T  { E.node = mknode('+', E1.node, T.node) }
E → E1 - T  { E.node = mknode('-', E1.node, T.node) }
```

---

## 11. L-Attributed Definitions

An SDD is **L-attributed** if every inherited attribute of a symbol on the right-hand side of a production depends only on:
1. Attributes of symbols to its **left** in the production, or
2. Inherited attributes of the **head** (left-hand side) of the production.

L-attributed definitions can be evaluated in a single left-to-right traversal (top-down order), making them suitable for **top-down translation**.

All S-attributed definitions are also L-attributed.

---

## 12. Bottom-Up Evaluation of SDDs

For **S-attributed** definitions, attributes are evaluated **bottom-up** during shift-reduce parsing. Each time a reduction is performed, the semantic action for that production is executed to compute the attribute of the LHS from the RHS attributes currently on the parser stack.

This is how YACC evaluates `$$` (the synthesized attribute of the LHS) from `$1`, `$2`, ... (the attributes of RHS symbols).
