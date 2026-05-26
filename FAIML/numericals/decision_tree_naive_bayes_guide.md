# FAIML - Naive Bayes & Decision Trees Numericals Guide

This guide covers the numericals for Probabilistic and Tree-based models. These questions rely heavily on counting frequencies and probability formulas.

---

## 1. Naive Bayes Classifier

**Concept:** Naive Bayes is a probabilistic classifier based on Bayes' Theorem, with the "naive" assumption of conditional independence between every pair of features given the value of the class variable.

**Key Formulas:**
*   **Bayes Theorem:** $$P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$$
*   **Classification Rule:** Predict class $C_k$ that maximizes $P(C_k) \prod P(x_i | C_k)$

### Exam Question Example:
You are given the following training dataset determining whether a person will "Play Tennis" based on weather conditions.

| Outlook | Temperature | Play Tennis (Class) |
| :--- | :--- | :--- |
| Sunny | Hot | No |
| Sunny | Hot | Yes |
| Overcast| Hot | Yes |
| Rain | Mild | Yes |
| Rain | Cool | No |

**Task:** Predict if the person will play tennis given a new instance: **X = (Outlook = Sunny, Temperature = Cool)**.

### Step-by-Step Solution:

**Step 1: Calculate Prior Probabilities of the Classes.**
Total rows = 5
*   Count of `Yes`: 3 $\rightarrow$ $P(Yes) = \frac{3}{5} = 0.6$
*   Count of `No`: 2 $\rightarrow$ $P(No) = \frac{2}{5} = 0.4$

**Step 2: Calculate Conditional Probabilities for the given features.**
We need $P(Sunny | Yes)$, $P(Sunny | No)$, $P(Cool | Yes)$, and $P(Cool | No)$.

*   **For Outlook = Sunny:**
    *   $P(Sunny | Yes)$ = (Times it was Sunny AND Yes) / (Total Yes) = $\frac{1}{3} \approx 0.333$
    *   $P(Sunny | No)$ = (Times it was Sunny AND No) / (Total No) = $\frac{1}{2} = 0.5$

*   **For Temperature = Cool:**
    *   $P(Cool | Yes)$ = (Times it was Cool AND Yes) / (Total Yes) = $\frac{0}{3} = 0$
    *   $P(Cool | No)$ = (Times it was Cool AND No) / (Total No) = $\frac{1}{2} = 0.5$

*(Note: In real-world Naive Bayes, a probability of 0 ruins the whole equation. We usually use "Laplace Smoothing" to fix this. However, check if your syllabus expects Laplace smoothing. If not, proceed with 0).*

**Step 3: Calculate the Posterior Probability proxy for each class.**
For a given class $C$, the formula we compute is: $P(C) \times P(Sunny | C) \times P(Cool | C)$

*   **For Class = Yes:**
    Score(Yes) $= P(Yes) \times P(Sunny | Yes) \times P(Cool | Yes)$
    Score(Yes) $= 0.6 \times 0.333 \times 0 = \mathbf{0}$

*   **For Class = No:**
    Score(No) $= P(No) \times P(Sunny | No) \times P(Cool | No)$
    Score(No) $= 0.4 \times 0.5 \times 0.5 = \mathbf{0.1}$

**Step 4: Compare the results and make a prediction.**
*   Score(No) = 0.1
*   Score(Yes) = 0

Since $0.1 > 0$, the model predicts **Play Tennis = No**.

---

## 2. Decision Trees (Entropy & Information Gain)

**Concept:** Decision trees split the data into subsets based on the feature that provides the most "information gain" (i.e., reduces the most randomness/entropy).

**Key Formulas:**
*   **Entropy (H):** Measure of impurity in a dataset $S$.
    $$H(S) = -p_+ \log_2(p_+) - p_- \log_2(p_-)$$
    *(where $p_+$ is the proportion of positive examples, and $p_-$ is the proportion of negative examples).*
