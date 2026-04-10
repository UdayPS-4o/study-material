# Module 1 — Detailed Exam Notes: Artificial Intelligence

> **Purpose:** These detailed notes are designed for writing comprehensive, well-structured exam answers. Each section has enough content to write a full 5–10 mark answer.

---

## Topic 1: Introduction to Artificial Intelligence

### Definition and Overview
Artificial Intelligence (AI) is a branch of computer science that aims to create intelligent machines capable of performing tasks that typically require human intelligence. These tasks include reasoning, learning, problem-solving, language understanding, and perception. The term "Artificial Intelligence" was coined by **John McCarthy** in **1956** at the Dartmouth Conference.

### Goals of AI
AI systems are designed to achieve the following:
1. **Cognitive Simulation:** Machines that mimic the way humans think and reason.
2. **Rational Agent Design:** Systems that act rationally to achieve goals given any percept sequence.
3. **Natural Language Processing (NLP):** Understanding and generating human language.
4. **Vision and Perception:** Interpreting images, videos, and sensory data.

### Branches of AI
- **Machine Learning** — Algorithms that learn from data.
- **Expert Systems** — Knowledge-based systems that emulate expert decision-making.
- **Robotics** — Building intelligent machines that interact physically.
- **Natural Language Processing** — Human-computer interaction in natural language.
- **Computer Vision** — Teaching machines to interpret visual inputs.

### Applications of AI
- Medical Diagnosis (IBM Watson)
- Game Playing (AlphaGo, Chess engines)
- Autonomous Vehicles (Tesla, Waymo)
- Virtual Assistants (Siri, Alexa)
- Fraud Detection, Spam Filtering

---

## Topic 2: Production Systems

### Definition
A **Production System** is a specific model of computation used in AI to represent rule-based problem-solving. It models knowledge and reasoning as a collection of **IF-THEN rules (productions)**.

### Components of a Production System

#### 1. Global Database (Working Memory)
- The central data structure that holds the **current state of the world**.
- Initially contains the **start state** facts.
- Rules modify this database as the system runs.

#### 2. Production Rules (Rule Base)
- A collection of **condition-action pairs** in the form: `IF <condition> THEN <action>`
- The condition (LHS) is matched against the global database.
- If matched, the action (RHS) is performed (adds/removes/modifies data).
- Example: `IF temperature > 100 THEN alert("Overheating")`

#### 3. Control Strategy (Inference Engine)
- Governs how the system selects which rule to fire when multiple rules match.
- Acts as the "brain" of the production system.
- Strategies include: forward chaining, backward chaining, conflict resolution.

#### 4. Rule Interpreter (Recognize-Act Cycle)
The interpreter runs in a loop:
1. **Match:** Find all rules whose conditions match the current database state.
2. **Conflict Resolution:** Select one rule from those that match.
3. **Act:** Execute the selected rule's action and update the database.
4. Repeat until the goal is reached or no rules fire.

### Types of Production Systems

| Type | Description | Example Use |
|---|---|---|
| **Monotonic** | Applying rules never prevents applying others; state changes are irreversible | Theorem proving |
| **Non-Monotonic** | Rules can block other rules; supports backtracking | Planning |
| **Commutative** | Order of rules doesn't affect the final result | Sorting |
| **Partially Commutative** | Rule order sometimes matters | Scheduling |

### Characteristics of Production Systems
1. **Modularity:** Rules are independent — adding or removing one rule doesn't affect others.
2. **Uniformity:** All domain knowledge is expressed in the same IF-THEN format, making the system easy to manage.
3. **Naturalness:** Rules resemble human reasoning and are intuitive to understand.
4. **Modifiability:** The knowledge base can be updated without rewriting the whole system.
5. **Separation of Knowledge and Control:** Domain rules are separate from the inference engine.

---

## Topic 3: Search Techniques in AI

### Why Search?
In AI, many problems are modeled as searching through a **state space** — a graph where:
- **Nodes** = states of the world
- **Edges** = actions/operators
- **Start node** = initial state
- **Goal node(s)** = desired outcome

### Categories:
- **Uninformed (Blind) Search:** No knowledge about the goal's location — BFS, DFS.
- **Informed (Heuristic) Search:** Uses domain knowledge to guide search — Hill Climbing, A*, Best-First.

---

### 3.1 Breadth-First Search (BFS)

**Algorithm:**
1. Start at the root/start node; add it to Queue.
2. Dequeue a node; check if it's the goal.
3. If not, enqueue all unvisited neighbors.
4. Repeat until goal found or queue is empty.

