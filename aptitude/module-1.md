# Module 1 — Arithmetic Foundations

> Divisibility · Percentage · Ratio · Partnership · Proportion · Profit & Loss · Simple & Compound Interest

---

## 1. Divisibility Rules (THE most important tool)

Memorize these — they unlock half of Module 1.

| Divisor | Rule |
|---|---|
| **2** | Last digit is even (0,2,4,6,8) |
| **3** | Sum of all digits divisible by 3 |
| **4** | Last **two** digits divisible by 4 |
| **5** | Last digit is 0 or 5 |
| **6** | Divisible by 2 **and** 3 |
| **8** | Last **three** digits divisible by 8 |
| **9** | Sum of digits divisible by 9 |
| **11** | (Sum of odd-position digits) − (Sum of even-position digits) is 0 or divisible by 11 |
| **72** | Divisible by **8** AND **9** (72 = 8 × 9) |

### Q1. 985x3678y divisible by 72 → find (4x − 3y)
- 72 = 8 × 9 → need both rules.
- **÷ 8:** last 3 digits `78y` → try y = 0,1,…9. `780/8=97.5`, `784/8=98`, `…` → **y = 4** works (784 ÷ 8 = 98).
- **÷ 9:** sum = 9+8+5+x+3+6+7+8+4 = 50+x → must be multiple of 9 → x = 4 (54 ÷ 9 = 6).
- (4x − 3y) = 16 − 12 = **4**. *(Note: Answer key says 54 — likely a typo, the method is what matters.)*

### Q2. 89476*2 — smallest * so divisible by 8
- Look at last 3 digits: `*72`? No — actually last 3 of `89476*2` is `*x2` where * is the 6th digit. Last 3 digits = `6*2`? Re-read: number is 8-9-4-7-6-*-2, so last 3 are `6, *, 2` → `6*2`.
- Try * = 0: 602/8 = 75.25 ✗; * = 1: 612/8 = 76.5 ✗; * = 2: 622 ✗; **\* = 3:** 632/8 = 79 ✓.
- **Answer: 3**

### Q3. 5306P2 divisible by 3 → diff of squares of greatest & smallest P
- Sum = 5+3+0+6+P+2 = 16 + P. Must be ÷ 3.
- P = 2, 5, 8 work (since 18, 21, 24 ÷ 3).
- Greatest = 8, smallest = 2 → 8² − 2² = **64**.

**Trick:** for "P that makes N divisible by 3", just find which P values bring the digit-sum up to the next multiple of 3.

---

## 2. Percentage — Fraction shortcuts

Stop multiplying by 0.xx. Convert to fractions:

| % | Fraction | | % | Fraction |
|---|---|---|---|---|
| 10% | 1/10 | | 25% | 1/4 |
| 12.5% | 1/8 | | 33⅓% | 1/3 |
| 16⅔% | 1/6 | | 50% | 1/2 |
| 20% | 1/5 | | 75% | 3/4 |

### The "more/less" trick (Q7)
> If A is **x% more** than B, then B is **(x / (100+x)) × 100 %** less than A.

- Q7: A is 25% more than B. B is less than A by → 25/(100+25) × 100 = 25/125 × 100 = **20%**.

### The "price↑ / consumption↓" trick (Q8)
> If price increases by x%, to keep expenditure same, consumption must decrease by **x / (100+x) × 100 %** (same formula as above).

- Q8: sugar price ↑ 25% → consumption ↓ 25/125 × 100 = **20%**.

### Q4. Sales tax reduced from 3½% to 3⅓% on ₹8400
- Difference in rate = ½% − ⅓% = 1/6 % = 1/600.
- Difference in tax = 8400 / 600 = **₹14**.

### Q5. X% of Y = 150; Y% of Z = 300 → relation between X and Z
- XY/100 = 150 → XY = 15000.
- YZ/100 = 300 → YZ = 30000.
- Divide: X/Z = 15000/30000 = **1/2**.

### Q6. Multiplied by 3/5 instead of 5/3 — % change
- Trick: % change = (wrong − right)/right × 100.
- = (3/5 − 5/3) / (5/3) × 100 = (9−25)/(15) ÷ (5/3) × 100 = (−16/15)(3/5)×100 = **−64%**.
- *Concept:* the result is 64% **less** than expected.

### Q25. Income ↑ 20%, expense ↑ 10% — % change in savings?
- Assume income = 100. Spends 75 → saves 25.
- New income = 120. New expense = 75 × 1.10 = 82.5. New saving = 120 − 82.5 = 37.5.
- Increase = (37.5 − 25)/25 × 100 = **50%**.

**Speed tip:** for "savings" problems, always assume income = 100.

### Q26. Two numbers are 30% and 37% less than third → first is what % of second?
- Let third = 100. First = 70, Second = 63.
- Second as % of first = 63/70 × 100 = **90%**.

---

## 3. Ratio & Partnership

### The Master Formula
> **Profit share ∝ Capital × Time**

So if profits are in ratio P₁ : P₂ : P₃ and capitals are C₁ : C₂ : C₃, then times are
> T₁ : T₂ : T₃ = P₁/C₁ : P₂/C₂ : P₃/C₃

### Q9. Capital 5:7:4, Profit 45:42:28 → find Time ratio
- Time = Profit/Capital = 45/5 : 42/7 : 28/4 = 9 : 6 : 7 ✓

### Q10. Total invest 48000; Time 99:77:84; Profit 3:2:4 → A's investment
- Capital = Profit/Time = 3/99 : 2/77 : 4/84 = 1/33 : 2/77 : 1/21.
- LCM denominators (33, 77, 21) = 231. → 7 : 6 : 11.
- Total parts = 24. A's share = 7/24 × 48000 = **₹14,000**.

