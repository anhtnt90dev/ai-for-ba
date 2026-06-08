---
title: "Structured Outputs and Reusable Prompts"
description: "Design prompts that return tables, checklists, JSON-like structures, and reusable BA artifact formats."
---

# Structured Outputs and Reusable Prompts

<div class="lesson-meta">
  <span>AI Collaboration and Context Engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Explain structured outputs and reusable prompts in business language.
- Apply the concept to a realistic BA workflow.
- Use AI output as draft evidence, not as unchecked truth.
- Identify the review questions a BA must ask before sharing the artifact.

## Why this matters for BA work

AI changes how analysis work is produced, but it does not remove the BA's accountability for clarity, evidence, and decisions.

<div class="ba-callout">
Design prompts that return tables, checklists, JSON-like structures, and reusable BA artifact formats.
</div>

## Core concept

The useful BA pattern is controlled collaboration: provide the model with business context, ask for structured output, require evidence, then review the result against goals, rules, risks, and stakeholder decisions.

## Practical BA example

Instead of asking for a generic summary, the BA requests a table with requirement ID, actor, business rule, acceptance criteria, source, risk, and open question.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Validated artifact"]
    E --> F["Structured Outputs and Reusable Prompts"]
```

## BA workflow

1. Frame the business question before opening the AI tool.
2. Provide source context and explicit constraints.
3. Ask for structured output that maps back to the source.
4. Run a critique pass for ambiguity, gaps, risk, and testability.
5. Convert the result into an artifact the team can inspect and own.

## Prompt or template

```text
Return a table with columns: ID, User Goal, Requirement, Acceptance Criteria, Source Evidence, Risk, Open Question, Owner.
```

## What a BA should remember

- AI is a reasoning accelerator, not a decision owner.
- Ground every important claim in source context or stakeholder confirmation.
- A good BA keeps the review loop visible: draft, critique, revise, validate.
