---
title: "AI Risk and Human Review Matrix"
description: "Use this to decide when AI output can proceed, when it needs review, and when it must fallback or escalate."
---

# AI Risk and Human Review Matrix

Use this to decide when AI output can proceed, when it needs review, and when it must fallback or escalate.

## Template

| Section | What to capture |
| --- | --- |
| Low risk | Drafting, summarization, formatting, or brainstorming from non-sensitive sources with BA review. |
| Medium risk | Requirements, customer-facing text, support recommendations, or source-grounded answers with named reviewer. |
| High risk | Legal, financial, medical, employment, access control, pricing, compliance, or irreversible decisions. |
| Review trigger | Low confidence, missing citation, conflict, PII, sensitive user group, high-value transaction, or user harm risk. |
| Fallback | Explain limitation, ask for more context, route to human, log reason, and avoid invented answers. |
| Audit | Store source, output, reviewer decision, correction, timestamp, and unresolved risk. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Classify this AI workflow by risk tier. Define human review triggers, fallback behavior, audit needs, owners, and acceptance criteria for each tier.
```
