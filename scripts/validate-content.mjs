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
    assert(content.includes("## Learning outcomes"), `${file} must include learning outcomes`);
    assert(content.includes("```mermaid"), `${file} must include a Mermaid diagram`);
    assert(content.includes("## What a BA should remember"), `${file} must include BA memory summary`);
    assert(content.includes("## Practical BA example"), `${file} must include a practical BA example`);
  }

  for (const slug of listDirs(`docs/${locale}/labs`)) {
    const file = `docs/${locale}/labs/${slug}/index.md`;
    assert(exists(file), `${file} is required`);
    if (!exists(file)) {
      continue;
    }

    const content = read(file);
    assert(content.includes("## Scenario"), `${file} must include a scenario`);
    assert(content.includes("## Deliverables"), `${file} must include deliverables`);
    assert(content.includes("```mermaid"), `${file} must include a Mermaid diagram`);
  }
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
