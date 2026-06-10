---
title: "Matrix AI risk và human review"
description: "Dùng để quyết định khi nào output AI được đi tiếp, cần review, hoặc phải fallback/escalate."
---

# Matrix AI risk và human review

Dùng để quyết định khi nào output AI được đi tiếp, cần review, hoặc phải fallback/escalate.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Low risk | Drafting, summarization, formatting hoặc brainstorming từ non-sensitive source có BA review. |
| Medium risk | Requirement, customer-facing text, support recommendation hoặc source-grounded answer có reviewer rõ. |
| High risk | Legal, financial, medical, employment, access control, pricing, compliance hoặc irreversible decision. |
| Review trigger | Low confidence, missing citation, conflict, PII, sensitive user group, high-value transaction hoặc user harm risk. |
| Fallback | Giải thích limitation, hỏi thêm context, route to human, log reason và tránh invented answer. |
| Audit | Lưu source, output, reviewer decision, correction, timestamp và unresolved risk. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Classify AI workflow này theo risk tier. Define human review trigger, fallback behavior, audit need, owner và acceptance criteria cho từng tier.
```
