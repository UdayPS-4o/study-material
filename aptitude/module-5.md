# Module 5 — Reasoning II

> Syllogisms · Number / Letter Series · Family-Profession Puzzles · Dice & Cube Folding · Scheduling

---

## 1. Syllogisms — Venn diagram method

### Core idea
Draw circles for each set. A conclusion **follows** only if it's true in **EVERY** possible diagram.

### Statement types
| Statement | Diagram |
|---|---|
| **All A are B** | A entirely inside B |
| **No A is B** | A and B disjoint (no overlap) |
| **Some A are B** | A and B overlap |
| **Some A are not B** | A has a region outside B |

### Key inference rules
- "All A are B" → "Some B are A" ✓ (definitely true).
- "Some A are B" → "Some B are A" ✓ (symmetric).
- "No A is B" → "No B is A" ✓ (symmetric).
- "Some A are not B" does **not** mean "Some B are not A".

### Q1. All N are Q. Some H are Q. Conclusions: I) Some Q are N; II) Some Q are H; III) Some N are H.
- I) All N are Q → some Q are N. ✓
- II) Some H are Q → some Q are H. ✓
- III) Some N are H — H overlaps Q, N is inside Q, but H may overlap N or not. ✗
- **Answer: (b) Both I and II follow.**

### Q2. Some Bangles are Bracelets. All chains are Rings. Some Bracelets are Chains.
- I) Some Bangles are Rings — Bangle overlaps Bracelet, Bracelet overlaps Chain, Chain ⊂ Rings. But the Bangle-bracelet overlap and bracelet-chain overlap may not be the same bracelets. ✗ (not necessary).
- II) Some Chains are Bangles — same issue. ✗
- III) Some Rings are Bracelets — Some Bracelets are Chains and All Chains are Rings → those bracelets that are chains are also rings. ✓
- **Answer: (a) Only III follows.**

### Q3. All Z are D. No Y is Z.
- I) Some D are not Y — Z is inside D and Z has nothing in common with Y, so Z-part of D is not Y → some D are not Y. ✓
- II) Some Z are not Y — No Y is Z means **all** Z are not Y, so certainly some Z are not Y. ✓
- III) Some D are Z — All Z are D means Z is in D, so some D are Z (assuming Z is non-empty). ✓
- **Answer: (a) All follow.**

### Q4. Some red are black. No white is black.
- I) No black is white — same as "No white is black" (symmetric). ✓
- II) No white is red — not necessary; white might overlap red outside black. ✗
- III) No black is red — contradicts "Some red are black". ✗
- **Answer: (c) Only I follows.**

### Q5. All truck are car. Some car are bike.
- I) No bike is truck — possible but not necessary. ✗
- II) Some truck are car — All truck are car → Some truck are car. ✓
- III) Some bike are car — symmetric of "some car are bike". ✓
- **Answer: (d) Both II and III follow.**

> **Trick:** when in doubt, sketch the **counter-example** diagram (one where statements hold but conclusion fails). If you can draw one, the conclusion doesn't follow.

---

## 2. Number / Letter Series

### Common patterns
| Pattern | Example |
|---|---|
| Arithmetic | 3, 7, 11, 15 (+4) |
| Geometric | 5, 10, 20, 40 (×2) |
| Squares / cubes | 1, 4, 9, 16 |
| Difference of differences | 2, 6, 12, 20 (+4, +6, +8) |
| Prime numbers | 2, 3, 5, 7, 11 |
| Mixed (alternating) | 1, 10, 2, 20, 3, 30 |

### Q6.1 — 10, 50, 250, 1250, 6250, ?
- Each ×5 → next = **31,250**.

### Q6.2 — 35, ?, 40, 47, 45, 53
- Two interleaved series: (35, 40, 45) — odd terms (+5), and (?, 47, 53) — even terms (+6).
- Missing = 47 − 6 = **41**.

### Q6.3 — 40 : 100 :: 56 : ?
- 40 → 100: ratio 5/2. 56 × 5/2 = **140**.

### Q6.4 — 562 : 30 :: 663 : ?
- 5+6+2 = 13, 13² = 169? No → try 5×6−0=? Or 5+6+2 = 13, 13+13=… Try 5²+6²+2² = 25+36+4 = 65. Not 30.
- 5×6 = 30 ✓ (product of first two digits). 6×6 = **36**.

### Q6.5 — 10001 : 10101 :: 101 : ?
- 10001 → 10101: difference 100. 101 + ?... Try pattern: insert "01" or square. 10001 = 100² + 1; (100²+1) → (101²?). 101² = 10201, not 10101.
- Note: 10101 = 101 × 100 + 1, and 10001 = 100×100+1. Ratio of "base": 100 → 101. Apply to 101 → 102. So 102×100+1? = 10201. Or simpler: shift digit-blocks. Likely answer = **10201**.

---

## 3. Family & Profession Puzzle (Q7–Q11)

