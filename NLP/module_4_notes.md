# Module 4: Syntax and Semantic Processing

## 1. Syntax Processing & CFG
*   **Syntax Processing (Parsing):** Analyzing the grammatical structure of a sentence to see how words logically group together into phrases.
*   **Context-Free Grammar (CFG):** The strict mathematical rulebook used to teach computers English sentence structure.
    *   **Terminals:** The actual spoken words (e.g., "Dog", "Barks").
    *   **Non-Terminals:** The grammatical categories (e.g., NP for Noun Phrase, VP for Verb Phrase).
    *   **Rules:** e.g., $S \rightarrow NP \ V$ (A sentence is made of a Noun Phrase followed by a Verb).

## 2. Parsing Algorithms
A parser applies CFG rules to a sentence to visually build a "Parse Tree".
*   **CKY Parsing:** A "bottom-up" approach. It works fast but strictly requires the grammar rules to be rewritten in a specific format called *Chomsky Normal Form*.
*   **Earley Parser:** A "top-down" approach. It is far more flexible because it does not force you to rewrite your grammar into normal forms.
*   **Probabilistic Parsing (PCFG):** Sometimes a sentence has double meanings (ambiguity) causing the parser to create multiple valid trees. PCFG assigns a math probability to every rule and outputs the tree with the highest overall percentage.

---

## 3. Semantic Processing (Meaning)
While Syntax handles *grammar*, Semantics handles actual *meaning* and logic.
*   **First-Order Predicate Calculus (FOPC):** A formal logic language used by AI to represent human meaning definitively, removing all ambiguity.
    *   *Example Sentence:* "All dogs bark."
    *   *FOPC Representation:* $\forall x (Dog(x) \rightarrow Barks(x))$.

## 4. Lexical Semantics
The study of what individual, standalone words actually mean.
*   **Internal Structure of Words:** Looking at prefixes and suffixes (Morphology) to deduce meaning.
*   **Primitive Decomposition:** Breaking complex verbs down into their simplest core atomic meanings. 
    *   *Example:* The verb "Kill" means the exact same as "Cause(Die)".
*   **Thematic Roles:** Defining the roles that nouns play in a sentence's action.
    *   **Agent (Doer):** "**John** broke the window."
    *   **Patient (Receiver):** "John broke the **window**."
    *   **Instrument (Tool):** "John broke the window with a **hammer**."
*   **WordNet:** A massive, computerized English dictionary. It groups words into clusters of synonyms called *synsets* and accurately maps how words relate to each other parentally (like "Car" is a child of "Vehicle").
