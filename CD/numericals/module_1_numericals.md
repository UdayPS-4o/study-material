# CD Module 1 — All Numericals & Solved Problems

---

## Topic 1: Regular Expressions → NFA (Thompson's Construction)

### Problem 1: Draw NFA for RE: `a(b|c)*`

**Step 1:** NFA for `a`:
```
→ q0 --a--> q1 (accept)
```

**Step 2:** NFA for `b`:
```
→ q2 --b--> q3
```
NFA for `c`:
```
→ q4 --c--> q5
```

**Step 3:** NFA for `b|c` (union — add new start & accept with ε-transitions):
```
         ε→ q2 --b--> q3 --ε→
→ q6 --|                      |--> q7 (accept)
         ε→ q4 --c--> q5 --ε→
```

**Step 4:** NFA for `(b|c)*` (Kleene star — add ε loop-back):
```
→ q8 --ε--> q6 ... q7 --ε--> q8
            also: q8 --ε--> q9 (accept, handles zero repetitions)
```

**Step 5:** NFA for `a(b|c)*` (concatenate):
```
→ q0 --a--> q1 --ε--> [NFA for (b|c)*]
```

---

### Problem 2: Draw NFA for RE: `(a|b)*abb`

This is a classic. The NFA recognizes all strings of a's and b's ending in `abb`.

**States:** q0 (start+accept of star), q1, q2, q3, q4 (final)

```
q0 --a--> q0   (loop on a)
q0 --b--> q0   (loop on b)
q0 --a--> q1   (start matching 'abb')
q1 --b--> q2
q2 --b--> q3  (accept)
```

**Accept state:** q3

---

## Topic 2: NFA → DFA (Subset Construction)

### Problem: Convert the NFA for `(a|b)*abb` to DFA

**NFA States:** q0, q1, q2, q3 (accept)
**Transitions:**
```
q0 --a--> {q0, q1}
q0 --b--> {q0}
q1 --b--> {q2}
q2 --b--> {q3}
```

**Subset Construction Table:**

| DFA State (NFA subset) | On `a` | On `b` |
|---|---|---|
| **A = {q0}** (start) | {q0,q1} = B | {q0} = A |
| **B = {q0,q1}** | {q0,q1} = B | {q0,q2} = C |
| **C = {q0,q2}** | {q0,q1} = B | {q0,q3} = D |
| **D = {q0,q3}** ★ accept | {q0,q1} = B | {q0} = A |

★ D contains q3 (NFA accept state) → D is a DFA accept state.

**Final DFA:**
```
A --a--> B    A --b--> A
B --a--> B    B --b--> C
C --a--> B    C --b--> D
D --a--> B    D --b--> A
```

---

## Topic 3: DFA Minimization

### Problem: Minimize a DFA

**Given DFA:** States {A, B, C, D, E}, accept states {C, E}, on alphabet {0, 1}
```
A --0--> B,  A --1--> C
B --0--> B,  B --1--> D
C --0--> B,  C --1--> C
D --0--> B,  D --1--> E
E --0--> B,  E --1--> C
```

**Step 1:** Initial partition: `{C, E}` (accept), `{A, B, D}` (non-accept)

**Step 2:** Check if `{A, B, D}` can be split.
- On `1`: A→C (accept), B→D (non-accept), D→E (accept)
- B goes to non-accept on 1; A and D go to accept on 1 → Split: `{A, D}` and `{B}`

**Step 3:** Partition now: `{C, E}`, `{A, D}`, `{B}`
Check `{C, E}` on `0`: C→B, E→B (same group). On `1`: C→C, E→C (same group) → No split.
Check `{A, D}` on `0`: A→B, D→B (same). On `1`: A→C (accept group), D→E (accept group) → No split.

**Final minimized groups:** `{A, D}`, `{B}`, `{C, E}`
**States renamed:** P={A,D}, Q={B}, R={C,E}

---

## Topic 4: Computing FIRST Sets

### Problem: Compute FIRST for each non-terminal

```
Grammar:
E  → T E'
E' → + T E' | ε
T  → F T'
T' → * F T' | ε
F  → ( E ) | id
```

