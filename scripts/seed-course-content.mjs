import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const sections = {
  foundation: ["AI Foundations for Business Analysts", "Nền tảng AI cho Business Analyst"],
  workflow: ["AI-Augmented BA Workflow", "Quy trình BA được tăng cường bởi AI"],
  collaboration: ["AI Collaboration and Context Engineering", "AI collaboration và context engineering"],
  requirements: ["Requirements Engineering With AI", "Requirements engineering với AI"],
  artifacts: ["Analysis Artifacts and Diagramming", "Artifact phân tích và diagramming"],
  products: ["Building AI-Enabled Products as a BA", "Xây dựng sản phẩm có AI dưới góc nhìn BA"],
  lead: ["BA Lead and Expert Track", "BA lead và expert track"]
};

const lessons = [
  {
    slug: "ai-landscape-for-ba",
    section: "foundation",
    enTitle: "AI Landscape for Business Analysts",
    viTitle: "Bức tranh AI cho Business Analyst",
    enFocus: "Understand the AI map a BA needs: predictive AI, generative AI, LLMs, copilots, agents, RAG, and automation.",
    viFocus: "Hiểu bản đồ AI mà BA cần: predictive AI, generative AI, LLM, copilot, agent, RAG và automation.",
    enExample: "A product team asks whether an internal support assistant should be a chatbot, workflow automation, or search experience. A strong BA separates business outcome, user journey, data source, decision risk, and measurement before recommending a solution shape.",
    viExample: "Một product team hỏi nên xây internal support assistant dưới dạng chatbot, workflow automation hay search experience. BA giỏi sẽ tách business outcome, user journey, nguồn dữ liệu, rủi ro quyết định và cách đo lường trước khi đề xuất solution shape.",
    enPrompt: "Act as a senior BA. Classify this AI idea by business outcome, user group, data dependency, decision risk, and whether it needs GenAI, classic automation, search, or human workflow.",
    viPrompt: "Hãy đóng vai senior BA. Phân loại ý tưởng AI này theo business outcome, nhóm người dùng, phụ thuộc dữ liệu, rủi ro quyết định, và nó cần GenAI, automation truyền thống, search hay human workflow."
  },
  {
    slug: "llm-mental-model",
    section: "foundation",
    enTitle: "LLM Mental Model",
    viTitle: "Mô hình tư duy về LLM",
    enFocus: "Build a practical mental model of how language models predict, transform, summarize, classify, and reason over text.",
    viFocus: "Xây dựng mental model thực dụng về cách language model dự đoán, biến đổi, tóm tắt, phân loại và lập luận trên văn bản.",
    enExample: "When asking AI to write acceptance criteria, the BA should not assume the model knows hidden business rules. The model can infer patterns, but the BA must provide constraints, examples, edge cases, and review criteria.",
    viExample: "Khi nhờ AI viết acceptance criteria, BA không nên giả định model biết business rule ẩn. Model có thể suy luận pattern, nhưng BA phải cung cấp constraint, ví dụ, edge case và tiêu chí review.",
    enPrompt: "Explain your assumptions before producing the answer. Mark every assumption as explicit, inferred, or missing. Do not invent policy or system behavior that is not in the provided context.",
    viPrompt: "Trước khi trả lời, hãy liệt kê assumption. Đánh dấu từng assumption là explicit, inferred hoặc missing. Không tự bịa policy hoặc system behavior nếu context không cung cấp."
  },
  {
    slug: "tokens-context-and-memory",
    section: "foundation",
    enTitle: "Tokens, Context, and Memory",
    viTitle: "Token, context và trí nhớ",
    enFocus: "Learn why context windows, token budgets, and session memory shape the quality of AI-assisted analysis.",
    viFocus: "Hiểu vì sao context window, token budget và session memory ảnh hưởng trực tiếp đến chất lượng phân tích với AI.",
    enExample: "A BA uploads a long SRS and asks for all missing requirements. If the context is incomplete or poorly chunked, the answer may miss entire modules. Better work starts with section maps, source IDs, and staged review.",
    viExample: "BA upload một SRS dài và yêu cầu tìm toàn bộ missing requirements. Nếu context thiếu hoặc chunk kém, câu trả lời có thể bỏ sót cả module. Cách làm tốt hơn là tạo section map, source ID và review theo từng giai đoạn.",
    enPrompt: "Create a source map first. List sections, source IDs, assumptions, and open questions. Then review one section at a time for missing, ambiguous, conflicting, and non-testable requirements.",
    viPrompt: "Trước hết hãy tạo source map. Liệt kê section, source ID, assumption và open question. Sau đó review từng section để tìm requirement thiếu, mơ hồ, xung đột và không test được."
  },
  {
    slug: "hallucination-and-source-grounding",
    section: "foundation",
    enTitle: "Hallucination and Source Grounding",
    viTitle: "Hallucination và source grounding",
    enFocus: "Recognize hallucination patterns and design prompts that force answers to stay grounded in source material.",
    viFocus: "Nhận diện pattern hallucination và thiết kế prompt buộc câu trả lời bám vào nguồn dữ liệu.",
    enExample: "During vendor comparison, AI may confidently invent product capabilities. A BA should require citations, separate evidence from inference, and mark unsupported claims as risks.",
    viExample: "Khi so sánh vendor, AI có thể tự tin bịa capability của sản phẩm. BA cần yêu cầu citation, tách evidence khỏi inference và đánh dấu claim thiếu nguồn là risk.",
    enPrompt: "Answer only from the supplied sources. For each claim, provide the source ID. If the source does not support the claim, write 'not supported by provided sources'.",
    viPrompt: "Chỉ trả lời dựa trên nguồn được cung cấp. Với mỗi claim, ghi source ID. Nếu nguồn không hỗ trợ claim, ghi 'not supported by provided sources'."
  },
  {
    slug: "embeddings-rag-and-knowledge",
    section: "foundation",
    enTitle: "Embeddings, RAG, and Product Knowledge",
    viTitle: "Embeddings, RAG và product knowledge",
    enFocus: "Understand how RAG retrieves knowledge and why retrieval quality matters more than chatbot polish.",
    viFocus: "Hiểu cách RAG truy xuất tri thức và vì sao retrieval quality quan trọng hơn giao diện chatbot đẹp.",
    enExample: "A support chatbot gives wrong refund guidance because old policy pages are indexed with new pages. The BA should specify freshness, authority, source ranking, conflict handling, and answer citation requirements.",
    viExample: "Một support chatbot trả lời sai chính sách hoàn tiền vì index cả policy cũ và mới. BA cần đặc tả freshness, authority, source ranking, conflict handling và yêu cầu citation.",
    enPrompt: "Define the knowledge contract for this RAG feature: source systems, freshness, access control, citation rules, conflict resolution, fallback answer, and quality metrics.",
    viPrompt: "Hãy định nghĩa knowledge contract cho tính năng RAG này: source system, độ mới dữ liệu, access control, citation rule, xử lý conflict, fallback answer và quality metric."
  },
  {
    slug: "discovery-with-ai",
    section: "workflow",
    enTitle: "Discovery With AI",
    viTitle: "Discovery với AI",
    enFocus: "Use AI to prepare discovery questions, compare hypotheses, and expose unknowns before stakeholder sessions.",
    viFocus: "Dùng AI để chuẩn bị câu hỏi discovery, so sánh hypothesis và làm lộ unknown trước khi gặp stakeholder.",
    enExample: "Before a workshop on claim approval automation, the BA asks AI to map actors, decisions, policy constraints, exceptions, and metrics. The output becomes a better interview plan, not the final truth.",
    viExample: "Trước workshop về automation phê duyệt claim, BA nhờ AI map actor, decision, policy constraint, exception và metric. Output trở thành interview plan tốt hơn, không phải sự thật cuối cùng.",
    enPrompt: "Generate a discovery plan for this business problem. Include stakeholders, questions, assumptions to validate, likely data sources, risks, and decisions the workshop must make.",
    viPrompt: "Tạo discovery plan cho business problem này. Bao gồm stakeholder, câu hỏi, assumption cần validate, source dữ liệu, risk và decision workshop phải chốt."
  },
  {
    slug: "stakeholder-interviews-and-synthesis",
    section: "workflow",
    enTitle: "Stakeholder Interviews and Synthesis",
    viTitle: "Phỏng vấn stakeholder và tổng hợp insight",
    enFocus: "Turn interview notes into themes, decisions, contradictions, open questions, and requirement candidates.",
    viFocus: "Biến interview notes thành theme, decision, contradiction, open question và requirement candidate.",
    enExample: "Three stakeholders describe the same approval flow differently. AI can cluster statements, but the BA must identify decision owners and run a conflict-resolution conversation.",
    viExample: "Ba stakeholder mô tả cùng một approval flow theo ba cách khác nhau. AI có thể cluster statement, nhưng BA phải xác định decision owner và tổ chức buổi resolve conflict.",
    enPrompt: "Synthesize these notes into themes, confirmed facts, contradictions, open questions, requirement candidates, and decisions needed. Keep stakeholder attribution.",
    viPrompt: "Tổng hợp notes này thành theme, confirmed fact, contradiction, open question, requirement candidate và decision cần chốt. Giữ attribution theo stakeholder."
  },
  {
    slug: "user-stories-and-acceptance-criteria",
    section: "workflow",
    enTitle: "User Stories and Acceptance Criteria",
    viTitle: "User story và acceptance criteria",
    enFocus: "Use AI to draft stories and acceptance criteria while preserving business intent, edge cases, and testability.",
    viFocus: "Dùng AI để draft user story và acceptance criteria nhưng vẫn giữ business intent, edge case và testability.",
    enExample: "A vague request says, 'Users can update profiles.' The BA uses AI to split actor goals, editable fields, validation, permissions, audit, error handling, and acceptance criteria.",
    viExample: "Một request mơ hồ nói: 'Users can update profiles.' BA dùng AI để tách actor goal, field được sửa, validation, permission, audit, error handling và acceptance criteria.",
    enPrompt: "Convert this requirement into user stories and Given-When-Then acceptance criteria. Include negative cases, permissions, audit needs, and unresolved questions.",
    viPrompt: "Chuyển requirement này thành user story và acceptance criteria dạng Given-When-Then. Bao gồm negative case, permission, audit need và câu hỏi chưa rõ."
  },
  {
    slug: "process-modeling-with-ai",
    section: "workflow",
    enTitle: "Process Modeling With AI",
    viTitle: "Mô hình hóa quy trình với AI",
    enFocus: "Use AI to draft process maps while keeping control over decision points, exceptions, and ownership.",
    viFocus: "Dùng AI để draft process map nhưng BA vẫn kiểm soát decision point, exception và ownership.",
    enExample: "For onboarding, AI drafts a happy path. The BA then forces it to add rejection, missing document, duplicate account, SLA breach, and manual override paths.",
    viExample: "Với quy trình onboarding, AI draft happy path. BA sau đó yêu cầu thêm rejection, missing document, duplicate account, SLA breach và manual override path.",
    enPrompt: "Create a process model with actors, steps, decision points, exceptions, SLAs, inputs, outputs, and unresolved policy questions. Use Mermaid syntax.",
    viPrompt: "Tạo process model gồm actor, step, decision point, exception, SLA, input, output và policy question chưa rõ. Dùng Mermaid syntax."
  },
  {
    slug: "context-engineering-patterns",
    section: "collaboration",
    enTitle: "Context Engineering Patterns",
    viTitle: "Context engineering patterns",
    enFocus: "Move beyond prompting into repeatable context design: role, source, task, constraints, output, and review criteria.",
    viFocus: "Đi xa hơn prompting bằng thiết kế context lặp lại được: role, source, task, constraint, output và review criteria.",
    enExample: "A BA gets poor AI output because the prompt only says 'write requirements.' A better context package includes product goal, users, source excerpts, constraints, format, and quality rubric.",
    viExample: "BA nhận output kém vì prompt chỉ ghi 'write requirements'. Context package tốt hơn gồm product goal, user, source excerpt, constraint, format và quality rubric.",
    enPrompt: "Use this structure: Role, Business Goal, Source Context, Task, Constraints, Output Format, Quality Bar, Questions Before Drafting.",
    viPrompt: "Dùng cấu trúc này: Role, Business Goal, Source Context, Task, Constraint, Output Format, Quality Bar, Questions Before Drafting."
  },
  {
    slug: "review-loops-and-critique",
    section: "collaboration",
    enTitle: "Review Loops and Critique",
    viTitle: "Review loop và critique",
    enFocus: "Use AI as drafter, critic, gap finder, and counterparty instead of trusting a single generated answer.",
    viFocus: "Dùng AI như drafter, critic, gap finder và counterparty thay vì tin một câu trả lời duy nhất.",
    enExample: "After drafting a feature spec, the BA asks AI to attack it from QA, developer, security, support, and user perspectives. The best output is a risk list and revision plan.",
    viExample: "Sau khi draft feature spec, BA yêu cầu AI phản biện dưới góc QA, developer, security, support và user. Output tốt nhất là risk list và revision plan.",
    enPrompt: "Review this artifact from five perspectives: end user, developer, QA, operations, and compliance. Return defects, severity, evidence, and proposed revision.",
    viPrompt: "Review artifact này từ năm góc nhìn: end user, developer, QA, operations và compliance. Trả về defect, severity, evidence và đề xuất chỉnh sửa."
  },
  {
    slug: "structured-outputs-and-reusable-prompts",
    section: "collaboration",
    enTitle: "Structured Outputs and Reusable Prompts",
    viTitle: "Structured output và prompt tái sử dụng",
    enFocus: "Design prompts that return tables, checklists, JSON-like structures, and reusable BA artifact formats.",
    viFocus: "Thiết kế prompt trả về table, checklist, cấu trúc gần JSON và format artifact BA có thể tái sử dụng.",
    enExample: "Instead of asking for a generic summary, the BA requests a table with requirement ID, actor, business rule, acceptance criteria, source, risk, and open question.",
    viExample: "Thay vì yêu cầu summary chung chung, BA yêu cầu bảng gồm requirement ID, actor, business rule, acceptance criteria, source, risk và open question.",
    enPrompt: "Return a table with columns: ID, User Goal, Requirement, Acceptance Criteria, Source Evidence, Risk, Open Question, Owner.",
    viPrompt: "Trả về bảng với các cột: ID, User Goal, Requirement, Acceptance Criteria, Source Evidence, Risk, Open Question, Owner."
  },
  {
    slug: "ambiguity-conflict-and-gap-analysis",
    section: "requirements",
    enTitle: "Ambiguity, Conflict, and Gap Analysis",
    viTitle: "Phân tích mơ hồ, xung đột và khoảng trống",
    enFocus: "Use AI to find vague terms, inconsistent rules, missing actors, missing edge cases, and unstated assumptions.",
    viFocus: "Dùng AI để tìm từ mơ hồ, rule không nhất quán, actor thiếu, edge case thiếu và assumption không được nói rõ.",
    enExample: "A requirement says 'system should notify users quickly.' AI flags 'quickly' as non-testable, asks for SLA, channel, retry, failure, opt-out, and audit behavior.",
    viExample: "Requirement ghi 'system should notify users quickly.' AI flag 'quickly' là không test được, hỏi SLA, channel, retry, failure, opt-out và audit behavior.",
    enPrompt: "Find ambiguity, conflicts, missing actors, missing data, missing edge cases, and non-testable language. Return each issue with severity and clarification question.",
    viPrompt: "Tìm ambiguity, conflict, actor thiếu, data thiếu, edge case thiếu và ngôn ngữ không test được. Trả về mỗi issue với severity và clarification question."
  },
  {
    slug: "non-functional-requirements-and-risk",
    section: "requirements",
    enTitle: "Non-Functional Requirements and Risk",
    viTitle: "Non-functional requirement và rủi ro",
    enFocus: "Use AI to surface NFR gaps across security, privacy, reliability, accessibility, performance, auditability, and supportability.",
    viFocus: "Dùng AI để phát hiện NFR gap về security, privacy, reliability, accessibility, performance, auditability và supportability.",
    enExample: "A payment feature has detailed functional flows but no availability, audit, fraud, privacy, timeout, or support requirements. AI helps generate a risk-driven NFR checklist.",
    viExample: "Một payment feature có functional flow chi tiết nhưng thiếu availability, audit, fraud, privacy, timeout và support requirement. AI hỗ trợ tạo NFR checklist theo risk.",
    enPrompt: "Review this feature for NFR gaps. Cover security, privacy, performance, reliability, accessibility, audit, support, data retention, and operational monitoring.",
    viPrompt: "Review feature này để tìm NFR gap. Bao gồm security, privacy, performance, reliability, accessibility, audit, support, data retention và operational monitoring."
  },
  {
    slug: "traceability-and-testability",
    section: "requirements",
    enTitle: "Traceability and Testability",
    viTitle: "Traceability và testability",
    enFocus: "Connect business goals to requirements, acceptance criteria, test scenarios, and release decisions.",
    viFocus: "Kết nối business goal với requirement, acceptance criteria, test scenario và release decision.",
    enExample: "A release has 80 stories but no clear mapping to business outcomes. The BA uses AI to build a traceability matrix and identify orphan requirements.",
    viExample: "Một release có 80 story nhưng không map rõ với business outcome. BA dùng AI tạo traceability matrix và tìm orphan requirement.",
    enPrompt: "Create a traceability matrix linking business objective, stakeholder need, requirement, acceptance criteria, test scenario, metric, and source evidence.",
    viPrompt: "Tạo traceability matrix nối business objective, stakeholder need, requirement, acceptance criteria, test scenario, metric và source evidence."
  },
  {
    slug: "brd-srs-and-decision-artifacts",
    section: "artifacts",
    enTitle: "BRD, SRS, and Decision Artifacts",
    viTitle: "BRD, SRS và artifact quyết định",
    enFocus: "Use AI to draft and review documents without losing ownership of scope, decisions, and evidence.",
    viFocus: "Dùng AI để draft và review tài liệu mà không mất ownership về scope, decision và evidence.",
    enExample: "A BA asks AI to convert workshop outputs into a BRD. The final artifact must still show decision log, scope boundaries, assumptions, risks, and unresolved questions.",
    viExample: "BA nhờ AI chuyển output workshop thành BRD. Artifact cuối vẫn phải thể hiện decision log, scope boundary, assumption, risk và unresolved question.",
    enPrompt: "Draft a BRD section using these notes. Include business objective, scope, stakeholders, assumptions, decisions, requirements, risks, metrics, and open questions.",
    viPrompt: "Draft một phần BRD từ notes này. Bao gồm business objective, scope, stakeholder, assumption, decision, requirement, risk, metric và open question."
  },
  {
    slug: "diagramming-for-ba",
    section: "artifacts",
    enTitle: "Diagramming for BA",
    viTitle: "Diagramming cho BA",
    enFocus: "Create Mermaid diagrams that clarify flows, decisions, dependencies, and system interactions.",
    viFocus: "Tạo Mermaid diagram để làm rõ flow, decision, dependency và system interaction.",
    enExample: "A BA uses AI to turn text requirements into a sequence diagram, then reviews actor responsibility, system boundary, failure path, and missing integration.",
    viExample: "BA dùng AI chuyển text requirement thành sequence diagram, rồi review responsibility của actor, system boundary, failure path và integration thiếu.",
    enPrompt: "Convert this requirement into a Mermaid flowchart and sequence diagram. Then list assumptions, missing steps, and business decisions that affect the diagram.",
    viPrompt: "Chuyển requirement này thành Mermaid flowchart và sequence diagram. Sau đó liệt kê assumption, step thiếu và business decision ảnh hưởng đến diagram."
  },
  {
    slug: "specifying-ai-enabled-features",
    section: "products",
    enTitle: "Specifying AI-Enabled Features",
    viTitle: "Đặc tả tính năng có AI",
    enFocus: "Write requirements for AI features that are probabilistic, data-dependent, and quality-sensitive.",
    viFocus: "Viết requirement cho AI feature có tính xác suất, phụ thuộc dữ liệu và nhạy với chất lượng.",
    enExample: "A team wants an AI triage assistant. The BA specifies input sources, output classes, confidence threshold, escalation path, user correction, audit, and quality metrics.",
    viExample: "Team muốn AI triage assistant. BA đặc tả input source, output class, confidence threshold, escalation path, user correction, audit và quality metric.",
    enPrompt: "Specify this AI feature with user goal, model task, input data, output contract, confidence threshold, human review, fallback, safety constraints, and evaluation metrics.",
    viPrompt: "Đặc tả AI feature này với user goal, model task, input data, output contract, confidence threshold, human review, fallback, safety constraint và evaluation metric."
  },
  {
    slug: "human-in-the-loop-monitoring-and-fallback",
    section: "products",
    enTitle: "Human Review, Monitoring, and Fallback",
    viTitle: "Human review, monitoring và fallback",
    enFocus: "Design AI workflows where humans review risky outputs and systems fail safely.",
    viFocus: "Thiết kế workflow AI trong đó con người review output rủi ro và hệ thống fallback an toàn.",
    enExample: "An AI recommendation engine suggests loan categories. Low confidence or policy-sensitive cases must route to a human reviewer with reason codes and audit trail.",
    viExample: "Một AI recommendation engine gợi ý loại khoản vay. Case confidence thấp hoặc nhạy về policy phải route sang human reviewer với reason code và audit trail.",
    enPrompt: "Design a human-in-the-loop flow. Include trigger conditions, reviewer role, decision options, SLA, audit record, user message, fallback, and monitoring events.",
    viPrompt: "Thiết kế human-in-the-loop flow. Bao gồm trigger condition, reviewer role, decision option, SLA, audit record, user message, fallback và monitoring event."
  },
  {
    slug: "ai-strategy-governance-and-adoption",
    section: "lead",
    enTitle: "AI Strategy, Governance, and Adoption",
    viTitle: "AI strategy, governance và adoption",
    enFocus: "Guide BA teams through AI adoption with governance, measurement, tool selection, and operating model.",
    viFocus: "Dẫn dắt BA team adoption AI bằng governance, measurement, tool selection và operating model.",
    enExample: "A BA lead wants every analyst to use AI. Instead of buying tools first, they define safe use cases, data policy, prompt patterns, quality checks, training, and adoption metrics.",
    viExample: "BA lead muốn mọi analyst dùng AI. Thay vì mua tool trước, họ định nghĩa use case an toàn, data policy, prompt pattern, quality check, training và adoption metric.",
    enPrompt: "Create a BA team AI adoption plan with use cases, risk tiers, data rules, approved tools, training, quality gates, metrics, governance roles, and rollout phases.",
    viPrompt: "Tạo AI adoption plan cho BA team gồm use case, risk tier, data rule, approved tool, training, quality gate, metric, governance role và rollout phase."
  }
];

