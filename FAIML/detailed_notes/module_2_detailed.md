# Module 2 — Detailed Exam Notes: Machine Learning

> **Purpose:** Comprehensive notes for writing full, high-scoring exam answers. Each section has complete definitions, explanations, examples, and diagrams.

---

## Topic 1: Introduction to Machine Learning

### Definition
**Machine Learning (ML)** is a subset of Artificial Intelligence (AI) that enables computer systems to **automatically learn and improve from experience** without being explicitly programmed for every task. Instead of writing specific rules, the computer is given data and algorithms that allow it to learn the patterns and make decisions on its own.

> *"Machine Learning is the field of study that gives computers the ability to learn without being explicitly programmed."* — Arthur Samuel, 1959

### Traditional Programming vs. Machine Learning

| Aspect | Traditional Programming | Machine Learning |
|---|---|---|
| Input | Rules + Data | Data + Answers (Labels) |
| Output | Answers | Rules (the Model) |
| Flexibility | Rigid — must update code for new rules | Adaptive — learns new patterns automatically |
| Example | `if temp > 37 → fever` (manually coded) | Model learns fever pattern from patient data |

### Why Machine Learning?
- Too complex to write manual rules (e.g., recognizing a face).
- Patterns change over time (e.g., spam emails evolve).
- Huge volumes of data that humans cannot process manually.
- Need for personalization at scale (e.g., Netflix recommendations).

### Key Terminology
- **Model:** The mathematical function learned from training data.
- **Features (X):** Input variables used to make predictions.
- **Label/Target (y):** The output variable the model predicts.
- **Training:** The process of fitting the model to the data.
- **Inference:** Using the trained model to predict on new data.

---

## Topic 2: Stages of Machine Learning

A complete ML project follows these systematic stages:

### Stage 1: Problem Definition
- Define the goal: Is it classification, regression, or clustering?
- Identify the type of ML needed (supervised, unsupervised, reinforcement).

### Stage 2: Data Collection
- Gather relevant data from databases, APIs, web scraping, sensors, etc.
- Data can be numerical, text, images, audio, etc.
- **Key principle:** More quality data → better model.

### Stage 3: Data Preprocessing
This is arguably the **most time-consuming** stage in real-world ML.
- **Handling Missing Values:** Remove rows, fill with mean/median/mode, or use imputation.
- **Removing Duplicates:** Eliminate redundant entries.
- **Handling Outliers:** Remove or cap extreme values using IQR or Z-score.
- **Encoding Categorical Variables:** Convert text categories to numbers.
  - Label Encoding: `Red=0, Blue=1, Green=2`
  - One-Hot Encoding: Creates binary columns for each category.
- **Feature Scaling/Normalization:**
  - **Min-Max Scaling:** Scale to [0, 1] range.
  - **Standardization (Z-score):** Mean=0, Std Dev=1 — `z = (x - μ) / σ`
- **Feature Selection:** Keep only the most informative features.

### Stage 4: Choosing a Model
- Select an algorithm based on the task:
  - Classification → Logistic Regression, SVM, Decision Trees
  - Regression → Linear Regression, Ridge, Lasso
  - Clustering → K-Means, Hierarchical Clustering
- Consider dataset size, interpretability, and accuracy requirements.

### Stage 5: Training the Model
- Feed the preprocessed data into the algorithm.
- The algorithm adjusts internal parameters (weights) to minimize error.
- Training data is used here — typically 70–80% of total data.

### Stage 6: Evaluating the Model
- Test the trained model on **unseen test data** (20–30% of total).
- Use appropriate metrics: Accuracy, Precision, Recall, F1-Score, MSE.
- Identify overfitting or underfitting issues.

### Stage 7: Hyperparameter Tuning
- **Hyperparameters** are settings set before training (e.g., K in KNN, depth in Decision Tree).
- Use **Grid Search** or **Random Search** to find optimal values.
- Use **cross-validation** to validate choices without overfitting.

