---
title: "Prompt Review Checklist"
description: "Use this before turning a one-off prompt into a reusable team prompt or workflow."
---

# Prompt Review Checklist

Use this before turning a one-off prompt into a reusable team prompt or workflow.

## Template

| Section | What to capture |
| --- | --- |
| Role and goal | The prompt names the BA role, business goal, user, and decision context. |
| Source boundaries | The prompt says which sources may be used and what to do when evidence is missing. |
| Output contract | The result format, required columns, severity labels, and validation questions are defined. |
| Safety and privacy | The prompt excludes confidential data, PII, unsafe instructions, and unsupported claims. |
| Critique step | The model must review its own output for ambiguity, conflict, gaps, and hallucination. |
| Reuse notes | Inputs, assumptions, examples, and known failure modes are documented for the BA team. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Review this prompt for BA team reuse. Score role clarity, source boundaries, output contract, safety, critique step, and failure modes. Suggest a stronger version.
```