const labs = [
  {
    slug: "meeting-transcript-to-requirements",
    enTitle: "Meeting Transcript to Requirements",
    viTitle: "Từ meeting transcript đến requirement",
    enScenario: "You receive a messy stakeholder call transcript about a new customer onboarding flow. Your job is to turn it into requirement candidates with evidence and questions.",
    viScenario: "Bạn nhận một transcript stakeholder call lộn xộn về flow onboarding khách hàng mới. Nhiệm vụ là chuyển nó thành requirement candidate có evidence và câu hỏi.",
    enDeliverables: ["source map", "requirement candidate table", "open question list", "decision log"],
    viDeliverables: ["source map", "bảng requirement candidate", "danh sách open question", "decision log"]
  },
  {
    slug: "ambiguous-requirement-review",
    enTitle: "Ambiguous Requirement Review",
    viTitle: "Review requirement mơ hồ",
    enScenario: "A product owner gives you ten vague requirements. You must find ambiguity, missing business rules, and non-testable wording.",
    viScenario: "Product owner đưa cho bạn mười requirement mơ hồ. Bạn cần tìm ambiguity, business rule thiếu và ngôn ngữ không test được.",
    enDeliverables: ["issue register", "clarification questions", "rewritten requirements", "risk notes"],
    viDeliverables: ["issue register", "clarification question", "requirement viết lại", "risk note"]
  },
  {
    slug: "stories-and-acceptance-criteria",
    enTitle: "Stories and Acceptance Criteria",
    viTitle: "User story và acceptance criteria",
    enScenario: "A feature idea needs to become development-ready user stories and Given-When-Then acceptance criteria.",
    viScenario: "Một ý tưởng feature cần được chuyển thành user story sẵn sàng cho development và acceptance criteria dạng Given-When-Then.",
    enDeliverables: ["story map", "user stories", "acceptance criteria", "negative test cases"],
    viDeliverables: ["story map", "user story", "acceptance criteria", "negative test case"]
  },
  {
    slug: "process-and-sequence-diagrams",
    enTitle: "Process and Sequence Diagrams",
    viTitle: "Process và sequence diagram",
    enScenario: "You need to explain a cross-system approval process to business and engineering stakeholders.",
    viScenario: "Bạn cần giải thích quy trình approval xuyên hệ thống cho business và engineering stakeholder.",
    enDeliverables: ["process flow", "sequence diagram", "exception paths", "ownership notes"],
    viDeliverables: ["process flow", "sequence diagram", "exception path", "ownership note"]
  },
  {
    slug: "rag-assistant-requirements",
    enTitle: "RAG Assistant Requirements",
    viTitle: "Requirement cho RAG assistant",
    enScenario: "Your organization wants a policy assistant that answers from internal documents and cites sources.",
    viScenario: "Tổ chức của bạn muốn policy assistant trả lời dựa trên tài liệu nội bộ và có citation.",
    enDeliverables: ["knowledge contract", "RAG requirement set", "fallback rules", "evaluation plan"],
    viDeliverables: ["knowledge contract", "bộ requirement RAG", "fallback rule", "evaluation plan"]
  },
  {
    slug: "ai-adoption-roadmap",
    enTitle: "AI Adoption Roadmap",
    viTitle: "Roadmap adoption AI",
    enScenario: "You are a BA lead planning safe AI adoption for a 20-person BA practice.",
    viScenario: "Bạn là BA lead đang lập kế hoạch adoption AI an toàn cho một BA practice 20 người.",
    enDeliverables: ["use-case portfolio", "risk tiers", "training plan", "governance metrics"],
    viDeliverables: ["portfolio use case", "risk tier", "training plan", "governance metric"]
  }
];

