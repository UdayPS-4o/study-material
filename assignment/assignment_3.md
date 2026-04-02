# Assignment 3

## Subject 1: Internet of Things (IoT)

**Q1. Describe Web Communication Protocols for connected devices.**

Web communication protocols define how IoT devices exchange data over IP-based networks. They are the language of communication between devices, gateways, and cloud services.

**Key web protocols for IoT:**

- **HTTP (HyperText Transfer Protocol)** — The standard web protocol; uses request-response model. Suitable for non-constrained devices. Overhead is high for resource-limited sensors.
- **CoAP (Constrained Application Protocol)** — A lightweight alternative to HTTP designed specifically for constrained IoT devices. Uses UDP, supports multicast, and maps to HTTP for cloud integration.
- **WebSockets** — Enables full-duplex, persistent connections over TCP; ideal for real-time IoT dashboards.
- **XMPP (Extensible Messaging and Presence Protocol)** — XML-based protocol originally for instant messaging, adapted for IoT device presence and messaging.

**Choosing the right protocol depends on:**
- Device resource constraints (CPU, memory, battery)
- Network reliability and bandwidth
- Need for real-time vs. periodic communication
- Security requirements

CoAP and WebSockets are most commonly used in modern IoT deployments due to their efficiency and real-time capabilities.

---

**Q2. What are Message Communication Protocols?**

Message communication protocols are lightweight protocols optimized for transmitting data in constrained IoT networks where bandwidth is limited and reliability must be maintained even over unreliable connections.

**Key messaging protocols:**

**MQTT (Message Queuing Telemetry Transport)**
- Publish-Subscribe model: devices publish data to a **broker**; subscribers receive relevant messages
- Extremely lightweight — minimal header overhead
- Supports three QoS levels: At most once, At least once, Exactly once
- Ideal for low-bandwidth, high-latency, or unreliable networks

**AMQP (Advanced Message Queuing Protocol)**
- More feature-rich than MQTT
- Supports queuing, routing, reliability, and security
- Used in enterprise IoT and cloud messaging platforms

**DDS (Data Distribution Service)**
- Peer-to-peer, real-time publish-subscribe protocol
- No central broker required
- Used in industrial and military IoT systems

MQTT is the dominant choice for most IoT deployments due to its simplicity, efficiency, and broad platform support across AWS IoT, Azure IoT Hub, and Google Cloud IoT.

---

**Q3. Discuss SOAP and REST in IoT.**

**SOAP (Simple Object Access Protocol)**
- XML-based, highly structured messaging protocol
- Strictly defined message format with envelope, header, and body
- Supports complex operations, transactions, and security (WS-Security)
- **Heavy** — high overhead makes it unsuitable for constrained IoT devices

**REST (Representational State Transfer)**
- Architectural style using standard HTTP methods: GET, POST, PUT, DELETE
- **Stateless** — each request contains all necessary information
- Lightweight, flexible, and works with JSON/XML
- Much more suitable for IoT web services

**Comparison:**

| Feature | SOAP | REST |
|---|---|---|
| Protocol | XML over HTTP/SMTP | HTTP |
| Format | XML only | JSON, XML, etc. |
| Overhead | High | Low |
| IoT suitability | Poor | Good |
| Complexity | High | Low |

**REST in IoT:** RESTful APIs expose device functionality as web resources, controllable via standard HTTP commands. A smart thermostat might expose `GET /temperature`, `POST /setpoint`, allowing any web client to interact with it seamlessly.

REST is the preferred choice for IoT web services due to its simplicity and the maturity of HTTP infrastructure.

---

**Q4. Explain HTTP RESTful APIs.**

HTTP RESTful APIs expose IoT device functionalities as **web resources** accessible via standard HTTP methods, enabling seamless integration between IoT devices and web applications.

**REST principles:**
- **Stateless interactions** — Each request is independent; no session state
- **Uniform interface** — Standard HTTP verbs: GET, POST, PUT, DELETE, PATCH
- **Resource-based** — Everything is a resource identified by a URI
- **Layered system** — Client doesn't need to know if it's talking to a server, cache, or gateway

**HTTP methods in IoT:**
- `GET /sensors/temperature` — Read current temperature
- `POST /actuators/light` — Turn on a light
- `PUT /devices/thermostat/setpoint` — Update temperature setpoint
- `DELETE /alerts/123` — Remove an alert

