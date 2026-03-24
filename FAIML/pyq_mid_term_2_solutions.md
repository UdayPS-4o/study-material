# FAIML Mid Term Test II - Detailed Solutions

## QUESTION 1 (A): Compare k-means clustering and hierarchical clustering in terms of working and use cases. (5 Marks)

**K-Means Clustering vs. Hierarchical Clustering:**

| Feature | K-Means Clustering | Hierarchical Clustering |
| :--- | :--- | :--- |
| **Working Mechanism** | Partitions data into exactly $K$ non-overlapping clusters. It initializes $K$ centroids, assigns points to the nearest centroid, and recalculates centroids iteratively until convergence. | Builds a nested hierarchy of clusters. In an agglomerative approach, every point starts as its own cluster, and the closest pairs are merged step-by-step until one large cluster remains. |
| **Number of Clusters ($K$)** | You must specify the number of clusters ($K$) *before* running the algorithm. | You do not need to specify $K$ initially. The optimal number of clusters is chosen later by analyzing a dendrogram. |
| **Speed & Scalability** | Very fast and highly scalable (Time complexity is generally $O(N)$). Suitable for massive datasets. | Very slow and computationally expensive (Time complexity is $O(N^3)$ or $O(N^2 \log N)$). Unsuitable for large datasets. |
| **Use Cases** | Customer segmentation for marketing, document clustering, image compression (color quantization). | Genetic taxonomy (creating evolutionary trees), small biological data sets where a strict relational hierarchy is needed. |

---

## QUESTION 1 (B): Explain the concept of the kernel trick in SVM. Why is it useful? (5 Marks)

**The Kernel Trick in Support Vector Machines (SVM):**
*   **The Problem**: A standard Support Vector Machine is an excellent linear classifier. However, in the real world, most data is **non-linearly separable**. This means you cannot draw a single straight flat hyperplane to perfectly separate the classes.
*   **The Concept**: The kernel trick solves this by implicitly mapping the original lower-dimensional data into a higher-dimensional space where a linear hyperplane can be easily drawn to separate the classes. 
*   **The "Trick"**: The mathematical "trick" is replacing the dot product of two vectors in the original space with a **Kernel Function** (like RBF, Polynomial, or Sigmoid). This function calculates the expected relationships of the points in the higher dimension *without ever explicitly computing or storing the coordinates* of the data in that higher dimension.
*   **Why it is useful**:
    1.  **Solves Complex Non-linear Problems**: It allows SVMs to draw highly complex boundaries (like circles or curves) in the original 2D space.
    2.  **Computational Efficiency**: Calculating actual higher dimensions is incredibly computationally expensive. The kernel trick bypasses this heavy math, allowing the model to run fast on standard computers while achieving higher dimensional accuracy.

---
### OR

## QUESTION 1 (A): Perform the first iteration of the K-Means clustering algorithm... (5 Marks)

**Given:**
*   Data Points: $P1(2,3), P2(5,4), P3(3,5), P4(8,7), P5(9,6)$
*   Initial Centroids: $C1(2,3)$ and $C2(8,7)$

**Step 1: Calculate Distance of each point to C1 and C2**
*We use Euclidean distance: $\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$, but squared distance $D^2$ is sufficient for comparison.*

*   **For P1(2,3):**
    *   Distance to $C1(2,3)$: $(2-2)^2 + (3-3)^2 = 0+0 = 0$
    *   Distance to $C2(8,7)$: $(2-8)^2 + (3-7)^2 = 36+16 = 52$
    *   *Result: P1 is assigned to Cluster 1*

*   **For P2(5,4):**
    *   Distance to $C1(2,3)$: $(5-2)^2 + (4-3)^2 = 9+1 = 10$
    *   Distance to $C2(8,7)$: $(5-8)^2 + (4-7)^2 = 9+9 = 18$
    *   *Result: P2 is assigned to Cluster 1*