### Stage 8: Prediction/Deployment
- Deploy the model to a production environment (web app, API, embedded system).
- Monitor model performance over time — **model drift** can occur as data patterns change.
- Periodically retrain with fresh data.

---

## Topic 3: Types of Machine Learning

### 3.1 Supervised Learning
**Definition:** The model is trained on a **labeled dataset** — every training example has both an input (features) and a correct output (label).

**How it works:**
- The model learns a mapping function: `f(X) → y`
- It minimizes the difference between its predictions and the true labels.

**Two Sub-types:**
1. **Classification:** Output is a **discrete category**.
   - Binary: Yes/No, Spam/Not Spam, Benign/Malignant
   - Multi-class: Classifying emails into Inbox, Spam, Promotions
   - Algorithms: Logistic Regression, SVM, Decision Tree, KNN

2. **Regression:** Output is a **continuous numerical value**.
   - Predicting house prices, stock values, rainfall amount
   - Algorithms: Linear Regression, Polynomial Regression, Random Forest

**Real-world Examples:**
- Email spam filtering (Classification)
- Predicting salary based on years of experience (Regression)
- Medical diagnosis from symptoms (Classification)

### 3.2 Unsupervised Learning
**Definition:** The model is trained on an **unlabeled dataset** — no correct output is provided. The algorithm must discover hidden structure or patterns by itself.

**How it works:**
- Finds natural groupings, relationships, or compressed representations in data.

**Sub-types:**
1. **Clustering:** Grouping similar data points together.
   - K-Means, Hierarchical Clustering, DBSCAN
2. **Dimensionality Reduction:** Reducing the number of features while retaining important information.
   - PCA (Principal Component Analysis), t-SNE
3. **Association Rule Learning:** Finding rules that describe large portions of data.
   - Apriori algorithm (Market basket analysis)

**Real-world Examples:**
- Customer segmentation for marketing
- Anomaly detection (fraud, network intrusion)
- Recommender systems

### 3.3 Reinforcement Learning
**Definition:** An **agent** learns to make sequential decisions by interacting with an **environment**. It receives **rewards** for good actions and **penalties** for bad ones — learning strategy through trial and error.

**Key Components:**
| Component | Description |
|---|---|
| **Agent** | The learner/decision maker |
| **Environment** | What the agent interacts with |
| **State (s)** | Current situation/configuration |
| **Action (a)** | What the agent can do |
| **Reward (r)** | Feedback signal (+ve or -ve) |
| **Policy (π)** | Strategy mapping states to actions |

**Goal:** Maximize the **cumulative reward** over time.

**Real-world Examples:**
- AlphaGo (Google DeepMind) — mastered the game of Go
- Self-driving car steering control
- Robot arm manipulation
- Game-playing AI (Atari, Chess)

### Comparison of ML Types:
| Feature | Supervised | Unsupervised | Reinforcement |
|---|---|---|---|
| Labels | Required | Not required | Reward signals |
| Goal | Predict output | Find structure | Maximize reward |
| Feedback | Immediate (correct answer) | None | Delayed reward |
| Examples | Spam filter, diagnosis | Clustering, PCA | Game AI, robotics |

---

## Topic 4: Cross-Validation — K-Fold Technique

### Why Cross-Validation?
When evaluating a model, a simple train-test split can be **unreliable** — the results depend on which data ended up in the test set. Cross-validation solves this by providing a more **robust and unbiased estimate** of model performance.

### Definition
**Cross-Validation** is a resampling technique used to evaluate ML models by testing them on multiple different subsets of the data.

### K-Fold Cross-Validation — Step by Step

**Setup:** Divide the dataset into K equal-sized folds (subsets).

