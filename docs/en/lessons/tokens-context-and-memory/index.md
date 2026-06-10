---
title: "Tokens, Context, and Memory"
description: "Context is the working surface of AI analysis; poor context design creates confident but incomplete BA artifacts."
---

# Tokens, Context, and Memory

<div class="lesson-meta">
  <span>AI Foundations for Business Analysts</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Story mode: project walkthrough

<div class="story-mode-panel">
  <p class="story-eyebrow">Story prototype</p>
  <h3>The 70-page SRS that fooled a one-shot AI review</h3>
  <p class="story-intro">A team uploads a long SRS and asks AI to find every gap. The answer is confident and organized, but the missed integration rule sits quietly on page 54.</p>
  <div class="story-scene-grid">
<article class="story-scene">
  <span>Scene 1</span>
  <b>01</b>
  <strong>The one-shot review feels efficient</strong>
  <p>The model returns a polished gap list in minutes. The team almost forwards it as discovery output.</p>
</article>
<article class="story-scene">
  <span>Scene 2</span>
  <b>02</b>
  <strong>A late-page rule is missing</strong>
  <p>Maya checks source coverage and notices the API exception section was compressed into a generic summary.</p>
</article>
<article class="story-scene">
  <span>Scene 3</span>
  <b>03</b>
  <strong>Context becomes an artifact</strong>
  <p>She creates source IDs, module chunks, freshness labels, and a decision log before asking for analysis.</p>
</article>
<article class="story-scene">
  <span>Scene 4</span>
  <b>04</b>
  <strong>The second pass finds the real issue</strong>
  <p>Cross-section reconciliation exposes a conflict between report export rules and integration retry behavior.</p>
</article>
  </div>
  <div class="visual-takeaway-strip">
<span>Context is an artifact</span>
<span>Coverage beats one-shot speed</span>
<span>Memory needs source IDs</span>
  </div>
</div>

## AI words in plain English

| AI term | Simple meaning | BA use |
| --- | --- | --- |
| Token | A small piece of text the model reads or writes. | Long documents consume tokens, so BA must plan source coverage. |
| Context | The visible working material the model can use now. | Provide source IDs, rules, examples, and the exact question. |
| Memory | Information kept across interactions, if the tool supports it. | Do not rely on chat memory as the project source of truth. |
| Chunking | Splitting long material into useful review parts. | Review per module, then reconcile across modules. |

## Reality check: current facts for BAs

<div class="fact-card-grid">
<article class="fact-card">
  <strong>25%</strong>
  <span>Teams lose time searching for answers</span>
  <p>Atlassian's 2025 State of Teams survey reports leaders and teams waste 25% of their time searching for answers. BA read: source maps and decision logs are productivity controls.</p>
  <a href="https://www.atlassian.com/blog/state-of-teams-2025">Source: Atlassian State of Teams 2025</a>
</article>
<article class="fact-card">
  <strong>13% now, 34% soon</strong>
  <span>Gen AI workload share is rising</span>
  <p>McKinsey's workplace report says 13% of employees already use gen AI for more than 30% of daily tasks, and 34% expect to within less than a year. BA read: reusable context packs will matter more as usage scales.</p>
  <a href="https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work">Source: McKinsey AI in the Workplace 2025</a>
</article>
<article class="fact-card">
  <strong>9.1 vs 6.3</strong>
  <span>Expert delivery tracks more performance signals</span>
  <p>PMI reports high business-acumen professionals use more project performance factors than peers. BA read: context packs should connect requirements to business measures, not only text summaries.</p>
  <a href="https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/pulse_of_the_profession_2025-1.pdf">Source: PMI Pulse of the Profession 2025</a>
</article>
</div>

## Visual walkthrough

```mermaid
flowchart TD
    A["Long SRS + meeting notes"] --> B["Source map: IDs, owners, dates"]
    B --> C["Chunk plan by module"]
    C --> D["Focused AI review per chunk"]
    D --> E["Coverage check"]
    E --> F["Cross-section reconciliation"]
    F --> G["Gap, conflict, decision, and testability board"]
    G --> H["Delivery-ready context pack"]
```

## Visual decision map

<div class="visual-ba-map">
  <h3>How a BA turns long context into working memory</h3>
<div>
  <strong>Source map</strong>
  <span>Every document section has ID, owner, date, and authority.</span>
  <em>The model cannot silently skip the quiet sections.</em>
</div>
<div>
  <strong>Chunk plan</strong>
  <span>Each module is reviewed with a focused question.</span>
  <em>Long context becomes inspectable work, not a shallow summary.</em>
</div>
<div>
  <strong>Reconciliation pass</strong>
  <span>Findings are compared across modules and decisions.</span>
  <em>Conflicts become visible before delivery handoff.</em>
</div>
</div>

## Learning outcomes

- Explain token and context limits in BA terms.
- Prepare long requirements or transcripts for staged AI review.
- Use source maps to reduce missed requirements.

## Why this matters for BA work

<div class="ba-callout">
Context is the working surface of AI analysis; poor context design creates confident but incomplete BA artifacts.
</div>

