# NLP Module 5 — Exam Answer Notes

---

## Q: What is Word Sense Disambiguation (WSD)? Explain with methods.

**Word Sense Disambiguation (WSD)** is the NLP task of determining which sense (meaning) of a polysemous or homonymous word is being used in a particular context.

Many words in natural language have multiple possible meanings. For example:
- "I went to the **bank**." — Financial institution, or river bank?
- "The **bat** flew over." — Baseball bat, or the animal?
- "She is very **bright**." — Intelligent, or emitting light?

A human reader uses context easily, but computers need algorithmic methods.

---

**1. Dictionary-Based Approach — Lesk Algorithm:**
The original Lesk Algorithm selects the word sense whose dictionary definition has the most word overlap with the context words surrounding the ambiguous word.

**Steps:**
1. Get the dictionary definitions for all possible senses of the target word.
2. Count how many words in each definition appear in the surrounding sentence (the context window).
3. Choose the sense with the highest overlap.

**Example:** For "bank" in "He went to the bank to deposit money":
- Sense 1 (Financial): "an institution for lending, borrowing, depositing, **money**..."
- Sense 2 (River): "sloping land beside a body of water..."
- Overlap with Sense 1 includes "money" → Sense 1 is selected.

**Advantage:** No training data needed.
**Disadvantage:** Dictionary coverage is limited; overlap can be small.

---

**2. Supervised Machine Learning:**
A classifier is trained on a large corpus of sentences where the correct word sense is manually labeled. Features extracted from the context (surrounding words, POS tags, collocations) are used to train the model.

**Advantage:** High accuracy with enough training data.
**Disadvantage:** Creating labeled training data is expensive and time-consuming for every word.

---

**3. Unsupervised — Word Sense Induction:**
Instead of using predefined dictionary senses, the system discovers senses automatically by clustering similar usage contexts together. No sense inventory or labeled data is required.

---

## Q: What is Information Retrieval (IR)? Explain the Vector Space Model and TF-IDF.

**Information Retrieval (IR)** is the field concerned with finding relevant documents from a large corpus in response to a user's search query. It is the foundation of search engines like Google.

**Core components of an IR system:**
1. **Indexing:** Before any querying, all documents are preprocessed (tokenized, stemmed, stop words removed) and stored in an **inverted index** — a map from each term to the list of documents containing it.
2. **Querying:** The user's query is processed the same way as a document.
3. **Ranking:** Documents are ranked by how relevant they are to the query.

---

**Vector Space Model (VSM):**
In the VSM, both documents and queries are represented as vectors in a high-dimensional space, where each dimension corresponds to a unique term in the vocabulary.

`Document D = (w1, w2, w3, ..., wn)` where `wi` is the weight of term `i` in document `D`.

Relevance is measured by the **cosine similarity** between the query vector and each document vector:
```
cosine(Q, D) = (Q · D) / (|Q| × |D|)
```
The result is between 0 (totally dissimilar) and 1 (identical). Documents are ranked in decreasing order of cosine similarity.

---

**TF-IDF Weighting:**
Simply counting how many times a term appears in a document is a poor weight because common words (like "the", "is") appear everywhere and are useless for distinguishing documents.

**TF-IDF** solves this by weighting each term using two factors:
- **TF (Term Frequency):** How often a term appears in a specific document. A term appearing 10 times in a document is more important than one appearing twice.
  `TF(t, d) = count of term t in document d`

- **IDF (Inverse Document Frequency):** Penalizes terms that appear in many documents (common, uninformative words).
  `IDF(t) = log(Total documents / Documents containing t)`

  If a term appears in all N documents, IDF = log(N/N) = 0 — the term gets zero weight.
  If a term appears in only 1 document, IDF = log(N/1) = log(N) — a high weight.

**TF-IDF score:** `TF(t,d) × IDF(t)` — high for terms that are frequent in a document but rare across the corpus.

---

## Q: What is Pragmatics? Explain Discourse and Anaphora Resolution.

**Pragmatics** is the branch of linguistics that studies how context beyond the literal meaning of words affects interpretation. It deals with how sentences are used in real communication, taking into account the speaker's intentions, shared knowledge, and social conventions.

**Example:** The sentence "Can you pass the salt?" is literally a yes/no question about physical ability. Pragmatically, it is a polite request. Pragmatics explains why we interpret it as a request.

**Speech Acts:** A pragmatic theory that classifies utterances by the action they perform:
- **Assertion:** "The train leaves at 5."
- **Question:** "Where is the library?"
- **Command:** "Close the door."
- **Promise:** "I will be there."

---

