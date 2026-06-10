---
title: "Definition of Ready and Done for AI-Augmented BA Work"
description: "Use this to define quality gates before AI-assisted BA artifacts enter refinement, build, test, or release decisions."
---

# Definition of Ready and Done for AI-Augmented BA Work

Use this to define quality gates before AI-assisted BA artifacts enter refinement, build, test, or release decisions.

## Template

| Section | What to capture |
| --- | --- |
| Ready: source pack | Sources have IDs, owners, dates, approval status, and sensitivity labels. |
| Ready: task boundary | The AI task, output format, constraints, and prohibited assumptions are explicit. |
| Ready: decision owner | Open questions and approvals have owners and target dates. |
| Done: evidence review | Facts, assumptions, unsupported claims, and decisions are separated. |
| Done: receiving-team fit | Product, engineering, QA, UX, operations, or governance can act from the artifact. |
| Done: risk control | NFR, privacy, access, monitoring, fallback, and human review controls are included when relevant. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Evaluate this BA artifact against Definition of Ready and Done for AI-assisted work. Return pass/fail, gaps, remediation steps, and questions for stakeholders.
```
