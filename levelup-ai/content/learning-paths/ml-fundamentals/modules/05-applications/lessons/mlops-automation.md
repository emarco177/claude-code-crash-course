# MLOps Automation

MLOps keeps models fresh without manual heroics.

## Pipelines

- Use orchestration (Airflow, Prefect, Dagster) to schedule feature builds, training, evaluation, and deployment.
- Parameterize runs so you can re-train for multiple segments with one DAG.

## Continuous training vs. triggered training

- **Continuous**: re-train on a cadence (daily/weekly) when data drift is expected.
- **Triggered**: monitor performance metrics and kick off training when they degrade.

## Tooling checklist

- Experiment tracking (MLflow, Weights & Biases)
- Model registry with approval workflow
- Feature store for online/offline consistency
- Automated canary + rollback scripts

Once tooling is in place you can focus on solving domain problems, like the anomaly detection lab that closes this path.
