# NLP Module 4 — Exam Answer Notes

---

## Q: What is Syntax Processing? Define Context-Free Grammar (CFG) and its components.

**Syntax Processing (Parsing)** is the process of analyzing the grammatical structure of a sentence to determine whether it conforms to the rules of a given grammar, and if so, to build a **parse tree** that reveals the hierarchical relationship between its words and phrases.

A parser takes a sequence of tokens (words) as input and either:
- Produces a parse tree showing the grammatical structure, or
- Reports a syntax error if the sentence is ungrammatical.

---

**Context-Free Grammar (CFG)** is the most widely used formal model for describing natural language syntax. A CFG is defined by four components:

1. **Terminals (T):** The actual words of the language. These are the leaves of the parse tree. Examples: "dog", "runs", "the", "quickly".

2. **Non-Terminals (N):** Syntactic category symbols that represent abstract grammatical units. These are interior nodes of the parse tree. Examples: S (Sentence), NP (Noun Phrase), VP (Verb Phrase), Det (Determiner), N (Noun), V (Verb).

3. **Rules / Productions (R):** Rules that define how non-terminals expand into other non-terminals or terminals. Example:
   ```
   S  → NP VP
   NP → Det N
   VP → V NP
   Det → "the"
   N  → "dog"
   V  → "chases"
   ```

4. **Start Symbol (S):** The special non-terminal that represents a complete sentence. Parsing succeeds if the input string can be derived from S using the production rules.

**Example Parse Tree for "The dog chases the cat":**
```
       S
      / \
    NP   VP
   /  \  / \
 Det   N V   NP
 |     |  |  / \
"the" "dog" "chases" Det N
                     |   |
                    "the" "cat"
```

---

## Q: Explain the CKY Parsing Algorithm.

The **CKY (Cocke–Kasami–Younger) algorithm** is a bottom-up, dynamic programming chart parsing algorithm. "Bottom-up" means it starts by recognizing individual words and progressively combines them into larger constituents until it either covers the full sentence as an S node, or fails.

**Requirements:** The grammar must be in **Chomsky Normal Form (CNF)**, where every rule is either:
- `A → B C` (a non-terminal expanding to exactly two non-terminals), or
- `A → a` (a non-terminal expanding to exactly one terminal word).

**How it works:**
The algorithm fills in a triangular table where entry `table[i][j]` contains all non-terminals that can derive the substring of words from position `i` to position `j`.

1. **Base case:** Fill `table[i][i+1]` with all non-terminals that produce `word[i]`.
2. **Recursive case:** For each span `(i, j)` and each split point `k` between `i` and `j`, look for rules `A → B C` where `B ∈ table[i][k]` and `C ∈ table[k][j]`. If found, add `A` to `table[i][j]`.
3. **Accept** if the Start symbol `S` is in `table[0][n]` (covering the full sentence).

**Advantage:** Efficient O(n³ × |G|) algorithm. Works correctly on ambiguous grammars.
**Disadvantage:** Requires CNF conversion which can complicate the grammar.

---

## Q: Explain the Earley Parser.

The **Earley Parser** is a chart-based, top-down dynamic programming parser that can handle any CFG, including ambiguous grammars, without requiring conversion to Chomsky Normal Form.

**How it works:**
It maintains a set of **Earley items** (also called dotted rules) for each word position in the input. An Earley item looks like:
`A → α • β at position k`
This means: "We are trying to recognize an A; we have already seen α, and we still need to see β; this recognition started at word position k."

**Three operations are applied repeatedly:**
1. **Predict:** If the dot is before a non-terminal B, add all rules for B (with the dot at the start) to the current set.
2. **Scan:** If the dot is before a terminal `a` and the next input word matches `a`, advance the dot.
3. **Complete:** If the dot is at the end (B is fully recognized), go back and advance the dot in any item that was waiting for B.

**Advantages:**
- Works on any CFG; no normal-form conversion needed.
- Naturally handles ambiguity by tracking all possible parses simultaneously.

**Complexity:** O(n³) for general grammars; O(n²) for unambiguous grammars.

---

## Q: What is Semantic Processing? Explain First-Order Predicate Calculus (FOPC) in NLP.

