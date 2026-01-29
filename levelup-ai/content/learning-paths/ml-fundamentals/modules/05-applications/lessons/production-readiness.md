# Production-Ready ML

Shipping ML is about reliability as much as accuracy.

## Interfaces

- Batch jobs: run nightly predictions and write to warehouses.
- Online APIs: respond within strict latency budgets; pre-load models and use async feature fetchers.
- Edge deployments: compress models, quantize weights, and handle offline updates.

## Monitoring

Track three categories:

1. **Data quality** – schema drift, null rates, unexpected distributions.
2. **Model quality** – accuracy/recall measured with delayed labels.
3. **System health** – latency, error rates, cost.

## Incident response

- Keep a rollback model ready (previous version or rule-based fallback).
- Alert on drift beyond agreed thresholds.
- Log rich context (features, prediction, metadata) for later analysis.

By hardening pipelines and observability you set the stage for automation, which is the focus of the next lesson.
