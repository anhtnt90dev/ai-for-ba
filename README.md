# AI for Business Analysts

[![English](https://img.shields.io/badge/lang-English-blue)](https://anhtnt90dev.github.io/ai-for-ba/en/)
[![Tiếng Việt](https://img.shields.io/badge/lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](https://anhtnt90dev.github.io/ai-for-ba/vi/)
[![Lessons](https://img.shields.io/badge/lessons-20-0f766e)](#syllabus)
[![Labs](https://img.shields.io/badge/labs-6-b45309)](#labs)
[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-2562eb)](https://anhtnt90dev.github.io/ai-for-ba/)

A bilingual, artifact-driven course for software Business Analysts who need to understand AI, use AI to improve BA work, and specify AI-enabled products responsibly.

> Documentation site: <https://anhtnt90dev.github.io/ai-for-ba/>

## What Changed in the Deep Version

- Every lesson has its own Mermaid diagram.
- Every lesson includes a concrete BA artifact: matrix, rubric, canvas, checklist, or specification table.
- Every lesson now has a lesson-specific BA relevance section, expert AI review note, and bad-vs-better practice examples.
- Every theory lesson explains common BA difficulties, real project application, and what breaks when the capability is missing.
- Lessons include mistakes to avoid and actions to apply tomorrow.
- Labs include input samples, exercise steps, expected deliverables, and review rubrics.
- Pixel Quest is now the fullscreen root landing experience; learners can click quest nodes to open lessons, with movement, XP, levels, and Pixel Agents MIT character sprites sourced from the public GitHub repository pixel-agents-hq/pixel-agents.
- The site includes 70+ detailed project use cases across discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI products, domain workflows, and governance.
- Resources are upgraded into practical playbooks for prompts, quality review, AI feature specification, RAG, and governance.

## Learning Path

```text
AI foundations
  -> AI-augmented BA workflow
  -> Context engineering
  -> Requirements quality
  -> Analysis artifacts and diagrams
  -> AI-enabled product requirements
  -> BA lead governance and adoption
```

## Syllabus

| # | English | Tiếng Việt |
| --- | --- | --- |
| 01 | AI Landscape for Business Analysts | Bức tranh AI cho Business Analyst |
| 02 | LLM Mental Model | Mô hình tư duy về LLM |
| 03 | Tokens, Context, and Memory | Token, context và trí nhớ |
| 04 | Hallucination and Source Grounding | Hallucination và source grounding |
| 05 | Embeddings, RAG, and Product Knowledge | Embeddings, RAG và product knowledge |
| 06 | Discovery With AI | Discovery với AI |
| 07 | Stakeholder Interviews and Synthesis | Phỏng vấn stakeholder và tổng hợp insight |
| 08 | User Stories and Acceptance Criteria | User story và acceptance criteria |
| 09 | Process Modeling With AI | Mô hình hóa quy trình với AI |
| 10 | Context Engineering Patterns | Context engineering patterns |
| 11 | Review Loops and Critique | Review loop và critique |
| 12 | Structured Outputs and Reusable Prompts | Structured output và prompt tái sử dụng |
| 13 | Ambiguity, Conflict, and Gap Analysis | Phân tích mơ hồ, xung đột và khoảng trống |
| 14 | Non-Functional Requirements and Risk | Non-functional requirement và rủi ro |
| 15 | Traceability and Testability | Traceability và testability |
| 16 | BRD, SRS, and Decision Artifacts | BRD, SRS và artifact quyết định |
| 17 | Diagramming for BA | Diagramming cho BA |
| 18 | Specifying AI-Enabled Features | Đặc tả tính năng có AI |
| 19 | Human Review, Monitoring, and Fallback | Human review, monitoring và fallback |
| 20 | AI Strategy, Governance, and Adoption | AI strategy, governance và adoption |

## Labs

1. Meeting transcript to requirements
2. Ambiguous requirement review
3. User stories and acceptance criteria
4. Process and sequence diagrams
5. RAG assistant requirements
6. BA team AI adoption roadmap

## Project Use Cases

The use case library includes 70+ detailed, bilingual project scenarios with context, BA challenge, AI-fit boundary, workflow, diagram, deliverables, prompts, review checklist, and risk controls.

- Discovery and alignment
- Requirements and backlog
- Delivery and QA
- Frontend, UI, and UX collaboration
- Backend and API collaboration
- Data and integration requirements
- AI-enabled product use cases
- Domain project scenarios
- Governance and adoption

## Local Preview

```sh
npm install
npm run docs:dev
npm test
```

## Deployment

GitHub Actions deploys the VitePress build to GitHub Pages after every push to `main`.

## License

MIT
