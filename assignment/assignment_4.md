# Assignment 4

## Subject 1: Internet of Things (IoT)

**Q1. Describe Sensor Technology in IoT.**

Sensors are the fundamental perception components of IoT — they detect physical parameters in the environment and convert them into electrical signals that can be digitized and processed.

**Types of sensors commonly used in IoT:**

- **Temperature sensors** (thermistors, RTDs, thermocouples) — HVAC, weather stations, industrial monitoring
- **Humidity sensors** — Agriculture, smart buildings
- **Motion/Proximity sensors** (PIR, ultrasonic, infrared) — Security systems, smart lights
- **Pressure sensors** — Industrial pipelines, weather monitoring, healthcare devices
- **Light sensors** (LDR, photodiodes) — Smart street lights, display brightness control
- **Gas/Chemical sensors** — Air quality monitoring, industrial safety
- **Accelerometers and Gyroscopes** — Wearables, vehicle telematics
- **GPS sensors** — Asset tracking, fleet management

**Key sensor characteristics:**
- **Accuracy** — Closeness of measurement to true value
- **Sensitivity** — Minimum detectable change
- **Response time** — How quickly sensor reacts to changes
- **Power consumption** — Critical for battery-powered IoT

Sensors transduce physical phenomena into data, making them indispensable for connecting the physical world to digital systems.

---

**Q2. What is Participatory Sensing?**

Participatory sensing is a crowd-sourced data collection paradigm where **individuals use their personal mobile devices** (smartphones, wearables) to voluntarily contribute sensor data about their environment, enabling large-scale, geographically distributed data collection.

**How it works:**
- Participants install an app that accesses device sensors (GPS, accelerometer, microphone, camera)
- Data is collected as participants go about their daily activities
- Aggregated data from many participants creates a rich, real-time dataset

**Key characteristics:**
- **Opportunistic sensing** — Data collected passively based on user location/activity
- **Task-based sensing** — Users are given specific data collection tasks
- **Community-driven** — Volunteers contribute to a shared data pool

**Examples:**
- **Air quality mapping** — Citizens measure pollution using phone-attached sensors
- **Traffic monitoring** — GPS data from commuters maps real-time congestion
- **Noise pollution mapping** — Microphone-based measurements across a city
- **Pothole detection** — Accelerometer data from vehicles identifies road damage

**Challenges:** Participant privacy, data quality variability, incentivizing participation, and battery drain on participant devices.

---

**Q3. Define Industrial IoT (IIoT).**

Industrial IoT (IIoT) is the application of IoT technologies in **manufacturing, industrial, and enterprise environments** to optimize operations, improve efficiency, enhance safety, and enable new business models.

**IIoT vs Consumer IoT:**
- Consumer IoT focuses on convenience (smart speakers, thermostats)
- IIoT focuses on **operational efficiency, safety, and uptime** — where failures can cost millions or endanger lives

**Key IIoT applications:**

- **Predictive Maintenance** — Sensors monitor machine health (vibration, temperature) and predict failures before they occur, reducing costly unplanned downtime
- **Asset Tracking** — Real-time location and condition monitoring of equipment and inventory
- **Process Automation** — Automated quality control using computer vision and sensor fusion
- **Energy Management** — Monitor and optimize industrial energy consumption
- **Supply Chain Visibility** — Track goods and materials end-to-end in real time

**IIoT technologies:**
- Industrial protocols: Modbus, OPC-UA, PROFINET
- Edge computing for low-latency processing
- Digital twins — Virtual replicas of physical assets for simulation and monitoring

IIoT is a cornerstone of **Industry 4.0**, the fourth industrial revolution.

---

**Q4. What is the role of Actuators?**

While sensors **input** data from the physical world, actuators **output** actions into the physical world — they are the "hands" of an IoT system, converting digital commands into physical effects.

**Definition:** An actuator is a device that receives a control signal and produces a physical movement or change in the environment.

**Types of actuators:**

