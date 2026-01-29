# Types of Machine Learning

## Overview

Machine learning can be categorized into three main types based on how the algorithm learns:

1. **Supervised Learning** - Learning with labeled examples
2. **Unsupervised Learning** - Finding patterns in unlabeled data
3. **Reinforcement Learning** - Learning through trial and error

Let's explore each type in detail.

## 1. Supervised Learning

### What is it?

Supervised learning uses **labeled training data** - data where we know the correct answer. The algorithm learns to map inputs to outputs.

Think of it like learning with a teacher who provides correct answers.

### Example

```python
# Training data with labels
X = [[1400], [1600], [1700]]  # Square feet
y = [245000, 312000, 279000]   # Prices (labels)

# Train the model
model.fit(X, y)

# Predict on new data
price = model.predict([[1500]])  # → $267,500
```

### Common Tasks

**Classification**: Predicting categories
- Email spam detection (spam/not spam)
- Disease diagnosis (healthy/sick)
- Image recognition (cat/dog/bird)

**Regression**: Predicting continuous values
- House price prediction
- Stock price forecasting
- Temperature prediction

### Popular Algorithms
- Linear Regression
- Logistic Regression
- Decision Trees
- Random Forests
- Neural Networks
- Support Vector Machines (SVM)

## 2. Unsupervised Learning

### What is it?

Unsupervised learning works with **unlabeled data** - data without correct answers. The algorithm discovers hidden patterns or structures on its own.

Think of it like exploring without a map.

### Example

```python
from sklearn.cluster import KMeans

# Customer data without labels
customers = [[25, 50000], [30, 60000], [22, 45000], [45, 80000]]

# Find groups (clusters)
kmeans = KMeans(n_clusters=2)
groups = kmeans.fit_predict(customers)
# → [0, 0, 0, 1]  # Grouped by similarity
```

### Common Tasks

**Clustering**: Grouping similar items
- Customer segmentation
- Document organization
- Image compression

**Dimensionality Reduction**: Simplifying data
- Feature extraction
- Data visualization
- Noise reduction

**Anomaly Detection**: Finding outliers
- Fraud detection
- Network intrusion detection
- Equipment failure prediction

### Popular Algorithms
- K-Means Clustering
- Hierarchical Clustering
- Principal Component Analysis (PCA)
- Autoencoders
- DBSCAN

## 3. Reinforcement Learning

### What is it?

Reinforcement learning learns through **trial and error** with feedback. An agent takes actions in an environment and receives rewards or penalties.

Think of it like training a dog with treats.

### Example

```python
# Game playing agent
for episode in range(1000):
    state = env.reset()

    while not done:
        action = agent.choose_action(state)
        next_state, reward, done = env.step(action)

        # Learn from reward
        agent.update(state, action, reward, next_state)
        state = next_state
```

### Common Applications
- Game playing (Chess, Go, video games)
- Robotics (Walking, grasping)
- Autonomous vehicles
- Resource management
- Recommendation systems

### Key Concepts
- **Agent**: The learner/decision maker
- **Environment**: What the agent interacts with
- **State**: Current situation
- **Action**: Choices the agent can make
- **Reward**: Feedback signal

### Popular Algorithms
- Q-Learning
- Deep Q-Networks (DQN)
- Policy Gradients
- Actor-Critic
- Proximal Policy Optimization (PPO)

## Comparison Table

| Type | Data Type | Goal | Example |
|------|-----------|------|---------|
| **Supervised** | Labeled | Predict outputs | Email spam filter |
| **Unsupervised** | Unlabeled | Find patterns | Customer grouping |
| **Reinforcement** | Trial & error | Maximize rewards | Game AI |

## Choosing the Right Type

### Use Supervised Learning when:
- You have labeled training data
- You want to predict specific outcomes
- The relationship between inputs and outputs is important

### Use Unsupervised Learning when:
- You don't have labels
- You want to explore data structure
- You need to reduce complexity or find anomalies

### Use Reinforcement Learning when:
- There's a clear reward signal
- Decisions are sequential
- The environment can be simulated

## Hybrid Approaches

Modern systems often combine multiple types:

**Semi-supervised Learning**
- Small amount of labeled data + large amount of unlabeled data
- Example: Photo tagging with few labels

**Self-supervised Learning**
- Creates labels from the data itself
- Example: Predicting next word in a sentence (used in GPT models)

## Practical Example: Email System

Let's see how different ML types work together:

```python
# 1. Supervised: Spam classification
spam_classifier.predict(email)  # spam/not spam

# 2. Unsupervised: Topic clustering
topics = cluster_emails(inbox)  # group by similarity

# 3. Reinforcement: Smart replies
reply_agent.suggest(email, user_feedback)  # learn from clicks
```

## Key Takeaways

- **Supervised learning** uses labeled data to learn input-output mappings
- **Unsupervised learning** discovers patterns in unlabeled data
- **Reinforcement learning** learns through trial and error with rewards
- Different problems require different learning types
- Modern applications often combine multiple approaches

## Next Steps

In the next lesson, we'll explore the complete machine learning workflow - from data collection to model deployment. Understanding this process is essential for building real-world ML systems.
