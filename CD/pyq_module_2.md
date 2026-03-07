# Expected Questions & PYQ Numerical Solutions - Compiler Design Module 2

Here are the detailed, step-by-step solutions to your Compiler Design PYQs. I have included an explicit teaching guide below the solutions so you can confidently tackle these mathematical parser questions in your upcoming exams.

---

## PYQ 1: Top-Down Parsing Theory

### Q.2(A) Discuss Top Down parsing with example. (5 Marks)
**Solution:**
**Concept:** Top-Down Parsing determines a derivation for an input string by starting identically from the Root (the Start symbol of the CFG) and iteratively expanding non-terminals downwards to successfully generate the leaf nodes (terminals/tokens) that rigidly match the input string. It inherently utilizes a **Leftmost Derivation**.

**Types of Top Down Parsers:**
1. **With Backtracking:** Brute-force guessing. If a choice fails, it undoes operations and tries alternate productions.
2. **Without Backtracking (Predictive/LL):** Employs Lookahead tokens and strict Parsing Tables to pick the correct production immediately.

**Example:**
Assume Grammar: `S -> cAd`, `A -> ab / a`
Input String to parse: `"cad"`
* **Step 1:** Start with Root `S`. String begins with `c`, so we map to `S -> cAd`.
* **Step 2:** Next required terminal to match input `"cad"` is `a`. We now parse `A`.
* **Step 3:** The parser predicts whether to use `A -> ab` or `A -> a`. Because the string requires terminating with `d` eventually, `A -> a` perfectly fits. 
* **Step 4:** Derived tree `S -> c(a)d` identically matches the user string `"cad"`. Accept.

---

## PYQ 2: FIRST and FOLLOW Numericals

### Q.2(B) Calculate FIRST and FOLLOW Symbols. (5 Marks)

**Important Rules for Computation:**
* **FIRST(X):** The set of terminal characters that begin the strings derived strictly from `X`. If `X` derives $\epsilon$ (epsilon), $\epsilon$ is housed in FIRST(X).
* **FOLLOW(X):** The set of terminals that can functionally appear immediately directly to the right of `X` anywhere in derivations. $\epsilon$ NEVER materially belongs in FOLLOW. `$` is always assigned to the Start Symbol.

#### Grammar (i):
`S -> AcB | Cb | ef`
`A -> ae | C`
`B -> b | a`
`C -> g | d`
*(Note: 'c', 'b', 'e', 'f', 'a', 'g', 'd' operate explicitly as terminal symbols).*

**FIRST Sets:**
1. **FIRST(C)** = `{g, d}`
2. **FIRST(B)** = `{b, a}`
3. **FIRST(A)** = `{a}` U `FIRST(C)` = `{a, g, d}`
4. **FIRST(S)** = `FIRST(A)` U `FIRST(C)` U `{e}`
   **FIRST(S)** = `{a, g, d, e}`
   *(Because A and C cannot derive epsilon, we only grab the first entity of each RHS branch).*

**FOLLOW Sets:**
1. **FOLLOW(S)** = `{$}` *(Default rule for Start Symbol)*
2. **FOLLOW(A)** = Looking identically at `S -> AcB`, `A` is strictly followed temporally by terminal `c`. 
   **FOLLOW(A)** = `{c}`
3. **FOLLOW(B)** = Looking at `S -> AcB`, `B` resides securely at the extreme end of the production. Therefore, it pulls the FOLLOW of the LHS. 
   **FOLLOW(B)** = `FOLLOW(S)` = `{$}`
4. **FOLLOW(C)** = 
   - From `S -> Cb`, `C` is explicitly followed by terminal `b`. (So add `b`)
   - From `A -> C`, `C` rests comfortably at the extreme end. Therefore, it grabs `FOLLOW(A)`. (`FOLLOW(A)` is `c`).
   **FOLLOW(C)** = `{b, c}`

---

#### Grammar (ii):
`S -> (L) | a`
`L -> ST`
`T -> ,ST | \epsilon`  *(where \epsilon denotes epsilon)*

