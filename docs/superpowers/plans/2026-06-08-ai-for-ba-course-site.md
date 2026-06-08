# AI for BA Course Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a bilingual VitePress course site that teaches AI literacy, practical AI use, and AI-product analysis for software Business Analysts.

**Architecture:** The repository is a static documentation site. VitePress owns navigation, language routing, Markdown rendering, Mermaid diagrams, and production build output. GitHub Actions builds `docs/.vitepress/dist` and deploys it through GitHub Pages.

**Tech Stack:** Node.js 24, npm, VitePress, Mermaid, vitepress-plugin-mermaid, GitHub Actions, GitHub CLI.

---

## File Structure

- `package.json`: npm scripts and site dependencies.
- `.gitignore`: Node, VitePress, artifact, and local development ignores.
- `README.md`: GitHub-facing course overview.
- `.github/workflows/deploy-pages.yml`: GitHub Pages deployment workflow.
- `scripts/validate-content.mjs`: validation script for bilingual content and required assets.
- `docs/index.md`: root documentation entry.
- `docs/.vitepress/config.mts`: VitePress site config, navigation, sidebars, locales, Mermaid plugin.
- `docs/.vitepress/theme/index.ts`: VitePress default theme extension.
- `docs/.vitepress/theme/custom.css`: visual polish for course blocks and diagrams.
- `docs/en/**`: English course, labs, and resources.
- `docs/vi/**`: Vietnamese course, labs, and resources.

## Task 1: Create Test and Project Skeleton

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `scripts/validate-content.mjs`

- [ ] **Step 1: Write the failing validation test**

Create `scripts/validate-content.mjs` with checks for:

- `docs/en/lessons` and `docs/vi/lessons` both contain 20 lesson `index.md` files.
- `docs/en/labs` and `docs/vi/labs` both contain 6 lab `index.md` files.
- every lesson has `## Learning outcomes`, a Mermaid fence, and `## What a BA should remember`.
- English and Vietnamese lesson/lab directory names match.
- `.github/workflows/deploy-pages.yml` exists.
- `README.md` links to `https://anhtnt90dev.github.io/ai-for-ba/`.

- [ ] **Step 2: Run validation to verify RED**

Run: `node scripts/validate-content.mjs`

Expected: FAIL because site files do not exist yet.

- [ ] **Step 3: Add npm skeleton**

Create `package.json` with scripts:

```json
{
  "name": "ai-for-ba",
  "private": true,
  "version": "0.1.0",
  "description": "Bilingual AI literacy and AI-enabled product analysis course for software Business Analysts.",
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs --host 127.0.0.1",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs --host 127.0.0.1",
    "validate": "node scripts/validate-content.mjs",
    "test": "npm run validate && npm run docs:build"
  },
  "devDependencies": {
    "mermaid": "^11.14.0",
    "vitepress": "^1.6.4",
    "vitepress-plugin-mermaid": "^2.0.17"
  }
}
```

- [ ] **Step 4: Commit the skeleton**

Run: `git add package.json .gitignore scripts/validate-content.mjs && git commit -m "test: add course content validation"`

## Task 2: Implement VitePress Shell

**Files:**
- Create: `.github/workflows/deploy-pages.yml`
- Create: `docs/index.md`
- Create: `docs/.vitepress/config.mts`
- Create: `docs/.vitepress/theme/index.ts`
- Create: `docs/.vitepress/theme/custom.css`

- [ ] **Step 1: Add GitHub Pages workflow**

Use `actions/checkout@v5`, `actions/setup-node@v6`, `actions/configure-pages@v5`, `actions/upload-pages-artifact@v4`, and `actions/deploy-pages@v4`. Build with `npm ci`, `npm run validate`, and `npm run docs:build`.

- [ ] **Step 2: Add VitePress config**

Configure:

- base path from `DOCS_BASE_PATH` with fallback `/ai-for-ba/`.
- English and Vietnamese locales.
- nav links for Lessons, Labs, Resources, and GitHub.
- sidebars for 20 lessons, 6 labs, and resources.
- Mermaid plugin.

