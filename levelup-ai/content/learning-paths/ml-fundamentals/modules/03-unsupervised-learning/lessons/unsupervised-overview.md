# Why Unsupervised Learning?

Unlike supervised learning, **unsupervised learning** uncovers structure in unlabeled data. The goal is not to predict a known label, but to reveal patterns that help humans or downstream systems make decisions.

- Customer segmentation for marketing campaigns.
- Document organization for search engines.
- Recommendation cold-start where no explicit ratings exist.

## Types of unsupervised tasks

| Task | Goal | Example |
| ---- | ---- | ------ |
| Clustering | Group similar points | Segment shoppers by behavior |
| Dimensionality Reduction | Compress features while preserving variance | Visualize 1000-dim embeddings |
| Anomaly Detection | Highlight rare events | Spot fraudulent transactions |

## No free labels

Because there are no ground-truth labels, evaluation is more qualitative:

- Use silhouette score or Davies–Bouldin index for clustering quality.
- Project high-dimensional embeddings with t-SNE/UMAP for visual inspection.
- Validate anomalies with domain experts before triggering automated actions.

Unsupervised methods often prime data for supervised systems. Next lesson compares the most common clustering algorithms.
