---
title: "Review loop và critique"
description: "Cách dùng AI mạnh nhất cho BA không chỉ là draft nhanh hơn; đó là tạo critique loop có kỷ luật trước khi artifact đến team."
---

# Review loop và critique

<div class="lesson-meta">
  <span>AI collaboration và context engineering</span>
  <span>Software BA</span>
  <span>Core</span>
</div>

## Learning outcomes

- Dùng AI như drafter, critic, counterparty và gap finder.
- Chạy multi-perspective review cho BA artifact.
- Chuyển critique thành revision ưu tiên.

## Why this matters for BA work

<div class="ba-callout">
Cách dùng AI mạnh nhất cho BA không chỉ là draft nhanh hơn; đó là tạo critique loop có kỷ luật trước khi artifact đến team.
</div>

Bài này quan trọng vì draft AI đầu tiên tối ưu cho fluency, không nhất thiết đúng, ít rủi ro hoặc sẵn sàng delivery. Review loop biến AI từ shortcut draft thành quality system. BA có thể dùng critique pass để lộ ambiguity, missing rule, unsupported claim, test gap và stakeholder decision trước khi artifact đi xuống downstream.

## Common difficulties for BAs

Trong AI collaboration và context engineering, Review loop và critique trở nên khó khi AI có thể draft rất nhanh, nhưng reviewer cần context lặp lại được, structured output và critique rule để tin kết quả. BA nên kiểm tra các điểm dưới đây trước khi xem artifact có AI hỗ trợ là đủ sẵn sàng cho stakeholder decision hoặc handoff.

| Khó khăn | Vì sao khó trong công việc BA | BA nên xử lý thế nào |
| --- | --- | --- |
| Yêu cầu AI improve draft mà không diagnose trước. | Lỗi "Yêu cầu AI improve draft mà không diagnose trước." xuất hiện khi team bàn về context package quality, prompt reuse, critique loop và output contract nhưng chưa thống nhất source nào authoritative. AI có thể làm disagreement nghe mượt hơn, nên BA phải giữ uncertainty visible. | Áp dụng control này: tách context preparation, generation, critique và human approval thành các bước visible. Sau đó dùng pattern tốt hơn "Chạy critique pass cho evidence, specificity, testability và risk trước khi share." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |
| Xem mọi critique finding quan trọng như nhau. | Với Review loop và critique, điểm khó là Cách dùng AI mạnh nhất cho BA không chỉ là draft nhanh hơn; đó là tạo critique loop có kỷ luật trước khi artifact đến team. Pattern yếu rất dễ xảy ra vì AI có thể tạo câu trả lời trôi chảy trước khi BA check ownership, source freshness hoặc decision right. | Áp dụng control này: tách context preparation, generation, critique và human approval thành các bước visible. Sau đó dùng pattern tốt hơn "Dùng rubric có required lens, severity, source reference và recommended fix." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |
| Bỏ evidence cho critique. | Điểm này khó khi Multi-Perspective Critique Grid được kỳ vọng hỗ trợ repeatable collaboration pattern. Nếu BA không challenge draft, unsupported assumption có thể đi vào planning, testing hoặc stakeholder communication. | Áp dụng control này: tách context preparation, generation, critique và human approval thành các bước visible. Sau đó dùng pattern tốt hơn "Chuyển critique finding thành defect register hoặc decision log có owner." và hỏi ai phải approve artifact trước khi nó ảnh hưởng scope, build, test hoặc release. |

## Where this applies in real projects

Dùng bài này khi BA team muốn pattern AI collaboration tái sử dụng thay vì prompt one-off phụ thuộc thói quen từng người. Output thực tế không phải document dài hơn; đó là Multi-Perspective Critique Grid có đủ evidence, ownership và decision clarity cho cuộc trao đổi tiếp theo của dự án.

| Thời điểm trong dự án | Cách áp dụng bài học | Output cụ thể của BA |
| --- | --- | --- |
| Context setup | Chạy một draft qua QA critique prompt. | Multi-Perspective Critique Grid thể hiện context package quality, prompt reuse, critique loop và output contract, trong đó action "Chạy một draft qua QA critique prompt." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |
| Prompt reuse | Nhờ AI rank finding theo delivery risk. | Multi-Perspective Critique Grid thể hiện source evidence, trong đó action "Nhờ AI rank finding theo delivery risk." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |
| Peer review | Chuyển critique thành revision backlog. | Multi-Perspective Critique Grid thể hiện decision owner, trong đó action "Chuyển critique thành revision backlog." được chuyển thành decision, requirement, checklist hoặc question có thể review ở meeting tiếp theo. |

