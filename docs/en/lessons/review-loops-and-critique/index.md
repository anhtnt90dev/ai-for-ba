---
title: "Review Loops and Critique"
description: "AI becomes safer when BAs use it in loops: draft, critique, revise, and approve."
---

# Review Loops and Critique

<div class="lesson-meta">
  <span>AI Collaboration and Context Engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Story mode: project walkthrough

<div class="story-mode-panel">
  <p class="story-eyebrow">Story prototype</p>
  <h3>The best AI answer appears after the second question</h3>
  <p class="story-intro">Maya receives a requirement draft that looks complete until AI is asked to attack it. Instead of asking AI for a final answer, she uses the lesson pattern to make the situation visible, reviewable, and useful for the next project decision.</p>
  <div class="story-scene-grid">
<article class="story-scene">
  <span>Scene 1</span>
  <b>01</b>
  <strong>The request is vague</strong>
  <p>The team gives Maya a requirement draft that looks complete until AI is asked to attack it and expects a clean answer by the end of the day.</p>
</article>
<article class="story-scene">
  <span>Scene 2</span>
  <b>02</b>
  <strong>AI creates a first draft</strong>
  <p>The draft is helpful, but it hides uncertainty around Critique and Revision.</p>
</article>
<article class="story-scene">
  <span>Scene 3</span>
  <b>03</b>
  <strong>Maya turns it into BA evidence</strong>
  <p>She adds source notes, owners, examples, and a focused AI Review Loop Card review table instead of forwarding the raw AI output.</p>
</article>
<article class="story-scene">
  <span>Scene 4</span>
  <b>04</b>
  <strong>The team can decide</strong>
  <p>The final AI Review Loop Card shows what is ready, what is risky, and what needs a human decision.</p>
</article>
  </div>
  <div class="visual-takeaway-strip">
<span>Critique needs context</span>
<span>Red team must be reviewable</span>
<span>Reviewer becomes a BA question</span>
  </div>
</div>

## AI words in plain English

| AI term | Simple meaning | BA use |
| --- | --- | --- |
| Critique | A structured review that looks for weakness. | Use it to name the work clearly before asking AI to help. |
| Red team | A review approach that actively tries to find failure points. | Use it as a review lens, not as a decorative AI word. |
| Reviewer | The person or role that checks the output. | Turn it into a checklist item or stakeholder question. |
| Revision loop | Draft, review, revise, and approve. | Define the rule before the team treats the output as ready. |

## Reality check: how this shows up in projects

<div class="fact-card-grid">
<article class="fact-card">
  <strong>A fast draft can hide weak thinking</strong>
  <span>Ask what evidence, owner, and decision the draft depends on.</span>
  <p>AI can produce AI Review Loop Card quickly, but speed does not prove quality.</p>
</article>
<article class="fact-card">
  <strong>Stakeholders need simple language</strong>
  <span>Explain the term in one sentence before using it in a requirement.</span>
  <p>Terms like Critique and Red team can confuse people outside the AI conversation.</p>
</article>
<article class="fact-card">
  <strong>The AI Review Loop Card must travel</strong>
  <span>Make the next action visible for each receiving team.</span>
  <p>Product, Engineering, QA, and Operations each read this AI Review Loop Card differently.</p>
</article>
</div>

## Visual walkthrough

```mermaid
flowchart LR
    A["Project input"]
    B["AI first draft"]
    A --> B
    C["BA review lenses"]
    B --> C
    D["AI Review Loop Card"]
    C --> D
    E["Team decision"]
    D --> E
```

## Visual decision map

<div class="visual-ba-map">
  <h3>AI Review Loop Card: what the BA should look for</h3>
<div>
  <strong>Draft</strong>
  <span>What the BA must make explicit first.</span>
  <em>Write it in plain language.</em>
</div>
<div>
  <strong>Critique</strong>
  <span>Where AI can help but may also hide uncertainty.</span>
  <em>Add review criteria.</em>
</div>
<div>
  <strong>Revision</strong>
  <span>What can break if the team skips validation.</span>
  <em>Create a decision question.</em>
