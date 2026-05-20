# NLP — Solved Questions: Module 5
**WSD, IR, Discourse, NLG & Machine Translation**

---

# Q.5(A) — Word Sense Disambiguation (WSD) [5 Marks]

## Answer:

### What is WSD?

**Word Sense Disambiguation (WSD)** is the task of identifying which **sense (meaning)** of a word is intended when it has multiple meanings, based on context.

**Example:**
- "He deposited money in the **bank**." → financial institution
- "He fished near the river **bank**." → sloping land beside river

---

### Approaches to WSD:

---

#### 1. Knowledge-Based — Lesk Algorithm

Uses **dictionary glosses** (definitions) to disambiguate.

**Algorithm:**
1. For each sense sᵢ of word w:
   - Compute overlap = |gloss(sᵢ) ∩ context(w)|
2. Choose sense with **maximum overlap**.

**Example:**
- Word: "bank" | Context: "deposit salary account money"
- Sense 1 gloss: "a financial institution that accepts **deposits** and **money**" → overlap = 2
- Sense 2 gloss: "sloping ground beside a river" → overlap = 0
- **→ Choose Sense 1 (financial institution)**

---

#### 2. Supervised WSD

Treats WSD as a **classification problem**.

**Steps:**
1. Collect labeled examples: (word, context, correct sense).
2. Extract features: surrounding words, POS tags, bigrams.
3. Train classifier (Naive Bayes, SVM).
4. Predict sense of new instances.

**Naive Bayes:**
$$\hat{s} = \arg\max_{s_i} P(s_i) \prod_j P(f_j | s_i)$$

---

#### 3. Yarowsky Algorithm (Semi-Supervised)

**Bootstrapping** approach using seed examples.

**Steps:**
1. Start with few labeled seed examples.
2. Train classifier on seeds.
3. Apply to unlabeled data; add high-confidence predictions.
4. Retrain. Repeat until convergence.

**Uses "one sense per discourse"** and **"one sense per collocation"** principles.

---

### Evaluation:

- **Most Frequent Sense (MFS) Baseline:** Always pick most common sense. (~50-60% accuracy)
- **Metric:** Accuracy = Correctly disambiguated / Total instances.

---

# Q.5(B) — Information Retrieval: Vector Space Model [5 Marks]

## Answer:

### What is Information Retrieval (IR)?

IR is the task of finding **relevant documents** from a large collection in response to a user's query.

---

### Vector Space Model (VSM):

Represents documents and queries as **vectors** in a high-dimensional space where each dimension is a vocabulary term.

---

### TF-IDF Weighting:

**Term Frequency (TF):** How often a term appears in a document.
$$TF(t, d) = \frac{\text{count of } t \text{ in } d}{\text{total terms in } d}$$

**Inverse Document Frequency (IDF):** How rare is the term across all documents?
$$IDF(t) = \log\left(\frac{N}{df(t)}\right)$$
N = total documents, df(t) = documents containing t.

**TF-IDF:**
$$w(t, d) = TF(t, d) \times IDF(t)$$

**Intuition:**
- Common words (the, is, a) → Low TF-IDF (high df → low IDF)
- Rare, specific words → High TF-IDF

---

### Cosine Similarity:

Measures similarity between query vector q and document vector d:

$$\cos(\theta) = \frac{\vec{q} \cdot \vec{d}}{|\vec{q}| \times |\vec{d}|} = \frac{\sum q_i d_i}{\sqrt{\sum q_i^2} \times \sqrt{\sum d_i^2}}$$

**Range:** 0 (no similarity) to 1 (identical).

---

### Worked Example:

**Vocabulary:** {apple, mango, fruit}

| Document | apple | mango | fruit |
|----------|-------|-------|-------|
| D1 | 2 | 0 | 1 |
| D2 | 0 | 3 | 2 |

**Query Q:** {apple=1, mango=0, fruit=1}

**Similarity(Q, D1):**
- Q·D1 = (1×2) + (0×0) + (1×1) = 3
- |Q| = √(1+0+1) = √2
- |D1| = √(4+0+1) = √5
- cos = 3 / (√2 × √5) = 3/√10 ≈ **0.949**

**Similarity(Q, D2):**
- Q·D2 = (1×0) + (0×3) + (1×2) = 2
- |D2| = √(0+9+4) = √13
- cos = 2 / (√2 × √13) = 2/√26 ≈ **0.392**

**→ D1 is more relevant to the query.**

---

### Improving User Queries:

#### 1. Stop Word Removal
- Remove common words (the, is, at, and).
- Reduces noise and index size.

