# CS-601 Machine Learning — Solved Numericals & Q8 Short-Notes Bank (All Units)

> **Exam weight:** Numericals separate a 12/14 from a 7/14. Q8 (14 marks) is pure short-notes — a memorized bank makes it free marks.

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|------|----------------------|-------|
| May-2023 | Q2b: Backpropagation numerical — 2-2-1 network with bias, input [0,1], target 1, sigmoid, lr = 0.3; update all 6 weights in one pass | 7 |
| May-2023 | Q6a: KNN numerical — predict Draft for Speed = 6.75, Agility = 3.00 with k = 3 from 10 training athletes | 7 |
| May-2023 | Q7a: Bayesian Belief Network — build CPT of every node from counts; compute P(Mileage=Lo, Engine=Bad, AC=Broken) | 7 |
| May-2022 | Bayes theorem style — disease test: 1% prior, 90% sensitivity, 8% false positive; find P(disease \| positive) | 7 |
| Every year | Q8: Write short notes on any two/four (attention, batch norm, dropout, MDP, BLEU, momentum, etc.) | 14 |

---

# PART A — SOLVED NUMERICALS

## A1. Backpropagation — One Full Weight-Update Pass [🔥 PYQ May-23 Q2b — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Draw the labelled network diagram with all 9 weights written on the arrows.
> 2. **Step 1 — Forward pass:** net and sigmoid output of z1, z2, then y.
> 3. **Step 2 — Error:** E = ½(t − y)².
> 4. **Step 3 — Output delta** δ_y, then **hidden deltas** δ_z1, δ_z2.
> 5. **Step 4 — Weight update rule** `w_new = w_old + η·δ·input` applied to all 6 weights.
> 6. Close with a neat **table of old vs new weights** — this table is what the checker ticks.

**Given:** Inputs x1 = 0, x2 = 1; target t = 1; sigmoid activation `σ(x) = 1/(1+e^-x)`; learning rate η = 0.3. Update weights only (not biases).

**Weights:** w(x1→z1) = 0.5, w(x1→z2) = −0.1, w(x2→z1) = 0.6, w(x2→z2) = 0.7, bias→z1 = 0.2, bias→z2 = 0.4, w(z1→y) = 0.3, w(z2→y) = 0.2, bias→y = 0.4.

```
        0.5
  x1 ---------> z1 ---0.3---\
   \  -0.1    ^  ^            \
    \        /   |0.2          v
     \  0.6 /   bias           y ---> output
      \    /     |0.4         ^  ^
       \  /      v           /   |0.4
  x2 ---------> z2 ---0.2---/   bias
        0.7
```

### Step 1 — Forward pass

**Hidden neuron z1:**
```
net_z1 = w(x1→z1)·x1 + w(x2→z1)·x2 + b_z1
       = 0.5(0) + 0.6(1) + 0.2
       = 0.8
out_z1 = σ(0.8) = 1/(1 + e^-0.8) = 1/(1 + 0.4493) = 0.6900
```

**Hidden neuron z2:**
```
net_z2 = (-0.1)(0) + 0.7(1) + 0.4
       = 1.1
out_z2 = σ(1.1) = 1/(1 + e^-1.1) = 1/(1 + 0.3329) = 0.7503
```

**Output neuron y:**
```
net_y = 0.3(0.6900) + 0.2(0.7503) + 0.4
      = 0.2070 + 0.1501 + 0.4
      = 0.7570
out_y = σ(0.7570) = 1/(1 + e^-0.7570) = 1/(1 + 0.4691) = 0.6807
```

### Step 2 — Error

```
E = ½(t − out_y)² = ½(1 − 0.6807)² = ½(0.3193)² = 0.0510
```

### Step 3 — Backward pass (deltas)

**Output delta** (rule: `δ_y = (t − out_y)·out_y·(1 − out_y)`):
```
δ_y = (1 − 0.6807) × 0.6807 × (1 − 0.6807)
    = 0.3193 × 0.6807 × 0.3193
    = 0.0694
```

**Hidden deltas** (rule: `δ_h = out_h·(1 − out_h)·(δ_y·w(h→y))`):
```
δ_z1 = 0.6900 × (1 − 0.6900) × (0.0694 × 0.3)
     = 0.6900 × 0.3100 × 0.0208
     = 0.0045

δ_z2 = 0.7503 × (1 − 0.7503) × (0.0694 × 0.2)
     = 0.7503 × 0.2497 × 0.0139
     = 0.0026
```

### Step 4 — Weight updates (`w_new = w_old + η · δ · input_to_that_weight`)

**Output-layer weights** (input = hidden outputs):
```
Δw(z1→y) = 0.3 × 0.0694 × 0.6900 = 0.0144   →  w(z1→y) = 0.3 + 0.0144 = 0.3144
Δw(z2→y) = 0.3 × 0.0694 × 0.7503 = 0.0156   →  w(z2→y) = 0.2 + 0.0156 = 0.2156
```

**Hidden-layer weights** (input = x1 or x2):
```
Δw(x1→z1) = 0.3 × 0.0045 × 0 = 0            →  w(x1→z1) = 0.5      (x1 = 0, no change)
Δw(x2→z1) = 0.3 × 0.0045 × 1 = 0.0013       →  w(x2→z1) = 0.6 + 0.0013 = 0.6013
Δw(x1→z2) = 0.3 × 0.0026 × 0 = 0            →  w(x1→z2) = −0.1     (x1 = 0, no change)
Δw(x2→z2) = 0.3 × 0.0026 × 1 = 0.0008       →  w(x2→z2) = 0.7 + 0.0008 = 0.7008
```