**Response formats:** JSON is most common due to its lightweight nature and wide language support.

**Security:** RESTful IoT APIs use HTTPS (TLS), API keys, OAuth 2.0, and JWT tokens for authentication and authorization.

RESTful APIs enable heterogeneous devices from different manufacturers to be controlled through a unified, standards-based interface — a critical requirement for IoT ecosystem interoperability.

---

**Q5. What are Web Sockets used for?**

WebSockets provide **full-duplex, persistent communication channels** over a single TCP connection, enabling real-time bidirectional data exchange between IoT devices and clients without the overhead of repeated HTTP polling.

**Problem WebSockets solve:**
Traditional HTTP is request-response — the client must repeatedly poll the server to check for updates (e.g., "Any new sensor data?"). This is inefficient and adds latency.

**WebSocket connection lifecycle:**
1. Client sends HTTP **Upgrade request** to switch to WebSocket protocol
2. Server agrees — connection upgrades to full-duplex WebSocket
3. Both parties can now send data independently at any time
4. Connection remains open until explicitly closed

**Advantages for IoT:**
- **Low latency** — Data pushed immediately without polling
- **Reduced overhead** — No repeated HTTP headers for each message
- **Bidirectional** — Server can push commands to devices; devices push data to servers
- **Real-time dashboards** — Live sensor readings, alerts, and control interfaces

**Use cases:** Live energy monitoring dashboards, industrial equipment telemetry, real-time patient monitoring in healthcare, and connected vehicle status displays.

---

## Subject 2: Artificial Intelligence and Machine Learning

**Q1. What is Machine Learning?**

Machine Learning (ML) is a subset of AI that enables systems to **learn from data and improve their performance on tasks without being explicitly programmed** for every scenario.

Instead of writing rules manually, ML algorithms identify patterns in training data and generalize to make predictions on unseen data.

**Three pillars of ML:**
- **Data** — The raw material; quality and quantity directly impact model performance
- **Algorithm** — The mathematical model that learns patterns (decision trees, neural networks, SVMs)
- **Evaluation** — Metrics to measure how well the model generalizes (accuracy, F1-score, RMSE)

**ML vs Traditional Programming:**

| Traditional | Machine Learning |
|---|---|
| Input + Rules → Output | Input + Output → Rules |
| Explicit programming | Pattern learning |
| Fixed logic | Adaptive to data |

**Real-world applications:** Email spam filtering, product recommendations, fraud detection, medical image diagnosis, natural language translation, and autonomous vehicle navigation.

ML is the driving technology behind most modern AI systems, enabling scalable intelligence across industries without domain-specific rule encoding.

---

**Q2. Outline the core Stages of ML.**

A typical Machine Learning workflow follows a structured pipeline of stages from raw data to deployed model.

**1. Problem Definition**
Define the task: Is it classification, regression, clustering, or reinforcement learning? Understand the business goal and success metrics.

**2. Data Collection**
Gather relevant data from databases, APIs, web scraping, sensors, or surveys. Data quality is critical — "garbage in, garbage out."

**3. Data Preprocessing**
Clean and prepare data:
- Handle missing values (imputation or removal)
- Remove duplicates and outliers
- Encode categorical variables
- Normalize/standardize numerical features

**4. Feature Engineering**
Select, transform, or create features that most effectively represent the problem for the chosen algorithm.

**5. Model Selection**
Choose an appropriate algorithm based on the problem type, data size, and interpretability requirements.

**6. Model Training**
Feed training data into the algorithm; it adjusts internal parameters to minimize prediction error.

**7. Model Evaluation**
Test the model on unseen validation/test data using metrics like accuracy, precision, recall, AUC-ROC, or RMSE.

**8. Hyperparameter Tuning**
Optimize model settings using cross-validation, grid search, or random search.

**9. Deployment & Monitoring**
Deploy the model to production and continuously monitor for data drift and performance degradation.

---

**Q3. What are the main Types of Machine Learning?**

Machine Learning is broadly categorized into three main paradigms based on the type of feedback available during training.

**1. Supervised Learning**
The model learns from **labeled data** — each training example has an input and a known correct output.
- **Classification:** Predict discrete categories (spam/not spam, disease/no disease)
- **Regression:** Predict continuous values (house price, stock price)
- Algorithms: Linear Regression, Decision Trees, SVM, Neural Networks