## If this is missing

Nếu thiếu Review loop và critique, output thay đổi theo từng người, assumption bị ẩn và chất lượng review phụ thuộc vào ai viết prompt. BA vẫn có thể khôi phục, nhưng phải chuyển draft AI bóng bẩy trở lại thành evidence, assumption, owner và decision test được.

| Nếu thiếu | Ảnh hưởng tới dự án | Cách khôi phục |
| --- | --- | --- |
| Accept draft AI đầu tiên vì đọc rất mượt | Fluency có thể che ambiguity, false claim và wording không test được. | Khôi phục bằng pattern tốt hơn: Chạy critique pass cho evidence, specificity, testability và risk trước khi share. Rework Multi-Perspective Critique Grid cho đến khi nó lộ rõ context package quality, prompt reuse, critique loop và output contract, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |
| Hỏi chung chung what is wrong with this | Critique có thể nông và miss dimension quality của BA. | Khôi phục bằng pattern tốt hơn: Dùng rubric có required lens, severity, source reference và recommended fix. Rework Multi-Perspective Critique Grid cho đến khi nó lộ rõ context package quality, prompt reuse, critique loop và output contract, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |
| Để review comment ở dạng informal | Team không track được risk đã resolve hay chưa. | Khôi phục bằng pattern tốt hơn: Chuyển critique finding thành defect register hoặc decision log có owner. Rework Multi-Perspective Critique Grid cho đến khi nó lộ rõ context package quality, prompt reuse, critique loop và output contract, và không share như bản final cho tới khi evidence, ownership và validation path explicit. |

## Mental model or core concept

Output AI một pass rất rủi ro. Review loop làm AI work an toàn hơn: draft, critique, revise, evidence-check và stakeholder-validate. BA có thể yêu cầu AI review từ góc product, QA, engineering, security, operations và user, rồi quyết định finding nào quan trọng.

## Practical BA example

Một SRS section generated nhìn có vẻ đầy đủ. Critique pass phát hiện thiếu audit logging, error state mơ hồ và support workflow chưa cover. BA chuyển finding thành revision task và validation question thay vì ship first draft.

## Diagram

```mermaid
flowchart LR
    A["Draft"] --> B["Critique bởi QA"]
    B --> C["Critique bởi Dev"]
    C --> D["Critique bởi Ops"]
    D --> E["Evidence check"]
    E --> F{"Cần revise?"}
    F -->|Có| A
    F -->|Không| G["Stakeholder validation"]
```

## BA artifact

### Multi-Perspective Critique Grid

| Perspective | Cần inspect | Finding format | Revision action |
| --- | --- | --- | --- |
| QA | Testability, edge case, expected result. | Defect plus test scenario. | Rewrite AC và thêm negative case. |
| Developer | API, data, integration assumption. | Implementation risk. | Clarify contract hoặc dependency. |
| Operations | Support, monitoring, failure handling. | Runbook gap. | Thêm support flow và alert rule. |
| Compliance | Privacy, audit, policy constraint. | Control gap. | Thêm evidence và approval step. |

## AI expert note

Workflow AI hiệu quả nhất tách creation khỏi critique. BA chuyên gia thiết kế review lens có tên rõ: evidence, testability, risk, stakeholder conflict, operational feasibility và compliance. Yêu cầu cùng model critique draft của nó có ích, nhưng thực hành mạnh hơn là dùng rubric explicit, source check và human review cho decision high-risk.

## Bad vs better example

| Cách làm yếu | Vì sao fail | Cách làm BA tốt hơn |
| --- | --- | --- |
| Accept draft AI đầu tiên vì đọc rất mượt | Fluency có thể che ambiguity, false claim và wording không test được. | Chạy critique pass cho evidence, specificity, testability và risk trước khi share. |
| Hỏi chung chung what is wrong with this | Critique có thể nông và miss dimension quality của BA. | Dùng rubric có required lens, severity, source reference và recommended fix. |
| Để review comment ở dạng informal | Team không track được risk đã resolve hay chưa. | Chuyển critique finding thành defect register hoặc decision log có owner. |

## Stakeholder questions to ask

