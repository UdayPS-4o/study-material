# CD Module 2 — All Numericals & Solved Problems

---

## Topic 1: Left Recursion Elimination

### Problem 1: Eliminate left recursion from:
```
E → E + T | T
T → T * F | F
F → ( E ) | id
```

**Formula:** `A → Aα | β` becomes `A → βA'` and `A' → αA' | ε`

**Applying to E:** (α = `+T`, β = `T`)
```
E  → T E'
E' → + T E' | ε
```

**Applying to T:** (α = `*F`, β = `F`)
```
T  → F T'
T' → * F T' | ε
```

**F** has no left recursion — unchanged.

**Final grammar:**
```
E  → T E'
E' → + T E' | ε
T  → F T'
T' → * F T' | ε
F  → ( E ) | id
```

---

### Problem 2: Eliminate left recursion from:
```
A → A B | A C d | a
B → b
C → c
```

Here A has two left-recursive productions: `A → AB` and `A → ACd`.
Non-recursive (β) production: `A → a`

```
A  → a A'
A' → B A' | C d A' | ε
```

Substituting back:
```
A  → a A'
A' → b A' | c d A' | ε
```

---

## Topic 2: Left Factoring

### Problem: Apply left factoring to:
```
S → i E t S | i E t S e S | a
E → b
```
(`i` = if, `E` = expr, `t` = then, `e` = else)

Productions starting with same prefix `iEtS`:
```
S  → i E t S S' | a
S' → e S | ε
E  → b
```

---

### Problem 2: Left-factor:
```
A → a b c | a b d | e f
```

Common prefix of first two: `ab`
```
A  → a b A' | e f
A' → c | d
```

---

## Topic 3: LR(0) Items and Canonical Collection (SLR)

### Problem: Find canonical LR(0) collection for:
```
Grammar:
S' → S        (augmented production)
S  → C C
C  → c C | d
```

