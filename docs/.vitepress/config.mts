import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

const docsBase = process.env.DOCS_BASE_PATH ?? "/ai-for-ba/";

const lessons = [
  ["AI Landscape for BAs", "ai-landscape-for-ba", "Bức tranh AI cho BA"],
  ["LLM Mental Model", "llm-mental-model", "Mô hình tư duy về LLM"],
  ["Tokens, Context, and Memory", "tokens-context-and-memory", "Token, context và trí nhớ"],
  ["Hallucination and Grounding", "hallucination-and-source-grounding", "Hallucination và grounding"],
  ["Embeddings, RAG, and Knowledge", "embeddings-rag-and-knowledge", "Embeddings, RAG và tri thức"],
  ["Discovery With AI", "discovery-with-ai", "Discovery với AI"],
  ["Stakeholder Interviews", "stakeholder-interviews-and-synthesis", "Phỏng vấn stakeholder"],
  ["User Stories and Acceptance Criteria", "user-stories-and-acceptance-criteria", "User story và acceptance criteria"],
  ["Process Modeling With AI", "process-modeling-with-ai", "Mô hình hóa quy trình với AI"],
  ["Context Engineering Patterns", "context-engineering-patterns", "Mẫu context engineering"],
  ["Review Loops and Critique", "review-loops-and-critique", "Vòng review và critique"],
  ["Structured Outputs and Prompts", "structured-outputs-and-reusable-prompts", "Structured output và prompt tái sử dụng"],
  ["Ambiguity, Conflict, and Gaps", "ambiguity-conflict-and-gap-analysis", "Mơ hồ, xung đột và khoảng trống"],
  ["NFRs and Risk", "non-functional-requirements-and-risk", "NFR và rủi ro"],
  ["Traceability and Testability", "traceability-and-testability", "Traceability và testability"],
  ["BRD, SRS, and Decision Artifacts", "brd-srs-and-decision-artifacts", "BRD, SRS và artifact quyết định"],
  ["Diagramming for BA", "diagramming-for-ba", "Diagramming cho BA"],
  ["Specifying AI-Enabled Features", "specifying-ai-enabled-features", "Đặc tả tính năng có AI"],
  ["Human Review, Monitoring, and Fallback", "human-in-the-loop-monitoring-and-fallback", "Human review, monitoring và fallback"],
  ["AI Strategy, Governance, and Adoption", "ai-strategy-governance-and-adoption", "AI strategy, governance và adoption"]
];

const labs = [
  ["Meeting Transcript to Requirements", "meeting-transcript-to-requirements", "Từ meeting transcript đến requirement"],
  ["Ambiguous Requirement Review", "ambiguous-requirement-review", "Review requirement mơ hồ"],
  ["Stories and Acceptance Criteria", "stories-and-acceptance-criteria", "User story và acceptance criteria"],
  ["Process and Sequence Diagrams", "process-and-sequence-diagrams", "Process và sequence diagram"],
  ["RAG Assistant Requirements", "rag-assistant-requirements", "Requirement cho RAG assistant"],
  ["AI Adoption Roadmap", "ai-adoption-roadmap", "Roadmap adoption AI"]
];

function lessonItems(locale: "en" | "vi") {
  return lessons.map(([enTitle, slug, viTitle], index) => ({
    text: `${String(index + 1).padStart(2, "0")}. ${locale === "en" ? enTitle : viTitle}`,
    link: `/${locale}/lessons/${slug}/`
  }));
}

function labItems(locale: "en" | "vi") {
  return labs.map(([enTitle, slug, viTitle], index) => ({
    text: `${String(index + 1).padStart(2, "0")}. ${locale === "en" ? enTitle : viTitle}`,
    link: `/${locale}/labs/${slug}/`
  }));
}

function sidebar(locale: "en" | "vi") {
  const labels =
    locale === "en"
      ? { start: "Start", lessons: "Lessons", labs: "Labs", resources: "Resources" }
      : { start: "Bắt đầu", lessons: "Bài học", labs: "Thực hành", resources: "Tài nguyên" };

  return [
    {
      text: labels.start,
      items: [{ text: locale === "en" ? "Course Overview" : "Tổng quan khóa học", link: `/${locale}/` }]
    },
    {
      text: labels.lessons,
      items: lessonItems(locale)
    },
    {
      text: labels.labs,
      items: labItems(locale)
    },
    {
      text: labels.resources,
      items: [
        { text: locale === "en" ? "Resource Library" : "Thư viện tài nguyên", link: `/${locale}/resources/` },
        { text: locale === "en" ? "Prompt Library" : "Thư viện prompt", link: `/${locale}/resources/prompt-library` },
        { text: locale === "en" ? "Checklists" : "Checklist", link: `/${locale}/resources/checklists` },
        { text: locale === "en" ? "Glossary" : "Glossary", link: `/${locale}/resources/glossary` }
      ]
    }
  ];
}

export default withMermaid(
  defineConfig({
    base: docsBase,
    title: "AI for Business Analysts",
    description: "Bilingual AI literacy and AI-enabled product analysis course for software Business Analysts.",
    cleanUrls: true,
    srcExclude: ["superpowers/**"],
    lastUpdated: true,
    markdown: {
      theme: {
        light: "github-light",
        dark: "github-dark"
      }
    },
    themeConfig: {
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%232562eb'/%3E%3Cpath d='M18 44h28M20 38l7-18 6 12 5-8 6 14' fill='none' stroke='white' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E",
      search: {
        provider: "local"
      },
      nav: [
        { text: "English", link: "/en/" },
        { text: "Tiếng Việt", link: "/vi/" },
        {
          text: "Resources",
          items: [
            { text: "English Resources", link: "/en/resources/" },
            { text: "Tài nguyên tiếng Việt", link: "/vi/resources/" }
          ]
        },
        { text: "GitHub", link: "https://github.com/anhtnt90dev/ai-for-ba" }
      ],
      sidebar: {
        "/en/": sidebar("en"),
        "/vi/": sidebar("vi")
      },
      socialLinks: [{ icon: "github", link: "https://github.com/anhtnt90dev/ai-for-ba" }],
      footer: {
        message: "Built for software Business Analysts learning AI with rigor and practical judgment.",
        copyright: "MIT Licensed"
      }
    }
  })
);
