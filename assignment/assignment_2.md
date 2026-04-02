# Assignment 2

## Subject 1: Internet of Things (IoT)

**Q1. Describe the Logical design of IoT.**

The logical design of IoT focuses on the abstract representation of system components — independent of underlying hardware. It defines how functional blocks, communication models, and APIs interact to move data from devices to applications.

**Key elements of logical design:**
- **Functional Blocks** — Device management, data processing, analytics, and application services
- **Communication Models** — Request-Response (HTTP), Publish-Subscribe (MQTT), Push-Pull, Exclusive Pair (WebSockets)
- **Communication APIs** — REST APIs and WebSocket APIs define how devices and services exchange data

The logical design ensures that the system's behavior is well-defined regardless of the specific hardware used. It also defines how security, privacy, and data management policies are enforced across the system.

A well-structured logical design promotes **scalability** — new devices or services can be added without redesigning the entire system — and **interoperability** between heterogeneous devices from different manufacturers.

---

**Q2. What are the key applications of IoT?**

IoT has transformed industries by enabling real-time data collection and automated control across diverse domains.

**Major application areas:**

- **Smart Homes** — Automated lighting, temperature control, security cameras, and voice-controlled appliances (Amazon Echo, Google Nest)
- **Smart Cities** — Intelligent traffic management, smart street lighting, waste management, and connected public transport
- **Healthcare** — Wearables monitoring heart rate, blood glucose, and oxygen levels; remote patient monitoring; smart hospital equipment
- **Industrial IoT (IIoT)** — Predictive maintenance, automated quality control, real-time supply chain visibility, and robotic manufacturing
- **Smart Agriculture** — Soil moisture sensors, drone-based crop monitoring, automated irrigation systems
- **Energy Management** — Smart meters, grid optimization, and demand-response systems
- **Retail** — Smart shelves, inventory tracking via RFID, and personalized in-store experiences

Each application demonstrates IoT's core value: **collecting real-world data, processing it intelligently, and triggering automated actions** to improve efficiency, safety, and quality of life.

---

**Q3. What is Machine-to-Machine (M2M) communication?**

Machine-to-Machine (M2M) communication refers to direct data exchange between devices without human involvement. It forms the technical backbone of IoT, enabling devices to autonomously monitor, report, and respond to conditions.

**How M2M works:**
1. A sensor or device detects a condition or event
2. Data is transmitted via a wired or wireless channel (cellular, Wi-Fi, Ethernet)
3. A receiving device or server processes the data and triggers a response

**M2M vs IoT:**
While M2M focuses on point-to-point device communication, IoT extends this into a broader ecosystem with cloud integration, big data analytics, and user applications.

**Common M2M technologies:**
- Cellular networks (2G/3G/4G/5G)
- Zigbee, Z-Wave for short-range communication
- MQTT protocol for lightweight messaging

**Applications:** Smart meters reporting energy usage to utility companies, connected vehicles sending diagnostics to service centers, ATMs communicating transactions to banks, and industrial machines triggering maintenance alerts automatically.

---

**Q4. Explain SDN (Software Defined Networking) for IoT.**

Software Defined Networking (SDN) is a network architecture that **decouples the control plane from the data plane**, enabling centralized, programmable network management through software rather than hardware configurations.

**Traditional vs SDN:**
- Traditional: Control and data forwarding are tightly coupled in each router/switch
- SDN: A central **SDN Controller** makes all routing decisions; individual switches just forward packets

**Why SDN matters for IoT:**
IoT networks involve thousands of heterogeneous devices with dynamic connectivity needs. SDN addresses this by:
- Enabling **flexible, centralized traffic management**
- Allowing **dynamic policy enforcement** without touching individual devices
- Reducing **network configuration complexity**
- Supporting **traffic prioritization** for latency-sensitive IoT data

