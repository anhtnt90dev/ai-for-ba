---
title: "Mô hình hóa quy trình với AI"
description: "AI có thể draft process flow, nhưng chất lượng BA nằm ở decision, exception, ownership và operational constraint."
---

# Mô hình hóa quy trình với AI

<div class="lesson-meta">
  <span>Quy trình BA được tăng cường bởi AI</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Dùng AI tạo first-pass process map.
- Bổ sung exception path, role, SLA và control.
- Review process diagram để tìm ownership và policy decision thiếu.

## Why this matters for BA work

<div class="ba-callout">
AI có thể draft process flow, nhưng chất lượng BA nằm ở decision, exception, ownership và operational constraint.
</div>

Bài này quan trọng vì process model là nơi requirement ẩn thường lộ ra: handoff, exception path, timing, ownership và system boundary. AI có thể chuyển text thành diagram, nhưng BA phải kiểm tra diagram có phản ánh operational truth không. Flow đẹp mà miss escalation hoặc manual override sẽ rất nguy hiểm.

## Common difficulties for BAs

Trong Quy trình BA được tăng cường bởi AI, Mô hình hóa quy trình với AI trở nên khó khi notes lộn xộn, decision mới validate một phần và stakeholder context chưa đầy đủ phải nhanh chóng thành artifact chung. BA nên kiểm tra các điểm dưới đây trước khi xem artifact có AI hỗ trợ là đủ sẵn sàng cho stakeholder decision hoặc handoff.

| Khó khăn | Vì sao khó trong công việc BA | BA nên xử lý thế nào |
| --- | --- | --- |
| Chấp nhận diagram AI đầu tiên vì nhìn sạch. | Lỗi "Chấp nhận diagram AI đầu tiên vì nhìn sạch." xuất hiện khi team bàn về source attribution, conflict visibility, workshop decision flow và backlog readiness nhưng chưa thống nhất source nào authoritative. AI có thể làm disagreement nghe mượt hơn, nên BA phải giữ uncertainty visible. | Áp dụng control này: giữ speaker/source attribution visible cho đến khi stakeholder chịu trách nhiệm xác nhận ý nghĩa. Sau đó dùng pattern tốt hơn "Dùng diagram như review object và challenge từng decision, handoff, alternate path." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |
| Bỏ exception và manual work. | Với Mô hình hóa quy trình với AI, điểm khó là AI có thể draft process flow, nhưng chất lượng BA nằm ở decision, exception, ownership và operational constraint. Pattern yếu rất dễ xảy ra vì AI có thể tạo câu trả lời trôi chảy trước khi BA check ownership, source freshness hoặc decision right. | Áp dụng control này: giữ speaker/source attribution visible cho đến khi stakeholder chịu trách nhiệm xác nhận ý nghĩa. Sau đó dùng pattern tốt hơn "Thêm path failure, cancellation, timeout, escalation và override." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |
| Dùng process box không có owner. | Điểm này khó khi Process Review Checklist được kỳ vọng hỗ trợ validated working artifact. Nếu BA không challenge draft, unsupported assumption có thể đi vào planning, testing hoặc stakeholder communication. | Áp dụng control này: giữ speaker/source attribution visible cho đến khi stakeholder chịu trách nhiệm xác nhận ý nghĩa. Sau đó dùng pattern tốt hơn "Tách actor, system, external service và human reviewer thành lane riêng." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |

## Where this applies in real projects

Dùng bài này khi discovery hoặc refinement tạo nhiều raw input hơn mức BA có thể synthesize an toàn bằng tay trong thời gian có sẵn. Output thực tế không phải document dài hơn; đó là Process Review Checklist có đủ evidence, ownership và decision clarity cho cuộc trao đổi tiếp theo của dự án.

| Thời điểm trong dự án | Cách áp dụng bài học | Output cụ thể của BA |
| --- | --- | --- |
| Discovery | Nhờ AI thêm exception path cho một flow hiện có. | Process Review Checklist thể hiện source attribution, conflict visibility, workshop decision flow và backlog readiness, trong đó action "Nhờ AI thêm exception path cho một flow hiện có." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |
| Synthesis | Gắn business rule cho từng decision diamond. | Process Review Checklist thể hiện source evidence, trong đó action "Gắn business rule cho từng decision diamond." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |
| Refinement | Thêm owner label vào process step. | Process Review Checklist thể hiện decision owner, trong đó action "Thêm owner label vào process step." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |

## If this is missing

Nếu thiếu Mô hình hóa quy trình với AI, signal quan trọng từ interview, ticket, process note hoặc decision có thể mất trước khi đi vào backlog. BA vẫn có thể khôi phục, nhưng phải chuyển draft AI bóng bẩy trở lại thành evidence, assumption, owner và decision test được.

