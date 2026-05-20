# Module 1: Introduction to Natural Language Understanding
**Subject:** Natural Language Processing | **Hours:** 6

---

## 1. What is Natural Language Understanding (NLU)?

**Natural Language Understanding (NLU)** is a subfield of Artificial Intelligence (AI) and Computational Linguistics that focuses on enabling computers to understand, interpret, and derive meaning from human language in a meaningful way.

- It deals with reading and comprehension of human language by machines.
- NLU is a subset of Natural Language Processing (NLP).
- The ultimate goal is to build systems that can understand language the way humans do.

**Natural Language Processing (NLP)** is the broader field that includes both understanding (NLU) and generation (NLG) of language.

### Why is NLP Hard?
- Language is **ambiguous** — one sentence can have multiple meanings.
- Language is **contextual** — meaning depends on surrounding context.
- Language **evolves** — new words, slang, idioms appear constantly.
- Language has **exceptions** — grammar rules have many exceptions.

---

## 2. Levels of Language Analysis

Language analysis is done at multiple levels, each building on the previous:

### 2.1 Morphological Level
- Deals with the **internal structure of words**.
- Studies how words are formed from smaller units called **morphemes**.
- Example: "unhappiness" = un + happy + ness
- Tasks: stemming, lemmatization, morphological parsing.

### 2.2 Lexical Level
- Deals with individual words and their meanings.
- Involves assigning **Part-of-Speech (POS)** tags.
- Example: "bank" can be a noun (river bank) or verb (to bank money).

### 2.3 Syntactic Level (Syntax)
- Deals with the **structure and grammatical arrangement** of words in a sentence.
- Studies how words combine to form phrases and sentences.
- Uses grammars like **Context-Free Grammar (CFG)**.
- Example: "The dog bites the man" vs "The man bites the dog" — same words, different meaning due to structure.

### 2.4 Semantic Level (Semantics)
- Deals with the **literal meaning** of words, phrases, and sentences.
- Concerned with **what** a sentence means, not just its structure.
- Example: "Colorless green ideas sleep furiously" — syntactically correct but semantically meaningless.
- Tasks: word sense disambiguation, semantic role labeling.

### 2.5 Pragmatic Level (Pragmatics)
- Deals with **language use in context** — how context affects meaning.
- Studies the **intended meaning** behind utterances.
- Example: "Can you pass the salt?" — Not a question about ability; it's a request.
- Includes discourse analysis, speech acts, and coreference resolution.

### 2.6 Discourse Level
- Deals with **multi-sentence** understanding.
- Studies how sentences are connected to form coherent text.
- Includes pronoun resolution, anaphora resolution.
- Example: "John went to the store. He bought milk." — "He" refers to John.

---

## 3. Syntax

**Syntax** is the set of rules that govern the structure of sentences in a language.

- It defines how words are ordered and grouped.
- **Syntactic parsing** is the process of analyzing a sentence's grammatical structure.
- A **parse tree** represents the hierarchical structure of a sentence.

### Syntactic Rules:
- Sentence (S) → Noun Phrase (NP) + Verb Phrase (VP)
- NP → Determiner + Noun
- VP → Verb + NP

**Example:** "The cat sat on the mat"
- S → NP + VP
- NP → "The cat"
- VP → "sat on the mat"

---

## 4. Semantics

**Semantics** refers to the study of meaning in language.

- **Lexical Semantics:** Meaning of individual words.
- **Compositional Semantics:** Meaning of phrases and sentences built from word meanings.
- Key issues:
  - **Polysemy:** One word has multiple related meanings (e.g., "bank").
  - **Homonymy:** One word with unrelated meanings (e.g., "bat" = cricket bat / flying mammal).
  - **Synonymy:** Different words with same meaning (e.g., "big" and "large").

---

## 5. Pragmatics

**Pragmatics** is the study of how context influences language interpretation.

- Concerned with **speaker intentions** and **listener interpretations**.
- Includes:
  - **Speech Acts:** Language used to perform actions (e.g., promising, requesting, commanding).
  - **Implicature:** What is implied but not literally said.
  - **Presupposition:** Assumptions embedded in utterances.

**Example:**
- "It's cold in here." → Pragmatic meaning: "Please close the window."

---

## 6. Applications of NLP

| Application | Description |
|-------------|-------------|
| **Machine Translation** | Translating text from one language to another (e.g., Google Translate) |
| **Speech Recognition** | Converting spoken language to text (e.g., Siri, Alexa) |
| **Text Summarization** | Automatically summarizing long documents |
| **Information Retrieval** | Searching relevant documents (e.g., Google Search) |
| **Question Answering** | Systems that answer natural language questions |
| **Sentiment Analysis** | Determining the sentiment (positive/negative) of text |
| **Chatbots** | Conversational agents (e.g., ChatGPT) |
| **Spell Checking** | Detecting and correcting spelling errors |
| **Named Entity Recognition** | Identifying names, places, organizations in text |
| **POS Tagging** | Assigning grammatical categories to words |

