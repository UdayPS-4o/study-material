# NLP Module 3 — Exam Answer Notes

---

## Q: What is Speech Recognition? Explain the role of HMM in ASR.

**Automatic Speech Recognition (ASR)** is the process of automatically converting a spoken audio signal into a written text string. It is one of the core challenges in NLP and AI because human speech is highly variable — the same word sounds different when spoken by different people, at different speeds, or with different accents.

**Hidden Markov Models (HMMs)** are the classical mathematical framework for ASR. The key insight is that:
- The **observed** data is the acoustic signal (the waveform captured by the microphone).
- The **hidden** states are the actual words or phonemes the speaker said.

An HMM models the probabilistic relationship between hidden states and observations. It is defined by:
- **States (S):** Typically phonemes or word units (e.g., the phonemes in the word "cat": /k/, /æ/, /t/).
- **Transition Probabilities (A):** The probability of moving from one state to another (e.g., phoneme /k/ followed by /æ/).
- **Emission Probabilities (B):** The probability that a given state produces a specific observed output (e.g., the acoustic frame looks like the /k/ phoneme).
- **Initial Probabilities (π):** The probability of starting in each state.

**The Recognition Problem:**
Given an acoustic observation sequence O = (o1, o2, ..., oT), the ASR system must find the sequence of words W that maximizes P(W | O). This is solved using the Viterbi algorithm.

---

## Q: Explain the Viterbi Algorithm.

The **Viterbi Algorithm** is a dynamic programming algorithm used to find the single most likely sequence of hidden states in an HMM given an observed sequence.

**Why it is needed:**
Brute-force enumeration of all possible state sequences is computationally infeasible. If there are N states and T time steps, there are N^T possible sequences. Viterbi reduces this to O(N² × T) by being clever: instead of tracking all paths, at each time step it only keeps the single best path leading to each state, discarding all sub-optimal paths.

**How it works:**
1. **Initialization:** For each state `s`, compute the probability of starting in state `s` and emitting the first observation.
   `δ(s, 1) = π(s) × B(s, o1)`
2. **Recursion:** For each subsequent time step `t` and state `s`, find the most probable previous state and extend the best path:
   `δ(s, t) = max over all s' [ δ(s', t-1) × A(s', s) ] × B(s, ot)`
3. **Backtracking:** After processing all time steps, backtrack through the recorded best previous states to reconstruct the optimal path.

The result is the most likely word/phoneme sequence corresponding to the observed acoustic signal.

---

## Q: What is Feature Extraction in Speech Processing? Explain MFCC.

Raw audio waveforms are complex signals that contain lots of irrelevant variation (microphone differences, background noise, speaker pitch). Before applying an HMM, the raw signal must be converted into a compact, meaningful representation through **Feature Extraction**.

**Mel-Frequency Cepstral Coefficients (MFCCs)** are the industry-standard features for speech recognition. They mimic how the human auditory system perceives sound.

**Steps to compute MFCC:**
1. **Frame Blocking:** The audio signal is sliced into short overlapping frames of ~20–25 milliseconds. Speech is roughly stationary within such a short window.
2. **Windowing:** Each frame is multiplied by a Hamming window function to reduce edge discontinuities.
3. **FFT:** A Fast Fourier Transform is applied to each frame, converting it from time domain to frequency domain.
4. **Mel Filter Bank:** The frequency spectrum is passed through a set of triangular filters spaced according to the **Mel scale** — a perceptual scale that models how the human ear responds to pitch (linear at low frequencies, logarithmic at high frequencies).
5. **Log + DCT:** The log of the filter bank energies is taken, and a Discrete Cosine Transform (DCT) is applied. The result is a small vector (typically 13 coefficients) that captures the "shape" of the vocal tract for that frame.

MFCCs are compact, robust, and closely aligned with how humans distinguish speech sounds.

---

## Q: What is Speech Synthesis (Text-to-Speech)? Explain the main approaches.