*   **For P3(3,5):**
    *   Distance to $C1(2,3)$: $(3-2)^2 + (5-3)^2 = 1+4 = 5$
    *   Distance to $C2(8,7)$: $(3-8)^2 + (5-7)^2 = 25+4 = 29$
    *   *Result: P3 is assigned to Cluster 1*

*   **For P4(8,7):**
    *   Distance to $C1(2,3)$: $(8-2)^2 + (7-3)^2 = 36+16 = 52$
    *   Distance to $C2(8,7)$: $(8-8)^2 + (7-7)^2 = 0+0 = 0$
    *   *Result: P4 is assigned to Cluster 2*

*   **For P5(9,6):**
    *   Distance to $C1(2,3)$: $(9-2)^2 + (6-3)^2 = 49+9 = 58$
    *   Distance to $C2(8,7)$: $(9-8)^2 + (6-7)^2 = 1+1 = 2$
    *   *Result: P5 is assigned to Cluster 2*

**Step 2: Assign Clusters**
*   Cluster 1 contains: $\{P1, P2, P3\}$
*   Cluster 2 contains: $\{P4, P5\}$

**Step 3: Calculate New Centroids**
The new centroid is the mean $(X_{mean}, Y_{mean})$ of the points in the cluster.
*   **New C1**:
    *   X: $(2+5+3) / 3 = 10 / 3 = 3.33$
    *   Y: $(3+4+5) / 3 = 12 / 3 = 4.0$
    *   **New C1 = (3.33, 4.0)**
*   **New C2**:
    *   X: $(8+9) / 2 = 17 / 2 = 8.5$
    *   Y: $(7+6) / 2 = 13 / 2 = 6.5$
    *   **New C2 = (8.5, 6.5)**

**Final Answer:** After the first iteration, the new centroids are **C1(3.33, 4.0)** and **C2(8.5, 6.5)**.

---

## QUESTION 1 (B): How does logistic regression differ from linear regression? Explain with an example. (5 Marks)

| Feature | Linear Regression | Logistic Regression |
| :--- | :--- | :--- |
| **Purpose/Task** | Solves **Regression** problems. | Solves **Classification** problems. |
| **Output Type** | Predicts a **continuous** numeric value. | Predicts the **probability** of a categorical value (discrete classes like 0 or 1). |
| **Function Used** | Uses the straight-line equation: $Y = mX + C$ | Uses the S-shaped **Sigmoid function**: $P(Y) = \frac{1}{1+e^{-(mX+c)}}$ |
| **Decision Boundary**| No decision boundary. | Uses a threshold (usually 0.5) to decide the final class. |

**Example Explanation:**
1.  **Linear Regression Example**: Predicting the **salary of an employee** based on their years of experience. The output can be any continuous number (e.g., $50,540, $75,200). If you plot this, you get a straight continuous line.
2.  **Logistic Regression Example**: Predicting **whether an employee will leave the company (Attrition = 1) or stay (Attrition = 0)** based on their salary. The outcome is binary. Logistic regression calculates the probability. If probability > 50%, the model categorizes them as leaving.

---

## QUESTION 2 (A): What is ensemble learning? Explain its types. (5 Marks)

**Ensemble Learning:**
Ensemble learning is a machine learning technique where multiple independent algorithms (often called base learners or weak learners) are trained to solve the exact same problem. Their individual predictions are combined to formulate a final single prediction, yielding higher accuracy and reduced overfitting compared to a single model.

**Major Types of Ensemble Learning:**
1.  **Bagging (Bootstrap Aggregating)**:
    *   Multiple base models (mostly Decision Trees) are trained independently and in parallel on different random subsets of the training data.
    *   The final prediction happens via a majority vote (for classification) or an average (for regression).
    *   *Example*: **Random Forest** (an ensemble of many decision trees).
