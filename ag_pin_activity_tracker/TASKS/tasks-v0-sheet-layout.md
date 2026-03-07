## Relevant Files

- frontend/app/tracker/page.tsx - Tracker page entry (route-level container)
- frontend/components/tracker/sheet-layout.tsx - Main sheet layout wrapper
- frontend/components/tracker/section-card.tsx - Section-level UI block
- frontend/components/tracker/achievement-row.tsx - Achievement row with status/checkbox trigger
- frontend/lib/api/progress.ts - Progress read API client
- frontend/lib/types/progress.ts - Types for hierarchy/completion payloads
- frontend/lib/mappers/sheet-mapper.ts - Mapping API payload to UI hierarchy model
- frontend/components/tracker/sheet-layout.test.tsx - UI rendering and hierarchy tests
- frontend/lib/mappers/sheet-mapper.test.ts - Mapping logic tests

### Notes

- If your frontend folder uses `src/`, adapt paths accordingly (e.g., `frontend/src/app/...`).
- Keep this feature focused on layout/state rendering only; completion modal logic belongs to `v0_completion_modal`.
- Use your existing frontend test runner (Vitest/Jest + Testing Library).

---

## Instructions for Completing Tasks

IMPORTANT:

Update the checklist as tasks are completed.

Example:

- [ ] 1.1 Implement API client
→
- [x] 1.1 Implement API client

---

## Tasks

- [x] 0.0 Create feature branch
  - [x] 0.1 `git checkout -b feature/frontend-v0-sheet-layout`

- [x] 1.0 Scaffold tracker route and feature shell
  - [x] 1.1 Create tracker route page (`/tracker`) with authenticated page shell
  - [x] 1.2 Add top-level `SheetLayout` component and wire route to it
  - [x] 1.3 Add placeholder loading and empty shell states for initial integration

- [ ] 2.0 Define contracts and API read integration
  - [ ] 2.1 Create TypeScript types for hierarchy, child achievements, and completion state
  - [ ] 2.2 Implement progress read API client for fetching hierarchy + completion payload
  - [ ] 2.3 Add error normalization in API client (network, auth, server errors)
  - [ ] 2.4 Connect route shell to fetch data on load and pass data to layout component

- [ ] 3.0 Implement sheet hierarchy rendering components
  - [ ] 3.1 Build section component to render section title/order from payload
  - [ ] 3.2 Build achievement row component to render name, status, and checkbox affordance
  - [ ] 3.3 Render hierarchy in paper-aligned order from mapped data
  - [ ] 3.4 Add parent/top-level completion visual indicator derived from child state

- [ ] 4.0 Implement runtime states and UX resilience
  - [ ] 4.1 Implement loading state (skeleton/spinner) while fetching tracker data
  - [ ] 4.2 Implement retry-capable error state for failed API reads
  - [ ] 4.3 Implement empty-state UI when hierarchy response has no items
  - [ ] 4.4 Handle stale state refresh hook after external completion updates

- [ ] 5.0 Apply mobile-first and accessibility pass
  - [ ] 5.1 Ensure mobile-first spacing/layout for section cards and row density
  - [ ] 5.2 Ensure checkbox semantics, label association, and keyboard/focus behavior
  - [ ] 5.3 Verify touch target sizes and contrast for key controls/statuses
  - [ ] 5.4 Add responsive breakpoints for tablet/desktop without changing MVP behavior

- [ ] 6.0 Add tests for acceptance criteria
  - [ ] 6.1 Unit test mapping function for order and parent status derivation
  - [ ] 6.2 Component test: hierarchy renders in expected structure/order
  - [ ] 6.3 Component test: completed children show correct parent completion state
  - [ ] 6.4 Component test: loading/error/empty states render as expected

- [ ] 7.0 Final validation and documentation
  - [ ] 7.1 Verify implemented behavior against `FEATURES/frontend/v0_sheet_layout.md` acceptance criteria
  - [ ] 7.2 Confirm no completion-modal business logic leaked into this feature scope
  - [ ] 7.3 Update feature notes/changelog with completed scope and known follow-ups
