# Module 1: Artificial Intelligence

This module covers the foundational concepts of AI, search techniques, knowledge representation, and reasoning strategies.

---

## 1. Introduction to Artificial Intelligence

* **Definition:** AI is a branch of computer science that enables machines to simulate human intelligence — the ability to learn, reason, problem-solve, perceive, and understand language.
* **Goals of AI:** To build systems that can:
  * Think and act like humans (*cognitive simulation*)
  * Think and act rationally (*rational agents*)
* **Applications:** Game playing, robotics, expert systems, NLP, medical diagnosis, autonomous vehicles.

---

## 2. Production Systems

A **Production System** is a model used to represent problem-solving in AI.

### Components:
| Component | Description |
|---|---|
| **Global Database** | The current state of the world (working memory) |
| **Production Rules** | A set of IF (condition) → THEN (action) rules |
| **Control Strategy** | Decides which rule to apply when multiple rules match |
| **Rule Interpreter** | Executes the cycle: Match → Select → Act |

### Types of Production Systems:
1. **Monotonic Production System:** Applying rules never prevents the application of other rules. Order doesn't matter. Each state is derived once.
2. **Non-Monotonic Production System:** The application of a rule can prevent another rule from being applied later.
3. **Partially Commutative Production System:** Order of application matters only sometimes.
4. **Commutative Production System:** Order of rule application doesn't matter at all.

### Characteristics of Production Systems:
* **Modularity:** Each rule is independent and self-contained.
* **Uniformity:** All knowledge is represented consistently as IF-THEN rules.
* **Naturalness:** Rules are intuitive and easy to understand.
* **Modifiability:** Rules can be added, deleted, or modified easily.

---

## 3. Search Techniques

Search is the process of finding a sequence of actions from a **start state** to a **goal state**.

### State Space Representation:
* Start state, goal state, operators (moves), and path cost.

---

### 3.1 Breadth-First Search (BFS)
* Explores all nodes at the present depth level before moving to nodes at the next depth level.
* Uses a **Queue (FIFO)** data structure.
* **Guarantees:** Finds the shortest path (optimal if all costs are equal).
* **Time Complexity:** O(b^d) where b = branching factor, d = depth of goal.
* **Space Complexity:** O(b^d) — keeps all nodes in memory (high).
* **Completeness:** Yes — always finds a solution if one exists.

### 3.2 Depth-First Search (DFS)
* Explores as deep as possible along each branch before backtracking.
* Uses a **Stack (LIFO)** or recursion.
* **Not Guaranteed:** May not find the shortest path; can get stuck in infinite loops.
* **Time Complexity:** O(b^m) where m = maximum depth.
* **Space Complexity:** O(b×m) — only stores the current path (memory efficient).
* **Completeness:** No (may loop infinitely on infinite trees).

### Comparison: BFS vs DFS
| Feature | BFS | DFS |
|---|---|---|
| Data Structure | Queue | Stack |
| Completeness | Yes | No (may loop) |
| Optimality | Yes (unit cost) | No |
| Memory | High | Low |

---

### 3.3 Hill Climbing
* A **heuristic search** technique that always moves toward increasing value (like climbing uphill).
* **Algorithm:** Evaluate neighbors; move to the one with the best heuristic value.
* **Problems:**
  * **Local Maxima:** Gets stuck at a peak that isn't the global best.
  * **Plateaus:** Flat regions where all neighbors have equal value.
  * **Ridges:** Narrow peaks that cause oscillation.
* **Variants:** Simple Hill Climbing, Steepest-Ascent Hill Climbing.

---

### 3.4 Best-First Search
* Combines the advantages of BFS and DFS.
* Uses a **heuristic function h(n)** to evaluate and expand the most promising node first.
* Uses a **Priority Queue** (ordered by h(n)).
* **Greedy Best-First Search:** Expands node closest to goal based on h(n), but not necessarily optimal.

---

### 3.5 A* Algorithm
* The most widely used informed search algorithm.
* Evaluates nodes using: **f(n) = g(n) + h(n)**
  * `g(n)` = actual cost from start to current node.
  * `h(n)` = estimated (heuristic) cost from current node to goal.
  * `f(n)` = total estimated cost of the cheapest solution through n.
* **Admissible Heuristic:** h(n) never overestimates the true cost → A* is **optimal and complete**.
* A* is both complete and optimal when h(n) is admissible.

---

### 3.6 AO* Algorithm
* Used for **AND-OR graphs** (problems that can be decomposed into sub-problems).
* **AND nodes:** All child nodes must be solved (e.g., problem requires multiple sub-goals).
* **OR nodes:** Only one child node needs to be solved (alternative choices).
* AO* finds the optimal solution subgraph (solution tree) by propagating costs bottom-up.
* Used in **problem decomposition** scenarios like theorem proving and planning.

