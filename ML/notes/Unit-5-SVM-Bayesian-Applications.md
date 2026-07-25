# Unit 5 — Support Vector Machines, Bayesian Learning & Applications of ML

> **Exam weight: ~15.6% of offered marks but Q7 comes from here in 4/5 papers. Bayesian learning asked 4/5 years. SVM ABSENT from the last 2 papers — statistically DUE next. ImageNet case study never asked despite being named in syllabus.**

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|---|---|---|
| May-2022 | What is SVM — discuss in detail | 7 |
| May-2022 | Bayesian theorem with example | 7 |
| May-2022 | Bayesian learning + its impact in ML | 7 |
| May-2022 | NLP — short note | 3.5 |
| May-2023 | Bayesian belief network numerical — CPTs + P(Mileage=Lo, Engine=Bad, AC=Broken) | 7 |
| May-2023 | Computer Vision — short note with example | 7 |
| May-2024 | Support vectors + their role in the decision boundary | 7 |
| May-2024 | ML in speech processing | 7 |
| Dec-2024 | Bayesian learning principles — Bayes theorem + posterior probability | 7 |
| Dec-2024 | ML in computer vision applications | 7 |
| Dec-2024 | NLP — short note | 7 |
| Jun-2025 | Applications of ML in Speech Processing | 9 |
| Jun-2025 | Short note on Tokenization | 5 |
| Jun-2025 | NLP | 4 |

> 📌 The May-2023 BBN numerical is **fully solved step-by-step in `Numericals-and-Short-Notes.md`**. This file covers the BBN *concept* you must write before the calculation.

---

## Support Vector Machine (SVM) [🔥 PYQ May-22, May-24 — ABSENT 2 papers, DUE next — MUST DO]

> **✍️ 14-mark answer skeleton (write both halves):**
> **Half A — What is SVM (7):**
> 1. Opening definition: "SVM is a supervised learning algorithm that finds the optimal hyperplane which separates classes with the maximum margin."
> 2. Headings: **Hyperplane → Margin → Support Vectors → Maximum-margin objective**
> 3. Draw the **margin diagram** (two classes, hyperplane, two margin lines, circle the support vectors).
> 4. Close with example: spam vs not-spam email classification.
> **Half B — Soft margin + Kernel trick (7):**
> 5. Headings: **Hard vs Soft margin (C parameter) → Non-linear data problem → Kernel trick → Kernel table (Linear/Poly/RBF)**
> 6. Draw the **kernel mapping diagram** (1-D non-separable → 2-D separable).
> 7. Close with **pros/cons + applications** (face detection, text classification, bioinformatics).

### Definition

**Support Vector Machine (SVM)** is a **supervised machine learning algorithm** used for **classification and regression**. It works by finding the **optimal separating hyperplane** — the decision boundary that separates the two classes with the **maximum possible margin** (largest gap between the classes). The training points that lie closest to this boundary are called **support vectors**, and they alone define the boundary.

### Key Terms (write all four with one line each)

- **Hyperplane:** the decision boundary. In 2-D it is a line, in 3-D a plane, in n-D an (n−1)-dimensional flat surface. Equation: `w·x + b = 0` where `w` = weight (normal) vector, `b` = bias.
- **Margin:** the distance between the hyperplane and the nearest data point of either class. Total margin width = `2 / ||w||`. SVM **maximizes** this margin ⇒ equivalently **minimizes** `||w||²/2`.
- **Support Vectors:** the data points lying **exactly on the margin lines** (`w·x + b = +1` and `w·x + b = −1`). They "support" (hold up) the hyperplane.
- **Decision rule:** for a new point x → predict class by `sign(w·x + b)` (positive side = class +1, negative side = class −1).

### The Classic Margin Diagram (practice until 60-second reproducible)

```
        x2
        |            +        +
        |    margin      +        + (Class +1)
        |   |<----->|  +      +
        |    .      /(+)   <-- support vector (circled)
        |     .    /  /
        |      .  /  /   w·x + b = +1  (margin line)
        |      (o)  /
        |      /  '/'  <-- OPTIMAL HYPERPLANE  w·x + b = 0
        |     /  / .
        |    /  /   .    w·x + b = -1  (margin line)
        |  (o)     <-- support vector (circled)
        | o    o     .
        |   o     o    (Class -1)
        |________________________ x1

   (o)/(+) circled points = SUPPORT VECTORS
   Distance between the two dashed margin lines = 2/||w||  (MAXIMIZED)
```

### Why maximum margin? (the scoring line checkers look for)

- A wider margin ⇒ **better generalization** on unseen data and **lower overfitting**.
- Out of infinitely many separating lines, SVM picks the **one** that is farthest from both classes — the safest boundary.
- Only support vectors matter: **deleting any non-support-vector point does not change the hyperplane**. This is the exact answer to the May-2024 question "role of support vectors in the decision boundary".

### Role of Support Vectors in the Decision Boundary [🔥 PYQ May-24]