This lesson matters because most BA artifacts depend on long histories: transcripts, policies, decisions, exceptions, and prior commitments. AI tools can only reason over the context they can see and retain. A BA who controls source maps and chunking plans reduces missed requirements, stale policy reuse, and shallow summaries that look organized but lose critical detail.

## Common difficulties for BAs

In AI Foundations for Business Analysts, Tokens, Context, and Memory becomes difficult when stakeholders expect a simple AI answer while the actual issue depends on model capability, data readiness, tool boundaries, and business decision risk. A BA should inspect the points below before treating an AI-supported artifact as ready for stakeholder decision or delivery handoff.

| Difficulty | Why it is hard in BA work | How a BA should handle it |
| --- | --- | --- |
| Uploading everything and asking one broad question. | The mistake "Uploading everything and asking one broad question." appears when the team discusses problem fit, model boundary, data dependency, and decision risk without agreeing which source is authoritative. AI can smooth over the disagreement, so the BA must keep uncertainty visible. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Review by source ID and module, then run a reconciliation pass for conflicts and omissions." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Mixing old and new policy without freshness labels. | For Tokens, Context, and Memory, the friction is that Context is the working surface of AI analysis; poor context design creates confident but incomplete BA artifacts. The weak pattern is tempting because AI can produce a fluent answer before the BA has checked ownership, source freshness, or decision rights. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Label source status, effective date, owner, and confidence before analysis." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Letting the model summarize away edge cases. | This becomes hard when Context Pack Checklist is expected to support the solution-shape decision. If the BA does not challenge the draft, unsupported assumptions may enter planning, testing, or stakeholder communication. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Create an explicit context pack with source map, decision log, and open questions." and ask who must approve the artifact before it affects scope, build, test, or release. |

## Where this applies in real projects

Use this lesson when an AI idea first enters discovery, vendor discussion, roadmap planning, or feasibility analysis. The practical output is not a longer document; it is Context Pack Checklist with enough evidence, ownership, and decision clarity for the next project conversation.

| Project moment | How to apply this lesson | Concrete BA output |
| --- | --- | --- |
| Idea intake | Create source IDs for one document before using AI. | Context Pack Checklist showing problem fit, model boundary, data dependency, and decision risk, with the action "Create source IDs for one document before using AI." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Feasibility review | Ask AI to summarize per section, not whole document at once. | Context Pack Checklist showing source evidence, with the action "Ask AI to summarize per section, not whole document at once." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Solution framing | Mark old, current, and draft sources separately. | Context Pack Checklist showing decision owner, with the action "Mark old, current, and draft sources separately." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |

## If this is missing

If Tokens, Context, and Memory is missing, the team may choose a tool before understanding the problem shape, creating expensive automation that does not match the business outcome. The BA can still recover, but only by converting the polished AI draft back into explicit evidence, assumptions, owners, and testable decisions.

| If missing | Project impact | Recovery action |
| --- | --- | --- |
| Upload all documents and ask for all gaps | The model may summarize broadly and miss late, rare, or cross-document constraints. | Recover by using the stronger pattern: Review by source ID and module, then run a reconciliation pass for conflicts and omissions. Rework Context Pack Checklist until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Mix old policy, draft notes, and approved decisions without labels | The model cannot reliably know what is current or authoritative. | Recover by using the stronger pattern: Label source status, effective date, owner, and confidence before analysis. Rework Context Pack Checklist until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Use chat history as project memory | Important decisions become inaccessible, reordered, or invisible to other team members. | Recover by using the stronger pattern: Create an explicit context pack with source map, decision log, and open questions. Rework Context Pack Checklist until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |

## Mental model or core concept

A model only works with the context it can see. Long documents, scattered notes, and multi-meeting histories must be structured into chunks, source IDs, summaries, and review passes. BA context engineering is similar to preparing a workshop pack: decide what evidence matters, label it, and review it in a controlled order.

## Practical BA example

A 70-page SRS is dropped into an AI tool with 'find all gaps.' The model returns a polished list but misses integration requirements in later pages. A better BA creates a source map, reviews per module, then asks AI to reconcile cross-module conflicts.

## Diagram

```mermaid
flowchart LR
    A["Raw sources"] --> B["Source map"]
    B --> C["Chunk plan"]
    C --> D["Section review"]
    D --> E["Cross-section reconciliation"]
    E --> F["Requirement findings"]
    B --> G["Decision log"]
    G --> E
```

## BA artifact

### Context Pack Checklist

| Pack item | Why it matters | BA action | Failure if missing |
| --- | --- | --- | --- |
| Source map | Prevents invisible gaps | List sections, owners, and IDs. | AI reviews only the loudest sections. |
| Chunk plan | Keeps analysis focused | Review module by module. | Long context becomes shallow summary. |
| Decision log | Preserves stakeholder commitments | Include dated decisions and owners. | AI reopens already-settled scope. |
| Open questions | Separates unknowns from facts | Track unresolved items explicitly. | Model fills blanks with guesses. |

## AI expert note