---

## 7. Ambiguity in NLP

**Ambiguity** is one of the biggest challenges in NLP. A sentence or word can have multiple interpretations.

### Types of Ambiguity:

#### 7.1 Lexical Ambiguity
- A single word has multiple meanings.
- Example: "I went to the bank." (river bank or financial bank?)

#### 7.2 Syntactic (Structural) Ambiguity
- A sentence has multiple valid parse trees.
- Example: "I saw a man with a telescope."
  - I used a telescope to see a man.
  - I saw a man who had a telescope.

#### 7.3 Semantic Ambiguity
- A sentence has multiple literal meanings.
- Example: "Every man loves a woman." (one specific woman or different women for each man?)

#### 7.4 Pragmatic Ambiguity
- Ambiguity based on context or speaker intent.
- Example: "Can you help me?" (literally asking about ability vs. a request)

#### 7.5 Referential Ambiguity
- Ambiguity about what a pronoun or noun phrase refers to.
- Example: "The monkey ate the banana because it was hungry." (What is "it"?)

---

## 8. Morphology

**Morphology** is the study of the internal structure of words.

### Key Concepts:

#### 8.1 Morpheme
- The **smallest meaningful unit** of language.
- **Free morpheme:** Can stand alone (e.g., "book", "run").
- **Bound morpheme:** Cannot stand alone; must be attached to another morpheme (e.g., "-ing", "un-", "-ness").

#### 8.2 Types of Morphological Processes:
1. **Inflection:** Adding affixes to show grammatical relationships.
   - Example: run → runs, running, ran
2. **Derivation:** Creating new words from existing ones.
   - Example: happy → unhappy, happiness
3. **Compounding:** Combining two or more words.
   - Example: black + board = blackboard
4. **Cliticization:** Attaching function words to other words.
   - Example: I am → I'm

#### 8.3 Morphological Analysis
- The process of breaking a word into its morphemes.
- Example: "unhappiness" → un- (prefix) + happy (root) + -ness (suffix)

---

## 9. Parsing with Finite State Transducers (FST)

### 9.1 Finite State Automaton (FSA)
- A mathematical model used to recognize patterns in strings.
- Consists of:
  - **States (Q):** Finite set of states.
  - **Alphabet (Σ):** Set of input symbols.
  - **Transitions (δ):** State transition function.
  - **Start State (q0):** Initial state.
  - **Accept States (F):** Set of final/accepting states.

### 9.2 Finite State Transducer (FST)
- An extension of FSA that maps **input strings to output strings**.
- Has **two tapes:** one for input, one for output.
- Used in morphological analysis and generation.
- Formally: FST = (Q, Σ, Δ, δ, λ, q0, F)
  - Σ = input alphabet
  - Δ = output alphabet
  - λ = output function

### 9.3 FST in Morphology
- FSTs can model morphological rules.
- Example: Mapping surface form to lexical form
  - "foxes" → fox + PLURAL
  - "running" → run + PRESENT_PARTICIPLE

### How FST Works:
1. Read input symbol.
2. Transition to a new state.
3. Produce an output symbol.
4. Continue until input is consumed.

### Advantages of FST:
- Efficient for morphological parsing.
- Can be composed, inverted, and minimized.
- Reversible: can be used for both analysis and generation.

---

## 10. Regular Expressions (RegEx)

**Regular Expressions** are formal patterns used to match, search, and manipulate text.

### 10.1 Basic Symbols:

| Symbol | Meaning | Example |
|--------|---------|---------|
| `.` | Any single character | `b.t` matches "bat", "bit", "but" |
| `*` | Zero or more of previous | `ba*` matches "b", "ba", "baa" |
| `+` | One or more of previous | `ba+` matches "ba", "baa" |
| `?` | Zero or one of previous | `colou?r` matches "color" or "colour" |
| `^` | Start of line | `^The` matches "The" at line start |
| `$` | End of line | `end$` matches "end" at line end |
| `[]` | Character class | `[aeiou]` matches any vowel |
| `[^]` | Negated class | `[^aeiou]` matches non-vowel |
| `\|` | Alternation (OR) | `cat\|dog` matches "cat" or "dog" |
| `()` | Grouping | `(ab)+` matches "ab", "abab" |
| `\d` | Digit | `\d+` matches one or more digits |
| `\w` | Word character | `\w+` matches words |
| `\s` | Whitespace | `\s+` matches spaces |

### 10.2 Applications of RegEx in NLP:
- **Tokenization:** Splitting text into tokens (words, sentences).
- **Named Entity Recognition:** Detecting dates, phone numbers, emails.
- **Spell checking:** Pattern matching for errors.
- **Information extraction:** Extracting specific patterns.

