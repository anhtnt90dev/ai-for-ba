---
title: Glossary
---

# Glossary

| Term | Ý nghĩa trong công việc BA |
| --- | --- |
| LLM | Language model biến context nhìn thấy được thành text output có khả năng phù hợp; hữu ích cho draft, summarize, classify và critique. |
| Hallucination | Claim trôi chảy nhưng không được evidence hỗ trợ; nên trở thành open question, không phải requirement. |
| RAG | Retrieval-Augmented Generation: retrieve source material trước khi generate answer. |
| Context engineering | Thiết kế role, goal, source, constraint, output format và review rule quanh một AI task. |
| Acceptance criteria | Điều kiện observable giúp requirement test được và đủ để release. |
| Traceability | Mapping business goal với requirement, test, evidence và decision. |
| Confidence threshold | Ngưỡng xác định output AI được đi tiếp, cần review hoặc phải fallback. |
| Human-in-the-loop | Workflow được thiết kế để con người review, sửa, approve hoặc reject output AI theo trigger rõ. |
| Evaluation | Đo có hệ thống output AI so với behavior mong muốn, thường bằng curated test case. |
| Governance | Rule, role, control, metric và review gate giúp dùng AI an toàn và hữu ích ở scale team. |
| Prompt injection | User, document hoặc external input cố override instruction dự kiến của AI; requirement của BA nên định nghĩa boundary, refusal, escalation và logging. |
| Bias | Pattern có hệ thống khiến outcome AI bất lợi cho một nhóm hoặc phản ánh historical data không công bằng; BA nên có fairness question, test case và appeal path. |
| Observability | Khả năng nhìn thấy AI feature behave ra sao sau release qua log, metric, feedback, correction, alert và dashboard. |
| Model selection | Chọn model hoặc phương án non-AI phù hợp theo task fit, quality need, latency, context, privacy, access control và cost. |
| PII | Personally identifiable information; prompt, data flow và requirement AI của BA nên định nghĩa redaction, retention và access rule. |
| Access control | Rule đảm bảo user và AI retrieval chỉ access thông tin được phép xem. |
| Evaluation set | Bộ case được curate gồm representative, edge, failure và safety case để đánh giá behavior AI đã đủ tốt chưa. |
| Cost guardrail | Requirement giới hạn chi phí AI qua token budget, model choice, caching, volume assumption, fallback path và monitoring. |