*   **Information Gain (IG):** Reduction in entropy after a dataset is split on an attribute $A$.
    $$IG(S, A) = H(S) - \sum \left( \frac{|S_v|}{|S|} H(S_v) \right)$$
    *(where $S_v$ is the subset of $S$ for which attribute $A$ has value $v$).*

### Exam Question Example:
A dataset $S$ contains 14 examples: 9 positive (Yes) and 5 negative (No).
We want to split the dataset using an attribute **"Wind"**, which has two values: *Weak* and *Strong*.
*   For Wind = Weak: there are 8 examples (6 Yes, 2 No).
*   For Wind = Strong: there are 6 examples (3 Yes, 3 No).

**Task:** Calculate the Information Gain of the "Wind" attribute.

### Step-by-Step Solution:

**Step 1: Calculate the Entropy of the original dataset S.**
*   Total examples $|S| = 14$
*   Positive $|+|$ = 9 ($p_+ = \frac{9}{14}$)
*   Negative $|-|$ = 5 ($p_- = \frac{5}{14}$)

$$H(S) = - \left(\frac{9}{14}\right) \log_2 \left(\frac{9}{14}\right) - \left(\frac{5}{14}\right) \log_2 \left(\frac{5}{14}\right)$$
$$H(S) = -(0.643 \times -0.637) - (0.357 \times -1.485)$$
$$H(S) = 0.410 + 0.530 = \mathbf{0.940}$$

**Step 2: Calculate the Entropy for each branch of the attribute "Wind".**

*   **Branch 1: Wind = Weak ($S_{weak}$)**
    *   Total $|S_{weak}| = 8$ (6 Yes, 2 No)
    *   $p_+ = \frac{6}{8} = 0.75$
    *   $p_- = \frac{2}{8} = 0.25$
    $$H(S_{weak}) = - (0.75 \log_2(0.75)) - (0.25 \log_2(0.25))$$
    $$H(S_{weak}) = -(0.75 \times -0.415) - (0.25 \times -2)$$
    $$H(S_{weak}) = 0.311 + 0.5 = \mathbf{0.811}$$

*   **Branch 2: Wind = Strong ($S_{strong}$)**
    *   Total $|S_{strong}| = 6$ (3 Yes, 3 No)
    *   $p_+ = \frac{3}{6} = 0.5$
    *   $p_- = \frac{3}{6} = 0.5$
    *(Shortcut: Whenever there is a 50/50 split, the entropy is exactly 1).*
    $$H(S_{strong}) = - (0.5 \log_2(0.5)) - (0.5 \log_2(0.5)) = \mathbf{1.0}$$

**Step 3: Calculate the overall Information Gain for the attribute "Wind".**
$$IG(S, Wind) = H(S) - \left[ \left( \frac{|S_{weak}|}{|S|} \times H(S_{weak}) \right) + \left( \frac{|S_{strong}|}{|S|} \times H(S_{strong}) \right) \right]$$
$$IG(S, Wind) = 0.940 - \left[ \left( \frac{8}{14} \times 0.811 \right) + \left( \frac{6}{14} \times 1.0 \right) \right]$$
$$IG(S, Wind) = 0.940 - [ (0.571 \times 0.811) + (0.429 \times 1.0) ]$$
$$IG(S, Wind) = 0.940 - [ 0.463 + 0.429 ]$$
$$IG(S, Wind) = 0.940 - 0.892$$
**Information Gain = 0.048**

*(In a full decision tree problem, you would calculate the IG for all attributes and pick the one with the highest IG as the root node).*

---
### 💡 Exam Tips for these topics:
1.  **Logarithm Base 2:** Make sure your calculator is set up to calculate $\log_2$, or use the change-of-base formula: $\log_2(x) = \frac{\ln(x)}{\ln(2)}$.
2.  **Fractional Probabilities:** Keep your probabilities as fractions until the very end to avoid rounding errors cascading through your calculations.
3.  **Zero Probability:** If you get a 0 probability in Naive Bayes, write a note stating *"Because $P(feature|class)$ is 0, the total probability becomes 0. In practice, Laplace Smoothing is used."* This shows deep understanding.
