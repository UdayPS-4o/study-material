# FAIML - K-Nearest Neighbors (KNN) & K-Means Clustering Guide

This guide breaks down exactly how to solve numerical problems for KNN and K-Means step-by-step, specifically structured to help you score full marks in your exams.

---

## 1. K-Nearest Neighbors (KNN)

**Concept:** KNN is a lazy learning algorithm that classifies a new data point based on the majority class of its 'k' closest neighbors in the training dataset.

**Key Formulas:**
*   **Euclidean Distance (Most Common):**  $$d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$
*   **Manhattan Distance:** $$d = |x_2 - x_1| + |y_2 - y_1|$$
*(Note: Always use Euclidean distance unless the exam question explicitly asks for Manhattan).*

### Exam Question Example:
Given the following dataset of points and their respective classes:
*   A(1, 2) $\rightarrow$ Class: `Positive`
*   B(2, 3) $\rightarrow$ Class: `Positive`
*   C(3, 3) $\rightarrow$ Class: `Negative`
*   D(4, 5) $\rightarrow$ Class: `Negative`

**Task:** Predict the class of a new unknown point **P(2, 2)** using KNN with **k = 3**. Use Euclidean distance.

### Step-by-Step Solution (Write it exactly like this in the exam):

**Step 1: Calculate the Euclidean distance from the new point P(2, 2) to all training points.**

*   **Distance to A(1, 2):**
    $$d(P, A) = \sqrt{(1 - 2)^2 + (2 - 2)^2} = \sqrt{(-1)^2 + 0} = \sqrt{1} = 1$$
*   **Distance to B(2, 3):**
    $$d(P, B) = \sqrt{(2 - 2)^2 + (3 - 2)^2} = \sqrt{0 + 1^2} = \sqrt{1} = 1$$
*   **Distance to C(3, 3):**
    $$d(P, C) = \sqrt{(3 - 2)^2 + (3 - 2)^2} = \sqrt{1^2 + 1^2} = \sqrt{2} \approx 1.414$$
*   **Distance to D(4, 5):**
    $$d(P, D) = \sqrt{(4 - 2)^2 + (5 - 2)^2} = \sqrt{2^2 + 3^2} = \sqrt{4 + 9} = \sqrt{13} \approx 3.605$$

**Step 2: Sort the distances in ascending order.**

1.  Point A: Distance = 1.000 (Class: `Positive`)
2.  Point B: Distance = 1.000 (Class: `Positive`)
3.  Point C: Distance = 1.414 (Class: `Negative`)
4.  Point D: Distance = 3.605 (Class: `Negative`)

**Step 3: Select the 'k' nearest neighbors.**
Given $k = 3$, we select the 3 points with the smallest distances:
*   Neighbor 1: Point A (Class: `Positive`)
*   Neighbor 2: Point B (Class: `Positive`)
*   Neighbor 3: Point C (Class: `Negative`)

**Step 4: Perform majority voting.**
*   Count of `Positive` class: 2
*   Count of `Negative` class: 1

**Final Answer:** The majority class among the 3 nearest neighbors is `Positive`. Therefore, the predicted class for point **P(2, 2)** is **Positive**.

---

## 2. K-Means Clustering

**Concept:** K-Means groups unlabelled data into 'k' distinct clusters. It works iteratively by assigning points to the nearest cluster centroid and then moving the centroids to the center of their respective clusters.

**Algorithm Steps to follow in the exam:**
1.  **Initialization:** Identify the initial 'k' centroids (usually given in the problem statement).
2.  **Assignment Step:** Calculate the distance of every data point to each centroid. Assign each point to the cluster of the closest centroid.
3.  **Update Step:** Recalculate the new centroid for each cluster by finding the mean of all points assigned to that cluster.
4.  **Iteration:** Repeat steps 2 and 3 until the centroids no longer change (convergence) or until you complete the number of iterations asked in the question.

### Exam Question Example:
Consider the following 1D data points: `{2, 4, 10, 12, 3, 20, 30, 11, 25}`
**Task:** Apply K-Means clustering to create **k = 2** clusters. Let the initial cluster centroids be **c1 = 2** and **c2 = 4**. Show the first two iterations.

### Step-by-Step Solution:

#### Iteration 1:

**Step 1.1: Distance calculation and cluster assignment.**
*Centroids: $c1 = 2$, $c2 = 4$*

