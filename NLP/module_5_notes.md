# Module 5: WSD, IR, Pragmatics, NLG & MT
**Subject:** Natural Language Processing | **Hours:** 6

---

## 1. Word Sense Disambiguation (WSD)

**Word Sense Disambiguation (WSD)** is the process of identifying which **sense (meaning)** of a word is intended in a given context, when the word has multiple meanings.

### 1.1 Why WSD is Important?

Many words in English are **polysemous** (have multiple meanings):
- "bank" — (1) financial institution (2) side of a river (3) to tilt an aircraft
- "bass" — (1) a type of fish (2) a low-pitched musical sound
- "plant" — (1) a living organism (2) a factory (3) to place/sow

Without WSD, NLP systems cannot correctly process:
- Machine translation (different words in target language)
- Information retrieval (different topics)
- Question answering (wrong answers)

### 1.2 WSD Problem Formulation

**Input:** A word w in a context C (surrounding words/sentence).
**Output:** The correct sense sᵢ from a predefined sense inventory (e.g., WordNet).

**Example:**
- "He went to the **bank** to deposit money." → financial institution (bank.n.02)
- "He sat by the river **bank** fishing." → sloping land (bank.n.01)

### 1.3 Approaches to WSD:

---

#### A. Knowledge-Based WSD

Uses lexical resources (dictionaries, thesauri, WordNet) without training data.

**Lesk Algorithm (1986):**
- Compare the **gloss** (definition) of each sense with the context.
- Choose the sense whose gloss has the most **overlap** with the context.

**Example:**
- Context: "I went to the bank to deposit my salary."
- Sense 1 gloss: "a financial institution that accepts deposits."
- Sense 2 gloss: "sloping ground beside a river."
- Overlap: "deposit" matches Sense 1 → assign Sense 1.

**Simplified Lesk:**
- score(sᵢ) = |gloss(sᵢ) ∩ context(w)|
- Choose sense with maximum score.

**Walker's Algorithm:**
- Uses WordNet hierarchy to find related words.
- Expands overlap using hypernyms/hyponyms.

---

#### B. Supervised WSD

Treats WSD as a **classification problem** using labeled training data.

**Approach:**
1. Collect annotated examples (word + context + correct sense).
2. Extract features from the context.
3. Train a classifier (Naive Bayes, SVM, Neural Network).
4. Classify new instances.

**Features used:**
- Surrounding words (context window: 2-5 words on each side).
- POS tags of surrounding words.
- Syntactic relations (subject, object).
- Local collocations (bigrams, trigrams).

**Naive Bayes for WSD:**
$$\hat{s} = \arg\max_{s_i} P(s_i | f_1, f_2, ..., f_n)$$
$$= \arg\max_{s_i} P(s_i) \prod_j P(f_j | s_i)$$

---

#### C. Unsupervised WSD (Word Sense Induction)

Clusters occurrences of a word into groups without using predefined senses.

- Uses clustering algorithms (k-means, hierarchical clustering).
- Does not require annotated data.
- Discovers senses automatically.

---

#### D. Semi-Supervised WSD

Uses a small amount of labeled data + large amount of unlabeled data.

**Bootstrapping (Yarowsky Algorithm):**
1. Start with a small set of labeled seed examples.
2. Train a classifier on seeds.
3. Apply classifier to unlabeled data.
4. Add high-confidence predictions as labeled examples.
5. Repeat until convergence.

---

### 1.4 WSD Evaluation:

**Most Frequent Sense (MFS) Baseline:**
- Always assign the most common sense from the training corpus.
- Simple but surprisingly strong baseline (~50-60% accuracy).

**Sense-tagged Corpus:** SemEval datasets, SensEval provide gold-standard annotated data.

**Evaluation Metric:** Accuracy = Correctly disambiguated / Total instances.

---

## 2. Information Retrieval (IR)

**Information Retrieval (IR)** is the science of finding relevant documents or information from a large collection in response to a user's query.

### 2.1 Types of IR:

| Type | Description |
|------|-------------|
| **Document Retrieval** | Finding relevant documents (e.g., Google Search) |
| **Passage Retrieval** | Finding specific passages |
| **Fact Retrieval** | Finding specific facts/answers |

### 2.2 Basic IR Architecture:

```
User Query
    ↓
Query Processing
 - Tokenization
 - Stop word removal
 - Stemming/Lemmatization
    ↓
Index
 - Inverted Index
    ↓
Matching/Ranking
    ↓
Results (Ranked Documents)
```

### 2.3 Inverted Index

An **inverted index** maps each term to the list of documents containing it.

```
"apple" → [doc1, doc3, doc7]
"mango" → [doc2, doc3, doc5]
"fruit" → [doc1, doc2, doc3, doc4, doc7]
```

Allows fast lookup: "Which documents contain 'apple'?"

---

## 3. Vector Space Model (VSM)

The **Vector Space Model** represents documents and queries as **vectors** in a high-dimensional space.

### 3.1 Basic Idea

- Each unique term in the vocabulary is a **dimension**.
- A document is represented as a vector of term weights.
- Query is also represented as a vector.
- **Similarity** between query and document = angle between vectors (cosine similarity).

### 3.2 Term-Document Matrix

|       | doc1 | doc2 | doc3 | doc4 |
|-------|------|------|------|------|
| apple | 2 | 0 | 1 | 0 |
| mango | 0 | 3 | 1 | 0 |
| fruit | 1 | 2 | 2 | 1 |
| juice | 0 | 1 | 0 | 2 |

### 3.3 Term Weighting: TF-IDF

**Term Frequency (TF):** How often a term appears in a document.
$$TF(t, d) = \frac{\text{count of term } t \text{ in document } d}{\text{total terms in document } d}$$

**Inverse Document Frequency (IDF):** How rare is the term across all documents?
$$IDF(t) = \log\left(\frac{N}{df(t)}\right)$$
- N = total number of documents
- df(t) = number of documents containing term t

**TF-IDF Weight:**
$$TF\text{-}IDF(t, d) = TF(t, d) \times IDF(t)$$

**Intuition:**
- High TF = term is frequent in this document (important for this doc).
- High IDF = term is rare across all documents (discriminative).
- Common words like "the", "is" get low TF-IDF (high DF → low IDF).

### 3.4 Cosine Similarity

$$\cos(\theta) = \frac{\vec{q} \cdot \vec{d}}{|\vec{q}| \times |\vec{d}|}$$

$$= \frac{\sum_{i=1}^{n} q_i \times d_i}{\sqrt{\sum_{i=1}^{n} q_i^2} \times \sqrt{\sum_{i=1}^{n} d_i^2}}$$

- **Range:** 0 to 1 (0 = no similarity, 1 = identical).
- Measures the **angle** between vectors, not magnitude.
- More robust than dot product for different-length documents.

### 3.5 Example Calculation:

Query Q = [1, 0, 1] (apple=1, mango=0, fruit=1)
Doc D = [2, 0, 1] (apple=2, mango=0, fruit=1)

Q·D = 1×2 + 0×0 + 1×1 = 3
|Q| = √(1+0+1) = √2
|D| = √(4+0+1) = √5
cos(Q,D) = 3 / (√2 × √5) = 3/√10 ≈ 0.949

### 3.6 Ranking Documents:
1. Compute TF-IDF vectors for all documents.
2. Represent query as TF-IDF vector.
3. Compute cosine similarity between query and each document.
4. Rank documents by similarity score (highest first).
5. Return top-k documents.

---

## 4. Improving User Queries

Users often don't express their information needs precisely. IR systems can improve query effectiveness.

### 4.1 Stop Word Removal
- Remove very common words that don't carry meaning.
- Examples: "the", "is", "at", "which", "on", "and"
- Reduces index size and improves precision.

### 4.2 Stemming/Lemmatization
- Reduce words to base form for better matching.
- "running", "runs", "ran" → "run"
- Improves recall (finds more relevant documents).

### 4.3 Query Expansion

Add related terms to the user's query to improve recall.