1. **Boundary-defining points** — the hyperplane is computed only from support vectors; all other points are ignored.
2. **They fix the margin** — margin lines pass through them; moving a support vector moves/rotates the hyperplane.
3. **Sparse solution** — the final classifier `f(x) = sign(Σ αᵢ yᵢ (xᵢ·x) + b)` sums only over support vectors (αᵢ > 0 only for them).
4. **Robustness** — removing non-support-vector points changes nothing; hence SVM is memory-efficient at prediction time.
5. **Hardest examples** — support vectors are the most "confusable" training points, so the model is built on the difficult cases.

### Hard Margin vs Soft Margin (the C parameter)

| Aspect | Hard Margin | Soft Margin |
|---|---|---|
| Assumption | Data perfectly linearly separable | Real data — noise/overlap allowed |
| Misclassification | None allowed | Some allowed via slack variables `ξᵢ ≥ 0` |
| Objective | minimize `‖w‖²/2` | minimize `‖w‖²/2 + C·Σξᵢ` |
| Outliers | One outlier can wreck the boundary | Tolerates outliers |
| Used in practice | Rarely | Almost always |

- **C parameter (regularization / penalty):** controls the trade-off between wide margin and few mistakes.
  - **Large C** → heavy penalty on errors → narrow margin, fits training data tightly → risk of **overfitting**.
  - **Small C** → errors cheap → wide margin, smoother boundary → risk of **underfitting**.

⚠️ **Common mistake:** writing "C is the margin". C is the **penalty for misclassification**; the margin is `2/||w||`. Large C ⇒ *smaller* margin, not larger.

### Kernel Trick (for non-linear data)

- **Problem:** many datasets cannot be separated by any straight line in the original space.
- **Idea:** map data to a **higher-dimensional space** where it *becomes* linearly separable — but do it **implicitly**. A kernel function `K(xᵢ, xⱼ) = φ(xᵢ)·φ(xⱼ)` computes the dot product in the high-dimensional space **without ever computing φ(x)** — this shortcut is the **kernel trick** (cheap computation, powerful boundaries).

```
 1-D: not separable            2-D after mapping z = x² : separable!
                                z
 --o--o--+--+--+--o--o-->  x    |  o           o
                                |   o         o
 (class o at both ends,         |    +  +  +          <-- a LINE now
  class + in the middle)        |___________________ x    separates them
```

| Kernel | Formula | Best for | Notes |
|---|---|---|---|
| **Linear** | `K(x,y) = x·y` | Linearly separable, text data (high-dim sparse) | Fastest; no mapping |
| **Polynomial** | `K(x,y) = (x·y + c)^d` | Curved boundaries, feature interactions | Degree `d` controls flexibility |
| **RBF / Gaussian** | `K(x,y) = exp(−γ‖x−y‖²)` | Unknown/complex boundaries — default choice | Maps to infinite dimensions; γ controls locality |
| Sigmoid | `K(x,y) = tanh(a·x·y + c)` | Neural-net-like behaviour | Rarely used |

**Mnemonic — "L-P-R-S": "Lazy People Rarely Succeed"** (Linear, Polynomial, RBF, Sigmoid).

### Advantages & Disadvantages

| ✅ Advantages | ❌ Disadvantages |
|---|---|
| Very effective in **high-dimensional** spaces | **Slow training** on very large datasets (~O(n²)–O(n³)) |
| **Memory efficient** — stores only support vectors | **No direct probability** output (needs Platt scaling) |
| Maximum margin ⇒ good **generalization**, resists overfitting | **Kernel & C, γ selection** is tricky (needs cross-validation) |
| Kernels handle **non-linear** data elegantly | **Sensitive to feature scaling** — must normalize inputs |
| Works when features > samples (e.g., genomics) | Poor when classes **overlap heavily** (noisy data) |

### Applications of SVM

1. **Face detection** — classify image regions as face / non-face.
2. **Text & spam classification** — high-dimensional sparse word vectors suit linear SVM.
3. **Handwriting / digit recognition** (MNIST-style).
4. **Bioinformatics** — cancer classification from gene expression (features ≫ samples).
5. **Image classification** (pre-deep-learning standard, still strong on small data).

**One memorable example (close your answer with this):** classifying emails as *spam (+1)* vs *not spam (−1)*: each email → vector of word frequencies; SVM finds the maximum-margin hyperplane; borderline emails ("Congratulations, you won…") become the support vectors that define the filter.

⚠️ **Common mistake:** forgetting to **circle the support vectors and label both margin lines** in the diagram — that labelled diagram alone carries ~2 marks.

---

## K-Nearest Neighbours (KNN) — brief [PYQ May-23 (numerical) — revise once]

### Definition

**KNN** is a **supervised, instance-based (lazy) learning** algorithm: to classify a new point, find its **K closest training points** (usually Euclidean distance) and assign the **majority class** among them. No training phase — the data itself is the model.

### Algorithm (4 steps)

