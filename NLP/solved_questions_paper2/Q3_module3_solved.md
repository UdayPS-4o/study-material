# Q3 Solved — Module 3: HMM, Viterbi, Feature Extraction, POS Tagging
**IPS Academy | PCC-CL13/PEC-C101(C) | June 2025**

---

## Q.3(i) — MCQ [1 Mark]

**Which algorithm is commonly used to find the most likely sequence of hidden states in an HMM?**

- A) **Viterbi Algorithm ✅**
- B) Dijkstra's Algorithm
- C) PageRank Algorithm
- D) Expectation-Maximization Algorithm

**Answer: A) Viterbi Algorithm**

**Explanation:**
The **Viterbi Algorithm** solves the **decoding problem** of HMMs — finding the most probable sequence of hidden states (e.g., POS tags) given a sequence of observations (e.g., words). It uses **dynamic programming** to efficiently compute the solution.

- Dijkstra's = shortest path in graphs.
- PageRank = web page ranking.
- EM (Baum-Welch) = used for **training** HMM parameters, not decoding.

---

## Q.3(ii) — MCQ [1 Mark]

**Which of the following is a stochastic method used for Part-of-Speech (POS) tagging?**

- A) Brill's Tagger
- B) **Hidden Markov Model (HMM) Tagging ✅**
- C) Rule-Based Tagging
- D) Context-Free Grammar (CFG)

**Answer: B) Hidden Markov Model (HMM) Tagging**

**Explanation:**
**HMM-based tagging** is a **stochastic (probabilistic)** approach — it uses statistical probabilities (transition and emission) to assign POS tags.
- Brill's Tagger = Transformation-based (hybrid, learns rules from data).
- Rule-based = hand-crafted deterministic rules.
- CFG = for syntactic parsing, not POS tagging.

---

## Q.3(iii) — Describe Feature Extraction [4 Marks]

### What is Feature Extraction in Speech Processing?

**Feature extraction** is the process of converting a **raw speech signal** into a compact, meaningful **numerical representation** (feature vector) suitable for machine learning models like HMMs.

---

### Why Feature Extraction is Needed:
- Raw waveform has very high dimensionality and contains irrelevant noise.
- Need a representation that captures **phonetic information**.
- Features should be **robust** to noise, channel distortion, and speaker variation.

---

### Steps of Feature Extraction (MFCC):

The most widely used features in speech recognition are **Mel-Frequency Cepstral Coefficients (MFCCs)**.

#### Step 1: Pre-emphasis
- Boost high-frequency content of the signal.
- **Formula:** y[n] = x[n] − α × x[n−1] (α ≈ 0.97)
- Compensates for the natural attenuation of high frequencies in speech.

#### Step 2: Framing
- Divide the signal into short overlapping **frames**.
- Frame length: **20–25 ms** (speech is approximately stationary within this window).
- Frame shift: **10 ms** (frames overlap by 50%).

#### Step 3: Windowing (Hamming Window)
- Apply Hamming window to each frame to reduce spectral leakage at frame edges.
- **Formula:** w[n] = 0.54 − 0.46 × cos(2πn / (N−1))

#### Step 4: Fast Fourier Transform (FFT)
- Convert time-domain frame to **frequency-domain spectrum**.
- Shows amplitude at each frequency.

#### Step 5: Mel Filter Bank
- Apply 20–40 triangular bandpass filters spaced on the **Mel scale**.
- Mel scale mimics human auditory perception (logarithmic at high frequencies).
- **Mel formula:** Mel(f) = 2595 × log₁₀(1 + f/700)

#### Step 6: Log Energy
- Take the **logarithm** of each filter bank output.
- Mimics the logarithmic sensitivity of human hearing.

#### Step 7: Discrete Cosine Transform (DCT)
- Decorrelates the filter bank outputs.
- Produces **MFCCs** — the final feature coefficients.
- Typically use first **12–13 coefficients**.

#### Step 8: Delta and Delta-Delta Features
- Compute **first derivative** (delta = change over time) of MFCCs.
- Compute **second derivative** (delta-delta = acceleration).
- **Final feature vector:** 39 dimensions (13 MFCCs + 13 Δ + 13 ΔΔ).

---

### Summary Pipeline:
```
Raw Audio → Pre-emphasis → Framing → Hamming Window
          → FFT → Mel Filter Bank → Log → DCT → MFCCs
          → Delta + Delta-Delta → 39-dim feature vector
```

---

### Other Features Used:
- **Pitch (F0):** Fundamental frequency, important for tonal languages.
- **Energy:** Log energy of each frame.
- **Linear Predictive Coding (LPC):** Models vocal tract as a filter.
- **Perceptual Linear Prediction (PLP):** Psychoacoustically motivated features.

---

## Q.3(iv) — Viterbi Algorithm in Decoding Speech Signals [6 Marks]

### Overview:

The **Viterbi Algorithm** is a **dynamic programming** algorithm used to find the **most likely sequence of hidden states** in an HMM, given a sequence of observations. In speech recognition, it decodes the best phoneme/word sequence from acoustic features.

---

### HMM Framework for Speech:

In **Automatic Speech Recognition (ASR)**:
- **Hidden states (Q):** Phonemes or words being spoken.
- **Observations (O):** MFCC feature vectors extracted from audio.
- **Goal:** Find the most probable sequence of phonemes/words.