#### Relevance Feedback (Rocchio Algorithm)
- User marks some returned documents as relevant/non-relevant.
- Modify query vector based on feedback.

$$\vec{q}_{new} = \alpha \vec{q}_{old} + \beta \frac{1}{|D_r|} \sum_{d \in D_r} \vec{d} - \gamma \frac{1}{|D_{nr}|} \sum_{d \in D_{nr}} \vec{d}$$

- α, β, γ = weights (typically α=1, β=0.75, γ=0.15)
- Move query toward relevant documents, away from non-relevant.

#### Pseudo Relevance Feedback
- Automatically assume top-k returned documents are relevant.
- No user involvement needed.

#### WordNet-Based Expansion
- Add synonyms, hypernyms from WordNet.
- Example: Query "car" → expand with "automobile", "vehicle".

#### Query Reformulation
- Spell correction of query terms.
- Synonym substitution.

### 4.4 Evaluation of IR Systems:

**Precision:** What fraction of retrieved documents are relevant?
$$Precision = \frac{|Retrieved \cap Relevant|}{|Retrieved|}$$

**Recall:** What fraction of relevant documents are retrieved?
$$Recall = \frac{|Retrieved \cap Relevant|}{|Relevant|}$$

**F1 Score (Harmonic Mean of P and R):**
$$F_1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}$$

**Mean Average Precision (MAP):** Average precision across multiple queries.

---

## 5. Pragmatic Processing: Discourse

**Discourse** refers to language beyond the sentence level — how sentences connect to form coherent text.

### 5.1 What is Discourse?
- A sequence of utterances forming a coherent whole.
- Studies:
  - How sentences relate to each other.
  - How the meaning of later sentences depends on earlier ones.
  - How speakers and listeners manage conversation.

### 5.2 Discourse Coherence

A well-formed discourse is **coherent** — its parts fit together logically.

**Types of Coherence Relations (RST — Rhetorical Structure Theory):**
| Relation | Description | Example |
|----------|-------------|---------|
| **Elaboration** | One unit gives more detail | "John is sick. He has a fever." |
| **Cause** | One unit causes another | "It rained. The road was wet." |
| **Contrast** | Two units oppose each other | "She is tall. He is short." |
| **Concession** | Unexpected relationship | "Although it rained, we went out." |
| **Sequence** | Temporal ordering | "First, boil water. Then, add tea." |
| **Summary** | One unit summarizes | "In conclusion, NLP is important." |

### 5.3 Coreference Resolution

**Coreference:** When two or more expressions refer to the **same entity**.

**Example:**
"John went to the store. **He** bought milk. **The customer** paid with cash."
- "He" and "The customer" both refer to John.

**Types of referential expressions:**
- **Pronouns:** he, she, it, they
- **Definite NPs:** "the man", "the store"
- **Names:** John, Mary

**Coreference Resolution Steps:**
1. Identify all **mentions** (possible referring expressions).
2. Group mentions into **coreference chains**.
3. Resolve pronouns to their antecedents.

**Algorithms:**
- Hobbs Algorithm (rule-based)
- Log-linear models (supervised)
- Neural models (modern approach)

### 5.4 Anaphora Resolution

**Anaphora:** A linguistic expression that refers back to something mentioned earlier.

**Types:**
- **Pronominal anaphora:** "Mary left. **She** was tired." (She = Mary)
- **Nominal anaphora:** "I met a dog. **The animal** was friendly." (The animal = the dog)
- **Zero anaphora:** The referent is omitted (common in Japanese, Chinese).

### 5.5 Discourse Segmentation

Divides text into **segments** based on topic changes.

- **TextTiling Algorithm:** Measures lexical cohesion between adjacent blocks.
  - If similarity drops, it signals a topic boundary.

### 5.6 Speech Acts (Pragmatics)

**Speech Act Theory** (Austin & Searle):
The idea that language is used to **perform actions**, not just convey information.

**Types of Speech Acts:**
| Type | Description | Example |
|------|-------------|---------|
| **Assertive** | State a fact | "The Earth is round." |
| **Directive** | Give a command/request | "Pass the salt." |
| **Commissive** | Commit to an action | "I promise to pay you back." |
| **Expressive** | Express emotion | "I'm sorry for your loss." |
| **Declaration** | Change reality through utterance | "I declare you married." |

