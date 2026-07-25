# Unit 3 — Convolutional Neural Networks (CNN)

> **Exam weight: ~16.7% of offered marks but on a 3-paper HOT STREAK: padding/pooling/CNN-architecture/TensorFlow asked in May-24, Dec-24 AND Jun-25. Diagram-heavy = easy 7s.**

---

## PYQ Questions from this Unit

| Year | Question (condensed) | Marks |
|---|---|---|
| May-2022 | Principal component analysis for dimension reduction | 7 |
| May-2023 | How CNN operates; why image is downscaled while filter count increases toward output | 7 |
| May-2023 | Transfer learning benefits + Inception net architecture in detail | 7 |
| May-2023 | Identify + fix overfitting/underfitting in a CNN model | 7 |
| May-2024 | Types of padding in CNNs | 7 |
| May-2024 | Types of transfer learning — feature extraction vs fine-tuning | 7 |
| May-2024 | Why high-dimensional data is challenging (curse of dimensionality) | 7 |
| Dec-2024 | CNN architecture — hierarchical feature extraction through layers | 7 |
| Dec-2024 | How pooling layers reduce spatial dimensions | 7 |
| Dec-2024 | Role of TensorFlow in implementing/training CNNs | 7 |
| Dec-2024 | Inception network (short note) | 7 |
| Jun-2025 | Process of implementing CNN in TensorFlow | 7 |
| Jun-2025 | Define padding + how it works | 7 |
| Jun-2025 | Dimension reduction in detail | 7 |

**Read of the table:** CNN mechanics (padding/pooling/architecture) + TensorFlow + dimension reduction have appeared in **three consecutive papers**. Prepare the diagrams below until you can draw them from memory — every 7-marker in this unit rewards a labelled diagram.

---

## 1. Convolutional Neural Network — Meaning & Working [🔥 PYQ May-23, Dec-24 — MUST DO]

**Definition:** A Convolutional Neural Network (CNN) is a deep neural network designed for grid-like data (images), which automatically learns a **hierarchy of features** using three ideas — **local receptive fields, weight sharing, and subsampling** — instead of connecting every pixel to every neuron.

### Why CNN instead of a plain ANN? [🔥 supports May-23 answer]

| Point | Plain ANN (fully connected) | CNN |
|---|---|---|
| Input handling | Flattens image, loses spatial layout | Keeps 2-D structure of image |
| Parameters | Huge (every pixel × every neuron) | Few (small shared filters) |
| e.g. 32×32×3 image → 100 neurons | 3072 × 100 = **3,07,200 weights** | 6 filters of 5×5×3 → 450 weights + 6 biases = **456 params** |
| Translation invariance | No — cat at corner ≠ cat at centre | Yes — same filter slides everywhere |
| Overfitting risk | High | Lower (fewer parameters) |

### How a CNN operates (step-by-step) [🔥 May-23 direct question]

1. **Input layer** — takes raw image as a 3-D volume `Width × Height × Channels` (e.g. `32×32×3` for RGB).
2. **Convolution layer** — small filters (3×3, 5×5) slide over the image, computing dot products → produce **feature maps** that detect edges, corners, textures.
3. **Activation (ReLU)** — applies `f(x) = max(0, x)` element-wise → adds non-linearity, keeps training fast.
4. **Pooling (subsampling) layer** — shrinks each feature map (e.g. 2×2 max pool halves width and height) → fewer computations + small shift invariance.
5. **Repeat Conv → ReLU → Pool** — each repetition extracts **higher-level features** (edges → shapes → parts → objects).
6. **Flatten** — final 3-D volume is unrolled into a 1-D vector.
7. **Dense (fully connected) layers** — combine all features for reasoning/classification.
8. **Output + Loss layer** — softmax gives class probabilities; loss (cross-entropy) is computed and weights are updated by backpropagation + gradient descent.

### Full CNN pipeline diagram (DRAW THIS in every architecture answer)

```
 INPUT        CONV + ReLU     POOL        CONV + ReLU     POOL       FLATTEN     DENSE     SOFTMAX
32x32x3  -->  28x28x6    -->  14x14x6 --> 10x10x16   -->  5x5x16 --> 400x1  -->  120 --> 10 classes
(image)      (6 filters      (2x2 max    (16 filters     (2x2 max   (1-D        (FC      (probab-
              of 5x5)         pool)       of 5x5)         pool)      vector)     layer)    ilities)

  low-level features  ------------>  mid-level  ------------>  high-level  --->  decision
  (edges, colours)                  (shapes, corners)         (parts, objects)
```

*(This is essentially LeNet-5 — name-drop it for extra credit.)*

### Hierarchical feature extraction [🔥 Dec-24 direct question]

- **Early conv layers** → detect **low-level features**: edges, lines, colour blobs.
- **Middle conv layers** → combine edges into **mid-level features**: corners, curves, textures, simple shapes.
- **Deep conv layers** → combine shapes into **high-level features**: eyes, wheels, faces, whole objects.
- **Dense layers** → combine high-level features to make the final class decision.
- Each layer builds ON TOP of the previous layer's output — this stacking is what "deep" means.

### Why is the image downscaled while filter count increases? [🔥 May-23 direct question]

- **Spatial size shrinks (downscaling):** pooling + stride reduce W×H → computation stays affordable, and each deeper neuron sees a **larger receptive field** of the original image (a 3×3 filter on a pooled map "sees" 6×6 of the original).
- **Number of filters grows (e.g. 6 → 16 → 32 → 64):** deeper layers must represent **many more feature combinations** (there are few edge types, but thousands of possible object parts) — more filters = more feature vocabulary.
- Net effect: the network **trades spatial resolution for semantic richness** — WHERE information decreases, WHAT information increases.
- Memory stays balanced: `28×28×6 ≈ 4700 values`, `5×5×16 = 400 values` — the volume gets "taller and thinner".