### Q7. Exam schedule (Mon–Sun)
- Clues: Q before T before P; P=Wed; R not Sat/Sun; U=Fri; S immediately after U → S=Sat.
- Order so far: __, __, P(Wed), __, U(Fri), S(Sat), __.
- Q immediately before T immediately before P → T=Tue, Q=Mon.
- R not Sat/Sun → R=Thu (Wed and Sat/Sun ruled out, Mon/Tue/Fri taken).
- Sunday → only V left.
- **V gives exam on Sunday.**

### Q8. Three vehicles, 7 people. *Solve via table*:

Given:
1. R lady doctor; not with sisters P, V.
2. Q male engineer + W (teacher) only in vehicle I (so 2 people in I).
3. S male doctor.
4. Same profession can't share vehicle.
5. P not engineer, in vehicle II.

Deduce:
- Engineers: Q, ? (only 2). Q in I. Other engineer in II or III.
- Doctors: R (female), S (male). Different vehicles.
- Teachers: 3 total; W is one.
- P (vehicle II, not engineer). Sisters P & V together → V in II.
- R not with P, V → R in III. S then in II (because R and S must be split).
- Vehicle II: P, V, S. Vehicle III: R + remaining. Remaining = T. R, T in III.
- T must be teacher (engineers all placed: Q + ?). Actually remaining engineer is needed — but only Q is engineer placed, and other engineer must be different vehicle. If only Q is engineer, "two engineers" ⇒ another is in II or III. P is not engineer. S is doctor. V could be engineer? V is sister of P (female) — likely teacher. T in III: if T = engineer, V or one of II must be teacher. Try T=engineer (in III). Then teachers = W + 2 from {P, V, S → no, S is doctor → P, V}. ✓
- **Vehicle I:** Q (engineer), W (teacher).
- **Vehicle II:** P (teacher), V (teacher), S (doctor). — but same profession (P,V both teachers) is OK per clue 4? No! Clue 4 says same profession can't share. So one of P/V is not teacher. Hmm — revisit: 3 teachers total are W + 2 of {P, V, T}. If P and V both teachers and in II → violates 4. So V must be **engineer** (the 2nd engineer), placed in II.
- **Vehicle II:** P (teacher), V (engineer), S (doctor). ✓
- **Vehicle III:** R (doctor), T (teacher).
- All 7 placed, all constraints satisfied.

### Q9. Family of 7 (3F, 4M), R-lawyer married to P-teacher, V-engineer married to S, Q is sister of W (manager).
- No lady is teacher or engineer → P (teacher) is **male**; V (engineer) is **male**.
- R (lawyer) married to P (male teacher) → R is **female lawyer**.
- V (male engineer) married to S → S is **female**. S not lawyer, not doctor → S is **manager**.
- Q is sister of W (manager) → Q is **female**. W is one of the managers; S is the other manager. W = male manager (since 4 males and we've used 2 for males: P,V — need 2 more males from {R(F), S(F), Q, W, T}).
- Females: R, S, Q (3 ✓). Males: P, V, W, T (4 ✓).
- Q's profession: must be lawyer or doctor (not teacher/engineer per rule; not manager since S is the female manager and "no two ladies have same profession"). Lawyers needed: 2 (R + 1 more) — Q could be the 2nd lawyer.
- T must be **doctor** (only profession left to fill 1 doctor slot).

**(1) T's profession = Doctor → answer: (e) None of these** *(if Doctor isn't in options).* Or per typical answer: **Doctor**.

**(2) Q's profession = Lawyer → (b).**

### Q10. Ages
- B = 12. D = 5B = 60. D = 4C → C = 15. A = 2C = 30. E = 3A = **90**.

### Q11. Seven students, subjects, marks ranking
- R = 2nd highest marks; R's subject ≠ Science/French/Chemistry. → R could be: Bio, English, Math, Hindi. S=Bio, Q=English, P=Hindi → **R = Mathematics**.
- T = lowest marks; T's subject ≠ Math/Chemistry. So T's subject ∈ {Science, French, ... wait French is highest marks} so T ≠ French. T ∈ {Science, Biology already taken, English taken, Hindi taken}. → **T = Science**.
- French = highest marks. Remaining for French: V or W. P = Hindi but not highest, so highest is one of {V, W}. Q's subject = English.
- Marks order: T < Q < W < S < P < R < (highest). Highest = French = either V or W. W's subject must be Chemistry or French. Since W's marks > Q's but P > S > W and P not highest, W is not highest → W ≠ French → **W = Chemistry**, and V = French (highest).

**(1) T's subject: Science.**
**(2) W's subject: Chemistry.**
**(3) Second lowest: Q** *(T lowest, then Q)*. 
**(4) French is V's subject. (e) V.**

---

## 4. Dice & Cube Folding

### Universal dice rule
> **Opposite faces of a standard die sum to 7**: 1↔6, 2↔5, 3↔4.

But puzzles often use **non-standard dice**. Then use:

### The "rotation matching" technique
1. Find a face that appears in **two views** → it's a reference.
2. Note which faces are adjacent to it.
3. The **remaining number not seen adjacent to it** is the opposite face.