---

## 6. Natural Language Generation (NLG)

**Natural Language Generation (NLG)** is the process of automatically producing natural language text from non-linguistic data or representations.

It is the **inverse** of NLP — instead of understanding, it generates.

### 6.1 Applications of NLG:
- **Report generation:** Financial reports, weather reports, sports summaries.
- **Chatbot responses:** Generating appropriate replies.
- **Summarization:** Generating summaries from longer text.
- **Machine Translation:** Generating target language text.
- **Image captioning:** Generating text descriptions of images.

### 6.2 NLG Pipeline:

```
Input (Data / Semantic Representation)
        ↓
1. Content Determination
   - Decide what to say
   - Select relevant facts
        ↓
2. Discourse Planning
   - Organize content into a structure
   - Decide order of information
        ↓
3. Sentence Planning
   - Decide sentence boundaries
   - Choose referring expressions
   - Aggregate information
        ↓
4. Lexicalization
   - Choose appropriate words
   - Select verbs, nouns, etc.
        ↓
5. Syntactic Realization
   - Apply grammar rules
   - Generate grammatically correct sentences
        ↓
6. Morphological Realization
   - Handle inflection
   - Capitalize, punctuate
        ↓
Text Output
```

### 6.3 NLG Components:

#### Content Determination
- Decides **what information** to include.
- Uses relevance criteria, user model.
- Example: For a weather report, select temperature, precipitation, wind.

#### Discourse Planning
- Organizes content coherently.
- Creates a **document plan** (hierarchical structure).
- Uses RST or other discourse models.

#### Lexical Choice (Lexicalization)
- Selects words to express concepts.
- Synonym selection (big vs. large vs. huge).
- Considers formality, register, style.

#### Referring Expression Generation
- Chooses how to refer to entities.
- First mention: "a red dog" → Later: "the dog" → Then: "it"

#### Surface Realization
- Converts abstract plan into actual sentences.
- Applies grammar rules (CFG, templates).
- Handles agreement, tense, morphology.

### 6.4 Template-based NLG:
- Simplest approach: fill in templates.
- "The temperature in [CITY] is [TEMP] degrees."
- Easy to implement but not flexible.

### 6.5 Neural NLG:
- Modern approach using deep learning.
- **GPT, T5, BART** models for text generation.
- Can generate fluent, diverse text.
- Challenges: hallucination, coherence over long texts.

---

## 7. Machine Translation (MT)

**Machine Translation (MT)** is the task of automatically translating text from one language (source) to another (target).

### 7.1 Approaches to MT:

---

#### A. Rule-Based Machine Translation (RBMT)

Uses manually crafted linguistic rules.

**Components:**
1. **Source language analyzer:** Parses source text.
2. **Transfer module:** Converts source structure to target structure.
3. **Target language generator:** Generates target text.

**Types:**
- **Direct RBMT:** Word-for-word substitution with minimal analysis.
- **Transfer-based RBMT:** Parse source, transfer structure, generate target.
- **Interlingua RBMT:** Convert to language-neutral representation, then generate target.

**Advantages:**
- High precision for covered domains.
- Interpretable.

**Disadvantages:**
- Very expensive to develop (requires linguist experts).
- Doesn't scale to new languages easily.
- Brittle — fails on out-of-grammar input.

---

#### B. Statistical Machine Translation (SMT)

Uses statistical models learned from large bilingual corpora.

**Key Components:**

1. **Translation Model P(F|E):** 
   - Probability of source sentence F given English sentence E.
   - Learned from parallel corpora (aligned sentence pairs).
   - Word alignment models (IBM Models 1-5).

2. **Language Model P(E):**
   - Probability of the English sentence E.
   - Ensures output is fluent English.
   - N-gram language model.

3. **Noisy Channel Model:**
$$\hat{E} = \arg\max_E P(E|F) = \arg\max_E P(F|E) \cdot P(E)$$

