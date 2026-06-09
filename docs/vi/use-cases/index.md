---
title: "Use case thực tế trong dự án"
description: "Thư viện 70+ use case thực tế trong dự án, giúp software Business Analyst áp dụng AI vào discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI-enabled product, domain workflow và governance."
---

# Use case thực tế trong dự án

Thư viện 70+ use case thực tế trong dự án, giúp software Business Analyst áp dụng AI vào discovery, requirements, frontend/UI, backend/API, data integration, delivery, AI-enabled product, domain workflow và governance.

<div class="ba-workbench-panel">
Hãy dùng các trang này như playbook làm việc. Chọn use case gần với dự án của bạn, dùng prompt, chuẩn bị source evidence và điều chỉnh deliverable theo team.
</div>

## Duyệt theo nhóm

<div class="usecase-group-summary">
<a class="group-card" href="#discovery-and-alignment"><strong>Discovery và alignment</strong><span>5 use case</span></a>
<a class="group-card" href="#requirements-and-backlog"><strong>Requirements và backlog</strong><span>5 use case</span></a>
<a class="group-card" href="#delivery-and-qa"><strong>Delivery và QA</strong><span>5 use case</span></a>
<a class="group-card" href="#ai-enabled-product-use-cases"><strong>AI-enabled product</strong><span>5 use case</span></a>
<a class="group-card" href="#domain-project-scenarios"><strong>Tình huống theo domain</strong><span>6 use case</span></a>
<a class="group-card" href="#governance-and-adoption"><strong>Governance và adoption</strong><span>4 use case</span></a>
<a class="group-card" href="#frontend-ui-and-ux"><strong>Frontend, UI và UX</strong><span>13 use case</span></a>
<a class="group-card" href="#backend-and-api"><strong>Backend và API</strong><span>12 use case</span></a>
<a class="group-card" href="#data-and-integration"><strong>Data và Integration</strong><span>8 use case</span></a>
<a class="group-card" href="#cross-functional-ba-collaboration"><strong>Collaboration cross-functional của BA</strong><span>8 use case</span></a>
</div>

## Use case map

```mermaid
flowchart LR
    A["Discovery"] --> B["Requirements"]
    B --> C["Delivery and QA"]
    C --> D["Frontend/UI"]
    D --> E["Backend/API"]
    E --> F["Data integration"]
    F --> G["AI-enabled products"]
    G --> H["Domain scenarios"]
    H --> I["Governance"]
```

