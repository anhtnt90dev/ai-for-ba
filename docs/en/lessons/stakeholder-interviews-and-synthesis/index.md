---
title: "Stakeholder Interviews and Synthesis"
description: "AI can summarize interviews quickly, but synthesis requires preserving contradictions, attribution, and decisions."
---

# Stakeholder Interviews and Synthesis

<div class="lesson-meta">
  <span>AI-Augmented BA Workflow</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Turn messy notes into themes, facts, contradictions, and requirement candidates.
- Keep stakeholder attribution instead of flattening nuance.
- Prepare conflict-resolution questions.

## Why this matters for BA work

<div class="ba-callout">
AI can summarize interviews quickly, but synthesis requires preserving contradictions, attribution, and decisions.
</div>

This lesson matters because AI can summarize interviews quickly, but speed can flatten disagreement, source attribution, and political nuance. For BA work, the important output is not a neat summary; it is a reliable synthesis that preserves who said what, where stakeholders conflict, which decision is missing, and what evidence still needs validation.

## Common difficulties for BAs

In AI-Augmented BA Workflow, Stakeholder Interviews and Synthesis becomes difficult when messy notes, half-validated decisions, and incomplete stakeholder context must become a shared artifact quickly. A BA should inspect the points below before treating an AI-supported artifact as ready for stakeholder decision or delivery handoff.

| Difficulty | Why it is hard in BA work | How a BA should handle it |
| --- | --- | --- |
| Producing a pretty summary that hides disagreement. | The mistake "Producing a pretty summary that hides disagreement." appears when the team discusses source attribution, conflict visibility, workshop decision flow, and backlog readiness without agreeing which source is authoritative. AI can smooth over the disagreement, so the BA must keep uncertainty visible. | Apply this control: keep speaker/source attribution visible until the responsible stakeholder confirms meaning. Then use the stronger pattern "Request themes with speaker attribution, conflict points, evidence strength, and follow-up questions." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Removing stakeholder attribution. | For Stakeholder Interviews and Synthesis, the friction is that AI can summarize interviews quickly, but synthesis requires preserving contradictions, attribution, and decisions. The weak pattern is tempting because AI can produce a fluent answer before the BA has checked ownership, source freshness, or decision rights. | Apply this control: keep speaker/source attribution visible until the responsible stakeholder confirms meaning. Then use the stronger pattern "Keep role, context, scenario, and decision impact attached to each synthesized need." and ask who must approve the artifact before it affects scope, build, test, or release. |
| Converting every interview statement into a requirement. | This becomes hard when Interview Synthesis Board is expected to support the validated working artifact. If the BA does not challenge the draft, unsupported assumptions may enter planning, testing, or stakeholder communication. | Apply this control: keep speaker/source attribution visible until the responsible stakeholder confirms meaning. Then use the stronger pattern "Combine sentiment with frequency, risk, revenue, compliance, and decision ownership." and ask who must approve the artifact before it affects scope, build, test, or release. |

## Where this applies in real projects

Use this lesson when discovery or refinement produces more raw input than the BA can safely synthesize by hand in the available time. The practical output is not a longer document; it is Interview Synthesis Board with enough evidence, ownership, and decision clarity for the next project conversation.

| Project moment | How to apply this lesson | Concrete BA output |
| --- | --- | --- |
| Discovery | Add a contradiction column to your interview summary. | Interview Synthesis Board showing source attribution, conflict visibility, workshop decision flow, and backlog readiness, with the action "Add a contradiction column to your interview summary." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Synthesis | Ask AI to identify false consensus in notes. | Interview Synthesis Board showing source evidence, with the action "Ask AI to identify false consensus in notes." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |
| Refinement | Tag every requirement candidate with speaker/source. | Interview Synthesis Board showing decision owner, with the action "Tag every requirement candidate with speaker/source." translated into a reviewable decision, requirement, checklist, or question for the next meeting. |

## If this is missing

If Stakeholder Interviews and Synthesis is missing, important signals from interviews, tickets, process notes, or decisions may be lost before they reach the backlog. The BA can still recover, but only by converting the polished AI draft back into explicit evidence, assumptions, owners, and testable decisions.