**2. Unsupervised Learning**
The model finds **hidden patterns in unlabeled data** without predefined output categories.
- **Clustering:** Group similar data points (K-means, DBSCAN)
- **Dimensionality Reduction:** Compress data while retaining structure (PCA, t-SNE)
- **Association Rule Mining:** Find co-occurring patterns (market basket analysis)

**3. Reinforcement Learning**
An agent learns by **interacting with an environment**, receiving rewards for good actions and penalties for bad ones.
- No labeled data — learns through trial and error
- Applications: Game playing (AlphaGo), robotics, autonomous driving, trading systems

**Semi-supervised Learning** (bonus): Uses a small amount of labeled data and large amounts of unlabeled data — practical in real-world scenarios where labeling is expensive.

---

**Q4. Explain Cross-Validation: K-Fold Technique.**

Cross-validation is a model evaluation technique that assesses how well a machine learning model **generalizes to independent datasets**, reducing the risk of overfitting to a single training set.

**K-Fold Cross-Validation:**

1. Divide the dataset into **K equal subsets (folds)**
2. Train the model on **K-1 folds** and evaluate on the **remaining 1 fold**
3. Repeat this K times, each time using a different fold as the test set
4. Average the K evaluation scores to get the final performance estimate

**Example (K=5):**
```
Fold 1: [Test] [Train] [Train] [Train] [Train]
Fold 2: [Train] [Test] [Train] [Train] [Train]
Fold 3: [Train] [Train] [Test] [Train] [Train]
... and so on
```

**Why K-Fold is better than a single train-test split:**
- Every data point is used for both training and testing
- Reduces variance in performance estimates
- Detects overfitting more reliably

**Common values:** K=5 or K=10 are standard; **Leave-One-Out CV (LOOCV)** uses K=n (each sample is a fold).

**Stratified K-Fold** maintains class proportion in each fold — essential for imbalanced datasets.

---

**Q5. What are Evaluation Metrics like Confusion Matrix?**

A **Confusion Matrix** is a table that summarizes the performance of a classification model by showing the counts of correct and incorrect predictions broken down by class.

**For a binary classifier:**

| | Predicted Positive | Predicted Negative |
|---|---|---|
| **Actual Positive** | TP (True Positive) | FN (False Negative) |
| **Actual Negative** | FP (False Positive) | TN (True Negative) |

**Key metrics derived from the confusion matrix:**

- **Accuracy** = (TP + TN) / (TP + TN + FP + FN)
  — Overall correctness; misleading for imbalanced classes

- **Precision** = TP / (TP + FP)
  — Of all predicted positives, how many are truly positive?

- **Recall (Sensitivity)** = TP / (TP + FN)
  — Of all actual positives, how many were correctly identified?

- **F1-Score** = 2 × (Precision × Recall) / (Precision + Recall)
  — Harmonic mean; balances precision and recall

- **Specificity** = TN / (TN + FP) — Correct negative rate

**When to prioritize what:**
- High Recall: Medical diagnosis (minimize missed cases)
- High Precision: Spam detection (minimize false alarms)
- F1-Score: When both matter equally

---

## Subject 3: Compiler Design

**Q1. What are Syntax Directed Definitions?**

A Syntax Directed Definition (SDD) is a context-free grammar augmented with **attributes attached to grammar symbols** and **semantic rules** associated with each production, used to specify the semantic analysis and intermediate code generation phases of a compiler.

**Core concepts:**

**Attributes** — Values associated with grammar symbols:
- **Synthesized attributes** — Computed from attributes of children nodes (bottom-up flow)
- **Inherited attributes** — Passed down from parent or sibling nodes (top-down flow)

**Semantic Rules** — Associated with each production rule; define how attribute values are computed.

**Example:**
```
E → E1 + T    { E.val = E1.val + T.val }
T → num       { T.val = num.lexval }
```
Here `val` is a synthesized attribute — computed from children.

**Annotated Parse Tree:** A parse tree where nodes are labeled with their computed attribute values.

**Applications:**
- Type checking and type inference
- Computing expression values
- Generating intermediate code
- Building symbol tables

SDDs separate the **what** (grammar rules) from the **how** (semantic computation), making compilers more modular and maintainable.

