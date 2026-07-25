# Unit 4 — RNN, LSTM & Reinforcement Learning (CS-601)

> **Exam weight: ~19.6% of offered marks.** Most RECYCLED unit: LSTM on a 3-paper streak; MDP, Q-learning, RL-framework each asked 3/5 years. SARSA + beam search never asked = top DUE candidates.

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|---|---|---|
| May-2022 | What is Reinforcement Learning + detailed concepts | 7 |
| May-2022 | Concept of MDP | 7 |
| May-2022 | Q-learning algorithm with deterministic rewards/actions | 7 |
| May-2022 | Attention model (short note) | 3.5 |
| May-2023 | Feed-forward vs recurrent network — structural/operational differences | 7 |
| May-2023 | LSTM vs GRU vs vanilla RNN | 7 |
| May-2023 | Reinforcement learning short note with example | 7 |
| May-2024 | Define RNN + types and architecture | 7 |
| May-2024 | n-gram precision and brevity penalty in BLEU score | 7 |
| May-2024 | Actor and critic network roles + interaction | 7 |
| May-2024 | Q-learning (short note) | 7 |
| May-2024 | MDP (short note) | 7 |
| Dec-2024 | LSTM unit architecture — gates controlling information flow | 7 |
| Dec-2024 | Define RL + elements in detail | 7 |
| Dec-2024 | Value Iteration vs Policy Iteration | 7 |
| Jun-2025 | Structure of LSTM | 6 |
| Jun-2025 | Model-based vs model-free learning, Q-Learning | 8 |
| Jun-2025 | Working principle of MDP in detail | 7 |

**Read of the pattern:** This unit is two halves — (A) sequence models (RNN → LSTM → GRU → translation → BLEU → attention) and (B) reinforcement learning (framework → MDP → Bellman → VI/PI → Q-learning → SARSA → actor-critic). Every paper picks one from each half. Master LSTM + MDP + Q-learning first, then the DUE topics (SARSA, beam search, Bellman) — they are overdue.

---

## 1. Recurrent Neural Network (RNN) [🔥 PYQ May-23, May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: define RNN as a neural network with feedback loops for sequential data.
> 2. Headings: **Why RNN (limitation of feed-forward)** → **Architecture & equations** → **Unrolling in time** → **Training (BPTT)** → **Types of RNN** → **Limitations**.
> 3. Draw: the unrolled RNN diagram (x → h → y at each time step, with h passed forward).
> 4. Close with example: predicting the next word in "I grew up in France… I speak fluent ___".

**Definition:** A Recurrent Neural Network is a neural network designed for **sequential data**, in which the output at time `t` depends not only on the current input `x_t` but also on a **hidden state** `h_(t-1)` carried over from previous time steps. The same weights are **shared across all time steps**, giving the network a form of memory.

### 1.1 Why not a feed-forward network?

- Feed-forward networks need **fixed-size input/output**; sequences (sentences, speech, stock prices) have variable length.
- They have **no memory** — each input is processed independently, so order of data is lost.
- No **parameter sharing** across positions: the word "France" at position 3 and position 7 would be learned separately.
- RNN fixes all three: variable length, memory via hidden state, shared weights `W` at every step.

### 1.2 Architecture and equations

Core recurrence (memorise both lines):

- Hidden state: `h_t = tanh(W_hh * h_(t-1) + W_xh * x_t + b_h)`
- Output: `y_t = softmax(W_hy * h_t + b_y)`

Term by term: `W_xh` maps input → hidden, `W_hh` maps previous hidden → current hidden (the "recurrent" part), `W_hy` maps hidden → output. The **same three weight matrices are reused at every time step**.

### 1.3 Unrolled RNN diagram (draw this)

```
        y_1         y_2         y_3
         ^           ^           ^
         |W_hy       |W_hy       |W_hy
 h_0 --> [h_1] ----> [h_2] ----> [h_3] ----> ...
         ^    W_hh   ^    W_hh   ^
         |W_xh       |W_xh       |W_xh
        x_1         x_2         x_3

 (Same weights W_xh, W_hh, W_hy at every step — "unrolled in time")
```

Folded view (also acceptable): a single block `[h]` with a loop arrow from `h` back to itself labelled `W_hh`.

### 1.4 Training — Backpropagation Through Time (BPTT)

- Unroll the network for `T` time steps → it becomes a deep feed-forward network with shared weights.
- Total loss = sum of losses at each time step: `L = Σ_t L_t`.
- Apply ordinary backpropagation on the unrolled graph; gradients for shared weights are **summed over all time steps**.
- **Truncated BPTT:** in practice backpropagate only `k` steps back to save computation.
- Problem: repeated multiplication by `W_hh` makes gradients **vanish** (shrink to 0) or **explode** (blow up) over long sequences → RNN cannot learn **long-term dependencies**. (This motivates LSTM/GRU — say this line in the exam, it links your answer.)

### 1.5 Types of RNN (with applications) — asked May-24

```
one-to-one      one-to-many        many-to-one        many-to-many       many-to-many
                                                      (equal length)     (encoder-decoder)
   y             y1 y2 y3              y               y1 y2 y3               y1 y2
   |              |  |  |              |                |  |  |                |  |
  [h]           [h]-[h]-[h]        [h]-[h]-[h]      [h]-[h]-[h]        [h]-[h]-[h]-[h]
   |              |                 |   |  |          |  |  |            |  |
   x              x                x1  x2 x3         x1 x2 x3           x1 x2
```

| Type | Input → Output | Application (write one each) |
|---|---|---|
| One-to-one | 1 → 1 | Plain classification (image → label) |
| One-to-many | 1 → sequence | Image captioning, music generation |
| Many-to-one | sequence → 1 | Sentiment analysis, spam detection |
| Many-to-many (synced) | seq → seq (same length) | POS tagging, video frame labelling |
| Many-to-many (encoder-decoder) | seq → seq (different length) | Machine translation, chatbots |

### 1.6 Feed-forward vs Recurrent network — asked May-23

| Aspect | Feed-forward NN | Recurrent NN |
|---|---|---|
| Signal flow | One direction only, input → output | Has feedback loops (cycles) |
| Memory | None — each input independent | Hidden state stores past information |
| Input size | Fixed | Variable-length sequences |
| Weight sharing over time | No | Yes — same `W` at every time step |
| Training | Standard backpropagation | Backpropagation Through Time (BPTT) |
| Typical data | Tabular, images | Text, speech, time series |
| Problem faced | Overfitting etc. | Vanishing/exploding gradients |

**Example:** Next-word prediction — "I grew up in France… I speak fluent ___". The answer "French" depends on a word seen many steps earlier; only a network with memory can use it.

**Mnemonic (types):** **"1-1, 1-M, M-1, M-M"** — *"One image, Many captions; Many words, One sentiment; Many-to-Many translates."*

