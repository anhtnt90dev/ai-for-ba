# AI for BA Content Depth Redesign

## Problem

The first deployed course site has the right structure, but the lesson pages are too shallow. Most pages are produced from one generic template, so the diagrams, workflows, summaries, and learning value feel repetitive. This weakens the site for the intended audience: software Business Analysts who need a practical, expert-level AI curriculum.

## Objective

Rewrite the course content so each lesson teaches a distinct BA skill, contains a unique diagram, and includes a concrete artifact a BA can reuse in real work. Keep the existing VitePress site, bilingual EN/VI routes, 20 lessons, 6 labs, and GitHub Pages deployment.

## Content Upgrade Contract

Every lesson must include:

- `## Learning outcomes`
- `## Why this matters for BA work`
- `## Mental model or core concept`
- `## Practical BA example`
- `## Diagram`
- `## BA artifact`
- `## AI collaboration prompt`
- `## Mistakes to avoid`
- `## Apply this tomorrow`
- `## What a BA should remember`

Every lesson must have:

- a lesson-specific Mermaid diagram, not the previous shared review-loop diagram;
- a concrete artifact such as a matrix, rubric, checklist, specification table, requirement rewrite, flow, scorecard, or template;
- domain-relevant examples under software BA, product BA, or BA lead work;
- richer prompts that include context, output format, review criteria, and anti-hallucination constraints.

## Diagram Upgrade

Diagrams should vary by lesson purpose:

- taxonomy map for AI landscape;
- sequence or flow model for LLM mental model;
- source map for token/context work;
- evidence ladder for grounding;
- RAG pipeline for embeddings and knowledge;
- discovery funnel;
- interview synthesis map;
- acceptance criteria pipeline;
- swimlane-like process map;
- context package map;
- critique loop;
- structured output contract;
- ambiguity taxonomy;
- NFR risk map;
- traceability chain;
- decision artifact lifecycle;
- diagram selection guide;
- AI feature requirement architecture;
- human-in-the-loop fallback flow;
- governance operating model.

## Labs and Resources

Labs must be upgraded with:

- input sample;
- step-by-step exercise;
- expected deliverables;
- review rubric;
- Mermaid diagram specific to the lab.

Resources must be upgraded into practical playbooks:

- prompt playbook;
- requirement review rubric;
- AI feature specification template;
- RAG requirement template;
- governance checklist;
- BA team adoption scorecard;
- deeper bilingual glossary.

## Validation

The validation script must fail when lessons are shallow. It should check:

- 20 lessons per locale and 6 labs per locale;
- EN/VI slug parity;
- required lesson headings;
- required lab headings;
- each lesson contains a Mermaid diagram;
- no lesson uses the old generic diagram phrase;
- each lesson contains a `## BA artifact` section;
- each lesson contains a table or checklist-style artifact;
- diagram blocks are not all identical.

## Deployment

After rewrite:

- run `npm test`;
- verify representative EN/VI routes locally or by built output;
- commit and push to `main`;
- confirm GitHub Pages workflow succeeds;
- verify production URLs return HTTP 200.