### Final answer table (draw this in exam)

| Weight | Old | Δw | New |
|--------|------|--------|--------|
| w(x1→z1) | 0.5 | 0 | **0.5000** |
| w(x1→z2) | −0.1 | 0 | **−0.1000** |
| w(x2→z1) | 0.6 | +0.0013 | **0.6013** |
| w(x2→z2) | 0.7 | +0.0008 | **0.7008** |
| w(z1→y) | 0.3 | +0.0144 | **0.3144** |
| w(z2→y) | 0.2 | +0.0156 | **0.2156** |

**How to present in exam:** Diagram first (1 mark), forward pass with every net/out line (2), error + deltas (2), the 6 update lines + final table (2). Never skip the arithmetic lines — RGPV gives step marks even if a decimal slips.

**⚠️ Common mistake:** Using `δ = (out − t)` instead of `(t − out)` and then *adding* the update — pick ONE sign convention. With `(t − out)` you **add** `η·δ·input`; error goes down, weights toward z with larger output grow more.

---

## A2. K-Nearest Neighbours — Predict Draft [🔥 PYQ May-23 Q6a — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One-line KNN definition + Euclidean distance formula.
> 2. **Distance table** — all 10 rows, squared terms shown, 4 decimals.
> 3. **Sort** and pick the k = 3 smallest.
> 4. **Majority vote** → final prediction, one closing sentence.

**Given:** Query athlete q = (Speed 6.75, Agility 3.00), k = 3. Formula: `d = sqrt((6.75 − Speed)² + (3.00 − Agility)²)`.

### Step 1 — Distance from q to every training point

| ID | Speed | Agility | Draft | (Δs)² + (Δa)² | Distance |
|----|-------|---------|-------|----------------|----------|
| 11 | 2.00 | 2.00 | no  | 4.75² + 1.00² = 22.5625 + 1.0000 = 23.5625 | 4.8541 |
| 12 | 5.00 | 2.50 | no  | 1.75² + 0.50² = 3.0625 + 0.2500 = 3.3125 | **1.8200** |
| 13 | 8.25 | 8.50 | no  | 1.50² + 5.50² = 2.2500 + 30.2500 = 32.5000 | 5.7009 |
| 14 | 5.75 | 8.75 | yes | 1.00² + 5.75² = 1.0000 + 33.0625 = 34.0625 | 5.8363 |
| 15 | 4.75 | 6.25 | yes | 2.00² + 3.25² = 4.0000 + 10.5625 = 14.5625 | 3.8161 |
| 16 | 5.50 | 6.75 | yes | 1.25² + 3.75² = 1.5625 + 14.0625 = 15.6250 | 3.9528 |
| 17 | 5.25 | 9.50 | yes | 1.50² + 6.50² = 2.2500 + 42.2500 = 44.5000 | 6.6708 |
| 18 | 7.00 | 4.25 | yes | 0.25² + 1.25² = 0.0625 + 1.5625 = 1.6250 | **1.2748** |
| 19 | 7.50 | 8.00 | yes | 0.75² + 5.00² = 0.5625 + 25.0000 = 25.5625 | 5.0559 |
| 20 | 7.25 | 5.75 | yes | 0.50² + 2.75² = 0.2500 + 7.5625 = 7.8125 | **2.7951** |

### Step 2 — Pick the k = 3 nearest

| Rank | ID | Distance | Draft |
|------|----|----------|-------|
| 1 | 18 | 1.2748 | yes |
| 2 | 12 | 1.8200 | no |
| 3 | 20 | 2.7951 | yes |

### Step 3 — Majority vote

Votes: **yes = 2, no = 1** → **Prediction: Draft = YES** for the query (6.75, 3.00).

**How to present in exam:** The full distance table with squared terms is where the marks live. Bold/underline the 3 smallest distances, then write the vote line and the answer sentence.

**⚠️ Common mistake:** Forgetting to take the square root is actually fine (ranking is identical) — but say so explicitly if you skip it; silently mixing d and d² loses marks. Also always use ODD k so no tie.

---

## A3. Bayesian Belief Network — CPTs + Joint Probability [🔥 PYQ May-23 Q7a — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Draw the DAG (Mileage→Engine, Engine→Value, AC→Value).
> 2. State the factorisation `P(M,E,A,V) = P(M)·P(A)·P(E|M)·P(V|E,A)`.
> 3. Build the 4 CPTs from counts (show numerator/denominator for each entry).
> 4. Plug values into the factorisation for part (ii); box the answer.

**Given DAG:**

```
  Mileage        Air-Conditioner
     |                 |
     v                 |
  Engine               |
     \                 /
      v               v
        Car Value (High/Low)
```

**Counts (total records = 7+3+6+4+9+6+3+2 = 40):**

| Mileage | Engine | AC | #High | #Low | Row total |
|---------|--------|----|-------|------|-----------|
| Hi | Good | Working | 3 | 4 | 7 |
| Hi | Good | Broken | 1 | 2 | 3 |
| Hi | Bad | Working | 1 | 5 | 6 |
| Hi | Bad | Broken | 0 | 4 | 4 |
| Lo | Good | Working | 9 | 0 | 9 |
| Lo | Good | Broken | 5 | 1 | 6 |
| Lo | Bad | Working | 1 | 2 | 3 |
| Lo | Bad | Broken | 0 | 2 | 2 |

