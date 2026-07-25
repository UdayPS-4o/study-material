# Unit 2 — Neural Networks & Training

> **Exam weight: ~22.5% of offered marks. Q2/Q3 draw from this unit in every paper. Gradient descent asked 4/5 years; backprop 3/5; autoencoders and batch norm asked in BOTH of the last two papers.**

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|---|---|---|
| May-2022 | What is Gradient Descent | 7 |
| May-2022 | Backpropagation algorithm | 7 |
| May-2022 | Multilayer network (short note) | 3.5 |
| May-2023 | Backprop numerical — update weights, sigmoid, lr = 0.3 | 7 |
| May-2023 | Differentiate various loss functions | 7 |
| May-2023 | Types of Gradient Descent optimizers | 7 |
| May-2023 | Hyperparameter tuning improves performance — justify | 7 |
| May-2023 | How to make a model non-linear + effect of pure linearity on GD | 7 |
| May-2024 | Sigmoid vs ReLU — advantages/limitations, vanishing gradient, output range | 7 |
| May-2024 | Define gradient descent as an optimization technique | 7 |
| May-2024 | L1 (Lasso) vs L2 (Ridge) — how they penalize differently | 7 |
| May-2024 | Linearity vs Non-linearity (short note) | 7 |
| Dec-2024 | Importance of chain rule in backpropagation | 7 |
| Dec-2024 | Role of bottleneck layer in autoencoders | 7 |
| Dec-2024 | Techniques and challenges of hyperparameter tuning | 7 |
| Dec-2024 | Batch normalization (short note) | 7 |
| Jun-2025 | What are Auto Encoders + their types | 7 |
| Jun-2025 | Types of Gradient Descent | 7 |
| Jun-2025 | Sigmoid activation in detail | 5 |
| Jun-2025 | Batch normalization | 5 |

> The May-2023 backprop numerical is fully solved in the Numericals file. Here we cover the algorithm and steps you must reproduce before the calculation.

---

## Linearity vs Non-Linearity [🔥 PYQ May-23, May-24 — MUST DO]

**Definition:** A model is **linear** if its output is a weighted sum of inputs (`y = w1x1 + w2x2 + ... + b`) — it can only draw straight lines/planes as decision boundaries. A model is **non-linear** if output is NOT proportional to input, so it can draw curved boundaries and learn complex patterns (XOR, images, speech).

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: define linear model (weighted sum, straight-line boundary) and non-linear model (curved boundary).
> 2. Heading "Why pure linearity fails": stacking linear layers collapses to one linear layer — `W2(W1x) = (W2W1)x`, so depth is wasted.
> 3. Heading "Effect on Gradient Descent": for a purely linear deep net the gradient of every layer is a constant matrix product — no matter how many layers, GD can only find a straight-line fit; XOR can never be separated.
> 4. Heading "How to make a model non-linear": (a) add non-linear activation functions (sigmoid, tanh, ReLU) after every layer, (b) feature transformations (polynomial features, kernels), (c) deeper networks with activations.
> 5. Draw the linearly-separable vs non-separable (XOR) diagram.
> 6. Close with example: XOR is solvable by a 2-layer net with sigmoid, impossible for a single-layer perceptron.

**Key points (headed bullets):**
- **Linear model:** `y = Wx + b`. Examples: linear regression, single-layer perceptron.
- **Composition trap:** Linear ∘ Linear = Linear. A 100-layer network with no activation = 1-layer network.
- **Non-linearity source:** activation functions applied element-wise after each layer's weighted sum.
- **Effect of pure linearity on GD:** loss surface is a simple bowl (convex) — GD converges fast BUT only to the best *straight line*; it can never reduce error on non-linearly-separable data (XOR error stays stuck).
- **Ways to introduce non-linearity:**
  - Activation functions (sigmoid, tanh, ReLU) — most common.
  - Polynomial / basis-function features (`x, x², x³`).
  - Kernel trick (SVM).
  - Hidden layers + activations (deep networks).

```
 Linearly separable            NOT linearly separable (XOR)
      x2                              x2
  o o  |  x x                     x (0,1)      o (1,1)
  o o  |  x x
 ------+------> x1                o (0,0)      x (1,0)
   one straight line             NO single straight line works
       works                     → need non-linear boundary
```

**Example:** XOR gate — outputs 1 for (0,1) and (1,0), 0 for (0,0) and (1,1). No single line separates the 1s from the 0s; a 2-layer network with a non-linear activation solves it.

**⚠️ Common mistake:** Writing "more layers make the model non-linear." FALSE — layers *without activation functions* stay linear. It is the activation, not the depth, that gives non-linearity.

---

## Activation Functions [🔥 PYQ May-24, Jun-25 — MUST DO]

**Definition:** An activation function is a non-linear function applied to the weighted sum (`z = Wx + b`) of a neuron to decide its output/firing strength. It introduces non-linearity so the network can learn complex mappings.

> **✍️ 7-mark answer skeleton (Sigmoid vs ReLU, May-24 style):**
> 1. Opening line: define activation function + why needed (non-linearity).
> 2. Heading "Sigmoid": formula `σ(x) = 1/(1+e^-x)`, range (0,1), S-shaped curve.
> 3. Heading "ReLU": formula `f(x) = max(0, x)`, range [0, ∞).
> 4. Heading "Advantages/Limitations": sigmoid — smooth, probabilistic output BUT vanishing gradient (max slope 0.25), not zero-centred, slow (e^x); ReLU — fast, no saturation for x>0, sparse activation BUT dying-ReLU, unbounded output.
> 5. Draw both curves side by side.
> 6. Close with usage example: sigmoid → output layer of binary classifier; ReLU → hidden layers of deep nets/CNNs.

### Master table of activation functions

| Function | Formula | Range | Pros | Cons |
|---|---|---|---|---|
| **Sigmoid** | `σ(x) = 1/(1+e^-x)` | (0, 1) | Smooth; output reads as probability; historically standard | Vanishing gradient (`σ' ≤ 0.25`); not zero-centred; `e^x` costly |
| **Tanh** | `tanh(x) = (e^x − e^-x)/(e^x + e^-x)` | (−1, 1) | Zero-centred → faster convergence than sigmoid | Still saturates → vanishing gradient |
| **ReLU** | `f(x) = max(0, x)` | [0, ∞) | Very fast; no saturation for x>0; sparse activation; eases vanishing gradient | Dying ReLU (neuron stuck at 0 forever); not zero-centred; unbounded |
| **Leaky ReLU** | `f(x) = x if x>0, else 0.01x` | (−∞, ∞) | Fixes dying ReLU (small gradient for x<0) | Slope 0.01 is arbitrary; results not always better |
| **Softmax** | `f(xi) = e^xi / Σj e^xj` | (0, 1), sums to 1 | Converts scores to class probabilities; multi-class output layer | Only for output layer; expensive; sensitive to large inputs |

### Sigmoid in detail (Jun-2025, 5 marks)

