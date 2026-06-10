---
title: "Checklist review prompt"
description: "Dùng trước khi biến prompt one-off thành reusable team prompt hoặc workflow."
---

# Checklist review prompt

Dùng trước khi biến prompt one-off thành reusable team prompt hoặc workflow.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Role và goal | Prompt nêu BA role, business goal, user và decision context. |
| Source boundary | Prompt nói source nào được dùng và làm gì khi thiếu evidence. |
| Output contract | Result format, required column, severity label và validation question được define. |
| Safety và privacy | Prompt exclude confidential data, PII, unsafe instruction và unsupported claim. |
| Critique step | Model phải review output của nó về ambiguity, conflict, gap và hallucination. |
| Reuse note | Input, assumption, example và known failure mode được document cho BA team. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Review prompt này để BA team reuse. Chấm role clarity, source boundary, output contract, safety, critique step và failure mode. Đề xuất version tốt hơn.
```
