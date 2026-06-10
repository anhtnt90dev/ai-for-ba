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

const sectionSummaries = {
  foundation: {
    en: "Understand AI patterns, LLM limits, grounding, RAG, source authority, and when a non-AI solution is better.",
    vi: "Hiểu AI pattern, giới hạn LLM, grounding, RAG, source authority và khi nào non-AI solution phù hợp hơn."
  },
  workflow: {
    en: "Use AI to synthesize discovery, interviews, stories, process models, and stakeholder decisions without losing evidence.",
    vi: "Dùng AI để synthesize discovery, interview, story, process model và stakeholder decision mà không mất evidence."
  },
  collaboration: {
    en: "Build reusable context packages, prompt patterns, critique loops, and structured outputs for BA team collaboration.",
    vi: "Xây context package, prompt pattern, critique loop và structured output tái sử dụng cho BA team collaboration."
  },
  requirements: {
    en: "Improve ambiguity analysis, NFRs, risk, traceability, testability, and backlog readiness before delivery commitment.",
    vi: "Cải thiện ambiguity analysis, NFR, risk, traceability, testability và backlog readiness trước delivery commitment."
  },
  artifacts: {
    en: "Create BRD, SRS, decision artifacts, diagrams, matrices, and handoff packs that delivery teams can inspect.",
    vi: "Tạo BRD, SRS, decision artifact, diagram, matrix và handoff pack mà delivery team có thể inspect."
  },
  products: {
    en: "Specify AI-enabled features with task boundary, output contract, evaluation, human review, fallback, and monitoring.",
    vi: "Đặc tả AI-enabled feature với task boundary, output contract, evaluation, human review, fallback và monitoring."
  },
  lead: {
    en: "Scale AI adoption with governance, risk tiers, tool policy, quality gates, coaching, metrics, and operating model.",
    vi: "Scale AI adoption bằng governance, risk tier, tool policy, quality gate, coaching, metric và operating model."
  }
};

const lessonIndex = [
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

const lessons = [
  {
    slug: "ai-landscape-for-ba",
    section: "foundation",
    en: {
      title: "AI Landscape for Business Analysts",
      focus: "A BA does not need to be a machine learning engineer, but must know which AI pattern fits which business problem.",
      outcomes: ["Distinguish predictive AI, GenAI, RAG, agents, copilots, and automation.", "Select the right AI pattern for a business scenario before solutioning.", "Spot ideas that are better solved by workflow, rules, or search instead of GenAI."],
      concept: "Treat AI as a portfolio of capability patterns, not one magic chatbot. The BA's first job is to classify the business problem: prediction, generation, retrieval, decision support, automation, or human workflow acceleration. This prevents expensive AI-shaped solutions for problems that need cleaner data, clearer process, or better search.",
      example: "A sales operations team asks for an AI assistant to reduce quote approval time. A weak analysis jumps straight to chatbot requirements. A stronger BA maps the pain: approvals are slow because pricing exceptions lack policy clarity, approval rules live in email, and managers need risk signals. The solution may combine rules automation, policy retrieval, and a GenAI explanation layer.",
      artifactTitle: "AI Pattern Fit Matrix",
      artifactHeaders: ["Business problem", "Best-fit AI pattern", "BA questions", "Anti-pattern warning"],
      artifactRows: [["Predict churn or risk", "Predictive AI", "What historical labels and decisions exist?", "Do not ask GenAI to guess risk without data."], ["Answer from internal policy", "RAG", "Which sources are authoritative and current?", "Do not let the model answer without citations."], ["Draft email, story, summary", "GenAI", "What context and quality rubric define good output?", "Do not treat the first draft as approved content."], ["Route a request", "Rules or workflow automation", "Are rules deterministic and stable?", "Do not add LLM uncertainty to simple routing."]],
      prompt: "Act as a senior BA. Classify this idea using the AI Pattern Fit Matrix. For each option, explain business outcome, data dependency, decision risk, user touchpoint, and why GenAI, RAG, predictive AI, rules automation, or human workflow is the best fit. Mark unsupported assumptions explicitly.",
      mistakes: ["Calling every AI idea a chatbot.", "Skipping the distinction between content generation and business decisioning.", "Ignoring whether the problem has reliable data and a measurable outcome.", "Letting vendors define the solution category before the BA frames the problem."],
      tomorrow: ["Take one AI idea in your backlog and classify it with the matrix.", "Write down the user decision the feature is supposed to improve.", "Identify one non-AI alternative that could solve the same pain.", "Ask stakeholders what metric would prove the AI feature worked."],
      remember: ["AI solution shape follows problem shape.", "GenAI is useful for language tasks, but many BA problems need rules, data quality, or search.", "The BA creates clarity before the team chooses a model or tool."]
    },
    vi: {
      title: "Bức tranh AI cho Business Analyst",
      focus: "BA không cần trở thành kỹ sư machine learning, nhưng phải biết pattern AI nào phù hợp với loại business problem nào.",
      outcomes: ["Phân biệt predictive AI, GenAI, RAG, agent, copilot và automation.", "Chọn đúng pattern AI trước khi đi vào solutioning.", "Nhận ra ý tưởng nào nên giải bằng workflow, rule hoặc search thay vì GenAI."],
      concept: "Hãy xem AI là một portfolio capability pattern, không phải một chatbot vạn năng. Việc đầu tiên của BA là phân loại business problem: prediction, generation, retrieval, decision support, automation hay tăng tốc human workflow. Cách này giúp tránh xây solution 'trông giống AI' nhưng thật ra vấn đề nằm ở data, process hoặc search.",
      example: "Team sales operations muốn một AI assistant để giảm thời gian duyệt báo giá. Phân tích yếu sẽ nhảy ngay vào requirement chatbot. BA tốt hơn sẽ map pain point: approval chậm vì pricing exception thiếu policy rõ, approval rule nằm trong email, manager cần risk signal. Solution có thể là rules automation, policy retrieval và một lớp GenAI giải thích.",
      artifactTitle: "AI Pattern Fit Matrix",
      artifactHeaders: ["Business problem", "Pattern AI phù hợp", "Câu hỏi BA", "Cảnh báo anti-pattern"],
      artifactRows: [["Dự đoán churn hoặc risk", "Predictive AI", "Có historical label và decision nào?", "Không dùng GenAI để đoán risk nếu thiếu data."], ["Trả lời từ policy nội bộ", "RAG", "Source nào authoritative và mới nhất?", "Không cho model trả lời nếu thiếu citation."], ["Draft email, story, summary", "GenAI", "Context và quality rubric nào định nghĩa output tốt?", "Không xem first draft là nội dung đã approved."], ["Route một request", "Rules hoặc workflow automation", "Rule có deterministic và ổn định không?", "Không đưa LLM uncertainty vào routing đơn giản."]],
      prompt: "Hãy đóng vai senior BA. Phân loại ý tưởng này bằng AI Pattern Fit Matrix. Với từng option, giải thích business outcome, data dependency, decision risk, user touchpoint và vì sao GenAI, RAG, predictive AI, rules automation hoặc human workflow là phù hợp nhất. Đánh dấu rõ unsupported assumption.",
      mistakes: ["Gọi mọi ý tưởng AI là chatbot.", "Không phân biệt content generation với business decisioning.", "Bỏ qua việc problem có reliable data và metric đo được hay không.", "Để vendor định nghĩa solution category trước khi BA frame problem."],
      tomorrow: ["Chọn một AI idea trong backlog và phân loại bằng matrix.", "Ghi rõ user decision mà feature cần cải thiện.", "Tìm một non-AI alternative có thể giải cùng pain point.", "Hỏi stakeholder metric nào chứng minh AI feature có hiệu quả."],
      remember: ["Solution shape của AI phải đi theo problem shape.", "GenAI hữu ích cho language task, nhưng nhiều bài toán BA cần rule, data quality hoặc search.", "BA tạo clarity trước khi team chọn model hoặc tool."]
    }
  },
  {
    slug: "llm-mental-model",
    section: "foundation",
    en: {
      title: "LLM Mental Model",
      focus: "LLMs are powerful text reasoning engines, but they do not know your hidden business rules unless you provide or retrieve them.",
      outcomes: ["Explain LLM behavior without overselling certainty.", "Design prompts that expose assumptions and missing context.", "Review AI output as probabilistic draft work."],
      concept: "An LLM transforms context into likely next text. It can summarize, classify, compare, draft, and infer patterns, but its answer quality depends on context, instructions, examples, and review. For BA work, the useful model is not 'AI knows the answer'; it is 'AI proposes a structured draft from supplied context, and the BA validates it.'",
      example: "A BA asks an LLM to write acceptance criteria for 'premium users can export reports.' The model may invent export formats, limits, and permissions. If the BA provides subscription tiers, report types, audit rules, and examples, the model can produce a useful draft while showing assumptions that need validation.",
      artifactTitle: "LLM Output Review Card",
      artifactHeaders: ["Review lens", "Question to ask", "Pass signal", "Risk signal"],
      artifactRows: [["Context", "Did the model receive the actual business rule?", "Output cites provided context.", "Output invents policy or thresholds."], ["Assumption", "Which statements are inferred?", "Assumptions are labeled.", "Assumptions are hidden as facts."], ["Specificity", "Can QA test the output?", "Rules, actors, and outcomes are explicit.", "Uses vague words like fast, easy, smart."], ["Decision", "Who must approve this?", "Decision owner is named.", "AI answer is treated as approval."]],
      prompt: "Before drafting, list missing context and assumptions. Then produce the artifact. After the draft, add a review table with source-backed facts, inferred assumptions, unsupported claims, and questions for stakeholder validation.",
      mistakes: ["Asking AI for final truth instead of a reviewable draft.", "Not separating model confidence from business approval.", "Providing a vague task without source context or examples.", "Failing to ask the model to reveal assumptions."],
      tomorrow: ["Take one AI-generated answer and mark facts vs assumptions.", "Ask AI to rewrite the same artifact using only supplied context.", "Add a 'questions for validation' section to your prompt.", "Review one output with QA or developer eyes before sharing it."],
      remember: ["LLMs generate plausible text, not guaranteed truth.", "Good BA prompts make missing context visible.", "The BA owns validation, not the model."]
    },
    vi: {
      title: "Mô hình tư duy về LLM",
      focus: "LLM là engine xử lý và reasoning trên text rất mạnh, nhưng nó không tự biết business rule ẩn nếu bạn không cung cấp hoặc retrieve đúng nguồn.",
      outcomes: ["Giải thích hành vi LLM mà không thổi phồng độ chắc chắn.", "Thiết kế prompt làm lộ assumption và missing context.", "Review output AI như draft có tính xác suất."],
      concept: "LLM biến context thành chuỗi text có khả năng phù hợp tiếp theo. Nó có thể summarize, classify, compare, draft và suy luận pattern, nhưng chất lượng phụ thuộc vào context, instruction, example và review. Với BA, mental model đúng không phải 'AI biết câu trả lời', mà là 'AI đề xuất structured draft từ context được cung cấp, BA validate lại.'",
      example: "BA yêu cầu LLM viết acceptance criteria cho 'premium users can export reports.' Model có thể tự bịa format export, limit và permission. Nếu BA cung cấp subscription tier, report type, audit rule và example, model sẽ draft tốt hơn và chỉ ra assumption cần validate.",
      artifactTitle: "LLM Output Review Card",
      artifactHeaders: ["Lens review", "Câu hỏi cần hỏi", "Pass signal", "Risk signal"],
      artifactRows: [["Context", "Model đã nhận business rule thật chưa?", "Output cite context được cung cấp.", "Output tự bịa policy hoặc threshold."], ["Assumption", "Statement nào là inferred?", "Assumption được label rõ.", "Assumption bị viết như fact."], ["Specificity", "QA có test được không?", "Rule, actor và outcome rõ.", "Dùng từ mơ hồ như nhanh, dễ, thông minh."], ["Decision", "Ai phải approve?", "Decision owner được nêu rõ.", "Câu trả lời AI bị xem như approval."]],
      prompt: "Trước khi draft, hãy liệt kê missing context và assumption. Sau đó tạo artifact. Cuối draft, thêm bảng review gồm fact có source, assumption suy luận, unsupported claim và câu hỏi cần stakeholder validate.",
      mistakes: ["Yêu cầu AI đưa final truth thay vì reviewable draft.", "Không tách model confidence khỏi business approval.", "Giao task mơ hồ mà thiếu source context hoặc example.", "Không yêu cầu model reveal assumption."],
      tomorrow: ["Chọn một output AI và đánh dấu fact vs assumption.", "Yêu cầu AI rewrite artifact chỉ dựa trên context được cung cấp.", "Thêm section 'questions for validation' vào prompt.", "Review một output bằng góc nhìn QA hoặc developer trước khi share."],
      remember: ["LLM sinh text hợp lý, không đảm bảo sự thật.", "Prompt tốt làm missing context hiện ra.", "BA sở hữu validation, không phải model."]
    }
  },
  {
    slug: "tokens-context-and-memory",
    section: "foundation",
    en: {
      title: "Tokens, Context, and Memory",
      focus: "Context is the working surface of AI analysis; poor context design creates confident but incomplete BA artifacts.",
      outcomes: ["Explain token and context limits in BA terms.", "Prepare long requirements or transcripts for staged AI review.", "Use source maps to reduce missed requirements."],
      concept: "A model only works with the context it can see. Long documents, scattered notes, and multi-meeting histories must be structured into chunks, source IDs, summaries, and review passes. BA context engineering is similar to preparing a workshop pack: decide what evidence matters, label it, and review it in a controlled order.",
      example: "A 70-page SRS is dropped into an AI tool with 'find all gaps.' The model returns a polished list but misses integration requirements in later pages. A better BA creates a source map, reviews per module, then asks AI to reconcile cross-module conflicts.",
      artifactTitle: "Context Pack Checklist",
      artifactHeaders: ["Pack item", "Why it matters", "BA action", "Failure if missing"],
      artifactRows: [["Source map", "Prevents invisible gaps", "List sections, owners, and IDs.", "AI reviews only the loudest sections."], ["Chunk plan", "Keeps analysis focused", "Review module by module.", "Long context becomes shallow summary."], ["Decision log", "Preserves stakeholder commitments", "Include dated decisions and owners.", "AI reopens already-settled scope."], ["Open questions", "Separates unknowns from facts", "Track unresolved items explicitly.", "Model fills blanks with guesses."]],
      prompt: "Create a context pack from these sources. Return source IDs, section summaries, decision log, known constraints, unresolved questions, and recommended review order. Do not analyze requirements until the context pack is complete.",
      mistakes: ["Uploading everything and asking one broad question.", "Mixing old and new policy without freshness labels.", "Letting the model summarize away edge cases.", "Forgetting to include decisions already made by stakeholders."],
      tomorrow: ["Create source IDs for one document before using AI.", "Ask AI to summarize per section, not whole document at once.", "Mark old, current, and draft sources separately.", "Run a second pass for cross-section conflicts."],
      remember: ["AI quality is bounded by visible context.", "Source maps are a BA control, not an admin detail.", "Staged review beats one giant prompt."]
    },
    vi: {
      title: "Token, context và trí nhớ",
      focus: "Context là bề mặt làm việc của AI analysis; context design kém tạo ra artifact nhìn tự tin nhưng thiếu.",
      outcomes: ["Giải thích token và context limit bằng ngôn ngữ BA.", "Chuẩn bị requirement dài hoặc transcript dài cho staged AI review.", "Dùng source map để giảm nguy cơ miss requirement."],
      concept: "Model chỉ làm việc với context nó nhìn thấy. Tài liệu dài, notes rời rạc và lịch sử nhiều meeting cần được cấu trúc thành chunk, source ID, summary và review pass. Context engineering của BA giống chuẩn bị workshop pack: chọn evidence quan trọng, label rõ và review theo thứ tự có kiểm soát.",
      example: "Một SRS 70 trang được đưa vào AI với yêu cầu 'find all gaps.' Model trả về list rất trôi chảy nhưng bỏ sót integration requirement ở các trang sau. BA tốt hơn tạo source map, review theo module, rồi yêu cầu AI reconcile conflict giữa module.",
      artifactTitle: "Context Pack Checklist",
      artifactHeaders: ["Pack item", "Vì sao quan trọng", "Hành động BA", "Rủi ro nếu thiếu"],
      artifactRows: [["Source map", "Tránh gap vô hình", "Liệt kê section, owner và ID.", "AI chỉ review phần nổi bật nhất."], ["Chunk plan", "Giữ phân tích focused", "Review từng module.", "Context dài biến thành summary nông."], ["Decision log", "Giữ commitment của stakeholder", "Đưa vào decision có ngày và owner.", "AI mở lại scope đã chốt."], ["Open questions", "Tách unknown khỏi fact", "Track unresolved item rõ ràng.", "Model tự điền chỗ trống bằng guess."]],
      prompt: "Tạo context pack từ các source này. Trả về source ID, summary từng section, decision log, known constraint, unresolved question và thứ tự review đề xuất. Không phân tích requirement cho đến khi context pack hoàn tất.",
      mistakes: ["Upload mọi thứ rồi hỏi một câu quá rộng.", "Trộn policy cũ và mới mà không label freshness.", "Để model summarize mất edge case.", "Quên đưa vào decision stakeholder đã chốt."],
      tomorrow: ["Tạo source ID cho một tài liệu trước khi dùng AI.", "Yêu cầu AI summarize từng section, không summarize cả document một lần.", "Label source old, current và draft riêng.", "Chạy pass thứ hai để tìm conflict giữa section."],
      remember: ["Chất lượng AI bị giới hạn bởi context nó thấy.", "Source map là control của BA, không phải việc hành chính.", "Staged review tốt hơn một prompt khổng lồ."]
    }
  },
  {
    slug: "hallucination-and-source-grounding",
    section: "foundation",
    en: {
      title: "Hallucination and Source Grounding",
      focus: "A BA must design evidence discipline into AI work so plausible text does not become false requirements.",
      outcomes: ["Recognize common hallucination patterns.", "Require evidence, citations, and unsupported-claim labels.", "Design review gates before AI output enters delivery artifacts."],
      concept: "Hallucination is not only a model problem; it is a process problem. If a team accepts AI output without evidence rules, unsupported claims become scope, estimates, and test cases. Grounding means every important statement is tied to a source, stakeholder confirmation, or clearly labeled assumption.",
      example: "During vendor evaluation, AI says Tool A supports real-time audit export. The vendor page never says that. A BA using grounding rules marks the claim unsupported, asks the vendor directly, and prevents a false requirement from entering the selection scorecard.",
      artifactTitle: "Evidence Ladder",
      artifactHeaders: ["Evidence level", "Use in BA artifact?", "Required label", "Example"],
      artifactRows: [["Direct source", "Yes", "Source-backed fact", "Policy page states 24-hour SLA."], ["Stakeholder confirmation", "Yes", "Confirmed decision", "Ops manager approves manual override."], ["Reasoned inference", "Maybe", "Assumption to validate", "High-risk cases likely need audit."], ["No support", "No", "Unsupported claim", "Vendor capability not documented."]],
      prompt: "Review this answer against the provided sources. Return a table with claim, evidence level, source ID, confidence, unsupported parts, and validation question. Do not rewrite unsupported claims as facts.",
      mistakes: ["Accepting confident wording as evidence.", "Letting AI cite a source that does not actually support the claim.", "Skipping stakeholder confirmation for inferred rules.", "Not labeling assumptions in BRD or user stories."],
      tomorrow: ["Add an evidence column to one requirement table.", "Ask AI to mark unsupported claims in an existing draft.", "Create a list of authoritative sources for one feature.", "Use the phrase 'not supported by provided sources' in review prompts."],
      remember: ["Grounding protects the team from false clarity.", "Unsupported claims should become questions, not requirements.", "Citation quality matters more than answer fluency."]
    },
    vi: {
      title: "Hallucination và source grounding",
      focus: "BA phải đưa evidence discipline vào cách dùng AI để text nghe hợp lý không biến thành requirement sai.",
      outcomes: ["Nhận diện các pattern hallucination thường gặp.", "Yêu cầu evidence, citation và label unsupported claim.", "Thiết kế review gate trước khi output AI đi vào delivery artifact."],
      concept: "Hallucination không chỉ là vấn đề của model; nó là vấn đề process. Nếu team nhận output AI mà không có evidence rule, unsupported claim có thể trở thành scope, estimate và test case. Grounding nghĩa là statement quan trọng phải gắn với source, stakeholder confirmation hoặc assumption được label rõ.",
      example: "Khi evaluate vendor, AI nói Tool A hỗ trợ real-time audit export. Trang vendor không hề nói vậy. BA dùng grounding rule sẽ mark claim là unsupported, hỏi vendor trực tiếp và tránh đưa false requirement vào selection scorecard.",
      artifactTitle: "Evidence Ladder",
      artifactHeaders: ["Mức evidence", "Dùng trong artifact?", "Label cần dùng", "Ví dụ"],
      artifactRows: [["Direct source", "Có", "Source-backed fact", "Policy page ghi SLA 24 giờ."], ["Stakeholder confirmation", "Có", "Confirmed decision", "Ops manager approve manual override."], ["Reasoned inference", "Có điều kiện", "Assumption to validate", "Case high-risk có thể cần audit."], ["No support", "Không", "Unsupported claim", "Vendor capability không có tài liệu."]],
      prompt: "Review câu trả lời này theo source được cung cấp. Trả về bảng gồm claim, evidence level, source ID, confidence, phần unsupported và validation question. Không rewrite unsupported claim thành fact.",
      mistakes: ["Xem wording tự tin là evidence.", "Để AI cite source nhưng source không thật sự support claim.", "Bỏ qua stakeholder confirmation cho rule suy luận.", "Không label assumption trong BRD hoặc user story."],
      tomorrow: ["Thêm cột evidence vào một requirement table.", "Yêu cầu AI mark unsupported claim trong một draft hiện có.", "Tạo danh sách authoritative source cho một feature.", "Dùng câu 'not supported by provided sources' trong review prompt."],
      remember: ["Grounding bảo vệ team khỏi false clarity.", "Unsupported claim nên trở thành câu hỏi, không phải requirement.", "Chất lượng citation quan trọng hơn độ trôi chảy của answer."]
    }
  },
  {
    slug: "embeddings-rag-and-knowledge",
    section: "foundation",
    en: {
      title: "Embeddings, RAG, and Product Knowledge",
      focus: "For BA work, RAG is less about chatbot UI and more about governing which knowledge the system can trust.",
      outcomes: ["Explain the RAG pipeline and where quality can fail.", "Write BA requirements for source authority, freshness, access, and citation.", "Define retrieval quality metrics for an AI assistant."],
      concept: "RAG retrieves source material before the model generates an answer. It improves grounding only when the right sources are indexed, chunked, ranked, permissioned, and cited. A BA specifying RAG must define the knowledge contract: which documents count, how conflicts are resolved, and what the assistant does when evidence is weak.",
      example: "An HR policy assistant answers maternity leave questions from both a 2024 policy and an obsolete 2021 handbook. The BA adds requirements for source priority, effective date, citation display, conflict warning, and fallback to HR when the system finds conflicting policies.",
      artifactTitle: "RAG Knowledge Contract",
      artifactHeaders: ["Requirement area", "BA specification", "Quality metric", "Failure mode"],
      artifactRows: [["Source authority", "Only approved policy repository and HR knowledge base.", "100% answers cite approved source.", "Assistant cites stale PDF."], ["Freshness", "Policy effective date must be visible and rank newer source higher.", "Freshness errors below 1%.", "Old policy overrides current rule."], ["Access control", "Retrieve only documents user is allowed to see.", "No cross-role leakage in tests.", "Manager-only policy exposed to employee."], ["Fallback", "If no confident citation, answer with escalation path.", "Fallback used on unsupported questions.", "Assistant invents policy."]],
      prompt: "Draft RAG requirements for this assistant. Include source inventory, chunking assumptions, access control, citation behavior, conflict handling, fallback, retrieval metrics, and test scenarios. Separate must-have controls from nice-to-have UX.",
      mistakes: ["Treating RAG as magic accuracy.", "Ignoring document ownership and freshness.", "Forgetting access control in retrieval.", "Measuring only answer tone instead of retrieval correctness."],
      tomorrow: ["List authoritative sources for one AI assistant idea.", "Define what the assistant must do when two sources conflict.", "Write one test question that should trigger fallback.", "Add citation requirements to the feature spec."],
      remember: ["RAG quality starts with knowledge governance.", "A cited wrong source is still wrong.", "BA requirements must cover retrieval, not only generated answers."]
    },
    vi: {
      title: "Embeddings, RAG và product knowledge",
      focus: "Với BA, RAG không chỉ là UI chatbot; trọng tâm là governance tri thức nào hệ thống được phép tin.",
      outcomes: ["Giải thích RAG pipeline và các điểm quality có thể fail.", "Viết requirement BA cho source authority, freshness, access và citation.", "Định nghĩa retrieval quality metric cho AI assistant."],
      concept: "RAG retrieve tài liệu nguồn trước khi model generate answer. Nó chỉ tăng grounding khi source đúng được index, chunk, rank, permission và cite đúng. BA đặc tả RAG phải định nghĩa knowledge contract: tài liệu nào được tính, conflict xử lý ra sao và assistant làm gì khi evidence yếu.",
      example: "Một HR policy assistant trả lời câu hỏi maternity leave từ cả policy 2024 và handbook 2021 đã obsolete. BA bổ sung requirement về source priority, effective date, citation display, conflict warning và fallback sang HR khi hệ thống thấy policy conflict.",
      artifactTitle: "RAG Knowledge Contract",
      artifactHeaders: ["Requirement area", "Đặc tả BA", "Quality metric", "Failure mode"],
      artifactRows: [["Source authority", "Chỉ dùng approved policy repository và HR knowledge base.", "100% answer cite approved source.", "Assistant cite stale PDF."], ["Freshness", "Effective date phải visible và source mới được rank cao hơn.", "Freshness error dưới 1%.", "Policy cũ override rule mới."], ["Access control", "Chỉ retrieve document user được phép xem.", "Không leakage cross-role trong test.", "Policy manager-only lộ cho employee."], ["Fallback", "Nếu citation không đủ confident, trả lời kèm escalation path.", "Fallback được dùng cho unsupported question.", "Assistant tự bịa policy."]],
      prompt: "Draft requirement RAG cho assistant này. Bao gồm source inventory, chunking assumption, access control, citation behavior, conflict handling, fallback, retrieval metric và test scenario. Tách must-have control khỏi nice-to-have UX.",
      mistakes: ["Xem RAG là magic accuracy.", "Bỏ qua document ownership và freshness.", "Quên access control trong retrieval.", "Chỉ đo answer tone thay vì retrieval correctness."],
      tomorrow: ["Liệt kê authoritative source cho một AI assistant idea.", "Định nghĩa hệ thống làm gì khi hai source conflict.", "Viết một test question bắt buộc trigger fallback.", "Thêm citation requirement vào feature spec."],
      remember: ["RAG quality bắt đầu từ knowledge governance.", "Cite source sai vẫn là sai.", "BA requirement phải cover retrieval, không chỉ generated answer."]
    }
  },
  {
    slug: "discovery-with-ai",
    section: "workflow",
    en: {
      title: "Discovery With AI",
      focus: "AI can widen discovery, but the BA must still decide what needs validation with real stakeholders.",
      outcomes: ["Use AI to generate hypotheses and interview plans.", "Separate assumptions, evidence, and decisions before workshops.", "Turn AI output into a better discovery agenda."],
      concept: "Discovery is about reducing uncertainty, not producing documents. AI helps by proposing actors, constraints, risks, and questions, but its output should become a hypothesis backlog. The BA then validates or rejects those hypotheses with users, data, policy, and stakeholder decisions.",
      example: "For claim approval automation, AI suggests fraud checks, SLA tiers, escalation paths, and missing document scenarios. The BA converts these into workshop questions and prioritizes the riskiest assumptions: who can override, what policy applies, and what counts as a valid exception.",
      artifactTitle: "Discovery Hypothesis Backlog",
      artifactHeaders: ["Hypothesis", "Evidence needed", "Validation method", "Decision owner"],
      artifactRows: [["High-value claims need manager review.", "Policy threshold and historical claim data.", "Policy review plus data sample.", "Claims operations lead"], ["Missing documents trigger customer notification.", "Current support script and customer journey.", "Interview support agents.", "Customer service manager"], ["Fraud risk changes SLA.", "Fraud rules and compliance constraints.", "Compliance workshop.", "Risk owner"], ["Manual override must be audited.", "Audit policy and regulator expectation.", "Security review.", "Compliance lead"]],
      prompt: "Create a discovery hypothesis backlog for this business problem. Include actors, assumptions, evidence needed, validation method, decision owner, risk level, and workshop questions. Do not write final requirements yet.",
      mistakes: ["Asking AI to write requirements before uncertainty is mapped.", "Treating generated questions as complete discovery.", "Ignoring decision owners.", "Prioritizing easy questions instead of risky assumptions."],
      tomorrow: ["Turn your next workshop agenda into hypotheses.", "Ask AI for missing stakeholder groups.", "Add evidence needed next to every assumption.", "Open the workshop with decisions required, not only topics."],
      remember: ["Discovery output is validated learning.", "AI expands your question space; stakeholders validate it.", "A good discovery artifact shows what is unknown."]
    },
    vi: {
      title: "Discovery với AI",
      focus: "AI có thể mở rộng discovery, nhưng BA vẫn phải quyết định điều gì cần validate với stakeholder thật.",
      outcomes: ["Dùng AI tạo hypothesis và interview plan.", "Tách assumption, evidence và decision trước workshop.", "Biến output AI thành discovery agenda tốt hơn."],
      concept: "Discovery là giảm uncertainty, không phải tạo tài liệu cho đủ. AI hỗ trợ đề xuất actor, constraint, risk và question, nhưng output nên trở thành hypothesis backlog. BA sau đó validate hoặc reject hypothesis bằng user, data, policy và stakeholder decision.",
      example: "Với claim approval automation, AI gợi ý fraud check, SLA tier, escalation path và missing document scenario. BA chuyển chúng thành workshop question và ưu tiên assumption rủi ro nhất: ai được override, policy nào áp dụng và exception hợp lệ là gì.",
      artifactTitle: "Discovery Hypothesis Backlog",
      artifactHeaders: ["Hypothesis", "Evidence cần có", "Cách validate", "Decision owner"],
      artifactRows: [["Claim giá trị cao cần manager review.", "Policy threshold và historical claim data.", "Review policy và data sample.", "Claims operations lead"], ["Missing document trigger customer notification.", "Support script hiện tại và customer journey.", "Interview support agent.", "Customer service manager"], ["Fraud risk thay đổi SLA.", "Fraud rule và compliance constraint.", "Compliance workshop.", "Risk owner"], ["Manual override phải audit.", "Audit policy và regulator expectation.", "Security review.", "Compliance lead"]],
      prompt: "Tạo discovery hypothesis backlog cho business problem này. Bao gồm actor, assumption, evidence needed, validation method, decision owner, risk level và workshop question. Chưa viết final requirement.",
      mistakes: ["Yêu cầu AI viết requirement trước khi map uncertainty.", "Xem generated question là discovery đầy đủ.", "Bỏ qua decision owner.", "Ưu tiên câu hỏi dễ thay vì assumption rủi ro."],
      tomorrow: ["Chuyển agenda workshop tiếp theo thành hypothesis.", "Nhờ AI tìm stakeholder group còn thiếu.", "Thêm evidence needed cạnh mỗi assumption.", "Mở workshop bằng decisions required, không chỉ topic."],
      remember: ["Discovery output là validated learning.", "AI mở rộng question space; stakeholder validate nó.", "Artifact discovery tốt cho thấy điều gì chưa biết."]
    }
  },
  {
    slug: "stakeholder-interviews-and-synthesis",
    section: "workflow",
    en: {
      title: "Stakeholder Interviews and Synthesis",
      focus: "AI can summarize interviews quickly, but synthesis requires preserving contradictions, attribution, and decisions.",
      outcomes: ["Turn messy notes into themes, facts, contradictions, and requirement candidates.", "Keep stakeholder attribution instead of flattening nuance.", "Prepare conflict-resolution questions."],
      concept: "Interview synthesis is not the same as summarization. A summary compresses; synthesis compares. BA synthesis should preserve who said what, which statements agree, which conflict, which decisions are implied, and which questions must be resolved before requirements are written.",
      example: "Sales says discount approval takes one day; finance says exceptions can take five days; operations says VIP requests bypass the queue. AI can cluster notes, but the BA must expose the policy conflict and ask leaders to decide priority and audit rules.",
      artifactTitle: "Interview Synthesis Board",
      artifactHeaders: ["Theme", "Confirmed fact", "Contradiction", "Follow-up question"],
      artifactRows: [["Approval time", "Standard request usually one day.", "Finance exception takes up to five days.", "Which SLA is promised to customers?"], ["VIP handling", "VIP requests are treated differently.", "No documented bypass rule.", "Who can approve VIP bypass?"], ["Audit", "Finance needs exception trace.", "Sales uses email approval.", "What audit record is mandatory?"], ["Ownership", "Managers approve discounts.", "No backup owner for absence.", "Who owns approval when manager is unavailable?"]],
      prompt: "Synthesize these interview notes into themes, confirmed facts, contradictions, implied requirements, open questions, and decision owners. Preserve stakeholder attribution and do not merge conflicting statements into a false consensus.",
      mistakes: ["Producing a pretty summary that hides disagreement.", "Removing stakeholder attribution.", "Converting every interview statement into a requirement.", "Failing to separate current-state facts from desired future-state decisions."],
      tomorrow: ["Add a contradiction column to your interview summary.", "Ask AI to identify false consensus in notes.", "Tag every requirement candidate with speaker/source.", "Schedule decision follow-up for unresolved conflicts."],
      remember: ["Synthesis protects nuance.", "Contradiction is valuable discovery data.", "Attribution makes requirements defensible."]
    },
    vi: {
      title: "Phỏng vấn stakeholder và tổng hợp insight",
      focus: "AI có thể summarize interview rất nhanh, nhưng synthesis thật sự phải giữ contradiction, attribution và decision.",
      outcomes: ["Chuyển notes lộn xộn thành theme, fact, contradiction và requirement candidate.", "Giữ stakeholder attribution thay vì làm phẳng nuance.", "Chuẩn bị câu hỏi resolve conflict."],
      concept: "Interview synthesis không giống summarization. Summary nén thông tin; synthesis so sánh thông tin. BA synthesis cần giữ ai nói gì, statement nào đồng thuận, statement nào conflict, decision nào bị implied và câu hỏi nào phải resolve trước khi viết requirement.",
      example: "Sales nói discount approval mất một ngày; finance nói exception có thể mất năm ngày; operations nói VIP request bypass queue. AI có thể cluster notes, nhưng BA phải làm rõ policy conflict và yêu cầu leader chốt priority cùng audit rule.",
      artifactTitle: "Interview Synthesis Board",
      artifactHeaders: ["Theme", "Confirmed fact", "Contradiction", "Follow-up question"],
      artifactRows: [["Approval time", "Standard request thường một ngày.", "Finance exception mất tới năm ngày.", "SLA nào được promise với customer?"], ["VIP handling", "VIP request được xử lý khác.", "Không có bypass rule documented.", "Ai được approve VIP bypass?"], ["Audit", "Finance cần trace exception.", "Sales dùng email approval.", "Audit record nào bắt buộc?"], ["Ownership", "Manager approve discount.", "Không có backup owner khi vắng mặt.", "Ai owns approval khi manager unavailable?"]],
      prompt: "Synthesize interview notes này thành theme, confirmed fact, contradiction, implied requirement, open question và decision owner. Giữ stakeholder attribution và không merge statement conflict thành false consensus.",
      mistakes: ["Tạo summary đẹp nhưng che giấu disagreement.", "Xóa stakeholder attribution.", "Chuyển mọi interview statement thành requirement.", "Không tách current-state fact khỏi future-state decision."],
      tomorrow: ["Thêm cột contradiction vào interview summary.", "Yêu cầu AI identify false consensus trong notes.", "Tag mỗi requirement candidate với speaker/source.", "Lên lịch follow-up decision cho conflict chưa resolve."],
      remember: ["Synthesis bảo vệ nuance.", "Contradiction là discovery data có giá trị.", "Attribution làm requirement defensible."]
    }
  },
  {
    slug: "user-stories-and-acceptance-criteria",
    section: "workflow",
    en: {
      title: "User Stories and Acceptance Criteria",
      focus: "AI can draft stories fast, but the BA must preserve business rules, negative paths, permissions, and testability.",
      outcomes: ["Transform vague requests into testable user stories.", "Use AI to generate edge cases without losing business intent.", "Write acceptance criteria that development and QA can inspect."],
      concept: "A user story captures actor, goal, and value; acceptance criteria define observable conditions of done. AI is useful for expansion: alternative paths, validation rules, permissions, and negative cases. The BA must prevent generic criteria by providing business rules and asking for testable scenarios.",
      example: "The request 'users can update profiles' becomes multiple stories: edit contact info, verify email change, restrict sensitive fields, audit admin changes, and handle failed validation. AI helps draft scenarios, but the BA validates rules with product, security, and support.",
      artifactTitle: "Story Quality Rubric",
      artifactHeaders: ["Criterion", "Good signal", "Weak signal", "BA action"],
      artifactRows: [["Actor and value", "Actor and business value are explicit.", "Story only says system shall.", "Rewrite from user goal."], ["Business rule", "Rules and thresholds are named.", "Rule hidden in vague wording.", "Add rule source or open question."], ["Acceptance criteria", "Given-When-Then covers success and failure.", "Only happy path exists.", "Add negative and boundary cases."], ["Testability", "QA can verify expected result.", "Uses subjective terms.", "Replace vague terms with observable outcomes."]],
      prompt: "Convert this request into user stories and Given-When-Then acceptance criteria. Include actor, goal, business value, business rules, permissions, negative cases, boundary cases, audit needs, and unresolved questions. Flag any criteria that are not testable.",
      mistakes: ["Generating many stories without business value.", "Writing acceptance criteria that repeat the story.", "Missing permissions and audit.", "Ignoring negative paths because the happy path looks simple."],
      tomorrow: ["Pick one vague story and ask AI for missing business rules.", "Add two negative acceptance criteria.", "Ask QA to review testability before refinement.", "Tag each criterion with source or assumption."],
      remember: ["AI can expand scenarios, but BA owns business intent.", "Acceptance criteria are a contract for behavior.", "Negative paths are where hidden requirements surface."]
    },
    vi: {
      title: "User story và acceptance criteria",
      focus: "AI có thể draft story nhanh, nhưng BA phải giữ business rule, negative path, permission và testability.",
      outcomes: ["Chuyển request mơ hồ thành user story test được.", "Dùng AI generate edge case mà không mất business intent.", "Viết acceptance criteria để dev và QA inspect được."],
      concept: "User story thể hiện actor, goal và value; acceptance criteria định nghĩa điều kiện observable của done. AI hữu ích khi expand alternative path, validation rule, permission và negative case. BA phải tránh criteria chung chung bằng cách cung cấp business rule và yêu cầu scenario test được.",
      example: "Request 'users can update profiles' được tách thành nhiều story: sửa contact info, verify email change, restrict sensitive field, audit admin change và handle failed validation. AI giúp draft scenario, nhưng BA validate rule với product, security và support.",
      artifactTitle: "Story Quality Rubric",
      artifactHeaders: ["Criterion", "Good signal", "Weak signal", "Hành động BA"],
      artifactRows: [["Actor và value", "Actor và business value rõ.", "Story chỉ ghi system shall.", "Rewrite từ user goal."], ["Business rule", "Rule và threshold có tên.", "Rule ẩn trong wording mơ hồ.", "Thêm source rule hoặc open question."], ["Acceptance criteria", "Given-When-Then cover success và failure.", "Chỉ có happy path.", "Thêm negative và boundary case."], ["Testability", "QA verify được expected result.", "Dùng từ chủ quan.", "Thay vague term bằng outcome observable."]],
      prompt: "Chuyển request này thành user story và acceptance criteria dạng Given-When-Then. Bao gồm actor, goal, business value, business rule, permission, negative case, boundary case, audit need và unresolved question. Flag criteria nào không test được.",
      mistakes: ["Generate nhiều story nhưng thiếu business value.", "Acceptance criteria chỉ lặp lại story.", "Thiếu permission và audit.", "Bỏ negative path vì happy path nhìn đơn giản."],
      tomorrow: ["Chọn một story mơ hồ và nhờ AI tìm missing business rule.", "Thêm hai negative acceptance criteria.", "Nhờ QA review testability trước refinement.", "Tag mỗi criterion với source hoặc assumption."],
      remember: ["AI giúp expand scenario, nhưng BA sở hữu business intent.", "Acceptance criteria là contract về behavior.", "Negative path làm lộ hidden requirement."]
    }
  },
  {
    slug: "process-modeling-with-ai",
    section: "workflow",
    en: {
      title: "Process Modeling With AI",
      focus: "AI can draft process flows, but BA quality comes from decisions, exceptions, ownership, and operational constraints.",
      outcomes: ["Use AI to create first-pass process maps.", "Add exception paths, roles, SLAs, and controls.", "Review process diagrams for missing ownership and policy decisions."],
      concept: "Process modeling is not drawing boxes; it is clarifying work, decision rights, handoffs, and failure handling. AI can convert text into a flow, but the BA should challenge the draft: who owns each step, what triggers the next step, what happens when data is missing, and which controls are required.",
      example: "AI drafts a clean onboarding flow: submit documents, verify, approve. The BA adds missing-document loop, duplicate customer check, risk review, SLA timer, manual override, and customer notification rules. The diagram becomes a decision tool, not decoration.",
      artifactTitle: "Process Review Checklist",
      artifactHeaders: ["Flow element", "BA review question", "Evidence needed", "Common gap"],
      artifactRows: [["Actor", "Who performs or owns the step?", "Role matrix or SOP.", "System step with no owner."], ["Decision", "What rule chooses the branch?", "Policy or business rule.", "Diamond with vague condition."], ["Exception", "What happens when input is invalid?", "Support scripts and error logs.", "Happy path only."], ["SLA/control", "What timing or audit control applies?", "Operational metric or compliance rule.", "No escalation or audit."]],
      prompt: "Convert this process description into a Mermaid flowchart. Include actors, decision rules, exception paths, SLAs, handoffs, inputs, outputs, controls, and unresolved policy questions. After the diagram, list missing ownership or rule gaps.",
      mistakes: ["Accepting the first AI diagram because it looks clean.", "Omitting exceptions and manual work.", "Using process boxes without owners.", "Drawing decisions without decision rules."],
      tomorrow: ["Ask AI to add exception paths to one existing flow.", "Mark every decision diamond with a business rule.", "Add owner labels to process steps.", "Review the diagram with support or operations, not only product."],
      remember: ["A useful process diagram exposes decisions and handoffs.", "Exceptions often contain the real requirements.", "AI drafts flow; BA validates operation."]
    },
    vi: {
      title: "Mô hình hóa quy trình với AI",
      focus: "AI có thể draft process flow, nhưng chất lượng BA nằm ở decision, exception, ownership và operational constraint.",
      outcomes: ["Dùng AI tạo first-pass process map.", "Bổ sung exception path, role, SLA và control.", "Review process diagram để tìm ownership và policy decision thiếu."],
      concept: "Process modeling không phải chỉ vẽ box; đó là làm rõ work, decision right, handoff và failure handling. AI có thể chuyển text thành flow, nhưng BA phải challenge draft: ai own từng step, trigger next step là gì, chuyện gì xảy ra khi thiếu data và control nào bắt buộc.",
      example: "AI draft onboarding flow sạch: submit document, verify, approve. BA thêm missing-document loop, duplicate customer check, risk review, SLA timer, manual override và customer notification rule. Diagram trở thành decision tool, không phải decoration.",
      artifactTitle: "Process Review Checklist",
      artifactHeaders: ["Flow element", "Câu hỏi BA", "Evidence cần có", "Gap thường gặp"],
      artifactRows: [["Actor", "Ai perform hoặc own step?", "Role matrix hoặc SOP.", "System step không có owner."], ["Decision", "Rule nào chọn branch?", "Policy hoặc business rule.", "Diamond có condition mơ hồ."], ["Exception", "Khi input invalid thì sao?", "Support script và error log.", "Chỉ có happy path."], ["SLA/control", "Timing hoặc audit control nào áp dụng?", "Operational metric hoặc compliance rule.", "Không có escalation hoặc audit."]],
      prompt: "Chuyển process description này thành Mermaid flowchart. Bao gồm actor, decision rule, exception path, SLA, handoff, input, output, control và unresolved policy question. Sau diagram, liệt kê missing ownership hoặc rule gap.",
      mistakes: ["Chấp nhận diagram AI đầu tiên vì nhìn sạch.", "Bỏ exception và manual work.", "Dùng process box không có owner.", "Vẽ decision nhưng thiếu decision rule."],
      tomorrow: ["Nhờ AI thêm exception path cho một flow hiện có.", "Gắn business rule cho từng decision diamond.", "Thêm owner label vào process step.", "Review diagram với support hoặc operations, không chỉ product."],
      remember: ["Process diagram hữu ích làm lộ decision và handoff.", "Exception thường chứa requirement thật.", "AI draft flow; BA validate operation."]
    }
  },
  {
    slug: "context-engineering-patterns",
    section: "collaboration",
    en: {
      title: "Context Engineering Patterns",
      focus: "Good AI work is not a clever prompt; it is a reusable context package with goals, sources, constraints, and review criteria.",
      outcomes: ["Build context packages for repeatable BA tasks.", "Define output contracts for AI-assisted analysis.", "Reduce hallucination by controlling source and review rules."],
      concept: "Prompting is the visible instruction; context engineering is the full operating design around it. For BA work, a context package should include business goal, users, scope, sources, constraints, artifact format, quality bar, and questions the AI must ask before drafting.",
      example: "Two BAs ask AI to review requirements. One writes 'find gaps'; the other supplies product goal, stakeholder roles, source IDs, NFR checklist, output columns, severity levels, and evidence rules. The second BA gets a usable review artifact.",
      artifactTitle: "BA Context Package",
      artifactHeaders: ["Component", "What to include", "Why it matters", "Example"],
      artifactRows: [["Role", "Perspective and expertise expected.", "Shapes review lens.", "Senior BA for fintech onboarding."], ["Source", "Documents, notes, IDs, freshness.", "Controls grounding.", "SRS v0.8, policy P-12, workshop notes."], ["Task", "Specific analysis job.", "Avoids broad summaries.", "Find ambiguity and NFR gaps."], ["Output contract", "Columns, format, quality bar.", "Makes output reviewable.", "Table with evidence and questions."]],
      prompt: "Use this context package: Role, Business Goal, Users, Scope, Source IDs, Constraints, Task, Output Format, Quality Bar, and Questions Before Drafting. Ask clarification questions first if any required component is missing.",
      mistakes: ["Calling a one-line instruction 'prompt engineering'.", "Skipping output format.", "Failing to provide source IDs.", "Not telling AI what quality means for the artifact."],
      tomorrow: ["Create a reusable context package for requirement review.", "Add output columns before asking AI to draft.", "Include a quality bar in one prompt.", "Ask AI what context is missing before it answers."],
      remember: ["Context engineering makes AI work repeatable.", "Output format is part of the requirement.", "A prompt without source and review rules is fragile."]
    },
    vi: {
      title: "Context engineering patterns",
      focus: "AI work tốt không phải một prompt thông minh; đó là context package tái sử dụng được với goal, source, constraint và review criteria.",
      outcomes: ["Xây context package cho task BA lặp lại.", "Định nghĩa output contract cho AI-assisted analysis.", "Giảm hallucination bằng cách kiểm soát source và review rule."],
      concept: "Prompting là instruction nhìn thấy; context engineering là operating design đầy đủ xung quanh nó. Với BA, context package nên gồm business goal, user, scope, source, constraint, artifact format, quality bar và câu hỏi AI phải hỏi trước khi draft.",
      example: "Hai BA nhờ AI review requirement. Một người viết 'find gaps'; người kia cung cấp product goal, stakeholder role, source ID, NFR checklist, output column, severity level và evidence rule. BA thứ hai nhận được artifact review dùng được.",
      artifactTitle: "BA Context Package",
      artifactHeaders: ["Component", "Cần đưa vào", "Vì sao quan trọng", "Ví dụ"],
      artifactRows: [["Role", "Perspective và expertise mong muốn.", "Định hình lens review.", "Senior BA cho fintech onboarding."], ["Source", "Document, note, ID, freshness.", "Kiểm soát grounding.", "SRS v0.8, policy P-12, workshop notes."], ["Task", "Analysis job cụ thể.", "Tránh summary quá rộng.", "Find ambiguity và NFR gap."], ["Output contract", "Column, format, quality bar.", "Làm output review được.", "Table có evidence và question."]],
      prompt: "Dùng context package này: Role, Business Goal, Users, Scope, Source IDs, Constraints, Task, Output Format, Quality Bar và Questions Before Drafting. Hỏi clarification question trước nếu thiếu component bắt buộc.",
      mistakes: ["Gọi instruction một dòng là prompt engineering.", "Bỏ output format.", "Không cung cấp source ID.", "Không nói rõ quality nghĩa là gì với artifact."],
      tomorrow: ["Tạo context package reusable cho requirement review.", "Thêm output column trước khi nhờ AI draft.", "Đưa quality bar vào một prompt.", "Yêu cầu AI hỏi context còn thiếu trước khi trả lời."],
      remember: ["Context engineering làm AI work lặp lại được.", "Output format là một phần của requirement.", "Prompt thiếu source và review rule thì fragile."]
    }
  },
  {
    slug: "review-loops-and-critique",
    section: "collaboration",
    en: {
      title: "Review Loops and Critique",
      focus: "The strongest BA use of AI is not drafting faster; it is creating disciplined critique loops before artifacts reach the team.",
      outcomes: ["Use AI as drafter, critic, counterparty, and gap finder.", "Run multi-perspective reviews for BA artifacts.", "Convert critique into prioritized revisions."],
      concept: "One-pass AI output is risky. A review loop makes AI work safer: draft, critique, revise, evidence-check, and stakeholder-validate. The BA can ask AI to review from product, QA, engineering, security, operations, and user perspectives, then decide which findings matter.",
      example: "A generated SRS section looks complete. A critique pass finds that audit logging is missing, error states are vague, and a support workflow is not covered. The BA turns findings into revision tasks and validation questions instead of shipping the first draft.",
      artifactTitle: "Multi-Perspective Critique Grid",
      artifactHeaders: ["Perspective", "What to inspect", "Finding format", "Revision action"],
      artifactRows: [["QA", "Testability, edge cases, expected results.", "Defect plus test scenario.", "Rewrite AC and add negative case."], ["Developer", "API, data, integration assumptions.", "Implementation risk.", "Clarify contract or dependency."], ["Operations", "Support, monitoring, failure handling.", "Runbook gap.", "Add support flow and alert rule."], ["Compliance", "Privacy, audit, policy constraints.", "Control gap.", "Add evidence and approval step."]],
      prompt: "Review this artifact from QA, developer, operations, compliance, support, and end-user perspectives. Return findings with severity, evidence, affected section, revision recommendation, and validation question. Do not rewrite yet; critique first.",
      mistakes: ["Asking AI to improve the draft without first diagnosing it.", "Accepting all critique findings equally.", "Skipping evidence for critique.", "Not preserving the revision decision trail."],
      tomorrow: ["Run one draft through a QA critique prompt.", "Ask AI to rank findings by delivery risk.", "Convert critique into a revision backlog.", "Share top three risks with the team before refinement."],
      remember: ["Critique is where AI often creates the most BA value.", "Review loops make uncertainty visible.", "The BA chooses which critique findings become changes."]
    },
    vi: {
      title: "Review loop và critique",
      focus: "Cách dùng AI mạnh nhất cho BA không chỉ là draft nhanh hơn; đó là tạo critique loop có kỷ luật trước khi artifact đến team.",
      outcomes: ["Dùng AI như drafter, critic, counterparty và gap finder.", "Chạy multi-perspective review cho BA artifact.", "Chuyển critique thành revision ưu tiên."],
      concept: "Output AI một pass rất rủi ro. Review loop làm AI work an toàn hơn: draft, critique, revise, evidence-check và stakeholder-validate. BA có thể yêu cầu AI review từ góc product, QA, engineering, security, operations và user, rồi quyết định finding nào quan trọng.",
      example: "Một SRS section generated nhìn có vẻ đầy đủ. Critique pass phát hiện thiếu audit logging, error state mơ hồ và support workflow chưa cover. BA chuyển finding thành revision task và validation question thay vì ship first draft.",
      artifactTitle: "Multi-Perspective Critique Grid",
      artifactHeaders: ["Perspective", "Cần inspect", "Finding format", "Revision action"],
      artifactRows: [["QA", "Testability, edge case, expected result.", "Defect plus test scenario.", "Rewrite AC và thêm negative case."], ["Developer", "API, data, integration assumption.", "Implementation risk.", "Clarify contract hoặc dependency."], ["Operations", "Support, monitoring, failure handling.", "Runbook gap.", "Thêm support flow và alert rule."], ["Compliance", "Privacy, audit, policy constraint.", "Control gap.", "Thêm evidence và approval step."]],
      prompt: "Review artifact này từ góc QA, developer, operations, compliance, support và end-user. Trả về finding với severity, evidence, affected section, revision recommendation và validation question. Chưa rewrite; critique trước.",
      mistakes: ["Yêu cầu AI improve draft mà không diagnose trước.", "Xem mọi critique finding quan trọng như nhau.", "Bỏ evidence cho critique.", "Không giữ revision decision trail."],
      tomorrow: ["Chạy một draft qua QA critique prompt.", "Nhờ AI rank finding theo delivery risk.", "Chuyển critique thành revision backlog.", "Share top three risks với team trước refinement."],
      remember: ["Critique thường là nơi AI tạo nhiều giá trị BA nhất.", "Review loop làm uncertainty visible.", "BA quyết định finding nào trở thành change."]
    }
  },
  {
    slug: "structured-outputs-and-reusable-prompts",
    section: "collaboration",
    en: {
      title: "Structured Outputs and Reusable Prompts",
      focus: "Structured output turns AI from a chat response into a reviewable BA artifact.",
      outcomes: ["Design output tables and schemas for BA tasks.", "Create reusable prompts for repeated analysis work.", "Make AI output easier to review, compare, and trace."],
      concept: "Unstructured answers are hard to verify. Structured output gives the BA columns, IDs, severity levels, source references, and owners. This makes the result inspectable by product, dev, QA, and stakeholders. Reusable prompts should define input, output contract, constraints, and review rules.",
      example: "Instead of asking 'summarize this meeting,' the BA asks for a table with decision, evidence, owner, impacted requirement, risk, and open question. The output can be converted into Jira tasks, decision logs, and follow-up actions.",
      artifactTitle: "Reusable Prompt Contract",
      artifactHeaders: ["Contract part", "Required content", "Why it helps", "Example"],
      artifactRows: [["Input scope", "What source is included and excluded.", "Avoids hidden context drift.", "Use transcript T1 and policy P2 only."], ["Output columns", "Fields the artifact must contain.", "Makes review systematic.", "ID, issue, severity, evidence, question."], ["Constraints", "Rules AI must follow.", "Prevents unsupported content.", "Do not invent policy."], ["Review rule", "How output will be judged.", "Aligns with BA quality.", "Every row needs source or assumption."]],
      prompt: "Create a reusable prompt for this BA task. Include purpose, input assumptions, required context, output schema, constraints, quality rubric, and a self-check section. Keep it generic enough to reuse but specific enough to produce reviewable output.",
      mistakes: ["Using free-form output for tasks that need comparison.", "Forgetting IDs and source references.", "Creating prompts that cannot be reused by another BA.", "Not specifying how severe issues should be ranked."],
      tomorrow: ["Convert one common prompt into a reusable prompt contract.", "Add output columns for source, severity, and owner.", "Ask AI to self-check against the output schema.", "Store the prompt in your team library."],
      remember: ["Structure is a quality control.", "Good prompts define output, not just task.", "Reusable prompts turn individual skill into team capability."]
    },
    vi: {
      title: "Structured output và prompt tái sử dụng",
      focus: "Structured output biến AI từ chat response thành BA artifact có thể review.",
      outcomes: ["Thiết kế output table và schema cho task BA.", "Tạo reusable prompt cho work phân tích lặp lại.", "Làm output AI dễ review, compare và trace hơn."],
      concept: "Answer không cấu trúc rất khó verify. Structured output cho BA column, ID, severity level, source reference và owner. Nhờ vậy product, dev, QA và stakeholder có thể inspect. Reusable prompt nên định nghĩa input, output contract, constraint và review rule.",
      example: "Thay vì hỏi 'summarize meeting này', BA yêu cầu bảng gồm decision, evidence, owner, impacted requirement, risk và open question. Output có thể chuyển thành Jira task, decision log và follow-up action.",
      artifactTitle: "Reusable Prompt Contract",
      artifactHeaders: ["Contract part", "Content bắt buộc", "Vì sao hữu ích", "Ví dụ"],
      artifactRows: [["Input scope", "Source nào included và excluded.", "Tránh context drift ẩn.", "Chỉ dùng transcript T1 và policy P2."], ["Output columns", "Field artifact phải có.", "Làm review systematic.", "ID, issue, severity, evidence, question."], ["Constraints", "Rule AI phải tuân thủ.", "Ngăn unsupported content.", "Không tự bịa policy."], ["Review rule", "Cách đánh giá output.", "Align với BA quality.", "Mỗi row cần source hoặc assumption."]],
      prompt: "Tạo reusable prompt cho BA task này. Bao gồm purpose, input assumption, required context, output schema, constraint, quality rubric và self-check section. Giữ đủ generic để reuse nhưng đủ specific để output review được.",
      mistakes: ["Dùng free-form output cho task cần comparison.", "Quên ID và source reference.", "Tạo prompt mà BA khác không reuse được.", "Không định nghĩa cách rank severity."],
      tomorrow: ["Chuyển một prompt thường dùng thành reusable prompt contract.", "Thêm output column source, severity và owner.", "Yêu cầu AI self-check theo output schema.", "Lưu prompt vào team library."],
      remember: ["Structure là quality control.", "Prompt tốt định nghĩa output, không chỉ task.", "Reusable prompt biến kỹ năng cá nhân thành capability của team."]
    }
  },
  {
    slug: "ambiguity-conflict-and-gap-analysis",
    section: "requirements",
    en: {
      title: "Ambiguity, Conflict, and Gap Analysis",
      focus: "AI is useful for requirement defect detection when the BA provides a precise defect taxonomy and severity rubric.",
      outcomes: ["Detect ambiguity, conflict, missing rules, and non-testable language.", "Use severity to prioritize clarification.", "Rewrite weak requirements into testable alternatives."],
      concept: "Requirement review improves when defects have names. Ambiguity, conflict, missing actor, missing data, hidden assumption, and non-testable wording are different problems. AI can scan for these categories quickly, but the BA must decide severity and ask the right clarification question.",
      example: "A requirement says, 'The system should notify users quickly when important changes happen.' AI flags quickly, users, important, channel, retry, opt-out, audit, and SLA as gaps. The BA rewrites it into measurable notification scenarios.",
      artifactTitle: "Requirement Defect Taxonomy",
      artifactHeaders: ["Defect type", "Signal", "Clarification question", "Example rewrite"],
      artifactRows: [["Ambiguity", "Vague terms or undefined actors.", "What exact term or actor applies?", "Notify account owner within 10 minutes."], ["Conflict", "Two rules cannot both be true.", "Which rule wins and when?", "VIP SLA overrides standard SLA."], ["Missing rule", "Decision branch lacks condition.", "What business rule selects this path?", "Reject if KYC status is expired."], ["Non-testable", "No observable expected result.", "How will QA verify success?", "Email status is logged as sent or failed."]],
      prompt: "Review these requirements using the defect taxonomy. Return defect type, severity, affected text, why it matters, clarification question, and a testable rewrite candidate. Keep unsupported rewrites labeled as assumptions.",
      mistakes: ["Saying 'unclear' without naming the defect.", "Fixing wording but not the underlying business rule.", "Treating all defects as equal severity.", "Letting AI rewrite requirements without source validation."],
      tomorrow: ["Run taxonomy review on five backlog items.", "Add severity and clarification question to each finding.", "Rewrite one vague requirement into testable language.", "Ask a stakeholder to approve the rewritten rule."],
      remember: ["Named defects make review faster.", "Clarification questions are as valuable as rewrites.", "AI can find likely defects; BA confirms business meaning."]
    },
    vi: {
      title: "Phân tích mơ hồ, xung đột và khoảng trống",
      focus: "AI hữu ích để detect defect trong requirement khi BA cung cấp defect taxonomy và severity rubric rõ.",
      outcomes: ["Detect ambiguity, conflict, missing rule và non-testable language.", "Dùng severity để ưu tiên clarification.", "Rewrite requirement yếu thành alternative test được."],
      concept: "Requirement review tốt hơn khi defect có tên. Ambiguity, conflict, missing actor, missing data, hidden assumption và non-testable wording là các vấn đề khác nhau. AI có thể scan nhanh các category này, nhưng BA phải quyết định severity và hỏi clarification question đúng.",
      example: "Requirement ghi: 'The system should notify users quickly when important changes happen.' AI flag quickly, users, important, channel, retry, opt-out, audit và SLA là gap. BA rewrite thành notification scenario đo được.",
      artifactTitle: "Requirement Defect Taxonomy",
      artifactHeaders: ["Defect type", "Signal", "Clarification question", "Example rewrite"],
      artifactRows: [["Ambiguity", "Term mơ hồ hoặc actor undefined.", "Term hoặc actor chính xác là gì?", "Notify account owner within 10 minutes."], ["Conflict", "Hai rule không thể cùng đúng.", "Rule nào thắng và khi nào?", "VIP SLA overrides standard SLA."], ["Missing rule", "Decision branch thiếu condition.", "Business rule nào chọn path này?", "Reject if KYC status is expired."], ["Non-testable", "Không có expected result observable.", "QA verify success bằng gì?", "Email status is logged as sent or failed."]],
      prompt: "Review requirement này bằng defect taxonomy. Trả về defect type, severity, affected text, why it matters, clarification question và candidate rewrite test được. Giữ unsupported rewrite với label assumption.",
      mistakes: ["Nói 'unclear' mà không gọi tên defect.", "Sửa wording nhưng không sửa business rule gốc.", "Xem mọi defect cùng severity.", "Để AI rewrite requirement mà không validate source."],
      tomorrow: ["Chạy taxonomy review trên năm backlog item.", "Thêm severity và clarification question cho mỗi finding.", "Rewrite một requirement mơ hồ thành language test được.", "Nhờ stakeholder approve rewritten rule."],
      remember: ["Defect có tên làm review nhanh hơn.", "Clarification question có giá trị như rewrite.", "AI tìm defect khả nghi; BA confirm business meaning."]
    }
  },
  {
    slug: "non-functional-requirements-and-risk",
    section: "requirements",
    en: {
      title: "Non-Functional Requirements and Risk",
      focus: "NFRs are business risk requirements, not technical extras.",
      outcomes: ["Use AI to surface NFR gaps across quality attributes.", "Translate technical risks into business impact.", "Prioritize NFRs based on usage, data sensitivity, and failure cost."],
      concept: "NFRs describe how the system must behave under real-world conditions: performance, availability, security, privacy, accessibility, auditability, supportability, and compliance. AI can propose NFR categories, but the BA must tie each requirement to business impact and measurable acceptance criteria.",
      example: "A payment refund feature has functional steps but no timeout, audit, fraud, data retention, or support requirements. AI creates a risk inventory; the BA turns high-risk gaps into measurable NFRs and acceptance tests.",
      artifactTitle: "NFR Risk Matrix",
      artifactHeaders: ["Quality attribute", "Business impact", "Requirement example", "Acceptance signal"],
      artifactRows: [["Availability", "Refunds blocked during outage.", "Refund submission available 99.9% monthly.", "Downtime report below threshold."], ["Privacy", "PII exposed in refund notes.", "Mask customer PII in support view.", "Role-based access test passes."], ["Auditability", "No trace for disputed refund.", "Log approver, timestamp, reason, old/new status.", "Audit export includes all fields."], ["Performance", "Agent queue grows during peak.", "Search refund status under 2 seconds p95.", "Load test meets p95 target."]],
      prompt: "Review this feature for NFR risk. Cover availability, performance, security, privacy, accessibility, auditability, supportability, compliance, and data retention. For each gap, provide business impact, measurable requirement, acceptance signal, and owner.",
      mistakes: ["Treating NFRs as developer-only concerns.", "Writing NFRs without measurable signals.", "Ignoring privacy and audit until late testing.", "Failing to connect NFR priority to business risk."],
      tomorrow: ["Pick one feature and ask AI for NFR gaps.", "Rewrite one NFR with a measurable acceptance signal.", "Review NFR priority with product and engineering.", "Add audit and supportability to your checklist."],
      remember: ["NFRs are risk controls.", "Measurable NFRs prevent vague quality debates.", "BA ownership includes business impact of failure."]
    },
    vi: {
      title: "Non-functional requirement và rủi ro",
      focus: "NFR là business risk requirement, không phải phần phụ kỹ thuật.",
      outcomes: ["Dùng AI surface NFR gap theo quality attribute.", "Dịch technical risk thành business impact.", "Ưu tiên NFR theo usage, data sensitivity và failure cost."],
      concept: "NFR mô tả hệ thống phải behave ra sao trong điều kiện thực tế: performance, availability, security, privacy, accessibility, auditability, supportability và compliance. AI có thể đề xuất category NFR, nhưng BA phải gắn mỗi requirement với business impact và measurable acceptance criteria.",
      example: "Refund feature có functional step nhưng thiếu timeout, audit, fraud, data retention và support requirement. AI tạo risk inventory; BA chuyển high-risk gap thành NFR đo được và acceptance test.",
      artifactTitle: "NFR Risk Matrix",
      artifactHeaders: ["Quality attribute", "Business impact", "Requirement example", "Acceptance signal"],
      artifactRows: [["Availability", "Refund bị block khi outage.", "Refund submission available 99.9% monthly.", "Downtime report dưới threshold."], ["Privacy", "PII lộ trong refund note.", "Mask customer PII trong support view.", "Role-based access test pass."], ["Auditability", "Không có trace cho disputed refund.", "Log approver, timestamp, reason, old/new status.", "Audit export có đủ field."], ["Performance", "Agent queue tăng khi peak.", "Search refund status dưới 2 giây p95.", "Load test đạt p95 target."]],
      prompt: "Review feature này cho NFR risk. Cover availability, performance, security, privacy, accessibility, auditability, supportability, compliance và data retention. Với mỗi gap, đưa business impact, measurable requirement, acceptance signal và owner.",
      mistakes: ["Xem NFR là chuyện riêng của developer.", "Viết NFR không có measurable signal.", "Bỏ privacy và audit đến late testing.", "Không nối priority NFR với business risk."],
      tomorrow: ["Chọn một feature và nhờ AI tìm NFR gap.", "Rewrite một NFR với acceptance signal đo được.", "Review priority NFR với product và engineering.", "Thêm audit và supportability vào checklist."],
      remember: ["NFR là risk control.", "NFR đo được giúp tránh tranh luận quality mơ hồ.", "Ownership của BA bao gồm business impact khi failure."]
    }
  },
  {
    slug: "traceability-and-testability",
    section: "requirements",
    en: {
      title: "Traceability and Testability",
      focus: "Traceability makes AI-assisted requirements accountable from business goal to test evidence.",
      outcomes: ["Build traceability chains across goals, requirements, criteria, and tests.", "Use AI to find orphan requirements and weak test links.", "Improve release decisions with evidence."],
      concept: "Traceability connects why a requirement exists to how it will be verified. AI can help build matrices and identify gaps, but the BA must decide which links are real. A strong traceability chain maps business objective, stakeholder need, requirement, acceptance criteria, test scenario, metric, and source evidence.",
      example: "A release has 80 stories. AI finds 12 stories with no linked business objective and 8 high-priority objectives with no test scenario. The BA uses the matrix to clean scope and reduce release risk.",
      artifactTitle: "Traceability Chain",
      artifactHeaders: ["Link", "Question", "Example", "Gap signal"],
      artifactRows: [["Objective to need", "Whose problem does this solve?", "Reduce onboarding drop-off for new customers.", "No named stakeholder."], ["Need to requirement", "What system behavior supports it?", "Send missing-doc reminder within 24 hours.", "Behavior not observable."], ["Requirement to AC", "How is done verified?", "Given missing doc, then reminder is sent.", "No failure case."], ["AC to metric", "How will impact be measured?", "Drop-off rate decreases by 10%.", "No success metric."]],
      prompt: "Create a traceability matrix from these artifacts. Include business objective, stakeholder need, requirement ID, acceptance criteria, test scenario, metric, source evidence, and gaps. Flag orphan requirements and objectives without tests.",
      mistakes: ["Treating traceability as documentation overhead.", "Linking items mechanically without checking meaning.", "Missing test scenarios for high-risk requirements.", "Using AI-generated links without human review."],
      tomorrow: ["Build a traceability chain for one epic.", "Ask AI to identify orphan stories.", "Add source evidence to high-risk requirements.", "Review metric alignment with product owner."],
      remember: ["Traceability is accountability.", "Testability starts before QA receives the story.", "AI can draft matrices; BA verifies links."]
    },
    vi: {
      title: "Traceability và testability",
      focus: "Traceability làm requirement có accountability từ business goal đến test evidence.",
      outcomes: ["Xây traceability chain giữa goal, requirement, criteria và test.", "Dùng AI tìm orphan requirement và weak test link.", "Cải thiện release decision bằng evidence."],
      concept: "Traceability nối lý do requirement tồn tại với cách verify nó. AI có thể hỗ trợ tạo matrix và tìm gap, nhưng BA phải quyết định link nào thật. Traceability chain mạnh map business objective, stakeholder need, requirement, acceptance criteria, test scenario, metric và source evidence.",
      example: "Một release có 80 story. AI tìm 12 story không link business objective và 8 high-priority objective không có test scenario. BA dùng matrix để clean scope và giảm release risk.",
      artifactTitle: "Traceability Chain",
      artifactHeaders: ["Link", "Question", "Example", "Gap signal"],
      artifactRows: [["Objective to need", "Giải quyết problem của ai?", "Reduce onboarding drop-off for new customers.", "Không có stakeholder named."], ["Need to requirement", "System behavior nào support?", "Send missing-doc reminder within 24 hours.", "Behavior không observable."], ["Requirement to AC", "Done được verify bằng gì?", "Given missing doc, then reminder is sent.", "Không có failure case."], ["AC to metric", "Impact đo thế nào?", "Drop-off rate decreases by 10%.", "Không có success metric."]],
      prompt: "Tạo traceability matrix từ các artifact này. Bao gồm business objective, stakeholder need, requirement ID, acceptance criteria, test scenario, metric, source evidence và gap. Flag orphan requirement và objective không có test.",
      mistakes: ["Xem traceability là documentation overhead.", "Link item máy móc mà không check meaning.", "Thiếu test scenario cho high-risk requirement.", "Dùng AI-generated link mà không human review."],
      tomorrow: ["Xây traceability chain cho một epic.", "Nhờ AI identify orphan story.", "Thêm source evidence cho high-risk requirement.", "Review metric alignment với product owner."],
      remember: ["Traceability là accountability.", "Testability bắt đầu trước khi QA nhận story.", "AI draft matrix; BA verify link."]
    }
  },
  {
    slug: "brd-srs-and-decision-artifacts",
    section: "artifacts",
    en: {
      title: "BRD, SRS, and Decision Artifacts",
      focus: "AI can draft documents, but BA value comes from decision structure, evidence, scope control, and reviewability.",
      outcomes: ["Use AI to structure BRD and SRS sections without losing ownership.", "Preserve decisions, assumptions, risks, and evidence.", "Avoid document polish that hides unresolved scope."],
      concept: "A BA document is not valuable because it is long; it is valuable because it makes decisions inspectable. AI can create first drafts, but the BA must maintain decision log, scope boundaries, source evidence, risks, assumptions, and open questions. A polished document with hidden uncertainty is dangerous.",
      example: "Workshop notes become a BRD section. AI drafts a clean narrative, but the BA adds a decision table, explicit out-of-scope items, unresolved pricing rules, and stakeholder approval status before sharing.",
      artifactTitle: "Decision Artifact Skeleton",
      artifactHeaders: ["Section", "Purpose", "AI can help with", "BA must own"],
      artifactRows: [["Business objective", "State why the work exists.", "Summarize workshop notes.", "Metric and priority tradeoff."], ["Scope boundary", "Prevent accidental expansion.", "Draft in/out lists.", "Final scope decision."], ["Decision log", "Show what is settled.", "Format decisions.", "Owner, date, rationale."], ["Open questions", "Keep uncertainty visible.", "Cluster questions.", "Resolution path and owner."]],
      prompt: "Draft a BRD/SRS section from these notes. Include objective, scope, stakeholders, decisions, assumptions, requirements, risks, metrics, open questions, and source evidence. Label anything inferred, and keep unresolved items out of final requirements.",
      mistakes: ["Using AI to create polished documents before decisions are clear.", "Hiding assumptions in prose.", "Mixing current state, future state, and open questions.", "Forgetting scope boundaries."],
      tomorrow: ["Add a decision log to one document.", "Ask AI to extract assumptions from your draft.", "Move unresolved items into an open-question table.", "Review out-of-scope items with stakeholders."],
      remember: ["Documents should make decisions visible.", "Polish is not clarity.", "AI drafts; BA controls scope and evidence."]
    },
    vi: {
      title: "BRD, SRS và artifact quyết định",
      focus: "AI có thể draft tài liệu, nhưng giá trị BA nằm ở decision structure, evidence, scope control và reviewability.",
      outcomes: ["Dùng AI structure BRD và SRS mà không mất ownership.", "Giữ decision, assumption, risk và evidence.", "Tránh document polish che giấu unresolved scope."],
      concept: "Tài liệu BA không có giá trị vì dài; nó có giá trị vì làm decision inspect được. AI có thể tạo first draft, nhưng BA phải giữ decision log, scope boundary, source evidence, risk, assumption và open question. Tài liệu polished nhưng giấu uncertainty là nguy hiểm.",
      example: "Workshop notes được chuyển thành BRD section. AI draft narrative sạch, nhưng BA bổ sung decision table, item out-of-scope rõ, pricing rule chưa resolve và stakeholder approval status trước khi share.",
      artifactTitle: "Decision Artifact Skeleton",
      artifactHeaders: ["Section", "Purpose", "AI hỗ trợ gì", "BA phải own gì"],
      artifactRows: [["Business objective", "Nêu vì sao work tồn tại.", "Summarize workshop notes.", "Metric và priority tradeoff."], ["Scope boundary", "Ngăn scope expansion vô tình.", "Draft in/out list.", "Final scope decision."], ["Decision log", "Cho thấy điều đã chốt.", "Format decision.", "Owner, date, rationale."], ["Open questions", "Giữ uncertainty visible.", "Cluster question.", "Resolution path và owner."]],
      prompt: "Draft section BRD/SRS từ notes này. Bao gồm objective, scope, stakeholder, decision, assumption, requirement, risk, metric, open question và source evidence. Label mọi inference, và không đưa unresolved item vào final requirement.",
      mistakes: ["Dùng AI tạo document polished trước khi decision rõ.", "Giấu assumption trong prose.", "Trộn current state, future state và open question.", "Quên scope boundary."],
      tomorrow: ["Thêm decision log vào một document.", "Nhờ AI extract assumption từ draft.", "Chuyển unresolved item vào open-question table.", "Review out-of-scope item với stakeholder."],
      remember: ["Document nên làm decision visible.", "Polish không phải clarity.", "AI draft; BA kiểm soát scope và evidence."]
    }
  },
  {
    slug: "diagramming-for-ba",
    section: "artifacts",
    en: {
      title: "Diagramming for BA",
      focus: "A good diagram changes the conversation; it reveals decisions, boundaries, and gaps that text hides.",
      outcomes: ["Choose the right diagram type for a BA question.", "Use AI to draft Mermaid diagrams safely.", "Review diagrams for missing actors, flows, and exceptions."],
      concept: "Diagrams are thinking tools. Flowcharts clarify process decisions; sequence diagrams clarify system interactions; state diagrams clarify lifecycle; matrices clarify rule combinations. AI can translate text to Mermaid, but the BA must validate system boundaries, actor responsibility, exception paths, and business rules.",
      example: "A requirement says 'payment is verified before fulfillment.' A sequence diagram reveals missing responsibility between payment gateway, order service, warehouse, and customer notification. The BA then asks who handles payment failure and when inventory is released.",
      artifactTitle: "Diagram Selection Guide",
      artifactHeaders: ["BA question", "Diagram type", "Use when", "Review focus"],
      artifactRows: [["How does work flow?", "Flowchart", "Process and decisions matter.", "Actors, decision rules, exceptions."], ["How do systems interact?", "Sequence diagram", "APIs/events are involved.", "System boundaries and failure messages."], ["What states can an entity have?", "State diagram", "Lifecycle matters.", "Allowed transitions and triggers."], ["Which rule applies?", "Decision table", "Combinations drive outcomes.", "Complete and exclusive rules."]],
      prompt: "Choose the best diagram type for this requirement and explain why. Then draft the Mermaid diagram. After the diagram, list missing actors, unclear boundaries, exception paths, and business rules that need validation.",
      mistakes: ["Using one diagram type for every problem.", "Letting AI draw a diagram without checking business meaning.", "Omitting failure paths.", "Creating diagrams that are pretty but not decision-useful."],
      tomorrow: ["Convert one text-heavy requirement into a Mermaid diagram.", "Ask AI which diagram type fits the question.", "Review the diagram with a developer for boundary gaps.", "Add exception paths before sharing."],
      remember: ["Diagrams are analysis, not decoration.", "The best diagram exposes the next decision.", "AI draws quickly; BA checks meaning."]
    },
    vi: {
      title: "Diagramming cho BA",
      focus: "Diagram tốt thay đổi cuộc trao đổi; nó làm lộ decision, boundary và gap mà text che mất.",
      outcomes: ["Chọn đúng diagram type cho câu hỏi BA.", "Dùng AI draft Mermaid diagram an toàn.", "Review diagram để tìm actor, flow và exception thiếu."],
      concept: "Diagram là thinking tool. Flowchart làm rõ process decision; sequence diagram làm rõ system interaction; state diagram làm rõ lifecycle; matrix làm rõ tổ hợp rule. AI có thể chuyển text sang Mermaid, nhưng BA phải validate system boundary, actor responsibility, exception path và business rule.",
      example: "Requirement ghi 'payment is verified before fulfillment.' Sequence diagram làm lộ responsibility thiếu giữa payment gateway, order service, warehouse và customer notification. BA hỏi tiếp ai handle payment failure và khi nào release inventory.",
      artifactTitle: "Diagram Selection Guide",
      artifactHeaders: ["Câu hỏi BA", "Diagram type", "Dùng khi", "Review focus"],
      artifactRows: [["Work flow ra sao?", "Flowchart", "Process và decision quan trọng.", "Actor, decision rule, exception."], ["System interact ra sao?", "Sequence diagram", "Có API/event involved.", "System boundary và failure message."], ["Entity có state nào?", "State diagram", "Lifecycle quan trọng.", "Allowed transition và trigger."], ["Rule nào apply?", "Decision table", "Tổ hợp rule quyết định outcome.", "Rule complete và exclusive."]],
      prompt: "Chọn diagram type phù hợp nhất cho requirement này và giải thích vì sao. Sau đó draft Mermaid diagram. Sau diagram, liệt kê missing actor, boundary chưa rõ, exception path và business rule cần validate.",
      mistakes: ["Dùng một diagram type cho mọi problem.", "Để AI vẽ diagram mà không check business meaning.", "Bỏ failure path.", "Tạo diagram đẹp nhưng không giúp decision."],
      tomorrow: ["Chuyển một requirement nhiều text thành Mermaid diagram.", "Nhờ AI chọn diagram type phù hợp.", "Review diagram với developer để tìm boundary gap.", "Thêm exception path trước khi share."],
      remember: ["Diagram là analysis, không phải decoration.", "Diagram tốt nhất làm lộ decision tiếp theo.", "AI vẽ nhanh; BA kiểm tra meaning."]
    }
  },
  {
    slug: "specifying-ai-enabled-features",
    section: "products",
    en: {
      title: "Specifying AI-Enabled Features",
      focus: "AI-enabled features require requirements for data, output quality, uncertainty, user control, and monitoring.",
      outcomes: ["Write requirements for probabilistic AI behavior.", "Specify input, output, confidence, fallback, and evaluation.", "Avoid deterministic acceptance criteria for non-deterministic systems."],
      concept: "AI features do not behave like ordinary deterministic features. The BA must specify what task the model performs, what data it can use, what output contract it must follow, what confidence threshold matters, how users correct it, when humans review it, and how quality is monitored after release.",
      example: "A support triage assistant classifies tickets into billing, technical, and policy categories. The BA specifies training examples, output labels, confidence thresholds, escalation to human review, correction capture, audit record, and evaluation metrics such as precision on high-risk categories.",
      artifactTitle: "AI Feature Specification Canvas",
      artifactHeaders: ["Area", "Requirement question", "Example requirement", "Acceptance signal"],
      artifactRows: [["Model task", "What does AI decide or generate?", "Classify ticket into approved category list.", "Output category is one of defined labels."], ["Input data", "What context is allowed?", "Use ticket text, account tier, and product area.", "No restricted PII included."], ["Uncertainty", "What happens below confidence threshold?", "Below 0.75 route to human triage.", "Low-confidence cases enter review queue."], ["Evaluation", "How is quality measured?", "Precision for billing category >= 90%.", "Evaluation set passes threshold."]],
      prompt: "Specify this AI-enabled feature using: user goal, AI task, allowed inputs, prohibited inputs, output contract, confidence threshold, human review trigger, fallback behavior, user correction, audit needs, safety constraints, evaluation metrics, and monitoring events.",
      mistakes: ["Writing acceptance criteria as if AI output is always deterministic.", "Ignoring low-confidence behavior.", "Not specifying correction and feedback loops.", "Measuring only user satisfaction without output quality metrics."],
      tomorrow: ["Add a confidence threshold question to one AI feature idea.", "Define the output contract before UI design.", "Write one fallback scenario.", "Ask data or engineering what evaluation set is available."],
      remember: ["AI requirements must describe uncertainty.", "Output quality is part of functional behavior.", "Human review and fallback are product features, not afterthoughts."]
    },
    vi: {
      title: "Đặc tả tính năng có AI",
      focus: "AI-enabled feature cần requirement cho data, output quality, uncertainty, user control và monitoring.",
      outcomes: ["Viết requirement cho behavior AI có tính xác suất.", "Đặc tả input, output, confidence, fallback và evaluation.", "Tránh deterministic acceptance criteria cho system non-deterministic."],
      concept: "AI feature không behave như feature deterministic thông thường. BA phải đặc tả model thực hiện task gì, được dùng data nào, output contract ra sao, confidence threshold nào quan trọng, user sửa output thế nào, khi nào human review và quality được monitor sau release ra sao.",
      example: "Support triage assistant phân loại ticket thành billing, technical và policy. BA đặc tả training example, output label, confidence threshold, escalation sang human review, correction capture, audit record và evaluation metric như precision cho high-risk category.",
      artifactTitle: "AI Feature Specification Canvas",
      artifactHeaders: ["Area", "Requirement question", "Example requirement", "Acceptance signal"],
      artifactRows: [["Model task", "AI decide hoặc generate gì?", "Classify ticket theo approved category list.", "Output category nằm trong defined labels."], ["Input data", "Context nào được phép dùng?", "Dùng ticket text, account tier và product area.", "Không include restricted PII."], ["Uncertainty", "Dưới confidence threshold thì sao?", "Below 0.75 route to human triage.", "Low-confidence case vào review queue."], ["Evaluation", "Quality đo thế nào?", "Precision for billing category >= 90%.", "Evaluation set pass threshold."]],
      prompt: "Đặc tả AI-enabled feature này bằng: user goal, AI task, allowed input, prohibited input, output contract, confidence threshold, human review trigger, fallback behavior, user correction, audit need, safety constraint, evaluation metric và monitoring event.",
      mistakes: ["Viết acceptance criteria như thể output AI luôn deterministic.", "Bỏ qua low-confidence behavior.", "Không đặc tả correction và feedback loop.", "Chỉ đo user satisfaction mà thiếu output quality metric."],
      tomorrow: ["Thêm câu hỏi confidence threshold cho một AI feature idea.", "Định nghĩa output contract trước UI design.", "Viết một fallback scenario.", "Hỏi data hoặc engineering evaluation set hiện có."],
      remember: ["AI requirement phải mô tả uncertainty.", "Output quality là một phần functional behavior.", "Human review và fallback là product feature, không phải afterthought."]
    }
  },
  {
    slug: "human-in-the-loop-monitoring-and-fallback",
    section: "products",
    en: {
      title: "Human Review, Monitoring, and Fallback",
      focus: "Responsible AI products need explicit paths for uncertainty, escalation, correction, and quality monitoring.",
      outcomes: ["Design human-in-the-loop workflows.", "Specify fallback and escalation requirements.", "Define monitoring events for AI quality and risk."],
      concept: "Human-in-the-loop is not a vague promise that a person can intervene. It is a designed workflow: trigger conditions, reviewer role, queue, SLA, decision options, user messaging, audit, correction capture, and monitoring. Fallback should be safe, visible, and measurable.",
      example: "An AI loan document checker flags missing documents. If confidence is high, it suggests next action; if confidence is low or document type is regulated, it routes to a reviewer. The BA specifies queue priority, reason codes, reviewer actions, customer message, and audit trail.",
      artifactTitle: "Human-in-the-Loop Flow Requirements",
      artifactHeaders: ["Flow part", "Requirement", "Example", "Metric"],
      artifactRows: [["Trigger", "Define when human review starts.", "Confidence < 0.8 or regulated document.", "Trigger accuracy by case type."], ["Reviewer action", "List allowed decisions.", "Approve, reject, request info, override.", "Review completion SLA."], ["Fallback", "Define safe response when AI cannot answer.", "Show escalation message and create task.", "Fallback resolution time."], ["Monitoring", "Capture quality and drift signals.", "Track overrides by category.", "Override rate trend."]],
      prompt: "Design the human-in-the-loop and fallback requirements. Include triggers, reviewer role, queue priority, SLA, allowed decisions, user messaging, audit record, correction capture, monitoring events, and operational metrics.",
      mistakes: ["Writing 'human can review' without workflow details.", "No SLA for review queues.", "Fallback message hides uncertainty.", "Monitoring only uptime, not AI quality."],
      tomorrow: ["Define one low-confidence trigger.", "Write a fallback message that is honest and useful.", "Add reason codes for human override.", "Ask operations who owns the review queue."],
      remember: ["Human review is a workflow requirement.", "Fallback is part of user experience.", "Monitoring must include quality, not only availability."]
    },
    vi: {
      title: "Human review, monitoring và fallback",
      focus: "Sản phẩm AI có trách nhiệm cần path rõ cho uncertainty, escalation, correction và quality monitoring.",
      outcomes: ["Thiết kế human-in-the-loop workflow.", "Đặc tả fallback và escalation requirement.", "Định nghĩa monitoring event cho AI quality và risk."],
      concept: "Human-in-the-loop không phải lời hứa mơ hồ rằng con người có thể can thiệp. Nó là workflow được thiết kế: trigger condition, reviewer role, queue, SLA, decision option, user messaging, audit, correction capture và monitoring. Fallback phải safe, visible và đo được.",
      example: "AI loan document checker flag missing document. Nếu confidence cao, nó suggest next action; nếu confidence thấp hoặc document type regulated, nó route đến reviewer. BA đặc tả queue priority, reason code, reviewer action, customer message và audit trail.",
      artifactTitle: "Human-in-the-Loop Flow Requirements",
      artifactHeaders: ["Flow part", "Requirement", "Example", "Metric"],
      artifactRows: [["Trigger", "Định nghĩa khi nào human review bắt đầu.", "Confidence < 0.8 hoặc regulated document.", "Trigger accuracy theo case type."], ["Reviewer action", "Liệt kê allowed decision.", "Approve, reject, request info, override.", "Review completion SLA."], ["Fallback", "Định nghĩa safe response khi AI không trả lời được.", "Show escalation message và create task.", "Fallback resolution time."], ["Monitoring", "Capture quality và drift signal.", "Track override theo category.", "Override rate trend."]],
      prompt: "Thiết kế requirement human-in-the-loop và fallback. Bao gồm trigger, reviewer role, queue priority, SLA, allowed decision, user messaging, audit record, correction capture, monitoring event và operational metric.",
      mistakes: ["Viết 'human can review' mà thiếu workflow detail.", "Không có SLA cho review queue.", "Fallback message che giấu uncertainty.", "Monitoring chỉ uptime, không đo AI quality."],
      tomorrow: ["Định nghĩa một low-confidence trigger.", "Viết fallback message trung thực và hữu ích.", "Thêm reason code cho human override.", "Hỏi operations ai own review queue."],
      remember: ["Human review là workflow requirement.", "Fallback là một phần user experience.", "Monitoring phải gồm quality, không chỉ availability."]
    }
  },
  {
    slug: "ai-strategy-governance-and-adoption",
    section: "lead",
    en: {
      title: "AI Strategy, Governance, and Adoption",
      focus: "BA leads should scale AI adoption through use-case selection, risk tiers, quality gates, and operating model, not tool enthusiasm.",
      outcomes: ["Create an AI adoption roadmap for BA teams.", "Define governance controls for AI use in analysis work.", "Measure adoption by quality, cycle time, and risk reduction."],
      concept: "AI adoption fails when it starts with tools instead of operating model. A BA lead should define safe use cases, prohibited data, approved tools, prompt patterns, quality gates, training, review rituals, metrics, and escalation paths. Governance should enable useful work while preventing data leakage and low-quality artifacts.",
      example: "A BA practice wants everyone to use AI. The lead creates risk tiers: low-risk drafting, medium-risk requirement review, high-risk AI product decisions. Each tier has allowed tools, data rules, review gates, and measurement. Adoption becomes managed capability, not random experimentation.",
      artifactTitle: "BA AI Adoption Scorecard",
      artifactHeaders: ["Dimension", "Level 1", "Level 2", "Level 3"],
      artifactRows: [["Use cases", "Ad hoc personal use.", "Approved BA workflows.", "Measured portfolio by value and risk."], ["Governance", "No shared rules.", "Data and review policy defined.", "Risk-tier controls and audit."], ["Quality", "AI output shared directly.", "Peer review for AI-assisted artifacts.", "Quality gates and rubric metrics."], ["Capability", "Individual tips.", "Team prompt library.", "Coaching, playbooks, and communities of practice."]],
      prompt: "Create a BA team AI adoption roadmap. Include use-case portfolio, risk tiers, approved tools, prohibited data, review gates, prompt library, training plan, governance roles, success metrics, rollout phases, and escalation process.",
      mistakes: ["Buying tools before defining safe use cases.", "Ignoring confidential data and PII rules.", "Measuring adoption only by number of users.", "Letting every BA invent their own quality standard."],
      tomorrow: ["Classify BA AI use cases into risk tiers.", "Define one approved workflow and one prohibited use.", "Create a quality gate for AI-assisted requirements.", "Measure cycle time and defect reduction for one pilot."],
      remember: ["Adoption is an operating model.", "Governance should make good AI use easier.", "BA leads scale quality through shared patterns and review gates."]
    },
    vi: {
      title: "AI strategy, governance và adoption",
      focus: "BA lead nên scale AI adoption bằng use-case selection, risk tier, quality gate và operating model, không phải tool enthusiasm.",
      outcomes: ["Tạo AI adoption roadmap cho BA team.", "Định nghĩa governance control cho việc dùng AI trong analysis work.", "Đo adoption bằng quality, cycle time và risk reduction."],
      concept: "AI adoption fail khi bắt đầu bằng tool thay vì operating model. BA lead nên định nghĩa safe use case, prohibited data, approved tool, prompt pattern, quality gate, training, review ritual, metric và escalation path. Governance phải enable work hữu ích đồng thời ngăn data leakage và artifact chất lượng thấp.",
      example: "Một BA practice muốn mọi người dùng AI. Lead tạo risk tier: low-risk drafting, medium-risk requirement review, high-risk AI product decisions. Mỗi tier có allowed tool, data rule, review gate và measurement. Adoption trở thành managed capability, không phải random experimentation.",
      artifactTitle: "BA AI Adoption Scorecard",
      artifactHeaders: ["Dimension", "Level 1", "Level 2", "Level 3"],
      artifactRows: [["Use cases", "Ad hoc personal use.", "Approved BA workflows.", "Measured portfolio theo value và risk."], ["Governance", "Không có shared rule.", "Data và review policy defined.", "Risk-tier control và audit."], ["Quality", "AI output share trực tiếp.", "Peer review cho AI-assisted artifact.", "Quality gate và rubric metric."], ["Capability", "Tip cá nhân.", "Team prompt library.", "Coaching, playbook và community of practice."]],
      prompt: "Tạo BA team AI adoption roadmap. Bao gồm use-case portfolio, risk tier, approved tool, prohibited data, review gate, prompt library, training plan, governance role, success metric, rollout phase và escalation process.",
      mistakes: ["Mua tool trước khi định nghĩa safe use case.", "Bỏ qua confidential data và PII rule.", "Đo adoption chỉ bằng số user.", "Để mỗi BA tự invent quality standard."],
      tomorrow: ["Phân loại BA AI use case theo risk tier.", "Định nghĩa một approved workflow và một prohibited use.", "Tạo quality gate cho AI-assisted requirement.", "Đo cycle time và defect reduction cho một pilot."],
      remember: ["Adoption là operating model.", "Governance nên làm good AI use dễ hơn.", "BA lead scale quality bằng shared pattern và review gate."]
    }
  }
];

const labs = [
  {
    slug: "meeting-transcript-to-requirements",
    enTitle: "Meeting Transcript to Requirements",
    viTitle: "Từ meeting transcript đến requirement",
    enScenario: "You receive a messy discovery call about customer onboarding. The goal is to convert it into requirement candidates without hiding uncertainty.",
    viScenario: "Bạn nhận một discovery call lộn xộn về customer onboarding. Mục tiêu là chuyển nó thành requirement candidate mà không che giấu uncertainty.",
    enInput: "Transcript excerpt: Sales wants instant onboarding. Compliance says KYC must be complete before activation. Support says customers often upload the wrong document. Product wants a self-service status page.",
    viInput: "Transcript excerpt: Sales muốn onboarding tức thì. Compliance nói KYC phải hoàn tất trước activation. Support nói customer thường upload sai document. Product muốn self-service status page.",
    enSteps: ["Create a source map with stakeholder attribution.", "Extract facts, assumptions, contradictions, and decisions needed.", "Draft requirement candidates with evidence.", "Write open questions and assign decision owners."],
    viSteps: ["Tạo source map có stakeholder attribution.", "Extract fact, assumption, contradiction và decision needed.", "Draft requirement candidate có evidence.", "Viết open question và gán decision owner."],
    enDeliverables: ["source map", "requirement candidate table", "contradiction list", "decision log"],
    viDeliverables: ["source map", "bảng requirement candidate", "danh sách contradiction", "decision log"],
    enRubric: ["Every requirement has source evidence.", "Contradictions are not smoothed into false agreement.", "Open questions have owner and next action.", "No unsupported AI inference becomes final scope."],
    viRubric: ["Mỗi requirement có source evidence.", "Contradiction không bị làm mượt thành false agreement.", "Open question có owner và next action.", "Không có unsupported AI inference trở thành final scope."]
  },
  {
    slug: "ambiguous-requirement-review",
    enTitle: "Ambiguous Requirement Review",
    viTitle: "Review requirement mơ hồ",
    enScenario: "A product owner gives you vague requirements before sprint refinement. Your job is to make ambiguity visible and rewrite only what can be supported.",
    viScenario: "Product owner đưa requirement mơ hồ trước sprint refinement. Nhiệm vụ của bạn là làm ambiguity visible và chỉ rewrite phần có thể support.",
    enInput: "Requirement excerpt: The system should notify users quickly when important account changes occur and make it easy for admins to manage exceptions.",
    viInput: "Requirement excerpt: The system should notify users quickly when important account changes occur and make it easy for admins to manage exceptions.",
    enSteps: ["Run the defect taxonomy.", "Classify ambiguity, missing rule, conflict, and non-testable wording.", "Write clarification questions.", "Create a testable rewrite candidate with assumptions labeled."],
    viSteps: ["Chạy defect taxonomy.", "Phân loại ambiguity, missing rule, conflict và non-testable wording.", "Viết clarification question.", "Tạo candidate rewrite test được với assumption được label."],
    enDeliverables: ["defect register", "clarification question list", "rewritten requirement candidates", "severity ranking"],
    viDeliverables: ["defect register", "clarification question list", "candidate requirement rewrite", "severity ranking"],
    enRubric: ["Each issue has a defect type.", "Severity reflects business or delivery risk.", "Rewrites are measurable.", "Assumptions are not hidden."],
    viRubric: ["Mỗi issue có defect type.", "Severity phản ánh business hoặc delivery risk.", "Rewrite đo được.", "Assumption không bị giấu."]
  },
  {
    slug: "stories-and-acceptance-criteria",
    enTitle: "Stories and Acceptance Criteria",
    viTitle: "User story và acceptance criteria",
    enScenario: "A feature idea must become development-ready user stories with acceptance criteria and negative scenarios.",
    viScenario: "Một feature idea cần trở thành user story sẵn sàng cho development với acceptance criteria và negative scenario.",
    enInput: "Feature idea: Premium customers can export reports from the analytics dashboard.",
    viInput: "Feature idea: Premium customers can export reports from analytics dashboard.",
    enSteps: ["Identify actors, goals, and business value.", "Split stories by user goal and permission.", "Draft Given-When-Then criteria.", "Add negative, boundary, audit, and permission cases."],
    viSteps: ["Xác định actor, goal và business value.", "Tách story theo user goal và permission.", "Draft criteria dạng Given-When-Then.", "Thêm negative, boundary, audit và permission case."],
    enDeliverables: ["story map", "user stories", "acceptance criteria", "negative test cases"],
    viDeliverables: ["story map", "user story", "acceptance criteria", "negative test case"],
    enRubric: ["Stories carry business value.", "Acceptance criteria are observable.", "Negative cases are included.", "Permissions and audit are explicit."],
    viRubric: ["Story có business value.", "Acceptance criteria observable.", "Có negative case.", "Permission và audit explicit."]
  },
  {
    slug: "process-and-sequence-diagrams",
    enTitle: "Process and Sequence Diagrams",
    viTitle: "Process và sequence diagram",
    enScenario: "You need to explain an approval flow that crosses user, web app, workflow engine, notification service, and manager review.",
    viScenario: "Bạn cần giải thích approval flow đi qua user, web app, workflow engine, notification service và manager review.",
    enInput: "Process: User submits request. System validates documents. If amount is high, manager approves. User receives result. Missing documents return to user.",
    viInput: "Process: User submit request. System validate document. Nếu amount cao, manager approve. User nhận result. Missing document trả về user.",
    enSteps: ["Draft a process flow.", "Draft a sequence diagram.", "Add exception paths and ownership.", "List missing rules and integration assumptions."],
    viSteps: ["Draft process flow.", "Draft sequence diagram.", "Thêm exception path và ownership.", "Liệt kê missing rule và integration assumption."],
    enDeliverables: ["process flow", "sequence diagram", "exception path list", "ownership notes"],
    viDeliverables: ["process flow", "sequence diagram", "exception path list", "ownership note"],
    enRubric: ["Actors and systems are separated.", "Decision rules are explicit.", "Exceptions are visible.", "Integration boundaries are clear."],
    viRubric: ["Actor và system được tách rõ.", "Decision rule explicit.", "Exception visible.", "Integration boundary rõ."]
  },
  {
    slug: "rag-assistant-requirements",
    enTitle: "RAG Assistant Requirements",
    viTitle: "Requirement cho RAG assistant",
    enScenario: "Your organization wants a policy assistant that answers from internal documents and cites sources.",
    viScenario: "Tổ chức muốn policy assistant trả lời từ tài liệu nội bộ và có citation.",
    enInput: "Sources: HR policy portal, legacy PDF handbook, manager-only procedure, public FAQ. Users: employees and HR advisors.",
    viInput: "Sources: HR policy portal, legacy PDF handbook, manager-only procedure, public FAQ. Users: employee và HR advisor.",
    enSteps: ["Define source authority and freshness.", "Specify access control and citation rules.", "Write fallback behavior for weak evidence.", "Define retrieval and answer-quality evaluation."],
    viSteps: ["Định nghĩa source authority và freshness.", "Đặc tả access control và citation rule.", "Viết fallback behavior cho weak evidence.", "Định nghĩa retrieval và answer-quality evaluation."],
    enDeliverables: ["knowledge contract", "RAG requirement set", "fallback rules", "evaluation plan"],
    viDeliverables: ["knowledge contract", "bộ requirement RAG", "fallback rule", "evaluation plan"],
    enRubric: ["Source priority is defined.", "Access control is testable.", "Fallback avoids invented answers.", "Evaluation covers retrieval and generation."],
    viRubric: ["Source priority được định nghĩa.", "Access control test được.", "Fallback tránh invented answer.", "Evaluation cover retrieval và generation."]
  },
  {
    slug: "ai-adoption-roadmap",
    enTitle: "AI Adoption Roadmap",
    viTitle: "Roadmap adoption AI",
    enScenario: "You are a BA lead planning safe AI adoption for a 20-person BA practice.",
    viScenario: "Bạn là BA lead lập kế hoạch adoption AI an toàn cho BA practice 20 người.",
    enInput: "Current state: some BAs use public AI tools, no shared prompt library, no data policy, managers want productivity gains, compliance worries about confidential data.",
    viInput: "Current state: một số BA dùng public AI tool, chưa có shared prompt library, chưa có data policy, manager muốn tăng productivity, compliance lo confidential data.",
    enSteps: ["Build use-case portfolio by value and risk.", "Define risk tiers and data rules.", "Create training and quality gates.", "Define metrics and rollout phases."],
    viSteps: ["Xây use-case portfolio theo value và risk.", "Định nghĩa risk tier và data rule.", "Tạo training và quality gate.", "Định nghĩa metric và rollout phase."],
    enDeliverables: ["use-case portfolio", "risk-tier policy", "training plan", "governance scorecard"],
    viDeliverables: ["use-case portfolio", "risk-tier policy", "training plan", "governance scorecard"],
    enRubric: ["Risk controls match use-case sensitivity.", "Quality gates are practical.", "Metrics include quality and cycle time.", "Rollout has owners and phases."],
    viRubric: ["Risk control match sensitivity của use case.", "Quality gate thực tế.", "Metric gồm quality và cycle time.", "Rollout có owner và phase."]
  }
];

const capstones = [
  {
    slug: "discovery-to-delivery-ai-ba-pack",
    en: {
      title: "Capstone 1: Discovery to Delivery AI BA Pack",
      summary: "Turn messy stakeholder input into a delivery-ready analysis pack with evidence, decisions, stories, risks, and QA handoff.",
      scenario: "A mid-size operations team wants to modernize its request intake flow. Sales wants faster submission, operations wants fewer manual corrections, compliance wants approval evidence, and engineering needs a scoped first release. The source material is inconsistent and several decisions are still open.",
      role: "You are the senior BA accountable for shaping the first release without letting AI turn assumptions into approved scope.",
      inputs: ["Stakeholder notes from sales, operations, compliance, support, and engineering", "Current-state process fragments", "Draft business goals and success metrics", "Known constraints about roles, audit, data, and timeline", "Three sample request tickets with exception cases"],
      tasks: ["Create a source map and classify facts, assumptions, conflicts, and decisions needed.", "Draft current-state and target-state process diagrams with exception paths.", "Split first-release scope into epics, user stories, and acceptance criteria.", "Create a traceability matrix from business goal to story, rule, evidence, and test scenario.", "Prepare a decision log and workshop agenda for unresolved items.", "Run an AI-output review and mark unsupported claims before sharing."],
      deliverables: [["Evidence-backed discovery synthesis", "Source map, themes, conflicts, decisions needed, and assumptions", "Protects the project from false consensus"], ["Process and exception model", "Current-state, target-state, decision points, exception loops, and handoffs", "Shows the actual operational complexity"], ["Release-ready backlog pack", "Epics, stories, acceptance criteria, NFRs, and negative scenarios", "Gives delivery teams testable work"], ["Traceability and QA handoff", "Goal-to-requirement-to-test map with owners", "Connects BA work to release readiness"]],
      rubric: [["Evidence discipline", "Every material claim has a source, owner, or validation question."], ["Delivery readiness", "Stories are estimable, testable, and tied to business value."], ["Risk handling", "Compliance, audit, NFR, and exception risks are visible before sprint commitment."], ["AI control", "AI output is used as draft analysis, not as an approval mechanism."]],
      prompt: "Act as my senior BA reviewer. Given the project source pack, create a delivery-ready AI BA pack. Start by asking for missing evidence. Then produce source map, fact-assumption-conflict table, current-state flow, target-state flow, release scope, user stories, acceptance criteria, traceability matrix, decision log, and QA handoff. Mark unsupported claims and stakeholder decisions separately."
    },
    vi: {
      title: "Capstone 1: Discovery đến delivery AI BA pack",
      summary: "Chuyển input stakeholder lộn xộn thành analysis pack sẵn sàng delivery có evidence, decision, story, risk và QA handoff.",
      scenario: "Một team operations muốn modernize request intake flow. Sales muốn submit nhanh hơn, operations muốn giảm manual correction, compliance cần approval evidence, engineering cần scope rõ cho first release. Source material không nhất quán và nhiều decision còn mở.",
      role: "Bạn là senior BA chịu trách nhiệm shape first release mà không để AI biến assumption thành scope đã approved.",
      inputs: ["Stakeholder notes từ sales, operations, compliance, support và engineering", "Current-state process fragment", "Draft business goal và success metric", "Constraint đã biết về role, audit, data và timeline", "Ba sample request ticket có exception case"],
      tasks: ["Tạo source map và classify fact, assumption, conflict, decision needed.", "Draft current-state và target-state process diagram có exception path.", "Split first-release scope thành epic, user story và acceptance criteria.", "Tạo traceability matrix từ business goal tới story, rule, evidence và test scenario.", "Chuẩn bị decision log và workshop agenda cho unresolved item.", "Review output AI và mark unsupported claim trước khi share."],
      deliverables: [["Evidence-backed discovery synthesis", "Source map, theme, conflict, decision needed và assumption", "Bảo vệ project khỏi false consensus"], ["Process and exception model", "Current-state, target-state, decision point, exception loop và handoff", "Cho thấy operational complexity thật"], ["Release-ready backlog pack", "Epic, story, acceptance criteria, NFR và negative scenario", "Giúp delivery team có work test được"], ["Traceability and QA handoff", "Map goal-to-requirement-to-test có owner", "Kết nối BA work với release readiness"]],
      rubric: [["Evidence discipline", "Mọi claim quan trọng có source, owner hoặc validation question."], ["Delivery readiness", "Story estimate/test được và gắn business value."], ["Risk handling", "Compliance, audit, NFR và exception risk visible trước sprint commitment."], ["AI control", "Output AI được dùng như draft analysis, không phải approval mechanism."]],
      prompt: "Hãy đóng vai senior BA reviewer. Dựa trên project source pack, tạo delivery-ready AI BA pack. Bắt đầu bằng cách hỏi missing evidence. Sau đó tạo source map, bảng fact-assumption-conflict, current-state flow, target-state flow, release scope, user story, acceptance criteria, traceability matrix, decision log và QA handoff. Tách unsupported claim và stakeholder decision."
    }
  },
  {
    slug: "frontend-backend-contract-readiness",
    en: {
      title: "Capstone 2: Frontend to Backend Contract Readiness",
      summary: "Translate a UI concept into screen behavior, API contract, data rules, error states, analytics, and test coverage.",
      scenario: "A customer portal adds a reporting screen with filters, saved views, export, permissions, and partial data from three backend services. The Figma file shows the happy path but does not define loading, empty, error, partial failure, RBAC, analytics, or API edge cases.",
      role: "You are the BA connecting UX intent, frontend behavior, backend contract, QA scenarios, and stakeholder decisions.",
      inputs: ["Figma screen or wireframe notes", "User roles and permission rules", "Draft API descriptions", "Sample response payloads", "Reporting metrics and business definitions", "Known browser, mobile, and accessibility expectations"],
      tasks: ["Create a screen-state behavior matrix for loading, empty, error, permission, partial data, and success states.", "Define field-level rules, filter behavior, sorting, pagination, export, and saved-view logic.", "Draft API contract requirements with request, response, validation, error codes, timeout, retry, and idempotency notes.", "Map UI controls to backend permissions and audit needs.", "Write analytics event requirements and QA test scenarios.", "Identify design, product, frontend, backend, data, and QA decisions still needed."],
      deliverables: [["Screen-state matrix", "State, trigger, UI behavior, copy, action availability, and owner", "Prevents hidden frontend requirements"], ["API contract requirement pack", "Endpoint, schema, validation, errors, timeouts, retries, and examples", "Gives backend and frontend a shared contract"], ["Permission and audit trace map", "Role, control, API permission, audit event, and denial behavior", "Avoids UI-only security assumptions"], ["QA and analytics handoff", "Test scenarios, event names, payload rules, and acceptance signals", "Makes release behavior measurable"]],
      rubric: [["UI completeness", "Non-happy-path screen states are fully specified."], ["Contract clarity", "Frontend and backend teams can build independently from the same behavior agreement."], ["Security and audit", "Visibility, authorization, and audit behavior are aligned."], ["Measurement", "Analytics and QA expectations prove whether the feature works after release."]],
      prompt: "Act as a senior BA for a frontend-backend refinement workshop. From the supplied UI concept and API notes, create screen-state matrix, field behavior rules, API contract requirements, permission trace map, error taxonomy, analytics events, QA scenarios, open decisions, and acceptance criteria. Flag any assumption that needs UX, product, backend, security, or QA confirmation."
    },
    vi: {
      title: "Capstone 2: Frontend đến backend contract readiness",
      summary: "Chuyển UI concept thành screen behavior, API contract, data rule, error state, analytics và test coverage.",
      scenario: "Customer portal thêm reporting screen có filter, saved view, export, permission và partial data từ ba backend service. Figma chỉ thể hiện happy path, chưa define loading, empty, error, partial failure, RBAC, analytics hoặc API edge case.",
      role: "Bạn là BA kết nối UX intent, frontend behavior, backend contract, QA scenario và stakeholder decision.",
      inputs: ["Figma screen hoặc wireframe note", "User role và permission rule", "Draft API description", "Sample response payload", "Reporting metric và business definition", "Expectation về browser, mobile và accessibility"],
      tasks: ["Tạo screen-state behavior matrix cho loading, empty, error, permission, partial data và success state.", "Define field-level rule, filter behavior, sorting, pagination, export và saved-view logic.", "Draft API contract requirement có request, response, validation, error code, timeout, retry và idempotency note.", "Map UI control tới backend permission và audit need.", "Viết analytics event requirement và QA test scenario.", "Identify decision còn cần từ design, product, frontend, backend, data và QA."],
      deliverables: [["Screen-state matrix", "State, trigger, UI behavior, copy, action availability và owner", "Tránh frontend requirement bị ẩn"], ["API contract requirement pack", "Endpoint, schema, validation, error, timeout, retry và example", "Tạo shared contract cho backend và frontend"], ["Permission and audit trace map", "Role, control, API permission, audit event và denial behavior", "Tránh assumption security chỉ nằm ở UI"], ["QA and analytics handoff", "Test scenario, event name, payload rule và acceptance signal", "Giúp release behavior đo được"]],
      rubric: [["UI completeness", "Non-happy-path screen state được đặc tả đầy đủ."], ["Contract clarity", "Frontend và backend có thể build từ cùng behavior agreement."], ["Security and audit", "Visibility, authorization và audit behavior được align."], ["Measurement", "Analytics và QA expectation chứng minh feature hoạt động sau release."]],
      prompt: "Hãy đóng vai senior BA cho workshop refinement frontend-backend. Từ UI concept và API note, tạo screen-state matrix, field behavior rule, API contract requirement, permission trace map, error taxonomy, analytics event, QA scenario, open decision và acceptance criteria. Flag mọi assumption cần UX, product, backend, security hoặc QA confirm."
    }
  },
  {
    slug: "ai-assistant-requirement-and-governance",
    en: {
      title: "Capstone 3: AI Assistant Requirement and Governance",
      summary: "Specify an AI assistant from user goal to RAG knowledge contract, human review, safety controls, evaluation, and operating model.",
      scenario: "A support organization wants an AI assistant that drafts ticket replies using product documentation, policy articles, and historical tickets. The business wants faster response time, but legal worries about incorrect advice, support leads worry about tone, and engineering needs clear retrieval, logging, and fallback requirements.",
      role: "You are the AI-aware BA defining an assistant that is useful, governable, measurable, and safe enough for pilot release.",
      inputs: ["Target user journeys and support personas", "Knowledge source inventory", "Sample tickets and approved replies", "Data sensitivity and PII policy", "Support QA scorecard", "Operational escalation and review rules"],
      tasks: ["Classify the AI pattern and explain why RAG plus human review fits the scenario.", "Define source authority, freshness, chunking assumptions, citation behavior, access control, and conflict handling.", "Specify output contract, confidence behavior, refusal/fallback, human review trigger, correction capture, and audit log requirements.", "Create evaluation set design, answer-quality rubric, monitoring metrics, and pilot release gates.", "Write acceptance criteria for prompt injection, unsafe input, bias/fairness, privacy, and cost guardrails.", "Prepare stakeholder decision memo with risks, controls, and pilot scope."],
      deliverables: [["AI feature operating contract", "Task boundary, allowed inputs, output contract, confidence, fallback, and human review", "Prevents uncontrolled AI behavior"], ["RAG knowledge contract", "Source inventory, authority, freshness, access, citations, conflict handling, and retrieval metrics", "Defines what the assistant can trust"], ["Evaluation and monitoring plan", "Test set, rubric, telemetry, correction capture, alerts, and release gates", "Makes quality measurable before and after release"], ["Governance decision memo", "Pilot scope, risk tier, controls, owners, and unresolved decisions", "Gives sponsors a responsible go/no-go artifact"]],
      rubric: [["AI fit", "The selected AI pattern is justified against business outcome and risk."], ["Safety", "Human review, fallback, privacy, access, and injection controls are testable."], ["Evaluation", "The pilot has measurable quality, failure, and monitoring criteria."], ["Operating model", "Owners, review gates, escalation, and post-release learning are defined."]],
      prompt: "Act as an expert AI product BA. Help me specify this support AI assistant. Create AI pattern fit, RAG knowledge contract, output contract, human review and fallback rules, privacy and prompt-injection requirements, evaluation set design, quality rubric, telemetry plan, pilot release gates, decision memo, and stakeholder questions. Separate facts, assumptions, unsupported claims, and decisions needed."
    },
    vi: {
      title: "Capstone 3: Requirement và governance cho AI assistant",
      summary: "Đặc tả AI assistant từ user goal tới RAG knowledge contract, human review, safety control, evaluation và operating model.",
      scenario: "Support organization muốn AI assistant draft ticket reply dựa trên product documentation, policy article và historical ticket. Business muốn response nhanh hơn, legal lo advice sai, support lead lo tone, engineering cần requirement rõ về retrieval, logging và fallback.",
      role: "Bạn là BA hiểu AI, chịu trách nhiệm define assistant hữu ích, govern được, đo được và đủ an toàn cho pilot release.",
      inputs: ["Target user journey và support persona", "Knowledge source inventory", "Sample ticket và approved reply", "Data sensitivity và PII policy", "Support QA scorecard", "Operational escalation và review rule"],
      tasks: ["Classify AI pattern và giải thích vì sao RAG + human review phù hợp.", "Define source authority, freshness, chunking assumption, citation behavior, access control và conflict handling.", "Specify output contract, confidence behavior, refusal/fallback, human review trigger, correction capture và audit log requirement.", "Tạo evaluation set design, answer-quality rubric, monitoring metric và pilot release gate.", "Viết acceptance criteria cho prompt injection, unsafe input, bias/fairness, privacy và cost guardrail.", "Chuẩn bị stakeholder decision memo có risk, control và pilot scope."],
      deliverables: [["AI feature operating contract", "Task boundary, allowed input, output contract, confidence, fallback và human review", "Ngăn AI behavior không kiểm soát"], ["RAG knowledge contract", "Source inventory, authority, freshness, access, citation, conflict handling và retrieval metric", "Định nghĩa assistant được phép tin gì"], ["Evaluation and monitoring plan", "Test set, rubric, telemetry, correction capture, alert và release gate", "Làm quality đo được trước và sau release"], ["Governance decision memo", "Pilot scope, risk tier, control, owner và unresolved decision", "Cho sponsor artifact go/no-go có trách nhiệm"]],
      rubric: [["AI fit", "AI pattern được justify theo business outcome và risk."], ["Safety", "Human review, fallback, privacy, access và injection control test được."], ["Evaluation", "Pilot có quality, failure và monitoring criteria đo được."], ["Operating model", "Owner, review gate, escalation và post-release learning được define."]],
      prompt: "Hãy đóng vai expert AI product BA. Hỗ trợ đặc tả support AI assistant này. Tạo AI pattern fit, RAG knowledge contract, output contract, human review và fallback rule, privacy và prompt-injection requirement, evaluation set design, quality rubric, telemetry plan, pilot release gate, decision memo và stakeholder question. Tách fact, assumption, unsupported claim và decision needed."
    }
  }
];

const useCases = [
  {
    slug: "stakeholder-discovery-from-messy-notes",
    group: "Discovery and alignment",
    domain: "Cross-functional product discovery",
    en: {
      title: "Stakeholder Discovery From Messy Notes",
      project: "A product team starts a customer onboarding improvement project after several fragmented meetings with sales, support, compliance, and operations. Notes are incomplete, stakeholders contradict each other, and the BA must prepare a discovery summary before the next workshop.",
      challenge: "The BA must preserve nuance while turning raw notes into themes, confirmed facts, conflicts, decisions needed, and requirement candidates. The hard part is avoiding false consensus: sales wants instant activation, compliance requires KYC completion, and support needs clearer document guidance.",
      aiUse: ["Cluster notes into themes without removing speaker attribution.", "Extract facts, assumptions, contradictions, and implied requirements.", "Generate stakeholder-specific validation questions.", "Prepare a decision-focused workshop agenda."],
      inputs: ["Meeting notes and transcripts", "Stakeholder role list", "Existing process notes", "Known business goals", "Open questions from prior workshops"],
      workflow: ["Create a source map with stakeholder names and meeting dates.", "Ask AI to classify each note as fact, opinion, assumption, pain point, requirement candidate, or conflict.", "Review the AI output and restore any missing speaker attribution.", "Convert conflicts into decision questions with named decision owners.", "Draft a workshop agenda that starts with decisions, not topics.", "Publish a synthesis pack with evidence labels and unresolved assumptions."],
      deliverables: [["Discovery synthesis pack", "Themes, facts, contradictions, assumptions, and quotes with source IDs", "BA", "Every finding has stakeholder attribution"], ["Decision backlog", "Questions that require business decisions before requirements can be finalized", "Product owner", "Each decision has owner and target date"], ["Workshop agenda", "Prioritized validation questions grouped by risk", "BA", "Agenda focuses on conflicts and decision gaps"], ["Requirement candidates", "Early requirement statements with evidence and assumptions", "BA", "No candidate is marked final without validation"]],
      risks: [["False consensus", "AI may merge conflicting statements into one clean narrative", "Require speaker attribution and a contradiction table"], ["Unsupported requirement", "AI may infer scope that no stakeholder approved", "Mark every inference as assumption to validate"], ["Stakeholder politics", "Minority concerns may disappear in summaries", "Track source role and decision authority"], ["Workshop drift", "Discussion may focus on easy topics", "Rank questions by risk and dependency"]],
      metric: "The next workshop resolves the highest-risk conflicts and produces named owners for every open decision."
    },
    vi: {
      title: "Discovery stakeholder từ notes lộn xộn",
      project: "Product team bắt đầu dự án cải thiện customer onboarding sau nhiều buổi họp rời rạc với sales, support, compliance và operations. Notes thiếu, stakeholder nói mâu thuẫn, và BA phải chuẩn bị discovery summary trước workshop tiếp theo.",
      challenge: "BA phải giữ nuance nhưng vẫn biến raw notes thành theme, confirmed fact, conflict, decision needed và requirement candidate. Phần khó là tránh false consensus: sales muốn activation tức thì, compliance yêu cầu KYC hoàn tất, support cần hướng dẫn upload document rõ hơn.",
      aiUse: ["Cluster notes thành theme nhưng không xóa speaker attribution.", "Extract fact, assumption, contradiction và implied requirement.", "Sinh câu hỏi validation riêng theo từng stakeholder.", "Chuẩn bị workshop agenda tập trung vào decision."],
      inputs: ["Meeting notes và transcript", "Danh sách stakeholder role", "Current process notes", "Business goal đã biết", "Open question từ workshop trước"],
      workflow: ["Tạo source map với tên stakeholder và ngày họp.", "Yêu cầu AI classify từng note thành fact, opinion, assumption, pain point, requirement candidate hoặc conflict.", "Review output AI và khôi phục speaker attribution nếu bị mất.", "Chuyển conflict thành decision question có decision owner.", "Draft workshop agenda bắt đầu bằng decision, không chỉ topic.", "Publish synthesis pack có evidence label và unresolved assumption."],
      deliverables: [["Discovery synthesis pack", "Theme, fact, contradiction, assumption và quote có source ID", "BA", "Mỗi finding có stakeholder attribution"], ["Decision backlog", "Câu hỏi cần business decision trước khi final requirement", "Product owner", "Mỗi decision có owner và target date"], ["Workshop agenda", "Validation question được ưu tiên theo risk", "BA", "Agenda tập trung vào conflict và decision gap"], ["Requirement candidates", "Requirement statement ban đầu có evidence và assumption", "BA", "Không candidate nào là final nếu chưa validation"]],
      risks: [["False consensus", "AI có thể merge statement conflict thành narrative sạch", "Bắt buộc có speaker attribution và contradiction table"], ["Unsupported requirement", "AI có thể infer scope chưa ai approve", "Mark mọi inference là assumption cần validate"], ["Stakeholder politics", "Concern ít người nói có thể biến mất trong summary", "Track source role và decision authority"], ["Workshop drift", "Thảo luận có thể đi vào topic dễ", "Rank question theo risk và dependency"]],
      metric: "Workshop tiếp theo resolve được conflict rủi ro cao nhất và có owner cho mọi open decision."
    }
  },
  {
    slug: "project-kickoff-scope-framing",
    group: "Discovery and alignment",
    domain: "Project initiation",
    en: {
      title: "Project Kickoff Scope Framing",
      project: "A new internal platform project starts with a broad mandate: modernize the request intake experience. Executives expect quick progress, delivery teams need scope boundaries, and operations worries that existing manual exceptions will be ignored.",
      challenge: "The BA must convert a vague mandate into a shared problem statement, measurable outcomes, scope in, scope out, assumptions, dependencies, and first-release decision criteria. AI can help draft structure, but the BA must stop it from inventing strategy.",
      aiUse: ["Generate a scope framing canvas from raw kickoff notes.", "Identify missing stakeholders, dependencies, and decision rights.", "Draft measurable outcomes and anti-goals for discussion.", "Create a risk-ranked assumption backlog."],
      inputs: ["Kickoff notes", "Executive goals", "Current pain points", "Known constraints", "Initial roadmap or budget window"],
      workflow: ["Summarize the mandate into business outcomes and user outcomes.", "Ask AI to propose scope boundaries and mark assumptions.", "Review each boundary with product, operations, technology, and compliance owners.", "Translate fuzzy goals into measurable success indicators.", "Create a decision log for items that cannot be settled in kickoff.", "Publish a one-page scope framing artifact before solution design starts."],
      deliverables: [["Scope framing canvas", "Problem statement, outcomes, scope in, scope out, assumptions, and constraints", "BA", "Stakeholders can tell what is not included"], ["Outcome metric table", "Business metric, baseline, target, owner, and measurement source", "Product owner", "At least one metric is measurable before build"], ["Assumption backlog", "Unvalidated assumptions ranked by risk and dependency", "BA", "High-risk assumptions have validation actions"], ["Decision log", "Open decisions, options, impacts, owner, and due date", "Sponsor", "No major scope item lacks owner"]],
      risks: [["Mandate becomes solution", "The team may jump to features before agreeing on outcomes", "Separate problem, outcome, and solution sections"], ["Scope creep", "Everything related to intake may be pulled into release one", "Define scope out and anti-goals explicitly"], ["Metric theater", "Success measures may sound good but cannot be measured", "Name baseline and data source for every metric"], ["Hidden dependency", "Manual exception processes may block launch", "Use AI to ask dependency discovery questions"]],
      metric: "The project kickoff produces a signed scope frame that delivery, product, and operations can use for prioritization."
    },
    vi: {
      title: "Framing scope cho project kickoff",
      project: "Một dự án internal platform bắt đầu với mandate rất rộng: hiện đại hóa trải nghiệm request intake. Executive muốn tiến độ nhanh, delivery team cần boundary rõ, operations lo các manual exception hiện tại bị bỏ qua.",
      challenge: "BA phải chuyển mandate mơ hồ thành problem statement chung, outcome đo được, scope in, scope out, assumption, dependency và decision criteria cho release đầu. AI có thể giúp draft structure, nhưng BA phải ngăn AI tự bịa strategy.",
      aiUse: ["Tạo scope framing canvas từ kickoff notes.", "Identify missing stakeholder, dependency và decision right.", "Draft measurable outcome và anti-goal để thảo luận.", "Tạo assumption backlog được rank theo risk."],
      inputs: ["Kickoff notes", "Executive goals", "Pain point hiện tại", "Known constraints", "Roadmap hoặc budget window ban đầu"],
      workflow: ["Summarize mandate thành business outcome và user outcome.", "Yêu cầu AI đề xuất scope boundary và mark assumption.", "Review từng boundary với owner product, operations, technology và compliance.", "Chuyển goal mơ hồ thành success indicator đo được.", "Tạo decision log cho item chưa thể chốt trong kickoff.", "Publish scope framing artifact một trang trước khi solution design bắt đầu."],
      deliverables: [["Scope framing canvas", "Problem statement, outcome, scope in, scope out, assumption và constraint", "BA", "Stakeholder hiểu rõ phần không included"], ["Outcome metric table", "Business metric, baseline, target, owner và measurement source", "Product owner", "Ít nhất một metric đo được trước build"], ["Assumption backlog", "Assumption chưa validate được rank theo risk và dependency", "BA", "High-risk assumption có validation action"], ["Decision log", "Open decision, option, impact, owner và due date", "Sponsor", "Không major scope item nào thiếu owner"]],
      risks: [["Mandate biến thành solution", "Team có thể nhảy vào feature trước khi thống nhất outcome", "Tách problem, outcome và solution section"], ["Scope creep", "Mọi thứ liên quan intake có thể bị kéo vào release one", "Định nghĩa scope out và anti-goal explicit"], ["Metric theater", "Success measure nghe hay nhưng không đo được", "Ghi baseline và data source cho từng metric"], ["Hidden dependency", "Manual exception process có thể block launch", "Dùng AI để sinh dependency discovery question"]],
      metric: "Kickoff tạo được scope frame đã agreed để delivery, product và operations dùng cho prioritization."
    }
  },
  {
    slug: "current-state-process-mapping",
    group: "Discovery and alignment",
    domain: "Operations analysis",
    en: {
      title: "Current-State Process Mapping",
      project: "An operations team wants to reduce request turnaround time, but the current process lives across emails, spreadsheets, ticket comments, and tribal knowledge. Different teams describe the same process differently.",
      challenge: "The BA must build a current-state process that shows actors, systems, decisions, queues, exception paths, handoffs, and pain points. AI can transform text into draft diagrams, but the BA must validate operational reality with people doing the work.",
      aiUse: ["Extract process steps from interviews and SOPs.", "Generate candidate flowcharts and swimlane diagrams.", "Identify missing decision rules and exception paths.", "Compare process descriptions across stakeholder groups."],
      inputs: ["SOPs", "Interview notes", "Ticket samples", "Spreadsheet trackers", "System screenshots"],
      workflow: ["Create source IDs for every process description.", "Ask AI to list steps, actors, systems, decisions, inputs, outputs, and exceptions.", "Generate a draft flowchart and swimlane view.", "Review the diagram with frontline users and mark corrections.", "Separate current-state facts from improvement ideas.", "Publish a validated process map with pain points and rule gaps."],
      deliverables: [["Current-state process map", "Steps, decisions, actors, systems, queues, and exception paths", "BA", "Frontline users confirm it matches reality"], ["Rule gap register", "Missing thresholds, approval rules, routing rules, and ownership gaps", "Operations owner", "Every gap has owner and next action"], ["Pain point heatmap", "Delay, rework, handoff, and user-friction points", "BA", "Pain points are linked to process steps"], ["Future-state questions", "Questions needed before redesign", "Product owner", "Questions are prioritized by impact"]],
      risks: [["Idealized process", "Stakeholders may describe policy rather than actual work", "Use ticket samples and frontline validation"], ["Exception blindness", "Rare cases can drive most effort", "Ask AI for exception categories and validate volume"], ["Diagram overconfidence", "A neat diagram may hide uncertainty", "Label unvalidated steps and assumptions"], ["Solution bias", "Improvement ideas may mix with current-state facts", "Separate current-state and future-state artifacts"]],
      metric: "The validated process map identifies delay points and decision gaps that can be prioritized for redesign."
    },
    vi: {
      title: "Mapping current-state process",
      project: "Operations team muốn giảm turnaround time của request, nhưng current process nằm rải rác trong email, spreadsheet, ticket comment và tribal knowledge. Các team mô tả cùng một process theo cách khác nhau.",
      challenge: "BA phải xây current-state process thể hiện actor, system, decision, queue, exception path, handoff và pain point. AI có thể biến text thành diagram draft, nhưng BA phải validate operational reality với người làm việc thật.",
      aiUse: ["Extract process step từ interview và SOP.", "Generate candidate flowchart và swimlane diagram.", "Identify missing decision rule và exception path.", "So sánh mô tả process giữa các stakeholder group."],
      inputs: ["SOP", "Interview notes", "Ticket sample", "Spreadsheet tracker", "System screenshot"],
      workflow: ["Tạo source ID cho mọi process description.", "Yêu cầu AI list step, actor, system, decision, input, output và exception.", "Generate draft flowchart và swimlane view.", "Review diagram với frontline user và mark correction.", "Tách current-state fact khỏi improvement idea.", "Publish process map đã validate kèm pain point và rule gap."],
      deliverables: [["Current-state process map", "Step, decision, actor, system, queue và exception path", "BA", "Frontline user confirm đúng reality"], ["Rule gap register", "Threshold, approval rule, routing rule và ownership gap còn thiếu", "Operations owner", "Mỗi gap có owner và next action"], ["Pain point heatmap", "Delay, rework, handoff và user-friction point", "BA", "Pain point link tới process step"], ["Future-state questions", "Question cần có trước redesign", "Product owner", "Question prioritized theo impact"]],
      risks: [["Idealized process", "Stakeholder có thể mô tả policy thay vì actual work", "Dùng ticket sample và frontline validation"], ["Exception blindness", "Case hiếm có thể tạo nhiều effort nhất", "Yêu cầu AI đề xuất exception category và validate volume"], ["Diagram overconfidence", "Diagram gọn có thể che uncertainty", "Label step và assumption chưa validate"], ["Solution bias", "Improvement idea có thể lẫn với current-state fact", "Tách current-state và future-state artifact"]],
      metric: "Process map đã validate chỉ ra delay point và decision gap để ưu tiên redesign."
    }
  },
  {
    slug: "legacy-modernization-gap-analysis",
    group: "Discovery and alignment",
    domain: "Legacy system modernization",
    en: {
      title: "Legacy Modernization Gap Analysis",
      project: "A company replaces a legacy back-office system with a modern web platform. The legacy system has undocumented rules, batch jobs, manual overrides, and reports that business users still depend on.",
      challenge: "The BA must discover functional gaps between current behavior and target capability without blindly cloning the legacy system. AI can mine documents and transcripts, but the BA must distinguish business-critical rules from obsolete workaround behavior.",
      aiUse: ["Compare legacy feature lists with target epics.", "Extract hidden rules from SOPs and user interviews.", "Classify gaps as must-keep, redesign, retire, or investigate.", "Generate migration questions for business and technical owners."],
      inputs: ["Legacy screen inventory", "SOPs and user guides", "Report list", "Target-state epics", "Interview transcripts"],
      workflow: ["Create a capability map for current and target systems.", "Ask AI to identify missing rules, reports, roles, and integrations.", "Classify each gap by business impact and modernization intent.", "Validate must-keep rules with process owners.", "Mark obsolete workarounds separately from real requirements.", "Produce a gap decision board for scope and migration planning."],
      deliverables: [["Gap analysis matrix", "Current behavior, target behavior, gap type, impact, and decision", "BA", "Every high-impact gap has disposition"], ["Rule inventory", "Hidden business rules and source evidence", "BA", "Rules have owner and validation status"], ["Report dependency list", "Reports, consumers, purpose, and replacement path", "Product owner", "Critical reports have migration plan"], ["Modernization decision board", "Keep, redesign, retire, investigate decisions", "Sponsor", "Decisions are approved before build"]],
      risks: [["Legacy cloning", "The team may rebuild obsolete workarounds", "Classify each behavior by business value and current relevance"], ["Rule loss", "Undocumented rules may disappear during migration", "Extract rules from SOPs, tickets, and interviews"], ["Report surprise", "Users may rely on reports not listed in scope", "Inventory reports and consumers early"], ["Decision delay", "Unclear gaps can block sprint planning", "Use decision board with owner and due date"]],
      metric: "Migration scope separates must-keep behavior from redesign and retire decisions with evidence."
    },
    vi: {
      title: "Gap analysis cho legacy modernization",
      project: "Công ty thay thế hệ thống back-office legacy bằng web platform hiện đại. Legacy system có rule không document, batch job, manual override và report mà business user vẫn phụ thuộc.",
      challenge: "BA phải phát hiện functional gap giữa current behavior và target capability mà không clone legacy một cách mù quáng. AI có thể mine document và transcript, nhưng BA phải tách business-critical rule khỏi workaround đã lỗi thời.",
      aiUse: ["So sánh legacy feature list với target epic.", "Extract hidden rule từ SOP và user interview.", "Classify gap thành must-keep, redesign, retire hoặc investigate.", "Generate migration question cho business và technical owner."],
      inputs: ["Legacy screen inventory", "SOP và user guide", "Report list", "Target-state epic", "Interview transcript"],
      workflow: ["Tạo capability map cho current và target system.", "Yêu cầu AI identify missing rule, report, role và integration.", "Classify từng gap theo business impact và modernization intent.", "Validate must-keep rule với process owner.", "Mark obsolete workaround riêng khỏi real requirement.", "Produce gap decision board cho scope và migration planning."],
      deliverables: [["Gap analysis matrix", "Current behavior, target behavior, gap type, impact và decision", "BA", "Mọi high-impact gap có disposition"], ["Rule inventory", "Hidden business rule và source evidence", "BA", "Rule có owner và validation status"], ["Report dependency list", "Report, consumer, purpose và replacement path", "Product owner", "Critical report có migration plan"], ["Modernization decision board", "Keep, redesign, retire, investigate decision", "Sponsor", "Decision approved trước build"]],
      risks: [["Legacy cloning", "Team có thể rebuild workaround đã obsolete", "Classify từng behavior theo business value và current relevance"], ["Rule loss", "Rule không document có thể biến mất khi migration", "Extract rule từ SOP, ticket và interview"], ["Report surprise", "User có thể phụ thuộc report không nằm trong scope", "Inventory report và consumer sớm"], ["Decision delay", "Gap chưa rõ có thể block sprint planning", "Dùng decision board có owner và due date"]],
      metric: "Migration scope tách rõ behavior phải giữ, redesign và retire dựa trên evidence."
    }
  },
  {
    slug: "market-competitor-research-synthesis",
    group: "Discovery and alignment",
    domain: "Product strategy",
    en: {
      title: "Market and Competitor Research Synthesis",
      project: "A SaaS team explores whether to add workflow automation features. Product leadership collects competitor pages, analyst reports, customer feedback, and sales notes, then asks the BA to synthesize implications for the roadmap.",
      challenge: "The BA must turn broad market signals into product-relevant hypotheses, capability themes, customer segments, differentiation options, and validation questions. AI can summarize sources quickly, but it can also blur evidence quality and overstate weak market claims.",
      aiUse: ["Summarize competitor capabilities by source.", "Cluster customer pains and market claims into capability themes.", "Separate observed evidence from analyst opinion and sales anecdote.", "Generate roadmap hypotheses and validation experiments."],
      inputs: ["Competitor pages", "Analyst notes", "Win-loss notes", "Customer feedback", "Current product capability map"],
      workflow: ["Create a source inventory with evidence type and freshness.", "Ask AI to summarize each source separately before synthesis.", "Cluster capabilities by user problem, not competitor feature name.", "Map themes to current product gaps and strategic options.", "Identify claims that require customer validation.", "Produce a decision memo for roadmap discussion."],
      deliverables: [["Research synthesis memo", "Themes, evidence strength, sources, and product implications", "BA", "Each claim is tied to source type"], ["Capability comparison", "Competitor capability, user problem, current product support, and gap", "Product manager", "Comparison avoids feature-name copying"], ["Hypothesis backlog", "Roadmap hypotheses, evidence needed, and validation method", "Product owner", "High-value hypotheses have experiment plan"], ["Decision memo", "Options, trade-offs, risks, and recommendation", "Product leadership", "Recommendation separates evidence from assumption"]],
      risks: [["Source overreach", "AI may treat marketing copy as proven capability", "Label source type and evidence strength"], ["Copycat roadmap", "Team may copy competitor features without user problem fit", "Map every theme to target segment and user outcome"], ["Confirmation bias", "Leadership may prefer evidence supporting an existing idea", "Include disconfirming signals and open risks"], ["Stale research", "Competitor pages and reports change quickly", "Record source date and freshness confidence"]],
      metric: "Roadmap discussion uses validated hypotheses and evidence strength instead of generic competitor feature lists."
    },
    vi: {
      title: "Synthesis market và competitor research",
      project: "Một SaaS team cân nhắc thêm workflow automation feature. Product leadership gom competitor page, analyst report, customer feedback và sales note, rồi yêu cầu BA synthesize implication cho roadmap.",
      challenge: "BA phải biến market signal rộng thành product-relevant hypothesis, capability theme, customer segment, differentiation option và validation question. AI summarize source nhanh, nhưng cũng có thể làm mờ evidence quality và overstate market claim yếu.",
      aiUse: ["Summarize competitor capability theo source.", "Cluster customer pain và market claim thành capability theme.", "Tách observed evidence khỏi analyst opinion và sales anecdote.", "Generate roadmap hypothesis và validation experiment."],
      inputs: ["Competitor page", "Analyst notes", "Win-loss notes", "Customer feedback", "Current product capability map"],
      workflow: ["Tạo source inventory có evidence type và freshness.", "Yêu cầu AI summarize từng source riêng trước khi synthesis.", "Cluster capability theo user problem, không theo feature name của competitor.", "Map theme với current product gap và strategic option.", "Identify claim cần customer validation.", "Produce decision memo cho roadmap discussion."],
      deliverables: [["Research synthesis memo", "Theme, evidence strength, source và product implication", "BA", "Mỗi claim gắn với source type"], ["Capability comparison", "Competitor capability, user problem, current product support và gap", "Product manager", "Comparison tránh copy feature name"], ["Hypothesis backlog", "Roadmap hypothesis, evidence needed và validation method", "Product owner", "High-value hypothesis có experiment plan"], ["Decision memo", "Option, trade-off, risk và recommendation", "Product leadership", "Recommendation tách evidence khỏi assumption"]],
      risks: [["Source overreach", "AI có thể xem marketing copy là capability đã chứng minh", "Label source type và evidence strength"], ["Copycat roadmap", "Team có thể copy competitor feature không fit user problem", "Map mọi theme tới target segment và user outcome"], ["Confirmation bias", "Leadership có thể thích evidence ủng hộ idea sẵn có", "Include disconfirming signal và open risk"], ["Stale research", "Competitor page và report thay đổi nhanh", "Record source date và freshness confidence"]],
      metric: "Roadmap discussion dùng validated hypothesis và evidence strength thay vì competitor feature list chung chung."
    }
  },
  {
    slug: "user-story-splitting-for-sprint",
    group: "Requirements and backlog",
    domain: "Agile delivery",
    en: {
      title: "User Story Splitting for Sprint Readiness",
      project: "A delivery squad receives a large feature idea: allow business customers to manage billing contacts and notification preferences. The product owner wants it in the next sprint, but developers cannot estimate it because scope and rules are mixed.",
      challenge: "The BA must split the feature into user-goal-based stories with clear boundaries, dependencies, acceptance criteria, negative cases, and release order. AI can propose story splits, but the BA must validate business value and technical dependency with the squad.",
      aiUse: ["Generate split options by actor, workflow step, rule variation, and data boundary.", "Draft Given-When-Then acceptance criteria for each candidate story.", "Suggest dependency and release sequencing risks.", "Identify negative, permission, and audit scenarios."],
      inputs: ["Feature idea", "Actor and permission model", "Current billing process", "Known business rules", "Technical dependency notes"],
      workflow: ["Ask AI to propose multiple splitting strategies and explain trade-offs.", "Reject splits based only on UI components if they do not deliver user value.", "Map each story to one user goal and one testable outcome.", "Add acceptance criteria, negative cases, audit expectations, and permissions.", "Review sequence with developers and QA.", "Publish sprint-ready stories with dependencies and open decisions."],
      deliverables: [["Story split map", "Candidate stories grouped by actor, goal, dependency, and release order", "BA", "Each story has independent user value"], ["Acceptance criteria set", "Given-When-Then criteria with positive, negative, and boundary cases", "BA and QA", "QA can design tests without guessing"], ["Dependency notes", "Technical, data, policy, and workflow dependencies", "Tech lead", "Dependencies are visible before sprint planning"], ["Open decision list", "Unresolved rules and owners", "Product owner", "No story enters sprint with hidden business rule gaps"]],
      risks: [["Component slicing", "Stories may align to UI pieces instead of user outcomes", "Evaluate each split by user goal and release value"], ["Overloaded story", "One story may contain multiple actors or rule sets", "Limit each story to one actor goal and clear outcome"], ["Missing negative cases", "Happy-path stories may pass while real users fail", "Require permission, boundary, and error scenarios"], ["Unestimated dependency", "Hidden integration work may disrupt sprint", "Review dependencies with engineering before commitment"]],
      metric: "Sprint planning receives stories that QA and developers can estimate, test, and release in meaningful increments."
    },
    vi: {
      title: "Split user story cho sprint readiness",
      project: "Một delivery squad nhận feature idea lớn: cho phép business customer quản lý billing contact và notification preference. Product owner muốn đưa vào sprint tới, nhưng developer không estimate được vì scope và rule đang trộn lẫn.",
      challenge: "BA phải split feature thành story theo user goal, có boundary, dependency, acceptance criteria, negative case và release order rõ. AI có thể đề xuất story split, nhưng BA phải validate business value và technical dependency với squad.",
      aiUse: ["Generate split option theo actor, workflow step, rule variation và data boundary.", "Draft Given-When-Then acceptance criteria cho từng candidate story.", "Suggest dependency và release sequencing risk.", "Identify negative, permission và audit scenario."],
      inputs: ["Feature idea", "Actor và permission model", "Current billing process", "Known business rule", "Technical dependency notes"],
      workflow: ["Yêu cầu AI đề xuất nhiều splitting strategy và giải thích trade-off.", "Reject split chỉ dựa vào UI component nếu không deliver user value.", "Map mỗi story với một user goal và một testable outcome.", "Thêm acceptance criteria, negative case, audit expectation và permission.", "Review sequence với developer và QA.", "Publish story sprint-ready có dependency và open decision."],
      deliverables: [["Story split map", "Candidate story group theo actor, goal, dependency và release order", "BA", "Mỗi story có user value độc lập"], ["Acceptance criteria set", "Given-When-Then criteria có positive, negative và boundary case", "BA và QA", "QA design test không phải đoán"], ["Dependency notes", "Technical, data, policy và workflow dependency", "Tech lead", "Dependency visible trước sprint planning"], ["Open decision list", "Rule chưa resolve và owner", "Product owner", "Không story nào vào sprint với hidden business rule gap"]],
      risks: [["Component slicing", "Story có thể align theo UI piece thay vì user outcome", "Evaluate từng split theo user goal và release value"], ["Overloaded story", "Một story có nhiều actor hoặc rule set", "Giới hạn mỗi story vào một actor goal và outcome rõ"], ["Missing negative cases", "Happy-path story pass nhưng user thật fail", "Yêu cầu permission, boundary và error scenario"], ["Unestimated dependency", "Integration work ẩn có thể disrupt sprint", "Review dependency với engineering trước commitment"]],
      metric: "Sprint planning nhận story mà QA và developer có thể estimate, test và release theo increment có ý nghĩa."
    }
  },
  {
    slug: "acceptance-criteria-edge-cases",
    group: "Requirements and backlog",
    domain: "Requirements quality",
    en: {
      title: "Acceptance Criteria and Edge Case Expansion",
      project: "A team is preparing a feature for account limit changes. The initial requirement says admins can update limits, but it does not define thresholds, approval rules, notification behavior, audit, or what happens when requests fail.",
      challenge: "The BA must turn a simple requirement into testable acceptance criteria with positive, negative, boundary, permission, audit, and recovery scenarios. AI can expand edge cases, but the BA must keep only those supported by policy and stakeholder decisions.",
      aiUse: ["Generate edge-case categories from a requirement draft.", "Draft Given-When-Then criteria across positive and negative paths.", "Identify missing business rules and policy dependencies.", "Create QA review questions and traceability links."],
      inputs: ["Requirement draft", "Policy thresholds", "Admin role matrix", "Audit requirements", "System error behavior notes"],
      workflow: ["Ask AI to list observable behaviors and missing rules.", "Generate criteria by scenario type: positive, negative, boundary, permission, audit, and failure recovery.", "Remove criteria that invent policy values or unsupported thresholds.", "Add source IDs and decision owners for every rule.", "Review with QA for testability and with product for business intent.", "Publish criteria with trace links to requirement and source evidence."],
      deliverables: [["Acceptance criteria matrix", "Scenario, Given-When-Then, source, owner, and test type", "BA", "Every material rule is observable"], ["Edge case register", "Boundary, permission, error, audit, and concurrency cases", "QA", "Critical edge cases have test coverage"], ["Clarification questions", "Missing thresholds, roles, and exception rules", "Product owner", "Questions have owner and due date"], ["Trace links", "Requirement to source to criteria to test", "BA", "Criteria can be traced to evidence"]],
      risks: [["Invented thresholds", "AI may create limits that policy never approved", "Require source IDs for every numeric rule"], ["Criteria overload", "Too many low-value cases can slow refinement", "Prioritize by risk, frequency, and failure cost"], ["Untestable wording", "Criteria may still use vague terms", "Use observable state, actor, input, and expected result"], ["Missing audit", "Admin changes may lack compliance evidence", "Add audit and permission criteria explicitly"]],
      metric: "QA can convert acceptance criteria into test cases without asking for hidden business rules."
    },
    vi: {
      title: "Mở rộng acceptance criteria và edge case",
      project: "Team chuẩn bị feature thay đổi account limit. Requirement ban đầu nói admin có thể update limit, nhưng chưa định nghĩa threshold, approval rule, notification behavior, audit hoặc điều gì xảy ra khi request fail.",
      challenge: "BA phải biến requirement đơn giản thành acceptance criteria test được với positive, negative, boundary, permission, audit và recovery scenario. AI có thể expand edge case, nhưng BA chỉ giữ phần được policy và stakeholder decision support.",
      aiUse: ["Generate edge-case category từ requirement draft.", "Draft Given-When-Then criteria qua positive và negative path.", "Identify missing business rule và policy dependency.", "Tạo QA review question và traceability link."],
      inputs: ["Requirement draft", "Policy threshold", "Admin role matrix", "Audit requirement", "System error behavior notes"],
      workflow: ["Yêu cầu AI list observable behavior và missing rule.", "Generate criteria theo scenario type: positive, negative, boundary, permission, audit và failure recovery.", "Remove criteria tự invent policy value hoặc threshold unsupported.", "Thêm source ID và decision owner cho mọi rule.", "Review với QA về testability và product về business intent.", "Publish criteria có trace link tới requirement và source evidence."],
      deliverables: [["Acceptance criteria matrix", "Scenario, Given-When-Then, source, owner và test type", "BA", "Mọi material rule observable"], ["Edge case register", "Boundary, permission, error, audit và concurrency case", "QA", "Critical edge case có test coverage"], ["Clarification questions", "Threshold, role và exception rule còn thiếu", "Product owner", "Question có owner và due date"], ["Trace links", "Requirement tới source tới criteria tới test", "BA", "Criteria trace được tới evidence"]],
      risks: [["Invented thresholds", "AI có thể tạo limit policy chưa approve", "Bắt buộc source ID cho mọi numeric rule"], ["Criteria overload", "Quá nhiều low-value case làm chậm refinement", "Prioritize theo risk, frequency và failure cost"], ["Untestable wording", "Criteria vẫn có thể dùng từ mơ hồ", "Dùng observable state, actor, input và expected result"], ["Missing audit", "Admin change có thể thiếu compliance evidence", "Thêm audit và permission criteria explicit"]],
      metric: "QA có thể chuyển acceptance criteria thành test case mà không phải hỏi hidden business rule."
    }
  },
  {
    slug: "brd-srs-drafting-review",
    group: "Requirements and backlog",
    domain: "Formal requirements documentation",
    en: {
      title: "BRD and SRS Drafting Review",
      project: "A regulated project requires a BRD and SRS for a customer data consent module. Stakeholders expect formal documentation, but the source material is spread across policy notes, discovery workshops, legal comments, and architecture constraints.",
      challenge: "The BA must use AI to speed drafting without allowing AI to invent decisions, policy, or system behavior. The document must keep evidence, versioning, assumptions, open decisions, and approval checkpoints visible.",
      aiUse: ["Create a document outline from source inventory.", "Draft sections only from supplied evidence.", "Review for contradictions, missing rules, and unsupported claims.", "Generate executive summary, requirement tables, and decision log entries."],
      inputs: ["Policy notes", "Workshop outputs", "Legal review comments", "Architecture constraints", "Existing consent flows"],
      workflow: ["Build a source map and decision log before drafting.", "Ask AI to create an outline with evidence required per section.", "Draft one section at a time and require unsupported claims to be labeled.", "Run an AI critique pass for ambiguity, conflict, and missing NFRs.", "Validate decision-heavy sections with legal, product, and architecture owners.", "Publish the BRD or SRS with assumptions and open decisions intact."],
      deliverables: [["BRD or SRS outline", "Sections, purpose, evidence source, and approval owner", "BA", "No section lacks evidence expectation"], ["Requirement table", "Requirement ID, statement, source, assumption, owner, priority, and testability", "BA", "Requirements are traceable"], ["Decision log", "Policy and scope decisions with options and impacts", "Product owner", "Open decisions are not hidden"], ["Review findings", "Ambiguity, conflict, NFR gap, unsupported claim, and fix", "BA and reviewers", "Findings are resolved or assigned"]],
      risks: [["Polished invention", "AI can produce convincing text not supported by sources", "Draft from source IDs and label unsupported claims"], ["Approval confusion", "Readers may treat draft text as approved policy", "Use version status and approval checkpoints"], ["Document bloat", "AI may add generic sections that dilute key decisions", "Keep sections tied to project decisions and compliance needs"], ["Lost assumptions", "Cleaning the document can hide uncertainty", "Keep assumptions and open decisions visible"]],
      metric: "The BRD or SRS is faster to draft but still traceable, reviewable, and approved through the correct owners."
    },
    vi: {
      title: "Draft và review BRD/SRS",
      project: "Một dự án regulated cần BRD và SRS cho customer data consent module. Stakeholder muốn formal documentation, nhưng source material nằm rải rác trong policy note, discovery workshop, legal comment và architecture constraint.",
      challenge: "BA phải dùng AI để draft nhanh hơn nhưng không cho AI invent decision, policy hoặc system behavior. Document phải giữ evidence, versioning, assumption, open decision và approval checkpoint visible.",
      aiUse: ["Tạo document outline từ source inventory.", "Draft section chỉ từ supplied evidence.", "Review contradiction, missing rule và unsupported claim.", "Generate executive summary, requirement table và decision log entry."],
      inputs: ["Policy notes", "Workshop outputs", "Legal review comments", "Architecture constraints", "Existing consent flows"],
      workflow: ["Build source map và decision log trước khi drafting.", "Yêu cầu AI tạo outline kèm evidence required cho từng section.", "Draft từng section và bắt unsupported claim được label.", "Chạy AI critique pass cho ambiguity, conflict và missing NFR.", "Validate section nhiều decision với legal, product và architecture owner.", "Publish BRD hoặc SRS với assumption và open decision còn nguyên."],
      deliverables: [["BRD hoặc SRS outline", "Section, purpose, evidence source và approval owner", "BA", "Không section nào thiếu evidence expectation"], ["Requirement table", "Requirement ID, statement, source, assumption, owner, priority và testability", "BA", "Requirement traceable"], ["Decision log", "Policy và scope decision với option và impact", "Product owner", "Open decision không bị giấu"], ["Review findings", "Ambiguity, conflict, NFR gap, unsupported claim và fix", "BA và reviewer", "Finding được resolve hoặc assigned"]],
      risks: [["Polished invention", "AI có thể tạo text thuyết phục nhưng không có source support", "Draft từ source ID và label unsupported claim"], ["Approval confusion", "Reader có thể xem draft text là approved policy", "Dùng version status và approval checkpoint"], ["Document bloat", "AI có thể thêm section generic làm loãng decision chính", "Giữ section gắn với project decision và compliance need"], ["Lost assumptions", "Làm document sạch quá có thể che uncertainty", "Giữ assumption và open decision visible"]],
      metric: "BRD hoặc SRS được draft nhanh hơn nhưng vẫn traceable, reviewable và approved bởi đúng owner."
    }
  },
  {
    slug: "nfr-risk-workshop",
    group: "Requirements and backlog",
    domain: "Quality attributes",
    en: {
      title: "NFR and Risk Workshop Preparation",
      project: "A team is building a self-service customer portal. Functional scope is clear, but performance, availability, security, accessibility, audit, and support expectations are not documented before architecture decisions.",
      challenge: "The BA must prepare an NFR workshop that helps stakeholders make quality trade-offs explicit. AI can propose NFR categories and scenarios, but the BA must translate them into measurable thresholds and business risks.",
      aiUse: ["Generate NFR elicitation questions by quality attribute.", "Create risk scenarios and user impact statements.", "Draft measurable candidate thresholds for discussion.", "Map NFRs to acceptance criteria and monitoring signals."],
      inputs: ["Feature scope", "User segments", "Business criticality", "Compliance constraints", "Current system performance notes"],
      workflow: ["Ask AI to propose NFR categories relevant to the product context.", "Convert generic attributes into risk scenarios and user harm.", "Prepare workshop questions that force trade-off decisions.", "Draft candidate thresholds and mark them as assumptions.", "Validate thresholds with business, architecture, security, and support owners.", "Publish NFR decisions with acceptance and monitoring implications."],
      deliverables: [["NFR workshop pack", "Quality attributes, risk scenarios, and decision questions", "BA", "Stakeholders discuss trade-offs"], ["NFR requirement table", "Attribute, scenario, threshold, owner, and measurement method", "BA", "Every NFR is measurable"], ["Risk register", "Risk, impact, likelihood, mitigation, and owner", "Project manager", "High risks have controls"], ["Monitoring map", "NFR to operational signal and alert owner", "Operations owner", "Critical NFRs have monitoring path"]],
      risks: [["Vague NFRs", "Fast, secure, and reliable are not testable", "Use measurable thresholds and scenarios"], ["Late quality decisions", "Architecture may be chosen before NFRs are known", "Run workshop before design lock"], ["Stakeholder avoidance", "Teams may avoid trade-offs because they are uncomfortable", "Frame NFRs as business risk decisions"], ["Monitoring gap", "A requirement may pass test but fail in production", "Map NFRs to operational metrics"]],
      metric: "Quality attributes become measurable requirements and design inputs before architecture is committed."
    },
    vi: {
      title: "Chuẩn bị workshop NFR và risk",
      project: "Team đang xây customer portal self-service. Functional scope đã rõ, nhưng performance, availability, security, accessibility, audit và support expectation chưa được document trước architecture decision.",
      challenge: "BA phải chuẩn bị NFR workshop giúp stakeholder làm rõ quality trade-off. AI có thể đề xuất NFR category và scenario, nhưng BA phải dịch chúng thành threshold đo được và business risk.",
      aiUse: ["Generate NFR elicitation question theo quality attribute.", "Tạo risk scenario và user impact statement.", "Draft measurable candidate threshold để discussion.", "Map NFR với acceptance criteria và monitoring signal."],
      inputs: ["Feature scope", "User segment", "Business criticality", "Compliance constraint", "Current system performance notes"],
      workflow: ["Yêu cầu AI đề xuất NFR category relevant với product context.", "Chuyển generic attribute thành risk scenario và user harm.", "Chuẩn bị workshop question buộc quyết định trade-off.", "Draft candidate threshold và mark là assumption.", "Validate threshold với business, architecture, security và support owner.", "Publish NFR decision kèm acceptance và monitoring implication."],
      deliverables: [["NFR workshop pack", "Quality attribute, risk scenario và decision question", "BA", "Stakeholder thảo luận trade-off"], ["NFR requirement table", "Attribute, scenario, threshold, owner và measurement method", "BA", "Mọi NFR đo được"], ["Risk register", "Risk, impact, likelihood, mitigation và owner", "Project manager", "High risk có control"], ["Monitoring map", "NFR tới operational signal và alert owner", "Operations owner", "Critical NFR có monitoring path"]],
      risks: [["Vague NFRs", "Fast, secure và reliable không test được", "Dùng measurable threshold và scenario"], ["Late quality decisions", "Architecture có thể được chọn trước khi biết NFR", "Chạy workshop trước design lock"], ["Stakeholder avoidance", "Team có thể né trade-off vì khó chịu", "Frame NFR như business risk decision"], ["Monitoring gap", "Requirement pass test nhưng fail production", "Map NFR với operational metric"]],
      metric: "Quality attribute trở thành requirement đo được và design input trước khi commit architecture."
    }
  },
  {
    slug: "traceability-matrix-for-release",
    group: "Requirements and backlog",
    domain: "Release governance",
    en: {
      title: "Traceability Matrix for Release Readiness",
      project: "A release includes changes across onboarding, notifications, permissions, reporting, and support workflows. Stakeholders ask whether all approved requirements are covered by development and testing before go-live.",
      challenge: "The BA must create a traceability matrix that links business goals, requirements, decisions, source evidence, stories, acceptance criteria, test cases, defects, and release sign-off. AI can reconcile artifacts, but the BA must verify links and unresolved gaps.",
      aiUse: ["Extract requirement IDs and acceptance criteria from backlog items.", "Match requirements to source decisions and test cases.", "Identify orphan requirements, untested criteria, and unresolved defects.", "Create a release readiness summary for stakeholders."],
      inputs: ["BRD or requirement list", "Decision log", "Jira or backlog export", "Test case list", "Defect list"],
      workflow: ["Normalize IDs across requirements, stories, tests, and defects.", "Ask AI to propose trace links and confidence for each link.", "Manually verify high-risk or low-confidence links.", "Identify gaps: no story, no test, open defect, missing decision, or scope conflict.", "Review readiness with product, QA, engineering, and operations.", "Publish release traceability and sign-off exceptions."],
      deliverables: [["Traceability matrix", "Goal, requirement, source, story, acceptance criteria, test, defect, and status", "BA", "Every approved requirement has coverage status"], ["Gap report", "Missing stories, missing tests, open defects, and unresolved decisions", "BA and QA", "Gaps are assigned or accepted"], ["Release readiness summary", "Coverage, exceptions, risks, and sign-off recommendation", "Product owner", "Stakeholders can make go-live decision"], ["Change impact notes", "Requirements affected by late changes or defects", "BA", "Impact is visible before release"]],
      risks: [["False match", "AI may link artifacts with similar words but different meaning", "Verify material links manually"], ["Coverage illusion", "A requirement may have a test that does not cover the rule", "Check test intent, not only ID match"], ["Late exception hiding", "Open defects may be minimized in summaries", "Keep exceptions explicit with owner and decision"], ["Matrix overload", "Too much detail can hide release risks", "Add summary by risk and readiness status"]],
      metric: "Release sign-off is based on visible coverage and accepted exceptions, not scattered artifact confidence."
    },
    vi: {
      title: "Traceability matrix cho release readiness",
      project: "Một release gồm thay đổi ở onboarding, notification, permission, reporting và support workflow. Stakeholder hỏi liệu mọi approved requirement đã được cover bởi development và testing trước go-live chưa.",
      challenge: "BA phải tạo traceability matrix link business goal, requirement, decision, source evidence, story, acceptance criteria, test case, defect và release sign-off. AI có thể reconcile artifact, nhưng BA phải verify link và unresolved gap.",
      aiUse: ["Extract requirement ID và acceptance criteria từ backlog item.", "Match requirement với source decision và test case.", "Identify orphan requirement, untested criteria và unresolved defect.", "Tạo release readiness summary cho stakeholder."],
      inputs: ["BRD hoặc requirement list", "Decision log", "Jira hoặc backlog export", "Test case list", "Defect list"],
      workflow: ["Normalize ID qua requirement, story, test và defect.", "Yêu cầu AI propose trace link và confidence cho từng link.", "Verify thủ công link high-risk hoặc low-confidence.", "Identify gap: no story, no test, open defect, missing decision hoặc scope conflict.", "Review readiness với product, QA, engineering và operations.", "Publish release traceability và sign-off exception."],
      deliverables: [["Traceability matrix", "Goal, requirement, source, story, acceptance criteria, test, defect và status", "BA", "Mọi approved requirement có coverage status"], ["Gap report", "Missing story, missing test, open defect và unresolved decision", "BA và QA", "Gap được assigned hoặc accepted"], ["Release readiness summary", "Coverage, exception, risk và sign-off recommendation", "Product owner", "Stakeholder có thể ra go-live decision"], ["Change impact notes", "Requirement bị ảnh hưởng bởi late change hoặc defect", "BA", "Impact visible trước release"]],
      risks: [["False match", "AI có thể link artifact có wording giống nhưng meaning khác", "Verify material link thủ công"], ["Coverage illusion", "Requirement có test nhưng test không cover rule", "Check test intent, không chỉ ID match"], ["Late exception hiding", "Open defect có thể bị minimize trong summary", "Giữ exception explicit có owner và decision"], ["Matrix overload", "Quá nhiều detail có thể che release risk", "Thêm summary theo risk và readiness status"]],
      metric: "Release sign-off dựa trên coverage và accepted exception visible, không dựa vào artifact rời rạc."
    }
  },
  {
    slug: "defect-triage-root-cause",
    group: "Delivery and QA",
    domain: "Defect management",
    en: {
      title: "Defect Triage and Root-Cause Analysis",
      project: "During UAT, users report many defects across search, export, role permissions, and notifications. Some are true defects, some are unclear requirements, and others are training or data issues.",
      challenge: "The BA must help triage defects quickly without letting AI oversimplify root cause. The goal is to classify issues, connect them to requirements and tests, identify requirement gaps, and prepare decision options for product and delivery leads.",
      aiUse: ["Cluster defect descriptions by symptom and affected workflow.", "Map defects to requirements, acceptance criteria, and test evidence.", "Separate bug, requirement gap, data issue, training issue, and change request.", "Draft triage notes and stakeholder questions."],
      inputs: ["Defect export", "Requirement list", "Acceptance criteria", "Test evidence", "UAT notes"],
      workflow: ["Normalize defect descriptions and remove duplicates carefully.", "Ask AI to classify issues with confidence and evidence.", "Review high-severity and ambiguous classifications manually.", "Map each defect to requirement, test, or missing requirement.", "Identify patterns that point to root cause.", "Prepare triage board updates with recommendation and owner."],
      deliverables: [["Defect classification board", "Defect, category, severity, evidence, requirement link, and owner", "BA and QA", "Every UAT issue has triage status"], ["Root-cause summary", "Requirement gap, build defect, data issue, training issue, or change request patterns", "BA", "Patterns are supported by evidence"], ["Decision options", "Fix now, defer, clarify, train, or raise change request", "Product owner", "Each option has impact"], ["Requirement improvement list", "Missing or unclear requirements revealed by defects", "BA", "Backlog is updated with root cause"]],
      risks: [["Misclassification", "AI may label requirement gaps as bugs", "Review by requirement evidence and test intent"], ["Duplicate confusion", "Similar defects may hide different causes", "Cluster but keep source details"], ["Severity inflation", "Users may report impact inconsistently", "Use business impact rubric"], ["Blame framing", "Root cause can become political", "Frame findings around process and evidence"]],
      metric: "Triage decisions become faster while root causes remain evidence-based and actionable."
    },
    vi: {
      title: "Triage defect và root-cause analysis",
      project: "Trong UAT, user report nhiều defect ở search, export, role permission và notification. Một số là bug thật, một số là requirement chưa rõ, số khác là training hoặc data issue.",
      challenge: "BA phải hỗ trợ triage defect nhanh nhưng không để AI oversimplify root cause. Mục tiêu là classify issue, connect với requirement và test, identify requirement gap và chuẩn bị decision option cho product và delivery lead.",
      aiUse: ["Cluster defect description theo symptom và affected workflow.", "Map defect với requirement, acceptance criteria và test evidence.", "Tách bug, requirement gap, data issue, training issue và change request.", "Draft triage note và stakeholder question."],
      inputs: ["Defect export", "Requirement list", "Acceptance criteria", "Test evidence", "UAT notes"],
      workflow: ["Normalize defect description và remove duplicate cẩn thận.", "Yêu cầu AI classify issue có confidence và evidence.", "Review thủ công high-severity và ambiguous classification.", "Map từng defect tới requirement, test hoặc missing requirement.", "Identify pattern chỉ ra root cause.", "Chuẩn bị triage board update có recommendation và owner."],
      deliverables: [["Defect classification board", "Defect, category, severity, evidence, requirement link và owner", "BA và QA", "Mọi UAT issue có triage status"], ["Root-cause summary", "Pattern requirement gap, build defect, data issue, training issue hoặc change request", "BA", "Pattern được evidence support"], ["Decision options", "Fix now, defer, clarify, train hoặc raise change request", "Product owner", "Mỗi option có impact"], ["Requirement improvement list", "Requirement thiếu hoặc chưa rõ lộ ra từ defect", "BA", "Backlog được update theo root cause"]],
      risks: [["Misclassification", "AI có thể label requirement gap thành bug", "Review bằng requirement evidence và test intent"], ["Duplicate confusion", "Defect giống nhau có thể có cause khác", "Cluster nhưng giữ source detail"], ["Severity inflation", "User report impact không đồng nhất", "Dùng business impact rubric"], ["Blame framing", "Root cause có thể trở thành political", "Frame finding quanh process và evidence"]],
      metric: "Triage decision nhanh hơn nhưng root cause vẫn evidence-based và actionable."
    }
  },
  {
    slug: "test-scenario-generation",
    group: "Delivery and QA",
    domain: "QA collaboration",
    en: {
      title: "Test Scenario Generation From Requirements",
      project: "A QA team receives a set of user stories for a permissions-heavy admin module. Time is short, and testers need scenario coverage for roles, data states, negative paths, audit, and regression risk.",
      challenge: "The BA must help QA generate scenarios without allowing AI to invent rules. The best output links each scenario to requirement evidence, acceptance criteria, and risk priority so QA can focus on coverage that matters.",
      aiUse: ["Generate scenario categories from acceptance criteria.", "Create positive, negative, boundary, permission, audit, and regression cases.", "Identify missing criteria before QA starts execution.", "Prioritize scenarios by risk and business impact."],
      inputs: ["User stories", "Acceptance criteria", "Role matrix", "Data state definitions", "Prior defect history"],
      workflow: ["Ask AI to extract rules from requirements and list missing rules separately.", "Generate test scenarios with source requirement IDs.", "Label each scenario by type and risk level.", "Review unsupported scenarios with BA and QA before adding them.", "Map scenarios to test data needs and expected results.", "Update acceptance criteria if scenario generation reveals gaps."],
      deliverables: [["Scenario coverage matrix", "Requirement, scenario, type, risk, test data, and expected result", "QA and BA", "Every high-risk rule has scenario coverage"], ["Missing criteria list", "Rules needed before testing can be complete", "BA", "Gaps become clarification questions"], ["Test data plan", "Data states and roles needed for execution", "QA", "Critical data is available before test run"], ["Regression focus list", "Areas likely affected by change", "Tech lead and QA", "Regression scope is risk-based"]],
      risks: [["Invented tests", "AI may create scenarios for rules that do not exist", "Require source IDs and assumption labels"], ["Coverage overload", "Too many scenarios can distract from critical risk", "Rank by business impact and failure cost"], ["Missing data setup", "Good scenarios fail because test data is unavailable", "Add test data requirements early"], ["BA-QA disconnect", "QA may test behavior BA did not intend", "Review scenario matrix together"]],
      metric: "QA receives scenario coverage that is traceable, prioritized, and aligned to business rules."
    },
    vi: {
      title: "Sinh test scenario từ requirements",
      project: "QA team nhận bộ user story cho admin module nặng về permission. Thời gian ngắn, tester cần scenario coverage cho role, data state, negative path, audit và regression risk.",
      challenge: "BA phải hỗ trợ QA generate scenario mà không để AI invent rule. Output tốt nhất link từng scenario tới requirement evidence, acceptance criteria và risk priority để QA focus coverage quan trọng.",
      aiUse: ["Generate scenario category từ acceptance criteria.", "Tạo positive, negative, boundary, permission, audit và regression case.", "Identify missing criteria trước khi QA execute.", "Prioritize scenario theo risk và business impact."],
      inputs: ["User stories", "Acceptance criteria", "Role matrix", "Data state definitions", "Prior defect history"],
      workflow: ["Yêu cầu AI extract rule từ requirement và list missing rule riêng.", "Generate test scenario có source requirement ID.", "Label từng scenario theo type và risk level.", "Review unsupported scenario với BA và QA trước khi thêm.", "Map scenario với test data need và expected result.", "Update acceptance criteria nếu scenario generation làm lộ gap."],
      deliverables: [["Scenario coverage matrix", "Requirement, scenario, type, risk, test data và expected result", "QA và BA", "Mọi high-risk rule có scenario coverage"], ["Missing criteria list", "Rule cần có trước khi testing complete", "BA", "Gap trở thành clarification question"], ["Test data plan", "Data state và role cần cho execution", "QA", "Critical data available trước test run"], ["Regression focus list", "Area có khả năng affected bởi change", "Tech lead và QA", "Regression scope risk-based"]],
      risks: [["Invented tests", "AI có thể tạo scenario cho rule không tồn tại", "Bắt buộc source ID và assumption label"], ["Coverage overload", "Quá nhiều scenario làm loãng critical risk", "Rank theo business impact và failure cost"], ["Missing data setup", "Scenario tốt fail vì test data chưa có", "Thêm test data requirement sớm"], ["BA-QA disconnect", "QA có thể test behavior BA không intended", "Review scenario matrix cùng nhau"]],
      metric: "QA nhận scenario coverage traceable, prioritized và aligned với business rule."
    }
  },
  {
    slug: "change-impact-analysis",
    group: "Delivery and QA",
    domain: "Change control",
    en: {
      title: "Change Impact Analysis",
      project: "Mid-sprint, compliance changes a rule for document retention. The change affects onboarding forms, storage, notifications, audit logs, reporting, and support scripts. The team needs impact clarity before accepting the change.",
      challenge: "The BA must analyze impact across requirements, processes, systems, data, tests, users, and release scope. AI can search for related artifacts, but the BA must confirm dependency meaning and decision impact.",
      aiUse: ["Search requirement and process artifacts for affected concepts.", "Draft an impact matrix across business, data, system, test, and operations areas.", "Generate questions for compliance, architecture, QA, and support.", "Summarize options for accept, defer, or split release."],
      inputs: ["Change request", "Requirement repository", "Process diagrams", "Data model notes", "Test cases and release plan"],
      workflow: ["Restate the change and identify exact policy rule difference.", "Ask AI to find potentially affected artifacts and rank confidence.", "Verify high-impact links manually with artifact owners.", "Map impact to scope, data, integration, test, training, and operations.", "Prepare options with timeline, risk, and dependency implications.", "Record the decision and update affected artifacts."],
      deliverables: [["Impact matrix", "Artifact, affected area, change needed, risk, owner, and effort signal", "BA", "Impacts cover business and technical areas"], ["Decision options", "Accept now, defer, split, or reject with trade-offs", "Product owner", "Options include risk and release impact"], ["Artifact update list", "Requirements, tests, diagrams, scripts, and reports to update", "BA and QA", "No affected artifact lacks owner"], ["Stakeholder questions", "Questions for compliance, architecture, support, and QA", "BA", "Open questions are decision-focused"]],
      risks: [["Keyword-only impact", "AI may miss semantic dependencies or flag irrelevant matches", "Verify meaning, not only word match"], ["Hidden operational impact", "Support and training changes may be forgotten", "Include operations and customer communication"], ["Decision pressure", "Team may accept change without release trade-off", "Present options and consequences"], ["Traceability drift", "Changed artifacts may not stay aligned", "Update traceability matrix after decision"]],
      metric: "The team accepts, defers, or splits the change with visible impact and artifact owners."
    },
    vi: {
      title: "Change impact analysis",
      project: "Giữa sprint, compliance thay đổi rule về document retention. Change ảnh hưởng onboarding form, storage, notification, audit log, reporting và support script. Team cần clarity về impact trước khi accept change.",
      challenge: "BA phải phân tích impact qua requirement, process, system, data, test, user và release scope. AI có thể search artifact liên quan, nhưng BA phải confirm dependency meaning và decision impact.",
      aiUse: ["Search requirement và process artifact cho concept affected.", "Draft impact matrix qua business, data, system, test và operations area.", "Generate question cho compliance, architecture, QA và support.", "Summarize option accept, defer hoặc split release."],
      inputs: ["Change request", "Requirement repository", "Process diagrams", "Data model notes", "Test cases và release plan"],
      workflow: ["Restate change và identify policy rule difference chính xác.", "Yêu cầu AI tìm artifact có thể affected và rank confidence.", "Verify thủ công high-impact link với artifact owner.", "Map impact tới scope, data, integration, test, training và operations.", "Prepare option có timeline, risk và dependency implication.", "Record decision và update affected artifact."],
      deliverables: [["Impact matrix", "Artifact, affected area, change needed, risk, owner và effort signal", "BA", "Impact cover business và technical area"], ["Decision options", "Accept now, defer, split hoặc reject với trade-off", "Product owner", "Option gồm risk và release impact"], ["Artifact update list", "Requirement, test, diagram, script và report cần update", "BA và QA", "Không affected artifact nào thiếu owner"], ["Stakeholder questions", "Question cho compliance, architecture, support và QA", "BA", "Open question tập trung decision"]],
      risks: [["Keyword-only impact", "AI có thể miss semantic dependency hoặc flag match irrelevant", "Verify meaning, không chỉ word match"], ["Hidden operational impact", "Support và training change có thể bị quên", "Include operations và customer communication"], ["Decision pressure", "Team có thể accept change mà chưa trade-off release", "Present option và consequence"], ["Traceability drift", "Artifact changed có thể lệch nhau", "Update traceability matrix sau decision"]],
      metric: "Team accept, defer hoặc split change với impact và artifact owner visible."
    }
  },
  {
    slug: "release-readiness-check",
    group: "Delivery and QA",
    domain: "Release management",
    en: {
      title: "Release Readiness Check",
      project: "A customer-facing release is close to go-live. Development is mostly complete, but there are open defects, unresolved support process questions, incomplete training notes, and uncertainty about rollback communication.",
      challenge: "The BA must help create a release readiness view that integrates requirements, test results, defects, operational readiness, training, communication, rollback, and business sign-off. AI can summarize status but cannot make the go-live decision.",
      aiUse: ["Summarize readiness evidence from multiple project artifacts.", "Identify missing operational, training, and support readiness items.", "Create a go-live risk summary and exception list.", "Draft stakeholder-specific sign-off questions."],
      inputs: ["Release scope", "Traceability matrix", "Test summary", "Defect list", "Operations and support readiness notes"],
      workflow: ["Collect readiness evidence from delivery, QA, support, operations, and product.", "Ask AI to organize evidence by readiness dimension.", "Identify exceptions and classify by go-live risk.", "Verify defect and test status with QA and engineering.", "Create decision options: go, go with exceptions, delay, or partial rollout.", "Publish a readiness brief for the sign-off meeting."],
      deliverables: [["Readiness dashboard", "Scope, testing, defects, operations, training, communication, and rollback status", "BA", "Every dimension has status and owner"], ["Exception register", "Open issue, risk, decision needed, owner, and due date", "Project manager", "No exception lacks decision path"], ["Go-live decision brief", "Options, risks, mitigations, and recommendation", "Product owner", "Decision makers can compare trade-offs"], ["Support readiness checklist", "Known issues, scripts, escalation, and customer communication", "Support lead", "Support can handle launch questions"]],
      risks: [["Green status bias", "Teams may report optimistic status without evidence", "Ask for source evidence and owner confirmation"], ["Operational blind spot", "Training and support may be incomplete even when code is ready", "Include non-technical readiness dimensions"], ["Exception ambiguity", "Open issues may lack go-live decision", "Assign decision owner and accepted-risk status"], ["Rollback confusion", "Users may be affected if rollback plan is unclear", "Include rollback and communication requirements"]],
      metric: "The go-live meeting uses a shared evidence-based readiness brief instead of fragmented status updates."
    },
    vi: {
      title: "Kiểm tra release readiness",
      project: "Một customer-facing release gần go-live. Development gần xong, nhưng vẫn có open defect, support process question chưa resolve, training note chưa đủ và uncertainty về rollback communication.",
      challenge: "BA phải giúp tạo release readiness view tích hợp requirement, test result, defect, operational readiness, training, communication, rollback và business sign-off. AI có thể summarize status nhưng không được ra go-live decision.",
      aiUse: ["Summarize readiness evidence từ nhiều project artifact.", "Identify missing operational, training và support readiness item.", "Tạo go-live risk summary và exception list.", "Draft sign-off question riêng cho stakeholder."],
      inputs: ["Release scope", "Traceability matrix", "Test summary", "Defect list", "Operations và support readiness notes"],
      workflow: ["Collect readiness evidence từ delivery, QA, support, operations và product.", "Yêu cầu AI organize evidence theo readiness dimension.", "Identify exception và classify theo go-live risk.", "Verify defect và test status với QA và engineering.", "Tạo decision option: go, go with exceptions, delay hoặc partial rollout.", "Publish readiness brief cho sign-off meeting."],
      deliverables: [["Readiness dashboard", "Scope, testing, defects, operations, training, communication và rollback status", "BA", "Mỗi dimension có status và owner"], ["Exception register", "Open issue, risk, decision needed, owner và due date", "Project manager", "Không exception nào thiếu decision path"], ["Go-live decision brief", "Option, risk, mitigation và recommendation", "Product owner", "Decision maker so sánh được trade-off"], ["Support readiness checklist", "Known issue, script, escalation và customer communication", "Support lead", "Support xử lý được launch question"]],
      risks: [["Green status bias", "Team có thể report optimistic status không có evidence", "Yêu cầu source evidence và owner confirmation"], ["Operational blind spot", "Training và support có thể chưa xong dù code ready", "Include non-technical readiness dimension"], ["Exception ambiguity", "Open issue có thể thiếu go-live decision", "Assign decision owner và accepted-risk status"], ["Rollback confusion", "User có thể bị ảnh hưởng nếu rollback plan mơ hồ", "Include rollback và communication requirement"]],
      metric: "Go-live meeting dùng readiness brief chung dựa trên evidence thay vì status update rời rạc."
    }
  },
  {
    slug: "production-incident-requirement-feedback",
    group: "Delivery and QA",
    domain: "Continuous improvement",
    en: {
      title: "Production Incident to Requirement Feedback",
      project: "After launch, customers report that notification preferences behave unexpectedly when account ownership changes. Support tickets show confusion, engineering sees no defect in code, and product suspects the requirement missed an ownership scenario.",
      challenge: "The BA must convert production signals into requirement learning. AI can summarize incidents and tickets, but the BA must separate defect, requirement gap, UX confusion, data issue, and training need before changing backlog scope.",
      aiUse: ["Cluster incidents by user journey and symptom.", "Map incidents to requirements, criteria, and release decisions.", "Identify missing scenarios and ambiguous wording.", "Draft backlog updates and stakeholder validation questions."],
      inputs: ["Incident report", "Support tickets", "Release requirements", "Audit logs", "User journey notes"],
      workflow: ["Collect incident evidence and preserve customer examples.", "Ask AI to cluster symptoms and map them to original requirements.", "Review whether behavior matches requirement, test, and user expectation.", "Classify each finding as defect, requirement gap, UX confusion, data issue, or training need.", "Draft backlog changes with impact and evidence.", "Update lessons learned and prevention checklist."],
      deliverables: [["Incident synthesis", "Symptoms, affected users, evidence, and journey step", "BA", "Patterns are source-backed"], ["Requirement gap analysis", "Original requirement, missing scenario, impact, and proposed update", "BA", "Gaps are actionable"], ["Backlog update pack", "Story, acceptance criteria, test notes, and priority", "Product owner", "Updates include evidence and severity"], ["Prevention checklist", "Questions to ask in future refinement", "BA practice", "Learning feeds future analysis"]],
      risks: [["Ticket summary bias", "AI may flatten customer-specific context", "Keep representative examples and source IDs"], ["Wrong category", "Requirement gap may be treated as code defect", "Compare actual behavior to approved requirement"], ["Overreaction", "A rare issue may trigger too much scope", "Use frequency, severity, and user impact"], ["Lost learning", "Fix may happen without improving BA process", "Add prevention questions to refinement checklist"]],
      metric: "Production incidents become evidence-backed backlog improvements and better future requirement questions."
    },
    vi: {
      title: "Từ production incident đến feedback requirement",
      project: "Sau launch, customer report notification preference hoạt động bất ngờ khi account ownership thay đổi. Support ticket cho thấy confusion, engineering thấy code không defect, product nghi requirement miss ownership scenario.",
      challenge: "BA phải chuyển production signal thành requirement learning. AI có thể summarize incident và ticket, nhưng BA phải tách defect, requirement gap, UX confusion, data issue và training need trước khi đổi backlog scope.",
      aiUse: ["Cluster incident theo user journey và symptom.", "Map incident với requirement, criteria và release decision.", "Identify missing scenario và ambiguous wording.", "Draft backlog update và stakeholder validation question."],
      inputs: ["Incident report", "Support tickets", "Release requirements", "Audit logs", "User journey notes"],
      workflow: ["Collect incident evidence và giữ customer example.", "Yêu cầu AI cluster symptom và map tới original requirement.", "Review behavior có match requirement, test và user expectation không.", "Classify từng finding là defect, requirement gap, UX confusion, data issue hoặc training need.", "Draft backlog change có impact và evidence.", "Update lessons learned và prevention checklist."],
      deliverables: [["Incident synthesis", "Symptom, affected user, evidence và journey step", "BA", "Pattern source-backed"], ["Requirement gap analysis", "Original requirement, missing scenario, impact và proposed update", "BA", "Gap actionable"], ["Backlog update pack", "Story, acceptance criteria, test note và priority", "Product owner", "Update gồm evidence và severity"], ["Prevention checklist", "Question cần hỏi trong refinement tương lai", "BA practice", "Learning đi vào future analysis"]],
      risks: [["Ticket summary bias", "AI có thể flatten customer-specific context", "Giữ representative example và source ID"], ["Wrong category", "Requirement gap có thể bị xem là code defect", "So sánh actual behavior với approved requirement"], ["Overreaction", "Issue hiếm có thể kéo scope quá lớn", "Dùng frequency, severity và user impact"], ["Lost learning", "Fix xảy ra nhưng BA process không cải thiện", "Thêm prevention question vào refinement checklist"]],
      metric: "Production incident trở thành backlog improvement có evidence và câu hỏi requirement tốt hơn trong tương lai."
    }
  },
  {
    slug: "rag-policy-assistant-requirements",
    group: "AI-enabled product use cases",
    domain: "Knowledge assistant",
    en: {
      title: "RAG Policy Assistant Requirements",
      project: "HR wants an internal assistant that answers employee policy questions using approved documents. Users include employees, managers, and HR advisors, each with different access levels and escalation paths.",
      challenge: "The BA must specify a RAG assistant beyond chatbot UX: source authority, freshness, permissions, citation behavior, conflict handling, fallback, evaluation, and operational ownership.",
      aiUse: ["Inventory authoritative knowledge sources and metadata needs.", "Draft retrieval and answer requirements.", "Generate fallback scenarios for weak or conflicting evidence.", "Create evaluation cases for retrieval quality and answer grounding."],
      inputs: ["Policy repository", "Legacy handbook", "Role access rules", "HR escalation process", "Common employee questions"],
      workflow: ["Define approved sources, owners, effective dates, and access rules.", "Ask AI to draft a knowledge contract and identify source conflicts.", "Specify answer behavior: citation, confidence, refusal, and escalation.", "Create evaluation questions for common, edge, and conflict cases.", "Review privacy and access controls with security and HR.", "Publish requirements with retrieval metrics and monitoring events."],
      deliverables: [["Knowledge contract", "Sources, owner, authority, freshness, metadata, and access", "BA and HR owner", "Every source has authority status"], ["RAG requirement set", "Retrieval, citation, fallback, conflict, and permission requirements", "BA", "Requirements cover retrieval and generation"], ["Evaluation case set", "Question, expected source, expected answer behavior, and risk", "QA and BA", "Evaluation covers common and edge cases"], ["Operational playbook", "Fallback, escalation, correction capture, and monitoring", "HR operations", "Assistant has owner after launch"]],
      risks: [["Stale policy", "Assistant may cite old documents", "Require effective date metadata and source priority"], ["Access leakage", "Manager-only content may appear to employees", "Permission-aware retrieval and security tests"], ["Citation theater", "Answer may cite a source that does not support the claim", "Evaluate claim-source support"], ["No fallback", "Assistant may invent when evidence is weak", "Require refusal and escalation behavior"]],
      metric: "The assistant answers only from trusted sources, cites evidence, respects access, and escalates safely."
    },
    vi: {
      title: "Requirement cho RAG policy assistant",
      project: "HR muốn internal assistant trả lời câu hỏi policy của employee bằng approved documents. User gồm employee, manager và HR advisor, mỗi nhóm có access level và escalation path khác nhau.",
      challenge: "BA phải đặc tả RAG assistant vượt khỏi chatbot UX: source authority, freshness, permission, citation behavior, conflict handling, fallback, evaluation và operational ownership.",
      aiUse: ["Inventory authoritative knowledge source và metadata need.", "Draft retrieval và answer requirement.", "Generate fallback scenario cho evidence yếu hoặc conflict.", "Tạo evaluation case cho retrieval quality và answer grounding."],
      inputs: ["Policy repository", "Legacy handbook", "Role access rules", "HR escalation process", "Common employee questions"],
      workflow: ["Define approved source, owner, effective date và access rule.", "Yêu cầu AI draft knowledge contract và identify source conflict.", "Specify answer behavior: citation, confidence, refusal và escalation.", "Tạo evaluation question cho common, edge và conflict case.", "Review privacy và access control với security và HR.", "Publish requirement có retrieval metric và monitoring event."],
      deliverables: [["Knowledge contract", "Source, owner, authority, freshness, metadata và access", "BA và HR owner", "Mọi source có authority status"], ["RAG requirement set", "Retrieval, citation, fallback, conflict và permission requirement", "BA", "Requirement cover retrieval và generation"], ["Evaluation case set", "Question, expected source, expected answer behavior và risk", "QA và BA", "Evaluation cover common và edge case"], ["Operational playbook", "Fallback, escalation, correction capture và monitoring", "HR operations", "Assistant có owner sau launch"]],
      risks: [["Stale policy", "Assistant có thể cite document cũ", "Yêu cầu effective date metadata và source priority"], ["Access leakage", "Content manager-only có thể hiện cho employee", "Permission-aware retrieval và security test"], ["Citation theater", "Answer có thể cite source không support claim", "Evaluate claim-source support"], ["No fallback", "Assistant có thể invent khi evidence yếu", "Yêu cầu refusal và escalation behavior"]],
      metric: "Assistant chỉ trả lời từ trusted source, cite evidence, respect access và escalate an toàn."
    }
  },
  {
    slug: "ai-ticket-triage-specification",
    group: "AI-enabled product use cases",
    domain: "Support automation",
    en: {
      title: "AI Ticket Triage Specification",
      project: "A support organization wants AI to classify incoming tickets by category, urgency, product area, and routing queue. Incorrect routing increases SLA breaches and customer frustration.",
      challenge: "The BA must specify probabilistic triage behavior, confidence thresholds, human review, correction capture, training data constraints, metrics, and operational monitoring. The feature is not just a classifier; it is a support workflow change.",
      aiUse: ["Draft label taxonomy and routing requirements.", "Generate confidence and human review scenarios.", "Create evaluation cases for category precision and high-risk routing.", "Identify operational metrics and correction feedback loop."],
      inputs: ["Historical ticket data", "Support category taxonomy", "SLA rules", "Queue ownership", "Escalation policy"],
      workflow: ["Define allowed labels, queue owners, and routing consequences.", "Ask AI to identify ambiguous categories and required training examples.", "Specify model output contract and confidence threshold behavior.", "Design human review queue for low-confidence or high-impact tickets.", "Create evaluation set and acceptance thresholds.", "Define correction capture and monitoring metrics after launch."],
      deliverables: [["Triage taxonomy", "Category, definition, examples, owner, and SLA impact", "Support operations", "Labels are mutually understandable"], ["AI output contract", "Required fields, confidence, explanation, and fallback", "BA", "Output can drive workflow safely"], ["Evaluation plan", "Test cases, expected labels, precision target, and high-risk focus", "QA and data team", "Metrics reflect business risk"], ["Operational workflow", "Human review, correction capture, and monitoring events", "Support lead", "Corrections improve future quality"]],
      risks: [["Ambiguous taxonomy", "Model cannot classify cleanly if humans disagree", "Define labels with examples and owner decisions"], ["Low-confidence automation", "Tickets may route incorrectly without review", "Use confidence threshold and human queue"], ["Feedback loss", "Corrections may not be captured", "Specify reason codes and correction events"], ["Metric mismatch", "Overall accuracy may hide high-risk category errors", "Measure precision for priority categories"]],
      metric: "Ticket routing improves SLA performance while low-confidence and high-risk cases receive human review."
    },
    vi: {
      title: "Đặc tả AI ticket triage",
      project: "Support organization muốn AI classify incoming ticket theo category, urgency, product area và routing queue. Routing sai làm tăng SLA breach và customer frustration.",
      challenge: "BA phải đặc tả probabilistic triage behavior, confidence threshold, human review, correction capture, training data constraint, metric và operational monitoring. Feature này không chỉ là classifier; nó là thay đổi support workflow.",
      aiUse: ["Draft label taxonomy và routing requirement.", "Generate confidence và human review scenario.", "Tạo evaluation case cho category precision và high-risk routing.", "Identify operational metric và correction feedback loop."],
      inputs: ["Historical ticket data", "Support category taxonomy", "SLA rules", "Queue ownership", "Escalation policy"],
      workflow: ["Define allowed label, queue owner và routing consequence.", "Yêu cầu AI identify ambiguous category và training example cần có.", "Specify model output contract và confidence threshold behavior.", "Design human review queue cho low-confidence hoặc high-impact ticket.", "Tạo evaluation set và acceptance threshold.", "Define correction capture và monitoring metric sau launch."],
      deliverables: [["Triage taxonomy", "Category, definition, example, owner và SLA impact", "Support operations", "Label mutually understandable"], ["AI output contract", "Required field, confidence, explanation và fallback", "BA", "Output drive workflow an toàn"], ["Evaluation plan", "Test case, expected label, precision target và high-risk focus", "QA và data team", "Metric reflect business risk"], ["Operational workflow", "Human review, correction capture và monitoring event", "Support lead", "Correction cải thiện future quality"]],
      risks: [["Ambiguous taxonomy", "Model không classify sạch nếu human chưa thống nhất", "Define label có example và owner decision"], ["Low-confidence automation", "Ticket route sai nếu không review", "Dùng confidence threshold và human queue"], ["Feedback loss", "Correction có thể không được capture", "Specify reason code và correction event"], ["Metric mismatch", "Overall accuracy che lỗi category high-risk", "Measure precision cho priority category"]],
      metric: "Ticket routing cải thiện SLA trong khi case low-confidence và high-risk được human review."
    }
  },
  {
    slug: "ai-document-ocr-intake",
    group: "AI-enabled product use cases",
    domain: "Document automation",
    en: {
      title: "AI Document OCR Intake",
      project: "An onboarding process requires customers to upload identity and compliance documents. Operations spends time reading PDFs, extracting fields, detecting missing pages, and asking customers to resubmit unclear documents.",
      challenge: "The BA must specify AI-assisted document extraction and validation while protecting against OCR errors, missing evidence, privacy issues, and incorrect automated rejection. Human review and fallback are essential.",
      aiUse: ["Identify document types, required fields, and validation rules.", "Draft extraction output schema and confidence behavior.", "Generate exception scenarios for missing, unreadable, or inconsistent documents.", "Create human review and audit requirements."],
      inputs: ["Document type list", "Field validation rules", "Compliance policy", "Sample documents", "Operations exception logs"],
      workflow: ["Inventory document types and required fields with source policy.", "Ask AI to draft extraction schema and validation scenarios.", "Define confidence thresholds per field and per document.", "Specify review triggers for low confidence, mismatch, missing page, or regulated decision.", "Design customer messaging for resubmission without exposing sensitive logic.", "Create evaluation set with real-world document variation."],
      deliverables: [["Extraction schema", "Document type, field, format, confidence, and source rule", "BA and data team", "Schema covers required fields"], ["Validation rule matrix", "Rule, evidence, pass condition, failure condition, and review trigger", "Compliance owner", "Rules are source-backed"], ["Human review workflow", "Trigger, reviewer action, SLA, audit, and correction capture", "Operations", "Review queue is operational"], ["Evaluation set", "Document samples, expected extraction, and error categories", "QA and data team", "Test cases cover messy documents"]],
      risks: [["OCR error", "Incorrect field extraction can create wrong decisions", "Use field confidence and human review for material fields"], ["Automated rejection harm", "Customers may be rejected because AI misread a document", "Require fallback and manual review before high-impact rejection"], ["Privacy exposure", "Documents contain sensitive data", "Specify retention, access, masking, and audit"], ["Unrealistic samples", "Clean test documents may not match production", "Use varied samples with blur, rotation, and missing pages"]],
      metric: "Document handling becomes faster while sensitive decisions remain reviewable and evidence-backed."
    },
    vi: {
      title: "AI OCR cho document intake",
      project: "Quy trình onboarding yêu cầu customer upload identity và compliance document. Operations mất thời gian đọc PDF, extract field, detect missing page và yêu cầu customer resubmit document không rõ.",
      challenge: "BA phải đặc tả AI-assisted document extraction và validation đồng thời bảo vệ khỏi OCR error, missing evidence, privacy issue và automated rejection sai. Human review và fallback là essential.",
      aiUse: ["Identify document type, required field và validation rule.", "Draft extraction output schema và confidence behavior.", "Generate exception scenario cho document missing, unreadable hoặc inconsistent.", "Tạo human review và audit requirement."],
      inputs: ["Document type list", "Field validation rules", "Compliance policy", "Sample documents", "Operations exception logs"],
      workflow: ["Inventory document type và required field có source policy.", "Yêu cầu AI draft extraction schema và validation scenario.", "Define confidence threshold theo field và document.", "Specify review trigger cho low confidence, mismatch, missing page hoặc regulated decision.", "Design customer messaging cho resubmission không expose sensitive logic.", "Tạo evaluation set có real-world document variation."],
      deliverables: [["Extraction schema", "Document type, field, format, confidence và source rule", "BA và data team", "Schema cover required field"], ["Validation rule matrix", "Rule, evidence, pass condition, failure condition và review trigger", "Compliance owner", "Rule source-backed"], ["Human review workflow", "Trigger, reviewer action, SLA, audit và correction capture", "Operations", "Review queue operational"], ["Evaluation set", "Document sample, expected extraction và error category", "QA và data team", "Test case cover messy document"]],
      risks: [["OCR error", "Extract field sai có thể tạo decision sai", "Dùng field confidence và human review cho material field"], ["Automated rejection harm", "Customer có thể bị reject vì AI đọc sai document", "Yêu cầu fallback và manual review trước high-impact rejection"], ["Privacy exposure", "Document chứa sensitive data", "Specify retention, access, masking và audit"], ["Unrealistic samples", "Clean test document không giống production", "Dùng sample đa dạng có blur, rotation và missing page"]],
      metric: "Document handling nhanh hơn trong khi sensitive decision vẫn reviewable và evidence-backed."
    }
  },
  {
    slug: "ai-recommendation-explanation",
    group: "AI-enabled product use cases",
    domain: "Decision support",
    en: {
      title: "AI Recommendation Explanation",
      project: "A B2B platform recommends next-best actions to account managers. Stakeholders want the system to suggest outreach actions, but sales leaders worry users will distrust opaque recommendations.",
      challenge: "The BA must specify recommendation behavior, explanation requirements, user controls, feedback capture, evaluation metrics, and boundaries between decision support and automated decisioning.",
      aiUse: ["Draft recommendation output contract and explanation fields.", "Generate user trust and override scenarios.", "Identify data inputs, prohibited signals, and fairness concerns.", "Create acceptance criteria for feedback and monitoring."],
      inputs: ["Business goal", "User journey", "Candidate data signals", "Sales playbook", "Risk and compliance constraints"],
      workflow: ["Define the user decision the recommendation supports.", "Ask AI to separate recommendation, explanation, confidence, and user action.", "Specify allowed data signals and prohibited sensitive attributes.", "Design feedback actions such as accept, dismiss, edit, and reason code.", "Create evaluation metrics for usefulness, accuracy, adoption, and harm.", "Review decision ownership and user messaging with stakeholders."],
      deliverables: [["Recommendation canvas", "Goal, user, trigger, input signals, output, and action", "BA", "Decision support boundary is clear"], ["Explanation requirements", "Why shown, evidence, confidence, and uncertainty language", "Product owner", "Users can understand recommendation rationale"], ["Feedback design", "Accept, reject, edit, reason codes, and correction loop", "UX and BA", "Feedback is captured for learning"], ["Evaluation plan", "Offline and live metrics, adoption, override, and harm signals", "Data team", "Quality is measured after launch"]],
      risks: [["Opaque recommendation", "Users may ignore or misuse suggestions", "Require explanation and uncertainty language"], ["Automation creep", "Decision support may become automated decisioning", "Define user control and approval boundary"], ["Sensitive signal use", "Model may use inappropriate attributes", "List prohibited data and review fairness"], ["Feedback gap", "The team may not learn from overrides", "Capture reason codes and monitor patterns"]],
      metric: "Users understand recommendations, retain decision control, and provide feedback that improves the product."
    },
    vi: {
      title: "Giải thích AI recommendation",
      project: "Một B2B platform recommend next-best action cho account manager. Stakeholder muốn system suggest outreach action, nhưng sales leader lo user không trust recommendation opaque.",
      challenge: "BA phải đặc tả recommendation behavior, explanation requirement, user control, feedback capture, evaluation metric và boundary giữa decision support và automated decisioning.",
      aiUse: ["Draft recommendation output contract và explanation field.", "Generate user trust và override scenario.", "Identify data input, prohibited signal và fairness concern.", "Tạo acceptance criteria cho feedback và monitoring."],
      inputs: ["Business goal", "User journey", "Candidate data signals", "Sales playbook", "Risk và compliance constraints"],
      workflow: ["Define user decision mà recommendation support.", "Yêu cầu AI tách recommendation, explanation, confidence và user action.", "Specify allowed data signal và prohibited sensitive attribute.", "Design feedback action như accept, dismiss, edit và reason code.", "Tạo evaluation metric cho usefulness, accuracy, adoption và harm.", "Review decision ownership và user messaging với stakeholder."],
      deliverables: [["Recommendation canvas", "Goal, user, trigger, input signal, output và action", "BA", "Decision support boundary rõ"], ["Explanation requirements", "Why shown, evidence, confidence và uncertainty language", "Product owner", "User hiểu rationale của recommendation"], ["Feedback design", "Accept, reject, edit, reason code và correction loop", "UX và BA", "Feedback được capture để learning"], ["Evaluation plan", "Offline và live metric, adoption, override và harm signal", "Data team", "Quality được đo sau launch"]],
      risks: [["Opaque recommendation", "User có thể ignore hoặc misuse suggestion", "Yêu cầu explanation và uncertainty language"], ["Automation creep", "Decision support có thể biến thành automated decisioning", "Define user control và approval boundary"], ["Sensitive signal use", "Model có thể dùng attribute không phù hợp", "List prohibited data và review fairness"], ["Feedback gap", "Team không học được từ override", "Capture reason code và monitor pattern"]],
      metric: "User hiểu recommendation, giữ quyền decision và cung cấp feedback cải thiện product."
    }
  },
  {
    slug: "ai-chatbot-human-handoff",
    group: "AI-enabled product use cases",
    domain: "Customer support",
    en: {
      title: "AI Chatbot Human Handoff",
      project: "A customer support team wants a chatbot to answer common questions and hand off complex cases to agents. The business wants fewer tickets, but customer experience cannot degrade when the bot is uncertain.",
      challenge: "The BA must specify supported intents, knowledge sources, refusal behavior, handoff triggers, transcript transfer, agent context, SLA, and monitoring. Handoff is a workflow requirement, not a fallback note.",
      aiUse: ["Draft intent catalog and unsupported intent behavior.", "Generate handoff trigger scenarios.", "Create agent context and transcript requirements.", "Design quality monitoring metrics for containment and customer harm."],
      inputs: ["Support intent list", "FAQ and policy sources", "Escalation process", "Agent workflow", "Customer satisfaction data"],
      workflow: ["Define supported and unsupported intents with source evidence.", "Ask AI to generate handoff triggers such as low confidence, repeated failure, sentiment, risk, or regulated topic.", "Specify what context transfers to the human agent.", "Design user messaging that is honest and helpful.", "Create monitoring metrics for containment, handoff quality, and repeat contact.", "Review failure scenarios with support agents before launch."],
      deliverables: [["Intent catalog", "Intent, source, answer behavior, unsupported behavior, and owner", "BA and support", "Intent boundaries are clear"], ["Handoff rule matrix", "Trigger, user message, agent queue, SLA, and context transfer", "Support lead", "Every trigger has workflow path"], ["Agent context package", "Conversation summary, user goal, attempted answer, and source references", "BA", "Agent receives useful context"], ["Monitoring dashboard spec", "Containment, fallback, repeat contact, CSAT, and escalation patterns", "Operations", "Quality is monitored beyond volume reduction"]],
      risks: [["Poor handoff", "Customers repeat information and lose trust", "Transfer transcript, summary, and source context"], ["Over-containment", "Business may optimize for fewer tickets at customer expense", "Measure repeat contact and satisfaction"], ["Unsupported intent invention", "Bot may answer topics outside scope", "Define refusal and escalation behavior"], ["Agent workflow burden", "Handoff may create extra work for agents", "Design agent context package with support input"]],
      metric: "The chatbot reduces simple workload while complex or risky cases reach humans with context and accountability."
    },
    vi: {
      title: "AI chatbot và human handoff",
      project: "Customer support team muốn chatbot trả lời câu hỏi phổ biến và hand off case phức tạp cho agent. Business muốn giảm ticket, nhưng customer experience không được giảm khi bot uncertain.",
      challenge: "BA phải đặc tả supported intent, knowledge source, refusal behavior, handoff trigger, transcript transfer, agent context, SLA và monitoring. Handoff là workflow requirement, không phải fallback note.",
      aiUse: ["Draft intent catalog và unsupported intent behavior.", "Generate handoff trigger scenario.", "Tạo agent context và transcript requirement.", "Design quality monitoring metric cho containment và customer harm."],
      inputs: ["Support intent list", "FAQ và policy sources", "Escalation process", "Agent workflow", "Customer satisfaction data"],
      workflow: ["Define supported và unsupported intent có source evidence.", "Yêu cầu AI generate handoff trigger như low confidence, repeated failure, sentiment, risk hoặc regulated topic.", "Specify context nào transfer cho human agent.", "Design user messaging trung thực và hữu ích.", "Tạo monitoring metric cho containment, handoff quality và repeat contact.", "Review failure scenario với support agent trước launch."],
      deliverables: [["Intent catalog", "Intent, source, answer behavior, unsupported behavior và owner", "BA và support", "Intent boundary rõ"], ["Handoff rule matrix", "Trigger, user message, agent queue, SLA và context transfer", "Support lead", "Mọi trigger có workflow path"], ["Agent context package", "Conversation summary, user goal, attempted answer và source reference", "BA", "Agent nhận context hữu ích"], ["Monitoring dashboard spec", "Containment, fallback, repeat contact, CSAT và escalation pattern", "Operations", "Quality được monitor beyond volume reduction"]],
      risks: [["Poor handoff", "Customer phải lặp lại thông tin và mất trust", "Transfer transcript, summary và source context"], ["Over-containment", "Business có thể optimize fewer tickets làm hại customer", "Measure repeat contact và satisfaction"], ["Unsupported intent invention", "Bot có thể answer topic ngoài scope", "Define refusal và escalation behavior"], ["Agent workflow burden", "Handoff có thể tạo thêm work cho agent", "Design agent context package với support input"]],
      metric: "Chatbot giảm workload đơn giản trong khi case phức tạp hoặc risky tới human có context và accountability."
    }
  },
  {
    slug: "loan-origination-journey",
    group: "Domain project scenarios",
    domain: "Banking and lending",
    en: {
      title: "Loan Origination Journey Modernization",
      project: "A bank modernizes loan origination for small business customers. The project covers eligibility, document upload, risk assessment, approval workflow, customer notifications, and audit evidence.",
      challenge: "The BA must coordinate regulated requirements across customer experience, credit policy, compliance, operations, and technology. AI can accelerate analysis, but every rule must be source-backed and every automated decision must have review and audit controls.",
      aiUse: ["Map the end-to-end customer and operations journey.", "Extract credit policy rules and document requirements.", "Generate exception scenarios for manual review and escalation.", "Draft traceable requirements for eligibility, notifications, and audit."],
      inputs: ["Credit policy", "Loan application forms", "Operations SOP", "Regulatory guidance", "Customer complaint themes"],
      workflow: ["Build a journey map across customer, system, credit analyst, and operations roles.", "Ask AI to extract policy rules and required documents with source IDs.", "Identify decision points that need human review or audit.", "Draft requirements for eligibility checks, document intake, status visibility, and notifications.", "Review policy and compliance claims with accountable owners.", "Create acceptance criteria and traceability for regulated decisions."],
      deliverables: [["Loan journey map", "Customer steps, system steps, credit review, exceptions, and status messages", "BA", "All actors and handoffs are visible"], ["Policy rule matrix", "Rule, source, threshold, decision owner, and automation eligibility", "Credit policy owner", "Rules are source-backed"], ["Exception workflow", "Manual review trigger, queue, SLA, and customer communication", "Operations", "Risky cases have human path"], ["Audit requirement set", "Evidence captured, retention, reviewer, and decision trace", "Compliance", "Auditors can reconstruct decisions"]],
      risks: [["Regulatory misinterpretation", "AI may paraphrase policy incorrectly", "Use exact source references and compliance validation"], ["Unfair automation", "Eligibility rules may affect customers materially", "Define human review and appeal path"], ["Document friction", "Customers may fail due to unclear upload requirements", "Specify guidance, status, and resubmission flow"], ["Audit gap", "Decisions may not be explainable later", "Capture evidence, source, and reviewer"]],
      metric: "The modernized loan journey is faster for customers while credit decisions remain explainable and compliant."
    },
    vi: {
      title: "Modernize journey loan origination",
      project: "Ngân hàng modernize loan origination cho small business customer. Project cover eligibility, document upload, risk assessment, approval workflow, customer notification và audit evidence.",
      challenge: "BA phải coordinate requirement regulated qua customer experience, credit policy, compliance, operations và technology. AI tăng tốc analysis, nhưng mọi rule phải source-backed và mọi automated decision phải có review và audit control.",
      aiUse: ["Map end-to-end customer và operations journey.", "Extract credit policy rule và document requirement.", "Generate exception scenario cho manual review và escalation.", "Draft traceable requirement cho eligibility, notification và audit."],
      inputs: ["Credit policy", "Loan application forms", "Operations SOP", "Regulatory guidance", "Customer complaint themes"],
      workflow: ["Build journey map qua customer, system, credit analyst và operations role.", "Yêu cầu AI extract policy rule và required document có source ID.", "Identify decision point cần human review hoặc audit.", "Draft requirement cho eligibility check, document intake, status visibility và notification.", "Review policy và compliance claim với accountable owner.", "Tạo acceptance criteria và traceability cho regulated decision."],
      deliverables: [["Loan journey map", "Customer step, system step, credit review, exception và status message", "BA", "Mọi actor và handoff visible"], ["Policy rule matrix", "Rule, source, threshold, decision owner và automation eligibility", "Credit policy owner", "Rule source-backed"], ["Exception workflow", "Manual review trigger, queue, SLA và customer communication", "Operations", "Case risky có human path"], ["Audit requirement set", "Evidence captured, retention, reviewer và decision trace", "Compliance", "Auditor reconstruct được decision"]],
      risks: [["Regulatory misinterpretation", "AI có thể paraphrase policy sai", "Dùng exact source reference và compliance validation"], ["Unfair automation", "Eligibility rule ảnh hưởng material tới customer", "Define human review và appeal path"], ["Document friction", "Customer fail vì upload requirement không rõ", "Specify guidance, status và resubmission flow"], ["Audit gap", "Decision có thể không explainable sau này", "Capture evidence, source và reviewer"]],
      metric: "Loan journey mới nhanh hơn cho customer trong khi credit decision vẫn explainable và compliant."
    }
  },
  {
    slug: "insurance-claim-intake",
    group: "Domain project scenarios",
    domain: "Insurance",
    en: {
      title: "Insurance Claim Intake Automation",
      project: "An insurer wants to digitize claim intake for property claims. Customers submit claim details, photos, invoices, and incident descriptions, while claims handlers need triage, missing information detection, and fraud risk cues.",
      challenge: "The BA must specify an intake flow that improves speed without making unsupported claim decisions. AI can summarize claim narratives and detect missing documents, but coverage decisions and fraud escalation need clear controls.",
      aiUse: ["Extract claim facts from customer narratives and attachments.", "Identify missing information and document gaps.", "Generate triage categories and escalation triggers.", "Draft handler summary with evidence and uncertainty labels."],
      inputs: ["Claim forms", "Coverage policy", "Document checklist", "Fraud indicators", "Claims handler workflow"],
      workflow: ["Map customer submission and handler triage journey.", "Ask AI to draft extraction fields and missing information rules.", "Specify confidence behavior for extracted facts and document completeness.", "Define triage categories, fraud risk cues, and human review triggers.", "Design customer follow-up messages for missing evidence.", "Create evaluation cases for typical, incomplete, and suspicious claims."],
      deliverables: [["Claim intake flow", "Customer steps, document upload, triage, review, and follow-up", "BA", "Journey covers incomplete submissions"], ["Extraction and summary schema", "Claim facts, source evidence, confidence, and uncertainty", "Claims operations", "Handler sees evidence labels"], ["Missing information rules", "Required document, condition, customer message, and SLA", "Claims owner", "Requests are specific and fair"], ["Escalation matrix", "Trigger, risk level, queue, reviewer, and audit record", "Risk owner", "Suspicious cases have controlled path"]],
      risks: [["Unsupported denial", "AI may imply claim outcome before handler review", "Separate intake support from coverage decision"], ["Evidence mismatch", "Photos or invoices may not support claim narrative", "Require source-linked fact extraction"], ["Customer frustration", "Generic missing-info messages create repeat contact", "Generate specific, policy-backed requests"], ["Fraud overflagging", "False positives can harm customer trust", "Use human review and reason codes"]],
      metric: "Claim intake becomes faster and clearer while coverage and fraud decisions remain human-governed."
    },
    vi: {
      title: "Automation insurance claim intake",
      project: "Insurer muốn digitize claim intake cho property claim. Customer submit claim detail, photo, invoice và incident description, trong khi claims handler cần triage, detect missing information và fraud risk cue.",
      challenge: "BA phải đặc tả intake flow cải thiện speed nhưng không tạo unsupported claim decision. AI có thể summarize claim narrative và detect missing document, nhưng coverage decision và fraud escalation cần control rõ.",
      aiUse: ["Extract claim fact từ customer narrative và attachment.", "Identify missing information và document gap.", "Generate triage category và escalation trigger.", "Draft handler summary có evidence và uncertainty label."],
      inputs: ["Claim forms", "Coverage policy", "Document checklist", "Fraud indicators", "Claims handler workflow"],
      workflow: ["Map customer submission và handler triage journey.", "Yêu cầu AI draft extraction field và missing information rule.", "Specify confidence behavior cho extracted fact và document completeness.", "Define triage category, fraud risk cue và human review trigger.", "Design customer follow-up message cho missing evidence.", "Tạo evaluation case cho typical, incomplete và suspicious claim."],
      deliverables: [["Claim intake flow", "Customer step, document upload, triage, review và follow-up", "BA", "Journey cover incomplete submission"], ["Extraction and summary schema", "Claim fact, source evidence, confidence và uncertainty", "Claims operations", "Handler thấy evidence label"], ["Missing information rules", "Required document, condition, customer message và SLA", "Claims owner", "Request specific và fair"], ["Escalation matrix", "Trigger, risk level, queue, reviewer và audit record", "Risk owner", "Suspicious case có controlled path"]],
      risks: [["Unsupported denial", "AI có thể imply claim outcome trước handler review", "Tách intake support khỏi coverage decision"], ["Evidence mismatch", "Photo hoặc invoice có thể không support claim narrative", "Yêu cầu source-linked fact extraction"], ["Customer frustration", "Missing-info message generic tạo repeat contact", "Generate request specific và policy-backed"], ["Fraud overflagging", "False positive làm hại customer trust", "Dùng human review và reason code"]],
      metric: "Claim intake nhanh và rõ hơn trong khi coverage và fraud decision vẫn human-governed."
    }
  },
  {
    slug: "ecommerce-return-refund",
    group: "Domain project scenarios",
    domain: "E-commerce",
    en: {
      title: "E-commerce Return and Refund Flow",
      project: "An e-commerce platform redesigns return and refund flows to reduce support contacts. The project includes eligibility checks, return reason capture, shipping label generation, refund timing, and exception handling.",
      challenge: "The BA must define business rules that vary by product type, order status, region, promotion, payment method, and fraud risk. AI can expand scenarios, but policy decisions must remain traceable.",
      aiUse: ["Generate return scenarios from policy and order states.", "Identify edge cases across payment, shipping, promotion, and inventory.", "Draft customer messaging and support scripts.", "Create rule matrix and acceptance criteria."],
      inputs: ["Return policy", "Order state model", "Payment rules", "Shipping carrier rules", "Support ticket themes"],
      workflow: ["Map order and return states from purchase to refund completion.", "Ask AI to generate scenario combinations and missing rules.", "Create eligibility matrix by product, region, payment, and time window.", "Review high-impact exceptions with finance, fraud, logistics, and customer support.", "Draft acceptance criteria for customer and support experiences.", "Prepare rollout support scripts and monitoring metrics."],
      deliverables: [["Return eligibility matrix", "Condition, rule, source, customer message, and exception path", "BA", "Eligibility rules are testable"], ["State transition diagram", "Order, return, refund, exception, and cancellation states", "BA and engineering", "State changes are explicit"], ["Support script pack", "Customer explanation, exception handling, and escalation", "Support lead", "Agents can explain outcomes"], ["Acceptance criteria set", "Positive, negative, boundary, and fraud-risk cases", "BA and QA", "Key scenarios are covered"]],
      risks: [["Policy conflict", "Regional or promotion rules may conflict with generic policy", "Use source hierarchy and conflict resolution"], ["Refund timing ambiguity", "Customers may not know when money returns", "Specify status messages and payment-method timing"], ["Fraud loophole", "Overly simple rules can be exploited", "Include fraud review triggers"], ["Inventory mismatch", "Return acceptance may not align with inventory process", "Review logistics and warehouse states"]],
      metric: "Customers can complete eligible returns with fewer support contacts and clearer refund expectations."
    },
    vi: {
      title: "Flow return và refund e-commerce",
      project: "E-commerce platform redesign return và refund flow để giảm support contact. Project gồm eligibility check, return reason capture, shipping label generation, refund timing và exception handling.",
      challenge: "BA phải define business rule thay đổi theo product type, order status, region, promotion, payment method và fraud risk. AI có thể expand scenario, nhưng policy decision phải traceable.",
      aiUse: ["Generate return scenario từ policy và order state.", "Identify edge case qua payment, shipping, promotion và inventory.", "Draft customer messaging và support script.", "Tạo rule matrix và acceptance criteria."],
      inputs: ["Return policy", "Order state model", "Payment rules", "Shipping carrier rules", "Support ticket themes"],
      workflow: ["Map order và return state từ purchase tới refund completion.", "Yêu cầu AI generate scenario combination và missing rule.", "Tạo eligibility matrix theo product, region, payment và time window.", "Review high-impact exception với finance, fraud, logistics và customer support.", "Draft acceptance criteria cho customer và support experience.", "Prepare rollout support script và monitoring metric."],
      deliverables: [["Return eligibility matrix", "Condition, rule, source, customer message và exception path", "BA", "Eligibility rule testable"], ["State transition diagram", "Order, return, refund, exception và cancellation state", "BA và engineering", "State change explicit"], ["Support script pack", "Customer explanation, exception handling và escalation", "Support lead", "Agent explain được outcome"], ["Acceptance criteria set", "Positive, negative, boundary và fraud-risk case", "BA và QA", "Key scenario covered"]],
      risks: [["Policy conflict", "Regional hoặc promotion rule có thể conflict generic policy", "Dùng source hierarchy và conflict resolution"], ["Refund timing ambiguity", "Customer không biết khi nào tiền về", "Specify status message và timing theo payment method"], ["Fraud loophole", "Rule quá đơn giản có thể bị exploit", "Include fraud review trigger"], ["Inventory mismatch", "Return acceptance có thể không align inventory process", "Review logistics và warehouse state"]],
      metric: "Customer hoàn thành eligible return với ít support contact hơn và refund expectation rõ hơn."
    }
  },
  {
    slug: "healthcare-appointment-intake",
    group: "Domain project scenarios",
    domain: "Healthcare operations",
    en: {
      title: "Healthcare Appointment Intake",
      project: "A clinic network wants to improve appointment intake and routing. Patients submit symptoms, preferred times, insurance information, and referral details before scheduling.",
      challenge: "The BA must specify intake support without turning AI into a medical decision maker. The system can structure information and route requests, but clinical triage, emergency guidance, privacy, and consent require strict boundaries.",
      aiUse: ["Structure patient-provided information into intake fields.", "Detect missing insurance, referral, or scheduling information.", "Generate routing suggestions with uncertainty labels.", "Draft safe messaging and escalation triggers."],
      inputs: ["Scheduling workflow", "Insurance and referral rules", "Privacy requirements", "Clinic specialty list", "Current intake forms"],
      workflow: ["Define what the assistant may and may not infer from patient text.", "Ask AI to map intake fields and missing information prompts.", "Specify routing suggestions as administrative support, not diagnosis.", "Add emergency and clinical escalation messaging approved by clinical owners.", "Design privacy, consent, and data retention requirements.", "Create evaluation cases with incomplete, urgent, and sensitive scenarios."],
      deliverables: [["Intake field schema", "Field, source, validation, sensitivity, and required status", "BA", "Fields are privacy reviewed"], ["Routing rule matrix", "Administrative routing cues, confidence, fallback, and owner", "Clinic operations", "Routing avoids clinical diagnosis"], ["Safe messaging set", "Missing info, urgent warning, privacy notice, and escalation", "Clinical owner", "Messages are approved"], ["Evaluation cases", "Incomplete, urgent, routine, and sensitive examples", "QA and clinical reviewer", "Safety cases are tested"]],
      risks: [["Clinical overreach", "AI may appear to diagnose or triage clinically", "Limit scope to intake and approved escalation"], ["Privacy violation", "Health data is sensitive and regulated", "Specify consent, retention, access, and audit"], ["Unsafe delay", "Urgent symptoms may be treated as normal scheduling", "Use approved emergency messaging and escalation"], ["Insurance confusion", "Incorrect routing can delay care", "Validate insurance and referral rules"]],
      metric: "Appointment intake becomes clearer and faster while clinical decisions remain outside AI scope."
    },
    vi: {
      title: "Healthcare appointment intake",
      project: "Một clinic network muốn cải thiện appointment intake và routing. Patient submit symptom, preferred time, insurance information và referral detail trước scheduling.",
      challenge: "BA phải đặc tả intake support mà không biến AI thành medical decision maker. System có thể structure information và route request, nhưng clinical triage, emergency guidance, privacy và consent cần boundary nghiêm ngặt.",
      aiUse: ["Structure patient-provided information thành intake field.", "Detect missing insurance, referral hoặc scheduling information.", "Generate routing suggestion có uncertainty label.", "Draft safe messaging và escalation trigger."],
      inputs: ["Scheduling workflow", "Insurance và referral rules", "Privacy requirements", "Clinic specialty list", "Current intake forms"],
      workflow: ["Define assistant được và không được infer gì từ patient text.", "Yêu cầu AI map intake field và missing information prompt.", "Specify routing suggestion như administrative support, không phải diagnosis.", "Thêm emergency và clinical escalation messaging approved bởi clinical owner.", "Design privacy, consent và data retention requirement.", "Tạo evaluation case với incomplete, urgent và sensitive scenario."],
      deliverables: [["Intake field schema", "Field, source, validation, sensitivity và required status", "BA", "Field được privacy review"], ["Routing rule matrix", "Administrative routing cue, confidence, fallback và owner", "Clinic operations", "Routing tránh clinical diagnosis"], ["Safe messaging set", "Missing info, urgent warning, privacy notice và escalation", "Clinical owner", "Message approved"], ["Evaluation cases", "Incomplete, urgent, routine và sensitive example", "QA và clinical reviewer", "Safety case được test"]],
      risks: [["Clinical overreach", "AI có thể trông như diagnose hoặc clinical triage", "Limit scope vào intake và approved escalation"], ["Privacy violation", "Health data sensitive và regulated", "Specify consent, retention, access và audit"], ["Unsafe delay", "Urgent symptom có thể bị xử như normal scheduling", "Dùng approved emergency messaging và escalation"], ["Insurance confusion", "Routing sai có thể delay care", "Validate insurance và referral rule"]],
      metric: "Appointment intake rõ và nhanh hơn trong khi clinical decision nằm ngoài scope AI."
    }
  },
  {
    slug: "hr-employee-service-portal",
    group: "Domain project scenarios",
    domain: "HR service delivery",
    en: {
      title: "HR Employee Service Portal",
      project: "HR wants a portal where employees can request letters, ask policy questions, update personal information, and track case status. Current requests are handled through email and shared mailboxes.",
      challenge: "The BA must define service catalog, request forms, approval rules, privacy boundaries, knowledge search, case status, and escalation. AI can improve self-service, but HR policy answers and personal data changes need controls.",
      aiUse: ["Cluster historical HR emails into service categories.", "Draft request forms and required fields.", "Generate policy assistant requirements with source and fallback rules.", "Identify privacy and role-based access scenarios."],
      inputs: ["HR mailbox samples", "Policy documents", "Service catalog drafts", "Approval rules", "Employee data privacy policy"],
      workflow: ["Analyze historical requests and cluster service categories.", "Ask AI to propose request form fields and missing rules per service.", "Define service catalog with eligibility, SLA, owner, and required evidence.", "Specify policy-answering behavior with citations and fallback to HR.", "Review personal data changes for privacy and approval needs.", "Publish service portal requirements and support transition plan."],
      deliverables: [["Service catalog", "Service, eligibility, fields, SLA, owner, and escalation", "HR operations", "Employees know where to go"], ["Request form specification", "Field, validation, evidence, permission, and status messages", "BA", "Forms reduce back-and-forth"], ["Policy assistant rules", "Source, citation, fallback, and conflict behavior", "HR policy owner", "Answers are grounded"], ["Privacy matrix", "Employee data, role access, audit, and approval", "Security and HR", "Sensitive data is protected"]],
      risks: [["Mailbox pattern bias", "Historical emails reflect current confusion, not ideal service design", "Validate service catalog with HR owners"], ["Policy hallucination", "Assistant may answer from stale or wrong policy", "Use RAG source controls and citations"], ["Privacy exposure", "Employee data changes are sensitive", "Define access, audit, and approval"], ["Poor adoption", "Employees may continue emailing HR", "Add status visibility and clear service routing"]],
      metric: "Employees can complete common HR requests through structured self-service with clear status and privacy controls."
    },
    vi: {
      title: "HR employee service portal",
      project: "HR muốn portal để employee request letter, hỏi policy, update personal information và track case status. Hiện request xử lý qua email và shared mailbox.",
      challenge: "BA phải define service catalog, request form, approval rule, privacy boundary, knowledge search, case status và escalation. AI có thể cải thiện self-service, nhưng HR policy answer và personal data change cần control.",
      aiUse: ["Cluster historical HR email thành service category.", "Draft request form và required field.", "Generate policy assistant requirement có source và fallback rule.", "Identify privacy và role-based access scenario."],
      inputs: ["HR mailbox samples", "Policy documents", "Service catalog drafts", "Approval rules", "Employee data privacy policy"],
      workflow: ["Analyze historical request và cluster service category.", "Yêu cầu AI propose request form field và missing rule theo service.", "Define service catalog có eligibility, SLA, owner và required evidence.", "Specify policy-answering behavior có citation và fallback tới HR.", "Review personal data change cho privacy và approval need.", "Publish service portal requirement và support transition plan."],
      deliverables: [["Service catalog", "Service, eligibility, field, SLA, owner và escalation", "HR operations", "Employee biết đi đâu"], ["Request form specification", "Field, validation, evidence, permission và status message", "BA", "Form giảm back-and-forth"], ["Policy assistant rules", "Source, citation, fallback và conflict behavior", "HR policy owner", "Answer grounded"], ["Privacy matrix", "Employee data, role access, audit và approval", "Security và HR", "Sensitive data protected"]],
      risks: [["Mailbox pattern bias", "Historical email phản ánh confusion hiện tại, không phải ideal service design", "Validate service catalog với HR owner"], ["Policy hallucination", "Assistant có thể answer từ stale hoặc wrong policy", "Dùng RAG source control và citation"], ["Privacy exposure", "Employee data change sensitive", "Define access, audit và approval"], ["Poor adoption", "Employee có thể tiếp tục email HR", "Thêm status visibility và clear service routing"]],
      metric: "Employee hoàn thành common HR request qua structured self-service có status rõ và privacy control."
    }
  },
  {
    slug: "finance-reconciliation-exception",
    group: "Domain project scenarios",
    domain: "Finance operations",
    en: {
      title: "Finance Reconciliation Exception Workflow",
      project: "A finance operations team reconciles payments, invoices, and ledger entries. Exceptions are handled manually through spreadsheets, emails, and analyst judgment, causing delays and audit concerns.",
      challenge: "The BA must specify an exception workflow that classifies mismatch types, captures evidence, routes work, supports analyst decisions, and preserves auditability. AI can suggest matches or categories, but finance approval remains human-owned.",
      aiUse: ["Cluster exception types and recurring mismatch patterns.", "Draft analyst work queue requirements.", "Generate evidence capture and decision reason codes.", "Create human review and audit trail requirements."],
      inputs: ["Exception logs", "Reconciliation rules", "Invoice and payment data definitions", "Audit requirements", "Analyst SOPs"],
      workflow: ["Analyze exception history and classify mismatch categories.", "Ask AI to propose routing rules and decision support fields.", "Define evidence needed for each exception type.", "Specify analyst actions: match, split, escalate, write off, or request information.", "Design audit trail, approval, and segregation-of-duty requirements.", "Create metrics for aging, resolution, override, and repeat exception patterns."],
      deliverables: [["Exception taxonomy", "Mismatch type, example, root cause, owner, and priority", "Finance operations", "Analysts share common language"], ["Work queue specification", "Routing, priority, SLA, status, and assignment rules", "BA", "Exceptions move predictably"], ["Decision reason codes", "Allowed actions, evidence, approval, and audit need", "Finance controller", "Decisions are explainable"], ["Monitoring metrics", "Aging, resolution, repeat exception, and override trends", "Operations lead", "Process health is visible"]],
      risks: [["Automated finance decision", "AI suggestions may be treated as approval", "Keep analyst approval and audit trail"], ["Poor taxonomy", "Categories may not match real analyst work", "Validate with exception samples"], ["Audit weakness", "Reason for resolution may be missing", "Require evidence and reason codes"], ["Segregation issue", "Same user may create and approve adjustments", "Define role controls and approvals"]],
      metric: "Exception resolution becomes faster while finance decisions remain controlled and auditable."
    },
    vi: {
      title: "Workflow finance reconciliation exception",
      project: "Finance operations team reconcile payment, invoice và ledger entry. Exception xử lý thủ công qua spreadsheet, email và analyst judgment, gây delay và audit concern.",
      challenge: "BA phải đặc tả exception workflow classify mismatch type, capture evidence, route work, support analyst decision và giữ auditability. AI có thể suggest match hoặc category, nhưng finance approval vẫn do human own.",
      aiUse: ["Cluster exception type và recurring mismatch pattern.", "Draft analyst work queue requirement.", "Generate evidence capture và decision reason code.", "Tạo human review và audit trail requirement."],
      inputs: ["Exception logs", "Reconciliation rules", "Invoice và payment data definitions", "Audit requirements", "Analyst SOPs"],
      workflow: ["Analyze exception history và classify mismatch category.", "Yêu cầu AI propose routing rule và decision support field.", "Define evidence needed cho từng exception type.", "Specify analyst action: match, split, escalate, write off hoặc request information.", "Design audit trail, approval và segregation-of-duty requirement.", "Tạo metric cho aging, resolution, override và repeat exception pattern."],
      deliverables: [["Exception taxonomy", "Mismatch type, example, root cause, owner và priority", "Finance operations", "Analyst có common language"], ["Work queue specification", "Routing, priority, SLA, status và assignment rule", "BA", "Exception move predictably"], ["Decision reason codes", "Allowed action, evidence, approval và audit need", "Finance controller", "Decision explainable"], ["Monitoring metrics", "Aging, resolution, repeat exception và override trend", "Operations lead", "Process health visible"]],
      risks: [["Automated finance decision", "AI suggestion có thể bị xem là approval", "Giữ analyst approval và audit trail"], ["Poor taxonomy", "Category có thể không match work thật của analyst", "Validate với exception sample"], ["Audit weakness", "Reason resolution có thể missing", "Yêu cầu evidence và reason code"], ["Segregation issue", "Cùng user có thể create và approve adjustment", "Define role control và approval"]],
      metric: "Exception resolution nhanh hơn trong khi finance decision vẫn controlled và auditable."
    }
  },
  {
    slug: "vendor-selection-ai-tool",
    group: "Governance and adoption",
    domain: "Vendor evaluation",
    en: {
      title: "Vendor Selection for an AI Tool",
      project: "A BA practice evaluates AI tools for requirements drafting, meeting synthesis, document review, and internal knowledge search. Vendors promise productivity gains, but compliance and IT worry about data leakage and governance.",
      challenge: "The BA lead must define evaluation criteria that cover use-case fit, data handling, security, audit, model behavior, integrations, admin controls, cost, and adoption support. AI can help compare vendor claims, but claims must be verified.",
      aiUse: ["Build a vendor scorecard from BA use cases and risk tiers.", "Extract vendor claims and map them to required evidence.", "Generate demo scripts and validation questions.", "Draft pilot success metrics and governance gates."],
      inputs: ["BA use-case portfolio", "Security requirements", "Vendor documentation", "Procurement criteria", "Compliance policy"],
      workflow: ["Define approved BA use cases and prohibited data before vendor demos.", "Ask AI to create a weighted scorecard by value and risk.", "Map vendor claims to evidence required: documentation, demo, contract, or security review.", "Create scenario-based demo scripts using real BA workflows.", "Run pilot evaluation with quality, cycle time, and risk metrics.", "Prepare recommendation with conditions and rollout controls."],
      deliverables: [["Vendor scorecard", "Criteria, weight, evidence, score, and risk notes", "BA lead and procurement", "Scores are evidence-based"], ["Demo script", "BA workflows, test data, expected outputs, and failure checks", "BA lead", "Demo tests real work"], ["Security and governance checklist", "Data, retention, audit, admin, access, and compliance controls", "IT and compliance", "Risks are reviewed"], ["Pilot success plan", "Metrics, participants, use cases, quality gates, and decision criteria", "Sponsor", "Pilot can produce decision"]],
      risks: [["Vendor-led scope", "Demo may shape requirements before BA defines needs", "Start from BA use cases and risk tiers"], ["Unverified claims", "Marketing statements may not reflect product capability", "Require evidence type for each claim"], ["Data leakage", "Tools may process confidential data unsafely", "Review data handling and approved-use policy"], ["Adoption theater", "Users may try tool without quality improvement", "Measure artifact quality and rework, not only usage"]],
      metric: "Vendor selection is driven by BA workflow value, verified controls, and pilot evidence."
    },
    vi: {
      title: "Chọn vendor cho AI tool",
      project: "Một BA practice evaluate AI tool cho requirements drafting, meeting synthesis, document review và internal knowledge search. Vendor promise productivity gain, nhưng compliance và IT lo data leakage và governance.",
      challenge: "BA lead phải define evaluation criteria cover use-case fit, data handling, security, audit, model behavior, integration, admin control, cost và adoption support. AI có thể hỗ trợ compare vendor claim, nhưng claim phải verify.",
      aiUse: ["Build vendor scorecard từ BA use case và risk tier.", "Extract vendor claim và map với required evidence.", "Generate demo script và validation question.", "Draft pilot success metric và governance gate."],
      inputs: ["BA use-case portfolio", "Security requirements", "Vendor documentation", "Procurement criteria", "Compliance policy"],
      workflow: ["Define approved BA use case và prohibited data trước vendor demo.", "Yêu cầu AI tạo weighted scorecard theo value và risk.", "Map vendor claim tới evidence required: documentation, demo, contract hoặc security review.", "Tạo scenario-based demo script dùng workflow BA thật.", "Run pilot evaluation với quality, cycle time và risk metric.", "Prepare recommendation có condition và rollout control."],
      deliverables: [["Vendor scorecard", "Criteria, weight, evidence, score và risk note", "BA lead và procurement", "Score evidence-based"], ["Demo script", "BA workflow, test data, expected output và failure check", "BA lead", "Demo test real work"], ["Security and governance checklist", "Data, retention, audit, admin, access và compliance control", "IT và compliance", "Risk được review"], ["Pilot success plan", "Metric, participant, use case, quality gate và decision criteria", "Sponsor", "Pilot tạo được decision"]],
      risks: [["Vendor-led scope", "Demo có thể shape requirement trước khi BA define need", "Start từ BA use case và risk tier"], ["Unverified claims", "Marketing statement có thể không reflect capability thật", "Require evidence type cho từng claim"], ["Data leakage", "Tool có thể process confidential data không an toàn", "Review data handling và approved-use policy"], ["Adoption theater", "User có thể thử tool nhưng quality không cải thiện", "Measure artifact quality và rework, không chỉ usage"]],
      metric: "Vendor selection được drive bởi BA workflow value, verified control và pilot evidence."
    }
  },
  {
    slug: "data-privacy-ai-assessment",
    group: "Governance and adoption",
    domain: "Privacy and compliance",
    en: {
      title: "Data Privacy Assessment for AI Use",
      project: "A project team wants to use AI to summarize customer interviews, analyze support tickets, and draft requirements. The data includes customer names, account details, complaints, and potentially sensitive information.",
      challenge: "The BA must help define what data can be used with AI, what must be redacted, which tools are approved, and what review controls are required. AI productivity cannot come at the cost of privacy or trust.",
      aiUse: ["Classify BA data types by sensitivity and approved use.", "Generate redaction checklist and safe prompt patterns.", "Draft risk-tiered AI usage rules.", "Create review questions for legal, security, and project owners."],
      inputs: ["Data inventory", "Privacy policy", "Approved tool list", "Project artifacts", "Customer data examples"],
      workflow: ["Inventory data types used in BA work and where they appear.", "Ask AI to propose sensitivity categories, then validate with privacy owners.", "Define prohibited data, redaction rules, approved tools, and storage expectations.", "Create safe prompt patterns for low-risk drafting and review tasks.", "Set review gates for sensitive or customer-identifiable data.", "Publish a project AI data-use checklist."],
      deliverables: [["AI data-use matrix", "Data type, sensitivity, allowed tool, redaction, and approval need", "BA and privacy owner", "Teams know what is allowed"], ["Redaction checklist", "Fields to remove, transform, mask, or avoid", "BA", "Sensitive data is handled consistently"], ["Risk-tier policy", "Low, medium, and high-risk AI tasks with controls", "Compliance", "Controls match sensitivity"], ["Safe prompt guide", "Approved prompt patterns and prohibited examples", "BA lead", "BAs can work safely"]],
      risks: [["PII leakage", "Customer data may be sent to unapproved tools", "Use approved tools and redaction rules"], ["Over-redaction", "Removing too much context can reduce analysis quality", "Balance privacy with source-safe summaries"], ["Policy ambiguity", "Teams may interpret rules differently", "Create examples of allowed and prohibited use"], ["Shadow AI use", "People may bypass controls if guidance is impractical", "Provide usable safe workflows"]],
      metric: "BA teams use AI with clear data boundaries, approved tools, and practical privacy controls."
    },
    vi: {
      title: "Assessment data privacy cho AI use",
      project: "Project team muốn dùng AI summarize customer interview, analyze support ticket và draft requirement. Data có customer name, account detail, complaint và thông tin có thể sensitive.",
      challenge: "BA phải giúp define data nào được dùng với AI, data nào phải redact, tool nào approved và review control nào required. Productivity từ AI không được đánh đổi privacy hoặc trust.",
      aiUse: ["Classify BA data type theo sensitivity và approved use.", "Generate redaction checklist và safe prompt pattern.", "Draft AI usage rule theo risk tier.", "Tạo review question cho legal, security và project owner."],
      inputs: ["Data inventory", "Privacy policy", "Approved tool list", "Project artifacts", "Customer data examples"],
      workflow: ["Inventory data type dùng trong BA work và nơi chúng xuất hiện.", "Yêu cầu AI propose sensitivity category, sau đó validate với privacy owner.", "Define prohibited data, redaction rule, approved tool và storage expectation.", "Tạo safe prompt pattern cho low-risk drafting và review task.", "Set review gate cho sensitive hoặc customer-identifiable data.", "Publish project AI data-use checklist."],
      deliverables: [["AI data-use matrix", "Data type, sensitivity, allowed tool, redaction và approval need", "BA và privacy owner", "Team biết điều gì allowed"], ["Redaction checklist", "Field cần remove, transform, mask hoặc avoid", "BA", "Sensitive data được xử lý consistent"], ["Risk-tier policy", "Low, medium và high-risk AI task với control", "Compliance", "Control match sensitivity"], ["Safe prompt guide", "Approved prompt pattern và prohibited example", "BA lead", "BA làm việc an toàn"]],
      risks: [["PII leakage", "Customer data có thể gửi vào unapproved tool", "Dùng approved tool và redaction rule"], ["Over-redaction", "Remove quá nhiều context làm giảm analysis quality", "Balance privacy với source-safe summary"], ["Policy ambiguity", "Team có thể interpret rule khác nhau", "Tạo example allowed và prohibited use"], ["Shadow AI use", "Người dùng có thể bypass control nếu guidance không practical", "Cung cấp workflow an toàn usable"]],
      metric: "BA team dùng AI với data boundary rõ, approved tool và privacy control thực tế."
    }
  },
  {
    slug: "ba-ai-adoption-playbook",
    group: "Governance and adoption",
    domain: "BA practice leadership",
    en: {
      title: "BA AI Adoption Playbook",
      project: "A BA manager wants to scale AI use across a 20-person BA practice. Some BAs are advanced, some are skeptical, and there is no shared standard for prompts, data handling, review, or artifact quality.",
      challenge: "The BA lead must turn AI enthusiasm into a managed capability with use-case tiers, training, prompt library, quality gates, governance, measurement, and coaching. Adoption must improve BA quality, not just activity.",
      aiUse: ["Inventory BA workflows and classify AI use cases by value and risk.", "Generate standard prompt patterns and review rubrics.", "Draft training paths by skill level.", "Create adoption metrics beyond tool usage."],
      inputs: ["BA workflow list", "Current artifacts", "Tool policy", "Quality pain points", "Team skill assessment"],
      workflow: ["Map BA workflows where AI can support drafting, synthesis, review, and analysis.", "Classify use cases into low, medium, and high-risk tiers.", "Create approved prompt patterns with context and evidence rules.", "Define quality gates for AI-assisted artifacts.", "Pilot with selected BAs and measure quality, cycle time, and rework.", "Scale through coaching, playbooks, and community review rituals."],
      deliverables: [["Use-case portfolio", "Workflow, value, risk, allowed data, approved tool, and review need", "BA lead", "Use cases are risk-tiered"], ["Prompt and context library", "Reusable prompts, input checklist, output schema, and review rubric", "BA practice", "BAs reuse shared standards"], ["Training plan", "Foundation, practitioner, reviewer, and lead modules", "BA manager", "Training matches skill level"], ["Adoption scorecard", "Usage, artifact quality, cycle time, defects, and rework", "Sponsor", "Success is quality-based"]],
      risks: [["Tool-first adoption", "Teams may focus on features instead of work quality", "Start from BA workflows and problems"], ["Inconsistent artifacts", "Each BA may create different standards", "Use shared prompt library and rubrics"], ["Unsafe data use", "People may paste sensitive data into AI tools", "Define approved tools and data rules"], ["No quality proof", "Adoption may look successful but not improve outcomes", "Measure defects, rework, and stakeholder confidence"]],
      metric: "The BA practice adopts AI through shared patterns, review gates, and measurable quality improvement."
    },
    vi: {
      title: "Playbook adoption AI cho BA team",
      project: "BA manager muốn scale AI use trong BA practice 20 người. Một số BA advanced, một số skeptical, và chưa có shared standard cho prompt, data handling, review hoặc artifact quality.",
      challenge: "BA lead phải biến AI enthusiasm thành managed capability có use-case tier, training, prompt library, quality gate, governance, measurement và coaching. Adoption phải cải thiện BA quality, không chỉ tăng activity.",
      aiUse: ["Inventory BA workflow và classify AI use case theo value và risk.", "Generate standard prompt pattern và review rubric.", "Draft training path theo skill level.", "Tạo adoption metric beyond tool usage."],
      inputs: ["BA workflow list", "Current artifacts", "Tool policy", "Quality pain points", "Team skill assessment"],
      workflow: ["Map BA workflow nơi AI support drafting, synthesis, review và analysis.", "Classify use case thành low, medium và high-risk tier.", "Tạo approved prompt pattern có context và evidence rule.", "Define quality gate cho AI-assisted artifact.", "Pilot với BA được chọn và measure quality, cycle time và rework.", "Scale qua coaching, playbook và community review ritual."],
      deliverables: [["Use-case portfolio", "Workflow, value, risk, allowed data, approved tool và review need", "BA lead", "Use case risk-tiered"], ["Prompt and context library", "Reusable prompt, input checklist, output schema và review rubric", "BA practice", "BA reuse shared standard"], ["Training plan", "Foundation, practitioner, reviewer và lead module", "BA manager", "Training match skill level"], ["Adoption scorecard", "Usage, artifact quality, cycle time, defect và rework", "Sponsor", "Success quality-based"]],
      risks: [["Tool-first adoption", "Team focus tool feature thay vì work quality", "Start từ BA workflow và problem"], ["Inconsistent artifacts", "Mỗi BA có thể tạo standard khác nhau", "Dùng shared prompt library và rubric"], ["Unsafe data use", "Người dùng có thể paste sensitive data vào AI tool", "Define approved tool và data rule"], ["No quality proof", "Adoption nhìn thành công nhưng không cải thiện outcome", "Measure defect, rework và stakeholder confidence"]],
      metric: "BA practice adopt AI bằng shared pattern, review gate và quality improvement đo được."
    }
  },
  {
    slug: "portfolio-use-case-prioritization",
    group: "Governance and adoption",
    domain: "Portfolio management",
    en: {
      title: "AI Use Case Portfolio Prioritization",
      project: "Leadership has a long list of AI ideas: meeting summaries, requirements drafting, policy assistant, ticket triage, document extraction, sales recommendations, and customer chatbot. The team needs a rational way to prioritize.",
      challenge: "The BA lead must compare ideas by business value, feasibility, data readiness, risk, user impact, governance cost, and measurement clarity. AI can structure the portfolio, but prioritization remains a business decision.",
      aiUse: ["Classify ideas by AI pattern and problem type.", "Generate value-risk-feasibility scoring criteria.", "Identify missing data, controls, and evaluation needs.", "Draft pilot roadmap options and decision memo."],
      inputs: ["AI idea backlog", "Business goals", "Data readiness notes", "Risk policy", "Delivery capacity"],
      workflow: ["Normalize each idea into problem, user, decision, outcome, and AI pattern.", "Ask AI to score each idea using transparent criteria and evidence gaps.", "Review scores with business, technology, data, security, and operations stakeholders.", "Separate quick wins from high-risk strategic bets.", "Define pilots with success metrics, controls, and owners.", "Publish a portfolio roadmap with rationale and rejected ideas."],
      deliverables: [["Use-case scoring matrix", "Idea, value, feasibility, data readiness, risk, governance cost, and score", "BA lead", "Scores are explainable"], ["AI pattern classification", "GenAI, RAG, predictive AI, rules automation, or hybrid", "BA", "Solution category fits problem"], ["Pilot roadmap", "Use case, phase, owner, metric, control, and decision gate", "Sponsor", "Pilots can be evaluated"], ["Decision memo", "Recommendation, trade-offs, rejected ideas, and evidence gaps", "Leadership", "Portfolio choices are explicit"]],
      risks: [["Hype prioritization", "Ideas may win because they sound innovative", "Use transparent scoring and evidence gaps"], ["Data readiness blind spot", "High-value ideas may fail without usable data", "Score data availability and ownership"], ["Risk underestimation", "Customer-facing AI may need more controls", "Include governance cost and harm potential"], ["Pilot sprawl", "Too many pilots dilute learning", "Limit pilots and define decision gates"]],
      metric: "Leadership funds AI pilots based on value, feasibility, data readiness, and risk, not hype."
    },
    vi: {
      title: "Prioritize portfolio AI use case",
      project: "Leadership có list dài AI idea: meeting summary, requirements drafting, policy assistant, ticket triage, document extraction, sales recommendation và customer chatbot. Team cần cách prioritize hợp lý.",
      challenge: "BA lead phải compare idea theo business value, feasibility, data readiness, risk, user impact, governance cost và measurement clarity. AI có thể structure portfolio, nhưng prioritization vẫn là business decision.",
      aiUse: ["Classify idea theo AI pattern và problem type.", "Generate value-risk-feasibility scoring criteria.", "Identify missing data, control và evaluation need.", "Draft pilot roadmap option và decision memo."],
      inputs: ["AI idea backlog", "Business goals", "Data readiness notes", "Risk policy", "Delivery capacity"],
      workflow: ["Normalize từng idea thành problem, user, decision, outcome và AI pattern.", "Yêu cầu AI score từng idea bằng criteria transparent và evidence gap.", "Review score với business, technology, data, security và operations stakeholder.", "Tách quick win khỏi high-risk strategic bet.", "Define pilot có success metric, control và owner.", "Publish portfolio roadmap có rationale và rejected idea."],
      deliverables: [["Use-case scoring matrix", "Idea, value, feasibility, data readiness, risk, governance cost và score", "BA lead", "Score explainable"], ["AI pattern classification", "GenAI, RAG, predictive AI, rules automation hoặc hybrid", "BA", "Solution category fit problem"], ["Pilot roadmap", "Use case, phase, owner, metric, control và decision gate", "Sponsor", "Pilot evaluate được"], ["Decision memo", "Recommendation, trade-off, rejected idea và evidence gap", "Leadership", "Portfolio choice explicit"]],
      risks: [["Hype prioritization", "Idea thắng vì nghe innovative", "Dùng transparent scoring và evidence gap"], ["Data readiness blind spot", "Idea high-value có thể fail vì thiếu usable data", "Score data availability và ownership"], ["Risk underestimation", "Customer-facing AI cần nhiều control hơn", "Include governance cost và harm potential"], ["Pilot sprawl", "Quá nhiều pilot làm loãng learning", "Limit pilot và define decision gate"]],
      metric: "Leadership fund AI pilot dựa trên value, feasibility, data readiness và risk, không phải hype."
    }
  }
];

const engineeringUseCaseSpecs = [
  {
    slug: "figma-design-handoff-requirements",
    group: "Frontend, UI, and UX",
    domain: "Design handoff",
    enTitle: "Figma Design Handoff to Requirements",
    viTitle: "Từ Figma handoff đến requirement",
    enProject: "A product designer shares a Figma file for a customer self-service dashboard. Developers ask for behavior rules because the design shows frames but not permissions, states, API dependencies, or analytics events.",
    viProject: "Product designer share file Figma cho customer self-service dashboard. Developer hỏi behavior rule vì design chỉ có frame nhưng thiếu permission, state, API dependency và analytics event.",
    enChallenge: "The BA must translate visual design into buildable requirements without flattening UX intent. The BA needs to capture screen purpose, user actions, dynamic states, data dependencies, empty and error states, and what must be validated with product, UX, frontend, backend, and QA.",
    viChallenge: "BA phải chuyển visual design thành requirement build được mà không làm mất UX intent. BA cần capture screen purpose, user action, dynamic state, data dependency, empty/error state và phần cần validate với product, UX, frontend, backend và QA.",
    enAiUse: ["Extract screens, components, actions, and state gaps from Figma notes.", "Generate a UI behavior matrix for normal, empty, loading, error, and permission states.", "Draft questions for UX, frontend, backend, analytics, and QA.", "Critique the handoff for missing data, validation, and interaction rules."],
    viAiUse: ["Extract screen, component, action và state gap từ Figma notes.", "Generate UI behavior matrix cho normal, empty, loading, error và permission state.", "Draft question cho UX, frontend, backend, analytics và QA.", "Critique handoff để tìm missing data, validation và interaction rule."],
    enInputs: ["Figma frames and design annotations", "User flow or journey map", "Component library rules", "Permission matrix", "Known API or data source notes"],
    viInputs: ["Figma frames và design annotations", "User flow hoặc journey map", "Component library rules", "Permission matrix", "Known API hoặc data source notes"],
    enWorkflow: ["Inventory every screen, component, action, and visible data element.", "Ask AI to turn the design into a behavior matrix with state coverage.", "Review generated behavior against UX intent and product rules.", "Identify backend data dependencies and unresolved API questions.", "Add acceptance criteria for state, copy, validation, accessibility, and analytics.", "Run a handoff review with UX, frontend, backend, QA, and product owners."],
    viWorkflow: ["Inventory từng screen, component, action và visible data element.", "Yêu cầu AI chuyển design thành behavior matrix có state coverage.", "Review generated behavior theo UX intent và product rule.", "Identify backend data dependency và unresolved API question.", "Thêm acceptance criteria cho state, copy, validation, accessibility và analytics.", "Chạy handoff review với UX, frontend, backend, QA và product owner."],
    enDeliverables: [["UI behavior matrix", "Screen, component, trigger, state, rule, data source, and owner", "BA", "Developers can implement without guessing state behavior"], ["Design gap register", "Missing copy, data, permission, validation, and interaction rules", "BA and UX", "Every gap has an owner"], ["Frontend acceptance criteria", "Given-When-Then criteria for UI states and interactions", "BA and QA", "QA can test screen behavior"], ["API dependency list", "Data fields, source endpoint, loading behavior, and fallback", "Backend lead", "Backend questions are visible before build"]],
    viDeliverables: [["UI behavior matrix", "Screen, component, trigger, state, rule, data source và owner", "BA", "Developer implement không phải đoán state behavior"], ["Design gap register", "Missing copy, data, permission, validation và interaction rule", "BA và UX", "Mọi gap có owner"], ["Frontend acceptance criteria", "Given-When-Then criteria cho UI state và interaction", "BA và QA", "QA test được screen behavior"], ["API dependency list", "Data field, source endpoint, loading behavior và fallback", "Backend lead", "Backend question visible trước build"]],
    enRisks: [["Design-only handoff", "Frames may look complete while behavior is missing", "Require behavior matrix and state coverage"], ["UX intent loss", "Developers may implement layout but miss decision logic", "Record screen purpose and user goal"], ["Backend surprise", "UI fields may need data not available from API", "Create API dependency list early"], ["QA ambiguity", "QA may not know expected behavior for empty or error states", "Add acceptance criteria for every state"]],
    viRisks: [["Design-only handoff", "Frame nhìn complete nhưng behavior missing", "Bắt buộc behavior matrix và state coverage"], ["UX intent loss", "Developer implement layout nhưng miss decision logic", "Record screen purpose và user goal"], ["Backend surprise", "UI field có thể cần data API chưa có", "Tạo API dependency list sớm"], ["QA ambiguity", "QA không biết expected behavior cho empty/error state", "Thêm acceptance criteria cho mọi state"]],
    enMetric: "The design handoff becomes a testable UI specification with clear state behavior and backend dependencies.",
    viMetric: "Design handoff trở thành UI specification test được, có state behavior và backend dependency rõ."
  },
  {
    slug: "screen-state-behavior-specification",
    group: "Frontend, UI, and UX",
    domain: "Screen behavior",
    enTitle: "Screen State Behavior Specification",
    viTitle: "Đặc tả behavior theo screen state",
    enProject: "A team builds an order management screen with draft, submitted, approved, rejected, cancelled, and archived states. The design shows the happy path but not which actions and fields appear in each state.",
    viProject: "Team xây order management screen có state draft, submitted, approved, rejected, cancelled và archived. Design thể hiện happy path nhưng chưa nói action và field nào xuất hiện theo từng state.",
    enChallenge: "The BA must specify screen behavior by lifecycle state so frontend, backend, and QA share the same interpretation. The BA needs to define available actions, disabled actions, visible fields, editable fields, messages, and transition rules.",
    viChallenge: "BA phải đặc tả screen behavior theo lifecycle state để frontend, backend và QA hiểu giống nhau. BA cần define available action, disabled action, visible field, editable field, message và transition rule.",
    enAiUse: ["Generate a state-action matrix from lifecycle notes.", "Find missing action permissions and transition rules.", "Draft UI state acceptance criteria and negative cases.", "Critique whether disabled actions need explanation or tooltip copy."],
    viAiUse: ["Generate state-action matrix từ lifecycle notes.", "Find missing action permission và transition rule.", "Draft UI state acceptance criteria và negative case.", "Critique disabled action có cần explanation hoặc tooltip copy không."],
    enInputs: ["Entity lifecycle model", "Screen design", "Permission rules", "Workflow policy", "Existing user stories"],
    viInputs: ["Entity lifecycle model", "Screen design", "Permission rules", "Workflow policy", "Existing user stories"],
    enWorkflow: ["List every entity state and user role.", "Ask AI to create a state-action-field matrix.", "Review matrix with product for business rules and with frontend for feasibility.", "Map each transition to backend validation and audit needs.", "Write acceptance criteria for allowed, blocked, hidden, and disabled actions.", "Add QA scenarios for each role-state combination."],
    viWorkflow: ["List từng entity state và user role.", "Yêu cầu AI tạo state-action-field matrix.", "Review matrix với product về business rule và frontend về feasibility.", "Map từng transition với backend validation và audit need.", "Viết acceptance criteria cho allowed, blocked, hidden và disabled action.", "Thêm QA scenario cho từng role-state combination."],
    enDeliverables: [["State-action matrix", "State, role, visible action, disabled action, field behavior, and rule", "BA", "Every action has state rule"], ["Transition rule table", "From state, to state, trigger, validation, audit, and owner", "BA and backend", "Backend can enforce transitions"], ["UI message catalog", "Tooltip, disabled reason, error, and confirmation copy", "UX writer", "Users understand unavailable actions"], ["QA coverage map", "Role-state scenarios and expected UI behavior", "QA", "State combinations are testable"]],
    viDeliverables: [["State-action matrix", "State, role, visible action, disabled action, field behavior và rule", "BA", "Mọi action có state rule"], ["Transition rule table", "From state, to state, trigger, validation, audit và owner", "BA và backend", "Backend enforce được transition"], ["UI message catalog", "Tooltip, disabled reason, error và confirmation copy", "UX writer", "User hiểu unavailable action"], ["QA coverage map", "Role-state scenario và expected UI behavior", "QA", "State combination test được"]],
    enRisks: [["State mismatch", "Frontend may show actions backend rejects", "Align UI state matrix with backend transition rules"], ["Hidden business rule", "Users may see confusing disabled buttons", "Add reason copy for blocked actions"], ["Role confusion", "Different roles may need different behavior", "Include role-state matrix"], ["Incomplete QA", "Rare states may be untested", "Create scenarios for every state transition"]],
    viRisks: [["State mismatch", "Frontend show action nhưng backend reject", "Align UI state matrix với backend transition rule"], ["Hidden business rule", "User thấy disabled button khó hiểu", "Thêm reason copy cho blocked action"], ["Role confusion", "Role khác nhau cần behavior khác nhau", "Include role-state matrix"], ["Incomplete QA", "Rare state có thể chưa test", "Tạo scenario cho mọi state transition"]],
    enMetric: "Frontend, backend, and QA use one shared state behavior matrix for implementation and testing.",
    viMetric: "Frontend, backend và QA dùng chung một state behavior matrix cho implementation và testing."
  },
  {
    slug: "complex-form-validation-rules",
    group: "Frontend, UI, and UX",
    domain: "Forms and validation",
    enTitle: "Complex Form Validation Rules",
    viTitle: "Rule validation cho form phức tạp",
    enProject: "A customer profile form has conditional fields, dependent dropdowns, country-specific tax identifiers, file attachments, and validation rules that differ between individual and business accounts.",
    viProject: "Customer profile form có conditional field, dependent dropdown, tax identifier theo country, file attachment và validation rule khác nhau giữa individual và business account.",
    enChallenge: "The BA must specify validation in a way frontend and backend can implement consistently. The challenge is separating client-side guidance, server-side enforcement, conditional display, error copy, and evidence source for every rule.",
    viChallenge: "BA phải đặc tả validation để frontend và backend implement consistent. Phần khó là tách client-side guidance, server-side enforcement, conditional display, error copy và evidence source cho từng rule.",
    enAiUse: ["Generate a validation rule matrix from policy and form design.", "Identify missing conditional field rules and dependent dropdown rules.", "Draft error messages in user-friendly language.", "Compare frontend validation with backend enforcement needs."],
    viAiUse: ["Generate validation rule matrix từ policy và form design.", "Identify missing conditional field rule và dependent dropdown rule.", "Draft error message bằng ngôn ngữ thân thiện.", "Compare frontend validation với backend enforcement need."],
    enInputs: ["Form design", "Field list", "Policy rules", "Country-specific requirements", "Backend validation constraints"],
    viInputs: ["Form design", "Field list", "Policy rules", "Country-specific requirements", "Backend validation constraints"],
    enWorkflow: ["Inventory fields, field type, source rule, and dependency.", "Ask AI to draft validation matrix including client and server behavior.", "Review rules with product, compliance, frontend, backend, and QA.", "Define error messages, helper text, and when validation triggers.", "Add negative and boundary acceptance criteria.", "Create test data sets for country, account type, and attachment variations."],
    viWorkflow: ["Inventory field, field type, source rule và dependency.", "Yêu cầu AI draft validation matrix gồm client và server behavior.", "Review rule với product, compliance, frontend, backend và QA.", "Define error message, helper text và khi nào validation trigger.", "Thêm negative và boundary acceptance criteria.", "Tạo test data set cho country, account type và attachment variation."],
    enDeliverables: [["Validation matrix", "Field, condition, rule, client behavior, server behavior, source, and error copy", "BA", "Every field rule is traceable"], ["Conditional field map", "Trigger field, dependent field, display rule, and reset behavior", "Frontend", "Dynamic form behavior is clear"], ["Error copy catalog", "Validation message, severity, and recovery instruction", "UX writer", "Messages help users recover"], ["Test data set", "Country, account type, file, and boundary examples", "QA", "Validation cases are executable"]],
    viDeliverables: [["Validation matrix", "Field, condition, rule, client behavior, server behavior, source và error copy", "BA", "Mọi field rule traceable"], ["Conditional field map", "Trigger field, dependent field, display rule và reset behavior", "Frontend", "Dynamic form behavior rõ"], ["Error copy catalog", "Validation message, severity và recovery instruction", "UX writer", "Message giúp user recover"], ["Test data set", "Country, account type, file và boundary example", "QA", "Validation case executable"]],
    enRisks: [["Client-server mismatch", "Frontend may accept data backend rejects", "Define both client guidance and server enforcement"], ["Policy invention", "AI may invent country rules", "Require source evidence for every rule"], ["Poor error recovery", "Users may not know how to fix input", "Write actionable error copy"], ["Conditional reset gap", "Hidden fields may retain stale values", "Specify reset and persistence behavior"]],
    viRisks: [["Client-server mismatch", "Frontend accept data nhưng backend reject", "Define cả client guidance và server enforcement"], ["Policy invention", "AI có thể invent country rule", "Require source evidence cho từng rule"], ["Poor error recovery", "User không biết sửa input ra sao", "Viết error copy actionable"], ["Conditional reset gap", "Hidden field có thể giữ stale value", "Specify reset và persistence behavior"]],
    enMetric: "Form validation is implemented consistently across frontend, backend, and QA with traceable business rules.",
    viMetric: "Form validation được implement consistent giữa frontend, backend và QA với business rule traceable."
  },
  {
    slug: "empty-loading-error-state-requirements",
    group: "Frontend, UI, and UX",
    domain: "UI states",
    enTitle: "Empty, Loading, and Error State Requirements",
    viTitle: "Requirement cho empty, loading và error state",
    enProject: "A reporting page depends on multiple APIs. The initial story covers displaying data, but not what users see when data is missing, loading slowly, partially unavailable, or blocked by permission.",
    viProject: "Reporting page phụ thuộc nhiều API. Story ban đầu cover hiển thị data, nhưng chưa nói user thấy gì khi data missing, loading chậm, partial unavailable hoặc bị permission block.",
    enChallenge: "The BA must define non-happy-path UI states as functional requirements. These states affect trust, support volume, and perceived quality, especially when backend services are slow or unavailable.",
    viChallenge: "BA phải define UI state ngoài happy path như functional requirement. Các state này ảnh hưởng trust, support volume và perceived quality, đặc biệt khi backend service chậm hoặc unavailable.",
    enAiUse: ["Generate state coverage for loading, empty, error, permission, partial, stale, and retry states.", "Draft user-facing copy for each state.", "Identify backend signals needed to distinguish states.", "Create acceptance criteria for skeletons, retries, and fallback messages."],
    viAiUse: ["Generate state coverage cho loading, empty, error, permission, partial, stale và retry state.", "Draft user-facing copy cho từng state.", "Identify backend signal cần để phân biệt state.", "Tạo acceptance criteria cho skeleton, retry và fallback message."],
    enInputs: ["Screen design", "API dependency list", "Permission rules", "Service reliability notes", "Support ticket examples"],
    viInputs: ["Screen design", "API dependency list", "Permission rules", "Service reliability notes", "Support ticket examples"],
    enWorkflow: ["List every data dependency and possible response condition.", "Ask AI to generate UI state matrix and missing signals.", "Define copy, icon, action, retry, and escalation for each state.", "Review backend feasibility for partial and stale data signals.", "Write acceptance criteria for slow loading, empty data, failure, permission, and partial results.", "Add analytics events for state frequency and user retry behavior."],
    viWorkflow: ["List từng data dependency và response condition có thể xảy ra.", "Yêu cầu AI generate UI state matrix và missing signal.", "Define copy, icon, action, retry và escalation cho từng state.", "Review backend feasibility cho partial và stale data signal.", "Viết acceptance criteria cho slow loading, empty data, failure, permission và partial result.", "Thêm analytics event cho state frequency và user retry behavior."],
    enDeliverables: [["UI state matrix", "State, trigger, backend signal, copy, user action, and analytics", "BA", "Every non-happy path has behavior"], ["Fallback copy set", "Empty, error, permission, stale, and retry messages", "UX writer", "Messages are clear and actionable"], ["Backend signal list", "Status, error code, freshness, and partial result indicators", "Backend lead", "Frontend can distinguish states"], ["QA scenario list", "Slow API, no data, partial data, error, permission, and retry", "QA", "Non-happy paths are tested"]],
    viDeliverables: [["UI state matrix", "State, trigger, backend signal, copy, user action và analytics", "BA", "Mọi non-happy path có behavior"], ["Fallback copy set", "Empty, error, permission, stale và retry message", "UX writer", "Message rõ và actionable"], ["Backend signal list", "Status, error code, freshness và partial result indicator", "Backend lead", "Frontend phân biệt được state"], ["QA scenario list", "Slow API, no data, partial data, error, permission và retry", "QA", "Non-happy path được test"]],
    enRisks: [["Generic error message", "Users cannot recover or know what happened", "Use state-specific copy and action"], ["Backend signal gap", "Frontend cannot distinguish no data from failure", "Specify response signals and error codes"], ["Support burden", "Unclear states create tickets", "Add recovery instruction and status visibility"], ["Untested partial data", "Page may break when one API fails", "Add partial availability scenarios"]],
    viRisks: [["Generic error message", "User không recover hoặc hiểu chuyện gì xảy ra", "Dùng state-specific copy và action"], ["Backend signal gap", "Frontend không phân biệt no data với failure", "Specify response signal và error code"], ["Support burden", "State không rõ tạo ticket", "Thêm recovery instruction và status visibility"], ["Untested partial data", "Page có thể vỡ khi một API fail", "Thêm partial availability scenario"]],
    enMetric: "Users receive clear state-specific guidance and QA covers non-happy-path UI behavior.",
    viMetric: "User nhận guidance rõ theo từng state và QA cover UI behavior ngoài happy path."
  },
  {
    slug: "responsive-mobile-ui-behavior",
    group: "Frontend, UI, and UX",
    domain: "Responsive design",
    enTitle: "Responsive and Mobile UI Behavior",
    viTitle: "Behavior responsive và mobile UI",
    enProject: "A desktop-first admin workflow must also work on tablets and mobile devices for field operations. The design has desktop screens, but mobile breakpoints, priority content, and touch interactions are undefined.",
    viProject: "Admin workflow desktop-first cũng phải hoạt động trên tablet và mobile cho field operations. Design có desktop screen, nhưng mobile breakpoint, content priority và touch interaction chưa rõ.",
    enChallenge: "The BA must specify responsive behavior as requirements, not leave it as CSS interpretation. The BA needs to define content priority, hidden or collapsed controls, mobile action patterns, table behavior, and acceptance criteria across viewports.",
    viChallenge: "BA phải đặc tả responsive behavior như requirement, không để thành cách hiểu CSS. BA cần define content priority, hidden/collapsed controls, mobile action pattern, table behavior và acceptance criteria theo viewport.",
    enAiUse: ["Generate responsive behavior questions from desktop design.", "Draft content priority and mobile state matrix.", "Identify risky components such as tables, filters, modals, and bulk actions.", "Create viewport-based acceptance criteria."],
    viAiUse: ["Generate responsive behavior question từ desktop design.", "Draft content priority và mobile state matrix.", "Identify component risky như table, filter, modal và bulk action.", "Tạo acceptance criteria theo viewport."],
    enInputs: ["Desktop design", "Target device list", "User journey", "Component library rules", "Usage analytics"],
    viInputs: ["Desktop design", "Target device list", "User journey", "Component library rules", "Usage analytics"],
    enWorkflow: ["Confirm target devices, breakpoints, and primary mobile tasks.", "Ask AI to identify elements likely to fail on small screens.", "Define content priority, stacking order, collapsed controls, and table behavior.", "Review touch, keyboard, and accessibility implications.", "Write acceptance criteria by viewport and role.", "Add QA checklist for real devices and browser combinations."],
    viWorkflow: ["Confirm target device, breakpoint và primary mobile task.", "Yêu cầu AI identify element dễ fail trên small screen.", "Define content priority, stacking order, collapsed control và table behavior.", "Review touch, keyboard và accessibility implication.", "Viết acceptance criteria theo viewport và role.", "Thêm QA checklist cho real device và browser combination."],
    enDeliverables: [["Responsive behavior matrix", "Viewport, content priority, layout, control behavior, and exception", "BA and UX", "Breakpoints have rules"], ["Mobile task checklist", "Critical tasks, device, interaction, and acceptance signal", "Product owner", "Mobile tasks are viable"], ["Component risk list", "Tables, modals, filters, bulk actions, and overflow risks", "Frontend", "Risky components are designed"], ["Viewport QA plan", "Desktop, tablet, mobile, keyboard, and touch scenarios", "QA", "Responsive behavior is tested"]],
    viDeliverables: [["Responsive behavior matrix", "Viewport, content priority, layout, control behavior và exception", "BA và UX", "Breakpoint có rule"], ["Mobile task checklist", "Critical task, device, interaction và acceptance signal", "Product owner", "Mobile task viable"], ["Component risk list", "Table, modal, filter, bulk action và overflow risk", "Frontend", "Risky component được design"], ["Viewport QA plan", "Desktop, tablet, mobile, keyboard và touch scenario", "QA", "Responsive behavior được test"]],
    enRisks: [["Desktop assumption", "Mobile users may not complete critical tasks", "Define mobile task coverage"], ["Table overflow", "Important data may disappear or become unusable", "Specify table collapse or horizontal behavior"], ["Hidden actions", "Collapsed controls may hide required actions", "Define priority and discoverability"], ["Device testing gap", "Browser simulation may miss real device issues", "Add real-device QA scenarios"]],
    viRisks: [["Desktop assumption", "Mobile user có thể không hoàn thành critical task", "Define mobile task coverage"], ["Table overflow", "Important data có thể biến mất hoặc unusable", "Specify table collapse hoặc horizontal behavior"], ["Hidden actions", "Collapsed control có thể hide required action", "Define priority và discoverability"], ["Device testing gap", "Browser simulation có thể miss real device issue", "Thêm real-device QA scenario"]],
    enMetric: "Responsive UI behavior is explicit enough for design, frontend, and QA to validate across devices.",
    viMetric: "Responsive UI behavior đủ explicit để design, frontend và QA validate qua nhiều device."
  },
  {
    slug: "accessibility-acceptance-criteria",
    group: "Frontend, UI, and UX",
    domain: "Accessibility",
    enTitle: "Accessibility Acceptance Criteria",
    viTitle: "Acceptance criteria cho accessibility",
    enProject: "A public portal must meet accessibility expectations, but the initial stories only mention visual layout and happy-path interactions. Keyboard navigation, screen reader labels, focus behavior, and contrast are not specified.",
    viProject: "Public portal phải đáp ứng accessibility expectation, nhưng story ban đầu chỉ nói visual layout và happy-path interaction. Keyboard navigation, screen reader label, focus behavior và contrast chưa được specify.",
    enChallenge: "The BA must convert accessibility expectations into acceptance criteria that frontend and QA can implement and test. Accessibility cannot be a late checklist; it must be part of behavior requirements.",
    viChallenge: "BA phải chuyển accessibility expectation thành acceptance criteria để frontend và QA implement/test được. Accessibility không thể là checklist cuối dự án; nó phải là một phần của behavior requirement.",
    enAiUse: ["Generate accessibility review questions by component and interaction.", "Draft acceptance criteria for keyboard, focus, label, contrast, and error behavior.", "Identify accessibility risks in forms, modals, tables, and dynamic updates.", "Create a QA checklist for assistive technology scenarios."],
    viAiUse: ["Generate accessibility review question theo component và interaction.", "Draft acceptance criteria cho keyboard, focus, label, contrast và error behavior.", "Identify accessibility risk trong form, modal, table và dynamic update.", "Tạo QA checklist cho assistive technology scenario."],
    enInputs: ["UI design", "Component list", "Accessibility policy", "Form and modal behavior", "Target user groups"],
    viInputs: ["UI design", "Component list", "Accessibility policy", "Form và modal behavior", "Target user groups"],
    enWorkflow: ["List components and interactions that need accessibility behavior.", "Ask AI to generate criteria by accessibility lens.", "Review labels, focus order, keyboard navigation, status announcements, and error messages.", "Agree test responsibility with frontend and QA.", "Add acceptance criteria to stories before refinement.", "Track unresolved accessibility risks in the backlog."],
    viWorkflow: ["List component và interaction cần accessibility behavior.", "Yêu cầu AI generate criteria theo accessibility lens.", "Review label, focus order, keyboard navigation, status announcement và error message.", "Agree test responsibility với frontend và QA.", "Thêm acceptance criteria vào story trước refinement.", "Track unresolved accessibility risk trong backlog."],
    enDeliverables: [["Accessibility criteria set", "Component, behavior, criterion, and test method", "BA", "Criteria are story-ready"], ["Keyboard flow map", "Tab order, focus trap, escape behavior, and shortcut rules", "Frontend", "Keyboard users can complete task"], ["Screen reader label list", "Element, label, announcement, and dynamic update", "UX and frontend", "Assistive tech behavior is defined"], ["Accessibility QA checklist", "Manual checks, automated checks, and assistive scenarios", "QA", "Testing goes beyond visual layout"]],
    viDeliverables: [["Accessibility criteria set", "Component, behavior, criterion và test method", "BA", "Criteria story-ready"], ["Keyboard flow map", "Tab order, focus trap, escape behavior và shortcut rule", "Frontend", "Keyboard user complete được task"], ["Screen reader label list", "Element, label, announcement và dynamic update", "UX và frontend", "Assistive tech behavior được define"], ["Accessibility QA checklist", "Manual check, automated check và assistive scenario", "QA", "Testing beyond visual layout"]],
    enRisks: [["Late accessibility", "Fixing issues after build is expensive", "Add accessibility criteria during refinement"], ["Visual-only design", "Screen reader users may not understand context", "Specify labels and announcements"], ["Keyboard trap", "Users may get stuck in modals or menus", "Define focus management and escape behavior"], ["Error invisibility", "Validation errors may not be announced", "Specify accessible error behavior"]],
    viRisks: [["Late accessibility", "Fix issue sau build rất tốn", "Thêm accessibility criteria trong refinement"], ["Visual-only design", "Screen reader user có thể không hiểu context", "Specify label và announcement"], ["Keyboard trap", "User có thể bị kẹt trong modal/menu", "Define focus management và escape behavior"], ["Error invisibility", "Validation error có thể không được announce", "Specify accessible error behavior"]],
    enMetric: "Accessibility is represented as testable behavior in user stories before frontend implementation starts.",
    viMetric: "Accessibility được thể hiện như behavior test được trong user story trước khi frontend implementation bắt đầu."
  },
  {
    slug: "design-system-component-requirements",
    group: "Frontend, UI, and UX",
    domain: "Design systems",
    enTitle: "Design System Component Requirements",
    viTitle: "Requirement cho design system component",
    enProject: "A platform team adds reusable components for filters, data tables, status chips, action menus, and confirmation dialogs. Product teams need consistency but also domain-specific behavior.",
    viProject: "Platform team thêm reusable component cho filter, data table, status chip, action menu và confirmation dialog. Product team cần consistency nhưng vẫn có domain-specific behavior.",
    enChallenge: "The BA must distinguish reusable component requirements from feature-specific requirements. Component behavior should cover variants, slots, accessibility, validation, events, constraints, and what product teams can configure.",
    viChallenge: "BA phải tách reusable component requirement khỏi feature-specific requirement. Component behavior nên cover variant, slot, accessibility, validation, event, constraint và phần product team được configure.",
    enAiUse: ["Generate component variant and behavior matrix.", "Identify feature-specific requirements that should not pollute the component.", "Draft configuration options and constraints.", "Create documentation questions for design and frontend teams."],
    viAiUse: ["Generate component variant và behavior matrix.", "Identify feature-specific requirement không nên pollute component.", "Draft configuration option và constraint.", "Tạo documentation question cho design và frontend team."],
    enInputs: ["Component design", "Existing product examples", "Design system rules", "Accessibility requirements", "Frontend architecture notes"],
    viInputs: ["Component design", "Existing product examples", "Design system rules", "Accessibility requirements", "Frontend architecture notes"],
    enWorkflow: ["Collect use cases from multiple product teams.", "Ask AI to separate common behavior from domain-specific behavior.", "Define component variants, properties, events, validation, and accessibility.", "Review configurability with design and frontend.", "Create acceptance criteria and documentation examples.", "Publish adoption guidance and anti-patterns."],
    viWorkflow: ["Collect use case từ nhiều product team.", "Yêu cầu AI tách common behavior khỏi domain-specific behavior.", "Define component variant, property, event, validation và accessibility.", "Review configurability với design và frontend.", "Tạo acceptance criteria và documentation example.", "Publish adoption guidance và anti-pattern."],
    enDeliverables: [["Component behavior spec", "Variant, property, event, validation, state, and accessibility behavior", "Platform BA", "Reusable behavior is explicit"], ["Configuration matrix", "Option, allowed values, default, constraint, and example", "Frontend", "Product teams know what can change"], ["Usage guidance", "When to use, when not to use, examples, and anti-patterns", "Design system owner", "Adoption is consistent"], ["Component test scenarios", "State, variant, keyboard, accessibility, and error scenarios", "QA", "Component is testable across variants"]],
    viDeliverables: [["Component behavior spec", "Variant, property, event, validation, state và accessibility behavior", "Platform BA", "Reusable behavior explicit"], ["Configuration matrix", "Option, allowed value, default, constraint và example", "Frontend", "Product team biết phần nào đổi được"], ["Usage guidance", "Khi nào dùng, khi nào không, example và anti-pattern", "Design system owner", "Adoption consistent"], ["Component test scenarios", "State, variant, keyboard, accessibility và error scenario", "QA", "Component test được qua variant"]],
    enRisks: [["Over-configurable component", "Too many options make the system hard to maintain", "Define supported variants and constraints"], ["Feature leakage", "One product's special rule may pollute shared component", "Separate common and feature-specific behavior"], ["Accessibility drift", "Components may be reused without accessible behavior", "Bake accessibility into component spec"], ["Adoption confusion", "Teams may recreate components", "Provide usage guidance and examples"]],
    viRisks: [["Over-configurable component", "Quá nhiều option làm system khó maintain", "Define supported variant và constraint"], ["Feature leakage", "Special rule của một product pollute shared component", "Tách common và feature-specific behavior"], ["Accessibility drift", "Component reuse nhưng thiếu accessible behavior", "Bake accessibility vào component spec"], ["Adoption confusion", "Team có thể recreate component", "Provide usage guidance và example"]],
    enMetric: "Reusable components have clear behavior boundaries and product teams can adopt them consistently.",
    viMetric: "Reusable component có behavior boundary rõ và product team adopt consistent."
  },
  {
    slug: "ux-microcopy-error-message-review",
    group: "Frontend, UI, and UX",
    domain: "UX writing",
    enTitle: "UX Microcopy and Error Message Review",
    viTitle: "Review microcopy và error message UX",
    enProject: "A signup flow has multiple validation errors, consent messages, confirmation dialogs, and success states. The wording is inconsistent and some messages blame users or hide next steps.",
    viProject: "Signup flow có nhiều validation error, consent message, confirmation dialog và success state. Wording inconsistent và một số message đổ lỗi user hoặc che next step.",
    enChallenge: "The BA must help UX and product ensure copy reflects business rules, compliance, user recovery, and system truth. AI can draft copy options, but the BA must validate accuracy and decision implications.",
    viChallenge: "BA phải hỗ trợ UX và product đảm bảo copy phản ánh business rule, compliance, user recovery và system truth. AI có thể draft copy option, nhưng BA phải validate accuracy và decision implication.",
    enAiUse: ["Generate copy variants for errors, confirmations, empty states, and success messages.", "Critique copy for clarity, blame, compliance risk, and recovery guidance.", "Map each message to trigger, rule, and user next action.", "Create localized copy review questions."],
    viAiUse: ["Generate copy variant cho error, confirmation, empty state và success message.", "Critique copy theo clarity, blame, compliance risk và recovery guidance.", "Map từng message với trigger, rule và user next action.", "Tạo localized copy review question."],
    enInputs: ["UI copy list", "Validation rules", "Compliance wording constraints", "Brand voice guide", "User research notes"],
    viInputs: ["UI copy list", "Validation rules", "Compliance wording constraints", "Brand voice guide", "User research notes"],
    enWorkflow: ["Inventory messages by screen, trigger, and user state.", "Ask AI to critique message clarity and recovery guidance.", "Generate alternative copy options without changing business meaning.", "Validate regulated or sensitive wording with legal or compliance owners.", "Map each message to rule, source, and acceptance criteria.", "Prepare copy handoff for frontend and localization."],
    viWorkflow: ["Inventory message theo screen, trigger và user state.", "Yêu cầu AI critique clarity và recovery guidance của message.", "Generate alternative copy option nhưng không đổi business meaning.", "Validate wording regulated hoặc sensitive với legal/compliance owner.", "Map từng message tới rule, source và acceptance criteria.", "Prepare copy handoff cho frontend và localization."],
    enDeliverables: [["Message catalog", "Screen, trigger, current copy, proposed copy, rule, and owner", "BA and UX writer", "Every message has trigger and source"], ["Recovery guidance matrix", "Error, user action, system action, and support path", "BA", "Users know next step"], ["Compliance copy review", "Sensitive message, constraint, reviewer, and approval status", "Compliance", "Regulated copy is approved"], ["Localization notes", "Variable, tone, length, and translation risk", "Localization owner", "Copy can be localized safely"]],
    viDeliverables: [["Message catalog", "Screen, trigger, current copy, proposed copy, rule và owner", "BA và UX writer", "Mọi message có trigger và source"], ["Recovery guidance matrix", "Error, user action, system action và support path", "BA", "User biết next step"], ["Compliance copy review", "Sensitive message, constraint, reviewer và approval status", "Compliance", "Regulated copy approved"], ["Localization notes", "Variable, tone, length và translation risk", "Localization owner", "Copy localize an toàn"]],
    enRisks: [["Misleading copy", "Friendly wording may hide important rule or risk", "Map copy to source rule"], ["User blame", "Messages may increase frustration", "Use neutral, recovery-focused language"], ["Compliance drift", "AI may rewrite regulated wording incorrectly", "Require compliance approval"], ["Localization breakage", "Copy may not fit translated UI", "Track variables and length constraints"]],
    viRisks: [["Misleading copy", "Wording thân thiện có thể che rule hoặc risk quan trọng", "Map copy với source rule"], ["User blame", "Message có thể làm user frustrate", "Dùng language neutral và recovery-focused"], ["Compliance drift", "AI có thể rewrite wording regulated sai", "Require compliance approval"], ["Localization breakage", "Copy có thể không fit UI khi translate", "Track variable và length constraint"]],
    enMetric: "UI copy becomes accurate, recoverable, testable, and ready for localization.",
    viMetric: "UI copy trở nên accurate, recoverable, testable và ready cho localization."
  },
  {
    slug: "navigation-user-flow-analysis",
    group: "Frontend, UI, and UX",
    domain: "User flows",
    enTitle: "Navigation and User Flow Analysis",
    viTitle: "Phân tích navigation và user flow",
    enProject: "A customer portal adds new sections for billing, documents, support cases, and settings. Stakeholders disagree about navigation labels, entry points, and which tasks should be one click away.",
    viProject: "Customer portal thêm section billing, documents, support cases và settings. Stakeholder không thống nhất navigation label, entry point và task nào cần one click away.",
    enChallenge: "The BA must translate user goals into navigation requirements, not just menu labels. The BA needs to define task priority, entry points, breadcrumbs, deep links, permission-based visibility, and failure paths.",
    viChallenge: "BA phải chuyển user goal thành navigation requirement, không chỉ menu label. BA cần define task priority, entry point, breadcrumb, deep link, visibility theo permission và failure path.",
    enAiUse: ["Cluster tasks by user goal and frequency.", "Generate navigation questions and alternative IA structures.", "Identify permission-based navigation differences.", "Draft user-flow diagrams and acceptance criteria."],
    viAiUse: ["Cluster task theo user goal và frequency.", "Generate navigation question và alternative IA structure.", "Identify navigation difference theo permission.", "Draft user-flow diagram và acceptance criteria."],
    enInputs: ["User journey map", "Task inventory", "Analytics or support data", "Permission rules", "Current navigation"],
    viInputs: ["User journey map", "Task inventory", "Analytics hoặc support data", "Permission rules", "Current navigation"],
    enWorkflow: ["Create task inventory with frequency, role, and business value.", "Ask AI to propose navigation groupings and label risks.", "Validate labels with user language and domain terminology.", "Define entry points, deep links, breadcrumbs, and empty permission states.", "Write acceptance criteria for role-based navigation visibility.", "Review with UX, product, frontend, and support."],
    viWorkflow: ["Tạo task inventory có frequency, role và business value.", "Yêu cầu AI propose navigation grouping và label risk.", "Validate label bằng user language và domain terminology.", "Define entry point, deep link, breadcrumb và empty permission state.", "Viết acceptance criteria cho role-based navigation visibility.", "Review với UX, product, frontend và support."],
    enDeliverables: [["Task-to-navigation map", "Task, user role, entry point, label, frequency, and priority", "BA and UX", "Navigation supports priority tasks"], ["User flow diagram", "Entry, path, decision, permission, and fallback", "UX", "Flow covers key journeys"], ["Navigation acceptance criteria", "Role visibility, deep link, breadcrumb, and redirect behavior", "BA", "Frontend can implement safely"], ["Label decision log", "Label options, rationale, evidence, and owner", "Product owner", "Naming decisions are explicit"]],
    viDeliverables: [["Task-to-navigation map", "Task, user role, entry point, label, frequency và priority", "BA và UX", "Navigation support priority task"], ["User flow diagram", "Entry, path, decision, permission và fallback", "UX", "Flow cover key journey"], ["Navigation acceptance criteria", "Role visibility, deep link, breadcrumb và redirect behavior", "BA", "Frontend implement an toàn"], ["Label decision log", "Label option, rationale, evidence và owner", "Product owner", "Naming decision explicit"]],
    enRisks: [["Org-chart navigation", "Menus may reflect internal teams instead of user goals", "Cluster by user task and language"], ["Permission dead end", "Users may see links they cannot use", "Specify role visibility and redirects"], ["Deep link failure", "Shared links may break for unauthorized users", "Define access and fallback behavior"], ["Label ambiguity", "Users may not understand menu terms", "Validate labels with user language"]],
    viRisks: [["Org-chart navigation", "Menu reflect internal team thay vì user goal", "Cluster theo user task và language"], ["Permission dead end", "User thấy link nhưng không dùng được", "Specify role visibility và redirect"], ["Deep link failure", "Shared link có thể break với unauthorized user", "Define access và fallback behavior"], ["Label ambiguity", "User không hiểu menu term", "Validate label với user language"]],
    enMetric: "Navigation choices are backed by user tasks, role rules, and testable flow behavior.",
    viMetric: "Navigation choice dựa trên user task, role rule và flow behavior test được."
  },
  {
    slug: "frontend-analytics-event-requirements",
    group: "Frontend, UI, and UX",
    domain: "Product analytics",
    enTitle: "Frontend Analytics Event Requirements",
    viTitle: "Requirement cho frontend analytics event",
    enProject: "Product wants to measure whether users complete a new onboarding flow. The team has screens and stories, but no clear event taxonomy, property definitions, funnel steps, or privacy controls.",
    viProject: "Product muốn đo user có hoàn thành onboarding flow mới không. Team có screen và story, nhưng chưa có event taxonomy, property definition, funnel step hoặc privacy control rõ.",
    enChallenge: "The BA must define analytics as part of requirements so product decisions can be measured after release. Events must be meaningful, privacy-safe, technically feasible, and aligned with business questions.",
    viChallenge: "BA phải define analytics như một phần requirement để product decision đo được sau release. Event phải meaningful, privacy-safe, technically feasible và aligned với business question.",
    enAiUse: ["Generate event taxonomy from user flow and product questions.", "Identify missing event properties and privacy-sensitive fields.", "Draft funnel measurement and success metrics.", "Create QA checks for event firing and payload correctness."],
    viAiUse: ["Generate event taxonomy từ user flow và product question.", "Identify missing event property và privacy-sensitive field.", "Draft funnel measurement và success metric.", "Tạo QA check cho event firing và payload correctness."],
    enInputs: ["User flow", "Business questions", "Analytics platform constraints", "Privacy rules", "Screen behavior spec"],
    viInputs: ["User flow", "Business questions", "Analytics platform constraints", "Privacy rules", "Screen behavior spec"],
    enWorkflow: ["Start with product questions and decisions the data must support.", "Ask AI to propose event names, triggers, properties, and funnel steps.", "Remove properties that expose sensitive data or duplicate existing events.", "Review feasibility with frontend and analytics owners.", "Add acceptance criteria for event trigger, payload, and non-trigger cases.", "Create QA and monitoring checklist for analytics release."],
    viWorkflow: ["Bắt đầu từ product question và decision data cần support.", "Yêu cầu AI propose event name, trigger, property và funnel step.", "Remove property expose sensitive data hoặc duplicate existing event.", "Review feasibility với frontend và analytics owner.", "Thêm acceptance criteria cho event trigger, payload và non-trigger case.", "Tạo QA và monitoring checklist cho analytics release."],
    enDeliverables: [["Analytics event spec", "Event, trigger, property, data type, source, and privacy classification", "BA and analytics owner", "Events answer business questions"], ["Funnel map", "Step, event, success signal, drop-off question, and owner", "Product owner", "Flow measurement is clear"], ["Privacy review list", "Sensitive property, redaction, consent, and approval", "Privacy owner", "Events are safe"], ["Analytics QA checklist", "Trigger, payload, duplicate, non-trigger, and environment tests", "QA", "Instrumentation is testable"]],
    viDeliverables: [["Analytics event spec", "Event, trigger, property, data type, source và privacy classification", "BA và analytics owner", "Event trả lời business question"], ["Funnel map", "Step, event, success signal, drop-off question và owner", "Product owner", "Flow measurement rõ"], ["Privacy review list", "Sensitive property, redaction, consent và approval", "Privacy owner", "Event an toàn"], ["Analytics QA checklist", "Trigger, payload, duplicate, non-trigger và environment test", "QA", "Instrumentation test được"]],
    enRisks: [["Vanity events", "Events may not answer a decision question", "Tie every event to a product question"], ["PII exposure", "Payload may include sensitive fields", "Classify and redact properties"], ["Duplicate firing", "Metrics may inflate", "Define exact trigger and QA checks"], ["Missing funnel step", "Drop-off cannot be diagnosed", "Map funnel before implementation"]],
    viRisks: [["Vanity events", "Event có thể không trả lời decision question", "Tie mọi event với product question"], ["PII exposure", "Payload có thể chứa sensitive field", "Classify và redact property"], ["Duplicate firing", "Metric có thể inflate", "Define exact trigger và QA check"], ["Missing funnel step", "Không diagnose được drop-off", "Map funnel trước implementation"]],
    enMetric: "Frontend instrumentation produces decision-ready product data without violating privacy.",
    viMetric: "Frontend instrumentation tạo product data dùng được cho decision mà không vi phạm privacy."
  },
  {
    slug: "localization-i18n-ui-requirements",
    group: "Frontend, UI, and UX",
    domain: "Localization",
    enTitle: "Localization and i18n UI Requirements",
    viTitle: "Requirement localization và i18n UI",
    enProject: "A SaaS product expands to multiple markets. The same screens must handle translated copy, locale-specific date formats, currencies, addresses, names, pluralization, and regulatory text.",
    viProject: "SaaS product mở rộng sang nhiều thị trường. Cùng screen phải handle translated copy, date format theo locale, currency, address, name, pluralization và regulatory text.",
    enChallenge: "The BA must capture localization requirements before UI and backend assumptions become hardcoded. This includes content length, formatting rules, legal copy, timezone behavior, and user locale selection.",
    viChallenge: "BA phải capture localization requirement trước khi UI và backend assumption bị hardcode. Bao gồm content length, formatting rule, legal copy, timezone behavior và user locale selection.",
    enAiUse: ["Generate localization risk checklist from UI copy and data fields.", "Identify locale-sensitive formats and backend dependencies.", "Draft i18n acceptance criteria for frontend components.", "Review translated copy risks such as length, tone, and regulatory terms."],
    viAiUse: ["Generate localization risk checklist từ UI copy và data field.", "Identify locale-sensitive format và backend dependency.", "Draft i18n acceptance criteria cho frontend component.", "Review risk của translated copy như length, tone và regulatory term."],
    enInputs: ["UI copy catalog", "Market list", "Data field definitions", "Legal text requirements", "Locale and timezone rules"],
    viInputs: ["UI copy catalog", "Market list", "Data field definitions", "Legal text requirements", "Locale và timezone rules"],
    enWorkflow: ["List markets, locales, formats, and regulatory copy differences.", "Ask AI to find UI elements likely to break when translated.", "Define formatting requirements for date, number, currency, address, name, and timezone.", "Review backend storage and display responsibilities.", "Write acceptance criteria for locale switching and fallback behavior.", "Create QA matrix for high-risk locales and long translations."],
    viWorkflow: ["List market, locale, format và regulatory copy difference.", "Yêu cầu AI find UI element dễ break khi translate.", "Define formatting requirement cho date, number, currency, address, name và timezone.", "Review backend storage và display responsibility.", "Viết acceptance criteria cho locale switching và fallback behavior.", "Tạo QA matrix cho high-risk locale và long translation."],
    enDeliverables: [["Localization requirement matrix", "Field, locale rule, UI behavior, backend dependency, and owner", "BA", "Locale-sensitive behavior is explicit"], ["Copy expansion risk list", "Component, source text, length risk, and fallback", "UX and localization", "UI can handle translation"], ["Formatting rule table", "Date, currency, address, number, name, and timezone rules", "Backend and frontend", "Formatting ownership is clear"], ["i18n QA matrix", "Locale, viewport, data example, and expected output", "QA", "Key locales are tested"]],
    viDeliverables: [["Localization requirement matrix", "Field, locale rule, UI behavior, backend dependency và owner", "BA", "Locale-sensitive behavior explicit"], ["Copy expansion risk list", "Component, source text, length risk và fallback", "UX và localization", "UI handle được translation"], ["Formatting rule table", "Date, currency, address, number, name và timezone rule", "Backend và frontend", "Formatting ownership rõ"], ["i18n QA matrix", "Locale, viewport, data example và expected output", "QA", "Key locale được test"]],
    enRisks: [["Hardcoded locale", "UI may fail in target markets", "Specify locale-sensitive rules early"], ["Copy overflow", "Translated text may break layout", "Test long translations and responsive behavior"], ["Regulatory copy error", "Legal text may vary by market", "Require legal review per market"], ["Timezone confusion", "Dates may be shown incorrectly", "Define storage and display timezone rules"]],
    viRisks: [["Hardcoded locale", "UI có thể fail ở target market", "Specify locale-sensitive rule sớm"], ["Copy overflow", "Translated text có thể break layout", "Test long translation và responsive behavior"], ["Regulatory copy error", "Legal text có thể khác theo market", "Require legal review per market"], ["Timezone confusion", "Date có thể hiển thị sai", "Define storage và display timezone rule"]],
    enMetric: "Localized UI behavior is testable before market rollout and avoids hardcoded assumptions.",
    viMetric: "Localized UI behavior test được trước market rollout và tránh hardcoded assumption."
  },
  {
    slug: "visual-regression-qa-handoff",
    group: "Frontend, UI, and UX",
    domain: "Visual QA",
    enTitle: "Visual Regression and UI QA Handoff",
    viTitle: "Handoff visual regression và UI QA",
    enProject: "A redesign updates shared components across many pages. The team needs QA guidance for visual regressions, layout shifts, browser differences, and component variants.",
    viProject: "Một redesign update shared component trên nhiều page. Team cần QA guidance cho visual regression, layout shift, browser difference và component variant.",
    enChallenge: "The BA must help define what visual quality means in business terms: critical pages, supported browsers, responsive states, component variants, and acceptable deviations. AI can create checklist drafts, but visual decisions need design ownership.",
    viChallenge: "BA phải giúp define visual quality theo business term: critical page, supported browser, responsive state, component variant và acceptable deviation. AI có thể draft checklist, nhưng visual decision cần design ownership.",
    enAiUse: ["Generate visual QA checklist from redesign scope.", "Identify critical pages and component variants needing coverage.", "Draft risk-based browser and viewport matrix.", "Create defect severity rubric for visual issues."],
    viAiUse: ["Generate visual QA checklist từ redesign scope.", "Identify critical page và component variant cần coverage.", "Draft browser và viewport matrix theo risk.", "Tạo defect severity rubric cho visual issue."],
    enInputs: ["Redesign scope", "Component inventory", "Critical page list", "Supported browser policy", "Design acceptance notes"],
    viInputs: ["Redesign scope", "Component inventory", "Critical page list", "Supported browser policy", "Design acceptance notes"],
    enWorkflow: ["Inventory affected pages, components, variants, and viewports.", "Ask AI to propose visual QA coverage and severity categories.", "Review coverage with UX, frontend, and QA.", "Define acceptable deviation, critical defects, and release blockers.", "Add screenshot or baseline expectations where useful.", "Publish visual QA handoff and defect triage rules."],
    viWorkflow: ["Inventory affected page, component, variant và viewport.", "Yêu cầu AI propose visual QA coverage và severity category.", "Review coverage với UX, frontend và QA.", "Define acceptable deviation, critical defect và release blocker.", "Thêm screenshot hoặc baseline expectation khi hữu ích.", "Publish visual QA handoff và defect triage rule."],
    enDeliverables: [["Visual QA matrix", "Page, component, variant, viewport, browser, and priority", "BA and QA", "Coverage is risk-based"], ["Severity rubric", "Visual issue type, user impact, severity, and release decision", "Product and UX", "Triage is consistent"], ["Baseline checklist", "Expected layout, spacing, overflow, and interaction states", "UX", "Design intent is testable"], ["Regression triage board", "Defect, affected page, severity, owner, and decision", "QA lead", "Visual defects are managed"]],
    viDeliverables: [["Visual QA matrix", "Page, component, variant, viewport, browser và priority", "BA và QA", "Coverage risk-based"], ["Severity rubric", "Visual issue type, user impact, severity và release decision", "Product và UX", "Triage consistent"], ["Baseline checklist", "Expected layout, spacing, overflow và interaction state", "UX", "Design intent test được"], ["Regression triage board", "Defect, affected page, severity, owner và decision", "QA lead", "Visual defect được manage"]],
    enRisks: [["Subjective defects", "People may disagree whether a visual issue matters", "Use severity rubric tied to user impact"], ["Coverage gaps", "Shared component changes can break hidden pages", "Inventory pages and component variants"], ["Browser surprise", "A layout may fail only in a supported browser", "Define browser and viewport matrix"], ["Design drift", "Implementation may slowly diverge from system rules", "Use baseline checklist and design review"]],
    viRisks: [["Subjective defects", "Mọi người có thể không thống nhất visual issue có quan trọng không", "Dùng severity rubric gắn với user impact"], ["Coverage gaps", "Shared component change có thể break page ẩn", "Inventory page và component variant"], ["Browser surprise", "Layout có thể fail chỉ ở supported browser", "Define browser và viewport matrix"], ["Design drift", "Implementation có thể dần lệch system rule", "Dùng baseline checklist và design review"]],
    enMetric: "Visual QA focuses on user-impacting regressions across critical pages, components, and supported viewports.",
    viMetric: "Visual QA tập trung regression ảnh hưởng user trên critical page, component và supported viewport."
  },
  {
    slug: "frontend-permission-visibility-rules",
    group: "Frontend, UI, and UX",
    domain: "Permissioned UI",
    enTitle: "Frontend Permission Visibility Rules",
    viTitle: "Rule visibility theo permission trên frontend",
    enProject: "An admin console has multiple roles: viewer, editor, approver, auditor, and tenant admin. The backend enforces permissions, but frontend behavior for hidden, disabled, and read-only controls is undefined.",
    viProject: "Admin console có nhiều role: viewer, editor, approver, auditor và tenant admin. Backend enforce permission, nhưng frontend behavior cho hidden, disabled và read-only control chưa rõ.",
    enChallenge: "The BA must specify how permissions appear in UI without weakening security. Users need clarity, but the frontend must never become the source of truth for authorization.",
    viChallenge: "BA phải specify permission hiển thị trong UI ra sao mà không làm yếu security. User cần clarity, nhưng frontend không bao giờ là source of truth cho authorization.",
    enAiUse: ["Generate role-control visibility matrix.", "Identify actions that should be hidden, disabled, or read-only.", "Draft copy for unavailable actions.", "Map frontend visibility to backend authorization checks."],
    viAiUse: ["Generate role-control visibility matrix.", "Identify action nên hidden, disabled hoặc read-only.", "Draft copy cho unavailable action.", "Map frontend visibility với backend authorization check."],
    enInputs: ["RBAC matrix", "Admin screen design", "Backend authorization rules", "Audit policy", "User support notes"],
    viInputs: ["RBAC matrix", "Admin screen design", "Backend authorization rules", "Audit policy", "User support notes"],
    enWorkflow: ["List roles, screens, controls, actions, and data fields.", "Ask AI to create role-control visibility matrix.", "Review which unavailable controls should be hidden versus disabled.", "Align every UI rule with backend authorization and audit needs.", "Write acceptance criteria for role switching and unauthorized deep links.", "Create QA cases for each role and blocked action."],
    viWorkflow: ["List role, screen, control, action và data field.", "Yêu cầu AI tạo role-control visibility matrix.", "Review control unavailable nên hidden hay disabled.", "Align mọi UI rule với backend authorization và audit need.", "Viết acceptance criteria cho role switching và unauthorized deep link.", "Tạo QA case cho từng role và blocked action."],
    enDeliverables: [["Role-control visibility matrix", "Role, screen, control, hidden/disabled/read-only rule, and reason", "BA", "UI behavior matches role rules"], ["Authorization trace map", "UI control to backend permission and audit event", "Backend lead", "Frontend and backend align"], ["Unavailable action copy", "Disabled reason, tooltip, support path, and role guidance", "UX", "Users understand limits"], ["Permission QA matrix", "Role, action, expected UI, expected API result, and audit", "QA", "Permission behavior is tested end to end"]],
    viDeliverables: [["Role-control visibility matrix", "Role, screen, control, hidden/disabled/read-only rule và reason", "BA", "UI behavior match role rule"], ["Authorization trace map", "UI control tới backend permission và audit event", "Backend lead", "Frontend và backend align"], ["Unavailable action copy", "Disabled reason, tooltip, support path và role guidance", "UX", "User hiểu limit"], ["Permission QA matrix", "Role, action, expected UI, expected API result và audit", "QA", "Permission behavior test end to end"]],
    enRisks: [["Security by UI", "Frontend hiding is not authorization", "Trace every action to backend permission"], ["User confusion", "Hidden actions may make users think feature is missing", "Choose hidden or disabled deliberately"], ["Deep link bypass", "Users may access unauthorized routes", "Specify route guard and backend rejection"], ["Role drift", "RBAC changes may not update UI", "Maintain permission matrix as source artifact"]],
    viRisks: [["Security by UI", "Frontend hiding không phải authorization", "Trace mọi action tới backend permission"], ["User confusion", "Hidden action làm user tưởng feature missing", "Chọn hidden hoặc disabled có chủ đích"], ["Deep link bypass", "User có thể access unauthorized route", "Specify route guard và backend rejection"], ["Role drift", "RBAC change có thể không update UI", "Maintain permission matrix như source artifact"]],
    enMetric: "Permissioned UI behavior is understandable to users and aligned with backend authorization controls.",
    viMetric: "Permissioned UI behavior dễ hiểu cho user và aligned với backend authorization control."
  },
  {
    slug: "api-contract-requirements",
    group: "Backend and API",
    domain: "API contracts",
    enTitle: "API Contract Requirements",
    viTitle: "Requirement cho API contract",
    enProject: "Frontend and backend teams must integrate a new customer profile API. Stories describe the screen, but the request fields, response fields, validation behavior, error responses, and pagination rules are not agreed.",
    viProject: "Frontend và backend team cần integrate customer profile API mới. Story mô tả screen, nhưng request field, response field, validation behavior, error response và pagination rule chưa agreed.",
    enChallenge: "The BA must help define API behavior in business terms so frontend, backend, QA, and product align. API requirements should cover data meaning, not just technical schema.",
    viChallenge: "BA phải giúp define API behavior bằng business term để frontend, backend, QA và product aligned. API requirement nên cover meaning của data, không chỉ technical schema.",
    enAiUse: ["Draft an API contract checklist from screen requirements.", "Identify missing request, response, validation, error, and pagination rules.", "Generate API acceptance criteria and integration questions.", "Critique schema fields for unclear business meaning."],
    viAiUse: ["Draft API contract checklist từ screen requirement.", "Identify missing request, response, validation, error và pagination rule.", "Generate API acceptance criteria và integration question.", "Critique schema field có business meaning chưa rõ."],
    enInputs: ["Screen behavior spec", "Data field definitions", "Backend domain model", "Existing API examples", "Validation rules"],
    viInputs: ["Screen behavior spec", "Data field definitions", "Backend domain model", "Existing API examples", "Validation rules"],
    enWorkflow: ["Map UI behavior to required API operations.", "Ask AI to propose contract fields and missing business definitions.", "Define request, response, filtering, sorting, pagination, validation, and error behavior.", "Review schema with backend and frontend for feasibility.", "Add API acceptance criteria and contract test scenarios.", "Track unresolved contract decisions in a decision log."],
    viWorkflow: ["Map UI behavior tới API operation cần có.", "Yêu cầu AI propose contract field và missing business definition.", "Define request, response, filtering, sorting, pagination, validation và error behavior.", "Review schema với backend và frontend về feasibility.", "Thêm API acceptance criteria và contract test scenario.", "Track unresolved contract decision trong decision log."],
    enDeliverables: [["API behavior spec", "Operation, request, response, rule, pagination, and owner", "BA and backend", "API behavior is business-readable"], ["Field definition catalog", "Field, meaning, source, type, nullability, and example", "BA", "No unclear data fields"], ["Error behavior table", "Condition, status, code, message, frontend action, and owner", "Backend", "Errors are actionable"], ["Contract test scenarios", "Input, expected response, validation, and edge cases", "QA", "API can be tested before UI completion"]],
    viDeliverables: [["API behavior spec", "Operation, request, response, rule, pagination và owner", "BA và backend", "API behavior business-readable"], ["Field definition catalog", "Field, meaning, source, type, nullability và example", "BA", "Không có data field mơ hồ"], ["Error behavior table", "Condition, status, code, message, frontend action và owner", "Backend", "Error actionable"], ["Contract test scenarios", "Input, expected response, validation và edge case", "QA", "API test được trước khi UI complete"]],
    enRisks: [["Schema without meaning", "Teams may agree on fields but not business interpretation", "Document field meaning and examples"], ["Frontend-backend mismatch", "UI expects behavior API does not provide", "Trace UI behavior to API operations"], ["Error ambiguity", "Frontend cannot guide users from generic errors", "Define error taxonomy and action"], ["Late contract decision", "Integration is delayed by unresolved fields", "Track contract decisions early"]],
    viRisks: [["Schema without meaning", "Team agree field nhưng không agree business interpretation", "Document field meaning và example"], ["Frontend-backend mismatch", "UI expect behavior API không provide", "Trace UI behavior tới API operation"], ["Error ambiguity", "Frontend không guide được user từ generic error", "Define error taxonomy và action"], ["Late contract decision", "Integration delay vì field chưa resolve", "Track contract decision sớm"]],
    enMetric: "Frontend and backend integrate against a contract that is traceable to business behavior.",
    viMetric: "Frontend và backend integrate theo contract trace được tới business behavior."
  },
  {
    slug: "request-response-schema-review",
    group: "Backend and API",
    domain: "Schema design",
    enTitle: "Request and Response Schema Review",
    viTitle: "Review schema request và response",
    enProject: "A backend team drafts request and response schemas for a partner onboarding API. Product stakeholders cannot tell whether optional fields, null values, nested objects, and identifiers match business rules.",
    viProject: "Backend team draft request và response schema cho partner onboarding API. Product stakeholder không biết optional field, null value, nested object và identifier có match business rule không.",
    enChallenge: "The BA must review schema semantics with business owners. The goal is to ensure fields, nullability, defaults, enums, IDs, and nested structures represent real business concepts and lifecycle states.",
    viChallenge: "BA phải review schema semantics với business owner. Mục tiêu là đảm bảo field, nullability, default, enum, ID và nested structure represent đúng business concept và lifecycle state.",
    enAiUse: ["Explain schema fields in business language.", "Identify unclear nullability, enum, and nested object rules.", "Generate business questions for schema review.", "Draft schema examples for common and edge scenarios."],
    viAiUse: ["Explain schema field bằng business language.", "Identify nullability, enum và nested object rule chưa rõ.", "Generate business question cho schema review.", "Draft schema example cho common và edge scenario."],
    enInputs: ["OpenAPI draft", "Business glossary", "Entity lifecycle", "Validation policy", "Example payloads"],
    viInputs: ["OpenAPI draft", "Business glossary", "Entity lifecycle", "Validation policy", "Example payloads"],
    enWorkflow: ["Load schema fields into a field review table.", "Ask AI to translate technical schema into business meaning.", "Identify fields without source rule, unclear optionality, or ambiguous enum values.", "Create example payloads for common, boundary, and invalid cases.", "Review with backend, product, QA, and data owners.", "Update schema decisions and validation requirements."],
    viWorkflow: ["Load schema field vào field review table.", "Yêu cầu AI translate technical schema thành business meaning.", "Identify field thiếu source rule, optionality chưa rõ hoặc enum ambiguous.", "Tạo example payload cho common, boundary và invalid case.", "Review với backend, product, QA và data owner.", "Update schema decision và validation requirement."],
    enDeliverables: [["Schema review table", "Field, meaning, required status, nullability, enum, default, and source rule", "BA", "Business owners can review schema"], ["Payload examples", "Common, edge, invalid, and backwards-compatible examples", "Backend and QA", "Examples cover real scenarios"], ["Schema question log", "Ambiguity, decision owner, option, and resolution", "BA", "Unclear fields are resolved"], ["Validation alignment matrix", "Schema rule, business rule, API validation, and UI validation", "BA and QA", "Validation is consistent"]],
    viDeliverables: [["Schema review table", "Field, meaning, required status, nullability, enum, default và source rule", "BA", "Business owner review được schema"], ["Payload examples", "Common, edge, invalid và backwards-compatible example", "Backend và QA", "Example cover scenario thật"], ["Schema question log", "Ambiguity, decision owner, option và resolution", "BA", "Field unclear được resolve"], ["Validation alignment matrix", "Schema rule, business rule, API validation và UI validation", "BA và QA", "Validation consistent"]],
    enRisks: [["Optionality confusion", "Null and omitted values may mean different business states", "Define nullability and absence semantics"], ["Enum drift", "Enum values may not match business language", "Review enum labels and lifecycle states"], ["Identifier ambiguity", "IDs may be reused incorrectly across systems", "Define ID source and uniqueness"], ["Example shortage", "Teams cannot test schema edge cases", "Create payload examples"]],
    viRisks: [["Optionality confusion", "Null và omitted value có thể mang business state khác nhau", "Define nullability và absence semantics"], ["Enum drift", "Enum value có thể không match business language", "Review enum label và lifecycle state"], ["Identifier ambiguity", "ID có thể bị dùng sai giữa system", "Define ID source và uniqueness"], ["Example shortage", "Team không test được schema edge case", "Tạo payload example"]],
    enMetric: "API schema fields are understandable, testable, and aligned to business concepts.",
    viMetric: "API schema field dễ hiểu, testable và aligned với business concept."
  },
  {
    slug: "api-error-code-taxonomy",
    group: "Backend and API",
    domain: "Error handling",
    enTitle: "API Error Code and Message Taxonomy",
    viTitle: "Taxonomy error code và message cho API",
    enProject: "A mobile app consumes backend APIs that return inconsistent errors. Some errors are generic, some expose technical details, and some do not tell the UI what user action is possible.",
    viProject: "Mobile app consume backend API trả error inconsistent. Một số error generic, một số expose technical detail, một số không cho UI biết user action nào possible.",
    enChallenge: "The BA must define error taxonomy as product behavior. Error codes should support user guidance, support diagnostics, security, retry logic, and QA testability.",
    viChallenge: "BA phải define error taxonomy như product behavior. Error code cần support user guidance, support diagnostics, security, retry logic và QA testability.",
    enAiUse: ["Cluster existing API errors into business categories.", "Draft error taxonomy with frontend action and support meaning.", "Identify security-sensitive messages that need safe wording.", "Generate negative API test scenarios."],
    viAiUse: ["Cluster existing API error thành business category.", "Draft error taxonomy có frontend action và support meaning.", "Identify message sensitive về security cần safe wording.", "Generate negative API test scenario."],
    enInputs: ["Existing error responses", "API contract", "Security guidelines", "Support runbooks", "UI error message catalog"],
    viInputs: ["Existing error responses", "API contract", "Security guidelines", "Support runbooks", "UI error message catalog"],
    enWorkflow: ["Inventory current error responses and user-facing effects.", "Ask AI to cluster errors by business condition and recovery action.", "Define error code, HTTP status, safe message, frontend action, support meaning, and retry behavior.", "Review security-sensitive errors with security owners.", "Add acceptance criteria for negative cases and retry behavior.", "Publish taxonomy and update frontend copy."],
    viWorkflow: ["Inventory current error response và user-facing effect.", "Yêu cầu AI cluster error theo business condition và recovery action.", "Define error code, HTTP status, safe message, frontend action, support meaning và retry behavior.", "Review error sensitive với security owner.", "Thêm acceptance criteria cho negative case và retry behavior.", "Publish taxonomy và update frontend copy."],
    enDeliverables: [["Error taxonomy", "Condition, code, status, safe message, frontend action, and retry behavior", "BA and backend", "Errors are consistent"], ["Security message review", "Sensitive error, exposure risk, safe copy, and approval", "Security", "Messages do not leak internals"], ["Frontend error action map", "Code, UI message, user action, support path, and analytics", "Frontend and UX", "UI can guide recovery"], ["Negative test set", "Input, expected error code, expected UI, and support meaning", "QA", "Error behavior is testable"]],
    viDeliverables: [["Error taxonomy", "Condition, code, status, safe message, frontend action và retry behavior", "BA và backend", "Error consistent"], ["Security message review", "Sensitive error, exposure risk, safe copy và approval", "Security", "Message không leak internals"], ["Frontend error action map", "Code, UI message, user action, support path và analytics", "Frontend và UX", "UI guide được recovery"], ["Negative test set", "Input, expected error code, expected UI và support meaning", "QA", "Error behavior testable"]],
    enRisks: [["Generic error", "Users cannot recover and support cannot diagnose", "Map each error to user and support action"], ["Sensitive leakage", "Errors may expose system internals", "Use safe messages and security review"], ["Retry confusion", "UI may retry when it should not", "Define retryable versus non-retryable"], ["Inconsistent teams", "APIs may use different codes for same condition", "Publish shared taxonomy"]],
    viRisks: [["Generic error", "User không recover và support không diagnose được", "Map từng error tới user/support action"], ["Sensitive leakage", "Error có thể expose system internal", "Dùng safe message và security review"], ["Retry confusion", "UI retry khi không nên retry", "Define retryable vs non-retryable"], ["Inconsistent teams", "API dùng code khác nhau cho cùng condition", "Publish shared taxonomy"]],
    enMetric: "API errors become consistent product behavior that frontend, QA, and support can use.",
    viMetric: "API error trở thành product behavior consistent để frontend, QA và support sử dụng."
  },
  {
    slug: "auth-authorization-rbac-rules",
    group: "Backend and API",
    domain: "Authorization",
    enTitle: "Authentication, Authorization, and RBAC Rules",
    viTitle: "Rule authentication, authorization và RBAC",
    enProject: "A SaaS admin system introduces tenant admins, billing admins, read-only auditors, and external partners. Role permissions affect screens, APIs, exports, approvals, and audit logs.",
    viProject: "SaaS admin system giới thiệu tenant admin, billing admin, read-only auditor và external partner. Role permission ảnh hưởng screen, API, export, approval và audit log.",
    enChallenge: "The BA must create RBAC requirements that are precise enough for backend enforcement and frontend behavior. The BA must also capture authentication assumptions, session behavior, escalation, and audit needs.",
    viChallenge: "BA phải tạo RBAC requirement đủ precise cho backend enforcement và frontend behavior. BA cũng phải capture authentication assumption, session behavior, escalation và audit need.",
    enAiUse: ["Generate permission matrix from roles and user tasks.", "Identify conflicting permissions and segregation-of-duty risks.", "Draft API authorization scenarios and UI visibility rules.", "Create QA cases for unauthorized access and audit events."],
    viAiUse: ["Generate permission matrix từ role và user task.", "Identify conflicting permission và segregation-of-duty risk.", "Draft API authorization scenario và UI visibility rule.", "Tạo QA case cho unauthorized access và audit event."],
    enInputs: ["Role definitions", "User task list", "API operations", "Screen list", "Security and audit policy"],
    viInputs: ["Role definitions", "User task list", "API operations", "Screen list", "Security và audit policy"],
    enWorkflow: ["List roles, business tasks, screens, data objects, and API operations.", "Ask AI to draft permission matrix and find conflicts.", "Review matrix with security, product, backend, frontend, and operations.", "Define authentication and session behavior where relevant.", "Create acceptance criteria for allowed and blocked actions.", "Add audit and reporting requirements for sensitive actions."],
    viWorkflow: ["List role, business task, screen, data object và API operation.", "Yêu cầu AI draft permission matrix và find conflict.", "Review matrix với security, product, backend, frontend và operations.", "Define authentication và session behavior khi relevant.", "Tạo acceptance criteria cho allowed và blocked action.", "Thêm audit/reporting requirement cho sensitive action."],
    enDeliverables: [["RBAC matrix", "Role, task, data object, API operation, UI behavior, and audit", "BA and security", "Permissions are explicit"], ["Authorization scenario set", "Allowed, denied, cross-tenant, expired session, and escalation cases", "QA", "Security cases are testable"], ["Segregation risk list", "Conflicting roles, sensitive action, and approval rule", "Security", "High-risk combinations are controlled"], ["Session behavior spec", "Login, timeout, refresh, logout, and re-authentication rules", "Backend", "Auth behavior is predictable"]],
    viDeliverables: [["RBAC matrix", "Role, task, data object, API operation, UI behavior và audit", "BA và security", "Permission explicit"], ["Authorization scenario set", "Allowed, denied, cross-tenant, expired session và escalation case", "QA", "Security case testable"], ["Segregation risk list", "Conflicting role, sensitive action và approval rule", "Security", "High-risk combination controlled"], ["Session behavior spec", "Login, timeout, refresh, logout và re-authentication rule", "Backend", "Auth behavior predictable"]],
    enRisks: [["Role ambiguity", "Same role name may mean different permissions", "Define permissions by task and data object"], ["Backend-only thinking", "UI behavior may not match authorization", "Trace backend permissions to UI state"], ["Tenant leakage", "Cross-tenant access can be severe", "Add cross-tenant negative scenarios"], ["Missing audit", "Sensitive actions may lack trace", "Specify audit event and reportability"]],
    viRisks: [["Role ambiguity", "Cùng role name có thể có permission khác", "Define permission theo task và data object"], ["Backend-only thinking", "UI behavior có thể không match authorization", "Trace backend permission tới UI state"], ["Tenant leakage", "Cross-tenant access rất nghiêm trọng", "Thêm cross-tenant negative scenario"], ["Missing audit", "Sensitive action có thể thiếu trace", "Specify audit event và reportability"]],
    enMetric: "RBAC behavior is enforceable by backend, understandable in UI, and testable by QA.",
    viMetric: "RBAC behavior enforce được bởi backend, dễ hiểu trên UI và testable bởi QA."
  },
  {
    slug: "idempotency-retry-timeout-behavior",
    group: "Backend and API",
    domain: "Reliability behavior",
    enTitle: "Idempotency, Retry, and Timeout Behavior",
    viTitle: "Behavior idempotency, retry và timeout",
    enProject: "A payment initiation API can be called multiple times because users double-click, browsers retry, and network requests time out. Duplicate processing would create financial and support risk.",
    viProject: "Payment initiation API có thể bị call nhiều lần vì user double-click, browser retry và network request timeout. Xử lý duplicate sẽ tạo risk tài chính và support.",
    enChallenge: "The BA must specify reliability behavior in business terms: what counts as duplicate, when retry is safe, what users see during timeout, and how operations reconcile uncertain outcomes.",
    viChallenge: "BA phải specify reliability behavior bằng business term: thế nào là duplicate, khi nào retry safe, user thấy gì khi timeout và operations reconcile uncertain outcome ra sao.",
    enAiUse: ["Generate duplicate and timeout scenarios.", "Draft idempotency behavior table with user and backend outcomes.", "Identify unclear retry ownership across frontend, backend, and external providers.", "Create support and reconciliation questions."],
    viAiUse: ["Generate duplicate và timeout scenario.", "Draft idempotency behavior table có user/backend outcome.", "Identify retry ownership chưa rõ giữa frontend, backend và external provider.", "Tạo support và reconciliation question."],
    enInputs: ["Payment workflow", "API contract", "External provider rules", "Support process", "Audit and reconciliation requirements"],
    viInputs: ["Payment workflow", "API contract", "External provider rules", "Support process", "Audit và reconciliation requirements"],
    enWorkflow: ["Define business consequences of duplicate, delayed, and unknown outcomes.", "Ask AI to generate retry, timeout, and duplicate scenarios.", "Specify idempotency key behavior and duplicate response rules.", "Define user messaging for processing, timeout, success, failure, and unknown states.", "Review reconciliation and support process with operations.", "Add API and UI acceptance criteria for retry behavior."],
    viWorkflow: ["Define business consequence của duplicate, delayed và unknown outcome.", "Yêu cầu AI generate retry, timeout và duplicate scenario.", "Specify idempotency key behavior và duplicate response rule.", "Define user messaging cho processing, timeout, success, failure và unknown state.", "Review reconciliation và support process với operations.", "Thêm API và UI acceptance criteria cho retry behavior."],
    enDeliverables: [["Reliability behavior matrix", "Scenario, duplicate rule, API behavior, UI message, and operation action", "BA", "Retry outcomes are clear"], ["Idempotency requirement", "Key source, validity window, duplicate response, and audit", "Backend", "Duplicate processing is prevented"], ["Timeout messaging spec", "User state, message, next action, and support path", "UX and BA", "Users understand uncertain outcomes"], ["Reconciliation playbook", "Unknown state, investigation, owner, SLA, and correction path", "Operations", "Operations can resolve exceptions"]],
    viDeliverables: [["Reliability behavior matrix", "Scenario, duplicate rule, API behavior, UI message và operation action", "BA", "Retry outcome rõ"], ["Idempotency requirement", "Key source, validity window, duplicate response và audit", "Backend", "Prevent duplicate processing"], ["Timeout messaging spec", "User state, message, next action và support path", "UX và BA", "User hiểu uncertain outcome"], ["Reconciliation playbook", "Unknown state, investigation, owner, SLA và correction path", "Operations", "Operations resolve được exception"]],
    enRisks: [["Duplicate transaction", "Users may be charged twice or records may duplicate", "Define idempotency and duplicate response"], ["False failure", "Timeout may hide successful processing", "Create unknown-state messaging and reconciliation"], ["Retry storm", "Aggressive retry can overload services", "Specify retry limits and ownership"], ["Support confusion", "Agents may not know transaction truth", "Provide audit and reconciliation playbook"]],
    viRisks: [["Duplicate transaction", "User có thể bị charge hai lần hoặc record duplicate", "Define idempotency và duplicate response"], ["False failure", "Timeout có thể che successful processing", "Tạo unknown-state messaging và reconciliation"], ["Retry storm", "Retry quá aggressive overload service", "Specify retry limit và ownership"], ["Support confusion", "Agent không biết transaction truth", "Provide audit và reconciliation playbook"]],
    enMetric: "Duplicate and uncertain outcomes are prevented or handled through defined API, UI, and operations behavior.",
    viMetric: "Duplicate và uncertain outcome được prevent hoặc handle bằng API, UI và operations behavior rõ."
  },
  {
    slug: "webhook-event-requirements",
    group: "Backend and API",
    domain: "Event-driven integration",
    enTitle: "Webhook and Event-Driven Requirements",
    viTitle: "Requirement webhook và event-driven",
    enProject: "A platform needs to notify partner systems when invoices are created, paid, voided, or disputed. Partners require reliable webhooks, replay support, and clear event payloads.",
    viProject: "Platform cần notify partner system khi invoice được created, paid, voided hoặc disputed. Partner cần webhook reliable, replay support và event payload rõ.",
    enChallenge: "The BA must specify event behavior beyond naming events. Requirements must cover trigger, payload, ordering, retries, replay, security, subscription management, and partner-facing documentation.",
    viChallenge: "BA phải specify event behavior vượt ngoài việc đặt tên event. Requirement cần cover trigger, payload, ordering, retry, replay, security, subscription management và partner-facing documentation.",
    enAiUse: ["Generate event catalog and payload questions from lifecycle states.", "Identify retry, replay, ordering, and duplicate scenarios.", "Draft partner documentation requirements.", "Create negative and operational test scenarios."],
    viAiUse: ["Generate event catalog và payload question từ lifecycle state.", "Identify retry, replay, ordering và duplicate scenario.", "Draft partner documentation requirement.", "Tạo negative và operational test scenario."],
    enInputs: ["Entity lifecycle", "Partner integration needs", "Security requirements", "Existing webhook examples", "Operational support process"],
    viInputs: ["Entity lifecycle", "Partner integration needs", "Security requirements", "Existing webhook examples", "Operational support process"],
    enWorkflow: ["Map entity lifecycle transitions to event triggers.", "Ask AI to draft event catalog and missing payload fields.", "Define event payload, subscription, authentication, retry, replay, and idempotency behavior.", "Review partner documentation and support needs.", "Write acceptance criteria for success, failure, duplicate, and replay cases.", "Create operational monitoring and incident handling requirements."],
    viWorkflow: ["Map entity lifecycle transition tới event trigger.", "Yêu cầu AI draft event catalog và missing payload field.", "Define event payload, subscription, authentication, retry, replay và idempotency behavior.", "Review partner documentation và support need.", "Viết acceptance criteria cho success, failure, duplicate và replay case.", "Tạo operational monitoring và incident handling requirement."],
    enDeliverables: [["Event catalog", "Event, trigger, payload, consumer, business meaning, and owner", "BA and backend", "Events map to lifecycle"], ["Webhook behavior spec", "Subscription, security, retry, replay, ordering, and duplicate handling", "Backend", "Operational behavior is defined"], ["Partner documentation outline", "Payload examples, signing, retries, error handling, and support", "Developer relations", "Partners can integrate"], ["Event QA scenarios", "Success, retry, replay, duplicate, missing consumer, and bad signature", "QA", "Integration behavior is testable"]],
    viDeliverables: [["Event catalog", "Event, trigger, payload, consumer, business meaning và owner", "BA và backend", "Event map với lifecycle"], ["Webhook behavior spec", "Subscription, security, retry, replay, ordering và duplicate handling", "Backend", "Operational behavior defined"], ["Partner documentation outline", "Payload example, signing, retry, error handling và support", "Developer relations", "Partner integrate được"], ["Event QA scenarios", "Success, retry, replay, duplicate, missing consumer và bad signature", "QA", "Integration behavior testable"]],
    enRisks: [["Event ambiguity", "Consumers may interpret event meaning differently", "Document business meaning and trigger"], ["Duplicate delivery", "Partners may process same event twice", "Specify event ID and idempotency"], ["Replay gap", "Partners cannot recover from outage", "Define replay and event history"], ["Security weakness", "Webhook may be spoofed", "Specify signing and authentication"]],
    viRisks: [["Event ambiguity", "Consumer có thể interpret event meaning khác nhau", "Document business meaning và trigger"], ["Duplicate delivery", "Partner có thể process cùng event hai lần", "Specify event ID và idempotency"], ["Replay gap", "Partner không recover được sau outage", "Define replay và event history"], ["Security weakness", "Webhook có thể bị spoof", "Specify signing và authentication"]],
    enMetric: "Event-driven integration has clear semantics, reliability behavior, and partner-ready documentation.",
    viMetric: "Event-driven integration có semantic rõ, reliability behavior và documentation sẵn cho partner."
  },
  {
    slug: "backend-validation-business-rules",
    group: "Backend and API",
    domain: "Business rules",
    enTitle: "Backend Validation and Business Rules",
    viTitle: "Backend validation và business rules",
    enProject: "Frontend validation exists for a quote request form, but backend must enforce pricing limits, eligibility, approval thresholds, and fraud-related constraints regardless of UI behavior.",
    viProject: "Frontend validation đã có cho quote request form, nhưng backend phải enforce pricing limit, eligibility, approval threshold và fraud-related constraint bất kể UI behavior.",
    enChallenge: "The BA must separate user guidance from authoritative business rule enforcement. Backend validation must be source-backed, testable, auditable, and consistent with frontend messaging.",
    viChallenge: "BA phải tách user guidance khỏi authoritative business rule enforcement. Backend validation phải source-backed, testable, auditable và consistent với frontend messaging.",
    enAiUse: ["Extract business rules from policy and stories.", "Classify rules as frontend guidance, backend enforcement, or both.", "Generate backend validation scenarios and error responses.", "Identify missing audit requirements for rule failures."],
    viAiUse: ["Extract business rule từ policy và story.", "Classify rule là frontend guidance, backend enforcement hoặc cả hai.", "Generate backend validation scenario và error response.", "Identify missing audit requirement cho rule failure."],
    enInputs: ["Policy documents", "Frontend validation spec", "Pricing rules", "Eligibility rules", "Audit requirements"],
    viInputs: ["Policy documents", "Frontend validation spec", "Pricing rules", "Eligibility rules", "Audit requirements"],
    enWorkflow: ["Inventory all validation rules and source evidence.", "Ask AI to classify rule enforcement location and risk.", "Define backend validation behavior, error code, audit event, and override path.", "Review rule conflicts with product, operations, and compliance.", "Write API negative test scenarios.", "Align frontend copy with backend rejection reasons."],
    viWorkflow: ["Inventory mọi validation rule và source evidence.", "Yêu cầu AI classify rule enforcement location và risk.", "Define backend validation behavior, error code, audit event và override path.", "Review rule conflict với product, operations và compliance.", "Viết API negative test scenario.", "Align frontend copy với backend rejection reason."],
    enDeliverables: [["Backend rule matrix", "Rule, source, enforcement, error code, audit need, and owner", "BA and backend", "Rules are enforceable"], ["Validation location map", "Frontend guidance, backend enforcement, both, or manual review", "BA", "Ownership is clear"], ["Negative API test set", "Invalid input, expected rejection, error code, and audit", "QA", "Rule failures are testable"], ["Frontend-backend message map", "Backend reason to user-facing copy and recovery action", "UX and frontend", "Users understand rejection"]],
    viDeliverables: [["Backend rule matrix", "Rule, source, enforcement, error code, audit need và owner", "BA và backend", "Rule enforceable"], ["Validation location map", "Frontend guidance, backend enforcement, both hoặc manual review", "BA", "Ownership rõ"], ["Negative API test set", "Invalid input, expected rejection, error code và audit", "QA", "Rule failure testable"], ["Frontend-backend message map", "Backend reason tới user-facing copy và recovery action", "UX và frontend", "User hiểu rejection"]],
    enRisks: [["Frontend-only validation", "Users or integrations can bypass UI rules", "Enforce material rules in backend"], ["Rule source gap", "Backend may implement invented thresholds", "Require source evidence and owner"], ["Poor recovery", "Backend rejection may not help user recover", "Map error reason to UI message"], ["Audit gap", "Rule failures may need evidence", "Specify audit event and retention"]],
    viRisks: [["Frontend-only validation", "User hoặc integration có thể bypass UI rule", "Enforce material rule ở backend"], ["Rule source gap", "Backend implement threshold tự bịa", "Require source evidence và owner"], ["Poor recovery", "Backend rejection không giúp user recover", "Map error reason tới UI message"], ["Audit gap", "Rule failure có thể cần evidence", "Specify audit event và retention"]],
    enMetric: "Backend validation is authoritative, source-backed, and aligned with frontend guidance.",
    viMetric: "Backend validation authoritative, source-backed và aligned với frontend guidance."
  },
  {
    slug: "batch-job-scheduled-process",
    group: "Backend and API",
    domain: "Scheduled processing",
    enTitle: "Batch Job and Scheduled Process Requirements",
    viTitle: "Requirement cho batch job và scheduled process",
    enProject: "A nightly job recalculates customer risk scores, sends summary notifications, and updates reporting tables. Failures are currently discovered late by support teams.",
    viProject: "Nightly job recalculates customer risk score, gửi summary notification và update reporting table. Failure hiện được support team phát hiện muộn.",
    enChallenge: "The BA must specify scheduled process behavior that users may never see directly: trigger, schedule, input eligibility, processing rules, failure handling, rerun, audit, and operational monitoring.",
    viChallenge: "BA phải specify scheduled process behavior mà user có thể không thấy trực tiếp: trigger, schedule, input eligibility, processing rule, failure handling, rerun, audit và operational monitoring.",
    enAiUse: ["Generate batch process requirement checklist.", "Identify failure, partial success, rerun, and notification scenarios.", "Draft operational monitoring and alert rules.", "Create acceptance criteria for data freshness and audit."],
    viAiUse: ["Generate batch process requirement checklist.", "Identify failure, partial success, rerun và notification scenario.", "Draft operational monitoring và alert rule.", "Tạo acceptance criteria cho data freshness và audit."],
    enInputs: ["Process purpose", "Schedule rules", "Input data definitions", "Output consumers", "Operations runbook"],
    viInputs: ["Process purpose", "Schedule rules", "Input data definitions", "Output consumers", "Operations runbook"],
    enWorkflow: ["Define business purpose and downstream consumers of the scheduled job.", "Ask AI to draft scenarios for success, partial success, skipped items, and failure.", "Specify schedule, eligibility, processing rules, output, notifications, and audit.", "Review rerun and rollback needs with backend and operations.", "Define monitoring, alert, SLA, and support escalation.", "Write acceptance criteria for data freshness and failure handling."],
    viWorkflow: ["Define business purpose và downstream consumer của scheduled job.", "Yêu cầu AI draft scenario cho success, partial success, skipped item và failure.", "Specify schedule, eligibility, processing rule, output, notification và audit.", "Review rerun và rollback need với backend và operations.", "Define monitoring, alert, SLA và support escalation.", "Viết acceptance criteria cho data freshness và failure handling."],
    enDeliverables: [["Batch process spec", "Schedule, trigger, eligibility, input, output, and processing rule", "BA and backend", "Job behavior is explicit"], ["Failure handling matrix", "Failure type, user impact, retry, rerun, alert, and owner", "Operations", "Failures have action path"], ["Data freshness requirement", "Output, consumer, freshness target, and alert threshold", "Product owner", "Freshness is measurable"], ["Operational runbook requirements", "Monitor, alert, rerun, rollback, and support communication", "Operations", "Support can respond"]],
    viDeliverables: [["Batch process spec", "Schedule, trigger, eligibility, input, output và processing rule", "BA và backend", "Job behavior explicit"], ["Failure handling matrix", "Failure type, user impact, retry, rerun, alert và owner", "Operations", "Failure có action path"], ["Data freshness requirement", "Output, consumer, freshness target và alert threshold", "Product owner", "Freshness measurable"], ["Operational runbook requirements", "Monitor, alert, rerun, rollback và support communication", "Operations", "Support respond được"]],
    enRisks: [["Invisible failure", "Users see wrong data before anyone knows job failed", "Define monitoring and freshness alerts"], ["Partial success ambiguity", "Some records update and others do not", "Specify partial success and reconciliation"], ["Unsafe rerun", "Rerun may duplicate notifications or updates", "Define idempotent rerun behavior"], ["No owner", "Operations may not know who responds", "Assign alert owner and SLA"]],
    viRisks: [["Invisible failure", "User thấy data sai trước khi ai biết job fail", "Define monitoring và freshness alert"], ["Partial success ambiguity", "Một số record update còn số khác không", "Specify partial success và reconciliation"], ["Unsafe rerun", "Rerun có thể duplicate notification hoặc update", "Define idempotent rerun behavior"], ["No owner", "Operations không biết ai respond", "Assign alert owner và SLA"]],
    enMetric: "Scheduled backend work has clear business rules, monitoring, rerun behavior, and operational ownership.",
    viMetric: "Scheduled backend work có business rule, monitoring, rerun behavior và operational ownership rõ."
  },
  {
    slug: "audit-log-operational-logging",
    group: "Backend and API",
    domain: "Audit and observability",
    enTitle: "Audit Log and Operational Logging Requirements",
    viTitle: "Requirement audit log và operational logging",
    enProject: "A regulated admin module lets users change customer status, override limits, export data, and approve exceptions. Compliance asks what evidence will exist when decisions are challenged.",
    viProject: "Regulated admin module cho user đổi customer status, override limit, export data và approve exception. Compliance hỏi evidence nào tồn tại khi decision bị challenge.",
    enChallenge: "The BA must distinguish audit logs for accountability from operational logs for support and monitoring. Requirements must define event, actor, timestamp, before/after values, reason, correlation ID, retention, and access.",
    viChallenge: "BA phải tách audit log cho accountability khỏi operational log cho support và monitoring. Requirement cần define event, actor, timestamp, before/after value, reason, correlation ID, retention và access.",
    enAiUse: ["Generate audit event candidates from sensitive workflows.", "Identify missing reason codes and before/after fields.", "Draft operational logging questions for support diagnostics.", "Create retention and access control checklist."],
    viAiUse: ["Generate audit event candidate từ sensitive workflow.", "Identify missing reason code và before/after field.", "Draft operational logging question cho support diagnostics.", "Tạo retention và access control checklist."],
    enInputs: ["Sensitive action list", "Compliance policy", "Support runbook", "Data retention rules", "Admin workflow specs"],
    viInputs: ["Sensitive action list", "Compliance policy", "Support runbook", "Data retention rules", "Admin workflow specs"],
    enWorkflow: ["List actions requiring accountability, support diagnostics, or monitoring.", "Ask AI to draft audit and operational event catalog.", "Define required fields, reason codes, correlation IDs, and retention.", "Review access rules for who can view logs.", "Add acceptance criteria for log creation, export, and search.", "Create QA scenarios for sensitive actions and failed attempts."],
    viWorkflow: ["List action cần accountability, support diagnostics hoặc monitoring.", "Yêu cầu AI draft audit và operational event catalog.", "Define required field, reason code, correlation ID và retention.", "Review access rule cho người được view log.", "Thêm acceptance criteria cho log creation, export và search.", "Tạo QA scenario cho sensitive action và failed attempt."],
    enDeliverables: [["Audit event catalog", "Action, actor, before/after value, reason, source, and retention", "BA and compliance", "Audit evidence is complete"], ["Operational log requirements", "Event, correlation ID, diagnostic field, severity, and owner", "Operations", "Support can diagnose issues"], ["Reason code set", "Allowed reasons, when required, reviewer, and reporting use", "Product owner", "Sensitive actions have rationale"], ["Log access matrix", "Role, log type, visibility, export, and retention", "Security", "Logs are protected"]],
    viDeliverables: [["Audit event catalog", "Action, actor, before/after value, reason, source và retention", "BA và compliance", "Audit evidence complete"], ["Operational log requirements", "Event, correlation ID, diagnostic field, severity và owner", "Operations", "Support diagnose được issue"], ["Reason code set", "Allowed reason, khi required, reviewer và reporting use", "Product owner", "Sensitive action có rationale"], ["Log access matrix", "Role, log type, visibility, export và retention", "Security", "Log protected"]],
    enRisks: [["Audit gap", "A decision cannot be reconstructed later", "Capture actor, reason, source, and before/after values"], ["Log leakage", "Logs may expose sensitive data", "Define access and masking"], ["Operational blindness", "Support cannot trace failures", "Specify correlation ID and diagnostic events"], ["Reason quality", "Users may choose meaningless reasons", "Use controlled reason codes and comments when needed"]],
    viRisks: [["Audit gap", "Decision không reconstruct được sau này", "Capture actor, reason, source và before/after value"], ["Log leakage", "Log có thể expose sensitive data", "Define access và masking"], ["Operational blindness", "Support không trace được failure", "Specify correlation ID và diagnostic event"], ["Reason quality", "User chọn reason vô nghĩa", "Use controlled reason code và comment khi cần"]],
    enMetric: "Sensitive backend actions produce audit evidence and operational logs that support compliance and support work.",
    viMetric: "Sensitive backend action tạo audit evidence và operational log support compliance và support work."
  },
  {
    slug: "api-versioning-compatibility",
    group: "Backend and API",
    domain: "API lifecycle",
    enTitle: "API Versioning and Backward Compatibility",
    viTitle: "API versioning và backward compatibility",
    enProject: "A public API used by partners needs new fields and behavior. Some partners cannot upgrade quickly, and breaking changes could disrupt revenue operations.",
    viProject: "Public API được partner dùng cần thêm field và behavior mới. Một số partner không upgrade nhanh được, breaking change có thể disrupt revenue operations.",
    enChallenge: "The BA must specify versioning and compatibility behavior in business terms: who is affected, what changes are breaking, migration timeline, deprecation communication, and support path.",
    viChallenge: "BA phải specify versioning và compatibility behavior bằng business term: ai affected, change nào breaking, migration timeline, deprecation communication và support path.",
    enAiUse: ["Classify proposed API changes as breaking or non-breaking.", "Generate partner impact questions and migration scenarios.", "Draft deprecation communication requirements.", "Create compatibility test cases."],
    viAiUse: ["Classify proposed API change là breaking hoặc non-breaking.", "Generate partner impact question và migration scenario.", "Draft deprecation communication requirement.", "Tạo compatibility test case."],
    enInputs: ["Existing API contract", "Proposed changes", "Partner usage data", "Support commitments", "Deprecation policy"],
    viInputs: ["Existing API contract", "Proposed changes", "Partner usage data", "Support commitments", "Deprecation policy"],
    enWorkflow: ["Inventory current consumers and usage patterns.", "Ask AI to classify change impact and identify migration questions.", "Define versioning strategy, compatibility behavior, and support window.", "Review revenue and partner impact with business owners.", "Create migration, documentation, and communication requirements.", "Add compatibility and regression tests for old and new versions."],
    viWorkflow: ["Inventory current consumer và usage pattern.", "Yêu cầu AI classify change impact và identify migration question.", "Define versioning strategy, compatibility behavior và support window.", "Review revenue và partner impact với business owner.", "Tạo migration, documentation và communication requirement.", "Thêm compatibility và regression test cho version cũ và mới."],
    enDeliverables: [["Change impact matrix", "Change, breaking status, affected consumer, mitigation, and owner", "BA", "Impact is visible"], ["Versioning requirement", "Version strategy, support window, default behavior, and migration path", "Backend", "Compatibility behavior is clear"], ["Partner communication plan", "Notice, documentation, timeline, support, and escalation", "Partner manager", "Partners know what to do"], ["Compatibility test set", "Old contract, new contract, edge case, and regression expectation", "QA", "Old and new behavior are tested"]],
    viDeliverables: [["Change impact matrix", "Change, breaking status, affected consumer, mitigation và owner", "BA", "Impact visible"], ["Versioning requirement", "Version strategy, support window, default behavior và migration path", "Backend", "Compatibility behavior rõ"], ["Partner communication plan", "Notice, documentation, timeline, support và escalation", "Partner manager", "Partner biết cần làm gì"], ["Compatibility test set", "Old contract, new contract, edge case và regression expectation", "QA", "Behavior cũ và mới được test"]],
    enRisks: [["Unexpected breaking change", "Partners may fail after release", "Classify and test breaking changes"], ["Communication gap", "Consumers may not know migration timeline", "Define notice and support plan"], ["Long tail support", "Old versions may linger", "Set deprecation window and owner"], ["Revenue disruption", "Critical partners may be affected", "Prioritize partner impact review"]],
    viRisks: [["Unexpected breaking change", "Partner có thể fail sau release", "Classify và test breaking change"], ["Communication gap", "Consumer không biết migration timeline", "Define notice và support plan"], ["Long tail support", "Old version có thể linger", "Set deprecation window và owner"], ["Revenue disruption", "Critical partner có thể affected", "Prioritize partner impact review"]],
    enMetric: "API changes ship with clear compatibility behavior, migration support, and partner impact visibility.",
    viMetric: "API change ship với compatibility behavior, migration support và partner impact visibility rõ."
  },
  {
    slug: "integration-failure-fallback-behavior",
    group: "Backend and API",
    domain: "Integration resilience",
    enTitle: "Integration Failure and Fallback Behavior",
    viTitle: "Behavior khi integration fail và fallback",
    enProject: "A checkout flow depends on payment, tax, shipping, and inventory services. When one service fails, the current requirement only says show an error.",
    viProject: "Checkout flow phụ thuộc payment, tax, shipping và inventory service. Khi một service fail, requirement hiện chỉ nói show error.",
    enChallenge: "The BA must specify business-safe fallback behavior for integration failures. Different failures need different user messages, retries, manual paths, and operational alerts.",
    viChallenge: "BA phải specify fallback behavior business-safe khi integration fail. Failure khác nhau cần user message, retry, manual path và operational alert khác nhau.",
    enAiUse: ["Generate integration failure scenarios by service dependency.", "Draft fallback behavior matrix and user messaging.", "Identify retry, manual process, and alert needs.", "Create QA cases for service outage and partial failure."],
    viAiUse: ["Generate integration failure scenario theo service dependency.", "Draft fallback behavior matrix và user messaging.", "Identify retry, manual process và alert need.", "Tạo QA case cho service outage và partial failure."],
    enInputs: ["Integration map", "Checkout journey", "Service SLAs", "Manual operations process", "Support scripts"],
    viInputs: ["Integration map", "Checkout journey", "Service SLAs", "Manual operations process", "Support scripts"],
    enWorkflow: ["Map dependencies by user step and business impact.", "Ask AI to generate failure and partial failure scenarios.", "Define fallback for each service: retry, block, degrade, manual review, or notify.", "Review customer messaging and operational alert paths.", "Add acceptance criteria for outage, timeout, and partial response.", "Create support and monitoring requirements."],
    viWorkflow: ["Map dependency theo user step và business impact.", "Yêu cầu AI generate failure và partial failure scenario.", "Define fallback cho từng service: retry, block, degrade, manual review hoặc notify.", "Review customer messaging và operational alert path.", "Thêm acceptance criteria cho outage, timeout và partial response.", "Tạo support và monitoring requirement."],
    enDeliverables: [["Integration dependency map", "Service, user step, data, SLA, failure impact, and owner", "BA and architect", "Dependencies are visible"], ["Fallback behavior matrix", "Failure type, user message, retry, manual path, alert, and owner", "BA", "Failures have safe behavior"], ["Support runbook requirements", "Known failure, customer guidance, escalation, and resolution", "Support", "Support can respond"], ["Failure test scenarios", "Timeout, outage, partial response, bad data, and retry", "QA", "Resilience behavior is tested"]],
    viDeliverables: [["Integration dependency map", "Service, user step, data, SLA, failure impact và owner", "BA và architect", "Dependency visible"], ["Fallback behavior matrix", "Failure type, user message, retry, manual path, alert và owner", "BA", "Failure có safe behavior"], ["Support runbook requirements", "Known failure, customer guidance, escalation và resolution", "Support", "Support respond được"], ["Failure test scenarios", "Timeout, outage, partial response, bad data và retry", "QA", "Resilience behavior testable"]],
    enRisks: [["Generic failure handling", "All failures may block users unnecessarily", "Tailor fallback by service and impact"], ["Unsafe continuation", "Proceeding may create financial or data risk", "Define block versus degrade decisions"], ["No operational alert", "Failures may continue unnoticed", "Specify monitoring and owner"], ["Support unprepared", "Agents may not know workaround", "Create support runbook requirements"]],
    viRisks: [["Generic failure handling", "Mọi failure có thể block user không cần thiết", "Tailor fallback theo service và impact"], ["Unsafe continuation", "Proceed có thể tạo financial/data risk", "Define block vs degrade decision"], ["No operational alert", "Failure có thể kéo dài mà không ai biết", "Specify monitoring và owner"], ["Support unprepared", "Agent không biết workaround", "Tạo support runbook requirement"]],
    enMetric: "Integration failures have defined user, backend, support, and operations behavior before launch.",
    viMetric: "Integration failure có behavior rõ cho user, backend, support và operations trước launch."
  },
  {
    slug: "caching-rate-limit-requirements",
    group: "Backend and API",
    domain: "Performance controls",
    enTitle: "Caching and Rate Limit Requirements",
    viTitle: "Requirement caching và rate limit",
    enProject: "A search-heavy API is slow during peak usage. Engineering proposes caching and rate limits, but product worries about stale data and enterprise customers hitting limits.",
    viProject: "Search-heavy API chậm khi peak usage. Engineering đề xuất caching và rate limit, nhưng product lo stale data và enterprise customer hit limit.",
    enChallenge: "The BA must translate technical controls into business behavior: freshness expectations, user messaging, limit tiers, burst behavior, support exceptions, and monitoring.",
    viChallenge: "BA phải dịch technical control thành business behavior: freshness expectation, user messaging, limit tier, burst behavior, support exception và monitoring.",
    enAiUse: ["Generate caching and rate limit business questions.", "Draft freshness and stale-data acceptance criteria.", "Create rate limit tier matrix and user messaging.", "Identify support and monitoring requirements."],
    viAiUse: ["Generate business question cho caching và rate limit.", "Draft acceptance criteria cho freshness và stale data.", "Tạo rate limit tier matrix và user messaging.", "Identify support và monitoring requirement."],
    enInputs: ["Performance data", "Customer tiers", "Data freshness needs", "API usage analytics", "Support commitments"],
    viInputs: ["Performance data", "Customer tiers", "Data freshness needs", "API usage analytics", "Support commitments"],
    enWorkflow: ["Define user tasks and data freshness sensitivity.", "Ask AI to propose caching and rate limit questions by customer tier.", "Specify cache duration, invalidation, stale display, and force refresh behavior.", "Define rate limit thresholds, burst rules, error messages, and support path.", "Review trade-offs with product, backend, support, and enterprise account owners.", "Add monitoring and acceptance criteria for performance and limit behavior."],
    viWorkflow: ["Define user task và data freshness sensitivity.", "Yêu cầu AI propose caching và rate limit question theo customer tier.", "Specify cache duration, invalidation, stale display và force refresh behavior.", "Define rate limit threshold, burst rule, error message và support path.", "Review trade-off với product, backend, support và enterprise account owner.", "Thêm monitoring và acceptance criteria cho performance và limit behavior."],
    enDeliverables: [["Freshness requirement matrix", "Data type, freshness target, cache duration, stale display, and owner", "BA and product", "Stale behavior is explicit"], ["Rate limit tier table", "Customer tier, threshold, burst, error response, and exception path", "Product owner", "Limits match business model"], ["User messaging spec", "Stale data notice, rate limit message, retry guidance, and support path", "UX", "Users understand limits"], ["Performance monitoring spec", "Latency, cache hit rate, rate limit events, and alert owner", "Operations", "Controls are observable"]],
    viDeliverables: [["Freshness requirement matrix", "Data type, freshness target, cache duration, stale display và owner", "BA và product", "Stale behavior explicit"], ["Rate limit tier table", "Customer tier, threshold, burst, error response và exception path", "Product owner", "Limit match business model"], ["User messaging spec", "Stale data notice, rate limit message, retry guidance và support path", "UX", "User hiểu limit"], ["Performance monitoring spec", "Latency, cache hit rate, rate limit event và alert owner", "Operations", "Control observable"]],
    enRisks: [["Stale decision", "Cached data may drive wrong user action", "Define freshness and stale labels"], ["Customer friction", "Rate limits may block legitimate usage", "Align limits to tiers and support exceptions"], ["Hidden throttling", "Users may not know why requests fail", "Use clear error and retry guidance"], ["Unmeasured control", "Caching may not improve actual experience", "Monitor latency and cache hit rate"]],
    viRisks: [["Stale decision", "Cached data có thể dẫn tới user action sai", "Define freshness và stale label"], ["Customer friction", "Rate limit block legitimate usage", "Align limit với tier và support exception"], ["Hidden throttling", "User không biết vì sao request fail", "Dùng clear error và retry guidance"], ["Unmeasured control", "Caching có thể không cải thiện experience thật", "Monitor latency và cache hit rate"]],
    enMetric: "Caching and rate limits improve performance without hiding freshness or customer impact trade-offs.",
    viMetric: "Caching và rate limit cải thiện performance mà không che freshness hoặc customer impact trade-off."
  },
  {
    slug: "data-mapping-transformation-rules",
    group: "Data and Integration",
    domain: "Data mapping",
    enTitle: "Data Mapping and Transformation Rules",
    viTitle: "Rule data mapping và transformation",
    enProject: "A CRM-to-billing integration must map customer, contract, tax, and billing contact data. Field names look similar but meanings differ across systems.",
    viProject: "CRM-to-billing integration cần map customer, contract, tax và billing contact data. Field name nhìn giống nhau nhưng meaning khác giữa các system.",
    enChallenge: "The BA must define data mapping based on business meaning, not field labels. Transformation rules, defaults, null handling, source precedence, and exception handling must be explicit.",
    viChallenge: "BA phải define data mapping theo business meaning, không theo field label. Transformation rule, default, null handling, source precedence và exception handling phải explicit.",
    enAiUse: ["Compare source and target fields for semantic mismatches.", "Draft mapping table and transformation questions.", "Identify null, default, format, and source precedence gaps.", "Generate data quality test scenarios."],
    viAiUse: ["Compare source và target field để tìm semantic mismatch.", "Draft mapping table và transformation question.", "Identify null, default, format và source precedence gap.", "Generate data quality test scenario."],
    enInputs: ["Source field list", "Target field list", "Business glossary", "Sample records", "Integration requirements"],
    viInputs: ["Source field list", "Target field list", "Business glossary", "Sample records", "Integration requirements"],
    enWorkflow: ["Inventory source and target fields with business definitions.", "Ask AI to propose mappings and flag semantic mismatch.", "Define transformation, format, default, null, and precedence rules.", "Review exceptions with data owners and operations.", "Create sample records for normal, boundary, and bad data.", "Publish mapping with test cases and ownership."],
    viWorkflow: ["Inventory source và target field có business definition.", "Yêu cầu AI propose mapping và flag semantic mismatch.", "Define transformation, format, default, null và precedence rule.", "Review exception với data owner và operations.", "Tạo sample record cho normal, boundary và bad data.", "Publish mapping có test case và ownership."],
    enDeliverables: [["Data mapping matrix", "Source, target, meaning, transform, default, null rule, and owner", "BA and data owner", "Every field has mapping decision"], ["Transformation rule catalog", "Rule, example, source, exception, and validation", "Data engineer", "Rules are implementable"], ["Data quality test set", "Sample record, expected output, and failure condition", "QA", "Mapping can be tested"], ["Exception handling plan", "Bad data, missing data, conflict, owner, and remediation", "Operations", "Data issues have path"]],
    viDeliverables: [["Data mapping matrix", "Source, target, meaning, transform, default, null rule và owner", "BA và data owner", "Mọi field có mapping decision"], ["Transformation rule catalog", "Rule, example, source, exception và validation", "Data engineer", "Rule implementable"], ["Data quality test set", "Sample record, expected output và failure condition", "QA", "Mapping testable"], ["Exception handling plan", "Bad data, missing data, conflict, owner và remediation", "Operations", "Data issue có path"]],
    enRisks: [["Name-based mapping", "Similar field labels may mean different things", "Map by business definition"], ["Null ambiguity", "Blank value may mean unknown, not applicable, or missing", "Define null semantics"], ["Source conflict", "Systems may disagree", "Define source precedence"], ["No data tests", "Integration may pass with clean samples only", "Use realistic bad-data cases"]],
    viRisks: [["Name-based mapping", "Field label giống nhau nhưng meaning khác", "Map theo business definition"], ["Null ambiguity", "Blank value có thể là unknown, not applicable hoặc missing", "Define null semantics"], ["Source conflict", "System có thể disagree", "Define source precedence"], ["No data tests", "Integration chỉ pass với sample sạch", "Dùng realistic bad-data case"]],
    enMetric: "Integration mapping is driven by business semantics and validated with realistic data cases.",
    viMetric: "Integration mapping dựa trên business semantics và validate bằng realistic data case."
  },
  {
    slug: "entity-lifecycle-state-machine",
    group: "Data and Integration",
    domain: "Entity lifecycle",
    enTitle: "Entity Lifecycle and State Machine",
    viTitle: "Entity lifecycle và state machine",
    enProject: "A subscription entity moves through trial, active, suspended, cancelled, expired, and reactivated states. Teams disagree about allowed transitions and what events trigger each change.",
    viProject: "Subscription entity đi qua state trial, active, suspended, cancelled, expired và reactivated. Các team chưa thống nhất allowed transition và event nào trigger từng change.",
    enChallenge: "The BA must specify lifecycle states and transitions so UI, backend, API, reporting, billing, and support share the same model.",
    viChallenge: "BA phải specify lifecycle state và transition để UI, backend, API, reporting, billing và support dùng cùng một model.",
    enAiUse: ["Generate state machine from process notes.", "Identify missing transitions, invalid transitions, and terminal states.", "Draft transition rules and event triggers.", "Create test scenarios by state and transition."],
    viAiUse: ["Generate state machine từ process notes.", "Identify missing transition, invalid transition và terminal state.", "Draft transition rule và event trigger.", "Tạo test scenario theo state và transition."],
    enInputs: ["Lifecycle notes", "Billing rules", "Support scripts", "API events", "Reporting definitions"],
    viInputs: ["Lifecycle notes", "Billing rules", "Support scripts", "API events", "Reporting definitions"],
    enWorkflow: ["List all known states and synonyms used by teams.", "Ask AI to propose state machine and transition gaps.", "Define allowed transition, trigger, actor, validation, audit, and side effects.", "Review downstream impact on UI, billing, reporting, and notifications.", "Write acceptance criteria for valid and invalid transitions.", "Publish lifecycle model and update glossary."],
    viWorkflow: ["List mọi known state và synonym team đang dùng.", "Yêu cầu AI propose state machine và transition gap.", "Define allowed transition, trigger, actor, validation, audit và side effect.", "Review downstream impact lên UI, billing, reporting và notification.", "Viết acceptance criteria cho valid và invalid transition.", "Publish lifecycle model và update glossary."],
    enDeliverables: [["State model", "State, definition, entry rule, exit rule, and terminal status", "BA", "States have shared meaning"], ["Transition table", "From, to, trigger, actor, validation, side effect, and audit", "Backend and BA", "Transitions are enforceable"], ["Impact map", "State impact on UI, API, billing, reporting, and support", "Product owner", "Downstream behavior is aligned"], ["Transition test set", "Valid transition, invalid transition, and edge case", "QA", "State machine is testable"]],
    viDeliverables: [["State model", "State, definition, entry rule, exit rule và terminal status", "BA", "State có shared meaning"], ["Transition table", "From, to, trigger, actor, validation, side effect và audit", "Backend và BA", "Transition enforceable"], ["Impact map", "State impact lên UI, API, billing, reporting và support", "Product owner", "Downstream behavior aligned"], ["Transition test set", "Valid transition, invalid transition và edge case", "QA", "State machine testable"]],
    enRisks: [["State synonym confusion", "Different teams may use different names for same state", "Create glossary and state definitions"], ["Invalid transition", "System may allow impossible lifecycle moves", "Define and test invalid transitions"], ["Side-effect gap", "Notifications or billing may not update", "Map downstream impact"], ["Reporting mismatch", "Reports may count states differently", "Align reporting definitions to state model"]],
    viRisks: [["State synonym confusion", "Team khác dùng tên khác cho cùng state", "Tạo glossary và state definition"], ["Invalid transition", "System có thể allow lifecycle move impossible", "Define và test invalid transition"], ["Side-effect gap", "Notification hoặc billing không update", "Map downstream impact"], ["Reporting mismatch", "Report count state khác nhau", "Align reporting definition với state model"]],
    enMetric: "Lifecycle behavior is shared across UI, backend, APIs, reporting, and operations.",
    viMetric: "Lifecycle behavior shared giữa UI, backend, API, reporting và operations."
  },
  {
    slug: "database-field-business-rule-alignment",
    group: "Data and Integration",
    domain: "Data model alignment",
    enTitle: "Database Field and Business Rule Alignment",
    viTitle: "Align database field và business rule",
    enProject: "A team adds new database fields for customer risk review. Business owners know the concepts, but database fields are being named and modeled before rules are fully understood.",
    viProject: "Team thêm database field mới cho customer risk review. Business owner hiểu concept, nhưng database field đang được đặt tên và model trước khi rule được hiểu đầy đủ.",
    enChallenge: "The BA must ensure data model fields represent business concepts accurately, including source, lifecycle, ownership, sensitivity, allowed values, and update rules.",
    viChallenge: "BA phải đảm bảo data model field represent đúng business concept, gồm source, lifecycle, ownership, sensitivity, allowed value và update rule.",
    enAiUse: ["Translate proposed database fields into business definitions.", "Identify fields missing ownership, sensitivity, or update rules.", "Generate questions for data model review.", "Draft acceptance criteria for create, update, and audit behavior."],
    viAiUse: ["Translate proposed database field thành business definition.", "Identify field missing ownership, sensitivity hoặc update rule.", "Generate question cho data model review.", "Draft acceptance criteria cho create, update và audit behavior."],
    enInputs: ["Data model draft", "Business glossary", "Risk policy", "Update workflows", "Audit and privacy rules"],
    viInputs: ["Data model draft", "Business glossary", "Risk policy", "Update workflows", "Audit và privacy rules"],
    enWorkflow: ["List proposed fields and business purpose.", "Ask AI to identify unclear definitions and rule gaps.", "Define source of truth, allowed values, update rule, sensitivity, and retention.", "Review with data modeler, backend, compliance, and business owner.", "Map field behavior to UI, API, reporting, and audit.", "Create test examples and migration questions."],
    viWorkflow: ["List proposed field và business purpose.", "Yêu cầu AI identify definition unclear và rule gap.", "Define source of truth, allowed value, update rule, sensitivity và retention.", "Review với data modeler, backend, compliance và business owner.", "Map field behavior tới UI, API, reporting và audit.", "Tạo test example và migration question."],
    enDeliverables: [["Field definition catalog", "Field, business meaning, source, owner, allowed value, and sensitivity", "BA and data owner", "Fields have business meaning"], ["Update rule matrix", "Field, who can change, when, validation, audit, and workflow", "Backend", "Update behavior is clear"], ["Downstream impact map", "UI, API, report, integration, and audit use of field", "BA", "Field usage is visible"], ["Data migration questions", "Existing values, defaults, cleanup, and validation", "Data team", "Migration risks are known"]],
    viDeliverables: [["Field definition catalog", "Field, business meaning, source, owner, allowed value và sensitivity", "BA và data owner", "Field có business meaning"], ["Update rule matrix", "Field, ai được change, khi nào, validation, audit và workflow", "Backend", "Update behavior rõ"], ["Downstream impact map", "UI, API, report, integration và audit use of field", "BA", "Field usage visible"], ["Data migration questions", "Existing value, default, cleanup và validation", "Data team", "Migration risk known"]],
    enRisks: [["Technical naming drift", "Field names may not match business concept", "Define business meaning and examples"], ["Source-of-truth conflict", "Multiple systems may update same field", "Define owner and update rule"], ["Sensitivity miss", "Risk fields may expose sensitive information", "Classify sensitivity and access"], ["Migration surprise", "Existing records may not fit new model", "Plan defaults and cleanup"]],
    viRisks: [["Technical naming drift", "Field name không match business concept", "Define business meaning và example"], ["Source-of-truth conflict", "Nhiều system update cùng field", "Define owner và update rule"], ["Sensitivity miss", "Risk field có thể expose sensitive info", "Classify sensitivity và access"], ["Migration surprise", "Existing record có thể không fit model mới", "Plan default và cleanup"]],
    enMetric: "Database fields are tied to business rules before implementation and migration decisions are visible.",
    viMetric: "Database field gắn với business rule trước implementation và migration decision visible."
  },
  {
    slug: "reporting-dashboard-metric-definition",
    group: "Data and Integration",
    domain: "Reporting",
    enTitle: "Reporting and Dashboard Metric Definition",
    viTitle: "Định nghĩa metric cho reporting và dashboard",
    enProject: "Leadership wants a dashboard for onboarding cycle time, conversion, support contact rate, and document rejection reasons. Teams disagree on metric definitions and data sources.",
    viProject: "Leadership muốn dashboard cho onboarding cycle time, conversion, support contact rate và document rejection reason. Các team chưa thống nhất metric definition và data source.",
    enChallenge: "The BA must define metrics so dashboards do not create false decisions. Each metric needs definition, denominator, numerator, filters, data source, freshness, owner, and known limitations.",
    viChallenge: "BA phải define metric để dashboard không tạo false decision. Mỗi metric cần definition, denominator, numerator, filter, data source, freshness, owner và known limitation.",
    enAiUse: ["Draft metric definition table from business questions.", "Identify ambiguous numerator, denominator, and filter logic.", "Generate dashboard acceptance criteria and data quality checks.", "Create stakeholder questions for metric ownership."],
    viAiUse: ["Draft metric definition table từ business question.", "Identify numerator, denominator và filter logic ambiguous.", "Generate dashboard acceptance criteria và data quality check.", "Tạo stakeholder question cho metric ownership."],
    enInputs: ["Business questions", "Data source list", "Event taxonomy", "Current reports", "Stakeholder decisions"],
    viInputs: ["Business questions", "Data source list", "Event taxonomy", "Current reports", "Stakeholder decisions"],
    enWorkflow: ["Start with decisions the dashboard should support.", "Ask AI to draft metric definitions and ambiguity questions.", "Define numerator, denominator, filters, grain, freshness, and owner.", "Validate data source availability and quality with data team.", "Create acceptance criteria for calculation and display behavior.", "Add caveats and known limitations to dashboard requirements."],
    viWorkflow: ["Bắt đầu từ decision dashboard cần support.", "Yêu cầu AI draft metric definition và ambiguity question.", "Define numerator, denominator, filter, grain, freshness và owner.", "Validate data source availability và quality với data team.", "Tạo acceptance criteria cho calculation và display behavior.", "Thêm caveat và known limitation vào dashboard requirement."],
    enDeliverables: [["Metric definition catalog", "Metric, purpose, numerator, denominator, filter, grain, source, and owner", "BA and data owner", "Metrics are unambiguous"], ["Dashboard requirement spec", "Visualization, interaction, filter, export, and access behavior", "BA and product", "Dashboard behavior is testable"], ["Data quality checklist", "Completeness, freshness, reconciliation, and known limitation", "Data team", "Quality risk is visible"], ["Decision-use map", "Metric to decision, stakeholder, and action threshold", "Product owner", "Dashboard supports decisions"]],
    viDeliverables: [["Metric definition catalog", "Metric, purpose, numerator, denominator, filter, grain, source và owner", "BA và data owner", "Metric unambiguous"], ["Dashboard requirement spec", "Visualization, interaction, filter, export và access behavior", "BA và product", "Dashboard behavior testable"], ["Data quality checklist", "Completeness, freshness, reconciliation và known limitation", "Data team", "Quality risk visible"], ["Decision-use map", "Metric tới decision, stakeholder và action threshold", "Product owner", "Dashboard support decision"]],
    enRisks: [["Metric ambiguity", "Different teams may calculate same metric differently", "Define numerator, denominator, filters, and grain"], ["False precision", "Dashboard may look accurate with poor data quality", "Show caveats and quality checks"], ["Decision disconnect", "Metric may not support any action", "Map metric to decision"], ["Stale data", "Leaders may act on outdated values", "Define freshness and update time"]],
    viRisks: [["Metric ambiguity", "Team khác nhau calculate cùng metric khác nhau", "Define numerator, denominator, filter và grain"], ["False precision", "Dashboard nhìn accurate dù data quality kém", "Show caveat và quality check"], ["Decision disconnect", "Metric không support action nào", "Map metric tới decision"], ["Stale data", "Leader action trên data cũ", "Define freshness và update time"]],
    enMetric: "Dashboard metrics become decision-ready because definitions, sources, and limitations are explicit.",
    viMetric: "Dashboard metric trở nên decision-ready vì definition, source và limitation explicit."
  },
  {
    slug: "search-filter-sort-requirements",
    group: "Data and Integration",
    domain: "Search experience",
    enTitle: "Search, Filter, and Sort Requirements",
    viTitle: "Requirement search, filter và sort",
    enProject: "Users need to find cases across thousands of records using keyword search, filters, saved views, and sorting. Current requirements say searchable and filterable without defining behavior.",
    viProject: "User cần tìm case trong hàng nghìn record bằng keyword search, filter, saved view và sorting. Requirement hiện chỉ nói searchable và filterable mà chưa define behavior.",
    enChallenge: "The BA must specify search semantics, filter combinations, sorting rules, saved views, empty states, performance expectations, and data fields included in search.",
    viChallenge: "BA phải specify search semantics, filter combination, sorting rule, saved view, empty state, performance expectation và data field included trong search.",
    enAiUse: ["Generate search behavior questions from user tasks.", "Draft filter and sort rule matrix.", "Identify ambiguity in contains, exact match, date range, and status filters.", "Create search acceptance criteria and edge cases."],
    viAiUse: ["Generate search behavior question từ user task.", "Draft filter và sort rule matrix.", "Identify ambiguity trong contains, exact match, date range và status filter.", "Tạo search acceptance criteria và edge case."],
    enInputs: ["Record field list", "User tasks", "Current search examples", "Data volume", "Performance requirements"],
    viInputs: ["Record field list", "User tasks", "Current search examples", "Data volume", "Performance requirements"],
    enWorkflow: ["List user search tasks and fields users expect to search.", "Ask AI to identify search/filter/sort ambiguities.", "Define searchable fields, match logic, filter combinations, sort order, and saved view behavior.", "Review backend search feasibility and performance constraints.", "Write acceptance criteria for no results, partial matches, invalid filters, and permissions.", "Create QA data set with edge cases."],
    viWorkflow: ["List user search task và field user expect search được.", "Yêu cầu AI identify ambiguity search/filter/sort.", "Define searchable field, match logic, filter combination, sort order và saved view behavior.", "Review backend search feasibility và performance constraint.", "Viết acceptance criteria cho no results, partial matches, invalid filters và permissions.", "Tạo QA data set có edge case."],
    enDeliverables: [["Search behavior spec", "Field, match type, ranking, permission, and result display", "BA", "Search semantics are clear"], ["Filter/sort matrix", "Filter, operator, combination rule, default, and edge case", "BA and backend", "Filter logic is implementable"], ["Saved view requirement", "Create, edit, share, default, permission, and deletion behavior", "Product owner", "Saved views have lifecycle"], ["Search QA data set", "Records, expected matches, no-match cases, and permission cases", "QA", "Search can be verified"]],
    viDeliverables: [["Search behavior spec", "Field, match type, ranking, permission và result display", "BA", "Search semantics rõ"], ["Filter/sort matrix", "Filter, operator, combination rule, default và edge case", "BA và backend", "Filter logic implementable"], ["Saved view requirement", "Create, edit, share, default, permission và deletion behavior", "Product owner", "Saved view có lifecycle"], ["Search QA data set", "Record, expected match, no-match case và permission case", "QA", "Search verify được"]],
    enRisks: [["Search ambiguity", "Users and developers may expect different match logic", "Define match behavior and searchable fields"], ["Filter conflict", "Combined filters may behave unexpectedly", "Specify AND/OR and default rules"], ["Permission leakage", "Search may expose records user cannot see", "Include permission filtering"], ["Performance gap", "Search may be correct but too slow", "Add performance expectations"]],
    viRisks: [["Search ambiguity", "User và developer expect match logic khác nhau", "Define match behavior và searchable field"], ["Filter conflict", "Combined filter behave unexpected", "Specify AND/OR và default rule"], ["Permission leakage", "Search expose record user không được thấy", "Include permission filtering"], ["Performance gap", "Search đúng nhưng quá chậm", "Thêm performance expectation"]],
    enMetric: "Search and filtering behavior is precise enough to implement, test, and explain to users.",
    viMetric: "Search và filtering behavior đủ precise để implement, test và explain cho user."
  },
  {
    slug: "notification-trigger-template-rules",
    group: "Data and Integration",
    domain: "Notifications",
    enTitle: "Notification Trigger and Template Rules",
    viTitle: "Rule trigger và template notification",
    enProject: "A workflow sends email, SMS, and in-app notifications for approvals, missing documents, status changes, and SLA breaches. Stakeholders disagree about timing and message content.",
    viProject: "Workflow gửi email, SMS và in-app notification cho approval, missing document, status change và SLA breach. Stakeholder chưa thống nhất timing và message content.",
    enChallenge: "The BA must define notification rules that connect event triggers, recipients, channels, templates, personalization, suppression, retries, and audit evidence.",
    viChallenge: "BA phải define notification rule connect event trigger, recipient, channel, template, personalization, suppression, retry và audit evidence.",
    enAiUse: ["Generate notification trigger matrix from workflow states.", "Draft template variants and personalization fields.", "Identify duplicate, suppression, and escalation scenarios.", "Create acceptance criteria for channel and retry behavior."],
    viAiUse: ["Generate notification trigger matrix từ workflow state.", "Draft template variant và personalization field.", "Identify duplicate, suppression và escalation scenario.", "Tạo acceptance criteria cho channel và retry behavior."],
    enInputs: ["Workflow states", "Recipient roles", "Communication policy", "Template drafts", "Channel capabilities"],
    viInputs: ["Workflow states", "Recipient roles", "Communication policy", "Template drafts", "Channel capabilities"],
    enWorkflow: ["Map workflow events and recipient needs.", "Ask AI to draft trigger-channel-recipient matrix.", "Define template content, variables, localization, and legal copy constraints.", "Specify suppression, duplicate prevention, retry, and escalation behavior.", "Review with product, support, legal, and operations.", "Add QA cases for event timing, channel failure, and personalization."],
    viWorkflow: ["Map workflow event và recipient need.", "Yêu cầu AI draft trigger-channel-recipient matrix.", "Define template content, variable, localization và legal copy constraint.", "Specify suppression, duplicate prevention, retry và escalation behavior.", "Review với product, support, legal và operations.", "Thêm QA case cho event timing, channel failure và personalization."],
    enDeliverables: [["Notification rule matrix", "Trigger, recipient, channel, timing, suppression, and owner", "BA", "Every event has rule"], ["Template catalog", "Template, variable, copy, localization, and approval status", "UX/legal", "Messages are approved"], ["Retry and fallback rules", "Channel failure, retry count, fallback channel, and alert", "Operations", "Failures have path"], ["Notification QA scenarios", "Trigger, duplicate, suppression, retry, and personalization cases", "QA", "Notifications are testable"]],
    viDeliverables: [["Notification rule matrix", "Trigger, recipient, channel, timing, suppression và owner", "BA", "Mọi event có rule"], ["Template catalog", "Template, variable, copy, localization và approval status", "UX/legal", "Message approved"], ["Retry and fallback rules", "Channel failure, retry count, fallback channel và alert", "Operations", "Failure có path"], ["Notification QA scenarios", "Trigger, duplicate, suppression, retry và personalization case", "QA", "Notification testable"]],
    enRisks: [["Notification spam", "Users may receive duplicates or too many messages", "Define suppression and duplicate prevention"], ["Wrong recipient", "Sensitive information may go to the wrong role", "Map recipients and permissions"], ["Template drift", "Copy may become inconsistent across channels", "Maintain template catalog"], ["Channel failure", "Important messages may not send", "Define retry and fallback channel"]],
    viRisks: [["Notification spam", "User nhận duplicate hoặc quá nhiều message", "Define suppression và duplicate prevention"], ["Wrong recipient", "Sensitive info gửi sai role", "Map recipient và permission"], ["Template drift", "Copy inconsistent giữa channel", "Maintain template catalog"], ["Channel failure", "Important message không gửi được", "Define retry và fallback channel"]],
    enMetric: "Notifications are triggered, worded, routed, and monitored according to clear business rules.",
    viMetric: "Notification được trigger, wording, route và monitor theo business rule rõ."
  },
  {
    slug: "file-upload-download-behavior",
    group: "Data and Integration",
    domain: "Files and documents",
    enTitle: "File Upload and Download Behavior",
    viTitle: "Behavior upload và download file",
    enProject: "A document portal lets customers upload contracts, certificates, and evidence files. Users need progress, validation, virus scanning, preview, download permissions, and failure recovery.",
    viProject: "Document portal cho customer upload contract, certificate và evidence file. User cần progress, validation, virus scanning, preview, download permission và failure recovery.",
    enChallenge: "The BA must specify file behavior across UI, backend, storage, security, and operations. File handling includes size, type, scan, retention, access, preview, versioning, and error recovery.",
    viChallenge: "BA phải specify file behavior qua UI, backend, storage, security và operations. File handling gồm size, type, scan, retention, access, preview, versioning và error recovery.",
    enAiUse: ["Generate file handling requirement checklist.", "Identify validation, scanning, storage, and permission gaps.", "Draft upload/download state matrix.", "Create QA scenarios for large files, bad files, and permission cases."],
    viAiUse: ["Generate file handling requirement checklist.", "Identify validation, scanning, storage và permission gap.", "Draft upload/download state matrix.", "Tạo QA scenario cho large file, bad file và permission case."],
    enInputs: ["Document type list", "Storage policy", "Security scanning rules", "UI design", "Access control requirements"],
    viInputs: ["Document type list", "Storage policy", "Security scanning rules", "UI design", "Access control requirements"],
    enWorkflow: ["List document types, allowed formats, size limits, and required metadata.", "Ask AI to generate upload/download state and error scenarios.", "Define validation, scan, quarantine, preview, versioning, and retention behavior.", "Review access rules for upload, view, download, replace, and delete.", "Write acceptance criteria for progress, failure, retry, and permission states.", "Create support and operational requirements for infected or failed files."],
    viWorkflow: ["List document type, allowed format, size limit và required metadata.", "Yêu cầu AI generate upload/download state và error scenario.", "Define validation, scan, quarantine, preview, versioning và retention behavior.", "Review access rule cho upload, view, download, replace và delete.", "Viết acceptance criteria cho progress, failure, retry và permission state.", "Tạo support và operational requirement cho infected hoặc failed file."],
    enDeliverables: [["File behavior matrix", "Action, state, validation, scan, permission, message, and owner", "BA", "File states are explicit"], ["Document type rule table", "Type, allowed formats, size, metadata, retention, and source", "Compliance", "Rules are source-backed"], ["Access control matrix", "Role, upload, view, download, replace, delete, and audit", "Security", "File permissions are testable"], ["File QA scenario set", "Large, invalid, infected, retry, permission, preview, and download cases", "QA", "File behavior is covered"]],
    viDeliverables: [["File behavior matrix", "Action, state, validation, scan, permission, message và owner", "BA", "File state explicit"], ["Document type rule table", "Type, allowed format, size, metadata, retention và source", "Compliance", "Rule source-backed"], ["Access control matrix", "Role, upload, view, download, replace, delete và audit", "Security", "File permission testable"], ["File QA scenario set", "Large, invalid, infected, retry, permission, preview và download case", "QA", "File behavior covered"]],
    enRisks: [["Unsafe file", "Malicious files may be stored or downloaded", "Specify scanning and quarantine"], ["Permission leakage", "Users may download files they should not see", "Define role-based access and audit"], ["Upload frustration", "Users may lose progress without recovery", "Specify progress, retry, and error messages"], ["Retention miss", "Files may be kept too long or deleted too early", "Define retention by document type"]],
    viRisks: [["Unsafe file", "Malicious file có thể được store hoặc download", "Specify scanning và quarantine"], ["Permission leakage", "User download file không được thấy", "Define role-based access và audit"], ["Upload frustration", "User mất progress mà không recover được", "Specify progress, retry và error message"], ["Retention miss", "File giữ quá lâu hoặc delete quá sớm", "Define retention theo document type"]],
    enMetric: "File handling is safe, recoverable, permission-aware, and testable across UI and backend.",
    viMetric: "File handling an toàn, recoverable, permission-aware và testable qua UI/backend."
  },
  {
    slug: "external-system-integration-mapping",
    group: "Data and Integration",
    domain: "External integrations",
    enTitle: "External System Integration Mapping",
    viTitle: "Mapping integration với external system",
    enProject: "A platform integrates with a tax provider, CRM, payment gateway, and document verification service. Each system has its own data model, SLA, authentication, and error behavior.",
    viProject: "Platform integrate với tax provider, CRM, payment gateway và document verification service. Mỗi system có data model, SLA, authentication và error behavior riêng.",
    enChallenge: "The BA must map integration behavior end to end so teams know what data moves, why it moves, when it moves, what can fail, and who owns each failure.",
    viChallenge: "BA phải map integration behavior end to end để team biết data nào move, vì sao move, khi nào move, fail gì có thể xảy ra và ai own từng failure.",
    enAiUse: ["Generate integration context diagrams and dependency questions.", "Identify data mapping, auth, SLA, and failure behavior gaps.", "Draft integration scenario matrix.", "Create operational support and escalation requirements."],
    viAiUse: ["Generate integration context diagram và dependency question.", "Identify data mapping, auth, SLA và failure behavior gap.", "Draft integration scenario matrix.", "Tạo operational support và escalation requirement."],
    enInputs: ["System context diagram", "Provider docs", "Data mapping drafts", "SLA commitments", "Support process"],
    viInputs: ["System context diagram", "Provider docs", "Data mapping drafts", "SLA commitments", "Support process"],
    enWorkflow: ["Create system context map and integration inventory.", "Ask AI to generate questions for data, auth, SLA, errors, retries, and support.", "Define integration scenarios for success, failure, timeout, duplicate, and provider outage.", "Map ownership across internal and external teams.", "Review data privacy and contractual obligations.", "Publish integration requirements and operational escalation paths."],
    viWorkflow: ["Tạo system context map và integration inventory.", "Yêu cầu AI generate question cho data, auth, SLA, error, retry và support.", "Define integration scenario cho success, failure, timeout, duplicate và provider outage.", "Map ownership giữa internal và external team.", "Review data privacy và contractual obligation.", "Publish integration requirement và operational escalation path."],
    enDeliverables: [["Integration inventory", "System, purpose, data, auth, SLA, owner, and dependency", "BA and architect", "All integrations are visible"], ["Scenario matrix", "Success, failure, timeout, duplicate, retry, and provider outage behavior", "BA", "Failure behavior is defined"], ["Data exchange map", "Source, target, transform, frequency, and privacy classification", "Data owner", "Data movement is controlled"], ["Escalation playbook", "Issue, owner, provider contact, SLA, and support communication", "Operations", "Support can escalate"]],
    viDeliverables: [["Integration inventory", "System, purpose, data, auth, SLA, owner và dependency", "BA và architect", "Mọi integration visible"], ["Scenario matrix", "Success, failure, timeout, duplicate, retry và provider outage behavior", "BA", "Failure behavior defined"], ["Data exchange map", "Source, target, transform, frequency và privacy classification", "Data owner", "Data movement controlled"], ["Escalation playbook", "Issue, owner, provider contact, SLA và support communication", "Operations", "Support escalate được"]],
    enRisks: [["Dependency opacity", "Teams may not understand external failure impact", "Map dependencies and owners"], ["Provider behavior mismatch", "Provider errors may not match internal expectations", "Review provider docs and scenarios"], ["Data privacy issue", "External systems receive sensitive data", "Classify data and review contract"], ["Escalation delay", "Incidents stall without owner", "Define escalation playbook"]],
    viRisks: [["Dependency opacity", "Team không hiểu impact khi external fail", "Map dependency và owner"], ["Provider behavior mismatch", "Provider error không match expectation nội bộ", "Review provider doc và scenario"], ["Data privacy issue", "External system nhận sensitive data", "Classify data và review contract"], ["Escalation delay", "Incident stall vì không có owner", "Define escalation playbook"]],
    enMetric: "External integrations have clear data, failure, ownership, and escalation behavior.",
    viMetric: "External integration có data, failure, ownership và escalation behavior rõ."
  },
  {
    slug: "ba-developer-refinement-ai",
    group: "Cross-functional BA Collaboration",
    domain: "BA and developers",
    enTitle: "BA-Developer Refinement With AI",
    viTitle: "Refinement BA-developer với AI",
    enProject: "A squad prepares backlog refinement for a feature touching UI, API, validation, and permissions. Developers need clearer behavior and BA wants to find gaps before the meeting.",
    viProject: "Squad chuẩn bị backlog refinement cho feature chạm UI, API, validation và permission. Developer cần behavior rõ hơn và BA muốn tìm gap trước meeting.",
    enChallenge: "The BA must use AI to prepare better refinement, not to replace developer judgment. The output should surface assumptions, technical questions, API dependencies, edge cases, and decisions needed.",
    viChallenge: "BA phải dùng AI để chuẩn bị refinement tốt hơn, không thay thế developer judgment. Output cần làm lộ assumption, technical question, API dependency, edge case và decision needed.",
    enAiUse: ["Critique stories from developer, API, data, and integration perspectives.", "Generate refinement questions and missing behavior list.", "Draft acceptance criteria and technical dependency notes.", "Create meeting agenda focused on decisions."],
    viAiUse: ["Critique story theo perspective developer, API, data và integration.", "Generate refinement question và missing behavior list.", "Draft acceptance criteria và technical dependency note.", "Tạo meeting agenda tập trung decision."],
    enInputs: ["User stories", "Design notes", "API notes", "Current architecture constraints", "Open decisions"],
    viInputs: ["User stories", "Design notes", "API notes", "Current architecture constraints", "Open decisions"],
    enWorkflow: ["Package story context, design, known rules, and constraints.", "Ask AI to review from frontend, backend, QA, and operations lenses.", "Convert findings into refinement questions with owners.", "Separate business decisions from technical design questions.", "Update stories and acceptance criteria before the meeting.", "Use the meeting to close decisions and confirm dependencies."],
    viWorkflow: ["Package story context, design, known rule và constraint.", "Yêu cầu AI review từ lens frontend, backend, QA và operations.", "Chuyển finding thành refinement question có owner.", "Tách business decision khỏi technical design question.", "Update story và acceptance criteria trước meeting.", "Dùng meeting để close decision và confirm dependency."],
    enDeliverables: [["Refinement prep pack", "Story context, assumptions, gaps, questions, and dependency notes", "BA", "Meeting starts with decisions"], ["Technical question log", "Question, category, owner, impact, and resolution", "BA and tech lead", "Questions are tracked"], ["Updated acceptance criteria", "Behavior, edge case, API dependency, and test signal", "BA", "Stories are development-ready"], ["Decision summary", "Decision, rationale, owner, and impact on backlog", "Product owner", "Refinement outcomes are captured"]],
    viDeliverables: [["Refinement prep pack", "Story context, assumption, gap, question và dependency note", "BA", "Meeting bắt đầu bằng decision"], ["Technical question log", "Question, category, owner, impact và resolution", "BA và tech lead", "Question được track"], ["Updated acceptance criteria", "Behavior, edge case, API dependency và test signal", "BA", "Story development-ready"], ["Decision summary", "Decision, rationale, owner và impact backlog", "Product owner", "Outcome refinement captured"]],
    enRisks: [["AI oversteps technical design", "AI may suggest architecture without context", "Use AI to ask questions, not decide architecture"], ["Meeting overload", "Too many generated questions waste time", "Prioritize by risk and dependency"], ["Business/technical confusion", "Teams may mix decision types", "Separate business decisions and design questions"], ["Untracked decisions", "Refinement conclusions may disappear", "Capture decision summary"]],
    viRisks: [["AI oversteps technical design", "AI suggest architecture thiếu context", "Dùng AI để hỏi question, không quyết architecture"], ["Meeting overload", "Quá nhiều generated question làm waste time", "Prioritize theo risk và dependency"], ["Business/technical confusion", "Team trộn decision type", "Tách business decision và design question"], ["Untracked decisions", "Conclusion refinement biến mất", "Capture decision summary"]],
    enMetric: "Refinement meetings spend more time deciding and less time discovering missing requirement basics.",
    viMetric: "Refinement meeting dành nhiều thời gian decision hơn và ít thời gian phát hiện thiếu requirement cơ bản."
  },
  {
    slug: "ba-qa-test-handoff-ai",
    group: "Cross-functional BA Collaboration",
    domain: "BA and QA",
    enTitle: "BA-QA Test Handoff With AI",
    viTitle: "Handoff test BA-QA với AI",
    enProject: "QA receives stories late and must create tests for UI states, API errors, permissions, and integration failures. BA wants to improve handoff quality before test design starts.",
    viProject: "QA nhận story muộn và phải tạo test cho UI state, API error, permission và integration failure. BA muốn cải thiện handoff quality trước khi test design bắt đầu.",
    enChallenge: "The BA must provide QA with traceable behavior, not just story text. AI can generate test ideas, but the BA and QA must validate source support, risk, and expected results.",
    viChallenge: "BA phải cung cấp cho QA behavior traceable, không chỉ story text. AI có thể generate test idea, nhưng BA và QA phải validate source support, risk và expected result.",
    enAiUse: ["Generate test scenarios from acceptance criteria and use case flow.", "Identify missing negative, boundary, permission, and API failure cases.", "Draft test data needs and expected results.", "Create QA handoff checklist and risk priority."],
    viAiUse: ["Generate test scenario từ acceptance criteria và use case flow.", "Identify missing negative, boundary, permission và API failure case.", "Draft test data need và expected result.", "Tạo QA handoff checklist và risk priority."],
    enInputs: ["User stories", "Acceptance criteria", "Process flow", "API contract", "Permission matrix"],
    viInputs: ["User stories", "Acceptance criteria", "Process flow", "API contract", "Permission matrix"],
    enWorkflow: ["Ask AI to derive scenarios from each acceptance criterion.", "Classify scenarios by positive, negative, boundary, permission, error, and integration type.", "Review unsupported scenarios with QA and remove invented rules.", "Add expected result, source, priority, and test data need.", "Create handoff notes for automation and manual testing.", "Update stories if test generation reveals requirement gaps."],
    viWorkflow: ["Yêu cầu AI derive scenario từ từng acceptance criterion.", "Classify scenario theo positive, negative, boundary, permission, error và integration type.", "Review unsupported scenario với QA và remove invented rule.", "Thêm expected result, source, priority và test data need.", "Tạo handoff note cho automation và manual testing.", "Update story nếu test generation làm lộ requirement gap."],
    enDeliverables: [["QA handoff matrix", "Requirement, scenario, type, priority, source, and expected result", "BA and QA", "QA can design tests"], ["Test data requirements", "Data state, role, API condition, and setup owner", "QA", "Test data is ready"], ["Gap list", "Missing rule, missing criteria, unclear expected result, and owner", "BA", "Requirement gaps are resolved"], ["Automation candidate list", "Stable scenarios, data needs, and automation value", "QA lead", "Automation scope is clear"]],
    viDeliverables: [["QA handoff matrix", "Requirement, scenario, type, priority, source và expected result", "BA và QA", "QA design được test"], ["Test data requirements", "Data state, role, API condition và setup owner", "QA", "Test data ready"], ["Gap list", "Missing rule, missing criteria, unclear expected result và owner", "BA", "Requirement gap resolved"], ["Automation candidate list", "Stable scenario, data need và automation value", "QA lead", "Automation scope rõ"]],
    enRisks: [["Invented test expectation", "AI may create expected behavior not approved", "Tie scenarios to source and criteria"], ["Test overload", "Too many scenarios reduce focus", "Prioritize by risk and business impact"], ["Missing data", "QA cannot execute without data setup", "Define test data early"], ["Late gap discovery", "Requirement gaps found during testing are costly", "Use AI scenario generation before sprint commitment"]],
    viRisks: [["Invented test expectation", "AI tạo expected behavior chưa approve", "Tie scenario với source và criteria"], ["Test overload", "Quá nhiều scenario giảm focus", "Prioritize theo risk và business impact"], ["Missing data", "QA không execute được nếu thiếu data setup", "Define test data sớm"], ["Late gap discovery", "Requirement gap phát hiện lúc testing rất costly", "Dùng AI scenario generation trước sprint commitment"]],
    enMetric: "QA receives source-backed, prioritized scenarios with expected results and test data needs.",
    viMetric: "QA nhận scenario source-backed, prioritized, có expected result và test data need."
  },
  {
    slug: "ba-ux-critique-loop",
    group: "Cross-functional BA Collaboration",
    domain: "BA and UX",
    enTitle: "BA-UX Critique Loop",
    viTitle: "Vòng critique BA-UX",
    enProject: "UX proposes a new onboarding flow. The flow is elegant, but BA sees possible policy gaps, missing error paths, unclear data fields, and operational exceptions.",
    viProject: "UX propose onboarding flow mới. Flow đẹp, nhưng BA thấy có thể có policy gap, missing error path, data field chưa rõ và operational exception.",
    enChallenge: "The BA must critique designs constructively without turning UX review into requirement policing. AI can help generate critique lenses and questions, but the BA must ground feedback in evidence and user outcomes.",
    viChallenge: "BA phải critique design một cách xây dựng, không biến UX review thành policing requirement. AI có thể giúp generate critique lens và question, nhưng BA phải ground feedback bằng evidence và user outcome.",
    enAiUse: ["Generate critique lenses for rule, data, exception, accessibility, analytics, and operations.", "Draft questions that preserve UX intent while exposing gaps.", "Identify where design implies unapproved business rules.", "Create decision log entries from design review."],
    viAiUse: ["Generate critique lens cho rule, data, exception, accessibility, analytics và operations.", "Draft question giữ UX intent nhưng làm lộ gap.", "Identify nơi design imply business rule chưa approve.", "Tạo decision log entry từ design review."],
    enInputs: ["Design flow", "User research", "Business rules", "Operations constraints", "Accessibility expectations"],
    viInputs: ["Design flow", "User research", "Business rules", "Operations constraints", "Accessibility expectations"],
    enWorkflow: ["Package design goal, user problem, rules, and constraints.", "Ask AI to critique the design using BA lenses.", "Convert critique into questions, not directives.", "Review with UX to separate design choice, business rule, and technical constraint.", "Capture decisions and open gaps.", "Update requirements and design annotations together."],
    viWorkflow: ["Package design goal, user problem, rule và constraint.", "Yêu cầu AI critique design bằng BA lens.", "Chuyển critique thành question, không thành directive.", "Review với UX để tách design choice, business rule và technical constraint.", "Capture decision và open gap.", "Update requirement và design annotation cùng nhau."],
    enDeliverables: [["BA-UX critique checklist", "Lens, question, evidence, impact, and owner", "BA", "Feedback is structured"], ["Design decision log", "Decision, rationale, source, owner, and requirement impact", "Product and UX", "Design decisions are traceable"], ["Gap register", "Missing rule, data, state, exception, accessibility, or analytics item", "BA and UX", "Gaps have next action"], ["Annotated flow updates", "Design frame notes linked to requirement and decision", "UX", "Design and requirements align"]],
    viDeliverables: [["BA-UX critique checklist", "Lens, question, evidence, impact và owner", "BA", "Feedback structured"], ["Design decision log", "Decision, rationale, source, owner và requirement impact", "Product và UX", "Design decision traceable"], ["Gap register", "Missing rule, data, state, exception, accessibility hoặc analytics item", "BA và UX", "Gap có next action"], ["Annotated flow updates", "Design frame note linked với requirement và decision", "UX", "Design và requirement aligned"]],
    enRisks: [["Critique as opinion", "UX feedback may feel subjective", "Tie critique to evidence and user outcome"], ["UX intent loss", "BA may over-constrain design", "Preserve design goal while clarifying rules"], ["Hidden policy", "Design may imply policy decisions", "Identify implied rules and decision owners"], ["Untracked review", "Good discussion may not update artifacts", "Capture decisions and annotations"]],
    viRisks: [["Critique as opinion", "UX feedback có thể cảm giác subjective", "Tie critique với evidence và user outcome"], ["UX intent loss", "BA có thể over-constrain design", "Preserve design goal trong khi clarify rule"], ["Hidden policy", "Design có thể imply policy decision", "Identify implied rule và decision owner"], ["Untracked review", "Discussion tốt nhưng artifact không update", "Capture decision và annotation"]],
    enMetric: "BA and UX reviews produce clearer design decisions without losing user-centered intent.",
    viMetric: "Review BA và UX tạo design decision rõ hơn mà không mất user-centered intent."
  },
  {
    slug: "ba-tech-lead-nfr-review",
    group: "Cross-functional BA Collaboration",
    domain: "BA and architecture",
    enTitle: "BA-Tech Lead NFR Review",
    viTitle: "Review NFR giữa BA và tech lead",
    enProject: "A feature is functionally ready for refinement, but the tech lead raises concerns about latency, data retention, audit, reliability, and supportability.",
    viProject: "Feature đã functionally ready cho refinement, nhưng tech lead raise concern về latency, data retention, audit, reliability và supportability.",
    enChallenge: "The BA must turn technical concerns into business-readable NFR decisions. AI can help structure questions, but thresholds and trade-offs need owner agreement.",
    viChallenge: "BA phải chuyển technical concern thành NFR decision business-readable. AI có thể structure question, nhưng threshold và trade-off cần owner agreement.",
    enAiUse: ["Generate NFR questions by feature workflow and risk.", "Translate technical concerns into business impact statements.", "Draft measurable thresholds and acceptance signals.", "Create decision memo for trade-offs."],
    viAiUse: ["Generate NFR question theo feature workflow và risk.", "Translate technical concern thành business impact statement.", "Draft measurable threshold và acceptance signal.", "Tạo decision memo cho trade-off."],
    enInputs: ["Feature requirements", "Architecture concerns", "Operational constraints", "Compliance needs", "Usage volume estimates"],
    viInputs: ["Feature requirements", "Architecture concerns", "Operational constraints", "Compliance needs", "Usage volume estimates"],
    enWorkflow: ["Collect technical concerns and affected user/business outcomes.", "Ask AI to translate concerns into NFR scenarios.", "Define candidate thresholds and measurement methods.", "Review trade-offs with product, tech lead, operations, and compliance.", "Add NFR acceptance criteria and monitoring expectations.", "Record decisions and unresolved risks."],
    viWorkflow: ["Collect technical concern và affected user/business outcome.", "Yêu cầu AI translate concern thành NFR scenario.", "Define candidate threshold và measurement method.", "Review trade-off với product, tech lead, operations và compliance.", "Thêm NFR acceptance criteria và monitoring expectation.", "Record decision và unresolved risk."],
    enDeliverables: [["NFR decision table", "Attribute, scenario, business impact, threshold, owner, and test method", "BA and tech lead", "NFRs are measurable"], ["Trade-off memo", "Option, cost, risk, user impact, and recommendation", "Product owner", "Stakeholders can decide"], ["Monitoring requirement", "Metric, threshold, alert, owner, and response", "Operations", "NFRs remain observable"], ["Risk register update", "NFR risk, mitigation, decision, and residual risk", "Project manager", "Risks are tracked"]],
    viDeliverables: [["NFR decision table", "Attribute, scenario, business impact, threshold, owner và test method", "BA và tech lead", "NFR measurable"], ["Trade-off memo", "Option, cost, risk, user impact và recommendation", "Product owner", "Stakeholder decide được"], ["Monitoring requirement", "Metric, threshold, alert, owner và response", "Operations", "NFR observable"], ["Risk register update", "NFR risk, mitigation, decision và residual risk", "Project manager", "Risk được track"]],
    enRisks: [["Technical jargon", "Business stakeholders may not understand risk", "Translate to user and business impact"], ["Threshold guessing", "AI may invent numbers", "Validate thresholds with owners"], ["Late NFR", "Quality controls may be hard to retrofit", "Review before design lock"], ["No monitoring", "NFR may pass test but fail in production", "Specify monitoring and response"]],
    viRisks: [["Technical jargon", "Business stakeholder không hiểu risk", "Translate thành user/business impact"], ["Threshold guessing", "AI có thể invent number", "Validate threshold với owner"], ["Late NFR", "Quality control khó retrofit", "Review trước design lock"], ["No monitoring", "NFR pass test nhưng fail production", "Specify monitoring và response"]],
    enMetric: "Technical quality concerns become measurable business decisions and delivery requirements.",
    viMetric: "Technical quality concern trở thành business decision và delivery requirement đo được."
  },
  {
    slug: "product-tradeoff-decision-memo",
    group: "Cross-functional BA Collaboration",
    domain: "Product decisions",
    enTitle: "Product Trade-off Decision Memo",
    viTitle: "Decision memo cho product trade-off",
    enProject: "A product owner must choose between faster release with manual review, delayed release with full automation, or partial rollout to a smaller user segment.",
    viProject: "Product owner phải chọn giữa release nhanh có manual review, delay release để full automation hoặc partial rollout cho segment user nhỏ hơn.",
    enChallenge: "The BA must present trade-offs clearly across user value, delivery cost, risk, operational effort, compliance, and learning value. AI can structure options, but the decision belongs to accountable stakeholders.",
    viChallenge: "BA phải present trade-off rõ qua user value, delivery cost, risk, operational effort, compliance và learning value. AI có thể structure option, nhưng decision thuộc stakeholder accountable.",
    enAiUse: ["Generate decision options and trade-off dimensions.", "Draft impact analysis across product, engineering, QA, operations, and compliance.", "Identify missing evidence and assumptions.", "Create a concise recommendation memo."],
    viAiUse: ["Generate decision option và trade-off dimension.", "Draft impact analysis qua product, engineering, QA, operations và compliance.", "Identify missing evidence và assumption.", "Tạo recommendation memo ngắn gọn."],
    enInputs: ["Decision options", "Delivery estimates", "Risk register", "User impact notes", "Operational constraints"],
    viInputs: ["Decision options", "Delivery estimates", "Risk register", "User impact notes", "Operational constraints"],
    enWorkflow: ["Define the decision and options in neutral language.", "Ask AI to build comparison dimensions and missing evidence list.", "Fill evidence from project sources and mark assumptions.", "Review impact with functional owners.", "Draft recommendation and rejected alternatives.", "Record decision, rationale, owner, and follow-up measures."],
    viWorkflow: ["Define decision và option bằng neutral language.", "Yêu cầu AI build comparison dimension và missing evidence list.", "Điền evidence từ project source và mark assumption.", "Review impact với functional owner.", "Draft recommendation và rejected alternative.", "Record decision, rationale, owner và follow-up measure."],
    enDeliverables: [["Decision memo", "Decision, options, evidence, trade-offs, recommendation, and owner", "BA", "Decision is clear"], ["Trade-off matrix", "Option, user value, cost, risk, operations, compliance, and learning", "Product owner", "Options are comparable"], ["Assumption list", "Assumption, confidence, validation action, and owner", "BA", "Uncertainty is visible"], ["Decision log update", "Chosen option, rationale, date, owner, and follow-up metric", "Product owner", "Decision can be traced"]],
    viDeliverables: [["Decision memo", "Decision, option, evidence, trade-off, recommendation và owner", "BA", "Decision rõ"], ["Trade-off matrix", "Option, user value, cost, risk, operations, compliance và learning", "Product owner", "Option comparable"], ["Assumption list", "Assumption, confidence, validation action và owner", "BA", "Uncertainty visible"], ["Decision log update", "Chosen option, rationale, date, owner và follow-up metric", "Product owner", "Decision traceable"]],
    enRisks: [["Biased recommendation", "AI or BA may favor one option without evidence", "Separate evidence and assumption"], ["Hidden operations cost", "Manual review may burden teams", "Include operations impact"], ["Compliance blind spot", "Fast release may create control gaps", "Review with compliance owner"], ["Decision drift", "Teams may forget why option was chosen", "Record rationale and metric"]],
    viRisks: [["Biased recommendation", "AI hoặc BA favor một option thiếu evidence", "Tách evidence và assumption"], ["Hidden operations cost", "Manual review burden team", "Include operations impact"], ["Compliance blind spot", "Fast release tạo control gap", "Review với compliance owner"], ["Decision drift", "Team quên vì sao chọn option", "Record rationale và metric"]],
    enMetric: "Product trade-offs become explicit, evidence-backed, and traceable to follow-up metrics.",
    viMetric: "Product trade-off trở nên explicit, evidence-backed và trace được tới follow-up metric."
  },
  {
    slug: "production-issue-ui-api-requirement-update",
    group: "Cross-functional BA Collaboration",
    domain: "Production feedback",
    enTitle: "Production Issue to UI/API Requirement Update",
    viTitle: "Từ production issue đến update requirement UI/API",
    enProject: "After release, users report that a save button appears successful even when the backend rejects one field. The issue spans UI messaging, API error behavior, validation, and support scripts.",
    viProject: "Sau release, user report nút save trông như success dù backend reject một field. Issue liên quan UI messaging, API error behavior, validation và support script.",
    enChallenge: "The BA must convert production evidence into updated requirements across UI and API. The work is not only fixing a bug; it is clarifying expected behavior and preventing repeat ambiguity.",
    viChallenge: "BA phải chuyển production evidence thành requirement update qua UI và API. Đây không chỉ là fix bug; mà là clarify expected behavior và ngăn ambiguity lặp lại.",
    enAiUse: ["Cluster incident evidence and identify affected requirement areas.", "Draft UI/API behavior gap analysis.", "Generate updated acceptance criteria and regression scenarios.", "Create support communication and release note questions."],
    viAiUse: ["Cluster incident evidence và identify affected requirement area.", "Draft gap analysis UI/API behavior.", "Generate updated acceptance criteria và regression scenario.", "Tạo question cho support communication và release note."],
    enInputs: ["Production issue reports", "API logs", "Original story", "Support tickets", "Current UI behavior"],
    viInputs: ["Production issue reports", "API logs", "Original story", "Support tickets", "Current UI behavior"],
    enWorkflow: ["Collect evidence from support, logs, users, and reproduction steps.", "Ask AI to map issue to UI behavior, API error, validation, and test gaps.", "Classify as defect, requirement gap, or both.", "Draft updated UI/API requirements and acceptance criteria.", "Review with frontend, backend, QA, support, and product.", "Update backlog, regression suite, and support scripts."],
    viWorkflow: ["Collect evidence từ support, log, user và reproduction step.", "Yêu cầu AI map issue tới UI behavior, API error, validation và test gap.", "Classify là defect, requirement gap hoặc cả hai.", "Draft updated UI/API requirement và acceptance criteria.", "Review với frontend, backend, QA, support và product.", "Update backlog, regression suite và support script."],
    enDeliverables: [["Issue-to-requirement analysis", "Evidence, affected behavior, root cause type, and requirement gap", "BA", "Problem is framed clearly"], ["Updated UI/API behavior spec", "Expected UI state, API error, validation, copy, and support path", "BA and engineers", "Behavior is aligned"], ["Regression scenarios", "Original failure, related edge cases, and expected results", "QA", "Issue does not recur"], ["Support update", "Known issue, customer explanation, workaround, and fix status", "Support", "Support can respond consistently"]],
    viDeliverables: [["Issue-to-requirement analysis", "Evidence, affected behavior, root cause type và requirement gap", "BA", "Problem framed rõ"], ["Updated UI/API behavior spec", "Expected UI state, API error, validation, copy và support path", "BA và engineers", "Behavior aligned"], ["Regression scenarios", "Original failure, related edge case và expected result", "QA", "Issue không recur"], ["Support update", "Known issue, customer explanation, workaround và fix status", "Support", "Support respond consistent"]],
    enRisks: [["Bug-only fix", "Team may patch code without clarifying requirements", "Update UI/API behavior spec"], ["Evidence loss", "Production context may disappear", "Preserve logs and user examples"], ["Regression miss", "Related states may remain broken", "Add regression scenarios"], ["Support inconsistency", "Agents may explain issue differently", "Update support script"]],
    viRisks: [["Bug-only fix", "Team patch code nhưng không clarify requirement", "Update UI/API behavior spec"], ["Evidence loss", "Production context có thể biến mất", "Preserve log và user example"], ["Regression miss", "Related state vẫn broken", "Add regression scenario"], ["Support inconsistency", "Agent explain issue khác nhau", "Update support script"]],
    enMetric: "Production issues become clearer UI/API requirements and stronger regression coverage.",
    viMetric: "Production issue trở thành UI/API requirement rõ hơn và regression coverage mạnh hơn."
  },
  {
    slug: "frontend-backend-contract-workshop",
    group: "Cross-functional BA Collaboration",
    domain: "Contract workshops",
    enTitle: "Frontend-Backend Contract Workshop",
    viTitle: "Workshop contract frontend-backend",
    enProject: "Frontend needs data and behavior for a new dashboard, backend is still designing APIs, and product wants delivery estimates. Misalignment could create rework.",
    viProject: "Frontend cần data và behavior cho dashboard mới, backend vẫn design API, product muốn estimate delivery. Misalignment có thể tạo rework.",
    enChallenge: "The BA must facilitate a contract workshop that aligns screen behavior, API contract, error handling, data semantics, and test responsibilities.",
    viChallenge: "BA phải facilitate contract workshop align screen behavior, API contract, error handling, data semantics và test responsibility.",
    enAiUse: ["Generate agenda and contract questions from screen and API notes.", "Identify missing data fields, state behavior, and error handling.", "Draft contract decision log and dependency list.", "Create follow-up acceptance criteria."],
    viAiUse: ["Generate agenda và contract question từ screen/API note.", "Identify missing data field, state behavior và error handling.", "Draft contract decision log và dependency list.", "Tạo follow-up acceptance criteria."],
    enInputs: ["Screen behavior matrix", "API draft", "Data glossary", "Error taxonomy", "Open technical questions"],
    viInputs: ["Screen behavior matrix", "API draft", "Data glossary", "Error taxonomy", "Open technical questions"],
    enWorkflow: ["Prepare source pack with UI states, data needs, and API draft.", "Ask AI to generate workshop questions and dependency risks.", "Facilitate decisions on fields, validation, errors, pagination, and states.", "Record contract decisions, owners, and unresolved gaps.", "Update UI stories and API requirements after workshop.", "Create contract test scenarios for QA."],
    viWorkflow: ["Prepare source pack có UI state, data need và API draft.", "Yêu cầu AI generate workshop question và dependency risk.", "Facilitate decision về field, validation, error, pagination và state.", "Record contract decision, owner và unresolved gap.", "Update UI story và API requirement sau workshop.", "Tạo contract test scenario cho QA."],
    enDeliverables: [["Workshop agenda", "Decision topics, questions, evidence, and required owners", "BA", "Workshop is decision-focused"], ["Contract decision log", "Field, rule, error, owner, decision, and open item", "BA and tech lead", "Decisions are traceable"], ["Updated UI/API artifacts", "Story criteria, API behavior, and schema updates", "BA", "Artifacts stay aligned"], ["Contract test list", "Scenario, request, response, error, and expected UI", "QA", "Contract is testable"]],
    viDeliverables: [["Workshop agenda", "Decision topic, question, evidence và required owner", "BA", "Workshop decision-focused"], ["Contract decision log", "Field, rule, error, owner, decision và open item", "BA và tech lead", "Decision traceable"], ["Updated UI/API artifacts", "Story criteria, API behavior và schema update", "BA", "Artifact aligned"], ["Contract test list", "Scenario, request, response, error và expected UI", "QA", "Contract testable"]],
    enRisks: [["Meeting without decisions", "Workshop may become discussion only", "Use decision agenda and owner list"], ["Field ambiguity", "Frontend and backend may use same word differently", "Define field meaning and examples"], ["Error gap", "Contract may ignore negative cases", "Include error taxonomy"], ["Artifact divergence", "Decisions may not update stories and API docs", "Update artifacts immediately"]],
    viRisks: [["Meeting without decisions", "Workshop chỉ discussion", "Dùng decision agenda và owner list"], ["Field ambiguity", "Frontend/backend dùng cùng từ khác meaning", "Define field meaning và example"], ["Error gap", "Contract ignore negative case", "Include error taxonomy"], ["Artifact divergence", "Decision không update story và API doc", "Update artifact ngay"]],
    enMetric: "Frontend and backend leave the workshop with aligned contract decisions and test scenarios.",
    viMetric: "Frontend và backend kết thúc workshop với contract decision và test scenario aligned."
  },
  {
    slug: "design-to-api-end-to-end-traceability",
    group: "Cross-functional BA Collaboration",
    domain: "Traceability",
    enTitle: "Design-to-API End-to-End Traceability",
    viTitle: "Traceability end-to-end từ design đến API",
    enProject: "A feature spans Figma frames, user stories, API contracts, database fields, analytics events, and QA tests. During delivery, teams lose track of which artifact owns which behavior.",
    viProject: "Một feature trải qua Figma frame, user story, API contract, database field, analytics event và QA test. Trong delivery, team mất dấu artifact nào own behavior nào.",
    enChallenge: "The BA must create lightweight traceability across design, frontend behavior, backend contracts, data fields, analytics, and tests. The goal is delivery clarity, not documentation overhead.",
    viChallenge: "BA phải tạo traceability lightweight qua design, frontend behavior, backend contract, data field, analytics và test. Mục tiêu là delivery clarity, không phải documentation overhead.",
    enAiUse: ["Generate trace links between design frames, stories, API operations, and tests.", "Identify orphan behaviors without API or test coverage.", "Draft traceability matrix and gap report.", "Create change impact questions for late design or API changes."],
    viAiUse: ["Generate trace link giữa design frame, story, API operation và test.", "Identify orphan behavior thiếu API hoặc test coverage.", "Draft traceability matrix và gap report.", "Tạo change impact question cho late design/API change."],
    enInputs: ["Figma frame list", "User stories", "API contract", "Data mapping", "Test scenarios"],
    viInputs: ["Figma frame list", "User stories", "API contract", "Data mapping", "Test scenarios"],
    enWorkflow: ["Define trace dimensions: design, story, UI behavior, API, data, analytics, and test.", "Ask AI to propose trace links and confidence.", "Verify high-risk links manually with artifact owners.", "Identify orphan design elements, untested API behavior, and missing analytics.", "Update artifacts and decision log.", "Use traceability for change impact and release readiness."],
    viWorkflow: ["Define trace dimension: design, story, UI behavior, API, data, analytics và test.", "Yêu cầu AI propose trace link và confidence.", "Verify thủ công high-risk link với artifact owner.", "Identify orphan design element, API behavior chưa test và missing analytics.", "Update artifact và decision log.", "Dùng traceability cho change impact và release readiness."],
    enDeliverables: [["End-to-end trace matrix", "Design frame, story, UI behavior, API, data field, analytics, and test", "BA", "Behavior has trace coverage"], ["Gap report", "Orphan design, missing API, missing test, missing analytics, and owner", "BA and QA", "Gaps are actionable"], ["Change impact checklist", "Artifact changed, affected links, owner, and update needed", "BA", "Late changes are controlled"], ["Release trace summary", "Coverage, exceptions, accepted risks, and sign-off notes", "Product owner", "Release decision has evidence"]],
    viDeliverables: [["End-to-end trace matrix", "Design frame, story, UI behavior, API, data field, analytics và test", "BA", "Behavior có trace coverage"], ["Gap report", "Orphan design, missing API, missing test, missing analytics và owner", "BA và QA", "Gap actionable"], ["Change impact checklist", "Artifact changed, affected link, owner và update needed", "BA", "Late change controlled"], ["Release trace summary", "Coverage, exception, accepted risk và sign-off note", "Product owner", "Release decision có evidence"]],
    enRisks: [["Traceability overhead", "Matrix can become too heavy to maintain", "Trace only material behavior and high-risk items"], ["False AI link", "AI may link artifacts by similar words, not meaning", "Verify high-risk links manually"], ["Orphan design behavior", "A design interaction may not be in story or API", "Identify orphan elements"], ["Release blind spot", "Untested backend behavior may ship", "Use trace summary for readiness"]],
    viRisks: [["Traceability overhead", "Matrix có thể quá nặng để maintain", "Trace material behavior và high-risk item"], ["False AI link", "AI link artifact theo wording giống, không phải meaning", "Verify high-risk link thủ công"], ["Orphan design behavior", "Design interaction không nằm trong story/API", "Identify orphan element"], ["Release blind spot", "Backend behavior chưa test có thể ship", "Dùng trace summary cho readiness"]],
    enMetric: "Critical feature behavior is traceable from design through API, data, analytics, and tests.",
    viMetric: "Critical feature behavior traceable từ design qua API, data, analytics và test."
  }
];

useCases.push(
  ...engineeringUseCaseSpecs.map((spec) => ({
    slug: spec.slug,
    group: spec.group,
    domain: spec.domain,
    en: {
      title: spec.enTitle,
      project: spec.enProject,
      challenge: spec.enChallenge,
      aiUse: spec.enAiUse,
      inputs: spec.enInputs,
      workflow: spec.enWorkflow,
      deliverables: spec.enDeliverables,
      risks: spec.enRisks,
      metric: spec.enMetric
    },
    vi: {
      title: spec.viTitle,
      project: spec.viProject,
      challenge: spec.viChallenge,
      aiUse: spec.viAiUse,
      inputs: spec.viInputs,
      workflow: spec.viWorkflow,
      deliverables: spec.viDeliverables,
      risks: spec.viRisks,
      metric: spec.viMetric
    }
  }))
);

const lessonUpgrades = {
  "ai-landscape-for-ba": {
    en: {
      why: "This lesson matters because the earliest failure in AI initiatives is usually problem classification, not model selection. If the BA frames a deterministic workflow issue as a GenAI feature, the team inherits avoidable uncertainty, cost, and governance work. Correct classification protects budget, backlog priority, vendor conversations, and stakeholder expectations before architecture starts.",
      expert: "As an AI reviewer, I would ask the BA to prove the problem type before approving any solution shape. Good AI analysis separates language generation, knowledge retrieval, prediction, orchestration, and decision support. That distinction drives data needs, evaluation metrics, risk controls, UX behavior, and whether the feature should use AI at all.",
      badBetter: [["Ask for a chatbot because leadership wants AI", "It treats the tool as the requirement and hides the actual decision problem.", "Classify the job as prediction, retrieval, generation, automation, or decision support before naming the solution."], ["Compare AI vendors before defining evidence and data needs", "Vendor demos look convincing even when the business problem is still ambiguous.", "Define outcome metric, data dependency, source authority, and user decision first."], ["Put every idea into the GenAI backlog", "Simple routing and stable policy checks become slower and riskier.", "Use rules, workflow, search, or RAG when they fit better than open-ended generation."]]
    },
    vi: {
      why: "Bài này quan trọng vì thất bại sớm của sáng kiến AI thường nằm ở phân loại problem, không phải chọn model. Nếu BA frame một workflow deterministic thành tính năng GenAI, team sẽ phải gánh uncertainty, cost và governance không cần thiết. Phân loại đúng giúp bảo vệ budget, backlog priority, vendor discussion và expectation trước khi bắt đầu architecture.",
      expert: "Với góc nhìn chuyên gia AI, tôi sẽ yêu cầu BA chứng minh problem type trước khi duyệt solution shape. Phân tích tốt phải tách language generation, knowledge retrieval, prediction, orchestration và decision support. Sự phân biệt này quyết định data need, evaluation metric, risk control, UX behavior và cả việc có nên dùng AI hay không.",
      badBetter: [["Yêu cầu chatbot vì lãnh đạo muốn có AI", "Tool bị xem như requirement và problem decision thật bị che khuất.", "Phân loại job là prediction, retrieval, generation, automation hay decision support trước khi gọi tên solution."], ["So sánh vendor AI trước khi định nghĩa evidence và data need", "Demo vendor có thể thuyết phục dù business problem vẫn mơ hồ.", "Chốt outcome metric, data dependency, source authority và user decision trước."], ["Đưa mọi ý tưởng vào backlog GenAI", "Routing đơn giản và policy ổn định trở nên chậm hơn và rủi ro hơn.", "Dùng rule, workflow, search hoặc RAG khi phù hợp hơn open-ended generation."]]
    }
  },
  "llm-mental-model": {
    en: {
      why: "This lesson matters because LLM output often sounds complete before it is actually governed, sourced, or testable. BAs who understand the mental model can use AI as a structured drafting and critique partner without confusing fluent text with business approval. That keeps requirements reviewable and prevents hidden assumptions from entering delivery artifacts.",
      expert: "An LLM is a probabilistic system with strong language patterning, not an authoritative requirements engine. The BA must manage context, examples, constraints, and review criteria. Expert use means asking for assumptions, evidence labels, counterexamples, and testability checks, then treating the answer as a candidate artifact awaiting human validation.",
      badBetter: [["Ask the model for final acceptance criteria from a one-line idea", "The model will fill missing policy, permissions, and edge cases with plausible inventions.", "Provide rules, actors, constraints, examples, and require assumptions to be listed separately."], ["Use confidence language from the model as approval", "Model confidence is not stakeholder confirmation or regulatory evidence.", "Route material claims to source review or decision owners before publishing."], ["Share a polished AI draft without review markings", "Stakeholders cannot see what is fact, inference, or unsupported text.", "Add a review table for source-backed facts, assumptions, open questions, and owner decisions."]]
    },
    vi: {
      why: "Bài này quan trọng vì output của LLM thường nghe rất hoàn chỉnh trước khi nó thật sự được governance, có source hoặc test được. BA hiểu mental model sẽ dùng AI như partner để draft và critique có cấu trúc, không nhầm text trôi chảy với business approval. Điều này giữ requirement ở trạng thái reviewable và ngăn assumption ẩn đi vào artifact triển khai.",
      expert: "LLM là hệ thống xác suất có khả năng pattern language rất mạnh, không phải requirement engine có thẩm quyền. BA phải quản lý context, example, constraint và review criteria. Dùng chuyên nghiệp nghĩa là yêu cầu assumption, evidence label, counterexample và testability check, sau đó xem answer như candidate artifact cần human validation.",
      badBetter: [["Yêu cầu model viết final acceptance criteria từ một idea một dòng", "Model sẽ tự điền policy, permission và edge case còn thiếu bằng invention nghe hợp lý.", "Cung cấp rule, actor, constraint, example và bắt model list assumption riêng."], ["Xem ngôn ngữ tự tin của model là approval", "Model confidence không phải stakeholder confirmation hoặc regulatory evidence.", "Đưa material claim qua source review hoặc decision owner trước khi publish."], ["Share draft AI bóng bẩy nhưng không có dấu review", "Stakeholder không thấy đâu là fact, inference hay unsupported text.", "Thêm bảng review cho source-backed fact, assumption, open question và owner decision."]]
    }
  },
  "tokens-context-and-memory": {
    en: {
      why: "This lesson matters because most BA artifacts depend on long histories: transcripts, policies, decisions, exceptions, and prior commitments. AI tools can only reason over the context they can see and retain. A BA who controls source maps and chunking plans reduces missed requirements, stale policy reuse, and shallow summaries that look organized but lose critical detail.",
      expert: "Expert AI use treats context as an analysis asset. Long-context models still suffer from attention dilution, source conflict, and recency ambiguity. The BA should design review passes, source IDs, chunk purpose, decision logs, and reconciliation steps so that AI output remains traceable rather than becoming an attractive summary of incomplete evidence.",
      badBetter: [["Upload all documents and ask for all gaps", "The model may summarize broadly and miss late, rare, or cross-document constraints.", "Review by source ID and module, then run a reconciliation pass for conflicts and omissions."], ["Mix old policy, draft notes, and approved decisions without labels", "The model cannot reliably know what is current or authoritative.", "Label source status, effective date, owner, and confidence before analysis."], ["Use chat history as project memory", "Important decisions become inaccessible, reordered, or invisible to other team members.", "Create an explicit context pack with source map, decision log, and open questions."]]
    },
    vi: {
      why: "Bài này quan trọng vì hầu hết artifact BA phụ thuộc vào lịch sử dài: transcript, policy, decision, exception và commitment trước đó. AI chỉ reason được trên context nó nhìn thấy và giữ được. BA kiểm soát source map và chunking plan sẽ giảm miss requirement, dùng nhầm policy cũ và summary nông nhưng nhìn có vẻ gọn.",
      expert: "Dùng AI ở mức chuyên gia xem context như một analysis asset. Model long-context vẫn có attention dilution, source conflict và recency ambiguity. BA nên thiết kế review pass, source ID, mục đích chunk, decision log và bước reconciliation để output AI traceable thay vì chỉ là summary đẹp của evidence thiếu.",
      badBetter: [["Upload toàn bộ tài liệu rồi hỏi tất cả gap", "Model có thể summarize rộng và bỏ sót constraint ở phần sau, hiếm gặp hoặc nằm giữa nhiều document.", "Review theo source ID và module, sau đó chạy pass reconcile conflict và omission."], ["Trộn policy cũ, draft note và decision đã approve không label", "Model không thể chắc đâu là current hoặc authoritative.", "Label source status, effective date, owner và confidence trước khi analysis."], ["Dùng chat history như project memory", "Decision quan trọng có thể bị ẩn, đổi thứ tự hoặc người khác không truy cập được.", "Tạo context pack explicit gồm source map, decision log và open question."]]
    }
  },
  "hallucination-and-source-grounding": {
    en: {
      why: "This lesson matters because a hallucinated sentence can become a requirement, a test case, a vendor score, or an estimate if nobody challenges it early. BA work turns language into commitment. Grounding rules make evidence visible, convert unsupported claims into questions, and prevent confident AI prose from becoming false project certainty.",
      expert: "The practical control is not simply asking AI to cite sources. The BA must verify that the cited source actually supports the claim, decide which evidence level is acceptable, and require fallback when support is weak. For high-impact requirements, grounding should be part of the artifact format, not an optional review note.",
      badBetter: [["Accept a cited claim without opening the source", "The citation may be adjacent, outdated, or unrelated to the specific claim.", "Check claim-to-source support and record evidence level in the requirement table."], ["Rewrite unsupported AI claims into polished requirements", "Better wording makes weak evidence harder to detect.", "Move unsupported claims into open questions with owner and validation method."], ["Use the same evidence threshold for all requirements", "Low-risk copy and regulated decisions need different controls.", "Define evidence levels by risk tier and business impact."]]
    },
    vi: {
      why: "Bài này quan trọng vì một câu hallucination có thể biến thành requirement, test case, vendor score hoặc estimate nếu không bị challenge sớm. Công việc BA biến ngôn ngữ thành commitment. Grounding rule làm evidence visible, chuyển unsupported claim thành question và ngăn AI prose tự tin trở thành false certainty của dự án.",
      expert: "Control thực tế không chỉ là yêu cầu AI cite source. BA phải kiểm tra source được cite có thật sự support claim không, quyết định evidence level nào chấp nhận được và yêu cầu fallback khi support yếu. Với requirement high-impact, grounding nên là format của artifact, không phải note review tùy chọn.",
      badBetter: [["Chấp nhận claim có citation mà không mở source", "Citation có thể chỉ liên quan gần, đã cũ hoặc không support đúng claim.", "Kiểm tra claim-to-source support và ghi evidence level trong requirement table."], ["Rewrite unsupported AI claim thành requirement mượt hơn", "Wording tốt làm evidence yếu khó phát hiện hơn.", "Đưa unsupported claim vào open question có owner và validation method."], ["Dùng cùng evidence threshold cho mọi requirement", "Low-risk copy và regulated decision cần control khác nhau.", "Định nghĩa evidence level theo risk tier và business impact."]]
    }
  },
  "embeddings-rag-and-knowledge": {
    en: {
      why: "This lesson matters because many organizations call a feature RAG when the real requirement is trusted knowledge governance. If the BA only specifies a chat interface, the assistant may retrieve stale, inaccessible, or conflicting material. Defining source authority, freshness, permissions, citation behavior, and fallback is what turns RAG into a usable business capability.",
      expert: "RAG quality fails in retrieval before it fails in generation. A strong BA specification covers ingestion ownership, metadata, chunking assumptions, ranking priority, access control, source conflict handling, and retrieval evaluation. Answer tone is secondary; the primary test is whether the system found the right evidence for the right user.",
      badBetter: [["Specify that answers must use company documents", "The phrase does not define which documents are approved, current, or visible to each role.", "Create a knowledge contract with source inventory, owner, effective date, and access rules."], ["Evaluate only whether answers sound helpful", "A friendly answer can still cite the wrong policy or miss a better source.", "Measure retrieval precision, citation support, fallback rate, and conflict detection."], ["Let the assistant answer when sources conflict", "Users may act on the wrong rule while the system appears confident.", "Show conflict warning, cite both sources, and route to the accountable owner."]]
    },
    vi: {
      why: "Bài này quan trọng vì nhiều tổ chức gọi tính năng là RAG trong khi requirement thật là governance tri thức đáng tin. Nếu BA chỉ đặc tả chat interface, assistant có thể retrieve material cũ, không được phép xem hoặc conflict. Định nghĩa source authority, freshness, permission, citation behavior và fallback mới biến RAG thành capability dùng được.",
      expert: "RAG quality thường fail ở retrieval trước khi fail ở generation. Spec BA mạnh phải cover ingestion ownership, metadata, chunking assumption, ranking priority, access control, source conflict handling và retrieval evaluation. Tone của answer là thứ yếu; test chính là hệ thống có tìm đúng evidence cho đúng user hay không.",
      badBetter: [["Đặc tả answer phải dùng company document", "Câu này không nói document nào approved, current hoặc visible cho từng role.", "Tạo knowledge contract gồm source inventory, owner, effective date và access rule."], ["Chỉ evaluate answer có nghe helpful không", "Answer thân thiện vẫn có thể cite nhầm policy hoặc miss source tốt hơn.", "Đo retrieval precision, citation support, fallback rate và conflict detection."], ["Để assistant trả lời khi source conflict", "User có thể hành động theo rule sai trong khi hệ thống rất tự tin.", "Hiển thị conflict warning, cite cả hai source và route tới owner chịu trách nhiệm."]]
    }
  },
  "discovery-with-ai": {
    en: {
      why: "This lesson matters because AI can make discovery feel faster while silently replacing uncertainty with invented completeness. The BA's value is to turn AI suggestions into hypotheses, not conclusions. A good discovery workflow uses AI to widen the question space, then uses evidence, workshops, interviews, and data to decide what is true.",
      expert: "AI is useful in discovery because it can generate alternative actors, edge cases, risks, and interview angles quickly. The danger is anchoring: once a fluent list exists, stakeholders may stop exploring. The BA should explicitly label hypothesis, evidence needed, validation method, and decision owner before converting anything into requirements.",
      badBetter: [["Ask AI to write requirements from a business problem", "The model will collapse discovery uncertainty into premature scope.", "Ask for hypotheses, assumptions, evidence needed, and workshop questions first."], ["Use AI-generated stakeholder lists as final", "Important internal owners, regulators, or operational users may be absent.", "Validate actors against process maps, org roles, customer journeys, and decision rights."], ["Prioritize questions that are easy to answer", "The team may avoid the riskiest assumptions until delivery.", "Rank hypotheses by business impact, evidence gap, and decision urgency."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI có thể làm discovery có vẻ nhanh hơn nhưng âm thầm thay uncertainty bằng completeness tự bịa. Giá trị của BA là biến suggestion của AI thành hypothesis, không phải conclusion. Workflow discovery tốt dùng AI để mở rộng question space, rồi dùng evidence, workshop, interview và data để quyết định điều gì đúng.",
      expert: "AI hữu ích trong discovery vì nó tạo alternative actor, edge case, risk và interview angle rất nhanh. Nguy hiểm là anchoring: khi đã có list trôi chảy, stakeholder có thể ngừng khám phá. BA phải label rõ hypothesis, evidence needed, validation method và decision owner trước khi chuyển bất kỳ phần nào thành requirement.",
      badBetter: [["Yêu cầu AI viết requirement từ business problem", "Model sẽ biến uncertainty của discovery thành scope quá sớm.", "Trước hết yêu cầu hypothesis, assumption, evidence needed và workshop question."], ["Xem stakeholder list do AI tạo là final", "Owner nội bộ, regulator hoặc operational user quan trọng có thể bị thiếu.", "Validate actor bằng process map, org role, customer journey và decision right."], ["Ưu tiên câu hỏi dễ trả lời", "Team có thể né assumption rủi ro nhất cho tới lúc delivery.", "Rank hypothesis theo business impact, evidence gap và decision urgency."]]
    }
  },
  "stakeholder-interviews-and-synthesis": {
    en: {
      why: "This lesson matters because AI can summarize interviews quickly, but speed can flatten disagreement, source attribution, and political nuance. For BA work, the important output is not a neat summary; it is a reliable synthesis that preserves who said what, where stakeholders conflict, which decision is missing, and what evidence still needs validation.",
      expert: "Interview synthesis should treat transcripts as evidence, not objective truth. AI can cluster themes and detect contradictions, but the BA must preserve attribution, role context, emotion, and decision authority. Expert practice is to separate quote-backed facts, interpreted needs, conflicts, and follow-up questions before drafting any requirement.",
      badBetter: [["Ask AI for a clean summary of all interviews", "A clean summary can erase contradictions and minority but critical concerns.", "Request themes with speaker attribution, conflict points, evidence strength, and follow-up questions."], ["Merge similar stakeholder statements into one need", "Different roles may use the same words for different operational problems.", "Keep role, context, scenario, and decision impact attached to each synthesized need."], ["Treat transcript sentiment as priority", "Emotion signals importance but does not prove business value or feasibility.", "Combine sentiment with frequency, risk, revenue, compliance, and decision ownership."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI summarize interview rất nhanh, nhưng tốc độ có thể làm phẳng disagreement, source attribution và political nuance. Với BA, output quan trọng không phải summary gọn; đó là synthesis đáng tin giữ được ai nói gì, stakeholder conflict ở đâu, decision nào thiếu và evidence nào còn cần validate.",
      expert: "Synthesis interview nên xem transcript là evidence, không phải objective truth. AI có thể cluster theme và detect contradiction, nhưng BA phải giữ attribution, role context, emotion và decision authority. Thực hành chuyên gia là tách quote-backed fact, interpreted need, conflict và follow-up question trước khi draft requirement.",
      badBetter: [["Yêu cầu AI tạo clean summary của mọi interview", "Summary quá gọn có thể xóa contradiction và concern ít người nói nhưng rất critical.", "Yêu cầu theme có speaker attribution, conflict point, evidence strength và follow-up question."], ["Gộp statement giống nhau thành một need", "Role khác nhau có thể dùng cùng từ nhưng nói về operational problem khác.", "Giữ role, context, scenario và decision impact gắn với từng synthesized need."], ["Xem sentiment trong transcript là priority", "Emotion báo hiệu importance nhưng không chứng minh business value hoặc feasibility.", "Kết hợp sentiment với frequency, risk, revenue, compliance và decision ownership."]]
    }
  },
  "user-stories-and-acceptance-criteria": {
    en: {
      why: "This lesson matters because AI can produce many stories quickly, but volume is not readiness. Development-ready BA work requires actor clarity, business value, observable behavior, boundaries, negative cases, permissions, and release decisions. If the BA does not control the structure, AI-generated stories become attractive backlog noise.",
      expert: "A user story is a decision container, not just a sentence template. AI is helpful for variation, edge cases, and Given-When-Then drafting, but it tends to overgeneralize. The BA should evaluate each story for one user goal, testable outcome, explicit rule source, and clear split from adjacent behavior.",
      badBetter: [["Generate ten user stories for the feature", "The backlog grows without proving which stories are valuable or releasable.", "Start from user goals, split by permission, workflow step, exception, and business value."], ["Accept criteria that say the system works correctly", "QA and developers cannot observe or automate vague success.", "Write Given-When-Then criteria with data, state, actor, boundary, and expected result."], ["Ignore negative and permission cases", "The happy path hides production defects and security issues.", "Require negative, boundary, audit, and role-based acceptance criteria before refinement."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI có thể tạo rất nhiều story nhanh, nhưng số lượng không phải readiness. BA artifact sẵn sàng cho development cần rõ actor, business value, observable behavior, boundary, negative case, permission và release decision. Nếu BA không kiểm soát structure, story do AI sinh sẽ trở thành backlog noise nhìn hấp dẫn.",
      expert: "User story là decision container, không chỉ là sentence template. AI hữu ích để tạo variation, edge case và draft Given-When-Then, nhưng nó thường overgeneralize. BA cần evaluate từng story theo một user goal, outcome test được, rule source explicit và ranh giới rõ với behavior lân cận.",
      badBetter: [["Generate mười user story cho feature", "Backlog phình to nhưng chưa chứng minh story nào có value hoặc releasable.", "Bắt đầu từ user goal, split theo permission, workflow step, exception và business value."], ["Acceptance criteria ghi system works correctly", "QA và developer không quan sát hoặc automate được success mơ hồ.", "Viết Given-When-Then có data, state, actor, boundary và expected result."], ["Bỏ qua negative và permission case", "Happy path che giấu production defect và security issue.", "Yêu cầu negative, boundary, audit và role-based criteria trước refinement."]]
    }
  },
  "process-modeling-with-ai": {
    en: {
      why: "This lesson matters because process models are where hidden requirements usually surface: handoffs, exception paths, timing, ownership, and system boundaries. AI can convert text into diagrams, but the BA must test whether the diagram exposes operational truth. A beautiful flow that misses escalation or manual override is dangerous.",
      expert: "AI-assisted process modeling should be treated as a hypothesis of the workflow. The expert BA asks whether every decision has a rule, every exception has an owner, every system interaction has a boundary, and every loop has a stopping condition. Diagrams should trigger better questions, not decorate requirements.",
      badBetter: [["Ask AI to draw a process from a paragraph and accept it", "The generated flow may omit exceptions, ownership, timing, and integration constraints.", "Use the diagram as a review object and challenge every decision, handoff, and alternate path."], ["Model only the happy path", "Delivery teams discover queues, retries, and manual work too late.", "Add failure, cancellation, timeout, escalation, and override paths."], ["Mix user actions and system actions in one lane", "Responsibility and automation boundaries become unclear.", "Separate actors, systems, external services, and human reviewers into distinct lanes."]]
    },
    vi: {
      why: "Bài này quan trọng vì process model là nơi requirement ẩn thường lộ ra: handoff, exception path, timing, ownership và system boundary. AI có thể chuyển text thành diagram, nhưng BA phải kiểm tra diagram có phản ánh operational truth không. Flow đẹp mà miss escalation hoặc manual override sẽ rất nguy hiểm.",
      expert: "Process modeling với AI nên được xem là hypothesis về workflow. BA chuyên gia sẽ hỏi mỗi decision có rule chưa, mỗi exception có owner chưa, mỗi system interaction có boundary chưa và mỗi loop có stopping condition chưa. Diagram phải kích hoạt câu hỏi tốt hơn, không chỉ trang trí requirement.",
      badBetter: [["Yêu cầu AI vẽ process từ một đoạn và accept luôn", "Flow sinh ra có thể omit exception, ownership, timing và integration constraint.", "Dùng diagram như review object và challenge từng decision, handoff, alternate path."], ["Chỉ model happy path", "Delivery team phát hiện queue, retry và manual work quá muộn.", "Thêm path failure, cancellation, timeout, escalation và override."], ["Trộn user action và system action trong một lane", "Responsibility và automation boundary trở nên mơ hồ.", "Tách actor, system, external service và human reviewer thành lane riêng."]]
    }
  },
  "context-engineering-patterns": {
    en: {
      why: "This lesson matters because one-off prompts do not scale BA quality. Teams need repeatable context patterns that define role, goal, evidence, constraints, output format, review rules, and escalation behavior. Context engineering lets AI work become auditable, teachable, and reusable across projects instead of depending on individual prompt luck.",
      expert: "Context engineering is the BA equivalent of designing a controlled analysis environment. The expert move is to make task boundaries explicit: what sources may be used, what must be ignored, what format is required, what counts as evidence, and what the model must do when information is missing or conflicting.",
      badBetter: [["Write a clever prompt for each new task", "Quality depends on individual improvisation and is hard to review.", "Create reusable prompt patterns with source rules, output contracts, and review gates."], ["Give AI role and goal but no evidence rules", "The model may blend provided facts with plausible external assumptions.", "Specify allowed sources, unsupported-claim labels, and validation questions."], ["Ask for a complete answer in one step", "The model hides missing context while optimizing for fluency.", "Use staged prompts: context pack, analysis, artifact draft, critique, and revision."]]
    },
    vi: {
      why: "Bài này quan trọng vì prompt dùng một lần không scale được quality của BA team. Team cần context pattern lặp lại được, định nghĩa role, goal, evidence, constraint, output format, review rule và escalation behavior. Context engineering giúp AI work có thể audit, dạy lại và reuse trên nhiều project thay vì phụ thuộc prompt luck cá nhân.",
      expert: "Context engineering là cách BA thiết kế môi trường analysis có kiểm soát. Điểm chuyên gia là làm task boundary explicit: source nào được dùng, phần nào phải ignore, format nào bắt buộc, evidence được tính ra sao và model phải làm gì khi information thiếu hoặc conflict.",
      badBetter: [["Viết prompt thông minh riêng cho từng task", "Quality phụ thuộc improvisation cá nhân và khó review.", "Tạo prompt pattern reusable có source rule, output contract và review gate."], ["Cho AI role và goal nhưng thiếu evidence rule", "Model có thể trộn fact được cung cấp với assumption bên ngoài nghe hợp lý.", "Đặc tả allowed source, unsupported-claim label và validation question."], ["Yêu cầu answer hoàn chỉnh trong một bước", "Model che missing context để tối ưu fluency.", "Dùng staged prompt: context pack, analysis, artifact draft, critique và revision."]]
    }
  },
  "review-loops-and-critique": {
    en: {
      why: "This lesson matters because first AI drafts are optimized for fluency, not necessarily for correctness, risk, or delivery readiness. Review loops turn AI from a drafting shortcut into a quality system. BAs can use critique passes to expose ambiguity, missing rules, unsupported claims, test gaps, and stakeholder decisions before artifacts move downstream.",
      expert: "The most effective AI workflows separate creation from critique. Expert BAs design named review lenses: evidence, testability, risk, stakeholder conflict, operational feasibility, and compliance. Asking the same model to critique its own draft helps, but stronger practice uses explicit rubrics, source checks, and human review for high-risk decisions.",
      badBetter: [["Accept the first AI draft because it reads well", "Fluency can hide ambiguity, false claims, and untestable wording.", "Run critique passes for evidence, specificity, testability, and risk before sharing."], ["Ask a generic question like what is wrong with this", "The critique may be shallow and miss the BA quality dimensions.", "Use a rubric with required lenses, severity, source reference, and recommended fix."], ["Let review comments remain informal", "The team cannot track whether risks were resolved.", "Convert critique findings into a defect register or decision log with owners."]]
    },
    vi: {
      why: "Bài này quan trọng vì draft AI đầu tiên tối ưu cho fluency, không nhất thiết đúng, ít rủi ro hoặc sẵn sàng delivery. Review loop biến AI từ shortcut draft thành quality system. BA có thể dùng critique pass để lộ ambiguity, missing rule, unsupported claim, test gap và stakeholder decision trước khi artifact đi xuống downstream.",
      expert: "Workflow AI hiệu quả nhất tách creation khỏi critique. BA chuyên gia thiết kế review lens có tên rõ: evidence, testability, risk, stakeholder conflict, operational feasibility và compliance. Yêu cầu cùng model critique draft của nó có ích, nhưng thực hành mạnh hơn là dùng rubric explicit, source check và human review cho decision high-risk.",
      badBetter: [["Accept draft AI đầu tiên vì đọc rất mượt", "Fluency có thể che ambiguity, false claim và wording không test được.", "Chạy critique pass cho evidence, specificity, testability và risk trước khi share."], ["Hỏi chung chung what is wrong with this", "Critique có thể nông và miss dimension quality của BA.", "Dùng rubric có required lens, severity, source reference và recommended fix."], ["Để review comment ở dạng informal", "Team không track được risk đã resolve hay chưa.", "Chuyển critique finding thành defect register hoặc decision log có owner."]]
    }
  },
  "structured-outputs-and-reusable-prompts": {
    en: {
      why: "This lesson matters because BA artifacts must be compared, reviewed, traced, and handed off. Free-form AI prose is hard to validate at scale. Structured outputs make missing fields visible, enforce evidence discipline, and let teams reuse prompts for stories, risks, requirements, decisions, and review findings without starting from scratch.",
      expert: "Structured output is a control surface. The schema tells the model what dimensions matter and tells reviewers what must be checked. Expert BAs include source ID, assumption flag, confidence, decision owner, testability, risk level, and next action fields so the output supports governance, not just readability.",
      badBetter: [["Ask AI for a detailed analysis in paragraphs", "Important fields like owner, evidence, risk, and action can disappear.", "Use tables or JSON-like structures with required columns and explicit missing-value handling."], ["Reuse a prompt without a quality contract", "The same prompt may produce inconsistent artifacts across projects.", "Define output schema, acceptance criteria, review rubric, and revision instructions."], ["Treat structured output as automatically correct", "A table can look precise while containing unsupported data.", "Validate each row for source support, decision status, and testability."]]
    },
    vi: {
      why: "Bài này quan trọng vì artifact BA cần được compare, review, trace và handoff. Prose tự do của AI rất khó validate ở scale. Structured output làm missing field visible, enforce evidence discipline và giúp team reuse prompt cho story, risk, requirement, decision và review finding mà không phải bắt đầu lại.",
      expert: "Structured output là một control surface. Schema nói cho model biết dimension nào quan trọng và nói cho reviewer biết phải check gì. BA chuyên gia thêm source ID, assumption flag, confidence, decision owner, testability, risk level và next action để output hỗ trợ governance, không chỉ readability.",
      badBetter: [["Yêu cầu AI phân tích chi tiết bằng paragraph", "Field quan trọng như owner, evidence, risk và action có thể biến mất.", "Dùng table hoặc JSON-like structure với column bắt buộc và cách xử lý missing value rõ."], ["Reuse prompt nhưng không có quality contract", "Cùng prompt có thể tạo artifact inconsistent giữa project.", "Định nghĩa output schema, acceptance criteria, review rubric và revision instruction."], ["Xem structured output là tự động đúng", "Bảng nhìn precise nhưng vẫn có thể chứa data unsupported.", "Validate từng row theo source support, decision status và testability."]]
    }
  },
  "ambiguity-conflict-and-gap-analysis": {
    en: {
      why: "This lesson matters because ambiguous requirements create the most expensive defects when they survive into design, build, and testing. AI can help scan for vague language and contradictions, but the BA must turn findings into a disciplined defect taxonomy. The goal is not better wording; it is earlier decision clarity.",
      expert: "Ambiguity analysis should distinguish missing information, conflicting rules, undefined terms, non-testable adjectives, actor confusion, and decision gaps. AI is strong at pattern detection, but expert BA work assigns severity, evidence, owner, and clarification path. A rewrite without decision support is still an assumption.",
      badBetter: [["Ask AI to make the requirement clearer", "The model may smooth over a missing decision instead of exposing it.", "Classify the issue type, severity, evidence, and owner before rewriting."], ["Treat all ambiguity as equal", "A vague label and a missing compliance rule carry very different delivery risk.", "Rank ambiguity by business impact, test impact, regulatory impact, and dependency."], ["Accept AI rewrites that add new detail", "The rewrite may invent thresholds, actors, or policy.", "Only rewrite source-supported parts and mark the rest as clarification questions."]]
    },
    vi: {
      why: "Bài này quan trọng vì requirement mơ hồ tạo defect đắt nhất khi sống sót tới design, build và testing. AI có thể scan vague language và contradiction, nhưng BA phải biến finding thành defect taxonomy có kỷ luật. Mục tiêu không phải wording hay hơn; mục tiêu là decision clarity sớm hơn.",
      expert: "Ambiguity analysis nên tách missing information, conflicting rule, undefined term, non-testable adjective, actor confusion và decision gap. AI mạnh ở pattern detection, nhưng BA chuyên gia gán severity, evidence, owner và clarification path. Rewrite không có decision support vẫn chỉ là assumption.",
      badBetter: [["Yêu cầu AI làm requirement rõ hơn", "Model có thể làm mượt missing decision thay vì phơi bày nó.", "Classify issue type, severity, evidence và owner trước khi rewrite."], ["Xem mọi ambiguity là như nhau", "Một label mơ hồ và một missing compliance rule có delivery risk rất khác.", "Rank ambiguity theo business impact, test impact, regulatory impact và dependency."], ["Accept rewrite AI có thêm detail mới", "Rewrite có thể tự bịa threshold, actor hoặc policy.", "Chỉ rewrite phần source-supported và mark phần còn lại thành clarification question."]]
    }
  },
  "non-functional-requirements-and-risk": {
    en: {
      why: "This lesson matters because AI features often fail in quality attributes that stakeholders do not state explicitly: privacy, latency, reliability, explainability, fairness, auditability, and fallback. BAs must pull these concerns forward. For AI-enabled products, NFRs are not secondary; they define whether the feature can be trusted in real operation.",
      expert: "AI raises NFR complexity because behavior is probabilistic and data-dependent. Expert BA analysis ties each NFR to risk scenario, user harm, measurement method, threshold, owner, and operational response. Vague goals such as accurate or fast are insufficient; the spec needs measurable evaluation and monitoring commitments.",
      badBetter: [["Write that AI output must be accurate", "Accuracy is undefined without task, dataset, threshold, and failure cost.", "Specify evaluation cases, target metric, acceptable error, and escalation behavior."], ["Leave privacy to the technical team", "BA decisions about data, users, and workflow shape privacy exposure.", "Define prohibited data, retention, consent, access, and redaction requirements."], ["Add NFRs after feature design is complete", "Controls may become expensive or impossible to retrofit.", "Elicit AI-specific NFRs during discovery and include them in acceptance criteria."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI feature thường fail ở quality attribute mà stakeholder không nói rõ: privacy, latency, reliability, explainability, fairness, auditability và fallback. BA phải kéo các concern này lên sớm. Với product có AI, NFR không phải thứ phụ; nó định nghĩa feature có đáng tin trong operation thật hay không.",
      expert: "AI làm NFR phức tạp hơn vì behavior có tính xác suất và phụ thuộc data. Phân tích BA chuyên gia gắn từng NFR với risk scenario, user harm, measurement method, threshold, owner và operational response. Mục tiêu mơ hồ như accurate hoặc fast là không đủ; spec cần evaluation và monitoring đo được.",
      badBetter: [["Viết AI output must be accurate", "Accuracy không có nghĩa nếu thiếu task, dataset, threshold và failure cost.", "Đặc tả evaluation case, target metric, acceptable error và escalation behavior."], ["Để privacy cho technical team", "Decision của BA về data, user và workflow định hình privacy exposure.", "Định nghĩa prohibited data, retention, consent, access và redaction requirement."], ["Thêm NFR sau khi design feature xong", "Control có thể trở nên đắt hoặc không retrofit được.", "Elicit NFR đặc thù AI trong discovery và đưa vào acceptance criteria."]]
    }
  },
  "traceability-and-testability": {
    en: {
      why: "This lesson matters because AI-assisted artifacts can multiply quickly, making it easy to lose the chain from business goal to requirement, source, decision, test, and release evidence. Traceability protects teams from elegant but unproven requirements. Testability turns AI suggestions into behavior that delivery teams can verify.",
      expert: "For AI work, traceability should include evidence source, prompt or context package, model-assisted assumption, reviewer, decision owner, and evaluation case. Expert BAs treat traceability as risk control, not documentation overhead. If a requirement cannot be traced or tested, it should not become delivery commitment.",
      badBetter: [["Keep AI drafts in chat and copy useful parts into tickets", "The source, assumption, and review trail disappear.", "Record source IDs, prompt context, reviewer, decision owner, and artifact version."], ["Write tests only for happy-path generated behavior", "AI features fail in edge cases, low confidence, and unsupported input.", "Trace each requirement to positive, negative, fallback, and monitoring tests."], ["Treat traceability as a compliance spreadsheet", "The team fills fields without using them to manage risk.", "Use trace links in refinement, QA planning, change impact, and release decisions."]]
    },
    vi: {
      why: "Bài này quan trọng vì artifact có AI hỗ trợ có thể nhân lên rất nhanh, khiến team dễ mất chain từ business goal tới requirement, source, decision, test và release evidence. Traceability bảo vệ team khỏi requirement đẹp nhưng chưa chứng minh. Testability biến suggestion AI thành behavior mà delivery team verify được.",
      expert: "Với AI work, traceability nên gồm evidence source, prompt hoặc context package, assumption có model hỗ trợ, reviewer, decision owner và evaluation case. BA chuyên gia xem traceability là risk control, không phải documentation overhead. Requirement không trace hoặc test được thì không nên thành delivery commitment.",
      badBetter: [["Giữ draft AI trong chat và copy phần hay vào ticket", "Source, assumption và review trail biến mất.", "Ghi source ID, prompt context, reviewer, decision owner và artifact version."], ["Chỉ viết test cho happy path generated behavior", "AI feature fail ở edge case, low confidence và unsupported input.", "Trace từng requirement tới positive, negative, fallback và monitoring test."], ["Xem traceability là spreadsheet compliance", "Team điền field nhưng không dùng để manage risk.", "Dùng trace link trong refinement, QA planning, change impact và release decision."]]
    }
  },
  "brd-srs-and-decision-artifacts": {
    en: {
      why: "This lesson matters because AI can draft BRD and SRS sections quickly, but formal documents are not just text. They are records of decisions, scope boundaries, evidence, ownership, and change control. A BA must ensure AI-assisted documents preserve decision logic instead of producing polished pages that hide unresolved commitments.",
      expert: "Expert BA documentation separates narrative from decision artifacts. AI is useful for drafting, summarizing, and reorganizing, but it should not decide scope, acceptance, or policy. BRD and SRS outputs should include decision log references, source evidence, version history, open issues, and explicit approval checkpoints.",
      badBetter: [["Ask AI to create a complete BRD from notes", "The draft may invent decisions and make unresolved areas look approved.", "Generate a document skeleton plus decision gaps, evidence map, and open approval items."], ["Use polished wording to resolve stakeholder conflict", "Good prose can mask disagreement instead of escalating it.", "Represent conflicts explicitly with options, impact, owner, and decision date."], ["Remove assumptions to make the document cleaner", "Stakeholders lose visibility into what still needs validation.", "Keep assumptions, dependencies, and open questions in governed sections."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI có thể draft BRD và SRS rất nhanh, nhưng formal document không chỉ là text. Nó là record của decision, scope boundary, evidence, ownership và change control. BA phải bảo đảm document có AI hỗ trợ giữ được decision logic thay vì tạo trang bóng bẩy che giấu commitment chưa resolve.",
      expert: "Documentation BA chuyên gia tách narrative khỏi decision artifact. AI hữu ích cho drafting, summarizing và reorganizing, nhưng không được tự quyết scope, acceptance hoặc policy. Output BRD và SRS nên có decision log reference, source evidence, version history, open issue và approval checkpoint explicit.",
      badBetter: [["Yêu cầu AI tạo complete BRD từ notes", "Draft có thể invent decision và làm unresolved area trông như đã approve.", "Generate document skeleton kèm decision gap, evidence map và open approval item."], ["Dùng wording bóng bẩy để resolve stakeholder conflict", "Prose tốt có thể che disagreement thay vì escalate.", "Represent conflict explicit với option, impact, owner và decision date."], ["Xóa assumption để document sạch hơn", "Stakeholder mất visibility vào phần còn cần validation.", "Giữ assumption, dependency và open question trong section được governance."]]
    }
  },
  "diagramming-for-ba": {
    en: {
      why: "This lesson matters because diagrams expose reasoning that prose can hide. AI can create flowcharts, sequence diagrams, and state models quickly, but a diagram is valuable only when it reveals missing actors, unclear rules, system boundaries, and exception paths. The BA must use diagrams as analysis instruments, not visual decoration.",
      expert: "AI-generated diagrams should be reviewed like requirements. Expert BAs check notation fit, actor-system separation, decision labels, data movement, error paths, and whether the diagram answers a stakeholder question. Diagramming is especially powerful when the BA asks AI to generate competing views and then reconciles their differences.",
      badBetter: [["Generate one diagram and add it to the document", "A single view may hide timing, data, or responsibility issues.", "Create process, sequence, and state views when the problem crosses workflow and systems."], ["Accept diagram labels that are vague", "Decision diamonds like valid or approved do not define business rules.", "Replace vague labels with rule source, threshold, owner, or open question."], ["Use diagrams only for presentation", "The team misses the chance to find defects before build.", "Run diagram review sessions to identify gaps, exceptions, and ownership issues."]]
    },
    vi: {
      why: "Bài này quan trọng vì diagram phơi bày reasoning mà prose có thể che giấu. AI có thể tạo flowchart, sequence diagram và state model nhanh, nhưng diagram chỉ có giá trị khi nó làm lộ missing actor, unclear rule, system boundary và exception path. BA phải dùng diagram như analysis instrument, không phải visual decoration.",
      expert: "Diagram do AI sinh nên được review như requirement. BA chuyên gia check notation fit, tách actor-system, decision label, data movement, error path và diagram có trả lời câu hỏi stakeholder không. Diagramming mạnh nhất khi BA yêu cầu AI tạo nhiều view cạnh tranh rồi reconcile điểm khác nhau.",
      badBetter: [["Generate một diagram rồi thêm vào document", "Một view duy nhất có thể che timing, data hoặc responsibility issue.", "Tạo process, sequence và state view khi problem đi qua cả workflow và system."], ["Accept label diagram mơ hồ", "Decision diamond như valid hoặc approved không định nghĩa business rule.", "Thay label mơ hồ bằng rule source, threshold, owner hoặc open question."], ["Chỉ dùng diagram để presentation", "Team bỏ lỡ cơ hội tìm defect trước build.", "Chạy diagram review session để identify gap, exception và ownership issue."]]
    }
  },
  "specifying-ai-enabled-features": {
    en: {
      why: "This lesson matters because specifying an AI-enabled feature is different from specifying a deterministic screen or workflow. The BA must define task boundary, allowed input, output contract, confidence behavior, evaluation, human review, fallback, monitoring, and user messaging. Without those controls, the feature cannot be tested, trusted, or operated.",
      expert: "The expert BA treats the model as one component inside a product system. Requirements should cover data flow, prompt or retrieval context, model behavior constraints, evaluation dataset, acceptance thresholds, misuse cases, audit logs, and operational ownership. The user experience must communicate uncertainty honestly without creating unnecessary friction.",
      badBetter: [["Specify that the AI assistant should answer user questions", "The task boundary, allowed sources, refusal behavior, and quality bar are undefined.", "Define supported intents, source rules, output format, confidence thresholds, and unsupported-question handling."], ["Use demo examples as acceptance criteria", "Demo cases are usually optimistic and do not prove production readiness.", "Create curated evaluation cases covering common, edge, adversarial, and fallback scenarios."], ["Ignore post-launch monitoring", "AI behavior can drift as data, prompts, sources, or user behavior change.", "Specify monitoring events, quality metrics, review cadence, and owner response."]]
    },
    vi: {
      why: "Bài này quan trọng vì đặc tả AI-enabled feature khác với đặc tả screen hoặc workflow deterministic. BA phải định nghĩa task boundary, allowed input, output contract, confidence behavior, evaluation, human review, fallback, monitoring và user messaging. Thiếu các control này thì feature không test, trust hoặc operate được.",
      expert: "BA chuyên gia xem model là một component trong product system. Requirement nên cover data flow, prompt hoặc retrieval context, model behavior constraint, evaluation dataset, acceptance threshold, misuse case, audit log và operational ownership. UX phải communicate uncertainty trung thực mà không tạo friction không cần thiết.",
      badBetter: [["Đặc tả AI assistant should answer user questions", "Task boundary, allowed source, refusal behavior và quality bar đều chưa rõ.", "Định nghĩa supported intent, source rule, output format, confidence threshold và unsupported-question handling."], ["Dùng demo example làm acceptance criteria", "Demo case thường optimistic và không chứng minh production readiness.", "Tạo curated evaluation case gồm common, edge, adversarial và fallback scenario."], ["Bỏ qua monitoring sau launch", "AI behavior có thể drift khi data, prompt, source hoặc user behavior thay đổi.", "Đặc tả monitoring event, quality metric, review cadence và owner response."]]
    }
  },
  "human-in-the-loop-monitoring-and-fallback": {
    en: {
      why: "This lesson matters because human review is often written as a vague safeguard, then fails when operations need a real queue, SLA, decision rights, and audit trail. AI products need designed fallback and monitoring. The BA must specify what happens when confidence is low, risk is high, or evidence is missing.",
      expert: "Human-in-the-loop is an operating workflow, not a slogan. Expert requirements define trigger conditions, reviewer role, allowed actions, escalation, user messaging, correction capture, quality monitoring, and accountability. A fallback is successful when it preserves user trust and business safety, not when it hides that AI failed.",
      badBetter: [["Write that a human can review AI output", "There is no trigger, queue, role, SLA, or decision authority.", "Specify review triggers, routing, reviewer actions, SLA, audit record, and owner."], ["Use fallback messages that sound confident", "Users may not understand uncertainty or the next safe action.", "Explain limitation, provide safe next step, and route to support or manual process."], ["Monitor only uptime and latency", "The system can be available while producing low-quality or risky outputs.", "Track override rate, unsupported queries, error categories, drift signals, and review outcomes."]]
    },
    vi: {
      why: "Bài này quan trọng vì human review thường được viết như safeguard mơ hồ, rồi fail khi operation cần queue, SLA, decision right và audit trail thật. AI product cần fallback và monitoring được thiết kế. BA phải đặc tả điều gì xảy ra khi confidence thấp, risk cao hoặc evidence thiếu.",
      expert: "Human-in-the-loop là operating workflow, không phải slogan. Requirement chuyên gia định nghĩa trigger condition, reviewer role, allowed action, escalation, user messaging, correction capture, quality monitoring và accountability. Fallback thành công khi giữ được user trust và business safety, không phải khi che giấu AI đã fail.",
      badBetter: [["Viết rằng human can review AI output", "Không có trigger, queue, role, SLA hoặc decision authority.", "Đặc tả review trigger, routing, reviewer action, SLA, audit record và owner."], ["Dùng fallback message nghe quá tự tin", "User không hiểu uncertainty hoặc next safe action.", "Giải thích limitation, cung cấp next step an toàn và route sang support hoặc manual process."], ["Chỉ monitor uptime và latency", "System có thể available nhưng output vẫn low-quality hoặc risky.", "Track override rate, unsupported query, error category, drift signal và review outcome."]]
    }
  },
  "ai-strategy-governance-and-adoption": {
    en: {
      why: "This lesson matters because AI adoption at BA-team scale can improve quality and cycle time, but it can also spread inconsistent artifacts, data leakage, and false confidence. A BA lead needs an operating model: approved use cases, risk tiers, tool policy, prompt library, quality gates, training, metrics, and escalation paths.",
      expert: "AI governance should enable high-quality work, not freeze experimentation. Expert BA leadership defines low-risk workflows for productivity, medium-risk workflows with review gates, and high-risk workflows requiring formal approval. Adoption metrics should measure artifact quality, review defects, cycle time, stakeholder satisfaction, and avoided risk, not just tool usage.",
      badBetter: [["Roll out an AI tool to all BAs and call it adoption", "Usage increases without shared standards, safety rules, or quality evidence.", "Create risk-tiered workflows, approved tools, training, prompt library, and review gates."], ["Measure success by number of prompts or users", "Activity does not prove better requirements or safer decisions.", "Measure cycle time, defect reduction, evidence quality, rework, and stakeholder confidence."], ["Let every project invent its own AI rules", "Quality and compliance vary widely across teams.", "Establish a BA AI operating model with governance roles, audits, and escalation."]]
    },
    vi: {
      why: "Bài này quan trọng vì AI adoption ở scale BA team có thể cải thiện quality và cycle time, nhưng cũng có thể lan truyền artifact inconsistent, data leakage và false confidence. BA lead cần operating model: approved use case, risk tier, tool policy, prompt library, quality gate, training, metric và escalation path.",
      expert: "AI governance nên enable high-quality work, không đóng băng experimentation. BA leadership chuyên gia định nghĩa workflow low-risk để tăng productivity, workflow medium-risk có review gate và workflow high-risk cần formal approval. Metric adoption nên đo artifact quality, review defect, cycle time, stakeholder satisfaction và avoided risk, không chỉ tool usage.",
      badBetter: [["Roll out tool AI cho mọi BA rồi gọi là adoption", "Usage tăng nhưng thiếu standard chung, safety rule và quality evidence.", "Tạo workflow theo risk tier, approved tool, training, prompt library và review gate."], ["Đo success bằng số prompt hoặc số user", "Activity không chứng minh requirement tốt hơn hoặc decision an toàn hơn.", "Đo cycle time, defect reduction, evidence quality, rework và stakeholder confidence."], ["Để mỗi project tự invent AI rule", "Quality và compliance biến động lớn giữa team.", "Thiết lập BA AI operating model có governance role, audit và escalation."]]
    }
  }
};

function lessonUpgrade(slug, locale) {
  const upgrade = lessonUpgrades[slug]?.[locale];
  if (!upgrade) {
    throw new Error(`Missing lesson upgrade for ${locale}/${slug}`);
  }
  return upgrade;
}

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

function artifactTable(headers, rows) {
  return [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.join(" | ")} |`)
  ].join("\n");
}

function list(items) {
  return items.map((item) => `- ${item}`).join("\n");
}

function numbered(items) {
  return items.map((item, index) => `${index + 1}. ${item}`).join("\n");
}

const lessonVisualStories = {
  "ai-landscape-for-ba": {
    en: {
      eyebrow: "Story prototype",
      title: "Maya turns a chatbot request into an AI decision map",
      intro: "A sales director asks for an AI chatbot to approve quotes faster. Maya, the BA, slows the room down for ten minutes and changes the conversation from tool choice to business decision quality.",
      scenes: [
        ["Scene 1", "The request sounds simple", "The stakeholder says: we need a chatbot. Maya writes the real outcome on the board: reduce quote approval cycle time without increasing margin leakage."],
        ["Scene 2", "The pain is not one thing", "Approval delay comes from unclear pricing policy, missing risk signals, and managers searching email threads for precedent."],
        ["Scene 3", "The AI shape splits", "Policy questions need RAG, margin risk needs predictive signals, deterministic thresholds need rules, and explanation text may use GenAI."],
        ["Scene 4", "The BA changes the backlog", "The first backlog item is no longer build chatbot. It becomes an AI Pattern Fit Matrix with metrics, source authority, review gates, and a non-AI alternative."]
      ],
      mapTitle: "What the BA sees in the room",
      mapRows: [
        ["Signal", "Everyone names an AI interface before naming the decision.", "Ask what decision, metric, source, and failure mode the feature must improve."],
        ["Risk", "A chatbot could hide policy gaps behind confident text.", "Separate rules, retrieval, prediction, and generation before estimating."],
        ["Output", "The team needs an option map, not a vendor demo.", "Create pattern fit, data dependency, and anti-pattern notes."]
      ],
      takeaways: ["Problem shape before model choice", "Workflow evidence before automation", "Metric before demo"],
      facts: [
        {
          value: "23% + 39%",
          label: "Agentic AI is moving, but not mature everywhere",
          insight: "McKinsey's 2025 survey reports 23% of organizations scaling agents somewhere and 39% experimenting. BA read: define autonomy boundaries before calling a workflow agent-ready.",
          source: "McKinsey State of AI 2025",
          url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
        },
        {
          value: "74%",
          label: "AI is already affecting BA careers",
          insight: "IIBA reports 74% of business analysis respondents say AI is positively impacting their careers. BA read: AI literacy is becoming core professional capability, not an optional tool trick.",
          source: "IIBA Global State of BA 2025",
          url: "https://www.iiba.org/business-analysis-blogs/top-5-findings-from-the-2025-global-state-of-business-analysis-report/"
        },
        {
          value: "21%",
          label: "Value needs workflow redesign",
          insight: "McKinsey reports 21% of organizations using gen AI have fundamentally redesigned at least some workflows. BA read: benefits come from redesigned decisions and handoffs, not prompt volume.",
          source: "McKinsey State of AI 2025 PDF",
          url: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf"
        }
      ],
      diagram: `flowchart LR
    A["Stakeholder says: build a chatbot"] --> B["BA reframes: which decision must improve?"]
    B --> C{"Primary work type"}
    C --> D["Policy answer: RAG"]
    C --> E["Risk score: predictive AI"]
    C --> F["Approval threshold: rules"]
    C --> G["Explanation draft: GenAI"]
    D --> H["Pattern Fit Matrix"]
    E --> H
    F --> H
    G --> H
    H --> I["Backlog with metric, owner, evidence, and fallback"]`
    },
    vi: {
      eyebrow: "Prototype dạng story",
      title: "Maya biến yêu cầu chatbot thành bản đồ quyết định AI",
      intro: "Sales director yêu cầu một AI chatbot để duyệt báo giá nhanh hơn. Maya, BA của dự án, kéo cuộc thảo luận chậm lại mười phút và đổi trọng tâm từ chọn tool sang chất lượng quyết định kinh doanh.",
      scenes: [
        ["Cảnh 1", "Request nghe rất đơn giản", "Stakeholder nói: chúng ta cần chatbot. Maya viết outcome thật lên bảng: giảm quote approval cycle time mà không làm tăng margin leakage."],
        ["Cảnh 2", "Pain không chỉ có một điểm", "Approval chậm vì pricing policy chưa rõ, thiếu risk signal và manager phải lục email để tìm precedent."],
        ["Cảnh 3", "Hình dạng AI được tách ra", "Câu hỏi policy cần RAG, margin risk cần predictive signal, threshold ổn định cần rules, còn đoạn giải thích có thể dùng GenAI."],
        ["Cảnh 4", "BA đổi lại backlog", "Backlog item đầu tiên không còn là build chatbot. Nó trở thành AI Pattern Fit Matrix có metric, source authority, review gate và non-AI alternative."]
      ],
      mapTitle: "Điều BA nhìn thấy trong phòng họp",
      mapRows: [
        ["Signal", "Mọi người gọi tên AI interface trước khi gọi tên decision.", "Hỏi decision, metric, source và failure mode mà feature phải cải thiện."],
        ["Risk", "Chatbot có thể che policy gap bằng câu chữ tự tin.", "Tách rules, retrieval, prediction và generation trước khi estimate."],
        ["Output", "Team cần option map, không phải vendor demo.", "Tạo pattern fit, data dependency và anti-pattern notes."]
      ],
      takeaways: ["Problem shape trước model choice", "Workflow evidence trước automation", "Metric trước demo"],
      facts: [
        {
          value: "23% + 39%",
          label: "Agentic AI đang dịch chuyển, nhưng chưa mature ở mọi nơi",
          insight: "McKinsey 2025 ghi nhận 23% tổ chức đang scale AI agent ở đâu đó và 39% đang thử nghiệm. Góc nhìn BA: phải định nghĩa autonomy boundary trước khi gọi workflow là agent-ready.",
          source: "McKinsey State of AI 2025",
          url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai"
        },
        {
          value: "74%",
          label: "AI đã tác động trực tiếp tới nghề BA",
          insight: "IIBA ghi nhận 74% người tham gia khảo sát business analysis nói AI tác động tích cực tới career. Góc nhìn BA: AI literacy đang thành năng lực nghề nghiệp cốt lõi, không còn là mẹo dùng tool.",
          source: "IIBA Global State of BA 2025",
          url: "https://www.iiba.org/business-analysis-blogs/top-5-findings-from-the-2025-global-state-of-business-analysis-report/"
        },
        {
          value: "21%",
          label: "Value cần workflow redesign",
          insight: "McKinsey ghi nhận 21% tổ chức dùng gen AI đã redesign căn bản ít nhất một số workflow. Góc nhìn BA: benefit đến từ decision và handoff được thiết kế lại, không phải số lượng prompt.",
          source: "McKinsey State of AI 2025 PDF",
          url: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf"
        }
      ],
      diagram: `flowchart LR
    A["Stakeholder nói: build chatbot"] --> B["BA reframe: decision nào cần cải thiện?"]
    B --> C{"Loại công việc chính"}
    C --> D["Trả lời policy: RAG"]
    C --> E["Risk score: predictive AI"]
    C --> F["Approval threshold: rules"]
    C --> G["Draft giải thích: GenAI"]
    D --> H["Pattern Fit Matrix"]
    E --> H
    F --> H
    G --> H
    H --> I["Backlog có metric, owner, evidence và fallback"]`
    }
  },
  "llm-mental-model": {
    en: {
      eyebrow: "Story prototype",
      title: "A polished AI draft almost becomes a false requirement",
      intro: "Maya asks an LLM for acceptance criteria about exporting premium reports. The answer looks useful, but it quietly invents formats, limits, and permissions that nobody approved.",
      scenes: [
        ["Scene 1", "The draft looks ready", "The LLM writes clean Given-When-Then criteria. The team relaxes because the wording sounds professional."],
        ["Scene 2", "The hidden assumptions appear", "Maya highlights export format, file size, subscription tier, audit rule, and retention period. None of them came from a source."],
        ["Scene 3", "The prompt changes", "She gives the model source rules, examples, output schema, and the instruction to label unsupported claims."],
        ["Scene 4", "The artifact becomes reviewable", "The second draft separates facts, assumptions, and validation questions. QA can test it, and Product can approve real decisions."]
      ],
      mapTitle: "What the BA reviews before sharing AI output",
      mapRows: [
        ["Fact", "A statement has a source, decision owner, or cited rule.", "Keep it, but preserve the source ID."],
        ["Assumption", "The model inferred something plausible.", "Label it and assign a stakeholder validation question."],
        ["Unsupported claim", "The statement sounds useful but has no evidence.", "Remove it from scope until validated."]
      ],
      takeaways: ["Plausible is not approved", "Assumption labels protect scope", "Human review is a workflow"],
      facts: [
        {
          value: "46% vs 33%",
          label: "Trust gap is real in software teams",
          insight: "Stack Overflow's 2025 survey reports more developers distrust AI accuracy than trust it. BA read: treat AI output as a draft that needs evidence, not as a requirement source.",
          source: "Stack Overflow Developer Survey 2025",
          url: "https://survey.stackoverflow.co/2025/ai"
        },
        {
          value: "27%",
          label: "Only a minority review every gen AI output",
          insight: "McKinsey reports 27% of organizations using gen AI review all generated content before use, while a similar share review 20% or less. BA read: define review gates explicitly.",
          source: "McKinsey State of AI 2025 PDF",
          url: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf"
        },
        {
          value: "63%",
          label: "Governance gaps are common",
          insight: "IBM's 2025 breach report says 63% of organizations lacked AI governance policies for managing AI or shadow AI. BA read: clarify allowed use, data boundaries, and review ownership.",
          source: "IBM Cost of a Data Breach 2025",
          url: "https://www.ibm.com/reports/data-breach"
        }
      ],
      diagram: `sequenceDiagram
    participant BA as BA
    participant LLM as LLM draft
    participant Evidence as Source pack
    participant Team as Product/QA/Dev
    BA->>LLM: Draft criteria from vague request
    LLM-->>BA: Polished criteria with hidden assumptions
    BA->>Evidence: Add tiers, rules, examples, source IDs
    BA->>LLM: Redraft and label facts, assumptions, unsupported claims
    LLM-->>BA: Reviewable artifact
    BA->>Team: Validate decisions before backlog handoff`
    },
    vi: {
      eyebrow: "Prototype dạng story",
      title: "Một draft AI rất mượt suýt trở thành requirement sai",
      intro: "Maya yêu cầu LLM viết acceptance criteria cho việc premium users export report. Câu trả lời nhìn hữu ích, nhưng âm thầm tự bịa format, limit và permission chưa ai approve.",
      scenes: [
        ["Cảnh 1", "Draft nhìn như đã sẵn sàng", "LLM viết Given-When-Then rất sạch. Team thấy yên tâm vì wording nghe chuyên nghiệp."],
        ["Cảnh 2", "Assumption ẩn bắt đầu lộ ra", "Maya highlight export format, file size, subscription tier, audit rule và retention period. Không điều nào có source."],
        ["Cảnh 3", "Prompt được đổi lại", "Cô cung cấp source rule, example, output schema và instruction yêu cầu label unsupported claim."],
        ["Cảnh 4", "Artifact trở nên review được", "Draft thứ hai tách fact, assumption và validation question. QA test được, Product approve được decision thật."]
      ],
      mapTitle: "BA review gì trước khi chia sẻ output AI",
      mapRows: [
        ["Fact", "Statement có source, decision owner hoặc rule được cite.", "Giữ lại nhưng bảo toàn source ID."],
        ["Assumption", "Model suy luận điều nghe hợp lý.", "Label rõ và gắn câu hỏi cần stakeholder validate."],
        ["Unsupported claim", "Statement nghe hữu ích nhưng không có evidence.", "Loại khỏi scope cho tới khi được validate."]
      ],
      takeaways: ["Plausible không đồng nghĩa approved", "Label assumption để bảo vệ scope", "Human review là một workflow"],
      facts: [
        {
          value: "46% vs 33%",
          label: "Trust gap rất thật trong software team",
          insight: "Stack Overflow 2025 ghi nhận số developer không tin độ chính xác của AI cao hơn số người tin. Góc nhìn BA: xem output AI là draft cần evidence, không phải requirement source.",
          source: "Stack Overflow Developer Survey 2025",
          url: "https://survey.stackoverflow.co/2025/ai"
        },
        {
          value: "27%",
          label: "Chỉ một phần nhỏ review mọi output gen AI",
          insight: "McKinsey ghi nhận 27% tổ chức dùng gen AI review toàn bộ generated content trước khi dùng, trong khi tỷ lệ tương tự chỉ review 20% hoặc ít hơn. Góc nhìn BA: phải đặc tả review gate rõ ràng.",
          source: "McKinsey State of AI 2025 PDF",
          url: "https://www.mckinsey.com/~/media/mckinsey/business%20functions/quantumblack/our%20insights/the%20state%20of%20ai/2025/the-state-of-ai-how-organizations-are-rewiring-to-capture-value_final.pdf"
        },
        {
          value: "63%",
          label: "Governance gap vẫn phổ biến",
          insight: "IBM 2025 ghi nhận 63% tổ chức thiếu policy governance để quản lý AI hoặc shadow AI. Góc nhìn BA: làm rõ allowed use, data boundary và review ownership.",
          source: "IBM Cost of a Data Breach 2025",
          url: "https://www.ibm.com/reports/data-breach"
        }
      ],
      diagram: `sequenceDiagram
    participant BA as BA
    participant LLM as Draft từ LLM
    participant Evidence as Source pack
    participant Team as Product/QA/Dev
    BA->>LLM: Draft criteria từ request mơ hồ
    LLM-->>BA: Criteria mượt nhưng có assumption ẩn
    BA->>Evidence: Thêm tier, rule, example, source ID
    BA->>LLM: Redraft và label fact, assumption, unsupported claim
    LLM-->>BA: Artifact review được
    BA->>Team: Validate decision trước backlog handoff`
    }
  },
  "tokens-context-and-memory": {
    en: {
      eyebrow: "Story prototype",
      title: "The 70-page SRS that fooled a one-shot AI review",
      intro: "A team uploads a long SRS and asks AI to find every gap. The answer is confident and organized, but the missed integration rule sits quietly on page 54.",
      scenes: [
        ["Scene 1", "The one-shot review feels efficient", "The model returns a polished gap list in minutes. The team almost forwards it as discovery output."],
        ["Scene 2", "A late-page rule is missing", "Maya checks source coverage and notices the API exception section was compressed into a generic summary."],
        ["Scene 3", "Context becomes an artifact", "She creates source IDs, module chunks, freshness labels, and a decision log before asking for analysis."],
        ["Scene 4", "The second pass finds the real issue", "Cross-section reconciliation exposes a conflict between report export rules and integration retry behavior."]
      ],
      mapTitle: "How a BA turns long context into working memory",
      mapRows: [
        ["Source map", "Every document section has ID, owner, date, and authority.", "The model cannot silently skip the quiet sections."],
        ["Chunk plan", "Each module is reviewed with a focused question.", "Long context becomes inspectable work, not a shallow summary."],
        ["Reconciliation pass", "Findings are compared across modules and decisions.", "Conflicts become visible before delivery handoff."]
      ],
      takeaways: ["Context is an artifact", "Coverage beats one-shot speed", "Memory needs source IDs"],
      facts: [
        {
          value: "25%",
          label: "Teams lose time searching for answers",
          insight: "Atlassian's 2025 State of Teams survey reports leaders and teams waste 25% of their time searching for answers. BA read: source maps and decision logs are productivity controls.",
          source: "Atlassian State of Teams 2025",
          url: "https://www.atlassian.com/blog/state-of-teams-2025"
        },
        {
          value: "13% now, 34% soon",
          label: "Gen AI workload share is rising",
          insight: "McKinsey's workplace report says 13% of employees already use gen AI for more than 30% of daily tasks, and 34% expect to within less than a year. BA read: reusable context packs will matter more as usage scales.",
          source: "McKinsey AI in the Workplace 2025",
          url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work"
        },
        {
          value: "9.1 vs 6.3",
          label: "Expert delivery tracks more performance signals",
          insight: "PMI reports high business-acumen professionals use more project performance factors than peers. BA read: context packs should connect requirements to business measures, not only text summaries.",
          source: "PMI Pulse of the Profession 2025",
          url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/pulse_of_the_profession_2025-1.pdf"
        }
      ],
      diagram: `flowchart TD
    A["Long SRS + meeting notes"] --> B["Source map: IDs, owners, dates"]
    B --> C["Chunk plan by module"]
    C --> D["Focused AI review per chunk"]
    D --> E["Coverage check"]
    E --> F["Cross-section reconciliation"]
    F --> G["Gap, conflict, decision, and testability board"]
    G --> H["Delivery-ready context pack"]`
    },
    vi: {
      eyebrow: "Prototype dạng story",
      title: "Bản SRS 70 trang đánh lừa một lần review AI",
      intro: "Team upload SRS dài và yêu cầu AI tìm tất cả gap. Câu trả lời tự tin và có cấu trúc, nhưng rule integration bị miss vẫn nằm yên ở trang 54.",
      scenes: [
        ["Cảnh 1", "One-shot review nhìn rất hiệu quả", "Model trả về gap list gọn gàng chỉ sau vài phút. Team gần như gửi nó đi như discovery output."],
        ["Cảnh 2", "Rule ở phần cuối bị bỏ sót", "Maya check source coverage và thấy API exception section bị nén thành summary chung chung."],
        ["Cảnh 3", "Context trở thành artifact", "Cô tạo source ID, module chunk, freshness label và decision log trước khi yêu cầu analysis."],
        ["Cảnh 4", "Pass thứ hai tìm ra vấn đề thật", "Cross-section reconciliation làm lộ conflict giữa report export rule và integration retry behavior."]
      ],
      mapTitle: "BA biến long context thành working memory như thế nào",
      mapRows: [
        ["Source map", "Mỗi document section có ID, owner, date và authority.", "Model không thể âm thầm bỏ qua phần ít nổi bật."],
        ["Chunk plan", "Mỗi module được review bằng câu hỏi focused.", "Context dài trở thành work inspect được, không phải summary nông."],
        ["Reconciliation pass", "Finding được so sánh giữa module và decision.", "Conflict lộ ra trước delivery handoff."]
      ],
      takeaways: ["Context là artifact", "Coverage quan trọng hơn one-shot speed", "Memory cần source ID"],
      facts: [
        {
          value: "25%",
          label: "Team mất thời gian để tìm câu trả lời",
          insight: "Atlassian State of Teams 2025 ghi nhận leader và team lãng phí 25% thời gian chỉ để tìm answer. Góc nhìn BA: source map và decision log là productivity control.",
          source: "Atlassian State of Teams 2025",
          url: "https://www.atlassian.com/blog/state-of-teams-2025"
        },
        {
          value: "13% hiện tại, 34% sắp tới",
          label: "Tỷ trọng công việc dùng gen AI đang tăng",
          insight: "McKinsey workplace report cho biết 13% employee đã dùng gen AI cho hơn 30% daily task, và 34% kỳ vọng sẽ làm vậy trong chưa tới một năm. Góc nhìn BA: context pack tái sử dụng sẽ quan trọng hơn khi usage scale.",
          source: "McKinsey AI in the Workplace 2025",
          url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/superagency-in-the-workplace-empowering-people-to-unlock-ais-full-potential-at-work"
        },
        {
          value: "9.1 vs 6.3",
          label: "Expert delivery theo dõi nhiều performance signal hơn",
          insight: "PMI ghi nhận nhóm có business acumen cao dùng nhiều yếu tố đo project performance hơn peers. Góc nhìn BA: context pack nên nối requirement với business measure, không chỉ summary text.",
          source: "PMI Pulse of the Profession 2025",
          url: "https://www.pmi.org/-/media/pmi/documents/public/pdf/learning/thought-leadership/pulse/pulse_of_the_profession_2025-1.pdf"
        }
      ],
      diagram: `flowchart TD
    A["SRS dài + meeting notes"] --> B["Source map: ID, owner, date"]
    B --> C["Chunk plan theo module"]
    C --> D["AI review focused từng chunk"]
    D --> E["Coverage check"]
    E --> F["Cross-section reconciliation"]
    F --> G["Board gap, conflict, decision và testability"]
    G --> H["Context pack sẵn sàng delivery"]`
    }
  }
};

function lessonStoryVisual(lesson, locale) {
  const story = lessonVisualStories[lesson.slug]?.[locale];
  if (!story) {
    return "";
  }

  const storyHeading = locale === "en" ? "Story mode: project walkthrough" : "Story mode: walkthrough theo dự án";
  const factHeading = locale === "en" ? "Reality check: current facts for BAs" : "Reality check: số liệu hiện tại cho BA";
  const mapHeading = locale === "en" ? "Visual decision map" : "Bản đồ quyết định trực quan";
  const diagramHeading = locale === "en" ? "Visual walkthrough" : "Walkthrough trực quan";
  const sourceLabel = locale === "en" ? "Source" : "Nguồn";

  const scenes = story.scenes
    .map(
      ([label, title, body], index) => `<article class="story-scene">
  <span>${label}</span>
  <b>${String(index + 1).padStart(2, "0")}</b>
  <strong>${title}</strong>
  <p>${body}</p>
</article>`
    )
    .join("\n");

  const factCards = story.facts
    .map(
      (fact) => `<article class="fact-card">
  <strong>${fact.value}</strong>
  <span>${fact.label}</span>
  <p>${fact.insight}</p>
  <a href="${fact.url}">${sourceLabel}: ${fact.source}</a>
</article>`
    )
    .join("\n");

  const mapRows = story.mapRows
    .map(
      ([label, signal, action]) => `<div>
  <strong>${label}</strong>
  <span>${signal}</span>
  <em>${action}</em>
</div>`
    )
    .join("\n");

  const takeaways = story.takeaways.map((item) => `<span>${item}</span>`).join("\n");

  return `## ${storyHeading}

<div class="story-mode-panel">
  <p class="story-eyebrow">${story.eyebrow}</p>
  <h3>${story.title}</h3>
  <p class="story-intro">${story.intro}</p>
  <div class="story-scene-grid">
${scenes}
  </div>
  <div class="visual-takeaway-strip">
${takeaways}
  </div>
</div>

## ${factHeading}

<div class="fact-card-grid">
${factCards}
</div>

## ${diagramHeading}

\`\`\`mermaid
${story.diagram}
\`\`\`

## ${mapHeading}

<div class="visual-ba-map">
  <h3>${story.mapTitle}</h3>
${mapRows}
</div>`;
}

function diagram(slug, locale) {
  const en = locale === "en";
  const diagrams = {
    "ai-landscape-for-ba": en
      ? `flowchart TD
    A["Business problem"] --> B{"Primary job"}
    B --> C["Predict risk or outcome"]
    B --> D["Generate or transform content"]
    B --> E["Retrieve trusted knowledge"]
    B --> F["Automate deterministic workflow"]
    C --> C1["Predictive AI"]
    D --> D1["GenAI / LLM"]
    E --> E1["RAG"]
    F --> F1["Rules + orchestration"]`
      : `flowchart TD
    A["Business problem"] --> B{"Job chính là gì?"}
    B --> C["Dự đoán risk hoặc outcome"]
    B --> D["Generate hoặc transform content"]
    B --> E["Retrieve knowledge đáng tin"]
    B --> F["Automate workflow deterministic"]
    C --> C1["Predictive AI"]
    D --> D1["GenAI / LLM"]
    E --> E1["RAG"]
    F --> F1["Rules + orchestration"]`,
    "llm-mental-model": en
      ? `sequenceDiagram
    participant BA
    participant Context
    participant LLM
    participant Review
    BA->>Context: Provide goal, sources, rules
    Context->>LLM: Visible working memory
    LLM->>LLM: Predict and transform text
    LLM->>Review: Draft + assumptions
    Review->>BA: Validate facts, rules, decisions`
      : `sequenceDiagram
    participant BA
    participant Context
    participant LLM
    participant Review
    BA->>Context: Cung cấp goal, source, rule
    Context->>LLM: Working memory nhìn thấy được
    LLM->>LLM: Predict và transform text
    LLM->>Review: Draft + assumption
    Review->>BA: Validate fact, rule, decision`,
    "tokens-context-and-memory": en
      ? `flowchart LR
    A["Raw sources"] --> B["Source map"]
    B --> C["Chunk plan"]
    C --> D["Section review"]
    D --> E["Cross-section reconciliation"]
    E --> F["Requirement findings"]
    B --> G["Decision log"]
    G --> E`
      : `flowchart LR
    A["Raw sources"] --> B["Source map"]
    B --> C["Chunk plan"]
    C --> D["Review từng section"]
    D --> E["Reconcile cross-section"]
    E --> F["Requirement findings"]
    B --> G["Decision log"]
    G --> E`,
    "hallucination-and-source-grounding": en
      ? `flowchart BT
    A["Unsupported claim"] --> B["Reasoned inference"]
    B --> C["Stakeholder confirmation"]
    C --> D["Direct source evidence"]
    D --> E["Requirement-ready fact"]
    A --> F["Open question, not scope"]`
      : `flowchart BT
    A["Unsupported claim"] --> B["Reasoned inference"]
    B --> C["Stakeholder confirmation"]
    C --> D["Direct source evidence"]
    D --> E["Fact sẵn sàng thành requirement"]
    A --> F["Open question, không phải scope"]`,
    "embeddings-rag-and-knowledge": en
      ? `flowchart LR
    A["Approved sources"] --> B["Ingestion"]
    B --> C["Chunking + metadata"]
    C --> D["Embedding index"]
    Q["User question"] --> R["Retrieval"]
    D --> R
    R --> G["Generation"]
    G --> H["Answer with citation"]
    R --> F["Fallback when evidence is weak"]`
      : `flowchart LR
    A["Approved sources"] --> B["Ingestion"]
    B --> C["Chunking + metadata"]
    C --> D["Embedding index"]
    Q["User question"] --> R["Retrieval"]
    D --> R
    R --> G["Generation"]
    G --> H["Answer có citation"]
    R --> F["Fallback khi evidence yếu"]`,
    "discovery-with-ai": en
      ? `flowchart TD
    A["Business problem"] --> B["AI expands hypotheses"]
    B --> C["BA groups assumptions"]
    C --> D{"Risky or unknown?"}
    D -->|Yes| E["Validate in workshop"]
    D -->|No| F["Defer or document"]
    E --> G["Decision-ready insight"]`
      : `flowchart TD
    A["Business problem"] --> B["AI mở rộng hypothesis"]
    B --> C["BA group assumption"]
    C --> D{"Rủi ro hoặc chưa biết?"}
    D -->|Có| E["Validate trong workshop"]
    D -->|Không| F["Defer hoặc document"]
    E --> G["Insight sẵn sàng cho decision"]`,
    "stakeholder-interviews-and-synthesis": en
      ? `flowchart LR
    A["Stakeholder notes"] --> B["Themes"]
    A --> C["Confirmed facts"]
    A --> D["Contradictions"]
    A --> E["Open questions"]
    B --> F["Requirement candidates"]
    C --> F
    D --> G["Decision meeting"]
    E --> G`
      : `flowchart LR
    A["Stakeholder notes"] --> B["Theme"]
    A --> C["Confirmed fact"]
    A --> D["Contradiction"]
    A --> E["Open question"]
    B --> F["Requirement candidate"]
    C --> F
    D --> G["Decision meeting"]
    E --> G`,
    "user-stories-and-acceptance-criteria": en
      ? `flowchart LR
    A["Vague request"] --> B["Actor + goal + value"]
    B --> C["Business rules"]
    C --> D["User stories"]
    D --> E["Acceptance criteria"]
    E --> F["Negative + boundary cases"]
    F --> G["Development-ready story"]`
      : `flowchart LR
    A["Request mơ hồ"] --> B["Actor + goal + value"]
    B --> C["Business rules"]
    C --> D["User stories"]
    D --> E["Acceptance criteria"]
    E --> F["Negative + boundary cases"]
    F --> G["Story sẵn sàng dev"]`,
    "process-modeling-with-ai": en
      ? `flowchart TD
    A["Customer submits request"] --> B{"Documents complete?"}
    B -->|No| C["Request missing documents"]
    C --> A
    B -->|Yes| D{"Risk threshold exceeded?"}
    D -->|Yes| E["Manager review"]
    D -->|No| F["Auto approve"]
    E --> G["Notify customer"]
    F --> G`
      : `flowchart TD
    A["Customer submit request"] --> B{"Document đủ?"}
    B -->|Không| C["Yêu cầu bổ sung document"]
    C --> A
    B -->|Có| D{"Vượt risk threshold?"}
    D -->|Có| E["Manager review"]
    D -->|Không| F["Auto approve"]
    E --> G["Notify customer"]
    F --> G`,
    "context-engineering-patterns": en
      ? `flowchart TD
    A["Role"] --> H["Context package"]
    B["Business goal"] --> H
    C["Users + scope"] --> H
    D["Source IDs"] --> H
    E["Constraints"] --> H
    F["Output contract"] --> H
    G["Quality bar"] --> H
    H --> I["Reviewable AI output"]`
      : `flowchart TD
    A["Role"] --> H["Context package"]
    B["Business goal"] --> H
    C["User + scope"] --> H
    D["Source IDs"] --> H
    E["Constraint"] --> H
    F["Output contract"] --> H
    G["Quality bar"] --> H
    H --> I["AI output review được"]`,
    "review-loops-and-critique": en
      ? `flowchart LR
    A["Draft"] --> B["Critique by QA"]
    B --> C["Critique by Dev"]
    C --> D["Critique by Ops"]
    D --> E["Evidence check"]
    E --> F{"Revision needed?"}
    F -->|Yes| A
    F -->|No| G["Stakeholder validation"]`
      : `flowchart LR
    A["Draft"] --> B["Critique bởi QA"]
    B --> C["Critique bởi Dev"]
    C --> D["Critique bởi Ops"]
    D --> E["Evidence check"]
    E --> F{"Cần revise?"}
    F -->|Có| A
    F -->|Không| G["Stakeholder validation"]`,
    "structured-outputs-and-reusable-prompts": en
      ? `flowchart TD
    A["Reusable prompt"] --> B["Input scope"]
    A --> C["Output schema"]
    A --> D["Constraints"]
    A --> E["Review rule"]
    B --> F["Traceable table"]
    C --> F
    D --> F
    E --> F`
      : `flowchart TD
    A["Reusable prompt"] --> B["Input scope"]
    A --> C["Output schema"]
    A --> D["Constraint"]
    A --> E["Review rule"]
    B --> F["Traceable table"]
    C --> F
    D --> F
    E --> F`,
    "ambiguity-conflict-and-gap-analysis": en
      ? `flowchart TD
    A["Requirement text"] --> B{"Defect type"}
    B --> C["Ambiguity"]
    B --> D["Conflict"]
    B --> E["Missing rule"]
    B --> F["Non-testable"]
    C --> G["Clarification question"]
    D --> G
    E --> G
    F --> G
    G --> H["Testable rewrite"]`
      : `flowchart TD
    A["Requirement text"] --> B{"Defect type"}
    B --> C["Ambiguity"]
    B --> D["Conflict"]
    B --> E["Missing rule"]
    B --> F["Non-testable"]
    C --> G["Clarification question"]
    D --> G
    E --> G
    F --> G
    G --> H["Rewrite test được"]`,
    "non-functional-requirements-and-risk": en
      ? `flowchart LR
    A["Feature"] --> B["Data sensitivity"]
    A --> C["Usage volume"]
    A --> D["Failure cost"]
    B --> E["NFR priority"]
    C --> E
    D --> E
    E --> F["Measurable quality requirement"]`
      : `flowchart LR
    A["Feature"] --> B["Data sensitivity"]
    A --> C["Usage volume"]
    A --> D["Failure cost"]
    B --> E["NFR priority"]
    C --> E
    D --> E
    E --> F["Quality requirement đo được"]`,
    "traceability-and-testability": en
      ? `flowchart LR
    A["Business objective"] --> B["Stakeholder need"]
    B --> C["Requirement"]
    C --> D["Acceptance criteria"]
    D --> E["Test scenario"]
    E --> F["Metric"]
    C --> G["Source evidence"]`
      : `flowchart LR
    A["Business objective"] --> B["Stakeholder need"]
    B --> C["Requirement"]
    C --> D["Acceptance criteria"]
    D --> E["Test scenario"]
    E --> F["Metric"]
    C --> G["Source evidence"]`,
    "brd-srs-and-decision-artifacts": en
      ? `flowchart TD
    A["Workshop notes"] --> B["Decision log"]
    A --> C["Scope boundary"]
    A --> D["Assumptions"]
    A --> E["Open questions"]
    B --> F["BRD / SRS section"]
    C --> F
    D --> F
    E --> G["Follow-up plan"]`
      : `flowchart TD
    A["Workshop notes"] --> B["Decision log"]
    A --> C["Scope boundary"]
    A --> D["Assumption"]
    A --> E["Open question"]
    B --> F["BRD / SRS section"]
    C --> F
    D --> F
    E --> G["Follow-up plan"]`,
    "diagramming-for-ba": en
      ? `flowchart TD
    A["BA question"] --> B{"What must be clarified?"}
    B --> C["Workflow -> Flowchart"]
    B --> D["System interaction -> Sequence"]
    B --> E["Lifecycle -> State"]
    B --> F["Rule combinations -> Decision table"]
    C --> G["Review gaps"]
    D --> G
    E --> G
    F --> G`
      : `flowchart TD
    A["Câu hỏi BA"] --> B{"Cần clarify gì?"}
    B --> C["Workflow -> Flowchart"]
    B --> D["System interaction -> Sequence"]
    B --> E["Lifecycle -> State"]
    B --> F["Rule combinations -> Decision table"]
    C --> G["Review gap"]
    D --> G
    E --> G
    F --> G`,
    "specifying-ai-enabled-features": en
      ? `flowchart LR
    A["User goal"] --> B["Allowed inputs"]
    B --> C["AI task"]
    C --> D["Output contract"]
    D --> E{"Confidence threshold"}
    E -->|High| F["User action"]
    E -->|Low| G["Human review / fallback"]
    F --> H["Monitoring"]
    G --> H`
      : `flowchart LR
    A["User goal"] --> B["Allowed inputs"]
    B --> C["AI task"]
    C --> D["Output contract"]
    D --> E{"Confidence threshold"}
    E -->|High| F["User action"]
    E -->|Low| G["Human review / fallback"]
    F --> H["Monitoring"]
    G --> H`,
    "human-in-the-loop-monitoring-and-fallback": en
      ? `flowchart TD
    A["AI output"] --> B{"Risk or low confidence?"}
    B -->|No| C["Proceed with user action"]
    B -->|Yes| D["Review queue"]
    D --> E["Human decision"]
    E --> F["Audit + correction capture"]
    F --> G["Model quality monitoring"]
    B -->|Unsupported| H["Fallback message + escalation"]`
      : `flowchart TD
    A["AI output"] --> B{"Risk hoặc confidence thấp?"}
    B -->|Không| C["Proceed với user action"]
    B -->|Có| D["Review queue"]
    D --> E["Human decision"]
    E --> F["Audit + correction capture"]
    F --> G["Model quality monitoring"]
    B -->|Unsupported| H["Fallback message + escalation"]`,
    "ai-strategy-governance-and-adoption": en
      ? `flowchart TD
    A["Use-case portfolio"] --> B["Risk tiers"]
    B --> C["Approved tools + data rules"]
    C --> D["Prompt library + playbooks"]
    D --> E["Quality gates"]
    E --> F["Metrics"]
    F --> G["Adoption roadmap"]
    B --> H["Escalation path"]`
      : `flowchart TD
    A["Use-case portfolio"] --> B["Risk tiers"]
    B --> C["Approved tools + data rules"]
    C --> D["Prompt library + playbook"]
    D --> E["Quality gates"]
    E --> F["Metrics"]
    F --> G["Adoption roadmap"]
    B --> H["Escalation path"]`
  };

  return diagrams[slug];
}

const lessonSectionProfiles = {
  foundation: {
    en: {
      evidencePressure: "stakeholders expect a simple AI answer while the actual issue depends on model capability, data readiness, tool boundaries, and business decision risk",
      applicationMoment: "an AI idea first enters discovery, vendor discussion, roadmap planning, or feasibility analysis",
      missingImpact: "the team may choose a tool before understanding the problem shape, creating expensive automation that does not match the business outcome",
      reviewLens: "problem fit, model boundary, data dependency, and decision risk",
      artifactReady: "solution-shape decision",
      control: "ask the model to compare AI and non-AI options before drafting requirements"
    },
    vi: {
      evidencePressure: "stakeholder muốn câu trả lời AI thật đơn giản trong khi vấn đề thật phụ thuộc vào capability của model, data readiness, boundary của tool và risk của business decision",
      applicationMoment: "một AI idea mới đi vào discovery, vendor discussion, roadmap planning hoặc feasibility analysis",
      missingImpact: "team có thể chọn tool trước khi hiểu problem shape, tạo automation tốn kém nhưng không khớp business outcome",
      reviewLens: "problem fit, model boundary, data dependency và decision risk",
      artifactReady: "solution-shape decision",
      control: "yêu cầu model so sánh option AI và non-AI trước khi draft requirement"
    }
  },
  workflow: {
    en: {
      evidencePressure: "messy notes, half-validated decisions, and incomplete stakeholder context must become a shared artifact quickly",
      applicationMoment: "discovery or refinement produces more raw input than the BA can safely synthesize by hand in the available time",
      missingImpact: "important signals from interviews, tickets, process notes, or decisions may be lost before they reach the backlog",
      reviewLens: "source attribution, conflict visibility, workshop decision flow, and backlog readiness",
      artifactReady: "validated working artifact",
      control: "keep speaker/source attribution visible until the responsible stakeholder confirms meaning"
    },
    vi: {
      evidencePressure: "notes lộn xộn, decision mới validate một phần và stakeholder context chưa đầy đủ phải nhanh chóng thành artifact chung",
      applicationMoment: "discovery hoặc refinement tạo nhiều raw input hơn mức BA có thể synthesize an toàn bằng tay trong thời gian có sẵn",
      missingImpact: "signal quan trọng từ interview, ticket, process note hoặc decision có thể mất trước khi đi vào backlog",
      reviewLens: "source attribution, conflict visibility, workshop decision flow và backlog readiness",
      artifactReady: "validated working artifact",
      control: "giữ speaker/source attribution visible cho đến khi stakeholder chịu trách nhiệm xác nhận ý nghĩa"
    }
  },
  collaboration: {
    en: {
      evidencePressure: "AI can draft quickly, but reviewers need repeatable context, structured output, and critique rules to trust the result",
      applicationMoment: "a BA team wants reusable AI collaboration patterns instead of one-off prompts that depend on individual habit",
      missingImpact: "outputs vary by person, assumptions stay hidden, and review quality depends on who happened to write the prompt",
      reviewLens: "context package quality, prompt reuse, critique loop, and output contract",
      artifactReady: "repeatable collaboration pattern",
      control: "separate context preparation, generation, critique, and human approval into visible steps"
    },
    vi: {
      evidencePressure: "AI có thể draft rất nhanh, nhưng reviewer cần context lặp lại được, structured output và critique rule để tin kết quả",
      applicationMoment: "BA team muốn pattern AI collaboration tái sử dụng thay vì prompt one-off phụ thuộc thói quen từng người",
      missingImpact: "output thay đổi theo từng người, assumption bị ẩn và chất lượng review phụ thuộc vào ai viết prompt",
      reviewLens: "context package quality, prompt reuse, critique loop và output contract",
      artifactReady: "repeatable collaboration pattern",
      control: "tách context preparation, generation, critique và human approval thành các bước visible"
    }
  },
  requirements: {
    en: {
      evidencePressure: "business rules, edge cases, quality attributes, and testability constraints must survive the move from conversation into backlog",
      applicationMoment: "requirements are being refined, split, clarified, tested, or challenged by QA and delivery teams",
      missingImpact: "requirements may look complete but still fail implementation, testing, release readiness, or operational support",
      reviewLens: "ambiguity, NFR risk, traceability, testability, and rule ownership",
      artifactReady: "delivery-ready requirement",
      control: "force every requirement statement to expose actor, trigger, data, rule, exception, and verification signal"
    },
    vi: {
      evidencePressure: "business rule, edge case, quality attribute và testability constraint phải sống sót khi chuyển từ conversation sang backlog",
      applicationMoment: "requirement đang được refine, split, clarify, test hoặc bị QA và delivery team challenge",
      missingImpact: "requirement nhìn có vẻ đầy đủ nhưng vẫn fail khi implement, test, release hoặc support operation",
      reviewLens: "ambiguity, NFR risk, traceability, testability và rule ownership",
      artifactReady: "delivery-ready requirement",
      control: "buộc mọi requirement statement lộ rõ actor, trigger, data, rule, exception và verification signal"
    }
  },
  artifacts: {
    en: {
      evidencePressure: "the BA must translate complex decisions into artifacts that product, engineering, QA, support, and compliance can all inspect",
      applicationMoment: "BRD, SRS, decision memo, flow, sequence, or integration artifact must carry decisions across roles",
      missingImpact: "handoffs become interpretation exercises, and teams re-argue decisions that should have been captured in the artifact",
      reviewLens: "artifact purpose, audience, diagram clarity, decision trace, and handoff quality",
      artifactReady: "cross-functional handoff artifact",
      control: "review the artifact with the team that must build, test, or operate from it"
    },
    vi: {
      evidencePressure: "BA phải chuyển decision phức tạp thành artifact mà product, engineering, QA, support và compliance đều inspect được",
      applicationMoment: "BRD, SRS, decision memo, flow, sequence hoặc integration artifact phải carry decision qua nhiều role",
      missingImpact: "handoff biến thành bài tập diễn giải, và các team tranh luận lại decision lẽ ra đã được capture trong artifact",
      reviewLens: "artifact purpose, audience, diagram clarity, decision trace và handoff quality",
      artifactReady: "cross-functional handoff artifact",
      control: "review artifact với team phải build, test hoặc operate dựa trên artifact đó"
    }
  },
  products: {
    en: {
      evidencePressure: "AI product behavior contains uncertainty, safety boundaries, evaluation design, fallback, monitoring, and user trust concerns",
      applicationMoment: "the BA is specifying a feature where AI output changes user action, operational workload, or customer experience",
      missingImpact: "the feature may ship without clear confidence rules, human review triggers, fallback paths, or monitoring events",
      reviewLens: "AI task boundary, evaluation set, human review, fallback, telemetry, and harm controls",
      artifactReady: "AI feature operating contract",
      control: "make confidence, refusal, escalation, correction capture, and monitoring part of the requirement"
    },
    vi: {
      evidencePressure: "hành vi AI product có uncertainty, safety boundary, evaluation design, fallback, monitoring và user trust concern",
      applicationMoment: "BA đang đặc tả feature mà output AI làm thay đổi user action, operational workload hoặc customer experience",
      missingImpact: "feature có thể release mà thiếu confidence rule, human review trigger, fallback path hoặc monitoring event rõ ràng",
      reviewLens: "AI task boundary, evaluation set, human review, fallback, telemetry và harm control",
      artifactReady: "AI feature operating contract",
      control: "đưa confidence, refusal, escalation, correction capture và monitoring vào requirement"
    }
  },
  lead: {
    en: {
      evidencePressure: "individual productivity gains must become a team operating model with governance, adoption metrics, and practical risk controls",
      applicationMoment: "BA leaders need to scale AI use across people, tools, project types, and governance expectations",
      missingImpact: "AI usage becomes inconsistent, risky, hard to audit, and difficult to improve across the BA practice",
      reviewLens: "portfolio fit, policy, quality gates, adoption metrics, training, and escalation model",
      artifactReady: "BA practice operating model",
      control: "tier AI use cases by sensitivity, decision impact, evidence quality, and human review requirement"
    },
    vi: {
      evidencePressure: "productivity gain của từng cá nhân phải trở thành operating model của team với governance, adoption metric và risk control thực tế",
      applicationMoment: "BA lead cần scale cách dùng AI qua nhiều người, tool, loại project và expectation governance",
      missingImpact: "việc dùng AI trở nên thiếu nhất quán, rủi ro, khó audit và khó cải tiến ở cấp BA practice",
      reviewLens: "portfolio fit, policy, quality gate, adoption metric, training và escalation model",
      artifactReady: "BA practice operating model",
      control: "tier use case AI theo sensitivity, decision impact, evidence quality và human review requirement"
    }
  }
};

function lessonSectionProfile(section, locale) {
  return lessonSectionProfiles[section]?.[locale] ?? lessonSectionProfiles.foundation[locale];
}

function lessonProjectMoment(index, section, isEn) {
  const moments = {
    foundation: isEn ? ["Idea intake", "Feasibility review", "Solution framing"] : ["Idea intake", "Feasibility review", "Solution framing"],
    workflow: isEn ? ["Discovery", "Synthesis", "Refinement"] : ["Discovery", "Synthesis", "Refinement"],
    collaboration: isEn ? ["Context setup", "Prompt reuse", "Peer review"] : ["Context setup", "Prompt reuse", "Peer review"],
    requirements: isEn ? ["Backlog refinement", "QA alignment", "Release readiness"] : ["Backlog refinement", "QA alignment", "Release readiness"],
    artifacts: isEn ? ["Artifact drafting", "Diagram review", "Handoff"] : ["Artifact drafting", "Diagram review", "Handoff"],
    products: isEn ? ["AI behavior design", "Evaluation planning", "Operations handoff"] : ["AI behavior design", "Evaluation planning", "Operations handoff"],
    lead: isEn ? ["Portfolio review", "Governance design", "Practice rollout"] : ["Portfolio review", "Governance design", "Practice rollout"]
  };
  return moments[section]?.[index] ?? (isEn ? "Delivery" : "Delivery");
}

function lessonDifficultyReason(item, profile, mistake, index, isEn) {
  const options = isEn
    ? [
        `The mistake "${mistake}" appears when the team discusses ${profile.reviewLens} without agreeing which source is authoritative. AI can smooth over the disagreement, so the BA must keep uncertainty visible.`,
        `For ${item.title}, the friction is that ${item.focus.replace(/\.$/, "")}. The weak pattern is tempting because AI can produce a fluent answer before the BA has checked ownership, source freshness, or decision rights.`,
        `This becomes hard when ${item.artifactTitle} is expected to support the ${profile.artifactReady}. If the BA does not challenge the draft, unsupported assumptions may enter planning, testing, or stakeholder communication.`
      ]
    : [
        `Lỗi "${mistake}" xuất hiện khi team bàn về ${profile.reviewLens} nhưng chưa thống nhất source nào authoritative. AI có thể làm disagreement nghe mượt hơn, nên BA phải giữ uncertainty visible.`,
        `Với ${item.title}, điểm khó là ${item.focus.replace(/\.$/, "")}. Pattern yếu rất dễ xảy ra vì AI có thể tạo câu trả lời trôi chảy trước khi BA check ownership, source freshness hoặc decision right.`,
        `Điểm này khó khi ${item.artifactTitle} được kỳ vọng hỗ trợ ${profile.artifactReady}. Nếu BA không challenge draft, unsupported assumption có thể đi vào planning, testing hoặc stakeholder communication.`
      ];
  return options[index % options.length];
}

function lessonDifficultyControl(item, profile, upgrade, index, isEn) {
  const strongerPattern = upgrade.badBetter[index]?.[2] ?? item.tomorrow[index] ?? profile.control;
  return isEn
    ? `Apply this control: ${profile.control}. Then use the stronger pattern "${strongerPattern}" and ask who must approve the artifact before it affects scope, build, test, or release.`
    : `Áp dụng control này: ${profile.control}. Sau đó dùng pattern tốt hơn "${strongerPattern}" và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release.`;
}

function lessonConcreteOutput(item, profile, action, index, isEn) {
  const reviewTarget = [profile.reviewLens, "source evidence", "decision owner"][index] ?? profile.reviewLens;
  return isEn
    ? `${item.artifactTitle} showing ${reviewTarget}, with the action "${action}" translated into a reviewable decision, requirement, checklist, or question for the next meeting.`
    : `${item.artifactTitle} thể hiện ${reviewTarget}, trong đó action "${action}" được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo.`;
}

function lessonRecoveryAction(item, profile, better, isEn) {
  return isEn
    ? `Recover by using the stronger pattern: ${better} Rework ${item.artifactTitle} until it exposes ${profile.reviewLens}, and do not share it as final until evidence, ownership, and validation path are explicit.`
    : `Khôi phục bằng pattern tốt hơn: ${better} Rework ${item.artifactTitle} cho đến khi nó lộ rõ ${profile.reviewLens}, và không share như bản final cho tới khi evidence, ownership và validation path explicit.`;
}

function lessonPracticalSections(lesson, locale, upgrade) {
  const item = lesson[locale];
  const isEn = locale === "en";
  const [sectionEn, sectionVi] = sections[lesson.section];
  const sectionName = isEn ? sectionEn : sectionVi;
  const profile = lessonSectionProfile(lesson.section, locale);
  const difficultyHeaders = isEn
    ? ["Difficulty", "Why it is hard in BA work", "How a BA should handle it"]
    : ["Khó khăn", "Vì sao khó trong công việc BA", "BA nên xử lý thế nào"];
  const applicationHeaders = isEn
    ? ["Project moment", "How to apply this lesson", "Concrete BA output"]
    : ["Thời điểm trong dự án", "Cách áp dụng bài học", "Output cụ thể của BA"];
  const missingHeaders = isEn
    ? ["If missing", "Project impact", "Recovery action"]
    : ["Nếu thiếu", "Ảnh hưởng tới dự án", "Cách khôi phục"];

  const difficulties = item.mistakes.slice(0, 3).map((mistake, index) => [
    mistake,
    lessonDifficultyReason(item, profile, mistake, index, isEn),
    lessonDifficultyControl(item, profile, upgrade, index, isEn)
  ]);

  const applications = item.tomorrow.slice(0, 3).map((action, index) => [
    lessonProjectMoment(index, lesson.section, isEn),
    action,
    lessonConcreteOutput(item, profile, action, index, isEn)
  ]);

  const missing = upgrade.badBetter.map(([weak, why, better]) => [
    weak,
    why,
    lessonRecoveryAction(item, profile, better, isEn)
  ]);

  return {
    difficulties: `${isEn ? `In ${sectionName}, ${item.title} becomes difficult when ${profile.evidencePressure}. A BA should inspect the points below before treating an AI-supported artifact as ready for stakeholder decision or delivery handoff.` : `Trong ${sectionName}, ${item.title} trở nên khó khi ${profile.evidencePressure}. BA nên kiểm tra các điểm dưới đây trước khi xem artifact có AI hỗ trợ là đủ sẵn sàng cho stakeholder decision hoặc handoff.`}

${artifactTable(difficultyHeaders, difficulties)}`,
    applications: `${isEn ? `Use this lesson when ${profile.applicationMoment}. The practical output is not a longer document; it is ${item.artifactTitle} with enough evidence, ownership, and decision clarity for the next project conversation.` : `Dùng bài này khi ${profile.applicationMoment}. Output thực tế không phải document dài hơn; đó là ${item.artifactTitle} có đủ evidence, ownership và decision clarity cho cuộc trao đổi tiếp theo của dự án.`}

${artifactTable(applicationHeaders, applications)}`,
    missing: `${isEn ? `If ${item.title} is missing, ${profile.missingImpact}. The BA can still recover, but only by converting the polished AI draft back into explicit evidence, assumptions, owners, and testable decisions.` : `Nếu thiếu ${item.title}, ${profile.missingImpact}. BA vẫn có thể khôi phục, nhưng phải chuyển draft AI bóng bẩy trở lại thành evidence, assumption, owner và decision test được.`}

${artifactTable(missingHeaders, missing)}`
  };
}

function seniorBaPracticePack(lesson, locale, upgrade) {
  const item = lesson[locale];
  const isEn = locale === "en";
  const profile = lessonSectionProfile(lesson.section, locale);
  const keyMistake = item.mistakes[0];
  const keyAction = item.tomorrow[0];
  const keyRemember = item.remember[0];
  const keyRememberClause = cleanClause(keyRemember);
  const strongerPattern = upgrade.badBetter[0]?.[2] ?? profile.control;

  const questionHeaders = isEn
    ? ["Stakeholder", "Question", "Why the BA asks it"]
    : ["Stakeholder", "Câu hỏi", "Vì sao BA hỏi"];
  const stakeholderRows = isEn
    ? [
        ["Product owner", `Which outcome should ${item.title} improve, and what trade-off are you willing to accept?`, "Prevents AI output from optimizing for a vague goal."],
        ["Engineering lead", `What source, system, data, or constraint would make ${item.artifactTitle} hard to implement?`, "Turns hidden technical constraints into visible requirement questions."],
        ["QA lead", `Which rule, exception, or user state must be testable before you trust this artifact?`, "Converts fluent AI wording into observable behavior."],
        ["Operations or support", `What failure path would create manual work if the lesson principle "${keyRememberClause}" is ignored?`, "Surfaces support load, exception handling, and operating impact."]
      ]
    : [
        ["Product owner", `${item.title} cần cải thiện outcome nào, và trade-off nào có thể chấp nhận?`, "Ngăn output AI tối ưu cho mục tiêu mơ hồ."],
        ["Engineering lead", `Source, system, data hoặc constraint nào khiến ${item.artifactTitle} khó implement?`, "Biến technical constraint ẩn thành requirement question visible."],
        ["QA lead", `Rule, exception hoặc user state nào phải test được trước khi tin artifact này?`, "Chuyển wording trôi chảy của AI thành behavior quan sát được."],
        ["Operations hoặc support", `Failure path nào tạo manual work nếu nguyên tắc "${keyRememberClause}" bị bỏ qua?`, "Làm rõ support load, exception handling và operating impact."]
      ];

  const decisionHeaders = isEn
    ? ["Decision item", "Options to capture", "Owner", "Evidence needed"]
    : ["Decision item", "Option cần capture", "Owner", "Evidence cần có"];
  const decisionRows = isEn
    ? [
        [`Scope boundary for ${item.artifactTitle}`, "Must-have, later, out of scope", "Product owner", "Business outcome and release constraint"],
        [`Authority for ${profile.reviewLens}`, "Documented source, stakeholder decision, assumption to validate", "BA + accountable stakeholder", "Source ID, date, and approval status"],
        [`Review gate before handoff`, "Peer review, QA review, engineering review, formal approval", "BA lead or project lead", "Risk level and receiving-team readiness"],
        [`Recovery if ${keyMistake}`, "Rewrite, defer, escalate, or run validation workshop", "Decision owner", "Impact on scope, testability, and release risk"]
      ]
    : [
        [`Scope boundary cho ${item.artifactTitle}`, "Must-have, later, out of scope", "Product owner", "Business outcome và release constraint"],
        [`Authority cho ${profile.reviewLens}`, "Documented source, stakeholder decision, assumption cần validate", "BA + stakeholder chịu trách nhiệm", "Source ID, date và approval status"],
        ["Review gate trước handoff", "Peer review, QA review, engineering review, formal approval", "BA lead hoặc project lead", "Risk level và receiving-team readiness"],
        [`Cách recover nếu ${keyMistake}`, "Rewrite, defer, escalate hoặc validation workshop", "Decision owner", "Impact lên scope, testability và release risk"]
      ];

  const readyDoneHeaders = isEn
    ? ["Gate", "Ready signal", "Done signal"]
    : ["Gate", "Tín hiệu ready", "Tín hiệu done"];
  const readyDoneRows = isEn
    ? [
        ["Definition of Ready", `Sources for ${profile.reviewLens} are labeled and current.`, `${item.artifactTitle} can be reviewed without guessing missing context.`],
        ["Definition of Ready", "Open assumptions have owners and validation paths.", "Stakeholders can decide whether to accept, reject, or defer each assumption."],
        ["Definition of Done", `The artifact applies this control: ${profile.control}.`, "Delivery, QA, or governance teams can act on the artifact."],
        ["Definition of Done", `The weak pattern "${keyMistake}" has been explicitly checked.`, "No unsupported AI claim is treated as an approved requirement."]
      ]
    : [
        ["Definition of Ready", `Source cho ${profile.reviewLens} được label và còn hiệu lực.`, `${item.artifactTitle} có thể review mà không phải đoán missing context.`],
        ["Definition of Ready", "Open assumption có owner và validation path.", "Stakeholder có thể accept, reject hoặc defer từng assumption."],
        ["Definition of Done", `Artifact áp dụng control: ${profile.control}.`, "Delivery, QA hoặc governance team có thể hành động dựa trên artifact."],
        ["Definition of Done", `Pattern yếu "${keyMistake}" đã được kiểm tra explicit.`, "Không unsupported AI claim nào bị xem như requirement đã approve."]
      ];

  const beforeAfterHeaders = isEn
    ? ["Before", "AI draft risk", "Senior BA revision"]
    : ["Before", "Risk trong draft AI", "Revision của senior BA"];
  const beforeAfterRows = isEn
    ? [
        [`Prompt: "Create ${item.artifactTitle} for ${item.title}."`, "The model may invent source facts, owners, thresholds, or implementation rules.", `Add sources, scope boundary, source authority, output schema, and the instruction: ${strongerPattern}`],
        [`Draft statement: "${keyAction}"`, "Useful action, but not yet tied to a decision owner or acceptance signal.", `Rewrite as a project step with owner, expected artifact, review gate, and evidence required before handoff.`],
        [`Final-looking paragraph about ${profile.artifactReady}`, "The tone may hide uncertainty and missing stakeholder approval.", "Convert it into a table of fact, assumption, decision needed, risk, and validation question."]
      ]
    : [
        [`Prompt: "Create ${item.artifactTitle} cho ${item.title}."`, "Model có thể tự bịa source fact, owner, threshold hoặc implementation rule.", `Thêm source, scope boundary, source authority, output schema và instruction: ${strongerPattern}`],
        [`Draft statement: "${keyAction}"`, "Action hữu ích nhưng chưa gắn decision owner hoặc acceptance signal.", "Rewrite thành project step có owner, expected artifact, review gate và evidence cần trước handoff."],
        [`Paragraph nghe final về ${profile.artifactReady}`, "Tone có thể che uncertainty và approval còn thiếu.", "Chuyển thành bảng fact, assumption, decision needed, risk và validation question."]
      ];

  const verificationHeaders = isEn
    ? ["Verification lens", "Manual check", "Pass signal"]
    : ["Lens kiểm tra", "Manual check", "Pass signal"];
  const verificationRows = isEn
    ? [
        ["Evidence", `Trace every important statement in ${item.artifactTitle} to a source, decision, or labeled assumption.`, "No unsupported claim remains hidden."],
        ["Completeness", `Check ${profile.reviewLens} against the intended audience and receiving team.`, "The artifact answers what product, engineering, QA, and operations need."],
        ["Testability", "Ask whether QA can create positive, negative, boundary, and exception scenarios.", "Ambiguous wording has been rewritten or logged as a question."],
        ["Accountability", "Confirm who approves, who reviews, and who acts when the artifact is wrong.", "Owners and escalation path are explicit."]
      ]
    : [
        ["Evidence", `Trace mọi statement quan trọng trong ${item.artifactTitle} về source, decision hoặc assumption có label.`, "Không unsupported claim nào còn bị ẩn."],
        ["Completeness", `Check ${profile.reviewLens} theo intended audience và receiving team.`, "Artifact trả lời được điều product, engineering, QA và operations cần."],
        ["Testability", "Hỏi QA có tạo được positive, negative, boundary và exception scenario không.", "Wording mơ hồ được rewrite hoặc log thành question."],
        ["Accountability", "Confirm ai approve, ai review và ai xử lý khi artifact sai.", "Owner và escalation path explicit."]
      ];

  return `## Stakeholder questions to ask

${artifactTable(questionHeaders, stakeholderRows)}

## Decision log entries

${artifactTable(decisionHeaders, decisionRows)}

## Definition of Ready / Done

${artifactTable(readyDoneHeaders, readyDoneRows)}

## Before and after artifact example

${artifactTable(beforeAfterHeaders, beforeAfterRows)}

## Manual verification after AI output

${artifactTable(verificationHeaders, verificationRows)}`;
}

function lessonPage(lesson, locale) {
  const item = lesson[locale];
  const upgrade = lessonUpgrade(lesson.slug, locale);
  const practical = lessonPracticalSections(lesson, locale, upgrade);
  const storySection = lessonStoryVisual(lesson, locale);
  const [enSection, viSection] = sections[lesson.section];
  const section = locale === "en" ? enSection : viSection;
  const level = lesson.section === "lead" ? "Expert" : lesson.section === "products" ? "Advanced" : "Core";
  const badBetterHeaders =
    locale === "en"
      ? ["Weak pattern", "Why it fails", "Stronger BA pattern"]
      : ["Cách làm yếu", "Vì sao fail", "Cách làm BA tốt hơn"];

  return `---
title: ${yamlString(item.title)}
description: ${yamlString(item.focus)}
---

# ${item.title}

<div class="lesson-meta">
  <span>${section}</span>
  <span>Software BA</span>
  <span>${level}</span>
</div>${storySection ? `\n\n${storySection}` : ""}

## Learning outcomes

${list(item.outcomes)}

## Why this matters for BA work

<div class="ba-callout">
${item.focus}
</div>

${upgrade.why}

## Common difficulties for BAs

${practical.difficulties}

## Where this applies in real projects

${practical.applications}

## If this is missing

${practical.missing}

## Mental model or core concept

${item.concept}

## Practical BA example

${item.example}

## Diagram

\`\`\`mermaid
${diagram(lesson.slug, locale)}
\`\`\`

## BA artifact

### ${item.artifactTitle}

${artifactTable(item.artifactHeaders, item.artifactRows)}

## AI expert note

${upgrade.expert}

## Bad vs better example

${artifactTable(badBetterHeaders, upgrade.badBetter)}

${seniorBaPracticePack(lesson, locale, upgrade)}

## AI collaboration prompt

\`\`\`text
${item.prompt}
\`\`\`

## Mistakes to avoid

${list(item.mistakes)}

## Apply this tomorrow

${numbered(item.tomorrow)}

## What a BA should remember

${list(item.remember)}
`;
}

function labDiagram(slug, locale) {
  const en = locale === "en";
  const diagrams = {
    "meeting-transcript-to-requirements": en
      ? `flowchart LR
    A["Transcript"] --> B["Source map"]
    B --> C["Facts + contradictions"]
    C --> D["Requirement candidates"]
    D --> E["Open questions + owners"]`
      : `flowchart LR
    A["Transcript"] --> B["Source map"]
    B --> C["Fact + contradiction"]
    C --> D["Requirement candidate"]
    D --> E["Open question + owner"]`,
    "ambiguous-requirement-review": en
      ? `flowchart TD
    A["Vague requirement"] --> B["Defect taxonomy"]
    B --> C["Severity"]
    C --> D["Clarification question"]
    D --> E["Testable rewrite"]`
      : `flowchart TD
    A["Requirement mơ hồ"] --> B["Defect taxonomy"]
    B --> C["Severity"]
    C --> D["Clarification question"]
    D --> E["Rewrite test được"]`,
    "stories-and-acceptance-criteria": en
      ? `flowchart LR
    A["Feature idea"] --> B["Story map"]
    B --> C["User stories"]
    C --> D["Acceptance criteria"]
    D --> E["Negative tests"]`
      : `flowchart LR
    A["Feature idea"] --> B["Story map"]
    B --> C["User stories"]
    C --> D["Acceptance criteria"]
    D --> E["Negative tests"]`,
    "process-and-sequence-diagrams": en
      ? `flowchart TD
    A["Text process"] --> B["Flowchart"]
    A --> C["Sequence diagram"]
    B --> D["Exception review"]
    C --> D
    D --> E["Missing rules"]`
      : `flowchart TD
    A["Text process"] --> B["Flowchart"]
    A --> C["Sequence diagram"]
    B --> D["Exception review"]
    C --> D
    D --> E["Missing rules"]`,
    "rag-assistant-requirements": en
      ? `flowchart LR
    A["Source inventory"] --> B["Knowledge contract"]
    B --> C["RAG requirements"]
    C --> D["Fallback rules"]
    D --> E["Evaluation plan"]`
      : `flowchart LR
    A["Source inventory"] --> B["Knowledge contract"]
    B --> C["RAG requirements"]
    C --> D["Fallback rules"]
    D --> E["Evaluation plan"]`,
    "ai-adoption-roadmap": en
      ? `flowchart TD
    A["Current state"] --> B["Use-case portfolio"]
    B --> C["Risk tiers"]
    C --> D["Training + quality gates"]
    D --> E["Metrics + rollout"]`
      : `flowchart TD
    A["Current state"] --> B["Use-case portfolio"]
    B --> C["Risk tiers"]
    C --> D["Training + quality gates"]
    D --> E["Metrics + rollout"]`
  };
  return diagrams[slug];
}

function labPage(lab, locale) {
  const isEn = locale === "en";
  const title = isEn ? lab.enTitle : lab.viTitle;
  const scenario = isEn ? lab.enScenario : lab.viScenario;
  const input = isEn ? lab.enInput : lab.viInput;
  const steps = isEn ? lab.enSteps : lab.viSteps;
  const deliverables = isEn ? lab.enDeliverables : lab.viDeliverables;
  const rubric = isEn ? lab.enRubric : lab.viRubric;
  const labPrompt = isEn
    ? "Act as a senior BA coach. Help me complete this lab. First ask what source evidence is available. Then guide me through the exercise steps. Produce the deliverables in structured tables. Mark assumptions, unsupported claims, and questions for stakeholder validation."
    : "Hãy đóng vai senior BA coach. Hỗ trợ tôi hoàn thành lab này. Trước hết hỏi source evidence nào đang có. Sau đó hướng dẫn tôi theo từng exercise step. Tạo deliverables dưới dạng structured table. Đánh dấu assumption, unsupported claim và câu hỏi cần stakeholder validation.";

  return `---
title: ${yamlString(title)}
description: "Practical AI lab for Business Analysts."
---

# ${title}

## Scenario

${scenario}

## Input sample

\`\`\`text
${input}
\`\`\`

## Diagram

\`\`\`mermaid
${labDiagram(lab.slug, locale)}
\`\`\`

## Exercise steps

${numbered(steps)}

## Deliverables

${list(deliverables)}

## AI collaboration prompt

\`\`\`text
${labPrompt}
\`\`\`

## Review rubric

${list(rubric)}
`;
}

function capstoneDiagram(capstone, locale) {
  const isEn = locale === "en";
  const diagrams = {
    "discovery-to-delivery-ai-ba-pack": isEn
      ? `flowchart LR
    A["Messy stakeholder sources"] --> B["Evidence map"]
    B --> C["Conflicts + decisions"]
    C --> D["Process model"]
    D --> E["Release backlog"]
    E --> F["Traceability + QA handoff"]
    F --> G["Validated delivery pack"]`
      : `flowchart LR
    A["Source stakeholder lộn xộn"] --> B["Evidence map"]
    B --> C["Conflict + decision"]
    C --> D["Process model"]
    D --> E["Release backlog"]
    E --> F["Traceability + QA handoff"]
    F --> G["Validated delivery pack"]`,
    "frontend-backend-contract-readiness": isEn
      ? `flowchart TD
    A["UI concept"] --> B["Screen-state matrix"]
    B --> C["Field and action rules"]
    C --> D["API contract"]
    D --> E["Permission + audit trace"]
    E --> F["QA + analytics handoff"]
    F --> G["Contract-ready feature"]`
      : `flowchart TD
    A["UI concept"] --> B["Screen-state matrix"]
    B --> C["Field và action rule"]
    C --> D["API contract"]
    D --> E["Permission + audit trace"]
    E --> F["QA + analytics handoff"]
    F --> G["Feature sẵn sàng contract"]`,
    "ai-assistant-requirement-and-governance": isEn
      ? `flowchart TD
    A["User goal"] --> B["AI pattern fit"]
    B --> C["RAG knowledge contract"]
    C --> D["Output + review contract"]
    D --> E["Safety requirements"]
    E --> F["Evaluation + monitoring"]
    F --> G["Pilot governance memo"]`
      : `flowchart TD
    A["User goal"] --> B["AI pattern fit"]
    B --> C["RAG knowledge contract"]
    C --> D["Output + review contract"]
    D --> E["Safety requirement"]
    E --> F["Evaluation + monitoring"]
    F --> G["Pilot governance memo"]`
  };

  return diagrams[capstone.slug];
}

function capstonePage(capstone, locale) {
  const isEn = locale === "en";
  const item = capstone[locale];
  const deliverableHeaders = isEn
    ? ["Deliverable", "What it contains", "Why it matters"]
    : ["Deliverable", "Nội dung", "Vì sao quan trọng"];
  const rubricHeaders = isEn ? ["Review lens", "High-score signal"] : ["Lens review", "Tín hiệu đạt điểm cao"];

  return `---
title: ${yamlString(item.title)}
description: ${yamlString(item.summary)}
---

# ${item.title}

<div class="lesson-meta">
  <span>${isEn ? "Capstone" : "Capstone"}</span>
  <span>${isEn ? "Project simulation" : "Mô phỏng dự án"}</span>
  <span>${isEn ? "Senior BA" : "Senior BA"}</span>
</div>

${item.summary}

## Scenario

${item.scenario}

## Your role

${item.role}

## Inputs to prepare

${list(item.inputs)}

## Capstone workflow

${numbered(item.tasks)}

## Diagram

\`\`\`mermaid
${capstoneDiagram(capstone, locale)}
\`\`\`

## Expected deliverables

${artifactTable(deliverableHeaders, item.deliverables)}

## AI collaboration prompt

\`\`\`text
${item.prompt}
\`\`\`

## Scoring rubric

${artifactTable(rubricHeaders, item.rubric)}

## Submission checklist

${list(
  isEn
    ? [
        "Evidence labels are visible in every material artifact.",
        "Assumptions are separated from decisions.",
        "Frontend, backend, QA, operations, and governance handoffs are explicit where relevant.",
        "AI output has been reviewed for unsupported claims, missing context, and unsafe shortcuts.",
        "The final pack can drive a real refinement, workshop, or pilot decision."
      ]
    : [
        "Evidence label visible trong mọi artifact quan trọng.",
        "Assumption được tách khỏi decision.",
        "Handoff cho frontend, backend, QA, operations và governance explicit khi liên quan.",
        "Output AI đã được review unsupported claim, missing context và shortcut không an toàn.",
        "Final pack có thể dùng cho refinement, workshop hoặc pilot decision thật."
      ]
)}
`;
}

function capstoneIndex(locale) {
  const isEn = locale === "en";
  const cards = capstones
    .map((capstone) => {
      const item = capstone[locale];
      return `<a class="template-card" href="./${capstone.slug}/"><strong>${item.title}</strong><span>${item.summary}</span></a>`;
    })
    .join("\n");

  return `---
title: ${yamlString(isEn ? "Capstone Project Simulations" : "Capstone mô phỏng dự án")}
description: ${yamlString(isEn ? "Project-scale exercises for applying AI-aware BA skills." : "Bài tập quy mô dự án để áp dụng kỹ năng BA hiểu AI.")}
---

# ${isEn ? "Capstone Project Simulations" : "Capstone mô phỏng dự án"}

${isEn ? "Use these capstones after the core lessons and project use cases. Each one asks you to produce artifacts a real delivery team could review." : "Dùng các capstone này sau bài học chính và use case dự án. Mỗi bài yêu cầu tạo artifact mà delivery team thật có thể review."}

<div class="template-grid">
${cards}
</div>

## Capstone progression

\`\`\`mermaid
flowchart LR
    A["Discovery pack"] --> B["Frontend/backend contract"]
    B --> C["AI assistant governance"]
    C --> D["Senior BA portfolio evidence"]
\`\`\`
`;
}

function useCaseDiagram(useCase, locale) {
  const item = useCase[locale];
  const sourceLabel = locale === "en" ? "Project sources" : "Source dự án";
  const aiLabel = locale === "en" ? "AI-assisted analysis" : "AI-assisted analysis";
  const reviewLabel = locale === "en" ? "BA validation" : "BA validation";
  const decisionLabel = locale === "en" ? "Stakeholder decision" : "Stakeholder decision";
  const artifactLabel = locale === "en" ? "Delivery artifact" : "Artifact triển khai";

  return `flowchart LR
    A["${sourceLabel}"] --> B["${aiLabel}"]
    B --> C["${item.title}"]
    C --> D["${reviewLabel}"]
    D --> E{"${decisionLabel}"}
    E -->|Approved| F["${artifactLabel}"]
    E -->|Needs evidence| G["Open questions"]
    G --> A`;
}

const useCaseGroupProfiles = {
  "Discovery and alignment": {
    en: {
      pressure: "stakeholders describe the same problem from different incentives and levels of detail",
      boundary: "sensemaking, contradiction detection, question generation, and workshop preparation",
      evidence: "speaker attribution, decision authority, and source freshness",
      workflow: "evidence grouping before solution discussion",
      artifact: "alignment artifact",
      risk: "false consensus and invented scope"
    },
    vi: {
      pressure: "stakeholder mô tả cùng một vấn đề từ incentive và mức chi tiết khác nhau",
      boundary: "sensemaking, contradiction detection, question generation và workshop preparation",
      evidence: "speaker attribution, decision authority và source freshness",
      workflow: "gom evidence trước khi bàn solution",
      artifact: "alignment artifact",
      risk: "false consensus và invented scope"
    }
  },
  "Requirements and backlog": {
    en: {
      pressure: "stories must become testable without losing business rules, exceptions, data needs, or NFRs",
      boundary: "gap finding, rewrite critique, edge-case expansion, and acceptance-criteria drafting",
      evidence: "approved rules, examples, edge cases, and QA expectations",
      workflow: "requirement clarification before sprint commitment",
      artifact: "delivery-ready backlog artifact",
      risk: "vague criteria and unowned assumptions"
    },
    vi: {
      pressure: "story phải test được mà không mất business rule, exception, data need hoặc NFR",
      boundary: "gap finding, rewrite critique, edge-case expansion và acceptance-criteria drafting",
      evidence: "rule đã approve, example, edge case và expectation của QA",
      workflow: "clarify requirement trước khi commit sprint",
      artifact: "delivery-ready backlog artifact",
      risk: "criteria mơ hồ và assumption không owner"
    }
  },
  "Delivery and QA": {
    en: {
      pressure: "delivery decisions, test evidence, and release readiness need to stay connected to original intent",
      boundary: "scenario generation, defect triage support, readiness synthesis, and risk surfacing",
      evidence: "requirement baseline, test results, defect history, and release decisions",
      workflow: "quality review before release or rework decision",
      artifact: "QA and delivery handoff artifact",
      risk: "optimistic status and late requirement discovery"
    },
    vi: {
      pressure: "delivery decision, test evidence và release readiness phải còn nối với intent ban đầu",
      boundary: "scenario generation, defect triage support, readiness synthesis và risk surfacing",
      evidence: "requirement baseline, test result, defect history và release decision",
      workflow: "quality review trước release hoặc rework decision",
      artifact: "QA và delivery handoff artifact",
      risk: "optimistic status và late requirement discovery"
    }
  },
  "AI-enabled product use cases": {
    en: {
      pressure: "AI behavior affects users directly and must include uncertainty, fallback, evaluation, and human review",
      boundary: "AI task framing, output contract drafting, evaluation planning, and safety-control critique",
      evidence: "approved sources, model limits, evaluation cases, and human decision triggers",
      workflow: "AI operating contract before build",
      artifact: "AI behavior specification",
      risk: "over-automation and unsafe confidence"
    },
    vi: {
      pressure: "hành vi AI ảnh hưởng trực tiếp tới user và phải có uncertainty, fallback, evaluation và human review",
      boundary: "AI task framing, output contract drafting, evaluation planning và safety-control critique",
      evidence: "approved source, model limit, evaluation case và human decision trigger",
      workflow: "AI operating contract trước khi build",
      artifact: "AI behavior specification",
      risk: "over-automation và confidence không an toàn"
    }
  },
  "Domain project scenarios": {
    en: {
      pressure: "domain policies, operational exceptions, and regulatory expectations shape what the product can safely do",
      boundary: "domain-rule extraction, exception mapping, safe-message drafting, and owner review",
      evidence: "policy sources, operational samples, compliance constraints, and domain-owner decisions",
      workflow: "domain validation before implementation detail",
      artifact: "domain-specific requirement pack",
      risk: "policy hallucination and exception blindness"
    },
    vi: {
      pressure: "domain policy, operational exception và regulatory expectation quyết định product có thể làm gì an toàn",
      boundary: "domain-rule extraction, exception mapping, safe-message drafting và owner review",
      evidence: "policy source, operational sample, compliance constraint và domain-owner decision",
      workflow: "domain validation trước implementation detail",
      artifact: "domain-specific requirement pack",
      risk: "policy hallucination và exception blindness"
    }
  },
  "Governance and adoption": {
    en: {
      pressure: "AI usage must scale across teams without leaking sensitive data or creating unreviewable decisions",
      boundary: "portfolio analysis, policy drafting, risk-tiering, playbook creation, and adoption measurement",
      evidence: "data policy, approved tools, risk appetite, audit need, and team capability",
      workflow: "governance design before broad rollout",
      artifact: "AI adoption control pack",
      risk: "shadow AI use and weak accountability"
    },
    vi: {
      pressure: "cách dùng AI phải scale qua nhiều team mà không leak sensitive data hoặc tạo decision không review được",
      boundary: "portfolio analysis, policy drafting, risk-tiering, playbook creation và adoption measurement",
      evidence: "data policy, approved tool, risk appetite, audit need và capability của team",
      workflow: "governance design trước rollout rộng",
      artifact: "AI adoption control pack",
      risk: "shadow AI use và accountability yếu"
    }
  },
  "Frontend, UI, and UX": {
    en: {
      pressure: "screen behavior, accessibility, design states, analytics, and user feedback must become implementable requirements",
      boundary: "UI-state analysis, content critique, accessibility review, event taxonomy, and edge-case discovery",
      evidence: "wireframes, design tokens, user journeys, analytics questions, and accessibility expectations",
      workflow: "screen-state review before frontend build",
      artifact: "frontend requirement specification",
      risk: "missing states and unmeasurable UX"
    },
    vi: {
      pressure: "screen behavior, accessibility, design state, analytics và user feedback phải thành requirement implement được",
      boundary: "UI-state analysis, content critique, accessibility review, event taxonomy và edge-case discovery",
      evidence: "wireframe, design token, user journey, analytics question và accessibility expectation",
      workflow: "screen-state review trước frontend build",
      artifact: "frontend requirement specification",
      risk: "missing state và UX không đo được"
    }
  },
  "Backend and API": {
    en: {
      pressure: "API contracts, permissions, errors, audit, and operational behavior must be explicit enough for backend delivery",
      boundary: "contract critique, rule extraction, error taxonomy, permission review, and NFR gap detection",
      evidence: "API draft, data model, auth rules, error samples, audit policy, and integration needs",
      workflow: "contract validation before implementation",
      artifact: "backend behavior contract",
      risk: "ambiguous service behavior and security gaps"
    },
    vi: {
      pressure: "API contract, permission, error, audit và operational behavior phải đủ explicit cho backend delivery",
      boundary: "contract critique, rule extraction, error taxonomy, permission review và NFR gap detection",
      evidence: "API draft, data model, auth rule, error sample, audit policy và integration need",
      workflow: "contract validation trước implementation",
      artifact: "backend behavior contract",
      risk: "service behavior mơ hồ và security gap"
    }
  },
  "Data and Integration": {
    en: {
      pressure: "data movement, mapping, reconciliation, privacy, and lineage decisions affect multiple systems and owners",
      boundary: "field mapping, rule comparison, reconciliation design, lineage review, and exception analysis",
      evidence: "source schemas, sample payloads, mapping rules, data-quality reports, and ownership matrix",
      workflow: "data contract review before integration build",
      artifact: "data and integration control pack",
      risk: "silent data loss and weak lineage"
    },
    vi: {
      pressure: "data movement, mapping, reconciliation, privacy và lineage decision ảnh hưởng nhiều system và owner",
      boundary: "field mapping, rule comparison, reconciliation design, lineage review và exception analysis",
      evidence: "source schema, sample payload, mapping rule, data-quality report và ownership matrix",
      workflow: "data contract review trước integration build",
      artifact: "data and integration control pack",
      risk: "silent data loss và lineage yếu"
    }
  },
  "Cross-functional BA Collaboration": {
    en: {
      pressure: "different roles need different artifacts, but the BA must keep decisions consistent across product, design, engineering, QA, data, and operations",
      boundary: "role-specific synthesis, decision memo drafting, conflict surfacing, and shared artifact critique",
      evidence: "role feedback, decision log, design notes, technical constraints, test concerns, and support needs",
      workflow: "cross-role decision alignment before handoff",
      artifact: "collaboration decision artifact",
      risk: "role misalignment and hidden trade-offs"
    },
    vi: {
      pressure: "mỗi role cần artifact khác nhau, nhưng BA phải giữ decision nhất quán giữa product, design, engineering, QA, data và operations",
      boundary: "role-specific synthesis, decision memo drafting, conflict surfacing và shared artifact critique",
      evidence: "role feedback, decision log, design note, technical constraint, test concern và support need",
      workflow: "cross-role decision alignment trước handoff",
      artifact: "collaboration decision artifact",
      risk: "role misalignment và hidden trade-off"
    }
  }
};

function useCaseProfile(group, locale) {
  return useCaseGroupProfiles[group]?.[locale] ?? useCaseGroupProfiles["Discovery and alignment"][locale];
}

function listItem(list, index, fallback) {
  return list[index] ?? list[0] ?? fallback;
}

function rowCell(rows, rowIndex, cellIndex, fallback) {
  return rows[rowIndex]?.[cellIndex] ?? rows[0]?.[cellIndex] ?? fallback;
}

function cleanClause(text) {
  return String(text ?? "").replace(/[.!?]+$/, "");
}

function useCaseSupportFrames(useCase, item, locale) {
  const isEn = locale === "en";
  const profile = useCaseProfile(useCase.group, locale);
  const primaryInput = listItem(item.inputs, 0, isEn ? "source material" : "source material");
  const secondaryInput = listItem(item.inputs, 1, primaryInput);
  const aiUse = cleanClause(listItem(item.aiUse, 0, isEn ? "structured analysis" : "structured analysis"));
  const firstWorkflow = listItem(item.workflow, 0, isEn ? "Prepare source evidence." : "Chuẩn bị source evidence.");
  const keyDeliverable = rowCell(item.deliverables, 0, 0, isEn ? "BA artifact" : "BA artifact");
  const deliverableSignal = rowCell(item.deliverables, 0, 3, isEn ? "ready for review" : "ready for review");
  const keyRisk = rowCell(item.risks, 0, 0, isEn ? "uncontrolled AI output" : "uncontrolled AI output");
  const keyControl = rowCell(item.risks, 0, 2, isEn ? "Require human review." : "Yêu cầu human review.");
  const groupLabel = useCaseGroupLabel(useCase.group, locale);

  return {
    contextFrame: isEn
      ? `In ${useCase.domain}, this work usually starts when ${profile.pressure}. The BA should treat ${primaryInput} and ${secondaryInput} as evidence to organize, not as raw material for an unconstrained AI answer. The goal is to make the next decision clearer for the people who own the outcome.`
      : `Trong ${useCase.domain}, công việc này thường bắt đầu khi ${profile.pressure}. BA nên xem ${primaryInput} và ${secondaryInput} là evidence cần organize, không phải raw material để AI trả lời không kiểm soát. Mục tiêu là làm decision tiếp theo rõ hơn cho người own outcome.`,
    challengeFrame: isEn
      ? `For ${item.title}, the practical difficulty is ${profile.risk}. AI can accelerate ${profile.boundary}, but the BA must still expose assumptions, missing approvals, and the point where stakeholder judgment is required.`
      : `Với ${item.title}, khó khăn thực tế là ${profile.risk}. AI có thể tăng tốc ${profile.boundary}, nhưng BA vẫn phải làm rõ assumption, approval còn thiếu và điểm cần stakeholder judgment.`,
    aiFitFrame: isEn
      ? `AI fits this ${groupLabel} use case when it is constrained to ${profile.boundary}. A useful first AI task is: ${aiUse}. AI should not approve scope, invent policy, bypass ${profile.evidence}, or turn a draft into a final decision.`
      : `AI phù hợp với use case ${groupLabel} khi được giới hạn vào ${profile.boundary}. AI task hữu ích đầu tiên là: ${aiUse}. AI không được approve scope, invent policy, bỏ qua ${profile.evidence}, hoặc biến draft thành final decision.`,
    inputFrame: isEn
      ? `Before prompting for ${item.title}, label each input by owner, date, approval status, sensitivity, and role in the decision. The most important evidence lens is ${profile.evidence}; without it, AI may rank old notes, draft designs, and approved rules as if they had equal authority.`
      : `Trước khi prompt cho ${item.title}, hãy label từng input theo owner, date, approval status, sensitivity và vai trò trong decision. Evidence lens quan trọng nhất là ${profile.evidence}; nếu thiếu, AI có thể xem old note, draft design và approved rule có authority như nhau.`,
    workflowFrame: isEn
      ? `Run the workflow as ${profile.workflow}: start with "${firstWorkflow}", then keep a visible decision log as the artifact moves toward ${keyDeliverable}. This prevents AI suggestions from silently becoming backlog, design, release, or operational commitments.`
      : `Chạy workflow như ${profile.workflow}: bắt đầu với "${firstWorkflow}", sau đó giữ decision log visible khi artifact tiến tới ${keyDeliverable}. Cách này ngăn suggestion của AI âm thầm trở thành backlog, design, release hoặc operational commitment.`,
    deliverableFrame: isEn
      ? `Treat ${keyDeliverable} as a BA-owned ${profile.artifact}. AI may draft structure, but the BA must validate whether "${deliverableSignal}" is actually true, whether the artifact is traceable to source evidence, and whether the receiving team can act on it.`
      : `Hãy xem ${keyDeliverable} là ${profile.artifact} do BA own. AI có thể draft structure, nhưng BA phải validate "${deliverableSignal}" có thật sự đúng không, artifact có trace được về evidence không và receiving team có hành động được không.`,
    riskFrame: isEn
      ? `The main control for the "${keyRisk}" risk is explicit human accountability: ${keyControl}. If evidence is weak, the output should create a validation question or decision item, not a final requirement.`
      : `Control chính cho risk "${keyRisk}" là human accountability explicit: ${keyControl}. Nếu evidence yếu, output nên tạo validation question hoặc decision item, không phải final requirement.`,
    checklist: isEn
      ? [
          `${primaryInput} is labeled with owner, date, approval status, and sensitivity.`,
          `${keyDeliverable} traces to source evidence and has a named human owner.`,
          `The AI task stays inside ${profile.boundary} and does not approve scope or policy.`,
          `The "${keyRisk}" risk has a practical control: ${keyControl}.`,
          `Open assumptions are converted into validation questions or stakeholder decisions.`,
          `Success metric: ${item.metric}`
        ]
      : [
          `${primaryInput} được label owner, date, approval status và sensitivity.`,
          `${keyDeliverable} trace được về source evidence và có human owner rõ.`,
          `AI task nằm trong boundary ${profile.boundary} và không approve scope hoặc policy.`,
          `Risk "${keyRisk}" có control thực tế: ${keyControl}.`,
          `Open assumption được chuyển thành validation question hoặc stakeholder decision.`,
          `Success metric: ${item.metric}`
        ]
  };
}

const useCasePhaseByGroup = {
  "Discovery and alignment": { en: "Discovery", vi: "Discovery" },
  "Requirements and backlog": { en: "Refinement", vi: "Refinement" },
  "Delivery and QA": { en: "Delivery validation", vi: "Delivery validation" },
  "AI-enabled product use cases": { en: "AI product design", vi: "AI product design" },
  "Domain project scenarios": { en: "Domain workflow", vi: "Domain workflow" },
  "Governance and adoption": { en: "Governance", vi: "Governance" },
  "Frontend, UI, and UX": { en: "Frontend/UI refinement", vi: "Frontend/UI refinement" },
  "Backend and API": { en: "Backend/API refinement", vi: "Backend/API refinement" },
  "Data and Integration": { en: "Data and integration", vi: "Data and integration" },
  "Cross-functional BA Collaboration": { en: "Cross-functional alignment", vi: "Cross-functional alignment" }
};

function useCaseDifficulty(useCase) {
  if (["AI-enabled product use cases", "Governance and adoption", "Data and Integration"].includes(useCase.group)) {
    return "Advanced";
  }
  if (["Backend and API", "Frontend, UI, and UX", "Cross-functional BA Collaboration"].includes(useCase.group)) {
    return "Practitioner";
  }
  return "Core";
}

function useCaseMetadata(useCase, locale) {
  const item = useCase[locale];
  return {
    phase: useCasePhaseByGroup[useCase.group]?.[locale] ?? useCase.group,
    difficulty: useCaseDifficulty(useCase),
    artifact: rowCell(item.deliverables, 0, 0, locale === "en" ? "BA artifact" : "BA artifact"),
    risk: rowCell(item.risks, 0, 0, locale === "en" ? "AI risk" : "AI risk")
  };
}

function useCaseFilterPanel(locale) {
  const isEn = locale === "en";
  const phases = [...new Set(useCases.map((useCase) => useCaseMetadata(useCase, locale).phase))];
  const difficulties = [...new Set(useCases.map((useCase) => useCaseMetadata(useCase, locale).difficulty))];
  const groups = [...new Set(useCases.map((useCase) => useCase.group))];
  const phaseLinks = phases
    .map((phase) => {
      const group = useCases.find((useCase) => useCaseMetadata(useCase, locale).phase === phase)?.group ?? phase;
      return `<a href="#${anchorSlug(group)}">${phase}</a>`;
    })
    .join("");
  const difficultyChips = difficulties.map((difficulty) => `<span>${difficulty}</span>`).join("");
  const groupLinks = groups
    .map((group) => `<a href="#${anchorSlug(group)}">${useCaseGroupLabel(group, locale)}</a>`)
    .join("");

  return `<div class="usecase-filter-panel">
  <div>
    <strong>${isEn ? "By project phase" : "Theo phase dự án"}</strong>
    <div class="filter-chip-row">${phaseLinks}</div>
  </div>
  <div>
    <strong>${isEn ? "By difficulty" : "Theo độ khó"}</strong>
    <div class="filter-chip-row">${difficultyChips}</div>
  </div>
  <div>
    <strong>${isEn ? "By BA collaboration group" : "Theo nhóm collaboration của BA"}</strong>
    <div class="filter-chip-row">${groupLinks}</div>
  </div>
</div>`;
}

function useCasePage(useCase, locale) {
  const item = useCase[locale];
  const meta = useCaseMetadata(useCase, locale);
  const deliverableHeaders =
    locale === "en"
      ? ["Deliverable", "What it contains", "Owner", "Done signal"]
      : ["Deliverable", "Nội dung", "Owner", "Done signal"];
  const riskHeaders =
    locale === "en"
      ? ["Risk", "Why it matters", "BA control"]
      : ["Rủi ro", "Vì sao quan trọng", "Control của BA"];
  const isEn = locale === "en";
  const prompt = isEn
    ? `Act as a senior AI-aware Business Analyst. Help me apply the "${item.title}" use case to my project. First ask for source evidence and constraints. Then create a structured analysis with project context, assumptions, AI-fit boundary, workflow steps, deliverables, risks, controls, open questions, and stakeholder decisions. Do not invent policy, thresholds, or approvals.`
    : `Hãy đóng vai senior Business Analyst hiểu AI. Hỗ trợ tôi áp dụng use case "${item.title}" vào dự án. Trước hết hỏi source evidence và constraint. Sau đó tạo structured analysis gồm project context, assumption, AI-fit boundary, workflow step, deliverable, risk, control, open question và stakeholder decision. Không tự bịa policy, threshold hoặc approval.`;
  const {
    contextFrame,
    challengeFrame,
    aiFitFrame,
    inputFrame,
    workflowFrame,
    deliverableFrame,
    riskFrame,
    checklist
  } = useCaseSupportFrames(useCase, item, locale);

  return `---
title: ${yamlString(item.title)}
description: ${yamlString(item.challenge)}
---

# ${item.title}

<div class="case-meta">
  <span>${useCase.group}</span>
  <span>${useCase.domain}</span>
  <span>${meta.phase}</span>
  <span>${meta.difficulty}</span>
  <span>${meta.artifact}</span>
  <span>${isEn ? "Project use case" : "Use case dự án"}</span>
</div>

## Project context

${item.project} ${contextFrame}

## BA challenge

${item.challenge} ${challengeFrame}

## Where AI fits

<div class="ba-workbench-panel">
${aiFitFrame}
</div>

${list(item.aiUse)}

## Inputs to prepare

${list(item.inputs)}

${inputFrame}

## BA workflow

${numbered(item.workflow)}

${workflowFrame}

## Diagram

\`\`\`mermaid
${useCaseDiagram(useCase, locale)}
\`\`\`

## Deliverables

${artifactTable(deliverableHeaders, item.deliverables)}

${deliverableFrame}

## Prompt to try

\`\`\`text
${prompt}
\`\`\`

## Review checklist

${list(checklist)}

## Risks and controls

${artifactTable(riskHeaders, item.risks)}

${riskFrame}
`;
}

function anchorSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const useCaseGroupLabels = {
  vi: {
    "Discovery and alignment": "Discovery và alignment",
    "Requirements and backlog": "Requirements và backlog",
    "Delivery and QA": "Delivery và QA",
    "AI-enabled product use cases": "AI-enabled product",
    "Domain project scenarios": "Tình huống theo domain",
    "Governance and adoption": "Governance và adoption",
    "Frontend, UI, and UX": "Frontend, UI và UX",
    "Backend and API": "Backend và API",
    "Data and Integration": "Data và Integration",
    "Cross-functional BA Collaboration": "Collaboration cross-functional của BA"
  }
};

function useCaseGroupLabel(group, locale) {
  return locale === "vi" ? useCaseGroupLabels.vi[group] ?? group : group;
}

function useCaseIndex(locale) {
  const isEn = locale === "en";
  const intro = isEn
    ? "A practical library of 70+ project use cases showing how software Business Analysts can apply AI across discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI-enabled products, domain workflows, and governance."
    : "Thư viện 70+ use case thực tế trong dự án, giúp software Business Analyst áp dụng AI vào discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI-enabled product, domain workflow và governance.";
  const groups = [...new Set(useCases.map((useCase) => useCase.group))];
  const groupSummary = groups
    .map((group) => {
      const count = useCases.filter((useCase) => useCase.group === group).length;
      const label = useCaseGroupLabel(group, locale);
      return `<a class="group-card" href="#${anchorSlug(group)}"><strong>${label}</strong><span>${count} ${isEn ? "use cases" : "use case"}</span></a>`;
    })
    .join("\n");
  const cards = groups
    .map((group) => {
      const label = useCaseGroupLabel(group, locale);
      const groupCards = useCases
        .filter((useCase) => useCase.group === group)
        .map((useCase) => {
          const item = useCase[locale];
          const meta = useCaseMetadata(useCase, locale);
          return `<a class="case-card" data-phase="${anchorSlug(meta.phase)}" data-difficulty="${anchorSlug(meta.difficulty)}" data-artifact="${anchorSlug(meta.artifact)}" href="./${useCase.slug}/"><span>${useCase.group}</span><strong>${item.title}</strong><small>${useCase.domain}</small><div class="case-tags"><b>${meta.phase}</b><b>${meta.difficulty}</b><b>${meta.artifact}</b></div><em>${item.metric}</em></a>`;
        })
        .join("\n");
      return `<section class="usecase-section"><h2 id="${anchorSlug(group)}">${label}</h2><div class="usecase-grid">\n${groupCards}\n</div></section>`;
    })
    .join("\n");

  return `---
title: ${yamlString(isEn ? "Project Use Cases" : "Use case thực tế trong dự án")}
description: ${yamlString(intro)}
---

# ${isEn ? "Project Use Cases" : "Use case thực tế trong dự án"}

${intro}

<div class="ba-workbench-panel">
${isEn ? "Use these pages as working playbooks. Pick a use case close to your project, copy the prompt, prepare source evidence, and adapt the deliverables to your team." : "Hãy dùng các trang này như playbook làm việc. Chọn use case gần với dự án của bạn, dùng prompt, chuẩn bị source evidence và điều chỉnh deliverable theo team."}
</div>

## ${isEn ? "Browse by group" : "Duyệt theo nhóm"}

<div class="usecase-group-summary">
${groupSummary}
</div>

## ${isEn ? "Filter by project context" : "Lọc theo bối cảnh dự án"}

${useCaseFilterPanel(locale)}

## Use case map

\`\`\`mermaid
flowchart LR
    A["Discovery"] --> B["Requirements"]
    B --> C["Delivery and QA"]
    C --> D["Frontend/UI"]
    D --> E["Backend/API"]
    E --> F["Data integration"]
    F --> G["AI-enabled products"]
    G --> H["Domain scenarios"]
    H --> I["Governance"]
\`\`\`

${cards}
`;
}

function rootPage() {
  return `---
title: "AI for Business Analysts"
description: "Default English landing page for the AI for Business Analysts course with Pixel Quest game mode and bilingual learning paths."
pageClass: pixel-game-root
aside: false
---

<PixelQuest locale="en" mode="landing" />
`;
}

function roleLearningPaths(locale) {
  const isEn = locale === "en";
  const paths = isEn
    ? [
        ["New Software BA", "Start with AI foundations, then practice discovery and user stories.", "Lessons 01-08, Labs 01-03, Discovery and Requirements use cases"],
        ["Senior Delivery BA", "Focus on ambiguity, NFRs, traceability, diagrams, and cross-team handoff.", "Lessons 09, 13-17, Capstone 1, Frontend/Backend use cases"],
        ["BA Working With Frontend/UI", "Translate UX into behavior, state, permissions, analytics, accessibility, and QA coverage.", "Frontend/UI use cases, UI State Template, Capstone 2"],
        ["BA Working With Backend/API", "Clarify API contracts, validation, errors, RBAC, idempotency, data mapping, and integration failure.", "Backend/API use cases, API Contract Checklist, Capstone 2"],
        ["AI Product BA", "Specify RAG, AI output contracts, human review, fallback, evaluation, monitoring, and risk controls.", "Lessons 18-20, RAG Canvas, AI Feature Template, Capstone 3"],
        ["BA Lead or Practice Lead", "Build governance, prompt library, quality gates, adoption metrics, and team operating model.", "Lesson 20, AI Risk Matrix, DoR/DoD Template, Adoption Lab"]
      ]
    : [
        ["Software BA mới", "Bắt đầu với AI foundation, sau đó luyện discovery và user story.", "Bài 01-08, Lab 01-03, use case Discovery và Requirements"],
        ["Senior Delivery BA", "Tập trung ambiguity, NFR, traceability, diagram và cross-team handoff.", "Bài 09, 13-17, Capstone 1, use case Frontend/Backend"],
        ["BA làm với Frontend/UI", "Chuyển UX thành behavior, state, permission, analytics, accessibility và QA coverage.", "Use case Frontend/UI, UI State Template, Capstone 2"],
        ["BA làm với Backend/API", "Clarify API contract, validation, error, RBAC, idempotency, data mapping và integration failure.", "Use case Backend/API, API Contract Checklist, Capstone 2"],
        ["AI Product BA", "Đặc tả RAG, AI output contract, human review, fallback, evaluation, monitoring và risk control.", "Bài 18-20, RAG Canvas, AI Feature Template, Capstone 3"],
        ["BA Lead hoặc Practice Lead", "Xây governance, prompt library, quality gate, adoption metric và team operating model.", "Bài 20, AI Risk Matrix, DoR/DoD Template, Adoption Lab"]
      ];

  return `<div class="learning-path-grid">
${paths
  .map(
    ([role, goal, route]) => `<div class="learning-path-card"><strong>${role}</strong><span>${goal}</span><em>${route}</em></div>`
  )
  .join("\n")}
</div>`;
}

function homePage(locale) {
  const isEn = locale === "en";
  const title = "AI for Business Analysts";
  const intro = isEn
    ? "A deep bilingual learning path for software Business Analysts who need to use AI responsibly, improve BA artifacts, and specify AI-enabled products with expert judgment."
    : "Learning path song ngữ chuyên sâu cho software Business Analyst muốn dùng AI có trách nhiệm, cải thiện artifact BA và đặc tả sản phẩm có AI bằng judgment của chuyên gia.";
  const sectionCards = Object.entries(sections)
    .map(([key, [en, vi]]) => `<div class="course-card"><strong>${isEn ? en : vi}</strong>${sectionSummaries[key][locale]}</div>`)
    .join("\n");
  const abilityList = isEn
    ? [
        "Explain AI concepts without hype and without unnecessary ML math.",
        "Use AI to improve discovery, synthesis, requirements, diagrams, and review.",
        "Build reusable prompt/context patterns for a BA team.",
        "Specify AI-enabled features with uncertainty, evaluation, human review, fallback, and monitoring.",
        "Lead AI adoption with governance, quality gates, metrics, and operating model."
      ]
    : [
        "Giải thích concept AI rõ ràng, không hype và không cần ML math quá sâu.",
        "Dùng AI để cải thiện discovery, synthesis, requirement, diagram và review.",
        "Xây prompt/context pattern tái sử dụng cho BA team.",
        "Đặc tả AI-enabled feature có uncertainty, evaluation, human review, fallback và monitoring.",
        "Dẫn dắt AI adoption bằng governance, quality gate, metric và operating model."
      ];
  const startSteps = isEn
    ? [
        "Read lessons 01-05 for AI foundations.",
        "Practice lessons 06-17 to improve BA workflow and artifacts.",
        "Study lessons 18-20 for AI-enabled product requirements and BA leadership.",
        "Use the project use cases to adapt AI workflows to real delivery situations.",
        "Use the labs and resource library on your real backlog."
      ]
    : [
        "Đọc bài 01-05 để nắm nền tảng AI.",
        "Thực hành bài 06-17 để cải thiện BA workflow và artifact.",
        "Học bài 18-20 để đặc tả AI-enabled product và BA leadership.",
        "Dùng project use case để áp dụng AI workflow vào tình huống delivery thật.",
        "Dùng lab và resource library trên backlog thật của bạn."
      ];

  return `---
title: ${yamlString(title)}
description: ${yamlString(intro)}
---

# ${title}

${intro}

## ${isEn ? "Course modules" : "Các nhóm nội dung"}

<div class="course-grid">
${sectionCards}
<div class="course-card"><strong>${isEn ? "Project Use Cases" : "Use case thực tế trong dự án"}</strong>${isEn ? "70+ detailed scenarios, including frontend/UI, backend/API, data integration, QA, and AI product work." : "70+ tình huống chi tiết, gồm frontend/UI, backend/API, data integration, QA và AI product work."}</div>
</div>

## Learning path

\`\`\`mermaid
flowchart LR
    A["AI foundations"] --> B["BA workflows"]
    B --> C["Context engineering"]
    C --> D["Requirement quality"]
    D --> E["Artifacts and diagrams"]
    E --> F["AI product requirements"]
    F --> G["Governance and adoption"]
\`\`\`

## ${isEn ? "Role-based learning paths" : "Learning path theo vai trò"}

${roleLearningPaths(locale)}

## What you will be able to do

${list(abilityList)}

## Start here

${numbered(startSteps)}

## ${isEn ? "Capstone project simulations" : "Capstone mô phỏng dự án"}

${capstones.map((capstone) => `- [${capstone[locale].title}](./capstones/${capstone.slug}/) - ${capstone[locale].summary}`).join("\n")}
`;
}

function gamePage(locale) {
  const isEn = locale === "en";
  return `---
title: ${yamlString(isEn ? "Pixel Quest Game Mode" : "Pixel Quest Game Mode")}
description: ${yamlString(isEn ? "A retro pixel adventure map for learning AI as a software Business Analyst." : "Bản đồ phiêu lưu pixel retro để học AI cho software Business Analyst.")}
---

# ${isEn ? "Pixel Quest Game Mode" : "Pixel Quest Game Mode"}

${isEn ? "Use this optional mode when you want to move through the course like a game. Each quest maps to one theory lesson, and your progress is saved locally in your browser." : "Dùng mode tùy chọn này khi bạn muốn đi qua course như một game. Mỗi quest tương ứng một bài lý thuyết, và tiến độ được lưu local trong browser của bạn."}

<PixelQuest locale="${locale}" mode="page" />
`;
}

const resourceTemplates = [
  {
    slug: "ai-feature-requirement-template",
    en: {
      title: "AI Feature Requirement Template",
      purpose: "Use this when a feature contains model output, generated recommendations, classification, summarization, retrieval, or AI-assisted decisions.",
      rows: [["User goal", "Who uses the AI output, for what decision, and what business outcome should improve?"], ["AI task boundary", "What the AI may do, what it must not do, and when deterministic rules are preferred."], ["Inputs and prohibited inputs", "Allowed sources, PII handling, sensitive fields, and data retention expectations."], ["Output contract", "Format, required fields, confidence behavior, explanation, citation, and unsupported-claim label."], ["Human review and fallback", "Triggers, reviewer role, escalation path, refusal message, correction capture, and audit."], ["Evaluation and monitoring", "Test set, quality rubric, telemetry, drift signal, alert threshold, and release gate."]],
      prompt: "Create an AI feature requirement using the template. Ask for missing context first. Separate facts, assumptions, decisions needed, and unsupported claims."
    },
    vi: {
      title: "Template requirement cho AI feature",
      purpose: "Dùng khi feature có model output, recommendation, classification, summarization, retrieval hoặc AI-assisted decision.",
      rows: [["User goal", "Ai dùng output AI, cho decision nào, và business outcome nào cần cải thiện?"], ["AI task boundary", "AI được làm gì, không được làm gì, khi nào nên dùng deterministic rule."], ["Input và prohibited input", "Allowed source, PII handling, sensitive field và data retention expectation."], ["Output contract", "Format, required field, confidence behavior, explanation, citation và unsupported-claim label."], ["Human review và fallback", "Trigger, reviewer role, escalation path, refusal message, correction capture và audit."], ["Evaluation và monitoring", "Test set, quality rubric, telemetry, drift signal, alert threshold và release gate."]],
      prompt: "Tạo requirement cho AI feature theo template. Hỏi missing context trước. Tách fact, assumption, decision needed và unsupported claim."
    }
  },
  {
    slug: "acceptance-criteria-quality-rubric",
    en: {
      title: "Acceptance Criteria Quality Rubric",
      purpose: "Use this to review AI-generated or human-written acceptance criteria before sprint refinement.",
      rows: [["Actor and trigger", "The user, role, system event, or scheduled trigger is explicit."], ["Business rule", "Thresholds, permissions, calculations, and policy constraints are testable."], ["Data and state", "Required fields, lifecycle state, preconditions, and invalid data are covered."], ["Negative and edge cases", "Boundary, failure, exception, and permission scenarios are included."], ["NFR and observability", "Performance, security, audit, accessibility, localization, or analytics expectations are stated when relevant."], ["Evidence", "Each criterion traces to source, stakeholder decision, or labeled assumption."]],
      prompt: "Review these acceptance criteria with the rubric. Return defects by severity, missing cases, testability gaps, and rewrite candidates without inventing policy."
    },
    vi: {
      title: "Rubric chất lượng acceptance criteria",
      purpose: "Dùng để review acceptance criteria do AI hoặc con người viết trước sprint refinement.",
      rows: [["Actor và trigger", "User, role, system event hoặc scheduled trigger explicit."], ["Business rule", "Threshold, permission, calculation và policy constraint test được."], ["Data và state", "Required field, lifecycle state, precondition và invalid data được cover."], ["Negative và edge case", "Boundary, failure, exception và permission scenario được thêm."], ["NFR và observability", "Performance, security, audit, accessibility, localization hoặc analytics được nêu khi relevant."], ["Evidence", "Mỗi criterion trace về source, stakeholder decision hoặc assumption có label."]],
      prompt: "Review acceptance criteria này bằng rubric. Trả về defect theo severity, missing case, testability gap và rewrite candidate mà không invent policy."
    }
  },
  {
    slug: "ui-state-requirement-template",
    en: {
      title: "UI State Requirement Template",
      purpose: "Use this when translating Figma, wireframes, or a screen idea into implementable frontend requirements.",
      rows: [["Screen purpose", "Primary user goal, entry point, and decision the screen supports."], ["State inventory", "Loading, empty, success, error, partial data, permission denied, offline, and validation states."], ["Control behavior", "Visible, hidden, disabled, read-only, default, tooltip, and confirmation behavior by role and state."], ["Copy and recovery", "Error message, empty-state guidance, support path, retry, and next best action."], ["Responsive and accessibility", "Mobile layout, keyboard behavior, focus order, labels, announcements, and contrast expectations."], ["Backend dependency", "API call, field source, cache, timeout, partial failure, and audit requirement."]],
      prompt: "Convert this UI concept into a UI state requirement table. Include roles, states, controls, copy, backend dependency, acceptance criteria, and open questions for UX/product/frontend/backend/QA."
    },
    vi: {
      title: "Template requirement cho UI state",
      purpose: "Dùng khi chuyển Figma, wireframe hoặc screen idea thành frontend requirement implement được.",
      rows: [["Screen purpose", "Primary user goal, entry point và decision mà screen hỗ trợ."], ["State inventory", "Loading, empty, success, error, partial data, permission denied, offline và validation state."], ["Control behavior", "Visible, hidden, disabled, read-only, default, tooltip và confirmation behavior theo role/state."], ["Copy và recovery", "Error message, empty-state guidance, support path, retry và next best action."], ["Responsive và accessibility", "Mobile layout, keyboard behavior, focus order, label, announcement và contrast expectation."], ["Backend dependency", "API call, field source, cache, timeout, partial failure và audit requirement."]],
      prompt: "Chuyển UI concept này thành bảng UI state requirement. Bao gồm role, state, control, copy, backend dependency, acceptance criteria và open question cho UX/product/frontend/backend/QA."
    }
  },
  {
    slug: "api-contract-checklist",
    en: {
      title: "API Contract Checklist",
      purpose: "Use this when a BA must align frontend needs, backend constraints, QA expectations, and business rules around an API.",
      rows: [["Endpoint purpose", "Business action, consumer, producer, and user-facing outcome."], ["Request schema", "Required fields, optional fields, validation rules, enums, dates, IDs, and examples."], ["Response schema", "Success payload, partial success, empty result, pagination, sorting, and metadata."], ["Errors and recovery", "Error taxonomy, message ownership, retry, timeout, idempotency, and fallback behavior."], ["Security and audit", "Authentication, authorization, RBAC, PII, audit event, rate limit, and abuse cases."], ["Versioning and compatibility", "Backward compatibility, deprecation, feature flags, and migration expectations."]],
      prompt: "Review this API contract from a BA perspective. Identify missing business rules, schema gaps, error cases, security requirements, QA scenarios, and frontend impact."
    },
    vi: {
      title: "Checklist API contract",
      purpose: "Dùng khi BA cần align frontend need, backend constraint, QA expectation và business rule quanh API.",
      rows: [["Endpoint purpose", "Business action, consumer, producer và user-facing outcome."], ["Request schema", "Required field, optional field, validation rule, enum, date, ID và example."], ["Response schema", "Success payload, partial success, empty result, pagination, sorting và metadata."], ["Error và recovery", "Error taxonomy, message ownership, retry, timeout, idempotency và fallback behavior."], ["Security và audit", "Authentication, authorization, RBAC, PII, audit event, rate limit và abuse case."], ["Versioning và compatibility", "Backward compatibility, deprecation, feature flag và migration expectation."]],
      prompt: "Review API contract này dưới góc BA. Identify missing business rule, schema gap, error case, security requirement, QA scenario và frontend impact."
    }
  },
  {
    slug: "rag-knowledge-contract-canvas",
    en: {
      title: "RAG Knowledge Contract Canvas",
      purpose: "Use this before specifying a knowledge assistant, policy assistant, support assistant, or document Q&A feature.",
      rows: [["Source inventory", "Approved sources, owners, update cadence, effective dates, and excluded sources."], ["Authority and conflicts", "Priority order, conflict warnings, policy override rules, and decision owner."], ["Access control", "Role-based retrieval, document sensitivity, tenant boundary, and no-leakage test cases."], ["Citation behavior", "Citation display, source snippet, confidence, unsupported answer, and freshness signal."], ["Fallback", "No-answer behavior, escalation path, human review trigger, and support handoff."], ["Retrieval evaluation", "Representative questions, expected source, wrong-source cases, and retrieval quality metric."]],
      prompt: "Create a RAG knowledge contract for this assistant. Include source authority, freshness, access control, citation, conflict handling, fallback, retrieval metrics, and test questions."
    },
    vi: {
      title: "Canvas RAG knowledge contract",
      purpose: "Dùng trước khi đặc tả knowledge assistant, policy assistant, support assistant hoặc document Q&A feature.",
      rows: [["Source inventory", "Approved source, owner, update cadence, effective date và excluded source."], ["Authority và conflict", "Priority order, conflict warning, policy override rule và decision owner."], ["Access control", "Role-based retrieval, document sensitivity, tenant boundary và no-leakage test case."], ["Citation behavior", "Citation display, source snippet, confidence, unsupported answer và freshness signal."], ["Fallback", "No-answer behavior, escalation path, human review trigger và support handoff."], ["Retrieval evaluation", "Representative question, expected source, wrong-source case và retrieval quality metric."]],
      prompt: "Tạo RAG knowledge contract cho assistant này. Bao gồm source authority, freshness, access control, citation, conflict handling, fallback, retrieval metric và test question."
    }
  },
  {
    slug: "prompt-review-checklist",
    en: {
      title: "Prompt Review Checklist",
      purpose: "Use this before turning a one-off prompt into a reusable team prompt or workflow.",
      rows: [["Role and goal", "The prompt names the BA role, business goal, user, and decision context."], ["Source boundaries", "The prompt says which sources may be used and what to do when evidence is missing."], ["Output contract", "The result format, required columns, severity labels, and validation questions are defined."], ["Safety and privacy", "The prompt excludes confidential data, PII, unsafe instructions, and unsupported claims."], ["Critique step", "The model must review its own output for ambiguity, conflict, gaps, and hallucination."], ["Reuse notes", "Inputs, assumptions, examples, and known failure modes are documented for the BA team."]],
      prompt: "Review this prompt for BA team reuse. Score role clarity, source boundaries, output contract, safety, critique step, and failure modes. Suggest a stronger version."
    },
    vi: {
      title: "Checklist review prompt",
      purpose: "Dùng trước khi biến prompt one-off thành reusable team prompt hoặc workflow.",
      rows: [["Role và goal", "Prompt nêu BA role, business goal, user và decision context."], ["Source boundary", "Prompt nói source nào được dùng và làm gì khi thiếu evidence."], ["Output contract", "Result format, required column, severity label và validation question được define."], ["Safety và privacy", "Prompt exclude confidential data, PII, unsafe instruction và unsupported claim."], ["Critique step", "Model phải review output của nó về ambiguity, conflict, gap và hallucination."], ["Reuse note", "Input, assumption, example và known failure mode được document cho BA team."]],
      prompt: "Review prompt này để BA team reuse. Chấm role clarity, source boundary, output contract, safety, critique step và failure mode. Đề xuất version tốt hơn."
    }
  },
  {
    slug: "ai-risk-human-review-matrix",
    en: {
      title: "AI Risk and Human Review Matrix",
      purpose: "Use this to decide when AI output can proceed, when it needs review, and when it must fallback or escalate.",
      rows: [["Low risk", "Drafting, summarization, formatting, or brainstorming from non-sensitive sources with BA review."], ["Medium risk", "Requirements, customer-facing text, support recommendations, or source-grounded answers with named reviewer."], ["High risk", "Legal, financial, medical, employment, access control, pricing, compliance, or irreversible decisions."], ["Review trigger", "Low confidence, missing citation, conflict, PII, sensitive user group, high-value transaction, or user harm risk."], ["Fallback", "Explain limitation, ask for more context, route to human, log reason, and avoid invented answers."], ["Audit", "Store source, output, reviewer decision, correction, timestamp, and unresolved risk."]],
      prompt: "Classify this AI workflow by risk tier. Define human review triggers, fallback behavior, audit needs, owners, and acceptance criteria for each tier."
    },
    vi: {
      title: "Matrix AI risk và human review",
      purpose: "Dùng để quyết định khi nào output AI được đi tiếp, cần review, hoặc phải fallback/escalate.",
      rows: [["Low risk", "Drafting, summarization, formatting hoặc brainstorming từ non-sensitive source có BA review."], ["Medium risk", "Requirement, customer-facing text, support recommendation hoặc source-grounded answer có reviewer rõ."], ["High risk", "Legal, financial, medical, employment, access control, pricing, compliance hoặc irreversible decision."], ["Review trigger", "Low confidence, missing citation, conflict, PII, sensitive user group, high-value transaction hoặc user harm risk."], ["Fallback", "Giải thích limitation, hỏi thêm context, route to human, log reason và tránh invented answer."], ["Audit", "Lưu source, output, reviewer decision, correction, timestamp và unresolved risk."]],
      prompt: "Classify AI workflow này theo risk tier. Define human review trigger, fallback behavior, audit need, owner và acceptance criteria cho từng tier."
    }
  },
  {
    slug: "decision-log-template",
    en: {
      title: "Decision Log Template",
      purpose: "Use this when AI-assisted analysis produces options, trade-offs, or open questions that require human accountability.",
      rows: [["Decision", "The exact decision needed, not just a topic or discussion area."], ["Options", "Viable alternatives, including non-AI or lower-risk options."], ["Evidence", "Source IDs, data points, stakeholder statements, assumptions, and unsupported claims."], ["Impact", "Scope, cost, timeline, user experience, operations, risk, and downstream artifacts affected."], ["Owner and due date", "The accountable person and the date by which delivery needs the decision."], ["Outcome", "Approved choice, rationale, conditions, follow-up actions, and revisit trigger."]],
      prompt: "Create a decision log from this analysis. Separate decisions, options, evidence, assumptions, impact, owner, due date, and follow-up actions."
    },
    vi: {
      title: "Template decision log",
      purpose: "Dùng khi AI-assisted analysis tạo option, trade-off hoặc open question cần human accountability.",
      rows: [["Decision", "Decision chính xác cần có, không chỉ topic thảo luận."], ["Options", "Alternative khả thi, gồm non-AI hoặc option ít rủi ro hơn."], ["Evidence", "Source ID, data point, stakeholder statement, assumption và unsupported claim."], ["Impact", "Scope, cost, timeline, user experience, operations, risk và downstream artifact bị ảnh hưởng."], ["Owner và due date", "Người accountable và ngày delivery cần decision."], ["Outcome", "Approved choice, rationale, condition, follow-up action và revisit trigger."]],
      prompt: "Tạo decision log từ analysis này. Tách decision, option, evidence, assumption, impact, owner, due date và follow-up action."
    }
  },
  {
    slug: "definition-of-ready-done-ai-ba",
    en: {
      title: "Definition of Ready and Done for AI-Augmented BA Work",
      purpose: "Use this to define quality gates before AI-assisted BA artifacts enter refinement, build, test, or release decisions.",
      rows: [["Ready: source pack", "Sources have IDs, owners, dates, approval status, and sensitivity labels."], ["Ready: task boundary", "The AI task, output format, constraints, and prohibited assumptions are explicit."], ["Ready: decision owner", "Open questions and approvals have owners and target dates."], ["Done: evidence review", "Facts, assumptions, unsupported claims, and decisions are separated."], ["Done: receiving-team fit", "Product, engineering, QA, UX, operations, or governance can act from the artifact."], ["Done: risk control", "NFR, privacy, access, monitoring, fallback, and human review controls are included when relevant."]],
      prompt: "Evaluate this BA artifact against Definition of Ready and Done for AI-assisted work. Return pass/fail, gaps, remediation steps, and questions for stakeholders."
    },
    vi: {
      title: "Definition of Ready và Done cho AI-augmented BA work",
      purpose: "Dùng để định nghĩa quality gate trước khi AI-assisted BA artifact đi vào refinement, build, test hoặc release decision.",
      rows: [["Ready: source pack", "Source có ID, owner, date, approval status và sensitivity label."], ["Ready: task boundary", "AI task, output format, constraint và prohibited assumption explicit."], ["Ready: decision owner", "Open question và approval có owner và target date."], ["Done: evidence review", "Fact, assumption, unsupported claim và decision được tách riêng."], ["Done: receiving-team fit", "Product, engineering, QA, UX, operations hoặc governance có thể hành động từ artifact."], ["Done: risk control", "NFR, privacy, access, monitoring, fallback và human review control được thêm khi relevant."]],
      prompt: "Evaluate BA artifact này theo Definition of Ready và Done cho AI-assisted work. Trả về pass/fail, gap, remediation step và question cho stakeholder."
    }
  }
];

function resourceTemplatePage(template, locale) {
  const isEn = locale === "en";
  const item = template[locale];
  const tableHeaders = isEn ? ["Section", "What to capture"] : ["Section", "Nội dung cần capture"];

  return `---
title: ${yamlString(item.title)}
description: ${yamlString(item.purpose)}
---

# ${item.title}

${item.purpose}

## Template

${artifactTable(tableHeaders, item.rows)}

## How to use it

${numbered(
  isEn
    ? [
        "Prepare source evidence before asking AI to draft the artifact.",
        "Ask AI to label facts, assumptions, unsupported claims, and decisions needed.",
        "Review the result manually with the receiving team.",
        "Convert open risks into validation questions, owner assignments, or backlog items."
      ]
    : [
        "Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.",
        "Yêu cầu AI label fact, assumption, unsupported claim và decision needed.",
        "Review result thủ công với receiving team.",
        "Chuyển open risk thành validation question, owner assignment hoặc backlog item."
      ]
)}

## AI prompt

\`\`\`text
${item.prompt}
\`\`\`
`;
}

function resourceIndex(locale) {
  const isEn = locale === "en";
  const templateLinks = resourceTemplates
    .map((template) => {
      const item = template[locale];
      return `<a class="template-card" href="./${template.slug}"><strong>${item.title}</strong><span>${item.purpose}</span></a>`;
    })
    .join("\n");
  return `---
title: ${yamlString(isEn ? "Resource Library" : "Thư viện tài nguyên")}
---

# ${isEn ? "Resource Library" : "Thư viện tài nguyên"}

${isEn ? "Reusable playbooks for BA work with AI." : "Playbook tái sử dụng cho công việc BA với AI."}

## Resources

- [${isEn ? "Prompt Playbook" : "Prompt playbook"}](./prompt-library)
- [${isEn ? "Checklists and Rubrics" : "Checklist và rubric"}](./checklists)
- [Glossary](./glossary)

## ${isEn ? "Project-ready templates" : "Template dùng trong dự án"}

<div class="template-grid">
${templateLinks}
</div>

## Resource map

\`\`\`mermaid
flowchart LR
    A["Context package"] --> B["Prompt playbook"]
    B --> C["Structured artifact"]
    C --> D["Review rubric"]
    D --> E["Team decision"]
\`\`\`

## How to use the library

1. Start from the checklist for your task.
2. Use a prompt pattern only after source context is ready.
3. Require AI to label assumptions and unsupported claims.
4. Convert output into a BA-owned artifact before sharing it.
`;
}

function promptLibrary(locale) {
  const isEn = locale === "en";
  return `---
title: ${yamlString(isEn ? "Prompt Playbook" : "Prompt playbook")}
---

# ${isEn ? "Prompt Playbook" : "Prompt playbook"}

## Context package template

\`\`\`text
Role:
Business goal:
Users and stakeholders:
Scope in / scope out:
Source IDs:
Constraints:
Task:
Output format:
Quality bar:
Questions before drafting:
\`\`\`

## Requirement review prompt

\`\`\`text
${isEn ? "Review the supplied requirements using this taxonomy: ambiguity, conflict, missing actor, missing data, missing business rule, NFR gap, non-testable wording. Return a table with issue, severity, evidence, affected text, clarification question, and testable rewrite candidate. Do not invent policy." : "Review requirement được cung cấp bằng taxonomy: ambiguity, conflict, missing actor, missing data, missing business rule, NFR gap, non-testable wording. Trả về bảng gồm issue, severity, evidence, affected text, clarification question và candidate rewrite test được. Không tự bịa policy."}
\`\`\`

## AI feature specification prompt

\`\`\`text
${isEn ? "Specify this AI-enabled feature with user goal, AI task, allowed inputs, prohibited inputs, output contract, confidence threshold, human review trigger, fallback behavior, correction capture, audit, monitoring events, and evaluation metrics." : "Đặc tả AI-enabled feature này với user goal, AI task, allowed input, prohibited input, output contract, confidence threshold, human review trigger, fallback behavior, correction capture, audit, monitoring event và evaluation metric."}
\`\`\`

## RAG assistant prompt

\`\`\`text
${isEn ? "Create a RAG knowledge contract: source inventory, authority, freshness, access control, chunking assumptions, citation behavior, conflict handling, fallback, retrieval metrics, answer-quality metrics, and test questions." : "Tạo RAG knowledge contract: source inventory, authority, freshness, access control, chunking assumption, citation behavior, conflict handling, fallback, retrieval metric, answer-quality metric và test question."}
\`\`\`

## Prompt injection and unsafe input review

\`\`\`text
${isEn ? "Review this AI-enabled workflow for prompt injection and unsafe input risk. Identify user-controlled fields, retrieved content, tool actions, data exposure paths, and instructions that could override system rules. Return risks, likely attack examples, BA requirements, acceptance criteria, logging needs, and human escalation triggers." : "Review workflow AI-enabled này cho prompt injection và unsafe input risk. Identify user-controlled field, retrieved content, tool action, data exposure path và instruction có thể override system rule. Trả về risk, ví dụ attack có khả năng xảy ra, BA requirement, acceptance criteria, logging need và human escalation trigger."}
\`\`\`

## Bias and fairness review prompt

\`\`\`text
${isEn ? "Assess this AI use case for bias and fairness risk. Identify affected user groups, sensitive attributes, proxy variables, historical data bias, harmful outcomes, explainability needs, review controls, appeal paths, and metrics the BA should request before release." : "Assess use case AI này cho bias và fairness risk. Identify affected user group, sensitive attribute, proxy variable, historical data bias, harmful outcome, explainability need, review control, appeal path và metric BA nên yêu cầu trước release."}
\`\`\`

## Observability and evaluation plan prompt

\`\`\`text
${isEn ? "Create an observability and evaluation plan for this AI feature. Include success metric, failure metric, quality rubric, evaluation set design, model output logging, user feedback capture, human correction capture, drift signals, alert thresholds, dashboard users, and release decision gates." : "Tạo observability và evaluation plan cho AI feature này. Bao gồm success metric, failure metric, quality rubric, evaluation set design, model output logging, user feedback capture, human correction capture, drift signal, alert threshold, dashboard user và release decision gate."}
\`\`\`

## Model selection and cost trade-off prompt

\`\`\`text
${isEn ? "Compare model options for this use case. Evaluate task fit, latency, accuracy need, context size, privacy, access control, integration complexity, unit cost, token budget, fallback option, and when a smaller model or deterministic rule is enough. Return a BA decision matrix with recommendation and assumptions." : "Compare model option cho use case này. Evaluate task fit, latency, accuracy need, context size, privacy, access control, integration complexity, unit cost, token budget, fallback option và khi nào smaller model hoặc deterministic rule là đủ. Trả về BA decision matrix có recommendation và assumption."}
\`\`\`
`;
}

function checklists(locale) {
  const isEn = locale === "en";
  const rows = isEn
    ? [
        ["Requirement quality", "Actor, behavior, business rule, data, edge case, NFR, testability, source evidence"],
        ["AI output review", "Facts, assumptions, unsupported claims, missing context, severity, owner"],
        ["AI feature spec", "Task, input, output, confidence, fallback, human review, evaluation, monitoring"],
        ["RAG governance", "Source authority, freshness, access control, citation, conflict handling, fallback"],
        ["Prompt injection", "User-controlled input, retrieved content, tool action, instruction hierarchy, refusal, escalation, logging"],
        ["Bias and fairness", "Affected groups, proxy variables, historical bias, explainability, appeal path, fairness metric"],
        ["Observability", "Evaluation set, output logs, correction capture, drift signal, alert threshold, dashboard owner"],
        ["Model selection", "Task fit, context need, latency, quality bar, privacy, access control, cost guardrail, fallback model"],
        ["BA team adoption", "Use-case tier, approved tools, data policy, quality gate, metric, escalation"]
      ]
    : [
        ["Requirement quality", "Actor, behavior, business rule, data, edge case, NFR, testability, source evidence"],
        ["AI output review", "Fact, assumption, unsupported claim, missing context, severity, owner"],
        ["AI feature spec", "Task, input, output, confidence, fallback, human review, evaluation, monitoring"],
        ["RAG governance", "Source authority, freshness, access control, citation, conflict handling, fallback"],
        ["Prompt injection", "User-controlled input, retrieved content, tool action, instruction hierarchy, refusal, escalation, logging"],
        ["Bias and fairness", "Affected group, proxy variable, historical bias, explainability, appeal path, fairness metric"],
        ["Observability", "Evaluation set, output log, correction capture, drift signal, alert threshold, dashboard owner"],
        ["Model selection", "Task fit, context need, latency, quality bar, privacy, access control, cost guardrail, fallback model"],
        ["BA team adoption", "Use-case tier, approved tool, data policy, quality gate, metric, escalation"]
      ];

  return `---
title: ${yamlString(isEn ? "Checklists and Rubrics" : "Checklist và rubric")}
---

# ${isEn ? "Checklists and Rubrics" : "Checklist và rubric"}

| Checklist | What to verify |
| --- | --- |
${rows.map(([area, checks]) => `| ${area} | ${checks} |`).join("\n")}

## Review flow

\`\`\`mermaid
flowchart LR
    A["Draft"] --> B["Evidence check"]
    B --> C["Requirement quality rubric"]
    C --> D["Risk and NFR review"]
    D --> E["Stakeholder validation"]
    E --> F["Delivery-ready artifact"]
\`\`\`

## Scoring guide

- 1 means the artifact is risky or unclear.
- 2 means the artifact is usable with known gaps.
- 3 means the artifact is delivery-ready and evidence-backed.

## ${isEn ? "AI risk controls BAs should request" : "AI risk control BA nên yêu cầu"}

- ${isEn ? "Prompt injection: define what user input, retrieved documents, and tool outputs are allowed to influence." : "Prompt injection: định nghĩa user input, retrieved document và tool output được phép ảnh hưởng điều gì."}
- ${isEn ? "Bias: require representative evaluation cases and a way for users or operators to challenge harmful outcomes." : "Bias: yêu cầu evaluation case đại diện và cách để user hoặc operator challenge harmful outcome."}
- ${isEn ? "Observability: log enough model input, output, confidence, fallback, and correction data to learn after release." : "Observability: log đủ model input, output, confidence, fallback và correction data để học sau release."}
- ${isEn ? "Access control: verify that the AI cannot retrieve or reveal information beyond the user's permission." : "Access control: verify AI không retrieve hoặc reveal thông tin vượt quá permission của user."}
- ${isEn ? "Cost guardrail: define token budget, volume assumptions, escalation rules, and lower-cost fallback for routine tasks." : "Cost guardrail: định nghĩa token budget, volume assumption, escalation rule và fallback rẻ hơn cho routine task."}
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
| LLM | ${isEn ? "A language model that transforms visible context into likely text output; useful for drafting, summarizing, classifying, and critiquing." : "Language model biến context nhìn thấy được thành text output có khả năng phù hợp; hữu ích cho draft, summarize, classify và critique."} |
| Hallucination | ${isEn ? "A fluent claim not supported by provided evidence; should become an open question, not a requirement." : "Claim trôi chảy nhưng không được evidence hỗ trợ; nên trở thành open question, không phải requirement."} |
| RAG | ${isEn ? "Retrieval-Augmented Generation: retrieving source material before generating an answer." : "Retrieval-Augmented Generation: retrieve source material trước khi generate answer."} |
| Context engineering | ${isEn ? "Designing role, goal, sources, constraints, output format, and review rules around an AI task." : "Thiết kế role, goal, source, constraint, output format và review rule quanh một AI task."} |
| Acceptance criteria | ${isEn ? "Observable conditions that make a requirement testable and releasable." : "Điều kiện observable giúp requirement test được và đủ để release."} |
| Traceability | ${isEn ? "Mapping business goals to requirements, tests, evidence, and decisions." : "Mapping business goal với requirement, test, evidence và decision."} |
| Confidence threshold | ${isEn ? "A defined cutoff that decides whether AI output can proceed, needs review, or must fallback." : "Ngưỡng xác định output AI được đi tiếp, cần review hoặc phải fallback."} |
| Human-in-the-loop | ${isEn ? "A designed workflow where a human reviews, corrects, approves, or rejects AI output under clear triggers." : "Workflow được thiết kế để con người review, sửa, approve hoặc reject output AI theo trigger rõ."} |
| Evaluation | ${isEn ? "Systematic measurement of AI output against expected behavior, often using curated test cases." : "Đo có hệ thống output AI so với behavior mong muốn, thường bằng curated test case."} |
| Governance | ${isEn ? "Rules, roles, controls, metrics, and review gates that make AI use safe and useful at team scale." : "Rule, role, control, metric và review gate giúp dùng AI an toàn và hữu ích ở scale team."} |
| Prompt injection | ${isEn ? "A user, document, or external input tries to override the intended AI instructions; BA requirements should define boundaries, refusal, escalation, and logging." : "User, document hoặc external input cố override instruction dự kiến của AI; requirement của BA nên định nghĩa boundary, refusal, escalation và logging."} |
| Bias | ${isEn ? "A systematic pattern where AI outcomes disadvantage a group or reflect unfair historical data; BA work should include fairness questions, test cases, and appeal paths." : "Pattern có hệ thống khiến outcome AI bất lợi cho một nhóm hoặc phản ánh historical data không công bằng; BA nên có fairness question, test case và appeal path."} |
| Observability | ${isEn ? "The ability to see how an AI feature behaves after release through logs, metrics, feedback, corrections, alerts, and dashboards." : "Khả năng nhìn thấy AI feature behave ra sao sau release qua log, metric, feedback, correction, alert và dashboard."} |
| Model selection | ${isEn ? "Choosing the right model or non-AI method by task fit, quality need, latency, context, privacy, access control, and cost." : "Chọn model hoặc phương án non-AI phù hợp theo task fit, quality need, latency, context, privacy, access control và cost."} |
| PII | ${isEn ? "Personally identifiable information; BA prompts, data flows, and AI feature requirements should define redaction, retention, and access rules." : "Personally identifiable information; prompt, data flow và requirement AI của BA nên định nghĩa redaction, retention và access rule."} |
| Access control | ${isEn ? "Rules that ensure users and AI retrieval can only access information they are allowed to see." : "Rule đảm bảo user và AI retrieval chỉ access thông tin được phép xem."} |
| Evaluation set | ${isEn ? "A curated collection of representative, edge, failure, and safety cases used to judge whether AI behavior is good enough." : "Bộ case được curate gồm representative, edge, failure và safety case để đánh giá behavior AI đã đủ tốt chưa."} |
| Cost guardrail | ${isEn ? "A requirement that limits AI spend through token budget, model choice, caching, volume assumptions, fallback paths, and monitoring." : "Requirement giới hạn chi phí AI qua token budget, model choice, caching, volume assumption, fallback path và monitoring."} |
`;
}

function readme() {
  const syllabusRows = lessons
    .map((lesson, index) => `| ${String(index + 1).padStart(2, "0")} | ${lesson.en.title} | ${lesson.vi.title} |`)
    .join("\n");
  const capstoneRows = capstones
    .map((capstone, index) => `| ${index + 1} | ${capstone.en.title} | ${capstone.vi.title} |`)
    .join("\n");
  const templateRows = resourceTemplates
    .map((template) => `| ${template.en.title} | ${template.vi.title} |`)
    .join("\n");

  return `# AI for Business Analysts

[![English](https://img.shields.io/badge/lang-English-blue)](https://anhtnt90dev.github.io/ai-for-ba/en/)
[![Tiếng Việt](https://img.shields.io/badge/lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](https://anhtnt90dev.github.io/ai-for-ba/vi/)
[![Lessons](https://img.shields.io/badge/lessons-20-0f766e)](#syllabus)
[![Labs](https://img.shields.io/badge/labs-6-b45309)](#labs)
[![Capstones](https://img.shields.io/badge/capstones-3-1d4ed8)](#capstones)
[![Templates](https://img.shields.io/badge/templates-9-0f766e)](#resource-templates)
[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-2562eb)](https://anhtnt90dev.github.io/ai-for-ba/)

A bilingual, artifact-driven course for software Business Analysts who need to understand AI, use AI to improve BA work, and specify AI-enabled products responsibly.

> Documentation site: <https://anhtnt90dev.github.io/ai-for-ba/>

## What Changed in the Deep Version

- Every lesson has its own Mermaid diagram.
- Every lesson includes a concrete BA artifact: matrix, rubric, canvas, checklist, or specification table.
- Every lesson now has a lesson-specific BA relevance section, expert AI review note, and bad-vs-better practice examples.
- Every theory lesson explains common BA difficulties, real project application, and what breaks when the capability is missing.
- Every theory lesson includes a senior BA practice pack: stakeholder questions, decision-log entries, Definition of Ready/Done, before/after artifact examples, and manual verification checks.
- Lessons include mistakes to avoid and actions to apply tomorrow.
- Labs include input samples, exercise steps, expected deliverables, and review rubrics.
- The course overview now includes role-based learning paths for new BAs, senior delivery BAs, frontend/UI BAs, backend/API BAs, AI product BAs, and BA leads.
- The course includes three capstone project simulations for discovery-to-delivery, frontend-backend contract readiness, and AI assistant governance.
- Pixel Quest is now the fullscreen root landing experience; learners can click quest nodes to open lessons, with movement, XP, levels, and Pixel Agents MIT character sprites sourced from the public GitHub repository pixel-agents-hq/pixel-agents.
- The site includes 70+ detailed project use cases across discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI products, domain workflows, and governance, now with project phase, difficulty, artifact, and risk metadata.
- Resources are upgraded into practical playbooks and reusable project templates for prompts, UI states, API contracts, AI feature specs, RAG, risk review, decision logs, and Definition of Ready/Done.

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

## Capstones

| # | English | Tiếng Việt |
| --- | --- | --- |
${capstoneRows}

## Project Use Cases

The use case library includes 70+ detailed, bilingual project scenarios with context, BA challenge, AI-fit boundary, workflow, diagram, deliverables, prompts, review checklist, and risk controls.

- Discovery and alignment
- Requirements and backlog
- Delivery and QA
- Frontend, UI, and UX collaboration
- Backend and API collaboration
- Data and integration requirements
- AI-enabled product use cases
- Domain project scenarios
- Governance and adoption

## Resource Templates

| English | Tiếng Việt |
| --- | --- |
${templateRows}

## Local Preview

\`\`\`sh
npm install
npm run docs:dev
npm test
\`\`\`

## Deployment

GitHub Actions deploys the VitePress build to GitHub Pages after every push to \`main\`.

## Attribution and Copyright Review

This project was reviewed for external assets and references. No stock photos, commercial fonts, or third-party course text are embedded. The course text, Mermaid diagrams, SVG logo, layout, and game map UI are project-authored.

- Pixel Agents character sprites: sourced from <https://github.com/pixel-agents-hq/pixel-agents>, path \`webview-ui/public/assets/characters/\`, MIT License. Local copies include \`docs/public/assets/pixel-agents/LICENSE-MIT\` and \`docs/public/assets/pixel-agents/SOURCE.md\`. Files used: \`char_0.png\` through \`char_5.png\`.
- Upstream note: the Pixel Agents repository README says the characters are based on JIK-A-4, Metro City. This repository relies on the Pixel Agents MIT license and preserves the upstream MIT notice locally.
- Documentation framework and diagram tooling: VitePress, Mermaid, and vitepress-plugin-mermaid are npm dependencies used to build and render the site. Dependency license metadata is tracked through \`package-lock.json\`; the current dependency set is permissive (\`MIT\`, \`Apache-2.0\`, \`BSD\`, \`ISC\`, \`CC0-1.0\`, \`Unlicense\`, and \`MPL-2.0 OR Apache-2.0\`). The transitive \`khroma\` package omits a license field in the lockfile but ships an MIT license file in its npm package.
- Badges: README language, lesson, lab, and GitHub Pages badges use shields.io badge URLs and are not embedded site assets.
- Repository and site links: GitHub Pages and GitHub repository URLs are project-owned navigation and deployment references.

## License

MIT

## Contact

<anhtnt90dev@gmail.com>
`;
}

write("docs/index.md", rootPage());
write("docs/en/index.md", homePage("en"));
write("docs/vi/index.md", homePage("vi"));
write("docs/en/game/index.md", gamePage("en"));
write("docs/vi/game/index.md", gamePage("vi"));

for (const lesson of lessons) {
  write(`docs/en/lessons/${lesson.slug}/index.md`, lessonPage(lesson, "en"));
  write(`docs/vi/lessons/${lesson.slug}/index.md`, lessonPage(lesson, "vi"));
}

for (const lab of labs) {
  write(`docs/en/labs/${lab.slug}/index.md`, labPage(lab, "en"));
  write(`docs/vi/labs/${lab.slug}/index.md`, labPage(lab, "vi"));
}

write("docs/en/capstones/index.md", capstoneIndex("en"));
write("docs/vi/capstones/index.md", capstoneIndex("vi"));

for (const capstone of capstones) {
  write(`docs/en/capstones/${capstone.slug}/index.md`, capstonePage(capstone, "en"));
  write(`docs/vi/capstones/${capstone.slug}/index.md`, capstonePage(capstone, "vi"));
}

write("docs/en/use-cases/index.md", useCaseIndex("en"));
write("docs/vi/use-cases/index.md", useCaseIndex("vi"));

for (const useCase of useCases) {
  write(`docs/en/use-cases/${useCase.slug}/index.md`, useCasePage(useCase, "en"));
  write(`docs/vi/use-cases/${useCase.slug}/index.md`, useCasePage(useCase, "vi"));
}

write("docs/en/resources/index.md", resourceIndex("en"));
write("docs/en/resources/prompt-library.md", promptLibrary("en"));
write("docs/en/resources/checklists.md", checklists("en"));
write("docs/en/resources/glossary.md", glossary("en"));
write("docs/vi/resources/index.md", resourceIndex("vi"));
write("docs/vi/resources/prompt-library.md", promptLibrary("vi"));
write("docs/vi/resources/checklists.md", checklists("vi"));
write("docs/vi/resources/glossary.md", glossary("vi"));

for (const template of resourceTemplates) {
  write(`docs/en/resources/${template.slug}.md`, resourceTemplatePage(template, "en"));
  write(`docs/vi/resources/${template.slug}.md`, resourceTemplatePage(template, "vi"));
}

write("README.md", readme());

console.log("Seeded deeper AI for BA course content with project use cases.");
