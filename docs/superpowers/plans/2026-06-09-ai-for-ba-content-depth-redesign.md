# AI for BA Content Depth Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace shallow, repetitive generated course pages with richer bilingual lessons, unique Mermaid diagrams, practical BA artifacts, upgraded labs, and stronger resource playbooks.

**Architecture:** Keep the existing VitePress site and content generator. Strengthen validation first so the current shallow content fails, then rewrite `scripts/seed-course-content.mjs` to generate lesson-specific content and artifacts. Regenerate all Markdown, run the site build, push, and verify GitHub Pages.

**Tech Stack:** Node.js 24, npm, VitePress, Mermaid, GitHub Actions, GitHub Pages.

---

## Task 1: Tighten Validation

**Files:**
- Modify: `scripts/validate-content.mjs`

- [ ] Add required lesson headings for artifact, mistakes, apply-tomorrow, and upgraded core concept.
- [ ] Reject the old generic diagram phrases: `Business goal`, `Source context`, `AI analysis`, `Validated artifact`.
- [ ] Require each lesson to contain a table or multi-item checklist inside the artifact section.
- [ ] Require diagram blocks across lessons to be diverse, not one repeated block.
- [ ] Run `node scripts/validate-content.mjs` and verify it fails against the current shallow content.

## Task 2: Rewrite Generator

**Files:**
- Replace: `scripts/seed-course-content.mjs`

- [ ] Replace the generic lesson template with a richer lesson contract.
- [ ] Add lesson-specific diagram definitions for all 20 lessons.
- [ ] Add lesson-specific artifacts for all 20 lessons.
- [ ] Add stronger prompts, mistakes, apply-tomorrow steps, and memory summaries.
- [ ] Upgrade lab pages with input samples, exercises, expected outputs, rubrics, and unique diagrams.
- [ ] Upgrade resource pages into prompt playbook, review rubrics, templates, scorecards, and glossary.

## Task 3: Regenerate and Verify

**Files:**
- Modify generated pages under `docs/en/**` and `docs/vi/**`
- Modify: `README.md`

- [ ] Run `node scripts/seed-course-content.mjs`.
- [ ] Run `npm test`.
- [ ] Inspect representative pages:
  - `docs/en/lessons/ai-landscape-for-ba/index.md`
  - `docs/en/lessons/specifying-ai-enabled-features/index.md`
  - `docs/vi/lessons/embeddings-rag-and-knowledge/index.md`
  - `docs/en/labs/rag-assistant-requirements/index.md`
- [ ] Confirm the old generic diagram is gone.

## Task 4: Deploy

**Files:**
- GitHub repository: `anhtnt90dev/ai-for-ba`

- [ ] Commit rewrite.
- [ ] Push to `main`.
- [ ] Watch GitHub Pages workflow.
- [ ] Verify production URLs return HTTP 200.

## Self-Review

- Spec coverage: plan covers validation, generator rewrite, regenerated lessons/labs/resources, build, push, and deploy.
- Placeholder scan: no placeholder tasks remain.
- Type consistency: file names and npm scripts match the repository.
