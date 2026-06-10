---
title: "Đặc tả feature có AI"
description: "Feature có AI cần requirement cho model behavior, uncertainty, UX, data và human control."
---

# Đặc tả feature có AI

<div class="lesson-meta">
  <span>Advanced AI BA practice</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Story mode: project walkthrough

<div class="story-mode-panel">
  <p class="story-eyebrow">Story prototype</p>
  <h3>Smart recommendation vẫn chưa phải requirement</h3>
  <p class="story-intro">Maya nhận product manager yêu cầu một smart recommendation widget. Thay vì nhờ AI trả lời final, cô dùng pattern của bài này để làm tình huống rõ hơn, review được hơn và hữu ích hơn cho decision tiếp theo.</p>
  <div class="story-scene-grid">
<article class="story-scene">
  <span>Scene 1</span>
  <b>01</b>
  <strong>Yêu cầu còn mơ hồ</strong>
  <p>Team đưa cho Maya product manager yêu cầu một smart recommendation widget và mong có câu trả lời gọn trong ngày.</p>
</article>
<article class="story-scene">
  <span>Scene 2</span>
  <b>02</b>
  <strong>AI tạo draft đầu tiên</strong>
  <p>Draft khá hữu ích, nhưng che uncertainty quanh AI behavior và Uncertainty.</p>
</article>
<article class="story-scene">
  <span>Scene 3</span>
  <b>03</b>
  <strong>Maya biến nó thành evidence của BA</strong>
  <p>Cô thêm source note, owner, example và review table tập trung cho AI Feature Requirement Card thay vì gửi thẳng raw AI output.</p>
</article>
<article class="story-scene">
  <span>Scene 4</span>
  <b>04</b>
  <strong>Team có thể ra decision</strong>
  <p>AI Feature Requirement Card cuối cùng cho thấy phần nào ready, phần nào rủi ro và phần nào cần human decision.</p>
</article>
  </div>
  <div class="visual-takeaway-strip">
<span>Confidence cần context</span>
<span>Model boundary phải review được</span>
<span>Human-in-the-loop trở thành câu hỏi của BA</span>
  </div>
</div>

## AI words in plain English

| Thuật ngữ AI | Hiểu đơn giản | BA dùng để làm gì |
| --- | --- | --- |
| Confidence | Tín hiệu AI nói nó chắc tới mức nào. | Dùng để gọi đúng loại việc trước khi nhờ AI hỗ trợ. |
| Model boundary | AI nên và không nên làm gì. | Dùng như lens review, không dùng như từ trang trí. |
| Human-in-the-loop | Thiết kế có người review hoặc approve output AI. | Biến nó thành checklist item hoặc câu hỏi stakeholder. |
| Fallback | Đường an toàn khi AI không trả lời hoặc không hành động tốt. | Định nghĩa rule trước khi team xem output là ready. |

## Reality check: tình huống thường gặp trong dự án

<div class="fact-card-grid">
<article class="fact-card">
  <strong>Draft nhanh có thể che tư duy yếu</strong>
  <span>Hỏi draft phụ thuộc evidence, owner và decision nào.</span>
  <p>AI có thể tạo AI Feature Requirement Card rất nhanh, nhưng tốc độ không chứng minh quality.</p>
</article>
<article class="fact-card">
  <strong>Stakeholder cần ngôn ngữ đơn giản</strong>
  <span>Giải thích term bằng một câu trước khi đưa vào requirement.</span>
  <p>Term như Confidence và Model boundary dễ làm người ngoài cuộc trao đổi AI bị rối.</p>
</article>
<article class="fact-card">
  <strong>AI Feature Requirement Card phải đi qua nhiều team</strong>
  <span>Làm next action visible cho từng receiving team.</span>
  <p>Product, Engineering, QA và Operations đọc AI Feature Requirement Card theo góc nhìn khác nhau.</p>
</article>
</div>

## Visual walkthrough

```mermaid
flowchart LR
    A["Project input"]
    B["AI draft đầu"]
    A --> B
    C["Lens review của BA"]
    B --> C
    D["AI Feature Requirement Card"]
    C --> D
    E["Team decision"]
    D --> E
```

## Visual decision map

<div class="visual-ba-map">
  <h3>AI Feature Requirement Card: what the BA should look for</h3>
<div>
  <strong>User value</strong>
  <span>Điều BA phải làm rõ trước tiên.</span>
  <em>Viết bằng ngôn ngữ dự án.</em>
</div>
<div>
  <strong>AI behavior</strong>
  <span>Nơi AI có thể giúp nhưng cũng có thể che uncertainty.</span>
  <em>Thêm review criteria.</em>
</div>
<div>
  <strong>Uncertainty</strong>
  <span>Điều có thể hỏng nếu team bỏ validation.</span>
  <em>Tạo decision question.</em>