**Example to close with:** classifying handwritten digits (MNIST 28×28): layer-1 filters find strokes, layer-2 finds loops/junctions, dense layer decides "this loop-on-a-stick is a 9".

> **✍️ 7-mark answer skeleton (How CNN operates / CNN architecture):**
> 1. Open with the definition of CNN (local receptive fields + weight sharing + subsampling).
> 2. Headings: (i) Input volume, (ii) Convolution + ReLU, (iii) Pooling, (iv) Flatten, (v) Dense, (vi) Softmax + loss.
> 3. Draw the **full pipeline diagram** with sizes (32×32×3 → … → 10 classes) and label low/mid/high-level features under it.
> 4. If asked "why downscale + more filters": add the resolution-vs-richness trade-off paragraph.
> 5. Close with the MNIST digit example.

**⚠️ Common mistake:** writing "CNN has convolution layers" without ever explaining WHAT convolution computes (the sliding dot product). Always show one small worked convolution.

---

## 2. Input Channels (RGB) [⚠️ Never asked — DUE, cheap 2-3 marks inside any answer]

**Definition:** Input channels are the **depth slices** of the input volume — separate 2-D grids that together describe each pixel.

- **Grayscale image** → 1 channel → shape `H × W × 1` (MNIST: `28×28×1`).
- **Colour image** → 3 channels (Red, Green, Blue) → shape `H × W × 3` (CIFAR-10: `32×32×3`).
- A filter always has the **same depth as its input**: a "3×3 filter" on an RGB image is really `3×3×3` = 27 weights (+1 bias).
- One filter, whatever its depth, produces **ONE 2-D feature map** (the depth-wise products are summed).
- Number of **output channels = number of filters** in that layer — so channels grow as we stack layers (3 → 32 → 64 …).

```
  R channel  \
  G channel   }--> one 3x3x3 filter --> one 2-D feature map
  B channel  /        (27 weights)
```

**Example:** a filter with high weights on the R slice and low on G/B acts as a "red detector" — it fires on red patches (useful for detecting stop signs).

**⚠️ Common mistake:** saying a 3×3 filter on RGB has 9 weights — it has 3×3×**3** = 27 (+1 bias).

---

## 3. Convolution Layer [🔥 Core of May-23 / Dec-24 architecture questions — MUST DO]

**Definition:** The convolution layer applies a set of small learnable filters (kernels) across the input; at each position it computes the **dot product between filter weights and the image patch**, producing a feature map that shows WHERE that feature occurs.

### The convolution operation — worked example

Input 5×5 (binary image), Filter 3×3, Stride 1, No padding → Output 3×3:

```
 Input (5x5)        Filter (3x3)          Output (3x3)
 1 1 1 0 0
 0 1 1 1 0           1 0 1                 4 3 4
 0 0 1 1 1           0 1 0                 2 4 3
 0 0 1 1 0           1 0 1                 2 3 4
 0 1 1 0 0
```

Top-left output = overlap the filter on the top-left 3×3 patch and sum products:
`(1×1)+(1×0)+(1×1)+(0×0)+(1×1)+(1×0)+(0×1)+(0×0)+(1×1) = 4`
Then slide the filter right by the stride and repeat.

### Key terms (write as headed bullets)

- **Filter / Kernel:** small weight matrix (3×3, 5×5) that detects ONE pattern; weights are **learned** by backpropagation, not hand-designed.
- **Feature map (activation map):** the 2-D output grid — high values = "feature present here".
- **Receptive field:** the region of input a single output neuron sees (equals filter size at layer 1, grows with depth).
- **Weight sharing:** the SAME filter weights are used at every image position → drastic parameter reduction + translation invariance.
- **Local connectivity:** each output neuron connects only to a small patch, not to the whole image.

### Parameter-count example (MEMORIZE — asked inside architecture questions)

`Parameters per conv layer = (F × F × D_in + 1) × K`  (the +1 is bias, K = number of filters)

- Layer: 6 filters of 5×5 on RGB input (depth 3):
  `(5×5×3 + 1) × 6 = 76 × 6 = 456 parameters`
- Compare: a dense layer from the same `32×32×3 = 3072` inputs to just 100 neurons:
  `3072 × 100 + 100 = 3,07,300 parameters` — **~674× more** (3,07,300 / 456 ≈ 673.9). This is WHY CNNs work on images.

> **✍️ 7-mark answer skeleton (Convolution layer / convolution operation):**
> 1. Definition line (learnable filters slide over input, dot product → feature map).
> 2. Headings: (i) The operation — show the 5×5 ⊛ 3×3 worked example with the corner sum = 4, (ii) Filter/kernel + feature map, (iii) Weight sharing + local connectivity, (iv) Receptive field, (v) Parameter count `(F·F·D_in + 1)·K` with the 456 example.
> 3. Draw the **5×5 ⊛ 3×3 worked example** grid.
> 4. Close with the CNN-vs-ANN parameter comparison (456 vs 3,07,300 — ~674×).

**⚠️ Common mistake:** forgetting the input-depth term and the bias in parameter counts — it is `(F·F·D_in + 1)·K`, not `F·F·K`.

---

## 4. Stride [⚠️ Never asked directly — DUE, likely next; also feeds every numerical]

**Definition:** Stride `S` is the number of pixels the filter jumps each time it slides. `S = 1` → move one pixel at a time (dense scanning); `S = 2` → skip alternate positions (output roughly halves).

- **Effect on output size:** larger stride → smaller feature map → fewer computations.
- **Stride as downsampling:** `S = 2` convolution is a modern alternative to pooling (used in ResNet).
- **Trade-off:** big strides are fast but can skip over fine details.

```
 Stride 1:  [##.....]  ->  [.##....]  -> [..##...]   (overlapping steps)
 Stride 2:  [##.....]  ->  [..##...]  -> [....##.]   (jumps 2 → half the outputs)
```