### Q12. Dice views: (3,4,2), (4,6,2), (4,5,6). Opposite of '1'?
- Faces seen: 2, 3, 4, 5, 6. Face NOT seen = 1.
- Actually 1 is being asked about — so 1 IS one of the faces (just not in the 3 shown). Let's track faces around 4.
- Fig 1: 3 (top), 4 (front), 2 (right). 
- Fig 2: 4 (top), 6 (front), 2 (right). 
- Fig 3: 4 (top), 5 (front), 6 (right).
- Adjacent to 4: 3, 2, 6, 5 (from figures 1,2,3). All four found → opposite of 4 = 1. So 1 is opposite **4**, meaning opposite of 1 is **4**.
- **Answer: (d) 4.**

### Q13. Views: (5,3,4), (4,3,6), (1,4,6). Opposite of '3'?
- Adjacent to 3: 5, 4 (fig 1); 4, 6 (fig 2). So 3 is adjacent to {4, 5, 6}.
- 6 faces: 1,2,3,4,5,6. Seen: 1,3,4,5,6. Missing = 2. So 2 must be opposite something — likely opposite to 3? But also need 3 not adjacent to 1.
- Fig 3 shows 1 with 4, 6 — 3 is not in fig 3. If 3 is opposite to 1, then 1 is also not adjacent to 3. ✓
- **Answer: (c) 1.**

### Q15. Two views (2,6,3) and (6,3,5). Opposite of 5?
- 3 is in both views (a reference). Adjacent to 3: 2, 6, 5 (from both views).
- 6 also adjacent to 3.
- Faces seen: 2,3,5,6. Not seen: 1, 4.
- 5 is adjacent to 3 and 6 (fig 2). Need one more adjacent. Without loss of generality, **opposite of 5 = 2** (since 5's neighbours = 3, 6, 1, 4 likely).
- **Answer: (c) 2.**

### Cube-folding (Q14, Q16, Q17)
> When a cross-shaped net is folded:
> - The **center** square is one face.
> - Squares directly opposite each other (across the center) become **opposite faces** on the cube.

For Q16 (cross with R-M-(CD)-FG): trace which letter ends up opposite F. By unfolding rules, F (bottom-right) ends up opposite the letter 2 spaces away in the cross → **opposite of F = R** (or M, depending on specific layout — match by counting positions on net).

> **Cube folding trick:** if you can't visualize, **label the squares 1-6** in net order and apply this rule: when folding a "T" or cross net, faces separated by exactly 2 squares along the arm become opposite.

---

## 5. Conditional / Scheduling Puzzles (Q18–Q20)

### Q18. A, B, C, D, E, F — one likes Black, 2 in class 12, rest in class 10. C and F same class. D likes Pink. None in 12th like Black. Neither A nor E likes Black.
- C and F are in the same class → they're the 2 in class 12 (only way they share a class exclusively as a pair).
- So {C, F} = 12th; {A, B, D, E} = 10th.
- Black-lover ∈ 10th and ≠ A, E, D (D likes Pink). → **B likes Black.**
- **Answer: (a) B.**

### Q19. Drinks puzzle
- P: coffee, tea.
- Q: coffee, tea + tea, cold drink → Q: **coffee, tea, cold drink** (3 drinks).
- R: coffee, energy drink + energy drink, ice-tea → R: coffee, energy, ice-tea (3).
- S: coffee, energy, tea, cold drink, ice-tea (5).
- T: energy, ice-tea (2).
- **Only Q has exactly 3 drinks = coffee, tea, cold drink → Answer: (c) Q.**

### Q20. Scheduling 6 papers Mon–Sat
- Physics = Monday.
- Maths after Chemistry, 1-day gap → if Chemistry = day X, Maths = day X+2.
- History 1 day before Maths → History = day X+1.
- History has 2-day gap with Physics (Mon) → History = Thursday (Mon + 3 days has 2-day gap between Tue–Wed).
- So History = Thu, Maths = Fri, Chemistry = Wed.
- Geography ≠ Sat → Geography = Tue. Economics = Sat.
- **Schedule:** Mon-Physics, Tue-Geography, Wed-Chemistry, Thu-History, Fri-Maths, Sat-Economics.

---

## Speed tips for Module 5

1. **Syllogism:** ALWAYS draw the diagram. If you can sketch one counter-example where the conclusion fails, the conclusion does not follow.
2. **Series:** if no obvious pattern, **check alternating sub-series** (split into odd-indexed and even-indexed terms).
3. **Family puzzles:** make a TABLE with rows = people, columns = (gender, profession, vehicle/relation, etc.). Fill in cells as deductions land.
4. **Dice opposite-face shortcut:** if standard die, opposite sums to 7. If non-standard, list **all faces seen adjacent** to your target — opposite = the only face never appearing adjacent.
5. **Cube folding:** mentally fix one face as "bottom", fold neighbours up. The face directly across the cross from your bottom becomes the top (opposite).
6. **Scheduling:** lock the fixed dates first (Physics=Mon), then anchor relative constraints (gaps) — most schedules collapse to a unique answer in 2-3 deductions.
