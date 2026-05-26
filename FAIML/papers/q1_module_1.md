# Question 1

**i. Which of the following is not the commonly used programming language for Artificial Intelligence?**
(A) Perl (B) JAVA (C) PROLOG (D) Python

**Answer:** (A) Perl

---

**ii. The total number of proposition symbols in AI are _______**
(A) 3 proposition symbols (B) 1 proposition symbols (C) 2 proposition symbols (D) No proposition symbols

**Answer:** (D) No proposition symbols
*(Note: In propositional logic, there is an infinite supply of proposition symbols available to represent facts, though True and False are the only two truth values.)*

---

**iii. What is the difference between A* and AO* algorithms? (4 Marks)**

**Answer:**

| Feature | A* Algorithm | AO* Algorithm |
| :--- | :--- | :--- |
| **Type of Graph** | Works on **OR Graphs** (where a problem can be solved by choosing any one path). | Works on **AND-OR Graphs** (where a problem requires solving multiple sub-problems). |
| **Use Case** | Used for finding the shortest path to a goal (e.g., pathfinding, routing). | Used for problem decomposition (breaking complex problems into smaller parts). |
| **Memory** | Consumes more memory as it keeps all generated nodes in memory. | More memory efficient than A* in certain complex problem spaces. |
| **Heuristic Function** | Uses $f(n) = g(n) + h(n)$ to estimate the total path cost. | Uses updated cost estimates from sub-nodes to calculate the parent's cost. |
| **Completeness** | Guaranteed to find an optimal solution if it exists. | Also complete and optimal for AND-OR graphs given admissible heuristics. |

---

**iv. A Water Jug Problem: You are given two jugs, a 4-gallon one and a 3-gallon one, a pump which has unlimited water which you can use to fill the jug, and the ground on which water may be poured. Neither jug has any measuring markings on it. How can you get exactly 2 gallons of water in the 4-gallon jug.**
**(i) Write down the production rules for the above problem**
**(ii) Write any one solution to the above problem**

**Answer:**

**State Representation:** Let $(x, y)$ represent the state, where:
* $x$ = water in 4-gallon jug ($0 \le x \le 4$)
* $y$ = water in 3-gallon jug ($0 \le y \le 3$)
* **Initial State:** $(0, 0)$
* **Goal State:** $(2, y)$ for any $y$.

**(i) Production Rules:**
1. **Fill 4-gallon jug:** $(x, y) \rightarrow (4, y)$ if $x < 4$
2. **Fill 3-gallon jug:** $(x, y) \rightarrow (x, 3)$ if $y < 3$
3. **Empty 4-gallon jug:** $(x, y) \rightarrow (0, y)$ if $x > 0$
4. **Empty 3-gallon jug:** $(x, y) \rightarrow (x, 0)$ if $y > 0$
5. **Pour from 3 to 4 until full:** $(x, y) \rightarrow (4, y - (4 - x))$ if $x + y \ge 4$ and $y > 0$
6. **Pour all from 3 to 4:** $(x, y) \rightarrow (x + y, 0)$ if $x + y \le 4$ and $y > 0$
7. **Pour from 4 to 3 until full:** $(x, y) \rightarrow (x - (3 - y), 3)$ if $x + y \ge 3$ and $x > 0$
8. **Pour all from 4 to 3:** $(x, y) \rightarrow (0, x + y)$ if $x + y \le 3$ and $x > 0$

**(ii) Solution:**
| Step | Action | State (4-gal, 3-gal) |
| :--- | :--- | :--- |
| 1 | Initial State | `(0, 0)` |
| 2 | Fill the 3-gallon jug (Rule 2) | `(0, 3)` |
| 3 | Pour all from 3g to 4g (Rule 6) | `(3, 0)` |
| 4 | Fill the 3-gallon jug (Rule 2) | `(3, 3)` |
| 5 | Pour from 3g to 4g until full (Rule 5) | `(4, 2)` |
| 6 | Empty the 4-gallon jug (Rule 3) | `(0, 2)` |
| 7 | Pour all from 3g to 4g (Rule 6) | `(2, 0)` |
*(Goal achieved: 2 gallons in the 4-gallon jug)*

---
**OR**

**State and explain algorithm for Best First Search Algorithm with an example. (6 Marks)**

**Answer:**

**Concept:** Best First Search is a heuristic search algorithm that uses an evaluation function $f(n) = h(n)$ (heuristic cost) to decide which node to expand next. It selects the node that appears to be closest to the goal, combining the advantages of Breadth-First and Depth-First Search.

**Algorithm Steps:**
1. Create two lists: `OPEN` (nodes to be evaluated) and `CLOSED` (nodes already evaluated).
2. Put the initial start node in `OPEN`.
3. If `OPEN` is empty, exit and return failure.
4. Remove the node $n$ with the lowest heuristic value $h(n)$ from `OPEN` and place it in `CLOSED`.
5. If $n$ is the goal node, exit and return success with the path.
6. Expand node $n$, generating its successors.
7. For each successor:
   * If it is not in `OPEN` or `CLOSED`, evaluate it and add it to `OPEN`.
   * If it is already in `OPEN` or `CLOSED`, update its status if the new path to it is better.
8. Go back to Step 3.

**Example:** 
Imagine navigating a road map to reach a specific city. The heuristic $h(n)$ could be the straight-line distance (as the crow flies) from the current city to the destination. At each intersection, Best First Search will always choose the road that leads to the city with the shortest straight-line distance to the goal, prioritizing immediate perceived closeness over the total distance traveled so far.