**Procedure:**
1. Split the entire dataset into **K equal folds** (e.g., K=5 → 5 folds).
2. **Iteration 1:** Fold 1 = Test set; Folds 2,3,4,5 = Training set → Train and evaluate.
3. **Iteration 2:** Fold 2 = Test set; Folds 1,3,4,5 = Training set → Train and evaluate.
4. Continue until every fold has been used exactly once as the test set.
5. **Average** all K evaluation scores to get the final performance estimate.

**Visual Representation (K=5):**
```
Fold 1: [TEST] [TRAIN] [TRAIN] [TRAIN] [TRAIN]
Fold 2: [TRAIN] [TEST] [TRAIN] [TRAIN] [TRAIN]
Fold 3: [TRAIN] [TRAIN] [TEST] [TRAIN] [TRAIN]
Fold 4: [TRAIN] [TRAIN] [TRAIN] [TEST] [TRAIN]
Fold 5: [TRAIN] [TRAIN] [TRAIN] [TRAIN] [TEST]
Final Score = Average of all 5 evaluation scores
```

### Choosing K:
- **K=10** is most commonly used in practice.
- **K=N (Leave-One-Out CV):** Extreme case — each sample is its own test fold. Very accurate but computationally expensive.
- **Smaller K:** More bias, less variance, computationally cheaper.
- **Larger K:** Less bias, more variance, computationally expensive.

### Advantages:
- Every data point is used for both training and testing.
- Provides reliable, generalizable performance estimates.
- Reduces selection bias from a single train-test split.

### Disadvantages:
- Computationally expensive — the model is trained K times.
- Not suitable for very large datasets.

### Stratified K-Fold:
- A variant that ensures each fold has roughly the same proportion of each class label.
- Essential for **imbalanced datasets** (e.g., 95% not-fraud, 5% fraud).

---

## Topic 5: Overfitting and Underfitting

### The Bias-Variance Tradeoff
- **Bias:** Error from overly simplistic assumptions in the model. High bias → underfitting.
- **Variance:** Sensitivity to fluctuations in training data. High variance → overfitting.
- The goal is to find a model with low bias AND low variance.

### 5.1 Underfitting (High Bias)

**Definition:** The model is **too simple** to capture the underlying patterns in the training data. It fails to learn even the basic relationships.

**Characteristics:**
- Poor performance on **both** training data AND test data.
- The model hasn't learned enough from the data.
- Produces high training error and high test error.

**Causes:**
- Model is too simple (e.g., using Linear Regression for highly non-linear data).
- Insufficient training (too few epochs).
- Too much regularization applied.
- Features are not informative enough.

**Remedies:**
- Use a more complex model.
- Add more features or engineer better features.
- Reduce regularization strength.
- Train for more epochs.

### 5.2 Overfitting (High Variance)

**Definition:** The model is **too complex** and has memorized the training data, including its noise and random fluctuations. It fails to generalize to new, unseen data.

**Characteristics:**
- Excellent performance on training data.
- Poor performance on test/validation data.
- Very low training error, but high test error.

**Causes:**
- Model is too complex (e.g., deep Decision Tree with no pruning).
- Too few training examples.
- Training for too many epochs.
- Too many features relative to the number of samples.

**Remedies:**
- **Cross-Validation:** Detect overfitting early.
- **Regularization:** L1 (Lasso) or L2 (Ridge) penalties to constrain model complexity.
- **Pruning:** For decision trees — limit depth.
- **Dropout:** For neural networks — randomly deactivate neurons during training.
- **More Training Data:** The most reliable remedy.
- **Early Stopping:** Stop training when validation loss starts increasing.
- **Ensemble Methods:** Bagging reduces variance.

### Visual Analogy:
```
Underfitting: Straight line through a curved dataset (too simple)
Good Fit:     Smooth curve that captures the trend
Overfitting:  Zigzag line that passes through every point (too complex)
```

---

## Topic 6: Evaluation Metrics — Confusion Matrix

### Confusion Matrix

A **Confusion Matrix** is a tabular summary used to evaluate the performance of a **classification** model by comparing actual vs. predicted labels.