**SDN components:**
- **Application Layer** — IoT applications that define network behavior
- **Control Layer** — SDN Controller (e.g., OpenFlow)
- **Infrastructure Layer** — Physical switches and routers that forward packets

SDN significantly improves IoT network agility, scalability, and security management.

---

**Q5. What is NFV (Network Function Virtualization) for IoT?**

Network Function Virtualization (NFV) replaces dedicated, proprietary network hardware appliances with software running on standard commercial servers, enabling network functions to be deployed, scaled, and managed flexibly.

**Traditional vs NFV:**
- Traditional: Firewalls, load balancers, and routers require separate physical hardware
- NFV: These functions run as **Virtual Network Functions (VNFs)** on commodity servers

**Benefits of NFV for IoT:**
- **Cost Reduction** — Eliminates expensive dedicated hardware
- **Scalability** — VNFs can be instantiated, scaled, or terminated on demand as IoT device counts fluctuate
- **Faster Deployment** — New network services can be rolled out via software without hardware procurement
- **Flexible Resource Allocation** — Resources are dynamically assigned based on IoT traffic patterns

**NFV + SDN:** Often deployed together — SDN manages traffic flow while NFV virtualizes the network functions that process that traffic. This combination creates a highly agile, cost-effective infrastructure ideal for managing large-scale IoT deployments.

---

## Subject 2: Artificial Intelligence and Machine Learning

**Q1. Discuss Knowledge representation issues.**

Knowledge representation (KR) is the field of AI concerned with how knowledge about the world can be encoded in a form that a computer system can use to solve complex problems. Several fundamental issues arise in designing effective KR systems.

**Key issues:**

- **What to represent** — Deciding which aspects of the world need to be encoded: objects, events, relationships, causality, time, beliefs
- **Granularity** — How detailed should the representation be? Too coarse = loss of precision; too fine = computational overhead
- **Completeness vs Efficiency** — A complete representation captures all knowledge but may be too slow to reason over; efficient representations may be incomplete
- **Handling Uncertainty** — Real-world knowledge is often incomplete, probabilistic, or contradictory. Representations must accommodate uncertainty (e.g., fuzzy logic, probabilistic graphical models)
- **Inference Support** — The representation must be structured to efficiently support reasoning and inference
- **Learnability** — Knowledge should ideally be learnable from data, not just hand-coded

Common KR techniques: **Semantic Networks, Frames, Logic (Propositional/Predicate), Production Rules, Ontologies**.

---

**Q2. What are Propositional and Predicate Logic?**

**Propositional Logic** deals with simple declarative statements (propositions) that are either **true or false**. It uses logical connectives to combine statements:
- AND (∧), OR (∨), NOT (¬), IMPLIES (→), BICONDITIONAL (↔)

**Example:** "It is raining" AND "I have an umbrella" → "I will stay dry"

Propositional logic is simple but limited — it cannot express relationships between objects or generalize over sets.

---

**Predicate Logic (First-Order Logic)** extends propositional logic by introducing:
- **Predicates** — Properties of objects: `IsHuman(Socrates)`
- **Variables** — Represent objects: `x, y`
- **Quantifiers** — Universal (∀: for all) and Existential (∃: there exists)

**Example:** ∀x [Human(x) → Mortal(x)] — "All humans are mortal"

Predicate logic is far more expressive and forms the basis for many AI reasoning systems, Prolog programming, and semantic knowledge bases. It can represent complex relationships, hierarchies, and rules that propositional logic cannot express.

---

**Q3. Define Monotonic Reasoning.**

Monotonic reasoning is a reasoning paradigm where the **set of known conclusions can only grow** — adding new information never invalidates or retracts previously drawn conclusions.

**Formal definition:** A reasoning system is monotonic if: whenever a conclusion C follows from a set of premises P, it also follows from any superset P' ⊇ P.

**Characteristics:**
- Conclusions are **permanent** — once derived, they hold forever
- The knowledge base only **expands**, never contracts
- Based on classical deductive logic

