# Question 2

**i. Which of the following are valid Machine Learning algorithms?**
(A) Linear Regression (B) K Means Clustering (C) Naive Bayes (D) All of the mentioned

**Answer:** (D) All of the mentioned

---

**ii. How is a decision reached upon by a decision tree?**
(A) No Test (B) Single Test (C) Double Test (D) Multiple sequences of Tests

**Answer:** (D) Multiple sequences of Tests

---

**iii. How do you choose the right type of machine learning for a specific problem? (4 Marks)**

**Answer:**
Choosing the right ML algorithm depends on several key factors:

1. **Nature of the Data:** 
   * **Labeled Data:** Use **Supervised Learning** (e.g., Classification, Regression).
   * **Unlabeled Data:** Use **Unsupervised Learning** (e.g., Clustering, Association).
2. **Goal of the Problem:**
   * Predicting a continuous value (e.g., house price) $\rightarrow$ **Regression**.
   * Categorizing into classes (e.g., spam or not spam) $\rightarrow$ **Classification**.
   * Finding hidden structures or groups $\rightarrow$ **Clustering**.
3. **Data Size and Dimensionality:** Deep learning algorithms work exceptionally well for massive datasets, while simpler models (like SVM or Naive Bayes) are often better suited for smaller datasets or text.
4. **Interpretability Requirements:** If it is crucial to explain the model's logic to stakeholders, simple models like **Decision Trees** or **Linear Regression** are preferred over complex "black box" Neural Networks.

---

**iv. Summarize the appropriate problems for Decision Tree Learning method and also bring out the issues in decision tree learning. (6 Marks)**

**Answer:**

**Appropriate Problems for Decision Trees:**
1. **Attribute-Value Data:** Best suited for tabular data where instances are described by a fixed set of attributes and their values.
2. **Discrete Target Functions:** Excellent for classification problems assigning data to distinct categories (e.g., Yes/No, High/Medium/Low).
3. **Disjunctive Descriptions:** Problems where multiple different conditions can lead to the same outcome.
4. **Handling Imperfect Data:** They are highly robust to datasets containing errors, outliers, or missing attribute values.

**Issues in Decision Tree Learning:**
1. **Overfitting:** Trees can easily become overly complex, memorizing the training data perfectly but failing to generalize to new, unseen data.
2. **Continuous Variables:** While they can handle them, processing continuous target variables (regression) is less natural than classification.
3. **Instability:** A very small change in the training data can lead to a completely different tree structure being generated.
4. **Greedy Nature:** The learning algorithm makes locally optimal decisions at each node, which does not guarantee a globally optimal tree.

---
**OR**

**What are the differences between overfitting and underfitting? (6 Marks)**

**Answer:**

| Feature | Overfitting | Underfitting |
| :--- | :--- | :--- |
| **Definition** | Model learns both the underlying pattern and the random noise in the training data. | Model is too simple and fails to capture the underlying pattern in the training data. |
| **Performance** | High accuracy on training data, but **poor accuracy** on new/test data. | **Poor accuracy** on both training data and test data. |
| **Model Complexity** | Model is **too complex** (e.g., deep decision tree, too many features). | Model is **too simple** (e.g., using a linear model for highly non-linear data). |
| **Variance / Bias** | **High Variance**, Low Bias. | **High Bias**, Low Variance. |
| **How to Fix** | Cross-validation, Regularization (L1/L2), Pruning, gathering more training data. | Use a more complex model architecture, add more meaningful features, train longer. |
