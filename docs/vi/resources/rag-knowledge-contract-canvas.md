---
title: "Canvas RAG knowledge contract"
description: "Dùng trước khi đặc tả knowledge assistant, policy assistant, support assistant hoặc document Q&A feature."
---

# Canvas RAG knowledge contract

Dùng trước khi đặc tả knowledge assistant, policy assistant, support assistant hoặc document Q&A feature.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Source inventory | Approved source, owner, update cadence, effective date và excluded source. |
| Authority và conflict | Priority order, conflict warning, policy override rule và decision owner. |
| Access control | Role-based retrieval, document sensitivity, tenant boundary và no-leakage test case. |
| Citation behavior | Citation display, source snippet, confidence, unsupported answer và freshness signal. |
| Fallback | No-answer behavior, escalation path, human review trigger và support handoff. |
| Retrieval evaluation | Representative question, expected source, wrong-source case và retrieval quality metric. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Tạo RAG knowledge contract cho assistant này. Bao gồm source authority, freshness, access control, citation, conflict handling, fallback, retrieval metric và test question.
```
