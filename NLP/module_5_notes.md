# Module 5: Pragmatics, IR & NLG

## 1. Word Sense Disambiguation (WSD)
*   **The Problem:** Many English words have totally different meanings depending on context (Polysemy). E.g., The "bank" of a river vs. a financial "bank".
*   **The Goal:** The computer figuring out exactly which definition of the isolated word is being actively used in the current sentence.
*   **Solutions:** Often handled via contextual Machine Learning models (like BERT) or looking up surrounding dictionary definitions (Lesk Algorithm).

## 2. Information Retrieval (IR)
*   **What it is:** The technology behind Search Engines. Finding documents relevant to a user's search query inside massive unstructured datasets.
*   **Vector Space Model:** It converts all documents and search queries into massive numerical math vectors. 
    *   *TF-IDF Weighting:* Determines the sheer importance of a specific search word inside a document.
    *   *Cosine Similarity:* Measures the physical angle between the search vector and the document vector. The smaller the angle, the higher the search ranking.
*   **Improving Queries:** If searches fail, the system helps by employing Query Expansion (automatically adding hidden synonyms to the secret search) or Spell Checking.

## 3. Pragmatic Processing (Discourse)
*   **Pragmatics:** How real-world context entirely changes assumed meaning. (e.g., "Can you pass the salt?" isn't a yes/no question about physical ability; it's a polite command).
*   **Discourse:** Analyzing language across multiple sentences sequentially, not just one.
    *   *Anaphora Resolution:* Crucial in discourse. It is the act of figuring out who pronouns point to. "John went home. **He** was tired." (Figuring out "He" securely equals John).

## 4. Natural Language Generation (NLG)
*   **What it is:** The exact opposite of reading computer text. It is making the computer autonomously *generate and write* perfectly human-readable sentences from raw data sets.
*   **4 Strict Steps of NLG:**
    1.  **Content Determination:** Deciding exactly *what* facts and data to write about.
    2.  **Sentence Aggregation:** Grouping facts logically together so the text isn't wildly repetitive.
    3.  **Lexicalization:** Selecting the perfect specific vocabulary words to deploy natively.
    4.  **Surface Realization:** Applying proper grammar formatting, commas, and strict capitalizations.

## 5. Machine Translation (MT)
*   **Goal:** Automatically translating human text from a Source Language directly to a Target Language natively.
*   **3 Generational Approaches:**
    1.  **Rule-Based MT:** Oldest method. Forces strict word-for-word dictionary lookups and hardcore grammar rules. (Translates extremely poorly).
    2.  **Statistical MT (SMT):** Uses massive parallel bilingual text databases to wildly guess the highest probability string of translated words.
    3.  **Neural MT (NMT):** The current standard (e.g., Google Translate). Uses Deep Learning Neural Networks (seq2seq architectures) to translate entire sentence blocks fluidly preserving deep context.
