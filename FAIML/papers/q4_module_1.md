# Question 4

**i. What is the function of the input layer in an ANN?**
(A) It receives input data and passes it to the hidden layers
(B) It performs mathematical computations on the input data
(C) It stores the trained weights and biases of the network
(D) None of the above

**Answer:** (A) It receives input data and passes it to the hidden layers

---

**ii. Which layer of an ANN is responsible for making predictions or producing the final output?**
(A) Output layer (B) Input layer (C) Hidden layer (D) None of the above

**Answer:** (A) Output layer

---

**iii. How are biological neurons related to ANN? Explain with diagram. (4 Marks)**

**Answer:**

Artificial Neural Networks (ANNs) are heavily inspired by the structure and functioning of biological neurons in the human brain.

**Relationship:**
1. **Dendrites (Biological) $\rightarrow$ Inputs (ANN):** In a biological neuron, dendrites are branching extensions that receive signals. In an ANN, input nodes receive the incoming data features.
2. **Cell Body / Soma (Biological) $\rightarrow$ Node / Processing Unit (ANN):** The soma processes the incoming signals. The ANN node computes the weighted sum of its inputs and adds a bias.
3. **Synapses (Biological) $\rightarrow$ Weights (ANN):** Synapses control the strength of the signal passed between neurons. In ANNs, weights determine the importance or strength of a particular input connection.
4. **Axon (Biological) $\rightarrow$ Activation Function & Output (ANN):** The axon transmits the final signal if a specific threshold is reached. In an ANN, an activation function decides whether the computed sum is significant enough to pass the signal forward as output.

**Diagrammatic Representation:**
```text
  [Biological Neuron]                       [Artificial Neuron (Perceptron)]
  
      Dendrites ------------                       X1 --(Weight W1)--\
                   \                                                  \
       Synapses ---> Cell Body (Soma)              X2 --(Weight W2)---> [ Summation (Σ) + Bias (b) ] ---> [ Activation Function ] ---> Output (Y)
                   /                                                  /
         Axon  ------------                        X3 --(Weight W3)--/
```

---

**iv. Write an algorithm for back propagation algorithm which user stochastic gradient descent method. (6 Marks)**

**Answer:**

**Backpropagation Algorithm using Stochastic Gradient Descent (SGD):**

1. **Initialize:** Assign small random values to all weights ($W$) and biases ($b$) throughout the neural network.
2. **Iterate (Epochs):** For each individual training example $(x, y)$ in the dataset, perform the following steps sequentially:
   **a. Forward Pass:**
      * Feed the input data $x$ into the network's input layer.
      * Compute the outputs for all hidden layers and the final output layer using the current weights, biases, and activation functions.
   **b. Compute Error:**
      * Calculate the error at the output layer by comparing the network's predicted output ($\hat{y}$) with the actual target value ($y$) using a predefined loss function (e.g., Mean Squared Error).
   **c. Backward Pass (Error Propagation):**
      * Compute the gradient of the error with respect to the weights connected to the output layer.
      * Propagate the error backward through the hidden layers using the chain rule of calculus to compute the gradients for all prior weights and biases.
   **d. Weight Update (SGD):**
      * Update each weight and bias in the network in the opposite direction of the gradient to minimize the overall error.
      * $W = W - \eta \cdot \frac{\partial E}{\partial W}$
      * $b = b - \eta \cdot \frac{\partial E}{\partial b}$
      * *(Where $\eta$ is the learning rate, and $E$ is the computed error).*
3. **Repeat:** Repeat Step 2 for all examples to complete one epoch. Continue training for multiple epochs until the network's error converges to an acceptable minimum.

---
**OR**

**What are the advantages and disadvantages of deep neural networks? (6 Marks)**

**Answer:**

**Advantages of Deep Neural Networks (DNNs):**
1. **High Accuracy and Performance:** They excel in complex tasks like image recognition, NLP, and speech processing, often vastly outperforming traditional ML algorithms.
2. **Automatic Feature Extraction:** Unlike traditional ML, which requires manual feature engineering, DNNs automatically learn and extract the most relevant hierarchical features directly from raw data.
3. **Handling Unstructured Data:** They are highly effective at processing large volumes of unstructured data like images, audio, video, and raw text.
4. **Scalability with Data:** Their performance continues to improve as the amount of training data increases, scaling exceptionally well with Big Data.

**Disadvantages of Deep Neural Networks (DNNs):**
1. **Data Hungry:** They require massive amounts of labeled data to train effectively without overfitting.
2. **High Computational Cost:** Training requires significant computational power and memory, relying heavily on expensive hardware like GPUs or TPUs.
3. **Black Box Nature:** They severely lack interpretability. It is very difficult to understand *how* or *why* a deep neural network arrived at a specific prediction.
4. **Time Consuming to Train:** Training deep models can take days or weeks depending on the architecture complexity and data size.
5. **Prone to Overfitting:** If not properly regularized (e.g., Dropout) or if trained on limited data sets, they can easily overfit and simply memorize the training set.
