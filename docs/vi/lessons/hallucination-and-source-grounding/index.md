---
title: "Hallucination và source grounding"
description: "BA phải đưa evidence discipline vào cách dùng AI để text nghe hợp lý không biến thành requirement sai."
---

# Hallucination và source grounding

<div class="lesson-meta">
  <span>Nền tảng AI cho Business Analyst</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Nhận diện các pattern hallucination thường gặp.
- Yêu cầu evidence, citation và label unsupported claim.
- Thiết kế review gate trước khi output AI đi vào delivery artifact.

## Why this matters for BA work

<div class="ba-callout">
BA phải đưa evidence discipline vào cách dùng AI để text nghe hợp lý không biến thành requirement sai.
</div>

Bài này quan trọng vì một câu hallucination có thể biến thành requirement, test case, vendor score hoặc estimate nếu không bị challenge sớm. Công việc BA biến ngôn ngữ thành commitment. Grounding rule làm evidence visible, chuyển unsupported claim thành question và ngăn AI prose tự tin trở thành false certainty của dự án.

## Mental model or core concept

Hallucination không chỉ là vấn đề của model; nó là vấn đề process. Nếu team nhận output AI mà không có evidence rule, unsupported claim có thể trở thành scope, estimate và test case. Grounding nghĩa là statement quan trọng phải gắn với source, stakeholder confirmation hoặc assumption được label rõ.

## Practical BA example

Khi evaluate vendor, AI nói Tool A hỗ trợ real-time audit export. Trang vendor không hề nói vậy. BA dùng grounding rule sẽ mark claim là unsupported, hỏi vendor trực tiếp và tránh đưa false requirement vào selection scorecard.

## Diagram

```mermaid
flowchart BT
    A["Unsupported claim"] --> B["Reasoned inference"]
    B --> C["Stakeholder confirmation"]
    C --> D["Direct source evidence"]
    D --> E["Fact sẵn sàng thành requirement"]
    A --> F["Open question, không phải scope"]
```

## BA artifact

### Evidence Ladder

| Mức evidence | Dùng trong artifact? | Label cần dùng | Ví dụ |
| --- | --- | --- | --- |
| Direct source | Có | Source-backed fact | Policy page ghi SLA 24 giờ. |
| Stakeholder confirmation | Có | Confirmed decision | Ops manager approve manual override. |
| Reasoned inference | Có điều kiện | Assumption to validate | Case high-risk có thể cần audit. |
| No support | Không | Unsupported claim | Vendor capability không có tài liệu. |

## AI expert note

Control thực tế không chỉ là yêu cầu AI cite source. BA phải kiểm tra source được cite có thật sự support claim không, quyết định evidence level nào chấp nhận được và yêu cầu fallback khi support yếu. Với requirement high-impact, grounding nên là format của artifact, không phải note review tùy chọn.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Chấp nhận claim có citation mà không mở source | Citation có thể chỉ liên quan gần, đã cũ hoặc không support đúng claim. | Kiểm tra claim-to-source support và ghi evidence level trong requirement table. |
| Rewrite unsupported AI claim thành requirement mượt hơn | Wording tốt làm evidence yếu khó phát hiện hơn. | Đưa unsupported claim vào open question có owner và validation method. |
| Dùng cùng evidence threshold cho mọi requirement | Low-risk copy và regulated decision cần control khác nhau. | Định nghĩa evidence level theo risk tier và business impact. |

## AI collaboration prompt

```text
Review câu trả lời này theo source được cung cấp. Trả về bảng gồm claim, evidence level, source ID, confidence, phần unsupported và validation question. Không rewrite unsupported claim thành fact.
```

## Mistakes to avoid

- Xem wording tự tin là evidence.
- Để AI cite source nhưng source không thật sự support claim.
- Bỏ qua stakeholder confirmation cho rule suy luận.
- Không label assumption trong BRD hoặc user story.

## Apply this tomorrow

1. Thêm cột evidence vào một requirement table.
2. Yêu cầu AI mark unsupported claim trong một draft hiện có.
3. Tạo danh sách authoritative source cho một feature.
4. Dùng câu 'not supported by provided sources' trong review prompt.

## What a BA should remember

- Grounding bảo vệ team khỏi false clarity.
- Unsupported claim nên trở thành câu hỏi, không phải requirement.
- Chất lượng citation quan trọng hơn độ trôi chảy của answer.
