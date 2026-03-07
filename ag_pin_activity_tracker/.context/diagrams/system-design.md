# Adventure Princess Tracker — System Design Diagrams

This document contains Mermaid diagrams for the MVP architecture and key system flows, aligned to `PRD.md`.

---

## 1) High-Level System Architecture (MVP + Extension Points)

```mermaid
flowchart TB
    subgraph Client[Client Layer]
      U[Parent / Girl User\nMobile Browser]
      NX[Next.js App\nDeployed on Vercel]
    end

    subgraph Identity[Identity Layer]
      GA[Google OAuth / SSO]
    end

    subgraph App[Application Layer]
      API[FastAPI Service\nDocker Container]
      JOB[Background Worker\nMonthly Reports / Future Notifications]
    end

    subgraph Data[Data Layer]
      PG[(Managed Postgres\nUsers, Profiles, Hierarchy,\nAchievements, Completion, Media Metadata)]
      OBJ[(Object Storage Bucket\nImage Binaries)]
      AUD[(Audit/Event Log)]
    end

    subgraph Integrations[External Integrations]
      WA[WhatsApp Provider\nPhase 2+]
    end

    U --> NX
    NX --> GA
    NX --> API

    API --> PG
    API --> AUD
    API --> JOB

    API -. signed URL .-> OBJ
    NX -. direct upload via signed URL .-> OBJ

    JOB --> PG
    JOB --> AUD
    JOB -. future .-> WA

    PG -. monthly stats .-> JOB
```

---

## 2) Achievement Completion Flow (Checkbox → Evidence Upload → Persist)

```mermaid
sequenceDiagram
    autonumber
    actor User as Parent/Girl User
    participant UI as Next.js UI (Vercel)
    participant Auth as Google OAuth
    participant API as FastAPI (Docker)
    participant Obj as Object Storage
    participant DB as Managed Postgres

    User->>UI: Open tracker and authenticate
    UI->>Auth: Google SSO sign-in
    Auth-->>UI: ID/Access token

    User->>UI: Tap achievement checkbox
    UI-->>User: Expand section (date + image upload)
    User->>UI: Select/upload evidence image

    UI->>API: Request upload URL (auth token)
    API-->>UI: Pre-signed upload URL
    UI->>Obj: Upload image
    Obj-->>UI: Upload success + file reference

    UI->>API: Mark complete(achievementId, imageRef, completedAt=now)
    API->>DB: Upsert completion state + metadata
    API->>DB: Recompute parent achievement status
    DB-->>API: Persisted

    API-->>UI: Updated achievement + parent status
    UI-->>User: Render completed state
```

---

## 3) Monthly Reporting + Future Notification Flow

```mermaid
flowchart LR
    CRON[Scheduled Trigger\nMonthly] --> JOB[Reporting Job]
    DB[(Managed Postgres)] --> JOB
    JOB --> RPT[Monthly Aggregates\nGroup / Circle / Girl]
    RPT --> API[FastAPI Reporting Endpoint]
    API --> FE[Next.js Report View / Export]

    EVT[Achievement Completed Event] --> NQ[Notification Queue / Worker]
    NQ -. Phase 2+ .-> WA[WhatsApp Provider]
```

---

## Notes

- Group is defaulted to **Adventure Guides** in MVP, but schema is modeled for future multi-group expansion.
- Admin "look on behalf" is intentionally excluded from MVP runtime path and can be introduced as an authorization extension in Phase 2.
- Keep infrastructure managed and minimal for low-maintenance operation.
- Use signed URLs for image upload/download; store only metadata/pointers in Postgres.
