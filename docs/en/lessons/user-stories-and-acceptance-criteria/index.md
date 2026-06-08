---
title: "User Stories and Acceptance Criteria"
description: "Use AI to draft stories and acceptance criteria while preserving business intent, edge cases, and testability."
---

# User Stories and Acceptance Criteria

<div class="lesson-meta">
  <span>AI-Augmented BA Workflow</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Explain user stories and acceptance criteria in business language.
- Apply the concept to a realistic BA workflow.
- Use AI output as draft evidence, not as unchecked truth.
- Identify the review questions a BA must ask before sharing the artifact.

## Why this matters for BA work

AI changes how analysis work is produced, but it does not remove the BA's accountability for clarity, evidence, and decisions.

<div class="ba-callout">
Use AI to draft stories and acceptance criteria while preserving business intent, edge cases, and testability.
</div>

## Core concept

The useful BA pattern is controlled collaboration: provide the model with business context, ask for structured output, require evidence, then review the result against goals, rules, risks, and stakeholder decisions.

## Practical BA example

A vague request says, 'Users can update profiles.' The BA uses AI to split actor goals, editable fields, validation, permissions, audit, error handling, and acceptance criteria.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Validated artifact"]
    E --> F["User Stories and Acceptance Criteria"]
```

## BA workflow

1. Frame the business question before opening the AI tool.
2. Provide source context and explicit constraints.
3. Ask for structured output that maps back to the source.
4. Run a critique pass for ambiguity, gaps, risk, and testability.
5. Convert the result into an artifact the team can inspect and own.

## Prompt or template

```text
Convert this requirement into user stories and Given-When-Then acceptance criteria. Include negative cases, permissions, audit needs, and unresolved questions.
```

## What a BA should remember

- AI is a reasoning accelerator, not a decision owner.
- Ground every important claim in source context or stakeholder confirmation.
- A good BA keeps the review loop visible: draft, critique, revise, validate.
