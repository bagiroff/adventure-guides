# Feature — Frontend v0 Sheet Layout

## 1. Summary

Implement a mobile-first tracker screen that replicates the physical Adventure Princess sheet structure, rendering sections and achievements with clear completion states.

## 2. PRD Traceability

- PRD §7 Core Capabilities: #2, #5
- PRD FR-005, FR-010, FR-011
- PRD §6 Use Cases: Track an achievement, View progress

## 3. Scope

- Render sheet hierarchy (sections + child achievements) in paper-aligned order.
- Mobile-first responsive layout and touch-friendly controls.
- Display current completion state on each item.
- Display computed top-level completion state.

## 4. Non-Scope

- Completion evidence capture UI details (handled in `v0_completion_modal`).
- Admin overlays and edit-on-behalf controls.
- Desktop-specific advanced layout variants.

## 5. User Stories

- As a parent/family user, I want the UI to match the paper tracker structure so it feels familiar.
- As a girl, I want to quickly scan completed vs pending achievements on my phone.

## 6. User Flow

1. User opens tracker after login.
2. Frontend loads hierarchy + state from progress API.
3. Sections and items render in expected order.
4. User taps an item checkbox to trigger completion modal flow.
5. On successful write response, UI updates item and parent status.

## 7. Functional Requirements

- FR-001 (MUST): UI must render achievement hierarchy that mirrors physical sheet grouping.
- FR-002 (MUST): UI must show completion state for each child achievement.
- FR-003 (MUST): UI must show top-level/parent completion derived from child states.
- FR-004 (MUST): UI must support mobile-first layout and controls.
- FR-005 (SHOULD): UI should preserve section labels/order exactly from source definitions.
- FR-006 (COULD): UI could include lightweight progress summary counters.

## 8. Non-Functional Requirements

- Performance: initial render should be responsive on common mobile devices.
- Accessibility: semantic checkbox controls, readable labels, usable tap targets.
- Reliability: loading and error states should be explicit and recoverable.

## 9. Data Contract & State

- Inputs from backend:
  - achievement hierarchy
  - completion states
  - derived parent statuses
- Frontend state:
  - loading/error flags
  - section expansion state
  - selected achievement for completion flow

## 10. Edge Cases & Failure Handling

- Empty hierarchy response: show structured empty-state message.
- Partial data failure: show fallback error block with retry action.
- Stale UI after write: refresh affected branch from API response.

## 11. Dependencies

- `FEATURES/backend/v0_progress_api.md` read endpoint contract.
- Physical-sheet-to-digital section mapping.
- Shared design tokens/components.

## 12. Acceptance Criteria

- Given valid tracker data, when page loads, then hierarchy renders in expected order.
- Given completed child items, when page renders, then parent/top-level completion appears correctly.
- Given API loading/error states, then user sees appropriate loading or retry UI.

## 13. Rollout & Validation

- Release with MVP tracker shell.
- Validate via mobile device QA and visual checks against physical sheet model.

## 14. Open Questions

- Should sections default to expanded or collapsed on mobile?
- Is there a required visual indicator for “recently updated” achievements?

## 15. Task Decomposition Hints

- Frontend: tracker page, hierarchy list components, completion state rendering.
- Integration: progress read API client.
- QA: responsive behavior + hierarchy/order regression checks.