function ensureDir(relativePath) {
  fs.mkdirSync(path.join(root, relativePath), { recursive: true });
}

function write(relativePath, content) {
  const fullPath = path.join(root, relativePath);
  ensureDir(path.dirname(relativePath));
  fs.writeFileSync(fullPath, content.trimStart(), "utf8");
}

function yamlString(value) {
  return JSON.stringify(value);
}

function diagram(title, locale) {
  const labels =
    locale === "en"
      ? ["Business goal", "Source context", "AI analysis", "BA review", "Validated artifact"]
      : ["Business goal", "Source context", "AI analysis", "BA review", "Artifact đã validate"];

  return `flowchart LR
    A["${labels[0]}"] --> B["${labels[1]}"]
    B --> C["${labels[2]}"]
    C --> D{"${labels[3]}"}
    D -->|"Revise"| B
    D -->|"Approve"| E["${labels[4]}"]
    E --> F["${title.replaceAll('"', "'")}"]`;
}

function lessonPage(lesson, locale) {
  const isEn = locale === "en";
  const [enSection, viSection] = sections[lesson.section];
  const title = isEn ? lesson.enTitle : lesson.viTitle;
  const section = isEn ? enSection : viSection;
  const focus = isEn ? lesson.enFocus : lesson.viFocus;
  const example = isEn ? lesson.enExample : lesson.viExample;
  const prompt = isEn ? lesson.enPrompt : lesson.viPrompt;
  const labels = isEn
    ? {
        audience: "Software BA",
        level: lesson.section === "lead" ? "Expert" : "Core",
        why:
          "AI changes how analysis work is produced, but it does not remove the BA's accountability for clarity, evidence, and decisions.",
        outcomes: [
          `Explain ${title.toLowerCase()} in business language.`,
          "Apply the concept to a realistic BA workflow.",
          "Use AI output as draft evidence, not as unchecked truth.",
          "Identify the review questions a BA must ask before sharing the artifact."
        ],
        concept:
          "The useful BA pattern is controlled collaboration: provide the model with business context, ask for structured output, require evidence, then review the result against goals, rules, risks, and stakeholder decisions.",
        workflow: [
          "Frame the business question before opening the AI tool.",
          "Provide source context and explicit constraints.",
          "Ask for structured output that maps back to the source.",
          "Run a critique pass for ambiguity, gaps, risk, and testability.",
          "Convert the result into an artifact the team can inspect and own."
        ],
        remember: [
          "AI is a reasoning accelerator, not a decision owner.",
          "Ground every important claim in source context or stakeholder confirmation.",
          "A good BA keeps the review loop visible: draft, critique, revise, validate."
        ],
        promptTitle: "Prompt or template"
      }
    : {
        audience: "Software BA",
        level: lesson.section === "lead" ? "Expert" : "Core",
        why:
          "AI thay đổi cách tạo ra artifact phân tích, nhưng không thay thế trách nhiệm của BA về clarity, evidence và decision.",
        outcomes: [
          `Giải thích ${title.toLowerCase()} bằng ngôn ngữ business.`,
          "Áp dụng concept vào workflow BA thực tế.",
          "Dùng output AI như draft có evidence, không xem là sự thật tự động.",
          "Xác định câu hỏi review BA phải hỏi trước khi chia sẻ artifact."
        ],
        concept:
          "Pattern hữu ích cho BA là controlled collaboration: cung cấp business context cho model, yêu cầu structured output, bắt buộc có evidence, rồi review theo goal, rule, risk và decision của stakeholder.",
        workflow: [
          "Đóng khung business question trước khi mở AI tool.",
          "Cung cấp source context và constraint rõ ràng.",
          "Yêu cầu structured output có mapping về source.",
          "Chạy critique pass để tìm ambiguity, gap, risk và testability.",
          "Chuyển kết quả thành artifact mà team có thể inspect và cùng chịu ownership."
        ],
        remember: [
          "AI là bộ tăng tốc reasoning, không phải decision owner.",
          "Mọi claim quan trọng phải grounded vào source context hoặc stakeholder confirmation.",
          "BA giỏi giữ review loop rõ ràng: draft, critique, revise, validate."
        ],
        promptTitle: "Prompt hoặc template"
      };

  return `---
title: ${yamlString(title)}
description: ${yamlString(focus)}
---

# ${title}

<div class="lesson-meta">
  <span>${section}</span>
  <span>${labels.audience}</span>
  <span>${labels.level}</span>
</div>

## Learning outcomes

${labels.outcomes.map((item) => `- ${item}`).join("\n")}

## Why this matters for BA work

${labels.why}

<div class="ba-callout">
${focus}
</div>

## Core concept

${labels.concept}

## Practical BA example

${example}

## Diagram

\`\`\`mermaid
${diagram(title, locale)}
\`\`\`

## BA workflow

${labels.workflow.map((item, index) => `${index + 1}. ${item}`).join("\n")}

## ${labels.promptTitle}

\`\`\`text
${prompt}
\`\`\`

## What a BA should remember

${labels.remember.map((item) => `- ${item}`).join("\n")}
`;
}

