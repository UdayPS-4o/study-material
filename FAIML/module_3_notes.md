# Module 3: Classification, Clustering, and Recommendation

## 1. Classification
Classification is a supervised machine learning task where the goal is to predict the categorical class labels of new instances based on past observations.

### a. Logistic Regression
*   **Concept**: Despite its name, Logistic Regression is a *classification* algorithm. It is used to estimate the probability that an instance belongs to a particular class (e.g., Spam or Not Spam).
*   **Working**: It uses the **Sigmoid function** (Logistic function) to map predicted continuous values to probabilities between 0 and 1.
    *   Formula: $P(y=1|X) = \frac{1}{1 + e^{-(\beta_0 + \beta_1X)}}$
*   **Decision Boundary**: If the calculated probability is > 0.5, it classifies the data as Class 1; otherwise, Class 0.

### b. Support Vector Machine (SVM)
*   **Concept**: SVM is a highly powerful classifier that finds the optimal **hyperplane** which best separates different classes in the feature space.
*   **Support Vectors**: The data points lying closest to the hyperplane. They are the most critical points that define the margin.
*   **Margin**: The distance between the hyperplane and the support vectors. SVM aims to physically *maximize* this margin (Maximum Margin Classifier) to increase generalization.

### c. Kernel Function and Kernel SVM
*   **Problem**: In real-world data, classes are often not linearly separable (you can't draw a simple straight line between them).
*   **Kernel Trick**: A mathematical technique used to transform data into a higher-dimensional space where it *does* become linearly separable. It does this without actually calculating the exact coordinates in the higher dimension (saving massive computational power).
*   **Common Kernels**:
    *   Polynomial Kernel
    *   RBF (Radial Basis Function) / Gaussian Kernel (most commonly used)
    *   Sigmoid Kernel

## 2. Clustering
Clustering is an *unsupervised* machine learning task where the goal is to group similar, unlabelled data points together.

### a. K-Means Clustering
*   **Concept**: Partitions the dataset into $K$ distinct, non-overlapping clusters.
*   **Working**:
    1. Initialize $K$ random centroids.
    2. Assign each data point to the nearest centroid (typically using Euclidean distance).
    3. Update the centroid positions by calculating the mathematical mean of all points assigned to that specific cluster.
    4. Repeat until centroids no longer move (convergence).

### b. K-Nearest Neighbors (KNN)
*(Note: KNN is primarily an Instance-based Supervised Learning classification algorithm, covered heavily in Module 4. However, its core nearest neighbor distance metric concept is foundational for understanding clustering limits).*

### c. Adaptive Hierarchical Clustering
*   **Concept**: Builds a literal hierarchy of clusters. It uniquely doesn't require pre-specifying the number of clusters ($K$).
*   **Agglomerative (Bottom-Up)**: Each point starts as its own cluster. At each step, the two closest clusters are merged until all points ultimately belong to one big cluster.
*   **Divisive (Top-Down)**: All points start combined in one cluster. At each step, the cluster is split into sub-clusters recursively until every point is an individual cluster.
*   **Dendrogram**: A tree-like diagram used to visualize the algorithmic merging process and clearly decide the most optimal number of clusters.

## 3. Association Rules & Recommendation Systems

### a. Content-Based Filtering
*   **Concept**: Recommends items similar to those a given discrete user has liked in the past.
*   **Working**: It builds a profile of the user based on item features. If a user likes action movies (feature tag), the system recommends other movies possessing the 'action' tag.
*   **Pros**: Doesn't require rating data from other users to function.
*   **Cons**: Limited strictly to recommending similar items (narrow scope, creates a filter bubble with no "surprise" recommendations).

### b. Collaborative Filtering (CF)
*   **Concept**: Recommends items based entirely on the preferences of *similar users*. Concept: "People who bought Item X also bought Item Y."
*   **Working**:
    *   *User-Based CF*: Finds other users with highly similar rating histories. Let's say User A and User B liked the exact same 5 movies. If User B heavily likes a new movie, it will be accurately recommended to User A.
    *   *Item-Based CF*: Finds similarities between purely items based on mass user ratings.
