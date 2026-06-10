---
title: "LLM Mental Model"
description: "LLMs are powerful text reasoning engines, but they do not know your hidden business rules unless you provide or retrieve them."
---

# LLM Mental Model

<div class="lesson-meta">
  <span>AI Foundations for Business Analysts</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Story mode: project walkthrough

<div class="story-mode-panel">
  <p class="story-eyebrow">Story prototype</p>
  <h3>A polished AI draft almost becomes a false requirement</h3>
  <p class="story-intro">Maya asks an LLM for acceptance criteria about exporting premium reports. The answer looks useful, but it quietly invents formats, limits, and permissions that nobody approved.</p>
  <div class="story-scene-grid">
<article class="story-scene">
  <span>Scene 1</span>
  <b>01</b>
  <strong>The draft looks ready</strong>
  <p>The LLM writes clean Given-When-Then criteria. The team relaxes because the wording sounds professional.</p>
</article>
<article class="story-scene">
  <span>Scene 2</span>
  <b>02</b>
  <strong>The hidden assumptions appear</strong>
  <p>Maya highlights export format, file size, subscription tier, audit rule, and retention period. None of them came from a source.</p>
</article>
<article class="story-scene">
  <span>Scene 3</span>
  <b>03</b>
  <strong>The prompt changes</strong>
  <p>She gives the model source rules, examples, output schema, and the instruction to label unsupported claims.</p>
</article>
<article class="story-scene">
  <span>Scene 4</span>
  <b>04</b>
  <strong>The artifact becomes reviewable</strong>
  <p>The second draft separates facts, assumptions, and validation questions. QA can test it, and Product can approve real decisions.</p>
</article>
  </div>
  <div class="visual-takeaway-strip">
<span>Plausible is not approved</span>
<span>Assumption labels protect scope</span>
<span>Human review is a workflow</span>
  </div>
</div>

## Reality check: current facts for BAs

<div class="fact-card-grid">
<article class="fact-card">
  <strong>46% vs 33%</strong>
  <span>Trust gap is real in software teams</span>
  <p>Stack Overflow's 2025 survey reports more developers distrust AI accuracy than trust it. BA read: treat AI output as a draft that needs evidence, not as a requirement source.</p>
  <a href="https://survey.stackoverflow.co/2025/ai">Source: Stack Overflow Developer Survey 2025</a>
</article>
<article class="fact-card">
  <strong>27%</strong>
  <span>Only a minority review every gen AI output</span>
  <p>McKinsey reports 27% of organizations using gen AI review all generated content before use, while a similar share review 20% or less. BA read: define review gates explicitly.</p>
  <a href="https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf">Source: McKinsey State of AI 2025 PDF</a>
</article>
<article class="fact-card">
  <strong>63%</strong>
  <span>Governance gaps are common</span>
  <p>IBM's 2025 breach report says 63% of organizations lacked AI governance policies for managing AI or shadow AI. BA read: clarify allowed use, data boundaries, and review ownership.</p>
  <a href="https://www.ibm.com/reports/data-breach">Source: IBM Cost of a Data Breach 2025</a>
</article>
</div>

## Visual walkthrough

```mermaid
sequenceDiagram
    participant BA as BA
    participant LLM as LLM draft
    participant Evidence as Source pack
    participant Team as Product/QA/Dev
    BA->>LLM: Draft criteria from vague request
    LLM-->>BA: Polished criteria with hidden assumptions
    BA->>Evidence: Add tiers, rules, examples, source IDs
    BA->>LLM: Redraft and label facts, assumptions, unsupported claims
    LLM-->>BA: Reviewable artifact
    BA->>Team: Validate decisions before backlog handoff
```

## Visual decision map

<div class="visual-ba-map">
  <h3>What the BA reviews before sharing AI output</h3>
<div>
  <strong>Fact</strong>
  <span>A statement has a source, decision owner, or cited rule.</span>
  <em>Keep it, but preserve the source ID.</em>
</div>
<div>
  <strong>Assumption</strong>
  <span>The model inferred something plausible.</span>
  <em>Label it and assign a stakeholder validation question.</em>
</div>
<div>
  <strong>Unsupported claim</strong>
  <span>The statement sounds useful but has no evidence.</span>
  <em>Remove it from scope until validated.</em>
</div>
</div>

## Learning outcomes

- Explain LLM behavior without overselling certainty.
- Design prompts that expose assumptions and missing context.
- Review AI output as probabilistic draft work.

## Why this matters for BA work

<div class="ba-callout">
LLMs are powerful text reasoning engines, but they do not know your hidden business rules unless you provide or retrieve them.
</div>

This lesson matters because LLM output often sounds complete before it is actually governed, sourced, or testable. BAs who understand the mental model can use AI as a structured drafting and critique partner without confusing fluent text with business approval. That keeps requirements reviewable and prevents hidden assumptions from entering delivery artifacts.

## Common difficulties for BAs

In AI Foundations for Business Analysts, LLM Mental Model becomes difficult when stakeholders expect a simple AI answer while the actual issue depends on model capability, data readiness, tool boundaries, and business decision risk. A BA should inspect the points below before treating an AI-supported artifact as ready for stakeholder decision or delivery handoff.