| Nếu thiếu | Ảnh hưởng tới dự án | Cách khôi phục |
| --- | --- | --- |
| Yêu cầu AI vẽ process từ một đoạn và accept luôn | Flow sinh ra có thể omit exception, ownership, timing và integration constraint. | Khôi phục bằng pattern tốt hơn: Dùng diagram như review object và challenge từng decision, handoff, alternate path. Rework Process Review Checklist cho đến khi nó lộ rõ source attribution, conflict visibility, workshop decision flow và backlog readiness, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |
| Chỉ model happy path | Delivery team phát hiện queue, retry và manual work quá muộn. | Khôi phục bằng pattern tốt hơn: Thêm path failure, cancellation, timeout, escalation và override. Rework Process Review Checklist cho đến khi nó lộ rõ source attribution, conflict visibility, workshop decision flow và backlog readiness, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |
| Trộn user action và system action trong một lane | Responsibility và automation boundary trở nên mơ hồ. | Khôi phục bằng pattern tốt hơn: Tách actor, system, external service và human reviewer thành lane riêng. Rework Process Review Checklist cho đến khi nó lộ rõ source attribution, conflict visibility, workshop decision flow và backlog readiness, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |

## Mental model or core concept

Process modeling không phải chỉ vẽ box; đó là làm rõ work, decision right, handoff và failure handling. AI có thể chuyển text thành flow, nhưng BA phải challenge draft: ai own từng step, trigger next step là gì, chuyện gì xảy ra khi thiếu data và control nào bắt buộc.

## Practical BA example

AI draft onboarding flow sạch: submit document, verify, approve. BA thêm missing-document loop, duplicate customer check, risk review, SLA timer, manual override và customer notification rule. Diagram trở thành decision tool, không phải decoration.

## Diagram

```mermaid
flowchart TD
    A["Customer submit request"] --> B{"Document đủ?"}
    B -->|Không| C["Yêu cầu bổ sung document"]
    C --> A
    B -->|Có| D{"Vượt risk threshold?"}
    D -->|Có| E["Manager review"]
    D -->|Không| F["Auto approve"]
    E --> G["Notify customer"]
    F --> G
```

## BA artifact

### Process Review Checklist

| Flow element | Câu hỏi BA | Evidence cần có | Gap thường gặp |
| --- | --- | --- | --- |
| Actor | Ai perform hoặc own step? | Role matrix hoặc SOP. | System step không có owner. |
| Decision | Rule nào chọn branch? | Policy hoặc business rule. | Diamond có condition mơ hồ. |
| Exception | Khi input invalid thì sao? | Support script và error log. | Chỉ có happy path. |
| SLA/control | Timing hoặc audit control nào áp dụng? | Operational metric hoặc compliance rule. | Không có escalation hoặc audit. |

## AI expert note

Process modeling với AI nên được xem là hypothesis về workflow. BA chuyên gia sẽ hỏi mỗi decision có rule chưa, mỗi exception có owner chưa, mỗi system interaction có boundary chưa và mỗi loop có stopping condition chưa. Diagram phải kích hoạt câu hỏi tốt hơn, không chỉ trang trí requirement.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Yêu cầu AI vẽ process từ một đoạn và accept luôn | Flow sinh ra có thể omit exception, ownership, timing và integration constraint. | Dùng diagram như review object và challenge từng decision, handoff, alternate path. |
| Chỉ model happy path | Delivery team phát hiện queue, retry và manual work quá muộn. | Thêm path failure, cancellation, timeout, escalation và override. |
| Trộn user action và system action trong một lane | Responsibility và automation boundary trở nên mơ hồ. | Tách actor, system, external service và human reviewer thành lane riêng. |

## AI collaboration prompt

```text
Chuyển process description này thành Mermaid flowchart. Bao gồm actor, decision rule, exception path, SLA, handoff, input, output, control và unresolved policy question. Sau diagram, liệt kê missing ownership hoặc rule gap.
```

## Mistakes to avoid

- Chấp nhận diagram AI đầu tiên vì nhìn sạch.
- Bỏ exception và manual work.
- Dùng process box không có owner.
- Vẽ decision nhưng thiếu decision rule.

## Apply this tomorrow

1. Nhờ AI thêm exception path cho một flow hiện có.
2. Gắn business rule cho từng decision diamond.
3. Thêm owner label vào process step.
4. Review diagram với support hoặc operations, không chỉ product.

## What a BA should remember

- Process diagram hữu ích làm lộ decision và handoff.
- Exception thường chứa requirement thật.
- AI draft flow; BA validate operation.