**Properties:**
| Property | Value |
|---|---|
| Data Structure | Queue (FIFO) |
| Completeness | Yes — finds solution if it exists |
| Optimality | Yes — finds shortest path (uniform cost) |
| Time Complexity | O(b^d) — b = branching factor, d = depth |
| Space Complexity | O(b^d) — stores all nodes at current level |

**Advantages:**
- Guaranteed to find the shortest path.
- Complete — always finds a solution if one exists.

**Disadvantages:**
- Very high memory consumption.
- Inefficient for problems with large or infinite state spaces.

**When to use:** When the solution is expected to be close to the root and memory is not a constraint.

---

### 3.2 Depth-First Search (DFS)

**Algorithm:**
1. Start at the root; push to Stack (or use recursion).
2. Pop a node; check if it's the goal.
3. If not, push all unvisited neighbors.
4. Repeat until goal found or stack is empty.

**Properties:**
| Property | Value |
|---|---|
| Data Structure | Stack (LIFO) / Recursion |
| Completeness | No — can loop infinitely on infinite trees |
| Optimality | No — may find a non-shortest path |
| Time Complexity | O(b^m) — m = maximum depth |
| Space Complexity | O(b×m) — only stores current path |

**Advantages:**
- Very memory efficient.
- Can work on infinite state spaces (with depth-limiting).

**Disadvantages:**
- Not guaranteed to find the shortest path.
- Can get stuck in infinite loops (use visited set to prevent).

**Depth-Limited DFS:** Adds a maximum depth cutoff to prevent infinite loops.

**Iterative Deepening DFS (IDDFS):** Combines BFS's completeness + DFS's space efficiency by gradually increasing the depth limit.

---

### 3.3 Hill Climbing

**Definition:** Hill Climbing is a local search strategy that continuously moves towards the direction of increasing heuristic value (like physically climbing a hill). It is a **greedy** approach that focuses on local improvements.

**Algorithm:**
1. Start at initial state.
2. Evaluate all neighbors using heuristic function h(n).
3. Move to the neighbor with the best (highest) h(n) value.
4. Repeat until no neighbor is better than the current state.

**Types:**
- **Simple Hill Climbing:** Moves to the first better neighbor found.
- **Steepest-Ascent Hill Climbing:** Evaluates all neighbors and picks the globally best one.
- **Stochastic Hill Climbing:** Picks a random neighbor from those that improve the state.

**Problems / Limitations:**
1. **Local Maxima:** The algorithm reaches a peak that is locally optimal but not globally optimal. All neighbors have lower values, but the true goal is yet to be reached.
2. **Plateaus (Flat Maxima):** A flat region in the state space where all neighbors have equal h(n) — no direction to move.
3. **Ridges:** A sequence of states where the path is narrow and the algorithm oscillates side-to-side instead of climbing.

**Solutions:**
- **Simulated Annealing:** Occasionally accepts worse moves to escape local maxima.
- **Random Restarts:** Restart from a random state multiple times and take the best result.

---

### 3.4 Best-First Search (Greedy Best-First)

**Definition:** An informed search strategy that expands the node that **appears most promising** according to a heuristic function h(n), which estimates the cost from a node to the goal.

**Algorithm:**
1. Initialize priority queue with start node.
2. Dequeue node with the lowest h(n) (closest to goal).
3. If goal, return path. Else, enqueue unexplored neighbors.
4. Repeat.

**Heuristic h(n):** User-defined estimate of "how close is this node to the goal?" (e.g., straight-line distance in a map problem).

**Evaluation:** `f(n) = h(n)` — only considers estimated cost to goal, ignores cost already paid.

**Properties:**
- **Completeness:** No — can loop in cycles without visited tracking.
- **Optimality:** No — greedy choice may not be globally optimal.
- **Efficiency:** Better than uninformed search but not always optimal.

---

### 3.5 A* Algorithm (A-Star)

**Definition:** A* is the most widely used and optimal heuristic search algorithm. It combines the benefits of **Dijkstra's Algorithm** (actual cost) and **Greedy Best-First Search** (heuristic estimate).

**Evaluation Function:**
```
f(n) = g(n) + h(n)
```
- `g(n)` = **Actual cost** from the start node to node n (known cost).
- `h(n)` = **Heuristic estimate** of cost from n to the goal (estimated).
- `f(n)` = **Total estimated cost** of the cheapest solution through n.

