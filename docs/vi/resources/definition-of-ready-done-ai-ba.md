---
title: "Definition of Ready và Done cho AI-augmented BA work"
description: "Dùng để định nghĩa quality gate trước khi AI-assisted BA artifact đi vào refinement, build, test hoặc release decision."
---

# Definition of Ready và Done cho AI-augmented BA work

Dùng để định nghĩa quality gate trước khi AI-assisted BA artifact đi vào refinement, build, test hoặc release decision.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Ready: source pack | Source có ID, owner, date, approval status và sensitivity label. |
| Ready: task boundary | AI task, output format, constraint và prohibited assumption explicit. |
| Ready: decision owner | Open question và approval có owner và target date. |
| Done: evidence review | Fact, assumption, unsupported claim và decision được tách riêng. |
| Done: receiving-team fit | Product, engineering, QA, UX, operations hoặc governance có thể hành động từ artifact. |
| Done: risk control | NFR, privacy, access, monitoring, fallback và human review control được thêm khi relevant. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Evaluate BA artifact này theo Definition of Ready và Done cho AI-assisted work. Trả về pass/fail, gap, remediation step và question cho stakeholder.
```
