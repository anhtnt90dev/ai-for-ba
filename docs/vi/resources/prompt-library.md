---
title: "Prompt playbook"
---

# Prompt playbook

## Context package template

```text
Role:
Business goal:
Users and stakeholders:
Scope in / scope out:
Source IDs:
Constraints:
Task:
Output format:
Quality bar:
Questions before drafting:
```

## Requirement review prompt

```text
Review requirement được cung cấp bằng taxonomy: ambiguity, conflict, missing actor, missing data, missing business rule, NFR gap, non-testable wording. Trả về bảng gồm issue, severity, evidence, affected text, clarification question và candidate rewrite test được. Không tự bịa policy.
```

## AI feature specification prompt

```text
Đặc tả AI-enabled feature này với user goal, AI task, allowed input, prohibited input, output contract, confidence threshold, human review trigger, fallback behavior, correction capture, audit, monitoring event và evaluation metric.
```

## RAG assistant prompt

```text
Tạo RAG knowledge contract: source inventory, authority, freshness, access control, chunking assumption, citation behavior, conflict handling, fallback, retrieval metric, answer-quality metric và test question.
```

## Prompt injection and unsafe input review

```text
Review workflow AI-enabled này cho prompt injection và unsafe input risk. Identify user-controlled field, retrieved content, tool action, data exposure path và instruction có thể override system rule. Trả về risk, ví dụ attack có khả năng xảy ra, BA requirement, acceptance criteria, logging need và human escalation trigger.
```

## Bias and fairness review prompt

```text
Assess use case AI này cho bias và fairness risk. Identify affected user group, sensitive attribute, proxy variable, historical data bias, harmful outcome, explainability need, review control, appeal path và metric BA nên yêu cầu trước release.
```

## Observability and evaluation plan prompt

```text
Tạo observability và evaluation plan cho AI feature này. Bao gồm success metric, failure metric, quality rubric, evaluation set design, model output logging, user feedback capture, human correction capture, drift signal, alert threshold, dashboard user và release decision gate.
```

## Model selection and cost trade-off prompt

```text
Compare model option cho use case này. Evaluate task fit, latency, accuracy need, context size, privacy, access control, integration complexity, unit cost, token budget, fallback option và khi nào smaller model hoặc deterministic rule là đủ. Trả về BA decision matrix có recommendation và assumption.
```