**Example:** If we know "All birds fly" and "Tweety is a bird," we conclude "Tweety flies." Adding more birds to the knowledge base doesn't invalidate this conclusion.

**Suitable for:** Mathematical proofs, formal verification, and closed-world domains where all facts are known and unchanging.

**Limitation:** Real-world scenarios are rarely closed — new information often contradicts previous assumptions. A doctor may initially diagnose flu, then revise to COVID after test results. Monotonic reasoning cannot handle such belief revision, which is why **non-monotonic reasoning** was developed.

---

**Q4. Define Non-Monotonic Reasoning.**

Non-monotonic reasoning is a reasoning paradigm that allows **previously drawn conclusions to be retracted or revised** when new information is acquired. It models the common human experience of reasoning under incomplete information and updating beliefs as more is learned.

**Formal definition:** A reasoning system is non-monotonic if adding a new premise can **reduce** the set of valid conclusions.

**Key mechanisms:**
- **Default Reasoning** — Assume typical cases unless exceptions are known. "Birds typically fly" — assume Tweety flies unless told it's a penguin
- **Circumscription** — Minimize abnormal cases; assume everything is normal unless stated otherwise
- **Closed World Assumption (CWA)** — Anything not known to be true is assumed false

**Example:** Initial belief: "Tweety is a bird → Tweety flies." New fact: "Tweety is a penguin." Revised conclusion: "Tweety does NOT fly."

**Applications:** Medical diagnosis (revising diagnoses with new test results), legal reasoning, robot planning in dynamic environments, and commonsense reasoning systems.

---

**Q5. Explain Forward Chaining and Backward Chaining.**

Both are inference strategies used by expert systems to derive conclusions from a set of facts and rules.

**Forward Chaining (Data-Driven)**
- Starts with **known facts** and applies rules to derive new facts
- Continues until the goal is reached or no more rules can fire
- Strategy: IF conditions are met → THEN assert new facts

**Process:** Facts → Rules → New Facts → More Rules → Goal

**Best for:** Situations where all initial data is available and you want to discover all possible conclusions (e.g., monitoring systems, alerting systems)

---

**Backward Chaining (Goal-Driven)**
- Starts with a **goal** and works backward to find supporting facts
- Asks: "What facts do I need to prove this goal?"
- Recursively checks sub-goals until base facts are confirmed

**Process:** Goal → Sub-goals → Rules → Base Facts

**Best for:** Situations where you have a specific hypothesis to verify (e.g., medical diagnosis, legal reasoning, Prolog queries)

**Comparison:**

| | Forward Chaining | Backward Chaining |
|---|---|---|
| Direction | Data → Goal | Goal → Data |
| Best when | Data is abundant | Goal is specific |
| Example | Production systems | Prolog, expert systems |

---

## Subject 3: Compiler Design

**Q1. What is Top-down Parsing?**

Top-down parsing is a parsing strategy that constructs the parse tree **from the root (start symbol) downward to the leaves (input tokens)**, attempting to derive the input string by applying grammar production rules from the top.

**How it works:**
- Begin with the start symbol
- Predict which production rule to apply based on current input
- Recursively expand non-terminals until terminal symbols match the input

**Types:**
- **Recursive Descent Parsing** — A set of recursive functions, one per grammar rule
- **Predictive Parsing (LL Parsing)** — Uses a lookahead token to choose rules without backtracking

**Characteristics:**
- Works well with **LL(k) grammars** — Left-to-right scan, Leftmost derivation, k lookahead tokens
- Cannot handle **left-recursive grammars** (must be eliminated before parsing)
- Cannot handle **ambiguous grammars**

**Advantages:** Simple to implement, easy to understand, good error reporting

**Disadvantages:** Limited to a subset of context-free grammars; may require grammar transformation (left-recursion elimination, left-factoring) before it can be applied

---

**Q2. Describe the Brute Force Parsing Approach.**