---

**Q2. Describe the Bottom-up Evaluation of S-Attributed Definitions.**

An **S-attributed definition** is a special class of Syntax Directed Definition (SDD) that uses **only synthesized attributes** — values that flow from child nodes to parent nodes in the parse tree.

**Why S-attributed is important:**
S-attributed SDDs can be evaluated **during bottom-up (LR) parsing** in a single pass, making them highly efficient — no need for separate tree traversal passes.

**How it works:**
- As the LR parser reduces tokens and non-terminals using production rules, the **semantic action** for that production is executed immediately
- Synthesized attributes are stored on the **parser stack** alongside grammar symbols
- When a reduce action pops symbols, their attribute values are combined to compute the parent's attribute

**Stack representation:**
Each stack entry holds: (grammar symbol, attribute value)

**Example:**
```
E → E1 + T    { E.val = E1.val + T.val }
```
When E1 and T are reduced to E, their `.val` attributes on the stack are added and the result stored as E's `.val`.

**Practical use:** Used in calculator implementations, type evaluators, and intermediate code generators embedded in LR parsers (e.g., Yacc/Bison).

---

**Q3. Explain L-Attributed Definition.**

An **L-attributed definition** is a class of Syntax Directed Definition that allows both **synthesized attributes** and **inherited attributes**, with the restriction that inherited attributes can only depend on:
- Attributes of symbols that appear to the **left** in the same production
- Attributes inherited by the head (left-hand side) of the production

The "L" stands for **Left-to-right** — attribute dependency flows strictly from left to right among siblings in the parse tree.

**Formal rule:**
For production A → X₁X₂...Xₙ, an inherited attribute of Xᵢ can only depend on:
- Inherited attributes of A
- Attributes of X₁, X₂, ..., Xᵢ₋₁ (symbols to the left of Xᵢ)

**Why L-attributed matters:**
- Every S-attributed definition is also L-attributed (superset relationship)
- L-attributed SDDs can be evaluated **during top-down (LL) parsing** in a single left-to-right scan
- They can also be evaluated during bottom-up parsing with some restructuring

**Applications:**
- Translating arithmetic expressions with prefix/postfix notation
- Type coercion and implicit type conversion
- Generating code for conditional and loop statements in LL parsers

---

**Q4. What is Type Checking?**

Type checking is the compiler phase that **verifies that each operation in the source program receives operands of appropriate types**, catching semantic errors that syntax analysis cannot detect.

**Goals of type checking:**
- Ensure operations are applied to compatible types (`int + int` is valid; `int + string` is not)
- Detect undeclared variables and out-of-scope references
- Enforce language-specific type rules

**Types of type checking:**

**Static Type Checking** — Done at compile time
- Errors caught before execution
- Languages: C, C++, Java, Go
- Faster execution but less flexible

**Dynamic Type Checking** — Done at runtime
- More flexible; types checked when operations actually execute
- Languages: Python, JavaScript, Ruby
- Slower due to runtime overhead

**Type System components:**
- **Type expressions** — Represent types of language constructs
- **Type rules** — Specify valid operations for each type combination
- **Type inference** — Automatically deduce the type of an expression

**Type coercion:** Implicit type conversion (e.g., `int` to `float` in `3 + 2.5`). The compiler inserts a coercion instruction automatically.

**Type checking vs Type inference:** Checking verifies declared types; inference (e.g., in Haskell, Rust) deduces types without explicit declarations.

---

**Q5. What is the Overloading of Functions and Operations?**

**Overloading** allows a single function name or operator symbol to have **multiple definitions** that differ in the number or types of their parameters. The compiler selects the appropriate definition based on the context of the call.

**Function overloading:**
```c++
int add(int a, int b) { return a + b; }
float add(float a, float b) { return a + b; }
```
Both functions are named `add` but accept different argument types. The compiler resolves which version to call based on the argument types at the call site.

**Operator overloading:**
The same operator performs different operations depending on operands:
- `3 + 4` — integer addition
- `3.0 + 4.0` — floating-point addition
- `"Hello" + " World"` — string concatenation (in some languages)