1. Choose K (odd, e.g., 3 or 5, to avoid ties).
2. Compute distance from the query point to all training points: `d = √(Σ(xᵢ − yᵢ)²)`.
3. Pick the K nearest neighbours.
4. Classification → **majority vote**; Regression → **average** of neighbours' values.

| Aspect | KNN | SVM |
|---|---|---|
| Learning type | Lazy (no training) | Eager (learns boundary) |
| Prediction speed | Slow (scans all data) | Fast (few support vectors) |
| Boundary | Local, irregular | Global, maximum margin |
| Scaling needed? | Yes (distance-based) | Yes |

- **Small K** → noisy, overfits. **Large K** → over-smooth, underfits.
- **Example:** classify a fruit (weight=150 g, texture=smooth) by looking at its 3 nearest labelled fruits → 2 apples, 1 orange → predict **apple**.

⚠️ **Common mistake:** calling KNN "K-means". KNN = supervised classification; K-means = unsupervised clustering. Different algorithms.

---

## Bayesian Learning [🔥 PYQ May-22 ×2, May-23, Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton (Bayes theorem + Bayesian learning):**
> 1. Opening: "Bayesian learning is a probabilistic approach where we update our belief in a hypothesis as evidence (data) arrives, using Bayes' theorem."
> 2. Headings: **Bayes theorem formula (label all 4 terms) → Meaning of prior/likelihood/posterior → Worked disease-test example with numbers → MAP vs ML hypothesis → Impact/importance in ML**
> 3. Diagram: the prior → evidence → posterior update flow (tiny box diagram).
> 4. Close with: naive Bayes spam filter as the real-world example.

### Definition

**Bayesian learning** is a probabilistic framework for machine learning in which each hypothesis is assigned a **probability of being correct**, and this probability is **updated using Bayes' theorem** whenever new training data is observed. Instead of committing to one hypothesis, it reasons with **degrees of belief**.

### Bayes' Theorem (write with ALL terms labelled — this is where marks live)

`P(h|D) = [ P(D|h) × P(h) ] / P(D)`

| Term | Name | Meaning (one line each) |
|---|---|---|
| `P(h|D)` | **Posterior** | Probability of hypothesis h **after** seeing data D — what we want |
| `P(D|h)` | **Likelihood** | Probability of observing data D **if** h were true |
| `P(h)` | **Prior** | Belief in h **before** seeing any data (domain knowledge) |
| `P(D)` | **Evidence** (marginal) | Overall probability of the data under all hypotheses — a normalizer |

```
  PRIOR  P(h)  ---->  [ observe data D ]  ---->  POSTERIOR  P(h|D)
 (old belief)          via LIKELIHOOD P(D|h)      (updated belief)
                        ÷ EVIDENCE   P(D)
```

**Mnemonic:** "**P**osterior = **L**ikelihood × **P**rior / **E**vidence" → "**P**lease **L**earn **P**robability **E**arly."

### Worked Example — Disease Test (memorize these exact numbers)

**Given:** a disease affects **1%** of people: `P(D) = 0.01`. A test detects it **99%** of the time: `P(+|D) = 0.99`. False-positive rate is **5%**: `P(+|¬D) = 0.05`. A person tests positive. Probability they actually have the disease?

**Step 1 — Evidence (total probability of testing positive):**
`P(+) = P(+|D)·P(D) + P(+|¬D)·P(¬D) = 0.99×0.01 + 0.05×0.99 = 0.0099 + 0.0495 = 0.0594`

**Step 2 — Bayes:**
`P(D|+) = P(+|D)·P(D) / P(+) = 0.0099 / 0.0594 ≈ 0.1667 ≈ 16.7%`

**Insight line (write it — examiners love it):** even with a 99%-accurate test, a positive result means only ~17% chance of disease, because the disease is **rare** (the prior dominates). This is why priors matter.

⚠️ **Common mistake:** confusing `P(+|D)` (test accuracy, likelihood) with `P(D|+)` (what the patient wants to know, posterior). Bayes' theorem exists precisely to convert one into the other.

### MAP Hypothesis vs ML Hypothesis

| | **MAP (Maximum A Posteriori)** | **ML (Maximum Likelihood)** |
|---|---|---|
| Picks | h maximizing the **posterior** `P(D|h)·P(h)` | h maximizing the **likelihood** `P(D|h)` only |
| Formula | `h_MAP = argmax_h P(D|h)·P(h)` | `h_ML = argmax_h P(D|h)` |
| Uses prior? | **Yes** — prior knowledge included | **No** — assumes all h equally likely |
| Relationship | MAP = ML **when all priors are equal** | Special case of MAP |
| Example | Diagnosis using disease rarity (prior 1%) | Diagnosis trusting the test alone |

(`P(D)` is dropped from argmax because it is the same for every hypothesis.)

### Impact / Importance of Bayesian Learning in ML [🔥 PYQ May-22]

