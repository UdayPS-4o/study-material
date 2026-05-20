# Q5 Solved — Module 5: WSD, IR, Discourse, NLG, Machine Translation
**IPS Academy | PCC-CL13/PEC-C101(C) | June 2025**

---

## Q.5(i) — MCQ [1 Mark]

**Which of the following is NOT a common approach to Word Sense Disambiguation (WSD)?**

- A) Supervised learning
- B) Rule-based methods
- C) **Quantum computing ✅**
- D) Knowledge-based methods

**Answer: C) Quantum computing**

**Explanation:**
The three standard approaches to WSD are:
- **Supervised learning:** Train classifiers (Naive Bayes, SVM) on sense-tagged data.
- **Knowledge-based methods:** Use lexical resources like WordNet, Lesk algorithm.
- **Unsupervised methods:** Clustering-based sense induction.
- **Rule-based:** Pattern matching rules.

**Quantum computing** is not a recognized approach to WSD. It is a computing paradigm unrelated to NLP disambiguation methods.

---

## Q.5(ii) — MCQ [1 Mark]

**In Pragmatic Processing, discourse analysis primarily focuses on:**

- A) Parsing sentence structures
- B) Identifying individual word meanings
- C) Translating words into another language
- D) **Understanding context and coherence in a conversation ✅**

**Answer: D) Understanding context and coherence in a conversation**

**Explanation:**
**Discourse analysis** in pragmatic processing deals with:
- How sentences connect to form coherent text.
- Coreference and anaphora resolution.
- Speech acts and speaker intent.
- Topic structure and coherence relations.

It goes **beyond individual sentences** to understand meaning in context — precisely option D.

---

## Q.5(iii) — Importance of Word Sense Disambiguation (WSD) in NLP [4 Marks]

### What is WSD?

**Word Sense Disambiguation (WSD)** is the task of determining which **sense (meaning)** of a polysemous word is intended in a given context.

**Example:**
- "I went to the **bank** to deposit money." → bank = financial institution
- "He sat on the river **bank** and fished." → bank = sloping land

---

### Importance of WSD in NLP:

#### 1. Machine Translation
- Different senses of a word translate to **different words** in the target language.
- "bank" (financial) → French: "banque" | "bank" (river) → French: "rive"
- Without WSD, the translation system picks the wrong word.

#### 2. Information Retrieval (IR)
- A search for "apple" should return either fruit documents or tech company documents, not both.
- WSD helps retrieve **relevant documents** only.
- Improves **precision** of search results.

#### 3. Question Answering
- "What is a bat made of?" → depends on which sense of "bat" (cricket/baseball bat OR flying mammal).
- WSD ensures the correct sense is used to find the answer.

#### 4. Text Summarization
- Correct word sense ensures the summary preserves the **right meaning**.
- Reduces noise from incorrect sense selection.

#### 5. Natural Language Generation (NLG)
- When generating text, the correct sense must be chosen.
- Prevents semantically incorrect sentences.

#### 6. Coreference Resolution
- Resolving pronouns requires knowing what entity they refer to.
- WSD helps determine the type of entity (person, place, thing) from word sense.

#### 7. Sentiment Analysis
- "That movie was sick!" → "sick" = great (informal) OR disgusting?
- WSD resolves slang and domain-specific senses for correct sentiment.

---

### Approaches to WSD:

| Approach | Method | Example |
|----------|--------|---------|
| **Knowledge-based** | Lesk (gloss overlap) | WordNet gloss matching |
| **Supervised** | Naive Bayes, SVM | Train on SemEval data |
| **Unsupervised** | Clustering | Word sense induction |
| **Semi-supervised** | Yarowsky bootstrapping | Seed examples + expansion |

**Baseline:** Most Frequent Sense (MFS) — always choose the most common sense. (~55-65% accuracy)

---

## Q.5(iv) — Vector Space Model: Advantages and Limitations [6 Marks]

### What is the Vector Space Model (VSM)?

The **Vector Space Model (VSM)** is a mathematical framework for representing text documents and queries as **vectors** in a high-dimensional space, where each dimension corresponds to a vocabulary term.

**Core idea:** Documents with similar content have similar vector directions → high cosine similarity.

---

### How VSM Works:

#### 1. Term-Document Matrix
Each document is represented as a vector of term weights.