**Example:** 7×7 input, 3×3 filter, S=1 → 5×5 output; same input with S=2 → `(7−3)/2 + 1 = 3` → 3×3 output.

**⚠️ Common mistake:** choosing W, F, S that make `(W−F+2P)/S` non-integer — in the exam always pick numbers that divide cleanly (check before writing!).

---

## 5. Padding [🔥 PYQ May-24, Jun-25 — MUST DO]

**Definition:** Padding means adding extra border pixels (usually zeros) around the input image before convolution, so that the filter can also sit on the corners/edges and the output size can be controlled.

### Why padding is needed

- **Prevents shrinking:** without padding every conv layer shrinks the map (32→28→24 …) — deep nets would run out of pixels.
- **Preserves border information:** corner pixels are covered by the filter only once without padding; with padding they get fair treatment.
- **Lets us build deep networks:** "same" padding keeps size constant so we can stack 50+ layers.

### Types of padding (the May-24 question)

| Basis | **Valid padding** | **Same (zero) padding** |
|---|---|---|
| Meaning | NO padding added (P = 0) | Add zeros so output size = input size |
| Output size | `(W − F)/S + 1` (shrinks) | `W` (unchanged, for S = 1) |
| P value needed | 0 | `P = (F − 1)/2` (odd F) |
| Border pixels | Under-used, information lost | Fully used |
| When used | When shrinking is acceptable/desired | Deep networks (VGG uses same everywhere) |
| Memory/compute | Less | Slightly more |

*(Some books also mention **full padding** — P = F−1, output GROWS; mention in one line for completeness.)*

### How it works — example

5×5 input, 3×3 filter, S=1:
- **Valid:** output = `(5−3)/1 + 1 = 3` → 3×3 (shrunk).
- **Same:** pad with P = `(3−1)/2 = 1` ring of zeros → 7×7 padded input → output = `(5−3+2)/1 + 1 = 5` → 5×5 (size preserved).

```
 Same padding (P=1) on a 5x5 input:

   0 0 0 0 0 0 0
   0 x x x x x 0        zeros form a border ring;
   0 x x x x x 0        filter can now be centred
   0 x x x x x 0        on true corner pixels
   0 x x x x x 0
   0 x x x x x 0
   0 0 0 0 0 0 0
```

**Mnemonic:** **VALID** = "**V**anishing size" (shrinks). **SAME** = "**S**ize **A**lways **M**aintained **E**qual".

> **✍️ 7-mark answer skeleton (Define padding + types):**
> 1. Opening definition line (border of zeros added before convolution).
> 2. Headings: (i) Why needed — shrinkage + border loss, (ii) Valid padding, (iii) Same padding, (iv) Formula `P=(F−1)/2`, (v) Effect on output size.
> 3. Draw the **zero-ring diagram** above.
> 4. Include the **valid vs same table**.
> 5. Close with the 5×5/3×3 numerical example (3×3 vs 5×5 output).

**⚠️ Common mistake:** writing "padding increases image information" — zeros add NO information; they only preserve size and border coverage.

---

## 6. Output Size Formula — THE formula of this unit [🔥 needed in May-23/24, Dec-24, Jun-25 answers]

**`O = (W − F + 2P)/S + 1`**

where `W` = input width (or height), `F` = filter size, `P` = padding, `S` = stride. Apply separately to width and height. Output depth = number of filters `K`.

### Worked examples (practice until automatic)

| # | Input W | Filter F | Padding P | Stride S | Working | Output |
|---|---|---|---|---|---|---|
| 1 | 32 | 5 | 0 (valid) | 1 | `(32−5+0)/1 + 1` | **28×28** |
| 2 | 32 | 5 | 2 (same) | 1 | `(32−5+4)/1 + 1` | **32×32** |
| 3 | 7 | 3 | 0 | 2 | `(7−3+0)/2 + 1` | **3×3** |
| 4 (pool) | 28 | 2 | 0 | 2 | `(28−2)/2 + 1` | **14×14** |
| 5 (AlexNet-1) | 227 | 11 | 0 | 4 | `(227−11)/4 + 1` | **55×55** |

- With 6 filters, example 1 gives a full output volume of `28×28×6`.
- Pooling uses the same formula with P = 0 (never pad a pooling layer).

**⚠️ Common mistake:** forgetting the `+1` at the end, or forgetting that P is added **twice** (`2P` — once per side).

---

## 7. Pooling Layer (Subsampling) [🔥 PYQ Dec-24 — MUST DO]

**Definition:** The pooling layer performs **subsampling** — it slides a small window (usually 2×2, stride 2) over each feature map independently and replaces the window with ONE summary value, reducing width and height while keeping depth unchanged.

### How pooling reduces spatial dimensions (Dec-24 question)

- A `2×2` window with `S = 2` covers the map in non-overlapping blocks → output is `W/2 × H/2` → **75% of values removed** per map.
- Formula: `O = (W − F)/S + 1` → e.g. `(28−2)/2 + 1 = 14`.
- Depth is untouched: `28×28×6 → 14×14×6`.
- **No parameters are learned** — pooling is a fixed operation (max or average).

### Max pooling vs Average pooling — worked 4×4 → 2×2 example (S=2)

```
 Input feature map (4x4)      MAX pool 2x2        AVG pool 2x2
   1  3 | 2  8
   5  7 | 1  5                  7   8               4   4
  ------+------
   4  2 | 6  0                  4   6               2   3
   0  2 | 4  2

 (each 2x2 block -> its max)  (each block -> its average: (1+3+5+7)/4 = 4, ...)
```

| Basis | **Max pooling** | **Average pooling** |
|---|---|---|
| Value kept | Largest in window | Mean of window |
| Keeps | Strongest feature (sharp edges) | Overall smooth response |
| Noise | Robust to small noise | Averages noise in |
| Usage | Default in hidden layers (VGG, AlexNet) | Global Average Pooling before output (GoogLeNet) |

### Why pooling helps (headed bullets for the answer)

