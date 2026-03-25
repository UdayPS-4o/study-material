# Module 3: Speech Processing & POS Tagging

## 1. Speech Recognition Basics
*   **Goal:** Converting spoken audio into written text automatically (ASR - Automatic Speech Recognition).
*   **HMM (Hidden Markov Model):** The main mathematical model used in traditional speech recognition. 
    * *Concept:* You only observe the audio waves (observable states), but the actual words being wildly spoken are "hidden". HMM calculates the probability of what words were actually said based on the audio.

## 2. Viterbi Algorithm
*   **What it does:** It is a fast dynamic programming algorithm used alongside HMMs.
*   **Why it's useful:** Instead of calculating every single possible combination of words a person might have said (which would take hours), Viterbi instantly calculates the single *most likely sequence* of words based on the audio.

## 3. Acoustic Processing & Feature Extraction
*   **Acoustic Processing:** The act of recording an analog sound wave with a microphone and digitizing it into numbers the computer can read (Sampling & Quantization).
*   **Feature Extraction:** Raw audio is too messy. Feature extraction pulls out just the core "shape" of the human voice.
    * **MFCC (Mel-Frequency Cepstral Coefficients):** The most famous method. It mathematically mimics how the human ear hears sound frequencies, ignoring background hums and focusing on vocal patterns.

## 4. Speech Synthesis (Text-to-Speech / TTS)
*   **Goal:** Making the computer read text out loud like a human.
*   **3 Main Methods:**
    1.  **Concatenative:** Splicing together tiny, pre-recorded audio snippets of real human voices. (Sounds natural, but requires massive databases).
    2.  **Formant:** Using math to artificially generate frequency waves completely from scratch. (Sounds highly robotic, requires zero recordings).
    3.  **Neural/Deep Learning:** Using AI (like Google's WaveNet) to generate flawless human-like waveforms directly.

## 5. Part-of-Speech (POS) Tagging
*   **Goal:** Labeling every word in a sentence with its correct grammar tag (Noun, Verb, Adjective, etc.).
*   **Types of Taggers:**
    1.  **Rule-Based:** Uses massive dictionaries and strict hand-written grammar rules (e.g., "If it ends in '-ing', it's a verb").
    2.  **Stochastic (Probabilistic):** Uses statistics from massive text datasets. (e.g., "The word 'race' is used as a Noun 70% of the time, so tag it as a Noun").
    3.  **Transformation-Based (Brill Tagger):** A hybrid. It first tags every word randomly with its most common tag, and then applies machine learning rules sequentially to fix its initial mistakes.
