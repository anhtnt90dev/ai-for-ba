# AI for Business Analysts Course Site Design

## Objective

Build and deploy a GitHub Pages documentation site for `anhtnt90dev/ai-for-ba` that teaches AI literacy, AI-assisted BA work, and AI product analysis for software Business Analysts. The site should follow the spirit of `walkinglabs/learn-harness-engineering`: a course-style repository with a strong README, bilingual documentation, clear learning path, diagrams, labs, and reusable resources.

## Audience

Primary readers are software Business Analysts, product analysts, product owners, and BA leads who need to understand AI deeply enough to use it in daily work and to specify AI-enabled products responsibly.

The course must serve two tracks:

- Individual BA: use AI to improve discovery, analysis, documentation, stakeholder communication, and requirement quality.
- BA lead or expert: guide AI adoption, governance, tool evaluation, operating model, measurement, and AI-product requirement strategy.

## Site Shape

- Static documentation site built with VitePress.
- Deployed by GitHub Actions to GitHub Pages.
- Repository owner: `anhtnt90dev`.
- Repository name: `ai-for-ba`.
- Production URL target: `https://anhtnt90dev.github.io/ai-for-ba/`.
- Primary languages: English (`/en/`) and Vietnamese (`/vi/`).
- Root page routes readers to language entry points.
- README acts as a GitHub-facing course overview.

## Content Architecture

The course contains eight sections:

1. AI Foundations for Business Analysts
2. AI-Augmented BA Workflow
3. AI Collaboration and Context Engineering
4. Requirements Engineering With AI
5. Analysis Artifacts and Diagramming
6. Building AI-Enabled Products as a BA
7. BA Lead and Expert Track
8. Labs and Resource Library

The first release will include:

- 20 bilingual lessons with matching English and Vietnamese slugs.
- 6 bilingual labs.
- Bilingual resource library with prompt templates, checklists, review rubrics, governance checklist, and AI-product requirement checklist.
- Mermaid diagrams embedded across course pages.
- Course glossary with English terms and Vietnamese explanations.

## Lesson Contract

Every lesson must include:

- Learning outcomes.
- Why it matters for BA work.
- Core concept explanation.
- Practical BA example.
- Mermaid diagram where useful.
- Prompt, checklist, or artifact template.
- "What a BA should remember" summary.

Vietnamese pages must be localized for BA teams in Vietnam, not mechanically translated. Important terms can remain in English with Vietnamese explanation, including `acceptance criteria`, `traceability`, `RAG`, `hallucination`, `human-in-the-loop`, `confidence threshold`, and `evaluation`.

## Quality Constraints

- The site must build with `npm run docs:build`.
- A validation script must check bilingual parity, required lesson count, required lab count, Mermaid presence, README links, and GitHub Pages workflow presence.
- The README must link to the deployed documentation path and summarize the curriculum.
- The navigation must make the beginner-to-expert learning path clear.
- The visual style must be documentation-first: clean, readable, concrete, and not a marketing landing page.

## Deployment

Use GitHub CLI authenticated as `anhtnt90dev` to create `anhtnt90dev/ai-for-ba` if it does not already exist. Push the `main` branch. Configure GitHub Pages to use GitHub Actions. Trigger or wait for the Pages deployment workflow and report the final URL.
