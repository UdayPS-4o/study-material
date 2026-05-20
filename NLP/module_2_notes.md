# Module 2: Computational Phonology
**Subject:** Natural Language Processing | **Hours:** 10

---

## 1. Computational Phonology

**Phonology** is the study of the sound system of a language — the rules governing how sounds combine and vary.

**Computational Phonology** applies computational techniques to model and process speech sounds.

- Deals with how sounds are organized in a language.
- Studies the **phonemes** — the smallest units of sound that distinguish meaning.
- Example: "pat" vs "bat" — only the first phoneme differs, changing the meaning.

---

## 2. Speech Sounds

**Speech sounds** are the fundamental building blocks of spoken language.

### 2.1 Phoneme
- The **smallest unit of sound** that can distinguish meaning.
- English has approximately **44 phonemes** (but only 26 letters).
- Example: /p/, /b/, /t/, /d/, /k/, /g/

### 2.2 Types of Speech Sounds:

#### Vowels
- Produced with an open vocal tract.
- Examples: /æ/ (cat), /iː/ (see), /ɑː/ (car)
- Classified by:
  - **Height:** High (see), Mid (set), Low (sat)
  - **Backness:** Front, Central, Back
  - **Rounding:** Rounded (who), Unrounded (he)

#### Consonants
- Produced with some obstruction of the vocal tract.
- Classified by:
  - **Place of articulation:** Where the sound is made (bilabial, dental, alveolar, velar)
  - **Manner of articulation:** How the sound is made (stop, fricative, nasal, liquid)
  - **Voicing:** Whether vocal cords vibrate (voiced vs unvoiced)

| Sound | Place | Manner | Voiced |
|-------|-------|--------|--------|
| /p/ | Bilabial | Stop | No |
| /b/ | Bilabial | Stop | Yes |
| /f/ | Labiodental | Fricative | No |
| /v/ | Labiodental | Fricative | Yes |
| /n/ | Alveolar | Nasal | Yes |

### 2.3 Allophones
- **Variants** of a phoneme that occur in different environments.
- Example: The /p/ in "pin" (aspirated) vs "spin" (unaspirated) are allophones of /p/.

---

## 3. Phonetic Transcription

**Phonetic Transcription** is the visual representation of speech sounds using special symbols.

### 3.1 International Phonetic Alphabet (IPA)
- A standardized system for representing speech sounds.
- Each symbol represents a unique sound.
- Used by linguists, language learners, and NLP systems.

### 3.2 Examples of IPA Transcription:

| Word | IPA Transcription |
|------|-------------------|
| cat | /kæt/ |
| ship | /ʃɪp/ |
| think | /θɪŋk/ |
| phone | /foʊn/ |
| beautiful | /ˈbjuːtɪfəl/ |

### 3.3 ARPABET
- A phonetic transcription system using ASCII characters.
- Used widely in speech recognition systems (e.g., CMU Pronouncing Dictionary).
- Example: "cat" → K AE T

### 3.4 Stress Markers
- **Primary stress (ˈ):** The most prominent syllable.
- **Secondary stress (ˌ):** Less prominent syllable.
- Example: "photograph" /ˈfoʊtəɡræf/

---

## 4. Text-to-Speech (TTS) Synthesis

**Text-to-Speech (TTS)** is the process of converting written text into spoken audio output.

### 4.1 Pipeline of TTS:

```
Text Input
    ↓
Text Analysis (NLP)
    ↓
Linguistic Analysis (Phonetic transcription, stress, rhythm)
    ↓
Prosody Generation (intonation, duration, pitch)
    ↓
Waveform Generation (Audio output)
```

### 4.2 Text Analysis Phase:
1. **Sentence boundary detection:** Identify where sentences begin and end.
2. **Text normalization:** Convert numbers, abbreviations, dates to spoken form.
   - "Dr." → "Doctor"
   - "2024" → "twenty twenty-four"
   - "$50" → "fifty dollars"
3. **Word tokenization:** Split text into words.