**Algorithm Steps:**
1. Put start node in Open List (priority queue ordered by f(n)).
2. While Open List is not empty:
   a. Remove node n with the lowest f(n).
   b. If n is the goal, return the path.
   c. Add n to Closed List (visited).
   d. For each neighbor m of n:
      - Compute f(m) = g(m) + h(m).
      - If m is not in Closed List, add to Open List.
3. If Open List empties, no solution exists.

**Admissibility Condition:**
- A heuristic h(n) is **admissible** if it **never overestimates** the true cost to the goal: `h(n) ≤ h*(n)`.
- If h(n) is admissible → A* is **complete** and **optimal**.

**Common Heuristics:**
- Manhattan Distance (grid problems)
- Euclidean Distance (continuous space)
- Number of misplaced tiles (8-puzzle)

**Properties:**
| Property | Value |
|---|---|
| Completeness | Yes (with admissible heuristic) |
| Optimality | Yes (with admissible heuristic) |
| Time Complexity | Exponential in worst case |
| Space Complexity | Stores all generated nodes |

---

### 3.6 AO* Algorithm

**Definition:** AO* (AND-OR Star) is an extension of A* that works on **AND-OR graphs** — used when a problem can be decomposed into sub-problems.

**AND-OR Graph:**
- **OR nodes:** Represent choices — only ONE child needs to be solved.
- **AND nodes:** Represent decomposition — ALL children must be solved.

**Use Case:** Problem decomposition — solving the entire problem requires solving all sub-problems (like game trees, planning, theorem proving).

**Difference from A*:**
| | A* | AO* |
|---|---|---|
| Graph type | Regular graphs | AND-OR graphs |
| Node expansion | Single best node | AND + OR nodes |
| Application | Pathfinding | Problem decomposition |

**How AO* Works:**
1. Start with the root (problem to solve).
2. Expand the most promising node.
3. Mark AND nodes — ALL descendants must be solved.
4. Mark OR nodes — ONLY the best descendant is chosen.
5. Propagate costs back up; update parent costs bottom-up.
6. Stop when the start node is marked SOLVED or has no solvable path.

---

## Topic 4: Control Strategies

**Definition:** Control strategies determine **which rule to fire** when multiple rules match the current database state. They are critical for the efficiency and correctness of production systems.

### Types of Control Strategies:

#### 1. Irrevocable (Blind) Strategy
- Once a rule is fired, its action **cannot be undone**.
- No backtracking is possible.
- Suitable for monotonic systems where every action moves permanently toward the goal.
- **Risk:** One wrong rule fire leads to failure.

#### 2. Tentative Strategy
- Rules can be **undone** if the chosen path leads to failure.
- Supports **backtracking** — try an alternative rule.
- **Subtype — Backtracking:** Maintains a stack of states; on failure, pops back to last decision point.
- **Subtype — Graph Search:** Maintains a list of visited nodes to avoid re-exploring.

### Direction of Control:

#### Forward Chaining (Data-Driven)
- Begins from known **initial facts** in the database.
- Fires rules repeatedly to derive new facts.
- Continues until the goal is derived or no more rules apply.
- **Used in:** Expert systems, production planning, monitoring systems.

#### Backward Chaining (Goal-Driven)
- Begins from the **goal state**.
- Identifies which rules could produce the goal.
- Recursively tries to satisfy each rule's conditions as sub-goals.
- **Used in:** Query answering, Prolog, verification systems.

---

## Topic 5: Knowledge Representation (KR)

### Definition
Knowledge Representation is the field of AI concerned with how to **formally encode information** about the world in a way that a computer system can use to solve complex problems.

### Issues in Knowledge Representation:
1. **What to represent?** — Facts, relationships, procedures, heuristics.
2. **How to represent?** — Choosing the right formalism (logic, rules, frames).
3. **How to use?** — Inference, reasoning, updating.
4. **Completeness:** Can all required knowledge be expressed?
5. **Efficiency:** Can the system reason quickly enough?

### Types of Knowledge:
| Type | Description | Example |
|---|---|---|
| **Declarative** | Facts about the world | "Paris is the capital of France" |
| **Procedural** | How to perform tasks | Sorting algorithm steps |
| **Heuristic** | Rules of thumb from experience | "If fever > 104°F, hospitalize" |
| **Meta-knowledge** | Knowledge about knowledge | "This rule applies only in winter" |

### Approaches to KR:
1. **Logical Representation** — Uses formal logic (propositional, predicate).
2. **Semantic Networks** — Graph with nodes (concepts) and edges (relationships).
3. **Frames** — Object-like structures with slots for attributes.
4. **Scripts** — Predefined sequences for common scenarios (restaurant script).
5. **Production Rules** — IF-THEN rules.

