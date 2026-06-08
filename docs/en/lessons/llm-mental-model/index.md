---
title: "LLM Mental Model"
description: "Build a practical mental model of how language models predict, transform, summarize, classify, and reason over text."
---

# LLM Mental Model

<div class="lesson-meta">
  <span>AI Foundations for Business Analysts</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Explain llm mental model in business language.
- Apply the concept to a realistic BA workflow.
- Use AI output as draft evidence, not as unchecked truth.
- Identify the review questions a BA must ask before sharing the artifact.

## Why this matters for BA work

AI changes how analysis work is produced, but it does not remove the BA's accountability for clarity, evidence, and decisions.

<div class="ba-callout">
Build a practical mental model of how language models predict, transform, summarize, classify, and reason over text.
</div>

## Core concept

The useful BA pattern is controlled collaboration: provide the model with business context, ask for structured output, require evidence, then review the result against goals, rules, risks, and stakeholder decisions.

## Practical BA example

When asking AI to write acceptance criteria, the BA should not assume the model knows hidden business rules. The model can infer patterns, but the BA must provide constraints, examples, edge cases, and review criteria.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Validated artifact"]
    E --> F["LLM Mental Model"]
```

## BA workflow

1. Frame the business question before opening the AI tool.
2. Provide source context and explicit constraints.
3. Ask for structured output that maps back to the source.
4. Run a critique pass for ambiguity, gaps, risk, and testability.
5. Convert the result into an artifact the team can inspect and own.

## Prompt or template

```text
Explain your assumptions before producing the answer. Mark every assumption as explicit, inferred, or missing. Do not invent policy or system behavior that is not in the provided context.
```

## What a BA should remember

- AI is a reasoning accelerator, not a decision owner.
- Ground every important claim in source context or stakeholder confirmation.
- A good BA keeps the review loop visible: draft, critique, revise, validate.
