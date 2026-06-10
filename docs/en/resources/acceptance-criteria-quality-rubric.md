---
title: "Acceptance Criteria Quality Rubric"
description: "Use this to review AI-generated or human-written acceptance criteria before sprint refinement."
---

# Acceptance Criteria Quality Rubric

Use this to review AI-generated or human-written acceptance criteria before sprint refinement.

## Template

| Section | What to capture |
| --- | --- |
| Actor and trigger | The user, role, system event, or scheduled trigger is explicit. |
| Business rule | Thresholds, permissions, calculations, and policy constraints are testable. |
| Data and state | Required fields, lifecycle state, preconditions, and invalid data are covered. |
| Negative and edge cases | Boundary, failure, exception, and permission scenarios are included. |
| NFR and observability | Performance, security, audit, accessibility, localization, or analytics expectations are stated when relevant. |
| Evidence | Each criterion traces to source, stakeholder decision, or labeled assumption. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Review these acceptance criteria with the rubric. Return defects by severity, missing cases, testability gaps, and rewrite candidates without inventing policy.
```
