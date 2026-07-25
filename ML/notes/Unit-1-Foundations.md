# Unit 1 — Introduction & Foundations of Machine Learning

> **Exam weight: ~25.6% of offered marks (highest of all units). Q1 comes from this unit in 5/5 papers — GUARANTEED. Easiest unit to score.**

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|---|---|---|
| May-2022 | Basic design issues and approaches to ML | 7 |
| May-2022 | Statistical theory in ML | 7 |
| May-2022 | Training data vs Testing data | 7 |
| May-2022 | Locally weighted linear regression | 7 |
| May-2022 | Model selection | 7 |
| May-2022 | Convex optimization (short note) | 3.5 |
| May-2023 | Types of ML for continuous vs non-continuous data | 7 |
| May-2023 | One-hot encoding vs Label encoding + effect on dimensionality | 7 |
| May-2023 | Confusion matrix + metrics derived from it | 7 |
| May-2023 | KNN implementation + numerical | 7 |
| May-2024 | Main types of ML algorithms + example applications | 7 |
| May-2024 | Evaluation metrics for regression models | 7 |
| May-2024 | Importance of data normalization for convergence/stability | 7 |
| May-2024 | Convex optimization (short note) | 7 |
| Dec-2024 | Define ML, differentiate from traditional programming, key components | 7 |
| Dec-2024 | How hypothesis function maps inputs to predictions | 7 |
| Dec-2024 | Data augmentation techniques | 7 |
| Dec-2024 | Scope and limitations (short note) | 7 |
| Jun-2025 | Define ML + scope and limitations | 8 |
| Jun-2025 | Role of regression, probability and statistics in ML | 6 |
| Jun-2025 | Data visualization methods in detail | 9 |
| Jun-2025 | Data preprocessing | 5 |

---

## 1. Introduction to Machine Learning [🔥 PYQ Dec-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Open with Arthur Samuel + Tom Mitchell definitions (write Mitchell's E, T, P form).
> 2. Headed points: (a) ML vs Traditional Programming table, (b) Key components — Data, Model, Loss function, Optimizer, Evaluation, (c) Working steps of ML (5 steps), (d) Why ML is needed.
> 3. Draw the "Traditional vs ML block diagram" (data+program→output vs data+output→program).
> 4. Close with example: spam filter learns rules from labelled emails instead of hand-coded IF-ELSE rules.

**Definition (Arthur Samuel, 1959):** Machine Learning is the field of study that gives computers the ability to learn without being explicitly programmed.

**Definition (Tom Mitchell, 1997 — write this in exam):** A computer program is said to learn from **experience E** with respect to some **task T** and **performance measure P**, if its performance at T, as measured by P, improves with experience E.

- Example mapping — Spam filter: T = classify emails, E = labelled spam/non-spam emails, P = % of emails correctly classified.

### ML vs Traditional Programming

```
TRADITIONAL PROGRAMMING            MACHINE LEARNING
+------+   +---------+             +------+   +---------+
| Data |-->|         |             | Data |-->|         |
+------+   | Program |--> Output   +------+   | Learning|--> Program
+------+   | (rules) |             +------+   | Algo    |    (model/rules)
|Rules |-->|         |             |Output|-->|         |
+------+   +---------+             +------+   +---------+
(Human writes rules)               (Machine learns rules from data)
```

| Basis | Traditional Programming | Machine Learning |
|---|---|---|
| Input | Data + hand-written rules | Data + expected outputs (labels) |
| Output | Answers/results | Rules (a trained model) |
| Logic | Explicitly coded by programmer | Learned automatically from data |
| Adaptability | Fails on unseen situations; needs re-coding | Improves as more data arrives |
| Best for | Fixed, well-defined logic (payroll, billing) | Complex patterns (speech, vision, fraud) |
| Maintenance | Manual updates | Retraining on new data |

### Key Components of an ML System

1. **Data (Experience E):** examples the system learns from — training set.
2. **Task (T):** what to do — classification, regression, clustering, control.
3. **Model / Hypothesis (h):** mathematical function mapping inputs → outputs, e.g. `h(x) = w·x + b`.
4. **Loss / Cost function:** measures error between prediction and truth, e.g. `J(w) = (1/2m) Σ (h(x_i) − y_i)²`.
5. **Optimizer / Learning algorithm:** adjusts parameters to minimize loss (e.g. gradient descent).
6. **Evaluation (P):** performance on unseen test data — accuracy, MSE, F1.

### Steps in the ML Process

```
Data Collection → Preprocessing → Model Selection → Training → Evaluation → Deployment
       ^                                                            |
       +---------------- feedback / retraining --------------------+
```

**Mnemonic:** **C**lean **P**andas **M**ake **T**idy **E**legant **D**ashboards (Collect, Preprocess, Model, Train, Evaluate, Deploy).

**⚠️ Common mistake:** Writing only Samuel's one-liner. Examiners award full definition marks only when Mitchell's E-T-P definition is written and mapped to an example.

---

