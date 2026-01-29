# Inside Supervised Learning

Supervised learning algorithms learn from examples that include both the **input features** and the **desired output**. During training the model finds a function that maps inputs to outputs with minimal error. Once trained, the model predicts outputs for unseen data using the same mapping.

## Ingredients of a supervised system

1. **Dataset** – rows of labeled examples `(x, y)` where `x` is a feature vector and `y` is a target value or class.
2. **Loss function** – quantifies how wrong the model is on the training set, e.g. mean squared error or cross entropy.
3. **Learner** – optimizes the model parameters to minimize the loss.
4. **Evaluation loop** – measures generalization on held-out validation data.

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

model = LogisticRegression()
model.fit(X_train, y_train)
print("val accuracy", accuracy_score(y_val, model.predict(X_val)))
```

## When to pick supervised learning

- You have historical data with labels (fraud/not fraud, churn/no churn, house prices).
- The business objective can be translated into a prediction.
- Feedback loops exist so you can keep updating the model.

## Common pitfalls

- **Data leakage**: features that would not exist at inference time.
- **Skewed labels**: use stratified splits and metrics like ROC-AUC when classes are imbalanced.
- **Overfitting**: always monitor validation performance and keep a final test set untouched.

With the basics covered, the next lesson focuses on crafting features that unlock signal for your models.
