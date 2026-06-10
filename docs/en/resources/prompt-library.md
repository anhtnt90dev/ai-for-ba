---
title: "Prompt Playbook"
---

# Prompt Playbook

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
Review the supplied requirements using this taxonomy: ambiguity, conflict, missing actor, missing data, missing business rule, NFR gap, non-testable wording. Return a table with issue, severity, evidence, affected text, clarification question, and testable rewrite candidate. Do not invent policy.
```

## AI feature specification prompt

```text
Specify this AI-enabled feature with user goal, AI task, allowed inputs, prohibited inputs, output contract, confidence threshold, human review trigger, fallback behavior, correction capture, audit, monitoring events, and evaluation metrics.
```

## RAG assistant prompt

```text
Create a RAG knowledge contract: source inventory, authority, freshness, access control, chunking assumptions, citation behavior, conflict handling, fallback, retrieval metrics, answer-quality metrics, and test questions.
```

## Prompt injection and unsafe input review

```text
Review this AI-enabled workflow for prompt injection and unsafe input risk. Identify user-controlled fields, retrieved content, tool actions, data exposure paths, and instructions that could override system rules. Return risks, likely attack examples, BA requirements, acceptance criteria, logging needs, and human escalation triggers.
```

## Bias and fairness review prompt

```text
Assess this AI use case for bias and fairness risk. Identify affected user groups, sensitive attributes, proxy variables, historical data bias, harmful outcomes, explainability needs, review controls, appeal paths, and metrics the BA should request before release.
```

## Observability and evaluation plan prompt

```text
Create an observability and evaluation plan for this AI feature. Include success metric, failure metric, quality rubric, evaluation set design, model output logging, user feedback capture, human correction capture, drift signals, alert thresholds, dashboard users, and release decision gates.
```

## Model selection and cost trade-off prompt

```text
Compare model options for this use case. Evaluate task fit, latency, accuracy need, context size, privacy, access control, integration complexity, unit cost, token budget, fallback option, and when a smaller model or deterministic rule is enough. Return a BA decision matrix with recommendation and assumptions.
```
