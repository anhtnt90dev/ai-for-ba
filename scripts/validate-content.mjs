import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function listDirs(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    return [];
  }

  return fs
    .readdirSync(fullPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function assertEqual(actual, expected, message) {
  assert(actual === expected, `${message}: expected ${expected}, got ${actual}`);
}

function assertSameList(actual, expected, message) {
  assert(
    actual.length === expected.length && actual.every((item, index) => item === expected[index]),
    `${message}: expected [${expected.join(", ")}], got [${actual.join(", ")}]`
  );
}

function extractMermaidBlocks(content) {
  return [...content.matchAll(/```mermaid\s+([\s\S]*?)```/g)].map((match) => match[1].trim());
}

function sectionContent(content, heading) {
  const escapedHeading = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const sectionMatch = content.match(new RegExp(`^## ${escapedHeading}\\s*\\n([\\s\\S]*?)(?=^## |$)`, "m"));
  return sectionMatch?.[1]?.trim() ?? "";
}

function containsArtifactStructure(markdown) {
  return markdown.includes("| --- |") || (markdown.match(/^- /gm)?.length ?? 0) >= 4;
}

const requiredLessonHeadings = [
  "## Learning outcomes",
  "## Why this matters for BA work",
  "## Mental model or core concept",
  "## Practical BA example",
  "## Diagram",
  "## BA artifact",
  "## AI collaboration prompt",
  "## Mistakes to avoid",
  "## Apply this tomorrow",
  "## What a BA should remember"
];

const requiredLabHeadings = [
  "## Scenario",
  "## Input sample",
  "## Exercise steps",
  "## Deliverables",
  "## Review rubric"
];

const diagramSignatures = new Set();
const failures = [];

assert(exists("README.md"), "README.md is required");
assert(exists(".github/workflows/deploy-pages.yml"), "GitHub Pages workflow is required");
assert(exists("docs/.vitepress/config.mts"), "VitePress config is required");
assert(exists("docs/en/index.md"), "English course home is required");
assert(exists("docs/vi/index.md"), "Vietnamese course home is required");

const enLessons = listDirs("docs/en/lessons");
const viLessons = listDirs("docs/vi/lessons");
const enLabs = listDirs("docs/en/labs");
const viLabs = listDirs("docs/vi/labs");

assertEqual(enLessons.length, 20, "English lesson count");
assertEqual(viLessons.length, 20, "Vietnamese lesson count");
assertEqual(enLabs.length, 6, "English lab count");
assertEqual(viLabs.length, 6, "Vietnamese lab count");
assertSameList(viLessons, enLessons, "Lesson slug parity");
assertSameList(viLabs, enLabs, "Lab slug parity");

for (const locale of ["en", "vi"]) {
  for (const slug of listDirs(`docs/${locale}/lessons`)) {
    const file = `docs/${locale}/lessons/${slug}/index.md`;
    assert(exists(file), `${file} is required`);
    if (!exists(file)) {
      continue;
    }

    const content = read(file);
    for (const heading of requiredLessonHeadings) {
      assert(content.includes(heading), `${file} must include ${heading}`);
    }

    const mermaidBlocks = extractMermaidBlocks(content);
    assert(mermaidBlocks.length > 0, `${file} must include a Mermaid diagram`);
    for (const block of mermaidBlocks) {
      const usesOldGenericDiagram =
        block.includes("Business goal") &&
        block.includes("Source context") &&
        block.includes("AI analysis") &&
        block.includes("Validated artifact");
      assert(!usesOldGenericDiagram, `${file} must not use the old generic review-loop diagram`);
      diagramSignatures.add(block.replace(/\s+/g, " "));
    }

    const artifact = sectionContent(content, "BA artifact");
    assert(containsArtifactStructure(artifact), `${file} must include a structured BA artifact`);
  }

  for (const slug of listDirs(`docs/${locale}/labs`)) {
    const file = `docs/${locale}/labs/${slug}/index.md`;
    assert(exists(file), `${file} is required`);
    if (!exists(file)) {
      continue;
    }

    const content = read(file);
    for (const heading of requiredLabHeadings) {
      assert(content.includes(heading), `${file} must include ${heading}`);
    }
    assert(content.includes("```mermaid"), `${file} must include a Mermaid diagram`);
  }
}

assert(
  diagramSignatures.size >= 30,
  `Lesson diagrams must be diverse across locales: expected at least 30 unique diagrams, got ${diagramSignatures.size}`
);

for (const file of [
  "docs/en/resources/index.md",
  "docs/en/resources/prompt-library.md",
  "docs/en/resources/checklists.md",
  "docs/en/resources/glossary.md",
  "docs/vi/resources/index.md",
  "docs/vi/resources/prompt-library.md",
  "docs/vi/resources/checklists.md",
  "docs/vi/resources/glossary.md"
]) {
  assert(exists(file), `${file} is required`);
}

if (exists("README.md")) {
  const readme = read("README.md");
  assert(
    readme.includes("https://anhtnt90dev.github.io/ai-for-ba/"),
    "README.md must link to the GitHub Pages URL"
  );
  assert(readme.includes("AI for Business Analysts"), "README.md must name the course");
}

if (failures.length > 0) {
  console.error("Content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