1. **Handles uncertainty** — outputs probabilities, not just hard labels (critical in medicine, finance).
2. **Incorporates prior knowledge** — domain expertise enters through `P(h)`.
3. **Incremental (online) learning** — each new example updates the posterior; today's posterior becomes tomorrow's prior.
4. **No hypothesis is discarded** — predictions can combine all hypotheses weighted by probability (Bayes optimal classifier — the theoretical **gold standard** no other method can beat on average).
5. **Practical algorithms born from it** — Naive Bayes classifier, Bayesian belief networks, Bayesian optimization for hyperparameter tuning, spam filters.
6. **Benchmark role** — even when too expensive to compute exactly, it defines the standard against which other algorithms are measured.

### Naive Bayes Classifier (definition + tiny worked example)

**Definition:** a simple probabilistic classifier applying Bayes' theorem with the **"naive" assumption that all features are conditionally independent given the class**. Prediction rule:

`C_pred = argmax_C  P(C) × Π P(xᵢ|C)`   (product over all features xᵢ)

**Tiny worked example — Play Tennis (Outlook = Sunny, Wind = Strong)?**
From the classic 14-row dataset: `P(Yes) = 9/14`, `P(No) = 5/14`, `P(Sunny|Yes) = 2/9`, `P(Sunny|No) = 3/5`, `P(Strong|Yes) = 3/9`, `P(Strong|No) = 3/5`.

- Score(Yes) = `9/14 × 2/9 × 3/9` = 0.643 × 0.222 × 0.333 ≈ **0.0476**
- Score(No) = `5/14 × 3/5 × 3/5` = 0.357 × 0.600 × 0.600 ≈ **0.1286**

