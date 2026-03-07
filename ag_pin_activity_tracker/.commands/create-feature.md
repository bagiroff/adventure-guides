# /create-feature

Convert a PRD capability into a **high-quality Feature Specification** that is ready to decompose into engineering tasks.

This command sits in the planning pipeline:

```text
PRD → FEATURES → TASKS → CODE
```

Each feature spec should represent **one coherent capability** from the PRD and define scope, behavior, constraints, and acceptance criteria clearly.

---

## Command Behavior

Follow this workflow exactly.

### 1) Receive input

Input may be:

- a PRD capability or section reference
- a user request for a specific feature
- an existing design note

Examples:

- "Create feature spec for achievement evidence upload"
- "Add monthly reporting by group/circle/girl"

### 2) Confirm feature boundary

Before writing, identify and state:

- feature name
- linked PRD goal/capability
- what is explicitly in scope for this feature
- what is intentionally out of scope

If feature boundary is unclear, ask clarifying questions.

### 3) Ask clarifying questions (if needed)

Ask **2–6 targeted questions** only when required to avoid ambiguous scope.

Focus on:

- scope boundaries
- user interactions
- business rules
- data/reporting requirements
- dependencies and rollout constraints

#### Question format rules

- Number questions
- Offer options A/B/C/D where useful
- Include “Other” option when appropriate
- Keep questions easy to answer quickly

If user input is already sufficient, proceed directly and explicitly list assumptions.

### 4) Generate feature specification

Save as:

`FEATURES/<feature-slug>.md`

Example:

`FEATURES/achievement_evidence_upload.md`

---

## Feature Spec Output Format

Use this exact structure:

```md
# Feature — <FEATURE_NAME>

## 1. Summary
## 2. PRD Traceability
## 3. Scope
## 4. Non-Scope
## 5. User Stories
## 6. User Flow
## 7. Functional Requirements
## 8. Non-Functional Requirements
## 9. Data Contract & State
## 10. Edge Cases & Failure Handling
## 11. Dependencies
## 12. Acceptance Criteria
## 13. Rollout & Validation
## 14. Open Questions
## 15. Task Decomposition Hints
```

### Section guidance

#### 1. Summary
What capability this feature delivers and why it matters.

#### 2. PRD Traceability
Reference exact PRD sections/FR IDs/goals that this feature implements.

#### 3. Scope
Explicitly list what is included in this feature.

#### 4. Non-Scope
Explicitly list what is excluded (to prevent scope creep).

#### 5. User Stories
Use format:

- As a `<user>`
- I want `<action>`
- So that `<benefit>`

Include primary and optional secondary stories.

#### 6. User Flow
Describe primary end-to-end interaction steps.

#### 7. Functional Requirements
Use numbered, testable statements with priority tags:

- MUST (required)
- SHOULD (important)
- COULD (optional)

Example:

`FR-001 (MUST): System must ...`

#### 8. Non-Functional Requirements
Performance, reliability, accessibility, security/privacy, observability, maintainability.

#### 9. Data Contract & State
Define inputs/outputs, state transitions, persisted fields, and event logging needs at a high level.

#### 10. Edge Cases & Failure Handling
List expected failure/edge scenarios and expected system behavior.

#### 11. Dependencies
Upstream/downstream systems, approvals, services, or teams.

#### 12. Acceptance Criteria
Concrete, test-ready Given/When/Then style criteria where possible.

#### 13. Rollout & Validation
Phased release strategy, telemetry checks, and rollback notes (if relevant).

#### 14. Open Questions
Explicit unresolved decisions.

#### 15. Task Decomposition Hints
Break into likely task buckets (frontend/backend/data/testing) without writing implementation code.

---

## Quality Bar (self-check)

Before finalizing, verify the feature spec is:

- **traceable:** mapped to PRD goals/requirements
- **scoped:** clear in-scope vs out-of-scope
- **testable:** acceptance criteria are objective
- **actionable:** can be split into tasks without re-interpretation
- **lean:** no unnecessary architecture deep-dive

If any check fails, revise before output.

---

## Constraints & Guardrails

- Do **not** implement code.
- Do **not** produce low-level technical design unless explicitly requested.
- Keep language product + behavior focused.
- Flag assumptions and unknowns clearly.

---

## Naming & File Rules

- Directory: `FEATURES/`
- Filename: lowercase snake_case slug
- Example: `FEATURES/monthly_group_reporting.md`

If file writing is unavailable, output full spec in chat and indicate intended filename.