<section class="usecase-section"><h2 id="discovery-and-alignment">Discovery và alignment</h2><div class="usecase-grid">
<a class="case-card" href="./stakeholder-discovery-from-messy-notes/"><span>Discovery and alignment</span><strong>Discovery stakeholder từ notes lộn xộn</strong><small>Cross-functional product discovery</small><em>Workshop tiếp theo resolve được conflict rủi ro cao nhất và có owner cho mọi open decision.</em></a>
<a class="case-card" href="./project-kickoff-scope-framing/"><span>Discovery and alignment</span><strong>Framing scope cho project kickoff</strong><small>Project initiation</small><em>Kickoff tạo được scope frame đã agreed để delivery, product và operations dùng cho prioritization.</em></a>
<a class="case-card" href="./current-state-process-mapping/"><span>Discovery and alignment</span><strong>Mapping current-state process</strong><small>Operations analysis</small><em>Process map đã validate chỉ ra delay point và decision gap để ưu tiên redesign.</em></a>
<a class="case-card" href="./legacy-modernization-gap-analysis/"><span>Discovery and alignment</span><strong>Gap analysis cho legacy modernization</strong><small>Legacy system modernization</small><em>Migration scope tách rõ behavior phải giữ, redesign và retire dựa trên evidence.</em></a>
<a class="case-card" href="./market-competitor-research-synthesis/"><span>Discovery and alignment</span><strong>Synthesis market và competitor research</strong><small>Product strategy</small><em>Roadmap discussion dùng validated hypothesis và evidence strength thay vì competitor feature list chung chung.</em></a>
</div></section>
<section class="usecase-section"><h2 id="requirements-and-backlog">Requirements và backlog</h2><div class="usecase-grid">
<a class="case-card" href="./user-story-splitting-for-sprint/"><span>Requirements and backlog</span><strong>Split user story cho sprint readiness</strong><small>Agile delivery</small><em>Sprint planning nhận story mà QA và developer có thể estimate, test và release theo increment có ý nghĩa.</em></a>
<a class="case-card" href="./acceptance-criteria-edge-cases/"><span>Requirements and backlog</span><strong>Mở rộng acceptance criteria và edge case</strong><small>Requirements quality</small><em>QA có thể chuyển acceptance criteria thành test case mà không phải hỏi hidden business rule.</em></a>
<a class="case-card" href="./brd-srs-drafting-review/"><span>Requirements and backlog</span><strong>Draft và review BRD/SRS</strong><small>Formal requirements documentation</small><em>BRD hoặc SRS được draft nhanh hơn nhưng vẫn traceable, reviewable và approved bởi đúng owner.</em></a>
<a class="case-card" href="./nfr-risk-workshop/"><span>Requirements and backlog</span><strong>Chuẩn bị workshop NFR và risk</strong><small>Quality attributes</small><em>Quality attribute trở thành requirement đo được và design input trước khi commit architecture.</em></a>
<a class="case-card" href="./traceability-matrix-for-release/"><span>Requirements and backlog</span><strong>Traceability matrix cho release readiness</strong><small>Release governance</small><em>Release sign-off dựa trên coverage và accepted exception visible, không dựa vào artifact rời rạc.</em></a>
</div></section>
<section class="usecase-section"><h2 id="delivery-and-qa">Delivery và QA</h2><div class="usecase-grid">
<a class="case-card" href="./defect-triage-root-cause/"><span>Delivery and QA</span><strong>Triage defect và root-cause analysis</strong><small>Defect management</small><em>Triage decision nhanh hơn nhưng root cause vẫn evidence-based và actionable.</em></a>
<a class="case-card" href="./test-scenario-generation/"><span>Delivery and QA</span><strong>Sinh test scenario từ requirements</strong><small>QA collaboration</small><em>QA nhận scenario coverage traceable, prioritized và aligned với business rule.</em></a>
<a class="case-card" href="./change-impact-analysis/"><span>Delivery and QA</span><strong>Change impact analysis</strong><small>Change control</small><em>Team accept, defer hoặc split change với impact và artifact owner visible.</em></a>
<a class="case-card" href="./release-readiness-check/"><span>Delivery and QA</span><strong>Kiểm tra release readiness</strong><small>Release management</small><em>Go-live meeting dùng readiness brief chung dựa trên evidence thay vì status update rời rạc.</em></a>
<a class="case-card" href="./production-incident-requirement-feedback/"><span>Delivery and QA</span><strong>Từ production incident đến feedback requirement</strong><small>Continuous improvement</small><em>Production incident trở thành backlog improvement có evidence và câu hỏi requirement tốt hơn trong tương lai.</em></a>
</div></section>
<section class="usecase-section"><h2 id="ai-enabled-product-use-cases">AI-enabled product</h2><div class="usecase-grid">
<a class="case-card" href="./rag-policy-assistant-requirements/"><span>AI-enabled product use cases</span><strong>Requirement cho RAG policy assistant</strong><small>Knowledge assistant</small><em>Assistant chỉ trả lời từ trusted source, cite evidence, respect access và escalate an toàn.</em></a>
<a class="case-card" href="./ai-ticket-triage-specification/"><span>AI-enabled product use cases</span><strong>Đặc tả AI ticket triage</strong><small>Support automation</small><em>Ticket routing cải thiện SLA trong khi case low-confidence và high-risk được human review.</em></a>
<a class="case-card" href="./ai-document-ocr-intake/"><span>AI-enabled product use cases</span><strong>AI OCR cho document intake</strong><small>Document automation</small><em>Document handling nhanh hơn trong khi sensitive decision vẫn reviewable và evidence-backed.</em></a>
<a class="case-card" href="./ai-recommendation-explanation/"><span>AI-enabled product use cases</span><strong>Giải thích AI recommendation</strong><small>Decision support</small><em>User hiểu recommendation, giữ quyền decision và cung cấp feedback cải thiện product.</em></a>
<a class="case-card" href="./ai-chatbot-human-handoff/"><span>AI-enabled product use cases</span><strong>AI chatbot và human handoff</strong><small>Customer support</small><em>Chatbot giảm workload đơn giản trong khi case phức tạp hoặc risky tới human có context và accountability.</em></a>
</div></section>
<section class="usecase-section"><h2 id="domain-project-scenarios">Tình huống theo domain</h2><div class="usecase-grid">
<a class="case-card" href="./loan-origination-journey/"><span>Domain project scenarios</span><strong>Modernize journey loan origination</strong><small>Banking and lending</small><em>Loan journey mới nhanh hơn cho customer trong khi credit decision vẫn explainable và compliant.</em></a>
<a class="case-card" href="./insurance-claim-intake/"><span>Domain project scenarios</span><strong>Automation insurance claim intake</strong><small>Insurance</small><em>Claim intake nhanh và rõ hơn trong khi coverage và fraud decision vẫn human-governed.</em></a>
<a class="case-card" href="./ecommerce-return-refund/"><span>Domain project scenarios</span><strong>Flow return và refund e-commerce</strong><small>E-commerce</small><em>Customer hoàn thành eligible return với ít support contact hơn và refund expectation rõ hơn.</em></a>
<a class="case-card" href="./healthcare-appointment-intake/"><span>Domain project scenarios</span><strong>Healthcare appointment intake</strong><small>Healthcare operations</small><em>Appointment intake rõ và nhanh hơn trong khi clinical decision nằm ngoài scope AI.</em></a>
<a class="case-card" href="./hr-employee-service-portal/"><span>Domain project scenarios</span><strong>HR employee service portal</strong><small>HR service delivery</small><em>Employee hoàn thành common HR request qua structured self-service có status rõ và privacy control.</em></a>
<a class="case-card" href="./finance-reconciliation-exception/"><span>Domain project scenarios</span><strong>Workflow finance reconciliation exception</strong><small>Finance operations</small><em>Exception resolution nhanh hơn trong khi finance decision vẫn controlled và auditable.</em></a>
</div></section>
<section class="usecase-section"><h2 id="governance-and-adoption">Governance và adoption</h2><div class="usecase-grid">
<a class="case-card" href="./vendor-selection-ai-tool/"><span>Governance and adoption</span><strong>Chọn vendor cho AI tool</strong><small>Vendor evaluation</small><em>Vendor selection được drive bởi BA workflow value, verified control và pilot evidence.</em></a>
<a class="case-card" href="./data-privacy-ai-assessment/"><span>Governance and adoption</span><strong>Assessment data privacy cho AI use</strong><small>Privacy and compliance</small><em>BA team dùng AI với data boundary rõ, approved tool và privacy control thực tế.</em></a>
<a class="case-card" href="./ba-ai-adoption-playbook/"><span>Governance and adoption</span><strong>Playbook adoption AI cho BA team</strong><small>BA practice leadership</small><em>BA practice adopt AI bằng shared pattern, review gate và quality improvement đo được.</em></a>
<a class="case-card" href="./portfolio-use-case-prioritization/"><span>Governance and adoption</span><strong>Prioritize portfolio AI use case</strong><small>Portfolio management</small><em>Leadership fund AI pilot dựa trên value, feasibility, data readiness và risk, không phải hype.</em></a>
</div></section>
<section class="usecase-section"><h2 id="frontend-ui-and-ux">Frontend, UI và UX</h2><div class="usecase-grid">
<a class="case-card" href="./figma-design-handoff-requirements/"><span>Frontend, UI, and UX</span><strong>Từ Figma handoff đến requirement</strong><small>Design handoff</small><em>Design handoff trở thành UI specification test được, có state behavior và backend dependency rõ.</em></a>
<a class="case-card" href="./screen-state-behavior-specification/"><span>Frontend, UI, and UX</span><strong>Đặc tả behavior theo screen state</strong><small>Screen behavior</small><em>Frontend, backend và QA dùng chung một state behavior matrix cho implementation và testing.</em></a>
<a class="case-card" href="./complex-form-validation-rules/"><span>Frontend, UI, and UX</span><strong>Rule validation cho form phức tạp</strong><small>Forms and validation</small><em>Form validation được implement consistent giữa frontend, backend và QA với business rule traceable.</em></a>
<a class="case-card" href="./empty-loading-error-state-requirements/"><span>Frontend, UI, and UX</span><strong>Requirement cho empty, loading và error state</strong><small>UI states</small><em>User nhận guidance rõ theo từng state và QA cover UI behavior ngoài happy path.</em></a>
<a class="case-card" href="./responsive-mobile-ui-behavior/"><span>Frontend, UI, and UX</span><strong>Behavior responsive và mobile UI</strong><small>Responsive design</small><em>Responsive UI behavior đủ explicit để design, frontend và QA validate qua nhiều device.</em></a>
<a class="case-card" href="./accessibility-acceptance-criteria/"><span>Frontend, UI, and UX</span><strong>Acceptance criteria cho accessibility</strong><small>Accessibility</small><em>Accessibility được thể hiện như behavior test được trong user story trước khi frontend implementation bắt đầu.</em></a>
<a class="case-card" href="./design-system-component-requirements/"><span>Frontend, UI, and UX</span><strong>Requirement cho design system component</strong><small>Design systems</small><em>Reusable component có behavior boundary rõ và product team adopt consistent.</em></a>
<a class="case-card" href="./ux-microcopy-error-message-review/"><span>Frontend, UI, and UX</span><strong>Review microcopy và error message UX</strong><small>UX writing</small><em>UI copy trở nên accurate, recoverable, testable và ready cho localization.</em></a>
<a class="case-card" href="./navigation-user-flow-analysis/"><span>Frontend, UI, and UX</span><strong>Phân tích navigation và user flow</strong><small>User flows</small><em>Navigation choice dựa trên user task, role rule và flow behavior test được.</em></a>
<a class="case-card" href="./frontend-analytics-event-requirements/"><span>Frontend, UI, and UX</span><strong>Requirement cho frontend analytics event</strong><small>Product analytics</small><em>Frontend instrumentation tạo product data dùng được cho decision mà không vi phạm privacy.</em></a>
<a class="case-card" href="./localization-i18n-ui-requirements/"><span>Frontend, UI, and UX</span><strong>Requirement localization và i18n UI</strong><small>Localization</small><em>Localized UI behavior test được trước market rollout và tránh hardcoded assumption.</em></a>
<a class="case-card" href="./visual-regression-qa-handoff/"><span>Frontend, UI, and UX</span><strong>Handoff visual regression và UI QA</strong><small>Visual QA</small><em>Visual QA tập trung regression ảnh hưởng user trên critical page, component và supported viewport.</em></a>
<a class="case-card" href="./frontend-permission-visibility-rules/"><span>Frontend, UI, and UX</span><strong>Rule visibility theo permission trên frontend</strong><small>Permissioned UI</small><em>Permissioned UI behavior dễ hiểu cho user và aligned với backend authorization control.</em></a>
</div></section>
<section class="usecase-section"><h2 id="backend-and-api">Backend và API</h2><div class="usecase-grid">
<a class="case-card" href="./api-contract-requirements/"><span>Backend and API</span><strong>Requirement cho API contract</strong><small>API contracts</small><em>Frontend và backend integrate theo contract trace được tới business behavior.</em></a>
<a class="case-card" href="./request-response-schema-review/"><span>Backend and API</span><strong>Review schema request và response</strong><small>Schema design</small><em>API schema field dễ hiểu, testable và aligned với business concept.</em></a>
<a class="case-card" href="./api-error-code-taxonomy/"><span>Backend and API</span><strong>Taxonomy error code và message cho API</strong><small>Error handling</small><em>API error trở thành product behavior consistent để frontend, QA và support sử dụng.</em></a>
<a class="case-card" href="./auth-authorization-rbac-rules/"><span>Backend and API</span><strong>Rule authentication, authorization và RBAC</strong><small>Authorization</small><em>RBAC behavior enforce được bởi backend, dễ hiểu trên UI và testable bởi QA.</em></a>
<a class="case-card" href="./idempotency-retry-timeout-behavior/"><span>Backend and API</span><strong>Behavior idempotency, retry và timeout</strong><small>Reliability behavior</small><em>Duplicate và uncertain outcome được prevent hoặc handle bằng API, UI và operations behavior rõ.</em></a>
<a class="case-card" href="./webhook-event-requirements/"><span>Backend and API</span><strong>Requirement webhook và event-driven</strong><small>Event-driven integration</small><em>Event-driven integration có semantic rõ, reliability behavior và documentation sẵn cho partner.</em></a>
<a class="case-card" href="./backend-validation-business-rules/"><span>Backend and API</span><strong>Backend validation và business rules</strong><small>Business rules</small><em>Backend validation authoritative, source-backed và aligned với frontend guidance.</em></a>
<a class="case-card" href="./batch-job-scheduled-process/"><span>Backend and API</span><strong>Requirement cho batch job và scheduled process</strong><small>Scheduled processing</small><em>Scheduled backend work có business rule, monitoring, rerun behavior và operational ownership rõ.</em></a>
<a class="case-card" href="./audit-log-operational-logging/"><span>Backend and API</span><strong>Requirement audit log và operational logging</strong><small>Audit and observability</small><em>Sensitive backend action tạo audit evidence và operational log support compliance và support work.</em></a>
<a class="case-card" href="./api-versioning-compatibility/"><span>Backend and API</span><strong>API versioning và backward compatibility</strong><small>API lifecycle</small><em>API change ship với compatibility behavior, migration support và partner impact visibility rõ.</em></a>
<a class="case-card" href="./integration-failure-fallback-behavior/"><span>Backend and API</span><strong>Behavior khi integration fail và fallback</strong><small>Integration resilience</small><em>Integration failure có behavior rõ cho user, backend, support và operations trước launch.</em></a>
<a class="case-card" href="./caching-rate-limit-requirements/"><span>Backend and API</span><strong>Requirement caching và rate limit</strong><small>Performance controls</small><em>Caching và rate limit cải thiện performance mà không che freshness hoặc customer impact trade-off.</em></a>
</div></section>
<section class="usecase-section"><h2 id="data-and-integration">Data và Integration</h2><div class="usecase-grid">
<a class="case-card" href="./data-mapping-transformation-rules/"><span>Data and Integration</span><strong>Rule data mapping và transformation</strong><small>Data mapping</small><em>Integration mapping dựa trên business semantics và validate bằng realistic data case.</em></a>
<a class="case-card" href="./entity-lifecycle-state-machine/"><span>Data and Integration</span><strong>Entity lifecycle và state machine</strong><small>Entity lifecycle</small><em>Lifecycle behavior shared giữa UI, backend, API, reporting và operations.</em></a>
<a class="case-card" href="./database-field-business-rule-alignment/"><span>Data and Integration</span><strong>Align database field và business rule</strong><small>Data model alignment</small><em>Database field gắn với business rule trước implementation và migration decision visible.</em></a>
<a class="case-card" href="./reporting-dashboard-metric-definition/"><span>Data and Integration</span><strong>Định nghĩa metric cho reporting và dashboard</strong><small>Reporting</small><em>Dashboard metric trở nên decision-ready vì definition, source và limitation explicit.</em></a>
<a class="case-card" href="./search-filter-sort-requirements/"><span>Data and Integration</span><strong>Requirement search, filter và sort</strong><small>Search experience</small><em>Search và filtering behavior đủ precise để implement, test và explain cho user.</em></a>
<a class="case-card" href="./notification-trigger-template-rules/"><span>Data and Integration</span><strong>Rule trigger và template notification</strong><small>Notifications</small><em>Notification được trigger, wording, route và monitor theo business rule rõ.</em></a>
<a class="case-card" href="./file-upload-download-behavior/"><span>Data and Integration</span><strong>Behavior upload và download file</strong><small>Files and documents</small><em>File handling an toàn, recoverable, permission-aware và testable qua UI/backend.</em></a>
<a class="case-card" href="./external-system-integration-mapping/"><span>Data and Integration</span><strong>Mapping integration với external system</strong><small>External integrations</small><em>External integration có data, failure, ownership và escalation behavior rõ.</em></a>
</div></section>
<section class="usecase-section"><h2 id="cross-functional-ba-collaboration">Collaboration cross-functional của BA</h2><div class="usecase-grid">
<a class="case-card" href="./ba-developer-refinement-ai/"><span>Cross-functional BA Collaboration</span><strong>Refinement BA-developer với AI</strong><small>BA and developers</small><em>Refinement meeting dành nhiều thời gian decision hơn và ít thời gian phát hiện thiếu requirement cơ bản.</em></a>
<a class="case-card" href="./ba-qa-test-handoff-ai/"><span>Cross-functional BA Collaboration</span><strong>Handoff test BA-QA với AI</strong><small>BA and QA</small><em>QA nhận scenario source-backed, prioritized, có expected result và test data need.</em></a>
<a class="case-card" href="./ba-ux-critique-loop/"><span>Cross-functional BA Collaboration</span><strong>Vòng critique BA-UX</strong><small>BA and UX</small><em>Review BA và UX tạo design decision rõ hơn mà không mất user-centered intent.</em></a>
<a class="case-card" href="./ba-tech-lead-nfr-review/"><span>Cross-functional BA Collaboration</span><strong>Review NFR giữa BA và tech lead</strong><small>BA and architecture</small><em>Technical quality concern trở thành business decision và delivery requirement đo được.</em></a>
<a class="case-card" href="./product-tradeoff-decision-memo/"><span>Cross-functional BA Collaboration</span><strong>Decision memo cho product trade-off</strong><small>Product decisions</small><em>Product trade-off trở nên explicit, evidence-backed và trace được tới follow-up metric.</em></a>
<a class="case-card" href="./production-issue-ui-api-requirement-update/"><span>Cross-functional BA Collaboration</span><strong>Từ production issue đến update requirement UI/API</strong><small>Production feedback</small><em>Production issue trở thành UI/API requirement rõ hơn và regression coverage mạnh hơn.</em></a>
<a class="case-card" href="./frontend-backend-contract-workshop/"><span>Cross-functional BA Collaboration</span><strong>Workshop contract frontend-backend</strong><small>Contract workshops</small><em>Frontend và backend kết thúc workshop với contract decision và test scenario aligned.</em></a>
<a class="case-card" href="./design-to-api-end-to-end-traceability/"><span>Cross-functional BA Collaboration</span><strong>Traceability end-to-end từ design đến API</strong><small>Traceability</small><em>Critical feature behavior traceable từ design qua API, data, analytics và test.</em></a>
</div></section>
