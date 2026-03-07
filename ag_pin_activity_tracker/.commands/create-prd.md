# /create-prd

Create a **high-quality, implementation-ready Product Requirements Document (PRD)** for a new product, feature, or initiative.

This command is intended for AI-driven planning workflows:

```text
PRD → FEATURES → TASKS → CODE
```

The PRD must be:

- clear and unambiguous
- testable and actionable
- understandable by junior developers
- scoped for an MVP / v1
- directly convertible into feature specs and engineering tasks

---

## Command Behavior

When this command is used, follow this workflow exactly.

### 1) Intake the idea

Start from the user’s idea, even if it is short.

Examples:

- "Build an API for testing LLM prompts"
- "Create a web app where kids track badge progress"

If key details are missing, continue to Step 2.

### 2) Ask clarifying questions first (required)

Before drafting the PRD, ask **3–7 high-value clarifying questions**.

Focus on **what/why/scope**, not low-level implementation.

Prioritize questions around:

- user/problem clarity
- target audience
- MVP boundaries
- required outcomes
- constraints (time, platform, compliance)
- success criteria

#### Question format rules

- Number each question.
- Provide options where useful (A/B/C/D).
- Include an "Other" option when reasonable.
- Keep questions fast to answer.

Example response format to offer user:

```text
1B, 2A, 3D
4: We need mobile first
```

If the user already provided enough detail, you may skip questions and explicitly state assumptions before drafting.

### 3) Synthesize and confirm assumptions

After answers are received:

- summarize decisions in 5–10 bullets
- list explicit assumptions
- highlight unresolved risks/questions

Then generate the PRD.

---

## PRD Output Format

Generate markdown with this exact structure:

```md
# PRD — <PROJECT_NAME>

## 1. Overview
## 2. Problem Statement
## 3. Goals
## 4. Non-Goals
## 5. Target Users & Personas
## 6. Use Cases / User Journeys
## 7. Core Capabilities (MVP)
## 8. Functional Requirements
## 9. Non-Functional Requirements
## 10. Data & Reporting Requirements
## 11. System Concept (High-Level)
## 12. Success Metrics
## 13. Release Scope & Milestones
## 14. Risks & Mitigations
## 15. Dependencies
## 16. Future Extensions (Post-MVP)
## 17. Open Questions
## 18. Appendix (Assumptions / Glossary)
```

### Section guidance

#### 1. Overview
Short description of what the product is and what outcome it enables.

#### 2. Problem Statement
Explain the pain/opportunity, affected users, and why current solutions are insufficient.

#### 3. Goals
Outcome-focused bullets (not implementation tasks).

#### 4. Non-Goals
Explicit exclusions to prevent scope creep.

#### 5. Target Users & Personas
Primary and secondary personas, with jobs-to-be-done.

#### 6. Use Cases / User Journeys
Top end-to-end flows for MVP.

#### 7. Core Capabilities (MVP)
The minimum product capabilities required for value delivery.

#### 8. Functional Requirements
Numbered, testable statements using RFC-2119 wording where possible:

- MUST = required for MVP
- SHOULD = important but deferrable
- COULD = optional stretch

Example:

`FR-001 (MUST): The system must allow users to ...`

#### 9. Non-Functional Requirements
Performance, reliability, security/privacy, accessibility, compliance, localization, operability.

#### 10. Data & Reporting Requirements
Required events, reports, dashboards, and KPIs.

#### 11. System Concept (High-Level)
Simple conceptual flow and boundaries. No deep technical design.

Example:

`User → Client App → API → Service Layer → Data Store`

#### 12. Success Metrics
Leading + lagging indicators, including target values and timeframe.

#### 13. Release Scope & Milestones
Phased delivery plan (e.g., Discovery, MVP, Beta, GA).

#### 14. Risks & Mitigations
Top product and delivery risks with practical mitigations.

#### 15. Dependencies
Teams, systems, approvals, vendors, or legal/compliance dependencies.

#### 16. Future Extensions (Post-MVP)
Clearly separated from MVP.

#### 17. Open Questions
Outstanding decisions needing stakeholder input.

#### 18. Appendix
Assumptions, glossary, or reference links.

---

## Quality Bar (self-check before final output)

Ensure the PRD is:

- **coherent:** no contradictions between goals/scope/requirements
- **verifiable:** requirements are testable
- **scoped:** clear MVP boundary
- **traceable:** each capability maps to user value
- **implementation-ready:** can be decomposed into feature specs/tasks

If quality is weak in any area, revise before presenting.

---

## Constraints & Guardrails

- Do **not** implement code.
- Do **not** produce deep architecture or schema design unless requested.
- Keep focus on product behavior, user value, and scope.
- Explicitly flag assumptions and unknowns.

---

## File Output Requirements

- Format: `Markdown (.md)`
- Filename: `PRD.md`
- Location: repository root

If writing files is not possible in current context, output the full PRD in chat with a note.

---

## Relationship to downstream artifacts

The PRD is the source artifact for planning:

```text
PRD
  ↓
FEATURE SPECS (what to build)
  ↓
TASKS (how to build it)
  ↓
CODE
```

Example evolution:

```text
PRD.md
FEATURES/v0_core.md
FEATURES/v1_api.md
FEATURES/v2_logging.md
TASKS/v1_api_tasks.md
```