**Phrase-Based SMT (PBSMT):**
- Extends word-level to phrase-level translation.
- Learn translation of phrases (multi-word units).
- Reordering model handles word order differences.

**Advantages:**
- Data-driven — improves with more data.
- Better coverage than RBMT.

**Disadvantages:**
- Requires large parallel corpora.
- Doesn't capture long-range dependencies well.

---

#### C. Neural Machine Translation (NMT)

Uses deep neural networks (specifically sequence-to-sequence models with attention).

**Encoder-Decoder Architecture:**

```
Source: "Je suis étudiant"
        ↓
    Encoder (RNN/Transformer)
        ↓
    Context Vector (Encoded meaning)
        ↓
    Decoder (RNN/Transformer)
        ↓
Target: "I am a student"
```

**Attention Mechanism:**
- At each decoding step, focus on relevant parts of the source sentence.
- Soft alignment: compute attention weight for each source word.
- Overcomes the bottleneck of fixed-size context vector.

**Transformer Architecture (2017):**
- "Attention is All You Need" (Vaswani et al.)
- Uses **self-attention** (no RNNs).
- Processes all positions simultaneously (parallelizable).
- State of the art for MT.

**Examples:** Google Translate, DeepL, Microsoft Translator.

**Advantages:**
- Best quality among all approaches.
- Handles long-range dependencies.
- End-to-end training.

**Disadvantages:**
- Requires huge training data.
- Hard to interpret.
- Can "hallucinate" (generate plausible but wrong translations).

---

### 7.2 Evaluation of MT:

#### BLEU Score (Bilingual Evaluation Understudy)
- Compares MT output with human reference translations.
- Measures **n-gram overlap** between MT output and reference.

$$BLEU = BP \times \exp\left(\sum_{n=1}^{N} w_n \log p_n\right)$$

- **BP (Brevity Penalty):** Penalizes short translations.
- **pₙ:** Precision of n-grams (n = 1, 2, 3, 4).
- Range: 0 to 1 (higher is better).
- Typical good scores: 0.3-0.5 for news translation.

**Example:**
- Reference: "The cat is on the mat."
- MT Output: "The cat sat on the mat."
- Unigram overlap: 5/6 ≈ 0.83
- Bigram overlap: 4/5 = 0.8

---

## Summary Table: Module 5

| Topic | Key Points |
|-------|------------|
| WSD | Disambiguating word meaning in context; Lesk, supervised, Yarowsky |
| Lesk Algorithm | Gloss overlap with context |
| IR Vector Space | Documents as TF-IDF vectors; cosine similarity for ranking |
| TF-IDF | TF × log(N/df); weights discriminative terms |
| Query Improvement | Stop words, stemming, Rocchio feedback, WordNet expansion |
| Discourse | Coherence relations, coreference, anaphora, speech acts |
| Coreference | Linking multiple expressions to same entity |
| NLG Pipeline | Content → Discourse planning → Sentence planning → Lexicalization → Realization |
| MT Rule-Based | Manual rules; expensive but precise |
| MT Statistical | Noisy channel: P(E\|F) ∝ P(F\|E) × P(E) |
| MT Neural | Encoder-decoder + Attention; Transformer; state of the art |
| BLEU | N-gram precision-based MT evaluation metric |

---

## Important Exam Questions

1. What is Word Sense Disambiguation (WSD)? Why is it important?
2. Explain the Lesk algorithm for WSD with an example.
3. Explain the supervised approach to WSD using Naive Bayes.
4. What is the Vector Space Model in IR? Explain TF-IDF with an example.
5. How is cosine similarity used to rank documents? Explain with a numerical example.
6. What are the techniques for improving user queries in IR?
7. Explain the Rocchio algorithm for relevance feedback.
8. What is discourse? Explain coreference resolution and anaphora resolution.
9. What are speech acts? Explain the types with examples.
10. Explain the Natural Language Generation (NLG) pipeline with all stages.
11. What is Machine Translation? Compare rule-based, statistical, and neural MT approaches.
12. What is the BLEU score? How is it used to evaluate MT systems?