### 4.3 Phonetic Analysis Phase:
1. **Dictionary lookup:** Find pronunciation of known words.
2. **Letter-to-Sound (LTS) rules:** For unknown words, apply rules to predict pronunciation.
3. **Morphological analysis:** Handle inflected forms.

### 4.4 Prosody Generation:
- **Prosody** refers to rhythm, stress, and intonation of speech.
- Duration: How long each sound lasts.
- Pitch (F0): Frequency of vocal cord vibration.
- Energy: Loudness of the sound.

### 4.5 Waveform Generation Methods:

#### Concatenative Synthesis
- Stores units of recorded speech (diphones, phonemes).
- Concatenates them to produce output.
- Sounds natural but large storage required.

#### Formant Synthesis
- Generates speech from scratch using acoustic models.
- Smaller storage, but sounds robotic.

#### Neural TTS (Modern)
- Uses deep learning (e.g., WaveNet, Tacotron).
- High quality, natural-sounding speech.
- Examples: Google's TTS, Amazon Polly.

---

## 5. Pronunciation Variations

Natural speech involves many deviations from dictionary pronunciations.

### 5.1 Types of Pronunciation Variations:

#### Reduction
- Sounds are shortened or eliminated in fast speech.
- Example: "going to" → "gonna"

#### Assimilation
- A sound changes to become more like a neighboring sound.
- Example: "ten bikes" → /tem baɪks/ (n becomes m before b)

#### Elision (Deletion)
- A sound is dropped.
- Example: "library" → /ˈlaɪbri/ (middle syllable dropped)

#### Coarticulation
- Sounds influence each other during continuous speech.
- The production of one sound overlaps with the next.

#### Liaison
- A final consonant is pronounced when followed by a word beginning with a vowel.
- Common in French.

### 5.2 Why Pronunciation Variation Matters in NLP:
- **Automatic Speech Recognition (ASR)** must handle spoken variations.
- A word may be pronounced differently by:
  - Different speakers (accents, dialects).
  - Same speaker in different contexts (fast vs slow speech).
  - Regional differences (British vs American English).

---

## 6. Bayesian Methods for Spelling and Pronunciation

**Bayesian methods** use probability theory to choose the most likely interpretation given observed evidence.

### 6.1 Bayes' Theorem

$$P(H|E) = \frac{P(E|H) \cdot P(H)}{P(E)}$$

- **P(H|E):** Posterior probability — probability of hypothesis H given evidence E.
- **P(E|H):** Likelihood — probability of observing E given H is true.
- **P(H):** Prior probability — probability of H before seeing evidence.
- **P(E):** Evidence probability (normalizing constant).

### 6.2 Bayesian Approach to Spelling Correction

**Noisy Channel Model:**
- The intended word passes through a "noisy channel" and becomes the misspelled word.
- Goal: Find the most probable intended word.

$$\hat{w} = \arg\max_{w} P(w|x) = \arg\max_{w} P(x|w) \cdot P(w)$$

- **P(w):** Language model — how likely is word w? (Prior)
- **P(x|w):** Error model — how likely is x given the intended word w? (Likelihood)

**Example:**
- Observed: "acress"
- Candidates: "across", "actress", "access"
- Calculate P(candidate | "acress") for each and pick the highest.

### 6.3 Bayesian Approach to Pronunciation

Used to predict pronunciation of unknown words:
- **P(pronunciation | word):** Given the word, what is the likely pronunciation?
- Training data: dictionary of word-pronunciation pairs.
- For unseen words, use letter-to-sound (LTS) rules combined with Bayesian probabilities.

### 6.4 Channel Model Components:

**Error Model (Confusion Matrix):**
- Probability of one letter being typed/heard as another.
- Based on analysis of common errors.
- Example: P("ie" | "ei") = 0.7 (common spelling mistake)

**Language Model:**
- n-gram model that estimates the probability of word sequences.
- Ensures the correction makes sense in context.

---

## 7. Minimum Edit Distance

**Minimum Edit Distance (MED)** (also called **Levenshtein Distance**) measures the minimum number of editing operations needed to transform one string into another.