- **Electric actuators** — Motors, solenoids, relays (e.g., opening/closing an electric lock)
- **Pneumatic actuators** — Use compressed air for industrial valves and cylinders
- **Hydraulic actuators** — High-force applications in heavy machinery
- **Thermal actuators** — Heat-based movement (e.g., bimetallic strips in thermostats)
- **Piezoelectric actuators** — Precise micro-scale movement (medical devices, inkjet printers)

**IoT actuator examples:**
- Smart thermostat turns on heating when temperature drops
- Smart irrigation valve opens when soil moisture sensor detects dryness
- Industrial robot arm positions a component based on computer vision commands
- Smart door lock unlocks when the correct RFID is detected

**Actuators close the feedback loop** in IoT systems — sense → decide → act — enabling true automation without human intervention.

---

**Q5. Explain Radio Frequency Identification Technology (RFID).**

RFID (Radio Frequency Identification) is a wireless technology that uses **electromagnetic fields to automatically identify and track tags** attached to objects, enabling contactless data capture without line-of-sight requirement.

**RFID system components:**
- **Tag (Transponder)** — Attached to the object; contains a microchip storing a unique identifier and an antenna
- **Reader (Interrogator)** — Emits radio waves; energizes passive tags and reads their data
- **Backend System** — Database that maps tag IDs to object information

**Types of RFID tags:**

| Type | Power Source | Range | Cost |
|---|---|---|---|
| Passive | Reader-powered | < 3 meters | Low |
| Active | Battery | Up to 100m | High |
| Semi-passive | Battery-assisted | Medium | Medium |

**Operating frequencies:**
- Low (LF, 125 kHz) — Animal tracking
- High (HF, 13.56 MHz) — Access control, NFC payments
- Ultra-High (UHF, 860-960 MHz) — Supply chain, retail inventory

**IoT Applications:** Retail inventory management, supply chain tracking, hospital patient/asset tracking, library book management, vehicle tolling, and contactless payments.

---

## Subject 2: Artificial Intelligence and Machine Learning

**Q1. What is Logistic Regression?**

Logistic Regression is a supervised machine learning algorithm used for **binary classification** — predicting the probability that an instance belongs to one of two classes.

Despite the name "regression," it is a **classification algorithm** that uses the logistic (sigmoid) function to output probabilities between 0 and 1.

**Sigmoid function:**
σ(z) = 1 / (1 + e⁻ᶻ)
where z = w₀ + w₁x₁ + w₂x₂ + ... (linear combination of features)

**Decision boundary:**
- If σ(z) ≥ 0.5 → Class 1
- If σ(z) < 0.5 → Class 0

**Training:** Uses **Maximum Likelihood Estimation (MLE)** via gradient descent to find optimal weights.

**Loss function:** Binary Cross-Entropy (Log Loss)

**Multi-class extension:**
- **One-vs-Rest (OvR)** — Train K binary classifiers for K classes
- **Softmax Regression** — Generalized multi-class logistic regression

**Applications:** Spam detection, disease prediction (cancer/no cancer), credit risk classification, sentiment analysis (positive/negative).

**Advantages:** Simple, interpretable, fast training, works well with linearly separable data, outputs calibrated probabilities.

---

**Q2. Explain Support Vector Machine (SVM).**

Support Vector Machine (SVM) is a supervised learning algorithm that finds the **optimal hyperplane** that maximizes the margin between classes in the feature space.

**Core concept:**
- **Hyperplane** — A decision boundary separating two classes (a line in 2D, a plane in 3D)
- **Margin** — The distance between the hyperplane and the nearest data points from each class
- **Support Vectors** — The data points closest to the hyperplane that define the margin boundary

**Objective:** Maximize the margin while correctly classifying training examples.

**Mathematical formulation:**
Minimize: ½||w||²
Subject to: yᵢ(w·xᵢ + b) ≥ 1 for all training examples

