# Module 2: Machine Learning Fundamentals

This module covers the core concepts, techniques, and evaluation methods of Machine Learning.

## 1. Introduction to Machine Learning
* **Definition:** Machine learning is a subset of Artificial Intelligence (AI) that empowers systems with the ability to automatically learn and improve from experience without being explicitly programmed.
* **Traditional Programming vs. Machine Learning:** 
  * *Traditional:* Uses predefined Rules + Data to produce Answers.
  * *Machine Learning:* Uses Answers + Data to learn the underlying Rules (the model).

## 2. Stages of Machine Learning
A typical ML project lifecycle involves the following stages:
1. **Data Collection:** Gathering relevant numerical, text, or image data from various sources (databases, APIs, web scraping).
2. **Data Preparation/Preprocessing:** 
   * Cleaning data (handling missing/null values).
   * Feature engineering and encoding categorical variables.
   * Normalization or scaling so variables have consistent ranges.
3. **Choosing a Model:** Selecting the right ML algorithm based on the task type (e.g., classification, regression).
4. **Training the Model:** Feeding the prepared data into the chosen algorithm to establish numerical relationships and patterns.
5. **Evaluating the Model:** Testing the model against unheard/unseen data using metrics like accuracy, precision, and MSE.
6. **Hyperparameter Tuning:** Modifying the hidden settings of the algorithm to achieve better accuracy.
7. **Prediction/Deployment:** Deploying the model into a live environment to make inferences on real-world inputs.

## 3. Types of Machine Learning
* **Supervised Learning:** The model is trained on a labeled dataset (both input data and corresponding correct output are provided).
  * *Examples:* Classification (predicting categories), Regression (predicting exact numbers like prices).
* **Unsupervised Learning:** The model is trained on an unlabeled dataset. It must find hidden structures, groupings, or patterns independently.
  * *Examples:* Clustering (grouping similar items), Dimensionality Reduction.
* **Reinforcement Learning:** An "agent" learns to behave in an environment by performing actions and observing the rewards/penalties received. It learns via trial and error.
  * *Examples:* Game playing AI, Robotics.

## 4. Cross-validation: K-Fold Technique
* **What is Cross-Validation?** It is a robust technique for assessing how statistical analysis/model will generalize to an independent dataset. It prevents the model from overfitting to a specific train-test split.
* **K-Fold Technique Steps:**
  1. The entire dataset is partitioned randomly into *K* equal-sized subsets (or "folds").
  2. For *K* iterations, a different single fold is held out as the validation/test set.
  3. The remaining *K-1* folds are combined to form the training set.
  4. The model is trained on the training set and evaluated on the test set.
  5. Finally, the performance metrics from all *K* iterations are averaged to deliver a single performance score.
* **Advantages:** It ensures that every observation from the original dataset has a chance to appear in training and testing sets.

## 5. Overfitting and Underfitting
* **Underfitting (High Bias):**
  * The model is overwhelmingly simplistic and cannot capture the underlying trend or logic of the data. 
  * It performs poorly on both training and test data.
  * *Solution:* Use more complex models, add more features.
* **Overfitting (High Variance):**
  * The model is excessively complex and "memorizes" the training data alongside its noise.
  * It performs astonishingly well on training data but terribly on test/unseen data.
  * *Solution:* Cross-validation, regularization, providing more training data, reducing model complexity.

## 6. Evaluation Metrics: Confusion Matrix
A tabular way to evaluate the performance of a classification model.
* **True Positives (TP):** We predicted Positive, and actual was Positive.
* **True Negatives (TN):** We predicted Negative, and actual was Negative.
* **False Positives (FP):** We predicted Positive, but actual was Negative *(Type I Error)*.
* **False Negatives (FN):** We predicted Negative, but actual was Positive *(Type II Error)*.

**Crucial Formulas to Memorize:**
* **Accuracy:** `(TP + TN) / (TP + TN + FP + FN)` -> Overall correctness.
* **Precision:** `TP / (TP + FP)` -> Out of all predicted positives, how many were truly positive?
* **Recall / Sensitivity:** `TP / (TP + FN)` -> Out of all actual positives, how many did we spot?
* **F1-Score:** `2 * (Precision * Recall) / (Precision + Recall)` -> Harmonic mean of Precision and Recall. Best when there's an unequal class distribution.

## 7. Linear Regression
* A supervised learning algorithm used to predict continuous numerical values (e.g., salary, price, weight).
* Tries to formulate a linear equation (`y = mx + c`) that models a line of "best fit" minimizing the sum of the squares of errors.
* Evaluated commonly using Mean Squared Error (MSE).

## 8. Decision Trees
* A versatile supervised learning algorithm used for both Classification and Regression (CART).
* Structure represents flow-chart like decisions.
  * **Root Node:** Topmost node representing the entire population to make the first split.
  * **Internal/Decision Node:** A node broken down further based on a feature condition.
  * **Leaf Node:** Final endpoints representing the predicted outcome or class label.
* Highly interpretable but prone to overfitting without restrictions (like setting a max-depth).
