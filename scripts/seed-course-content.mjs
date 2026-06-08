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

function lessonPage(lesson, locale) {
  const item = lesson[locale];
  const upgrade = lessonUpgrade(lesson.slug, locale);
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
</div>

## Learning outcomes

${list(item.outcomes)}

## Why this matters for BA work

<div class="ba-callout">
${item.focus}
</div>

${upgrade.why}

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

function homePage(locale) {
  const isEn = locale === "en";
  const title = "AI for Business Analysts";
  const intro = isEn
    ? "A deep bilingual learning path for software Business Analysts who need to use AI responsibly, improve BA artifacts, and specify AI-enabled products with expert judgment."
    : "Learning path song ngữ chuyên sâu cho software Business Analyst muốn dùng AI có trách nhiệm, cải thiện artifact BA và đặc tả sản phẩm có AI bằng judgment của chuyên gia.";
  const sectionCards = Object.values(sections)
    .map(([en, vi]) => `<div class="course-card"><strong>${isEn ? en : vi}</strong>${isEn ? "Distinct lessons with diagrams, artifacts, prompts, and review controls." : "Bài học riêng biệt với diagram, artifact, prompt và review control."}</div>`)
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
    A["AI foundations"] --> B["BA workflows"]
    B --> C["Context engineering"]
    C --> D["Requirement quality"]
    D --> E["Artifacts and diagrams"]
    E --> F["AI product requirements"]
    F --> G["Governance and adoption"]
\`\`\`

## What you will be able to do

- Explain AI concepts without hype and without unnecessary ML math.
- Use AI to improve discovery, synthesis, requirements, diagrams, and review.
- Build reusable prompt/context patterns for a BA team.
- Specify AI-enabled features with uncertainty, evaluation, human review, fallback, and monitoring.
- Lead AI adoption with governance, quality gates, metrics, and operating model.

## Start here

1. Read lessons 01-05 for AI foundations.
2. Practice lessons 06-17 to improve BA workflow and artifacts.
3. Study lessons 18-20 for AI-enabled product requirements and BA leadership.
4. Use the labs and resource library on your real backlog.
`;
}

function resourceIndex(locale) {
  const isEn = locale === "en";
  return `---
title: ${yamlString(isEn ? "Resource Library" : "Thư viện tài nguyên")}
---

# ${isEn ? "Resource Library" : "Thư viện tài nguyên"}

${isEn ? "Reusable playbooks for BA work with AI." : "Playbook tái sử dụng cho công việc BA với AI."}

## Resources

- [${isEn ? "Prompt Playbook" : "Prompt playbook"}](./prompt-library)
- [${isEn ? "Checklists and Rubrics" : "Checklist và rubric"}](./checklists)
- [Glossary](./glossary)

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
        ["BA team adoption", "Use-case tier, approved tools, data policy, quality gate, metric, escalation"]
      ]
    : [
        ["Requirement quality", "Actor, behavior, business rule, data, edge case, NFR, testability, source evidence"],
        ["AI output review", "Fact, assumption, unsupported claim, missing context, severity, owner"],
        ["AI feature spec", "Task, input, output, confidence, fallback, human review, evaluation, monitoring"],
        ["RAG governance", "Source authority, freshness, access control, citation, conflict handling, fallback"],
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
`;
}

function readme() {
  const syllabusRows = lessons
    .map((lesson, index) => `| ${String(index + 1).padStart(2, "0")} | ${lesson.en.title} | ${lesson.vi.title} |`)
    .join("\n");

  return `# AI for Business Analysts

[![English](https://img.shields.io/badge/lang-English-blue)](https://anhtnt90dev.github.io/ai-for-ba/en/)
[![Tiếng Việt](https://img.shields.io/badge/lang-Ti%E1%BA%BFng%20Vi%E1%BB%87t-red)](https://anhtnt90dev.github.io/ai-for-ba/vi/)
[![Lessons](https://img.shields.io/badge/lessons-20-0f766e)](#syllabus)
[![Labs](https://img.shields.io/badge/labs-6-b45309)](#labs)
[![GitHub Pages](https://img.shields.io/badge/docs-GitHub%20Pages-2562eb)](https://anhtnt90dev.github.io/ai-for-ba/)

A bilingual, artifact-driven course for software Business Analysts who need to understand AI, use AI to improve BA work, and specify AI-enabled products responsibly.

> Documentation site: <https://anhtnt90dev.github.io/ai-for-ba/>

## What Changed in the Deep Version

- Every lesson has its own Mermaid diagram.
- Every lesson includes a concrete BA artifact: matrix, rubric, canvas, checklist, or specification table.
- Every lesson now has a lesson-specific BA relevance section, expert AI review note, and bad-vs-better practice examples.
- Lessons include mistakes to avoid and actions to apply tomorrow.
- Labs include input samples, exercise steps, expected deliverables, and review rubrics.
- Resources are upgraded into practical playbooks for prompts, quality review, AI feature specification, RAG, and governance.

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

## Local Preview

\`\`\`sh
npm install
npm run docs:dev
npm test
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

console.log("Seeded deeper AI for BA course content.");
