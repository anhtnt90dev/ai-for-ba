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
