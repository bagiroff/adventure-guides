# ADR 0001 — Deployment Decision Record (Adventure Princess Pin Tracker)

## Status

Accepted — initial platform choice for MVP and early growth.

## Date

2026-03-06

## Context / Objective

We need a production-ready deployment approach for:

- Next.js frontend
- FastAPI backend
- PostgreSQL database
- Object storage for achievement photos

The solution must be simple for MVP while preserving a clean upgrade path for:

- mobile app clients
- WhatsApp/chatbot integration
- admin portal
- multiple environments (dev/staging/prod)

## Decisions

### 1) Frontend hosting

**Decision:** Deploy Next.js on **Vercel**.

**Why:** First-class Next.js support, Git-based preview deployments, and low operational overhead for rapid iteration.

### 2) Backend hosting

**Decision:** Package FastAPI as a **Docker container** and run on a managed container runtime.

**Why:** Repeatable builds, strong local/prod parity, and provider flexibility without immediate Kubernetes complexity.

### 3) Database

**Decision:** Use managed PostgreSQL, with **Neon** as the initial default.

**Why:** Standard Postgres compatibility, good developer workflow, and managed operations suitable for MVP.

### 4) Achievement pictures

**Decision:** Store image binaries in **S3-compatible object storage** (AWS S3 default), while storing only metadata in Postgres.

**Why:** Better scalability/cost profile than DB blobs, cleaner separation of concerns, and support for secure presigned access patterns.

---

## Recommended Vendor Defaults (MVP)

- Frontend: **Vercel**
- Backend: **Dockerized FastAPI** on managed container runtime
- Database: **Neon Postgres**
- Object storage: **AWS S3** (private bucket)

> Note: backend runtime provider remains intentionally flexible for now.

---

## Architecture Shape

- `app.adventurepins.org` → Next.js (Vercel)
- `api.adventurepins.org` → FastAPI (container)
- Managed Postgres for relational data
- S3 bucket for image bytes

This preserves clean API/UI boundaries and enables future multi-client architecture (web + mobile + chatbot).

---

## Environment Strategy

### Local

- Next.js local (`localhost:3000`)
- FastAPI local (`localhost:8000`)
- Postgres local (Docker)
- Local file storage adapter (`./data/uploads` or `/tmp/uploads`)

### Dev

- Vercel preview/dev
- Shared backend container
- Neon dev branch/project
- S3 dev bucket (or local-compatible adapter)

### Staging

- Staging frontend + backend + Neon + S3
- Real OAuth and end-to-end validation

### Production

- Vercel prod
- Backend managed runtime
- Neon prod
- S3 prod bucket

---

## File Storage Design

### Postgres stores metadata only

- id
- owner_user_id
- progress_record_id
- storage_key
- original_filename
- content_type
- size_bytes
- created_at

### S3 stores bytes

- original uploads
- optional thumbnails/resized variants (later)

### Access model

- **Phase 1:** backend-mediated upload to S3 + metadata write
- **Phase 2:** presigned URLs for direct browser upload/download

---

## Database / Migrations Standard

- Managed Postgres (Neon default)
- SQLAlchemy 2.x + Alembic migrations
- Deterministic schema promotion across environments

---

## Security Baseline

- Google sign-in for identity
- Backend verifies identity and maps to local user/profile
- Private object storage by default
- No permanent public URLs for child photos
- Signed URLs time-limited when enabled

---

## CI/CD Baseline

### Frontend

- Git push → Vercel preview deployment
- Merge to main → production deployment

### Backend

- CI runs tests
- Build/push Docker image
- Deploy image to managed runtime

---

## Phased Rollout

1. **Phase 0:** repo/env setup, local backend+db, frontend skeleton, health endpoint
2. **Phase 1 (MVP):** Google auth, profile creation, tracker UI, completion flow, image upload, persistence, monthly reporting baseline
3. **Phase 2:** presigned uploads optimization, staging/prod domains hardening
4. **Phase 3:** admin/dashboard evolution, notifications, extended integrations

### MVP Alignment Note

Per current `PRD.md`, evidence upload is an MVP requirement. Therefore, completion + upload are treated as part of Phase 1 (MVP), not deferred.

---

## Explicit Non-Decisions (Deferred)

- exact backend hosting provider
- CDN in front of object storage
- background jobs platform
- image resizing pipeline
- mobile app framework
- WhatsApp provider

---

## Consequences

### Positive

- Fast MVP delivery with managed services
- Strong separation between UI, API, data, and object storage
- Good path to future clients/integrations

### Trade-offs

- More components than single-platform monolith
- Need to manage cross-service env/config discipline
- Presigned flow introduces extra integration steps (worth it for scale/security)