</div>
<div>
  <strong>Approval</strong>
  <span>What makes the artifact safe to hand off.</span>
  <em>Name owner, evidence, and next step.</em>
</div>
</div>

## Learning outcomes

- Explain Critique in simple BA language.
- Use AI to draft a better AI Review Loop Card.
- Review the output before it becomes scope, test, or delivery work.

## Why this matters for BA work

<div class="ba-callout">
AI becomes safer when BAs use it in loops: draft, critique, revise, and approve.
</div>

Review loops matter because the first AI answer is often optimized for fluency, not for risk. A BA who asks AI to critique, challenge, and revise the draft gets a more useful artifact and a clearer list of issues for human approval.

## Common difficulties for BAs

| Difficulty | Why it is hard in BA work | How a BA handles it |
| --- | --- | --- |
| The team uses Critique without a shared meaning. | People nod in meetings while imagining different outcomes. | Start with a one-sentence definition and show how it changes the AI Review Loop Card. |
| AI output looks more complete than the input deserves. | A fluent draft can hide missing examples, owners, or edge cases. | Ask AI to list assumptions and missing evidence before drafting the final artifact. |
| Reviewers need different details. | Product cares about value, Engineering about constraints, QA about testability, and Ops about support. | Add columns or sections for each receiving team instead of writing one generic paragraph. |

## Where this applies in real projects

| Project moment | BA move | Concrete output |
| --- | --- | --- |
| Discovery workshop | Use AI to organize notes into draft, risks, and open questions. | AI Review Loop Card with source notes and owners. |
| Backlog refinement | Convert AI suggestions into small, testable decisions. | Story, rule, or checklist item with acceptance signal. |
| Handoff review | Ask AI to critique the artifact from Product, Dev, QA, and Ops viewpoints. | Review table with action owner and status. |

## If this is missing

If Review Loops and Critique is missing, the team may still produce documents, but they will be harder to trust, test, and maintain.

| If missing | Project impact | Recovery action |
| --- | --- | --- |
| No shared explanation for Critique | Stakeholders agree verbally but expect different behavior later. | Add a plain-language definition and example. |
| No review of AI assumptions | Unsupported ideas become scope. | Move assumptions into an owner-based validation list. |
| No concrete AI Review Loop Card | The learning stays abstract and does not help delivery. | Produce the artifact as a small table, not a long essay. |

## Mental model or core concept

Review Loops and Critique is easiest to understand as a BA control: make the messy thing visible, let AI help structure it, then review it with humans before it becomes delivery work.

## Practical BA example

Maya asks AI to draft acceptance criteria, then asks another pass to attack ambiguity, missing NFRs, and exception paths. The revised artifact is shorter, sharper, and easier for QA to review.

## Diagram

```mermaid
flowchart TD
    A["AI Review Loop Card"]
    A --> B["Draft"]
    A --> C["Critique"]
    A --> D["Revision"]
    A --> E["Approval"]
```

## BA artifact

### AI Review Loop Card

| Artifact line | What the BA writes | Ready signal | Risk signal |
| --- | --- | --- | --- |
| Draft | Write the concrete draft in project language. | A stakeholder can confirm it. | It is still a slogan. |
| Critique | Describe how AI helps and where it may be wrong. | Review criteria are visible. | The draft hides uncertainty. |
| Revision | Capture the gap, conflict, edge case, or risk. | Owner and next action are named. | The issue is buried in prose. |
| Approval | Define the handoff rule or completion signal. | QA or Engineering can act on it. | No receiving team knows what to do. |

## AI expert note

As an AI reviewer, I would check whether Review Loops and Critique changes the BA artifact in a practical way. Good AI use should expose missing context, create structure, and make review easier. If it only produces nicer wording, the BA has not captured enough value yet.

## Bad vs better example

| Weak pattern | Why it fails | Better BA pattern |
| --- | --- | --- |
| Ask AI to "do Review Loops and Critique" with no source context. | The model fills gaps with plausible wording. | Provide source notes, examples, boundaries, and review criteria. |
| Share the first answer as final. | The team cannot see assumptions or weak evidence. | Run a critique pass and label open decisions. |
| Use AI terms with no explanation. | Business stakeholders disengage or misunderstand. | Explain each term in plain language before using it in scope. |

