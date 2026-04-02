# Assignment 2

## Subject 1: Internet of Things (IoT)

**Q1. Describe the Logical design of IoT.**
Ans: Logical design focuses on the abstract representation of components and abstract entities, using functional blocks, communication models, and APIs to outline how the system operates independent of the underlying hardware.

**Q2. What are the key applications of IoT?**
Ans: IoT has diverse applications including smart homes, smart cities, healthcare monitoring, industrial automation, and smart agriculture, significantly enhancing operational efficiency and real-time data collection.

**Q3. What is Machine-to-machine (M2M) communication?**
Ans: M2M refers to direct communication between devices using any communication channel, including wired and wireless, without human intervention, forming the basis for IoT endpoint interactions.

**Q4. Explain SDN (Software Defined Networking) for IoT.**
Ans: SDN decouples the control plane from the data plane, providing flexible, centralized network management which is crucial for handling the massive, dynamic device networks commonly found in IoT architectures.

**Q5. What is NFV (Network Function Virtualization) for IoT?**
Ans: NFV replaces dedicated network hardware appliances with software running on standard servers, enabling cost-effective, scalable, and dynamically deployable network functions suited for variable IoT computing workloads.

## Subject 2: Artificial Intelligence and Machine Learning

**Q1. Discuss Knowledge representation issues.**
Ans: Key issues include deciding what knowledge needs representing, how to structure it effectively (e.g., graphs, logic schemas), ensuring the representation supports inference, and seamlessly handling incomplete or uncertain information.

**Q2. What are Propositional and Predicate Logic?**
Ans: Propositional logic deals with simple declarative statements that are strictly true or false. Predicate logic extends this by using variables, quantifiers, and predicates to represent relationships and abstract grammatical rules.

**Q3. Define Monotonic reasoning.**
Ans: This is a robust reasoning system where adding new facts cannot invalidate previously inferred conclusions; consequently, the set of known truths strictly grows over time without contradiction.

**Q4. Define Non-monotonic reasoning.**
Ans: In non-monotonic systems, adding new information can invalidate old conclusions or force retracting beliefs, which is exceptionally useful for modeling human reasoning with restricted initial situational information.

**Q5. Explain Forward Chaining and Backward Chaining.**
Ans: Forward chaining starts with known facts and applies rules to infer new data towards a particular goal. Backward chaining starts with a goal and works backward through rules to find actionable facts that logically support it.

## Subject 3: Compiler Design

**Q1. What is Top-down parsing?**
Ans: A structural parsing strategy that starts at the highest-level rule (the root of the parse tree) and recursively breaks it down to derive the input string using predictive techniques or backtracking.

**Q2. Describe the Brute force parsing approach.**
Ans: This methodology involves systematically trying all possible parse tree derivations to find one that exactly matches the input string. It is accurate but computationally expansive and strongly relies on functional backtracking.

**Q3. What is Recursive descent parsing?**
Ans: A top-down parsing technique where a coordinated set of mutually recursive procedures, representing grammatical production rules, process the input. It may require intensive backtracking if the grammar is arbitrarily non-deterministic.

**Q4. Explain Predictive parsing.**
Ans: A highly optimized form of top-down parsing that uses a sequential lookahead token to decide inherently without backtracking which production rule to apply. It requires a carefully constructed LL(1) grammar.

**Q5. What is Bottom-up parsing?**
Ans: A parsing method that initiates with the input string and works systematically backward to reduce it completely to the abstract start symbol, essentially building the definitive parse tree from the leaves optimally up to the root.

## Subject 4: Natural Language Processing

**Q1. What causes Ambiguity in NLP?**
Ans: Ambiguity occurs fundamentally when a sentence or phrase has multiple valid structural interpretations. Resolving syntactic, semantic, and lexical ambiguities is consistently a central challenge in processing human language accurately.

**Q2. What is Morphology?**
Ans: Morphology is the structured study of the internal composition of words and how they can be modified syntactically. In computational limits, this involves accurately tokenizing words into their definitive root forms and subsequent affixes.

**Q3. Explain Parsing with Finite State Transducers.**
Ans: FSTs are specialized automata used to map input strings to output strings. In NLP, they are widely used for robust morphological parsing, standardizing vocabulary dictionaries, and translating complex forms like verb conjugations structurally back to lemmas.

**Q4. Discuss the role of Regular Expressions.**
Ans: Regex provides a specific syntax used to structurally match character patterns within text blocks. It is heavily utilized in early-stage NLP processing pipelines for text cleaning, selective extraction of entities, and implementing foundational tokenization rules.

**Q5. What are Stemmers and Spelling errors?**
Ans: Stemming heuristics algorithmically chop off word endings to reduce them swiftly to their base functional forms. Extraneous spelling correction algorithms systematically handle typographical user errors, often using mapping techniques like Minimum Edit Distance constraints.

## Subject 5: Scientific Aptitude

**Q1. A Container holds 36 liters of mixture of milk and water in the ratio 3: 1. 15 liters of milk is added. The new ratio?**
Ans: Initial milk = 36 * (3/4) = 27L. Water = 9L. Add 15L milk => New milk = 27 + 15 = 42L. New water = 9L. New ratio = 42:9 = 14:3.

**Q2. In a mixture of 25 liters, ratio is 4:1. 3 liters water added. New ratio?**
Ans: Initial acid = 20L, water = 5L. Add 3L water => acid = 20L, water = 8L. New ratio = 20:8 or 5:2.

**Q3. Average weight of boys is 70, girls is 60. Whole class 64. Ratio of boys to girls?**
Ans: Let boys be x, girls be y. 70x + 60y = 64(x+y) => 70x - 64x = 64y - 60y => 6x = 4y => x:y = 4:6 = 2:3.

**Q4. Train at 63 km/hr crosses pole in 24 seconds. Length?**
Ans: Speed = 63 * (5/18) = 17.5 m/s. Distance = Speed * Time = 17.5 * 24 = 420 meters.

**Q5. Man covers journey at 60% speed, late by 36 min. Usual time?**
Ans: New speed = 3/5 usual speed. New time = 5/3 usual time. Difference = 2/3 usual time = 36 min. Usual time = (36 * 3) / 2 = 54 minutes.
