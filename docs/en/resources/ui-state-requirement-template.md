---
title: "UI State Requirement Template"
description: "Use this when translating Figma, wireframes, or a screen idea into implementable frontend requirements."
---

# UI State Requirement Template

Use this when translating Figma, wireframes, or a screen idea into implementable frontend requirements.

## Template

| Section | What to capture |
| --- | --- |
| Screen purpose | Primary user goal, entry point, and decision the screen supports. |
| State inventory | Loading, empty, success, error, partial data, permission denied, offline, and validation states. |
| Control behavior | Visible, hidden, disabled, read-only, default, tooltip, and confirmation behavior by role and state. |
| Copy and recovery | Error message, empty-state guidance, support path, retry, and next best action. |
| Responsive and accessibility | Mobile layout, keyboard behavior, focus order, labels, announcements, and contrast expectations. |
| Backend dependency | API call, field source, cache, timeout, partial failure, and audit requirement. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Convert this UI concept into a UI state requirement table. Include roles, states, controls, copy, backend dependency, acceptance criteria, and open questions for UX/product/frontend/backend/QA.
```