## 2. Basic Design Issues and Approaches to ML [🔥 PYQ May-22 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: designing a learning system needs four key choices (Mitchell's checkers-learning framework).
> 2. Headed points: (1) Choosing training experience, (2) Choosing target function, (3) Choosing representation of target function, (4) Choosing learning algorithm; then Issues: data quality/quantity, overfitting, feature selection, computational cost, interpretability.
> 3. Draw the 4-step design pipeline diagram.
> 4. Example: checkers-playing program (Mitchell's classic).

### Four Design Choices (Mitchell's framework)

1. **Choosing the training experience** — direct (labelled board states) vs indirect (final win/loss); teacher-controlled or self-generated; how representative of real distribution.
2. **Choosing the target function** — what exactly to learn, e.g. `V: Board → R` (a score for each board state).
3. **Choosing a representation for the target function** — linear function of features, decision tree, neural network. Trade-off: expressive power vs training data needed.
4. **Choosing a learning algorithm** — how to fit parameters, e.g. LMS rule / gradient descent.

```
Training           Target            Representation        Learning
Experience  --->   Function   --->   (linear/tree/NN) ---> Algorithm ---> Final Design
(direct/indirect)  (what to learn)   (how to store it)     (how to fit)
```

### Basic Issues in Machine Learning

- **Quality & quantity of data:** noisy, biased or insufficient data → poor model.
- **Overfitting vs underfitting:** memorizing training data vs learning too little (Section 6).
- **Feature selection:** which attributes matter; irrelevant features hurt accuracy.
- **Algorithm/model selection:** no single best algorithm for all problems (*No Free Lunch theorem*).
- **Generalization:** performance must hold on unseen data, not just the training set.
- **Computational complexity:** training cost, memory, scalability to big data.
- **Interpretability:** black-box models (deep nets) are hard to explain.

**Example:** For a checkers program — experience = games against itself, target = board evaluation `V(b)`, representation = `V(b) = w0 + w1x1 + ... + w6x6`, algorithm = LMS weight update.

**⚠️ Common mistake:** Listing only "issues" and skipping the four design choices — the question asks for BOTH design issues AND approaches.

---

## 3. Scope and Limitations of ML [🔥 PYQ Dec-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One-line definition of ML (Mitchell short form).
> 2. Two headed halves: SCOPE — 5 bullets with application areas; LIMITATIONS — 5 bullets.
> 3. Draw the "ML application wheel" (ML at centre, applications around it).
> 4. Close: "ML is powerful where patterns exist in data, but it is not a replacement for domain knowledge or causal reasoning."

### Scope (Applications / Where ML shines)

| Domain | Example use |
|---|---|
| Healthcare | Disease diagnosis from X-rays, drug discovery |
| Finance | Fraud detection, credit scoring, stock forecasting |
| E-commerce | Recommendation systems (Amazon, Netflix) |
| NLP | Chatbots, translation, sentiment analysis |
| Computer Vision | Face recognition, self-driving cars |
| Speech | Voice assistants (Alexa, Siri) |
| Industry | Predictive maintenance, quality inspection |

```
                 Healthcare
                     |
   Speech ---- [ MACHINE ] ---- Finance
                [ LEARNING]
   Vision ----- [  CORE  ] ---- E-commerce
                     |
                    NLP
```

### Limitations

1. **Data hungry:** needs large, high-quality labelled datasets; garbage in → garbage out.
2. **No causality:** learns correlations, not cause-effect; can give wrong reasons for right answers.
3. **Bias & fairness:** inherits bias present in training data (e.g. biased hiring models).
4. **Poor generalization outside training distribution:** fails on data unlike what it saw.
5. **Black-box nature:** deep models are hard to interpret and audit.
6. **Computational cost:** training large models needs GPUs, energy, time.
7. **Security:** vulnerable to adversarial examples and data poisoning.

**Mnemonic for limitations:** **D**ata **C**auses **B**ig **G**eneral **B**lack **C**ostly **S**ecurity issues (Data, Causality, Bias, Generalization, Black-box, Cost, Security).

**⚠️ Common mistake:** Writing only applications and 2 vague limitations. Balance both halves — 5 + 5 bullets earns the full 7.

---

## 4. Machine Learning Models: Supervised, Unsupervised, Reinforcement [🔥 PYQ May-22, May-23, May-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: ML algorithms are classified by the kind of feedback available during learning.
> 2. Headed points: Supervised (definition, 2 sub-types: classification/regression), Unsupervised (clustering/association/dim-reduction), Reinforcement (agent-environment-reward), Semi-supervised (1 line).
> 3. Draw the 3-branch tree diagram AND the agent-environment loop for RL.
> 4. Close with the big comparison table + 1 application each (spam filter / customer segmentation / game playing).

### Classification Tree

```
                    MACHINE LEARNING
        +----------------+----------------+
        |                |                |
   SUPERVISED       UNSUPERVISED     REINFORCEMENT
   (labelled data)  (no labels)      (reward signal)
     |      |          |     |            |
Classifi- Regression Cluster Associa-  Q-learning,
cation    (contin-   -ing    tion/     SARSA, MDP
(discrete) uous)             Dim.Red.
```

### 4.1 Supervised Learning

**Definition:** Learning a mapping `f: X → Y` from a training set of **labelled** pairs `(x_i, y_i)`; the "supervisor" is the known correct output.

- **Classification** — output is **discrete/non-continuous** (categories). Ex: spam/not-spam.
- **Regression** — output is **continuous** (real numbers). Ex: house price.

### 4.2 Unsupervised Learning

**Definition:** Learning hidden structure/patterns from **unlabelled** data — no target output is given.

- **Clustering** — group similar points (K-means, hierarchical).
- **Association rule mining** — find co-occurrence rules (Apriori: "bread → butter").
- **Dimensionality reduction** — compress features (PCA).

### 4.3 Reinforcement Learning

**Definition:** An **agent** learns by **trial and error**, interacting with an **environment**, receiving **rewards/penalties**, and learning a **policy** that maximizes cumulative reward.

```
        +--------+   action a_t    +-------------+
        | AGENT  | --------------> | ENVIRONMENT |
        |        | <-------------- |             |
        +--------+  state s_t+1,   +-------------+
                    reward r_t+1
```

### Grand Comparison Table (memorize this)

| Basis | Supervised | Unsupervised | Reinforcement |
|---|---|---|---|
| Data | Labelled (x, y) | Unlabelled (x only) | No dataset; interaction |
| Feedback | Direct (correct answer) | None | Delayed reward signal |
| Goal | Predict output for new x | Discover hidden structure | Learn optimal policy |
| Output type | Class / value | Clusters / rules / components | Sequence of actions |
| Algorithms | Linear/Logistic Regression, KNN, SVM, Decision Tree, Naive Bayes | K-means, Hierarchical clustering, PCA, Apriori, DBSCAN | Q-learning, SARSA, DQN, Policy gradient |
| Applications | Spam filter, disease diagnosis, price prediction | Customer segmentation, anomaly detection, market-basket analysis | Game playing (chess/Go), robotics, self-driving control |
| Human effort | High (labelling) | Low | Reward design |

**Continuous vs Non-continuous data (May-23 angle):**

| Data type | Supervised technique | Example |
|---|---|---|
| Continuous output | Regression (linear, polynomial) | Predicting temperature, salary |
| Non-continuous (categorical) output | Classification (logistic regression, KNN, SVM) | Spam detection, digit recognition |
| Continuous input, no labels | Clustering / PCA | Grouping sensor readings |
| Categorical input, no labels | Association mining | Market-basket items |

**Semi-supervised (1-line bonus):** small labelled + large unlabelled data combined — e.g. web-page classification.

**⚠️ Common mistake:** Forgetting to give one ALGORITHM and one APPLICATION per type — May-24 explicitly asked "with example applications".

---

## 5. Training Data vs Testing Data & Cross-Validation [🔥 PYQ May-22 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: dataset is split so learning and evaluation happen on different data, ensuring generalization.
> 2. Headed points: definition of training/validation/test sets, comparison table, typical split ratios, k-fold cross-validation with diagram, why testing on training data is wrong.
> 3. Draw the 70/15/15 split bar + 5-fold CV diagram.
> 4. Example: 1000 emails → 700 train, 150 validation, 150 test.

### The Three Splits

```
FULL DATASET (100%)
+---------------------------+---------+---------+
|        TRAINING 70%       | VAL 15% | TEST 15%|
+---------------------------+---------+---------+
     fits model params        tunes      final,
     (weights)                hyper-     touched
                              params     ONCE
```

| Basis | Training Data | Testing Data |
|---|---|---|
| Purpose | Learn/fit model parameters | Evaluate final generalization |
| When used | During learning | Only after training completes |
| Size | Larger (~70–80%) | Smaller (~20–30%) |
| Seen by model? | Yes, repeatedly | Never during training |
| Error name | Training error (optimistic) | Test/generalization error (realistic) |
| Risk if misused | — | Testing on training data → inflated accuracy, hidden overfitting |

- **Validation set:** a third split used to tune hyperparameters (learning rate, k in KNN) and for model selection — keeps the test set "unseen".

### K-Fold Cross-Validation

**Definition:** Split data into `k` equal folds; train on `k−1` folds, validate on the remaining fold; repeat `k` times so every fold is validated once; report the **average** score.

```
5-FOLD CV  (V = validation fold, T = training folds)
Iter1: [V][T][T][T][T]
Iter2: [T][V][T][T][T]
Iter3: [T][T][V][T][T]
Iter4: [T][T][T][V][T]
Iter5: [T][T][T][T][V]
Final score = average of the 5 validation scores
```

- **Advantages:** every point used for both training & validation; low-variance estimate; best for small datasets.
- **Variants:** Stratified k-fold (keeps class ratio), Leave-One-Out (k = n, expensive).

**Example:** With 1000 patient records and 5-fold CV, each iteration trains on 800 and validates on 200; accuracy is the mean of 5 runs.

**⚠️ Common mistake:** Saying test set is used "to improve the model" — it is used ONLY to report final performance; improving on test data leaks information.

---

## 6. Model Selection, Overfitting & Underfitting [🔥 PYQ May-22 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: model selection = choosing the best model/complexity among candidates using validation performance.
> 2. Headed points: criteria (validation error, cross-validation, bias-variance, Occam's razor, AIC/BIC one-liner), overfitting vs underfitting table, remedies for each.
> 3. Draw the U-shaped error-vs-complexity curve AND the three fitting sketches.
> 4. Example: choosing polynomial degree 2 over degree 9 for house prices.

**Definition:** Model selection is the process of choosing the best model type and complexity (e.g., polynomial degree, k in KNN, tree depth) among candidates, using **validation-set or cross-validation error**, so that generalization is maximized.

### How models are selected

1. Split data (train/validation/test) or use k-fold CV.
2. Train each candidate model on the training set.
3. Compare **validation** errors (never training errors).
4. Apply **Occam's razor** — among equally good models, prefer the simpler one.
5. Optionally use penalized criteria: `AIC = 2k − 2 ln(L)`, `BIC = k ln(n) − 2 ln(L)` (penalize complexity).
6. Retrain chosen model on train+validation; report score on the untouched test set.

### Overfitting vs Underfitting

```
Error
  ^      \  underfit         overfit  /
  |       \   zone            zone   /
  |        \                        /  <-- Validation error (U-shape)
  |         \______   ____________/
  |                \_/
  |            best model
  |     ______________________________
  |                                     <-- Training error (keeps falling)
  +----------------------------------------> Model complexity
```

```
UNDERFIT           GOOD FIT           OVERFIT
  o   o              o   o              o   o
 ___________        __/\__/\_          /\/\/\/\
(straight line)   (smooth curve)   (wiggles through
 misses pattern    captures trend    every point)
```

| Basis | Underfitting | Overfitting |
|---|---|---|
| Cause | Model too simple / trained too little | Model too complex / too little data / noise memorized |
| Bias-Variance | High bias, low variance | Low bias, high variance |
| Training error | High | Very low |
| Test error | High | High |
| Example | Fitting a line to a curved trend | Degree-9 polynomial through 10 points |
| Remedies | Bigger model, more features, train longer, less regularization | More data, regularization (L1/L2), early stopping, dropout, simpler model, cross-validation, pruning |

**Mnemonic:** Under = **"Both errors Up"**; Over = **"Train down, Test up"**.

**⚠️ Common mistake:** Drawing only the sketches without the U-shaped validation-error curve — the curve is what actually explains model *selection*.

---

## 7. Regression [🔥 PYQ May-22 (LWR), Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton (Regression role / types):**
> 1. One line: regression models the relationship between input variables and a continuous output.
> 2. Headed points: Linear regression (equation + cost + GD one-liner), Logistic regression (sigmoid + why for classification), Locally Weighted regression (weight formula + non-parametric), comparison table.
> 3. Draw: scatter + best-fit line; sigmoid curve; LWR local-line sketch.
> 4. Example: house price (linear), spam probability (logistic), non-linear temperature data (LWR).

### 7.1 Linear Regression

**Definition:** Fits a straight line (hyperplane) `h(x) = w0 + w1x1 + ... + wn xn = wᵀx + b` predicting a **continuous** output by minimizing squared error.

- **Cost function:** `J(w) = (1/2m) Σ_{i=1..m} (h(x_i) − y_i)²`  (MSE form)
- **Learning:** gradient descent `w := w − α ∂J/∂w`, or Normal equation `w = (XᵀX)⁻¹Xᵀy`.
- **Assumptions:** linearity, independent errors, constant variance (homoscedasticity), normal residuals.

```
 y|        x     x
  |     x    _/
  |   x   _/  <- best fit line  h(x)=w0+w1x
  |  x _/   x
  | _/  x
  +------------------ x
   minimizes sum of squared vertical distances
```

**Example:** Predict house price from area: `price = 500 + 1200 × area_sq_m`.

### 7.2 Logistic Regression

**Definition:** A **classification** algorithm (despite the name) that passes a linear combination through the **sigmoid** to output probability of class 1.

- `h(x) = sigmoid(wᵀx) = 1 / (1 + e^(−wᵀx))`, output in (0,1); predict class 1 if `h(x) ≥ 0.5`.
- **Loss:** cross-entropy / log loss `J = −(1/m) Σ [ y log h(x) + (1−y) log(1−h(x)) ]` (convex — unlike MSE here).
- **Decision boundary:** `wᵀx = 0` is a straight line/hyperplane.

```
P(y=1) 1|            ______
        |          /
     0.5|--------/   <- sigmoid: 1/(1+e^-z)
        |      /
       0|_____/
        +---------------- z = wᵀx
```

**Example:** Predict whether a tumour is malignant (1) or benign (0) from its size.

### 7.3 Locally Weighted Linear Regression (LWR) [🔥 PYQ May-22]

> **✍️ 7-mark answer skeleton (LWR):** definition (non-parametric, fits a new local line per query) → weight formula with bandwidth τ → algorithm steps (4) → comparison table vs ordinary LR → local-lines diagram → example (non-linear data) → drawback (stores all data, slow per query).

**Definition:** A **non-parametric** regression that, for each query point `x_q`, fits a *separate* weighted linear regression giving **higher weight to training points near x_q**, then predicts from that local line.

- **Weight of training point x_i:** `w_i = exp( −(x_i − x_q)² / (2τ²) )`  — Gaussian kernel.
- `τ` (bandwidth/tau) controls locality: small τ → very local (wiggly, may overfit); large τ → approaches ordinary linear regression.
- **Local cost:** `J(w) = Σ w_i (y_i − wᵀx_i)²` — minimized fresh for every query.

**Algorithm steps:**
1. Receive query point `x_q`.
2. Compute weight `w_i` for every training point (near → weight ≈ 1, far → ≈ 0).
3. Solve weighted least squares: `w = (XᵀWX)⁻¹ XᵀWy`.
4. Predict `ŷ = wᵀx_q`; discard the local model; repeat for the next query.

```
 y|      x  x            Ordinary LR: ONE global line
  |    x      x  x       LWR: a small local line at each
  |  x   __     x  query, weighted by nearness
  | x  _/  \__  x
  |__/        \___x
  +----^-----------  x
       x_q  (only nearby points influence the fit here)
```

| Basis | Linear Regression | Locally Weighted Regression |
|---|---|---|
| Type | Parametric (fixed w learned once) | Non-parametric (no fixed parameters) |
| Training | One global fit | No training phase; fit per query |
| Memory | Discards data after training | Must store entire training set |
| Prediction cost | O(1) — plug into equation | Expensive — solve regression each query |
| Fits non-linear data? | No (only straight trend) | Yes (piecewise local lines) |
| Key parameter | weights w | bandwidth τ |

**Example:** Temperature vs hour-of-day (rises then falls): one global line fails, but LWR tracks the curve by fitting local lines around each queried hour.

**⚠️ Common mistake:** Calling logistic regression a regression technique for continuous output — it is a classifier; only its internal score is continuous.

---

## 8. Probability & Statistics for ML [🔥 PYQ May-22, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton (Statistical theory / role of prob & stats):**
> 1. One line: ML is applied statistics — data is treated as samples from an unknown probability distribution, and learning = estimating that distribution or its decision boundary.
> 2. Headed points: (a) probability basics + Bayes theorem, (b) descriptive statistics (mean/median/mode/variance), (c) inferential statistics (estimation, hypothesis testing), (d) where each is used in ML (Naive Bayes, loss = MLE, evaluation = sampling theory, regression = statistical fit).
> 3. Draw normal curve with mean ± σ regions.
> 4. Example: spam classification via Bayes theorem.

### Probability essentials

- **Random variable:** variable whose value depends on outcome of a random experiment.
- **Conditional probability:** `P(A|B) = P(A ∩ B) / P(B)`.
- **Independence:** `P(A ∩ B) = P(A)·P(B)`.
- **Bayes theorem (the ML workhorse):**
  `P(H|D) = P(D|H) · P(H) / P(D)` — posterior = likelihood × prior / evidence.
- **Expectation:** `E[X] = Σ x·P(x)`; **Variance:** `Var(X) = E[X²] − (E[X])²`.

### Statistics essentials

| Measure | Formula | Use in ML |
|---|---|---|
| Mean | `μ = (Σ x_i)/n` | Centre of data; imputation of missing values |
| Median | middle value | Robust centre when outliers exist |
| Mode | most frequent value | Imputing categorical features |
| Variance | `σ² = Σ(x_i − μ)²/n` | Spread; feature scaling; PCA |
| Std. deviation | `σ = √σ²` | Z-score normalization |
| Covariance | `cov(X,Y) = Σ(x−μx)(y−μy)/n` | Relation between two features |
| Correlation | `r = cov(X,Y)/(σx σy)`, −1 ≤ r ≤ 1 | Feature selection (drop redundant features) |

### Role of Regression, Probability & Statistics in ML (Jun-25 form)

1. **Regression** → the basic supervised model for continuous prediction; foundation of neural networks (a neuron = regression + activation).
2. **Probability** → models uncertainty: Naive Bayes and Bayesian learning use Bayes theorem; logistic regression outputs probabilities; generative models learn `P(x, y)`.
3. **Statistics** → (a) descriptive stats summarize and clean data, (b) loss minimization = **Maximum Likelihood Estimation** in disguise (least squares = MLE under Gaussian noise), (c) sampling theory justifies train/test splits and confidence in accuracy, (d) hypothesis testing checks if a model is genuinely better.
4. **Statistical learning theory** → bounds generalization error, explains bias-variance trade-off.

**Example:** Spam filter — `P(spam | "lottery") = P("lottery"|spam)·P(spam) / P("lottery")`; classify spam if posterior > 0.5.

**⚠️ Common mistake:** Writing generic praise ("statistics is very important"). Score comes from formulas: write Bayes theorem, mean/variance, correlation, and name MLE.

---

## 9. Linear Algebra for ML [⚠️ Never asked — DUE, likely next]

**Definition:** Linear algebra is the mathematics of vectors and matrices; ML represents data, models and transformations as matrix operations.

### Core objects

- **Scalar:** single number `x`.
- **Vector:** ordered list `x = [x1, x2, ..., xn]ᵀ` — one data point / feature vector.
- **Matrix:** 2-D array `X (m×n)` — whole dataset: m samples × n features.
- **Tensor:** ≥3-D array — e.g. colour image (height × width × 3).

### Key operations & where ML uses them

| Operation | Formula / rule | Use in ML |
|---|---|---|
| Dot product | `a·b = Σ a_i b_i` | Neuron output `wᵀx + b`; similarity |
| Matrix multiplication | `(AB)_ij = Σ_k A_ik B_kj`; needs cols(A)=rows(B) | Forward pass of neural networks, batch prediction `ŷ = Xw` |
| Transpose | `(Aᵀ)_ij = A_ji` | Normal equation `(XᵀX)⁻¹Xᵀy` |
| Inverse | `A A⁻¹ = I` (square, non-singular) | Solving linear regression exactly |
| Norm | `‖x‖₂ = √(Σ x_i²)`, `‖x‖₁ = Σ|x_i|` | Distances (KNN), L1/L2 regularization |
| Eigen decomposition | `Av = λv` (v = eigenvector, λ = eigenvalue) | PCA: principal components = eigenvectors of covariance matrix with largest λ |

### Eigen basics (write 3 lines + example)

- If `Av = λv` for non-zero v, then **v is an eigenvector** (direction unchanged by A) and **λ its eigenvalue** (stretch factor).
- Found by solving `det(A − λI) = 0`.
- **In PCA:** eigenvectors of the covariance matrix give directions of maximum variance; keeping the top-k reduces dimensions with least information loss.

```
Dataset as a matrix:
          features (n) →
samples   [ x11 x12 x13 ]      each ROW  = one sample (vector)
 (m) ↓    [ x21 x22 x23 ]      each COL  = one feature
          [ x31 x32 x33 ]      prediction: ŷ = X·w  (matrix × vector)
```

**Example:** For `A = [[2,0],[0,3]]`, eigenvalues are 2 and 3 with eigenvectors `[1,0]ᵀ` and `[0,1]ᵀ` — A stretches x-axis by 2, y-axis by 3.

**⚠️ Common mistake:** Multiplying matrices with mismatched dimensions in exam work — always write dimensions (m×n)(n×1) = (m×1) beside every product.

---

## 10. Convex Optimization [🔥 PYQ May-22, May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: minimizing a convex function over a convex set — the setting where local minimum = global minimum.
> 2. Headed points: convex set (with figure), convex function + Jensen inequality, why ML cares (any local min is global; GD guaranteed to converge), examples of convex ML problems (linear regression MSE, logistic loss, SVM), non-convex contrast (neural nets).
> 3. Draw convex vs non-convex bowl diagrams.
> 4. Example: `f(x) = x²`, minimized by gradient descent.

**Definition:** Convex optimization is the problem `minimize f(x) subject to x ∈ C` where `f` is a **convex function** and `C` a **convex set**. Its defining property: **every local minimum is the global minimum**.

- **Convex set:** for any two points in the set, the whole line segment joining them lies inside: `θx + (1−θ)y ∈ C` for `θ ∈ [0,1]`.
- **Convex function:** the chord lies above the curve:
  `f(θx + (1−θ)y) ≤ θ f(x) + (1−θ) f(y)` (Jensen's inequality).
- **Second-derivative test:** `f''(x) ≥ 0` everywhere (or Hessian positive semi-definite).

```
CONVEX (bowl)                NON-CONVEX (hilly)
 \          /                 \    _    /\
  \        /                   \  / \  /  \   /
   \      /                     \/   \/    \_/
    \____/                    local   local  global
   one global min             minima trap gradient descent
```

### Why ML cares

1. Training = minimizing a **loss function**; if the loss is convex, **gradient descent is guaranteed to reach the global optimum** (with a suitable learning rate).
2. **Convex ML problems:** linear regression (MSE), logistic regression (cross-entropy), SVM (hinge loss + quadratic program), Lasso/Ridge.
3. **Non-convex:** deep neural networks — many local minima/saddle points; no global guarantee (that is why initialization & optimizers matter).
4. Convexity ⇒ efficient, reliable solvers with provable convergence.

- **Gradient descent update:** `x := x − α ∇f(x)`, α = learning rate.

**Example:** `f(x) = x²` is convex (`f'' = 2 > 0`); GD from any start slides to global minimum x = 0. `f(x) = x⁴ − 3x²` is non-convex — two valleys.

**⚠️ Common mistake:** Defining only the convex function and skipping convex *set* + the "local = global" property — that property is the whole point of the topic.

---

## 11. Data Visualization [🔥 PYQ Jun-25 (9 marks) — MUST DO]

> **✍️ 7-9-mark answer skeleton:**
> 1. One line: graphical representation of data to reveal patterns, trends, outliers before/after modelling (part of EDA).
> 2. Headed points: purpose (4 bullets) then one short para + tiny sketch EACH for: histogram, scatter plot, box plot, bar chart, line chart, heatmap, pie chart.
> 3. Draw at least 4 small sketches (histogram, scatter, box plot, heatmap).
> 4. Close: tools (Matplotlib, Seaborn) + example (scatter revealed linear relation → chose linear regression).

**Definition:** Data visualization is the graphical representation of data using charts and plots so that distributions, relationships, trends and outliers can be understood at a glance — the core of **Exploratory Data Analysis (EDA)**.

**Purpose in ML:** detect outliers & skew before training; check feature-target relationships; choose the right model; communicate results; diagnose errors (residual plots).

### Methods (write name → what it shows → when to use)

| Method | Shows | Typical use |
|---|---|---|
| Histogram | Frequency distribution of ONE numeric variable | Check normality/skewness of a feature |
| Scatter plot | Relationship between TWO numeric variables | Spot linear/non-linear correlation before regression |
| Box plot | Median, quartiles, IQR, outliers | Outlier detection, comparing groups |
| Bar chart | Values across categories | Class counts, feature importance |
| Line chart | Trend over ordered axis (time) | Loss vs epochs, sales over months |
| Heatmap | Matrix values as colours | Correlation matrix, confusion matrix |
| Pie chart | Parts of a whole (%) | Class proportion (use sparingly) |
| Pair plot | Scatter of every feature pair | Quick multi-feature EDA |

```
HISTOGRAM        SCATTER         BOX PLOT           HEATMAP
 |   _            |    . .        --- <- max        +--+--+
 |  | |_          |  . . .         |                |##|..|
 | _| | |         | . ..          +-+ <- Q3         +--+--+
 || | | |_        |. .            |-| <- median     |..|##|
 ++-+-+-+--       +--------       +-+ <- Q1         +--+--+
 (bins vs freq)  (x vs y)          |   * outlier   (dark = high corr)
                                  ---
```

**Example:** Plotting house area vs price as a scatter showed a straight-line trend → linear regression chosen; a box plot of price exposed 3 outlier mansions that were removed before training, improving test R².

**Tools:** Matplotlib, Seaborn, Plotly (Python); Tableau/Power BI (BI dashboards).

**⚠️ Common mistake:** Listing chart names without saying *what each reveals about data* — the "shows/use" column is where the marks are; sketch at least 4 plots.

---

## 12. Hypothesis Function & Hypothesis Testing [🔥 PYQ Dec-24 (function) — MUST DO | ⚠️ testing part DUE]

### 12.1 Hypothesis Function [🔥 PYQ Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: hypothesis h is the candidate function mapping input features to predicted output, chosen from hypothesis space H.
> 2. Headed points: notation `h: X → Y`, parametric form for regression `h(x)=w0+w1x` and classification (sigmoid + threshold), hypothesis space H, how learning picks the best h (minimize loss), inductive bias one-liner.
> 3. Draw the input → h(x) → prediction pipeline + line-fit sketch.
> 4. Example: `h(x) = 50 + 10x` maps 3 study hours → 80 marks.

**Definition:** A hypothesis `h` is a candidate function that maps input features to a predicted output, `h: X → Y`. The set of all functions the algorithm can choose from is the **hypothesis space H**; learning = searching H for the h with minimum loss.

**How h maps inputs to predictions:**

1. **Represent input** as a feature vector `x = [x1, ..., xn]`.
2. **Apply parametric form:** regression `h(x) = w0 + w1x1 + ... + wn xn`; classification `h(x) = sigmoid(wᵀx)` then threshold at 0.5.
3. **Parameters (w) are learned** by minimizing cost `J(w)` on training data (e.g. gradient descent).
4. **Prediction:** for a new x, compute `ŷ = h(x)` — a number (regression) or class label (classification).
5. **Inductive bias:** assumptions that make H manageable (e.g. "output is linear in x").

```
input x --> [ hypothesis h(x; w) ] --> prediction ŷ --> compare with y
                     ^                                     |
                     +--------- update w (learning) -------+
```

**Example:** Marks prediction `h(x) = 50 + 10x` (x = study hours): x = 3 → ŷ = 80. Training adjusts 50 and 10 until predictions match past students.

**⚠️ Common mistake:** Confusing hypothesis *function* (a model, this section) with hypothesis *testing* (a statistics procedure, next section) — the examiner may ask either; read the question twice.

### 12.2 Hypothesis Testing (Statistical) [⚠️ Never asked — DUE, likely next]

**Definition:** A statistical procedure to decide, using sample data, whether there is enough evidence to reject a default claim (**null hypothesis H0**) in favour of an alternative claim (**H1**).

**Steps (write all 5):**

1. **State hypotheses:** H0 (no effect / status quo, e.g. "new model accuracy = old model accuracy") vs H1 (there is an effect, e.g. "new model is better").
2. **Choose significance level:** `α = 0.05` (5% risk of wrongly rejecting H0).
3. **Compute test statistic** from sample (z-test, t-test, chi-square as appropriate).
4. **Find p-value:** probability of observing data this extreme *if H0 were true*.
5. **Decide:** `p < α → reject H0` (result "statistically significant"); else fail to reject H0.

| Term | Meaning |
|---|---|
| Null hypothesis H0 | Default assumption — no difference/effect |
| Alternative H1 | What we want evidence for |
| p-value | P(data at least this extreme &#124; H0 true) |
| Type I error (α) | Rejecting H0 when it is true (false alarm) |
| Type II error (β) | Failing to reject H0 when it is false (miss) |

**Use in ML:** deciding whether model A's accuracy is *significantly* better than model B's (not just luck of the test split); feature significance in regression (t-test on coefficients).

**Example:** Old spam filter 90% accurate; new one scores 93% on a sample. A t-test gives p = 0.02 < 0.05 → reject H0 → improvement is statistically significant.

**⚠️ Common mistake:** Saying "p-value is the probability H0 is true" — it is the probability of the observed DATA given H0, not of H0 itself.

---

## 13. Data Distributions [⚠️ Never asked — DUE, likely next]

**Definition:** A data distribution describes how values of a variable are spread — which values occur and how frequently. ML algorithms assume/exploit distributions (e.g. least squares assumes Gaussian noise).

### Key distributions

| Distribution | Shape / formula | Property | ML relevance |
|---|---|---|---|
| **Normal (Gaussian)** | Bell curve; `f(x) = (1/(σ√2π)) e^(−(x−μ)²/2σ²)` | Symmetric about μ; 68–95–99.7 rule | Noise model in regression, z-score scaling, many tests assume it |
| **Uniform** | Flat; every value in [a,b] equally likely; `f(x)=1/(b−a)` | mean = (a+b)/2 | Random weight initialization, random sampling |
| **Bernoulli** | Single trial 0/1 with `P(1)=p` | mean p, var p(1−p) | Binary labels, logistic regression output |
| **Binomial** | # successes in n Bernoulli trials | mean np | Counting correct classifications |
| **Skewed** | Long tail one side | mean ≠ median | Income, house prices — need log transform |

```
NORMAL              UNIFORM            RIGHT (positive) SKEW
     _                ________            _
   _/ \_             |        |          / \_
  /     \            |        |         /    \__
_/       \_          |        |        |        \____
-----------         ----------        ------------------
68% within μ±1σ     all equally        tail →  mean > median > mode
95% within μ±2σ     likely             (fix with log transform)
99.7% within μ±3σ
```

- **68–95–99.7 rule (normal):** 68% of data within μ±σ, 95% within μ±2σ, 99.7% within μ±3σ — basis of outlier detection (|z| > 3 → outlier).
- **Skewness:** right/positive skew → tail on right, `mean > median`; left skew → `mean < median`. Remedy: log/sqrt transform to make data ~normal before modelling.
- **Why it matters in ML:** choice of normalization, outlier rules, imputation (mean for normal, median for skewed), and validity of statistical tests all depend on the distribution.

**Example:** Salaries are right-skewed (few very high earners) — impute missing salaries with **median**, not mean, and apply log transform before linear regression.

**⚠️ Common mistake:** Using mean-imputation and z-score rules on heavily skewed data — those assume near-normal data.

---

## 14. Data Preprocessing [🔥 PYQ May-23, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: transforming raw, noisy, incomplete data into clean, consistent, model-ready form ("garbage in, garbage out").
> 2. Headed points: (1) Data cleaning — missing values & outliers, (2) Data integration, (3) Data transformation — normalization & encoding, (4) Data reduction — feature selection/PCA/sampling, (5) Data splitting.
> 3. Draw the preprocessing pipeline diagram.
> 4. Example: patient dataset — fill missing BP with median, one-hot encode gender, min-max scale age, drop duplicate records.

**Definition:** Data preprocessing is the set of steps that convert raw real-world data (incomplete, noisy, inconsistent) into a clean, numeric, well-scaled dataset that ML algorithms can learn from effectively.

```
RAW DATA
   |
   v
[1 CLEANING]------ missing values (drop / mean / median / mode / predict)
   |               outliers (IQR rule, z-score>3), noise (binning/smoothing)
   v
[2 INTEGRATION]--- merge multiple sources, remove duplicates, resolve conflicts
   |
   v
[3 TRANSFORMATION] normalization (min-max) / standardization (z-score)
   |               encoding categorical vars (label / one-hot)
   v
[4 REDUCTION]----- feature selection, PCA, sampling, discretization
   |
   v
[5 SPLITTING]----- train / validation / test
   |
   v
MODEL-READY DATA
```

### Step details (one line each in exam)

1. **Cleaning:** handle missing values — delete row, or impute with mean (normal data) / median (skewed) / mode (categorical) / model-based; treat outliers via IQR (`outside Q1−1.5·IQR, Q3+1.5·IQR`) or z-score.
2. **Integration:** combine data from multiple databases/files; remove duplicates; unify units and naming.
3. **Transformation:** scale features (Section 15) and encode categories (below); log-transform skewed features.
4. **Reduction:** drop irrelevant/correlated features, PCA for dimensionality reduction, sampling for huge datasets.
5. **Splitting:** train/validation/test (Section 5).

### Label Encoding vs One-Hot Encoding [🔥 PYQ May-23]

**Label encoding:** assign each category an integer. `Red=0, Green=1, Blue=2` — 1 column stays 1 column.

**One-hot encoding:** create one binary column per category; exactly one is 1.

```
Colour   | Label |    One-hot
         |  enc  | Red Green Blue
---------+-------+---------------
Red      |   0   |  1    0    0
Green    |   1   |  0    1    0
Blue     |   2   |  0    0    1
```

| Basis | Label Encoding | One-Hot Encoding |
|---|---|---|
| Output | 1 integer column | k binary columns (k = #categories) |
| **Effect on dimensionality** | **Unchanged** | **Increases by k−1 columns per feature** — can explode for high-cardinality features (curse of dimensionality) |
| False ordering? | Yes — implies Blue(2) > Red(0) | No — categories independent |
| Best for | Ordinal data (Low<Medium<High); tree models | Nominal data (colour, city); linear/NN/distance models |
| Memory | Small | Large & sparse |

**Example:** "City" with 500 cities: label encoding keeps 1 column (but fakes an order); one-hot adds 500 sparse columns — use one-hot only for low-cardinality nominal features.

**⚠️ Common mistake:** One-hot encoding ordinal features (loses order) or label-encoding nominal features for KNN/linear models (invents a fake order that distorts distances).

---

## 15. Normalizing Data Sets [🔥 PYQ May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: rescaling features to a common range so no feature dominates due to units.
> 2. Headed points: Min-max formula, Z-score formula, comparison table, why it matters for convergence (elongated vs circular contours + GD), which algorithms need it.
> 3. Draw the gradient-descent contour diagram (elliptical vs circular).
> 4. Example: age (0–100) vs salary (0–10,00,000) before/after scaling.

**Definition:** Normalization rescales numeric features to a common scale (without distorting relative differences) so that features with large ranges do not dominate learning.

### The two formulas (memorize cold)

| Technique | Formula | Output range | Best when |
|---|---|---|---|
| **Min-Max normalization** | `x' = (x − min) / (max − min)` | [0, 1] | Bounded range needed (images, NN inputs); no big outliers |
| **Z-score standardization** | `x' = (x − μ) / σ` | mean 0, std 1 (unbounded) | Outliers present; data ~normal; PCA, SVM, logistic |

- **Decimal scaling (bonus line):** `x' = x / 10^j` where j makes max |x'| < 1.

### Why normalization matters for convergence & stability (May-24 core)

1. **Faster gradient-descent convergence:** unscaled features → elongated, elliptical cost contours → GD zig-zags with a tiny usable learning rate. Scaled features → near-circular contours → GD heads almost straight to the minimum.
2. **Numerical stability:** avoids overflow/underflow and exploding gradient updates from huge feature values.
3. **Fair feature influence:** distance-based algorithms (KNN, K-means, SVM) would otherwise be ruled by the largest-unit feature (salary crushes age).
4. **Equal regularization pressure:** L1/L2 penalize all weights alike only if features share scale.
5. **One learning rate works for all weights.**

```
UNSCALED (elongated contours)      SCALED (circular contours)
   _________________                    ___
  /  _____________  \                  / _ \
 |  /   ____      \  |                | (.) |   . = minimum
 |  \___\  /______/  |                 \___/
  \______\/_________/               GD: straight path, few steps
 GD path: \/\/\/\/ zig-zag,
 slow, may diverge if α large
```

**Which algorithms need it:** KNN, K-means, SVM, neural networks, PCA, gradient-descent regression → YES. Decision trees / Random Forest → largely scale-invariant.

**Example:** Features age ∈ [0,100] and salary ∈ [0, 10,00,000]: Euclidean distance ≈ salary difference alone; after min-max both lie in [0,1] and both contribute. Age 35 with min 20, max 60: `x' = (35−20)/(60−20) = 0.375`.

**⚠️ Common mistake:** Computing μ, σ (or min, max) on the FULL dataset — they must be computed on the training set only and then applied to the test set, else information leaks.

---

## 16. Data Augmentation [🔥 PYQ Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: artificially enlarging the training set by label-preserving transformations of existing samples.
> 2. Headed points: why (small data, overfitting, class imbalance, robustness), image techniques (6), text techniques (3), audio techniques (3), numeric/tabular (SMOTE).
> 3. Draw the "one cat image → 6 variants" diagram.
> 4. Example: 1,000 X-rays → 10,000 by rotation/flip/zoom; close with caution (don't flip digits 6/9).

**Definition:** Data augmentation artificially increases the size and diversity of the training set by applying **label-preserving transformations** to existing samples, improving generalization and reducing overfitting without collecting new data.

**Why it is needed:** small labelled datasets are expensive; deep models overfit small data; balances rare classes; makes models invariant to rotation/lighting/noise.

### Techniques by data type

**Images (most-asked list):**
1. **Geometric:** rotation (±15°), horizontal/vertical flip, translation (shift), scaling/zoom, cropping, shearing.
2. **Colour/photometric:** brightness, contrast, saturation jitter; grayscale.
3. **Noise-based:** Gaussian noise, blur.
4. **Erasing:** random erasing / cutout (mask random patch).
5. **Mixing (advanced, 1 line):** Mixup (blend two images+labels), CutMix.

**Text:** synonym replacement, random insertion/swap/deletion of words, back-translation (English→German→English).

**Audio:** time shift, pitch shift, speed change, adding background noise.

**Tabular/numeric:** adding small Gaussian noise; **SMOTE** — Synthetic Minority Over-sampling: creates synthetic minority-class points by interpolating between a sample and its nearest neighbours (fixes class imbalance).

```
                 +-- rotate 15°   --> [cat tilted]
                 +-- flip horiz.  --> [cat mirrored]
ORIGINAL         +-- zoom/crop    --> [cat close-up]
[cat image] -----+-- brightness+  --> [cat brighter]
  (1 sample)     +-- add noise    --> [cat grainy]
                 +-- random erase --> [cat w/ patch hidden]
                     ==> 1 image becomes 7 training samples
```

**Rules of use:** apply ONLY on training data (never on test set); transformation must not change the label (don't vertically flip "6" → looks like "9"; don't over-rotate text).

**Example:** A pneumonia-detection CNN with 1,000 X-rays reached 78% accuracy; after augmentation (rotation, shift, zoom, brightness → 10,000 effective images) it reached 89% with less overfitting.

**⚠️ Common mistake:** Augmenting the test set or using label-destroying transforms — both invalidate evaluation.

---

## 17. Evaluation Metrics [🔥 PYQ May-23, May-24 — MUST DO]

### 17.1 Confusion Matrix & Classification Metrics [🔥 PYQ May-23 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: a 2×2 table comparing actual vs predicted classes, from which all classification metrics derive.
> 2. Headed points: define TP/FP/FN/TN, draw matrix, formulas for accuracy/precision/recall/F1/specificity, when to prefer which metric.
> 3. Draw the labelled 2×2 matrix.
> 4. Close with the worked numerical below (memorize the numbers).

**Definition:** A confusion matrix is an N×N table that summarizes classifier performance by cross-tabulating **actual** classes against **predicted** classes; for binary problems it yields TP, FP, FN, TN.

```
                    PREDICTED
                 Positive   Negative
ACTUAL Positive |   TP    |   FN    |   <- FN = "miss" (Type II)
       Negative |   FP    |   TN    |   <- FP = "false alarm" (Type I)
```

- **TP:** actual +, predicted + (correct detection)
- **FP:** actual −, predicted + (false alarm — Type I error)
- **FN:** actual +, predicted − (missed case — Type II error)
- **TN:** actual −, predicted − (correct rejection)

### Derived metrics (all formulas)

| Metric | Formula | Meaning / when to use |
|---|---|---|
| Accuracy | `(TP+TN) / (TP+TN+FP+FN)` | Overall correctness; misleading on imbalanced data |
| Precision | `TP / (TP+FP)` | Of predicted positives, how many are truly correct; use when FP is costly (spam filter) |
| Recall (Sensitivity/TPR) | `TP / (TP+FN)` | Of actual positives, how many caught; use when FN is costly (cancer detection) |
| F1-score | `2·P·R / (P+R)` | Harmonic mean; single number for imbalanced data |
| Specificity (TNR) | `TN / (TN+FP)` | How well negatives are recognized |
| Error rate | `1 − Accuracy` | — |

### Worked 2×2 example (write this in exam)

100 patients tested for a disease; 40 actually diseased. Model predicts: TP = 30, FN = 10, FP = 5, TN = 55.

```
                 PRED +   PRED −
ACTUAL +   |  30 (TP) | 10 (FN) |  = 40 diseased
ACTUAL −   |   5 (FP) | 55 (TN) |  = 60 healthy
```

- `Accuracy  = (30+55)/100            = 0.85   (85%)`
- `Precision = 30/(30+5)  = 30/35     = 0.8571 (85.71%)`
- `Recall    = 30/(30+10) = 30/40     = 0.75   (75%)`
- `F1 = 2×0.8571×0.75/(0.8571+0.75) = 1.2857/1.6071 = 0.8000`
- `Specificity = 55/(55+5) = 55/60 = 0.9167 (91.67%)`

**Mnemonic:** **P**recision = **P**redicted-positive denominator; **R**ecall = **R**eal-positive denominator.

**⚠️ Common mistake:** Swapping FP and FN. Anchor it: FP = false alarm (healthy called sick), FN = dangerous miss (sick called healthy).

### 17.2 Evaluation Metrics for Regression [🔥 PYQ May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: regression outputs are continuous, so metrics measure the size of prediction errors, not right/wrong counts.
> 2. Headed points: MAE, MSE, RMSE, R², (Adjusted R² one line) — formula + interpretation + outlier sensitivity for each.
> 3. Draw scatter with residual (vertical error) lines.
> 4. Example: compute MAE/MSE/RMSE on 3 points (below).

Let `y_i` = actual, `ŷ_i` = predicted, `n` = samples, residual `e_i = y_i − ŷ_i`.

| Metric | Formula | Interpretation | Outlier sensitivity |
|---|---|---|---|
| **MAE** | `(1/n) Σ |y_i − ŷ_i|` | Average absolute error, same units as y | Robust |
| **MSE** | `(1/n) Σ (y_i − ŷ_i)²` | Average squared error; smooth, differentiable (used as loss) | High (squares big errors) |
| **RMSE** | `√MSE` | MSE back in y's units; most reported | High |
| **R² (coeff. of determination)** | `1 − Σ(y_i−ŷ_i)² / Σ(y_i−ȳ)²` | Fraction of variance explained; 1 = perfect, 0 = mean-model, <0 = worse than mean | — |
| **Adjusted R²** | `1 − (1−R²)(n−1)/(n−k−1)` | R² penalized for adding useless features (k = #features) | — |

```
 y |        x           residual e_i = vertical gap
   |      x |           between point and line
   |    ____|______
   |   /|  line ŷ
   | x/ |
   +----------------- x
```

**Mini worked example:** actual y = (3, 5, 7), predicted ŷ = (2, 5, 9).
- Errors: 1, 0, −2 → `MAE = (1+0+2)/3 = 3/3 = 1.0`
- `MSE = (1+0+4)/3 = 5/3 = 1.6667`, `RMSE = √1.6667 = 1.2910`

**Choosing:** outliers present → MAE; want differentiable training loss → MSE; report to humans → RMSE; explain fit quality → R².

**⚠️ Common mistake:** Using accuracy/confusion matrix for regression — those apply only to classification; regression uses error magnitudes.

---

## 18. K-Nearest Neighbours (KNN) — Concept [🔥 PYQ May-23 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. One line: instance-based, lazy, non-parametric classifier — a point takes the majority class of its k nearest training points.
> 2. Headed points: algorithm steps (5), distance formula, choosing k, lazy vs eager, pros/cons.
> 3. Draw the "query point with k=3 circle" diagram.
> 4. Close: mention numerical practice (full solved numerical in the Numericals file) + need for normalization.

**Definition:** KNN is a **lazy, instance-based, non-parametric** algorithm: it stores all training data and classifies a new point by a **majority vote of its k nearest neighbours** (for regression: their average).

**Algorithm steps:**
1. Choose k (e.g. 3 or 5) and a distance metric.
2. Compute distance from the query point to every training point — Euclidean: `d = √(Σ (x_i − y_i)²)` (Manhattan: `Σ|x_i − y_i|`).
3. Sort distances; pick the k smallest.
4. **Classification:** predict the majority class among the k. **Regression:** predict their mean.
5. (Optional) weight votes by 1/d so nearer points count more.

```
            k = 3 neighbourhood
        B          _____
    B          _--'     '--_        A, B = training classes
       A     /    A          \      ? = query point
        \   |   ?      A      |     3 nearest = A, A, B
         \   \_          _   /      majority A --> predict A
   B       \   '--_____--'
              A         B
```

**Choosing k:** small k → noisy, overfits; large k → over-smooth, underfits; use odd k (avoids ties) and pick via cross-validation; rule of thumb `k ≈ √n`.

| Basis | KNN (lazy learner) | Eager learners (e.g. decision tree) |
|---|---|---|
| Training | None — just store data | Builds model upfront |
| Prediction | Slow — O(n) distances per query | Fast |
| Memory | Stores whole dataset | Stores compact model |
| Boundary | Highly flexible, local | Fixed by model form |

- **Pros:** simple, no training, naturally multi-class, adapts to complex boundaries.
- **Cons:** slow at prediction, memory-heavy, curse of dimensionality, **needs feature normalization** (distances!), sensitive to irrelevant features.

**Example:** Classify a fruit (weight 150 g, red) — its 3 nearest labelled fruits are apple, apple, cherry → predict apple. *(Full May-23 numerical solved step-by-step in [Numericals-and-Short-Notes.md](Numericals-and-Short-Notes.md).)*

**⚠️ Common mistake:** Forgetting to normalize features before computing distances — the large-scale feature otherwise decides everything.

---

## ⚡ Quick Revision Box

### One-liners (scan in 10 minutes)

| # | Topic | One-liner |
|---|---|---|
| 1 | Define ML | Mitchell: improves at task T with experience E as measured by P; learns rules FROM data instead of hand-coding them |
| 2 | ML vs Traditional | Traditional: data+rules→output; ML: data+output→rules(model) |
| 3 | Design issues | 4 choices: training experience → target function → representation → learning algorithm; issues: data quality, overfitting, features, generalization |
| 4 | Scope | Healthcare, finance, NLP, vision, speech, recommendations |
| 5 | Limitations | Data-hungry, no causality, bias, poor out-of-distribution, black-box, costly, adversarial |
| 6 | Supervised | Labelled data; classification (discrete) + regression (continuous); KNN/SVM/LR |
| 7 | Unsupervised | No labels; clustering (K-means), association (Apriori), PCA |
| 8 | Reinforcement | Agent + environment + reward → learn policy; Q-learning |
| 9 | Train vs Test | Train fits params (~70%), test measures generalization (~30%), touched once; validation tunes hyperparams |
| 10 | K-fold CV | k rotations of train/validate; average score; great for small data |
| 11 | Model selection | Pick complexity with lowest VALIDATION error; Occam's razor; U-curve |
| 12 | Underfit / Overfit | Both errors high = underfit (high bias); train low + test high = overfit (high variance) |
| 13 | Linear regression | Fit line minimizing MSE; GD or normal equation |
| 14 | Logistic regression | Sigmoid of wᵀx → probability → classifier; cross-entropy loss |
| 15 | LWR | Non-parametric; new weighted fit per query; Gaussian weights, bandwidth τ |
| 16 | Prob & stats role | Bayes theorem, MLE = loss minimization, sampling justifies splits |
| 17 | Linear algebra | Data = matrix, sample = vector; Av=λv eigen → PCA |
| 18 | Convex optimization | Convex fn over convex set; local min = global min; GD converges (lin/log regression convex; NN not) |
| 19 | Visualization | Histogram(distribution), scatter(relation), box(outliers), heatmap(correlation), line(trend) |
| 20 | Hypothesis function | h: X→Y candidate from space H; learned by minimizing J(w) |
| 21 | Hypothesis testing | H0 vs H1; p < α (0.05) → reject H0; Type I = false alarm, Type II = miss |
| 22 | Distributions | Normal 68-95-99.7; uniform flat; skewed → use median + log transform |
| 23 | Preprocessing | Clean → Integrate → Transform → Reduce → Split |
| 24 | Label vs One-hot | Label: 1 col, fake order, ordinal; One-hot: k cols (dimensionality UP), nominal |
| 25 | Normalization | Min-max [0,1] vs z-score (μ=0,σ=1); circular contours → fast stable GD; must for KNN/SVM/NN |
| 26 | Augmentation | Label-preserving transforms: rotate/flip/crop/noise/brightness; SMOTE for tabular; train set only |
| 27 | Confusion matrix | TP FP FN TN; precision = TP/(TP+FP), recall = TP/(TP+FN) |
| 28 | Regression metrics | MAE robust, MSE trainable, RMSE reportable, R² variance explained |
| 29 | KNN | Lazy; k nearest by Euclidean distance; majority vote; normalize first; odd k via CV |

### Every formula in one place

```
Mitchell:        learn ⇔ P(T) improves with E
Linear reg:      h(x) = w0 + w1x1 + ... + wnxn
MSE cost:        J(w) = (1/2m) Σ (h(x_i) − y_i)²
GD update:       w := w − α ∂J/∂w
Normal eqn:      w = (XᵀX)⁻¹ Xᵀ y
Sigmoid:         σ(z) = 1 / (1 + e^(−z))
Log loss:        J = −(1/m) Σ [y log h + (1−y) log(1−h)]
LWR weights:     w_i = exp(−(x_i − x_q)² / (2τ²))
Bayes:           P(H|D) = P(D|H)·P(H) / P(D)
Mean/Var:        μ = Σx/n ;  σ² = Σ(x−μ)²/n
Correlation:     r = cov(X,Y)/(σx·σy)
Eigen:           A v = λ v ;  det(A − λI) = 0
Convex fn:       f(θx+(1−θ)y) ≤ θf(x)+(1−θ)f(y) ;  f''(x) ≥ 0
Normal dist:     f(x) = (1/(σ√2π)) e^(−(x−μ)²/2σ²)   [68-95-99.7]
Min-max:         x' = (x − min)/(max − min)
Z-score:         x' = (x − μ)/σ
Accuracy:        (TP+TN)/(TP+TN+FP+FN)
Precision:       TP/(TP+FP)          Recall: TP/(TP+FN)
F1:              2PR/(P+R)           Specificity: TN/(TN+FP)
MAE:             (1/n)Σ|y−ŷ|         MSE: (1/n)Σ(y−ŷ)²    RMSE: √MSE
R²:              1 − Σ(y−ŷ)²/Σ(y−ȳ)²
Euclidean:       d = √(Σ(x_i − y_i)²)
IQR outlier:     outside [Q1 − 1.5·IQR, Q3 + 1.5·IQR]
AIC/BIC:         AIC = 2k − 2lnL ;  BIC = k·ln(n) − 2lnL
```

### Diagrams to practice (draw each once from memory)

1. Traditional programming vs ML block diagram
2. ML process pipeline (Collect→…→Deploy)
3. 3-branch ML types tree + RL agent-environment loop
4. Train/validation/test split bar + 5-fold CV grid
5. Error vs complexity U-curve + underfit/goodfit/overfit sketches
6. Best-fit line scatter; sigmoid curve; LWR local-lines sketch
7. Convex bowl vs non-convex hilly curve
8. Histogram, scatter, box plot, heatmap mini-sketches
9. Normal / uniform / skewed distribution shapes
10. Preprocessing pipeline flowchart
11. GD contours: elongated (unscaled) vs circular (scaled)
12. One image → 6 augmented variants
13. Labelled 2×2 confusion matrix
14. KNN k=3 neighbourhood circle

**Exam-hall reminder:** Q1 is ALWAYS from this unit — bank a near-perfect 14 here first, in your best handwriting, with every diagram labelled.
