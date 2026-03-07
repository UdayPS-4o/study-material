# Expected Questions & PYQ Solutions - FAIML Module 3

Here are the step-by-step solutions to the previous year questions from Module 3 (Machine Learning).

---

## Q.1(A) Compare k-means clustering and hierarchical clustering in terms of working and use cases.

**Working Mechanism:**
* **K-Means Clustering:**
  * **Approach:** It is a partition-based clustering algorithm. It requires the user to pre-define the number of clusters ($k$).
  * **Process:** It randomly initializes $k$ centroids. Then, it iteratively assigns each data point to the nearest centroid and recalculates the central position of the new clusters. It keeps updating until the centroids stop moving (convergence).
  * **Complexity:** Time complexity is generally lower, typically $O(n \cdot k \cdot I)$ where $n$ is data points, $k$ is clusters, and $I$ is iterations. It handles large datasets very efficiently.
* **Hierarchical Clustering:**
  * **Approach:** It does not require a pre-defined number of clusters. Instead, it builds a tree-like hierarchy (a dendrogram) of clusters.
  * **Process:** 
    * *Agglomerative (Bottom-Up):* Starts with each data point as its own cluster and iteratively merges the closest pairs of clusters until only one giant cluster remains. 
    * *Divisive (Top-Down):* Starts with all points in one cluster and splits them recursively.
  * **Complexity:** Time complexity is much higher, typically $O(n^3)$. It can quickly become computationally unfeasible as dataset sizes grow large.

**Use Cases:**
* **K-Means Clustering Use Cases:** Best for very large, uniform datasets where the number of underlying categories is either known or can be reliably estimated (e.g., using the Elbow Method). 
  * *Examples:* Customer segmentation in e-commerce, document clustering algorithms, inventory categorization.
* **Hierarchical Clustering Use Cases:** Ideal when the dataset is relatively small, or when visualizing the deep relationships and nested taxonomy between elements is critical. Let's you decide the number of clusters *after* observing the tree structure.
  * *Examples:* Evolutionary biology (creating taxonomic trees/cladograms), analyzing social network community structures, mapping file system hierarchies.

---

## Q.1(B) Explain the concept of the kernel trick in SVM. Why is it useful?

**The Kernel Trick Concept:**
Support Vector Machines (SVM) fundamentally work by finding a straight line (a flat hyperplane) to separate two different classes of data. But what happens if the data is tangled up in a way that simply cannot be separated by a straight flat line? (i.e., the data is *non-linearly separable*).

The **Kernel Trick** is a brilliant mathematical technique used by SVM to cleanly handle non-linear data. Instead of trying to bend a curved line around the tangled data in 2D space, the Kernel Trick mathematically projects the original data points into a vastly higher-dimensional space (e.g., pulling 2D points up into 3D space) where it *suddenly becomes possible* to slice them perfectly apart with a simple, flat 2D plane.

The "Trick" part is that it successfully calculates the dot products of the data points in that higher-dimensional space entirely without ever having to explicitly physically calculate or store coordinates for those astronomical dimensions—thus saving immense computational time and memory.

**Why it is Useful:**
1. **Solves Non-Linear Problems:** It empowers standard SVMs with the ability to confidently draw highly complex, curved, non-linear classification boundaries organically.
2. **Computational Efficiency:** Mapping data into infinite dimensions physically would crash a computer. The mathematical Kernel Trick computes relationships implicitly, completely bypassing the massive computational physics overhead.
3. **Versatility:** By simply swapping out Kernel functions (like Polynomial Kernels, Gaussian RBF Kernels, or Sigmoid Kernels), an SVM can quickly adapt to wildly different kinds of spatial data topologies.

---

# OR

---

## Q.1(A) Consider the following set of data points: P1(2,3), P2(5,4), P3(3,5), P4(8,7), P5(9,6). Perform the first iteration of the K-Means clustering algorithm with k=2, using the initial cluster centroids as C1(2,3) C2(8,7). Calculate the new cluster centroids after the first iteration.

**Goal:** Assign points to the nearest centroid, then calculate the new centroids.

Given Points: $P1(2,3)$, $P2(5,4)$, $P3(3,5)$, $P4(8,7)$, $P5(9,6)$
Initial Centroids: $C1(2,3)$, $C2(8,7)$

**(Step 1) Calculate distance from each point to both centroids:**
*(We will use the Squared Euclidean Distance formula: $D^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$ to avoid unnecessary square root decimals)*

*   **For Point P1 (2, 3):**
    *   Distance to C1: $(2-2)^2 + (3-3)^2 = 0 + 0 = \mathbf{0}$
    *   Distance to C2: $(2-8)^2 + (3-7)^2 = 36 + 16 = \mathbf{52}$
    *   *Result:* Closer to **C1**. Assign P1 to Cluster 1.