Brute force parsing (also called exhaustive search parsing) is the simplest top-down parsing method that **systematically tries every possible derivation** until one successfully matches the input string.

**How it works:**
1. Start with the grammar's start symbol
2. Apply all possible production rules in order
3. If a derivation matches the input — success
4. If no derivation matches — backtrack and try the next alternative

**Algorithm:**
- For each non-terminal, enumerate all applicable productions
- Use depth-first expansion with full backtracking on failure
- Continue until the input is fully matched or all possibilities are exhausted

**Characteristics:**
- **Complete** — Will find a parse if one exists
- **Extremely slow** — Exponential time complexity in the worst case due to backtracking
- **Infinite loops** — Can loop indefinitely on left-recursive grammars

**Practical use:** Brute force parsing is almost never used in production compilers due to its inefficiency. It serves primarily as a conceptual baseline to understand more efficient parsing techniques like predictive parsing and chart parsing.

---

**Q3. What is Recursive Descent Parsing?**

Recursive descent parsing is a top-down parsing technique where each **non-terminal in the grammar is implemented as a separate recursive function**. The parser descends the grammar recursively, calling functions that correspond to grammar rules.

**How it works:**
- Each function represents one grammar rule and attempts to match its corresponding non-terminal
- Functions call each other recursively as the grammar dictates
- If a match fails, the parser may **backtrack** and try an alternative production

**Example grammar:**
```
expr → term + expr | term
term → factor * term | factor
factor → ( expr ) | number
```
Each of `expr`, `term`, `factor` becomes a function in the parser.

**Characteristics:**
- Easy to write and understand — directly mirrors the grammar
- With backtracking: handles arbitrary context-free grammars but is slow
- Without backtracking (predictive): requires LL(1) grammar but is efficient

**Advantages:** Simple implementation, easy debugging, good for hand-written parsers

**Disadvantages:** Cannot handle left recursion; backtracking version is exponential in worst case

---

**Q4. Explain Predictive Parsing.**

Predictive parsing is an efficient top-down parsing technique that selects the correct production rule **without backtracking**, by looking at the next input token (lookahead).

**Key requirement:** The grammar must be **LL(1)** — unambiguous, free of left recursion, and left-factored — so that one lookahead token is sufficient to determine the correct rule.

**Components:**
- **Parsing Table (M[A, a])** — Maps non-terminal A and lookahead token a to a production rule
- **Input Buffer** — Contains the token stream with an end marker ($)
- **Stack** — Holds grammar symbols yet to be matched

**Algorithm:**
1. Push the start symbol onto the stack
2. Peek at the lookahead token
3. If top of stack = non-terminal A, use M[A, lookahead] to expand it
4. If top of stack = terminal and matches lookahead → pop and advance input
5. If top = $ and input = $ → **accept**; else → **error**

**FIRST and FOLLOW sets** are computed to construct the parsing table.

**Advantage:** Linear time O(n); no backtracking; efficient and widely used in hand-written parsers.

---

**Q5. What is Bottom-up Parsing?**

Bottom-up parsing constructs the parse tree **from the leaves (input tokens) upward to the root (start symbol)**. It works by repeatedly identifying portions of the input that match the right-hand side of a grammar rule and **reducing** them to the corresponding left-hand side non-terminal.

**How it works:**
- Uses a **Shift-Reduce** strategy
- **Shift:** Push the next input token onto the stack
- **Reduce:** When the top of the stack matches a production's right-hand side, pop those symbols and push the corresponding non-terminal
- Continue until the start symbol remains on the stack and input is empty

**Key concept — Handle:** The rightmost substring that matches a production rule and can be reduced.

**Types:**
- **LR(0), SLR(1)** — Simple but handle fewer grammars
- **LALR(1)** — Most common; used in Yacc/Bison tools
- **CLR(1) (Canonical LR)** — Most powerful; handles full LR(1) grammars

