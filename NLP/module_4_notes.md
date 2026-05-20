# Module 4: Syntax & Semantic Processing
**Subject:** Natural Language Processing | **Hours:** 8

---

## 1. Syntax Processing

**Syntax Processing** (also called **Parsing**) is the process of analyzing the grammatical structure of sentences.

- A **parser** takes a sentence as input and produces a **parse tree** that shows the hierarchical structure.
- Syntax processing is critical for understanding sentence meaning and for subsequent semantic analysis.

---

## 2. Context-Free Grammar (CFG)

**Context-Free Grammar (CFG)** is the most commonly used formalism for defining the syntactic structure of natural languages.

### 2.1 Definition

A CFG is a 4-tuple G = (N, Σ, R, S) where:
- **N** = Set of non-terminal symbols (e.g., S, NP, VP, PP)
- **Σ** = Set of terminal symbols (actual words: "the", "cat", "sat")
- **R** = Set of production rules of the form A → α (where A ∈ N, α ∈ (N∪Σ)*)
- **S** = Start symbol (usually S for Sentence)

### 2.2 Typical CFG Rules for English:

```
S  → NP VP                    (Sentence = Noun Phrase + Verb Phrase)
NP → Det N                    (NP = Determiner + Noun)
NP → Det Adj N               (NP = Determiner + Adjective + Noun)
NP → Pronoun                  (NP = Pronoun)
NP → NP PP                   (NP = NP + Prepositional Phrase)
VP → V                        (VP = Verb)
VP → V NP                    (VP = Verb + NP)
VP → V NP PP                 (VP = Verb + NP + PP)
VP → VP PP                   (VP = VP + PP)
PP → P NP                    (PP = Preposition + NP)
Det → "the" | "a" | "an"
N  → "cat" | "dog" | "man" | "telescope"
V  → "saw" | "chased" | "ate"
P  → "with" | "on" | "in"
Adj → "big" | "old" | "red"
```

### 2.3 Parse Tree Example:

**Sentence:** "The cat chased the dog"

```
         S
       /   \
      NP    VP
     / \   /  \
   Det  N  V   NP
   |    |  |   / \
  "the" "cat" "chased" Det  N
                       |    |
                      "the" "dog"
```

### 2.4 Structural Ambiguity:

CFG can produce **multiple parse trees** for an ambiguous sentence.

**Example:** "I saw a man with a telescope"

**Parse 1:** (I used a telescope to see)
- VP → V NP PP (saw [a man] [with a telescope])

**Parse 2:** (The man had a telescope)
- NP → NP PP (saw [a man with a telescope])

---

## 3. CKY Parsing (Cocke-Kasami-Younger)

**CKY algorithm** is a bottom-up, dynamic programming algorithm for parsing sentences using CFG.

### 3.1 Requirements: Chomsky Normal Form (CNF)

CKY requires grammar to be in **Chomsky Normal Form**:
- Every rule must be of the form:
  - A → B C (non-terminal produces exactly 2 non-terminals)
  - A → a (non-terminal produces exactly 1 terminal)

### 3.2 Converting to CNF:

**Step 1:** Eliminate unit rules (A → B):
- Replace with all rules B can produce.

**Step 2:** Binarize rules (A → B C D ...):
- A → B C D becomes: A → B X, X → C D

**Example:**
- VP → V NP PP becomes: VP → V X₁, X₁ → NP PP

### 3.3 CKY Algorithm:

**Input:** Sentence w₁, w₂, ..., wₙ and grammar G (in CNF)
**Output:** Parse table (chart)

**Initialization:**
- For each word wᵢ, fill in table[i][i+1] with all POS tags that generate wᵢ.

**Induction:**
- For each span length l = 2 to n:
  - For each starting position i = 1 to n-l+1:
    - Let j = i + l (end of span)
    - For each split point k = i+1 to j-1:
      - For each rule A → B C:
        - If B ∈ table[i][k] and C ∈ table[k][j]:
          - Add A to table[i][j]

**Result:** If S ∈ table[1][n+1], the sentence is grammatical.

### 3.4 CKY Example:

**Sentence:** "she eats fish" (using simplified CNF grammar)

|   | she | eats | fish |
|---|-----|------|------|
| **she** | NP | S | S |
| **eats** | - | VP | VP |
| **fish** | - | - | NP |

Reading: table[1][3] contains S → sentence is grammatical.

### 3.5 Complexity: O(n³ × |G|) — polynomial time for parsing.

---

## 4. Earley Parser