### 7.1 Edit Operations:
1. **Insertion:** Add a character. Cost = 1
2. **Deletion:** Remove a character. Cost = 1
3. **Substitution:** Replace one character with another. Cost = 1 (or 2 in some variants)

### 7.2 Dynamic Programming Algorithm:

Given strings: source = "intention", target = "execution"

Create a matrix D where D[i][j] = edit distance between first i chars of source and first j chars of target.

**Recurrence Relation:**
```
D[0, j] = j   (delete all j characters)
D[i, 0] = i   (insert all i characters)
D[i, j] = min(
    D[i-1, j] + 1,          // Deletion
    D[i, j-1] + 1,          // Insertion
    D[i-1, j-1] + cost      // Substitution (cost=0 if same, 1 if different)
)
```

### 7.3 Example Calculation:

Edit distance between "kitten" and "sitting":

|   |   | s | i | t | t | i | n | g |
|---|---|---|---|---|---|---|---|---|
|   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| k | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| i | 2 | 2 | 1 | 2 | 3 | 4 | 5 | 6 |
| t | 3 | 3 | 2 | 1 | 2 | 3 | 4 | 5 |
| t | 4 | 4 | 3 | 2 | 1 | 2 | 3 | 4 |
| e | 5 | 5 | 4 | 3 | 2 | 2 | 3 | 4 |
| n | 6 | 6 | 5 | 4 | 3 | 3 | 2 | 3 |

**Answer: Edit Distance = 3**

### 7.4 Applications of MED:
- Spell checking and correction.
- DNA sequence alignment (Bioinformatics).
- Plagiarism detection.
- Fuzzy string matching.
- Speech recognition evaluation (Word Error Rate).

### 7.5 Weighted Edit Distance
- Different operations can have different costs.
- Insertions and deletions may cost 1, substitutions cost 2.
- Custom weights based on keyboard proximity or phonetic similarity.

---

## 8. Weighted Automata

**Weighted Automata (WA)** extend regular automata by adding **weights** (costs or probabilities) to transitions.

### 8.1 Definition
- A Weighted Finite Automaton (WFA) is a finite automaton where each transition has an associated weight.
- Weights can represent:
  - Probabilities (Probabilistic Automata)
  - Costs (used in optimization)
  - Log probabilities (for numerical stability)

### 8.2 Formally:
WFA = (Q, Σ, δ, q0, F, w)
- Q = Set of states
- Σ = Input alphabet
- δ = Transition function
- q0 = Initial state
- F = Final states
- w = Weight function: δ → ℝ (real numbers)

### 8.3 Weighted Finite State Transducer (WFST)
- Extends FST by adding weights to transitions.
- Used extensively in **speech recognition** and **machine translation**.
- Each transition has: (input label, output label, weight).

### 8.4 Operations on Weighted Automata:

| Operation | Description |
|-----------|-------------|
| **Composition** | Combining two transducers into one |
| **Determinization** | Converting to deterministic form |
| **Minimization** | Reducing number of states |
| **Shortest Path** | Finding path with minimum cost |

### 8.5 Applications:
- **Speech Recognition:** WFSTs model the entire recognition pipeline (acoustic model, language model, pronunciation model).
- **Machine Translation:** Modeling translation probabilities.
- **Optical Character Recognition (OCR):** Error correction.

---

## 9. N-Grams

**N-grams** are contiguous sequences of n items (words or characters) from a text.

### 9.1 Types of N-grams:
- **Unigram (n=1):** Single words → {"I", "love", "NLP"}
- **Bigram (n=2):** Pairs of words → {"I love", "love NLP"}
- **Trigram (n=3):** Three-word sequences → {"I love NLP"}
- **4-gram and higher**

### 9.2 N-gram Language Model

A **language model** assigns a probability to a sequence of words.

**Goal:** Compute P(w₁, w₂, ..., wₙ)

**Chain Rule of Probability:**
P(w₁, w₂, ..., wₙ) = P(w₁) × P(w₂|w₁) × P(w₃|w₁w₂) × ... × P(wₙ|w₁...wₙ₋₁)

