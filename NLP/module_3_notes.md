# Module 3: HMM, Speech Recognition & POS Tagging
**Subject:** Natural Language Processing | **Hours:** 10

---

## 1. Hidden Markov Models (HMM)

**Hidden Markov Model (HMM)** is a statistical model used to represent systems that are assumed to be a **Markov process with hidden states**.

### 1.1 Intuition

Imagine a person behind a wall who tosses coins or rolls dice. You can hear the outcomes (observations) but cannot see which coin/die is being used (hidden states). HMM models this scenario.

In NLP:
- **Hidden States:** The underlying linguistic categories (e.g., POS tags, phonemes).
- **Observations:** The words or acoustic features we observe.

### 1.2 Markov Assumption

In a **Markov chain**, the probability of a state depends only on the **previous state** (first-order Markov assumption):

P(qᵢ | q₁, q₂, ..., qᵢ₋₁) = P(qᵢ | qᵢ₋₁)

### 1.3 Components of HMM

An HMM is defined by:
- **Q = {q₁, q₂, ..., qN}** — Set of N hidden states.
- **A** — Transition probability matrix. A[i][j] = P(qⱼ | qᵢ) = probability of going from state i to state j.
- **B** — Emission probability matrix. B[j][k] = P(oₖ | qⱼ) = probability of emitting observation oₖ from state qⱼ.
- **Π (π)** — Initial state probability. π[i] = P(q₁ = qᵢ) = probability of starting in state i.
- **O = {o₁, o₂, ..., oT}** — Sequence of T observations.

### 1.4 HMM Assumptions:
1. **Limited horizon (Markov):** Current state depends only on previous state.
2. **Stationary:** Transition probabilities don't change over time.
3. **Output independence:** Current observation depends only on current state.

### 1.5 Three Problems of HMM:

| Problem | Description | Algorithm |
|---------|-------------|-----------|
| **Evaluation** | Given model and observations, compute probability of observations | Forward Algorithm |
| **Decoding** | Given model and observations, find the most likely sequence of hidden states | Viterbi Algorithm |
| **Learning** | Given observations, find the best model parameters (A, B, π) | Baum-Welch (EM) Algorithm |

---

## 2. Viterbi Algorithm

The **Viterbi Algorithm** finds the **most likely sequence of hidden states** given a sequence of observations.

### 2.1 Purpose
- Solves the **decoding problem** of HMM.
- Used in speech recognition, POS tagging, and other sequence labeling tasks.

### 2.2 Dynamic Programming Approach

Define:
- **vt(j)** = Probability of the most likely path ending in state j at time t.
- **bt(j)** = The previous state in the most likely path (backpointer).

**Initialization (t=1):**
v₁(j) = π(j) × B(j, o₁)  for all states j

**Recursion (t > 1):**
vt(j) = max_i [vt-1(i) × A(i,j)] × B(j, ot)
bt(j) = argmax_i [vt-1(i) × A(i,j)]

**Termination:**
P* = max_j vT(j)   (best probability)
q*T = argmax_j vT(j)  (best last state)

**Backtracking:** Follow backpointers from q*T back to q*₁.

### 2.3 Example: POS Tagging with HMM

**Sentence:** "Janet will back the bill"
**States:** NNP (Proper Noun), MD (Modal), VB (Verb), DT (Determiner), NN (Noun)

**Steps:**
1. Initialize v₁ for "Janet" = π(state) × P("Janet" | state)
2. For each subsequent word, calculate vt using transition and emission probabilities.
3. Backtrack to find the best state sequence.

### 2.4 Log Probabilities
- To avoid numerical underflow with very small probabilities, compute in log space.
- Multiply → Add in log space.
- log(a × b) = log(a) + log(b)

---

## 3. Acoustic Processing of Speech

**Acoustic processing** is the first step in automatic speech recognition — converting audio signals into features.

### 3.1 Speech Signal Characteristics
- Speech is a time-varying acoustic signal.
- Raw speech: waveform (amplitude vs. time).
- Sampling rate: typically 8kHz (telephone) or 16kHz (studio quality).
- Bit depth: 16-bit samples.

