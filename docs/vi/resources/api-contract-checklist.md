---
title: "Checklist API contract"
description: "Dùng khi BA cần align frontend need, backend constraint, QA expectation và business rule quanh API."
---

# Checklist API contract

Dùng khi BA cần align frontend need, backend constraint, QA expectation và business rule quanh API.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Endpoint purpose | Business action, consumer, producer và user-facing outcome. |
| Request schema | Required field, optional field, validation rule, enum, date, ID và example. |
| Response schema | Success payload, partial success, empty result, pagination, sorting và metadata. |
| Error và recovery | Error taxonomy, message ownership, retry, timeout, idempotency và fallback behavior. |
| Security và audit | Authentication, authorization, RBAC, PII, audit event, rate limit và abuse case. |
| Versioning và compatibility | Backward compatibility, deprecation, feature flag và migration expectation. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Review API contract này dưới góc BA. Identify missing business rule, schema gap, error case, security requirement, QA scenario và frontend impact.
```
