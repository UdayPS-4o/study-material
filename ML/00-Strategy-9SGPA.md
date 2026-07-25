# 🎯 CS-601 Machine Learning — 9 SGPA Master Strategy (RGPV)

> Built from pattern analysis of **5 actual RGPV papers**: May-2022, May-2023, May-2024, Dec-2024, Jun-2025.
> Exam format: **70 marks · 8 questions · attempt any 5 · 14 marks each · 3 hours.**

---

## 1. The 9-SGPA Math (know your target number)

RGPV grading (typical CBCS/CBGS scale — verify against your scheme):

| Total Marks (out of 100) | Grade | Grade Point |
|---|---|---|
| 91–100 | A+ | 10 |
| 81–90 | A | **9** ← target |
| 71–80 | B+ | 8 |
| 61–70 | B | 7 |

Subject total = **End-sem (70) + Internals (30)** (mid-sems + assignments).
To land grade point 9+ in ML you need **81+ total**:

| Your internal marks (/30) | End-sem needed (/70) for 81 total | Verdict |
|---|---|---|
| 30 | 51 | comfortable |
| 27 | 54 | very doable |
| 24 | 57 | doable with this plan |
| 21 | 60 | need near-perfect 5 answers |
| 18 | 63 | push internals too, not just theory |

**Working target: 60+/70** = five 14-mark answers averaging 12/14 each. That means: 4 questions you can write *perfectly* and 1 you can write *well*. SGPA 9 overall = grade A in the heavy theory subjects + A+ in labs (labs are free marks — don't leak them).

---

## 2. Question-Number → Unit Map (all 5 papers, per half-question)

Each cell = the unit each 7-mark half came from (a/b):

| Q# | May-22 | May-23 | May-24 | Dec-24 | Jun-25 | **Pattern verdict** |
|---|---|---|---|---|---|---|
| Q1 | U1/U1 | U1/U1 | U1/U1 | U1/U1 | U1/U1 | **100% Unit 1 — guaranteed** |
| Q2 | U1/U2 | U3/U2 | U1/U2 | U1/U2 | U2/U2 | **Unit 2 core + U1 preprocessing** |
| Q3 | U2/U3 | U3/U4 | U2/U2 | U2/U2 | U3/U3 | **Unit 2 or Unit 3** |
| Q4 | U4/U1 | U2/U2 | U3/U3 | U3/U3 | U4/U4 | **Unit 3 or Unit 4** |
| Q5 | U1/U4 | U1/U2 | U3/U4 | U3/U4 | U5/U5 | mixed bridge (U3/U4/U5) |
| Q6 | U4/U5 | U1/U2 | U4/U4 | U4/U4 | U1/U2 | **Unit 4 dominant** |
| Q7 | U5/U5 | U5/U3 | U5/U5 | U5/U5 | U4/U3 | **Unit 5 dominant** |
| Q8 | 4 short notes | U5+U4 | any 2 of 4 | any 2 of 4 | 3 parts | **Short-notes bank, mixed units** |

**Reading:** the paper walks the syllabus in order — Q1 starts at Unit 1, Q7-Q8 end at Unit 5. If you know U1 + U2 + U4 + U5 cold and CNN core from U3, you can *attempt all 8 questions* and cherry-pick your best 5.

## 3. Marks Offered per Unit (all calculations)

Marks each unit was worth in each paper (out of ~112–126 offered; you attempt 70):

| Unit | May-22 | May-23 | May-24 | Dec-24 | Jun-25 | **Avg** | **Share** |
|---|---|---|---|---|---|---|---|
| U1 — Foundations | 38.5 | 28 | 28 | 28 | 28 | **30.1** | **25.6%** |
| U2 — Neural Networks | 17.5 | 35 | 28 | 28 | 24 | **26.5** | **22.5%** |
| U3 — CNN | 7 | 21 | 21 | 28 | 21 | **19.6** | **16.7%** |
| U4 — RNN & RL | 24.5 | 14 | 35 | 21 | 21 | **23.1** | **19.6%** |
| U5 — SVM/Bayes/Apps | 24.5 | 14 | 14 | 21 | 18 | **18.3** | **15.6%** |

**Conclusion:** U1+U2 alone ≈ 48% of offered marks and they're the easiest units. U4 is the most *repetitive* (same 5 questions recycle). This is where the 9-SGPA leverage is.

## 4. Topic Frequency Table (the hit-list)

🔥 = appeared, numbers = times asked across 5 papers. **Bold = asked in 2+ consecutive recent papers (hot streak).**

| Topic | Unit | Freq | Years | Status |
|---|---|---|---|---|
| Define ML / types / scope & limitations | U1 | 5/5 | all | 🔥 GUARANTEED in Q1 |
| Gradient descent (+ types/optimizers) | U2 | 4/5 | 22,23,24,25 | 🔥 GUARANTEED |
| Bayesian learning / Bayes theorem | U5 | 4/5 | 22×2,23,D24 | 🔥 GUARANTEED |
| Data preprocessing (normalize/encode/augment) | U1 | 4/5 | 23,24,D24,25 | 🔥 Very high |
| Backpropagation (algo/numerical/chain rule) | U2 | 3/5 | 22,23,D24 | 🔥 Very high |
| **Padding / pooling / CNN layer mechanics** | U3 | 3/5 | 24,D24,25 | 🔥 3-paper streak |
| **LSTM architecture & gates** | U4 | 3/5 | 23,D24,25 | 🔥 3-paper streak |
| MDP | U4 | 3/5 | 22,24,25 | 🔥 Very high |
| Q-learning | U4 | 3/5 | 22,24,25 | 🔥 Very high |
| RL framework / elements | U4 | 3/5 | 22,23,D24 | 🔥 Very high |
| Transfer learning + Inception | U3 | 3/5 | 23,24,D24 | 🔥 Very high |
| Dimension reduction / PCA / curse of dim | U3 | 3/5 | 22,24,25 | 🔥 Very high |
| NLP (short note) | U5 | 3/5 | 22,D24,25 | 🔥 Very high |
| Activation functions (sigmoid/ReLU) | U2 | 3/5 | 23,24,25 | 🔥 Very high |
| **Autoencoders** | U2 | 2/5 | D24,25 | 🔥 2-paper streak |
| **Batch normalization** | U2 | 2/5 | D24,25 | 🔥 2-paper streak |
| **TensorFlow/Keras CNN implementation** | U3 | 2/5 | D24,25 | 🔥 2-paper streak |
| **Speech processing applications** | U5 | 2/5 | 24,25 | 🔥 2-paper streak |
| Hyperparameter tuning | U2 | 2/5 | 23,D24 | High |
| SVM | U5 | 2/5 | 22,24 | ⚠️ ABSENT 2 papers → **DUE** |
| Computer vision applications | U5 | 2/5 | 23,D24 | High |
| RNN types/architecture | U4 | 2/5 | 23,24 | High |
| Convex optimization (short note) | U1 | 2/5 | 22,24 | Medium |
| Confusion matrix / evaluation metrics | U1 | 2/5 | 23,24 | Medium |
| L1/L2 regularization | U2 | 1/5 | 24 | Medium |
| Value / Policy iteration | U4 | 1/5 | D24 | Medium-rising |
| Actor-critic | U4 | 1/5 | 24 | Medium |
| BLEU score | U4 | 1/5 | 24 | Medium |
| Attention model | U4 | 1/5 | 22 | Medium |
| KNN (numerical) | U1 | 1/5 | 23 | Medium |
| Data visualization | U1 | 1/5 | 25 | Medium |
| Hypothesis function | U1 | 1/5 | D24 | Medium |

### ⚠️ Never-asked syllabus topics = the "due list" (RGPV loves to rotate these in)

| Topic | Unit | Why it's dangerous |
|---|---|---|
| **SARSA** | U4 | Named in syllabus, never asked in 5 papers — top candidate |
| **Dropout, Momentum, Weight initialization** | U2 | Classic short-note fodder, all unasked |
| **Beam search & width** | U4 | Paired with BLEU (asked once) — due |
| **One-shot learning, 1×1 convolution** | U3 | Named in syllabus, never asked |
| **ImageNet case study** | U5 | Explicitly in syllabus ("Case Study: ImageNet") — never asked! |
| Unstable gradient problem | U2 | Pairs with sigmoid/ReLU questions |
| Data distributions, hypothesis testing | U1 | Only fragments asked so far |

## 5. 🔮 Predicted Next Paper (pattern-projected)

| Q# | Most likely (confidence) | Backup possibility |
|---|---|---|
| Q1 | Define ML + types with examples; scope & limitations (VERY HIGH) | Role of probability/statistics; hypothesis function |
| Q2 | Data preprocessing/normalization + activation functions (HIGH) | Data augmentation; weight init & unstable gradients (due) |
| Q3 | Gradient descent types + L1/L2 or dropout (HIGH) | Backprop numerical (~40% — practice it) |
| Q4 | CNN architecture + padding/stride/pooling with size calculation (VERY HIGH) | Transfer learning types; one-shot learning (due) |
| Q5 | TF/Keras CNN steps or RNN vs LSTM vs GRU (HIGH) | Dimension reduction / PCA |
| Q6 | RL elements + MDP/Bellman; Value vs Policy iteration (HIGH) | **SARSA vs Q-learning (due!)**; actor-critic; BLEU/beam search |
| Q7 | **SVM full question (VERY HIGH — absent 2 straight papers)** + Bayesian learning | ML in CV/speech |
| Q8 | Short notes 2-4 of: NLP, batch norm, **dropout**, **momentum**, **ImageNet**, tokenization, convex optimization, MDP, attention | — |

**Sure-shot Top-15** (if you master only these, you can already attempt ~5 full questions):
1. Define ML + types + scope/limitations 2. Gradient descent + all types 3. Backpropagation + numerical 4. Activation functions (sigmoid, ReLU, tanh, softmax) 5. Data preprocessing + normalization + augmentation 6. CNN architecture + padding/stride/pooling + output-size formula 7. Transfer learning + Inception 8. LSTM (gates diagram) + GRU + RNN comparison 9. MDP + Bellman equations 10. Q-learning (+SARSA comparison) 11. RL framework/elements + value vs policy iteration 12. SVM (margin, support vectors, kernel trick) 13. Bayes theorem + Bayesian learning + naive Bayes 14. Autoencoders + batch normalization 15. Applications: NLP, CV, speech + ImageNet.

## 6. Priority Order of Study (ROI-ranked)

Rank = (marks share × repeat-rate × ease of scoring) — study in THIS order:

| Rank | Block | Why this order | Hours |
|---|---|---|---|
| 1 | **U1 Foundations** | Q1 guaranteed + 25.6% share + easiest content = fastest marks | 8 |
| 2 | **U2 Neural Networks** | 22.5% share, Q2+Q3 both draw from it, feeds U3/U4 concepts | 13 |
| 3 | **U4 (RL half)** | Most recycled questions in the paper (MDP/Q-learning/RL) | 8 |
| 4 | **U3 CNN** | 3-paper hot streak on padding/pooling/TF; diagram-heavy = easy 7s | 9 |
| 5 | **U4 (RNN half)** | LSTM 3-paper streak; GRU/beam search due | 5 |
| 6 | **U5 SVM + Bayes + Apps** | SVM due + Bayes guaranteed; applications are essay-style easy | 8 |
| 7 | **Numericals drill** | Backprop, KNN, Bayes net, CNN size calcs — separates 12/14 from 7/14 | 4 |
| 8 | **Short-notes bank + mock** | Q8 = 14 free marks if the bank is memorized | 6 |
| | **Total (ideal)** | compressed to ~40 h in the 4.5-day plan below | **~61 h** |

## 7. ⚔️ 4.5-Day War Plan (~9 h/day + exam-eve half day ≈ 40 h)

Exam in 4.5 days — no time for everything, so this plan buys the **most marks per hour**. Rule: read the unit note → memorize the 7-mark skeletons + diagrams → immediately write 1–2 answers from memory. Never passive-read twice.

| Day | Session | Hours | Topics | Output check |
|---|---|---|---|---|
| **1** | Morning | 4 | **ALL of Unit 1**: define ML vs traditional programming, types (sup/unsup/RL) table, scope & limitations, hypothesis function, preprocessing + normalization (formulas) + augmentation + encodings, confusion matrix + metrics, regression metrics | Q1 answer written from memory |
| 1 | Afternoon | 3 | **U2-A**: loss functions table, gradient descent + batch/SGD/mini-batch + optimizers (momentum, Adam) | GD-types table from memory |
| 1 | Evening | 2 | **U2-B**: activations (sigmoid/ReLU/tanh/softmax), linearity vs non-linearity, weights & bias | Sigmoid-vs-ReLU 7-marker |
| **2** | Morning | 4 | **U2-C**: backprop algorithm + chain rule + **solve May-23 numerical unaided**; weight init, unstable gradients | Full numerical, no peeking |
| 2 | Afternoon | 3 | **U2-D**: batch norm, dropout, L1/L2, autoencoders, hyperparameter tuning | Short notes ×5 |
| 2 | Evening | 2 | **U4-RL-A**: RL framework diagram + elements, MDP 5-tuple, Bellman equations | MDP 7-mark answer |
| **3** | Morning | 4 | **U4-RL-B**: value vs policy iteration, Q-learning update rule, **SARSA vs Q-learning table**, actor-critic; model-based vs model-free | Q-learning vs SARSA from memory |
| 3 | Afternoon | 3 | **U3-A**: CNN architecture diagram, convolution/padding/stride/pooling + **output-size formula, 3 drills** | Solve 3 size problems |
| 3 | Evening | 2 | **U3-B**: transfer learning (feature-extraction vs fine-tuning), Inception, 1×1 conv, PCA/dim reduction, TF/Keras 6 steps | CNN pipeline diagram from memory |
| **4** | Morning | 4 | **U4-RNN**: RNN types, **LSTM gates diagram**, GRU, BLEU + beam search, attention | LSTM cell from memory |
| 4 | Afternoon | 3 | **U5-A**: SVM full 14-marker (margin/support vectors/kernels), Bayes theorem + worked example, Bayesian learning, naive Bayes | SVM + Bayes answers written |
| 4 | Evening | 2 | **U5-B**: applications essays — CV, speech, NLP + tokenization, ImageNet table; KNN + Bayes-net numericals once each | 3 application outlines |
| **Exam eve / morning** | Final half-day | 4 | **Short-notes bank (16 topics)** → all 6 Quick Revision Boxes → redo backprop numerical once → outline answers for the Jun-25 paper (no writing, just bullet outlines) → sure-shot Top-15 sweep | Can outline 5 full questions |

**What's deliberately cut** (low marks-per-hour): timed full mock (replaced by outline drill), deep dives on data visualization / convex optimization / locally weighted regression (Q8-bank half-pagers are enough), one-shot learning detail, translation/seq2seq depth.

**If you fall behind, drop in this order:** Inception details → beam/attention detail → U1 tail (visualization, convex opt) → actor-critic.
**NEVER drop:** GD + backprop numerical, MDP + Q-learning + LSTM, SVM + Bayes, Q1 definitions, short-notes bank, output-size formula.

**Last 24 h?** Only: Sure-shot Top-15 list + short-notes bank + quick-revision boxes at the end of every unit note.

## 8. Exam-Hall Execution (180 minutes)

| Time | Action |
|---|---|
| 0–10 min | Read whole paper. Mark 5 mains + 1 backup. Order: easiest first (bank confidence early) |
| 10–42 min | Best question — aim for a perfect 14 |
| 42–74, 74–106, 106–138, 138–170 | Remaining 4 × 32 min. **Hard stop at 32 min — a 5th question at 0 marks costs more than a missing conclusion** |
| 170–180 min | Re-read: underline keywords, label diagrams, number the pages |

**Per 7-mark part ≈ 15 min ≈ 2.5–3 pages:** Definition (1 m) → 4–6 headed points (3–4 m) → **diagram** (2 m) → example/application (1 m). RGPV checkers scan for headings, diagrams, keywords — never write a wall of paragraph text. Attempt exactly 5. If a sub-part is unknown, still write the nearest related concept + diagram — partial marks are real.

## 9. Files in this Pack

| File | What's inside |
|---|---|
| [notes/Unit-1-Foundations.md](notes/Unit-1-Foundations.md) | Intro, stats/linear algebra, preprocessing, metrics |
| [notes/Unit-2-Neural-Networks.md](notes/Unit-2-Neural-Networks.md) | GD, backprop, activations, regularization, autoencoders |
| [notes/Unit-3-CNN.md](notes/Unit-3-CNN.md) | CNN layers, padding/stride math, inception, transfer learning |
| [notes/Unit-4-RNN-and-RL.md](notes/Unit-4-RNN-and-RL.md) | RNN/LSTM/GRU, BLEU, MDP, Q-learning, SARSA |
| [notes/Unit-5-SVM-Bayesian-Applications.md](notes/Unit-5-SVM-Bayesian-Applications.md) | SVM, Bayes, CV/speech/NLP, ImageNet |
| [notes/Numericals-and-Short-Notes.md](notes/Numericals-and-Short-Notes.md) | Every PYQ numerical fully solved + Q8 short-notes bank |
| [html/index.html](html/index.html) | This strategy as an interactive dashboard (open in browser) |
