# Module 3 — Detailed Exam Notes: Classification, Clustering & Recommendation

> **Purpose:** Comprehensive notes for writing full, high-scoring exam answers. Each section covers definitions, working mechanisms, algorithms, comparisons, and examples.

---

## Topic 1: Classification

**Definition:** Classification is a **supervised machine learning** task where the goal is to predict the **discrete categorical class label** of new instances based on patterns learned from previously labeled training data.

**Examples:**
- Is this email *Spam* or *Not Spam*? (Binary)
- Is this tumor *Benign* or *Malignant*? (Binary)
- What *digit* (0–9) is in this image? (Multi-class)
- Which *sentiment* (Positive/Neutral/Negative) does this tweet convey? (Multi-class)

---

### 1.1 Logistic Regression

#### Definition
Despite its name, **Logistic Regression is a classification algorithm** — not a regression algorithm. It is used to predict the **probability** that an input belongs to a particular class, and then assigns a class label based on a threshold.

#### Key Concept — The Problem with Linear Regression for Classification:
Linear regression predicts values from −∞ to +∞, but probabilities must be between 0 and 1. To fix this, logistic regression uses the **Sigmoid (Logistic) function**.

#### The Sigmoid Function:
```
σ(z) = 1 / (1 + e^(-z))
```
- Always outputs values between **0 and 1**.
- At z=0: output = 0.5
- As z → ∞: output → 1
- As z → −∞: output → 0

#### The Logistic Regression Model:
```
P(y=1 | X) = 1 / (1 + e^(-(β₀ + β₁X₁ + β₂X₂ + ... + βₙXₙ)))
```
- `P(y=1|X)` = probability of the positive class
- `β₀` = bias/intercept
- `β₁...βₙ` = feature weights

#### Decision Boundary:
- If `P ≥ 0.5` → Classify as **Class 1** (Positive)
- If `P < 0.5` → Classify as **Class 0** (Negative)
- The decision boundary is the line/region where P = 0.5 exactly.

#### Training — Cost Function:
Logistic Regression uses **Log Loss (Binary Cross-Entropy)** as its cost function:
```
Loss = -[y × log(ŷ) + (1-y) × log(1-ŷ)]
```
Optimized using **Gradient Descent**.

#### Advantages:
- Simple, fast, and interpretable.
- Provides probability estimates, not just class labels.
- Works well for linearly separable problems.
- Can be extended to multi-class (Softmax Regression).

#### Disadvantages:
- Assumes a linear decision boundary — performs poorly on non-linear problems.
- Sensitive to outliers.
- Requires feature scaling for best performance.

---

### 1.2 Support Vector Machine (SVM)

#### Definition
**SVM** is a powerful supervised learning algorithm that finds the **optimal hyperplane** which best separates classes in the feature space. It focuses on the data points nearest to the boundary — called **support vectors**.

#### Key Concepts:

**Hyperplane:**
- A decision boundary that separates classes.
- In 2D: a line; in 3D: a plane; in n-D: a hyperplane.
- Equation: `w·x + b = 0`

**Support Vectors:**
- The **nearest data points** from each class to the hyperplane.
- Only these points define and constrain the hyperplane position.
- Removing non-support-vector points does NOT change the boundary.

**Margin:**
- The perpendicular distance between the hyperplane and the nearest support vectors from each class.
- SVM maximizes this margin → **Maximum Margin Classifier**.
- Larger margin → better generalization → less overfitting.

```
Class A: ++++++
              |  ← Margin
    ─────────── ← Hyperplane (Decision Boundary)
              |  ← Margin
Class B: ------
```

#### Hard Margin vs. Soft Margin SVM:
| | Hard Margin | Soft Margin |
|---|---|---|
| Tolerance | Zero — all points must be correctly classified | Allows some misclassification (controlled by C parameter) |
| Works for | Perfectly linearly separable data | Real-world noisy data |
| C parameter | N/A | High C → less tolerance (risk overfitting); Low C → more tolerance |

#### Advantages:
- Effective in high-dimensional spaces.
- Works well even when no. of features > no. of samples.
- Memory efficient — only support vectors are stored.
- Kernel trick makes it powerful for non-linear data.

#### Disadvantages:
- Slow on very large datasets.
- sensitive to feature scaling.
- Doesn't directly provide probability estimates.
- Choosing the right kernel and C value requires tuning.

