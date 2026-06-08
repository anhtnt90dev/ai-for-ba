---
title: "User story và acceptance criteria"
description: "Practical AI lab for Business Analysts."
---

# User story và acceptance criteria

## Mục tiêu

Một ý tưởng feature cần được chuyển thành user story sẵn sàng cho development và acceptance criteria dạng Given-When-Then.

## Scenario

You are working in a software product team. The team expects a BA-ready artifact that can be reviewed by product, engineering, QA, and operations.

## Diagram

```mermaid
flowchart TD
    A["Raw input"] --> B["AI-assisted analysis"]
    B --> C["BA review"]
    C --> D{"Ready for team review?"}
    D -->|"No"| B
    D -->|"Yes"| E["Shared artifact"]
```

## Hướng dẫn

1. Clarify the business goal and target users.
2. Ask AI to produce a first draft with explicit assumptions.
3. Review the output for ambiguity, gaps, risks, and evidence.
4. Revise the artifact until it can be shared with the delivery team.
5. Capture open questions instead of hiding uncertainty.

## Deliverables

- story map
- user story
- acceptance criteria
- negative test case

## Lab prompt

```text
Hãy đóng vai senior BA coach. Hỗ trợ tôi hoàn thành lab từng bước. Hỏi câu hỏi làm rõ trước, sau đó tạo artifact với assumption, evidence, risk và open question.
```

## Review rubric

- Every recommendation has evidence or is marked as an assumption.
- Open questions are visible and assigned.
- The artifact is testable by QA and understandable by stakeholders.
- Risks are stated in business language, not only technical language.