**Earley parser** is a top-down, chart-based parsing algorithm that works with any CFG (including ambiguous and left-recursive grammars).

### 4.1 Key Concepts:

**Earley Item (Dotted Rule):**
- A rule with a dot (•) indicating how far parsing has progressed.
- [A → α • β, i] means: we are trying to recognize A, we have recognized α starting at position i, and still need to recognize β.

### 4.2 Three Operations:

#### Predictor
- When the dot is before a non-terminal B:
  - Add all rules with B on the left-hand side.
- [A → α • B β, i] → add [B → • γ, j] for all rules B → γ

#### Scanner
- When the dot is before a terminal that matches the current word:
  - Advance the dot.
- [A → α • wⱼ β, i] → [A → α wⱼ • β, i]

#### Completer
- When the dot is at the end of a rule (item is complete):
  - Advance the dot in all parent items that were waiting for this non-terminal.
- [B → γ •, j] completes [A → α • B β, i] → [A → α B • β, i]

### 4.3 Advantages of Earley Parser:
- Works with any CFG (no need for CNF conversion).
- Handles ambiguity.
- Handles left-recursive grammars.
- Time complexity: O(n³) in general, O(n²) for unambiguous grammars.

### 4.4 Comparison CKY vs Earley:

| Feature | CKY | Earley |
|---------|-----|--------|
| Grammar form | CNF required | Any CFG |
| Direction | Bottom-up | Top-down + Bottom-up |
| Ambiguity | All parses | All parses |
| Left recursion | Can handle (after CNF) | Directly handles |
| Complexity | O(n³ × \|G\|) | O(n³) |

---

## 5. Probabilistic Parsing

**Probabilistic Context-Free Grammar (PCFG)** adds probabilities to CFG rules to handle ambiguity.

### 5.1 PCFG Definition

Each production rule A → α has a probability P(A → α) such that:
$$\sum_{\alpha} P(A → \alpha) = 1$$ (probabilities sum to 1 for each non-terminal)

**Example:**
```
VP → V NP        [0.7]
VP → V NP PP     [0.2]
VP → V           [0.1]
```

### 5.2 Parse Tree Probability

Probability of a parse tree T = product of all rule probabilities used:

P(T) = ∏ P(A → α) for each rule used in T

### 5.3 Most Likely Parse

Given an ambiguous sentence, choose the parse tree T* with highest probability:

T* = argmax_T P(T|sentence)

### 5.4 Training PCFG:
- Estimate probabilities from a treebank (corpus of annotated parse trees).

$$P(A \rightarrow \alpha) = \frac{Count(A \rightarrow \alpha)}{Count(A)}$$

### 5.5 Probabilistic CKY:
- Extension of CKY that finds the **most probable parse tree**.
- Dynamic programming: instead of tracking which non-terminals can span [i,j], track the maximum probability parse for each span.

---

## 6. Semantic Processing

**Semantic processing** assigns meaning to parsed structures.

### 6.1 What is Semantics?
- Syntax tells us the structure; semantics tells us the **meaning**.
- Compositional semantics: meaning of a sentence is built from the meanings of its parts.

---

## 7. Meaning Representation

To process meaning computationally, we need formal representations.

### 7.1 Requirements for Meaning Representation:
- **Verifiability:** Can check whether a statement is true.
- **Unambiguity:** Must have a single interpretation.
- **Canonical form:** Different phrasings of same meaning should have same representation.
- **Inference support:** Can derive new facts.
- **Expressiveness:** Can represent all possible meanings.

### 7.2 Types of Meaning Representations:

#### First Order Predicate Calculus (FOPC) — see Section 8
#### Semantic Nets
- Graph-based representation with nodes (concepts) and edges (relations).

#### Frames
- Structured representation with slots and fillers.

#### Abstract Meaning Representation (AMR)
- Modern graph-based semantic representation.

---

## 8. First Order Predicate Calculus (FOPC)

Also called **First-Order Logic (FOL)** — the most widely used formal system for meaning representation in NLP.

### 8.1 Components of FOPC:

#### Constants
- Refer to specific individuals.
- Example: John, Mary, London, 5

#### Variables
- Can refer to any individual.
- Example: x, y, z

#### Predicates
- Properties of individuals or relations between individuals.
- Example: Dog(x), Loves(John, Mary), Happy(x)

#### Functions
- Map individuals to other individuals.
- Example: FatherOf(John) refers to John's father.

#### Logical Connectives:
| Symbol | Name | Meaning |
|--------|------|---------|
| ¬ | Negation | NOT |
| ∧ | Conjunction | AND |
| ∨ | Disjunction | OR |
| → | Implication | IF...THEN |
| ↔ | Biconditional | IF AND ONLY IF |

