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
  const headingLine = `## ${heading}`;
  const headingIndex = content.indexOf(headingLine);
  if (headingIndex === -1) {
    return "";
  }

  const contentStart = content.indexOf("\n", headingIndex) + 1;
  const rest = content.slice(contentStart);
  const nextHeadingIndex = rest.search(/\n## /);
  return (nextHeadingIndex === -1 ? rest : rest.slice(0, nextHeadingIndex)).trim();
}

function containsArtifactStructure(markdown) {
  return markdown.includes("| --- |") || (markdown.match(/^- /gm)?.length ?? 0) >= 4;
}

function stripHtmlCallouts(markdown) {
  return markdown.replace(/<div class="ba-callout">[\s\S]*?<\/div>/g, "");
}

function normalizedText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/[|*_`#>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

const requiredLessonHeadings = [
  "## Learning outcomes",
  "## Why this matters for BA work",
  "## Mental model or core concept",
  "## Practical BA example",
  "## Diagram",
  "## BA artifact",
  "## AI expert note",
  "## Bad vs better example",
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
const whyBodiesByLocale = { en: [], vi: [] };
const expertBodiesByLocale = { en: [], vi: [] };
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

    const why = normalizedText(stripHtmlCallouts(sectionContent(content, "Why this matters for BA work")));
    assert(wordCount(why) >= 35, `${file} must include a lesson-specific Why section with at least 35 words`);
    whyBodiesByLocale[locale].push({ file, body: why });

    const expert = normalizedText(sectionContent(content, "AI expert note"));
    assert(wordCount(expert) >= 30, `${file} must include a substantive AI expert note with at least 30 words`);
    expertBodiesByLocale[locale].push({ file, body: expert });

    const badBetter = sectionContent(content, "Bad vs better example");
    assert(badBetter.includes("| --- |"), `${file} must include a structured Bad vs better example table`);
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

for (const locale of ["en", "vi"]) {
  const uniqueWhyBodies = new Set(whyBodiesByLocale[locale].map((item) => item.body));
  assert(
    uniqueWhyBodies.size >= 18,
    `${locale} lessons must have lesson-specific Why sections: expected at least 18 unique bodies, got ${uniqueWhyBodies.size}`
  );

  const uniqueExpertBodies = new Set(expertBodiesByLocale[locale].map((item) => item.body));
  assert(
    uniqueExpertBodies.size >= 18,
    `${locale} lessons must have lesson-specific AI expert notes: expected at least 18 unique bodies, got ${uniqueExpertBodies.size}`
  );
}

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