Since 0.1286 > 0.0476 → **Predict: No** (don't play tennis).

- **Why "naive" still works:** even when independence is false, the *ranking* of classes often stays correct.
- **Laplace smoothing:** add 1 to every count so an unseen feature value never makes the whole product zero: `P(xᵢ|C) = (count+1)/(N+k)`.
- **Applications:** spam filtering, sentiment analysis, document classification, medical diagnosis.

⚠️ **Common mistake:** forgetting to multiply by the **prior** `P(C)` — students multiply only the likelihoods and lose the mark.

---

## Bayesian Belief Network (BBN) [🔥 PYQ May-23 (7-mark numerical) — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening definition: "A Bayesian belief network is a directed acyclic graph (DAG) that represents probabilistic dependencies among variables, with a CPT at each node."
> 2. Headings: **Structure (DAG + CPTs) → Conditional independence idea → Joint probability formula → Small example network (diagram) → One computed joint probability → Applications**
> 3. Diagram: the Burglary–Alarm network (or the car network from the PYQ).
> 4. Close with: joint probability chain-rule calculation (then, in the actual exam numerical, plug the given CPT values — full solution in Numericals file).

### Definition

A **Bayesian Belief Network** is a **directed acyclic graph (DAG)** in which:
- each **node** = a random variable,
- each **directed edge** = a direct probabilistic dependence (parent → child),
- each node stores a **Conditional Probability Table (CPT)**: `P(node | its parents)`.

It compactly represents the **full joint distribution** using conditional independence: each variable depends **only on its parents**, not on all other variables.

### Key Formula (the whole numerical hangs on this)

`P(X₁, X₂, …, Xₙ) = Π P(Xᵢ | Parents(Xᵢ))`

### Small Example Network (Burglary–Alarm — drawable in 30 seconds)

```
   Burglary        Earthquake
      \               /
       v             v
         --> Alarm <--
            /     \
           v       v
     JohnCalls   MaryCalls
```

- Alarm depends on Burglary and Earthquake → CPT `P(A|B,E)` has 4 rows.
- John/Mary call depending only on the Alarm (conditionally independent of Burglary **given** Alarm).
- Joint example: `P(B, ¬E, A, J, M) = P(B)·P(¬E)·P(A|B,¬E)·P(J|A)·P(M|A)` — one number from each CPT, multiplied.

**PYQ connection (May-23):** the car network (Engine, Mileage, AC…) works identically: `P(Mileage=Lo, Engine=Bad, AC=Broken) = P(Engine=Bad) × P(Mileage=Lo|…) × P(AC=Broken|…)` reading each factor from the given CPTs. **Full worked solution → `Numericals-and-Short-Notes.md`.**

### Why BBNs matter (2–3 bullets to finish the answer)

- **Middle path:** less naive than Naive Bayes (allows *some* dependencies), cheaper than the full joint table (2ⁿ entries → only per-node CPTs).
- **Inference in any direction:** diagnostic (symptom → cause) and predictive (cause → symptom).
- **Applications:** medical diagnosis systems, fault/failure diagnosis, spam filtering, risk assessment.

⚠️ **Common mistake:** multiplying plain `P(Xᵢ)` for every node instead of `P(Xᵢ|Parents)` — the chain must respect the arrows.

---

## Applications of ML in Computer Vision [🔥 PYQ May-23, Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening: "Computer vision is the field of ML that enables machines to extract meaning from images and videos."
> 2. Headings: **Definition → Core tasks (classification / detection / segmentation) → CV pipeline diagram → Role of CNNs → 5 real applications**
> 3. Diagram: the CV pipeline (image → preprocess → feature extraction → model → output).
> 4. Close with example: face unlock on smartphones, or ImageNet classification.

### Definition

**Computer Vision (CV)** is the branch of AI/ML that trains computers to **interpret and understand visual data** (images, video) — to identify *what* is present, *where* it is, and *what is happening* — tasks the human visual system does effortlessly.

### Core CV Tasks (the 3-level ladder — always write this)

| Task | Question answered | Output | Example |
|---|---|---|---|
| **Image Classification** | "What is in the image?" | One label per image | Cat vs Dog |
| **Object Detection** | "What & **where**?" | Bounding boxes + labels | YOLO finding all cars + pedestrians |
| **Semantic Segmentation** | "Which **pixels** belong to what?" | Per-pixel class map | Road vs footpath for self-driving |
| (Instance segmentation) | "Which pixels of **which object**?" | Per-pixel + per-object | Mask R-CNN separating each person |

```
             COMPUTER VISION PIPELINE
 [Input image] -> [Preprocessing]     -> [Feature extraction] -> [ML model]  -> [Output]
  (pixels/RGB)    (resize, normalize,    (CNN conv layers:       (classifier/   (label /
                   augment, denoise)      edges->textures->       detector)      boxes /
                                          parts->objects)                        masks)
```

- **Why CNNs rule CV:** convolution layers automatically learn a **feature hierarchy** (edges → textures → object parts → whole objects), replacing hand-crafted features (SIFT/HOG) used before 2012.

### Major Applications (pick any 5, one line each)

1. **Face recognition** — phone unlock, attendance systems, photo tagging.
2. **Medical imaging** — tumour detection in X-ray/CT/MRI, diabetic retinopathy screening.
3. **Self-driving vehicles** — lane detection, pedestrian/vehicle detection, traffic-sign recognition.
4. **OCR** — reading printed/handwritten text, number plates (ANPR), cheque processing.
5. **Agriculture & industry** — crop-disease detection from leaf photos; defect inspection on assembly lines.
6. **Retail & security** — cashier-less stores (Amazon Go), CCTV anomaly detection.

**One memorable example (close with it):** a self-driving car simultaneously runs *classification* (traffic-light colour), *detection* (boxes around pedestrians), and *segmentation* (exact road area) — all three CV tasks in one frame.

⚠️ **Common mistake:** writing only applications and skipping the **task types + pipeline** — the 7 marks are split roughly definition(1) + tasks(2) + pipeline diagram(2) + applications(2).

---

## Applications of ML in Speech Processing [🔥 PYQ May-24, Jun-25 (9 marks) — MUST DO]

> **✍️ 7/9-mark answer skeleton:**
> 1. Opening: "Speech processing applies ML to understand, generate and analyse human speech."
> 2. Headings: **Definition → ASR pipeline (diagram!) → MFCC feature idea → Acoustic vs Language model → TTS → Speaker identification → Applications list**
> 3. Diagram: the ASR pipeline (audio → preprocessing → MFCC → acoustic model → language model → text).
> 4. Close with example: "Hey Siri / Ok Google" voice assistants.

### Definition

**Speech processing** is the application of ML to spoken audio, covering three directions: **Speech → Text** (Automatic Speech Recognition, ASR), **Text → Speech** (TTS synthesis), and **Speech → Identity/Emotion** (speaker recognition, emotion detection).

### 1. Automatic Speech Recognition (ASR) — the core pipeline

```
            ASR (SPEECH-TO-TEXT) PIPELINE
 [Raw audio wave]
       |
       v
 [Preprocessing]        - sampling (16 kHz), noise removal,
       |                  framing into 20-25 ms windows
       v
 [Feature extraction]   - MFCC vectors per frame
       |                  (Mel-Frequency Cepstral Coefficients)
       v
 [Acoustic model]       - maps MFCC frames -> phonemes /k/ /ae/ /t/
       |                  (old: HMM-GMM, new: deep RNN/LSTM/Transformer)
       v
 [Language model]       - picks the most probable word sequence
       |                  ("recognise speech" vs "wreck a nice beach")
       v
 [Decoded text output]  - "cat"
```

- **Preprocessing:** digitize the wave, remove background noise, split into short overlapping **frames** (speech is only stable for ~25 ms).
- **MFCC features:** compress each frame into ~13 coefficients that mimic **how the human ear perceives frequency** (Mel scale) — the standard "fingerprint" of a sound.
- **Acoustic model:** ML model (historically HMM + GMM; now deep networks — RNN/LSTM/Transformers) mapping audio features to **phonemes** (basic sound units).
- **Language model:** adds grammar/context probability so the output is a sensible sentence — resolves homophones ("their/there").

### 2. Text-to-Speech (TTS)

- Converts text into natural-sounding audio: text → linguistic features → **neural vocoder** (e.g., WaveNet-style models) → waveform.
- Modern TTS is trained end-to-end and can clone voice styles; used in screen readers, announcements, voice assistants' replies.

### 3. Speaker Identification / Verification

- **Identification:** *who* is speaking (1-of-N) — matches a voice against enrolled voiceprints (embeddings).
- **Verification:** *is it really this person?* (yes/no) — voice biometrics for phone banking security.
- Also: **emotion recognition** from tone (call-centre analytics).

### Applications List (close the essay with 5–6 of these)

1. **Voice assistants** — Siri, Alexa, Google Assistant (ASR + NLP + TTS end-to-end).
2. **Voice typing & dictation** — Google Docs voice input, courtroom/medical transcription.
3. **Automatic captions** — YouTube subtitles, live captioning for accessibility (hearing-impaired).
4. **Call-centre automation** — IVR systems, sentiment monitoring of customer calls.
5. **Language learning apps** — pronunciation scoring (Duolingo).
6. **Voice biometrics** — speaker verification for secure banking.
7. **Real-time speech translation** — speech → text → translate → TTS in another language.

**One memorable example:** saying "Hey Google, set an alarm for 6 AM" runs the *entire stack*: wake-word detection → ASR pipeline → NLP intent extraction → action → TTS confirmation, all in ~1 second.

⚠️ **Common mistake:** skipping the **pipeline diagram** and writing only an applications list — the May-24/Jun-25 checkers award the diagram + MFCC/acoustic/language-model terms, not the app names alone.

---

## Applications of ML in Natural Language Processing (NLP) [🔥 PYQ May-22, Dec-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening: "NLP is the branch of AI that enables computers to read, understand and generate human language."
> 2. Headings: **Definition → NLP pipeline (diagram) → Core tasks table → Key applications → Challenges (ambiguity)**
> 3. Diagram: NLP pipeline (text → tokenization → preprocessing → vectorization → model → output).
> 4. Close with example: Google Translate or ChatGPT-style chatbots.

### Definition

**Natural Language Processing (NLP)** is the field of AI/ML concerned with the **interaction between computers and human language** — enabling machines to read, understand (NLU), and generate (NLG) text or speech in languages like English or Hindi.

### NLP Pipeline (draw this)

```
              NLP PIPELINE
 [Raw text] -> [Tokenization] -> [Preprocessing]        -> [Vectorization]     -> [ML model]      -> [Output]
  "I loved      ["I","loved",     (lowercase, remove        (Bag-of-Words,        (Naive Bayes /     (sentiment:
   this film"    "this","film"]    stopwords, stemming/      TF-IDF, word          RNN/LSTM /          POSITIVE)
                                   lemmatization, POS tag)   embeddings)           Transformer)
```

- **Text preprocessing terms (one line each):** *stopword removal* (drop "the, is, a"), *stemming* (crude chop: "playing"→"play"), *lemmatization* (dictionary form: "better"→"good"), *POS tagging* (noun/verb labels), *NER* (find names/places/dates).
- **Vectorization:** text must become numbers — Bag-of-Words counts, **TF-IDF** weights rare-but-important words, **word embeddings** (Word2Vec/GloVe) map words to dense vectors where similar words are nearby.

### Core NLP Tasks

| Task | What it does | Example |
|---|---|---|
| **Sentiment analysis** | Positive/negative opinion | Product-review mining |
| **Machine translation** | Language → language | Google Translate (En→Hi) |
| **Text classification** | Assign category | Spam filtering, news topics |
| **Named Entity Recognition** | Find names/places/dates | "Modi visited **Japan**" |
| **Question answering / chatbots** | Understand + respond | ChatGPT, customer support bots |
| **Summarization** | Long text → short | News headline generation |
| **Speech interface glue** | Text side of voice assistants | Alexa intent parsing |

### Key Applications (essay closer)

1. **Machine translation** (Google Translate — 100+ languages).
2. **Chatbots & virtual assistants** (customer service, Alexa/Siri understanding).
3. **Sentiment analysis** (brand monitoring on Twitter/X, review analytics).
4. **Spam & toxicity filtering** (Gmail spam = Naive Bayes/deep models on text).
5. **Search engines & autocomplete** (query understanding, "did you mean…").
6. **Text summarization & report generation** (news digests, legal document review).

- **Main challenge — ambiguity:** same words, many meanings ("bank" = river bank / money bank; "I saw her duck"). Context models (LSTMs → Transformers/BERT) exist to resolve this.

⚠️ **Common mistake:** answering NLP with only chatbot examples. Always include the **pipeline + at least 4 distinct tasks** — the Dec-24 7-marker expects structure, not a story.

### Tokenization (detailed) [🔥 PYQ Jun-25 (5 marks) — MUST DO]

> **✍️ 5-mark short-note skeleton:** definition → why needed (3 bullets) → 3 types with the same example word → one challenge line.

**Definition:** **Tokenization** is the **first step of the NLP pipeline**: splitting raw text into smaller units called **tokens** — words, subwords, or characters — which become the basic units the model processes.

**Why it is needed:**
1. ML models cannot consume raw strings — they need **discrete units** to map to numbers (IDs → vectors).
2. Defines the **vocabulary** of the model and its size.
3. Handles **unknown/rare words** gracefully (subword methods).
4. Consistency: same text always splits the same way → reproducible features.

**Types (use one example across all three):**

| Type | Splits into | Example: `"unhappiness"` / sentence | Pros / Cons |
|---|---|---|---|
| **Word-level** | Whole words by spaces/punctuation | `"I am unhappy"` → `[I][am][unhappy]` | Simple; but huge vocabulary, fails on unseen words (OOV) |
| **Subword-level** (BPE/WordPiece — used by BERT/GPT) | Frequent chunks | `unhappiness` → `[un][happi][ness]` | Small vocab + no OOV — best of both; slightly less interpretable |
| **Character-level** | Individual characters | `cat` → `[c][a][t]` | Tiny vocab, never OOV; but very long sequences, weak meaning per token |

- **Challenges:** contractions ("don't" → do + n't?), no-space languages (Chinese), hashtags/emojis, "New Delhi" = one entity but two word tokens.
- **Example line to close:** GPT-style models use ~50k subword tokens — "tokenization" itself becomes `[token][ization]`.

⚠️ **Common mistake:** saying tokenization = "removing stopwords" — tokenization only **splits** text; cleaning comes after.

---

## Case Study: ImageNet Competition (ILSVRC) [⚠️ DUE — in syllabus, never asked — likely next]

> **✍️ 7-mark answer skeleton (if it appears):**
> 1. Opening: "ImageNet is a dataset of 14M+ labelled images; its annual competition ILSVRC (2010–2017) became the benchmark that launched the deep-learning era."
> 2. Headings: **Dataset scale → ILSVRC task & metric (top-5 error) → AlexNet 2012 breakthrough → Progression table (ZFNet→VGG→GoogLeNet→ResNet) → Why it transformed deep learning → Transfer-learning connection**
> 3. Diagram: the error-rate progression table (or a falling bar sketch 26→15→…→3.6 with human 5% line).
> 4. Close with: "ImageNet-pretrained CNNs are today's default starting point for every CV task (transfer learning)."

### The Dataset

- Created by **Fei-Fei Li (Stanford), 2009** — over **14 million** hand-labelled images across **20,000+ categories** (WordNet nouns), labelled via crowdsourcing (Amazon Mechanical Turk).
- Competition subset: **~1.2 million training images, 1000 classes**, 50k validation + 100k test.

### The Competition — ILSVRC (2010–2017)

- **ILSVRC** = ImageNet Large Scale Visual Recognition Challenge, run annually.
- **Main task:** image classification into 1000 classes. **Metric: top-5 error** — the answer counts as correct if the true label is among the model's 5 best guesses (used because many classes are very similar — 120 dog breeds!). *(write: "true label within top-5 predictions")*

### The 2012 AlexNet Breakthrough (the story to tell)

- Until 2011, winners used **hand-crafted features** (SIFT/HOG + SVM); best top-5 error ≈ **26%**, improving ~1–2% per year.
- **2012: AlexNet** (Krizhevsky, Sutskever, Hinton) — a deep **CNN** (8 layers, ReLU, dropout, trained on **2 GPUs**) scored **~15–16%** — a sudden **~10 percentage-point jump**, nearly halving the error overnight.
- This single result convinced the field that **deep learning + big data + GPUs** beats feature engineering — the "Big Bang" of modern deep learning.

### Winner Progression Table (memorize — this IS the answer)

| Year | Model | Layers | Top-5 error | Key idea |
|---|---|---|---|---|
| 2011 | Traditional CV (pre-CNN) | — | ~26% | Hand-crafted features + SVM |
| **2012** | **AlexNet** | 8 | **~15.3%** | First deep CNN win; ReLU, dropout, GPUs |
| 2013 | ZFNet | 8 | ~11.7% | Tuned AlexNet; visualization of filters |
| 2014 | VGG-16/19 (runner-up) | 16/19 | ~7.3% | Simplicity: stacked 3×3 convolutions |
| 2014 | GoogLeNet (winner) | 22 | ~6.7% | Inception modules, 1×1 convolutions |
| **2015** | **ResNet** | **152** | **~3.6%** | Skip/residual connections beat **human level (~5%)** |

**Trend to state:** deeper networks + architectural tricks → error fell **26% → 3.6% in 4 years**, crossing human performance (≈5%) in 2015; the challenge retired in 2017 as the task was "solved".

### Why ImageNet Transformed Deep Learning (4 bullets)

1. **Proved scale works** — big labelled data + deep CNNs + GPU compute = qualitative leap; triggered industry-wide adoption (Google, Facebook, Tesla).
2. **Standard benchmark** — a common scoreboard let every new architecture (VGG, Inception, ResNet) prove itself objectively.
3. **Birthplace of key techniques** — ReLU at scale, dropout, batch norm, residual connections all debuted/proved on ImageNet.
4. **Transfer learning connection (the modern payoff):** CNNs **pre-trained on ImageNet** learn general visual features (edges → textures → parts); practitioners download these weights and **fine-tune** on small datasets (medical X-rays, crop disease) — getting state-of-the-art results with only hundreds of images. "Pre-train on ImageNet, fine-tune on your task" is the default CV recipe (links to Unit-3 transfer learning).

⚠️ **Common mistake:** writing ImageNet is "an algorithm/model". ImageNet is a **dataset + competition**; AlexNet/ResNet are models that competed on it.

---

## ⚡ Quick Revision Box

### One-liners

| Topic | One-line essence |
|---|---|
| **SVM** | Supervised classifier that finds the maximum-margin hyperplane; boundary defined only by support vectors |
| **Hyperplane** | Decision surface `w·x + b = 0`; line in 2-D, plane in 3-D |
| **Margin** | Gap `2/||w||` between classes — maximized for best generalization |
| **Support vectors** | Closest points, lie on margin lines, alone define the boundary |
| **Soft margin / C** | Allows slack errors; large C → narrow margin/overfit, small C → wide margin/underfit |
| **Kernel trick** | Compute high-dim dot products via `K(x,y)` without mapping — enables non-linear boundaries |
| **KNN** | Lazy learner: majority vote of K nearest points (Euclidean distance) |
| **Bayes theorem** | Converts prior belief + evidence into updated posterior belief |
| **MAP vs ML** | MAP maximizes likelihood×prior; ML maximizes likelihood only (equal priors ⇒ same) |
| **Naive Bayes** | Bayes + feature-independence assumption; multiply prior × all likelihoods, pick max class |
| **BBN** | DAG + CPTs; joint = product of P(node|parents) |
| **Computer vision** | Classification (what) → detection (where) → segmentation (which pixels); CNN pipeline |
| **Speech processing** | ASR: audio → MFCC → acoustic model → language model → text; plus TTS and speaker ID |
| **NLP** | Text → tokenize → preprocess → vectorize → model; translation, sentiment, chatbots |
| **Tokenization** | Splitting text into word/subword/character tokens — step 1 of every NLP pipeline |
| **ImageNet** | 14M-image dataset + ILSVRC contest; AlexNet-2012 (26→15%) ignited deep learning; ResNet-2015 beat humans |

### Every formula in this unit

- Hyperplane: `w·x + b = 0`; margin lines `w·x + b = ±1`; margin width `2/||w||`
- SVM objective (soft margin): `min ||w||²/2 + C·Σξᵢ`
- SVM decision: `f(x) = sign(w·x + b)`
- Kernels: Linear `x·y` | Polynomial `(x·y + c)^d` | RBF `exp(−γ||x−y||²)`
- Euclidean distance (KNN): `d = √(Σ(xᵢ−yᵢ)²)`
- Bayes: `P(h|D) = P(D|h)·P(h) / P(D)`
- Total probability: `P(D) = Σ P(D|hᵢ)·P(hᵢ)`
- MAP: `h_MAP = argmax P(D|h)·P(h)` | ML: `h_ML = argmax P(D|h)`
- Naive Bayes: `C_pred = argmax P(C)·Π P(xᵢ|C)`; Laplace: `(count+1)/(N+k)`
- BBN joint: `P(X₁…Xₙ) = Π P(Xᵢ|Parents(Xᵢ))`
- Disease-test result to remember: 1% prior + 99% sensitivity + 5% FPR ⇒ posterior ≈ **16.7%**

### Diagrams to practice (draw each until < 90 seconds)

1. **SVM margin diagram** — two classes, hyperplane, two margin lines, circled support vectors (THE money diagram if SVM returns).
2. **Kernel mapping sketch** — 1-D non-separable → 2-D separable.
3. **Prior→Posterior update flow** (3-box Bayes flow).
4. **Burglary–Alarm BBN** (5-node DAG).
5. **CV pipeline** — image → preprocess → features → model → output.
6. **ASR pipeline** — audio → preprocess → MFCC → acoustic model → language model → text.
7. **NLP pipeline** — text → tokenize → preprocess → vectorize → model → output.
8. **ImageNet error progression** — table or falling-bars sketch with human 5% line.

### Last-hour priority order

1. Bayes theorem + disease example + MAP/ML (asked 4/5 years — near guaranteed).
2. SVM full 14-marker (absent 2 papers — DUE).
3. One applications essay each: CV, speech, NLP (Q7/Q8 staple, essay-style easy marks).
4. Tokenization short note + Naive Bayes tiny example.
5. ImageNet table (never asked — cheap insurance for Q8 short notes).