#### Quantifiers:
- **Universal Quantifier (∀):** "For all x..." — ∀x Dog(x) → HasLegs(x)
- **Existential Quantifier (∃):** "There exists an x..." — ∃x Dog(x) ∧ Barking(x)

### 8.2 Examples of FOPC Representations:

| English Sentence | FOPC |
|-----------------|------|
| "John loves Mary" | Loves(John, Mary) |
| "Every dog has a tail" | ∀x Dog(x) → HasTail(x) |
| "Some cats are black" | ∃x Cat(x) ∧ Black(x) |
| "John does not love Mary" | ¬Loves(John, Mary) |
| "If it rains, the ground is wet" | Rains() → Wet(Ground) |
| "John loves Mary and Bill" | Loves(John, Mary) ∧ Loves(John, Bill) |

### 8.3 Converting Natural Language to FOPC:

**Step 1:** Parse the sentence syntactically.
**Step 2:** Identify predicates, arguments, and quantifiers.
**Step 3:** Apply semantic composition rules.

**Lambda Calculus** is used for compositional semantics:
- λx.P(x) represents a function that, given an x, produces P(x).
- λx.Loves(John, x) applied to Mary gives Loves(John, Mary).

---

## 9. Lexical Semantics

**Lexical semantics** studies the meaning of words and the relationships between them.

### 9.1 Internal Structure of Words

#### Morphological Structure
- Words are composed of **morphemes** (smallest meaning units).
- **Stem/Root:** Core meaning (e.g., "teach" in "teacher").
- **Affixes:** Modify meaning (e.g., "-er" = one who does).

#### Semantic Features
- Words can be described by semantic features.
- "bachelor" = [MALE, ADULT, UNMARRIED]
- "spinster" = [FEMALE, ADULT, UNMARRIED]

### 9.2 Word Relations (Semantic Relations):

| Relation | Description | Example |
|----------|-------------|---------|
| **Synonymy** | Same or similar meaning | big ↔ large |
| **Antonymy** | Opposite meaning | hot ↔ cold |
| **Hyponymy** | IS-A relation (specific → general) | dog → animal |
| **Hypernymy** | Supertype (general → specific) | animal → dog |
| **Meronymy** | Part-of relation | finger → hand |
| **Holonymy** | Whole-of relation | hand → finger |
| **Polysemy** | One word, multiple related meanings | "bank" |
| **Homonymy** | One word, unrelated meanings | "bat" |

### 9.3 Thematic Roles (Semantic Roles)

**Thematic roles** (also called theta-roles or semantic roles) describe the relationship between a verb and its arguments.

The **theta grid** of a verb specifies the thematic roles it assigns.

| Thematic Role | Description | Example |
|--------------|-------------|---------|
| **Agent** | Doer of the action (typically animate, intentional) | John kicked the ball. (John = Agent) |
| **Patient/Theme** | Entity undergoing the action or affected by it | John kicked the ball. (ball = Patient) |
| **Experiencer** | Entity experiencing a mental state | Mary fears spiders. (Mary = Experiencer) |
| **Instrument** | Means by which action is performed | He cut bread with a knife. (knife = Instrument) |
| **Location** | Place where action occurs | She works in London. (London = Location) |
| **Source** | Origin of movement | He flew from Paris. (Paris = Source) |
| **Goal** | Destination of movement | She moved to Tokyo. (Tokyo = Goal) |
| **Beneficiary** | Entity benefiting from action | She baked a cake for John. (John = Beneficiary) |
| **Cause** | Cause of an event | The storm destroyed the house. (storm = Cause) |
| **Recipient** | Entity receiving something | She gave John a book. (John = Recipient) |

**Example:** "Mary broke the vase with a hammer"
- Agent: Mary
- Patient: vase
- Instrument: hammer

### 9.4 Primitive Decomposition

**Primitive decomposition** (also called **Conceptual Semantics**) is the idea that word meanings can be broken down into **primitive, universal semantic components**.

**Key Theorists:** Katz & Fodor, Jackendoff, Schank.

#### Semantic Primitives by Schank (Conceptual Dependency Theory):
- **ATRANS:** Abstract transfer of ownership (give, take, buy).
- **PTRANS:** Physical transfer of location (move, go, fly).
- **MTRANS:** Mental transfer of information (tell, read, learn).
- **MBUILD:** Mental creation (decide, plan, imagine).
- **INGEST:** Taking something into the body (eat, drink, smoke).
- **EXPEL:** Expelling from the body (spit, cry, sweat).
- **MOVE:** Movement of body part (kick, wave, hit).
- **GRASP:** Grasping something (hold, release, catch).
- **SPEAK:** Speaking (say, tell, scream).
- **ATTEND:** Directing sensory organ (look, listen, smell).