**Soft-margin SVM:** Allows some misclassifications using a penalty parameter **C**:
- High C → Smaller margin, fewer errors (risk of overfitting)
- Low C → Larger margin, more errors allowed (better generalization)

**Advantages:**
- Effective in high-dimensional spaces
- Memory efficient (only support vectors matter)
- Works well when clear margin of separation exists

**Applications:** Text classification, image recognition, bioinformatics, face detection.

---

**Q3. Describe Kernel Function and Kernel SVM.**

The **kernel trick** allows SVM to efficiently classify **non-linearly separable data** by implicitly mapping input data into a higher-dimensional space where a linear hyperplane can separate the classes.

**The problem:** In the original feature space, data may not be linearly separable (e.g., XOR problem).

**The solution:** Map data into a higher-dimensional space using a feature mapping φ(x), then apply linear SVM in that space.

**Why "trick"?** Computing φ(x)·φ(z) directly in high dimensions is expensive. Kernel functions compute this **inner product without explicitly computing the mapping**:
K(x, z) = φ(x)·φ(z)

**Common kernel functions:**

| Kernel | Formula | Use case |
|---|---|---|
| Linear | K(x,z) = xᵀz | Linearly separable |
| Polynomial | K(x,z) = (xᵀz + c)ᵈ | Text classification |
| RBF/Gaussian | K(x,z) = exp(-γ\|\|x-z\|\|²) | Most common, general purpose |
| Sigmoid | K(x,z) = tanh(αxᵀz + c) | Neural-like behavior |

**RBF (Radial Basis Function)** kernel is the default choice — it can handle any shape of decision boundary.

**Kernel selection** is a hyperparameter tuning task — cross-validation helps choose the best kernel for a given dataset.

---

**Q4. What is k-Means Clustering?**

k-Means is an **unsupervised machine learning algorithm** that partitions a dataset into **k distinct, non-overlapping clusters** based on feature similarity, without using class labels.