---

## Topic 6: Propositional Logic

### Definition
Propositional logic (also called **propositional calculus** or **sentential logic**) deals with propositions — statements that are either **TRUE (T)** or **FALSE (F)**. It is the simplest form of symbolic logic.

### Syntax:
- **Atomic propositions:** Single statements — P, Q, R.
- **Compound propositions:** Formed by combining atomics with connectives.

### Logical Connectives:
| Symbol | Name | Meaning |
|---|---|---|
| ¬ | NOT (Negation) | Opposite of P |
| ∧ | AND (Conjunction) | Both P and Q are true |
| ∨ | OR (Disjunction) | At least one is true |
| → | IMPLIES (Implication) | If P then Q |
| ↔ | BICONDITIONAL | P if and only if Q |

### Truth Table for Implication (P → Q):
| P | Q | P → Q |
|---|---|---|
| T | T | T |
| T | F | F |
| F | T | T |
| F | F | T |

### Inference Rules:
- **Modus Ponens:** If P → Q and P is true, then Q is true.
- **Modus Tollens:** If P → Q and Q is false, then P is false.
- **Hypothetical Syllogism:** If P → Q and Q → R, then P → R.

### Limitations of Propositional Logic:
1. Cannot represent relationships between individual objects.
2. No concept of variables or quantifiers.
3. Repetitive — must write separate proposition for each specific case.
4. Cannot generalize (e.g., "All dogs bark" cannot be expressed simply).

---

## Topic 7: Predicate Logic (First-Order Logic — FOL)

### Definition
Predicate logic is a powerful extension of propositional logic. It introduces **predicates** (properties of objects), **variables**, **quantifiers**, and **functions** to express complex relationships.

### Components of FOL:
1. **Constants:** Fixed objects — `Socrates`, `Paris`, `3`.
2. **Variables:** Placeholders — `x`, `y`, `z`.
3. **Predicates:** Properties or relations — `Human(x)`, `Loves(x, y)`.
4. **Functions:** Map objects to objects — `FatherOf(x)`.
5. **Quantifiers:**
   - **Universal (∀):** "For all" — `∀x Human(x) → Mortal(x)`.
   - **Existential (∃):** "There exists" — `∃x Loves(John, x)`.
6. **Connectives:** Same as propositional logic (∧, ∨, ¬, →, ↔).

### Classic Example — Syllogism:
```
Premise 1: ∀x (Human(x) → Mortal(x))   [All humans are mortal]
Premise 2: Human(Socrates)              [Socrates is human]
Conclusion: Mortal(Socrates)            [Socrates is mortal]
```
This is derived by **Universal Instantiation** + **Modus Ponens**.

### Advantages of FOL over Propositional Logic:
- Can express general laws with quantifiers.
- Represents relationships between multiple objects.
- More expressive and compact.
- Supports rigorous automated inference (unification, resolution).

### Inference in FOL:
- **Unification:** Finding substitutions that make two predicates identical.
- **Resolution:** A complete inference procedure for FOL — used in Prolog.
- **Forward/Backward Chaining:** Apply rules to derive new facts.

---

## Topic 8: Monotonic vs. Non-Monotonic Reasoning

### Monotonic Reasoning

**Definition:** In monotonic reasoning, adding new knowledge to the knowledge base **never reduces** the set of derived conclusions. If a conclusion is valid, it remains valid forever.

**Characteristics:**
- All facts are permanent — never retracted.
- Based on classical deductive logic.
- Safe for stable, complete knowledge.
- Predictable and mathematically rigorous.

**Example:**
- "Euler's theorem is provable from its axioms" — this will always be true regardless of what new knowledge is added.

**Limitations:**
- Real-world knowledge is incomplete and changing.
- Cannot handle exceptions or defaults.
- Impractical for dynamic environments.

---

### Non-Monotonic Reasoning

**Definition:** In non-monotonic reasoning, new knowledge **can invalidate** previously derived conclusions. The set of beliefs can shrink as well as grow.

**Why Needed:** Real-world knowledge is often:
- **Incomplete** — we make assumptions based on partial information.
- **Default-based** — we assume typical behavior unless told otherwise.
- **Revisable** — new evidence forces us to withdraw old conclusions.

**Classic Example:**
1. We know: "Birds typically fly" → we conclude "Tweety flies".
2. New fact added: "Tweety is a penguin" → we RETRACT "Tweety flies".
3. The conclusion was withdrawn based on new information — **non-monotonic**.

