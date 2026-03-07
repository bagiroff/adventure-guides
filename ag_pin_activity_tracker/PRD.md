# PRD — Adventure Princess Activity Tracker (Mobile-Friendly Web App)

## 1. Overview

Adventure Princess Activity Tracker is a mobile-first web application that digitizes the current physical tracking sheet used by Adventure Princess families. The MVP focuses on making achievement tracking easy on phones, with Google SSO login, a UI that mirrors the paper sheet structure, and evidence capture (photo upload + auto date) when achievements are checked.

The product will allow girls/families to track progress reliably, preserve evidence in a durable system, and enable future reporting and admin workflows with minimal maintenance burden.

---

## 2. Problem Statement

The current physical sheet is hard to keep updated, difficult to share, and vulnerable to loss/inconsistency. Families and leaders cannot easily track ongoing progress across girls, circles, and groups, and there is no structured digital history for accountability or reporting.

Current process limitations:

- paper tracking is easy to forget or lose
- no centralized visibility across circle/group levels
- manual reporting is time-consuming
- no reliable evidence trail for completed achievements

---

## 3. Goals

- Provide a simple, mobile-friendly digital tracker that replicates the familiar sheet behavior.
- Allow girls/families to mark achievements and attach evidence quickly.
- Persist achievement state + metadata safely in a database.
- Minimize long-term operational overhead (“create and forget” maintenance model).
- Establish a strong foundation for notifications, delegation/admin, and reporting.

---

## 4. Non-Goals

MVP will **not** include:

- WhatsApp notifications (planned next iteration)
- full multi-role admin management workflow
- broad multi-organization federation logic beyond initial group/circle model
- complex gamification engine
- native mobile apps (web app only)

---

## 5. Target Users & Personas

### Primary Personas

1. **Parent/Family Tracker User**
   - Logs in and updates a girl’s achievement progress.
   - Needs fast mobile input and photo upload.

2. **Girl (with family support)**
   - Wants to see progress and complete activities.

### Secondary Personas

3. **Circle/Group Leader (future admin flow)**
   - Needs visibility into progress and reporting.

### Organizational Context

- Girl belongs to a **Circle**.
- Circle belongs to a **Group**.
- MVP includes a default hardcoded/disabled group option: **Adventure Guides**.
- Registration captures Circle name; future versions may support multiple groups/federation models.

---

## 6. Use Cases / User Journeys

1. **Register/Login and onboarding**
   - User signs in with Google.
   - User sets/chooses girl profile and enters Circle name.
   - Group defaults to “Adventure Guides” (non-editable in MVP).

2. **Track an achievement**
   - User opens tracker page mirroring paper layout.
   - User taps checkbox for an achievement.
   - Expand section appears; user uploads image evidence.
   - Completion date auto-sets (editable only if business rules later allow).
   - Achievement persists as completed.

3. **See top-level completion status**
   - If all child achievements in a parent section are complete, parent section is marked complete.

4. **View progress**
   - User sees current completion state and previously uploaded evidence metadata.

---

## 7. Core Capabilities (MVP)

1. Google SSO authentication.
2. Mobile-first tracker UI that structurally matches physical sheet layout.
3. Achievement completion with evidence upload and date capture.
4. Persistent storage of users, hierarchy context (group/circle/girl), achievements, and evidence metadata.
5. Derived top-level achievement completion when all child items are complete.

---

## 8. Functional Requirements

- **FR-001 (MUST):** The system must support authentication via Google SSO.
- **FR-002 (MUST):** The system must allow a user to create/associate a girl profile during onboarding.
- **FR-003 (MUST):** The system must require circle name capture during registration/onboarding.
- **FR-004 (MUST):** The system must assign group as “Adventure Guides” by default in MVP.
- **FR-005 (MUST):** The main tracker UI must represent the same achievement structure as the physical sheet design.
- **FR-006 (MUST):** Tapping an achievement checkbox must open an expanded evidence input area.
- **FR-007 (MUST):** Evidence image upload must be required for completion in MVP.
- **FR-008 (MUST):** Completion date must auto-populate when achievement is marked complete.
- **FR-009 (MUST):** The system must persist achievement state and associated metadata in durable storage.
- **FR-010 (MUST):** The system must display previously saved achievement state and evidence metadata on reload.
- **FR-011 (MUST):** Parent/top-level achievement must automatically show completed when all child achievements are completed.
- **FR-012 (SHOULD):** Users should be able to uncheck/revert an achievement and remove or replace evidence.
- **FR-013 (SHOULD):** The system should keep an audit trail of completion changes for future admin/reporting.
- **FR-014 (COULD):** The system could support multiple girls under one parent account in later releases.

---

## 9. Non-Functional Requirements

### Performance
- Page interactions (check/uncheck, expand) should feel immediate (<200ms perceived UI response).
- Standard page load should target <2.5s on modern mobile networks.

### Reliability
- Persisted achievement updates should be atomic and resilient to refresh/network retry.
- Uploaded media must not be lost once completion is confirmed.

