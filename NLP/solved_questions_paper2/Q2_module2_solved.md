# Q2 Solved — Module 2: Computational Phonology, MED, N-grams
**IPS Academy | PCC-CL13/PEC-C101(C) | June 2025**

---

## Q.2(i) — MCQ [1 Mark]

**What is the primary goal of the Minimum Edit Distance algorithm in phonology?**

- A) To convert text to speech
- B) **To determine the difference between two strings ✅**
- C) To segment speech signals into phonemes
- D) To normalize pronunciation variations

**Answer: B) To determine the difference between two strings**

**Explanation:**
Minimum Edit Distance (Levenshtein Distance) calculates the **minimum number of edit operations** (insertions, deletions, substitutions) needed to transform one string into another. In phonology, it measures similarity between phonetic transcriptions of words.

---

## Q.2(ii) — MCQ [1 Mark]

**Which method is commonly used for spelling correction based on probability?**

- A) Rule-based approach
- B) Hidden Markov Model
- C) Finite State Transducers
- D) **Bayesian method ✅**

**Answer: D) Bayesian method**

**Explanation:**
The **Bayesian (Noisy Channel) Model** is the standard probabilistic approach for spelling correction:
$$\hat{w} = \arg\max_w P(w|x) = \arg\max_w P(x|w) \times P(w)$$
It combines an **error model** P(x|w) with a **language model** P(w) to find the most probable intended word.

---

## Q.2(iii) — Difference Between Phonetics and Phonology [4 Marks]

### Phonetics:

**Phonetics** is the scientific study of the **physical properties of speech sounds** — how sounds are produced, transmitted, and perceived.

**Branches of Phonetics:**
1. **Articulatory Phonetics:** How speech sounds are physically produced by the vocal organs (lips, tongue, lungs).
2. **Acoustic Phonetics:** The physical properties of sound waves (frequency, amplitude, duration).
3. **Auditory/Perceptual Phonetics:** How sounds are perceived by the human auditory system.

**Key concept — Phone:** Any distinct speech sound, regardless of its function in a language.
- Example: The aspirated [pʰ] in "pin" and unaspirated [p] in "spin" are two different **phones**.

---

### Phonology:

**Phonology** is the study of how speech sounds are **organized and function** within a particular language — the abstract, cognitive system of sounds.

**Key concept — Phoneme:** The **smallest abstract sound unit** that can distinguish meaning in a language.
- Example: /p/ and /b/ are different phonemes in English: "pin" vs "bin".

---

### Key Differences:

| Feature | Phonetics | Phonology |
|---------|-----------|-----------|
| Focus | Physical properties of sounds | Abstract sound system of a language |
| Scope | Language-independent (universal) | Language-specific |
| Units | Phones (physical sounds) | Phonemes (abstract units) |
| Methods | Experimental measurement (spectrograms) | Linguistic analysis, rules |
| Example | [pʰ] vs [p] (different phones) | /p/ (one phoneme in English) |
| Concerned with | HOW sounds are made | WHICH sounds distinguish meaning |

### Allophones (Connection between the two):
- **Allophones** are different phones that are variants of the **same phoneme**.
- [pʰ] (aspirated, in "pin") and [p] (unaspirated, in "spin") are **allophones** of the phoneme /p/ in English.
- Phonology explains why allophones exist; phonetics describes their physical properties.

### In the Context of Speech Processing:
- **Phonetics** → Feature extraction (MFCC), acoustic modeling.
- **Phonology** → Pronunciation dictionaries, text-to-phoneme conversion, stress/intonation rules.

---

## Q.2(iv) — Minimum Edit Distance and Phonetic Similarity [6 Marks]

### What is Minimum Edit Distance (MED)?

**Minimum Edit Distance** (also called **Levenshtein Distance**) is the minimum number of **edit operations** required to transform one string into another.

### Edit Operations:

| Operation | Description | Cost |
|-----------|-------------|------|
| **Insertion** | Add a character | 1 |
| **Deletion** | Remove a character | 1 |
| **Substitution** | Replace a character | 1 (or 2) |

---

### Dynamic Programming Algorithm:

**Matrix D[i][j]:** Edit distance between first i characters of source and first j characters of target.

**Initialization:**
```
D[0, j] = j    (insert j characters)
D[i, 0] = i    (delete i characters)
```