**Advantages over top-down:** Handles a much larger class of grammars including left-recursive ones; used in most production compilers (GCC, Clang).

---

## Subject 4: Natural Language Processing

**Q1. What causes Ambiguity in NLP?**

Ambiguity is one of the most fundamental challenges in NLP — it occurs when a word, phrase, or sentence has **multiple valid interpretations**, making it difficult for machines to determine the intended meaning.

**Types of ambiguity:**

**1. Lexical Ambiguity**
A single word has multiple meanings:
- "Bank" → financial institution OR river bank
- "Bat" → flying animal OR cricket bat

**2. Syntactic (Structural) Ambiguity**
A sentence can be parsed in multiple ways:
- "I saw the man with a telescope" — Did I use a telescope, or did the man have one?

**3. Semantic Ambiguity**
The sentence structure is clear but meaning is unclear:
- "Every boy loves a girl" — Does each boy love the same girl, or different girls?

**4. Pragmatic Ambiguity**
Meaning depends on context, intent, or world knowledge:
- "Can you pass the salt?" — A question about ability or a polite request?

**Resolution approaches:** Context analysis, POS tagging, named entity recognition, word sense disambiguation (WSD), coreference resolution, and discourse analysis using surrounding sentences.

---

**Q2. What is Morphology?**

Morphology is the branch of linguistics that studies the **internal structure of words** — how words are formed from smaller meaningful units called **morphemes**, and how those units combine to create new word forms.

**Key concepts:**

- **Morpheme** — The smallest meaningful unit of language
  - *Free morpheme:* Can stand alone ("book," "run")
  - *Bound morpheme:* Must attach to another morpheme (prefix "un-", suffix "-ing")

- **Inflectional Morphology** — Changes a word's grammatical form without changing its core meaning:
  - "walk" → "walks," "walked," "walking"

- **Derivational Morphology** — Creates new words with different meanings or parts of speech:
  - "happy" → "happiness" (noun), "unhappy" (adjective), "happily" (adverb)

**Computational morphology applications:**
- **Stemming** — Algorithmically strip suffixes to find roots
- **Lemmatization** — Map word forms to their dictionary base form
- **Morphological Analysis** — Parse words into their constituent morphemes for deeper linguistic processing

Used extensively in NLP pipelines for tokenization, information retrieval, and machine translation.

---

**Q3. Explain Parsing with Finite State Transducers.**

A Finite State Transducer (FST) is an extension of a finite automaton that **maps input strings to output strings** simultaneously, processing both an input tape and an output tape. FSTs are widely used in NLP for morphological analysis.

**Structure:**
- **States** — Finite set of states including start and accept states
- **Input alphabet** — Symbols read from input
- **Output alphabet** — Symbols written to output
- **Transitions** — State transitions labeled with input:output pairs

**FST in morphological parsing:**
FSTs can analyze word forms and decompose them into morphemes in a single pass:
- Input: "unhappiness"
- Output: "un + happy + ness" (prefix + root + suffix)

They can also work in reverse for **morphological generation**:
- Input: "happy" + plural indicator
- Output: "happiness"

**Advantages:**
- Extremely **efficient** — linear time processing
- **Bidirectional** — same FST can analyze or generate
- Compact representation of large morphological rule sets

FSTs form the backbone of many industrial NLP systems for tokenization, spelling correction, and vocabulary normalization.

---

**Q4. Discuss the role of Regular Expressions.**

Regular expressions (regex) are powerful patterns used to **match, search, and manipulate text** based on formal language theory. They are one of the most fundamental tools in NLP preprocessing.

**Basic regex components:**
- `.` — Match any single character
- `*` — Zero or more occurrences
- `+` — One or more occurrences
- `?` — Zero or one occurrence
- `[ ]` — Character class (e.g., `[aeiou]` matches vowels)
- `^` — Start of string; `$` — End of string
- `\d` — Digit; `\w` — Word character; `\s` — Whitespace