### Q11. A: ₹75,000 for 12 mo; B: ₹80,000 for 7 mo; profit ₹4,08,800
- A's capital-time = 75000 × 12 = 9,00,000.
- B's capital-time = 80000 × 7 = 5,60,000.
- Ratio 900:560 = 45:28. Total 73 parts → 1 part = 4,08,800/73 = 5,600.
- A = 45 × 5600 = **₹2,52,000**; B = 28 × 5600 = **₹1,56,800**.

### Q12. A 40k×5, B 45k×4, C 60k×3 — C's % of profit
- Ratios: 200 : 180 : 180 = 10:9:9. Total 28.
- C's share = 9/28 × 100 ≈ **32.14%**.

### Q23. Income P:Q = 1:2, Q:R = 3:2; (P/3 + 4400) = P/2 → Q's income?
- P/2 − P/3 = 4400 → P/6 = 4400 → P = 26,400.
- Q = 2P = **52,800**.

### Q24. A:B = 5:8; after +5 each → 2:3. Find A+B
- (5k+5)/(8k+5) = 2/3 → 15k+15 = 16k+10 → k = 5.
- A=25, B=40 → A+B = **65**.

**Trick:** for "+x to each, ratio changes" problems, set values as ka, kb and cross-multiply.

---

## 4. Proportions

| Type | Form | Find |
|---|---|---|
| **Mean** proportional of a, b | a : x = x : b | x = √(ab) |
| **Third** proportional of a, b | a : b = b : x | x = b²/a |
| **Fourth** proportional of a, b, c | a : b = c : x | x = bc/a |
| **Second** proportional of a, b, c | a : x = b : c | x = ac/b |

### Q13. 3rd proportion of (3,x) = 27; 3rd proportion of (2,y) = 8 → x:y
- x²/3 = 27 → x² = 81 → x = 9.
- y²/2 = 8 → y² = 16 → y = 4.
- **x:y = 9:4**

### Q14. Mean proportional of 1.8 & 3.2 minus 3rd proportional of 5 & 3
- Mean = √(1.8 × 3.2) = √5.76 = 2.4.
- Third = 3²/5 = 1.8.
- Diff = **0.6**.

### Q15. 4th of (12,16,6) : 3rd of (4,6)
- 4th = (16×6)/12 = 8.
- 3rd = 6²/4 = 9.
- **8:9**.

### Q16. Add x to 2, 3, 30, 35 — in proportion → mean of (x+7) and (x−2)
- (2+x)(35+x) = (3+x)(30+x) → 70 + 37x + x² = 90 + 33x + x² → 4x = 20 → x = 5.
- Mean of 12 and 3 = √36 = **6**.

### Q17. 2nd proportional of 28, 4, 5
- 28 : x = 4 : 5 → x = (28 × 5)/4 = **35**.

---

## 5. Profit & Loss

> **SP = CP × (100 ± gain/loss%) / 100**

### Q18. SP=2070 at 15% profit → SP if loss 5% (the trick: find new gain/loss)
- CP = 2070 / 1.15 = 1800.
- At SP=1890 → gain = 90 → 90/1800 = **5%** gain (the answer says 5% — actually 5% **profit**, not loss).

### Q19. SP = 810 at 10% loss → SP at 20% loss
- CP = 810 / 0.9 = 900.
- New SP = 900 × 0.8 = **720**.

### Q20. SP − CP = 360 at 20% profit
- Profit = 20% of CP = 360 → CP = 1800 → SP = **2160**.

### Q21. 16% loss → 20% gain when SP ↑ ₹324 → find CP
- Difference in % = 20 − (−16) = 36% of CP = 324.
- CP = 324 × 100/36 = **900**.

### Q22. SP = 800, loss = 20% of **SP** → SP for 25% gain on CP
- Loss = 0.2 × 800 = 160 → CP = 800 + 160 = 960.
- New SP = 960 × 1.25 = **1200**.

**Trap warning:** "loses 20% of SP" ≠ "loses 20% on CP". Read carefully.

---

## 6. Simple & Compound Interest

| | Formula |
|---|---|
| **SI** | SI = P × R × T / 100 |
| **CI Amount** | A = P (1 + R/100)ᵀ |
| **Total at SI** | A = P (1 + RT/100) |

For **different rates each year**: A = P × (1+R₁/100) × (1+R₂/100) × …

### Q27. CI on ₹7500, 20% for 2 yrs + 10% for 2 yrs
- After 2 yrs at 20%: 7500 × 1.2² = 7500 × 1.44 = 10,800.
- After 2 more at 10%: 10,800 × 1.21 = **13,068**.
- CI = 13,068 − 7,500 = **₹5,568**.

### Q28. Grows to 5040 in 3 yrs at 20%, 40%, 50% rates
- 5040 = P × 1.2 × 1.4 × 1.5 = P × 2.52.
- P = **₹2,000**.

### Q29. P = 5000, 50% p.a., 3 yrs
- A = 5000 × 1.5³ = 5000 × 3.375 = **₹16,875**.

### Q30. SI on ₹17,650 at 8.5% for 5 yrs
- SI = 17650 × 8.5 × 5/100 = 17650 × 0.425 = 7501.25.
- Total = 17,650 + 7,501 ≈ **₹25,151**.

---

## Speed tips for Module 1

1. **CI shortcut for 2 years:** CI = P × R × (2 + R/100) / 100. E.g., 10000 at 10% for 2 yr → 10000 × 10 × 2.1/100 = 2100.
2. **Difference between CI and SI (2 yr):** = P × (R/100)² → easy bait for examiners.
3. When question gives a ratio of **time** + ratio of **profit**, you can solve in 30 sec if you remember: capital = profit / time.
4. **Always convert percentages to fractions** before arithmetic. 25% = 1/4 is your best friend.