---

### 1.3 Kernel Function and Kernel SVM

#### The Problem — Non-Linearly Separable Data:
In real-world scenarios, data is often **not linearly separable** — you cannot draw a straight line to separate classes.

**Example:** XOR problem — cannot be separated by any straight line.

#### The Kernel Trick:
The **Kernel Trick** is a mathematical technique that transforms data into a **higher-dimensional space** where it becomes **linearly separable**, without actually computing the expensive transformation explicitly.

**Intuition:** If you can't separate data with a line in 2D, try separating it with a plane in 3D.

```
2D: Circle of one class surrounded by another → Not separable
3D: Lift the inner class up → Now they can be separated by a horizontal plane
```

**Key Property:** The kernel function computes the **dot product in high-dimensional space** directly from the original space, avoiding the computation of actual coordinates:
```
K(x₁, x₂) = φ(x₁) · φ(x₂)   [without computing φ explicitly]
```

#### Common Kernel Functions:

| Kernel | Formula | Use Case |
|---|---|---|
| **Linear** | `K(x,z) = x·z` | Linearly separable data |
| **Polynomial** | `K(x,z) = (x·z + c)^d` | Curved decision boundaries |
| **RBF / Gaussian** | `K(x,z) = exp(-γ||x-z||²)` | Most commonly used; non-linear data |
| **Sigmoid** | `K(x,z) = tanh(αx·z + c)` | Similar to neural networks |

#### RBF (Radial Basis Function) Kernel:
- Most widely used kernel in practice.
- **γ (gamma):** Controls influence range of each training point.
  - High γ → narrow influence → complex boundary (overfitting risk).
  - Low γ → wide influence → smoother boundary (underfitting risk).

---

## Topic 2: Clustering

**Definition:** Clustering is an **unsupervised machine learning** task where the goal is to **group similar, unlabeled data points together** into clusters, such that:
- Points **within** a cluster are as similar as possible (intra-cluster similarity is high).
- Points **across** different clusters are as different as possible (inter-cluster similarity is low).