</div>
<div>
  <strong>Fallback</strong>
  <span>Điều làm artifact đủ an toàn để handoff.</span>
  <em>Ghi owner, evidence và next step.</em>
</div>
</div>

## Learning outcomes

- Giải thích Confidence bằng ngôn ngữ BA đơn giản.
- Dùng AI để draft AI Feature Requirement Card tốt hơn.
- Review output trước khi nó trở thành scope, test hoặc delivery work.

## Why this matters for BA work

<div class="ba-callout">
Feature có AI cần requirement cho model behavior, uncertainty, UX, data và human control.
</div>

Spec AI-enabled feature quan trọng vì từ như smart, personalized hoặc automated che rất nhiều product decision. BA phải định nghĩa model boundary, confidence behavior, user explanation, fallback, data use và human control trước khi Engineering build an toàn.

## Common difficulties for BAs

| Khó khăn | Vì sao khó với BA | BA xử lý thế nào |
| --- | --- | --- |
| Team dùng Confidence nhưng không có cùng cách hiểu. | Mọi người gật đầu trong meeting nhưng tưởng tượng outcome khác nhau. | Bắt đầu bằng định nghĩa một câu và cho thấy nó làm thay đổi AI Feature Requirement Card thế nào. |
| AI output trông hoàn chỉnh hơn input thực tế. | Draft trôi chảy có thể che missing example, owner hoặc edge case. | Yêu cầu AI liệt kê assumption và missing evidence trước khi draft bản cuối. |
| Reviewer cần detail khác nhau. | Product quan tâm value, Engineering quan tâm constraint, QA quan tâm testability, Ops quan tâm support. | Thêm column hoặc section cho từng receiving team thay vì một paragraph chung. |

## Where this applies in real projects

| Thời điểm dự án | Việc BA làm | Output cụ thể |
| --- | --- | --- |
| Discovery workshop | Dùng AI để gom note thành user value, risk và open question. | AI Feature Requirement Card có source note và owner. |
| Backlog refinement | Chuyển AI suggestion thành decision nhỏ và test được. | Story, rule hoặc checklist item có acceptance signal. |
| Handoff review | Nhờ AI critique artifact từ góc Product, Dev, QA và Ops. | Review table có action owner và status. |

## If this is missing

Nếu thiếu Đặc tả feature có AI, team vẫn có thể tạo document, nhưng document khó trust, khó test và khó maintain hơn.

| Nếu thiếu | Ảnh hưởng dự án | Cách khôi phục |
| --- | --- | --- |
| Không có giải thích chung cho Confidence | Stakeholder đồng ý bằng lời nhưng kỳ vọng behavior khác nhau. | Thêm định nghĩa plain-language và example. |
| Không review AI assumption | Ý tưởng chưa có evidence trở thành scope. | Đưa assumption vào validation list có owner. |
| Không có AI Feature Requirement Card cụ thể | Bài học vẫn trừu tượng và không giúp delivery. | Tạo artifact bằng table nhỏ, không viết essay dài. |

## Mental model or core concept

Đặc tả feature có AI dễ hiểu nhất như một control của BA: làm phần lộn xộn visible, để AI hỗ trợ structure, rồi review với con người trước khi thành delivery work.

## Practical BA example

Với recommendation widget, Maya đặc tả khi nào recommendation xuất hiện, vì sao item được show, user dismiss thế nào, confidence thấp thì sao và data nào không được dùng.

## Diagram

```mermaid
flowchart TD
    A["AI Feature Requirement Card"]
    A --> B["User value"]
    A --> C["AI behavior"]
    A --> D["Uncertainty"]
    A --> E["Fallback"]
```

## BA artifact

### AI Feature Requirement Card

| Dòng artifact | BA cần viết gì | Dấu hiệu sẵn sàng | Dấu hiệu rủi ro |
| --- | --- | --- | --- |
| User value | Viết user value cụ thể bằng ngôn ngữ dự án. | Stakeholder confirm được. | Vẫn chỉ là slogan. |
| AI behavior | Mô tả AI giúp gì và có thể sai ở đâu. | Review criteria visible. | Draft che uncertainty. |
| Uncertainty | Capture gap, conflict, edge case hoặc risk. | Owner và next action rõ. | Issue bị chôn trong prose. |
| Fallback | Định nghĩa handoff rule hoặc completion signal. | QA hoặc Engineering hành động được. | Receiving team không biết làm gì. |

## AI expert note