function labPage(lab, locale) {
  const isEn = locale === "en";
  const title = isEn ? lab.enTitle : lab.viTitle;
  const scenario = isEn ? lab.enScenario : lab.viScenario;
  const deliverables = isEn ? lab.enDeliverables : lab.viDeliverables;
  const labels = isEn
    ? {
        objective: "Objective",
        instructions: "Instructions",
        deliverables: "Deliverables",
        prompt: "Lab prompt",
        promptText:
          "Act as a senior BA coach. Help me complete this lab step by step. Ask clarifying questions first, then produce the requested artifact with assumptions, evidence, risks, and open questions.",
        review: "Review rubric"
      }
    : {
        objective: "Mục tiêu",
        instructions: "Hướng dẫn",
        deliverables: "Deliverables",
        prompt: "Lab prompt",
        promptText:
          "Hãy đóng vai senior BA coach. Hỗ trợ tôi hoàn thành lab từng bước. Hỏi câu hỏi làm rõ trước, sau đó tạo artifact với assumption, evidence, risk và open question.",
        review: "Review rubric"
      };

  return `---
title: ${yamlString(title)}
description: "Practical AI lab for Business Analysts."
---

# ${title}

## ${labels.objective}

${scenario}

## Scenario

You are working in a software product team. The team expects a BA-ready artifact that can be reviewed by product, engineering, QA, and operations.

## Diagram

\`\`\`mermaid
flowchart TD
    A["Raw input"] --> B["AI-assisted analysis"]
    B --> C["BA review"]
    C --> D{"Ready for team review?"}
    D -->|"No"| B
    D -->|"Yes"| E["Shared artifact"]
\`\`\`

## ${labels.instructions}

1. Clarify the business goal and target users.
2. Ask AI to produce a first draft with explicit assumptions.
3. Review the output for ambiguity, gaps, risks, and evidence.
4. Revise the artifact until it can be shared with the delivery team.
5. Capture open questions instead of hiding uncertainty.

## Deliverables

${deliverables.map((item) => `- ${item}`).join("\n")}

## ${labels.prompt}

\`\`\`text
${labels.promptText}
\`\`\`

## ${labels.review}

- Every recommendation has evidence or is marked as an assumption.
- Open questions are visible and assigned.
- The artifact is testable by QA and understandable by stakeholders.
- Risks are stated in business language, not only technical language.
`;
}