| If missing | Project impact | Recovery action |
| --- | --- | --- |
| Ask AI for a clean summary of all interviews | A clean summary can erase contradictions and minority but critical concerns. | Recover by using the stronger pattern: Request themes with speaker attribution, conflict points, evidence strength, and follow-up questions. Rework Interview Synthesis Board until it exposes source attribution, conflict visibility, workshop decision flow, and backlog readiness, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Merge similar stakeholder statements into one need | Different roles may use the same words for different operational problems. | Recover by using the stronger pattern: Keep role, context, scenario, and decision impact attached to each synthesized need. Rework Interview Synthesis Board until it exposes source attribution, conflict visibility, workshop decision flow, and backlog readiness, and do not share it as final until evidence, ownership, and validation path are explicit. |
| Treat transcript sentiment as priority | Emotion signals importance but does not prove business value or feasibility. | Recover by using the stronger pattern: Combine sentiment with frequency, risk, revenue, compliance, and decision ownership. Rework Interview Synthesis Board until it exposes source attribution, conflict visibility, workshop decision flow, and backlog readiness, and do not share it as final until evidence, ownership, and validation path are explicit. |

## Mental model or core concept

Interview synthesis is not the same as summarization. A summary compresses; synthesis compares. BA synthesis should preserve who said what, which statements agree, which conflict, which decisions are implied, and which questions must be resolved before requirements are written.

## Practical BA example

Sales says discount approval takes one day; finance says exceptions can take five days; operations says VIP requests bypass the queue. AI can cluster notes, but the BA must expose the policy conflict and ask leaders to decide priority and audit rules.

## Diagram

```mermaid
flowchart LR
    A["Stakeholder notes"] --> B["Themes"]
    A --> C["Confirmed facts"]
    A --> D["Contradictions"]
    A --> E["Open questions"]
    B --> F["Requirement candidates"]
    C --> F
    D --> G["Decision meeting"]
    E --> G
```

## BA artifact

### Interview Synthesis Board

| Theme | Confirmed fact | Contradiction | Follow-up question |
| --- | --- | --- | --- |
| Approval time | Standard request usually one day. | Finance exception takes up to five days. | Which SLA is promised to customers? |
| VIP handling | VIP requests are treated differently. | No documented bypass rule. | Who can approve VIP bypass? |
| Audit | Finance needs exception trace. | Sales uses email approval. | What audit record is mandatory? |
| Ownership | Managers approve discounts. | No backup owner for absence. | Who owns approval when manager is unavailable? |

## AI expert note

Interview synthesis should treat transcripts as evidence, not objective truth. AI can cluster themes and detect contradictions, but the BA must preserve attribution, role context, emotion, and decision authority. Expert practice is to separate quote-backed facts, interpreted needs, conflicts, and follow-up questions before drafting any requirement.

## Bad vs better example

| Weak pattern | Why it fails | Stronger BA pattern |
| --- | --- | --- |
| Ask AI for a clean summary of all interviews | A clean summary can erase contradictions and minority but critical concerns. | Request themes with speaker attribution, conflict points, evidence strength, and follow-up questions. |
| Merge similar stakeholder statements into one need | Different roles may use the same words for different operational problems. | Keep role, context, scenario, and decision impact attached to each synthesized need. |
| Treat transcript sentiment as priority | Emotion signals importance but does not prove business value or feasibility. | Combine sentiment with frequency, risk, revenue, compliance, and decision ownership. |

## AI collaboration prompt

```text
Synthesize these interview notes into themes, confirmed facts, contradictions, implied requirements, open questions, and decision owners. Preserve stakeholder attribution and do not merge conflicting statements into a false consensus.
```

## Mistakes to avoid

- Producing a pretty summary that hides disagreement.
- Removing stakeholder attribution.
- Converting every interview statement into a requirement.
- Failing to separate current-state facts from desired future-state decisions.

## Apply this tomorrow

1. Add a contradiction column to your interview summary.
2. Ask AI to identify false consensus in notes.
3. Tag every requirement candidate with speaker/source.
4. Schedule decision follow-up for unresolved conflicts.

## What a BA should remember

- Synthesis protects nuance.
- Contradiction is valuable discovery data.
- Attribution makes requirements defensible.