#### 2. Stemming
- Reduce words to root form.
- "running" → "run" (improves recall).

#### 3. Rocchio Relevance Feedback:
$$\vec{q}_{new} = \alpha\vec{q}_{old} + \beta \frac{1}{|D_r|}\sum_{d \in D_r}\vec{d} - \gamma \frac{1}{|D_{nr}|}\sum_{d \in D_{nr}}\vec{d}$$
- Move query **toward** relevant docs, **away** from non-relevant.

#### 4. Query Expansion via WordNet:
- Add synonyms, related terms.
- "car" → expand with "automobile", "vehicle".

---

### IR Evaluation Metrics:

$$Precision = \frac{|Retrieved \cap Relevant|}{|Retrieved|}$$

$$Recall = \frac{|Retrieved \cap Relevant|}{|Relevant|}$$

$$F_1 = 2 \times \frac{Precision \times Recall}{Precision + Recall}$$

---

# Q.5(C) — Pragmatic Processing: Discourse [5 Marks]

## Answer:

### What is Discourse?

**Discourse** is the study of language **beyond the sentence level** — how multiple sentences connect to form a coherent text or conversation.

---

### 1. Discourse Coherence

A text is **coherent** when its parts logically fit together.

**Coherence Relations (RST):**

| Relation | Description | Example |
|----------|-------------|---------|
| **Elaboration** | More detail | "She is sick. She has a fever." |
| **Cause** | Causation | "It rained. The road was wet." |
| **Contrast** | Opposition | "She is tall. He is short." |
| **Sequence** | Temporal order | "First boil water. Then add tea." |
| **Concession** | Unexpected | "Although it rained, we went out." |

---

### 2. Coreference Resolution

**Coreference:** Two expressions refer to the **same real-world entity**.

**Example:**
"John went to the store. **He** bought milk. **The man** paid cash."
- "He" and "The man" → both refer to **John**.

**Types of referring expressions:**
- Pronouns: he, she, it, they
- Definite NPs: "the man", "the store"
- Proper names: John, Mary

**Resolution Algorithm (Hobbs):**
- Traverse parse tree to find most recent compatible antecedent.

---

### 3. Anaphora Resolution

**Anaphora:** An expression that refers back to something mentioned earlier.

**Types:**
- **Pronominal:** "Mary left. **She** was tired." → She = Mary
- **Nominal:** "I met a dog. **The animal** barked." → The animal = the dog
- **Zero:** Omitted referent (common in Japanese, pro-drop languages)

---

### 4. Speech Acts (Austin & Searle):

Language is used to **perform actions**, not just convey facts.

| Type | Description | Example |
|------|-------------|---------|
| **Assertive** | State a fact | "It is raining." |
| **Directive** | Command/Request | "Please sit down." |
| **Commissive** | Promise/Commitment | "I will help you." |
| **Expressive** | Express emotion | "I'm sorry for your loss." |
| **Declaration** | Change reality | "I now pronounce you married." |

---

# Q.5(D) — Natural Language Generation (NLG) [5 Marks]

## Answer:

### What is NLG?

**Natural Language Generation (NLG)** is the process of automatically producing natural language text from **non-linguistic data** or **semantic representations**.

NLG is the **inverse** of NLP — instead of understanding, it generates.

---

### Applications:
- Automated report generation (financial, weather, sports)
- Chatbot response generation
- Text summarization
- Machine translation output
- Image captioning

---

### NLG Pipeline:

```
Input Data / Semantic Representation
          ↓
1. CONTENT DETERMINATION
   - Decide what to say
   - Select relevant facts from data
          ↓
2. DISCOURSE PLANNING
   - Organize content into a logical structure
   - Order information
          ↓
3. SENTENCE PLANNING
   - Decide sentence boundaries
   - Choose referring expressions
   - Aggregate related information
          ↓
4. LEXICALIZATION
   - Choose appropriate words and phrases
   - Select verbs, nouns, adjectives
          ↓
5. SYNTACTIC REALIZATION
   - Apply grammar rules (CFG)
   - Generate grammatically correct sentences
          ↓
6. MORPHOLOGICAL REALIZATION
   - Handle inflection (tense, agreement)
   - Add punctuation and capitalization
          ↓
Text Output
```

---

### Detailed Explanation of Each Stage:

#### 1. Content Determination
- Decides **what information** should be in the output.
- Example: For weather report → select temperature, precipitation, wind.

#### 2. Discourse Planning
- Creates a **document plan** (hierarchical structure).
- Uses RST or similar frameworks.
- Ensures logical flow.

