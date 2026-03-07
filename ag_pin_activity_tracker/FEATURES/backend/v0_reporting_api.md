# Feature — Backend v0 Reporting API (Monthly Group/Circle/Girl Stats)

## 1. Summary

Provide backend reporting endpoints/jobs that generate monthly summary statistics for group, circle, and girl levels from achievement completion data.

## 2. PRD Traceability

- PRD §10 Data & Reporting Requirements (MVP reporting baseline)
- PRD §13 Phase 1 MVP: basic monthly reporting by group/circle/girl
- PRD Success Metric: monthly reporting without manual spreadsheet consolidation

## 3. Scope

- Aggregate monthly completion metrics by:
  - group
  - circle
  - girl
- Expose API endpoint(s) to fetch monthly report results.
- Support report period filtering (month/year).
- Persist/report-ready aggregates or generate on read (implementation choice).

## 4. Non-Scope

- Advanced analytics/trend forecasting.
- Admin editing/moderation workflows.
- External notification delivery.

## 5. User Stories

- As a leader, I want monthly completion summaries so I can track circle and group progress.
- As a family, I want visible monthly progress per girl to understand momentum.

## 6. User Flow

1. Reporting worker/API computes monthly aggregates from completion records.
2. Frontend requests selected month report.
3. API returns grouped statistics for group/circle/girl slices.
4. Frontend renders report table/export view.

## 7. Functional Requirements

- FR-001 (MUST): API must provide monthly aggregated completion stats per group.
- FR-002 (MUST): API must provide monthly aggregated completion stats per circle.
- FR-003 (MUST): API must provide monthly aggregated completion stats per girl.
- FR-004 (MUST): API must support month/year filter parameters.
- FR-005 (MUST): Report calculations must be based on persisted completion events/state.
- FR-006 (SHOULD): API should support pagination for large result sets.
- FR-007 (COULD): API could expose CSV export payload endpoint in v0.

## 8. Non-Functional Requirements

- Reliability: report generation should be deterministic and repeatable.
- Performance: report queries should be optimized for expected MVP scale.
- Maintainability: clear aggregation logic with testable query contracts.

## 9. Data Contract & State

- Inputs:
  - `month`, `year`
  - optional filters: `circle`, `girlId`
- Outputs:
  - totals: achievements completed / total possible
  - completion percentage
  - grouped rows for group/circle/girl
- Data sources:
  - completion state/events
  - hierarchy mapping (group/circle/girl)

## 10. Edge Cases & Failure Handling

- No data in selected month: return empty report with zeroed summary.
- Partial hierarchy mappings: flag rows with unknown association.
- Late arriving updates: define whether reports are real-time or recomputed nightly.

## 11. Dependencies

- `FEATURES/backend/v0_progress_api.md` completion data quality.
- Managed Postgres query/index strategy.
- Optional background job scheduler for pre-computation.

## 12. Acceptance Criteria

- Given valid month/year, when report endpoint is called, then grouped stats for group/circle/girl are returned.
- Given no completions in period, then endpoint returns valid empty report structure.
- Given known completion records, then percentages and totals match expected calculations.

## 13. Rollout & Validation

- Release with MVP reporting endpoint and baseline observability.
- Validate with sample-data reconciliation against manual spot checks.

## 14. Open Questions

- Should reports be computed on demand or materialized via scheduled job?
- Is CSV export required in MVP or immediate next iteration?

## 15. Task Decomposition Hints

- Backend: aggregation service + reporting endpoint(s).
- Data: query/index tuning and optional materialized table.
- QA: calculation correctness tests with fixture datasets.