**FIRST Sets:**
1. **FIRST(S)** = `{(, a}`
2. **FIRST(T)** = `{,, \epsilon}`
3. **FIRST(L)** = `FIRST(S)` (because S doesn't derive epsilon). 
   **FIRST(L)** = `{(, a}`

**FOLLOW Sets:**
1. **FOLLOW(S)** Initialized exclusively to `{$}`.
   - From `L -> ST`, `S` is actively followed by `T`. We add `FIRST(T)` ignoring $\epsilon$. $\to \{,\}$
   - Since `FIRST(T)` contains $\epsilon$, `T` can effectively vanish, rendering `S` exposed at the end. So we comprehensively add `FOLLOW(L)`. *(We compute `FOLLOW(L)` shortly = `)`).*
   - From `T -> ,ST`, equivalent logic applies. We grab `FIRST(T)` excluding $\epsilon$ and grab `FOLLOW(T)`.
   **FOLLOW(S)** = `{$, ,, )}`
2. **FOLLOW(L)** = Look at `S -> (L)`. `L` is tangibly followed by `)`.
   **FOLLOW(L)** = `{)}`
3. **FOLLOW(T)** = 
   - Logically from `L -> ST`, `T` resides at the end, absorbing `FOLLOW(L)`.
   - Logically from `T -> ,ST`, `T` rests at the end, absorbing `FOLLOW(T)` (loop ignores itself).
   **FOLLOW(T)** = `{)}`

---

## Alternative PYQ: Parser Design & Grammatical Transformations

### Q.2(A) OR: Design a LL(1) Parser & Check String "aeae" (5 Marks)
**Grammar:**
`E -> TT`
`T -> aT | e` *(Assume 'e' represents a tangible terminal character here because the target mathematical string uniquely demands parsing "e" as input.)*

**Step 1: Compute FIRST & FOLLOW**
* **FIRST(T)** = `{a, e}`
* **FIRST(E)** = `FIRST(T)` = `{a, e}`
* **FOLLOW(E)** = `{$}`
* **FOLLOW(T)** = `FIRST(T)` U `FOLLOW(E)` = `{a, e, $}`

**Step 2: Construct Predictive Parsing Table (M)**
*(Rows govern Non-terminals, Columns display Terminals)*

| Non-Terminal | a | e | $ |
| :--- | :--- | :--- | :--- |
| **E** | E -> TT | E -> TT | |
| **T** | T -> aT | T -> e | |

*Because zero cells logically contain duplicate overlapping conflict entries, the grammar fundamentally qualifies as highly LL(1)!*

**Step 3: Check Input String `"aeae$"` via Stack Trace**

| Stack | Input | Action |
| :--- | :--- | :--- |
| `$E` | `aeae$` | Table says `M[E, a]` is `E -> TT`. Pop E, Push TT. |
| `$TT` | `aeae$` | Table says `M[T, a]` is `T -> aT`. Pop T, Push aT. |
| `$TaT`| `aeae$` | Match terminal `a`. Pop stack, advance input. |
| `$TT` | `eae$` | Table says `M[T, e]` is `T -> e`. Pop T, Push e. |
| `$Te` | `eae$` | Match terminal `e`. Pop stack, advance input. |
| `$T` | `ae$` | Table says `M[T, a]` is `T -> aT`. Pop T, Push aT. |
| `$TaT`| `ae$` | Match terminal `a`. Pop stack, advance input. |
| `$TT` | `e$` | Table says `M[T, e]` is `T -> e`. Pop T, Push e. |
| `$Te` | `e$` | Match terminal `e`. Pop stack, advance input. |
| `$` | `$` | **ACCEPT!** Successfully parsed mathematically. |

---

### Q.2(B) Grammar Cleanups (5 Marks)

**(i) Remove Left Recursion**
* **Theory Rule:** `A -> Aα | β` converts robustly to `A -> βA'` and `A' -> αA' | \epsilon`
* **Given Instance:** `E -> E + E | E x E | a`
* **Mapping Components:** A = E; α1 = `+ E`; α2 = `x E`; β = `a`
* **Final Transformed Result:**
  `E -> aE'`
  `E' -> +EE' | xEE' | \epsilon`

**(ii) Remove Left Factoring**
* **Theory Rule:** Resolves ambiguous overlapping prefixes natively. `A -> αβ1 | αβ2` transforms identically factoring cleanly to `A -> αA'` and `A' -> β1 | β2`.
* **Given Instance:** `A -> aAB | aBc | aAc`
* **First Iteration:** Map prefix $\alpha = a$.
  `A -> aA'`
  `A' -> AB | Bc | Ac`
* **Second Iteration (Inner Ambiguity):** Notice `A'` possesses two rules branching identically with the prefix `A`. Let's isolate `A' -> AB | Ac | Bc`. We factor `A` functionally out of the first two strictly!
  `A' -> AA'' | Bc`
  `A'' -> B | c`
* **Final Factored Grammar Core:**
  `A -> aA'`
  `A' -> AA'' | Bc`
  `A'' -> B | c`

---

## 👩‍🏫 How to Hack Compiler Design Numericals (Teaching Guide)

To ace these parser questions during your exam, keep these golden hacks in mind:

1. **Beware the Epsilon ($\epsilon$) vs Terminal `e` Trap:** You must carefully scan the syllabus/input questions. Frequently, examiners type `e` loosely to mean epsilon. **HOWEVER**, if the test string specifically demands parsing "aeae", `e` must absolutely logically represent an active, tangible terminal in the word! (If it was an empty epsilon, the string would just be "aa").
2. **FOLLOW Rules to Burn Into Your Memory:**
   - Always slap a terminal `$` onto your Start symbol instantly before doing any math.
   - Finding FOLLOW simply implies violently scanning the **right-hand-side** of equations seeking out everywhere your target legally lives.
   - If your target lives at the absolute tail-end of a production (e.g. `X -> yZ`), it inevitably swallows the FOLLOW of the LHS entirely (`FOLLOW(Z) includes FOLLOW(X)`).
3. **The Epsilon Cascade Rule:** While finding FOLLOWs, if your target is followed by a Non-Terminal that has $\epsilon$ inside its FIRST set, you must mentally "delete" that Non-Terminal and grab whatever lives directly behind it!
4. **The LL(1) Parse Table Golden Standard:** In `LL(1)` matrices, an entry drops exclusively into the terminal intersections mathematically dictated by `FIRST()`. However, if your equation visibly outputs epsilon ($\epsilon$), you must drop the $\epsilon$-production rule securely under every single terminal specified in the `FOLLOW()` set of the LHS symbol!
