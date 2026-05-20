# NLP — Solved Question Paper
**All questions solved with detailed exam-ready answers**

---

# Q.1(A) — Levels of Language Analysis in NLP [5 Marks]

## Answer:

Natural Language Processing (NLP) analyzes language at **multiple levels**, each building upon the previous. These levels help a computer system progressively understand the structure and meaning of language.

---

### 1. Morphological Level
- Deals with the **internal structure of words**.
- Words are broken into smallest meaningful units called **morphemes**.
- **Example:** "unhappiness" → **un** (prefix) + **happy** (root) + **ness** (suffix)
- Tasks: Stemming, lemmatization, morphological parsing.

### 2. Lexical Level
- Deals with individual words and their **dictionary meanings**.
- Involves assigning **Part-of-Speech (POS)** tags to words.
- **Example:** "bank" → noun (river bank) or verb (to bank money)

### 3. Syntactic Level (Syntax)
- Deals with the **grammatical structure** of sentences.
- Studies how words combine into phrases and sentences.
- Uses **Context-Free Grammar (CFG)** for parsing.
- **Example:** "The dog bites the man" vs "The man bites the dog" — same words, different meaning due to structure.

### 4. Semantic Level (Semantics)
- Deals with the **literal meaning** of words, phrases, and sentences.
- Concerned with *what* a sentence means, not just its structure.
- **Example:** "Colorless green ideas sleep furiously" — syntactically correct but **semantically meaningless**.
- Tasks: Word Sense Disambiguation (WSD), semantic role labeling.

### 5. Pragmatic Level (Pragmatics)
- Deals with **language use in context** — how context affects meaning.
- Concerned with the **speaker's intended meaning**.
- **Example:** "Can you pass the salt?" — Not a question about ability; it is a **request**.

### 6. Discourse Level
- Deals with **multi-sentence understanding** and text coherence.
- Studies how sentences connect to form a coherent document.
- **Example:** "John went to the store. **He** bought milk." → "He" refers to John (anaphora resolution).

---

### Summary Table:

| Level | Focus | Example |
|-------|-------|---------|
| Morphological | Word structure | un+happy+ness |
| Lexical | Word meaning + POS | bank = noun/verb |
| Syntactic | Sentence structure | Parse tree |
| Semantic | Literal meaning | WSD |
| Pragmatic | Speaker intent | "Can you...?" = request |
| Discourse | Cross-sentence meaning | Pronoun resolution |

---

# Q.1(B) — Finite State Transducers (FST) in Parsing [5 Marks]

## Answer:

### What is an FST?

A **Finite State Transducer (FST)** is an extension of a Finite State Automaton (FSA) that maps **input strings to output strings**. It has **two tapes** — one for input and one for output — unlike an FSA which only recognizes strings.

---

### Formal Definition:

FST = (Q, Σ, Δ, δ, λ, q₀, F) where:
- **Q** = Finite set of states
- **Σ** = Input alphabet
- **Δ** = Output alphabet
- **δ** = State transition function
- **λ** = Output function
- **q₀** = Initial state
- **F** = Set of final/accepting states

---

### How FST Works:

1. Read an input symbol from the input tape.
2. Transition to a new state based on current state + input.
3. Write an output symbol to the output tape.
4. Continue until input is fully consumed.

---

### FST in Morphological Parsing:

FSTs are widely used to map **surface forms** (actual words) to **lexical forms** (base form + morphological features).

**Example 1: Plural Nouns**

| Input (Surface) | Output (Lexical) |
|-----------------|-----------------|
| foxes | fox +Plural |
| cats | cat +Plural |
| geese | goose +Plural |

**Example 2: Verb Inflection**

| Input | Output |
|-------|--------|
| running | run +PresentParticiple |
| walked | walk +PastTense |
| flies | fly +ThirdSingular |

---

### FST Diagram (Example — Plural Rule):

```
State transitions for "foxes" → "fox+Plural":

q0 --f--> q1
q1 --o--> q2
q2 --x--> q3
q3 --e--> q4
q4 --s:+Plural--> q5 (FINAL)
```