2.  **Boosting**:
    *   Base models are trained sequentially. It focuses heavily on errors. Model #2 pays maximum attention to the data points that Model #1 predicted *incorrectly*.
    *   It literally "boosts" weak learners into strong learners sequentially.
    *   *Examples*: AdaBoost, Gradient Boosting, XGBoost.
3.  **Stacking (Stacked Generalization)**:
    *   Trains several completely different types of models (e.g., an SVM, a KNN, and a Neural Network).
    *   It then utilizes a final "Meta-Model" algorithm that learns the optimal way to blend the predictions of those base models to output the ultimate answer.

---

## QUESTION 2 (B): Explain the role of machine learning in speech recognition. (5 Marks)

**Machine Learning in Speech Recognition:**
Automated Speech Recognition (ASR) is the technology enabling computers to process audio sounds into readable text. Machine Learning serves as the core mapping engine for this.

**Key Roles and Mechanisms:**
1.  **Acoustic Modeling**: ML algorithms (especially Deep Neural Networks and Hidden Markov Models) are used to map acoustic sound waves (spectrograms) directly to phonetic units of speech (letters or short sounds).
2.  **Language Modeling**: ML models (like NLP sequence models) provide context. If a user says "I need to write", the model statistically uses context words ("need", "to") to ensure it prints "write" and completely ignores the homophone "right".
3.  **Speaker Adaptation**: Models can dynamically adapt to an individual user's regional accent or unique linguistic quirks by continually actively training on their voice profile history (e.g., Siri learning a specific user's voice).
4.  **Noise Reduction & Filtering**: Convolutional Neural Networks (CNNs) are employed to automatically recognize background ambient noise distributions and aggressively strip them away, isolating pure human vocal ranges.

---
### OR

## QUESTION 2 (A): Classify the new point P(5,5) using the K-Nearest Neighbors (KNN)... (5 Marks)

**Dataset Provided:**
Point P1(2, 4): Class A
Point P2(4, 6): Class A
Point P3(4, 2): Class B
Point P4(6, 4): Class B

**Target Point:** Target $P(5, 5)$,  $K = 3$.

**Step 1: Calculate Euclidean Distance from target $P(5,5)$ to all points.**
*Formula: $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$*

*   **Dist to P1(2,4)**:
    $d = \sqrt{(5-2)^2 + (5-4)^2} = \sqrt{3^2 + 1^2} = \sqrt{9+1} = \mathbf{\sqrt{10} \approx 3.16}$

*   **Dist to P2(4,6)**:
    $d = \sqrt{(5-4)^2 + (5-6)^2} = \sqrt{1^2 + (-1)^2} = \sqrt{1+1} = \mathbf{\sqrt{2} \approx 1.41}$

*   **Dist to P3(4,2)**:
    $d = \sqrt{(5-4)^2 + (5-2)^2} = \sqrt{1^2 + 3^2} = \sqrt{1+9} = \mathbf{\sqrt{10} \approx 3.16}$

*   **Dist to P4(6,4)**:
    $d = \sqrt{(5-6)^2 + (5-4)^2} = \sqrt{(-1)^2 + 1^2} = \sqrt{1+1} = \mathbf{\sqrt{2} \approx 1.41}$

**Step 2: Identify the K=3 Nearest Neighbors**
Ranking shortest distances:
1.  $P2$ (Distance = $1.41$) -> **Class A**
2.  $P4$ (Distance = $1.41$) -> **Class B**
3.  $P1$ (Distance = $3.16$) -> **Class A**
    *(P3 also has 3.16, meaning a tie for the 3rd spot. Choosing either P1 or P3 yields the same result because P2 and P4 are already split 1:1. We pick P1 here).*

**Step 3: Majority Vote**
Looking at the classes of the 3 nearest neighbors ($P2$, $P4$, $P1$):
*   Class A: $2$ votes ($P2, P1$)
*   Class B: $1$ vote ($P4$)

**Final Answer:** Because Class A holds the majority of votes among the $K=3$ nearest neighbors, the targeted new point **P(5,5) belongs to Class A**.