*(Tip: Always draw a table in the exam for K-means. It minimizes calculation errors and is easy to grade.)*

| Data Point | Distance to c1 (2) : $|x - 2|$ | Distance to c2 (4) : $|x - 4|$ | Closest Cluster |
| :---: | :---: | :---: | :---: |
| **2** | $|2-2| = \mathbf{0}$ | $|2-4| = 2$ | **C1** |
| **4** | $|4-2| = 2$ | $|4-4| = \mathbf{0}$ | **C2** |
| **10** | $|10-2| = 8$ | $|10-4| = \mathbf{6}$ | **C2** |
| **12** | $|12-2| = 10$ | $|12-4| = \mathbf{8}$ | **C2** |
| **3** | $|3-2| = \mathbf{1}$ | $|3-4| = \mathbf{1}$ | **C1** *(Tie: arbitrarily chose C1)* |
| **20** | $|20-2| = 18$ | $|20-4| = \mathbf{16}$ | **C2** |
| **30** | $|30-2| = 28$ | $|30-4| = \mathbf{26}$ | **C2** |
| **11** | $|11-2| = 9$ | $|11-4| = \mathbf{7}$ | **C2** |
| **25** | $|25-2| = 23$ | $|25-4| = \mathbf{21}$ | **C2** |

*Current Clusters:*
*   Cluster 1 (C1): `{2, 3}`
*   Cluster 2 (C2): `{4, 10, 12, 20, 30, 11, 25}`

**Step 1.2: Update Centroids.**
*   **New c1** = Mean of C1 = $\frac{2 + 3}{2} = \frac{5}{2} = \mathbf{2.5}$
*   **New c2** = Mean of C2 = $\frac{4 + 10 + 12 + 20 + 30 + 11 + 25}{7} = \frac{112}{7} = \mathbf{16}$

---

#### Iteration 2:

**Step 2.1: Distance calculation and cluster assignment.**
*Centroids: $c1 = 2.5$, $c2 = 16$*

| Data Point | Distance to c1 (2.5) : $|x - 2.5|$ | Distance to c2 (16) : $|x - 16|$ | Closest Cluster |
| :---: | :---: | :---: | :---: |
| **2** | $|2-2.5| = \mathbf{0.5}$ | $|2-16| = 14$ | **C1** |
| **4** | $|4-2.5| = \mathbf{1.5}$ | $|4-16| = 12$ | **C1** |
| **10** | $|10-2.5| = 7.5$ | $|10-16| = \mathbf{6}$ | **C2** |
| **12** | $|12-2.5| = 9.5$ | $|12-16| = \mathbf{4}$ | **C2** |
| **3** | $|3-2.5| = \mathbf{0.5}$ | $|3-16| = 13$ | **C1** |
| **20** | $|20-2.5| = 17.5$ | $|20-16| = \mathbf{4}$ | **C2** |
| **30** | $|30-2.5| = 27.5$ | $|30-16| = \mathbf{14}$ | **C2** |
| **11** | $|11-2.5| = 8.5$ | $|11-16| = \mathbf{5}$ | **C2** |
| **25** | $|25-2.5| = 22.5$ | $|25-16| = \mathbf{9}$ | **C2** |

*Current Clusters:*
*   Cluster 1 (C1): `{2, 4, 3}`
*   Cluster 2 (C2): `{10, 12, 20, 30, 11, 25}`

**Step 2.2: Update Centroids.**
*   **New c1** = Mean of C1 = $\frac{2 + 4 + 3}{3} = \frac{9}{3} = \mathbf{3}$
*   **New c2** = Mean of C2 = $\frac{10 + 12 + 20 + 30 + 11 + 25}{6} = \frac{108}{6} = \mathbf{18}$

*(You would stop here if the question only asks for two iterations. If it asks to run until convergence, you would perform Iteration 3 using centroids 3 and 18 until the clusters stop changing).*

---
### 💡 Exam Tips for these topics:
1.  **State Formulas Explicitly:** Always write the distance formula before calculating. It guarantees partial marks even if you make a calculation error.
2.  **Highlight Final Answers:** Draw a box around your final predicted class or final cluster arrays so the evaluator can spot them instantly.
3.  **Tie-Breakers:** In K-Means, if a point is equally far from two centroids, explicitly state: *"Point X is equidistant from C1 and C2. Assigned to C1 arbitrarily."* This shows you know what you are doing.