### Part (i) — CPT of every node

**Node 1: P(Mileage)** — no parent. Hi rows: 7+3+6+4 = 20; Lo rows: 9+6+3+2 = 20.

| Mileage | P |
|---------|-----|
| Hi | 20/40 = 0.5 |
| Lo | 20/40 = 0.5 |

**Node 2: P(AC)** — no parent. Working: 7+6+9+3 = 25; Broken: 3+4+6+2 = 15.

| AC | P |
|----|-----|
| Working | 25/40 = 0.625 |
| Broken | 15/40 = 0.375 |

**Node 3: P(Engine | Mileage)** — parent Mileage.
- Given Hi (20 rows): Good = 7+3 = 10; Bad = 6+4 = 10.
- Given Lo (20 rows): Good = 9+6 = 15; Bad = 3+2 = 5.

| Mileage | P(Engine=Good) | P(Engine=Bad) |
|---------|----------------|----------------|
| Hi | 10/20 = 0.50 | 10/20 = 0.50 |
| Lo | 15/20 = 0.75 | 5/20 = 0.25 |

**Node 4: P(Value=High | Engine, AC)** — parents Engine, AC (pool the two Mileage rows for each combo):

| Engine | AC | High / total | P(High) | P(Low) |
|--------|----|--------------|---------|--------|
| Good | Working | (3+9)/(7+9) = 12/16 | 0.7500 | 0.2500 |
| Good | Broken | (1+5)/(3+6) = 6/9 | 0.6667 | 0.3333 |
| Bad | Working | (1+1)/(6+3) = 2/9 | 0.2222 | 0.7778 |
| Bad | Broken | (0+0)/(4+2) = 0/6 | 0.0000 | 1.0000 |

### Part (ii) — P(Mileage = Lo, Engine = Bad, AC = Broken)

Value is not mentioned, so it is summed out — only the three named nodes remain. AC has no parent and no arrow from M or E, so it is independent of them.

```
P(Lo, Bad, Broken) = P(Mileage=Lo) × P(Engine=Bad | Mileage=Lo) × P(AC=Broken)
                   = 0.5 × 0.25 × 0.375
                   = 0.0469
```

**Answer: 0.0469 (i.e. 3/64).**

**How to present in exam:** DAG + factorisation line first — that alone earns 2 marks. Then each CPT as a small table with the fraction shown (e.g. 15/20), then the 3-term product.

**⚠️ Common mistake:** Multiplying P(Engine=Bad) marginally (15/40) instead of the **conditional** P(Bad | Lo) = 0.25 — the network structure forces the conditional.

---

## A4. Bayes Theorem — Disease Test Paradox [🔥 PYQ May-22 style — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Define Bayes theorem `P(H|E) = P(E|H)·P(H) / P(E)` and name each term (prior, likelihood, evidence, posterior).
> 2. List the given data in symbols.
> 3. Expand P(E) by total probability.
> 4. Substitute, compute, and end with the one-line "surprise" interpretation.

**Given:** Disease prevalence P(D) = 0.01 (1%); test sensitivity P(+|D) = 0.90; false-positive rate P(+|¬D) = 0.08. Find P(D|+).

### Step 1 — Evidence by total probability

```
P(+) = P(+|D)·P(D) + P(+|¬D)·P(¬D)
     = (0.90)(0.01) + (0.08)(0.99)
     = 0.0090 + 0.0792
     = 0.0882
```

### Step 2 — Bayes theorem

```
P(D|+) = P(+|D)·P(D) / P(+)
       = 0.0090 / 0.0882
       = 0.1020   ≈ 10.2%
```

**Surprise result:** Even after testing positive on a "90% accurate" test, the chance of actually having the disease is only **about 10%**. Reason: the disease is rare, so the 8% false positives among the huge healthy population (792 people per 10,000) swamp the true positives (90 per 10,000).

**Intuition table per 10,000 people (draw it — checkers love it):**

| | Test + | Test − | Total |
|---|--------|--------|-------|
| Diseased | 90 | 10 | 100 |
| Healthy | 792 | 9,108 | 9,900 |
| Total | 882 | 9,118 | 10,000 |

P(D|+) = 90/882 = 0.1020. ✔ matches.

**How to present in exam:** State the theorem with all four terms named (2 marks), list the given data in symbols (1), show the total-probability expansion line by line (2), then the substitution and the boxed 10.2% with the one-line interpretation (2). The 10,000-people table is a guaranteed impression-winner — draw it even if not asked.

**⚠️ Common mistake:** Confusing P(+|D) with P(D|+) — sensitivity is NOT the answer; the prior must be multiplied in.

---

## A5. CNN Output-Size & Parameter-Count Drills [⚠️ Never asked as numerical — DUE, likely next]

**Master formula:** `O = (W − F + 2P)/S + 1` where W = input size, F = filter size, P = padding, S = stride. Depth of output = number of filters. If the division is not exact, take the floor.

### Drill 1 — 32×32×3 image, 5×5 filter, S = 1, P = 0
```
O = (32 − 5 + 2×0)/1 + 1 = 27/1 + 1 = 28
```
Output = **28 × 28** per filter (with 6 filters → 28×28×6). Note: filter depth automatically = 3 to match input depth.

### Drill 2 — Same input, 5×5 filter, S = 1, P = 2
```
O = (32 − 5 + 2×2)/1 + 1 = 31/1 + 1 = 32
```
Output = **32 × 32** — size preserved. This is "same" padding: for S = 1, choose `P = (F − 1)/2`.