- **Formula:** `σ(x) = 1 / (1 + e^-x)`; **derivative:** `σ'(x) = σ(x) · (1 − σ(x))`.
- **Shape:** S-shaped (sigmoid = "S-like"); output 0.5 at x = 0; saturates to 0 and 1 at extremes.
- **Use:** output layer of **binary classification** (output = probability of class 1); gates in LSTM.
- **Why derivative matters:** max value of `σ'` is **0.25** at x = 0 → multiplying many such small derivatives through layers causes the **vanishing gradient problem**.
- **Drawbacks:** vanishing gradient, not zero-centred (all outputs positive → zig-zag weight updates), computationally costly.

```
 Sigmoid                         ReLU
 1 -----------____----           |        /
 |        _--                    |       /
0.5      /                       |      /
 |   __--                        |     /
 0 --------------> x             0 ___/________> x
 saturates both sides            zero for x<0, linear for x>0
```

**Example:** Spam classifier output neuron uses sigmoid: `σ(2.0) ≈ 0.88` → "88% probability spam". Hidden layers of the same network use ReLU for fast training.

**Mnemonic:** "**S**igmoid **S**quashes to (0,1), **T**anh **T**akes (−1,1), **R**eLU **R**ejects negatives, **S**oftmax **S**hares probability."

**⚠️ Common mistake:** Writing sigmoid range as [0,1] — it is **open** interval (0,1); sigmoid never actually reaches 0 or 1. Also, ReLU IS non-linear (it is piecewise linear, which is enough).

---

## Weights and Bias [⚠️ Never asked — DUE, likely next]

**Definition:** **Weights** are learnable parameters that scale the importance of each input to a neuron. **Bias** is a learnable constant added to the weighted sum that shifts the activation threshold, letting the neuron fire even when all inputs are zero.

**Key points:**
- **Neuron computation:** `z = w1x1 + w2x2 + ... + wnxn + b`, then `a = f(z)` (activation).
- **Role of weight:** decides *how much* each input matters; large |w| = strong influence; sign decides excitatory (+) or inhibitory (−).
- **Role of bias:** shifts the activation curve left/right — like the intercept `c` in `y = mx + c`. Without bias, every decision boundary is forced through the origin.
- **Learning:** both are updated by gradient descent: `w_new = w_old − η · ∂L/∂w`, `b_new = b_old − η · ∂L/∂b`.
- **Analogy:** weights = volume knobs on each input; bias = the base threshold/mood of the neuron.

```
 x1 --- w1 ---\
               \
 x2 --- w2 ----(Σ  z = Σ wixi + b)--- f(z) ---> output a
               /
 x3 --- w3 ---/         ^
                        |
              bias b ---+   (shifts the threshold)
```

**Example:** Predicting exam result: `z = 0.7·(hours studied) + 0.2·(attendance) − 3`. Weight 0.7 says hours matter most; bias −3 means some minimum effort is needed before the neuron activates.

**⚠️ Common mistake:** Calling bias "an input". Bias is a *parameter* (learned), often modelled as weight on a constant input `x0 = 1`, but it is not data.

---

## Loss Functions [🔥 PYQ May-23 — MUST DO]

**Definition:** A loss function measures the difference between the network's predicted output `ŷ` and the true target `y`. Training = minimizing average loss over the dataset. (Loss = one sample; Cost = average over all samples.)

> **✍️ 7-mark answer skeleton ("Differentiate various loss functions"):**
> 1. Opening line: definition of loss + role in training (the quantity GD minimizes).
> 2. Heading "Regression losses": MSE and MAE with formulas — contrast outlier sensitivity.
> 3. Heading "Classification losses": Cross-entropy (with sigmoid/softmax) and Hinge (SVM).
> 4. Reproduce the comparison table (columns: formula, task, outlier sensitivity, use-case).
> 5. One numeric mini-example (MSE vs MAE on an outlier).
> 6. Close: "choice of loss depends on task (regression/classification) and noise in data."

### Comparison table

| Loss | Formula | Task | Key property | Used with |
|---|---|---|---|---|
| **MSE (L2 loss)** | `(1/n) Σ (y − ŷ)²` | Regression | Squares errors → punishes outliers heavily; smooth, differentiable everywhere | Linear regression, NN regression |
| **MAE (L1 loss)** | `(1/n) Σ |y − ŷ|` | Regression | Robust to outliers; gradient constant (not smooth at 0) | Noisy regression data |
| **Binary Cross-Entropy** | `−(1/n) Σ [y·log(ŷ) + (1−y)·log(1−ŷ)]` | Binary classification | Heavily penalizes confident wrong predictions; pairs with sigmoid | Logistic regression, binary NN |
| **Categorical Cross-Entropy** | `−Σ yi · log(ŷi)` | Multi-class | Works on probability distribution from softmax | Multi-class NN |
| **Hinge loss** | `max(0, 1 − y·ŷ)`, y ∈ {−1, +1} | Classification (margin) | Zero loss once margin ≥ 1 → maximum-margin behaviour | SVM |

**Numeric example (MSE vs MAE):** errors = [1, 1, 10].
- MSE = (1 + 1 + 100)/3 = **34** → the single outlier dominates.
- MAE = (1 + 1 + 10)/3 = **4** → outlier has proportionate effect.
So use MAE when data has outliers, MSE when errors should be smoothly penalized.

**Mnemonic:** "**M**SE **M**agnifies mistakes, **M**AE stays **M**oderate, **C**ross-entropy for **C**lasses, **H**inge for **H**yperplanes (SVM)."

**⚠️ Common mistake:** Using MSE with sigmoid output for classification — gradients become tiny and non-convex; cross-entropy is the correct pairing (its gradient with sigmoid simplifies to `(ŷ − y)·x`, clean and large).

---

## Gradient Descent [🔥 PYQ May-22, May-23, May-24, Jun-25 — MUST DO]

**Definition:** Gradient Descent is an iterative first-order optimization algorithm that minimizes a loss function `L(w)` by repeatedly moving the parameters in the direction **opposite** to the gradient (slope), because the gradient points uphill and we want to go downhill.

**Update rule:** `w_new = w_old − η · ∂L/∂w`  where `η` (eta) = learning rate.

> **✍️ 7-mark answer skeleton ("Define GD as optimization technique"):**
> 1. Opening line: definition + update rule formula.
> 2. Heading "Intuition": blindfolded man descending a hill — feels slope, steps downhill.
> 3. Heading "Algorithm steps": (i) initialize w randomly, (ii) compute loss, (iii) compute gradient `∂L/∂w`, (iv) update `w = w − η·∂L/∂w`, (v) repeat till convergence.
> 4. Heading "Learning rate effect": too small → slow; too large → overshoots/diverges (draw the two-curve diagram).
> 5. Heading "Types": batch / stochastic / mini-batch (one line each).
> 6. Draw the loss-bowl diagram with steps going to the minimum; close with example: fitting `y = wx + b` with MSE.

