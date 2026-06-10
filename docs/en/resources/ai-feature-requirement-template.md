---
title: "AI Feature Requirement Template"
description: "Use this when a feature contains model output, generated recommendations, classification, summarization, retrieval, or AI-assisted decisions."
---

# AI Feature Requirement Template

Use this when a feature contains model output, generated recommendations, classification, summarization, retrieval, or AI-assisted decisions.

## Template

| Section | What to capture |
| --- | --- |
| User goal | Who uses the AI output, for what decision, and what business outcome should improve? |
| AI task boundary | What the AI may do, what it must not do, and when deterministic rules are preferred. |
| Inputs and prohibited inputs | Allowed sources, PII handling, sensitive fields, and data retention expectations. |
| Output contract | Format, required fields, confidence behavior, explanation, citation, and unsupported-claim label. |
| Human review and fallback | Triggers, reviewer role, escalation path, refusal message, correction capture, and audit. |
| Evaluation and monitoring | Test set, quality rubric, telemetry, drift signal, alert threshold, and release gate. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Create an AI feature requirement using the template. Ask for missing context first. Separate facts, assumptions, decisions needed, and unsupported claims.
```