|        | doc1 | doc2 | doc3 |
|--------|------|------|------|
| apple  | 2    | 0    | 1    |
| search | 1    | 3    | 2    |
| engine | 0    | 2    | 1    |

#### 2. TF-IDF Weighting
$$TF\text{-}IDF(t,d) = TF(t,d) \times \log\left(\frac{N}{df(t)}\right)$$
- Gives high weight to terms that are frequent in this document but rare overall.

#### 3. Cosine Similarity for Ranking
$$\cos(q, d) = \frac{\vec{q} \cdot \vec{d}}{|\vec{q}| \times |\vec{d}|}$$

---

### Advantages of VSM in Modern Search Engines:

| Advantage | Explanation |
|-----------|-------------|
| **Simple and efficient** | Easy to implement; fast retrieval with inverted index |
| **Ranked retrieval** | Returns documents ranked by relevance (not just yes/no) |
| **No Boolean rigidity** | Doesn't require exact keyword match; partial matches allowed |
| **Geometric intuition** | Cosine similarity has clear mathematical interpretation |
| **TF-IDF weighting** | Naturally down-weights common words and up-weights rare, discriminative terms |
| **Scalable** | Works well for large document collections |
| **Query-document normalization** | Cosine handles different document lengths fairly |
| **Foundation for advanced models** | BM25, LSA, and neural retrieval build on VSM concepts |

---

### Limitations of VSM in Modern Search Engines:

| Limitation | Explanation |
|------------|-------------|
| **Bag-of-words** | Ignores word **order** and syntax ("dog bites man" = "man bites dog") |
| **No semantic understanding** | "car" and "automobile" treated as completely different terms |
| **Sparsity** | Most term weights are zero; high-dimensional sparse vectors |
| **Independence assumption** | Terms assumed independent — ignores co-occurrence patterns |
| **No context** | A word's meaning is fixed regardless of context |
| **Vocabulary mismatch** | Query "vehicle" won't match document about "cars" |
| **No negation handling** | "not good" treated similarly to "good" |
| **Scalability to synonyms** | All synonyms must be explicitly in query |

---

### How Modern Search Engines Overcome VSM Limitations:

| Limitation | Solution |
|------------|---------|
| No semantics | **Latent Semantic Analysis (LSA)** — SVD to find latent topics |
| Vocabulary mismatch | **Query expansion** with WordNet synonyms; Pseudo-relevance feedback |
| No word order | **BM25** improved term weighting |
| No context | **Neural retrieval** (BERT, DPR) — contextual dense embeddings |
| Semantic similarity | **Word embeddings** (Word2Vec, GloVe) — semantic vector spaces |

### BM25 (Best Match 25):
An improved TF-IDF formula that better handles document length:
$$BM25(t,d) = IDF(t) \times \frac{TF(t,d) \times (k_1+1)}{TF(t,d) + k_1 \times (1-b+b\times\frac{|d|}{avgdl})}$$
Used by Elasticsearch, Apache Lucene.

---

## OR Q.5(iv) — Compare Approaches to Machine Translation [6 Marks]

### What is Machine Translation (MT)?

**Machine Translation** is the automatic translation of text from a **source language** to a **target language**.

---

### Approach 1: Rule-Based Machine Translation (RBMT)

**Definition:** Uses manually crafted linguistic rules and dictionaries.

**Architecture:**
```
Source Text
     ↓ Source Language Analyzer (parse, morphology, POS)
Intermediate Representation
     ↓ Transfer Rules (map source structures to target structures)
Target Language Structure
     ↓ Target Language Generator
Translated Text
```

**Types:**
- **Direct:** Word-for-word substitution with minimal analysis.
- **Transfer-based:** Parse source → structural transfer → generate target.
- **Interlingua:** Convert to language-neutral intermediate representation, then generate any target language.

**Example:** English "The cat sat." → parse → transfer rules → French "Le chat s'est assis."

**Advantages:**
- High precision for well-covered domains and language pairs.
- Interpretable — rules can be inspected and debugged.
- Works without training data.

**Disadvantages:**
- Extremely expensive to develop (requires linguistics experts).
- Brittle — breaks on new vocabulary and constructions.
- Hard to scale to many language pairs.
- Poor handling of idiomatic expressions.

---

