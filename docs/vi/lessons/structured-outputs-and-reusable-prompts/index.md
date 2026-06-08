---
title: "Structured output và prompt tái sử dụng"
description: "Thiết kế prompt trả về table, checklist, cấu trúc gần JSON và format artifact BA có thể tái sử dụng."
---

# Structured output và prompt tái sử dụng

<div class="lesson-meta">
  <span>AI collaboration và context engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Giải thích structured output và prompt tái sử dụng bằng ngôn ngữ business.
- Áp dụng concept vào workflow BA thực tế.
- Dùng output AI như draft có evidence, không xem là sự thật tự động.
- Xác định câu hỏi review BA phải hỏi trước khi chia sẻ artifact.

## Why this matters for BA work

AI thay đổi cách tạo ra artifact phân tích, nhưng không thay thế trách nhiệm của BA về clarity, evidence và decision.

<div class="ba-callout">
Thiết kế prompt trả về table, checklist, cấu trúc gần JSON và format artifact BA có thể tái sử dụng.
</div>

## Core concept

Pattern hữu ích cho BA là controlled collaboration: cung cấp business context cho model, yêu cầu structured output, bắt buộc có evidence, rồi review theo goal, rule, risk và decision của stakeholder.

## Practical BA example

Thay vì yêu cầu summary chung chung, BA yêu cầu bảng gồm requirement ID, actor, business rule, acceptance criteria, source, risk và open question.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Artifact đã validate"]
    E --> F["Structured output và prompt tái sử dụng"]
```

## BA workflow

1. Đóng khung business question trước khi mở AI tool.
2. Cung cấp source context và constraint rõ ràng.
3. Yêu cầu structured output có mapping về source.
4. Chạy critique pass để tìm ambiguity, gap, risk và testability.
5. Chuyển kết quả thành artifact mà team có thể inspect và cùng chịu ownership.

## Prompt hoặc template

```text
Trả về bảng với các cột: ID, User Goal, Requirement, Acceptance Criteria, Source Evidence, Risk, Open Question, Owner.
```

## What a BA should remember

- AI là bộ tăng tốc reasoning, không phải decision owner.
- Mọi claim quan trọng phải grounded vào source context hoặc stakeholder confirmation.
- BA giỏi giữ review loop rõ ràng: draft, critique, revise, validate.
