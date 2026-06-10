---
title: "API Contract Checklist"
description: "Use this when a BA must align frontend needs, backend constraints, QA expectations, and business rules around an API."
---

# API Contract Checklist

Use this when a BA must align frontend needs, backend constraints, QA expectations, and business rules around an API.

## Template

| Section | What to capture |
| --- | --- |
| Endpoint purpose | Business action, consumer, producer, and user-facing outcome. |
| Request schema | Required fields, optional fields, validation rules, enums, dates, IDs, and examples. |
| Response schema | Success payload, partial success, empty result, pagination, sorting, and metadata. |
| Errors and recovery | Error taxonomy, message ownership, retry, timeout, idempotency, and fallback behavior. |
| Security and audit | Authentication, authorization, RBAC, PII, audit event, rate limit, and abuse cases. |
| Versioning and compatibility | Backward compatibility, deprecation, feature flags, and migration expectations. |

## How to use it

1. Prepare source evidence before asking AI to draft the artifact.
2. Ask AI to label facts, assumptions, unsupported claims, and decisions needed.
3. Review the result manually with the receiving team.
4. Convert open risks into validation questions, owner assignments, or backlog items.

## AI prompt

```text
Review this API contract from a BA perspective. Identify missing business rules, schema gaps, error cases, security requirements, QA scenarios, and frontend impact.
```