| Difficulty | Why it is hard in BA work | How a BA should handle it |
| --- | --- | --- |
| Asking AI for final truth instead of a reviewable draft. | The mistake "Asking AI for final truth instead of a reviewable draft." appears when the team discusses problem fit, model boundary, data dependency, and decision risk without agreeing which source is authoritative. AI can smooth over the disagreement, so the BA must keep uncertainty visible. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Provide rules, actors, constraints, examples, and require assumptions to be listed separately." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Not separating model confidence from business approval. | For LLM Mental Model, the friction is that LLMs are powerful text reasoning engines, but they do not know your hidden business rules unless you provide or retrieve them. The weak pattern is tempting because AI can produce a fluent answer before the BA has checked ownership, source freshness, or decision rights. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Route material claims to source review or decision owners before publishing." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Providing a vague task without source context or examples. | This becomes hard when LLM Output Review Card is expected to support the solution-shape decision. If the BA does not challenge the draft, unsupported assumptions may enter planning, testing, or stakeholder communication. | Apply this control: ask the model to compare AI and non-AI options before drafting requirements. Then use the stronger pattern "Add a review table for source-backed facts, assumptions, open questions, and owner decisions." and ask who must approve the artifact before it affects scope, build, test, or release. |

## Where this applies in real projects

Use this lesson when an AI idea first enters discovery, vendor discussion, roadmap planning, or feasibility analysis. The practical output is not a longer document; it is LLM Output Review Card with enough evidence, ownership, and decision clarity for the next project conversation.

| Project moment | How to apply this lesson | Concrete BA output |
| --- | --- | --- |
| Idea intake | Take one AI-generated answer and mark facts vs assumptions. | LLM Output Review Card showing problem fit, model boundary, data dependency, and decision risk, with the action "Take one AI-generated answer and mark facts vs assumptions." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Feasibility review | Ask AI to rewrite the same artifact using only supplied context. | LLM Output Review Card showing source evidence, with the action "Ask AI to rewrite the same artifact using only supplied context." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Solution framing | Add a 'questions for validation' section to your prompt. | LLM Output Review Card showing decision owner, with the action "Add a 'questions for validation' section to your prompt." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |

## If this is missing

If LLM Mental Model is missing, the team may choose a tool before understanding the problem shape, creating expensive automation that does not match the business outcome. The BA can still recover, but only by converting the polished AI draft back into explicit evidence, assumptions, owners, and testable decisions.

| If missing | Project impact | Recovery action |
| --- | --- | --- |
| Ask the model for final acceptance criteria from a one-line idea | The model will fill missing policy, permissions, and edge cases with plausible inventions. | Recover by using the stronger pattern: Provide rules, actors, constraints, examples, and require assumptions to be listed separately. Rework LLM Output Review Card until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Use confidence language from the model as approval | Model confidence is not stakeholder confirmation or regulatory evidence. | Recover by using the stronger pattern: Route material claims to source review or decision owners before publishing. Rework LLM Output Review Card until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Share a polished AI draft without review markings | Stakeholders cannot see what is fact, inference, or unsupported text. | Recover by using the stronger pattern: Add a review table for source-backed facts, assumptions, open questions, and owner decisions. Rework LLM Output Review Card until it exposes problem fit, model boundary, data dependency, and decision risk, and do not share it as final until evidence, ownership, and validation path are explicit. |

## Mental model or core concept

An LLM transforms context into likely next text. It can summarize, classify, compare, draft, and infer patterns, but its answer quality depends on context, instructions, examples, and review. For BA work, the useful model is not 'AI knows the answer'; it is 'AI proposes a structured draft from supplied context, and the BA validates it.'

## Practical BA example

A BA asks an LLM to write acceptance criteria for 'premium users can export reports.' The model may invent export formats, limits, and permissions. If the BA provides subscription tiers, report types, audit rules, and examples, the model can produce a useful draft while showing assumptions that need validation.

## Diagram

```mermaid
sequenceDiagram
    participant BA
    participant Context
    participant LLM
    participant Review
    BA->>Context: Provide goal, sources, rules
    Context->>LLM: Visible working memory
    LLM->>LLM: Predict and transform text
    LLM->>Review: Draft + assumptions
    Review->>BA: Validate facts, rules, decisions
```

## BA artifact

### LLM Output Review Card

| Review lens | Question to ask | Pass signal | Risk signal |
| --- | --- | --- | --- |
| Context | Did the model receive the actual business rule? | Output cites provided context. | Output invents policy or thresholds. |
| Assumption | Which statements are inferred? | Assumptions are labeled. | Assumptions are hidden as facts. |
| Specificity | Can QA test the output? | Rules, actors, and outcomes are explicit. | Uses vague words like fast, easy, smart. |
| Decision | Who must approve this? | Decision owner is named. | AI answer is treated as approval. |

## AI expert note

An LLM is a probabilistic system with strong language patterning, not an authoritative requirements engine. The BA must manage context, examples, constraints, and review criteria. Expert use means asking for assumptions, evidence labels, counterexamples, and testability checks, then treating the answer as a candidate artifact awaiting human validation.