⚠️ **Common mistake:** Drawing different weights at each unrolled step — the whole point of an RNN is that `W_xh, W_hh, W_hy` are the **same** at every time step; label them identically in the diagram.

---

## 2. Long Short-Term Memory (LSTM) [🔥 PYQ May-23, Dec-24, Jun-25 — MUST DO · 3-paper streak]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: LSTM is an improved RNN that solves the vanishing-gradient problem using a cell state and three gates.
> 2. Headings: **Need for LSTM** → **Cell state (conveyor belt)** → **Forget gate** → **Input gate** → **Output gate** → **All 6 equations**.
> 3. Draw: the LSTM cell diagram with C_(t-1)→C_t line on top and the three σ gates below.
> 4. Close with example: remembering the subject "France" across a long sentence to predict "French"; one line — "gates are sigmoid layers outputting 0–1, acting like taps on information flow."

**Definition:** Long Short-Term Memory is a special RNN architecture (Hochreiter & Schmidhuber, 1997) that can learn **long-term dependencies**. It maintains a separate **cell state** `C_t` (long-term memory) and controls what is stored, erased and read from it using three **gates** — forget, input and output — each a sigmoid layer producing values between 0 and 1.

### 2.1 Why LSTM? (write 2 lines)

- Vanilla RNN gradients vanish/explode over long sequences → forgets far-away context.
- LSTM's cell state gives an **almost unobstructed gradient highway** (only element-wise operations on it), so information can survive hundreds of time steps.

### 2.2 LSTM cell diagram (draw this — asked Dec-24, Jun-25)

```
 C_(t-1) ----------(x)---------------(+)----------------------> C_t
                    ^                 ^                    |
                    |                 |                    |
                  [f_t]        [i_t](x)[C~_t]            (tanh)
                 forget         input   candidate          |
                  gate           gate    values     [o_t]-(x)
                    ^             ^        ^     output    |
                    |             |        |      gate     v
 h_(t-1) ---+----[σ]-----------[σ]-----[tanh]----[σ]      h_t ----> h_t
            |       ^             ^        ^       ^       (also goes
 x_t -------+-------+-------------+--------+-------+        to output y_t)

 (x) = element-wise multiply    (+) = element-wise add    σ = sigmoid (0 to 1)
```

Top line = cell state `C` ("conveyor belt of memory"); the three σ boxes are the gates that tap into it.

### 2.3 The three gates (name → job → equation)

| Gate | Question it answers | Equation |
|---|---|---|
| **Forget gate** `f_t` | What to ERASE from old memory? | `f_t = σ(W_f · [h_(t-1), x_t] + b_f)` |
| **Input gate** `i_t` | What NEW info to STORE? | `i_t = σ(W_i · [h_(t-1), x_t] + b_i)` |
| **Output gate** `o_t` | What to REVEAL as output? | `o_t = σ(W_o · [h_(t-1), x_t] + b_o)` |

Supporting equations (memorise all six as a block):

1. `f_t = σ(W_f · [h_(t-1), x_t] + b_f)`  — forget gate
2. `i_t = σ(W_i · [h_(t-1), x_t] + b_i)`  — input gate
3. `C~_t = tanh(W_C · [h_(t-1), x_t] + b_C)`  — candidate new memory
4. `C_t = f_t * C_(t-1) + i_t * C~_t`  — **cell-state update (the heart of LSTM)**
5. `o_t = σ(W_o · [h_(t-1), x_t] + b_o)`  — output gate
6. `h_t = o_t * tanh(C_t)`  — hidden state / output

Explain equation 4 in words for full marks: *"keep `f_t` fraction of old memory, add `i_t` fraction of the newly proposed memory."* If `f_t = 1, i_t = 0` the cell remembers perfectly; if `f_t = 0` it wipes the slate.

**Example:** Language model reading *"France is beautiful. … He speaks fluent ___"* — the forget gate keeps "France" in `C_t` across many words, and the output gate reveals it exactly when the blank must be predicted as "French". New subject appears ("Priya went to Japan") → forget gate erases France, input gate writes Japan.

**Mnemonic:** **F-I-O** — **F**orget the old, **I**nput the new, **O**utput what's due.

⚠️ **Common mistake:** Writing `C_t = f_t * C_(t-1) * i_t * C~_t` (multiplying everything). It is **`f_t*C_(t-1) + i_t*C~_t`** — a weighted SUM of old and new memory; the `+` is what stops gradients from vanishing.

---

## 3. Gated Recurrent Unit (GRU) [⚠️ Standalone never asked — DUE, likely next]

**Definition:** GRU (Cho et al., 2014) is a **simplified LSTM** that merges the cell state and hidden state into one, and uses only **two gates** — **update gate** `z_t` and **reset gate** `r_t` — achieving similar accuracy with fewer parameters and faster training.

### 3.1 The two gates