**Algorithm (write these 5 steps in exam):**
1. **Initialize** parameters `w, b` (small random values).
2. **Forward:** compute predictions and loss `L(w)` on training data.
3. **Gradient:** compute `∂L/∂w` (slope of loss w.r.t. each parameter).
4. **Update:** `w = w − η · ∂L/∂w` (step opposite to slope).
5. **Repeat** for many epochs until loss stops decreasing (convergence).

```
 L(w)
  |\                        /
  | \        ●            /
  |  \      ↙ steps     /
  |   \   ●           /
  |    \ ↙          /
  |     ●___●____/      ← global minimum (gradient = 0)
  +---------------------------→ w
 Effect of learning rate η:
  η too small: ●·●·●·●·●·●  (crawls, very slow)
  η too large: ●     ●      (jumps across valley, diverges)
            \  ↘   ↗  /
```

### Types of Gradient Descent [🔥 PYQ Jun-25, May-23 — MUST DO]

> **✍️ 7-mark answer skeleton ("Types of Gradient Descent"):**
> 1. Opening line: recall plain GD update `w = w − η·∂L/∂w`; the types differ in *how much data* is used per update.
> 2. Heading "Batch GD": entire training set per update — exact gradient, smooth path, slow (1 update/epoch), memory-heavy.
> 3. Heading "Stochastic GD (SGD)": ONE random sample per update — very fast, noisy zig-zag path; noise can escape local minima; online learning.
> 4. Heading "Mini-batch GD": small batch (32/64/128) — balances speed and stability, GPU-vectorizable, the deep-learning default.
> 5. Reproduce the comparison table + the three convergence-path diagrams.
> 6. Close: "Mini-batch is the practical default; SGD for streaming data; Batch only for small/convex problems."

| Variant | Data used per update | Speed per update | Gradient quality | Memory | Best for |
|---|---|---|---|---|---|
| **Batch GD** | ENTIRE training set | Slow (1 update per epoch) | Exact, smooth convergence | High | Small datasets, convex problems |
| **Stochastic GD (SGD)** | ONE random sample | Very fast updates | Noisy, zig-zag path (noise can escape local minima) | Very low | Online/streaming learning |
| **Mini-batch GD** | Small batch (32/64/128) | Fast | Balanced noise, vectorizable on GPU | Moderate | Deep learning (default choice) |

```
 Batch GD          SGD                Mini-batch
 ●                 ●                  ●
  \                 \↗↘               ↘
   ●                 ↘↗●               ●↘
    \                ↗↘                  ●
     ●____min         ●~~min              ●__min
 smooth path       noisy zig-zag       mildly noisy
```

### Gradient Descent Optimizers [🔥 PYQ May-23 — MUST DO]

**Definition:** Optimizers are improved versions of plain GD that adapt the step size or direction to converge faster and more reliably.

> **✍️ 7-mark answer skeleton ("Types of GD optimizers"):**
> 1. Opening line: define optimizer (improvement over plain GD that adapts the step) + plain GD update rule for contrast.
> 2. Heading "Momentum": `v = β·v + η·g; w = w − v` — velocity dampens zig-zag, accelerates flat regions.
> 3. Heading "AdaGrad": per-parameter learning rate `η/√(G+ε)` — great for sparse features, but accumulated G kills the learning rate.
> 4. Heading "RMSProp": exponential moving average of squared gradients — fixes AdaGrad's dying learning rate; good for RNNs.
> 5. Heading "Adam": Momentum + RMSProp with bias correction — fast, robust, the default choice.
> 6. Reproduce the table; close with "each optimizer fixes the previous one's weakness (MARS-A); Adam = Momentum + RMSProp."

| Optimizer | Core idea | Update sketch | Advantage | Limitation |
|---|---|---|---|---|
| **Momentum** | Add fraction of previous update (velocity) — like a rolling ball | `v = β·v + η·g; w = w − v` | Dampens zig-zag, speeds up flat regions, escapes small local minima | Extra hyperparameter β (≈0.9) |
| **AdaGrad** | Per-parameter learning rate divided by √(sum of squared past gradients) | `w = w − (η/√(G+ε))·g` | Great for sparse features (rare features get big steps) | Accumulated G keeps growing → learning rate shrinks to ~0 |
| **RMSProp** | Fix AdaGrad using exponential *moving average* of squared gradients | `E = γE + (1−γ)g²; w = w − (η/√(E+ε))·g` | Learning rate does not die; good for non-stationary problems (RNNs) | Needs tuning of decay γ |
| **Adam** | Momentum + RMSProp combined (1st and 2nd moment estimates, bias-corrected) | `m = β1m + (1−β1)g; v = β2v + (1−β2)g²; w = w − η·m̂/(√v̂+ε)` | Fast, robust, default optimizer for deep learning | Slightly more memory; can sometimes generalize worse than tuned SGD |

**Mnemonic:** "**MARS-A**": **M**omentum → **A**daGrad → **R**MSProp → **A**dam — each fixes the previous one's weakness, and **Adam = Momentum + RMSProp**.

**Example:** Training a CNN on MNIST: plain SGD needs ~50 epochs; Adam with `η = 0.001, β1 = 0.9, β2 = 0.999` reaches the same accuracy in ~10 epochs.

**⚠️ Common mistake:** Confusing "types of GD" (batch/SGD/mini-batch — *how much data per step*) with "optimizers" (momentum/Adam — *how the step is computed*). The paper may ask either; read carefully.

---

## Multilayer Network (MLP) [🔥 PYQ May-22 — MUST DO]

**Definition:** A Multilayer Perceptron (MLP)/multilayer network is a feed-forward neural network with one input layer, **one or more hidden layers**, and one output layer, where every neuron of a layer connects to every neuron of the next (fully connected) and each neuron applies a non-linear activation.

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: definition (input + hidden + output, fully connected, non-linear activations).
> 2. Heading "Architecture": role of each layer (input = features, hidden = feature extraction, output = prediction).
> 3. Heading "Forward propagation": `a(l) = f(W(l) a(l−1) + b(l))` layer by layer.
> 4. Heading "Why hidden layers": overcome the perceptron's linear limitation — can solve XOR; universal approximation theorem (one hidden layer with enough neurons can approximate any continuous function).
> 5. Heading "Training": trained by backpropagation + gradient descent.
> 6. Draw the 3-4-2 network diagram; close with example (XOR solved with 2 hidden neurons).

**Key points:**
- **Feed-forward:** information flows one way, input → output; no cycles.
- **Fully connected:** each neuron receives all outputs of the previous layer.
- **Forward pass formula:** `z(l) = W(l)·a(l−1) + b(l)`, `a(l) = f(z(l))`.
- **Depth vs width:** more hidden layers = hierarchical features (deep learning); more neurons per layer = capacity.
- **Universal approximation:** an MLP with one hidden layer and non-linear activation can approximate any continuous function to arbitrary accuracy (given enough neurons).
- **Solves what perceptron cannot:** non-linearly-separable problems like XOR.

