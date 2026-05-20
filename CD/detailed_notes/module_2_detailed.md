# Module 2 — Detailed Exam Notes
## Syntax Analysis & Syntax Directed Translation

---

## 🔑 TOPIC 1: Context-Free Grammar (CFG)

**Definition to write in exam:**
> A Context-Free Grammar (CFG) is a formal mathematical model used to describe the syntax of a programming language. It consists of four components: Terminals, Non-Terminals, Productions, and a Start Symbol.

**Four components (mnemonic: "TNPS"):**
- **T**erminals — actual tokens/words (`id`, `+`, `(`, `if`)
- **N**on-Terminals — syntactic categories (`E`, `T`, `S`, `stmt`)
- **P**roductions — replacement rules of the form `A → α`
- **S**tart Symbol — the top-level non-terminal (usually `S` or `program`)

**Standard example grammar to memorize:**
```
E → E + T | T
T → T * F | F
F → ( E ) | id
```

**Derivations:**
- **Leftmost Derivation:** Always expand the **leftmost** non-terminal first
- **Rightmost Derivation:** Always expand the **rightmost** non-terminal first

**Ambiguous Grammar:** A grammar that produces **two or more distinct parse trees** for the same input string. Compilers eliminate ambiguity by rewriting grammars.

---

## 🔑 TOPIC 2: Left Recursion Elimination

**Why needed:** Top-down parsers fail on left-recursive grammars (causes infinite recursion).

**Formula (must memorize):**
```
A → A α | β
```
Becomes:
```
A  → β A'
A' → α A' | ε
```

**Example:**
```
E → E + T | T       (α = "+T",  β = "T")

Becomes:
E  → T E'
E' → + T E' | ε
```

**For multiple recursive productions:**
```
A → A α1 | A α2 | β1 | β2

Becomes:
A  → β1 A' | β2 A'
A' → α1 A' | α2 A' | ε
```

---

## 🔑 TOPIC 3: Left Factoring

**Why needed:** When two productions for the same non-terminal start with the same symbol, LL(1) parser can't decide which one to pick.

**Formula:**
```
A → α β | α γ
```
Becomes:
```
A  → α A'
A' → β | γ
```

**Example:**
```
stmt → if E then stmt | if E then stmt else stmt

Becomes:
stmt  → if E then stmt stmt'
stmt' → else stmt | ε
```

---

## 🔑 TOPIC 4: FIRST and FOLLOW Sets

### FIRST Set Rules:
**FIRST(α) = the set of terminals that can appear as the first symbol of any string derived from α**

1. If `a` is a terminal → FIRST(a) = {a}
2. If `A → ε` → add ε to FIRST(A)
3. If `A → X1 X2 ... Xk`:
   - Add FIRST(X1) - {ε}
   - If ε ∈ FIRST(X1), add FIRST(X2) - {ε}
   - If ε ∈ FIRST(X1) and ε ∈ FIRST(X2), add FIRST(X3), and so on
   - If ε ∈ FIRST(Xi) for all i, add ε to FIRST(A)

### FOLLOW Set Rules:
**FOLLOW(A) = the set of terminals that can appear immediately to the right of A in any sentential form**

1. `$` ∈ FOLLOW(Start Symbol) — always!
2. For each production `B → α A β`:
   - Add FIRST(β) - {ε} to FOLLOW(A)
   - If ε ∈ FIRST(β), also add FOLLOW(B) to FOLLOW(A)
3. For each production `B → α A` (A is at the end):
   - Add FOLLOW(B) to FOLLOW(A)

### Example to memorize:
```
Grammar:
E  → T E'
E' → + T E' | ε
T  → F T'
T' → * F T' | ε
F  → ( E ) | id
```

| Non-Terminal | FIRST | FOLLOW |
|---|---|---|
| F | { (, id } | { *, +, ), $ } |
| T' | { *, ε } | { +, ), $ } |
| T | { (, id } | { +, ), $ } |
| E' | { +, ε } | { ), $ } |
| E | { (, id } | { ), $ } |

---

## 🔑 TOPIC 5: LL(1) Parsing Table Construction

**LL(1) = Left-to-right scan, Leftmost derivation, 1 token lookahead**

**Table construction rule:**
For each production `A → α`:
1. For each terminal `a` in FIRST(α): add `A → α` in `M[A, a]`
2. If ε ∈ FIRST(α): for each terminal `b` in FOLLOW(A): add `A → α` in `M[A, b]`

**Grammar is LL(1) if:** No table cell contains more than one production.

**LL(1) Table for the standard grammar above:**

| | id | + | * | ( | ) | $ |
|---|---|---|---|---|---|---|
| E | E→TE' | | | E→TE' | | |
| E' | | E'→+TE' | | | E'→ε | E'→ε |
| T | T→FT' | | | T→FT' | | |
| T' | | T'→ε | T'→*FT' | | T'→ε | T'→ε |
| F | F→id | | | F→(E) | | |

---

## 🔑 TOPIC 6: LL(1) Parser Stack Trace

**Algorithm:**
```
Stack starts with: [S, $]
while stack not empty:
    X = top of stack
    a = current input token
    if X == a: pop stack, advance input (match!)
    elif X is terminal: ERROR
    else:
        if M[X, a] = X → α: pop X, push α in reverse order
        if M[X, a] = error: call error handler
```

**When accept?** When stack has only `$` and input has only `$`.

---

## 🔑 TOPIC 7: Bottom-Up Parsing — Shift-Reduce

