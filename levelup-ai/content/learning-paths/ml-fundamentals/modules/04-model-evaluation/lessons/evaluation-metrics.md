# Picking the Right Metrics

The perfect metric depends on business constraints. Accuracy alone hides the trade-offs between precision and recall.

## Classification metrics

- **Precision** answers "When we predict positive, how often are we correct?"
- **Recall** answers "Of all true positives, how many did we catch?"
- **F1** is the harmonic mean of precision and recall.
- **ROC-AUC** summarizes the trade-off as the discrimination threshold moves.

```python
from sklearn.metrics import classification_report, roc_auc_score

print(classification_report(y_true, y_pred))
print("roc_auc", roc_auc_score(y_prob, y_score))
```

## Regression metrics

- Mean Absolute Error (MAE) is robust to outliers.
- Root Mean Squared Error (RMSE) penalizes large mistakes.
- $R^2$ expresses variance explained.

## Calibration and fairness

High ROC-AUC does not guarantee calibrated probabilities or fairness across demographic slices. Track metrics per segment and apply post-processing (Platt scaling, isotonic regression) when necessary.

The next lesson covers validation strategies that keep these metrics honest.