**How the compiler handles overloading:**
1. **Name Mangling** — The compiler internally renames overloaded functions by appending type information to create unique identifiers
2. **Overload Resolution** — At each call site, the compiler performs **type signature matching** to find the best matching overloaded definition
3. **Ambiguity Detection** — If two overloaded versions are equally valid, the compiler reports an ambiguity error

Overloading improves code **readability and expressiveness** without sacrificing type safety.

---

## Subject 4: Natural Language Processing

**Q1. What is Minimum Edit Distance?**

Minimum Edit Distance (MED), also known as **Levenshtein Distance**, is a metric that quantifies the **dissimilarity between two strings** by counting the minimum number of single-character operations required to transform one string into another.

**Three allowed operations:**
- **Insertion** — Add a character
- **Deletion** — Remove a character
- **Substitution** — Replace one character with another

**Example:**
Transforming "kitten" → "sitting":
1. kitten → **s**itten (substitute k→s)
2. sitten → sitt**i**n (substitute e→i)
3. sittin → sittin**g** (insert g)

**Minimum Edit Distance = 3**

**Algorithm:** Dynamic programming — builds an (m+1) × (n+1) matrix where entry D[i][j] = minimum edits to transform the first i characters of string 1 to the first j characters of string 2.

**NLP Applications:**
- **Spell checking** — Find the dictionary word closest to a misspelled word
- **DNA sequence alignment** in bioinformatics
- **Plagiarism detection**
- **Machine translation evaluation** (BLEU score)
- **Fuzzy string matching** in search engines

**Variants:** Damerau-Levenshtein also adds transpositions (swapping adjacent characters) as a fourth operation.

---

**Q2. Explain Weighted Automata.**

A **Weighted Finite Automaton (WFA)** is an extension of a standard finite automaton (FA) where each transition is assigned a **numeric weight** (probability, cost, or score) in addition to a symbol label.

**Standard FA vs WFA:**
- Standard FA: Accepts or rejects strings
- WFA: Accepts strings AND assigns them a **numeric value** (sum, product, or min/max of transition weights)

**Structure:**
- States Q, Input alphabet Σ
- Transitions labeled with (symbol, weight) pairs
- Initial state weights and final state weights

**In NLP — Probabilistic Automata:**
When weights are probabilities, WFAs become **probabilistic or stochastic automata**:
- Each path through the automaton has a probability (product of transition probabilities)
- The automaton assigns a probability score to each accepted string

**Applications:**
- **Language modeling** — Probability of a word sequence
- **Speech recognition** — Score acoustic observations against possible phoneme sequences; choose the highest-probability path
- **OCR (Optical Character Recognition)** — Score character hypotheses
- **Machine translation** — Score candidate translations

**Weighted Finite State Transducers (WFST):** Combine FST input-output mapping with weights — the dominant framework in modern speech recognition systems (Kaldi).

---

**Q3. What are N-grams?**

An N-gram is a contiguous sequence of **N items** (words, characters, or phonemes) from a given text or speech corpus. N-gram models assign probabilities to sequences and are foundational to language modeling in NLP.

**Common N-gram types:**
- **Unigram (N=1):** Single words — P("cat")
- **Bigram (N=2):** Pairs — P("the cat")
- **Trigram (N=3):** Triples — P("the cat sat")

**N-gram probability (using chain rule + Markov assumption):**

P(wₙ | w₁...wₙ₋₁) ≈ P(wₙ | wₙ₋₁) for bigrams

**Probability estimation from corpus:**
P("cat" | "the") = Count("the cat") / Count("the")

**Applications:**
- **Language modeling** — Predict the next word in a sequence
- **Spell checking** — Identify statistically unlikely word combinations
- **Machine translation** — Score fluency of candidate translations
- **Speech recognition** — Disambiguate phonetically similar words using context

**Limitations:**
- **Data sparsity** — Rare N-grams may have zero count (solved by smoothing: Laplace, Kneser-Ney)
- **Fixed context window** — Cannot capture long-range dependencies (solved by RNNs and transformers)

---

**Q4. Discuss HMM and Speech Recognition.**

A **Hidden Markov Model (HMM)** is a probabilistic model for sequences where the system transitions between **hidden states** over time, and each state generates an observable output according to a probability distribution.

**Two types of variables:**
- **Hidden states** — Not directly observed (e.g., phonemes in speech)
- **Observations** — Directly observed (e.g., acoustic feature vectors)