### Example:
- Email: `[\w.]+@[\w.]+\.[a-zA-Z]{2,}`
- Phone: `\d{3}-\d{3}-\d{4}`
- Date: `\d{1,2}/\d{1,2}/\d{4}`

---

## 11. Stemmer

**Stemming** is the process of reducing a word to its **root or stem** by removing suffixes.

- The stem may not be a real word.
- Example: "running", "runner", "runs" → "run"
- Example: "happiness", "happy", "happily" → "happi"

### 11.1 Porter Stemmer (Most Famous)
- Developed by Martin Porter in 1980.
- Uses a set of **rules applied in phases**.
- Example rules:
  - Remove "sses" → "ss" (e.g., "caresses" → "caress")
  - Remove "ies" → "i" (e.g., "ponies" → "poni")
  - Remove "ing" (e.g., "running" → "run")

### 11.2 Lovins Stemmer
- Removes the longest possible suffix.
- Single-pass algorithm.

### 11.3 Snowball Stemmer
- Improved version of Porter Stemmer.
- Supports multiple languages.

### Stemming vs. Lemmatization:
| Feature | Stemming | Lemmatization |
|---------|----------|---------------|
| Output | Stem (may not be real word) | Lemma (real dictionary word) |
| Method | Rule-based suffix removal | Dictionary lookup + grammar |
| Speed | Faster | Slower |
| Example | "better" → "bett" | "better" → "good" |

---

## 12. Spelling Errors

**Spelling errors** are mistakes in the written form of words. NLP systems must detect and correct them.

### 12.1 Types of Spelling Errors:

#### Non-word Errors
- The misspelled word is not a valid word in the language.
- Example: "recieve" instead of "receive".
- Easier to detect using a dictionary.

#### Real-word Errors
- The misspelled word is a valid word but incorrect in context.
- Example: "Their going to the park" (should be "They're").
- Harder to detect; requires contextual analysis.

### 12.2 Causes of Spelling Errors:
1. **Typographic errors:** Wrong key pressed (e.g., "teh" for "the").
2. **Cognitive errors:** Incorrect knowledge of spelling (e.g., "recieve").
3. **Phonetic errors:** Spelling based on pronunciation (e.g., "nite" for "night").
4. **OCR errors:** Errors in optical character recognition.

### 12.3 Spelling Correction Approaches:

#### Minimum Edit Distance
- Measures how many **insertions, deletions, and substitutions** are needed to convert one word to another.
- Also called **Levenshtein Distance**.
- Example: "kitten" → "sitting"
  - kitten → sitten (substitute 'k' with 's')
  - sitten → sittin (substitute 'e' with 'i')
  - sittin → sitting (insert 'g')
  - Edit distance = 3

#### Noisy Channel Model
- Assumes the correct word is passed through a "noisy channel" and becomes the misspelled word.
- Goal: Find the most likely correct word given the observed misspelled word.
- P(correct | observed) ∝ P(observed | correct) × P(correct)

#### n-gram Based Methods
- Use language models to find the most likely correction in context.
- Example: "I want to by a car" — context suggests "buy" not "by".

### 12.4 Spelling Correction Pipeline:
1. Detect the misspelled word (non-word or real-word error).
2. Generate candidate corrections (words with small edit distance).
3. Rank candidates using language model probability.
4. Select the best correction.

---

## Summary Table: Module 1

| Topic | Key Concept |
|-------|-------------|
| NLU | Machine understanding of human language |
| Levels of Analysis | Morphological → Lexical → Syntactic → Semantic → Pragmatic → Discourse |
| Syntax | Grammatical structure of sentences |
| Semantics | Meaning of words and sentences |
| Pragmatics | Language in context, speaker intent |
| Ambiguity | Lexical, Syntactic, Semantic, Pragmatic |
| Morphology | Internal structure of words; morphemes |
| FST | Maps input strings to output strings; used in morphology |
| RegEx | Pattern matching; tokenization, NER |
| Stemmer | Reduces words to root form |
| Spelling Errors | Non-word and real-word errors; Levenshtein distance |

---

## Important Exam Questions

1. What are the different levels of language analysis in NLP? Explain each with examples.
2. Explain the concept of ambiguity in NLP with types and examples.
3. What is morphology? Explain types of morphemes with examples.
4. Explain Finite State Transducers (FST) and their role in morphological parsing.
5. What are regular expressions? List common regex symbols with examples.
6. What is stemming? Explain the Porter Stemmer algorithm.
7. Differentiate between stemming and lemmatization.
8. Explain types of spelling errors and methods for spelling correction.
9. What is Minimum Edit Distance? Calculate the edit distance between "kitten" and "sitting".
10. Explain the applications of NLP.
