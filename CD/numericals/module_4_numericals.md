# CD Module 4 — All Numericals & Solved Problems

---

## Topic 1: Three-Address Code (TAC) Generation

### Problem 1: Generate TAC for: `a = b + c * d - e / f`

**Step-by-step (following operator precedence, `*` and `/` first):**
```
t1 = c * d
t2 = e / f
t3 = b + t1
t4 = t3 - t2
a  = t4
```

---

### Problem 2: Generate TAC for: `x = (-b + (b*b - 4*a*c)) / (2*a)`

```
t1  = b * b
t2  = 4 * a
t3  = t2 * c
t4  = t1 - t3
t5  = -b
t6  = t5 + t4
t7  = 2 * a
t8  = t6 / t7
x   = t8
```

---

### Problem 3: Generate TAC for: `if (a > b) then x = c + d else x = e - f`

```
if a > b goto L1
t1  = e - f
x   = t1
goto L2
L1: t2 = c + d
    x  = t2
L2: ...
```

---

### Problem 4: Generate TAC for a while loop:
```c
i = 1;
while (i <= n) {
    s = s + i;
    i = i + 1;
}
```

```
L1:
    t1 = i <= n
    if t1 == false goto L2
    t2 = s + i
    s  = t2
    t3 = i + 1
    i  = t3
    goto L1
L2: ...
```

---

## Topic 2: Quadruples, Triples, Indirect Triples

### Problem: Represent `a = b * c + b * c` in all three forms

**TAC first:**
```
t1 = b * c
t2 = b * c    ← same computation — CSE would eliminate this
t3 = t1 + t2
a  = t3
```

**Quadruples (op, arg1, arg2, result):**
| # | op | arg1 | arg2 | result |
|---|---|---|---|---|
| 0 | * | b | c | t1 |
| 1 | * | b | c | t2 |
| 2 | + | t1 | t2 | t3 |
| 3 | = | t3 | — | a |

**Triples (op, arg1, arg2) — result = instruction index:**
| # | op | arg1 | arg2 |
|---|---|---|---|
| 0 | * | b | c |
| 1 | * | b | c |
| 2 | + | (0) | (1) |
| 3 | = | a | (2) |

**Indirect Triples (pointer array + triple table):**
```
Pointer Array: [14, 15, 16, 17]

Triple Table:
14: (*, b, c)
15: (*, b, c)
16: (+, (14), (15))
17: (=, a, (16))
```

---

## Topic 3: Basic Block Identification

### Problem: Identify basic blocks in the following code:
```
1:  prod = 0
2:  i = 1
3:  if i > 10 goto 9
4:  t1 = 4 * i
5:  t2 = a[t1]
6:  t3 = prod + t2
7:  prod = t3
8:  i = i + 1
9:  goto 3
10: ...
```

**Finding Leaders:**
- Line 1: Start of program → **Leader**
- Line 9 (`goto 3`): Target is line 3 → Line 3 is a **Leader**
- Line 3: conditional goto → line 9 target → Line 9 is a **Leader**
- Line 4: Follows conditional → **Leader**

Wait — let me redo numbering carefully:

```
1:  prod = 0          ← Leader (program start)
2:  i = 1
3:  if i > 10 goto 9  ← Leader (target of goto from line 9)
4:  t1 = 4 * i        ← Leader (follows conditional goto)
5:  t2 = a[t1]
6:  t3 = prod + t2
7:  prod = t3
8:  i = i + 1
8b: goto 3
9:  ...               ← Leader (target of conditional goto line 3)
```

**Basic Blocks:**
- **B1:** Lines 1, 2
- **B2:** Line 3
- **B3:** Lines 4, 5, 6, 7, 8, 8b
- **B4:** Line 9

**Flow Graph:**
```
B1 → B2
B2 → B3 (i ≤ 10), B4 (i > 10)
B3 → B2 (loop back via goto 3)
```

---

## Topic 4: DAG Construction

### Problem: Construct DAG for the basic block:
```
1: t1 = a + b
2: t2 = a - b
3: t3 = t1 * t2
4: t4 = a + b    ← same as t1!
5: t5 = t4 - b
6: t6 = t3 * t5
```