---

## 4. Control Strategies

Control strategies decide **which rule to fire** when multiple rules match the current state.

### Types:
1. **Irrevocable (Blind) Strategy:** Once a rule fires, the action cannot be undone. Used in monotonic systems.
2. **Tentative Strategy:** Can backtrack and try different rules if the current choice fails.
   * **Backtracking:** Undo the last action and explore alternatives.
   * **Graph Search:** Maintains visited nodes to avoid re-exploration.

### Forward vs Backward Control:
* **Forward (Data-Driven):** Start from initial facts and apply rules to derive new facts until goal is reached.
* **Backward (Goal-Driven):** Start from the goal and work backwards to find initial facts that support it.

---

## 5. Knowledge Representation

Knowledge representation (KR) is the way AI systems store and use information about the world.

### Issues in Knowledge Representation:
* What knowledge to represent?
* How to represent it effectively?
* How to use represented knowledge for reasoning?

### Types of Knowledge:
* **Declarative:** Facts about the world (e.g., "The sky is blue")
* **Procedural:** Knowledge about how to do something (e.g., algorithms)
* **Heuristic:** Rules of thumb derived from experience

### Approaches to KR:
1. **Logical Representation** (Propositional & Predicate Logic)
2. **Semantic Networks**
3. **Frames**
4. **Production Rules**

---

## 6. Propositional Logic

* Deals with **propositions** — statements that are either TRUE or FALSE.
* Uses **logical connectives:** AND (∧), OR (∨), NOT (¬), IMPLIES (→), BICONDITIONAL (↔).
* **Limitations:** Cannot represent relationships between objects; no quantifiers.

**Example:**
* P = "It is raining", Q = "I will carry an umbrella"
* P → Q means "If it is raining, then I will carry an umbrella."

---

## 7. Predicate Logic (First-Order Logic)

* An extension of propositional logic.
* Uses **predicates**, **variables**, **quantifiers**, and **functions**.
* **Universal Quantifier (∀):** "For all" — ∀x P(x) means P is true for all x.
* **Existential Quantifier (∃):** "There exists" — ∃x P(x) means P is true for at least one x.
* Can represent complex real-world relationships.

**Example:**
* `∀x (Human(x) → Mortal(x))` — All humans are mortal.
* `Human(Socrates)` — Socrates is a human.
* ∴ `Mortal(Socrates)` — Socrates is mortal. *(via inference)*

---

## 8. Monotonic and Non-Monotonic Reasoning

### Monotonic Reasoning:
* Adding new facts to the knowledge base **never invalidates** previously derived conclusions.
* Truth is permanent once established.
* Based on classical logic.
* **Example:** Mathematical theorems.

### Non-Monotonic Reasoning:
* New information **can override or retract** previous conclusions.
* Deals with **incomplete** or **default** knowledge.
* **Example:** "Birds fly" — but if we learn "Tweety is a penguin", we retract "Tweety flies".
* Used in: Default Logic, Circumscription, Truth Maintenance Systems (TMS).

---

## 9. Forward Chaining and Backward Chaining

### Forward Chaining (Data-Driven Reasoning):
* Start with **known facts**.
* Apply rules to derive new facts.
* Continue until the **goal is reached** or no more rules can fire.
* **Best for:** When all initial facts are known, and you want to derive all possible conclusions.
* **Example:** Medical diagnosis — given symptoms → infer disease.

### Backward Chaining (Goal-Driven Reasoning):
* Start with the **goal**.
* Work backwards to find supporting facts.
* Use rules in reverse to establish sub-goals.
* **Best for:** When you need to answer a specific query.
* **Example:** Prolog (logic programming language) uses backward chaining.

### Comparison:
| Feature | Forward Chaining | Backward Chaining |
|---|---|---|
| Direction | Data → Goal | Goal → Data |
| Driven by | Available facts | Desired goal |
| Use case | Expert systems | Query answering |
| Efficiency | Can generate irrelevant facts | More focused; avoids irrelevant data |

---

## Quick Revision Checklist ✅
- [ ] Production system components: Database, Rules, Control Strategy, Interpreter
- [ ] BFS uses Queue; DFS uses Stack
- [ ] A* formula: f(n) = g(n) + h(n)
- [ ] AO* is for AND-OR graphs with problem decomposition
- [ ] Predicate Logic adds: predicates, variables, quantifiers (∀, ∃)
- [ ] Monotonic = conclusions never retracted; Non-monotonic = can retract
- [ ] Forward Chaining = facts → goal; Backward Chaining = goal → facts