**Core idea:** Start from input tokens (leaves) and reduce them up to the start symbol.

**Two operations:**
- **Shift:** Push the next input token onto the stack
- **Reduce:** When top of stack = RHS of some production, pop it and push LHS

**Example:** Grammar `E → E + id | id`
Parsing `id + id`:
```
Stack     Input      Action
---       id+id$     Shift
id        +id$       Reduce E → id
E         +id$       Shift
E +       id$        Shift
E + id    $          Reduce E → E + id
E         $          ACCEPT ✓
```

---

## 🔑 TOPIC 8: LR Parsers — SLR, LALR, LR(1)

**LR Parser uses:**
- **Stack of states**
- **Action table** (what to do given current state + input token)
- **Goto table** (which state to go to after a reduction)

**Action table entries:**
- **shift s:** Push new state s onto stack, advance input
- **reduce r:** Pop |RHS| states, push new state using goto table
- **accept:** Parsing successful
- **error:** Syntax error

**Three types — key differences:**

| Parser | Items Used | Lookahead Used | Power | Table Size |
|---|---|---|---|---|
| **SLR** | LR(0) items | FOLLOW sets (global) | Weakest | Small |
| **LALR** | LR(1) items (merged) | Exact lookahead per state | Medium | Small |
| **LR(1)** | LR(1) items (not merged) | Exact lookahead per state | Strongest | Very Large |

**LR(0) Item:** A production with a dot showing how far parsing has progressed.
- `E → E • + T` means we've seen `E`, now expect `+ T`
- `E → E + T •` means we've seen the whole RHS → reduce!

**SLR reduce rule:** Reduce by `A → α` in state s if the dot is at the end AND the current token is in FOLLOW(A).

**LALR reduce rule:** Reduce by `A → α, {a}` only if current token = `a` (more precise than FOLLOW).

---

## 🔑 TOPIC 9: Operator Precedence Parsing

**Used for:** Grammars where no two adjacent non-terminals appear in any production.

**Three relations between terminals:**
- `a ⋖ b` → a yields to b (shift: b has higher precedence)
- `a ≐ b` → equal precedence (shift, then reduce)
- `a ⋗ b` → a takes precedence (reduce)

**Standard arithmetic table:**
```
        +    *    id    $
  +  [  ⋗    ⋖    ⋖    ⋗  ]
  *  [  ⋗    ⋗    ⋖    ⋗  ]
  id [  ⋗    ⋗    —    ⋗  ]
  $  [  ⋖    ⋖    ⋖    —  ]
```
**Remember:** `*` has higher precedence than `+`, so `+` always shifts when it sees `*`.

---

## 🔑 TOPIC 10: YACC (Parser Generator)

**YACC** = Yet Another Compiler-Compiler. Generates LALR parsers.

**YACC file structure:**
```
%{
    C declarations
%}
%%
    grammar rules with actions
%%
    User C code
```

**Semantic value convention:**
- `$$` = synthesized attribute of the LHS
- `$1, $2, $3, ...` = attributes of RHS symbols (left to right)

**Example:**
```yacc
expr : expr '+' term  { $$ = $1 + $3; }
     | term           { $$ = $1; }
     ;
```

---

## 🔑 TOPIC 11: Syntax Directed Definitions (SDD)

**Definition to write:**
> An SDD is a CFG with associated semantic rules. Each grammar symbol has a set of attributes, and each production has a set of semantic rules that compute attribute values.

**Two types of attributes:**

| Type | Computed From | Flows | Used In |
|---|---|---|---|
| **Synthesized** | Children's attributes | Upward (leaves → root) | Bottom-up translation |
| **Inherited** | Parent's or sibling's attributes | Downward (root → leaves) | Top-down translation |

**S-Attributed Definition:** Only synthesized attributes. Easy to evaluate bottom-up during shift-reduce parsing.

**L-Attributed Definition:** Inherited attributes depend only on:
1. Attributes of symbols to the LEFT in the production, or
2. Inherited attributes of the head (LHS)

L-attributed can be evaluated in a single left-to-right pass.

---

## 🔑 TOPIC 12: Syntax Tree Construction

**Functions used:**
- `mknode(op, left, right)` → creates interior node for binary operator
- `mkleaf(id, entry)` → creates leaf for identifier
- `mkleaf(num, val)` → creates leaf for number

**Example for `a - 4 + c`:**
```
       +
      / \
     -   leaf(c)
    / \
leaf(a) leaf(4)
```

**SDD rules for tree construction:**
```
E → E1 + T   { E.node = mknode('+', E1.node, T.node) }
E → E1 - T   { E.node = mknode('-', E1.node, T.node) }
E → T        { E.node = T.node }
T → (E)      { T.node = E.node }
T → id       { T.node = mkleaf(id, id.entry) }
T → num      { T.node = mkleaf(num, num.val) }
```

---

## 📝 EXAM TIPS FOR MODULE 2

1. **Grammar problems:** Always eliminate left recursion FIRST, then left-factor
2. **FIRST/FOLLOW:** Show step-by-step work — partial credit matters
3. **LL(1) table:** Mark errors as "blank" — do not write "error" in every cell
4. **LR parsers:** Know all three types and their differences — common 5-mark question
5. **SDD:** Always clearly state which attributes are synthesized vs inherited
6. **Syntax tree:** Draw the tree first, then write the mknode/mkleaf calls
7. **Parse traces:** Write stack, input, and action columns — don't skip steps
