---
title: "Prompt playbook"
---

# Prompt playbook

## Context package template

```text
Role:
Business goal:
Users and stakeholders:
Scope in / scope out:
Source IDs:
Constraints:
Task:
Output format:
Quality bar:
Questions before drafting:
```

## Requirement review prompt

```text
Review requirement được cung cấp bằng taxonomy: ambiguity, conflict, missing actor, missing data, missing business rule, NFR gap, non-testable wording. Trả về bảng gồm issue, severity, evidence, affected text, clarification question và candidate rewrite test được. Không tự bịa policy.
```

## AI feature specification prompt

```text
Đặc tả AI-enabled feature này với user goal, AI task, allowed input, prohibited input, output contract, confidence threshold, human review trigger, fallback behavior, correction capture, audit, monitoring event và evaluation metric.
```

## RAG assistant prompt

```text
Tạo RAG knowledge contract: source inventory, authority, freshness, access control, chunking assumption, citation behavior, conflict handling, fallback, retrieval metric, answer-quality metric và test question.
```