```
  Input        Hidden         Output
  layer        layer          layer
   x1 ─────●━━━━━●
             ╲  ╱   ╲
   x2 ─────●━━╳━━━━●━━━━━━● ŷ1
             ╱  ╲   ╱
   x3 ─────●━━━━━●━━━━━━━━● ŷ2
                 ●
  (3 inputs) (4 hidden)   (2 outputs)
  every arrow = one weight; each hidden/output node has a bias
```

**Example:** Handwritten digit recognition: 784 input neurons (28×28 pixels) → hidden layer 128 (ReLU) → output 10 (softmax, one per digit).

**⚠️ Common mistake:** Counting the input layer as a "computational" layer — input neurons do no computation; a "2-layer network" means 1 hidden + 1 output layer of weights.

---

## Backpropagation [🔥 PYQ May-22, May-23, Dec-24 — MUST DO]

**Definition:** Backpropagation (backward propagation of errors) is the algorithm that computes the gradient of the loss with respect to **every** weight in a multilayer network by applying the **chain rule** layer by layer from output back to input, so that gradient descent can update all weights.

> **✍️ 7-mark answer skeleton (algorithm question):**
> 1. Opening line: definition + "backprop computes gradients, gradient descent uses them."
> 2. Heading "Step 1 — Forward pass": compute all activations and final loss.
> 3. Heading "Step 2 — Output error": `δ(out) = (ŷ − y) · f'(z_out)`.
> 4. Heading "Step 3 — Backward pass": propagate error to hidden layers with chain rule `δ(l) = (W(l+1)ᵀ δ(l+1)) · f'(z(l))`.
> 5. Heading "Step 4 — Weight update": `w = w − η · δ · a_prev`.
> 6. Draw forward/backward arrows diagram; close with the sigmoid derivative fact `σ' = σ(1−σ)` and mention the lr = 0.3 numerical pattern (see Numericals file).

### The 4-step algorithm (reproduce exactly in exam)

1. **Forward pass:** feed input `x` through the network; compute and store each layer's `z(l) = W(l)a(l−1) + b(l)` and `a(l) = f(z(l))`; compute loss `L(ŷ, y)`.
2. **Compute output-layer error:** `δ(L) = ∂L/∂ŷ · f'(z(L))`. For MSE + sigmoid: `δ(L) = (ŷ − y) · ŷ(1 − ŷ)`.
3. **Backpropagate error (chain rule):** for each hidden layer moving backwards, `δ(l) = (W(l+1)ᵀ · δ(l+1)) ⊙ f'(z(l))` — each layer's error = next layer's error, sent back through the weights, times the local activation slope.
4. **Update all weights and biases:** `∂L/∂W(l) = δ(l) · a(l−1)ᵀ`, then `W(l) = W(l) − η · ∂L/∂W(l)` and `b(l) = b(l) − η · δ(l)`.

Repeat steps 1–4 for every batch, for many epochs.

### Importance of the chain rule [🔥 PYQ Dec-24 — MUST DO]

> **✍️ 7-mark answer skeleton ("Importance of chain rule in backpropagation"):**
> 1. Opening line: the chain rule differentiates *compositions of functions* — and a neural network IS a composition (layer of layer of layer).
> 2. Heading "The problem": `∂L/∂w1` has no direct formula — the loss depends on an inner weight only through every later layer.
> 3. Heading "Decomposition": write the full product `∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂z_out · ∂z_out/∂a_h · ∂a_h/∂z_h · ∂z_h/∂w` — each factor is a simple local derivative.
> 4. Heading "Efficiency": each layer's δ is computed once and reused for the layer before it → gradients for ALL weights in one backward pass.
> 5. Heading "Consequence": the product form explains vanishing/exploding gradients (many terms <1 or >1 multiplied).
> 6. Draw the forward/backward diagram; close: "without the chain rule there is no backpropagation, and without backprop no deep learning."

- **The core problem:** loss depends on an inner weight only *indirectly*, through every layer after it. Direct differentiation is impossible without decomposition.
- **Chain rule decomposes it:** `∂L/∂w = ∂L/∂ŷ · ∂ŷ/∂z_out · ∂z_out/∂a_hidden · ∂a_hidden/∂z_hidden · ∂z_hidden/∂w` — a product of simple local derivatives.
- **Reuse = efficiency:** each layer's `δ` is computed once and reused for the layer before it → the whole gradient costs about the same as ONE forward pass (instead of recomputing per weight). This is what makes training deep networks feasible.
- **Explains unstable gradients:** because gradients are *products* of many terms, they can shrink (vanishing) or blow up (exploding) — see Unstable Gradient section.

```
 FORWARD  ──────────────────────────────────→
  x ──► [W1] ──► h = f(z1) ──► [W2] ──► ŷ ──► Loss L
  ◄────────────────────────────────── BACKWARD
        δ1 = W2ᵀδ2 · f'(z1)   δ2 = (ŷ−y)·f'(z2)
 chain rule: ∂L/∂W1 = ∂L/∂ŷ · ∂ŷ/∂h · ∂h/∂W1
```

**Example (exam numerical pattern, May-23):** 2-2-1 network, sigmoid, `η = 0.3`, target 0.9. Forward pass gives ŷ = 0.62 → `δ_out = (0.62 − 0.9) · 0.62 · (1 − 0.62) = −0.28 × 0.2356 = −0.0660` → each output weight changes by `−η · δ_out · h`. Full solution in the Numericals file.

**Mnemonic:** "**F**irst **E**rror **B**ack **U**pdate" — **F**orward pass, output **E**rror, **B**ackpropagate, **U**pdate weights (FEBU).

**⚠️ Common mistake:** Saying "backpropagation updates the weights." Strictly, backprop only *computes gradients*; the *update* is done by gradient descent. Write both sentences and the examiner is satisfied.

---

## Weight Initialization [⚠️ Never asked — DUE, likely next]

**Definition:** Weight initialization is the strategy for choosing the starting values of weights before training. A bad start causes symmetry problems, vanishing or exploding gradients; a good start keeps signal variance stable across layers.

**Methods (compare in exam):**

| Method | How | Problem/Benefit |
|---|---|---|
| **Zero initialization** | All `w = 0` | FAILS: every neuron in a layer computes the same output and gets the same gradient → all learn identical features (**symmetry problem**). Never use for weights (ok for biases). |
| **Random (small) initialization** | `w ~ N(0, 0.01)` | Breaks symmetry, but if too small → signals shrink layer by layer (vanishing); too large → saturation/exploding. |
| **Xavier / Glorot** | `w ~ N(0, 1/n_in)` or uniform with `Var(w) = 2/(n_in + n_out)` | Keeps variance of activations same across layers. Designed for **sigmoid/tanh**. |
| **He initialization** | `w ~ N(0, 2/n_in)` | Doubles variance because ReLU kills half the inputs (negatives → 0). Designed for **ReLU** networks. |

- `n_in` = number of inputs to the neuron (fan-in), `n_out` = fan-out.
- **Rule of thumb:** sigmoid/tanh → Xavier; ReLU/Leaky ReLU → He.