- **Computation ↓:** quarter the values → all later layers 4× cheaper.
- **Translation invariance:** if the feature shifts by 1 pixel, max of the window often stays the same.
- **Overfitting ↓:** fewer values = less to memorize.
- **Bigger receptive field:** later filters see more of the original image.

**Example to close with:** face detection — max pooling keeps the "eye detected!" signal even if the eye moves a few pixels between photos.

> **✍️ 7-mark answer skeleton (How pooling reduces spatial dimensions):**
> 1. Definition of pooling/subsampling (window + summary value, no learned weights).
> 2. Headings: (i) Working with 2×2/S=2, (ii) Output formula + `28→14` numerical, (iii) Max vs Average (table), (iv) Benefits (compute, invariance, overfitting), (v) Depth unchanged.
> 3. Draw the **4×4 → 2×2 worked example** for BOTH max and average.
> 4. Close with the face-detection shift-invariance example.

**⚠️ Common mistake:** saying pooling reduces the number of channels — it only reduces W×H; **depth stays the same**.

---

## 8. Flattening [⚠️ Never asked — DUE, likely next]

**Definition:** Flattening converts the final 3-D feature volume from the conv/pool stack into a **1-D column vector** so it can be fed to fully connected (dense) layers.

- Pure **reshaping** — no weights, no learning, no information loss (just reordering).
- `5×5×16` volume → `5 × 5 × 16 = 400 × 1` vector.
- It is the **bridge** between the *feature-extraction* half (conv/pool) and the *classification* half (dense/softmax) of a CNN.

```
  5x5x16 volume            Flatten             400x1 vector
  [ ][ ][ ]...      -->   row by row,    -->     [x1]
  [ ][ ][ ]...            map by map             [x2]
  (3-D stack)                                    ...
                                                 [x400]
```

- **Modern alternative:** Global Average Pooling (average each map to a single number → `16×1`) — fewer parameters, less overfitting; mention it for extra credit.

**Example:** in the Keras code below, `Flatten()` sits exactly between `MaxPooling2D` and `Dense`.

**⚠️ Common mistake:** calling flattening a "layer that learns" — it has **zero parameters**.

---

## 9. Dense (Fully Connected) Layer [⚠️ Never asked — DUE]

**Definition:** A dense layer connects **every** input value to **every** neuron (`y = f(Wx + b)`); in a CNN it sits after flattening and combines all extracted features to make the final decision.

- **Role in CNN:** conv layers answer "*what features are present and where*"; dense layers answer "*which class do these features add up to*".
- **Parameters:** `(inputs × neurons) + neurons` → 400 → 120 dense layer = `400×120 + 120 = 48,120` — dense layers hold **most of a classic CNN's parameters**.
- **Typical ending:** `Flatten → Dense(120, ReLU) → Dense(84, ReLU) → Dense(10, Softmax)`.

| Basis | Convolution layer | Dense layer |
|---|---|---|
| Connectivity | Local (small patch) | Global (all inputs) |
| Weight sharing | Yes | No |
| Preserves spatial layout | Yes | No (needs flattened input) |
| Parameter count | Small | Large |
| Job | Feature extraction | Classification/decision |

**Example:** the last `Dense(10, softmax)` of a digit classifier outputs 10 probabilities — one per digit 0-9.

**⚠️ Common mistake:** putting a Dense layer before Flatten in the code sketch — dense layers need 1-D input.

---

## 10. Loss Layer [⚠️ Never asked — DUE]

**Definition:** The loss (cost) layer is the **final layer during training**; it compares the network's prediction with the true label and outputs a single error number that backpropagation minimizes.

### Common loss functions (know 3)

- **Softmax + Categorical Cross-Entropy** — multi-class classification (the CNN default):
  `Softmax: p_i = e^(z_i) / Σ e^(z_j)` then `L = −Σ y_i log(p_i)`
- **Binary Cross-Entropy** — 2-class problems (cat vs dog): `L = −[y log p + (1−y) log(1−p)]`
- **Mean Squared Error (MSE)** — regression outputs (predicting age from a face): `L = (1/n) Σ (y − ŷ)²`

### Its role in training

1. Forward pass → prediction `p`.
2. Loss layer → error `L(p, y)`.
3. Backward pass → gradients `∂L/∂w` flow back through dense → pool → conv layers.
4. Optimizer (SGD/Adam) updates every filter weight.

**Example:** true class "cat" (y = 1) but network says p(cat) = 0.25 → loss = −log 0.25 ≈ 1.39 (high); a confident correct p = 0.9 gives −log 0.9 ≈ 0.10 (low).

**⚠️ Common mistake:** using MSE for classification in an answer — cross-entropy is the correct pairing with softmax.

---

## 11. 1×1 Convolution (Network-in-Network) [⚠️ Never asked — DUE, likely next; feeds the Inception answer]

**Definition:** A 1×1 convolution uses a filter of size `1×1×D` — it looks at ONE pixel position across **all input channels** and computes a weighted combination of them, acting like a tiny fully-connected layer applied at every pixel.

### What it is good for (headed bullets)

- **Channel/dimensionality reduction:** `28×28×192 --(32 filters of 1×1)--> 28×28×32` — same W×H, depth squeezed 6×.
- **Computation reduction (bottleneck):** shrink channels BEFORE an expensive 3×3/5×5 conv (numbers below).
- **Adds non-linearity:** each 1×1 conv is followed by ReLU → deeper representation at almost no cost.
- **Cross-channel mixing:** learns which channel combinations matter at each location.

### The famous computation-saving example (MEMORIZE for Inception)

Input `28×28×192`, want output `28×28×32` via 5×5 conv:

- **Direct 5×5:** multiplications ≈ `28×28×32 × 5×5×192` ≈ **120 million**
- **Bottleneck:** first 1×1 to 16 channels: `28×28×16 × 192` ≈ 2.4M, then 5×5: `28×28×32 × 5×5×16` ≈ 10M → total ≈ **12.4 million**
- → **~10× cheaper** with almost no accuracy loss. This trick makes the Inception network feasible.