**Applications:**
- Customer segmentation for personalized marketing.
- Document topic grouping.
- Anomaly detection (outliers that don't fit any cluster).
- Image compression and segmentation.
- Gene expression analysis (bioinformatics).

---

### 2.1 K-Means Clustering

#### Definition
K-Means is a **partitioning clustering algorithm** that divides a dataset into **K non-overlapping clusters**, where each data point belongs to the cluster with the **nearest centroid**.

#### Algorithm — Step by Step:

**Step 1 — Initialization:**
- Choose K (number of clusters) — user-specified.
- Randomly initialize K centroids (cluster centers).

**Step 2 — Assignment:**
- Calculate the **Euclidean distance** from each data point to all K centroids.
- Assign each point to the **nearest centroid's cluster**.
```
Distance = √[(x₁-c₁)² + (x₂-c₂)² + ... + (xₙ-cₙ)²]
```

**Step 3 — Update Centroids:**
- For each cluster, recalculate the **centroid** as the **mean** of all points in that cluster.
```
New centroid = (1/|Cluster|) × Σ(all points in cluster)
```

**Step 4 — Repeat:**
- Repeat Steps 2 and 3 until:
  - Centroids no longer move (convergence), OR
  - Maximum number of iterations reached.

**Convergence Criterion (WCSS — Within-Cluster Sum of Squares):**
```
WCSS = Σ Σ ||xᵢ - μₖ||²   (sum of squared distances within each cluster)
```
K-Means minimizes WCSS.

#### Choosing K — The Elbow Method:
- Run K-Means for K = 1, 2, 3, ... and plot WCSS vs. K.
- The optimal K is at the "elbow" point — where WCSS stops decreasing sharply.

#### Advantages:
- Simple and computationally efficient.
- Scales well to large datasets.
- Easily interpretable results.

#### Disadvantages:
- Must pre-specify K (number of clusters).
- Sensitive to initial centroid placement (may get local optima).
- Assumes clusters are **spherical and of equal size** — fails on irregular shapes.
- Sensitive to **outliers** — extreme points can skew centroids.
- Fails for non-convex cluster shapes (use DBSCAN instead).

---

### 2.2 K-Nearest Neighbors (KNN) — Context in Clustering

**Note:** KNN is primarily a **supervised classification/regression algorithm** (covered in Module 4), but its core concept of **distance-based similarity** is foundational to clustering. The idea that "similar points are close together in feature space" underlies both KNN and clustering algorithms.

For clustering context, KNN distance metrics include:
- **Euclidean Distance** (most used)
- **Manhattan Distance:** Σ|xᵢ - yᵢ|
- **Minkowski Distance:** generalization of the above

---

### 2.3 Adaptive Hierarchical Clustering

#### Definition
**Hierarchical Clustering** builds a **hierarchy (tree) of clusters** without requiring the number of clusters K to be specified in advance. It produces a **dendrogram** — a tree-like diagram showing all merge/split decisions.

#### Two Approaches:

**1. Agglomerative (Bottom-Up) — Most Common:**
- Start: Every data point is its own cluster (N clusters for N points).
- At each step: Merge the **two closest clusters** into one.
- End: All points belong to a single cluster.
- Produces clusters from fine-grained to coarse-grained.

**2. Divisive (Top-Down):**
- Start: All data points are in one single cluster.
- At each step: Split a cluster into two sub-clusters.
- End: Every point is its own cluster.
- Computationally expensive — less commonly used.

#### Linkage Criteria (How to measure distance between clusters):
| Linkage | Definition | Sensitivity |
|---|---|---|
| **Single Linkage** | Distance between closest points of two clusters | Sensitive to outliers ("chaining effect") |
| **Complete Linkage** | Distance between farthest points of two clusters | Creates compact clusters |
| **Average Linkage** | Average distance between all pairs | Balanced — commonly used |
| **Ward's Linkage** | Minimizes increase in total WCSS after merge | Most commonly used — creates equal-sized clusters |

#### Dendrogram:
- A tree diagram where:
  - **Leaves** are individual data points.
  - **Height of merge** represents the distance at which clusters were merged.
  - **Horizontal cut** at any height gives a specific number of clusters.
- The **optimal cut** is usually where there is the largest vertical gap between merges.

#### Advantages:
- Does **not** require specifying K in advance.
- Produces a rich, interpretable hierarchy.
- Works for any distance metric.
- Can reveal nested cluster structures.

#### Disadvantages:
- **O(n² log n)** time complexity — slow for large datasets.
- High memory usage.
- No way to "undo" a bad merge (in agglomerative approach).
- Sensitive to noise and outliers.

---

## Topic 3: Association Rules & Recommendation Systems

### Association Rules Overview

**Definition:** Association Rule Learning is an **unsupervised** technique to discover **co-occurrence relationships** (associations) among variables in large datasets.

**Classic Use Case — Market Basket Analysis:**
- "Customers who buy bread and butter also tend to buy milk."
- Used to optimize product placement, promotion bundling, and inventory.

**Key Metrics:**
- **Support:** How often does the itemset appear in all transactions?
  ```
  Support(A→B) = Transactions containing both A and B / Total Transactions
  ```
- **Confidence:** How often is the rule correct?
  ```
  Confidence(A→B) = Transactions containing both A and B / Transactions containing A
  ```
- **Lift:** Measures the strength of a rule over random co-occurrence.
  ```
  Lift(A→B) = Confidence(A→B) / Support(B)
  ```
  - Lift > 1: Positive association (A and B co-occur more than by chance)
  - Lift = 1: No association
  - Lift < 1: Negative association

**Apriori Algorithm:** The classic algorithm to mine association rules — generates frequent itemsets by pruning itemsets below minimum support threshold.

---

### Recommendation Systems

**Definition:** Recommendation Systems are AI systems that suggest relevant items (products, movies, music, content) to users based on various data sources.

---

### 3.1 Content-Based Filtering

#### Definition
**Content-Based Filtering** recommends items that are **similar to items the user has liked in the past**, based on item features (content attributes).

#### How It Works:
1. **Build Item Profile:** Represent each item by its features.
   - Movie: genre, cast, director, year.
   - Article: keywords, topics, author.
2. **Build User Profile:** Aggregate features of items the user has positively interacted with.
3. **Recommend:** Find items whose feature vector is most similar to the user's profile.
   - Similarity measured using **Cosine Similarity** or **Euclidean Distance**.

```
Cosine Similarity = (A · B) / (||A|| × ||B||)
```

#### Worked Example:
- User A watched and liked: *Iron Man*, *Avengers*, *Thor* (all: genre=Action, franchise=Marvel).
- System builds profile: {Action: high, Marvel: high}.
- System recommends: *Captain America*, *Black Panther* (also Action + Marvel).

#### Advantages:
- No "cold start" problem for items — can recommend from day 1 with item metadata.
- No need for other users' data — preserves privacy.
- Can recommend **niche items** that few users have rated.
- Transparent — easy to explain why a recommendation was made.

#### Disadvantages:
- **Filter Bubble:** Only recommends similar content — user never discovers new genres.
- Requires well-structured item metadata.
- Struggles with new users who have no interaction history ("user cold start").
- Limited by the feature representation quality.

---

### 3.2 Collaborative Filtering (CF)

#### Definition
**Collaborative Filtering** recommends items based on the **preferences and behaviors of similar users** (or similar items), operating on the principle: *"people who agreed in the past will agree in the future."*

**Key Insight:** Doesn't need item content features — only uses the interaction matrix (user × item ratings).

#### Two Types of Collaborative Filtering:

**1. User-Based Collaborative Filtering:**
- Find users who have **similar rating/interaction histories** to the target user.
- Recommend items that these similar users liked but the target user hasn't seen yet.

**Algorithm:**
1. Build a user-item rating matrix.
2. Compute **similarity** between users (Pearson correlation or Cosine similarity).
3. Find K most similar users.
4. Recommend items highly rated by similar users that the target user hasn't rated.

**Example:**
- User A and User B both rated movies 1, 2, 3 very similarly.
- User B also liked movie 4, but User A hasn't seen it.
- System recommends movie 4 to User A.

**2. Item-Based Collaborative Filtering:**
- Find items that are **rated similarly** by many users.
- If a user liked item X, recommend items most similar to X based on collective ratings.

**Example:**
- Many users who bought "The Great Gatsby" also bought "To Kill a Mockingbird".
- System recommends "To Kill a Mockingbird" to users who just bought "The Great Gatsby".

#### Matrix Factorization (Advanced CF):
- Decomposes the user-item matrix into two lower-rank matrices (latent factors).
- Captures hidden patterns (e.g., a user's taste profile).
- Used by Netflix, Spotify.

#### Advantages:
- Discovers unexpected, diverse recommendations (no filter bubble).
- Works without item metadata — only needs ratings.
- Can surface hidden interests of users.

#### Disadvantages:
- **Cold Start Problem:** Fails for new users (no ratings history) and new items (no ratings yet).
- **Sparsity:** Most users rate very few items — the rating matrix is mostly empty.
- **Scalability:** Computing similarity for millions of users is expensive.
- **Popularity Bias:** Tends to recommend popular items over niche ones.

### Comparison: Content-Based vs. Collaborative Filtering:
| Feature | Content-Based | Collaborative Filtering |
|---|---|---|
| Data used | Item features | User interaction history |
| New User problem | ✓ Can recommend (needs only item data) | ✗ Cold start — no history |
| New Item problem | ✗ Needs features | ✗ Cold start — no ratings |
| Diversity | ✗ Limited — filter bubble | ✓ Serendipitous discovery |
| Privacy | ✓ No other user data needed | ✗ Relies on community data |
| Scalability | ✓ Scales well | ✗ Computationally intensive |

**Hybrid Systems:** Most modern recommenders (Netflix, Amazon) combine BOTH to leverage the strengths of each approach.

---

## Exam Tips for Module 3 🎯

1. **For Logistic Regression:** Write the Sigmoid function formula and explain the decision boundary (P ≥ 0.5 → Class 1). State clearly: "it is a classification, not regression, algorithm."
2. **For SVM:** Always mention: hyperplane, support vectors, margin, and "maximize the margin." Draw the margin diagram.
3. **For Kernel SVM:** Use the "can't separate in 2D, transform to 3D" analogy. List at least 3 kernels.
4. **For K-Means:** Write all 4 steps clearly and mention WCSS as the optimization criterion.
5. **For Hierarchical Clustering:** Draw a small dendrogram. Mention both Agglomerative and Divisive approaches.
6. **For Recommendation Systems:** Use concrete platform examples (Netflix, Amazon, Spotify). Compare Content-Based vs. CF in a table.
7. **Keywords to use:** "feature space", "decision boundary", "kernel trick", "centroid", "dendrogram", "support vectors", "margin", "cold start problem", "collaborative filtering", "cosine similarity".
