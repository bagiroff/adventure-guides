# Feature — Backend v0 Progress API

## 1. Summary

Provide backend APIs for reading tracker state and persisting achievement completion data (including evidence metadata and derived top-level completion state).

## 2. PRD Traceability

- PRD §7 Core Capabilities: #3, #4, #5
- PRD FR-006, FR-007, FR-008, FR-009, FR-010, FR-011
- PRD §10 Data & Reporting Requirements

## 3. Scope

- Read endpoint(s) for achievement hierarchy + current completion state.
- Write endpoint for mark complete with required evidence reference + completion timestamp.
- Write endpoint for revert/uncheck (MVP optional but recommended).
- Persist completion metadata and update derived parent/top-level status.
- Emit events required for reporting pipelines.

## 4. Non-Scope

- WhatsApp notification delivery (Phase 2+).
- Admin override / on-behalf editing permissions.
- Advanced analytics and trend dashboards.

## 5. User Stories

- As a user, I want my completion updates saved immediately so my progress is never lost.
- As a user, I want parent sections to auto-complete when all child items are complete.
- As a leader (future), I want consistent data for monthly reports.

## 6. User Flow

1. Frontend requests tracker state.
2. API returns hierarchy + existing completion/evidence metadata.
3. User completes item in UI and sends write payload.
4. API validates payload, persists completion, recomputes parent status.
5. API returns updated state for the affected branch.

## 7. Functional Requirements

- FR-001 (MUST): API must return achievement structure and user-specific completion state.
- FR-002 (MUST): Mark-complete endpoint must require evidence reference in MVP.
- FR-003 (MUST): Mark-complete endpoint must set completion timestamp server-side.
- FR-004 (MUST): API must persist completion metadata durably.
- FR-005 (MUST): API must recompute parent/top-level completion after child updates.
- FR-006 (MUST): API must return updated completion state after successful write.
- FR-007 (SHOULD): API should support revert/uncheck semantics with auditable updates.
- FR-008 (SHOULD): API should publish completion events for reporting job consumption.

## 8. Non-Functional Requirements

- Reliability: write operations are atomic and resilient to retries.
- Security: all endpoints require authenticated session and scoped authorization.
- Performance: state read and write responses should be responsive for mobile usage.
- Maintainability: clear API versioning and stable contracts.

## 9. Data Contract & State

- Read response includes:
  - achievement tree
  - completion flags
  - parent derived status
  - evidence metadata summary
- Write payload includes:
  - achievementId
  - action (`complete` | `revert`)
  - evidenceRef (required for complete)
- Persisted records include:
  - completionAt, updatedAt, actorUserId
  - evidence pointer (object storage key/url)
  - audit/event records

## 10. Edge Cases & Failure Handling

- Duplicate complete requests: idempotent success.
- Missing/invalid evidenceRef on complete: validation error.
- Stale updates from concurrent clients: conflict-safe update behavior.
- Child reverted after parent complete: parent auto-reverts accordingly.

## 11. Dependencies

- Auth/session middleware.
- Achievement catalog/definitions.
- Database for completion state.
- Object storage integration for evidence refs.

## 12. Acceptance Criteria

- Given authenticated user, when tracker state is requested, then API returns hierarchy + accurate completion state.
- Given complete action without evidenceRef, then API rejects request.
- Given complete action with valid payload, then completion is persisted and returned.
- Given all children complete, then parent/top-level status is returned as complete.
- Given child revert, then parent/top-level status recalculates correctly.

## 13. Rollout & Validation

- Ship in MVP API release with observability on write failures and latency.
- Validate via telemetry: completion write success rate, error rate, recompute correctness checks.

## 14. Open Questions

- Should revert preserve prior evidence history or hard-remove pointer from active state?
- Do we need optimistic locking/version numbers in v0?

## 15. Task Decomposition Hints

- Backend: read/write endpoints + parent recompute logic.
- Data: completion schema + derived status query strategy.
- Integration: evidence reference contract with upload flow.
- QA: concurrency, idempotency, parent-child recalculation tests.
