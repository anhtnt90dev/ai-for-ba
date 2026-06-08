---
title: "Structured output và prompt tái sử dụng"
description: "Structured output biến AI từ chat response thành BA artifact có thể review."
---

# Structured output và prompt tái sử dụng

<div class="lesson-meta">
  <span>AI collaboration và context engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Thiết kế output table và schema cho task BA.
- Tạo reusable prompt cho work phân tích lặp lại.
- Làm output AI dễ review, compare và trace hơn.

## Why this matters for BA work

<div class="ba-callout">
Structured output biến AI từ chat response thành BA artifact có thể review.
</div>

Bài này quan trọng vì artifact BA cần được compare, review, trace và handoff. Prose tự do của AI rất khó validate ở scale. Structured output làm missing field visible, enforce evidence discipline và giúp team reuse prompt cho story, risk, requirement, decision và review finding mà không phải bắt đầu lại.

## Mental model or core concept

Answer không cấu trúc rất khó verify. Structured output cho BA column, ID, severity level, source reference và owner. Nhờ vậy product, dev, QA và stakeholder có thể inspect. Reusable prompt nên định nghĩa input, output contract, constraint và review rule.

## Practical BA example

Thay vì hỏi 'summarize meeting này', BA yêu cầu bảng gồm decision, evidence, owner, impacted requirement, risk và open question. Output có thể chuyển thành Jira task, decision log và follow-up action.

## Diagram

```mermaid
flowchart TD
    A["Reusable prompt"] --> B["Input scope"]
    A --> C["Output schema"]
    A --> D["Constraint"]
    A --> E["Review rule"]
    B --> F["Traceable table"]
    C --> F
    D --> F
    E --> F
```

## BA artifact

### Reusable Prompt Contract

| Contract part | Content bắt buộc | Vì sao hữu ích | Ví dụ |
| --- | --- | --- | --- |
| Input scope | Source nào included và excluded. | Tránh context drift ẩn. | Chỉ dùng transcript T1 và policy P2. |
| Output columns | Field artifact phải có. | Làm review systematic. | ID, issue, severity, evidence, question. |
| Constraints | Rule AI phải tuân thủ. | Ngăn unsupported content. | Không tự bịa policy. |
| Review rule | Cách đánh giá output. | Align với BA quality. | Mỗi row cần source hoặc assumption. |

## AI expert note

Structured output là một control surface. Schema nói cho model biết dimension nào quan trọng và nói cho reviewer biết phải check gì. BA chuyên gia thêm source ID, assumption flag, confidence, decision owner, testability, risk level và next action để output hỗ trợ governance, không chỉ readability.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Yêu cầu AI phân tích chi tiết bằng paragraph | Field quan trọng như owner, evidence, risk và action có thể biến mất. | Dùng table hoặc JSON-like structure với column bắt buộc và cách xử lý missing value rõ. |
| Reuse prompt nhưng không có quality contract | Cùng prompt có thể tạo artifact inconsistent giữa project. | Định nghĩa output schema, acceptance criteria, review rubric và revision instruction. |
| Xem structured output là tự động đúng | Bảng nhìn precise nhưng vẫn có thể chứa data unsupported. | Validate từng row theo source support, decision status và testability. |

## AI collaboration prompt

```text
Tạo reusable prompt cho BA task này. Bao gồm purpose, input assumption, required context, output schema, constraint, quality rubric và self-check section. Giữ đủ generic để reuse nhưng đủ specific để output review được.
```

## Mistakes to avoid

- Dùng free-form output cho task cần comparison.
- Quên ID và source reference.
- Tạo prompt mà BA khác không reuse được.
- Không định nghĩa cách rank severity.

## Apply this tomorrow

1. Chuyển một prompt thường dùng thành reusable prompt contract.
2. Thêm output column source, severity và owner.
3. Yêu cầu AI self-check theo output schema.
4. Lưu prompt vào team library.

## What a BA should remember

- Structure là quality control.
- Prompt tốt định nghĩa output, không chỉ task.
- Reusable prompt biến kỹ năng cá nhân thành capability của team.
