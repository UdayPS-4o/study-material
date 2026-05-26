# Question 3

**i. Which one of the following models is a generative model used in machine learning?**
(A) Support vector machines (B) Naive Bayes (C) Logistic Regression (D) Linear Regression

**Answer:** (B) Naive Bayes

---

**ii. Which algorithm is best suited for a binary classification problem?**
(A) K-nearest Neighbors (B) Decision Trees (C) Random Forest (D) Linear Regression

**Answer:** (C) Random Forest 
*(Note: While A, B, and C can all be used for classification, Random Forest is generally the most robust and highly suited for binary tasks. D is for regression.)*

---

**iii. Explain the Difference Between Classification and Regression? (4 Marks)**

**Answer:**

| Feature | Classification | Regression |
| :--- | :--- | :--- |
| **Definition** | Predicts a **discrete** class label or category. | Predicts a **continuous** numerical quantity. |
| **Output Type** | Categorical / Discrete (e.g., Yes/No, Dog/Cat/Bird). | Continuous / Real value (e.g., Price, Weight, Age). |
| **Goal** | To find a decision boundary that clearly separates data into classes. | To find the best-fitting line or curve that explains the relationship between variables. |
| **Common Algorithms** | Logistic Regression, Decision Trees, SVM, Naive Bayes, KNN. | Linear Regression, Polynomial Regression, Ridge/Lasso Regression. |
| **Evaluation Metrics** | Accuracy, Precision, Recall, F1-Score, Confusion Matrix. | Mean Squared Error (MSE), Mean Absolute Error (MAE), R-squared ($R^2$). |

---

**iv. What are Support Vectors in SVM? Explain SVM Algorithm in Detail. (6 Marks)**

**Answer:**

**Support Vectors:**
In Support Vector Machines (SVM), support vectors are the specific data points that lie closest to the decision boundary (the hyperplane). They are the critical elements of the training set because they directly dictate the position and orientation of the hyperplane. If these points were removed or moved, the position of the dividing hyperplane would change.

**SVM Algorithm Explained:**
1. **Objective:** The goal of SVM is to find the optimal hyperplane in an N-dimensional space (where N is the number of features) that distinctly categorizes the data points.
2. **The Hyperplane:** For binary classification, this hyperplane acts as a line (in 2D) or a flat plane (in 3D) that separates the two classes. 
3. **Maximum Margin:** SVM doesn't just find *any* separating line; it searches for the one with the **maximum margin**. The margin is the distance between the hyperplane and the closest data points (support vectors) from either class. Maximizing this margin ensures the model is robust and generalizes well.
4. **Kernel Trick:** When data is not linearly separable in its original form, SVM uses a mathematical technique called the "Kernel Trick." It maps the data into a higher-dimensional space where a linear hyperplane can successfully separate the classes. Common kernels include Linear, Polynomial, and RBF.
5. **Prediction:** During testing, new data points are plotted, and their predicted class depends entirely on which side of the established hyperplane they fall.

---
**OR**

**Write K-Nearest Neighbor algorithm for approximation of a discrete value target and also for a real valued target function. (6 Marks)**

**Answer:**

**K-Nearest Neighbor (KNN) Algorithm:**
KNN is an instance-based, lazy learning algorithm that makes predictions based on the 'k' most similar training examples in the feature space.

**1. Algorithm for Discrete Value Target (Classification):**
* **Input:** A query instance $x_q$, training data $D$, and the number of nearest neighbors $k$.
* **Step 1:** Calculate the distance (e.g., using Euclidean distance) between $x_q$ and all instances in $D$.
* **Step 2:** Select the $k$ instances from $D$ that have the smallest distance to $x_q$. Let this set be $K$.
* **Step 3:** Perform a majority vote among the target class values of the instances in $K$.
* **Step 4:** Return the most frequent class label as the predicted output for $x_q$.

**2. Algorithm for Real-Valued Target (Regression):**
* **Input:** A query instance $x_q$, training data $D$, and the number of nearest neighbors $k$.
* **Step 1:** Calculate the distance between $x_q$ and all instances in $D$.
* **Step 2:** Select the $k$ instances from $D$ that have the smallest distance to $x_q$. Let this set be $K$.
* **Step 3:** Calculate the average (mean) of the continuous target values of the instances in $K$.
* **Step 4:** Return this mean numerical value as the predicted output for $x_q$.
*(Note: Inverse distance weighting can be applied in both cases to give closer neighbors more influence over the outcome).*