### Security & Privacy
- Authenticated access required for all non-public data.
- Evidence photos stored securely with scoped access controls.
- Least-privilege access model for data operations.

### Maintainability
- Prefer managed platform components and minimal ops complexity.
- Keep architecture simple, well-documented, and dependency-light.

### Accessibility
- Mobile UI should follow basic accessibility practices (tap targets, contrast, semantic controls).

---

## 10. Data & Reporting Requirements

### Core data entities
- User
- Girl profile
- Group
- Circle
- Achievement definition
- Achievement completion record
- Evidence metadata (file URL/path, createdAt, size/type)

### MVP reporting baseline
- Per-girl completion percentage
- Per-circle completion statistics
- Monthly summary report per group/circle/girl (initial simple export/view)

### Future reporting expansion
- Trend lines over time
- activity-level completion analytics
- leader/admin dashboards

---

## 11. System Concept (High-Level)

`User (Mobile Browser) → Next.js (Vercel) → FastAPI (Docker) → Managed Postgres + Object Storage`

Conceptual boundaries:
- UI handles presentation and user input.
- Backend/API enforces business rules and data access.
- Database (managed Postgres) stores structured state + media metadata.
- Object storage bucket stores evidence image binaries.
- Google OAuth handles identity provider authentication.

---

## 12. Success Metrics

### MVP success indicators (first 60–90 days)
- ≥80% of active users complete onboarding without support.
- ≥70% of achievement updates include successful evidence upload on first attempt.
- <1% failed persistence operations for completion events.
- Monthly reporting available for group/circle/girl with no manual spreadsheet consolidation.

### Product value indicators
- Increase in tracked completion consistency versus paper baseline.
- Positive usability feedback from families/leaders (qualitative).

---

## 13. Release Scope & Milestones

### Phase 0 — Discovery/Definition
- Confirm final field mapping from physical sheet.
- Finalize hierarchy rules: group/circle/girl.

### Phase 1 — MVP
- Google SSO
- mobile-first sheet-like UI
- checkbox → expand → image upload + auto date
- persisted state in DB/storage
- derived top-level completion
- basic monthly reporting by group/circle/girl

### Phase 2 — Iteration
- WhatsApp notification for achievement completion
- admin “look on behalf” and edit achievements
- role/permission model hardening

### Phase 3 — Extension
- richer notifications and summaries
- federation/multi-group support beyond Adventure Guides
- additional “nice-to-have” enhancements based on usage

---

## 14. Risks & Mitigations

1. **Risk:** Visual mismatch from physical design creates adoption friction.  
   **Mitigation:** Validate UI against design image and prioritize structural familiarity.

2. **Risk:** Image upload failures on mobile networks.  
   **Mitigation:** Add upload progress, retry behavior, and pre-submit validation.

3. **Risk:** Scope growth (admin/notifications/federation) slows MVP.  
   **Mitigation:** Strict MVP boundary and staged rollout.

4. **Risk:** Data model limits future scaling to multi-group/federation.  
   **Mitigation:** Include group/circle in initial schema, even if group is fixed in MVP.

---

## 15. Dependencies

- Google OAuth configuration and approved redirect domains
- Vercel project configuration for Next.js deployment
- Container runtime/platform for FastAPI Docker deployment
- Managed Postgres provisioning + backups
- Object storage bucket + signed upload/download strategy
- Final interpretation of physical sheet sections/fields
- Future WhatsApp provider integration decision (for next iteration)

---

## 16. Future Extensions (Post-MVP)

- WhatsApp notifications on achievement completion (initial trigger)
- Admin workflows for leader/parent delegated updates
- Multi-group/federation support with editable group assignment
- Multi-girl account management and family dashboard
- Enhanced monthly and trend reporting
- Additional “nice-to-have” features based on real usage data

---

## 17. Open Questions

1. Should parent accounts support multiple girls in MVP or Phase 2?
2. Can/should users edit auto-set completion dates after save?
3. What retention policy applies to evidence photos?
4. What format is preferred for monthly reports (in-app table, CSV export, PDF)?
5. What exact permission boundaries are required for future admin roles?

---

## 18. Appendix (Assumptions / Glossary)

### Related Architecture Records
- Deployment Decision Record (ADR): `docs/adr/0001-deployment-decision-record.md`

### Assumptions
- “Replicate physical design” = preserve structure/labels/flow, optimized for mobile usability.
- Evidence image is required to mark completion in MVP.
- Group defaults to Adventure Guides but schema should support additional groups later.
- Solution should prioritize low-maintenance managed services and engineering best practices.

### Chosen v0 Stack
- **UI:** Next.js deployed on Vercel.
- **Backend:** FastAPI deployed as Docker container.
- **Database:** Managed Postgres.
- **Images:** Object storage bucket (binary files), while only file metadata is stored in Postgres.

### Glossary
- **Group:** Top-level organization unit (e.g., Adventure Guides).
- **Circle:** Sub-group under a Group.
- **Girl:** Participant profile whose achievements are tracked.
- **Achievement:** Trackable task/item from the physical sheet.
- **Top-level Achievement:** Parent achievement that is complete when all child achievements are complete.