For a binary classifier:

```
                  Predicted Positive   Predicted Negative
Actual Positive       TP                    FN
Actual Negative       FP                    TN
```

| Term | Abbreviation | Meaning |
|---|---|---|
| **True Positive** | TP | Predicted Positive AND Actual Positive ✓ |
| **True Negative** | TN | Predicted Negative AND Actual Negative ✓ |
| **False Positive** | FP | Predicted Positive BUT Actual Negative ✗ (Type I Error) |
| **False Negative** | FN | Predicted Negative BUT Actual Positive ✗ (Type II Error) |

### Metrics Derived from Confusion Matrix:

**1. Accuracy:**
```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
```
- Overall proportion of correct predictions.
- **Misleading for imbalanced datasets** (e.g., 99% negative class).

**2. Precision (Positive Predictive Value):**
```
Precision = TP / (TP + FP)
```
- Of all the positive predictions, how many were actually positive?
- **Use when:** False Positives are costly (e.g., spam filter — wrongly blocking important email).

**3. Recall (Sensitivity / True Positive Rate):**
```
Recall = TP / (TP + FN)
```
- Of all actual positives, how many did the model correctly capture?
- **Use when:** False Negatives are costly (e.g., cancer detection — missing a tumor is dangerous).

**4. F1-Score:**
```
F1-Score = 2 × (Precision × Recall) / (Precision + Recall)
```
- Harmonic mean of Precision and Recall.
- Best metric when there's an **imbalanced class distribution**.
- Balances both Precision and Recall.

**5. Specificity (True Negative Rate):**
```
Specificity = TN / (TN + FP)
```
- Of all actual negatives, how many did the model correctly identify?

### Numerical Example:
Model predicts disease presence. Results:
- TP = 90 (correctly identified sick patients)
- TN = 850 (correctly identified healthy patients)
- FP = 30 (healthy patients wrongly flagged as sick)
- FN = 30 (sick patients wrongly flagged as healthy)

```
Accuracy  = (90+850)/(90+850+30+30) = 940/1000 = 94%
Precision = 90/(90+30) = 90/120 = 75%
Recall    = 90/(90+30) = 90/120 = 75%
F1-Score  = 2 × (0.75 × 0.75)/(0.75+0.75) = 75%
```

---

## Topic 7: Linear Regression

### Definition
**Linear Regression** is a supervised learning algorithm used to predict **continuous numerical output** values by establishing a linear relationship between input features (X) and the output variable (y).

### Simple Linear Regression (One Feature):
```
y = mx + c    OR    y = β₀ + β₁x
```
- `y` = predicted output (dependent variable)
- `x` = input feature (independent variable)
- `β₀` = intercept (value of y when x=0)
- `β₁` = slope (change in y per unit change in x)

### Multiple Linear Regression (Multiple Features):
```
y = β₀ + β₁x₁ + β₂x₂ + ... + βₙxₙ
```

### How It Works — Finding the Best Fit Line:
The goal is to find values of β₀ and β₁ that **minimize the total prediction error**.

**Cost Function — Mean Squared Error (MSE):**
```
MSE = (1/n) × Σ(yᵢ - ŷᵢ)²
```
- `yᵢ` = actual value
- `ŷᵢ` = predicted value
- N = number of samples

**Optimization — Ordinary Least Squares (OLS):**
- Calculates the exact β values analytically that minimize MSE.

**Optimization — Gradient Descent:**
- Iteratively updates β values in the opposite direction of the gradient to reduce MSE.

### Assumptions of Linear Regression:
1. **Linearity:** Linear relationship between X and y.
2. **Independence:** Observations are independent of each other.
3. **Homoscedasticity:** Constant variance of residuals.
4. **Normality:** Residuals are normally distributed.
5. **No multicollinearity:** Features are not highly correlated with each other.

