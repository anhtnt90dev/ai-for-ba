---
title: "Context engineering patterns"
description: "Đi xa hơn prompting bằng thiết kế context lặp lại được: role, source, task, constraint, output và review criteria."
---

# Context engineering patterns

<div class="lesson-meta">
  <span>AI collaboration và context engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Giải thích context engineering patterns bằng ngôn ngữ business.
- Áp dụng concept vào workflow BA thực tế.
- Dùng output AI như draft có evidence, không xem là sự thật tự động.
- Xác định câu hỏi review BA phải hỏi trước khi chia sẻ artifact.

## Why this matters for BA work

AI thay đổi cách tạo ra artifact phân tích, nhưng không thay thế trách nhiệm của BA về clarity, evidence và decision.

<div class="ba-callout">
Đi xa hơn prompting bằng thiết kế context lặp lại được: role, source, task, constraint, output và review criteria.
</div>

## Core concept

Pattern hữu ích cho BA là controlled collaboration: cung cấp business context cho model, yêu cầu structured output, bắt buộc có evidence, rồi review theo goal, rule, risk và decision của stakeholder.

## Practical BA example

BA nhận output kém vì prompt chỉ ghi 'write requirements'. Context package tốt hơn gồm product goal, user, source excerpt, constraint, format và quality rubric.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Artifact đã validate"]
    E --> F["Context engineering patterns"]
```

## BA workflow

1. Đóng khung business question trước khi mở AI tool.
2. Cung cấp source context và constraint rõ ràng.
3. Yêu cầu structured output có mapping về source.
4. Chạy critique pass để tìm ambiguity, gap, risk và testability.
5. Chuyển kết quả thành artifact mà team có thể inspect và cùng chịu ownership.

## Prompt hoặc template

```text
Dùng cấu trúc này: Role, Business Goal, Source Context, Task, Constraint, Output Format, Quality Bar, Questions Before Drafting.
```

## What a BA should remember

- AI là bộ tăng tốc reasoning, không phải decision owner.
- Mọi claim quan trọng phải grounded vào source context hoặc stakeholder confirmation.
- BA giỏi giữ review loop rõ ràng: draft, critique, revise, validate.