Ở góc nhìn AI reviewer, tôi sẽ kiểm tra Đặc tả feature có AI có làm artifact của BA thực tế hơn không. AI tốt phải làm lộ missing context, tạo structure và giúp review dễ hơn. Nếu chỉ làm câu chữ đẹp hơn, BA chưa lấy được đủ value.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách BA làm tốt hơn |
| --- | --- | --- |
| Yêu cầu AI "làm Đặc tả feature có AI" mà không có source context. | Model tự lấp khoảng trống bằng wording nghe hợp lý. | Cung cấp source note, example, boundary và review criteria. |
| Gửi answer đầu tiên như final. | Team không thấy assumption hoặc evidence yếu. | Chạy critique pass và gắn nhãn open decision. |
| Dùng thuật ngữ AI mà không giải thích. | Business stakeholder mất tập trung hoặc hiểu sai. | Giải thích mỗi term bằng ngôn ngữ đơn giản trước khi đưa vào scope. |

## Stakeholder questions to ask

| Stakeholder | Câu hỏi | Vì sao BA hỏi |
| --- | --- | --- |
| Product owner | Which outcome should Đặc tả feature có AI improve first? | Keeps AI work tied to business value. |
| Engineering lead | Which source, system, or constraint could make AI Feature Requirement Card hard to implement? | Turns hidden technical constraints into requirement questions. |
| QA lead | Which behavior must be testable before we trust this artifact? | Converts fluent AI text into observable checks. |
| Operations or support | What failure path creates manual work after release? | Surfaces support load and fallback needs. |

## Decision log entries

| Decision item | Option cần capture | Owner | Evidence cần có |
| --- | --- | --- | --- |
| Scope boundary for AI Feature Requirement Card | Must-have, later, out of scope | Product owner | Business outcome and release constraint |
| Authority for User value and AI behavior | Documented source, stakeholder decision, assumption to validate | BA + accountable stakeholder | Source ID, date, and approval status |
| Review gate before handoff | Peer review, QA review, engineering review, formal approval | BA lead or project lead | Risk level and receiving-team readiness |
| Recovery if Dùng Confidence như jargon thay vì project decision. | Rewrite, defer, escalate, or run validation workshop | Decision owner | Impact on scope, testability, and release risk |

## Definition of Ready / Done

| Gate | Ready signal | Done signal |
| --- | --- | --- |
| Definition of Ready | Sources for User value are named. | AI Feature Requirement Card can be reviewed without guessing context. |
| Definition of Ready | Open assumptions have owners and validation paths. | Stakeholders can accept, reject, or defer each assumption. |
| Definition of Done | The artifact applies this principle: Feature có AI cần requirement cho model behavior, uncertainty, UX, data và human control. | Delivery, QA, or governance teams can act on it. |
| Definition of Done | The weak pattern "Yêu cầu AI "làm Đặc tả feature có AI" mà không có source context." has been checked. | No unsupported AI claim is treated as approved scope. |

## Before and after artifact example

| Before | Rủi ro từ AI draft | Senior BA revision |
| --- | --- | --- |
| Prompt: "Create AI Feature Requirement Card." | The model may invent source facts, owners, or thresholds. | Add sources, scope boundary, output schema, and review criteria. |
| Draft statement: "Dùng AI để gom note thành user value, risk và open question." | Useful, but not tied to owner or acceptance signal. | Rewrite as a project step with owner, expected artifact, and review gate. |
| Final-looking paragraph | Tone may hide uncertainty or missing stakeholder approval. | Convert into fact, assumption, decision needed, risk, and validation question. |

## Manual verification after AI output

| Verification lens | Manual check | Pass signal |
| --- | --- | --- |
| Evidence | Trace important statements in AI Feature Requirement Card to a source, decision, or labeled assumption. | No unsupported claim remains hidden. |
| Completeness | Check User value, AI behavior, Uncertainty, Fallback against the intended audience. | Product, Engineering, QA, and Operations have what they need. |
| Testability | Ask whether QA can create positive, negative, boundary, and exception scenarios. | Ambiguous wording is rewritten or logged as a question. |
| Accountability | Confirm who approves, who reviews, and who acts when output is wrong. | Owners and escalation path are explicit. |

## AI collaboration prompt

```text
Dùng project notes được cung cấp để tạo AI Feature Requirement Card. Trước hết giải thích key term bằng ngôn ngữ đơn giản. Sau đó tạo table gồm evidence, assumption, risk, owner question và recommended next action. Không invent fact không nằm trong notes.
```

## Mistakes to avoid

- Dùng Confidence như jargon thay vì project decision.
- Để AI viết lấp missing evidence.
- Gửi output cho team khác khi chưa có owner, status hoặc next action.

## Apply this tomorrow

1. Lấy một project note hiện tại và nhờ AI tạo AI Feature Requirement Card.
2. Thêm định nghĩa plain-language cho Confidence.
3. Chạy một critique pass từ góc QA hoặc Engineering.

## What a BA should remember

- Confidence phải giúp project đi tiếp, không phải nghe cho hay.
- AI draft; BA validate.
- Artifact nhỏ review được tốt hơn giải thích dài chung chung.
