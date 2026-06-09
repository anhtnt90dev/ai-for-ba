---
title: "Discovery với AI"
description: "AI có thể mở rộng discovery, nhưng BA vẫn phải quyết định điều gì cần validate với stakeholder thật."
---

# Discovery với AI

<div class="lesson-meta">
  <span>Quy trình BA được tăng cường bởi AI</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Dùng AI tạo hypothesis và interview plan.
- Tách assumption, evidence và decision trước workshop.
- Biến output AI thành discovery agenda tốt hơn.

## Why this matters for BA work

<div class="ba-callout">
AI có thể mở rộng discovery, nhưng BA vẫn phải quyết định điều gì cần validate với stakeholder thật.
</div>

Bài này quan trọng vì AI có thể làm discovery có vẻ nhanh hơn nhưng âm thầm thay uncertainty bằng completeness tự bịa. Giá trị của BA là biến suggestion của AI thành hypothesis, không phải conclusion. Workflow discovery tốt dùng AI để mở rộng question space, rồi dùng evidence, workshop, interview và data để quyết định điều gì đúng.

## Common difficulties for BAs

Trong dự án thật, chủ đề này khó vì BA phải biến evidence lộn xộn thành decision mà không để AI che mất uncertainty. Hãy chú ý các friction point này trước khi xem output là sẵn sàng.

| Khó khăn | Vì sao khó trong công việc BA | BA nên xử lý thế nào |
| --- | --- | --- |
| Yêu cầu AI viết requirement trước khi map uncertainty. | Khó vì Discovery với AI thường được áp dụng khi deadline gấp, evidence chưa đủ và stakeholder chưa thống nhất. Draft AI nghe trôi chảy có thể làm gap ít visible hơn. | Dùng source label, assumption rõ và review owner cụ thể trước khi chuyển thành backlog, specification hoặc delivery commitment. |
| Xem generated question là discovery đầy đủ. | Khó vì Discovery với AI thường được áp dụng khi deadline gấp, evidence chưa đủ và stakeholder chưa thống nhất. Draft AI nghe trôi chảy có thể làm gap ít visible hơn. | Dùng source label, assumption rõ và review owner cụ thể trước khi chuyển thành backlog, specification hoặc delivery commitment. |
| Bỏ qua decision owner. | Khó vì Discovery với AI thường được áp dụng khi deadline gấp, evidence chưa đủ và stakeholder chưa thống nhất. Draft AI nghe trôi chảy có thể làm gap ít visible hơn. | Dùng source label, assumption rõ và review owner cụ thể trước khi chuyển thành backlog, specification hoặc delivery commitment. |

## Where this applies in real projects

Bài này hữu ích khi BA cần chuyển conversation, policy, design hoặc technical input thành artifact chung để team implement và test được.

| Thời điểm trong dự án | Cách áp dụng bài học | Output cụ thể của BA |
| --- | --- | --- |
| Discovery | Chuyển agenda workshop tiếp theo thành hypothesis. | Discovery Hypothesis Backlog: artifact review được, nối nội dung học với decision, acceptance criteria, risk hoặc stakeholder alignment. |
| Refinement | Nhờ AI tìm stakeholder group còn thiếu. | Discovery Hypothesis Backlog: artifact review được, nối nội dung học với decision, acceptance criteria, risk hoặc stakeholder alignment. |
| Delivery | Thêm evidence needed cạnh mỗi assumption. | Discovery Hypothesis Backlog: artifact review được, nối nội dung học với decision, acceptance criteria, risk hoặc stakeholder alignment. |

## If this is missing

Nếu thiếu năng lực này, AI vẫn có thể tạo text rất bóng bẩy, nhưng project mất khả năng review. Kết quả thường là rework, assumption ẩn, acceptance criteria yếu hoặc business decision thiếu evidence.

