# Feature — Frontend v0 Completion Modal

## 1. Summary

Implement the completion interaction UI shown after checkbox tap: a modal/expanded panel requiring evidence upload and confirming completion date behavior before persisting progress.

## 2. PRD Traceability

- PRD §7 Core Capabilities: #3
- PRD FR-006, FR-007, FR-008, FR-010
- PRD §6 Use Cases: Track an achievement

## 3. Scope

- Open completion modal/panel when user taps achievement checkbox.
- Require image evidence selection/upload before allowing completion submit.
- Show completion date (auto-set at submit).
- Submit completion payload to backend and update UI from response.
- Support revert/uncheck affordance (if enabled by API contract).

## 4. Non-Scope

- Backend upload/storage implementation details.
- Advanced media editing/compression UX.
- Multi-file evidence uploads for MVP.

## 5. User Stories

- As a user, I want a guided completion prompt so I know what is required to mark an achievement done.
- As a user, I want to upload image proof quickly from mobile so completion is valid.
- As a user, I want immediate feedback after submit so I trust my update was saved.

## 6. User Flow

1. User taps checkbox for incomplete achievement.
2. Modal/panel opens with evidence upload control.
3. User selects image and waits for upload success indicator.
4. User confirms completion.
5. Frontend sends complete action + evidenceRef to progress API.
6. UI closes modal and updates item/parent completion states from response.

## 7. Functional Requirements

- FR-001 (MUST): Checkbox tap must open completion modal/panel for incomplete items.
- FR-002 (MUST): Modal must require image evidence before enabling “Mark Complete”.
- FR-003 (MUST): Modal must show completion date semantics (auto-set on submit).
- FR-004 (MUST): Submit action must call progress API with achievementId + evidenceRef.
- FR-005 (MUST): Success response must update local UI completion state immediately.
- FR-006 (SHOULD): Modal should support retry for failed uploads without losing context.
- FR-007 (SHOULD): If revert is supported, UI should provide uncheck/revert action with confirmation.

## 8. Non-Functional Requirements

- Performance: modal open should feel instant; upload progress should be visible.
- Accessibility: focus handling, keyboard/screen-reader labels, clear error text.
- Reliability: recoverable failures for upload/API submit.

## 9. Data Contract & State

- Inputs:
  - achievement identifier from sheet item
  - selected image file metadata
- Client state:
  - modal open/close
  - upload status (`idle|uploading|uploaded|failed`)
  - submit status (`idle|submitting|success|error`)
- Output payload to API:
  - `{ achievementId, action: "complete", evidenceRef }`

## 10. Edge Cases & Failure Handling

- User closes modal before submit: no completion change is sent.
- Upload fails: show inline error + retry option.
- API complete call fails after upload success: keep modal state and allow resubmit.
- Duplicate submit tap: prevent double-submit while request in flight.

## 11. Dependencies

- `FEATURES/backend/v0_progress_api.md` write endpoint.
- Upload URL/file upload contract from backend/storage layer.
- `FEATURES/frontend/v0_sheet_layout.md` checkbox interaction handoff.

## 12. Acceptance Criteria

- Given an incomplete achievement, when checkbox is tapped, then completion modal opens.
- Given no evidence selected, when user attempts submit, then submit is blocked with validation feedback.
- Given successful evidence upload and submit, then achievement appears completed and parent status recalculates in UI.
- Given upload or submit failure, then user receives actionable error and can retry.

## 13. Rollout & Validation

- Release alongside v0 sheet layout as part of MVP tracker UX.
- Validate with mobile scenario tests: camera/gallery upload, error retries, state sync after submit.

## 14. Open Questions

- Should completion modal be full-screen on small devices or bottom sheet style?
- Should users be allowed to preview image before final submit?

## 15. Task Decomposition Hints

- Frontend: modal component, upload widget integration, submit orchestration.
- Integration: API client for complete/revert actions.
- QA: upload failures, duplicate submits, state synchronization.