**Example:**
"John gave Mary a book"
→ ATRANS (Object: book, From: John, To: Mary)

**"Mary ate the pizza"**
→ INGEST (Actor: Mary, Object: pizza, Into: mouth/body)

#### Advantages:
- Language-independent representation.
- Enables inference (if someone AINGESTed food, they are less hungry).

#### Disadvantages:
- Hard to define a complete set of primitives.
- Complex words are hard to decompose.
- May oversimplify meaning.

---

## 10. WordNet

**WordNet** is a large lexical database of English, developed at Princeton University.

### 10.1 What is WordNet?
- Groups nouns, verbs, adjectives, and adverbs into sets of cognitive synonyms (**synsets**).
- Each synset represents a distinct concept.
- Synsets are linked by semantic relations.

### 10.2 Synsets
- **Synset:** A group of synonymous words (synonyms that can replace each other in some context).
- Example: {car, auto, automobile, motorcar} — all refer to the same concept.
- Each synset has:
  - **Lemma names:** The words in the synset.
  - **Gloss:** A definition of the concept.
  - **Example sentences.**

### 10.3 Relations in WordNet:

| Relation | Description | Example |
|----------|-------------|---------|
| **Hypernymy/Hyponymy** | IS-A hierarchy | dog IS-A animal |
| **Meronymy** | Part-of | wheel is part of car |
| **Holonymy** | Has-part | car has wheel |
| **Antonymy** | Opposite (for adj/adv) | good ↔ bad |
| **Entailment** | One verb implies another | snore → sleep |
| **Cause** | Verb causes another | kill causes die |

### 10.4 WordNet Hierarchy Example:

```
entity
└── physical entity
    └── object
        └── artifact
            └── vehicle
                └── motor vehicle
                    └── car
                        ├── sedan
                        ├── SUV
                        └── sports car
```

### 10.5 Applications of WordNet:
- **Word Sense Disambiguation (WSD):** Using synset hierarchies to disambiguate.
- **Information Retrieval:** Query expansion with synonyms.
- **Machine Translation:** Finding equivalent concepts in other languages.
- **Question Answering:** Semantic understanding.
- **Semantic Similarity:** Measuring similarity between words/concepts.

### 10.6 WordNet in Python (NLTK):
```python
from nltk.corpus import wordnet as wn
synsets = wn.synsets('bank')
# Returns: [Synset('bank.n.01'), Synset('bank.n.02'), ...]
# bank.n.01 = sloping land; bank.n.02 = financial institution
```

---

## Summary Table: Module 4

| Topic | Key Points |
|-------|------------|
| CFG | Non-terminals, terminals, production rules; handles structural ambiguity |
| CKY Parsing | Bottom-up DP; requires CNF; O(n³) |
| Earley Parser | Top-down; works on any CFG; Predictor, Scanner, Completer |
| PCFG | CFG + probabilities; resolves ambiguity by choosing most likely parse |
| FOPC | Constants, variables, predicates, quantifiers (∀, ∃), connectives |
| Thematic Roles | Agent, Patient, Instrument, Location, Source, Goal, Beneficiary |
| Primitive Decomposition | ATRANS, PTRANS, MTRANS, INGEST, etc. (Schank's CD theory) |
| WordNet | Lexical database; synsets; hypernymy, hyponymy, meronymy |
| Lexical Semantics | Synonymy, antonymy, polysemy, hyponymy, meronymy |

---

## Important Exam Questions

1. What is Context-Free Grammar? Explain with production rules and a parse tree example.
2. What is the CKY parsing algorithm? Explain with Chomsky Normal Form and an example.
3. Explain the Earley parser and its three operations: Predictor, Scanner, Completer.
4. What is Probabilistic Context-Free Grammar (PCFG)? How is it used for disambiguation?
5. What is First Order Predicate Calculus? Explain all components with examples.
6. Explain thematic roles in semantic processing with examples.
7. What is primitive decomposition? Explain Schank's Conceptual Dependency primitives.
8. What is WordNet? Explain its structure, synsets, and semantic relations.
9. Explain lexical semantic relations: synonymy, antonymy, hyponymy, meronymy.
10. Compare CKY and Earley parsing algorithms.