function homePage(locale) {
  const isEn = locale === "en";
  const title = isEn ? "AI for Business Analysts" : "AI for Business Analysts";
  const intro = isEn
    ? "A complete learning path for software Business Analysts who need to understand AI, use AI in analysis work, and specify AI-enabled products responsibly."
    : "Learning path đầy đủ cho software Business Analyst muốn hiểu AI, dùng AI trong công việc phân tích và đặc tả sản phẩm có AI một cách có trách nhiệm.";
  const sectionCards = Object.values(sections)
    .map(([en, vi]) => `<div class="course-card"><strong>${isEn ? en : vi}</strong>${isEn ? "Core concepts, practical workflows, and BA-ready artifacts." : "Concept cốt lõi, workflow thực tế và artifact dùng được cho BA."}</div>`)
    .join("\n");

  return `---
title: ${yamlString(title)}
description: ${yamlString(intro)}
---

# ${title}

${intro}

<div class="course-grid">
${sectionCards}
</div>

## Learning path

\`\`\`mermaid
flowchart LR
    A["AI foundations"] --> B["BA workflow"]
    B --> C["Context engineering"]
    C --> D["Requirements quality"]
    D --> E["Artifacts and diagrams"]
    E --> F["AI-enabled products"]
    F --> G["BA lead governance"]
\`\`\`

## What you will be able to do

- Explain AI concepts in language stakeholders can understand.
- Use AI to improve discovery, interviews, requirements, diagrams, and review.
- Write better prompts by designing context, constraints, evidence, and output format.
- Specify AI-enabled features with data, quality, fallback, monitoring, and governance requirements.
- Lead AI adoption in a BA team with practical controls and metrics.

## Start here

1. Read lessons 01-05 to build AI foundations.
2. Practice lessons 06-17 to improve BA workflows and artifacts.
3. Study lessons 18-20 if you analyze AI products or lead BA adoption.
4. Use the labs and resource library to apply the methods on real work.
`;
}

