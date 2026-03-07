# Expected Questions, PYQ Solutions, and Strategy - Module 2

Below are the detailed solutions to your provided Previous Year Questions (PYQs), alongside a guide on how to approach them and further predictions for the upcoming examination.

---

## PYQ 1: Learning Types & Cross Validation

### Q.2(A) Differentiate between Supervised, Unsupervised, and Reinforcement Learning with examples. (5 Marks)
**Solution:**

| Feature | Supervised Learning | Unsupervised Learning | Reinforcement Learning |
| :--- | :--- | :--- | :--- |
| **Basic Concept** | Model is trained on a labeled dataset (both input and target output are provided). | Model is trained on completely unlabeled data and must find structures independently. | An "agent" learns by interacting continuously with an environment to maximize total rewards. |
| **Output Goal** | To predict future outcomes accurately based on historical, fully known patterns. | To discover underlying hidden groupings, anomalies, or relationships. | To learn the optimal sequence of actions (a policy) to survive or succeed. |
| **Feedback Mechanism** | Immediate direct feedback via error calculation with known ground-truth tags. | Zero feedback mechanism available natively. | Delayed feedback utilizing Rewards (positive) and Penalties (negative). |
| **Algorithm Categories**| Classification, Regression. | Clustering, Dimensionality Reduction. | Q-Learning, Deep Adversarial Networks. |
| **Real World Examples** | Predicting Housing Prices, Detecting Email Spam from marked spam files. | Market Customer Segmentation based purely on buying patterns. | Autonomous self-driving cars responding to road stimuli, AI playing Chess. |

### Q.2(B) Explain Cross Validation techniques in Machine Learning. Describe K-Fold Cross Validation with suitable example and advantages. (5 Marks)
**Solution:**
**Cross-Validation Definition:**
It is a vital statistical resampling mechanism fundamentally employed to accurately monitor machine learning model capability on an isolated, strictly unseen dataset, successfully preventing overfitting risks.

**K-Fold Cross Validation Explained:**
Instead of a simple "one-time" Train/Test split, K-Fold handles datasets dynamically:
1. The global dataset experiences partitioning into **$K$** mutually exclusive subsets/folds presenting uniform sizes.
2. During iterative training processes lasting $K$ times, exactly **one** single fold is quarantined distinctively as testing verification data.
3. Simultaneously, training assimilates the leftover **$(K-1)$** folds.
4. Each fold mandatorily performs validation rotation exclusively once.
5. Global effectiveness signifies an arithmetic mean compiling performance metrics spanning all individual $K$ experiments.

**Example:**
Applying **$K=5$** Cross-Validation over 100 patient records equates to 5 partitions of 20 records.
* Iteration 1: Fold 1 is the Test Set (20). Folds 2,3,4,5 dictate the Train Set (80).
* ... Process iterates until Fold 5 anchors the Test Set sequentially.

**Advantages:**
1. Limits variance aggressively compared to a single lucky/unlucky train-test split configuration.
2. Diminishes rampant data exhaustion because 100% of observations interact heavily in both robust testing and immense training loops.

---

## Alternative PYQ: Overfitting/Underfitting & Metrics Mathematics

### Q.2(A) What is Overfitting and Underfitting? Explain with suitable examples. (5 Marks)
**Solution:**
**Underfitting:**
* **Explanation:** Occurs when an ML mapping algorithm assumes radically primitive structural logic, brutally missing distinct underlying relations connecting data. Displays high levels of metric error uniformly across internal training domains and external testing domains. Termed mathematically as "High Bias".
* **Suitable Example:** Trying to force a rigidly linear regression straight line securely through heavily staggered parabolic data structures.

**Overfitting:**
* **Explanation:** Surfaces visibly when experimental ML formulas assume destructive complexity levels, blindly memorizing arbitrary microscopic noise and dataset outliers alongside legitimate trends exclusively belonging to training batches. Termed mathematically as "High Variance".
* **Suitable Example:** Utilizing an aggressive decision tree with 200 infinite depth splits on mere 500 records resulting in 100% flawless training mastery but dismal 30% performance when predicting fundamentally fresh inputs.