- [ ] **Step 3: Add theme CSS**

Add readable course callouts, two-column grids where appropriate, Mermaid spacing, compact cards, and language-neutral typography.

- [ ] **Step 4: Run validation**

Run: `node scripts/validate-content.mjs`

Expected: FAIL because course content does not exist yet.

## Task 3: Implement Bilingual Course Content

**Files:**
- Create: `docs/en/index.md`
- Create: `docs/vi/index.md`
- Create: 20 `docs/en/lessons/<slug>/index.md`
- Create: 20 `docs/vi/lessons/<slug>/index.md`
- Create: 6 `docs/en/labs/<slug>/index.md`
- Create: 6 `docs/vi/labs/<slug>/index.md`
- Create: resource pages under `docs/en/resources/` and `docs/vi/resources/`

- [ ] **Step 1: Add English course pages**

Create 20 lessons across the eight approved sections. Each page follows the lesson contract from the design spec.

- [ ] **Step 2: Add Vietnamese course pages**

Create matching Vietnamese pages with localized explanations and retained English terminology where useful.

- [ ] **Step 3: Add labs**

Create 6 labs:

1. meeting transcript to requirements
2. ambiguous requirement review
3. user stories and acceptance criteria
4. process and sequence diagrams
5. RAG assistant requirements
6. BA team AI adoption plan

- [ ] **Step 4: Add resources**

Create prompt library, BA checklist, AI-product requirement checklist, governance checklist, review rubric, and glossary.

- [ ] **Step 5: Run validation**

Run: `node scripts/validate-content.mjs`

Expected: PASS.

## Task 4: README, Install, Build, and Browser Verification

**Files:**
- Create: `README.md`
- Modify: `package-lock.json` through `npm install`

- [ ] **Step 1: Add README**

README includes bilingual language badges, course overview, visual preview notes, learning path, syllabus, labs, resources, local preview commands, deployment URL, and license.

- [ ] **Step 2: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` generated.

- [ ] **Step 3: Run full verification**

Run: `npm test`

Expected: validation passes and VitePress build succeeds.

- [ ] **Step 4: Start preview and inspect in browser**

Run: `npm run docs:dev`

Open local VitePress URL and inspect English and Vietnamese routes. Confirm pages render, diagrams are not blank, navigation works, and no visible overlap.

## Task 5: Deploy to GitHub

**Files:**
- Remote repository: `anhtnt90dev/ai-for-ba`

- [ ] **Step 1: Commit implementation**

Run: `git add . && git commit -m "feat: build bilingual AI for BA course site"`

- [ ] **Step 2: Create GitHub repository if missing**

Run: `gh repo create anhtnt90dev/ai-for-ba --public --source . --remote origin --push`

If the repo exists, set remote and push:

```powershell
git remote add origin https://github.com/anhtnt90dev/ai-for-ba.git
git push -u origin main
```

- [ ] **Step 3: Configure Pages**

Run: `gh api -X PUT repos/anhtnt90dev/ai-for-ba/pages -f source='{"branch":"gh-pages","path":"/"}'` only if Actions-based Pages is not already available. Prefer the deploy workflow with `pages:write` permissions.

- [ ] **Step 4: Trigger and verify deployment**

Run: `gh workflow run deploy-pages.yml --repo anhtnt90dev/ai-for-ba --ref main` if push does not trigger automatically. Watch with `gh run list` and `gh run watch`.

Expected production URL: `https://anhtnt90dev.github.io/ai-for-ba/`.

## Self-Review

- Spec coverage: plan covers VitePress shell, bilingual lessons, labs, resources, validation, README, GitHub Actions, repo creation, and deployment.
- Placeholder scan: no pending placeholder or undefined file path is required for execution.
- Type consistency: Node script, VitePress config, npm scripts, and GitHub workflow commands use matching names.
