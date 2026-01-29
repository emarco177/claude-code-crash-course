# Feature Engineering Playbook

Great ML models start with thoughtful feature design. Feature engineering turns raw columns into representations that reveal signal to algorithms.

## Numeric features

- Normalize magnitudes with `StandardScaler` so gradient-based models converge faster.
- Add interaction features (e.g., `bedrooms * bathrooms`) to capture non-linearities.
- Aggregate temporal stats like `avg_purchases_last_30_days` for sequence data.

## Categorical features

```python
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer

preprocess = ColumnTransformer([
    ("num", StandardScaler(), numeric_cols),
    ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
])
```

- Use target encoding when categories count in the thousands.
- For free text, start with TF-IDF, then graduate to transformer embeddings.

## Feature stores

In production you rarely engineer features inside notebooks. Modern teams push logic into **feature pipelines** (DBT, Spark, Feast) so that:

- Training and inference use the same transformations.
- Features are documented and versioned.
- Data scientists can reuse proven signals across models.

## Checklist

- [ ] Can each feature be computed at inference time?
- [ ] Are there monitoring hooks for drift per feature?
- [ ] Are privacy/PII constraints handled by design?

Next up you will solidify these ideas by implementing a regression model from scratch.
