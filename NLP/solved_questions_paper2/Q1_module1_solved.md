# Q1 Solved — Module 1: NLU, Levels of Analysis, Ambiguity, Morphology
**IPS Academy | PCC-CL13/PEC-C101(C) | June 2025**

---

## Q.1(i) — MCQ [1 Mark]

**Which of the following is a level of language analysis that deals with the meaning of words and sentences?**

- A) Syntax
- B) **Semantics ✅**
- C) Pragmatics
- D) Morphology

**Answer: B) Semantics**

**Explanation:**
- **Semantics** is the level of language analysis that deals with the **literal meaning** of words, phrases, and sentences.
- Syntax deals with structure, Pragmatics with speaker intent/context, Morphology with word internal structure.

---

## Q.1(ii) — MCQ [1 Mark]

**In the context of NLU, which of the following techniques is most used for analysing word morphology and can be implemented with Finite State Transducers (FSTs)?**

- A) Regular Expressions
- B) **Parsing ✅**
- C) Stemmer
- D) Pragmatics

**Answer: B) Parsing**

**Explanation:**
- **FSTs** are most commonly used for **morphological parsing** — the process of mapping a surface word form to its lexical representation.
- FSTs read input symbols, transition between states, and produce output, making them ideal for morphological analysis (e.g., "running" → run+PresentParticiple).
- Regular Expressions can be implemented as FSAs (not FSTs), and Stemmers are simpler rule-based tools.

---

## Q.1(iii) — Define Pragmatics; How it Differs from Semantics [4 Marks]

### Pragmatics — Definition:

**Pragmatics** is the branch of linguistics and NLU that studies how **context influences the interpretation of language**. It deals with the **speaker's intended meaning** rather than the literal meaning of words.

Pragmatics is concerned with:
- The **purpose** behind an utterance.
- The **social context** of communication.
- What is **implied** but not directly said.

### How Pragmatics Differs from Semantics:

| Feature | Semantics | Pragmatics |
|---------|-----------|------------|
| Focus | Literal/dictionary meaning | Intended/contextual meaning |
| Scope | Words, phrases, sentences | Utterances in context |
| Speaker intent | Not considered | Central concern |
| Context | Independent of context | Heavily context-dependent |

### Examples:

**Example 1:**
- Utterance: "Can you pass the salt?"
- **Semantic meaning:** A question about the listener's physical ability.
- **Pragmatic meaning:** A **request** — "Please pass the salt."

**Example 2:**
- Utterance: "It's cold in here."
- **Semantic meaning:** A statement about room temperature.
- **Pragmatic meaning:** A **request** to close the window or turn on the heater.

**Example 3 — Speech Acts:**
- "I promise to pay you back." → **Commissive** speech act (commitment).
- "You're fired." → **Declaration** speech act (changes reality through utterance).

### Key Concepts in Pragmatics:
1. **Speech Acts** (Austin & Searle): Language is used to perform actions (promises, requests, declarations).
2. **Implicature** (Grice): What is implied but not literally stated.
3. **Presupposition:** Background assumptions embedded in utterances.
   - "Have you stopped cheating?" → Presupposes you were cheating.
4. **Deixis:** Expressions whose meaning depends on context (here, now, I, you).

---

## Q.1(iv) — Types of Ambiguity in NLU and Impact on NLP [6 Marks]

### What is Ambiguity?

**Ambiguity** occurs when a word, phrase, or sentence can have **more than one valid interpretation**. It is a fundamental challenge in NLP because computers need a single definite meaning to process language correctly.

---

### Types of Ambiguity:

#### 1. Lexical Ambiguity
- A **single word** has multiple meanings.
- **Example:**
  - "I went to the **bank**." → financial institution OR riverbank
  - "She has a **bat**." → cricket bat OR flying mammal
- **NLP Impact:** Wrong word meaning selected → incorrect translation, wrong search results.

#### 2. Syntactic (Structural) Ambiguity
- A sentence can have **multiple valid parse trees**.
- **Example:** "I saw a man **with a telescope**."
  - Parse 1: I [used a telescope] to see a man. (PP modifies VP)
  - Parse 2: I saw [a man who had a telescope]. (PP modifies NP)
- **NLP Impact:** Parser selects wrong structure → wrong semantic interpretation.