### 3.2 Preprocessing Steps:

#### Pre-emphasis
- Boost high-frequency components of the signal.
- Compensates for the natural roll-off of high frequencies in speech.
- Formula: y[n] = x[n] - α × x[n-1] (α ≈ 0.95 to 0.97)

#### Framing (Windowing)
- Speech is non-stationary (changes over time), so it's analyzed in short frames.
- Frame length: typically 20-25 ms.
- Frame shift: 10 ms (frames overlap).
- Assumption: Within a frame, speech is approximately stationary.

#### Windowing
- Apply a window function (Hamming window) to each frame to reduce spectral leakage.
- Hamming window: w[n] = 0.54 - 0.46 × cos(2πn/(N-1))

---

## 4. Feature Extraction

Converting raw audio frames into meaningful feature vectors for recognition.

### 4.1 Why Feature Extraction?
- Raw waveform is too high-dimensional and noisy.
- Need compact representation that captures relevant information.
- Features should be robust to noise, speaker variation.

### 4.2 Fast Fourier Transform (FFT)
- Converts time-domain signal to frequency-domain.
- Shows which frequencies are present in the signal.
- FFT output is a spectrum showing frequency vs. amplitude.

### 4.3 Mel-Frequency Cepstral Coefficients (MFCC)

**MFCCs** are the most widely used features in speech recognition.

**Steps to compute MFCC:**

1. **Pre-emphasis:** Boost high frequencies.
2. **Framing:** Divide signal into short frames.
3. **Windowing:** Apply Hamming window.
4. **FFT:** Convert to frequency domain.
5. **Mel Filter Bank:** Apply triangular filters spaced on Mel scale.
   - **Mel scale** mimics human auditory perception.
   - Humans are more sensitive to changes at low frequencies.
   - Mel(f) = 2595 × log₁₀(1 + f/700)
6. **Log energy:** Take the log of each filter bank output.
7. **DCT (Discrete Cosine Transform):** Convert to cepstral domain.
   - MFCCs are the output of DCT.
   - Typically, first 12-13 coefficients are used.

### 4.4 Other Features:
- **Delta features:** First derivatives (change over time) of MFCCs.
- **Delta-delta features:** Second derivatives.
- **Pitch (F0):** Fundamental frequency (important for tonal languages).
- **Energy:** Log energy of the frame.

**Final feature vector:** Typically 39-dimensional
(13 MFCCs + 13 delta + 13 delta-delta)

---

## 5. Speech Synthesis

**Speech Synthesis** (Text-to-Speech) is the artificial production of human speech from text input.

### 5.1 Architecture of Speech Synthesis:

```
Text
 ↓
Text Analysis
 - Sentence detection
 - Text normalization (numbers, dates, abbreviations)
 - Tokenization
 ↓
Linguistic Analysis
 - POS tagging
 - Phonetic transcription
 - Syllabification
 - Stress assignment
 ↓
Prosody Generation
 - Duration model
 - Pitch (F0) model
 - Energy model
 ↓
Speech Waveform Generation
 - Concatenative / Parametric / Neural
```

### 5.2 Methods of Speech Synthesis:

#### Concatenative Synthesis
- Records large database of speech units (phonemes, diphones, words).
- Concatenates appropriate units for synthesis.
- Most natural sounding (if database is large enough).
- Requires huge storage.
- Types: Phoneme-based, Diphone-based, Unit selection.

#### Formant Synthesis
- Uses a mathematical model of the vocal tract (source-filter model).
- Generates artificial speech from scratch.
- Compact but sounds robotic.
- Used in early TTS systems.

#### HMM-based Synthesis
- Statistical model generates speech parameters.
- More flexible — can adapt to different voices/styles.
- Moderate quality.

#### Neural TTS (Deep Learning)
- **WaveNet (Google):** CNN-based generative model, extremely high quality.
- **Tacotron:** Sequence-to-sequence model for spectral features.
- **FastSpeech:** Non-autoregressive, faster synthesis.
- State of the art — sounds nearly human.

---

## 6. Part-of-Speech (POS) Tagging