**Steps:**
1. `t1 = a + b`: Create nodes for `a`, `b`, create `+` node. Label: t1
2. `t2 = a - b`: Reuse `a`, `b` nodes; create `-` node. Label: t2
3. `t3 = t1 * t2`: Reuse t1 and t2 nodes; create `*` node. Label: t3
4. `t4 = a + b`: Node `a+b` already exists (as t1)! → t4 points to SAME node as t1. **CSE detected!**
5. `t5 = t4 - b`: t4 is same node as t1 (a+b). Create `(a+b) - b` node. Label: t5
6. `t6 = t3 * t5`: Create `*` node. Label: t6

**DAG structure:**
```
        t6 (*)
       /      \
   t3 (*)    t5 (-)
   /    \    /    \
t1(+)  t2(-) t1(+)  b
 / \   / \   / \
a   b a   b a   b
                ↑ same node
```
Note: The `+` node for `a+b` is shared between t1/t4.

**Optimized Code from DAG (with CSE):**
```
t1 = a + b    ← only computed once
t2 = a - b
t3 = t1 * t2
t5 = t1 - b   ← t4 replaced by t1
t6 = t3 * t5
```

---

## Topic 5: Back Patching

### Problem: Show back patching for: `if (a > b) then S1 else S2`

**Boolean expression: `a > b`**
Generate conditional jump with unknown true/false targets:
```
100: if a > b goto ___   ← truelist = {100}
101: goto ___             ← falselist = {101}
```

**Then generate S1:**
```
102: [code for S1]
103: goto ___             ← add to nextlist of if-then-else
```

**Backpatch truelist {100} with 102** (start of S1):
```
100: if a > b goto 102   ← patched!
```

**Then generate S2:**
```
104: [code for S2]
```

**Backpatch falselist {101} with 104** (start of S2):
```
101: goto 104            ← patched!
```

**Final code:**
```
100: if a > b goto 102
101: goto 104
102: [S1 code]
103: goto NEXT
104: [S2 code]
```

---

## Topic 6: Register Allocation — Graph Coloring

### Problem: Assign registers using interference graph

**Temporaries and their live ranges:**
```
t1: lines 1–5
t2: lines 2–6
t3: lines 4–7
t4: lines 5–8
```

**Interference (two temps interfere if their live ranges overlap):**
- t1 & t2: overlap at 2–5 → **interfere**
- t1 & t3: overlap at 4–5 → **interfere**
- t2 & t3: overlap at 4–6 → **interfere**
- t2 & t4: overlap at 5–6 → **interfere**
- t3 & t4: overlap at 5–7 → **interfere**
- t1 & t4: line 5 only → **interfere**

**Interference graph:**
```
t1 - t2 - t4
 \  /      |
  t3 ------+
```

**3-coloring (R1, R2, R3):**
- t1 → R1
- t2 → R2 (conflicts with t1)
- t3 → R3 (conflicts with t1 and t2)
- t4 → R1 (conflicts with t2 and t3 — R1 is free!)

**Register assignment:**
| Temp | Register |
|---|---|
| t1 | R1 |
| t2 | R2 |
| t3 | R3 |
| t4 | R1 |

Only 3 registers needed.

---

## Topic 7: Peephole Optimization

### Problem: Apply peephole optimization to:
```asm
STORE R1, a
LOAD  a, R2
ADD   R2, R2, R3
STORE R2, b
LOAD  b, R2
```

**Pass 1 — Redundant Load elimination:**
- `STORE R1, a` then `LOAD a, R2`: If R1 and R2 are distinct and `a` is only in R1, this is **not** redundant (different registers).
  - BUT if the compiler tracks that `a` was just stored from R1, it can replace `LOAD a, R2` with `MOV R2, R1`.
- `STORE R2, b` then `LOAD b, R2`: **Redundant!** R2 already has the value of `b`. Delete `LOAD b, R2`.

**After optimization:**
```asm
STORE R1, a
MOV   R2, R1      ← (or eliminate if R1 = R2)
ADD   R2, R2, R3
STORE R2, b
```