**Example:** A 10-layer ReLU network initialized with `N(0, 0.01)` trains to 10% accuracy (signal dies); the same network with He initialization trains normally — only the starting values changed.

**Mnemonic:** "**Z**ero is **Z**ero-use, **R**andom is **R**isky, **X**avier for **S**-shaped (sigmoid/tanh), **He** for **Re**LU."

**⚠️ Common mistake:** Writing "initialize all weights to zero for simplicity." This is the classic trap — mention the symmetry problem explicitly to earn the mark.

---

## Training and Testing [⚠️ Never asked — DUE, likely next]

**Definition:** **Training** is the phase where the model sees labelled data and adjusts weights to minimize loss. **Testing** is the phase where the frozen model is evaluated on unseen data to estimate real-world (generalization) performance.

**Standard procedure (headed bullets):**
- **Split the data:** typically 70% train / 15% validation / 15% test (or 80/20 with cross-validation).
- **Training loop (per epoch):** shuffle data → for each mini-batch: forward pass → loss → backprop → weight update.
- **Validation set:** used *during* training to tune hyperparameters and detect overfitting (early stopping when validation loss starts rising). Never used for weight updates.
- **Test set:** used exactly ONCE at the end; weights frozen; report accuracy/precision/recall/MSE.
- **Epoch vs iteration:** epoch = one full pass over the training data; iteration = one batch update. 1000 samples, batch 100 → 10 iterations per epoch.
- **Overfitting signal:** training loss keeps falling while validation loss rises → memorizing, not learning.

```
 Loss
  |\
  | \  validation loss
  |  \___        ____/   ← starts rising = OVERFITTING
  |      \______/
  |   \
  |    \______ training loss (keeps falling)
  +---------------------------→ epochs
        ↑ stop here (early stopping)
```

**Example:** Student analogy — training = solving the textbook exercises (answers visible), validation = weekly class tests (adjust study strategy), testing = the final RGPV exam (unseen questions, one attempt).

**⚠️ Common mistake:** Tuning hyperparameters on the *test* set. That leaks information and inflates reported accuracy — tuning belongs to the validation set only.

---

## Unstable Gradient Problem [⚠️ Only touched inside May-24 sigmoid Q — DUE, likely next]

**Definition:** In deep networks the gradient at early layers is a **product of many per-layer terms** (weights × activation derivatives). If these terms are mostly < 1 the product shrinks exponentially (**vanishing gradient**); if mostly > 1 it grows exponentially (**exploding gradient**). Both make training unstable — this is the unstable gradient problem.

### Vanishing gradient
- **Cause:** saturating activations — sigmoid derivative `σ' ≤ 0.25`, tanh derivative ≤ 1. Ten sigmoid layers → gradient scaled by at most `0.25^10 ≈ 10^-6`.
- **Symptom:** early (near-input) layers learn extremely slowly or not at all; loss plateaus.
- **Fixes:**
  - **ReLU-family activations** (derivative = 1 for x > 0).
  - **Proper initialization** (Xavier/He keeps variance stable).
  - **Batch normalization** (keeps inputs in the non-saturated zone).
  - **Residual/skip connections** (gradient highway, as in ResNet).
  - **LSTM/GRU** gating for recurrent networks.

### Exploding gradient
- **Cause:** large weights / deep recurrence — products of terms > 1 blow up.
- **Symptom:** loss oscillates wildly or becomes NaN; huge weight updates.
- **Fixes:**
  - **Gradient clipping** (cap gradient norm, e.g. at 5).
  - **Smaller learning rate.**
  - **Careful initialization** + batch norm.
  - **L2 regularization** (keeps weights small).

```
 gradient magnitude reaching layer 1 of a 10-layer net:
 each layer multiplies by r = |w · f'(z)|
 r = 0.5 :  0.5^10 ≈ 0.001   → VANISHING  (early layers frozen)
 r = 1.0 :  1.0^10 = 1       → stable
 r = 1.5 :  1.5^10 ≈ 57.7    → EXPLODING  (updates blow up / NaN)
```

**Example:** A 20-layer all-sigmoid network on MNIST: layers near the output train fine, layers near the input barely change even after 100 epochs. Replacing sigmoid with ReLU + He init makes all layers train.

**Mnemonic:** "Deep chain **multiplies**: below 1 it **dies**, above 1 it **flies**."

**⚠️ Common mistake:** Blaming only sigmoid. Weights matter too — even with ReLU, badly-scaled weights can vanish/explode the gradient; that is why initialization and batch norm are listed as fixes.

---

## Autoencoders [🔥 PYQ Dec-24, Jun-25 — MUST DO]

**Definition:** An autoencoder is an **unsupervised** neural network trained to reproduce its input at its output (`target = input`). It has an **encoder** that compresses the input into a small latent code (bottleneck) and a **decoder** that reconstructs the input from that code, minimizing reconstruction loss `L = ||x − x̂||²`.

> **✍️ 7-mark answer skeleton (What are autoencoders + types):**
> 1. Opening line: definition (unsupervised, output ≈ input, encoder–bottleneck–decoder).
> 2. Heading "Architecture": encoder `h = f(We·x)`, decoder `x̂ = g(Wd·h)`, loss `||x − x̂||²`; draw the hourglass diagram.
> 3. Heading "Bottleneck role": forces compression → network must keep only essential features (cannot simply copy).
> 4. Heading "Types": undercomplete, denoising, sparse, variational — one line + use each.
> 5. Heading "Applications": dimensionality reduction, denoising, anomaly detection, pretraining.
> 6. Close with example: 784-pixel MNIST digit compressed to 32 values and reconstructed.

### Architecture

```
        ENCODER              BOTTLENECK            DECODER
 x ──► [784] ─► [128] ─► [32 latent code h] ─► [128] ─► [784] ──► x̂
        compress            smallest layer         reconstruct
                 Loss = || x − x̂ ||²   (reconstruction error)
        (hourglass / butterfly shape — narrow in the middle)
```

### Role of the bottleneck layer [🔥 PYQ Dec-24 — MUST DO]

- **Information filter:** it is the narrowest layer; input cannot pass through unchanged, so the network is **forced to compress**.
- **Feature learner:** to reconstruct well from few numbers, the code must capture the most important structure/patterns of the data — this is learned dimensionality reduction (a non-linear cousin of PCA).
- **Prevents identity copying:** without a bottleneck (or another constraint) the autoencoder would just learn `x̂ = x` trivially and learn nothing useful.
- **Output of the bottleneck = latent representation/embedding**, reusable for visualization, clustering, anomaly detection.

### Types of autoencoders

| Type | Idea | Constraint used | Application |
|---|---|---|---|
| **Undercomplete** | Bottleneck smaller than input | Small latent dimension | Dimensionality reduction, feature extraction |
| **Denoising (DAE)** | Input is corrupted with noise, target is the CLEAN input | Noise robustness | Image/audio denoising, robust features |
| **Sparse** | Bottleneck can be large, but only few neurons may fire at once | Sparsity penalty (L1 on activations / KL divergence) | Interpretable feature learning |
| **Variational (VAE)** | Encoder outputs a distribution (mean μ, variance σ²); decoder samples from it | KL divergence to N(0,1) | **Generative model** — create new images/data |

