---
title: "Resource Library"
---

# Resource Library

Reusable playbooks for BA work with AI.

## Resources

- [Prompt Playbook](./prompt-library)
- [Checklists and Rubrics](./checklists)
- [Glossary](./glossary)

## Project-ready templates

<div class="template-grid">
<a class="template-card" href="./ai-feature-requirement-template"><strong>AI Feature Requirement Template</strong><span>Use this when a feature contains model output, generated recommendations, classification, summarization, retrieval, or AI-assisted decisions.</span></a>
<a class="template-card" href="./acceptance-criteria-quality-rubric"><strong>Acceptance Criteria Quality Rubric</strong><span>Use this to review AI-generated or human-written acceptance criteria before sprint refinement.</span></a>
<a class="template-card" href="./ui-state-requirement-template"><strong>UI State Requirement Template</strong><span>Use this when translating Figma, wireframes, or a screen idea into implementable frontend requirements.</span></a>
<a class="template-card" href="./api-contract-checklist"><strong>API Contract Checklist</strong><span>Use this when a BA must align frontend needs, backend constraints, QA expectations, and business rules around an API.</span></a>
<a class="template-card" href="./rag-knowledge-contract-canvas"><strong>RAG Knowledge Contract Canvas</strong><span>Use this before specifying a knowledge assistant, policy assistant, support assistant, or document Q&A feature.</span></a>
<a class="template-card" href="./prompt-review-checklist"><strong>Prompt Review Checklist</strong><span>Use this before turning a one-off prompt into a reusable team prompt or workflow.</span></a>
<a class="template-card" href="./ai-risk-human-review-matrix"><strong>AI Risk and Human Review Matrix</strong><span>Use this to decide when AI output can proceed, when it needs review, and when it must fallback or escalate.</span></a>
<a class="template-card" href="./decision-log-template"><strong>Decision Log Template</strong><span>Use this when AI-assisted analysis produces options, trade-offs, or open questions that require human accountability.</span></a>
<a class="template-card" href="./definition-of-ready-done-ai-ba"><strong>Definition of Ready and Done for AI-Augmented BA Work</strong><span>Use this to define quality gates before AI-assisted BA artifacts enter refinement, build, test, or release decisions.</span></a>
</div>

## Resource map

```mermaid
flowchart LR
    A["Context package"] --> B["Prompt playbook"]
    B --> C["Structured artifact"]
    C --> D["Review rubric"]
    D --> E["Team decision"]
```

## How to use the library

1. Start from the checklist for your task.
2. Use a prompt pattern only after source context is ready.
3. Require AI to label assumptions and unsupported claims.
4. Convert output into a BA-owned artifact before sharing it.
