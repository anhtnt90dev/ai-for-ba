---
title: "Review Loops and Critique"
description: "The strongest BA use of AI is not drafting faster; it is creating disciplined critique loops before artifacts reach the team."
---

# Review Loops and Critique

<div class="lesson-meta">
  <span>AI Collaboration and Context Engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Use AI as drafter, critic, counterparty, and gap finder.
- Run multi-perspective reviews for BA artifacts.
- Convert critique into prioritized revisions.

## Why this matters for BA work

<div class="ba-callout">
The strongest BA use of AI is not drafting faster; it is creating disciplined critique loops before artifacts reach the team.
</div>

This lesson matters because first AI drafts are optimized for fluency, not necessarily for correctness, risk, or delivery readiness. Review loops turn AI from a drafting shortcut into a quality system. BAs can use critique passes to expose ambiguity, missing rules, unsupported claims, test gaps, and stakeholder decisions before artifacts move downstream.

## Common difficulties for BAs

In real projects, this topic is difficult because the BA must turn messy evidence into decisions without letting AI hide uncertainty. Watch for these friction points before treating the output as ready.

| Difficulty | Why it is hard in BA work | How a BA should handle it |
| --- | --- | --- |
| Asking AI to improve the draft without first diagnosing it. | This is hard because Review Loops and Critique is usually applied under deadline pressure, incomplete evidence, and stakeholder disagreement. A fluent AI draft can make the gap less visible. | Use source labels, explicit assumptions, and a named review owner before turning this into backlog, specification, or delivery commitment. |
| Accepting all critique findings equally. | This is hard because Review Loops and Critique is usually applied under deadline pressure, incomplete evidence, and stakeholder disagreement. A fluent AI draft can make the gap less visible. | Use source labels, explicit assumptions, and a named review owner before turning this into backlog, specification, or delivery commitment. |
| Skipping evidence for critique. | This is hard because Review Loops and Critique is usually applied under deadline pressure, incomplete evidence, and stakeholder disagreement. A fluent AI draft can make the gap less visible. | Use source labels, explicit assumptions, and a named review owner before turning this into backlog, specification, or delivery commitment. |

## Where this applies in real projects

This lesson is useful when the BA needs to move from conversation, policy, design, or technical input into a shared artifact that the team can implement and test.

| Project moment | How to apply this lesson | Concrete BA output |
| --- | --- | --- |
| Discovery | Run one draft through a QA critique prompt. | Multi-Perspective Critique Grid: a reviewable artifact that connects the learned concept to decisions, acceptance criteria, risks, or stakeholder alignment. |
| Refinement | Ask AI to rank findings by delivery risk. | Multi-Perspective Critique Grid: a reviewable artifact that connects the learned concept to decisions, acceptance criteria, risks, or stakeholder alignment. |
| Delivery | Convert critique into a revision backlog. | Multi-Perspective Critique Grid: a reviewable artifact that connects the learned concept to decisions, acceptance criteria, risks, or stakeholder alignment. |

## If this is missing

If this capability is missing, AI may still produce polished text, but the project loses reviewability. The result is usually rework, hidden assumptions, weak acceptance criteria, or business decisions made without enough evidence.

| If missing | Project impact | Recovery action |
| --- | --- | --- |
| Accept the first AI draft because it reads well | Fluency can hide ambiguity, false claims, and untestable wording. | Recover by using the stronger pattern: Run critique passes for evidence, specificity, testability, and risk before sharing. Then re-check the artifact against evidence, testability, ownership, and business impact before sharing it. |
| Ask a generic question like what is wrong with this | The critique may be shallow and miss the BA quality dimensions. | Recover by using the stronger pattern: Use a rubric with required lenses, severity, source reference, and recommended fix. Then re-check the artifact against evidence, testability, ownership, and business impact before sharing it. |
| Let review comments remain informal | The team cannot track whether risks were resolved. | Recover by using the stronger pattern: Convert critique findings into a defect register or decision log with owners. Then re-check the artifact against evidence, testability, ownership, and business impact before sharing it. |

## Mental model or core concept

One-pass AI output is risky. A review loop makes AI work safer: draft, critique, revise, evidence-check, and stakeholder-validate. The BA can ask AI to review from product, QA, engineering, security, operations, and user perspectives, then decide which findings matter.

## Practical BA example

A generated SRS section looks complete. A critique pass finds that audit logging is missing, error states are vague, and a support workflow is not covered. The BA turns findings into revision tasks and validation questions instead of shipping the first draft.

## Diagram

```mermaid
flowchart LR
    A["Draft"] --> B["Critique by QA"]
    B --> C["Critique by Dev"]
    C --> D["Critique by Ops"]
    D --> E["Evidence check"]
    E --> F{"Revision needed?"}
    F -->|Yes| A
    F -->|No| G["Stakeholder validation"]
```

## BA artifact

### Multi-Perspective Critique Grid

| Perspective | What to inspect | Finding format | Revision action |
| --- | --- | --- | --- |
| QA | Testability, edge cases, expected results. | Defect plus test scenario. | Rewrite AC and add negative case. |
| Developer | API, data, integration assumptions. | Implementation risk. | Clarify contract or dependency. |
| Operations | Support, monitoring, failure handling. | Runbook gap. | Add support flow and alert rule. |
| Compliance | Privacy, audit, policy constraints. | Control gap. | Add evidence and approval step. |

## AI expert note

The most effective AI workflows separate creation from critique. Expert BAs design named review lenses: evidence, testability, risk, stakeholder conflict, operational feasibility, and compliance. Asking the same model to critique its own draft helps, but stronger practice uses explicit rubrics, source checks, and human review for high-risk decisions.

## Bad vs better example

| Weak pattern | Why it fails | Stronger BA pattern |
| --- | --- | --- |
| Accept the first AI draft because it reads well | Fluency can hide ambiguity, false claims, and untestable wording. | Run critique passes for evidence, specificity, testability, and risk before sharing. |
| Ask a generic question like what is wrong with this | The critique may be shallow and miss the BA quality dimensions. | Use a rubric with required lenses, severity, source reference, and recommended fix. |
| Let review comments remain informal | The team cannot track whether risks were resolved. | Convert critique findings into a defect register or decision log with owners. |

## AI collaboration prompt

```text
Review this artifact from QA, developer, operations, compliance, support, and end-user perspectives. Return findings with severity, evidence, affected section, revision recommendation, and validation question. Do not rewrite yet; critique first.
```

## Mistakes to avoid

- Asking AI to improve the draft without first diagnosing it.
- Accepting all critique findings equally.
- Skipping evidence for critique.
- Not preserving the revision decision trail.

## Apply this tomorrow

1. Run one draft through a QA critique prompt.
2. Ask AI to rank findings by delivery risk.
3. Convert critique into a revision backlog.
4. Share top three risks with the team before refinement.

## What a BA should remember

- Critique is where AI often creates the most BA value.
- Review loops make uncertainty visible.
- The BA chooses which critique findings become changes.
