# Module 3 — Probability

> Coins · Dice · Cards · Balls & Marbles · Conditional events

---

## The one formula you actually need

> **P(event) = (Favorable outcomes) / (Total outcomes)**

Everything in this module is just counting carefully.

### Sample space sizes (memorize)

| Experiment | Total outcomes |
|---|---|
| 1 coin | 2 (H, T) |
| n coins | 2ⁿ |
| 1 die | 6 |
| 2 dice | 36 |
| n dice | 6ⁿ |
| 1 card from deck | 52 |
| 2 cards (no order) | C(52, 2) = 1326 |

### Logical operators (write them BEFORE you compute)
- **"At least one X"** → easier as **1 − P(no X)**.
- **"At most k"** → P(0) + P(1) + … + P(k).
- **"A or B"** → P(A) + P(B) − P(A ∩ B).

### Binomial formula (for biased coins / repeated trials)
> P(exactly r successes in n trials) = **C(n,r) · pʳ · (1−p)ⁿ⁻ʳ**

---

## 1. Coins

### Q1. Two coins tossed (sample space {HH, HT, TH, TT}, total 4)
- (i) Two tails = {TT} → **1/4**
- (ii) One head = {HT, TH} → **2/4 = 1/2**
- (iii) At least one tail = 1 − P(HH) = 1 − 1/4 = **3/4**
- (iv) At most one tail = P(0T) + P(1T) = 1/4 + 2/4 = **3/4**

### Q2. Biased coin, P(H) = 0.4, toss 10 times, exactly 3 heads
- Binomial: C(10,3) × 0.4³ × 0.6⁷
- = 120 × 0.064 × 0.0279936 ≈ **0.215**

### Q3. Three coins (8 outcomes)
- (i) All heads {HHH} → **1/8**
- (ii) At least one tail = 1 − 1/8 = **7/8**
- (iii) Exactly 2 heads → C(3,2)/8 = **3/8**
- (iv) At most 2 tails = 1 − P(3T) = 1 − 1/8 = **7/8**

### Q4. Four coins — at least 3 heads OR at least 3 tails
- P(≥3 H) = (C(4,3) + C(4,4))/16 = 5/16.
- P(≥3 T) = 5/16 (by symmetry).
- Mutually exclusive in 4 tosses (can't have both ≥3 H and ≥3 T) → **5/16 + 5/16 = 10/16 = 5/8**.

### Q5. Coin tossed 7 times, P(at least 2 tails)
- Total = 128. P(0T) + P(1T) = (1 + 7)/128 = 8/128 = 1/16.
- P(≥2 T) = 1 − 1/16 = **15/16**.

**Speed tip:** "at least k" → switch to complement when k is large; "at most k" → when k is small.

---

## 2. Dice

### Q6. Two dice (total = 36)
- (i) Sum = 8: (2,6),(3,5),(4,4),(5,3),(6,2) → 5 → **5/36**
- (ii) Sum ≥ 9: sums 9,10,11,12 → counts 4+3+2+1 = 10 → **10/36 = 5/18**
- (iii) Doublet: (1,1)…(6,6) → 6 → **6/36 = 1/6**
- (iv) Multiple of 2 on one AND multiple of 3 on other:
  - Multiples of 2 on die: {2,4,6} (3); multiples of 3: {3,6} (2).
  - Either order: (1st even, 2nd mult-3) ∪ (1st mult-3, 2nd even).
  - 3×2 + 2×3 − (overlap: 1st in {2,4,6}∩{3,6}={6}, 2nd in {2,4,6}∩{3,6}={6} → 1 cell counted twice)
  - = 6 + 6 − 1 = 11 → **11/36**.

### Q7. P(1st die > 2nd die)
- Three cases: a>b, a<b, a=b. By symmetry P(a>b) = P(a<b).
- P(a=b) = 6/36 = 1/6.
- P(a>b) = (1 − 1/6)/2 = 5/12 → **15/36**.

### Q8. Two dice, sum divisible by **2 and 4** (i.e., by 4)
- Sums divisible by 4 from 2..12: 4, 8, 12.
- Counts: 3 + 5 + 1 = 9 → **9/36 = 1/4**.

### Q10. Dice thrown twice, sum = 7
- Same as one roll of two dice (6 ways: (1,6)…(6,1)) → **6/36 = 1/6**.

---

## 3. Cards (52-card deck cheat sheet)

```
4 suits × 13 ranks = 52
Red = ♥ + ♦ = 26      Black = ♣ + ♠ = 26
Face cards (J,Q,K) = 12   Aces = 4
```

### Q9. One card drawn
- (i) Ace: 4/52 = **1/13**
- (ii) "10" of red suit (♥10 or ♦10): 2/52 = **1/26**
- (iii) Red OR King: 26 + 4 − 2 = 28 → **28/52 = 7/13** (subtract red kings counted twice)
- (iv) Black AND Queen (black queens): 2/52 = **1/26**

### Q11. One card drawn
- (i) Jack, Queen or King: 12/52 = **3/13**
- (ii) Neither heart nor king: hearts=13, kings=4, king of hearts overlap=1 → either = 16. Neither = 36 → **36/52 = 9/13**
- (iii) Other than ace: 48/52 = **12/13**
- (iv) Red king: 2/52 = **1/26**

### Q12. King or Queen: 4+4 = 8 → **8/52 = 2/13**

---

## 4. Balls / Marbles

### Q13. 6W + 8B + 4R + 3Bl = 21 total. P(Black or Blue) = 11/21.

### Q14. Bag-1: 3R, 4B (7 total); Bag-2: 5R, 2B (7 total). One ball from each
- (i) Same colour: (R,R) + (B,B) = (3/7)(5/7) + (4/7)(2/7) = 15/49 + 8/49 = **23/49**
- (ii) Different colour: 1 − 23/49 = **26/49**

### Q15 / Q18 (identical). Box: 5G + 4Y + 3W = 12 marbles. Draw 3, all same colour
- Total ways = C(12,3) = 220.
- Same colour = C(5,3) + C(4,3) + C(3,3) = 10 + 4 + 1 = 15.
- P = 15/220 = **3/44**.

### Q16. Bag: 3R + 5Y + 7P = 15. P(Pink or Red) = (7+3)/15 = **10/15 = 2/3**

### Q17. 4W + 4R + 2G = 10 balls. Draw 2. P(at least one green) = 1 − P(no green)
- P(no green) = C(8,2)/C(10,2) = 28/45.
- P(at least one G) = 1 − 28/45 = **17/45**.

---

## Speed tips for Module 3

1. **Write the sample space size first** (2ⁿ for coins, 6ⁿ for dice, C(n,r) for drawing without replacement).
2. **"At least one X" → use complement: 1 − P(no X)**. This single trick saves you on 30% of problems.
3. **For "A or B"**, write `P(A) + P(B) − P(A∩B)` and don't forget the overlap.
4. **Cards**: memorize the 4 numbers — 52 total, 26 red, 12 face, 4 of each rank, 4 of each suit type.
5. **Sum on two dice** distribution: counts are 1,2,3,4,5,**6**,5,4,3,2,1 for sums 2→12. The peak is 6 (at sum=7).
