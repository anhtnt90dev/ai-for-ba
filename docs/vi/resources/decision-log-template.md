---
title: "Template decision log"
description: "Dùng khi AI-assisted analysis tạo option, trade-off hoặc open question cần human accountability."
---

# Template decision log

Dùng khi AI-assisted analysis tạo option, trade-off hoặc open question cần human accountability.

## Template

| Section | Nội dung cần capture |
| --- | --- |
| Decision | Decision chính xác cần có, không chỉ topic thảo luận. |
| Options | Alternative khả thi, gồm non-AI hoặc option ít rủi ro hơn. |
| Evidence | Source ID, data point, stakeholder statement, assumption và unsupported claim. |
| Impact | Scope, cost, timeline, user experience, operations, risk và downstream artifact bị ảnh hưởng. |
| Owner và due date | Người accountable và ngày delivery cần decision. |
| Outcome | Approved choice, rationale, condition, follow-up action và revisit trigger. |

## How to use it

1. Chuẩn bị source evidence trước khi yêu cầu AI draft artifact.
2. Yêu cầu AI label fact, assumption, unsupported claim và decision needed.
3. Review result thủ công với receiving team.
4. Chuyển open risk thành validation question, owner assignment hoặc backlog item.

## AI prompt

```text
Tạo decision log từ analysis này. Tách decision, option, evidence, assumption, impact, owner, due date và follow-up action.
```