## Bad vs better example

| Weak pattern | Why it fails | Stronger BA pattern |
| --- | --- | --- |
| Ask the model for final acceptance criteria from a one-line idea | The model will fill missing policy, permissions, and edge cases with plausible inventions. | Provide rules, actors, constraints, examples, and require assumptions to be listed separately. |
| Use confidence language from the model as approval | Model confidence is not stakeholder confirmation or regulatory evidence. | Route material claims to source review or decision owners before publishing. |
| Share a polished AI draft without review markings | Stakeholders cannot see what is fact, inference, or unsupported text. | Add a review table for source-backed facts, assumptions, open questions, and owner decisions. |

## Stakeholder questions to ask

| Stakeholder | Question | Why the BA asks it |
| --- | --- | --- |
| Product owner | Which outcome should LLM Mental Model improve, and what trade-off are you willing to accept? | Prevents AI output from optimizing for a vague goal. |
| Engineering lead | What source, system, data, or constraint would make LLM Output Review Card hard to implement? | Turns hidden technical constraints into visible requirement questions. |
| QA lead | Which rule, exception, or user state must be testable before you trust this artifact? | Converts fluent AI wording into observable behavior. |
| Operations or support | What failure path would create manual work if the lesson principle "LLMs generate plausible text, not guaranteed truth" is ignored? | Surfaces support load, exception handling, and operating impact. |

## Decision log entries

| Decision item | Options to capture | Owner | Evidence needed |
| --- | --- | --- | --- |
| Scope boundary for LLM Output Review Card | Must-have, later, out of scope | Product owner | Business outcome and release constraint |
| Authority for problem fit, model boundary, data dependency, and decision risk | Documented source, stakeholder decision, assumption to validate | BA + accountable stakeholder | Source ID, date, and approval status |
| Review gate before handoff | Peer review, QA review, engineering review, formal approval | BA lead or project lead | Risk level and receiving-team readiness |
| Recovery if Asking AI for final truth instead of a reviewable draft. | Rewrite, defer, escalate, or run validation workshop | Decision owner | Impact on scope, testability, and release risk |

## Definition of Ready / Done

| Gate | Ready signal | Done signal |
| --- | --- | --- |
| Definition of Ready | Sources for problem fit, model boundary, data dependency, and decision risk are labeled and current. | LLM Output Review Card can be reviewed without guessing missing context. |
| Definition of Ready | Open assumptions have owners and validation paths. | Stakeholders can decide whether to accept, reject, or defer each assumption. |
| Definition of Done | The artifact applies this control: ask the model to compare AI and non-AI options before drafting requirements. | Delivery, QA, or governance teams can act on the artifact. |
| Definition of Done | The weak pattern "Asking AI for final truth instead of a reviewable draft." has been explicitly checked. | No unsupported AI claim is treated as an approved requirement. |

## Before and after artifact example

| Before | AI draft risk | Senior BA revision |
| --- | --- | --- |
| Prompt: "Create LLM Output Review Card for LLM Mental Model." | The model may invent source facts, owners, thresholds, or implementation rules. | Add sources, scope boundary, source authority, output schema, and the instruction: Provide rules, actors, constraints, examples, and require assumptions to be listed separately. |
| Draft statement: "Take one AI-generated answer and mark facts vs assumptions." | Useful action, but not yet tied to a decision owner or acceptance signal. | Rewrite as a project step with owner, expected artifact, review gate, and evidence required before handoff. |
| Final-looking paragraph about solution-shape decision | The tone may hide uncertainty and missing stakeholder approval. | Convert it into a table of fact, assumption, decision needed, risk, and validation question. |

## Manual verification after AI output

| Verification lens | Manual check | Pass signal |
| --- | --- | --- |
| Evidence | Trace every important statement in LLM Output Review Card to a source, decision, or labeled assumption. | No unsupported claim remains hidden. |
| Completeness | Check problem fit, model boundary, data dependency, and decision risk against the intended audience and receiving team. | The artifact answers what product, engineering, QA, and operations need. |
| Testability | Ask whether QA can create positive, negative, boundary, and exception scenarios. | Ambiguous wording has been rewritten or logged as a question. |
| Accountability | Confirm who approves, who reviews, and who acts when the artifact is wrong. | Owners and escalation path are explicit. |

## AI collaboration prompt

```text
Before drafting, list missing context and assumptions. Then produce the artifact. After the draft, add a review table with source-backed facts, inferred assumptions, unsupported claims, and questions for stakeholder validation.
```

## Mistakes to avoid

- Asking AI for final truth instead of a reviewable draft.
- Not separating model confidence from business approval.
- Providing a vague task without source context or examples.
- Failing to ask the model to reveal assumptions.

## Apply this tomorrow

1. Take one AI-generated answer and mark facts vs assumptions.
2. Ask AI to rewrite the same artifact using only supplied context.
3. Add a 'questions for validation' section to your prompt.
4. Review one output with QA or developer eyes before sharing it.

## What a BA should remember

- LLMs generate plausible text, not guaranteed truth.
- Good BA prompts make missing context visible.
- The BA owns validation, not the model.