### Approach 2: Statistical Machine Translation (SMT)

**Definition:** Learns translation from large parallel bilingual corpora using probability models.

**Noisy Channel Model:**
$$\hat{E} = \arg\max_E P(E|F) = \arg\max_E \underbrace{P(F|E)}_{\text{Translation Model}} \times \underbrace{P(E)}_{\text{Language Model}}$$

**Components:**
1. **Translation Model P(F|E):** Learned from aligned parallel text using IBM word alignment models.
2. **Language Model P(E):** N-gram model ensuring fluent output.
3. **Decoder:** Searches for best E given F.

**Phrase-Based SMT:**
- Learn translations of multi-word phrases.
- "kick the bucket" → translated as a unit, not word-by-word.

**Advantages:**
- Data-driven — improves with more parallel data.
- Better coverage than RBMT.
- Can handle new vocabulary if seen in training.

**Disadvantages:**
- Requires large parallel corpora (difficult for low-resource languages).
- Poor handling of long-range dependencies.
- Reordering is a major challenge (e.g., English SOV vs Japanese).

---

### Approach 3: Neural Machine Translation (NMT)

**Definition:** End-to-end neural network learns to translate directly from parallel text.

**Encoder-Decoder Architecture:**
```
Source: "Je suis étudiant" (French)
           ↓
    Encoder (Transformer/RNN)
    (Reads source, builds representation)
           ↓
    Context / Encoder Hidden States
           ↓
    Decoder (Transformer/RNN) + Attention
    (Generates target word by word)
           ↓
Target: "I am a student" (English)
```

**Attention Mechanism:**
- At each decoding step, compute **attention weights** over all encoder hidden states.
- Focus on most relevant source words for current target word.
- Overcomes fixed-size context vector bottleneck of basic encoder-decoder.

**Transformer (Vaswani et al., 2017):**
- Replaces RNNs entirely with **self-attention**.
- Processes all tokens **simultaneously** (highly parallelizable).
- State of the art for all MT benchmarks.
- Used in: Google Translate, DeepL, Microsoft Translator.

**Advantages:**
- Highest translation quality.
- Handles long-range dependencies naturally.
- End-to-end training — no separate components needed.
- Scales well with data and compute.

**Disadvantages:**
- Requires huge amounts of parallel data.
- Computationally expensive to train.
- Can "hallucinate" — generate fluent but factually wrong translations.
- Difficult to interpret or debug.

---

### Comparison Table:

| Feature | RBMT | SMT | NMT |
|---------|------|-----|-----|
| Approach | Manual rules | Statistical models | Neural networks |
| Training data | None needed | Large parallel corpus | Very large corpus |
| Translation quality | Moderate | Good | Excellent |
| Interpretable | Yes | Partially | No |
| Long-range dependency | Poor | Poor | Excellent |
| Scalability | Low | Medium | High |
| Domain adaptation | Hard | Moderate | Easy (fine-tuning) |
| Low-resource languages | Works | Poor | Poor |
| Era | 1950s–1990s | 1990s–2014 | 2014–present |
| Example | Systran | Moses | Google Translate, DeepL |

---

### MT Evaluation — BLEU Score:

**BLEU (Bilingual Evaluation Understudy):**
$$BLEU = BP \times \exp\left(\sum_{n=1}^{4} w_n \log p_n\right)$$

- **BP:** Brevity Penalty — penalizes too-short translations.
- **pₙ:** Precision of n-gram overlap with reference translation.
- **Range:** 0 to 1 (higher = better).
- Typical good scores: 0.3–0.5 for news translation.

**Example:**
- Reference: "The cat is on the mat."
- MT Output: "The cat sat on the mat."
- 1-gram precision: 5/6 ≈ 0.83

---

## Quick Answers Summary

| Question | Answer |
|----------|--------|
| Q5(i) MCQ | C) Quantum computing (NOT a WSD approach) |
| Q5(ii) MCQ | D) Understanding context and coherence |
| Q5(iii) | WSD is important for MT, IR, QA, Summarization, Sentiment Analysis |
| Q5(iv) | VSM: simple, ranked retrieval, TF-IDF; Limits: bag-of-words, no semantics |
| OR Q5(iv) | RBMT (rules) → SMT (statistics, noisy channel) → NMT (neural, transformer) |