**NLP applications:**

- **Tokenization** — Split text into words/sentences using whitespace and punctuation patterns
- **Text Cleaning** — Remove HTML tags, URLs, special characters
- **Entity Detection** — Extract dates (e.g., `\d{2}/\d{2}/\d{4}`), emails, phone numbers
- **Spelling normalization** — Identify and standardize variant spellings
- **Pattern-based classification** — Rule-based NLP for structured domains like finance or medical records

Regex is the first line of attack in text preprocessing and forms the foundation of lexical analysis in both NLP pipelines and compiler front-ends.

---

**Q5. What are Stemmers and Spelling Errors?**

**Stemmers** are algorithms that reduce words to their root or base form (**stem**) by stripping suffixes and prefixes. The goal is to normalize different word forms so they map to the same underlying concept.

**Common stemming algorithms:**
- **Porter Stemmer** — Rule-based suffix stripping (most widely used for English)
- **Snowball Stemmer** — Improved multi-language version of Porter
- **Lancaster Stemmer** — More aggressive; may over-stem

**Example:**
- "running," "runner," "runs" → "run"
- "studies" → "studi" (incorrect but acceptable for IR purposes)

Stemmers are fast but can produce non-words. Lemmatization is preferred when accuracy matters.

---

**Spelling Errors** in NLP occur in two main categories:

- **Non-word errors** — Misspellings that produce invalid words ("hte" instead of "the"). Easy to detect using a dictionary.
- **Real-word errors** — Valid words used incorrectly ("there" vs "their"). Requires context to detect.

**Correction approaches:**
- **Minimum Edit Distance** — Find the dictionary word with fewest edits (insertions, deletions, substitutions) from the misspelled word
- **N-gram language models** — Score candidate corrections by their probability in context
- **Noisy channel model** — P(intended word | observed word) ∝ P(word) × P(error pattern)

---

## Subject 5: Scientific Aptitude

**Q1. A Container holds 36 liters of mixture (milk:water = 3:1). 15 liters of milk is added. Find the new ratio.**

**Solution:**
- Initial milk = 36 × (3/4) = **27 liters**
- Initial water = 36 × (1/4) = **9 liters**
- Milk added = 15 liters → New milk = 27 + 15 = **42 liters**
- Water remains = **9 liters**

**New ratio = 42 : 9 = 14 : 3**

**Answer: 14 : 3**

---

**Q2. In a mixture of 25 liters (ratio 4:1), 3 liters of water are added. Find the new ratio.**

**Solution:**
- Acid = 25 × (4/5) = **20 liters**
- Water = 25 × (1/5) = **5 liters**
- Water added = 3 liters → New water = **8 liters**
- Acid remains = **20 liters**

**New ratio = 20 : 8 = 5 : 2**

**Answer: 5 : 2**

---

**Q3. Average weight of boys = 70 kg, girls = 60 kg, whole class = 64 kg. Find ratio of boys to girls.**

**Solution using allegation:**
Let boys = x, girls = y
- 70x + 60y = 64(x + y)
- 70x − 64x = 64y − 60y
- 6x = 4y
- x : y = 4 : 6 = **2 : 3**

**Answer: Boys : Girls = 2 : 3**

---

**Q4. A train at 63 km/hr crosses a pole in 24 seconds. Find the length of the train.**

**Solution:**
- Speed = 63 km/hr = 63 × (5/18) = **17.5 m/s**
- Length = Speed × Time = 17.5 × 24 = **420 meters**

**Answer: 420 meters**

---

**Q5. A man covers a journey at 60% of usual speed and is late by 36 minutes. Find his usual time.**

**Solution:**
- New speed = (3/5) × usual speed
- New time = (5/3) × usual time (inverse relationship)
- Extra time = (5/3 − 1) × usual time = (2/3) × usual time = 36 min
- Usual time = 36 × (3/2) = **54 minutes**

**Answer: 54 minutes**

---