- **Update gate `z_t`** — decides how much of the past to carry forward vs replace with new content (does the job of LSTM's forget + input gates combined).
- **Reset gate `r_t`** — decides how much past information to ignore while computing the new candidate (setting `r_t ≈ 0` makes the unit "start fresh" like reading a new sentence).

### 3.2 GRU equations (memorise all four)

1. `z_t = σ(W_z · [h_(t-1), x_t])`  — update gate
2. `r_t = σ(W_r · [h_(t-1), x_t])`  — reset gate
3. `h~_t = tanh(W · [r_t * h_(t-1), x_t])`  — candidate hidden state (past is *reset-scaled*)
4. `h_t = (1 - z_t) * h_(t-1) + z_t * h~_t`  — final blend of old and new

Equation 4 in words: `z_t` is a **mixing knob** — `z_t = 0` copies the old state unchanged (long memory), `z_t = 1` fully replaces it with the new candidate.

### 3.3 GRU cell diagram (draw this)

```
 h_(t-1) ---+---------------(x)(1-z_t)--------(+)------> h_t
            |                                  ^
            |            r_t                   |(x) z_t
            +---[σ]--+   |                     |
            |  reset (x)-+--[tanh]----------> h~_t
            |            ^  candidate
 x_t -------+------------+
            |
            +---[σ]---> z_t (update gate)
```

**Example:** Sentiment analysis of a long review — GRU trains ~25–30% faster than LSTM on the same data with nearly the same accuracy, so it is preferred on small datasets / mobile deployment.

**Mnemonic:** GRU = **"Gates Reduced to Update-and-reset"** — 2 gates, 1 state, 0 separate cell line.

⚠️ **Common mistake:** Saying GRU has an output gate — it does **not**; the full hidden state `h_t` is exposed directly (no `o_t`, no separate `C_t`).

---

## 4. LSTM vs GRU vs Vanilla RNN [🔥 PYQ May-23 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: all three are recurrent architectures differing in how they preserve memory.
> 2. Write 2–3 defining lines on each (RNN: no gates; LSTM: 3 gates + cell state; GRU: 2 gates, merged state).
> 3. Then the comparison table below (the table alone fetches most marks).
> 4. Draw: tiny sketches of the three cells side by side (RNN = plain tanh box; LSTM = 3 σ; GRU = 2 σ).
> 5. Close with: "choose RNN for short sequences, GRU for speed/small data, LSTM for long complex dependencies."

| Feature | Vanilla RNN | LSTM | GRU |
|---|---|---|---|
| Gates | None | 3 (forget, input, output) | 2 (update, reset) |
| Separate cell state `C_t` | No | Yes | No (merged with `h_t`) |
| Parameters | Fewest | Most | ~25% fewer than LSTM |
| Long-term dependency handling | Poor (vanishing gradient) | Excellent | Very good |
| Training speed | Fastest per step but hard to train | Slowest | Faster than LSTM |
| Memory control | Overwrites `h_t` every step | Fine-grained (separate erase/write/read) | Coupled erase-write via `z_t` |
| When to use | Short sequences, toy tasks | Long sequences, large data (translation, speech) | Limited data/compute, real-time apps |
| Year introduced | 1980s | 1997 | 2014 |

⚠️ **Common mistake:** Claiming "GRU is always better because it's newer" — LSTM still wins on very long sequences and large datasets; write the *trade-off*, not a winner.

---

## 5. Translation — Sequence-to-Sequence (Encoder–Decoder) [⚠️ Never asked — DUE, likely next]

**Definition:** Machine translation is modelled as a **sequence-to-sequence (seq2seq)** problem using an **encoder–decoder** architecture: an encoder RNN/LSTM reads the source sentence and compresses it into a fixed-length **context vector**; a decoder RNN/LSTM generates the target sentence word-by-word conditioned on that vector.

### 5.1 Working (write as numbered steps)

1. **Encoder** consumes source words `x_1 … x_Tx` one per time step; its final hidden state `c = h_Tx` summarises the whole sentence (the *context vector* / "thought vector").
2. **Decoder** is initialised with `c` and a start token `<SOS>`.
3. At each step the decoder outputs a probability distribution over the target vocabulary: `P(y_t | y_1…y_(t-1), c)` and feeds its own previous output as next input.
4. Generation stops when `<EOS>` (end of sentence) is produced.
5. Goal: output the sentence maximising joint probability `P(y_1,…,y_Ty | x) = Π_t P(y_t | y_1…y_(t-1), c)` — found approximately by **beam search** (next topic).
6. **Training trick — teacher forcing:** during training the decoder is fed the *true* previous word, not its own prediction, for faster convergence.

### 5.2 Encoder–decoder diagram (draw this)

```
        ENCODER                          DECODER
  "Main ghar jaata hoon"          "I    go    home  <EOS>"
    x1    x2    x3   x4            y1    y2    y3    y4
    |     |     |    |             ^     ^     ^     ^
  [h1]->[h2]->[h3]->[h4] == c ==> [s1]->[s2]->[s3]->[s4]
                    context        ^     ^     ^
                    vector       <SOS>  y1    y2   (previous output fed back)
```

**Limitation (leads to attention):** one fixed-length vector `c` becomes a **bottleneck** for long sentences — the encoder must cram a 40-word sentence into the same small vector as a 4-word one, so translation quality drops with length.

**Example:** Google Translate's 2016 NMT system (GNMT) — stacked LSTM encoder-decoder with attention, replaced phrase-based statistical translation.

⚠️ **Common mistake:** Saying the decoder sees the source words directly — in the basic model it sees **only** the context vector; the source enters solely through `c`.

---

## 6. Beam Search and Beam Width [⚠️ Never asked — DUE, likely next]

**Definition:** Beam search is an approximate search algorithm used by the decoder to find the most probable output sentence. Instead of keeping only the single best word at each step (greedy) or all possibilities (exhaustive), it keeps the **top B partial sequences** at every step, where **B = beam width**.

### 6.1 Greedy search vs Beam search

| Aspect | Greedy search | Beam search |
|---|---|---|
| Kept per step | 1 best word | Top `B` partial sentences |
| Objective | Locally best word | Approx. globally best sentence `argmax P(y|x)` |
| Risk | Early wrong word can never be undone | Wrong word survives only if its continuations stay in top B |
| Cost | Cheapest | ~`B ×` greedy cost |
| Special cases | Beam search with `B = 1` **is** greedy | `B = |V|^T` would be exhaustive (impossible) |

### 6.2 Worked example (write this in exam)

Translate with vocabulary and **B = 2**. Step-1 word probabilities: `the = 0.5`, `a = 0.3`, `an = 0.2`.

- **Greedy:** picks `the` only, forever committed.
- **Beam (B=2):** keeps both `the (0.5)` and `a (0.3)`.

Step 2 — expand both, multiply joint probabilities:

```
"the" (0.5) --- cat 0.4  --> "the cat" = 0.5 x 0.4 = 0.20   KEEP
            \-- dog 0.3  --> "the dog" = 0.5 x 0.3 = 0.15   drop
"a"   (0.3) --- cat 0.7  --> "a cat"   = 0.3 x 0.7 = 0.21   KEEP  <- beats "the cat"!
            \-- man 0.2  --> "a man"   = 0.3 x 0.2 = 0.06   drop
```

Keep the global top-2 (`a cat = 0.21`, `the cat = 0.20`) and repeat until `<EOS>`. Note greedy would never have found "a cat" because it discarded `a` at step 1 — that one line shows the whole point.

### 6.3 Effect of beam width B

- **Large B:** better sentences (closer to true argmax), more memory + computation, diminishing returns after B ≈ 10 (production systems: B = 4–10; research: up to 100).
- **Small B:** faster, worse results; B = 1 = greedy.
- **Length normalisation:** raw products of probabilities unfairly favour short sentences; divide log-probability by `T_y^α` (α ≈ 0.7): maximise `(1/T_y^α) Σ_t log P(y_t | x, y_1…y_(t-1))`.

**Mnemonic:** *"Beam = torch beam — wider beam, more paths lit, more battery used."*

⚠️ **Common mistake:** Calling beam search a training algorithm — it is used only at **inference/decoding time**; training uses cross-entropy loss with teacher forcing.

---

## 7. BLEU Score [🔥 PYQ May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: BLEU (Bilingual Evaluation Understudy) is an automatic metric that scores machine translation by n-gram overlap with human references (0 to 1).
> 2. Headings: **Modified (clipped) n-gram precision** → **Why clipping** → **Brevity penalty** → **Combined formula** → **Worked example** → **Limitations**.
> 3. No diagram needed — the worked example table is your "diagram".
> 4. Close with: limitation line — "high BLEU ≠ fluent/meaningful; ignores synonyms and word order beyond n-grams."

**Definition:** BLEU compares a machine-translated **candidate** sentence to one or more human **reference** translations by measuring overlapping n-grams. Score ranges 0–1 (often quoted ×100); closer to 1 = closer to human translation.

### 7.1 Modified (clipped) n-gram precision `p_n`

`p_n = (Σ clipped count of matching n-grams) / (total n-grams in candidate)`

- **Clipping rule:** a candidate n-gram is counted only up to the **maximum number of times it appears in any reference**. Stops cheating: candidate *"the the the the"* would otherwise score unigram precision 1.0.

### 7.2 Brevity Penalty (BP)

Precision alone rewards ultra-short outputs (translate 20 words as just "the" → precision 1!). BP punishes short candidates:

- `BP = 1` if `c > r` (candidate longer than reference)
- `BP = exp(1 - r/c)` if `c ≤ r`

where `c` = candidate length, `r` = reference length. No penalty for long candidates (clipped precision already handles them).

### 7.3 Full BLEU formula

`BLEU = BP × exp( Σ_(n=1)^N w_n × log p_n )`

— geometric mean of `p_1 … p_N` (usually `N = 4`, weights `w_n = 1/4` each), multiplied by BP.

### 7.4 Worked example (memorise this one)

Candidate: `the cat is on the mat` (6 words) · Reference: `the cat sat on the mat` (6 words)

| n-gram | Candidate items | Clipped matches | `p_n` |
|---|---|---|---|
| Unigram | the, cat, is, on, the, mat | the(2)+cat(1)+on(1)+mat(1)=5 ("is" fails) | `p_1 = 5/6` |
| Bigram | the-cat, cat-is, is-on, on-the, the-mat | the-cat, on-the, the-mat = 3 | `p_2 = 3/5` |

`c = r = 6` → `BP = 1`.

`BLEU(N=2) = 1 × exp(0.5·ln(5/6) + 0.5·ln(3/5)) = exp(0.5(-0.1823) + 0.5(-0.5108)) = exp(-0.3466) ≈ 0.7071`

### 7.5 Limitations (2 lines for full marks)

- Ignores synonyms and grammar — "couch"/"sofa" counted as a miss; a fluent paraphrase can score low.
- Works only at corpus level reliably; single-sentence BLEU is noisy.

⚠️ **Common mistake:** Forgetting the **clipping** in `p_n` or writing BP as a penalty for *long* candidates — BP punishes **short** candidates only.

---

## 8. Attention Model [🔥 PYQ May-22 — MUST DO (short note favourite)]

> **✍️ 7-mark answer skeleton (scale down for 3.5 marks):**
> 1. Opening line: attention lets the decoder look back at ALL encoder hidden states and focus on the most relevant source words at each output step, removing the fixed-vector bottleneck.
> 2. Headings: **Problem with plain seq2seq** → **Idea (dynamic context vector)** → **Steps: scores → softmax weights → weighted sum** → **Benefits**.
> 3. Draw: decoder step with weighted arrows back to encoder states (diagram below).
> 4. Close with example: translating a 40-word sentence, or the word alignment "ghar ↔ home".

**Definition:** The attention mechanism (Bahdanau et al., 2014) computes, at **every decoder time step `t`**, a **different context vector** `c_t` as a weighted sum of *all* encoder hidden states — the weights (attention weights) say *how much each source word matters for producing the current output word*.

### 8.1 Steps (write as 4 numbered points)

1. **Score:** for decoder state `s_(t-1)` and each encoder state `h_j`, compute alignment score `e_tj = score(s_(t-1), h_j)` (a small neural net or dot product) — "how relevant is source word j right now?"
2. **Normalise:** `α_tj = softmax(e_tj)` so weights are positive and `Σ_j α_tj = 1`.
3. **Context vector:** `c_t = Σ_j α_tj × h_j` — a fresh, focused summary for this step.
4. **Generate:** decoder uses `[s_(t-1), c_t]` to produce output word `y_t`. Repeat for every step.

### 8.2 Diagram (draw this)

```
 Encoder states:   h1      h2      h3      h4        ("Main ghar jaata hoon")
                    \       |       |      /
                 α=0.05  α=0.7   α=0.15  α=0.1        <- attention weights (softmax)
                      \    |      |    /
                       [ c_t = Σ α_j h_j ]            <- context vector for THIS step
                              |
                        [ decoder s_t ] --> y_t = "home"
```

(Weights concentrate on `h2` = "ghar" exactly when the decoder emits "home".)

### 8.3 Benefits (any 3)

- Removes the fixed-length **bottleneck** → long-sentence translation quality no longer degrades.
- Attention weights are **interpretable** — plotting `α_tj` gives a word-alignment heat map.
- Basis of the **Transformer** ("Attention is All You Need", 2017) → BERT/GPT.
- Gradient shortcut to distant inputs → easier training.

⚠️ **Common mistake:** Saying attention gives ONE context vector for the sentence — it computes a **new `c_t` at every decoder step**; that is the entire difference from plain seq2seq.

---

## 9. Reinforcement Learning & RL Framework [🔥 PYQ May-22, May-23, Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: RL is learning by trial-and-error interaction — an agent acts on an environment and learns from scalar reward signals, without labelled data.
> 2. Headings: **Agent–environment loop** → **Elements: policy, reward, value function, model** → **Exploration vs exploitation** → **Comparison with supervised/unsupervised** → **Applications**.
> 3. Draw: the agent–environment loop diagram.
> 4. Close with example: robot maze / chess (AlphaGo) — reward only at the end, agent learns which moves led to it.

**Definition:** Reinforcement Learning is a branch of ML in which an **agent** learns an optimal behaviour (**policy**) by interacting with an **environment**: at each step it observes a **state**, takes an **action**, and receives a scalar **reward**; the goal is to maximise the **expected cumulative reward** (return), not to match labelled answers.

### 9.1 The RL framework diagram (draw this — it is expected in every RL answer)

```
                 action  a_t
        +--------------------------->+
        |                            |
   [ AGENT ]                  [ ENVIRONMENT ]
        ^                            |
        |    state s_(t+1)           |
        +<---------------------------+
        |    reward r_(t+1)          |
        +<---------------------------+

  Loop: observe s_t -> choose a_t (policy) -> env returns r_(t+1), s_(t+1) -> repeat
```

### 9.2 Elements of RL (Dec-24: "elements in detail" — give each a heading)

1. **Agent** — the learner/decision maker (robot, game player).
2. **Environment** — everything outside the agent that it interacts with.
3. **State `s`** — current situation observed by the agent.
4. **Action `a`** — a choice available in the state.
5. **Policy `π(a|s)`** — the agent's strategy: mapping from states to actions. *This is what RL learns.*
6. **Reward `r`** — immediate scalar feedback; defines the goal.
7. **Value function `V(s)`** — expected long-term (discounted) reward from state `s`; "reward is immediate pleasure, value is long-term wisdom."
8. **Model (optional)** — the agent's internal simulation of environment dynamics `P(s'|s,a)`; present in model-based RL only.
9. **Return** `G_t = r_(t+1) + γ r_(t+2) + γ² r_(t+3) + …` with **discount factor** `γ ∈ [0,1]`.

### 9.3 Exploration vs Exploitation (always write this — easy 1 mark)

- **Exploitation:** choose the best-known action to earn reward now.
- **Exploration:** try new actions to find possibly better rewards.
- Balance via **ε-greedy**: with probability `ε` act randomly (explore), else act greedily (exploit); decay `ε` over time.

### 9.4 RL vs Supervised vs Unsupervised

| Aspect | Supervised | Unsupervised | Reinforcement |
|---|---|---|---|
| Data | Labelled pairs (x, y) | Unlabelled x | No dataset — experience from interaction |
| Feedback | Correct answer given | None | Delayed scalar reward |
| Goal | Predict labels | Find structure | Maximise cumulative reward |
| Example | Spam filter | Clustering customers | Chess agent, robot walking |

**Example (May-23 asks for one):** A robot in a maze — +100 reward for reaching cheese, −10 for touching walls, 0 otherwise. Early episodes: random wandering (exploration). Over time it learns the shortest wall-free path (exploitation of learned policy). Real systems: AlphaGo, self-driving lane control, recommendation engines, robotics.

**Mnemonic (elements):** **"SAP RVM"** — **S**tate, **A**ction, **P**olicy, **R**eward, **V**alue, **M**odel.

⚠️ **Common mistake:** Calling reward "the label" — RL feedback is *evaluative* (how good was that action), not *instructive* (what the right action was), and it may be **delayed** many steps.

---

## 10. Model-Based vs Model-Free Learning [🔥 PYQ Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: the split depends on whether the agent learns/uses the environment's transition model `P(s'|s,a)` and reward function.
> 2. Define each with one algorithm name (model-based: Value/Policy Iteration, Dyna-Q; model-free: Q-learning, SARSA).
> 3. Then the comparison table below.
> 4. Close with analogy: map-user vs habit-walker.

- **Model-based:** the agent **knows or learns a model** of the environment (transition probabilities + rewards) and **plans** by simulating outcomes before acting. E.g. Value Iteration, Policy Iteration (model given), Dyna-Q (model learnt).
- **Model-free:** the agent learns value functions or policies **directly from experienced transitions** `(s, a, r, s')`, never estimating `P(s'|s,a)`. E.g. Q-learning, SARSA, actor-critic.

| Aspect | Model-based | Model-free |
|---|---|---|
| Needs `P(s'|s,a)`, `R` | Yes (given or learnt) | No |
| How it decides | Planning / simulating ahead | Trial-and-error value estimates |
| Sample efficiency | High (reuses model to imagine data) | Low (needs many real interactions) |
| Computation per step | Heavy (planning) | Light (one update) |
| Risk | Wrong model → wrong plans (model bias) | Slow, high-variance learning |
| Examples | Value Iteration, Policy Iteration, Dyna-Q, AlphaZero (with MCTS) | Q-learning, SARSA, DQN, Actor-Critic |

**Analogy (write it):** Model-based = tourist with a **city map**, plans the route mentally before walking. Model-free = local resident with **habits** — knows "this turn works" from years of walking, holds no map.

⚠️ **Common mistake:** Saying model-free agents "have no policy" — they absolutely learn a policy; what they lack is a **transition model** of the environment.

---

## 11. Markov Decision Process (MDP) [🔥 PYQ May-22, May-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: MDP is the mathematical framework for RL — sequential decision making where outcomes are partly random, partly controlled, and the Markov property holds.
> 2. Headings: **Markov property** → **5-tuple (S, A, P, R, γ) each defined** → **Working principle (loop)** → **Goal: optimal policy π\*** → **Gridworld example with diagram**.
> 3. Draw: the 3×4 gridworld.
> 4. Close with: "solved by Value Iteration / Policy Iteration / Q-learning."

**Definition:** A Markov Decision Process is a mathematical framework for modelling **sequential decision-making** under uncertainty, defined by the 5-tuple **`(S, A, P, R, γ)`**, in which the **Markov property** holds: *the future depends only on the present state and action, not on the past history*: `P(s_(t+1) | s_t, a_t, s_(t-1), …) = P(s_(t+1) | s_t, a_t)`.

### 11.1 The 5-tuple (define each — this IS the answer's core)

| Symbol | Name | Meaning | Gridworld example |
|---|---|---|---|
| `S` | State space | All possible situations | The 11 cells of the grid |
| `A` | Action space | Choices per state | {Up, Down, Left, Right} |
| `P(s'|s,a)` | Transition probability | Chance of landing in `s'` after action `a` in `s` | 0.8 intended, 0.1 each side-slip |
| `R(s,a,s')` | Reward function | Immediate scalar payoff | +1 goal, −1 pit, −0.04 per step |
| `γ` | Discount factor `[0,1]` | Present value of future reward | γ = 0.9 |

Why `γ < 1`? — (i) keeps infinite-horizon return finite, (ii) models preference for sooner reward, (iii) γ→0 myopic agent, γ→1 far-sighted agent.

### 11.2 Working principle (Jun-25 "working principle in detail" — numbered loop)

1. Agent observes current state `s_t ∈ S`.
2. Chooses action `a_t` using policy `π(a|s)`.
3. Environment samples next state `s_(t+1) ~ P(·|s_t, a_t)` (stochastic transition).
4. Environment emits reward `r_(t+1) = R(s_t, a_t, s_(t+1))`.
5. Repeat; the return is `G_t = Σ_k γ^k r_(t+k+1)`.
6. **Objective:** find optimal policy `π*` maximising expected return from every state: `π* = argmax_π V^π(s) ∀s`. Solved via Bellman equations → Value/Policy Iteration (model known) or Q-learning/SARSA (model unknown).

### 11.3 Gridworld example (draw this — standard 3×4 world)

```
 +-----+-----+-----+-----+
 |     |     |     | +1  |   <- goal (terminal)
 +-----+-----+-----+-----+
 |     | ### |     | -1  |   <- pit  (terminal)
 +-----+-----+-----+-----+
 |  S  |     |     |     |   <- start;  ### = wall
 +-----+-----+-----+-----+
 Actions: U/D/L/R.  Moves: 0.8 as intended, 0.1 slips to each perpendicular side.
 Living reward -0.04 per step  ->  encourages the shortest safe path to +1.
```

Because moves are stochastic, the optimal policy near the pit prefers the **longer safe route** — a one-line insight worth a mark.

**Mnemonic:** **"SAPRG"** → *"Students Always Pass RGPV Gracefully"* = S, A, P, R, γ.

⚠️ **Common mistake:** Omitting `γ` and writing MDP as a 4-tuple, or stating the Markov property as "future is independent of present" — it is independent of the **past given the present**.

---

## 12. Bellman Equations [⚠️ Never asked directly — DUE, likely next]

**Definition:** Bellman equations express the value of a state **recursively**: the value of a state = immediate reward + discounted value of the successor states. Every RL algorithm (VI, PI, Q-learning, SARSA, actor-critic) is a scheme for solving or approximating these equations.

### 12.1 State-value function — Bellman expectation equation

`V^π(s) = Σ_a π(a|s) Σ_s' P(s'|s,a) [ R(s,a,s') + γ V^π(s') ]`

Term by term (write these bullets):

- `V^π(s)` — expected return starting at `s`, following policy π.
- `Σ_a π(a|s)` — average over the actions the policy might pick.
- `Σ_s' P(s'|s,a)` — average over where the environment might send us.
- `R(s,a,s')` — reward collected on that one step.
- `γ V^π(s')` — everything earned afterwards, discounted once because it is one step in the future.

### 12.2 Action-value function

`Q^π(s,a) = Σ_s' P(s'|s,a) [ R(s,a,s') + γ Σ_a' π(a'|s') Q^π(s',a') ]`

`Q^π(s,a)` = expected return if we take action `a` in `s` **first**, then follow π. Relation: `V^π(s) = Σ_a π(a|s) Q^π(s,a)`.

Term by term (write these bullets):

- No outer `Σ_a π(a|s)` — the first action `a` is **fixed** (we are asking about it), so the policy-average only starts from the *next* step.
- `Σ_s' P(s'|s,a)` — average over the next states the environment may produce.
- `R(s,a,s')` — reward collected on this one step.
- `γ Σ_a' π(a'|s') Q^π(s',a')` — from `s'` onwards we follow π again: average its next action `a'`, value it by `Q^π(s',a')`, discount once by γ.

### 12.3 Bellman OPTIMALITY equations (the ones algorithms solve)

- `V*(s) = max_a Σ_s' P(s'|s,a) [ R(s,a,s') + γ V*(s') ]`
- `Q*(s,a) = Σ_s' P(s'|s,a) [ R(s,a,s') + γ max_(a') Q*(s',a') ]`

Difference from expectation form: the policy-average `Σ_a π(a|s)` is replaced by **`max_a`** — the optimal agent always takes the best action. Optimal policy falls out directly: `π*(s) = argmax_a Q*(s,a)`.

**Example (1-line numeric):** deterministic chain `s → s' → goal`, reward 100 on entering goal, γ = 0.9: `V*(s') = 100`, `V*(s) = 0 + 0.9 × 100 = 90`. (Same numbers reappear in Q-learning below — learn once, use twice.)

**Mnemonic:** *"Value today = Reward now + γ × Value tomorrow."*

⚠️ **Common mistake:** Mixing the two forms — expectation equation has `Σ_a π(a|s)` (evaluates a given policy); optimality equation has `max_a` (defines the best policy). State which one you are writing.

---

## 13. Value Iteration and Policy Iteration [🔥 PYQ Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: both are dynamic-programming methods that solve a known MDP using Bellman equations to find π*.
> 2. Give Value Iteration algorithm (3 steps) → Policy Iteration algorithm (3 steps).
> 3. Then the comparison table (the marks magnet).
> 4. Close with: "PI converges in fewer iterations but each is costlier; VI does cheaper sweeps but more of them."

### 13.1 Value Iteration (VI)

1. Initialise `V(s) = 0` for all states.
2. Repeat until values stop changing (`Δ < θ`): for every state apply the **Bellman optimality backup**
   `V(s) ← max_a Σ_s' P(s'|s,a) [ R(s,a,s') + γ V(s') ]`
3. Extract the policy once at the end: `π*(s) = argmax_a Σ_s' P(s'|s,a) [ R + γ V(s') ]`.

Key idea: work only with values; no explicit policy until convergence.

### 13.2 Policy Iteration (PI)

1. Start with any random policy `π_0`.
2. **Policy evaluation:** solve `V^π(s) = Σ_s' P(s'|s,π(s)) [ R + γ V^π(s') ]` for the current fixed policy (iteratively or as linear equations).
3. **Policy improvement:** `π_new(s) = argmax_a Σ_s' P(s'|s,a) [ R + γ V^π(s') ]` — act greedily w.r.t. the just-computed values.
4. If `π_new = π_old` stop (optimal); else go to step 2.

```
  π_0 --evaluate--> V^π0 --improve--> π_1 --evaluate--> V^π1 --improve--> ... --> π*
  (E-I-E-I loop: "Old MacDonald finds the optimal policy")
```

### 13.3 Comparison table (Dec-24 asked exactly this)

| Aspect | Value Iteration | Policy Iteration |
|---|---|---|
| What it iterates on | Value function only | Explicit policy + its values |
| Update used | Bellman **optimality** backup (`max_a` inside loop) | Bellman **expectation** (evaluate), then greedy improve |
| Policy maintained during run? | No — extracted once at the end | Yes — improved every cycle |
| Cost per iteration | Cheap (one sweep with max) | Expensive (full policy evaluation) |
| Number of iterations | Many | Few (policies are finite → fast convergence) |
| Convergence | To V*, asymptotically | Exactly, in finite iterations |
| Prefer when | Large action space, quick approximate sweep | Small state space, want exact π* fast |
| Both need | Full model `P, R` known → **model-based / DP methods** | same |

**Example:** In the 3×4 gridworld, VI needs ~15–20 sweeps for γ=0.9; PI typically converges in 3–4 evaluate-improve cycles.

⚠️ **Common mistake:** Writing that VI "doesn't use a policy at all" — it *implicitly* improves the policy every sweep via `max_a`; it just never stores one until the end.

---

## 14. Q-Learning [🔥 PYQ May-22, May-24, Jun-25 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: Q-learning is a model-free, **off-policy** TD algorithm that learns the optimal action-value function Q*(s,a) directly from experience.
> 2. Headings: **Q-table idea** → **Update rule + every term explained** → **Algorithm steps** → **Deterministic worked example (grid, γ=0.9)** → **Properties (off-policy, convergence)**.
> 3. Draw: the 2×3 grid with Q-values 81/90/100.
> 4. Close with: "behaviour policy is ε-greedy but the update bootstraps on max → learns π* even while exploring."

**Definition:** Q-learning (Watkins, 1989) is a **model-free, off-policy** reinforcement-learning algorithm that learns the optimal action-value function `Q*(s,a)` by repeatedly updating a **Q-table** from experienced transitions `(s, a, r, s')` — no knowledge of `P` or `R` needed.

### 14.1 The update rule (write it big, then explain every symbol)

`Q(s,a) ← Q(s,a) + α [ r + γ · max_(a') Q(s',a') − Q(s,a) ]`

| Term | Meaning |
|---|---|
| `Q(s,a)` | Current estimate of value of doing `a` in `s` |
| `α` | Learning rate (0–1): how much of the new information overwrites the old |
| `r` | Immediate reward actually received |
| `γ` | Discount factor for future rewards |
| `max_(a') Q(s',a')` | Value of the **best** action from the next state — assumes optimal behaviour afterwards (this `max` is what makes it **off-policy**) |
| `r + γ max Q(s',a')` | **TD target** — improved estimate |
| `[target − Q(s,a)]` | **TD error** — surprise; positive → raise Q, negative → lower Q |

**Deterministic special case (May-22 asked exactly this):** with deterministic rewards/transitions set `α = 1`:

`Q(s,a) ← r + γ · max_(a') Q(s',a')`

### 14.2 Algorithm (numbered steps)

1. Initialise `Q(s,a) = 0` for all pairs; choose `α, γ, ε`.
2. For each episode: start at some state `s`.
3. Choose `a` by **ε-greedy** on Q (explore with prob ε, else `argmax_a Q(s,a)`).
4. Execute `a`; observe reward `r` and next state `s'`.
5. Update `Q(s,a)` with the rule above.
6. `s ← s'`; repeat 3–5 until terminal state; repeat episodes until Q converges.
7. Final policy: `π*(s) = argmax_a Q(s,a)`.

### 14.3 Deterministic worked example (γ = 0.9, reward 100 on entering goal G, else 0)

```
 +------+------+------+
 |  s1  |  s2  |  G   |        Q(s2, right) = 100 + 0.9 x 0     = 100
 +------+------+------+        Q(s1, right) = 0  + 0.9 x 100    = 90
 |  s4  |  s5  |  s6  |        Q(s4, up)    = 0  + 0.9 x 90     = 81
 +------+------+------+

 Values ripple back from the goal:  100 -> 90 -> 81 -> 72.9 ...
 V*(s) = max_a Q(s,a):  V*(s2)=100, V*(s1)=90, V*(s4)=81
```

Each number = `γ ×` (best neighbour's value); after enough episodes the whole table converges and the greedy path follows increasing Q-values to G.

### 14.4 Properties (2 marks worth)

- **Off-policy:** learns about the greedy (optimal) policy while *behaving* ε-greedily.
- **Converges** to Q* if every (s,a) is visited infinitely often and α decays suitably.
- Tabular version limited to small discrete spaces → **DQN** replaces the table with a deep network (Atari, 2015).

**Mnemonic:** update = **"QARGMAX"** — **Q** + **α**(**R** + **G**amma·**MAX** − Q).

⚠️ **Common mistake:** Using `Q(s',a')` of the action actually taken next instead of `max_(a') Q(s',a')` — that would be SARSA, not Q-learning; the `max` is the identity of Q-learning.

---

## 15. SARSA [⚠️ Never asked — TOP DUE, likely next]

**Definition:** SARSA (State–Action–Reward–State–Action) is a **model-free, on-policy** TD control algorithm. It updates `Q(s,a)` using the action `a'` **actually chosen** by the current (ε-greedy) policy in the next state — so it learns the value of *the policy it is really following*, exploration included.

### 15.1 Update rule

`Q(s,a) ← Q(s,a) + α [ r + γ · Q(s',a') − Q(s,a) ]`

Only difference from Q-learning: `Q(s',a')` (the action it will really take) replaces `max_(a') Q(s',a')`. The name is the quintuple used per update: **(s, a, r, s', a')**.

### 15.2 Algorithm

1. Initialise Q-table; choose `α, γ, ε`.
2. Start episode at `s`; choose `a` ε-greedily from Q. ← action chosen **before** the loop
3. Take `a`; observe `r, s'`.
4. Choose next action `a'` ε-greedily from `Q(s', ·)`. ← chosen **before** updating
5. Update: `Q(s,a) ← Q(s,a) + α[ r + γ Q(s',a') − Q(s,a) ]`.
6. `s ← s'`, `a ← a'`; repeat 3–5 until terminal.

### 15.3 SARSA vs Q-learning (the predicted question — learn this table cold)

| Aspect | SARSA | Q-learning |
|---|---|---|
| Policy type | **On-policy** — evaluates the policy it follows | **Off-policy** — evaluates greedy policy while following ε-greedy |
| Next-state term in target | `Q(s',a')` — action actually taken | `max_(a') Q(s',a')` — best possible action |
| Update tuple | (s, a, r, s', a') | (s, a, r, s') |
| Accounts for exploration risk | Yes → learns **safer** paths | No → learns **optimal** but riskier paths |
| Cliff-walking result | Takes longer path away from cliff | Hugs the cliff edge (optimal but falls during ε-exploration) |
| Convergence target | Q of the ε-greedy policy (→ Q* if ε decays to 0) | Q* directly |
| Online performance while learning | Better (fewer disasters) | Worse (more exploratory falls) |
| Use when | Real robots/safety-critical (mistakes costly) | Simulators (mistakes free), want true optimum |

**Example — Cliff Walking (write this, it's the classic):** Grid path from Start to Goal along a cliff edge; falling = −100. **Q-learning** learns the shortest path *along* the cliff (optimal if you never slip, but ε-greedy exploration keeps making it fall). **SARSA** knows its own ε-greedy self might slip, so it learns a path one row *away* from the cliff — slightly longer, far safer, higher actual reward during training.

**Mnemonic:** the name spells the update: **S-A-R-S-A** = the exact five quantities you plug in. *"SARSA is Sincere (follows its own policy); Q is Qunning/cunning (follows one, learns another)."*

⚠️ **Common mistake:** Writing a `max` inside the SARSA target — the moment you write `max`, it becomes Q-learning. SARSA commits to `a'` first, then updates.

---

## 16. Actor-Critic Model [🔥 PYQ May-24 — MUST DO]

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: actor-critic combines policy-based and value-based RL — an actor network selects actions, a critic network evaluates them via TD error.
> 2. Headings: **Actor: role** → **Critic: role** → **Interaction loop (TD error as the messenger)** → **Update equations** → **Advantages**.
> 3. Draw: the actor-critic block diagram with TD-error arrows to both networks.
> 4. Close with: analogy — actor = student performing, critic = teacher scoring; both improve together. Mention A2C/A3C as modern versions.

**Definition:** The actor-critic architecture uses two learners: the **actor** — a parameterised policy `π_θ(a|s)` that decides actions — and the **critic** — a value-function approximator `V_w(s)` that judges those actions. The critic's **TD error** is the single signal that trains both.

### 16.1 Roles (May-24 asked "roles + interaction" — make each a heading)

- **Actor (policy network, parameters θ):** outputs action probabilities `π_θ(a|s)`; responsible for *acting*. Updated in the direction the critic approves.
- **Critic (value network, parameters w):** estimates `V_w(s)`; responsible for *evaluating* — "was that action better or worse than expected from this state?"

### 16.2 Interaction — TD error updates BOTH (the core of the answer)

TD error after each step: `δ = r + γ V_w(s') − V_w(s)`

- `δ > 0` → outcome better than expected → **actor**: raise probability of that action; **critic**: raise `V(s)`.
- `δ < 0` → worse than expected → lower both.

Update equations (plain notation):

- **Critic:** `w ← w + α_c · δ · ∇_w V_w(s)` (reduce prediction error)
- **Actor:** `θ ← θ + α_a · δ · ∇_θ log π_θ(a|s)` (policy gradient scaled by the critic's verdict)

### 16.3 Architecture diagram (draw this)

```
                        state s
              +------------+------------+
              |                         |
              v                         v
         [ ACTOR π_θ ]            [ CRITIC V_w ]
              |                         |
       action a to env            value V(s)
              |                         |
   env gives r, s'  --------->  δ = r + γV(s') - V(s)   (TD error)
              ^                         |
              |            +------------+------------+
              |            |                         |
              |     update actor θ            update critic w
              +-----(δ scales policy grad)   (δ reduces value error)
```

### 16.4 Why combine the two? (advantages — any 3)

- Pure policy-gradient (REINFORCE) waits till episode end and has **high variance** → critic's step-by-step TD feedback lowers variance and enables **online** updates.
- Pure value methods (Q-learning) struggle with **continuous action spaces** → actor outputs actions directly.
- Faster, more stable convergence; basis of modern algorithms **A2C, A3C, DDPG, PPO**.

**Example / analogy:** A dance student (**actor**) performs a move; the coach (**critic**) scores it against expectation. A pleasant surprise (δ > 0) → student repeats the move more often, coach also recalibrates expectations. Both networks improve simultaneously.

⚠️ **Common mistake:** Saying the critic tells the actor *which action to take* — it never does; it only says **how much better/worse than expected** the outcome was (scalar δ), and the actor adjusts its own probabilities.

---

## ⚡ Quick Revision Box

### One-liners

| Topic | One line to remember |
|---|---|
| RNN | Hidden state carries memory; same weights every step; trained by BPTT; dies of vanishing gradient |
| RNN types | 1-1, 1-M (captioning), M-1 (sentiment), M-M synced (POS), M-M enc-dec (translation) |
| LSTM | Cell state conveyor + 3 gates (Forget-Input-Output); `C_t = f*C_(t-1) + i*C~` beats vanishing gradient |
| GRU | LSTM lite: 2 gates (update z, reset r), no separate cell state, fewer params, faster |
| Seq2seq | Encoder squeezes source into context vector c; decoder unrolls it into target; bottleneck for long sentences |
| Beam search | Keep top-B partial sentences each step; B=1 → greedy; length-normalise scores |
| BLEU | Clipped n-gram precision × brevity penalty; punishes SHORT candidates only |
| Attention | New context vector every decoder step = softmax-weighted sum of ALL encoder states |
| RL | Agent–environment loop maximising cumulative discounted reward; evaluative, delayed feedback |
| RL elements | Policy, Reward, Value function, Model (+ agent, env, state, action) |
| Model-based vs free | Map-planner (VI/PI, Dyna-Q) vs habit-walker (Q-learning, SARSA) |
| MDP | (S, A, P, R, γ) + Markov property: future ⟂ past given present |
| Bellman | Value today = reward now + γ·value tomorrow; expectation form has Σπ, optimality form has max |
| Value Iteration | Bellman optimality sweeps on V; policy extracted at the end; many cheap iterations |
| Policy Iteration | Evaluate → improve → repeat; few expensive iterations; exact finite convergence |
| Q-learning | Off-policy TD; target uses `max Q(s',a')`; deterministic form `Q = r + γ maxQ'` |
| SARSA | On-policy TD; target uses actual `Q(s',a')`; safer paths (cliff example) |
| Actor-critic | Actor acts (π_θ), critic judges (V_w); ONE TD error δ trains both |

### Every formula (write each once daily)

```
RNN:      h_t = tanh(W_hh h_(t-1) + W_xh x_t + b_h) ;  y_t = softmax(W_hy h_t + b_y)
LSTM:     f_t = σ(W_f·[h_(t-1),x_t]+b_f)   i_t = σ(W_i·[...]+b_i)   o_t = σ(W_o·[...]+b_o)
          C~_t = tanh(W_C·[...]+b_C)       C_t = f_t*C_(t-1) + i_t*C~_t     h_t = o_t*tanh(C_t)
GRU:      z_t = σ(W_z·[h_(t-1),x_t])       r_t = σ(W_r·[h_(t-1),x_t])
          h~_t = tanh(W·[r_t*h_(t-1), x_t])          h_t = (1-z_t)*h_(t-1) + z_t*h~_t
BLEU:     p_n = clipped n-gram matches / total candidate n-grams
          BP = 1 if c>r else exp(1 - r/c)            BLEU = BP·exp(Σ w_n log p_n)
Beam:     score = (1/T_y^α) Σ log P(y_t | x, y_<t)   (length-normalised, α≈0.7)
Attention: e_tj = score(s_(t-1),h_j);  α_tj = softmax(e_tj);  c_t = Σ_j α_tj h_j
Return:   G_t = r_(t+1) + γ r_(t+2) + γ² r_(t+3) + ...
Bellman exp:  V^π(s) = Σ_a π(a|s) Σ_s' P(s'|s,a)[R + γV^π(s')]
Bellman opt:  V*(s) = max_a Σ_s' P(s'|s,a)[R + γV*(s')]
              Q*(s,a) = Σ_s' P(s'|s,a)[R + γ max_a' Q*(s',a')]
VI backup:    V(s) ← max_a Σ_s' P[R + γV(s')]
Q-learning:   Q(s,a) ← Q(s,a) + α[r + γ max_a' Q(s',a') − Q(s,a)]   (det: Q ← r + γ maxQ')
SARSA:        Q(s,a) ← Q(s,a) + α[r + γ Q(s',a') − Q(s,a)]
TD error:     δ = r + γV(s') − V(s)
Actor:        θ ← θ + α_a δ ∇_θ log π_θ(a|s)        Critic: w ← w + α_c δ ∇_w V_w(s)
```

### Diagrams to practice (draw each on rough paper twice)

1. Unrolled RNN (3 time steps, shared weights labelled)
2. Five RNN types row (1-1 … M-M)
3. **LSTM cell** — C-line on top, three σ gates (3-paper streak — non-negotiable)
4. GRU cell (z and r gates)
5. Encoder–decoder with context vector
6. Beam search tree (B=2 numeric example)
7. Attention weighted-sum diagram
8. **RL agent–environment loop** (goes in every RL answer)
9. 3×4 gridworld MDP (+1, −1, wall)
10. Q-learning 2×3 grid with 100/90/81 ripple
11. Actor-critic block diagram with δ arrows

### 10-minute exam-eve priority order

1. LSTM gates + 6 equations + cell diagram (streak topic)
2. Q-learning update term-by-term + 100/90/81 grid
3. MDP 5-tuple + gridworld + working loop
4. RL definition + framework diagram + elements
5. SARSA update + on/off-policy table (**top predicted**)
6. Value vs Policy Iteration table
7. Beam search worked example + BLEU formula with BP (**predicted**)
8. Actor-critic roles + δ equations
9. Bellman two forms (expectation vs optimality)
10. RNN types table + feed-forward vs RNN table + attention steps