| Nếu thiếu | Ảnh hưởng tới dự án | Cách khôi phục |
| --- | --- | --- |
| Yêu cầu AI viết requirement từ business problem | Model sẽ biến uncertainty của discovery thành scope quá sớm. | Khôi phục bằng pattern tốt hơn: Trước hết yêu cầu hypothesis, assumption, evidence needed và workshop question. Sau đó check lại artifact theo evidence, testability, ownership và business impact trước khi share. |
| Xem stakeholder list do AI tạo là final | Owner nội bộ, regulator hoặc operational user quan trọng có thể bị thiếu. | Khôi phục bằng pattern tốt hơn: Validate actor bằng process map, org role, customer journey và decision right. Sau đó check lại artifact theo evidence, testability, ownership và business impact trước khi share. |
| Ưu tiên câu hỏi dễ trả lời | Team có thể né assumption rủi ro nhất cho tới lúc delivery. | Khôi phục bằng pattern tốt hơn: Rank hypothesis theo business impact, evidence gap và decision urgency. Sau đó check lại artifact theo evidence, testability, ownership và business impact trước khi share. |

## Mental model or core concept

Discovery là giảm uncertainty, không phải tạo tài liệu cho đủ. AI hỗ trợ đề xuất actor, constraint, risk và question, nhưng output nên trở thành hypothesis backlog. BA sau đó validate hoặc reject hypothesis bằng user, data, policy và stakeholder decision.

## Practical BA example

Với claim approval automation, AI gợi ý fraud check, SLA tier, escalation path và missing document scenario. BA chuyển chúng thành workshop question và ưu tiên assumption rủi ro nhất: ai được override, policy nào áp dụng và exception hợp lệ là gì.

## Diagram

```mermaid
flowchart TD
    A["Business problem"] --> B["AI mở rộng hypothesis"]
    B --> C["BA group assumption"]
    C --> D{"Rủi ro hoặc chưa biết?"}
    D -->|Có| E["Validate trong workshop"]
    D -->|Không| F["Defer hoặc document"]
    E --> G["Insight sẵn sàng cho decision"]
```

## BA artifact

### Discovery Hypothesis Backlog

| Hypothesis | Evidence cần có | Cách validate | Decision owner |
| --- | --- | --- | --- |
| Claim giá trị cao cần manager review. | Policy threshold và historical claim data. | Review policy và data sample. | Claims operations lead |
| Missing document trigger customer notification. | Support script hiện tại và customer journey. | Interview support agent. | Customer service manager |
| Fraud risk thay đổi SLA. | Fraud rule và compliance constraint. | Compliance workshop. | Risk owner |
| Manual override phải audit. | Audit policy và regulator expectation. | Security review. | Compliance lead |

## AI expert note

AI hữu ích trong discovery vì nó tạo alternative actor, edge case, risk và interview angle rất nhanh. Nguy hiểm là anchoring: khi đã có list trôi chảy, stakeholder có thể ngừng khám phá. BA phải label rõ hypothesis, evidence needed, validation method và decision owner trước khi chuyển bất kỳ phần nào thành requirement.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Yêu cầu AI viết requirement từ business problem | Model sẽ biến uncertainty của discovery thành scope quá sớm. | Trước hết yêu cầu hypothesis, assumption, evidence needed và workshop question. |
| Xem stakeholder list do AI tạo là final | Owner nội bộ, regulator hoặc operational user quan trọng có thể bị thiếu. | Validate actor bằng process map, org role, customer journey và decision right. |
| Ưu tiên câu hỏi dễ trả lời | Team có thể né assumption rủi ro nhất cho tới lúc delivery. | Rank hypothesis theo business impact, evidence gap và decision urgency. |

## AI collaboration prompt

```text
Tạo discovery hypothesis backlog cho business problem này. Bao gồm actor, assumption, evidence needed, validation method, decision owner, risk level và workshop question. Chưa viết final requirement.
```

## Mistakes to avoid

- Yêu cầu AI viết requirement trước khi map uncertainty.
- Xem generated question là discovery đầy đủ.
- Bỏ qua decision owner.
- Ưu tiên câu hỏi dễ thay vì assumption rủi ro.

## Apply this tomorrow

1. Chuyển agenda workshop tiếp theo thành hypothesis.
2. Nhờ AI tìm stakeholder group còn thiếu.
3. Thêm evidence needed cạnh mỗi assumption.
4. Mở workshop bằng decisions required, không chỉ topic.

## What a BA should remember

- Discovery output là validated learning.
- AI mở rộng question space; stakeholder validate nó.
- Artifact discovery tốt cho thấy điều gì chưa biết.