**Example one-liner:** "a 1×1 conv is a channel-blender — it never looks at neighbours, only mixes the colours of one pixel."

**⚠️ Common mistake:** "1×1 conv does nothing since the filter sees one pixel" — it spans the FULL depth (1×1×192 = 192 weights), so it absolutely computes something.

---

## 12. Inception Network (GoogLeNet) [🔥 PYQ May-23, Dec-24 — MUST DO]

**Definition:** The Inception network (GoogLeNet, winner ILSVRC-2014, 22 layers) is a CNN built from **Inception modules** — blocks that apply **1×1, 3×3, 5×5 convolutions and 3×3 max-pooling in PARALLEL** on the same input and concatenate all their outputs depth-wise, letting the network choose the right filter size automatically.

### Motivation (why parallel filters?)

- The "right" filter size depends on the object scale: a small dog in the corner suits 3×3; a large dog filling the frame suits 5×5.
- Instead of choosing one size, Inception **computes all sizes and lets training decide** the mix.
- Naively this is too costly → **1×1 bottlenecks** before 3×3/5×5 slash computation ~10× (example in the 1×1 section).

### Inception module diagram (DRAW THIS — both PYQs reward it)

```
                        Input (28x28x192)
          +-----------+--------+---------+------------+
          |           |                  |            |
       1x1 conv    1x1 conv           1x1 conv    3x3 MAXPOOL
        (64)      (96) [reduce]     (16) [reduce]  (stride 1, same)
          |           |                  |            |
          |        3x3 conv           5x5 conv     1x1 conv
          |         (128)               (32)         (32)
          |           |                  |            |
          +-----------+--------+---------+------------+
                               |
                 DEPTH CONCATENATION  ->  28x28x(64+128+32+32) = 28x28x256
```

Key points to label: all four branches keep the SAME 28×28 spatial size (same padding, pool stride 1) so their outputs can be stacked along depth.

### Architecture facts (headed bullets)

- **4 parallel branches:** 1×1 | 1×1→3×3 | 1×1→5×5 | pool→1×1. **Mnemonic: "1-3-5-Pool".**
- **1×1 bottlenecks:** reduce channels before big filters → 22 layers deep with only **~5M parameters** (AlexNet had 60M).
- **9 Inception modules** stacked in GoogLeNet.
- **Global Average Pooling** instead of giant dense layers at the end → huge parameter saving.
- **Auxiliary classifiers:** two small side softmax branches inject gradient into middle layers during training (fight vanishing gradients); removed at test time.
- **Later versions:** Inception-v2/v3 factorize 5×5 into two 3×3s; Inception-ResNet adds skip connections (one line is enough).

> **✍️ 7-mark answer skeleton (Inception network):**
> 1. Definition line (GoogLeNet, 2014, parallel multi-scale filters + concatenation).
> 2. Headings: (i) Motivation — which filter size?, (ii) The 4 branches, (iii) Role of 1×1 bottlenecks + the 120M→12.4M numbers, (iv) Auxiliary classifiers + Global Avg Pooling, (v) 22 layers/5M params vs AlexNet 60M.
> 3. Draw the **Inception module diagram** with channel numbers.
> 4. Close with: "network learns WHICH scale matters instead of us hand-picking filter size."

**⚠️ Common mistake:** drawing the four branches in SERIES — they are strictly PARALLEL, then concatenated along depth.

---

## 13. Transfer Learning [🔥 PYQ May-23, May-24 — MUST DO]

**Definition:** Transfer learning is the technique of taking a network **pre-trained on a large dataset** (e.g. VGG16/ResNet on ImageNet, ~1.2M images, 1000 classes) and **reusing its learned features** for a new, related task that has much less data.

**Why it works:** early conv layers learn **generic** features (edges, textures, colours) that are useful for ANY vision task; only the last layers are task-specific — so we keep the generic part and retrain the specific part.

```
   Pre-trained CNN (ImageNet)
   +--------------------------------+     +--------------------+
   |  Conv blocks 1..N              |     |  New dense head    |
   |  generic features:             | --> |  (your classes,    |
   |  edges -> textures -> parts    |     |   e.g. 2 outputs)  |
   +--------------------------------+     +--------------------+
        FROZEN (or fine-tuned)              TRAINED on small
                                            new dataset
```

### Types of transfer learning (the May-24 question)

| Basis | **Feature extraction** | **Fine-tuning** |
|---|---|---|
| Conv base | **Frozen** — weights never change | **Top few conv blocks unfrozen** and retrained |
| What trains | Only the new dense head | New head + unfrozen conv layers |
| Data needed | Very little (hundreds of images) | Moderate (thousands) |
| Compute | Cheap and fast | Slower |
| Learning rate | Normal | Very LOW (protect pre-trained weights) |
| Risk | May underfit if new task differs a lot | Overfits if data too small |
| Use when | New task ≈ original task, tiny dataset | New task differs somewhat, more data |

*(Also mention in one line: "pre-trained as initialization" — retrain everything, warm start, needs the most data.)*

### Benefits of transfer learning (the May-23 question — write 5)

- **Less data needed:** generic features come free; hundreds of images can suffice.
- **Much faster training:** only a small head trains — minutes instead of days.
- **Better accuracy:** ImageNet features beat features learned from a tiny dataset.
- **Lower cost:** no need for GPU-weeks; big labs pay the pre-training bill once.
- **Better generalization / less overfitting:** frozen generic features act as a regularizer.

**Example to close with:** medical X-ray classifier with only 2,000 labelled images — take ResNet50 pre-trained on ImageNet, freeze the conv base, replace the 1000-class head with a 2-class head (pneumonia / normal), train for a few epochs → ~90%+ accuracy that would be impossible from scratch.

