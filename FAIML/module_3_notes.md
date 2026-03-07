# Module 3: Classification, Clustering, and Association Rules

This module dives deeper into specific algorithms representing standard predictive (classification) and descriptive (clustering/association) tasks.

---

## 1. Classification (Supervised Learning)

Classification tasks require the dataset to possess target labels comprising finite categorical variants (e.g., Yes/No, Spam/Genuine).

### Logistic Regression
* Despite containing "Regression" in the name, it is a formidable **classification algorithm**, predominantly used for *Binary Classification* (predicting between two classes).
* Predicts the **probability** of an occurrence belonging to the default class, outputting a value rigidly bound between 0 and 1.
* Utilizes a mathematically s-shaped curve known as the **Sigmoid Function** (or Logit function): `f(x) = 1 / (1 + e^-x)`
* Thresholding determines the categorical outcome (e.g., if pred_prob > 0.5, class=1, else class=0).

### Support Vector Machine (SVM)
* A mighty classification methodology conceptualized around finding an optimal **hyperplane** in an N-dimensional space to distinguish vastly separated classes.
* **Important Terms:**
  * **Hyperplane:** The decision boundary segregating the classes. In 2D space, it's a line; in 3D, it's a flat plane.
  * **Support Vectors:** The specific training data scattered closest to the hyperplane. They dictate the hyperplane's position.
  * **Margin:** The geometric distance between the support vectors of different classes. SVM inherently tries to *maximize this margin* for highest confidence.

### Kernel Function and Kernel SVM
* Usually, vanilla SVM demands data that is linearly separable. Real-world data is usually fiercely non-linear.
* **The Kernel Trick:** It involves applying a "Kernel Function", which computationally transforms lower-dimensional input space into a magically higher-dimensional space where a linear hyperplane can easily separate the classes.
* Common SVM Kernels:
  * *Linear Kernel* (no transformation)
  * *Polynomial Kernel*
  * *RBF (Radial Basis Function) / Gaussian Kernel* (Most broadly useful for non-linear patterns)

---

## 2. Clustering (Unsupervised Learning)

Clustering implies organizing unlabeled data arrays into meaningful localized clusters showcasing internal resemblance.

### K-Means Clustering
* Conceptually groups data into ‘K’ user-defined buckets/clusters.
* **Process Flow:**
  1. Pick `K` random points to act as initial centroids (cluster centers).
  2. Measure distances of every data point to all centroids, assigning the point to the nearest one.
  3. Recompute and adjust the centroid parameter by factoring in the mean dimensions of all its assigned data members.
  4. Repeat steps 2 & 3 continuously until centroids stall moving (convergence).
* A popular method for predicting optimum 'K' is the **Elbow Method**.

### KNN (K-Nearest Neighbors)
* *Note: The syllabus places this near clustering natively, but note that KNN acts fundamentally as a lazy, supervised algorithm.* 
* **Concept:** It embraces the principle that structurally matching items lie in direct geometric proximity.
* If making a classification prediction, it queries the `K` geometrically closest known neighbors of the new point. The most frequently occurring class label spanning those neighbors commands the final prediction (majority voting).

### Adaptive Hierarchical Clustering
* An algorithm attempting to forge a hierarchy outlining distinct clusters nested progressively. 
* Result logic is rendered nicely visually as a **Dendrogram** (tree diagram plotting similarities).
* Instead of stating precisely `K=5` prematurely, you review the Dendrogram post-process to logically chop the tree for ideal structural clusters.
* **Adaptive Aspect:** Refers to modern enhancements where cluster counts, linkage distances, and parameter restraints adapt procedurally around input distributions instead of demanding rigidly static inputs.

---

## 3. Association Rules & Recommendation Systems

A discovery logic exposing interesting relations buried between diverse variables bridging immense databases. (e.g., A patron acquiring bread likely secures butter).

### Recommendation Systems
Evolved digital machinery configured to forecast an individual's "rating" or "preference" toward distinct items, driving platforms like Netflix and Amazon.

* **Content-Based Filtering:**
  * Curates recommendations utilizing identical attributes or characteristics tied directly to items the user positively interacted with previously.
  * *Example:* If user profiles state they enjoyed three separate "Christopher Nolan" directed films, the system exclusively suggests further "Christopher Nolan" catalogues, ignoring other users' data.
  * Needs comprehensive metadata defining the items.

* **Collaborative Filtering Based Recommendation:**
  * Assembles recommendations solely around collective user behavioral agreements—leveraging "wisdom of the crowd."
  * **User-based Collaborative:** Promotes items preferred generally by other users expressing mathematically similar ratings profiles to the active user. ("Users who behave identically to you liked movie X").
  * **Item-based Collaborative:** Recommends items distinctly alike to particular items previously highly vetted by the active user, dictated entirely through global user rating matrices. ("Users who enjoy this book heavily enjoy book Y").