### Q.2(B) Calculate Metrics From Confusion Matrix. (5 Marks)

**Given Grid Transformation:**
* **True Positives (TP):** 45 (Predicted Positive, Actual Positive)
* **False Negatives (FN):** 5 (Predicted Negative, Actual Positive - Type II error)
* **False Positives (FP):** 5 (Predicted Positive, Actual Negative - Type I error)
* **True Negatives (TN):** 95 (Predicted Negative, Actual Negative)

**Calculations (Must show all formulas concisely):**
**Total Dataset Elements (N):** 45 + 5 + 5 + 95 = 150 instances.

1. **Accuracy** = `(TP + TN) / Total`
   $$Accuracy = (45 + 95) / 150 = 140 / 150 = 0.9333$$ **(93.33%)**

2. **Precision** = `TP / (TP + FP)`
   $$Precision = 45 / (45 + 5) = 45 / 50 = 0.90$$ **(90.00%)**

3. **Recall (Sensitivity)** = `TP / (TP + FN)`
   $$Recall  = 45 / (45 + 5) = 45 / 50 = 0.90$$ **(90.00%)**

4. **F1 Score** = `2 * (Precision * Recall) / (Precision + Recall)`
   $$F1 Score = 2 * (0.90 * 0.90) / (0.90 + 0.90) = 1.62 / 1.80 = 0.90$$ **(90.00%)**

---

## 👩‍🏫 Guide To Solving Similar "Confusion Matrix" Numerical Questions

The trick to confidently scoring absolute full marks on matrix grid tables:
1. **Never memorise table positions—read the text!** Sometimes examiners swap rows and columns casually. Always explicitly extract TP, TN, FP, and FN into a side list first by interpreting "Predicted VS Actual".
2. **"True" refers to correctness:** (Prediction matched actual).
3. **"False" refers to being incorrect:** (Prediction wildly differed from actual).
4. **"Positive/Negative" refers strictly to the Prediction:** Ask yourself, "What did the model assert?" This defines the second part of the term.
5. **Always double-calculate F1-Score:** Because it relies completely on your manual Precision and Recall values. Verify those two fractions are unarguably correct natively first. Furthermore, note that mathematically, *Sensitivity is identically synonymous with Recall.* Have zero fear if an exam swaps the labels.

---

## 🔮 Exam Predictions for Module 2: What to Expect Next

Because the exam heavily verified metric calculation and foundational evaluation constraints this round, expect upcoming questions to rotate slightly towards the actual model architectures and stage progression outlined systematically in the syllabus:

**Expected Question 1 (Theoretical Flow):**
> *List and thoroughly elaborate upon the fundamental chronological stages dictating a standard Machine Learning system lifecycle. (5 Marks)*
* **How to answer:** Clearly sequentially draft Data Collection -> Preprocessing -> Model Selection -> Training -> Evaluational Metrics -> Tuning -> Deployment. Add 1 sentence describing each stage flawlessly.

**Expected Question 2 (Algorithm Core):**
> *Explain the primary objective guiding continuous Linear Regression. Additionally, detail the fundamental architectural structure of Decision Trees natively distinguishing between Root, Internal, and respective Leaf Nodes. (5 Marks)*
* **How to answer:** Supply the $y=mx+b$ logic minimizing MSE for regressions. Next, visually diagram out a tree format establishing a binary structural split indicating hierarchical node functions conclusively.

**Expected Question 3 (Advanced Trade-offs):**
> *Discuss the foundational relationship tying Bias and Variance natively to Model Underfitting and Overfitting. (5 Marks)*
* **How to answer:** Directly establish Underfitting = Absolute High Bias (Assumption error). Establish Overfitting = Absolute High Variance (Noise sensitivity). Use a visual bullseye diagram or graphical bell-curve explanation to assure maximum score metrics structurally.