**Start:** I0 = closure({S' → •S})

**Closure rule:** If `A → α•Bβ` is in the set, add all productions `B → •γ`

**I0 = {**
```
S' → •S
S  → •CC
C  → •cC
C  → •d
```
**}**

**goto(I0, S):**
```
I1 = { S' → S• }  ← (ACCEPT state)
```

**goto(I0, C):**
```
I2 = {
  S → C•C
  C → •cC
  C → •d
}
```

**goto(I0, c):**
```
I3 = {
  C → c•C
  C → •cC
  C → •d
}
```

**goto(I0, d):**
```
I4 = { C → d• }
```

**goto(I2, C):**
```
I5 = { S → CC• }  ← (REDUCE by S→CC)
```

**goto(I2, c):** = I3 (same items)

**goto(I2, d):** = I4

**goto(I3, C):**
```
I6 = { C → cC• }  ← (REDUCE by C→cC)
```

**goto(I3, c):** = I3

**goto(I3, d):** = I4

---

## Topic 4: SLR Parsing Table Construction

### Problem: Build SLR table for the grammar above

**Numbered productions:**
```
0: S' → S
1: S  → CC
2: C  → cC
3: C  → d
```

**FOLLOW sets:**
- FOLLOW(S') = {$}
- FOLLOW(S) = {$}
- FOLLOW(C): C appears in S → C•C (so FOLLOW(C) includes FIRST(C) = {c, d}), and in the second position FOLLOW(S) = {$}
- **FOLLOW(C) = {c, d, $}**

**SLR Action/Goto Table:**

| State | c | d | $ | S | C |
|---|---|---|---|---|---|
| 0 | s3 | s4 | | 1 | 2 |
| 1 | | | acc | | |
| 2 | s3 | s4 | | | 5 |
| 3 | s3 | s4 | | | 6 |
| 4 | r3 | r3 | r3 | | |
| 5 | | | r1 | | |
| 6 | r2 | r2 | r2 | | |

*(s = shift, r = reduce by production #, acc = accept)*

---

## Topic 5: SLR Parse Trace

### Problem: Parse `cdcd` using the SLR table above

| Stack | Input | Action |
|---|---|---|
| 0 | cdcd$ | shift → goto state 3 |
| 0 3 | dcd$ | shift → goto state 4 |
| 0 3 4 | cd$ | reduce by C→d; pop 1 state; goto(3,C)=6 |
| 0 3 6 | cd$ | reduce by C→cC; pop 2 states; goto(0,C)=2 |
| 0 2 | cd$ | shift c → goto state 3 |
| 0 2 3 | d$ | shift d → goto state 4 |
| 0 2 3 4 | $ | reduce by C→d; pop 1; goto(3,C)=6 |
| 0 2 3 6 | $ | reduce by C→cC; pop 2; goto(2,C)=5 |
| 0 2 5 | $ | reduce by S→CC; pop 2; goto(0,S)=1 |
| 0 1 | $ | **ACCEPT** ✓ |

---

## Topic 6: LALR Table Construction — Key Differences from SLR

**Key difference:** LALR uses more precise lookahead sets (calculated from the LR(1) items) rather than the global FOLLOW sets used in SLR. This resolves some conflicts that SLR cannot.

**Merging LR(1) States for LALR:**
Two LR(1) states can be merged if they have the **same core** (same items ignoring lookahead).

**Example:**
```
LR(1) states with same core:
[C → c•C, c/d]  and  [C → c•C, $]
→ Merged LALR state: [C → c•C, c/d/$]
```

---

## Topic 7: Operator Precedence Table

### Problem: Build precedence relations for: `E → E + E | E * E | id`

**Standard arithmetic rules:** `*` has higher precedence than `+`; both are left-associative.

**Precedence table:**

| | `+` | `*` | `id` | `$` |
|---|---|---|---|---|
| `+` | ⋗ | ⋖ | ⋖ | ⋗ |
| `*` | ⋗ | ⋗ | ⋖ | ⋗ |
| `id` | ⋗ | ⋗ | — | ⋗ |
| `$` | ⋖ | ⋖ | ⋖ | — |

*(⋖ = shift, ⋗ = reduce)*

### Parsing `id + id * id` using operator precedence:

| Stack | Input | Relation | Action |
|---|---|---|---|
| $ | id+id*id$ | $⋖id | Shift |
| $ id | +id*id$ | id⋗+ | Reduce id→E |
| $ E | +id*id$ | $⋖+ | Shift |
| $ E + | id*id$ | +⋖id | Shift |
| $ E + id | *id$ | id⋗* | Reduce id→E |
| $ E + E | *id$ | +⋖* | Shift |
| $ E + E * | id$ | *⋖id | Shift |
| $ E + E * id | $ | id⋗$ | Reduce id→E |
| $ E + E * E | $ | *⋗$ | Reduce E*E→E |
| $ E + E | $ | +⋗$ | Reduce E+E→E |
| $ E | $ | Accept ✓ | |

---

## Topic 8: Syntax Tree Construction

### Problem: Construct the syntax tree for `a + b * c`

**Using the annotated grammar:**
```
E → E + T   { E.node = mknode('+', E.node, T.node) }
E → T
T → T * F   { T.node = mknode('*', T.node, F.node) }
T → F
F → id      { F.node = mkleaf(id, 'a'/'b'/'c') }
```

**Tree:**
```
       +
      / \
     a   *
        / \
       b   c
```

Nodes: `mknode('+', mkleaf(id,'a'), mknode('*', mkleaf(id,'b'), mkleaf(id,'c')))`

---

## Topic 9: FIRST and FOLLOW for a Larger Grammar

### Problem: Compute FIRST and FOLLOW for:
```
S → A B C
A → a | ε
B → b | ε
C → c
```

**FIRST:**
- `FIRST(C)` = {c}
- `FIRST(B)` = {b, ε}
- `FIRST(A)` = {a, ε}
- `FIRST(S)` = FIRST(A) ∪ (since ε∈FIRST(A)) → FIRST(B) ∪ (since ε∈FIRST(B)) → FIRST(C)
  = {a, b, c} (excluding ε since ε∉FIRST(C))

**FOLLOW:**
- `FOLLOW(S)` = {$}
- `FOLLOW(A)`:
  S → A•BC: FIRST(BC) = FIRST(B) ∪ (ε∈FIRST(B)?FIRST(C):{}) = {b, c}
  → FOLLOW(A) = {b, c}
- `FOLLOW(B)`:
  S → AB•C: FIRST(C) = {c}
  → FOLLOW(B) = {c}
- `FOLLOW(C)`:
  S → ABC•: FOLLOW(S) = {$}
  → FOLLOW(C) = {$}