> **✍️ 7-mark answer skeleton (Transfer learning types / benefits):**
> 1. Definition line (reuse pre-trained network's features for a new small-data task).
> 2. Headings: (i) Why it works — generic vs specific layers, (ii) Feature extraction, (iii) Fine-tuning, (iv) Comparison table, (v) Benefits (pick 5).
> 3. Draw the **frozen-base + new-head diagram**.
> 4. Close with the X-ray/ResNet50 example.

**⚠️ Common mistake:** fine-tuning with a large learning rate — it destroys the pre-trained weights ("catastrophic forgetting"); always say "small LR".

---

## 14. One-Shot Learning [⚠️ Never asked — DUE, likely next (pairs naturally with transfer learning)]

**Definition:** One-shot learning is the problem of recognizing a class from **just ONE (or very few) training example(s)** — instead of learning "who is this person", the network learns a **similarity function**: are these two images of the same class?

### Why normal CNNs fail here

- A softmax classifier needs many examples per class AND retraining whenever a new class (new employee's face) is added.
- One-shot systems need **no retraining** for new classes — just store one reference image.

### Siamese network (the standard solution — DRAW THIS)

```
 Image A ---> [ CNN ] ---> embedding f(A) ----+
               (shared                        |--> distance d = || f(A) - f(B) ||
                weights)                      |     d small -> SAME person
 Image B ---> [ CNN ] ---> embedding f(B) ----+     d large -> DIFFERENT person
```

- **Two identical CNNs with SHARED weights** map each image to an embedding vector (e.g. 128-D).
- Trained with **contrastive loss** or **triplet loss**: `L = max(0, d(A,P) − d(A,N) + margin)` — pull an Anchor towards a Positive (same class), push it from a Negative (different class).
- At test time: compare the new image's embedding with the single stored reference; threshold the distance.

### Applications

- **Face recognition / verification:** office attendance system — one photo per employee (FaceNet, DeepFace).
- **Signature verification:** one genuine specimen per customer.
- **Passport/ID checking at airports:** match live face to one chip photo.

| Basis | Transfer learning | One-shot learning |
|---|---|---|
| Data for new class | Small dataset (100s) | ONE example |
| Output | Class probabilities | Similarity/distance |
| New class added | Retrain the head | Just store one embedding |
| Core idea | Reuse features | Learn to compare |

**⚠️ Common mistake:** calling the two Siamese branches "two different networks" — it is ONE network applied twice (shared weights is the whole point).

---

## 15. Dimension Reduction [🔥 PYQ May-22 (PCA), May-24 (curse), Jun-25 (in detail) — MUST DO, 3/5 years]

**Definition:** Dimension reduction is the process of reducing the number of input features/variables while **retaining maximum useful information**, either by selecting features (feature selection) or by transforming them to a smaller set of new features (feature extraction).

### Why high-dimensional data is challenging — Curse of Dimensionality (May-24 question)

- **Data sparsity:** to keep the same sample density, data needed grows **exponentially** with dimensions — 10 points cover a 1-D line, ~10² a square, ~10³ a cube.
- **Distance concentration:** in high-D, nearest and farthest neighbours become almost equidistant → distance-based methods (KNN, K-means) break down.
- **Overfitting:** more features than samples → the model memorizes noise.
- **Computation & storage cost:** time/memory grow with dimensions.
- **Visualization impossible** beyond 3-D; **redundant/correlated** features add noise, not information.

### Two families of dimension reduction (Jun-25 "in detail" answer)

| Family | Idea | Examples |
|---|---|---|
| **Feature selection** | KEEP a subset of original features, drop the rest | Filter (correlation), Wrapper (forward/backward selection), Embedded (LASSO) |
| **Feature extraction** | TRANSFORM to new, fewer features (combinations of old) | **PCA**, LDA, t-SNE, Autoencoders, Kernel PCA |

- **PCA** — unsupervised; finds directions of maximum variance.
- **LDA** — supervised; finds directions that best separate classes.
- **t-SNE** — non-linear, for 2-D/3-D visualization only.
- **Autoencoder** — neural network squeezed through a small bottleneck layer; the bottleneck IS the reduced representation.
- **In CNNs specifically:** pooling, stride > 1 and **1×1 convolutions** all perform dimension reduction inside the network.

### PCA — Principal Component Analysis (May-22 question; MEMORIZE the 5 steps)

**Definition:** PCA is an unsupervised linear technique that transforms correlated features into a smaller set of uncorrelated **principal components (PCs)**, ordered so that PC1 captures maximum variance, PC2 the next most (perpendicular to PC1), and so on.

**Steps — Mnemonic: "Smart Cats Eat Small Pigeons"**

1. **S — Standardize** the data: `z = (x − mean)/std` (so large-scale features don't dominate).
2. **C — Covariance matrix** `C = (1/n) XᵀX` — how features vary together.
3. **E — Eigen-decomposition:** find eigenvalues and eigenvectors of C. Eigenvectors = directions (PCs); eigenvalues = variance captured by each.
4. **S — Sort & Select:** order eigenvalues descending; keep top k eigenvectors (e.g. enough for 95% cumulative variance).
5. **P — Project:** `X_reduced = X · W_k` (W_k = matrix of top-k eigenvectors) → n features become k features.

```
   x2 |    .  ..                PC1 = direction of max spread
      |  . . ..  .          .
      | . .. . .        (data cloud tilts along PC1;
      |. .  .              projecting onto PC1 alone
      +------------- x1    keeps most information)
```

- **Explained variance ratio:** `eigenvalue_i / Σ eigenvalues` — say "we keep PCs covering ~95%".
- **Properties:** PCs are orthogonal (uncorrelated); PCA is unsupervised (ignores labels); sensitive to scaling (hence standardize first).
- **Limitations:** only linear; components are hard to interpret; variance ≠ always importance.

**Example to close with:** 13-feature wine dataset → PCA keeps 2 PCs covering ~55-60% variance → plot in 2-D and the three wine cultivars form visible clusters; or MNIST 784 pixels → 50 PCs with ~95% variance retained.

> **✍️ 7-mark answer skeleton (PCA / dimension reduction):**
> 1. Definition line (reduce features, keep information).
> 2. Headings: (i) Curse of dimensionality — 4 bullets, (ii) Feature selection vs feature extraction, (iii) PCA 5 steps (Standardize→Covariance→Eigen→Select→Project), (iv) Explained variance, (v) Limitations.
> 3. Draw the **PC1 direction scatter diagram**.
> 4. Close with the wine/MNIST example.

**⚠️ Common mistake:** skipping standardization before PCA — without it, one large-scale feature (e.g. salary in ₹) hijacks PC1.

---

## 16. CNN Implementation — TensorFlow & Keras [🔥 PYQ Dec-24, Jun-25 — MUST DO]

### Role of TensorFlow in implementing/training CNNs (Dec-24 question)

**Definition:** TensorFlow is Google's open-source, end-to-end deep-learning framework that represents computation as **dataflow graphs on tensors** (n-dimensional arrays) and executes them efficiently on CPU/GPU/TPU.

**What TensorFlow provides for CNNs (headed bullets — write 6):**

- **Ready-made layers:** `Conv2D`, `MaxPooling2D`, `Flatten`, `Dense`, `Dropout`, `BatchNormalization` — no manual convolution code.
- **Automatic differentiation (autograd):** computes all backpropagation gradients automatically — you never derive `∂L/∂w` by hand.
- **Optimizers built-in:** SGD, Adam, RMSprop with one line.
- **Hardware acceleration:** same code runs on GPU/TPU → trains CNNs 10-100× faster.
- **Keras high-level API:** `tf.keras` gives the simple Sequential/Functional model-building style.
- **Data pipeline + deployment:** `tf.data` for efficient batching/augmentation; TensorBoard for monitoring; TF-Lite / TF-Serving to deploy the trained CNN to mobile/servers.
- **Pre-trained models:** `tf.keras.applications` (VGG16, ResNet50, InceptionV3) for transfer learning.

*(Keras = high-level API; TensorFlow = the engine underneath. Since TF 2.x, Keras ships inside TensorFlow as `tf.keras`.)*

### Process of implementing a CNN in TensorFlow/Keras (Jun-25 question — the 7 steps)

1. **Import & load data** — e.g. MNIST from `tf.keras.datasets`.
2. **Preprocess** — normalize pixels to 0-1, reshape to `(28,28,1)`, one-hot labels if needed.
3. **Build the model** — stack Conv2D → MaxPooling2D → … → Flatten → Dense → Softmax.
4. **Compile** — choose optimizer (`adam`), loss (`sparse_categorical_crossentropy`), metric (`accuracy`).
5. **Train** — `model.fit(...)` with epochs, batch size, validation data.
6. **Evaluate** — `model.evaluate(...)` on the test set.
7. **Predict / save** — `model.predict(...)`, `model.save(...)`.

**Mnemonic:** **"I Pray Before Class Tests, Evaluations & Practicals"** → Import, Preprocess, Build, Compile, Train, Evaluate, Predict.

### Keras code sketch (REPRODUCE THIS in the exam — examiners love it)

```python
import tensorflow as tf
from tensorflow.keras import layers, models

# 1-2. Load and preprocess
(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1) / 255.0   # normalize to 0-1
x_test  = x_test.reshape(-1, 28, 28, 1) / 255.0

# 3. Build the CNN
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')        # 10 digit classes
])

# 4. Compile
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# 5. Train
model.fit(x_train, y_train, epochs=5, batch_size=32,
          validation_data=(x_test, y_test))

# 6-7. Evaluate and predict
test_loss, test_acc = model.evaluate(x_test, y_test)
predictions = model.predict(x_test[:5])
```

> **✍️ 7-mark answer skeleton (TensorFlow role / implementation process):**
> 1. Definition line (open-source framework, tensors + dataflow graphs, CPU/GPU/TPU).
> 2. Headings: (i) Built-in layers, (ii) Automatic differentiation, (iii) Optimizers & GPU speed, (iv) tf.keras API, (v) 7 implementation steps (I-P-B-C-T-E-P), (vi) Deployment/TensorBoard.
> 3. Instead of a diagram, write the **code sketch** (even 10 lines of it earns the marks).
> 4. Close with: "5 epochs on MNIST reaches ~99% test accuracy".

**⚠️ Common mistake:** forgetting `model.compile()` before `model.fit()` in the code — compile is where loss + optimizer are attached.

---

## 17. Overfitting & Underfitting in CNNs [🔥 PYQ May-23 — MUST DO]

**Definition:** Overfitting = model learns the training data **too well including noise** — high train accuracy, poor test accuracy. Underfitting = model is **too simple to learn even the training data** — poor accuracy on both.

### How to IDENTIFY (the May-23 "identify" half)

| Symptom | Overfitting | Underfitting |
|---|---|---|
| Training accuracy | Very high (e.g. 99%) | Low (e.g. 65%) |
| Validation/test accuracy | Much lower (e.g. 78%) | Also low (≈ train) |
| Gap train vs val | LARGE | Small (both bad) |
| Loss curves | Val loss falls then RISES while train loss keeps falling | Both losses plateau high |

```
 Loss                                    Loss
  |\                                      |
  | \   train                             |------____   train (stays high)
  |  \______                              |------____   val   (stays high)
  |   \    val rises ->  ___/             |
  |    \      ______/                     |
  +-----------------------> epochs        +------------------> epochs
        OVERFITTING                            UNDERFITTING
```

### How to FIX overfitting in a CNN — Mnemonic: **"DR. ABE"**

- **D — Dropout:** randomly switch off neurons (rate 0.25-0.5) during training → prevents co-adaptation.
- **R — Regularization (L2/weight decay):** penalize large weights in the loss.
- **A — Augmentation:** rotate/flip/shift/zoom training images → artificially bigger dataset (the single most effective CNN fix).
- **B — Batch normalization:** normalizes layer inputs; mild regularizing effect + stabler training.
- **E — Early stopping:** stop at the epoch where validation loss is minimum.
- *(Bonus: get more data; use transfer learning; make the network smaller.)*

### How to FIX underfitting

- **Increase capacity:** more filters, more layers.
- **Train longer** (more epochs) with a suitable learning rate.
- **Reduce regularization/dropout** (it's suffocating the model).
- **Better features/input size**; check for bugs (unnormalized input is a classic cause).

**Example to close with:** CNN with train acc 99%, val acc 72% → clearly overfitting → adding augmentation (flips/rotations) + Dropout(0.5) + early stopping raises val acc to ~90%.

> **✍️ 7-mark answer skeleton (identify + fix over/underfitting):**
> 1. Two-line definitions of both.
> 2. Headings: (i) Identification table (train vs val gap), (ii) Loss-curve diagram, (iii) Fix overfitting — DR. ABE (5 bullets), (iv) Fix underfitting (3 bullets).
> 3. Draw the **two loss-curve diagrams**.
> 4. Close with the 99%/72% example.

**⚠️ Common mistake:** offering "add more layers" as an overfitting fix — that makes it WORSE; more capacity fixes UNDERfitting.

---

## ⚡ Quick Revision Box

### One-liner per topic

| Topic | One line to remember |
|---|---|
| CNN | Local filters + weight sharing + subsampling learn a feature hierarchy: edges → shapes → parts → objects. |
| Hierarchical extraction | Each conv layer builds bigger features from the previous layer's smaller ones. |
| Downscale-vs-filters | Depth trades WHERE (resolution ↓) for WHAT (feature richness ↑). |
| Input channels | RGB = depth 3; filter depth always equals input depth; #filters = #output channels. |
| Convolution layer | Sliding dot product of a learnable kernel → feature map. |
| Stride | Jump size of the filter; S=2 ≈ built-in downsampling. |
| Padding | Zero border; VALID = none (shrinks), SAME = size preserved with `P=(F−1)/2`. |
| Pooling | 2×2/S=2 window keeps max (or avg) → W,H halve, depth unchanged, 0 parameters. |
| Flattening | Reshape 3-D volume → 1-D vector; zero parameters; bridge to dense layers. |
| Dense layer | Every-to-every connections; does the final classification; most parameters live here. |
| Loss layer | Softmax + cross-entropy compares prediction vs truth; backprop minimizes it. |
| 1×1 convolution | Per-pixel channel mixer; squeezes depth; ~10× compute saving as a bottleneck. |
| Inception | 1-3-5-Pool parallel branches, depth-concatenated; 22 layers, only ~5M params. |
| Transfer learning | Reuse ImageNet features: freeze base (feature extraction) or unfreeze top (fine-tuning, low LR). |
| One-shot learning | Siamese twins with shared weights learn a distance function; 1 photo per person. |
| Curse of dimensionality | Data needs grow exponentially; distances lose meaning; overfitting rises. |
| PCA | Standardize → Covariance → Eigen → Select top-k → Project ("Smart Cats Eat Small Pigeons"). |
| TensorFlow | Tensors + autograd + GPU + tf.keras layers = CNN in ~20 lines. |
| Implementation steps | Import → Preprocess → Build → Compile → Train → Evaluate → Predict. |
| Overfitting | Big train-val gap → fix with DR. ABE (Dropout, Regularization, Augmentation, BatchNorm, Early stop). |
| Underfitting | Both accuracies low → bigger model, longer training, less regularization. |

### Every formula in one place

- Output size: `O = (W − F + 2P)/S + 1`
- Same padding: `P = (F − 1)/2`
- Conv parameters: `(F × F × D_in + 1) × K`
- Dense parameters: `(inputs × neurons) + neurons`
- Softmax: `p_i = e^(z_i) / Σ e^(z_j)`
- Cross-entropy: `L = −Σ y_i log(p_i)`
- MSE: `L = (1/n) Σ (y − ŷ)²`
- Triplet loss: `L = max(0, d(A,P) − d(A,N) + margin)`
- PCA explained variance: `λ_i / Σ λ_j`
- Key numericals: `(32−5)/1+1 = 28` · `(32−5+4)/1+1 = 32` · `(28−2)/2+1 = 14` · `(227−11)/4+1 = 55`
- 1×1 saving: 120M → 12.4M multiplications (28×28×192, 5×5, 32 filters, 16-ch bottleneck)

### Diagrams to practice (draw each 3 times on paper)

1. **Full CNN pipeline** with sizes (INPUT → CONV+ReLU → POOL → CONV+ReLU → POOL → FLATTEN → DENSE → SOFTMAX) — needed in 3 different PYQs.
2. **5×5 ⊛ 3×3 convolution** worked example (output 4 in the corner).
3. **Zero-padding ring** on a 5×5 input.
4. **4×4 → 2×2 max AND average pooling** worked example.
5. **Inception module** — 4 parallel branches + depth concat with channel numbers.
6. **Transfer learning** — frozen conv base + new dense head.
7. **Siamese network** — twin CNNs, shared weights, distance output.
8. **PCA scatter** with PC1 arrow.
9. **Overfitting vs underfitting loss curves** (two small graphs).

### 10-minute pre-exam drill

1. Say the pipeline out loud: Conv-Pool-Conv-Pool-Flatten-Dense-Softmax.
2. Recompute: 32×32, F=5 → valid 28, same 32; pool 28 → 14.
3. Recite padding table (valid vs same) and pooling table (max vs avg).
4. Recite "Smart Cats Eat Small Pigeons" (PCA) and "DR. ABE" (overfitting fixes).
5. Sketch the Inception module once and the Keras code's 7 layers once.
