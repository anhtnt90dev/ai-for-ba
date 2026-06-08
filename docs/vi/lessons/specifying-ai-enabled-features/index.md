---
title: "Đặc tả tính năng có AI"
description: "Viết requirement cho AI feature có tính xác suất, phụ thuộc dữ liệu và nhạy với chất lượng."
---

# Đặc tả tính năng có AI

<div class="lesson-meta">
  <span>Xây dựng sản phẩm có AI dưới góc nhìn BA</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Giải thích đặc tả tính năng có ai bằng ngôn ngữ business.
- Áp dụng concept vào workflow BA thực tế.
- Dùng output AI như draft có evidence, không xem là sự thật tự động.
- Xác định câu hỏi review BA phải hỏi trước khi chia sẻ artifact.

## Why this matters for BA work

AI thay đổi cách tạo ra artifact phân tích, nhưng không thay thế trách nhiệm của BA về clarity, evidence và decision.

<div class="ba-callout">
Viết requirement cho AI feature có tính xác suất, phụ thuộc dữ liệu và nhạy với chất lượng.
</div>

## Core concept

Pattern hữu ích cho BA là controlled collaboration: cung cấp business context cho model, yêu cầu structured output, bắt buộc có evidence, rồi review theo goal, rule, risk và decision của stakeholder.

## Practical BA example

Team muốn AI triage assistant. BA đặc tả input source, output class, confidence threshold, escalation path, user correction, audit và quality metric.

## Diagram

```mermaid
flowchart LR
    A["Business goal"] --> B["Source context"]
    B --> C["AI analysis"]
    C --> D{"BA review"}
    D -->|"Revise"| B
    D -->|"Approve"| E["Artifact đã validate"]
    E --> F["Đặc tả tính năng có AI"]
```

## BA workflow

1. Đóng khung business question trước khi mở AI tool.
2. Cung cấp source context và constraint rõ ràng.
3. Yêu cầu structured output có mapping về source.
4. Chạy critique pass để tìm ambiguity, gap, risk và testability.
5. Chuyển kết quả thành artifact mà team có thể inspect và cùng chịu ownership.

## Prompt hoặc template

```text
Đặc tả AI feature này với user goal, model task, input data, output contract, confidence threshold, human review, fallback, safety constraint và evaluation metric.
```

## What a BA should remember

- AI là bộ tăng tốc reasoning, không phải decision owner.
- Mọi claim quan trọng phải grounded vào source context hoặc stakeholder confirmation.
- BA giỏi giữ review loop rõ ràng: draft, critique, revise, validate.