Expert AI use treats context as an analysis asset. Long-context models still suffer from attention dilution, source conflict, and recency ambiguity. The BA should design review passes, source IDs, chunk purpose, decision logs, and reconciliation steps so that AI output remains traceable rather than becoming an attractive summary of incomplete evidence.

## Bad vs better example

| Weak pattern | Why it fails | Stronger BA pattern |
| --- | --- | --- |
| Upload all documents and ask for all gaps | The model may summarize broadly and miss late, rare, or cross-document constraints. | Review by source ID and module, then run a reconciliation pass for conflicts and omissions. |
| Mix old policy, draft notes, and approved decisions without labels | The model cannot reliably know what is current or authoritative. | Label source status, effective date, owner, and confidence before analysis. |
| Use chat history as project memory | Important decisions become inaccessible, reordered, or invisible to other team members. | Create an explicit context pack with source map, decision log, and open questions. |

## Stakeholder questions to ask

| Stakeholder | Question | Why the BA asks it |
| --- | --- | --- |
| Product owner | Which outcome should Tokens, Context, and Memory improve, and what trade-off are you willing to accept? | Prevents AI output from optimizing for a vague goal. |
| Engineering lead | What source, system, data, or constraint would make Context Pack Checklist hard to implement? | Turns hidden technical constraints into visible requirement questions. |
| QA lead | Which rule, exception, or user state must be testable before you trust this artifact? | Converts fluent AI wording into observable behavior. |
| Operations or support | What failure path would create manual work if the lesson principle "AI quality is bounded by visible context" is ignored? | Surfaces support load, exception handling, and operating impact. |

## Decision log entries

| Decision item | Options to capture | Owner | Evidence needed |
| --- | --- | --- | --- |
| Scope boundary for Context Pack Checklist | Must-have, later, out of scope | Product owner | Business outcome and release constraint |
| Authority for problem fit, model boundary, data dependency, and decision risk | Documented source, stakeholder decision, assumption to validate | BA + accountable stakeholder | Source ID, date, and approval status |
| Review gate before handoff | Peer review, QA review, engineering review, formal approval | BA lead or project lead | Risk level and receiving-team readiness |
| Recovery if Uploading everything and asking one broad question. | Rewrite, defer, escalate, or run validation workshop | Decision owner | Impact on scope, testability, and release risk |

## Definition of Ready / Done

| Gate | Ready signal | Done signal |
| --- | --- | --- |
| Definition of Ready | Sources for problem fit, model boundary, data dependency, and decision risk are labeled and current. | Context Pack Checklist can be reviewed without guessing missing context. |
| Definition of Ready | Open assumptions have owners and validation paths. | Stakeholders can decide whether to accept, reject, or defer each assumption. |
| Definition of Done | The artifact applies this control: ask the model to compare AI and non-AI options before drafting requirements. | Delivery, QA, or governance teams can act on the artifact. |
| Definition of Done | The weak pattern "Uploading everything and asking one broad question." has been explicitly checked. | No unsupported AI claim is treated as an approved requirement. |

## Before and after artifact example

| Before | AI draft risk | Senior BA revision |
| --- | --- | --- |
| Prompt: "Create Context Pack Checklist for Tokens, Context, and Memory." | The model may invent source facts, owners, thresholds, or implementation rules. | Add sources, scope boundary, source authority, output schema, and the instruction: Review by source ID and module, then run a reconciliation pass for conflicts and omissions. |
| Draft statement: "Create source IDs for one document before using AI." | Useful action, but not yet tied to a decision owner or acceptance signal. | Rewrite as a project step with owner, expected artifact, review gate, and evidence required before handoff. |
| Final-looking paragraph about solution-shape decision | The tone may hide uncertainty and missing stakeholder approval. | Convert it into a table of fact, assumption, decision needed, risk, and validation question. |

## Manual verification after AI output

| Verification lens | Manual check | Pass signal |
| --- | --- | --- |
| Evidence | Trace every important statement in Context Pack Checklist to a source, decision, or labeled assumption. | No unsupported claim remains hidden. |
| Completeness | Check problem fit, model boundary, data dependency, and decision risk against the intended audience and receiving team. | The artifact answers what product, engineering, QA, and operations need. |
| Testability | Ask whether QA can create positive, negative, boundary, and exception scenarios. | Ambiguous wording has been rewritten or logged as a question. |
| Accountability | Confirm who approves, who reviews, and who acts when the artifact is wrong. | Owners and escalation path are explicit. |

## AI collaboration prompt

```text
Create a context pack from these sources. Return source IDs, section summaries, decision log, known constraints, unresolved questions, and recommended review order. Do not analyze requirements until the context pack is complete.
```

## Mistakes to avoid

- Uploading everything and asking one broad question.
- Mixing old and new policy without freshness labels.
- Letting the model summarize away edge cases.
- Forgetting to include decisions already made by stakeholders.

## Apply this tomorrow

1. Create source IDs for one document before using AI.
2. Ask AI to summarize per section, not whole document at once.
3. Mark old, current, and draft sources separately.
4. Run a second pass for cross-section conflicts.

## What a BA should remember

- AI quality is bounded by visible context.
- Source maps are a BA control, not an admin detail.
- Staged review beats one giant prompt.
