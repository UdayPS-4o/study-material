# Q4 Solved — Module 4: Syntax & Semantic Processing, CFG, WordNet
**IPS Academy | PCC-CL13/PEC-C101(C) | June 2025**

---

## Q.4(i) — MCQ [1 Mark]

**Which of the following parsing techniques is most suitable for parsing ambiguous sentences efficiently?**

- A) Recursive Descent Parsing
- B) CKY Parsing
- C) **Earley Parsing ✅**
- D) Top-Down Parsing

**Answer: C) Earley Parsing**

**Explanation:**
- **Earley Parser** works with **any CFG** including ambiguous grammars, handles left recursion, and produces **all possible parse trees**.
- CKY also handles ambiguity but requires CNF conversion.
- Recursive Descent parsing may loop infinitely on left-recursive grammars.
- Earley is most **general-purpose** for ambiguous sentences.

---

## Q.4(ii) — MCQ [1 Mark]

**What is the primary function of WordNet in Natural Language Processing (NLP)?**

- A) Sentence parsing
- B) **Word sense disambiguation and lexical relationships ✅**
- C) Part-of-Speech tagging
- D) Statistical language modelling

**Answer: B) Word sense disambiguation and lexical relationships**

**Explanation:**
**WordNet** is a lexical database that organizes words into **synsets** (synonym sets) and links them via semantic relations (hyponymy, meronymy, antonymy). It is primarily used for:
- **Word Sense Disambiguation (WSD):** Identifying the correct meaning of a polysemous word.
- **Lexical relations:** Synonymy, hypernymy, hyponymy, meronymy.

---

## Q.4(iii) — Role of Context-Free Grammars (CFGs) in Syntactic Parsing [4 Marks]

### What is a Context-Free Grammar (CFG)?

A **CFG** is a formal grammar used to describe the syntactic structure of natural language sentences. It defines rules for how sentences are hierarchically organized.

**Formally:** G = (N, Σ, R, S)
- **N** = Non-terminals (S, NP, VP, PP, etc.)
- **Σ** = Terminals (actual words: "the", "cat", "sat")
- **R** = Production rules (A → α)
- **S** = Start symbol (Sentence)

---

### Typical CFG Rules:

```
S  → NP VP            (Sentence = Noun Phrase + Verb Phrase)
NP → Det N            (NP = Determiner + Noun)
NP → Det Adj N        (NP = Det + Adjective + Noun)
VP → V NP             (VP = Verb + NP)
VP → V NP PP          (VP = Verb + NP + PP)
PP → P NP             (PP = Preposition + NP)
Det → "the" | "a"
N  → "cat" | "dog" | "man"
V  → "chased" | "saw"
P  → "with" | "on"
```

---

### Role of CFG in Syntactic Parsing:

#### 1. Defines Valid Sentence Structures
- CFG specifies which word orderings are grammatically valid.
- A sentence is grammatical if it can be **derived** from the start symbol S.

#### 2. Produces Parse Trees
- Parsing with CFG produces a **hierarchical parse tree** showing the grammatical structure.

**Example:** "The cat chased the dog"
```
        S
       / \
      NP   VP
     / \  /  \
   Det  N V   NP
   |    | |   / \
  "the" "cat" "chased" Det  N
                       |    |
                      "the" "dog"
```

#### 3. Enables Semantic Interpretation
- Parse tree structure guides **semantic composition**.
- Subject, object, and verb roles are identified from the parse tree.

#### 4. Handles Structural Ambiguity
- CFG naturally captures **ambiguity** by producing multiple parse trees.
- Example: "I saw a man with a telescope" → two valid parse trees.
- **PCFG** (probabilistic CFG) resolves ambiguity by selecting the most probable parse.

#### 5. Forms the Basis for Parsers
- **CKY Parser:** Bottom-up DP on CNF grammar.
- **Earley Parser:** Top-down chart parser for any CFG.
- **Recursive Descent:** Simple top-down parser.

---

### Limitations of CFG:
- Cannot capture **agreement** (e.g., "She run" — syntactically valid in CFG but grammatically wrong).
- Cannot model **long-distance dependencies** easily.
- Solution: Feature-based grammars (Head-Driven Phrase Structure Grammar, HPSG).

---

## Q.4(iv) — Rule-Based vs Statistical Approaches to Semantic Processing [6 Marks]

### Semantic Processing in NLP:

**Semantic processing** assigns **meaning** to syntactic structures. It determines *what a sentence means*, not just its grammatical structure.

---

### A. Rule-Based Approach to Semantic Processing

#### Definition:
Uses **manually crafted rules** and logical formalisms to represent meaning.

#### Methods:
1. **First Order Predicate Calculus (FOPC):**
   - Sentences are translated into logical formulae.
   - "John loves Mary" → Loves(John, Mary)
   - "Every dog has a tail" → ∀x Dog(x) → HasTail(x)

2. **Semantic Grammar:**
   - Grammar rules augmented with semantic constraints.
   - Each grammar rule is associated with a semantic composition rule.

3. **Thematic Role Assignment:**
   - Rules assign semantic roles (Agent, Patient, Instrument) to sentence constituents.
   - "Mary broke the vase with a hammer" → Agent:Mary, Patient:vase, Instrument:hammer

