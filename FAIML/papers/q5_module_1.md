# Question 5

**i. Which of the following is an application of Artificial Intelligence?**
(A) It helps to exploit vulnerabilities to secure the firm
(B) It helps to deploy applications on the cloud
(C) Easy to create a website
(D) Language understanding and problem-solving (Text analytics and NLP)

**Answer:** (D) Language understanding and problem-solving (Text analytics and NLP)

---

**ii. Which of the following is an expansion of Artificial Intelligence application?**
(A) Game Playing (B) Planning and Scheduling (C) Diagnosis (D) All of the mentioned

**Answer:** (D) All of the mentioned

---

**iii. Explain the various ensemble learning techniques? (4 Marks)**

**Answer:**

Ensemble learning techniques combine multiple basic machine learning models (weak learners) to produce one highly accurate and robust predictive model (strong learner). The main techniques are:

1. **Bagging (Bootstrap Aggregating):**
   * **Concept:** Multiple instances of the same model (e.g., Decision Trees) are trained independently in parallel on different subsets of the training data. These subsets are created via random sampling with replacement.
   * **Result:** The final prediction is made by averaging the outputs (regression) or by majority voting (classification). This reduces variance and prevents overfitting.
   * **Example:** **Random Forest** algorithm.

2. **Boosting:**
   * **Concept:** Models are trained sequentially. Each new model specifically focuses on correcting the errors made by the previous models in the sequence by assigning higher weights to previously misclassified data points.
   * **Result:** Converts a sequence of weak learners into a strong learner, significantly reducing bias and improving overall accuracy.
   * **Example:** **AdaBoost**, **Gradient Boosting**, **XGBoost**.

3. **Stacking:**
   * **Concept:** Multiple *different* types of base models (e.g., a Decision Tree, an SVM, and a KNN) are trained on the same data. Their predictions are then collected and used as input features to train a final "meta-model" (like Logistic Regression).
   * **Result:** Leverages the unique strengths of different algorithm types to make a highly accurate final prediction.

---

**iv. How can machine learning be utilized in natural language processing tasks? (6 Marks)**

**Answer:**

Machine Learning forms the backbone of modern Natural Language Processing (NLP), enabling computers to understand, interpret, and generate human language. It is utilized in various tasks:

1. **Text Classification & Sentiment Analysis:** ML models (like Naive Bayes, SVM, or Neural Networks) classify text into distinct categories (e.g., categorizing emails as Spam/Not Spam) or determine the emotional tone of text (identifying positive, negative, or neutral product reviews).
2. **Machine Translation:** Deep learning models, specifically Sequence-to-Sequence models and Transformers, are trained on vast bilingual datasets to automatically translate text seamlessly from one language to another (e.g., Google Translate).
3. **Named Entity Recognition (NER):** ML algorithms scan documents to automatically identify and extract key entities such as names of people, organizations, dates, and geographic locations.
4. **Chatbots and Virtual Assistants:** Large Language Models (LLMs) learn complex conversational patterns from huge text corpora to generate human-like text, answer open-ended questions, and assist users interactively (e.g., Siri, ChatGPT).
5. **Speech Recognition:** ML models convert spoken language (audio signals) into written text by identifying phonemes and probabilistic word patterns.
6. **Text Summarization:** Advanced ML algorithms can analyze long documents and extract the most critical sentences or generate a concise summary entirely from scratch.

---
**OR**

**How can machine learning be applied to image enhancement and restoration in computer vision? (6 Marks)**

**Answer:**

Machine learning, particularly Deep Learning using Convolutional Neural Networks (CNNs), has revolutionized image enhancement and restoration by learning complex, non-linear mappings from degraded images to high-quality outputs.

1. **Super-Resolution:** ML models can take a low-resolution image and intelligently upscale it to a high-resolution version. The network learns how to fill in missing pixels, generating realistic textures and preserving sharp edges, far outperforming traditional interpolation (blurring) methods.
2. **Image Denoising:** Images captured in low light or with poor sensors often contain visual noise (grain). ML algorithms are trained on large pairs of noisy and clean images to recognize complex noise patterns and remove them while keeping important structural details intact.
3. **Deblurring:** Blurs caused by camera shake or fast object motion can be corrected. The ML model learns to estimate the blur kernel and effectively reverse the mathematical blurring process, restoring the crispness of the original scene.
4. **Automatic Colorization:** ML models can be trained on millions of color images to learn how colors correspond to specific shapes and textures. They can then automatically and realistically colorize old black-and-white photographs or historical footage.
5. **Image Inpainting (Restoration):** If an image has physical damage (like scratches on an old scanned photo) or unwanted objects (like a photobomber), ML can analyze the surrounding context and intelligently generate missing pixels to seamlessly fill the gaps.