**Markov Assumption (Bigram):**
Approximate: P(wₙ|w₁...wₙ₋₁) ≈ P(wₙ|wₙ₋₁)

So: P(w₁, w₂, ..., wₙ) ≈ ∏ P(wᵢ|wᵢ₋₁)

### 9.3 Maximum Likelihood Estimation (MLE)

For bigrams:
$$P(w_n | w_{n-1}) = \frac{Count(w_{n-1}, w_n)}{Count(w_{n-1})}$$

**Example:**
Corpus: "I love NLP. I love AI."

- Count("I love") = 2
- Count("I") = 2
- P("love" | "I") = 2/2 = 1.0

- Count("love NLP") = 1
- Count("love") = 2
- P("NLP" | "love") = 1/2 = 0.5

### 9.4 Problem: Zero Probabilities (Sparse Data)

If a bigram never appeared in training, P = 0, making the whole sentence probability 0.

### 9.5 Smoothing Techniques

#### Laplace (Add-one) Smoothing
$$P(w_n|w_{n-1}) = \frac{Count(w_{n-1}, w_n) + 1}{Count(w_{n-1}) + V}$$
- V = vocabulary size
- Adds 1 to all counts.

#### Add-k Smoothing
$$P(w_n|w_{n-1}) = \frac{Count(w_{n-1}, w_n) + k}{Count(w_{n-1}) + kV}$$
- k is a small fraction (e.g., k=0.5).

#### Backoff
- If bigram count is zero, use unigram probability.
- If trigram is zero, back off to bigram.

#### Interpolation (Katz, Jelinek-Mercer)
- Combine probabilities from different n-gram orders.
P(wₙ|wₙ₋₁) = λ₁P(wₙ) + λ₂P(wₙ|wₙ₋₁) + λ₃P(wₙ|wₙ₋₁wₙ₋₂)
where λ₁ + λ₂ + λ₃ = 1

### 9.6 Perplexity

**Perplexity** is a metric to evaluate language models — lower perplexity means better model.

$$PP(W) = P(w_1, w_2, ..., w_N)^{-1/N}$$

- A model that perfectly predicts the test set would have perplexity of 1.
- Typical values: unigram ~962, bigram ~170, trigram ~109 (on English text).

### 9.7 Applications of N-grams:
- **Language modeling:** Predicting next word.
- **Spell correction:** Finding context-appropriate corrections.
- **Machine translation:** Scoring candidate translations.
- **Speech recognition:** Choosing between similar-sounding words.
- **Text generation:** Generating coherent text.

---

## Summary Table: Module 2

| Topic | Key Points |
|-------|------------|
| Speech Sounds | Phonemes, vowels, consonants, allophones |
| IPA | International Phonetic Alphabet for sound representation |
| TTS | Text normalization → Phonetic analysis → Prosody → Waveform |
| Pronunciation Variations | Reduction, assimilation, elision, coarticulation |
| Bayesian Methods | P(w\|x) ∝ P(x\|w) × P(w); error model × language model |
| Minimum Edit Distance | Levenshtein distance; insertion, deletion, substitution |
| Weighted Automata | FST + weights; used in speech recognition |
| N-grams | Unigram, bigram, trigram; language model; smoothing |
| Perplexity | Evaluation metric for language models; lower is better |

---

## Important Exam Questions

1. What is computational phonology? Explain speech sounds, phonemes, vowels, and consonants.
2. What is phonetic transcription? Explain IPA with examples.
3. Explain the Text-to-Speech (TTS) synthesis pipeline with all stages.
4. What are pronunciation variations? Explain with examples.
5. Explain the Bayesian approach (noisy channel model) to spelling correction.
6. What is Minimum Edit Distance? Explain the dynamic programming algorithm with an example.
7. What are Weighted Automata? Explain WFST and its applications.
8. What are N-grams? Explain bigram language model with MLE.
9. What is the problem of zero probability? Explain smoothing techniques.
10. What is perplexity in language models? How is it calculated?
