# Feature — Backend v0 Auth API

## 1. Summary

Provide backend authentication/session APIs for Google SSO, first-login detection, and onboarding persistence of group/circle/girl context.

## 2. PRD Traceability

- PRD §7 Core Capabilities: #1, #4
- PRD FR-001, FR-002, FR-003, FR-004, FR-009
- PRD §6 User Journeys: Register/Login and onboarding

## 3. Scope

- Verify Google auth token and establish app session.
- Expose authenticated profile bootstrap endpoint.
- Detect onboarding state.
- Persist onboarding data (girl profile + circle + default group).
- Return normalized auth/profile payload to frontend.

## 4. Non-Scope

- Multi-auth providers.
- Admin role management.
- Multi-girl-per-account support.

## 5. User Stories

- As a user, I want secure Google sign-in so only authorized users access tracker data.
- As a user, I want onboarding state remembered so I don’t repeatedly fill setup forms.

## 6. User Flow

1. Frontend gets Google token.
2. Frontend calls backend auth exchange endpoint.
3. Backend validates token and upserts user identity.
4. Backend returns app session + onboarding status.
5. On onboarding submit, backend validates and persists circle/girl/group context.

## 7. Functional Requirements

- FR-001 (MUST): API must validate Google identity token server-side before issuing session.
- FR-002 (MUST): API must create or reuse user account based on stable Google identity.
- FR-003 (MUST): API must expose onboarding status flag.
- FR-004 (MUST): Onboarding write endpoint must require circle name.
- FR-005 (MUST): Onboarding write endpoint must set group = `Adventure Guides` for MVP.
- FR-006 (MUST): API must persist exactly one active girl profile per account in MVP.
- FR-007 (SHOULD): API should be idempotent for repeated onboarding submissions.
- FR-008 (SHOULD): API should emit audit events for sign-in and onboarding completion.

## 8. Non-Functional Requirements

- Security: authenticated endpoints require valid session; least-privilege data access.
- Reliability: token validation and persistence operations are atomic and retriable.
- Performance: auth exchange + bootstrap response should be low-latency for mobile.
- Maintainability: keep endpoints minimal and clearly versioned.

## 9. Data Contract & State

- Inputs:
  - Google ID token
  - Onboarding payload `{ girlName, circleName, optionalProfileFields }`
- Persisted fields:
  - user: providerId, email, displayName, lastLoginAt
  - participant profile: girlName, circleName, groupName (`Adventure Guides`)
  - flags: onboardingCompleted
- Outputs:
  - session metadata
  - profile bootstrap payload

## 10. Edge Cases & Failure Handling

- Invalid/expired Google token → 401 + structured error.
- Missing circle name → 400 validation error.
- Concurrent onboarding submits → deduplicated write/idempotent outcome.
- Session expired → 401 + client re-auth instruction.

## 11. Dependencies

- Google OAuth client configuration.
- Session mechanism (cookie or token strategy).
- Persistent store for user/profile records.

## 12. Acceptance Criteria

- Given a valid Google token, when auth exchange is called, then API returns valid session and onboarding status.
- Given first-time user, when bootstrap endpoint is called, then onboardingCompleted=false is returned.
- Given onboarding payload without circleName, then API rejects request with validation error.
- Given valid onboarding payload, then persisted profile includes group=`Adventure Guides` and onboardingCompleted=true.

## 13. Rollout & Validation

- Release in MVP behind single API version.
- Validate via metrics: auth success rate, onboarding completion rate, validation failures, auth latency.

## 14. Open Questions

- Should circle name be normalized (trim/case) during write?
- Should users be allowed to edit circle in v0 after onboarding?

## 15. Task Decomposition Hints

- Backend API routes/controllers: auth exchange, profile bootstrap, onboarding submit.
- Service layer: token verification, onboarding business rules.
- Data layer: user/profile schema + migrations.
- Tests: auth validation, onboarding validation, idempotency.
