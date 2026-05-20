# NLP — Solved Questions: Modules 3 & 4
**HMM, Speech Recognition, POS Tagging, Syntax & Semantic Processing**

---

# Q.3(A) — HMM and Viterbi Algorithm [5 Marks]

## Answer:

### Hidden Markov Model (HMM):

An **HMM** is a statistical model representing a system with **hidden states** that produce observable outputs.

**Components (λ = A, B, π):**
- **Q** = {q₁, q₂, ..., qN} — Hidden states (e.g., POS tags)
- **A** = Transition matrix: A[i][j] = P(qⱼ | qᵢ)
- **B** = Emission matrix: B[j][k] = P(oₖ | qⱼ)
- **π** = Initial state probabilities: π[i] = P(q₁ = qᵢ)
- **O** = Observation sequence (e.g., words)

**Markov Assumption:** P(qᵢ | q₁,...,qᵢ₋₁) = P(qᵢ | qᵢ₋₁)

---

### Three Problems of HMM:

| Problem | Task | Algorithm |
|---------|------|-----------|
| **Evaluation** | P(O \| λ) = ? | Forward Algorithm |
| **Decoding** | Best state sequence for O | **Viterbi Algorithm** |
| **Learning** | Best A, B, π for O | Baum-Welch (EM) |

---

### Viterbi Algorithm:

Finds the **most likely sequence of hidden states** given observations. Uses **dynamic programming**.

**Define:** vₜ(j) = probability of best path ending in state j at time t.

**Initialization (t=1):**
```
v₁(j) = π(j) × B(j, o₁)
```

**Recursion (t > 1):**
```
vₜ(j) = max_i [vₜ₋₁(i) × A(i,j)] × B(j, oₜ)
bₜ(j) = argmax_i [vₜ₋₁(i) × A(i,j)]   ← backpointer
```

**Termination:**
```
P* = max_j vT(j)
q*T = argmax_j vT(j)
```

**Backtrack** using backpointers to recover the best state sequence.

---

### Example — POS Tagging:

**Sentence:** "Janet will back the bill"
**States:** NNP, MD, VB, DT, NN

Steps:
1. Initialize: v₁(NNP) = π(NNP) × P("Janet" | NNP)
2. For each word: compute vₜ using transition × emission.
3. Backtrack to find best tag sequence.

**Result:** Janet/NNP will/MD back/VB the/DT bill/NN

---

# Q.3(B) — Acoustic Processing of Speech [5 Marks]

## Answer:

### What is Acoustic Processing?

The process of converting a **raw audio waveform** into meaningful feature representations for speech recognition.

---

### Steps in Acoustic Processing:

#### Step 1: Pre-emphasis
- Boost high-frequency components.
- **Formula:** y[n] = x[n] − α × x[n−1] (α ≈ 0.97)
- **Purpose:** Compensates for natural high-frequency roll-off in speech.

#### Step 2: Framing
- Divide the speech signal into short **overlapping frames**.
- **Frame length:** 20–25 ms
- **Frame shift:** 10 ms (50% overlap)
- **Reason:** Speech is stationary within a short frame.

#### Step 3: Windowing
- Apply a **Hamming window** to each frame to reduce spectral leakage.
- **Formula:** w[n] = 0.54 − 0.46 × cos(2πn / (N−1))

#### Step 4: FFT (Fast Fourier Transform)
- Convert time-domain frame → **frequency-domain spectrum**.
- Shows which frequencies are present in the speech frame.

#### Step 5: Mel Filter Bank
- Apply triangular filters spaced on the **Mel scale**.
- Mimics human auditory perception (more sensitive to low frequencies).
- **Mel(f) = 2595 × log₁₀(1 + f/700)**

#### Step 6: Log Energy
- Take the logarithm of each filter bank output.

#### Step 7: DCT (Discrete Cosine Transform)
- Convert log filter bank energies → **MFCCs** (Mel-Frequency Cepstral Coefficients).
- Typically use first 12–13 coefficients.

#### Step 8: Delta Features
- Compute first derivatives (delta) and second derivatives (delta-delta) of MFCCs.
- **Final feature vector:** 39 dimensions (13 + 13 + 13).

---

### Summary Diagram:
```
Audio Signal
  → Pre-emphasis
  → Framing (20ms)
  → Hamming Window
  → FFT
  → Mel Filter Bank
  → Log Energy
  → DCT
  → MFCC (13 coefficients)
  → Delta + Delta-Delta
  → 39-dim Feature Vector
```

---

# Q.3(C) — POS Tagging: Rule-Based, Stochastic, TBL [5 Marks]