**Decoding equation:**
$$W^* = \arg\max_W P(W|O) = \arg\max_W \underbrace{P(O|W)}_{\text{Acoustic Model}} \times \underbrace{P(W)}_{\text{Language Model}}$$

---

### Viterbi Algorithm — Step by Step:

**Define:** vₜ(j) = probability of the **most likely path** ending in state j at time t.
**Define:** bₜ(j) = **backpointer** to previous state in most likely path.

#### Initialization (t = 1):
$$v_1(j) = \pi(j) \times B(j, o_1)$$
- π(j) = initial probability of state j
- B(j, o₁) = probability of emitting observation o₁ from state j

#### Recursion (t = 2, 3, ..., T):
$$v_t(j) = \max_{i} \left[ v_{t-1}(i) \times A(i,j) \right] \times B(j, o_t)$$
$$b_t(j) = \arg\max_{i} \left[ v_{t-1}(i) \times A(i,j) \right]$$

#### Termination:
$$P^* = \max_j v_T(j)$$
$$q_T^* = \arg\max_j v_T(j)$$

#### Backtracking:
Follow backpointers from q*ₜ back to q*₁ to recover the best state sequence.

---

### Example — POS Tagging (Illustration of Viterbi):

**Sentence:** "Janet will back the bill"
**States (tags):** NNP, MD, VB, DT, NN

**Transition Probabilities A:**
| From \ To | NNP | MD | VB | DT | NN |
|-----------|-----|----|----|----|----|
| START | 0.4 | 0.2 | 0.1 | 0.1 | 0.2 |
| NNP | 0.1 | 0.4 | 0.1 | 0.2 | 0.2 |
| MD | 0.0 | 0.0 | 0.6 | 0.1 | 0.1 |

**Emission Probabilities B:**
- P("Janet"|NNP) = 0.4, P("will"|MD) = 0.5, P("back"|VB) = 0.3

**Viterbi fills the table column by column** (word by word), tracking the best previous state at each step.

**Result:** Janet/NNP will/MD back/VB the/DT bill/NN

---

### Significance of Viterbi in Speech Recognition:

1. **Optimal decoding:** Guarantees finding the globally best path.
2. **Efficient:** Time complexity O(N²T) instead of O(Nᵀ) brute force.
   - N = number of states, T = length of observation sequence.
3. **Used at every level of ASR:** Phoneme decoding, word decoding, sentence decoding.
4. **Beam search variant:** In practice, only top-k paths are kept (beam width) for efficiency.

### Log Probabilities:
- Multiply many small probabilities → numerical underflow.
- **Solution:** Work in log space. Multiplication becomes addition.
- log(a × b) = log(a) + log(b)

---

## OR Q.3(iv) — POS Tagging: Methods with Examples [6 Marks]

### What is POS Tagging?

**Part-of-Speech (POS) Tagging** assigns a **grammatical category** (noun, verb, adjective, etc.) to each word in a sentence.

**Example:** "The cat sat on the mat"
→ The/DT cat/NN sat/VBD on/IN the/DT mat/NN

---

### Common POS Tags (Penn Treebank):

| Tag | Category | Example |
|-----|----------|---------|
| NN | Noun (singular) | cat, dog |
| VB | Verb (base) | run, eat |
| JJ | Adjective | big, red |
| RB | Adverb | quickly |
| DT | Determiner | the, a |
| IN | Preposition | in, on |
| MD | Modal | can, will |

---

### Methods of POS Tagging:

#### 1. Rule-Based Tagging
- Uses manually written linguistic rules.
- **Approach:** Assign all possible tags → use rules to eliminate incorrect ones.
- **Example Rules:**
  - "Words ending in -ing after auxiliary verb → VBG"
  - "Words ending in -ed after DT → JJ (adjective)"
- **Pros:** Interpretable | **Cons:** Expensive, brittle.

#### 2. Stochastic / HMM-Based Tagging
- Uses probability models trained on labeled corpora.
- **Goal:** Find best tag sequence T for word sequence W:
$$T^* = \arg\max_T \prod P(w_i|t_i) \times \prod P(t_i|t_{i-1})$$
- **Emission:** P(word|tag) = How likely is this word given this tag?
- **Transition:** P(tagᵢ|tagᵢ₋₁) = How likely is this tag after the previous tag?
- **Decoding:** Viterbi algorithm.
- **Example:**
  - P("the"|DT) = 0.95 (very high — "the" almost always a determiner)
  - P(NN|DT) = 0.7 (noun usually follows determiner)
- **Pros:** Data-driven, generalizes well | **Cons:** Needs annotated corpus.

#### 3. Transformation-Based (Brill) Tagging
- Learns rules automatically from data (hybrid approach).
- **Phase 1:** Assign most frequent tag to each word.
- **Phase 2:** Iteratively learn correction rules that reduce errors most.
- **Example Learned Rules:**
  - "Change NN to VB if previous word is TO" → (to run → run=VB)
  - "Change VB to NN if previous tag is DT" → (the run → run=NN)
- **Pros:** Interpretable + high accuracy | **Cons:** Slow training.

---

### Comparison:

| Method | Accuracy | Interpretable | Training Data |
|--------|----------|---------------|----------------|
| Rule-based | ~96% | Yes | No |
| HMM (Stochastic) | ~96-97% | No | Yes |
| Brill (TBL) | ~97-98% | Partially | Yes |
| Neural (BiLSTM, BERT) | ~98%+ | No | Large |
