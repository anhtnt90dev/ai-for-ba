---
title: "Template requirement cho AI feature"
description: "Dùng khi feature có model output, recommendation, classification, summarization, retrieval hoặc AI-assisted decision."
---

# Template requirement cho AI feature

Dùng khi feature có model output, recommendation, classification, summarization, retrieval hoặc AI-assisted decision.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| User goal | Ai dùng output AI, cho decision nào, và business outcome nào cần cải thiện? |
| AI task boundary | AI được làm gì, không được làm gì, khi nào nên dùng deterministic rule. |
| Input và prohibited input | Allowed source, PII handling, sensitive field và data retention expectation. |
| Output contract | Format, required field, confidence behavior, explanation, citation và unsupported-claim label. |
| Human review và fallback | Trigger, reviewer role, escalation path, refusal message, correction capture và audit. |
| Evaluation và monitoring | Test set, quality rubric, telemetry, drift signal, alert threshold và release gate. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Tạo requirement cho AI feature theo template. Hỏi missing context trước. Tách fact, assumption, decision needed và unsupported claim.
```