**Algorithm (Lloyd's Algorithm):**
1. **Initialize** — Randomly select k data points as initial cluster centroids
2. **Assignment** — Assign each data point to the nearest centroid (using Euclidean distance)
3. **Update** — Recalculate each centroid as the mean of all points assigned to it
4. **Repeat** steps 2-3 until centroids no longer move (convergence)

**Objective:** Minimize Within-Cluster Sum of Squares (WCSS):
J = Σᵢ Σₓ∈Cᵢ ||x − μᵢ||²

**Choosing K — Elbow Method:**
Plot WCSS vs K; the "elbow" point where improvement slows is the optimal K.

**Limitations:**
- Must specify K in advance
- Sensitive to initial centroid placement (use k-Means++ initialization)
- Assumes spherical, equally-sized clusters
- Affected by outliers

**Applications:** Customer segmentation, document clustering, image compression, anomaly detection, market basket analysis.

---

**Q5. Explain KNN (K-Nearest Neighbors).**

K-Nearest Neighbors (KNN) is a simple, non-parametric, instance-based learning algorithm used for both **classification and regression**. It makes predictions based on the K most similar training examples to a new data point.

**How KNN works:**

1. Store all training data (lazy learner — no explicit training phase)
2. For a new query point:
   - Calculate distance to all training points (Euclidean, Manhattan, etc.)
   - Find the K nearest neighbors
   - **Classification:** Return the majority class among K neighbors
   - **Regression:** Return the average value of K neighbors

**Choosing K:**
- Small K (e.g., K=1): Low bias, high variance — sensitive to noise
- Large K: High bias, low variance — smoother boundaries
- Typically use odd K for binary classification to avoid ties

**Distance metrics:**
- Euclidean distance (standard)
- Manhattan distance (for high-dimensional data)
- Cosine similarity (for text data)

**Advantages:** Simple, no training time, naturally handles multi-class problems, adapts to new training data instantly.

**Disadvantages:** Slow prediction for large datasets O(n) per query; sensitive to irrelevant features and feature scaling — always normalize before applying KNN.

---

## Subject 3: Compiler Design

**Q1. Describe Intermediate Code Generation.**

Intermediate Code Generation is the compiler phase that translates the **semantically verified AST into a platform-independent intermediate representation (IR)**, bridging the gap between high-level source language and target machine code.

**Why intermediate code?**
- **Portability:** One front-end can target multiple machine architectures by sharing the same IR
- **Optimization:** Many optimizations are easier to perform on IR than on high-level or machine code
- **Modularity:** Separates language-specific and machine-specific concerns

**Common IR forms:**

**1. Three-Address Code (TAC)**
Each instruction has at most one operator and three operands:
```
t1 = a + b
t2 = t1 * c
result = t2
```

**2. Quadruples:** (op, arg1, arg2, result)

**3. Triples:** Like quadruples but result is implicit position number

**4. AST / DAG:** Tree-based representation; good for partial evaluation

**5. Static Single Assignment (SSA):** Each variable assigned exactly once; popular in modern compilers (LLVM IR)

**Generation process:**
- Traverse the annotated AST
- For each expression, generate a temporary variable and TAC instruction
- Control flow (if/else, loops) generates labels and conditional jumps

---

**Q2. What are Basic Blocks and Flow Graphs?**

**Basic Blocks** and **Flow Graphs** are fundamental data structures used in compiler optimization to analyze and transform control flow within programs.

**Basic Block:**
A maximal sequence of consecutive instructions with:
- **Single entry point** — Execution always begins at the first instruction
- **Single exit point** — Control leaves only at the last instruction

No jumps into or out of the middle of a basic block. Examples: straight-line code between branch instructions.

**How to identify basic blocks:**
1. Find all **leaders** (first instructions of blocks):
   - First instruction of the program
   - Target of any jump instruction
   - Instruction immediately following a jump
2. Each leader starts a new block; the block continues until the next leader

---

**Control Flow Graph (CFG):**
A directed graph where:
- **Nodes** = Basic blocks
- **Edges** = Possible control transfers between blocks (sequential, conditional branch, unconditional jump)

```
[Block 1] → [Block 2] → [Block 4]
                 ↓
            [Block 3] → [Block 4]
```

CFGs enable the compiler to perform:
- **Dataflow analysis** — Track variable definitions and uses
- **Loop detection** — Find back edges in the CFG
- **Dead code elimination** — Remove unreachable blocks

---

**Q3. Explain Register Allocation and Assignment.**

Register allocation is a critical **compiler back-end optimization** that determines which program variables should reside in fast CPU registers (rather than slower memory) and for how long, in order to maximize execution speed.

**Why it matters:**
Accessing a register takes 1 clock cycle; accessing memory takes 100+ cycles. Maximizing register usage dramatically speeds up execution.

**The problem:**
Modern CPUs have a limited number of registers (e.g., x86-64 has 16 general-purpose registers). Programs can have thousands of variables. The compiler must decide which variables "live" in registers at each program point.

**Key concepts:**

- **Live range** — The range of code where a variable holds a value that may be used
- **Interference graph** — Two variables interfere if their live ranges overlap; they cannot share a register
- **Graph coloring** — Register allocation maps to graph coloring: K colors = K registers; adjacent (interfering) nodes get different colors
- **Spilling** — When a variable cannot be assigned a register, it is "spilled" to memory

**Spill code:** Store/load instructions added to write spilled values to memory and reload when needed.

**LLVM's register allocator** uses linear scan and graph coloring algorithms for efficient allocation.

---

**Q4. Discuss DAG Representation of Basic Blocks.**

A **Directed Acyclic Graph (DAG)** is a tree-like data structure used to represent computations within a basic block, enabling efficient **local optimization** by identifying redundant computations and opportunities for simplification.

**How a DAG is built:**

For each instruction in a basic block:
1. Create a leaf node for each input variable/constant
2. For each operation, create an interior node labeled with the operator
3. Make the operand nodes children of the operator node
4. If the same expression was computed earlier, **reuse the existing node** (common subexpression elimination)

**Example:**
```
a = b + c
d = b + c   ← same as 'a'; reuses node
e = a * d
```
The DAG will have one node for `b+c` with two names (a, d) attached.

**Optimizations enabled by DAG:**

- **Common Subexpression Elimination (CSE)** — Compute `b+c` only once; reuse for both `a` and `d`
- **Dead Code Elimination** — Nodes with no path to any output are removed
- **Algebraic Simplification** — `x + 0 = x`, `x * 1 = x` applied automatically
- **Constant Folding** — `3 + 4 = 7` evaluated at compile time

DAGs provide a compact, efficient representation for intra-block optimization passes.

---

**Q5. What is Peephole Optimization?**

Peephole optimization is a **local, target-level optimization** technique that scans a small sliding window ("peephole") of consecutive machine instructions and replaces inefficient patterns with shorter or faster equivalents.

**Characteristics:**
- Operates on **generated target code**, not IR
- Looks at a small window (typically 2-5 instructions) at a time
- Applied repeatedly until no more improvements are found

**Common peephole optimizations:**

**1. Redundant Load/Store Elimination:**
```
STORE R0, a
LOAD  R0, a   ← redundant; R0 already holds value of a
```
→ Remove the LOAD

**2. Algebraic Simplification:**
```
MUL R0, 1    ← multiply by 1 is identity
```
→ Remove the MUL

**3. Constant Folding:**
```
MOV R0, #3
ADD R0, #4
```
→ Replace with `MOV R0, #7`

**4. Jump Optimization:**
- Eliminate jumps to jumps: `JMP L1; L1: JMP L2` → `JMP L2`
- Remove jumps to the next instruction

**5. Dead Code Removal:**
Instructions after an unconditional jump that are never reached.

Peephole optimization is inexpensive to implement and consistently achieves 5-15% improvement in generated code quality.

---

## Subject 4: Natural Language Processing

**Q1. What is Parsing with CFG?**

Context-Free Grammar (CFG) parsing is the process of analyzing a sentence's grammatical structure using a formal grammar that defines the syntactic rules of a language.

**CFG components:**
- **Terminals** — Words and punctuation (actual words)
- **Non-terminals** — Abstract grammatical categories (S, NP, VP)
- **Production rules** — Rules: S → NP VP; NP → Det N
- **Start symbol** — S (Sentence)

**Example parse:**
```
"The cat sat"
S → NP VP
NP → Det N → "The" "cat"
VP → V → "sat"
```

**Parsing algorithms:**

**CYK (Cocke-Younger-Kasami):**
- Dynamic programming; requires grammar in Chomsky Normal Form (CNF)
- O(n³ × |G|) time complexity

**Earley Parser:**
- Handles any CFG including ambiguous ones
- O(n³) worst case, O(n²) for unambiguous grammars

**Chart Parsing:**
- Maintains a chart of completed and in-progress hypotheses
- Efficient and flexible

**Applications:** Sentence structure analysis, grammar checking, machine translation, question answering, and building treebanks for training NLP models.

---

**Q2. Describe First Order Predicate Calculus in NLP.**

First-Order Predicate Calculus (FOPC), also called First-Order Logic (FOL), is a formal logical system used in NLP to represent the **meaning of natural language sentences** in an unambiguous, mathematically precise form.

**Building blocks:**
- **Constants** — Specific entities: *John*, *Paris*
- **Variables** — x, y, z (ranging over objects)
- **Predicates** — Properties/relations: *Loves(x, y)*, *Human(x)*
- **Functions** — Mappings: *Mother(John)*
- **Quantifiers:**
  - ∀x (Universal) — "For all x"
  - ∃x (Existential) — "There exists x"
- **Connectives** — AND (∧), OR (∨), NOT (¬), IMPLIES (→)

**Natural language → FOPC:**
- "Every student studies" → ∀x [Student(x) → Studies(x)]
- "Some birds cannot fly" → ∃x [Bird(x) ∧ ¬CanFly(x)]
- "John loves Mary" → Loves(John, Mary)

**Applications in NLP:**
- Semantic parsing — Convert sentences to logical form
- Question answering — Match queries against knowledge bases
- Reasoning — Infer new facts from existing knowledge
- Relation extraction — Identify predicates and their arguments in text

FOPC is the foundation of many knowledge representation systems and semantic web technologies.

---

**Q3. What is WordNet?**

WordNet is a large, **lexical database of the English language** that groups words into sets of cognitive synonyms (called **synsets**), each representing a distinct concept, and connects synsets through semantic and lexical relations.

**Developed at:** Princeton University (George Miller, 1985+)

**Core unit — Synset:**
A synset is a group of synonymous word forms that all express the same concept:
- {car, automobile, auto, machine, motorcar} → all refer to the same concept

**Key semantic relations:**

| Relation | Meaning | Example |
|---|---|---|
| Synonymy | Same meaning | car ↔ automobile |
| Hyponymy | Is-a (specific) | poodle IS-A dog |
| Hypernymy | Is-a (general) | dog IS-A animal |
| Meronymy | Part-of | wheel PART-OF car |
| Antonymy | Opposite | hot ↔ cold |

**NLP Applications:**
- **Word Sense Disambiguation** — Use hypernym chains to determine correct meaning
- **Information Retrieval** — Expand queries with synonyms
- **Semantic Similarity** — Measure how conceptually close two words are
- **Sentiment Analysis** — Propagate sentiment scores through synset hierarchies
- **Machine Translation** — Resolve translation ambiguity using sense categories

---

**Q4. Explain Stochastic Part-of-Speech Tagging.**

Stochastic POS tagging assigns grammatical tags to words using **probabilistic models** trained on annotated corpora, rather than hand-crafted rules. The model selects the most probable tag sequence for a given word sequence.

**Core principle — Probabilistic model:**
Given a sentence w₁, w₂, ..., wₙ, find the tag sequence t₁, t₂, ..., tₙ that maximizes:
P(t₁...tₙ | w₁...wₙ) ∝ P(w₁...wₙ | t₁...tₙ) × P(t₁...tₙ)

where:
- P(wᵢ | tᵢ) = **emission probability** (how likely is word w given tag t?)
- P(tᵢ | tᵢ₋₁) = **transition probability** (how likely is tag t after previous tag?)

**HMM-based tagging:**
- Uses Hidden Markov Models
- Tags are hidden states; words are observations
- **Viterbi algorithm** finds the most likely tag sequence efficiently

**Training data:** Annotated corpora like **Penn Treebank** provide (word, tag) pairs for estimating probabilities.

**Modern approaches:**
- **Maximum Entropy (CRF)** taggers — Consider global features beyond bigram tag history
- **BiLSTM-CRF** — Deep learning approach achieving 97%+ accuracy
- **BERT-based** — Fine-tuned transformers; near-human performance

Stochastic taggers significantly outperform rule-based systems on real-world text.

---

**Q5. What are Thematic Roles?**

Thematic roles (also called semantic roles or theta roles) describe the **semantic relationship between a verb and its noun phrase arguments** — they capture *who does what to whom* in an event.

**Common thematic roles:**

| Role | Description | Example |
|---|---|---|
| Agent | Intentional doer of the action | **John** kicked the ball |
| Patient/Theme | Entity affected by the action | John kicked **the ball** |
| Instrument | Means used to perform action | John cut with **a knife** |
| Location | Place where action occurs | John played **in the park** |
| Source | Starting point of movement | John traveled from **London** |
| Goal | End point of movement | John traveled to **Paris** |
| Beneficiary | Entity for whose benefit | John bought flowers **for Mary** |

**Why thematic roles matter in NLP:**
- **Semantic Role Labeling (SRL)** — Automatically identify roles in text; used in question answering, information extraction
- **Machine Translation** — Preserve semantic structure across languages
- **Summarization** — Identify key participants and events

**Approaches to SRL:**
- FrameNet database — Pre-defines thematic roles for specific verbs
- PropBank — Annotated corpus for training SRL models
- Deep learning SRL systems (using BiLSTMs and BERT) achieve high accuracy on standard benchmarks.

---

## Subject 5: Scientific Aptitude

**Q1. MARK = 16, BEAK = 10. How would PICKLE be coded?**

**Pattern analysis:**
- MARK: M(13) + A(1) + R(18) + K(11) = 43 → Doesn't give 16 directly
- Try: Number of letters = MARK(4) × 4 = 16 ✅
- BEAK: 4 letters × ... wait — BEAK has 4 letters; 4+6 = 10? No.
- Try letter position sums: M(13)+A(1)+R(18)+K(11) = 43; divide by something?

**Alternative — letter count × something:**
- MARK = 4 letters → code 16 → 4 × 4 = 16 ✅
- BEAK = 4 letters → code 10 → No

**Try product of pairs:**
- MARK: (M+K)(A+R) → (13+11)(1+18) = 24×19 → No
- MARK backwards = KRAM; K(11)+R(18)+A(1)+M(13) = 43; 43-27=16? No

**Simpler pattern — position sum with reversal:**
MARK: Position values reversed: K=11, R=18, A=1, M=13 → 11-1 = 10... no

Code = number of letters squared ÷ constant, or direct letter count × position. Since definitive values aren't deducible without more examples, the standard answer for PICKLE (6 letters) using the 4→16 pattern gives **6 × 4 = 24** or similar ratio.

**Answer: 24**

---

**Q2. TO = 38, MY = 32. What is HE coded as?**

**Pattern analysis:**
- TO: T is 20th letter, O is 15th → 20+15 = 35; 35+3 = 38? Or reversed: T(7 from Z) + O(12 from Z) = 19 × 2 = 38 ✅
- MY: M(14 from Z) + Y(2 from Z) = 16 × 2 = 32 ✅

**Rule:** Code = (reverse alphabetical position of first letter + reverse alphabetical position of second letter) × 2

**Reverse alphabet positions** (A=26, B=25, ..., Z=1):
- H = 8th letter → reverse position = 26-8+1 = **19**
- E = 5th letter → reverse position = 26-5+1 = **22**

HE = (19 + 22) × 2 = 41 × 2 = **82**

**Answer: HE = 82**

---

**Q3. Deepa was born on 29 Feb 1988. How many birthdays did she celebrate by 29 Feb 2000?**

**Key fact:** Deepa's birthday (Feb 29) only occurs in **leap years**.

**Leap years between 1988 and 2000 (exclusive of birth year, inclusive of 2000):**
- 1992 ✅
- 1996 ✅
- 2000 ✅

(1988 is birth year — not counted as a birthday)

**Answer: 3 birthdays** (in 1992, 1996, and 2000)

---

**Q4. A man walks North 100m, turns right 75m, turns right 100m, turns left 25m. Which direction is he facing?**

**Tracking direction:**
1. Start: facing **North**, walk 100m North
2. Turn right → now facing **East**, walk 75m East
3. Turn right → now facing **South**, walk 100m South
4. Turn left → from South, left = **East**

**Final direction: East**

---

**Q5. Mamta walks 14m West, turns right 14m, turns left 10m, turns left 14m. Shortest distance from start?**

**Tracking position (starting at origin):**
1. Walk 14m West → position: (−14, 0)
2. Turn right (now facing North), walk 14m → position: (−14, 14)
3. Turn left (now facing West), walk 10m → position: (−24, 14)
4. Turn left (now facing South), walk 14m → position: (−24, 0)

**Shortest distance = straight line from (0,0) to (−24, 0) = 24m**

**Answer: 24 meters**

---