**POS Tagging** (also called **grammatical tagging**) is the process of assigning a **grammatical category (part of speech)** to each word in a sentence.

### 6.1 Common POS Tags (Penn Treebank):

| Tag | Description | Example |
|-----|-------------|---------|
| NN | Noun (singular) | dog, city |
| NNS | Noun (plural) | dogs, cities |
| NNP | Proper Noun (singular) | London, John |
| VB | Verb (base form) | run, eat |
| VBD | Verb (past tense) | ran, ate |
| VBG | Verb (gerund/-ing) | running, eating |
| JJ | Adjective | big, red |
| RB | Adverb | quickly, very |
| DT | Determiner | the, a, an |
| IN | Preposition | in, on, at |
| CC | Coordinating Conjunction | and, but, or |
| PRP | Personal Pronoun | I, he, she |
| MD | Modal | can, will, should |
| CD | Cardinal Number | one, two, 3 |

### 6.2 Importance of POS Tagging:
- Essential preprocessing step for NLP.
- Helps in parsing, information extraction, named entity recognition.
- Disambiguates word senses.
- Example: "bank" as noun vs. verb depends on POS tag.

---

## 7. Rule-Based POS Tagging

**Rule-based tagging** uses manually written rules to assign POS tags.

### 7.1 Approach:
1. Assign all possible POS tags to each word using a dictionary.
2. Apply rules to eliminate incorrect tags.

### 7.2 Types of Rules:

#### Context-Free Rules
- Based on word properties alone.
- Example: Words ending in "-ing" are likely VBG or NN.
- Words ending in "-ed" are likely VBD or JJ.

#### Contextual Rules
- Based on surrounding words.
- Example: If a word follows "the" and ends in "-ing", tag it as NN (not VBG).

### 7.3 The Brill Tagger (Transformation-Based, Hybrid)
- Actually falls between rule-based and stochastic.
- Starts with initial tagging, then learns rules to correct errors.

### 7.4 Advantages and Disadvantages:

| Advantages | Disadvantages |
|-----------|---------------|
| Interpretable | Requires expert knowledge to write rules |
| Linguistically motivated | Hard to maintain (rule conflicts) |
| Good for known words | Poor generalization to new text |
| | Time-consuming to develop |

---

## 8. Stochastic POS Tagging

**Stochastic (probabilistic) tagging** uses statistical models trained on annotated corpora.

### 8.1 HMM-Based POS Tagging

**Most common approach** for stochastic POS tagging.

**Model:**
- **States:** POS tags (NN, VB, DT, etc.)
- **Observations:** Words
- **Transition probabilities A:** P(tag_i | tag_{i-1}) — how likely is one tag to follow another?
- **Emission probabilities B:** P(word | tag) — how likely is a word given a tag?

**Goal:** Find the most likely tag sequence T for a word sequence W.

T* = argmax_T P(T|W)
   = argmax_T P(W|T) × P(T)
   = argmax_T [∏ P(wᵢ|tᵢ)] × [∏ P(tᵢ|tᵢ₋₁)]

**Viterbi algorithm** is used to efficiently find T*.

### 8.2 Training the HMM:

From an annotated corpus:

**Transition Probability:**
P(tᵢ | tᵢ₋₁) = Count(tᵢ₋₁, tᵢ) / Count(tᵢ₋₁)

**Emission Probability:**
P(wᵢ | tᵢ) = Count(tᵢ, wᵢ) / Count(tᵢ)

### 8.3 Handling Unknown Words:
- Words not seen in training corpus.
- Use morphological features (suffixes, prefixes, capitalization).
- Example: Words ending in "-tion" are likely NN.
- Smoothing techniques.

### 8.4 Advantages and Disadvantages:

| Advantages | Disadvantages |
|-----------|---------------|
| No expert knowledge needed | Requires large annotated corpus |
| Can generalize | Black box — not interpretable |
| Good accuracy | Context window is limited |

---

## 9. Transformation-Based POS Tagging (Brill Tagger)

**Transformation-Based Learning (TBL)** or **Brill Tagging** combines the strengths of rule-based and stochastic approaches.

### 9.1 How Brill Tagger Works:

**Phase 1: Initial Tagging**
- Assign the most common POS tag for each word (from training corpus).
- For unknown words, assign the most common tag overall (NN).

**Phase 2: Rule Learning (Iterative)**
1. Start with initial tags.
2. Compare with correct tags in training data.
3. Find the transformation rule that **reduces the most errors**.
4. Apply the rule.
5. Repeat until no improvement or minimum threshold reached.

### 9.2 Types of Transformation Rules:
- "Change tag A to tag B if the previous word is tagged C."
- "Change tag A to tag B if the next word has suffix -ing."
- "Change NN to VB if the previous tag is MD."

**Example Rules:**
- `Change NN to VB if the previous word is TO` (e.g., "to eat" — eat is VB)
- `Change VB to NN if the previous tag is DT` (e.g., "the run" — run is NN)

### 9.3 Advantages:

| Advantages | Disadvantages |
|-----------|---------------|
| Rules are interpretable | Training is slow |
| Learns from errors | Complex to implement |
| High accuracy | Large rule sets |
| Adapts to new domains | |

### 9.4 Comparison of POS Tagging Approaches:

| Method | Accuracy | Interpretable | Corpus Needed | Effort |
|--------|----------|---------------|----------------|--------|
| Rule-based | ~96% | Yes | No | High (manual rules) |
| Stochastic (HMM) | ~96-97% | No | Yes | Moderate |
| Transformation-based | ~97-98% | Partially | Yes | Moderate |
| Neural (Modern) | ~98%+ | No | Yes (large) | Low (auto) |

---

## 10. Speech Recognition Pipeline

The complete pipeline for Automatic Speech Recognition (ASR):

```
Audio Input (Raw Speech)
        ↓
Acoustic Processing
 - Pre-emphasis
 - Framing and windowing
 - FFT
 ↓
Feature Extraction (MFCC)
        ↓
Acoustic Model (HMM)
 - Maps features to phonemes
        ↓
Pronunciation Dictionary
 - Maps phonemes to words
        ↓
Language Model (N-gram)
 - Selects most probable word sequence
        ↓
Text Output (Transcription)
```

### 10.1 Components:

1. **Acoustic Model:** HMM that models the relationship between acoustic features and phonemes.
2. **Pronunciation Dictionary (Lexicon):** Maps words to sequences of phonemes.
3. **Language Model:** N-gram model that assigns probabilities to word sequences.

### 10.2 Decoding:
The search for the best word sequence W given acoustic observations O:
W* = argmax_W P(W|O)
   = argmax_W P(O|W) × P(W)   [Bayes' theorem]
   = argmax_W [Acoustic Model] × [Language Model]

---

## Summary Table: Module 3

| Topic | Key Points |
|-------|------------|
| HMM | States, observations, transitions, emissions, Viterbi |
| Viterbi | Dynamic programming; finds most likely state sequence |
| Acoustic Processing | Pre-emphasis, framing, windowing, FFT |
| Feature Extraction | MFCC: Mel filter bank + log + DCT; 39-dim feature vector |
| Speech Synthesis | Text analysis → phonetics → prosody → waveform |
| POS Tagging | Assigns grammatical category to each word |
| Rule-based | Manual context-free and contextual rules |
| Stochastic (HMM) | Viterbi on transition × emission probabilities |
| Transformation-based | Brill tagger: initial tags + learned correction rules |

---

## Important Exam Questions

1. What is a Hidden Markov Model (HMM)? Explain its components and three fundamental problems.
2. Explain the Viterbi algorithm with an example.
3. Explain the acoustic processing steps in speech recognition.
4. What are MFCCs? Explain the step-by-step procedure to compute MFCC features.
5. Explain the Text-to-Speech synthesis system with its components.
6. What is POS Tagging? Explain different approaches with advantages and disadvantages.
7. Explain rule-based POS tagging with examples.
8. Explain stochastic (HMM-based) POS tagging with the mathematical formulation.
9. What is transformation-based (Brill) POS tagging? Explain the learning procedure.
10. Explain the complete pipeline for Automatic Speech Recognition (ASR).
