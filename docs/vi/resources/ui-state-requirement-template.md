---
title: "Template requirement cho UI state"
description: "Dùng khi chuyển Figma, wireframe hoặc screen idea thành frontend requirement implement được."
---

# Template requirement cho UI state

Dùng khi chuyển Figma, wireframe hoặc screen idea thành frontend requirement implement được.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Screen purpose | Primary user goal, entry point và decision mà screen hỗ trợ. |
| State inventory | Loading, empty, success, error, partial data, permission denied, offline và validation state. |
| Control behavior | Visible, hidden, disabled, read-only, default, tooltip và confirmation behavior theo role/state. |
| Copy và recovery | Error message, empty-state guidance, support path, retry và next best action. |
| Responsive và accessibility | Mobile layout, keyboard behavior, focus order, label, announcement và contrast expectation. |
| Backend dependency | API call, field source, cache, timeout, partial failure và audit requirement. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Chuyển UI concept này thành bảng UI state requirement. Bao gồm role, state, control, copy, backend dependency, acceptance criteria và open question cho UX/product/frontend/backend/QA.
```