**Speech Synthesis (TTS — Text-to-Speech)** is the reverse of ASR: given a written text input, generate a natural-sounding spoken audio output.

**Three main approaches:**

**1. Concatenative Synthesis:**
A large database of real human speech recordings is split into tiny units (phonemes, diphones, or syllables). At runtime, the system selects and stitches together the appropriate units to form the target sentence.
- **Advantage:** Very natural-sounding because it uses real human voice recordings.
- **Disadvantage:** Requires massive storage for the recording database. The system is limited to the voice and style of the recorded speaker. Unnatural transitions can occur at stitch points.

**2. Formant (Parametric) Synthesis:**
The human voice is modeled mathematically as a source (vibrating vocal cords) filtered through a vocal tract. The system generates sound waves entirely from scratch by simulating this acoustic model.
- **Advantage:** Requires no recordings; extremely flexible and compact.
- **Disadvantage:** Sounds robotic and unnatural because synthesized resonances don't capture the full richness of real speech.

**3. Neural / Deep Learning Synthesis (Modern Standard):**
Uses neural network models (like Google's **WaveNet** or **Tacotron**) trained on hours of real speech to directly generate waveforms sample by sample.
- **Advantage:** Highly natural, indistinguishable from human speech in many cases. Can capture prosody (rhythm, stress, intonation) accurately.
- **Disadvantage:** Computationally expensive to train and sometimes to run.

---

## Q: What is POS Tagging? Explain the three approaches to POS Tagging.

**Part-of-Speech (POS) Tagging** is the task of labeling each word in a sentence with its correct grammatical category: Noun (NN), Verb (VB), Adjective (JJ), Adverb (RB), Preposition (IN), etc.

It is a foundational NLP task used in parsing, named entity recognition, information extraction, and many other downstream applications.

**Why it is challenging:** Many words are ambiguous. For example, "race" can be a Noun ("a race") or a Verb ("to race"). "Flies" can be a Noun ("flies are insects") or a Verb ("he flies a plane"). Context must be used to resolve the correct tag.

---

**1. Rule-Based POS Tagging:**
Uses a large hand-crafted dictionary to assign each word its possible tags, plus a set of contextual rules written by linguists to select the correct tag.

- Example rule: "If a word ends in '-ing' and the previous word is 'is', tag it as a present-participle verb (VBG)."
- **Advantage:** Highly accurate for well-formed formal text; no training data needed.
- **Disadvantage:** Rules are expensive to create and maintain. Fails on unknown words or informal language.
- **Example system:** ENGTWOL.

---

**2. Stochastic (Probabilistic) Tagging:**
Instead of rules, this approach uses statistics derived from large pre-tagged training corpora. It relies on two probabilities:
- **Lexical Probability P(word | tag):** How likely is this word to have this tag? (e.g., P("race" | Noun) = 0.7)
- **Transition Probability P(tag_i | tag_{i-1}):** How likely is this tag to follow the previous tag? (e.g., P(Noun | Determiner) = 0.85)

These probabilities are combined in an HMM framework. The Viterbi algorithm then finds the tag sequence with the highest overall probability. This is fast and handles ambiguity gracefully.
- **Disadvantage:** Requires large amounts of manually tagged training data.

---

**3. Transformation-Based Tagging (Brill Tagger):**
A hybrid approach that combines rule-based and data-driven methods.

- **Step 1:** Assign every word its most common tag from a dictionary (a rough initial guess).
- **Step 2:** The system learns a set of transformation rules from training data. Each rule says: "Change tag X to tag Y in context C." For example: "Change VB to NN if the previous word is a Determiner."
- At run time, the initial tags are applied and then the corrective rules are applied in order.
- **Advantage:** More accurate than pure stochastic methods. The learned rules are human-readable and interpretable.
- **Disadvantage:** Requires training data and can be slow to apply many layers of rules.