### Drill 3 — 28×28 input, 3×3 filter, S = 2, P = 0
```
O = (28 − 3 + 0)/2 + 1 = 25/2 + 1 = 12.5 + 1 → floor(12.5) + 1 = 13
```
Output = **13 × 13**. When (W−F+2P)/S is fractional, the filter does not fit at the far edge — floor it (the last partial window is dropped).

### Drill 4 — Parameter count
Conv layer: input 32×32×**3**, six 5×5 filters.
```
Params per filter = (5 × 5 × 3) + 1 bias = 75 + 1 = 76
Total = 76 × 6 = 456 parameters
```
Compare: a fully-connected layer from 32×32×3 = 3072 inputs to just 100 neurons needs 3072×100 + 100 = 307,300 params. **Weight sharing is why CNNs are cheap.**

**How to present in exam:** Write the master formula first and define W, F, P, S (1-2 marks), then substitute with every value visible — `(32 − 5 + 0)/1 + 1 = 28` — never jump straight to the answer. State the output as width × height × depth. For parameter counts, show the per-filter line `(F·F·depth + 1)` before multiplying by the number of filters.

**⚠️ Common mistake:** Forgetting the `+1` bias per filter, or forgetting to multiply filter area by input **depth**.

---

## A6. Gradient Descent — 3 Manual Iterations [⚠️ Never asked — DUE, likely next]

**Problem:** Minimise `J(w) = w²` starting at w₀ = 4, learning rate η = 0.1.
**Rule:** `w_new = w_old − η · dJ/dw`, and `dJ/dw = 2w`.

```
Iteration 1:  grad = 2(4)     = 8.0
              w1 = 4 − 0.1(8.0)    = 4 − 0.80  = 3.2000     J(w1) = 10.2400
Iteration 2:  grad = 2(3.2)   = 6.4
              w2 = 3.2 − 0.1(6.4)  = 3.2 − 0.64 = 2.5600    J(w2) = 6.5536
Iteration 3:  grad = 2(2.56)  = 5.12
              w3 = 2.56 − 0.1(5.12) = 2.56 − 0.512 = 2.0480 J(w3) = 4.1943
```

| Iter | w | Gradient 2w | Step η·grad | New w | J(w) |
|------|------|------|-------|--------|---------|
| 1 | 4.0000 | 8.0000 | 0.8000 | 3.2000 | 10.2400 |
| 2 | 3.2000 | 6.4000 | 0.6400 | 2.5600 | 6.5536 |
| 3 | 2.5600 | 5.1200 | 0.5120 | 2.0480 | 4.1943 |

**Pattern to quote:** each step multiplies w by (1 − 2η) = 0.8, so w shrinks geometrically toward the minimum w* = 0; J falls every iteration — proof the learning rate is stable. (If η = 1.1, w would oscillate and diverge — mention this for the extra mark.)

**How to present in exam:** Write the update rule and the derivative `dJ/dw = 2w` first, then one labelled line per iteration (gradient → step → new w → new J), and finish with the summary table plus the "J decreases every iteration, so η is stable" sentence — that closing observation is what converts a mechanical answer into a full-marks one.

**⚠️ Common mistake:** Adding the gradient instead of subtracting — gradient **descent** always moves opposite to the slope.

---

## A7. Max & Average Pooling Drill [⚠️ Never asked — DUE, likely next]

**Given 4×4 feature map, 2×2 window, stride 2** (windows never overlap → four blocks):

```
Input:            Blocks:
1  3 | 2  4       TL = [1 3; 5 6]   TR = [2 4; 7 8]
5  6 | 7  8
-----+-----
3  2 | 1  0       BL = [3 2; 1 2]   BR = [1 0; 3 4]
1  2 | 3  4
```

**Max pooling** (take largest in each block):
```
max(1,3,5,6) = 6      max(2,4,7,8) = 8
max(3,2,1,2) = 3      max(1,0,3,4) = 4

Output:  6  8
         3  4
```

**Average pooling** (mean of each block):
```
(1+3+5+6)/4 = 15/4 = 3.75      (2+4+7+8)/4 = 21/4 = 5.25
(3+2+1+2)/4 =  8/4 = 2.00      (1+0+3+4)/4 =  8/4 = 2.00

Output:  3.75  5.25
         2.00  2.00
```

Output size check: `O = (4 − 2)/2 + 1 = 2` → 2×2. ✔ Pooling has **zero learnable parameters** and gives translation invariance.

**How to present in exam:** Redraw the input matrix with the four 2×2 blocks boxed off (this alone shows the examiner you understand stride), then write one max/mean line per block with the elements listed, give both 2×2 output matrices, and close with the size-check formula and the "zero learnable parameters + translation invariance" sentence.

**⚠️ Common mistake:** Letting windows overlap (stride 1) when the question says stride 2 — with stride = window size, blocks tile the input exactly.

---

# PART B — Q8 SHORT-NOTES BANK [🔥 Q8 asked every year — MUST DO]

*Q8 = "Write short notes on any two (7+7)" or "any four". Each note below is a ready half-page: definition → 4-5 headed points → mini diagram → example. Memorize the definitions verbatim.*

### B1. Convex Optimization [⚠️ Q8 favourite — MUST DO]

**Definition:** Convex optimization is minimisation of a convex function over a convex set — a function where the line segment joining any two points on its graph lies on or above the graph, so any local minimum is automatically the **global minimum**.