While syntax is concerned with the grammatical structure of sentences, **Semantic Processing** is concerned with their meaning — what the sentence actually asserts about the world.

For computers to reason about meaning, we need a formal, unambiguous representation. **First-Order Predicate Calculus (FOPC)** (also called First-Order Logic, FOL) is the standard formal language for this purpose.

**Components of FOPC:**
- **Constants:** Named individuals, e.g., `John`, `Mary`.
- **Predicates:** Properties or relations, e.g., `Dog(x)` means "x is a dog"; `Loves(John, Mary)` means "John loves Mary".
- **Quantifiers:** `∀x` (for all x) and `∃x` (there exists an x).
- **Connectives:** `∧` (AND), `∨` (OR), `¬` (NOT), `→` (IMPLIES).

**Examples of translating English to FOPC:**
| English Sentence | FOPC Representation |
|---|---|
| "All dogs bark." | `∀x (Dog(x) → Barks(x))` |
| "Some dog bit John." | `∃x (Dog(x) ∧ Bit(x, John))` |
| "John loves Mary." | `Loves(John, Mary)` |
| "No cat is a dog." | `¬ ∃x (Cat(x) ∧ Dog(x))` |

FOPC allows an AI system to perform logical inference — for example, concluding from the first rule that if `Dog(Fido)` is known, then `Barks(Fido)` must also be true.

---

## Q: What is Lexical Semantics? Explain its key concepts.

**Lexical Semantics** is the study of word meaning — specifically, how meaning is encoded in individual words and how words relate to each other in meaning.

**1. Homonymy vs. Polysemy:**
- **Homonymy:** Two completely unrelated words that happen to be spelled the same. E.g., "bank" (financial institution) and "bank" (river bank) are homophones with entirely separate, unrelated meanings.
- **Polysemy:** A single word with multiple related senses. E.g., "bright" can mean "giving off light" or "intelligent" — both senses share a core idea of positivity.

**2. Synonymy and Antonymy:**
- **Synonyms:** Words that share similar meaning (e.g., "fast" and "quick").
- **Antonyms:** Words with opposite meaning (e.g., "hot" and "cold").

**3. Hyponymy (IS-A Relationships):**
A hyponym is a more specific concept that falls under a broader category. "Poodle" is a hyponym of "Dog", which is a hyponym of "Animal". This forms a semantic hierarchy.

**4. Thematic Roles:**
Thematic roles describe the semantic relationship between a verb and its noun arguments. Common thematic roles:
- **Agent:** The entity that actively performs the action. "**John** cut the bread."
- **Patient:** The entity that the action is performed on. "John cut **the bread**."
- **Instrument:** The tool used to perform the action. "John cut the bread with **a knife**."
- **Location:** The place where the action occurs. "John cut the bread **in the kitchen**."

**5. WordNet:**
WordNet is a large, structured English lexical database developed at Princeton. Words are organized into **synsets (synonym sets)** — groups of words that share the same meaning. The synsets are connected by semantic relations like hypernymy (IS-A), hyponymy, meronymy (PART-OF), and antonymy. WordNet is widely used for WSD and semantic similarity tasks.

---

## Q: What is Primitive Decomposition?

**Primitive Decomposition** (or **Conceptual Dependency Theory**) is a semantic theory proposed by Roger Schank. It claims that the meaning of every verb in any human language can be decomposed into a small set of universal, language-independent primitive actions.

The key insight is that two sentences with very different surface forms but the same underlying meaning should produce the same primitive representation.

**A small set of primitive actions:**
- **ATRANS:** Transfer of possession (e.g., Give, Take, Buy, Sell)
- **PTRANS:** Physical transfer of an object (e.g., Move, Carry, Push)
- **MTRANS:** Transfer of mental information / communication (e.g., Tell, Inform, Read)
- **MBUILD:** Mental construction — creating new information in the mind (e.g., Decide, Plan, Imagine)
- **INGEST:** Taking something into the body (e.g., Eat, Drink, Breathe)

**Example:**
- "John gave Mary a book."
- "Mary received a book from John."
Both decompose to: `ATRANS(John, Mary, book)` — the same representation, capturing that the underlying event is the same.
