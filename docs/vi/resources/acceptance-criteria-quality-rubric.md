---
title: "Rubric chất lượng acceptance criteria"
description: "Dùng để review acceptance criteria do AI hoặc con người viết trước sprint refinement."
---

# Rubric chất lượng acceptance criteria

Dùng để review acceptance criteria do AI hoặc con người viết trước sprint refinement.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Actor và trigger | User, role, system event hoặc scheduled trigger explicit. |
| Business rule | Threshold, permission, calculation và policy constraint test được. |
| Data và state | Required field, lifecycle state, precondition và invalid data được cover. |
| Negative và edge case | Boundary, failure, exception và permission scenario được thêm. |
| NFR và observability | Performance, security, audit, accessibility, localization hoặc analytics được nêu khi relevant. |
| Evidence | Mỗi criterion trace về source, stakeholder decision hoặc assumption có label. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Review acceptance criteria này bằng rubric. Trả về defect theo severity, missing case, testability gap và rewrite candidate mà không invent policy.
```