## Answer:

**POS Tagging** assigns a grammatical category (NN, VB, JJ, etc.) to each word in a sentence.

---

### 1. Rule-Based POS Tagging

Uses **manually written linguistic rules**.

**Approach:**
1. Look up all possible POS tags for each word in dictionary.
2. Apply rules to eliminate incorrect tags.

**Types of Rules:**
- **Context-free:** "Words ending in -ing are VBG."
- **Contextual:** "If the previous tag is DT and word ends in -ing, tag as NN."

**Example:**
- "Running is fun." → Running = NN (rule: after sentence start, -ing before verb = NN)
- "She is running." → Running = VBG (rule: after auxiliary verb)

**Advantage:** Interpretable | **Disadvantage:** Expensive to build, brittle.

---

### 2. Stochastic POS Tagging (HMM-based)

Uses **probability models** trained on annotated corpora.

**Model:**
- States = POS tags
- Observations = Words
- Find: T* = argmax_T P(T|W)

$$T^* = \arg\max_T \prod P(w_i|t_i) \times \prod P(t_i|t_{i-1})$$

**Training:**
- P(tᵢ|tᵢ₋₁) = Count(tᵢ₋₁, tᵢ) / Count(tᵢ₋₁)
- P(wᵢ|tᵢ) = Count(tᵢ, wᵢ) / Count(tᵢ)

**Decoding:** Viterbi algorithm.

**Advantage:** Data-driven | **Disadvantage:** Needs annotated corpus, black box.

---

### 3. Transformation-Based (Brill) Tagging

Combines rule-based and statistical — learns rules from data.

**Phase 1 — Initial Tagging:**
- Assign most frequent POS tag for each word.
- Unknown words → assign most common tag (NN).

**Phase 2 — Rule Learning:**
1. Compare initial tags with correct tags in training data.
2. Find the rule that corrects the most errors.
3. Apply rule. Repeat until convergence.

**Example Rules Learned:**
- "Change NN to VB if previous tag is TO" → (to run → run=VB)
- "Change VB to NN if previous tag is DT" → (the run → run=NN)

**Advantage:** Interpretable + high accuracy | **Disadvantage:** Slow training.

---

### Comparison Table:

| Method | Accuracy | Interpretable | Data Needed |
|--------|----------|---------------|-------------|
| Rule-based | ~96% | Yes | No |
| Stochastic (HMM) | ~96-97% | No | Yes |
| TBL (Brill) | ~97-98% | Partially | Yes |
| Neural (Modern) | ~98%+ | No | Large |

---

# Q.4(A) — CKY Parsing and Earley Parser [5 Marks]

## Answer:

## A. CKY (Cocke-Kasami-Younger) Parsing

A **bottom-up, chart-based** parsing algorithm using dynamic programming.

### Requires: Chomsky Normal Form (CNF)
Every rule must be:
- A → B C (two non-terminals), OR
- A → a (one terminal)

### Converting to CNF:
- VP → V NP PP → VP → V X₁, X₁ → NP PP

### CKY Algorithm:

**Fill table T where T[i][j] = set of non-terminals spanning words i to j.**

```
Initialization: T[i][i+1] = {POS tags of word i}

For length l = 2 to n:
  For start i = 1 to n-l:
    j = i + l
    For split k = i+1 to j-1:
      For each rule A → B C:
        If B ∈ T[i][k] AND C ∈ T[k][j]:
          Add A to T[i][j]
```

### Example: "She eats fish"

|  | She | eats | fish |
|--|-----|------|------|
| **She** | NP | S | S |
| **eats** | — | VP | VP |
| **fish** | — | — | NP |

T[1][3] contains **S** → sentence is **grammatical**.

**Complexity:** O(n³ × |G|)

---

## B. Earley Parser

A **top-down chart parser** that works with **any CFG** (no CNF needed).

### Earley Item (Dotted Rule):
[A → α • β, i] = parsing A starting at position i, have seen α, still need β.

### Three Operations:

#### Predictor:
When dot is before non-terminal B:
- Add all rules for B.
- [A → α • B β, i] → Add [B → • γ, j] for all B → γ

#### Scanner:
When dot is before terminal matching current word:
- Advance the dot.
- [A → α • wⱼ β, i] → [A → α wⱼ • β, i]

#### Completer:
When a rule is complete (dot at end):
- Advance dot in waiting parent rules.
- [B → γ •, j] completes [A → α • B β, i] → [A → α B • β, i]

### Comparison — CKY vs. Earley:

| Feature | CKY | Earley |
|---------|-----|--------|
| Grammar Form | CNF required | Any CFG |
| Direction | Bottom-up | Top-down + Bottom-up |
| Left Recursion | Handled (via CNF) | Directly handled |
| Complexity | O(n³) | O(n³) general |

---

# Q.4(B) — First Order Predicate Calculus (FOPC) [5 Marks]

## Answer:

**FOPC (First-Order Logic)** is the formal system used to represent the meaning of natural language sentences in NLP.

---

### Components of FOPC:

#### 1. Constants
- Refer to specific individuals.
- Examples: John, Mary, London, 5

#### 2. Variables
- Can refer to any individual.
- Examples: x, y, z

#### 3. Predicates
- Express properties or relations.
- Examples: Dog(x), Loves(John, Mary), Happy(x)

#### 4. Functions
- Map individuals to individuals.
- Example: FatherOf(John)

#### 5. Logical Connectives:

| Symbol | Meaning |
|--------|---------|
| ¬ | NOT |
| ∧ | AND |
| ∨ | OR |
| → | IF...THEN |
| ↔ | IF AND ONLY IF |

#### 6. Quantifiers:
- **Universal (∀):** "For all x..." — ∀x Dog(x) → HasTail(x)
- **Existential (∃):** "There exists x..." — ∃x Cat(x) ∧ Black(x)

---

### Examples:

| English Sentence | FOPC Representation |
|-----------------|---------------------|
| "John loves Mary" | Loves(John, Mary) |
| "Every dog has a tail" | ∀x Dog(x) → HasTail(x) |
| "Some cats are black" | ∃x Cat(x) ∧ Black(x) |
| "John doesn't love Mary" | ¬Loves(John, Mary) |
| "John loves Mary and Bill" | Loves(John,Mary) ∧ Loves(John,Bill) |
| "If it rains, the road is wet" | Rains() → Wet(Road) |
| "Someone called" | ∃x Person(x) ∧ Called(x) |

---

### Thematic Roles:

Describe relationship between a verb and its arguments.

| Role | Description | Example |
|------|-------------|---------|
| **Agent** | Doer of action | **John** kicked the ball |
| **Patient** | Receives the action | John kicked **the ball** |
| **Instrument** | Means of action | Cut bread **with a knife** |
| **Location** | Place of action | Works **in London** |
| **Goal** | Destination | Moved **to Tokyo** |
| **Source** | Origin | Flew **from Paris** |
| **Experiencer** | Mental state entity | **Mary** fears spiders |
| **Beneficiary** | Who benefits | Baked cake **for John** |

**Example:** "Mary broke the vase with a hammer"
- Agent: Mary | Patient: vase | Instrument: hammer

---

# Q.4(C) — WordNet and Lexical Semantics [5 Marks]

## Answer:

### WordNet:

**WordNet** is a large lexical database of English developed at Princeton University. It groups words into sets of cognitive synonyms called **synsets**.

---

### Key Concepts:

#### Synset
- A group of synonymous words representing a single concept.
- Each synset has a **gloss** (definition) and example sentences.
- **Example:** {car, auto, automobile, motorcar} → same concept

#### Semantic Relations in WordNet:

| Relation | Description | Example |
|----------|-------------|---------|
| **Hypernymy** | IS-A (general) | animal → dog |
| **Hyponymy** | IS-A (specific) | dog → animal |
| **Meronymy** | Part-of | wheel → car |
| **Holonymy** | Has-part | car → wheel |
| **Antonymy** | Opposites | good ↔ bad |
| **Entailment** | Verb implies | snore → sleep |

#### WordNet Hierarchy:
```
entity → physical entity → object → artifact → vehicle → car
                                                          ├── sedan
                                                          ├── SUV
                                                          └── sports car
```

### Applications of WordNet:
- Word Sense Disambiguation
- Query expansion in IR
- Semantic similarity measurement
- Machine Translation

---

### Primitive Decomposition (Schank's CD Theory):

Words are broken into **universal semantic primitives**.

| Primitive | Meaning | Example |
|-----------|---------|---------|
| **ATRANS** | Abstract transfer | give, take, buy |
| **PTRANS** | Physical movement | go, move, fly |
| **MTRANS** | Mental transfer | tell, learn, read |
| **INGEST** | Take into body | eat, drink |
| **SPEAK** | Produce speech | say, tell |
| **MOVE** | Body part movement | kick, wave |

**Example:**
- "John gave Mary a book" → ATRANS(Object:book, From:John, To:Mary)
- "Mary ate the pizza" → INGEST(Actor:Mary, Object:pizza)