4. **Lambda Calculus:**
   - Compositional semantics using λ-expressions.
   - λx.Loves(John, x) applied to Mary → Loves(John, Mary)

#### Advantages:
- **Interpretable:** Explicit logical representation.
- **Precise:** No ambiguity in representation.
- **Inference-capable:** Can derive new facts using logical rules.

#### Disadvantages:
- **Expensive:** Requires expert linguists.
- **Brittle:** Fails on out-of-coverage sentences.
- **Limited scalability:** Hard to maintain large rule sets.

---

### B. Statistical Approach to Semantic Processing

#### Definition:
Uses **machine learning models** trained on large annotated corpora to learn semantic patterns automatically.

#### Methods:
1. **Semantic Role Labeling (SRL):**
   - Classifiers trained on PropBank/FrameNet to label semantic roles.
   - Input: parsed sentence → Output: labeled arguments.

2. **Word Embeddings (Word2Vec, GloVe):**
   - Words represented as dense vectors capturing semantic similarity.
   - "king" − "man" + "woman" ≈ "queen"

3. **Distributional Semantics:**
   - Meaning determined by word co-occurrence patterns.
   - "Words that appear in similar contexts have similar meanings" (Harris, 1954).

4. **Neural Semantic Parsers:**
   - Sequence-to-sequence models that map sentences to logical forms.
   - Trained end-to-end on parallel text-meaning pairs.

5. **Pre-trained Language Models (BERT, GPT):**
   - Large neural models fine-tuned for semantic tasks (NLI, WSD, SRL).

#### Advantages:
- **Data-driven:** Automatically learns from data.
- **Scalable:** Works across domains with enough data.
- **Robust:** Handles unseen sentences better than rules.
- **High accuracy:** State-of-the-art on most NLP benchmarks.

#### Disadvantages:
- **Black box:** Difficult to interpret.
- **Requires large data:** Poor performance on low-resource languages.
- **Hallucination:** May generate plausible but incorrect meanings.

---

### Comparison Table:

| Feature | Rule-Based | Statistical |
|---------|-----------|-------------|
| Approach | Manual rules + logic | ML models + data |
| Interpretability | High | Low |
| Knowledge needed | Expert linguists | Annotated corpus |
| Accuracy | High (in domain) | High (out of domain too) |
| Scalability | Low | High |
| Robustness | Low (brittle) | High |
| Era | 1960s–1990s | 1990s–present |
| Example Systems | SHRDLU, LUNAR | PropBank SRL, BERT |

---

## OR Q.4(iv) — WordNet and its Advantages for WSD [6 Marks]

### What is WordNet?

**WordNet** is a large English **lexical database** developed at Princeton University by George Miller's team. It organizes words into sets of **cognitive synonyms called synsets**, each representing a distinct concept.

---

### Structure of WordNet:

#### Synsets:
- A **synset** = a group of synonymous words sharing the same meaning.
- Example: {car, auto, automobile, motorcar} → one synset for "motor vehicle."
- Each synset contains:
  - **Lemma names:** Words in the synset.
  - **Gloss:** Definition of the concept.
  - **Example sentences.**

#### Semantic Relations:

| Relation | Description | Example |
|----------|-------------|---------|
| **Hypernymy** | IS-A (generalization) | car IS-A vehicle |
| **Hyponymy** | IS-A (specialization) | sedan IS-A car |
| **Meronymy** | Part-of | wheel part-of car |
| **Holonymy** | Has-part | car has-wheel |
| **Antonymy** | Opposites | good ↔ bad |
| **Entailment** | Verb implies another | snore → sleep |

#### WordNet Hierarchy:
```
entity → physical entity → object → artifact → vehicle
                                              └── motor vehicle
                                                  └── car
                                                      ├── sedan
                                                      ├── SUV
                                                      └── sports car
```

---

### Advantages of WordNet for WSD:

#### 1. Sense Inventory
- WordNet provides a **comprehensive list of senses** for each polysemous word.
- Example: "bank" has 10 senses in WordNet (financial institution, riverbank, tilt, etc.).

#### 2. Lesk Algorithm (Gloss-Based WSD)
- Compare the **gloss** (definition) of each sense with the context.
- Choose sense with maximum word **overlap**.
- Example: "bank" in context "deposit money salary" → financial institution sense wins.

#### 3. Semantic Similarity Measures
- WordNet hierarchy enables **semantic similarity** computation.
- Words higher in hierarchy (closer to root) = less similar.
- **Path similarity:** Similarity based on path length between synsets.
- **Wu-Palmer:** Considers depth of synsets in hierarchy.
- Used to choose most semantically appropriate sense.

#### 4. Query Expansion in IR
- Expand search queries with WordNet synonyms/hypernyms.
- Search for "car" → also match "automobile", "vehicle".
- Improves **recall** in information retrieval.

#### 5. Cross-lingual Applications
- **EuroWordNet, BabelNet** extend WordNet to multiple languages.
- Enables cross-lingual WSD and machine translation.

#### 6. Training Data
- WordNet sense tags used to create training data for supervised WSD.

### Limitations of WordNet for WSD:
- Coverage is limited — not all words/senses included.
- Sense granularity may be too fine for some applications.
- Does not capture domain-specific senses (e.g., technical jargon).
- Gloss overlap (Lesk) works poorly when glosses are short.