#### 3. Semantic Ambiguity
- Multiple **literal meanings** for the same sentence.
- **Example:** "Every man loves a woman."
  - Reading 1: Each man loves some (possibly different) woman. (∀x∃y)
  - Reading 2: There is one specific woman every man loves. (∃y∀x)
- **NLP Impact:** Incorrect logical representation → wrong inference.

#### 4. Pragmatic Ambiguity
- Ambiguity in **speaker's intent** or **contextual meaning**.
- **Example:** "Can you help me?" → Ability question OR request for help.
- **NLP Impact:** Chatbots and dialogue systems misinterpret user requests.

#### 5. Referential Ambiguity
- Unclear what a **pronoun or noun phrase** refers to.
- **Example:** "The monkey ate the banana because **it** was hungry." → Does "it" = monkey or banana?
- **NLP Impact:** Coreference resolution fails → incorrect discourse understanding.

---

### Impact on NLP Applications:

| NLP Task | Impact of Ambiguity |
|----------|---------------------|
| **Machine Translation** | Selects wrong word/phrase in target language |
| **Information Retrieval** | Wrong documents retrieved (e.g., "bank" query) |
| **Speech Recognition** | Homophone confusion (there/their/they're) |
| **Question Answering** | Wrong answer due to misinterpreted question |
| **Parsing** | Multiple parse trees, wrong one selected |
| **Sentiment Analysis** | Misclassified sentiment due to irony/sarcasm |

---

### Solutions for Handling Ambiguity in NLP:
1. **Word Sense Disambiguation (WSD):** Resolves lexical ambiguity using context.
2. **Probabilistic Parsing (PCFG):** Selects the most probable parse tree.
3. **Coreference Resolution:** Resolves referential ambiguity.
4. **Language Models:** Use context (n-gram, neural) to select correct interpretation.
5. **Discourse Analysis:** Uses broader context for pragmatic ambiguity.

---

## OR Q.1(iv) — Importance of Morphology in NLP [6 Marks]

### What is Morphology?

**Morphology** is the study of the **internal structure of words** — how words are formed from smaller meaningful units called **morphemes**.

**Morpheme:** The smallest unit of meaning in a language.
- **Free morpheme:** Stands alone (e.g., "book", "run").
- **Bound morpheme:** Cannot stand alone (e.g., "-ing", "un-", "-ness").

**Example:** "unhappiness" = **un** (prefix) + **happy** (root) + **ness** (suffix)

---

### How Morphology Contributes to Text Processing:

#### 1. Tokenization
- Morphological analysis helps properly split text into tokens.
- Especially important for **compound words** (German, Finnish) and **clitics** ("I'm" → "I am").

#### 2. Stemming and Lemmatization
- Reduces words to their base form for better matching.
- "running", "runs", "ran" → all map to "run".
- Critical for **Information Retrieval** — "running" and "run" should match the same documents.

#### 3. Part-of-Speech (POS) Tagging
- Morphological features (suffix, prefix) help assign POS tags.
- Words ending in **"-tion"** are likely **nouns**.
- Words ending in **"-ly"** are likely **adverbs**.
- Words ending in **"-ing"** after auxiliary verbs are **verb gerunds**.

#### 4. Handling Unknown Words (Out-of-Vocabulary)
- Morphological analysis identifies the structure of unseen words.
- "Unbelievability" → un + believe + ability → negative + verb → noun (negative quality).

#### 5. Machine Translation
- Languages differ in morphological complexity.
- Arabic and Turkish are **agglutinative** (many morphemes per word).
- Proper morphological analysis is essential for accurate translation.

#### 6. Information Extraction
- Extracts named entities and relations correctly.
- Identifies tense, number, and aspect of verbs for temporal reasoning.

---

### Types of Morphological Processes:

| Process | Description | Example |
|---------|-------------|---------|
| **Inflection** | Grammatical variation without changing word class | run → runs, running, ran |
| **Derivation** | Creates new words (can change word class) | happy → unhappy, happiness |
| **Compounding** | Combines two or more words | black + board = blackboard |
| **Cliticization** | Attaches function words | I am → I'm |

### Morphological Analysis Using FST:
- FSTs map surface form → lexical form:
  - "foxes" → fox +Plural
  - "walked" → walk +PastTense
- Reversible: can also generate surface form from lexical form.