- **Test:** f is convex if `f''(x) ≥ 0` (e.g. `J(w) = w²`); for many variables, the Hessian is positive semi-definite.
- **Why ML cares:** Linear regression (MSE), logistic regression, and SVM losses are convex → gradient descent is guaranteed to reach the global optimum.
- **Non-convex contrast:** Deep neural network loss surfaces are non-convex — many local minima and saddle points, no guarantee.
- **Properties:** unique global minimum (if strictly convex), no bad local traps, efficient solvers exist.

```
 Convex (bowl):  \___/     one minimum
 Non-convex:    \_/\_/     many minima
```

**Example:** `J(w) = (w − 3)² + 2` — convex; gradient descent from any start reaches w = 3.
**⚠️ Common mistake:** Saying neural network training is convex — it is not; only the classical linear models are.

### B2. Multilayer Network (MLP) [🔥 Q8 staple — MUST DO]

**Definition:** A multilayer network (multilayer perceptron) is a feed-forward neural network with an input layer, one or more hidden layers of neurons with non-linear activations, and an output layer, trained by backpropagation.

- **Structure:** each neuron computes `out = σ(Σ w·x + b)`; layers are fully connected.
- **Why hidden layers:** a single perceptron only draws a straight line (fails on XOR); hidden layers give non-linear decision boundaries.
- **Universal approximation:** one hidden layer with enough neurons can approximate any continuous function.
- **Training:** forward pass → error `E = ½Σ(t − o)²` → backpropagate deltas → update `w += η·δ·input`.
- **Activations used:** sigmoid, tanh, ReLU.

```
x1 --o      o
      \    / \
x2 --o--o     o--> y      (input - hidden - output)
      /    \ /
x3 --o      o
```

**Example:** XOR solved by a 2-2-1 network — the classic proof that hidden layers add power.
**⚠️ Common mistake:** Drawing arrows backwards — signal flows forward; only the *error* flows backward.

### B3. Attention Model [🔥 Q8 favourite — MUST DO]

**Definition:** Attention is a mechanism that lets a model focus on the most relevant parts of the input when producing each output, by computing a weighted sum of all encoder states instead of squeezing everything into one fixed vector.

- **Weights:** score each encoder state against the current decoder state, softmax the scores → attention weights α (sum to 1); context = `Σ αᵢ·hᵢ`.
- **Solves:** the fixed-length bottleneck of plain encoder–decoder; long sentences no longer degrade.
- **Types:** additive (Bahdanau), dot-product (Luong), **self-attention** (Transformer: `softmax(QKᵀ/√d)·V`).
- **Bonus:** attention weights are interpretable — you can see which source word each output word looked at.

```
Encoder: h1  h2  h3  h4
          \  |   |  /
       α1 α2  α3  α4  (softmax weights)
            \ | /
          context c  --> decoder step
```

**Example:** Translating "the cat sat" → "billi baithi": while producing "billi" the model puts high α on "cat".
**⚠️ Common mistake:** Calling attention a layer that "selects one word" — it is a *soft* weighted average over all words.

### B4. Natural Language Processing (NLP) [🔥 Q8 staple — MUST DO]

**Definition:** NLP is the field of AI that enables computers to read, understand, and generate human language by combining linguistics with machine learning.

- **Pipeline:** text cleaning → tokenization → stop-word removal → stemming/lemmatization → feature extraction (Bag-of-Words, TF-IDF, word embeddings) → model.
- **Core tasks:** sentiment analysis, machine translation, named-entity recognition, question answering, summarisation, speech recognition.
- **Evolution:** rule-based → statistical (n-grams, HMM) → neural (RNN/LSTM) → Transformers (BERT, GPT).
- **Challenges:** ambiguity ("bank"), sarcasm, word order, low-resource languages.

**Example:** Spam filter — email text → TF-IDF vector → Naive Bayes → spam/ham.
**⚠️ Common mistake:** Writing only applications with no pipeline — the pipeline diagram/bullets carry the marks.

### B5. Batch Normalization [🔥 Q8 favourite — MUST DO]

**Definition:** Batch normalization is a layer that normalises its inputs over the current mini-batch to zero mean and unit variance, then rescales with learnable parameters γ and β, stabilising and accelerating deep-network training.

- **Formulas:** `μ = mean(batch)`, `σ² = var(batch)`, `x̂ = (x − μ)/sqrt(σ² + ε)`, `y = γ·x̂ + β`.
- **Fixes internal covariate shift:** each layer's input distribution stays stable while earlier layers keep changing.
- **Benefits:** allows higher learning rates, reduces vanishing gradients, acts as a mild regularizer, less sensitivity to weight initialization.
- **At test time:** uses running (population) averages of μ and σ collected during training — not the test batch.

**Example:** Deep CNNs (ResNet) use BN after nearly every convolution — training that took weeks became days.
**⚠️ Common mistake:** Forgetting γ and β — without them the network would be forced to always keep zero-mean activations.

### B6. Inception Network (GoogLeNet) [⚠️ Q8 asked — MUST DO]

**Definition:** Inception (GoogLeNet, ILSVRC-2014 winner) is a CNN built from "Inception modules" that apply 1×1, 3×3, 5×5 convolutions and 3×3 max-pooling **in parallel** on the same input and concatenate the outputs — letting the network choose the filter size automatically.