function resourceIndex(locale) {
  const isEn = locale === "en";
  return `---
title: ${yamlString(isEn ? "Resource Library" : "Thư viện tài nguyên")}
---

# ${isEn ? "Resource Library" : "Thư viện tài nguyên"}

${isEn ? "Reusable material for BA work with AI." : "Tài nguyên tái sử dụng cho công việc BA với AI."}

## Resources

- [${isEn ? "Prompt Library" : "Thư viện prompt"}](./prompt-library)
- [${isEn ? "Checklists" : "Checklist"}](./checklists)
- [Glossary](./glossary)

## Resource map

\`\`\`mermaid
flowchart LR
    A["Prompt patterns"] --> B["Draft artifact"]
    B --> C["Review checklist"]
    C --> D["Requirement quality"]
    D --> E["Team decision"]
\`\`\`
`;
}

function promptLibrary(locale) {
  const isEn = locale === "en";
  return `---
title: ${yamlString(isEn ? "Prompt Library" : "Thư viện prompt")}
---

# ${isEn ? "Prompt Library" : "Thư viện prompt"}

## Discovery prompt

\`\`\`text
${isEn ? "Act as a senior BA. Create a discovery plan with stakeholders, business goals, assumptions, interview questions, risks, and decisions needed." : "Hãy đóng vai senior BA. Tạo discovery plan gồm stakeholder, business goal, assumption, câu hỏi interview, risk và decision cần chốt."}
\`\`\`

## Requirement review prompt

\`\`\`text
${isEn ? "Review these requirements for ambiguity, conflict, missing actors, missing data, NFR gaps, edge cases, and testability. Return severity, evidence, and clarification questions." : "Review các requirement này để tìm ambiguity, conflict, actor thiếu, data thiếu, NFR gap, edge case và testability. Trả về severity, evidence và clarification question."}
\`\`\`

## AI feature prompt

\`\`\`text
${isEn ? "Specify this AI-enabled feature with user goal, data sources, model task, output contract, confidence threshold, human review, fallback, monitoring, and evaluation metrics." : "Đặc tả AI-enabled feature này với user goal, data source, model task, output contract, confidence threshold, human review, fallback, monitoring và evaluation metric."}
\`\`\`
`;
}

