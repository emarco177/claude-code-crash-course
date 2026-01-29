# Clustering Algorithms Compared

Different clustering algorithms make different assumptions about cluster shape, density, and scale. Choosing the right tool matters.

## K-Means

- Minimizes distance to `k` centroids.
- Sensitive to initialization and scale.
- Works well when clusters are spherical and similar in size.

## Hierarchical Clustering

- Builds a tree of merges/splits.
- Does not require choosing `k` up front (use dendrogram thresholds).
- Captures nested groupings but can be expensive for large datasets.

## DBSCAN

- Groups dense regions, marking sparse points as noise.
- Handles arbitrary shapes and automatically finds number of clusters.
- Requires parameters `eps` and `min_samples` that depend on data scale.

## Practical tips

```
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

pipe = make_pipeline(StandardScaler(), KMeans(n_clusters=5, n_init=20))
labels = pipe.fit_predict(customer_features)
```

- Always scale numeric features before distance-based clustering.
- Compare inertia/silhouette across multiple `k` values.
- For streaming data, use incremental clustering or approximate methods like MiniBatchKMeans.

In the upcoming lab you'll implement a minimal K-Means routine to internalize these ideas.
