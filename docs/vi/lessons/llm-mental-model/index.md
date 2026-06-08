---
title: "Mô hình tư duy về LLM"
description: "LLM là engine xử lý và reasoning trên text rất mạnh, nhưng nó không tự biết business rule ẩn nếu bạn không cung cấp hoặc retrieve đúng nguồn."
---

# Mô hình tư duy về LLM

<div class="lesson-meta">
  <span>Nền tảng AI cho Business Analyst</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Giải thích hành vi LLM mà không thổi phồng độ chắc chắn.
- Thiết kế prompt làm lộ assumption và missing context.
- Review output AI như draft có tính xác suất.

## Why this matters for BA work

<div class="ba-callout">
LLM là engine xử lý và reasoning trên text rất mạnh, nhưng nó không tự biết business rule ẩn nếu bạn không cung cấp hoặc retrieve đúng nguồn.
</div>

Bài này quan trọng vì output của LLM thường nghe rất hoàn chỉnh trước khi nó thật sự được governance, có source hoặc test được. BA hiểu mental model sẽ dùng AI như partner để draft và critique có cấu trúc, không nhầm text trôi chảy với business approval. Điều này giữ requirement ở trạng thái reviewable và ngăn assumption ẩn đi vào artifact triển khai.

## Mental model or core concept

LLM biến context thành chuỗi text có khả năng phù hợp tiếp theo. Nó có thể summarize, classify, compare, draft và suy luận pattern, nhưng chất lượng phụ thuộc vào context, instruction, example và review. Với BA, mental model đúng không phải 'AI biết câu trả lời', mà là 'AI đề xuất structured draft từ context được cung cấp, BA validate lại.'

## Practical BA example

BA yêu cầu LLM viết acceptance criteria cho 'premium users can export reports.' Model có thể tự bịa format export, limit và permission. Nếu BA cung cấp subscription tier, report type, audit rule và example, model sẽ draft tốt hơn và chỉ ra assumption cần validate.

## Diagram

```mermaid
sequenceDiagram
    participant BA
    participant Context
    participant LLM
    participant Review
    BA->>Context: Cung cấp goal, source, rule
    Context->>LLM: Working memory nhìn thấy được
    LLM->>LLM: Predict và transform text
    LLM->>Review: Draft + assumption
    Review->>BA: Validate fact, rule, decision
```

## BA artifact

### LLM Output Review Card

| Lens review | Câu hỏi cần hỏi | Pass signal | Risk signal |
| --- | --- | --- | --- |
| Context | Model đã nhận business rule thật chưa? | Output cite context được cung cấp. | Output tự bịa policy hoặc threshold. |
| Assumption | Statement nào là inferred? | Assumption được label rõ. | Assumption bị viết như fact. |
| Specificity | QA có test được không? | Rule, actor và outcome rõ. | Dùng từ mơ hồ như nhanh, dễ, thông minh. |
| Decision | Ai phải approve? | Decision owner được nêu rõ. | Câu trả lời AI bị xem như approval. |

## AI expert note

LLM là hệ thống xác suất có khả năng pattern language rất mạnh, không phải requirement engine có thẩm quyền. BA phải quản lý context, example, constraint và review criteria. Dùng chuyên nghiệp nghĩa là yêu cầu assumption, evidence label, counterexample và testability check, sau đó xem answer như candidate artifact cần human validation.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Yêu cầu model viết final acceptance criteria từ một idea một dòng | Model sẽ tự điền policy, permission và edge case còn thiếu bằng invention nghe hợp lý. | Cung cấp rule, actor, constraint, example và bắt model list assumption riêng. |
| Xem ngôn ngữ tự tin của model là approval | Model confidence không phải stakeholder confirmation hoặc regulatory evidence. | Đưa material claim qua source review hoặc decision owner trước khi publish. |
| Share draft AI bóng bẩy nhưng không có dấu review | Stakeholder không thấy đâu là fact, inference hay unsupported text. | Thêm bảng review cho source-backed fact, assumption, open question và owner decision. |

## AI collaboration prompt

```text
Trước khi draft, hãy liệt kê missing context và assumption. Sau đó tạo artifact. Cuối draft, thêm bảng review gồm fact có source, assumption suy luận, unsupported claim và câu hỏi cần stakeholder validate.
```

## Mistakes to avoid

- Yêu cầu AI đưa final truth thay vì reviewable draft.
- Không tách model confidence khỏi business approval.
- Giao task mơ hồ mà thiếu source context hoặc example.
- Không yêu cầu model reveal assumption.

## Apply this tomorrow

1. Chọn một output AI và đánh dấu fact vs assumption.
2. Yêu cầu AI rewrite artifact chỉ dựa trên context được cung cấp.
3. Thêm section 'questions for validation' vào prompt.
4. Review một output bằng góc nhìn QA hoặc developer trước khi share.

## What a BA should remember

- LLM sinh text hợp lý, không đảm bảo sự thật.
- Prompt tốt làm missing context hiện ra.
- BA sở hữu validation, không phải model.
