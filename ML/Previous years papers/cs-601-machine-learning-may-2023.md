# CS-601 (GS) — Machine Learning
**B.Tech., VI Semester Examination, May 2023 — Grading System (GS)**

Time: Three Hours | Maximum Marks: 70 | Total Questions: 8

**Note:**
1. Attempt any five questions.
2. All questions carry equal marks.
3. In case of any doubt or dispute the English version question should be treated as final.

---

### Q1
**a)** Explain various types of machine learning used for continuous data and non-continuous data.

**b)** Give an explanation of the One-hot encoding as well as the Label encoding. In what ways do they change the dimensionality of the data that has been provided?

### Q2
**a)** Break down how CNN actually operates. The image is downscaled, and the number of filters is increased as we approach the model's output, but why?

**b)** Replace the old weights (not the bias) in the network depicted in the following figure using back-propagation algorithms. A [0,1] input pattern is given to the network, and the desired output is 1. Use the Sigmoid activation function and a learning rate of = 0.3.

Network diagram: inputs x1, x2 → hidden nodes z1, z2 (with bias node "1") → output y.
- x1 → z1 weight 0.5, x1 → z2 weight -0.1
- x2 → z1 weight 0.6, x2 → z2 weight 0.7
- bias → z1 weight 0.2, bias → z2 weight 0.4
- z1 → y weight 0.3, z2 → y weight 0.2
- bias → y weight 0.4

### Q3
**a)** Describe the benefits of transfer learning features that can be transferred. Explain Inception net architecture in detail.

**b)** What are the structural and operational differences between a feed-forward network and a recurrent neural network? Identify the differences between LSTM, GRU, and vanilla RNNs.

### Q4
Differentiate:
i) Various loss functions
ii) Types of Gradient Descent Optimizers

### Q5
**a)** Clarify the meaning of Confusion metrics in the context of machine learning. What other metrics might be derived from the metric of confusion?

**b)** "Model performance can be greatly improved through careful hyperparameter tuning". Justify the statement.

### Q6
**a)** Explain how the KNN method is implemented. Below is information regarding a player's speed and agility that will be used to determine whether he will be drafted into the team. Predict the likelihood that a player with "speed = 6.75" and "agility = 3" will make the team using the KNN machine learning model assuming "k = 3".

| ID | Speed | Agility | Draft |
|----|-------|---------|-------|
| 11 | 2.00  | 2.00    | no    |
| 12 | 5.00  | 2.50    | no    |
| 13 | 8.25  | 8.50    | no    |
| 14 | 5.75  | 8.75    | yes   |
| 15 | 4.75  | 6.25    | yes   |
| 16 | 5.50  | 6.75    | yes   |
| 17 | 5.25  | 9.50    | yes   |
| 18 | 7.00  | 4.25    | yes   |
| 19 | 7.50  | 8.00    | yes   |
| 20 | 7.25  | 5.75    | yes   |

**b)** How can we make the model non-linear? If we only use linearity, how will that affect Gradient Descent?

### Q7
**a)** Based on figure, which depicts the Bayesian belief network for the data set shown in the table below, respond to the following questions. (Assume that each attribute has a binary value.)

| Mileage | Engine | Air Conditioner | No. of Records with Car Value = High | No. of Records with Car Value = Low |
|---------|--------|------------------|---------------------------------------|----------------------------------------|
| Hi | Good | Working | 3 | 4 |
| Hi | Good | Broken  | 1 | 2 |
| Hi | Bad  | Working | 1 | 5 |
| Hi | Bad  | Broken  | 0 | 4 |
| Lo | Good | Working | 9 | 0 |
| Lo | Good | Broken  | 5 | 1 |
| Lo | Bad  | Working | 1 | 2 |
| Lo | Bad  | Broken  | 0 | 2 |

Bayesian Belief Network structure: Mileage → Engine, Air Conditioner → (nothing shown feeding it further), Engine → Car Value, Air Conditioner → Car Value.

i) Draw the probability table for each node in the network.

ii) Use the Bayesian network to predict the 'car value' for the following:
P(Mileage = Lo, Engine = Bad, Air Conditioner = Broken)

**b)** Describe the procedure that can be used to identify overfitting and underfitting in a CNN model. Include some potential solutions to this problem as well.

### Q8
Explain the following with an appropriate example:
i) Computer Vision
ii) Reinforcement learning