The "e" before "s" is deleted, and "+Plural" tag is appended to the output.

---

### Advantages of FST:
- **Reversible:** Same FST can parse (analysis) and generate (synthesis).
- **Efficient:** Runs in linear time O(n) in input length.
- **Composable:** Multiple FSTs can be composed into one.
- Handles irregular forms (e.g., goose → geese).

---

# OR Q.1(A) — Ambiguity in Language and its Effect on NLP [5 Marks]

## Answer:

### What is Ambiguity?

**Ambiguity** occurs when a word, phrase, or sentence can have **more than one valid interpretation**. It is one of the biggest challenges in NLP because computers need a single, definite interpretation to process language.

---

### Types of Ambiguity:

#### 1. Lexical Ambiguity
- A single **word** has multiple meanings.
- **Example:** "I went to the **bank**."
  - bank = financial institution OR
  - bank = side of a river

#### 2. Syntactic (Structural) Ambiguity
- A sentence can have **multiple valid parse trees**.
- **Example:** "I saw a man **with a telescope**."
  - Parse 1: I used a telescope to see a man.
  - Parse 2: I saw a man who had a telescope.

#### 3. Semantic Ambiguity
- The **literal meaning** of a sentence is unclear.
- **Example:** "Every man loves a woman."
  - Meaning 1: Each man loves some (possibly different) woman.
  - Meaning 2: There is one woman that every man loves.

#### 4. Pragmatic Ambiguity
- Ambiguity based on **context or speaker intent**.
- **Example:** "Can you help me?" — Literally asks about ability, but pragmatically it is a **request**.

#### 5. Referential Ambiguity
- Unclear what a **pronoun or noun phrase** refers to.
- **Example:** "The monkey ate the banana because **it** was hungry." — Does "it" refer to monkey or banana?

---

### How Ambiguity Affects NLP Systems:

| NLP Task | Effect of Ambiguity |
|----------|---------------------|
| Machine Translation | Wrong word/phrase selected in target language |
| Information Retrieval | Wrong documents retrieved |
| Question Answering | Wrong answer generated |
| Speech Recognition | Homophone confusion (there/their/they're) |
| Parsing | Multiple parse trees, wrong structure selected |

---

### Solutions in NLP:
- **Word Sense Disambiguation (WSD):** Resolves lexical ambiguity.
- **Probabilistic Parsing (PCFG):** Selects most probable parse tree.
- **Context modeling:** Using surrounding words to resolve ambiguity.
- **Discourse analysis:** Using larger context for pragmatic ambiguity.

---

# OR Q.1(B) — Types of Stemmers [5 Marks]

## Answer:

### What is Stemming?

**Stemming** is the process of reducing a word to its **root/stem** by removing suffixes and prefixes. The resulting stem may not be a real dictionary word.

**Example:** "running", "runner", "runs" → "run"

---

### Types of Stemmers:

---

#### 1. Porter Stemmer (Most Popular)
- Developed by **Martin Porter in 1980**.
- Uses a series of **rules applied in phases** (5 phases).
- Removes common English suffixes.

**Key Rules:**
- SSES → SS (caresses → caress)
- IES → I (ponies → poni)
- ING → (running → run)
- ATIONAL → ATE (relational → relate)
- TIONAL → TION (conditional → condition)

**Example:**
- "happiness" → "happi"
- "generously" → "generous"
- "electrically" → "electr"

**Advantage:** Simple and fast.
**Disadvantage:** Over-stemming (words with different meanings get same stem).

---

#### 2. Lovins Stemmer
- One of the **earliest stemmers** (1968).
- Removes the **longest possible suffix** in a single pass.
- Uses a **list of 294 endings**.
- Single-pass algorithm (faster).

**Example:**
- "generously" → "gener"
- "running" → "run"

**Advantage:** Fast — single pass.
**Disadvantage:** Less accurate than Porter.

---

#### 3. Paice/Husk Stemmer (Lancaster Stemmer)
- More **aggressive** than Porter Stemmer.
- Iteratively applies rules until no more can be applied.
- Can over-stem significantly.

**Example:**
- "eating" → "eat"
- "generously" → "gen"

---

#### 4. Snowball Stemmer
- An **improved and extended** version of Porter Stemmer.
- Supports **multiple languages** (English, French, German, Spanish, etc.).
- More accurate than original Porter.
- Based on the Snowball string processing language.

**Example (English):**
- "generously" → "generous"
- "electrically" → "electr"

---

#### 5. Suffix Stripping Stemmer
- Simple rule-based approach.
- Removes known suffixes from a lookup table.
- **Example suffixes:** -ing, -ed, -tion, -ness, -ly

---

### Stemming vs. Lemmatization:

| Feature | Stemming | Lemmatization |
|---------|----------|---------------|
| Output | Stem (may not be real word) | Lemma (real dictionary word) |
| Method | Rule-based suffix removal | Dictionary lookup + grammar |
| Speed | Fast | Slower |
| Example | "better" → "bett" | "better" → "good" |
| Accuracy | Lower | Higher |

---

# Q.2(A) — Bayesian Method for Spelling and Pronunciation [5 Marks]

## Answer:

### Bayes' Theorem:

$$P(H|E) = \frac{P(E|H) \times P(H)}{P(E)}$$

- **P(H|E):** Posterior — probability of hypothesis H given evidence E
- **P(E|H):** Likelihood — probability of evidence given hypothesis
- **P(H):** Prior — probability of hypothesis before evidence
- **P(E):** Normalizing constant

---

### Bayesian Spelling Correction — Noisy Channel Model:

The **Noisy Channel Model** assumes:
> The writer intended a correct word **w**, but it passed through a "noisy channel" and became the misspelled word **x**.

**Goal:** Find the most probable correct word **w** given observed misspelled word **x**.

$$\hat{w} = \arg\max_{w} P(w|x) = \arg\max_{w} P(x|w) \times P(w)$$

**Two components:**
1. **P(w) — Language Model (Prior):** How common is word w in general English?
2. **P(x|w) — Error Model (Likelihood):** How likely is the typo x given intended word w?

---

### Example — Spelling Correction:

**Observed word:** "acress"

**Candidate corrections:** across, actress, access, acres, cress

| Candidate w | P(w) [frequency] | P(x\|w) [error prob] | P(w\|x) ∝ product |
|-------------|------------------|----------------------|-------------------|
| across | 0.0003 | 0.000144 | 4.3 × 10⁻⁸ |
| actress | 0.00001 | 0.000975 | 9.8 × 10⁻⁹ |
| acres | 0.0001 | 0.000010 | 1.0 × 10⁻⁹ |

→ **"across"** has the highest probability → selected as correction.

---

### Error Model (Confusion Matrix):

- Based on analysis of real spelling mistakes.
- P(x|w) = probability of typing x when you intended w.
- Common errors tracked:
  - **Insertions:** typing extra letter (e.g., "teh" → "the")
  - **Deletions:** missing a letter (e.g., "recieve" → "receive")
  - **Substitutions:** wrong letter (e.g., "definately" → "definitely")
  - **Transpositions:** swapped letters (e.g., "teh" → "the")

---

### Bayesian Pronunciation Prediction:

Used to predict pronunciation of **unknown words** (words not in dictionary).

$$\hat{p} = \arg\max_{p} P(p|word) = \arg\max_{p} P(word|p) \times P(p)$$

- Train on a **pronunciation dictionary** (word → phoneme sequence).
- For unseen words, use letter-to-sound (LTS) rules with Bayesian probabilities.

**Example:** Unknown word "blerg"
- Find similar known words: "berg" → /bɜrɡ/, "bler" patterns
- Combine probabilities to predict: /blɜrɡ/

---

# Q.2(B) — N-gram Model and Application in Speech Recognition [5 Marks]

## Answer:

### What is an N-gram?

An **N-gram** is a contiguous sequence of **n items** (words or characters) from a text.

- **Unigram (n=1):** Single words → {"I", "love", "NLP"}
- **Bigram (n=2):** Word pairs → {"I love", "love NLP"}
- **Trigram (n=3):** Word triples → {"I love NLP"}

---

### N-gram Language Model:

A **language model** assigns a probability to a sequence of words.

**Chain Rule:**
P(w₁,w₂,...,wₙ) = P(w₁) × P(w₂|w₁) × P(w₃|w₁w₂) × ...

**Bigram (Markov) Approximation:**
P(wₙ|w₁...wₙ₋₁) ≈ P(wₙ|wₙ₋₁)

So: **P(sentence) ≈ ∏ P(wᵢ|wᵢ₋₁)**

---

### Training: Maximum Likelihood Estimation (MLE)

$$P(w_n | w_{n-1}) = \frac{Count(w_{n-1},\ w_n)}{Count(w_{n-1})}$$

**Example:**
Corpus: "I love NLP. I love AI. NLP is fun."

| Bigram | Count | P(w2\|w1) |
|--------|-------|-----------|
| I love | 2 | 2/2 = **1.0** |
| love NLP | 1 | 1/2 = **0.5** |
| love AI | 1 | 1/2 = **0.5** |
| NLP is | 1 | 1/2 = **0.5** |

P("I love NLP") = P(I) × P(love|I) × P(NLP|love)
= 0.33 × 1.0 × 0.5 = **0.165**

---

### Problem: Zero Probability (Sparse Data)

If a bigram never appeared in training → P = 0 → Whole sentence P = 0.

**Solution — Laplace (Add-1) Smoothing:**
$$P(w_n|w_{n-1}) = \frac{Count(w_{n-1},w_n) + 1}{Count(w_{n-1}) + V}$$
V = vocabulary size.

---

### Application in Speech Recognition:

The **ASR (Automatic Speech Recognition)** system uses N-gram models to choose between acoustically similar words.

**Decoding Equation:**
$$W^* = \arg\max_W P(W|O) = \arg\max_W \underbrace{P(O|W)}_{\text{Acoustic Model}} \times \underbrace{P(W)}_{\text{Language Model}}$$

**Example:**
- Acoustic input sounds like "recognize speech" OR "wreck a nice beach"
- Acoustic model gives equal probability to both.
- **Bigram language model** gives:
  - P("recognize speech") = high (common phrase)
  - P("wreck a nice beach") = very low (unlikely sequence)
- System correctly selects **"recognize speech"**.

**N-gram in Speech Recognition:**
- Bigram/trigram trained on large text corpus.
- Used during **beam search decoding** in ASR.
- Reduces word error rate significantly.

---

### Perplexity — Evaluating Language Models:

$$PP(W) = P(w_1,w_2,...,w_N)^{-1/N}$$

- **Lower perplexity = better model.**
- Typical English text: Unigram ~962, Bigram ~170, Trigram ~109.

---

# OR Q.2(A) — Minimum Edit Distance [5 Marks]

## Answer:

### What is Minimum Edit Distance?

**Minimum Edit Distance (MED)**, also called **Levenshtein Distance**, is the minimum number of **edit operations** required to transform one string into another.

---

### Edit Operations:

| Operation | Description | Cost |
|-----------|-------------|------|
| **Insertion** | Add a character | 1 |
| **Deletion** | Remove a character | 1 |
| **Substitution** | Replace one character | 1 (or 2) |

---

### Dynamic Programming Algorithm:

**Given:** Source string s[1..m] and Target string t[1..n]

**Matrix D[i][j]:** Minimum edit distance between first i characters of source and first j characters of target.

**Initialization:**
```
D[0, j] = j    (delete j characters from target)
D[i, 0] = i    (insert i characters from source)
```

**Recurrence:**
```
D[i,j] = min(
  D[i-1, j]   + 1,               // Deletion
  D[i, j-1]   + 1,               // Insertion
  D[i-1, j-1] + (0 if s[i]==t[j] else 1)  // Substitution
)
```

---

### Worked Example: "kitten" → "sitting"

|   |   | **s** | **i** | **t** | **t** | **i** | **n** | **g** |
|---|---|---|---|---|---|---|---|---|
|   | **0** | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **k** | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| **i** | 2 | 2 | 1 | 2 | 3 | 4 | 5 | 6 |
| **t** | 3 | 3 | 2 | 1 | 2 | 3 | 4 | 5 |
| **t** | 4 | 4 | 3 | 2 | 1 | 2 | 3 | 4 |
| **e** | 5 | 5 | 4 | 3 | 2 | 2 | 3 | 4 |
| **n** | 6 | 6 | 5 | 4 | 3 | 3 | 2 | 3 |

**Minimum Edit Distance = 3**

**Operations:**
1. kitten → sitten (substitute 'k' with 's')
2. sitten → sittin (substitute 'e' with 'i')
3. sittin → sitting (insert 'g')

---

### Applications:

| Application | How MED is Used |
|-------------|----------------|
| **Spell Correction** | Find dictionary word with smallest MED from typo |
| **Speech Recognition** | Compare recognized word with dictionary candidates |
| **DNA Sequencing** | Align biological sequences |
| **Plagiarism Detection** | Find similar text passages |
| **Machine Translation** | Compute WER (Word Error Rate) |
| **Fuzzy Search** | Find approximate string matches |

---

# OR Q.2(B) — Speech-to-Text and Text-to-Speech [5 Marks]

## Answer:

## A. Speech-to-Text (STT) / Automatic Speech Recognition (ASR)

**Speech-to-Text** converts **spoken audio into written text**.

### Pipeline:

```
Audio Input (Microphone)
       ↓
Acoustic Processing
 - Pre-emphasis (boost high frequencies)
 - Framing (20-25ms frames)
 - Windowing (Hamming window)
       ↓
Feature Extraction (MFCC)
 - FFT → Mel Filter Bank → Log → DCT
 - 39-dimensional feature vector
       ↓
Acoustic Model (HMM)
 - Maps feature vectors to phonemes
       ↓
Pronunciation Dictionary
 - Maps phonemes to words
       ↓
Language Model (N-gram)
 - Selects most probable word sequence
       ↓
Text Output
```

### Applications of STT:
- Voice assistants (Siri, Google Assistant, Alexa)
- Dictation software (Dragon NaturallySpeaking)
- Live captioning and transcription
- Voice search
- Accessibility tools for hearing-impaired
- Call center automation (IVR systems)

---

## B. Text-to-Speech (TTS) / Speech Synthesis

**Text-to-Speech** converts **written text into spoken audio**.

### Pipeline:

```
Text Input
       ↓
Text Analysis
 - Sentence boundary detection
 - Text normalization:
     "Dr." → "Doctor"
     "$50" → "fifty dollars"
     "2024" → "twenty twenty-four"
 - Tokenization
       ↓
Linguistic Analysis
 - POS tagging
 - Phonetic transcription (using pronunciation dictionary)
 - Syllabification and stress assignment
       ↓
Prosody Generation
 - Duration model (how long each sound lasts)
 - Pitch (F0) model (intonation)
 - Energy (loudness)
       ↓
Waveform Generation
 - Concatenative / Formant / Neural
       ↓
Audio Output (Speaker)
```

### Methods of TTS:

| Method | Description | Quality |
|--------|-------------|---------|
| **Formant Synthesis** | Mathematical vocal tract model | Robotic |
| **Concatenative Synthesis** | Joins recorded speech units | Natural |
| **HMM-based** | Statistical parametric synthesis | Moderate |
| **Neural TTS** (WaveNet, Tacotron) | Deep learning; end-to-end | Excellent |

### Applications of TTS:
- Screen readers for visually impaired (JAWS, NVDA)
- Navigation systems (GPS turn-by-turn directions)
- E-learning platforms and audiobooks
- Customer service IVR (Interactive Voice Response)
- Virtual assistants and chatbots
- Language learning apps

---

### Comparison: STT vs TTS

| Feature | STT | TTS |
|---------|-----|-----|
| Direction | Audio → Text | Text → Audio |
| Core Challenge | Noise, accents, ambiguity | Natural prosody, naturalness |
| Key Tech | HMM, MFCC, Deep Learning | WaveNet, Tacotron, Formant synthesis |
| Example | Google Voice Typing | Amazon Polly, Google TTS |