function checklists(locale) {
  const isEn = locale === "en";
  const rows = isEn
    ? [
        ["Context", "Goal, users, source material, constraints, output format"],
        ["Quality", "Ambiguity, conflict, missing rules, testability, NFRs"],
        ["AI product", "Data, confidence, fallback, human review, monitoring"],
        ["Governance", "PII, policy, approved tools, audit trail, risk tier"]
      ]
    : [
        ["Context", "Goal, user, source material, constraint, output format"],
        ["Quality", "Ambiguity, conflict, rule thiếu, testability, NFR"],
        ["AI product", "Data, confidence, fallback, human review, monitoring"],
        ["Governance", "PII, policy, approved tool, audit trail, risk tier"]
      ];

  return `---
title: ${yamlString(isEn ? "Checklists" : "Checklist")}
---

# ${isEn ? "Checklists" : "Checklist"}

| Area | BA checks |
| --- | --- |
${rows.map(([area, checks]) => `| ${area} | ${checks} |`).join("\n")}

## Review flow

\`\`\`mermaid
flowchart LR
    A["Draft"] --> B["Quality checklist"]
    B --> C["Risk checklist"]
    C --> D["Stakeholder validation"]
    D --> E["Delivery-ready artifact"]
\`\`\`
`;
}

function glossary(locale) {
  const isEn = locale === "en";
  return `---
title: Glossary
---

# Glossary

| Term | ${isEn ? "Meaning for BA work" : "Ý nghĩa trong công việc BA"} |
| --- | --- |
| LLM | ${isEn ? "A language model that predicts and transforms text based on context." : "Language model dự đoán và biến đổi văn bản dựa trên context."} |
| Hallucination | ${isEn ? "A confident answer not supported by the provided source or reality." : "Câu trả lời tự tin nhưng không được source hoặc thực tế hỗ trợ."} |
| RAG | ${isEn ? "Retrieval-Augmented Generation: retrieving source material before generating an answer." : "Retrieval-Augmented Generation: truy xuất tài liệu nguồn trước khi sinh câu trả lời."} |
| Acceptance criteria | ${isEn ? "Conditions that make a requirement testable and releasable." : "Điều kiện giúp requirement test được và đủ để release."} |
| Traceability | ${isEn ? "Mapping business goals to requirements, tests, evidence, and decisions." : "Mapping business goal với requirement, test, evidence và decision."} |
| Human-in-the-loop | ${isEn ? "A workflow where a human reviews, corrects, or approves AI output." : "Workflow trong đó con người review, sửa hoặc approve output của AI."} |
| Confidence threshold | ${isEn ? "A quality cutoff that decides whether AI output can proceed or must fallback." : "Ngưỡng chất lượng quyết định output AI được đi tiếp hay phải fallback."} |
| Evaluation | ${isEn ? "A systematic way to measure AI output quality against expected behavior." : "Cách đo có hệ thống chất lượng output AI so với behavior mong muốn."} |
`;
}