## Stakeholder questions to ask

| Stakeholder | Question | Why the BA asks |
| --- | --- | --- |
| Product owner | Which outcome should Review Loops and Critique improve first? | Keeps AI work tied to business value. |
| Engineering lead | Which source, system, or constraint could make AI Review Loop Card hard to implement? | Turns hidden technical constraints into requirement questions. |
| QA lead | Which behavior must be testable before we trust this artifact? | Converts fluent AI text into observable checks. |
| Operations or support | What failure path creates manual work after release? | Surfaces support load and fallback needs. |

## Decision log entries

| Decision item | Options to capture | Owner | Evidence needed |
| --- | --- | --- | --- |
| Scope boundary for AI Review Loop Card | Must-have, later, out of scope | Product owner | Business outcome and release constraint |
| Authority for Draft and Critique | Documented source, stakeholder decision, assumption to validate | BA + accountable stakeholder | Source ID, date, and approval status |
| Review gate before handoff | Peer review, QA review, engineering review, formal approval | BA lead or project lead | Risk level and receiving-team readiness |
| Recovery if Using Critique as jargon instead of a project decision. | Rewrite, defer, escalate, or run validation workshop | Decision owner | Impact on scope, testability, and release risk |

## Definition of Ready / Done

| Gate | Ready signal | Done signal |
| --- | --- | --- |
| Definition of Ready | Sources for Draft are named. | AI Review Loop Card can be reviewed without guessing context. |
| Definition of Ready | Open assumptions have owners and validation paths. | Stakeholders can accept, reject, or defer each assumption. |
| Definition of Done | The artifact applies this principle: AI becomes safer when BAs use it in loops: draft, critique, revise, and approve. | Delivery, QA, or governance teams can act on it. |
| Definition of Done | The weak pattern "Ask AI to "do Review Loops and Critique" with no source context." has been checked. | No unsupported AI claim is treated as approved scope. |

## Before and after artifact example

| Before | AI draft risk | Senior BA revision |
| --- | --- | --- |
| Prompt: "Create AI Review Loop Card." | The model may invent source facts, owners, or thresholds. | Add sources, scope boundary, output schema, and review criteria. |
| Draft statement: "Use AI to organize notes into draft, risks, and open questions." | Useful, but not tied to owner or acceptance signal. | Rewrite as a project step with owner, expected artifact, and review gate. |
| Final-looking paragraph | Tone may hide uncertainty or missing stakeholder approval. | Convert into fact, assumption, decision needed, risk, and validation question. |

## Manual verification after AI output

| Verification lens | Manual check | Pass signal |
| --- | --- | --- |
| Evidence | Trace important statements in AI Review Loop Card to a source, decision, or labeled assumption. | No unsupported claim remains hidden. |
| Completeness | Check Draft, Critique, Revision, Approval against the intended audience. | Product, Engineering, QA, and Operations have what they need. |
| Testability | Ask whether QA can create positive, negative, boundary, and exception scenarios. | Ambiguous wording is rewritten or logged as a question. |
| Accountability | Confirm who approves, who reviews, and who acts when output is wrong. | Owners and escalation path are explicit. |

## AI collaboration prompt

```text
Use the supplied project notes to create a AI Review Loop Card. First explain the key terms in simple language. Then produce a table with evidence, assumption, risk, owner question, and recommended next action. Do not invent facts that are not in the notes.
```

## Mistakes to avoid

- Using Critique as jargon instead of a project decision.
- Letting AI write around missing evidence.
- Sending output to another team without owner, status, or next action.

## Apply this tomorrow

1. Take one current project note and ask AI for a AI Review Loop Card.
2. Add a plain-language definition for Critique.
3. Run one critique pass from QA or Engineering viewpoint.

## What a BA should remember

- Critique should help the project move, not sound impressive.
- AI drafts; BA validates.
- A small reviewable artifact beats a long generic explanation.
