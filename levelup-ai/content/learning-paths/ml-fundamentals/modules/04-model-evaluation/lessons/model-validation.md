# Validation Strategies

We evaluate on validation data to estimate generalization. Naive random splits can mislead when time, geography, or users leak across folds.

## Hold-out split

Simple and fast. Use when data is iid and you have plenty of samples. Always keep a final test set untouched for model selection.

## k-fold cross-validation

```python
from sklearn.model_selection import KFold

kf = KFold(n_splits=5, shuffle=True, random_state=42)
for train_idx, val_idx in kf.split(X):
    ...
```

- Gives a distribution of scores instead of a single number.
- Costly for large models because it trains `k` times.

## Time-series validation

- Use expanding windows or sliding windows that respect chronology.
- Avoid shuffling! Leakage across time is common in finance and ops workloads.

## Hyperparameter hygiene

- Tune on validation folds, evaluate finalists on the test set once.
- Log every experiment configuration for reproducibility.

Next up: a quiz to make sure you can pick the right metric + validation combo in real projects.