*   **For Point P2 (5, 4):**
    *   Distance to C1: $(5-2)^2 + (4-3)^2 = 9 + 1 = \mathbf{10}$
    *   Distance to C2: $(5-8)^2 + (4-7)^2 = 9 + 9 = \mathbf{18}$
    *   *Result:* Closer to **C1**. Assign P2 to Cluster 1.
*   **For Point P3 (3, 5):**
    *   Distance to C1: $(3-2)^2 + (5-3)^2 = 1 + 4 = \mathbf{5}$
    *   Distance to C2: $(3-8)^2 + (5-7)^2 = 25 + 4 = \mathbf{29}$
    *   *Result:* Closer to **C1**. Assign P3 to Cluster 1.
*   **For Point P4 (8, 7):**
    *   Distance to C1: $(8-2)^2 + (7-3)^2 = 36 + 16 = \mathbf{52}$
    *   Distance to C2: $(8-8)^2 + (7-7)^2 = 0 + 0 = \mathbf{0}$
    *   *Result:* Closer to **C2**. Assign P4 to Cluster 2.
*   **For Point P5 (9, 6):**
    *   Distance to C1: $(9-2)^2 + (6-3)^2 = 49 + 9 = \mathbf{58}$
    *   Distance to C2: $(9-8)^2 + (6-7)^2 = 1 + 1 = \mathbf{2}$
    *   *Result:* Closer to **C2**. Assign P5 to Cluster 2.

**Cluster Assignments after Iteration 1:**
*   **Cluster 1 ($K_1$) contains:** { $P1(2,3), P2(5,4), P3(3,5)$ }
*   **Cluster 2 ($K_2$) contains:** { $P4(8,7), P5(9,6)$ }

**(Step 2) Calculate New Centroids:**
The new centroid formula averages all the $X$ coordinates, and averages all the $Y$ coordinates inside the cluster.

*   **New Centroid C1 ($C1'$):**
    *   $X_{new} = \frac{2 + 5 + 3}{3} = \frac{10}{3} \approx 3.33$
    *   $Y_{new} = \frac{3 + 4 + 5}{3} = \frac{12}{3} = 4$
    *   **New C1 = (3.33, 4)**

*   **New Centroid C2 ($C2'$):**
    *   $X_{new} = \frac{8 + 9}{2} = \frac{17}{2} = 8.5$
    *   $Y_{new} = \frac{7 + 6}{2} = \frac{13}{2} = 6.5$
    *   **New C2 = (8.5, 6.5)**

**Final Answer:** After the first iteration, the newly calculated centroids are **C1(3.33, 4)** and **C2(8.5, 6.5)**.

---

## Q.1(B) How does logistic regression differ from linear regression? Explain with an example.

**The Core Differences:**

| Feature | Linear Regression | Logistic Regression |
| :--- | :--- | :--- |
| **Primary Purpose** | Used to solve **Regression** problems. | Used to solve **Classification** problems. |
| **Output Target** | Predicts an absolutely continuous, numerical value output mathematically mapping spanning infinitely across a line graph. | Predicts the definitive binary categorical probability value predicting exclusively between exactly two categorical buckets natively. |
| **Mathematical Curve** | Operates trying physically mapping drawing a purely flat straight line graph directly intersecting scattered data structurally. | Wraps equations heavily passing mathematically traversing a Sigmoid Activity Function natively, generating a structurally squeezed "S-shaped" curve mapping probabilistically bounding rigidly between 0 and 1. |
| **Loss Evaluation Metric** | Fundamentally measures success mathematically evaluating computing Mean Squared Error (MSE) structurally. | Fundamentally evaluates logical modeling accuracy exclusively evaluating computing Cross-Entropy Logarithmic Maximum Likelihood Loss structurally. |

**Explanatory Examples:**

*   **Linear Regression Example:** 
    Imagine attempting to predict exactly the precise **financial selling price of a house** strictly utilizing the raw total square footage mapped physically inside the property. Since "Price" spans an infinite numerical range of possibilities naturally ($150,000 to $2,000,000+, etc.), you map out a straight "Line of Best Fit" utilizing Linear algorithms to project the continuous integer value effectively natively.

*   **Logistic Regression Example:**
    Imagine utilizing exact identical dimensional variables (house square footage) to instead mathematically predict definitively **"Will this house sell quickly (Yes or No)?"**. The target answer mapping ceases being an infinite wide continuous numerical scale entirely and transforms exclusively into two strict categorical outcomes natively:
    1.  `(1) Yes, it will effectively sell fast.` 
    2.  `(0) No, it will sit on the active commercial market.`
    
    Logistic regression calculates the exact mathematical probability evaluating that specific probability structurally (e.g. executing calculating exactly an "85% numerical probability" this specific size house cleanly falls conclusively inside the explicit 'Yes' target category).
