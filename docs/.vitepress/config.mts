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

const useCases = [
  ["Stakeholder Discovery From Messy Notes", "stakeholder-discovery-from-messy-notes", "Discovery stakeholder từ notes lộn xộn"],
  ["Project Kickoff Scope Framing", "project-kickoff-scope-framing", "Framing scope cho project kickoff"],
  ["Current-State Process Mapping", "current-state-process-mapping", "Mapping current-state process"],
  ["Legacy Modernization Gap Analysis", "legacy-modernization-gap-analysis", "Gap analysis cho legacy modernization"],
  ["Market and Competitor Research Synthesis", "market-competitor-research-synthesis", "Synthesis market và competitor research"],
  ["User Story Splitting for Sprint Readiness", "user-story-splitting-for-sprint", "Split user story cho sprint readiness"],
  ["Acceptance Criteria and Edge Case Expansion", "acceptance-criteria-edge-cases", "Mở rộng acceptance criteria và edge case"],
  ["BRD and SRS Drafting Review", "brd-srs-drafting-review", "Draft và review BRD/SRS"],
  ["NFR and Risk Workshop Preparation", "nfr-risk-workshop", "Chuẩn bị workshop NFR và risk"],
  ["Traceability Matrix for Release Readiness", "traceability-matrix-for-release", "Traceability matrix cho release readiness"],
  ["Defect Triage and Root-Cause Analysis", "defect-triage-root-cause", "Triage defect và root-cause analysis"],
  ["Test Scenario Generation From Requirements", "test-scenario-generation", "Sinh test scenario từ requirements"],
  ["Change Impact Analysis", "change-impact-analysis", "Change impact analysis"],
  ["Release Readiness Check", "release-readiness-check", "Kiểm tra release readiness"],
  ["Production Incident to Requirement Feedback", "production-incident-requirement-feedback", "Từ production incident đến feedback requirement"],
  ["RAG Policy Assistant Requirements", "rag-policy-assistant-requirements", "Requirement cho RAG policy assistant"],
  ["AI Ticket Triage Specification", "ai-ticket-triage-specification", "Đặc tả AI ticket triage"],
  ["AI Document OCR Intake", "ai-document-ocr-intake", "AI OCR cho document intake"],
  ["AI Recommendation Explanation", "ai-recommendation-explanation", "Giải thích AI recommendation"],
  ["AI Chatbot Human Handoff", "ai-chatbot-human-handoff", "AI chatbot và human handoff"],
  ["Loan Origination Journey Modernization", "loan-origination-journey", "Modernize journey loan origination"],
  ["Insurance Claim Intake Automation", "insurance-claim-intake", "Automation insurance claim intake"],
  ["E-commerce Return and Refund Flow", "ecommerce-return-refund", "Flow return và refund e-commerce"],
  ["Healthcare Appointment Intake", "healthcare-appointment-intake", "Healthcare appointment intake"],
  ["HR Employee Service Portal", "hr-employee-service-portal", "HR employee service portal"],
  ["Finance Reconciliation Exception Workflow", "finance-reconciliation-exception", "Workflow finance reconciliation exception"],
  ["Vendor Selection for an AI Tool", "vendor-selection-ai-tool", "Chọn vendor cho AI tool"],
  ["Data Privacy Assessment for AI Use", "data-privacy-ai-assessment", "Assessment data privacy cho AI use"],
  ["BA AI Adoption Playbook", "ba-ai-adoption-playbook", "Playbook adoption AI cho BA team"],
  ["AI Use Case Portfolio Prioritization", "portfolio-use-case-prioritization", "Prioritize portfolio AI use case"]
];