- **1×1 convolutions** act as "bottlenecks" to reduce depth before the expensive 3×3/5×5 → drastic computation saving.
- **22 layers deep** yet only ~5 million parameters (AlexNet had ~60M).
- **Auxiliary classifiers** at middle layers inject gradient during training to fight vanishing gradients.
- **Idea in one line:** go *wider* per layer, not only deeper.

```
        input
   /    |     |     \
 1x1   1x1   1x1   3x3pool
  |     |     |      |
  |    3x3   5x5    1x1
   \    |     |     /
    concatenate (depth-wise)
```

**Example:** Won ImageNet 2014 with top-5 error ≈ 6.7%.
**⚠️ Common mistake:** Saying 1×1 conv "does nothing" — it mixes channels and reduces depth; it is the whole trick.

### B7. Dropout [🔥 Q8 favourite — MUST DO]

**Definition:** Dropout is a regularization technique that randomly "drops" (sets to zero) each neuron with probability p during every training step, preventing co-adaptation and overfitting.

- **Training:** each mini-batch samples a different thinned sub-network → like training an ensemble of exponentially many networks.
- **Testing:** no neurons dropped; activations scaled by (1 − p) (or inverted dropout scales during training) so expected values match.
- **Typical p:** 0.5 for hidden layers, 0.2 for input layer.
- **Effect:** forces redundant, robust features because no neuron can rely on a specific partner.

```
Training:  o  x  o  x  o    (x = dropped this step)
Testing :  o  o  o  o  o    (all active, scaled)
```

**Example:** AlexNet used dropout 0.5 in its fully-connected layers — a key reason it did not overfit ImageNet.
**⚠️ Common mistake:** Applying dropout at test time — it is training-only.

### B8. Momentum [⚠️ Q8 asked — MUST DO]

**Definition:** Momentum is a gradient-descent modification that accumulates an exponentially decaying moving average of past gradients (a "velocity") and moves along it, like a heavy ball rolling downhill.

- **Update:** `v = β·v − η·∇J(w)` then `w = w + v` (β ≈ 0.9).
- **Speeds up** movement along directions of consistent gradient; **damps oscillation** across steep, narrow ravines.
- **Escapes** small local dips and flat plateaus that stall plain SGD.
- **Variant:** Nesterov momentum looks ahead (`∇J(w + β·v)`) for a smarter step; Adam = momentum + per-parameter adaptive rates.

```
Plain SGD:   \ /\ /\ /   zig-zags across the valley
Momentum:    \___→___/   smooth run along the valley floor
```

**Example:** With β = 0.9, the effective step is up to `1/(1−β)` = 10× a single gradient step in a consistent direction.
**⚠️ Common mistake:** Confusing momentum β with learning rate η — β weights past velocity, η weights the new gradient.

### B9. ImageNet Competition (ILSVRC) [⚠️ Q8 asked — MUST DO]

**Definition:** The ImageNet Large Scale Visual Recognition Challenge (2010-2017) was an annual competition to classify 1.2 million images into 1000 categories; it triggered the deep-learning revolution.

- **Metric:** top-5 error — prediction counts as correct if the true label is in the model's top 5 guesses.
- **2012 breakthrough:** AlexNet (8 layers, ReLU, dropout, GPU training) cut error from ~26% to ~16% — the "big bang" of deep learning.
- **Milestones:** ZFNet 2013 → GoogLeNet/VGG 2014 (~7%) → **ResNet 2015 (152 layers, ~3.6% — beat human ~5%)**.
- **Legacy:** pre-trained ImageNet weights are the standard starting point for transfer learning everywhere.

**Example timeline to draw:** `2011: 26% → 2012 AlexNet: 16% → 2014 GoogLeNet: 6.7% → 2015 ResNet: 3.6%`.
**⚠️ Common mistake:** Writing "ImageNet is a network" — it is a **dataset + competition**; AlexNet/ResNet are networks.

### B10. One-Shot Learning [⚠️ Q8 asked — MUST DO]

**Definition:** One-shot learning is the task of correctly recognising a new class after seeing only **one** (or very few) training example(s) of it, instead of the thousands normal deep learning needs.

