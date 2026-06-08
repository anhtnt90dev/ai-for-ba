---
title: "Diagramming for BA"
description: "A good diagram changes the conversation; it reveals decisions, boundaries, and gaps that text hides."
---

# Diagramming for BA

<div class="lesson-meta">
  <span>Analysis Artifacts and Diagramming</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Choose the right diagram type for a BA question.
- Use AI to draft Mermaid diagrams safely.
- Review diagrams for missing actors, flows, and exceptions.

## Why this matters for BA work

<div class="ba-callout">
A good diagram changes the conversation; it reveals decisions, boundaries, and gaps that text hides.
</div>

Business Analysts sit between problem framing, stakeholder meaning, delivery constraints, and product decisions. In AI work, that position becomes more important because unclear language can create false certainty quickly. This lesson gives you a practical control you can apply before AI output becomes scope, backlog, or delivery commitment.

## Mental model or core concept

Diagrams are thinking tools. Flowcharts clarify process decisions; sequence diagrams clarify system interactions; state diagrams clarify lifecycle; matrices clarify rule combinations. AI can translate text to Mermaid, but the BA must validate system boundaries, actor responsibility, exception paths, and business rules.

## Practical BA example

A requirement says 'payment is verified before fulfillment.' A sequence diagram reveals missing responsibility between payment gateway, order service, warehouse, and customer notification. The BA then asks who handles payment failure and when inventory is released.

## Diagram

```mermaid
flowchart TD
    A["BA question"] --> B{"What must be clarified?"}
    B --> C["Workflow -> Flowchart"]
    B --> D["System interaction -> Sequence"]
    B --> E["Lifecycle -> State"]
    B --> F["Rule combinations -> Decision table"]
    C --> G["Review gaps"]
    D --> G
    E --> G
    F --> G
```

## BA artifact

### Diagram Selection Guide

| BA question | Diagram type | Use when | Review focus |
| --- | --- | --- | --- |
| How does work flow? | Flowchart | Process and decisions matter. | Actors, decision rules, exceptions. |
| How do systems interact? | Sequence diagram | APIs/events are involved. | System boundaries and failure messages. |
| What states can an entity have? | State diagram | Lifecycle matters. | Allowed transitions and triggers. |
| Which rule applies? | Decision table | Combinations drive outcomes. | Complete and exclusive rules. |

## AI collaboration prompt

```text
Choose the best diagram type for this requirement and explain why. Then draft the Mermaid diagram. After the diagram, list missing actors, unclear boundaries, exception paths, and business rules that need validation.
```

## Mistakes to avoid

- Using one diagram type for every problem.
- Letting AI draw a diagram without checking business meaning.
- Omitting failure paths.
- Creating diagrams that are pretty but not decision-useful.

## Apply this tomorrow

1. Convert one text-heavy requirement into a Mermaid diagram.
2. Ask AI which diagram type fits the question.
3. Review the diagram with a developer for boundary gaps.
4. Add exception paths before sharing.

## What a BA should remember

- Diagrams are analysis, not decoration.
- The best diagram exposes the next decision.
- AI draws quickly; BA checks meaning.