| Stakeholder | Câu hỏi | Vì sao BA hỏi |
| --- | --- | --- |
| Product owner | Review loop và critique cần cải thiện outcome nào, và trade-off nào có thể chấp nhận? | Ngăn output AI tối ưu cho mục tiêu mơ hồ. |
| Engineering lead | Source, system, data hoặc constraint nào khiến Multi-Perspective Critique Grid khó implement? | Biến technical constraint ẩn thành requirement question visible. |
| QA lead | Rule, exception hoặc user state nào phải test được trước khi tin artifact này? | Chuyển wording trôi chảy của AI thành behavior quan sát được. |
| Operations hoặc support | Failure path nào tạo manual work nếu nguyên tắc "Critique thường là nơi AI tạo nhiều giá trị BA nhất" bị bỏ qua? | Làm rõ support load, exception handling và operating impact. |

## Decision log entries

| Decision item | Option cần capture | Owner | Evidence cần có |
| --- | --- | --- | --- |
| Scope boundary cho Multi-Perspective Critique Grid | Must-have, later, out of scope | Product owner | Business outcome và release constraint |
| Authority cho context package quality, prompt reuse, critique loop và output contract | Documented source, stakeholder decision, assumption cần validate | BA + stakeholder chịu trách nhiệm | Source ID, date và approval status |
| Review gate trước handoff | Peer review, QA review, engineering review, formal approval | BA lead hoặc project lead | Risk level và receiving-team readiness |
| Cách recover nếu Yêu cầu AI improve draft mà không diagnose trước. | Rewrite, defer, escalate hoặc validation workshop | Decision owner | Impact lên scope, testability và release risk |

## Definition of Ready / Done

| Gate | Tín hiệu ready | Tín hiệu done |
| --- | --- | --- |
| Definition of Ready | Source cho context package quality, prompt reuse, critique loop và output contract được label và còn hiệu lực. | Multi-Perspective Critique Grid có thể review mà không phải đoán missing context. |
| Definition of Ready | Open assumption có owner và validation path. | Stakeholder có thể accept, reject hoặc defer từng assumption. |
| Definition of Done | Artifact áp dụng control: tách context preparation, generation, critique và human approval thành các bước visible. | Delivery, QA hoặc governance team có thể hành động dựa trên artifact. |
| Definition of Done | Pattern yếu "Yêu cầu AI improve draft mà không diagnose trước." đã được kiểm tra explicit. | Không unsupported AI claim nào bị xem như requirement đã approve. |

## Before and after artifact example

| Before | Risk trong draft AI | Revision của senior BA |
| --- | --- | --- |
| Prompt: "Create Multi-Perspective Critique Grid cho Review loop và critique." | Model có thể tự bịa source fact, owner, threshold hoặc implementation rule. | Thêm source, scope boundary, source authority, output schema và instruction: Chạy critique pass cho evidence, specificity, testability và risk trước khi share. |
| Draft statement: "Chạy một draft qua QA critique prompt." | Action hữu ích nhưng chưa gắn decision owner hoặc acceptance signal. | Rewrite thành project step có owner, expected artifact, review gate và evidence cần trước handoff. |
| Paragraph nghe final về repeatable collaboration pattern | Tone có thể che uncertainty và approval còn thiếu. | Chuyển thành bảng fact, assumption, decision needed, risk và validation question. |

## Manual verification after AI output

| Lens kiểm tra | Manual check | Pass signal |
| --- | --- | --- |
| Evidence | Trace mọi statement quan trọng trong Multi-Perspective Critique Grid về source, decision hoặc assumption có label. | Không unsupported claim nào còn bị ẩn. |
| Completeness | Check context package quality, prompt reuse, critique loop và output contract theo intended audience và receiving team. | Artifact trả lời được điều product, engineering, QA và operations cần. |
| Testability | Hỏi QA có tạo được positive, negative, boundary và exception scenario không. | Wording mơ hồ được rewrite hoặc log thành question. |
| Accountability | Confirm ai approve, ai review và ai xử lý khi artifact sai. | Owner và escalation path explicit. |

## AI collaboration prompt

```text
Review artifact này từ góc QA, developer, operations, compliance, support và end-user. Trả về finding với severity, evidence, affected section, revision recommendation và validation question. Chưa rewrite; critique trước.
```

## Mistakes to avoid

- Yêu cầu AI improve draft mà không diagnose trước.
- Xem mọi critique finding quan trọng như nhau.
- Bỏ evidence cho critique.
- Không giữ revision decision trail.

## Apply this tomorrow

1. Chạy một draft qua QA critique prompt.
2. Nhờ AI rank finding theo delivery risk.
3. Chuyển critique thành revision backlog.
4. Share top three risks với team trước refinement.

## What a BA should remember

- Critique thường là nơi AI tạo nhiều giá trị BA nhất.
- Review loop làm uncertainty visible.
- BA quyết định finding nào trở thành change.
