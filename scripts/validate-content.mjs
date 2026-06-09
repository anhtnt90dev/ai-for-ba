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

function anchorSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const requiredLessonHeadings = [
  "## Learning outcomes",
  "## Why this matters for BA work",
  "## Common difficulties for BAs",
  "## Where this applies in real projects",
  "## If this is missing",
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

const requiredUseCaseHeadings = [
  "## Project context",
  "## BA challenge",
  "## Where AI fits",
  "## Inputs to prepare",
  "## BA workflow",
  "## Diagram",
  "## Deliverables",
  "## Prompt to try",
  "## Review checklist",
  "## Risks and controls"
];

const requiredUseCaseGroups = {
  "Discovery and alignment": 5,
  "Requirements and backlog": 5,
  "Delivery and QA": 5,
  "AI-enabled product use cases": 5,
  "Domain project scenarios": 6,
  "Governance and adoption": 4,
  "Frontend, UI, and UX": 12,
  "Backend and API": 12,
  "Data and Integration": 8,
  "Cross-functional BA Collaboration": 8
};

const diagramSignatures = new Set();
const whyBodiesByLocale = { en: [], vi: [] };
const expertBodiesByLocale = { en: [], vi: [] };
const failures = [];

assert(exists("README.md"), "README.md is required");
assert(exists(".github/workflows/deploy-pages.yml"), "GitHub Pages workflow is required");
assert(exists("docs/.vitepress/config.mts"), "VitePress config is required");
assert(exists("docs/index.md"), "Root course home is required");
assert(exists("docs/en/index.md"), "English course home is required");
assert(exists("docs/vi/index.md"), "Vietnamese course home is required");
assert(exists("docs/en/game/index.md"), "English Pixel Quest game page is required");
assert(exists("docs/vi/game/index.md"), "Vietnamese Pixel Quest game page is required");
assert(exists("docs/.vitepress/theme/components/PixelQuest.vue"), "PixelQuest Vue component is required");
for (let index = 0; index <= 5; index += 1) {
  assert(exists(`docs/public/assets/pixel-agents/char_${index}.png`), `Pixel Quest must include Pixel Agents character sprite char_${index}.png`);
}
assert(exists("docs/public/assets/pixel-agents/LICENSE-MIT"), "Pixel Agents sprite asset MIT license file is required");
assert(exists("docs/public/assets/pixel-agents/SOURCE.md"), "Pixel Agents sprite source note is required");

const vitePressConfig = read("docs/.vitepress/config.mts");
const themeIndex = read("docs/.vitepress/theme/index.ts");
const themeCss = read("docs/.vitepress/theme/custom.css");
assert(vitePressConfig.includes("const useCaseGroups"), "VitePress sidebar must define grouped use case navigation");
assert(vitePressConfig.includes("function useCaseGroupItems"), "VitePress sidebar must render grouped use case navigation");
assert(!vitePressConfig.includes("...useCaseItems(locale)"), "VitePress sidebar must not render use cases as one flat list");
assert(vitePressConfig.includes("/en/game/"), "VitePress nav/sidebar must link to the English Pixel Quest game");
assert(vitePressConfig.includes("/vi/game/"), "VitePress nav/sidebar must link to the Vietnamese Pixel Quest game");
assert(themeIndex.includes("PixelQuest"), "VitePress theme must register the PixelQuest component");
assert(themeCss.includes(".mermaid svg"), "Theme CSS must explicitly center Mermaid SVG diagrams");
assert(
  themeCss.includes("justify-content: center") || themeCss.includes("text-align: center"),
  "Theme CSS must center Mermaid diagrams in their container"
);

const pixelQuestComponent = exists("docs/.vitepress/theme/components/PixelQuest.vue")
  ? read("docs/.vitepress/theme/components/PixelQuest.vue")
  : "";
assert(pixelQuestComponent.includes("localStorage"), "PixelQuest must persist progress with localStorage");
assert(pixelQuestComponent.includes("pixel-quest"), "PixelQuest must render the pixel quest game shell");
assert((pixelQuestComponent.match(/slug:/g)?.length ?? 0) >= 20, "PixelQuest must include all 20 lesson quest nodes");
assert(pixelQuestComponent.includes("playerPosition"), "PixelQuest must support direct player movement");
assert(pixelQuestComponent.includes("handleKeyDown"), "PixelQuest must support keyboard movement");
assert(pixelQuestComponent.includes("movePlayer"), "PixelQuest must expose real player movement logic");
assert(pixelQuestComponent.includes("xp"), "PixelQuest must show XP progression");
assert(pixelQuestComponent.includes("level"), "PixelQuest must show level progression");
assert(pixelQuestComponent.includes("pixel-agent-hero"), "PixelQuest must render the Pixel Agents character sprite");
assert(pixelQuestComponent.includes("/assets/pixel-agents/char_"), "PixelQuest must source character sprites from Pixel Agents assets");
assert(pixelQuestComponent.includes("frameSize = 64"), "PixelQuest must render Pixel Agents sprites at a large enough full-body scale");
assert(pixelQuestComponent.includes("stepFrame.value % 3"), "PixelQuest must animate with the full-body front-facing Pixel Agents frames");
assert(pixelQuestComponent.includes('"--agent-y": "0px"'), "PixelQuest must use the front-facing full-body Pixel Agents sprite row");
assert(pixelQuestComponent.includes("landingMode"), "PixelQuest must include a dedicated fullscreen landing mode");
assert(pixelQuestComponent.includes("questHref"), "PixelQuest landing mode must expose quest nodes as lesson links");

const enLessons = listDirs("docs/en/lessons");
const viLessons = listDirs("docs/vi/lessons");
const enLabs = listDirs("docs/en/labs");
const viLabs = listDirs("docs/vi/labs");
const enUseCases = listDirs("docs/en/use-cases").filter((slug) => slug !== "index.md");
const viUseCases = listDirs("docs/vi/use-cases").filter((slug) => slug !== "index.md");

assertEqual(enLessons.length, 20, "English lesson count");
assertEqual(viLessons.length, 20, "Vietnamese lesson count");
assertEqual(enLabs.length, 6, "English lab count");
assertEqual(viLabs.length, 6, "Vietnamese lab count");
assert(enUseCases.length >= 70, `English use case count must be at least 70, got ${enUseCases.length}`);
assert(viUseCases.length >= 70, `Vietnamese use case count must be at least 70, got ${viUseCases.length}`);
assertSameList(viLessons, enLessons, "Lesson slug parity");
assertSameList(viLabs, enLabs, "Lab slug parity");
assertSameList(viUseCases, enUseCases, "Use case slug parity");

const enHome = read("docs/en/index.md");
const viHome = read("docs/vi/index.md");
const rootHome = read("docs/index.md");
assert(enHome.includes("./game/"), "English home page must link to Pixel Quest game mode");
assert(viHome.includes("./game/"), "Vietnamese home page must link to Pixel Quest game mode");
assert(enHome.includes('<PixelQuest locale="en" mode="home" />'), "English home page must embed Pixel Quest as the primary game option");
assert(viHome.includes('<PixelQuest locale="vi" mode="home" />'), "Vietnamese home page must embed Pixel Quest as the primary game option");
assert(rootHome.includes("pageClass: pixel-game-root"), "Root home page must use the fullscreen pixel-game page class");
assert(rootHome.includes('<PixelQuest locale="vi" mode="landing" />'), "Root home page must embed Pixel Quest in fullscreen landing mode");
assert(themeCss.includes(".pixel-game-root"), "Theme CSS must include fullscreen root game page styling");

const enGame = exists("docs/en/game/index.md") ? read("docs/en/game/index.md") : "";
const viGame = exists("docs/vi/game/index.md") ? read("docs/vi/game/index.md") : "";
assert(enGame.includes('<PixelQuest locale="en"'), "English game page must render PixelQuest in English");
assert(viGame.includes('<PixelQuest locale="vi"'), "Vietnamese game page must render PixelQuest in Vietnamese");
assert(enGame.includes("Pixel Quest"), "English game page must describe Pixel Quest");
assert(viGame.includes("Pixel Quest"), "Vietnamese game page must describe Pixel Quest");

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

    const difficulties = normalizedText(sectionContent(content, "Common difficulties for BAs"));
    assert(wordCount(difficulties) >= 45, `${file} must explain common BA difficulties with at least 45 words`);

    const applications = normalizedText(sectionContent(content, "Where this applies in real projects"));
    assert(wordCount(applications) >= 45, `${file} must explain practical project applications with at least 45 words`);

    const missing = normalizedText(sectionContent(content, "If this is missing"));
    assert(wordCount(missing) >= 45, `${file} must explain what goes wrong if the capability is missing`);

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

  assert(exists(`docs/${locale}/use-cases/index.md`), `docs/${locale}/use-cases/index.md is required`);
  if (exists(`docs/${locale}/use-cases/index.md`)) {
    const index = read(`docs/${locale}/use-cases/index.md`);
    assert(
      ((index.match(/\]\(\.\/[^)]+\)/g)?.length ?? 0) + (index.match(/href="\.\/[^"]+"/g)?.length ?? 0)) >= 70,
      `docs/${locale}/use-cases/index.md must link to at least 70 use cases`
    );
    assert(index.includes("```mermaid"), `docs/${locale}/use-cases/index.md must include a Mermaid overview diagram`);
    assert(
      index.includes('class="usecase-group-summary"'),
      `docs/${locale}/use-cases/index.md must include a grouped summary navigation block`
    );
    for (const [group, minimumCount] of Object.entries(requiredUseCaseGroups)) {
      const escapedGroup = group.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const groupCount = (index.match(new RegExp(`<span>${escapedGroup}</span>`, "g"))?.length ?? 0);
      assert(
        groupCount >= minimumCount,
        `docs/${locale}/use-cases/index.md must include at least ${minimumCount} cards for ${group}, got ${groupCount}`
      );
      assert(
        index.includes(`href="#${anchorSlug(group)}"`),
        `docs/${locale}/use-cases/index.md must link to the ${group} section from the group summary`
      );
    }
  }

  for (const slug of listDirs(`docs/${locale}/use-cases`)) {
    const file = `docs/${locale}/use-cases/${slug}/index.md`;
    assert(exists(file), `${file} is required`);
    if (!exists(file)) {
      continue;
    }

    const content = read(file);
    for (const heading of requiredUseCaseHeadings) {
      assert(content.includes(heading), `${file} must include ${heading}`);
    }
    assert(wordCount(normalizedText(content)) >= 450, `${file} must contain at least 450 words of practical detail`);
    assert(content.includes("```mermaid"), `${file} must include a Mermaid workflow diagram`);
    assert(sectionContent(content, "Deliverables").includes("| --- |"), `${file} must include a structured deliverables table`);
    assert(sectionContent(content, "Risks and controls").includes("| --- |"), `${file} must include a structured risks and controls table`);
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

if (exists("docs/.vitepress/theme/custom.css")) {
  const css = read("docs/.vitepress/theme/custom.css");
  for (const selector of [".usecase-grid", ".case-card", ".case-meta", ".ba-workbench-panel"]) {
    assert(css.includes(selector), `custom.css must include ${selector} for the BA workbench theme`);
  }
}

if (exists("README.md")) {
  const readme = read("README.md");
  assert(
    readme.includes("https://anhtnt90dev.github.io/ai-for-ba/"),
    "README.md must link to the GitHub Pages URL"
  );
  assert(readme.includes("AI for Business Analysts"), "README.md must name the course");
  assert(readme.includes("pixel-agents-hq/pixel-agents") && readme.includes("MIT"), "README.md must credit the Pixel Agents sprite source and MIT license");
}

if (failures.length > 0) {
  console.error("Content validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Content validation passed.");