function readme() {
  const syllabusRows = lessons
    .map((lesson, index) => `| ${String(index + 1).padStart(2, "0")} | ${lesson.enTitle} | ${lesson.viTitle} |`)
    .join("\n");

  return `# AI for Business Analysts

[![English](https://img.shields.io/badge/lang-English-blue)](https://anhtnt90dev.github.io/ai-for-ba/en/)
[![Tiếng Việt](https://img.shields.io/badge/lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](https://anhtnt90dev.github.io/ai-for-ba/vi/)
[![Lessons](https://img.shields.io/badge/lessons-20-0f766e)](#syllabus)
[![Labs](https://img.shields.io/badge/labs-6-b45309)](#labs)
[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-2562eb)](https://anhtnt90dev.github.io/ai-for-ba/)

A bilingual course for software Business Analysts who need to understand AI, apply AI in daily BA work, and specify AI-enabled products responsibly.

> Documentation site: <https://anhtnt90dev.github.io/ai-for-ba/>

## What This Course Teaches

This course has two connected tracks:

- **BA uses AI better:** discovery, stakeholder interviews, requirements, user stories, acceptance criteria, diagrams, document review, and structured prompts.
- **BA specifies AI products better:** RAG, AI assistants, data requirements, confidence thresholds, human-in-the-loop, fallback, monitoring, evaluation, governance, and adoption.

## Learning Path

\`\`\`text
AI foundations
  -> AI-augmented BA workflow
  -> Context engineering
  -> Requirements quality
  -> Analysis artifacts and diagrams
  -> AI-enabled product requirements
  -> BA lead governance and adoption
\`\`\`

## Syllabus

| # | English | Tiếng Việt |
| --- | --- | --- |
${syllabusRows}

## Labs

1. Meeting transcript to requirements
2. Ambiguous requirement review
3. User stories and acceptance criteria
4. Process and sequence diagrams
5. RAG assistant requirements
6. BA team AI adoption roadmap

## Resource Library

- Prompt library for BA work
- Requirement quality checklist
- AI-product requirement checklist
- Governance checklist
- Glossary for AI and BA terminology

## Local Preview

\`\`\`sh
npm install
npm run docs:dev
npm run docs:build
\`\`\`

## Deployment

GitHub Actions deploys the VitePress build to GitHub Pages after every push to \`main\`.

## License

MIT
`;
}

write("docs/en/index.md", homePage("en"));
write("docs/vi/index.md", homePage("vi"));

for (const lesson of lessons) {
  write(`docs/en/lessons/${lesson.slug}/index.md`, lessonPage(lesson, "en"));
  write(`docs/vi/lessons/${lesson.slug}/index.md`, lessonPage(lesson, "vi"));
}

for (const lab of labs) {
  write(`docs/en/labs/${lab.slug}/index.md`, labPage(lab, "en"));
  write(`docs/vi/labs/${lab.slug}/index.md`, labPage(lab, "vi"));
}

write("docs/en/resources/index.md", resourceIndex("en"));
write("docs/en/resources/prompt-library.md", promptLibrary("en"));
write("docs/en/resources/checklists.md", checklists("en"));
write("docs/en/resources/glossary.md", glossary("en"));
write("docs/vi/resources/index.md", resourceIndex("vi"));
write("docs/vi/resources/prompt-library.md", promptLibrary("vi"));
write("docs/vi/resources/checklists.md", checklists("vi"));
write("docs/vi/resources/glossary.md", glossary("vi"));
write("README.md", readme());

console.log("Seeded AI for BA course content.");