**Applications list (write 4):** dimensionality reduction, image denoising, anomaly detection (high reconstruction error = anomaly), data compression, pretraining deep nets.

**Example:** Credit-card fraud detection — train an autoencoder only on normal transactions; a fraudulent transaction reconstructs badly (large `||x − x̂||²`) and is flagged as an anomaly.

**Mnemonic:** types = "**U**ncle **D**rives **S**mall **V**ans" — **U**ndercomplete, **D**enoising, **S**parse, **V**ariational.

**⚠️ Common mistake:** Calling autoencoders supervised "because they have targets." The target is the input itself — no human labels are needed, so they are **unsupervised (self-supervised)**.

---

## Batch Normalization [🔥 PYQ Dec-24, Jun-25 — MUST DO]

**Definition:** Batch Normalization (BatchNorm) is a technique that normalizes the inputs of each layer over the current mini-batch (mean 0, variance 1) and then rescales them with two learnable parameters (γ, β). It stabilizes and accelerates training by reducing **internal covariate shift** (the constant change in each layer's input distribution as earlier weights update).

> **✍️ 7-mark answer skeleton:**
> 1. Opening line: definition + "applied per mini-batch, usually between the linear step and the activation."
> 2. Heading "Problem it solves": internal covariate shift, one line.
> 3. Heading "Steps": the 4 formulas below, in order.
> 4. Heading "Benefits": 4-5 bullets (faster training, higher lr, less vanishing gradient, regularization, less initialization-sensitive).
> 5. Heading "Test time": use running (population) mean/variance instead of batch statistics.
> 6. Small diagram of where BN sits in a layer; example: deep net trains in half the epochs with 10× learning rate.

### The 4 steps (per feature, per mini-batch)

1. **Batch mean:** `μ = (1/m) Σ xi`
2. **Batch variance:** `σ² = (1/m) Σ (xi − μ)²`
3. **Normalize:** `x̂i = (xi − μ) / sqrt(σ² + ε)` (ε avoids division by zero)
4. **Scale and shift (learnable):** `yi = γ · x̂i + β` — lets the network undo normalization if that is actually better.

```
 ... ─► [ z = Wx + b ] ─► [ BatchNorm: normalize → γ,β ] ─► [ ReLU ] ─► ...
                              uses μ, σ² of the CURRENT mini-batch
 (at test time: fixed running averages of μ and σ² are used)
```

### Benefits (write 5)

- **Faster convergence** — loss surface becomes smoother; fewer epochs needed.
- **Allows higher learning rates** without divergence.
- **Reduces vanishing/exploding gradients** — keeps activations in a healthy range (non-saturated zone of sigmoid/tanh).
- **Less sensitive to weight initialization.**
- **Mild regularization** — batch statistics add noise, slightly reducing overfitting (sometimes dropout becomes unnecessary).
- **Reduces internal covariate shift** — each layer sees a stable input distribution.

**Example:** A 20-layer sigmoid network that would not train at all (vanishing gradients) trains successfully once BatchNorm is inserted after every layer, even with a 10× larger learning rate.

**Mnemonic:** steps = "**M**ean, **V**ariance, **N**ormalize, **S**cale-shift" → "**M**y **V**ery **N**ice **S**tep."

**⚠️ Common mistake:** Forgetting γ and β. Normalization alone (steps 1–3) is NOT BatchNorm — the learnable scale-and-shift is what makes it flexible; and forgetting to say test-time uses running averages, not batch statistics.

---

## Dropout [⚠️ Never asked — DUE, likely next]

**Definition:** Dropout is a regularization technique in which, during **each training step**, every neuron in a layer is temporarily "dropped" (output set to 0) with probability `p` (e.g. 0.5). The network therefore trains a different random sub-network each step and cannot rely on any single neuron.

**Key points:**
- **Why it works:** prevents **co-adaptation** — neurons cannot depend on specific partners, so each learns robust features; acts like training an ensemble of many thinned networks that share weights.
- **Training:** each forward pass randomly zeros neurons with probability `p`; typical `p` = 0.5 hidden layers, 0.2 input layer.
- **Testing:** NO dropout — all neurons active; outputs scaled by `(1 − p)` (or use "inverted dropout" which scales by `1/(1−p)` during training so test needs no change).
- **Effect:** reduces overfitting; training loss slightly worse, validation/test accuracy better.
- **Where:** usually applied on fully-connected hidden layers.

```
 Normal training step            With dropout (p = 0.5)
   ●──●──●                          ●──✕──●
   │╲╱│╲╱│                          │  ╱  │      ✕ = dropped
   │╱╲│╱╲│                          │ ╱   │          (output = 0)
   ●──●──●                          ✕──●──●
 all paths active               random thinned sub-network each step
```

**Example:** Like a cricket team practising with 5 random players rested each day — no player becomes indispensable, and the full team on match day (test time) is stronger and more robust.

**⚠️ Common mistake:** Applying dropout at test time. Dropout is TRAINING-only; at test time the full network runs (with output scaling). Writing this one line earns an easy mark.

---

## L1 and L2 Regularization [🔥 PYQ May-24 — MUST DO]

**Definition:** Regularization adds a penalty on weight sizes to the loss function to discourage complex models and reduce overfitting. **L1 (Lasso)** penalizes the **absolute values** of weights; **L2 (Ridge)** penalizes the **squares** of weights.

- L1: `Loss_total = Loss_data + λ · Σ |wi|`
- L2: `Loss_total = Loss_data + λ · Σ wi²`
- `λ` (lambda) controls penalty strength: λ = 0 → no regularization; large λ → underfitting.

> **✍️ 7-mark answer skeleton (how they penalize differently):**
> 1. Opening line: define regularization + both formulas.
> 2. Heading "Gradient behaviour": L1 subtracts a CONSTANT `λ·sign(w)` (pushes weights all the way to exact 0) vs L2 subtracts `2λw`, proportional to w (shrinks but never reaches 0).
> 3. Heading "Effect on weights": L1 → sparse weights, automatic feature selection; L2 → small distributed weights.
> 4. Reproduce the comparison table.
> 5. Draw the diamond vs circle constraint diagram (corners of the diamond = sparsity).
> 6. Close with example: 1000 features, only 20 relevant → L1 zeroes ~980 weights; L2 keeps all small.

### Comparison table

| Aspect | L1 (Lasso) | L2 (Ridge) |
|---|---|---|
| Penalty term | `λ Σ |wi|` | `λ Σ wi²` |
| Gradient of penalty | `λ · sign(w)` — constant pull | `2λw` — proportional pull |
| Effect on weights | Drives many weights to **exactly 0** → **sparse** | Shrinks all weights near 0, **never exactly 0** |
| Feature selection | YES (built-in) | NO |
| Constraint region shape | Diamond (corners on axes) | Circle (smooth) |
| Solution | No closed form (not differentiable at 0) | Closed form exists |
| Robustness to outliers in weights | Encourages few large-ish relevant weights | Prefers many small weights |
| Use when | Many irrelevant features; want interpretability | All features somewhat useful; want stability |

```
 L1 (diamond)                    L2 (circle)
      w2                              w2
      /\   ← loss contours            ___
     /  \      ellipse hits          /   \    ellipse hits circle
 ───◆────◆── w1                  ───|  ●  |── w1   at a generic point
     \  /   corner ON the axis       \___/    → both w1,w2 small,
      \/    → w2 = 0 (SPARSE!)                  non-zero
```

**Example:** House-price model with 1000 features where only 20 matter. L1 with proper λ sets ~980 weights to exactly zero (automatic feature selection). L2 keeps all 1000 weights small but non-zero. **Elastic Net** = L1 + L2 combined (bonus line for the examiner).

**Mnemonic:** "**L1 = Lasso = Lean** (cuts weights to zero); **L2 = Ridge = Reduce** (shrinks smoothly)." Also: L**1** → some weights survive, rest die; L**2** → **2** small **2** die (small but never zero).

**⚠️ Common mistake:** Writing "L1 and L2 both make weights zero." Only L1 produces exact zeros; L2 asymptotically shrinks them. The *difference in the gradient* (constant vs proportional) is the reason — state it explicitly for full marks.

---

## Momentum (and contrast with RMSProp/Adam) [⚠️ Asked only inside optimizer Q — DUE, likely next]

**Definition:** Momentum is a gradient-descent enhancement that accumulates an exponentially decaying moving average of past gradients (a "velocity") and moves the weights along this velocity, like a heavy ball rolling downhill that builds up speed in consistent directions and smooths out oscillations.

**Update rule:**
- `v_t = β · v_(t−1) + η · ∇L(w)`  (β ≈ 0.9 = friction/decay factor)
- `w = w − v_t`

**Key points:**
- **Accelerates** along directions where gradients consistently agree (velocity adds up).
- **Dampens zig-zag** across narrow ravines — opposite gradient components cancel in the average.
- **Escapes** small local minima and plateaus using built-up speed.
- **β meaning:** β = 0.9 means roughly the last `1/(1−β) = 10` gradients contribute to the velocity.
- **Nesterov momentum (NAG):** looks ahead — computes gradient at `w − βv` (the anticipated position) → slightly faster, corrects before overshooting.

**Contrast with adaptive optimizers:**

| Feature | Momentum | RMSProp | Adam |
|---|---|---|---|
| What it adapts | Direction (velocity from past gradients) | Per-parameter step SIZE (÷ RMS of past gradients) | Both direction AND step size |
| Learning rate | Single global η | Adaptive per parameter | Adaptive per parameter + momentum |
| Memory kept | 1st moment (mean of gradients) | 2nd moment (mean of squared gradients) | Both moments (bias-corrected) |
| Best for | Convex-ish, well-scaled problems; often best final generalization when tuned | RNNs, non-stationary objectives | Default all-rounder for deep learning |

```
 Plain SGD in a ravine:           With momentum:
   ↗↘↗↘↗↘↗↘  → min                 ~~→→→→→  → min
 (oscillates across walls,       (oscillations cancel,
  slow along the valley)          speeds along the valley)
```

**Example:** A ball rolled into a wavy valley: plain GD stops at the first small dip; a heavy ball with momentum rolls through small dips and settles in the deep valley (better minimum).

**⚠️ Common mistake:** Saying momentum "changes the learning rate." It does not — it changes the *direction/velocity* using gradient history; RMSProp/Adam are the ones adapting the effective learning rate per parameter.

---

## Hyperparameter Tuning [🔥 PYQ May-23, Dec-24 — MUST DO]

**Definition:** Hyperparameters are configuration settings chosen **before** training (not learned from data) — learning rate, number of layers/neurons, batch size, epochs, dropout rate, λ, β, activation choice. Hyperparameter tuning is the systematic search for the combination that gives the best **validation** performance.

> **✍️ 7-mark answer skeleton (techniques + challenges / justify improvement):**
> 1. Opening line: define hyperparameter (set before training) vs parameter (weights, learned) — 1-line table.
> 2. Heading "Why tuning improves performance": lr controls convergence (too high diverges, too low crawls); depth/width control under/overfitting; λ and dropout control the bias–variance trade-off — wrong values cap the achievable accuracy regardless of training time.
> 3. Heading "Techniques": Grid search, Random search, Bayesian optimization, (bonus: Hyperband/early-stopping, genetic algorithms) — one line each.
> 4. Heading "Challenges": expensive (one full training per trial), exponential search space, interactions between hyperparameters, no gradients available, risk of overfitting the validation set.
> 5. Small grid-vs-random diagram.
> 6. Close with example: tuning lr from 0.5 → 0.01 taking accuracy 60% → 92%.

**Parameters vs Hyperparameters:**

| | Parameters | Hyperparameters |
|---|---|---|
| Examples | Weights, biases | Learning rate, layers, batch size, epochs, dropout p, λ |
| Set by | Learned by GD during training | Chosen by the practitioner before training |
| Evaluated on | Training loss | Validation set performance |

**Tuning techniques (one line each):**
- **Grid Search:** try every combination on a predefined grid (e.g. lr ∈ {0.1, 0.01, 0.001} × batch ∈ {32, 64}). Exhaustive but exponential cost.
- **Random Search:** sample random combinations from ranges — usually beats grid for the same budget because important hyperparameters get more distinct values tried.
- **Bayesian Optimization:** build a probabilistic model (e.g. Gaussian Process) of score vs hyperparameters and pick the next most promising trial — sample-efficient, good when each training run is costly.
- **Hyperband / Successive Halving:** start many configs, kill the bad ones early, give survivors more epochs.
- **Manual / coarse-to-fine:** expert intuition first, then zoom into the promising region.

**Challenges (write 5):**
- **Computational cost** — every trial = one full training run (hours/days for deep nets).
- **Curse of dimensionality** — combinations explode: 5 hyperparameters × 5 values each = 3125 runs.
- **Interdependence** — best learning rate changes when batch size or optimizer changes; cannot tune each in isolation.
- **No gradient** — validation score is not differentiable w.r.t. hyperparameters; only black-box search works.
- **Validation overfitting** — too many trials can overfit the validation set; final check must be on the untouched test set.
- **Non-reproducibility/noise** — random seeds change results, so comparisons need repeated runs.

```
 Grid search (3x3 = 9 trials)     Random search (9 trials)
  lr ●───●───●                     lr  ●    ●
     │   │   │                          ●       ●
     ●───●───●                        ●    ●
     │   │   │                             ●   ●  ●
     ●───●───●                     tries 9 DIFFERENT lr values
   batch size →                    (grid tried only 3) → better coverage
```

**Example:** Same MNIST network: lr = 0.5 → diverges (11% accuracy); lr = 0.00001 → 65% after 50 epochs (too slow); lr = 0.01 with batch 64 → 97%. Nothing changed but hyperparameters — direct justification that tuning improves performance.

**Mnemonic:** techniques = "**G**ood **R**esearchers **B**uild **H**ypotheses" — **G**rid, **R**andom, **B**ayesian, **H**yperband.

**⚠️ Common mistake:** Mixing up parameters and hyperparameters. If gradient descent learns it, it is a parameter; if YOU set it before training, it is a hyperparameter. Open your answer with this distinction.

---

## ⚡ Quick Revision Box

### One-liner per topic
- **Linearity vs Non-linearity:** stacked linear layers collapse to one (`W2W1x`); activations give curves; pure linearity → GD can only fit straight lines (XOR impossible).
- **Activation functions:** decide neuron output; sigmoid (0,1) saturates, tanh (−1,1) zero-centred, ReLU fast but can die, Leaky ReLU fixes dying, softmax for multi-class output.
- **Weights & bias:** weight = input importance knob; bias = threshold shifter (intercept); both learned by GD.
- **Loss functions:** MSE magnifies outliers, MAE robust, cross-entropy for classification (pairs with sigmoid/softmax), hinge for SVM margins.
- **Gradient descent:** `w = w − η·∂L/∂w`; walk downhill opposite the slope; η too big diverges, too small crawls.
- **GD types:** Batch = all data/smooth/slow; SGD = 1 sample/noisy/fast; Mini-batch = best of both (default).
- **Optimizers:** Momentum adds velocity; AdaGrad per-parameter lr that dies; RMSProp fixes it with moving average; Adam = Momentum + RMSProp (default).
- **Multilayer network:** input + hidden + output, fully connected, non-linear activations; universal approximator; solves XOR.
- **Backpropagation:** Forward → output Error → Backpropagate via chain rule → Update (FEBU); computes gradients, GD updates.
- **Chain rule:** decomposes `∂L/∂w` into product of local derivatives; reuse of δ makes it efficient; product form explains vanishing/exploding.
- **Weight initialization:** zero = symmetry disaster; random = risky scale; Xavier for sigmoid/tanh (`1/n_in`); He for ReLU (`2/n_in`).
- **Training vs testing:** train = learn weights, validation = tune hyperparameters/early stop, test = one final unseen evaluation.
- **Unstable gradients:** product of layer terms — below 1 it dies (vanishing: sigmoid, deep nets), above 1 it flies (exploding: big weights); fix with ReLU, He init, BatchNorm, clipping, ResNets.
- **Autoencoders:** unsupervised, encoder→bottleneck→decoder, minimize `||x − x̂||²`; bottleneck forces compression; types = Undercomplete, Denoising, Sparse, Variational (Uncle Drives Small Vans).
- **Batch norm:** per-mini-batch normalize then γ,β rescale; faster training, higher lr, fights vanishing gradient, mild regularization; test time uses running averages.
- **Dropout:** randomly zero neurons with prob p during TRAINING only; prevents co-adaptation; acts like an ensemble.
- **L1 vs L2:** L1 `λΣ|w|` constant pull → exact zeros → feature selection (diamond); L2 `λΣw²` proportional pull → small non-zero weights (circle).
- **Momentum:** velocity `v = βv + ηg`; smooths zig-zag, speeds valleys, escapes small dips; adapts direction, NOT learning rate.
- **Hyperparameter tuning:** search lr/layers/batch/λ on VALIDATION set via Grid/Random/Bayesian/Hyperband; challenges = cost, huge space, interactions, no gradients.

### Formula sheet
- Neuron: `z = Σ wixi + b`, `a = f(z)`
- Sigmoid: `σ(x) = 1/(1+e^-x)`; `σ'(x) = σ(x)(1−σ(x))`; max slope 0.25
- Tanh: `(e^x − e^-x)/(e^x + e^-x)`, range (−1,1)
- ReLU: `max(0, x)`; Leaky ReLU: `x if x>0 else 0.01x`
- Softmax: `e^xi / Σ e^xj`
- MSE: `(1/n)Σ(y−ŷ)²`; MAE: `(1/n)Σ|y−ŷ|`
- Binary cross-entropy: `−(1/n)Σ[y log ŷ + (1−y) log(1−ŷ)]`
- Hinge: `max(0, 1 − y·ŷ)`
- GD update: `w = w − η·∂L/∂w`
- Output error (MSE+sigmoid): `δ_out = (ŷ − y)·ŷ(1−ŷ)`
- Hidden error: `δ(l) = (W(l+1)ᵀ δ(l+1)) · f'(z(l))`
- Weight gradient: `∂L/∂W(l) = δ(l) · a(l−1)ᵀ`
- Momentum: `v = βv + ηg; w = w − v` (β ≈ 0.9)
- RMSProp: `E = γE + (1−γ)g²; w = w − (η/√(E+ε))·g`
- Adam: `m = β1m + (1−β1)g; v = β2v + (1−β2)g²; w = w − η·m̂/(√v̂ + ε)`
- Xavier: `Var(w) = 1/n_in` (sigmoid/tanh); He: `Var(w) = 2/n_in` (ReLU)
- BatchNorm: `μ = mean; σ² = var; x̂ = (x−μ)/√(σ²+ε); y = γx̂ + β`
- L1: `L + λΣ|wi|`; L2: `L + λΣwi²`
- Autoencoder loss: `||x − x̂||²`

### Diagrams to practice (draw each once on paper)
1. XOR / linearly-separable vs non-separable scatter.
2. Sigmoid and ReLU curves side by side.
3. Single neuron (inputs, weights, Σ, bias, activation).
4. Loss bowl with GD steps + small-η vs large-η paths.
5. Batch vs SGD vs mini-batch convergence paths.
6. 3-4-2 multilayer network (label weights and biases).
7. Forward/backward arrows backprop diagram with δ formulas.
8. Overfitting curve (training vs validation loss, early-stopping point).
9. Autoencoder hourglass (encoder–bottleneck–decoder).
10. BatchNorm position in a layer (linear → BN → activation).
11. Dropout thinned network (crossed-out neurons).
12. L1 diamond vs L2 circle constraint regions.
13. Grid vs random search dots.

### Mnemonics recap
- Activations: "Sigmoid Squashes, Tanh Takes (−1,1), ReLU Rejects negatives, Softmax Shares."
- Optimizers: "MARS-A" (Momentum → AdaGrad → RMSProp → Adam; Adam = Momentum + RMSProp).
- Backprop: "FEBU" — Forward, Error, Backpropagate, Update.
- Autoencoder types: "Uncle Drives Small Vans."
- BatchNorm steps: "My Very Nice Step" (Mean, Variance, Normalize, Scale-shift).
- Regularization: "L1 = Lasso = Lean (zeros); L2 = Ridge = Reduce (shrink)."
- Unstable gradients: "Below 1 it dies, above 1 it flies."
- Tuning techniques: "Good Researchers Build Hypotheses" (Grid, Random, Bayesian, Hyperband).