**Types of Non-Monotonic Reasoning:**
1. **Default Logic (Reiter):** Uses "default rules" — assumptions made in the absence of contradictory information.
   - Default: "If X is a bird and it is not known X cannot fly, then conclude X flies."
2. **Circumscription (McCarthy):** Minimizes the extension of predicates — assume as few exceptions as possible.
3. **Truth Maintenance Systems (TMS):** Tracks justifications for beliefs; automatically retracts beliefs when their justifications are invalidated.
4. **Autoepistemic Logic:** Reasoning about one's own knowledge and beliefs.

---

## Topic 9: Forward and Backward Chaining

### Forward Chaining (Data-Driven / Bottom-Up Reasoning)

**Definition:** Forward chaining is an inference strategy that starts from **known facts** (data) and applies inference rules repeatedly to derive new facts, moving forward until the **goal** is reached.

**Process:**
1. Load all known facts into the working memory.
2. Find all rules whose conditions (IF part) are satisfied by current facts.
3. Fire the matching rule — add its conclusion (THEN part) to memory.
4. Repeat until goal is in working memory or no more rules can fire.

**Detailed Example (Medical Diagnosis):**
- Facts: `fever = high`, `cough = yes`, `fatigue = yes`
- Rule 1: `IF fever=high AND cough=yes → possible_flu`
- Rule 2: `IF possible_flu AND fatigue=yes → diagnose_flu`
- Chain: fever + cough → possible_flu → diagnose_flu ✓

**Advantages:**
- Natural and easy to implement.
- Efficiently derives all possible facts from given data.
- Suitable for data monitoring and real-time systems.

**Disadvantages:**
- Can derive many irrelevant facts (inefficient).
- May take many steps to reach the goal.

**Applications:**
- Expert systems (MYCIN, DENDRAL)
- Production monitoring
- Business rule engines
- Network monitoring and alerts

---

### Backward Chaining (Goal-Driven / Top-Down Reasoning)

**Definition:** Backward chaining starts from the **goal** and works backwards, trying to establish the conditions that would make the goal true, effectively reducing to sub-goals until basic known facts are reached.

**Process:**
1. Start with the goal as the initial sub-goal.
2. Find rules whose THEN part matches the current sub-goal.
3. Add the rule's IF conditions as new sub-goals.
4. Recursively establish each sub-goal.
5. If a sub-goal matches a known fact, it's satisfied.
6. Goal is proved when all sub-goals are satisfied.

**Detailed Example (Prolog-style):**
- Goal: `mortal(Socrates)`
- Rule: `mortal(X) :- human(X)` → sub-goal: `human(Socrates)`
- Fact: `human(Socrates)` ✓ → `mortal(Socrates)` proved ✓

**Advantages:**
- Focused — only explores facts relevant to the goal.
- More efficient when the goal is specific.
- Avoids generating irrelevant facts.

**Disadvantages:**
- Can revisit the same sub-goals repeatedly.
- Implementation can be complex.

**Applications:**
- Prolog language
- Query answering systems
- Diagnostic systems (given a disease, find supporting symptoms)
- Verification and proof systems

### Full Comparison Table:
| Feature | Forward Chaining | Backward Chaining |
|---|---|---|
| Starting Point | Known facts | Desired goal |
| Direction | Bottom-up (data → goal) | Top-down (goal → data) |
| Driven by | Available data | Specific query |
| Efficiency | May generate irrelevant facts | Focused on goal-relevant paths |
| Completeness | Derives all possible conclusions | Proves or disproves specific goal |
| Used in | Expert systems, monitoring | Prolog, query answering |
| Memory Usage | Can be large | More manageable |
| Example | Medical diagnosis | Legal reasoning, Prolog |

---

## Exam Tips for Module 1 🎯

1. **For Search Algorithms:** Always mention — data structure used, complexity, completeness, optimality.
2. **For A*:** Write the formula `f(n) = g(n) + h(n)` and explain each term clearly.
3. **For AO*:** Distinguish AND nodes vs OR nodes with examples.
4. **For Propositional vs Predicate Logic:** Explicitly state the limitations of propositional logic that predicate logic addresses.
5. **For Chaining:** Always draw a small example chain to show the reasoning flow.
6. **For Monotonic vs Non-Monotonic:** The penguin-bird example is the classic — always use it.
7. **Production Systems:** Remember the 4 components and the Recognize-Act cycle.
8. **Keywords to use in answers:** "heuristic function", "admissible", "state space", "goal state", "inference engine", "working memory".