const engineeringUseCases = [
  ["Figma Design Handoff to Requirements", "figma-design-handoff-requirements", "Từ Figma handoff đến requirement"],
  ["Screen State Behavior Specification", "screen-state-behavior-specification", "Đặc tả behavior theo screen state"],
  ["Complex Form Validation Rules", "complex-form-validation-rules", "Rule validation cho form phức tạp"],
  ["Empty, Loading, and Error State Requirements", "empty-loading-error-state-requirements", "Requirement cho empty, loading và error state"],
  ["Responsive and Mobile UI Behavior", "responsive-mobile-ui-behavior", "Behavior responsive và mobile UI"],
  ["Accessibility Acceptance Criteria", "accessibility-acceptance-criteria", "Acceptance criteria cho accessibility"],
  ["Design System Component Requirements", "design-system-component-requirements", "Requirement cho design system component"],
  ["UX Microcopy and Error Message Review", "ux-microcopy-error-message-review", "Review microcopy và error message UX"],
  ["Navigation and User Flow Analysis", "navigation-user-flow-analysis", "Phân tích navigation và user flow"],
  ["Frontend Analytics Event Requirements", "frontend-analytics-event-requirements", "Requirement cho frontend analytics event"],
  ["Localization and i18n UI Requirements", "localization-i18n-ui-requirements", "Requirement localization và i18n UI"],
  ["Visual Regression and UI QA Handoff", "visual-regression-qa-handoff", "Handoff visual regression và UI QA"],
  ["Frontend Permission Visibility Rules", "frontend-permission-visibility-rules", "Rule visibility theo permission trên frontend"],
  ["API Contract Requirements", "api-contract-requirements", "Requirement cho API contract"],
  ["Request and Response Schema Review", "request-response-schema-review", "Review schema request và response"],
  ["API Error Code and Message Taxonomy", "api-error-code-taxonomy", "Taxonomy error code và message cho API"],
  ["Authentication, Authorization, and RBAC Rules", "auth-authorization-rbac-rules", "Rule authentication, authorization và RBAC"],
  ["Idempotency, Retry, and Timeout Behavior", "idempotency-retry-timeout-behavior", "Behavior idempotency, retry và timeout"],
  ["Webhook and Event-Driven Requirements", "webhook-event-requirements", "Requirement webhook và event-driven"],
  ["Backend Validation and Business Rules", "backend-validation-business-rules", "Backend validation và business rules"],
  ["Batch Job and Scheduled Process Requirements", "batch-job-scheduled-process", "Requirement cho batch job và scheduled process"],
  ["Audit Log and Operational Logging Requirements", "audit-log-operational-logging", "Requirement audit log và operational logging"],
  ["API Versioning and Backward Compatibility", "api-versioning-compatibility", "API versioning và backward compatibility"],
  ["Integration Failure and Fallback Behavior", "integration-failure-fallback-behavior", "Behavior khi integration fail và fallback"],
  ["Caching and Rate Limit Requirements", "caching-rate-limit-requirements", "Requirement caching và rate limit"],
  ["Data Mapping and Transformation Rules", "data-mapping-transformation-rules", "Rule data mapping và transformation"],
  ["Entity Lifecycle and State Machine", "entity-lifecycle-state-machine", "Entity lifecycle và state machine"],
  ["Database Field and Business Rule Alignment", "database-field-business-rule-alignment", "Align database field và business rule"],
  ["Reporting and Dashboard Metric Definition", "reporting-dashboard-metric-definition", "Định nghĩa metric cho reporting và dashboard"],
  ["Search, Filter, and Sort Requirements", "search-filter-sort-requirements", "Requirement search, filter và sort"],
  ["Notification Trigger and Template Rules", "notification-trigger-template-rules", "Rule trigger và template notification"],
  ["File Upload and Download Behavior", "file-upload-download-behavior", "Behavior upload và download file"],
  ["External System Integration Mapping", "external-system-integration-mapping", "Mapping integration với external system"],
  ["BA-Developer Refinement With AI", "ba-developer-refinement-ai", "Refinement BA-developer với AI"],
  ["BA-QA Test Handoff With AI", "ba-qa-test-handoff-ai", "Handoff test BA-QA với AI"],
  ["BA-UX Critique Loop", "ba-ux-critique-loop", "Vòng critique BA-UX"],
  ["BA-Tech Lead NFR Review", "ba-tech-lead-nfr-review", "Review NFR giữa BA và tech lead"],
  ["Product Trade-off Decision Memo", "product-tradeoff-decision-memo", "Decision memo cho product trade-off"],
  ["Production Issue to UI/API Requirement Update", "production-issue-ui-api-requirement-update", "Từ production issue đến update requirement UI/API"],
  ["Frontend-Backend Contract Workshop", "frontend-backend-contract-workshop", "Workshop contract frontend-backend"],
  ["Design-to-API End-to-End Traceability", "design-to-api-end-to-end-traceability", "Traceability end-to-end từ design đến API"]
];

useCases.push(...engineeringUseCases);

const useCaseGroups = [
  { en: "Discovery and alignment", vi: "Discovery và alignment", items: useCases.slice(0, 5) },
  { en: "Requirements and backlog", vi: "Requirements và backlog", items: useCases.slice(5, 10) },
  { en: "Delivery and QA", vi: "Delivery và QA", items: useCases.slice(10, 15) },
  { en: "AI-enabled product use cases", vi: "AI-enabled product", items: useCases.slice(15, 20) },
  { en: "Domain project scenarios", vi: "Tình huống theo domain", items: useCases.slice(20, 26) },
  { en: "Governance and adoption", vi: "Governance và adoption", items: useCases.slice(26, 30) },
  { en: "Frontend, UI, and UX", vi: "Frontend, UI và UX", items: engineeringUseCases.slice(0, 13) },
  { en: "Backend and API", vi: "Backend và API", items: engineeringUseCases.slice(13, 25) },
  { en: "Data and Integration", vi: "Data và Integration", items: engineeringUseCases.slice(25, 33) },
  { en: "Cross-functional BA Collaboration", vi: "Collaboration cross-functional của BA", items: engineeringUseCases.slice(33, 41) }
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

function useCaseGroupItems(locale: "en" | "vi") {
  return useCaseGroups.map((group) => ({
    text: `${locale === "en" ? group.en : group.vi} (${group.items.length})`,
    collapsed: true,
    items: group.items.map(([enTitle, slug, viTitle]) => ({
      text: locale === "en" ? enTitle : viTitle,
      link: `/${locale}/use-cases/${slug}/`
    }))
  }));
}

function sidebar(locale: "en" | "vi") {
  const labels =
    locale === "en"
      ? { start: "Start", lessons: "Lessons", labs: "Labs", useCases: "Project Use Cases", resources: "Resources" }
      : { start: "Bắt đầu", lessons: "Bài học", labs: "Thực hành", useCases: "Use case dự án", resources: "Tài nguyên" };

  return [
    {
      text: labels.start,
      items: [
        { text: locale === "en" ? "Course Overview" : "Tổng quan khóa học", link: `/${locale}/` },
        { text: locale === "en" ? "Pixel Quest Game" : "Game Pixel Quest", link: `/${locale}/game/` }
      ]
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
      text: labels.useCases,
      collapsed: true,
      items: [
        { text: locale === "en" ? "Use Case Library" : "Thư viện use case", link: `/${locale}/use-cases/` },
        ...useCaseGroupItems(locale)
      ]
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
          text: "Pixel Quest",
          items: [
            { text: "Play in English", link: "/en/game/" },
            { text: "Chơi tiếng Việt", link: "/vi/game/" }
          ]
        },
        {
          text: "Use Cases",
          items: [
            { text: "English Use Cases", link: "/en/use-cases/" },
            { text: "Use case tiếng Việt", link: "/vi/use-cases/" }
          ]
        },
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