**Recurrence:**
```
D[i,j] = min(
    D[i-1, j]   + 1,                          // Deletion
    D[i, j-1]   + 1,                          // Insertion
    D[i-1, j-1] + (0 if s[i]==t[j] else 1)   // Substitution
)
```

---

### Worked Example: "kitten" → "sitting"

|   |   | s | i | t | t | i | n | g |
|---|---|---|---|---|---|---|---|---|
|   | **0** | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| k | **1** | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| i | **2** | 2 | 1 | 2 | 3 | 4 | 5 | 6 |
| t | **3** | 3 | 2 | 1 | 2 | 3 | 4 | 5 |
| t | **4** | 4 | 3 | 2 | 1 | 2 | 3 | 4 |
| e | **5** | 5 | 4 | 3 | 2 | 2 | 3 | 4 |
| n | **6** | 6 | 5 | 4 | 3 | 3 | 2 | 3 |

**MED = 3**

Operations: k→s (substitution), e→i (substitution), insert g.

---

### MED for Measuring Phonetic Similarity:

In phonology, MED is applied to **phonetic transcriptions** (not letters) to measure similarity between word pronunciations.

**Example:**
- "cat" → /kæt/
- "bat" → /bæt/
- MED on phonemes: /kæt/ → /bæt/ = 1 (substitute /k/ → /b/)
- These words are **phonetically very similar**.

**Example 2:**
- "night" → /naɪt/
- "knight" → /naɪt/
- MED = 0 — same pronunciation, different spelling.

### Effectiveness of MED in Phonology:

**Advantages:**
1. **Quantifies similarity** between phonetic sequences.
2. Identifies **minimal pairs** (words differing by single phoneme).
3. Used in **speech recognition** for comparing recognized phonemes to dictionary.
4. Useful for detecting **dialectal variations** in pronunciation.
5. Used in **spell checking** — find closest correct word.

**Limitations:**
1. All substitutions treated equally — but /p/→/b/ (similar sounds) costs same as /p/→/z/ (very different).
2. Does not consider **phonological features** (voicing, place of articulation).
3. **Weighted MED** solves this by assigning lower cost to acoustically similar phone pairs.

### Applications of MED:
- Spell checking and correction
- Speech recognition evaluation (Phone Error Rate)
- Bioinformatics (DNA alignment)
- Plagiarism detection
- Fuzzy string matching

---

## OR Q.2(iv) — N-gram Models: Advantages and Limitations [6 Marks]

### What is an N-gram Model?

An **N-gram language model** assigns probabilities to word sequences using the **Markov assumption** — each word's probability depends only on the previous n-1 words.

**Bigram:** P(wₙ|wₙ₋₁)  
**Trigram:** P(wₙ|wₙ₋₁,wₙ₋₂)

**MLE Training:**
$$P(w_n|w_{n-1}) = \frac{Count(w_{n-1}, w_n)}{Count(w_{n-1})}$$

---

### N-gram in Phonetic and Speech Applications:

- **Phoneme N-grams:** Model sequences of phonemes instead of words.
- P(/t/ | /s/) — probability of phoneme /t/ following /s/.
- Used in **ASR** to improve phoneme sequence prediction.
- Used in **TTS** to predict pronunciation patterns.

---

### Advantages of N-gram Models:

| Advantage | Explanation |
|-----------|-------------|
| **Simple and efficient** | Easy to compute and store |
| **Data-driven** | Automatically learned from corpus |
| **Effective for local context** | Captures local word/phoneme dependencies |
| **Language-independent** | Works for any language with sufficient data |
| **Fast inference** | O(n) lookup time using hash tables |
| **Foundation for advanced models** | Basis for smoothed and neural LMs |

---

### Limitations of N-gram Models:

| Limitation | Explanation |
|------------|-------------|
| **Zero probability** | Unseen n-grams get P=0; needs smoothing |
| **Limited context** | Only looks at n-1 previous words; misses long-range dependencies |
| **Data sparsity** | Higher n → exponentially more parameters needed |
| **No semantic understanding** | Treats words as symbols; no meaning |
| **Large memory requirement** | Trigrams for large vocabulary require huge storage |
| **Cannot generalize** | "big dog" and "large dog" treated as completely different |

### Smoothing Solutions:
- **Laplace (Add-1):** Add 1 to all counts.
- **Add-k:** Add fraction k.
- **Interpolation:** Combine unigram + bigram + trigram.
- **Kneser-Ney:** State-of-the-art smoothing method.