**Step-by-step:**
- `FIRST(F)` = { `(`, `id` }  ← directly from F → (E) and F → id
- `FIRST(T')` = { `*`, ε }  ← T' → *FT' gives *, T' → ε gives ε
- `FIRST(T)` = `FIRST(F)` = { `(`, `id` }  ← since T → FT' and ε ∉ FIRST(F)
- `FIRST(E')` = { `+`, ε }  ← E' → +TE' gives +, E' → ε gives ε
- `FIRST(E)` = `FIRST(T)` = { `(`, `id` }  ← since E → TE' and ε ∉ FIRST(T)

---

## Topic 5: Computing FOLLOW Sets

### Problem: Compute FOLLOW for the same grammar above

**Rules:**
1. `$` ∈ FOLLOW(E) (start symbol)
2. For each production, propagate FOLLOW:

**FOLLOW(E):**
- From `F → (E)`: `)` follows E → add `)`
- Start symbol: add `$`
- **FOLLOW(E) = { ), $ }**

**FOLLOW(E'):**
- From `E → TE'`: FOLLOW(E') ⊇ FOLLOW(E) = { ), $ }
- **FOLLOW(E') = { ), $ }**

**FOLLOW(T):**
- From `E → TE'`: FIRST(E') - {ε} = {+} → add `+`
- Since ε ∈ FIRST(E'): also add FOLLOW(E') = {), $}
- **FOLLOW(T) = { +, ), $ }**

**FOLLOW(T'):**
- From `T → FT'`: FOLLOW(T') ⊇ FOLLOW(T) = {+, ), $}
- **FOLLOW(T') = { +, ), $ }**

**FOLLOW(F):**
- From `T → FT'`: FIRST(T') - {ε} = {*}
- Since ε ∈ FIRST(T'): FOLLOW(T') = {+, ), $}
- **FOLLOW(F) = { *, +, ), $ }**

---

## Topic 6: LL(1) Parsing Table Construction

### Problem: Construct the LL(1) table for the above grammar

**Rule:** For production `A → α`:
- For each `a` ∈ FIRST(α), add `A → α` to M[A, a]
- If ε ∈ FIRST(α), add `A → α` to M[A, b] for each `b` ∈ FOLLOW(A)

| | `id` | `+` | `*` | `(` | `)` | `$` |
|---|---|---|---|---|---|---|
| E | E→TE' | | | E→TE' | | |
| E' | | E'→+TE' | | | E'→ε | E'→ε |
| T | T→FT' | | | T→FT' | | |
| T' | | T'→ε | T'→*FT' | | T'→ε | T'→ε |
| F | F→id | | | F→(E) | | |

No cell has two entries → Grammar **is LL(1)** ✓

---

## Topic 7: LL(1) Parsing Trace (Stack Simulation)

### Problem: Parse `id + id * id` using the LL(1) table above

| Stack (top→left) | Input | Action |
|---|---|---|
| E $ | id+id*id$ | M[E,id] = E→TE' → pop E, push E'T |
| E' T $ | id+id*id$ | M[T,id] = T→FT' → pop T, push T'F |
| E' T' F $ | id+id*id$ | M[F,id] = F→id → pop F, push id |
| E' T' id $ | id+id*id$ | Match id, pop id, advance |
| E' T' $ | +id*id$ | M[T',+] = T'→ε → pop T' |
| E' $ | +id*id$ | M[E',+] = E'→+TE' → pop E', push E'T+ |
| E' T + $ | +id*id$ | Match +, pop +, advance |
| E' T $ | id*id$ | M[T,id] = T→FT' → pop T, push T'F |
| E' T' F $ | id*id$ | M[F,id] = F→id → pop F, push id |
| E' T' id $ | id*id$ | Match id, advance |
| E' T' $ | *id$ | M[T',*] = T'→*FT' → push T'F* |
| E' T' F * $ | *id$ | Match *, advance |
| E' T' F $ | id$ | F→id → push id |
| E' T' id $ | id$ | Match id, advance |
| E' T' $ | $ | T'→ε |
| E' $ | $ | E'→ε |
| $ | $ | **ACCEPT** ✓ |
