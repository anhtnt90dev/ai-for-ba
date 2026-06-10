---
title: "RAG Knowledge Contract Canvas"
description: "Use this before specifying a knowledge assistant, policy assistant, support assistant, or document Q&A feature."
---

# RAG Knowledge Contract Canvas

Use this before specifying a knowledge assistant, policy assistant, support assistant, or document Q&A feature.

## Template

| Section | What to capture |
| --- | --- |
| Source inventory | Approved sources, owners, update cadence, effective dates, and excluded sources. |
| Authority and conflicts | Priority order, conflict warnings, policy override rules, and decision owner. |
| Access control | Role-based retrieval, document sensitivity, tenant boundary, and no-leakage test cases. |
| Citation behavior | Citation display, source snippet, confidence, unsupported answer, and freshness signal. |
| Fallback | No-answer behavior, escalation path, human review trigger, and support handoff. |
| Retrieval evaluation | Representative questions, expected source, wrong-source cases, and retrieval quality metric. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Create a RAG knowledge contract for this assistant. Include source authority, freshness, access control, citation, conflict handling, fallback, retrieval metrics, and test questions.
```