- **Approach:** learn a **similarity function** d(img1, img2) instead of a classifier — new example is matched to stored references.
- **Siamese network:** twin CNNs with shared weights embed both images; small distance → same class.
- **Triplet loss:** train so `d(anchor, positive) + margin < d(anchor, negative)`.
- **Why needed:** classes change often (new employee's face) — retraining a softmax for every new class is impossible.

```
img A --CNN--\
              --> |f(A) − f(B)|  --> same / different
img B --CNN--/     (shared weights)
```

**Example:** Office face-recognition: one ID photo per employee; the system compares live face embedding to the stored one.
**⚠️ Common mistake:** Calling it "training with one epoch" — it is one *example per class*, solved via similarity learning.

### B11. Tokenization [⚠️ Q8 asked — MUST DO]

**Definition:** Tokenization is the first step of the NLP pipeline: splitting raw text into smaller units called tokens — words, subwords, or characters — that models can process as discrete symbols.

- **Word-level:** split on spaces/punctuation — simple but huge vocabulary, fails on unseen words.
- **Character-level:** tiny vocabulary but very long sequences, weak semantics.
- **Subword (modern standard):** Byte-Pair Encoding (BPE)/WordPiece — frequent words stay whole, rare words split into pieces ("unhappiness" → "un", "happi", "ness"); handles out-of-vocabulary gracefully. Used by BERT/GPT.
- **Sentence tokenization:** splitting a document into sentences (handles "Dr.", "e.g." carefully).

**Example:** `"Machine learning is fun!"` → `["Machine", "learning", "is", "fun", "!"]`.
**⚠️ Common mistake:** Ignoring punctuation/case handling — "fun!" and "fun" must not become different tokens.

### B12. Beam Search & BLEU Score [🔥 Q8 favourite — MUST DO]

**Beam search — definition:** A decoding algorithm for sequence generation that keeps the **B most probable partial sentences** at every step (beam width B), instead of only the single best (greedy) or all (exhaustive).

- Greedy (B=1) commits early and misses better global sentences; exhaustive is exponential; beam is the practical middle path.
- At each step: extend all B candidates by every vocabulary word, re-score, keep top B.
- Larger B → better quality, more computation; typical B = 3-10. Length normalisation avoids bias toward short outputs.

**BLEU score — definition:** BiLingual Evaluation Understudy — an automatic metric (0 to 1) for machine translation that measures modified n-gram precision of the candidate against human reference translations.

- Uses clipped precisions p₁..p₄ (unigram to 4-gram), combined as geometric mean.
- **Brevity penalty** punishes translations shorter than the reference.
- `BLEU = BP · exp(Σ (1/4)·log pₙ)`; closer to 1 (or 100%) = better.

**Example:** Candidate "the cat is on mat" vs reference "the cat is on the mat" → high unigram precision, penalised on 4-grams and brevity.
**⚠️ Common mistake:** Saying BLEU measures accuracy of meaning — it only counts n-gram overlap with references.

### B13. Markov Decision Process (MDP) [🔥 Q8 staple — MUST DO]

**Definition:** An MDP is the mathematical framework of reinforcement learning, defined by the 5-tuple **(S, A, P, R, γ)** — states, actions, transition probabilities P(s'|s,a), reward function R(s,a), and discount factor γ ∈ [0,1].

- **Markov property:** the next state depends only on the current state and action, not on history.
- **Policy π(s):** mapping from state to action; goal is the policy maximising expected discounted return `G = Σ γᵗ·rₜ`.
- **Value functions:** `V(s)` = expected return from s; `Q(s,a)` = expected return taking a in s.
- **Bellman equation:** `V(s) = max_a [R(s,a) + γ·Σ P(s'|s,a)·V(s')]` — solved by value/policy iteration.

```
        action a, reward r
 (s) --------------------> (s')      Agent --a--> Environment --s',r--> Agent
```

**Example:** Grid-world robot: states = cells, actions = up/down/left/right, reward +10 at goal, −1 per step, γ = 0.9.
**⚠️ Common mistake:** Omitting γ — without discounting, infinite-horizon returns can diverge.

### B14. Q-Learning vs SARSA [🔥 Q8 staple — MUST DO]

**Definition:** Both are model-free temporal-difference RL algorithms that learn action values Q(s,a); they differ in which next action appears in the update.

| Aspect | Q-Learning | SARSA |
|--------|-----------|-------|
| Type | **Off-policy** | **On-policy** |
| Update | `Q(s,a) += α[r + γ·max_a' Q(s',a') − Q(s,a)]` | `Q(s,a) += α[r + γ·Q(s',a') − Q(s,a)]` |
| Next action used | Best possible (max) | The action actually taken (ε-greedy) |
| Behaviour | Learns optimal path even while exploring | Learns the safer path its own policy follows |
| Name origin | Quality values | State-Action-Reward-State-Action |

- Q-learning converges to the optimal Q* independent of the exploration policy.
- SARSA accounts for exploration risk — in the classic "cliff-walk" grid, SARSA walks the safe long path, Q-learning hugs the cliff edge.
- Both need decaying ε (exploration) and learning rate α for convergence.

**Example:** Cliff-walking: reward −100 for falling; SARSA's route avoids the edge because its ε-greedy self sometimes slips.
**⚠️ Common mistake:** Writing the same update for both — the `max` vs actual-next-action is the whole difference.

### B15. Weight Initialization [⚠️ Q8 asked — MUST DO]

**Definition:** Weight initialization is choosing the starting values of network weights so that signals and gradients keep healthy magnitudes through depth, enabling training to converge.

- **All zeros = fatal:** every neuron computes the same output and same gradient → symmetry never breaks; network acts like one neuron.
- **Too large random:** activations saturate (sigmoid/tanh) → vanishing gradients; **too small:** signals shrink layer by layer.
- **Xavier/Glorot (sigmoid/tanh):** `Var(w) = 1/n_in` (or 2/(n_in + n_out)) — keeps variance stable across layers.
- **He initialization (ReLU):** `Var(w) = 2/n_in` — compensates for ReLU zeroing half the activations.
- Biases are usually initialized to 0 (safe, since weights already break symmetry).

**Example:** A 50-layer ReLU net with N(0,1) init overflows to NaN in a few layers; with He init it trains normally.
**⚠️ Common mistake:** "Random initialization doesn't matter" — the *scale* of randomness decides whether deep training works at all.

### B16. Unstable Gradient Problem (Vanishing / Exploding) [🔥 Q8 staple — MUST DO]

**Definition:** In deep networks, backpropagated gradients are products of many layer terms (`w · σ'`); if these terms are mostly < 1 the gradient shrinks exponentially (**vanishing**), and if mostly > 1 it grows exponentially (**exploding**) — early layers learn too slowly or training blows up.

- **Why sigmoid is guilty:** `σ'(x) ≤ 0.25`, so 10 layers give gradient factor ≤ 0.25¹⁰ ≈ 10⁻⁶.
- **Symptoms:** vanishing — early-layer weights barely change, loss plateaus; exploding — loss becomes NaN, weights oscillate wildly.
- **Remedies (vanishing):** ReLU activation, He/Xavier init, batch normalization, residual (skip) connections, LSTM gates for RNNs.
- **Remedies (exploding):** gradient clipping (cap the norm), smaller learning rate, proper init.

```
Gradient flowing back through layers:
Layer10 -> 9 -> ... -> 1
 1.0    0.2   0.04 ... 1e-6   (vanishing: each hop × small factor)
```

**Example:** Plain RNN cannot learn dependencies beyond ~10 time steps because the gradient vanishes across steps — LSTM was invented exactly for this.
**⚠️ Common mistake:** Treating vanishing and exploding as different diseases — same cause (repeated multiplication), opposite direction.

---

## ⚡ Quick Revision Box

### Night-before: redo these numericals on paper (in this order)
1. **A1 Backprop (May-23)** — full pass; target answers: out_y = 0.6807, δ_y = 0.0694, new weights 0.6013, 0.7008, 0.3144, 0.2156.
2. **A2 KNN (May-23)** — 3 nearest = IDs 18, 12, 20 → **yes**.
3. **A3 BBN (May-23)** — CPTs + 0.5 × 0.25 × 0.375 = **0.0469**.
4. **A4 Bayes disease** — 0.009/0.0882 = **10.2%**.
5. **A5 CNN sizes** — 28, 32, 13; params (5·5·3+1)·6 = 456.
6. **A6 GD** — w: 4 → 3.2 → 2.56 → 2.048.
7. **A7 Pooling** — max [6 8; 3 4], avg [3.75 5.25; 2 2].

### One-liners (Part B)
- **Convex:** any local min = global min; f'' ≥ 0; linear/logistic regression are convex, deep nets are not.
- **MLP:** hidden layers + non-linearity = solves XOR; trained by backprop.
- **Attention:** softmax-weighted sum of encoder states; kills the fixed-vector bottleneck.
- **NLP:** clean → tokenize → features (TF-IDF/embeddings) → model; tasks: translation, sentiment, NER.
- **BatchNorm:** normalise per mini-batch, rescale with γ, β; faster + stabler training.
- **Inception:** parallel 1×1/3×3/5×5 + pool, concatenated; 1×1 = cheap bottleneck; won ILSVRC-2014.
- **Dropout:** kill neurons with prob p in training only; ensemble effect; p ≈ 0.5.
- **Momentum:** velocity `v = βv − η∇J`; damps zig-zag, speeds valleys; β ≈ 0.9.
- **ImageNet:** 1.2M images, 1000 classes; AlexNet 2012 (16%) → ResNet 2015 (3.6%, superhuman).
- **One-shot:** learn similarity, not classes; Siamese twins + triplet loss; face ID from one photo.
- **Tokenization:** text → tokens; word vs char vs subword (BPE) — subword handles unseen words.
- **Beam search:** keep top-B partial sequences per step; B=1 is greedy. **BLEU:** clipped n-gram precision × brevity penalty.
- **MDP:** (S, A, P, R, γ) + Markov property; Bellman: `V(s) = max_a[R + γΣP·V(s')]`.
- **Q vs SARSA:** off-policy `max Q(s',a')` vs on-policy actual `Q(s',a')`; cliff-walk shows the difference.
- **Weight init:** never zeros (symmetry); Xavier 1/n_in for tanh, He 2/n_in for ReLU.
- **Unstable gradients:** product of layer factors → vanishes (<1) or explodes (>1); fix with ReLU, BN, ResNet, clipping.

### Formula sheet
- Sigmoid: `σ(x) = 1/(1+e^-x)`; derivative `σ' = σ(1−σ)` (max 0.25)
- Backprop: `δ_out = (t−o)·o(1−o)`; `δ_hid = h(1−h)·Σ δ_out·w`; `w += η·δ·input`
- Error: `E = ½(t − o)²`
- Euclidean: `d = sqrt(Σ(qᵢ − xᵢ)²)`
- Bayes: `P(H|E) = P(E|H)P(H) / [P(E|H)P(H) + P(E|¬H)P(¬H)]`
- BBN joint: product of `P(node | parents)` over all nodes
- CNN size: `O = (W − F + 2P)/S + 1` (floor if fractional); params = `(F·F·depth + 1)·num_filters`
- "Same" padding (S=1): `P = (F−1)/2`
- Gradient descent: `w = w − η·dJ/dw`; momentum `v = βv − η∇J, w += v`
- BatchNorm: `x̂ = (x−μ)/√(σ²+ε), y = γx̂ + β`
- Q-learning: `Q += α[r + γ·max Q(s',a') − Q]`; SARSA: `Q += α[r + γ·Q(s',a') − Q]`
- Return: `G = Σ γᵗ rₜ`; Bellman: `V(s) = max_a[R + γΣP(s'|s,a)V(s')]`

### Diagrams to practice (5 min each)
1. Backprop network with all 9 weights labelled (A1).
2. BBN DAG: Mileage→Engine→Value←AC (A3).
3. 10,000-people Bayes table (A4).
4. Inception module (parallel branches → concat).
5. Siamese network twin CNNs.
6. Agent–environment MDP loop.
7. Attention weights fan-in diagram.
8. Vanishing-gradient chain (layer factors shrinking).