### Evaluation Metrics:
- **MSE (Mean Squared Error):** Average of squared errors. Penalizes large errors heavily.
- **RMSE (Root MSE):** Square root of MSE — same unit as output.
- **MAE (Mean Absolute Error):** Average of absolute errors — robust to outliers.
- **R² (R-squared):** Proportion of variance explained by the model. R²=1 is perfect; R²=0 means model is no better than predicting the mean.

---

## Topic 8: Decision Trees

### Definition
A **Decision Tree** is a versatile supervised learning algorithm used for both **classification** and **regression** tasks. It models decisions as a tree structure, where each internal node tests a feature, each branch represents an outcome, and each leaf represents a final label/prediction.

### Structure of a Decision Tree:
```
                [Root Node]
               /             \
        [Internal Node]    [Internal Node]
        /      \                /       \
  [Leaf]    [Leaf]         [Leaf]    [Internal Node]
                                      /        \
                                 [Leaf]      [Leaf]
```

| Component | Description |
|---|---|
| **Root Node** | Topmost node — represents the entire dataset and makes the first split |
| **Internal/Decision Node** | A node split further based on a feature condition |
| **Branch/Edge** | Represents the outcome of a test (e.g., Yes/No, ≤5 / >5) |
| **Leaf Node** | Terminal node — gives the final classification/prediction |

### How a Decision Tree Splits:
The tree selects **which feature to split on** at each node using a **splitting criterion** to maximize information gain:

**1. Information Gain (for Classification):**
```
Information Gain = Entropy(parent) - Weighted Average Entropy(children)
```
**Entropy:** Measure of impurity/disorder:
```
Entropy = -Σ pᵢ × log₂(pᵢ)
```
- Entropy = 0 → Pure node (all same class)
- Entropy = 1 → Maximum impurity (50/50 split between 2 classes)

**2. Gini Impurity:**
```
Gini = 1 - Σ pᵢ²
```
- Gini = 0 → Pure node

The algorithm selects the feature that **maximizes Information Gain** (or minimizes Gini) at each level.

### Algorithm (ID3 / CART):
1. Calculate entropy/Gini for the full dataset.
2. For each feature, calculate the Information Gain of splitting on it.
3. Choose the feature with the **highest Information Gain** as the root/split node.
4. Recursively build subtrees for each branch.
5. Stop when all data in a node belongs to one class, or max depth is reached.

### Advantages:
- Easy to understand and visualize (white-box model).
- No need to scale features.
- Handles both numerical and categorical data.
- Captures non-linear relationships.

### Disadvantages:
- Prone to **overfitting** — especially with deep, unpruned trees.
- **Unstable** — small changes in data can drastically change the tree structure.
- Biased toward features with many levels.

### Pruning (Controlling Overfitting):
- **Pre-pruning:** Set `max_depth`, `min_samples_split` before training.
- **Post-pruning:** Grow the full tree, then trim back branches that don't improve test accuracy.

---

## Exam Tips for Module 2 🎯

1. **For ML Introduction:** Always contrast Traditional Programming vs. ML (Rules+Data=Output vs. Data+Output=Rules).
2. **For Types of ML:** Give a real-world example for each type. Reinforcement learning = agent + reward is the key.
3. **For K-Fold:** Draw the fold diagram. State that each fold serves as test set exactly once.
4. **For Confusion Matrix:** Write out all 4 cells (TP, TN, FP, FN) and ALL formulas clearly.
5. **For Overfitting vs Underfitting:** Draw the analogy — underfitting=straight line, overfitting=zigzag line.
6. **For Linear Regression:** Write both equations `y = mx + c` and `y = β₀ + β₁x`, and state MSE formula.
7. **For Decision Trees:** Explain Entropy and Information Gain — these are marks-guaranteed concepts.
8. **Keywords to use:** "generalization", "bias-variance tradeoff", "hyperparameter", "labeled dataset", "cost function", "gradient descent".