**HMM parameters:**
- **π** — Initial state probability distribution
- **A** — State transition probability matrix
- **B** — Observation emission probability matrix

**Speech Recognition with HMMs:**
1. Audio signal → Feature extraction → MFCC (Mel-frequency cepstral coefficients) vectors
2. Each phoneme modeled by a separate HMM
3. Words = sequences of phoneme HMMs; sentences = sequences of word HMMs
4. **Viterbi algorithm** finds the most likely sequence of hidden states (phonemes) given the observations
5. **Baum-Welch algorithm** trains HMM parameters from data

**Key algorithms:**
- **Forward Algorithm** — P(observations | model)
- **Viterbi Algorithm** — Most likely hidden state sequence
- **Baum-Welch** — Parameter estimation (EM algorithm)

HMMs dominated speech recognition from the 1980s until deep learning replaced them with RNNs and transformer-based models like Whisper.

---

**Q5. Explain Part-of-Speech Tagging.**

Part-of-Speech (POS) tagging is the process of **assigning a grammatical category (tag) to each word** in a sentence — identifying whether each word is a noun, verb, adjective, adverb, pronoun, preposition, etc.

**Example:**
"The cat sat on the mat"
- The/DT cat/NN sat/VBD on/IN the/DT mat/NN

**Why POS tagging matters:**
- Resolves lexical ambiguity: "book" can be a noun ("the book") or verb ("book a flight")
- Foundation for parsing, NER, and semantic analysis
- Improves accuracy of downstream NLP tasks

**Approaches:**

**1. Rule-Based (Brill Tagger)**
Uses hand-crafted transformation rules applied repeatedly to improve initial tag assignments.

**2. Statistical (HMM-based)**
Uses Hidden Markov Models — chooses the tag sequence that maximizes:
P(tags | words) ∝ P(words | tags) × P(tags)

**3. Deep Learning**
Bidirectional LSTMs and transformers (BERT) achieve near-human accuracy by modeling full sentence context.

**Standard tagsets:**
- **Penn Treebank tagset** — 45 tags (most common for English)
- **Universal POS tags** — 17 coarse-grained tags for multilingual NLP

Modern NLP libraries (spaCy, NLTK, Stanford NLP) provide pre-trained POS taggers achieving 97%+ accuracy on standard benchmarks.

---

## Subject 5: Scientific Aptitude

**Q1. Two unbiased coins are tossed. Find the probability of getting Two Tails.**

**Solution:**
Sample space = {HH, HT, TH, TT} — 4 equally likely outcomes

Favorable outcome (Two Tails) = {TT} — 1 outcome

**P(Two Tails) = 1/4**

**Answer: 1/4 (or 0.25)**

---

**Q2. A biased coin has P(Head) = 0.4. Tossed 10 times. Find P(exactly 3 heads).**

**Using Binomial Probability Formula:**
P(X = k) = C(n, k) × pᵏ × (1−p)ⁿ⁻ᵏ

Where: n = 10, k = 3, p = 0.4, (1−p) = 0.6

P(X = 3) = C(10, 3) × (0.4)³ × (0.6)⁷
= 120 × 0.064 × 0.0279936
= **≈ 0.2150**

**Answer: P(X = 3) ≈ 0.215 (21.5%)**

---

**Q3. Three coins are tossed. Find the probability of getting all heads.**

**Solution:**
Total outcomes = 2³ = **8**
Sample space = {HHH, HHT, HTH, HTT, THH, THT, TTH, TTT}

Favorable outcome = {HHH} — 1 outcome

**P(All Heads) = 1/8**

**Answer: 1/8 (or 0.125)**

---

**Q4. Two dice are thrown. Find the probability that the sum is 8.**

**Solution:**
Total outcomes = 6 × 6 = **36**

Outcomes summing to 8:
(2,6), (3,5), (4,4), (5,3), (6,2) — **5 outcomes**

**P(sum = 8) = 5/36**

**Answer: 5/36**

---

**Q5. One card is drawn from a standard deck of 52 cards. Find the probability it is an Ace.**

**Solution:**
Total cards = 52
Number of Aces in a deck = 4 (one per suit: spades, hearts, diamonds, clubs)

**P(Ace) = 4/52 = 1/13**

**Answer: 1/13 (≈ 0.077 or 7.7%)**

---