**Discourse Analysis:**
Discourse refers to language in use above the level of a single sentence — a conversation, a paragraph, or a document. Discourse analysis examines how sentences connect to form coherent, meaningful speech or text.

**Discourse Structure:**
Text is not just a random sequence of sentences. Sentences are connected by **rhetorical relations** such as:
- **Elaboration:** One sentence provides more detail about the previous.
- **Contrast:** One sentence presents an opposing idea.
- **Causation:** One event causes another.

---

**Anaphora Resolution:**
Anaphora occurs when a word (typically a pronoun) refers back to a previously mentioned entity (the **antecedent**).

- "**Maria** entered the room. **She** looked around." → "She" refers to Maria.
- "The students finished their **exam**. Then they returned **it**." → "it" refers to exam.

Anaphora resolution is the task of correctly identifying what a pronoun or definite noun phrase refers to.

**Algorithms for Anaphora Resolution:**
1. **Hobbs Algorithm:** A simple syntactic tree-searching algorithm. It searches the parse trees of the current and preceding sentences in a specific order to find the most grammatically likely antecedent.
2. **Centering Theory:** A discourse model based on the idea that a text maintains a **center of attention** (the entity being talked about). The algorithm prefers antecedents that fit the current discourse center.
3. **Machine Learning approaches:** Train a classifier on pairs (pronoun, candidate antecedent) with features like gender agreement, number agreement, and syntactic position.

---

## Q: What is Natural Language Generation (NLG)? Explain its phases.

**Natural Language Generation (NLG)** is the sub-field of NLP concerned with automatically producing fluent, coherent, and contextually appropriate text from non-linguistic data (like database records, structured knowledge, or sensor readings).

NLG is the reverse of Natural Language Understanding. Examples include: automatic report generation from financial data, medical record summarization, and chatbot response generation.

---

**Phases of NLG (The Pipeline Architecture):**

**1. Content Determination:**
Deciding *what* information from the underlying data source needs to be communicated in the output text. Not all available information is relevant or worth including.
- Example: A sports report generator must decide whether to mention the final score, the top scorer, or the turning point of the game.

**2. Discourse Planning / Sentence Aggregation:**
Deciding *how* to organize the selected content into a coherent structure and grouping related facts into the same sentence to avoid a choppy, repetitive text.
- Example: Instead of "The score was 3-0. The first goal was scored by Messi. The second goal was scored by Messi." → Aggregate to: "Messi scored twice in a 3-0 victory."

**3. Lexicalization:**
Choosing the specific words and phrases (synonyms, technical terms) to express the selected content. This involves selecting the appropriate verb, noun, and modifiers.
- Example: Should the system say "The patient exhibited signs of improvement" or "The patient got better"? It depends on the target audience.

**4. Referring Expression Generation:**
Deciding how to refer to entities in the text — using a full name the first time ("the Prime Minister of Canada"), and a pronoun or short description subsequently ("he" or "the Prime Minister").

**5. Surface Realization:**
Converting the abstract, structured content plan into actual grammatical sentences. This involves applying grammar rules to produce correct word order, verb conjugations, and punctuation.
- Example: Combining `Verb=DEFEAT, Agent=Italy, Patient=France, Tense=Past` → "Italy defeated France."

---

## Q: Explain Machine Translation. Compare the three generations of MT.

**Machine Translation (MT)** is the automated use of software to translate text from one natural language (the source language) to another (the target language).

| Approach | How it Works | Advantage | Disadvantage |
|---|---|---|---|
| **Rule-Based MT (RBMT)** | Uses large dictionaries + hand-written grammatical transfer rules. Translates word by word and adjusts grammar. | No training data needed. Precise for well-defined domains. | Rules are expensive to write. Fails on idioms, slang, and complex sentences. Quality is generally poor. |
| **Statistical MT (SMT)** | Learns translation patterns from huge parallel bilingual corpora (e.g., EU proceedings in multiple languages). Finds the most probable target translation for a given source phrase. | No explicit rules needed. Handles many language pairs. | Requires massive aligned training data. Struggles with long-range dependencies and morphology. |
| **Neural MT (NMT)** | Uses deep neural networks, specifically encoder–decoder architectures with attention mechanisms. The encoder reads the full source sentence and compresses it into a context vector; the decoder generates the target sentence word by word, attending to the relevant parts of the source. | Produces the most fluent, natural output. Captures long-range dependencies. Handles morphology and idioms well. | Needs massive computing resources. Requires large amounts of training data. Can produce fluent but factually wrong translations ("hallucinations"). |

**Current standard:** Neural MT with **Transformer architecture** (attention is all you need), which is the basis of systems like Google Translate and DeepL.
