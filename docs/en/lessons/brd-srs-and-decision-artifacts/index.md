---
title: "BRD, SRS, and Decision Artifacts"
description: "AI can draft documents, but BA value comes from decision structure, evidence, scope control, and reviewability."
---

# BRD, SRS, and Decision Artifacts

<div class="lesson-meta">
  <span>Analysis Artifacts and Diagramming</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Use AI to structure BRD and SRS sections without losing ownership.
- Preserve decisions, assumptions, risks, and evidence.
- Avoid document polish that hides unresolved scope.

## Why this matters for BA work

<div class="ba-callout">
AI can draft documents, but BA value comes from decision structure, evidence, scope control, and reviewability.
</div>

Business Analysts sit between problem framing, stakeholder meaning, delivery constraints, and product decisions. In AI work, that position becomes more important because unclear language can create false certainty quickly. This lesson gives you a practical control you can apply before AI output becomes scope, backlog, or delivery commitment.

## Mental model or core concept

A BA document is not valuable because it is long; it is valuable because it makes decisions inspectable. AI can create first drafts, but the BA must maintain decision log, scope boundaries, source evidence, risks, assumptions, and open questions. A polished document with hidden uncertainty is dangerous.

## Practical BA example

Workshop notes become a BRD section. AI drafts a clean narrative, but the BA adds a decision table, explicit out-of-scope items, unresolved pricing rules, and stakeholder approval status before sharing.

## Diagram

```mermaid
flowchart TD
    A["Workshop notes"] --> B["Decision log"]
    A --> C["Scope boundary"]
    A --> D["Assumptions"]
    A --> E["Open questions"]
    B --> F["BRD / SRS section"]
    C --> F
    D --> F
    E --> G["Follow-up plan"]
```

## BA artifact

### Decision Artifact Skeleton

| Section | Purpose | AI can help with | BA must own |
| --- | --- | --- | --- |
| Business objective | State why the work exists. | Summarize workshop notes. | Metric and priority tradeoff. |
| Scope boundary | Prevent accidental expansion. | Draft in/out lists. | Final scope decision. |
| Decision log | Show what is settled. | Format decisions. | Owner, date, rationale. |
| Open questions | Keep uncertainty visible. | Cluster questions. | Resolution path and owner. |

## AI collaboration prompt

```text
Draft a BRD/SRS section from these notes. Include objective, scope, stakeholders, decisions, assumptions, requirements, risks, metrics, open questions, and source evidence. Label anything inferred, and keep unresolved items out of final requirements.
```

## Mistakes to avoid

- Using AI to create polished documents before decisions are clear.
- Hiding assumptions in prose.
- Mixing current state, future state, and open questions.
- Forgetting scope boundaries.

## Apply this tomorrow

1. Add a decision log to one document.
2. Ask AI to extract assumptions from your draft.
3. Move unresolved items into an open-question table.
4. Review out-of-scope items with stakeholders.

## What a BA should remember

- Documents should make decisions visible.
- Polish is not clarity.
- AI drafts; BA controls scope and evidence.
