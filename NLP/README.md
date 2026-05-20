# NLP Complete Study Notes — Index
**Subject:** Natural Language Processing

---

## 📚 Quick Module Navigation

| Module | Topics | Hours | File |
|--------|--------|-------|------|
| **Module 1** | Introduction, Levels of Analysis, Syntax, Semantics, Pragmatics, Morphology, FST, RegEx, Stemmer, Spelling Errors | 6 hrs | [module_1_notes.md](./module_1_notes.md) |
| **Module 2** | Computational Phonology, Speech Sounds, TTS, Pronunciation Variations, Bayesian Methods, Min Edit Distance, Weighted Automata, N-grams | 10 hrs | [module_2_notes.md](./module_2_notes.md) |
| **Module 3** | HMM, Viterbi Algorithm, Acoustic Processing, Feature Extraction (MFCC), Speech Synthesis, POS Tagging (Rule/Stochastic/TBL) | 10 hrs | [module_3_notes.md](./module_3_notes.md) |
| **Module 4** | CFG, CKY Parsing, Earley Parser, PCFG, FOPC, Thematic Roles, Primitive Decomposition, WordNet, Lexical Semantics | 8 hrs | [module_4_notes.md](./module_4_notes.md) |
| **Module 5** | WSD, IR, Vector Space Model, TF-IDF, Query Improvement, Discourse, NLG, Machine Translation | 6 hrs | [module_5_notes.md](./module_5_notes.md) |

---

## 🔑 Most Important Exam Formulas

### Minimum Edit Distance (Levenshtein)
```
D[i,j] = min(
  D[i-1,j] + 1,       // Deletion
  D[i,j-1] + 1,       // Insertion
  D[i-1,j-1] + cost   // Substitution (0 if same, 1 if diff)
)
```

### Bigram Probability (MLE)
```
P(wₙ | wₙ₋₁) = Count(wₙ₋₁, wₙ) / Count(wₙ₋₁)
```

### Laplace Smoothing
```
P(wₙ|wₙ₋₁) = (Count(wₙ₋₁,wₙ) + 1) / (Count(wₙ₋₁) + V)
```

### Viterbi (HMM Decoding)
```
v_t(j) = max_i [v_{t-1}(i) × A(i,j)] × B(j, o_t)
```

### Bayesian Spelling Correction (Noisy Channel)
```
w* = argmax P(w|x) = argmax P(x|w) × P(w)
      Language Model × Error Model
```

### TF-IDF
```
TF(t,d) = count(t in d) / total terms in d
IDF(t)  = log(N / df(t))
TF-IDF  = TF × IDF
```

### Cosine Similarity
```
cos(q, d) = (q · d) / (|q| × |d|)
```

### PCFG Parse Tree Probability
```
P(Tree) = ∏ P(rule) for each rule used
```

### Rocchio Query Expansion
```
q_new = α·q_old + β·(1/|Dr|)Σd∈Dr d - γ·(1/|Dnr|)Σd∈Dnr d
```

### BLEU Score (MT Evaluation)
```
BLEU = BP × exp(Σ wₙ log pₙ)
```

### IR Evaluation
```
Precision = |Retrieved ∩ Relevant| / |Retrieved|
Recall    = |Retrieved ∩ Relevant| / |Relevant|
F1        = 2 × (P × R) / (P + R)
```

---

## 🧠 Key Algorithm Summary

| Algorithm | Purpose | Complexity |
|-----------|---------|------------|
| **Viterbi** | Find best HMM state sequence (POS tagging, ASR) | O(N²T) |
| **Forward** | Compute P(Observations \| HMM) | O(N²T) |
| **Baum-Welch** | Train HMM parameters | O(N²T) per iteration |
| **CKY** | Parse sentence with CFG (CNF) | O(n³\|G\|) |
| **Earley** | Parse any CFG (no CNF needed) | O(n³) |
| **Lesk** | Word Sense Disambiguation | O(senses × context) |
| **Porter Stemmer** | Reduce words to stem | O(word length) |
| **Edit Distance** | Spelling correction, similarity | O(mn) |

---

## 📌 Important Concepts Cheat Sheet

### Levels of Language Analysis
```
Morphological → Lexical → Syntactic → Semantic → Pragmatic → Discourse
```

### Types of Ambiguity
- **Lexical:** "bank" = financial/river
- **Syntactic:** "I saw a man with a telescope"
- **Semantic:** "Every man loves a woman"
- **Pragmatic:** "Can you pass the salt?"

### HMM Components (λ = A, B, π)
- **A** = Transition matrix
- **B** = Emission matrix
- **π** = Initial state probabilities

### POS Tagging Approaches
- **Rule-based:** Manual rules (context-free + contextual)
- **Stochastic (HMM):** Viterbi on trained probabilities
- **Transformation-based (Brill):** Learn correction rules iteratively

### CFG vs PCFG
- **CFG:** Multiple parse trees (ambiguity unresolved)
- **PCFG:** Probabilities per rule → Choose most probable parse

### WSD Approaches
- **Knowledge-based:** Lesk (gloss overlap), WordNet
- **Supervised:** Naive Bayes, SVM on labeled data
- **Unsupervised:** Clustering
- **Semi-supervised:** Yarowsky bootstrapping

### MT Evolution
```
Rule-Based (1950s-80s) → Statistical (1990s-2010s) → Neural (2014-present)
```

---

## 📝 Commonly Confused Concepts

| Concept 1 | Concept 2 | Difference |
|-----------|-----------|------------|
| Stemming | Lemmatization | Stem may not be real word; Lemma always is |
| Phoneme | Allophone | Phoneme = abstract sound; Allophone = physical variant |
| Syntax | Semantics | Structure vs. Meaning |
| Anaphora | Coreference | Anaphora = backward reference; Coreference = any two expressions for same entity |
| TF | IDF | Within-doc frequency vs. Corpus rarity |
| Precision | Recall | Accuracy of retrieved vs. Coverage of relevant |
| HMM Evaluation | HMM Decoding | Forward Algorithm vs. Viterbi Algorithm |
| CFG | PCFG | Grammar without vs. with probabilities |

---

## 🎯 High-Value Exam Topics (Likely Questions)

### 10-Mark Questions (Write Long Answers):
1. Explain HMM and Viterbi algorithm with example
2. Explain CFG-based parsing, CKY, and Earley parser
3. Explain MFCC feature extraction in speech recognition
4. Explain Vector Space Model with TF-IDF and cosine similarity
5. Explain NLG pipeline
6. Compare rule-based, statistical, and neural machine translation
7. Explain N-gram language model with smoothing techniques
8. Explain POS tagging approaches (rule-based, stochastic, TBL)

### 5-Mark Questions:
1. Minimum Edit Distance calculation
2. Bayesian spelling correction
3. Lesk algorithm for WSD
4. Thematic roles with examples
5. WordNet structure and relations
6. FOPC representation examples
7. Regular expressions
8. FST in morphological analysis
9. Primitive decomposition (Schank's CD)
10. Pronunciation variations