#### 3. Lexical Choice
- Selects most appropriate words.
- **Synonym selection:** big vs. large vs. enormous.
- Considers formality and register.

#### 4. Referring Expression Generation
- First mention: "a red car" → Later: "the car" → Then: "it"
- Avoids ambiguity and repetition.

#### 5. Surface Realization
- Converts abstract plan into actual text.
- Applies grammatical rules.
- Handles: subject-verb agreement, tense, morphology.

---

# Q.5(E) — Machine Translation [5 Marks]

## Answer:

### What is Machine Translation?

**Machine Translation (MT)** is the automatic translation of text from one **source language** to another **target language**.

---

### Approaches:

---

#### 1. Rule-Based MT (RBMT)

Uses **manually crafted linguistic rules**.

**Components:**
- Source analyzer: Parse source language text.
- Transfer module: Map source structure to target structure.
- Target generator: Generate target language text.

**Types:**
- **Direct:** Word-for-word substitution.
- **Transfer-based:** Parse → transfer structure → generate.
- **Interlingua:** Convert to language-neutral representation first.

**Pros:** High precision for covered domains.
**Cons:** Expensive, hard to scale, brittle.

---

#### 2. Statistical MT (SMT)

Uses **statistical models** trained on bilingual corpora.

**Noisy Channel Model:**
$$\hat{E} = \arg\max_E P(E|F) = \arg\max_E P(F|E) \times P(E)$$

- **P(F|E):** Translation model (how likely is French F given English E?)
- **P(E):** Language model (is E fluent English?)

**Phrase-based SMT:** Extends to multi-word phrase pairs.

**Pros:** Data-driven, better coverage.
**Cons:** Needs large parallel corpus, poor long-range dependencies.

---

#### 3. Neural MT (NMT) — Current State-of-Art

Uses **encoder-decoder** neural networks with attention.

**Architecture:**
```
Source: "Je suis étudiant"
         ↓
    Encoder (Transformer)
         ↓
    Encoded Representation
         ↓
    Decoder (Transformer) + Attention
         ↓
Target: "I am a student"
```

**Attention Mechanism:**
- At each decoding step, focus on relevant source words.
- Overcomes fixed-size context bottleneck.

**Transformer (2017):** Uses self-attention, no RNNs, parallelizable.

**Examples:** Google Translate, DeepL, Microsoft Translator.

**Pros:** Best quality, handles long-range dependencies.
**Cons:** Needs huge data, can hallucinate.

---

### Comparison Table:

| Feature | RBMT | SMT | NMT |
|---------|------|-----|-----|
| Approach | Manual rules | Statistical models | Neural networks |
| Training data | None (rules) | Parallel corpus | Large parallel corpus |
| Quality | Moderate | Good | Excellent |
| Interpretable | Yes | Partially | No |
| Era | 1950s–80s | 1990s–2010s | 2014–present |

---

### BLEU Score — MT Evaluation:

$$BLEU = BP \times \exp\left(\sum_{n=1}^{4} w_n \log p_n\right)$$

- **BP:** Brevity penalty (penalizes short output).
- **pₙ:** Precision of n-gram matches with reference.
- **Range:** 0 to 1 (higher = better).
- Typical good translation: 0.3–0.5.

**Example:**
- Reference: "The cat is on the mat."
- MT Output: "The cat sat on the mat."
- 1-gram overlap: 5/6 ≈ 0.83

---

# QUICK REVISION — ALL 5 MODULES

## Key Formulas at a Glance:

| Formula | Purpose |
|---------|---------|
| D[i,j] = min(D[i-1,j]+1, D[i,j-1]+1, D[i-1,j-1]+cost) | Minimum Edit Distance |
| P(wₙ\|wₙ₋₁) = Count(wₙ₋₁,wₙ) / Count(wₙ₋₁) | Bigram MLE |
| P(wₙ\|wₙ₋₁) = (Count+1) / (Count(wₙ₋₁)+V) | Laplace Smoothing |
| vₜ(j) = max_i[vₜ₋₁(i)×A(i,j)] × B(j,oₜ) | Viterbi Algorithm |
| ŵ = argmax P(x\|w) × P(w) | Bayesian Spelling |
| TF-IDF = TF × log(N/df) | Term Weighting |
| cos(q,d) = q·d / (\|q\| × \|d\|) | Cosine Similarity |
| P(T) = ∏P(rule) for each rule | PCFG parse tree |
| BLEU = BP × exp(Σwₙ log pₙ) | MT Evaluation |
| Precision = \|R∩Rel\| / \|R\|, Recall = \|R∩Rel\| / \|Rel\| | IR Evaluation |
