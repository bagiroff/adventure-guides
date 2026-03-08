# Frontend (Next.js)

This folder now contains a minimal Next.js app scaffold for local development of the tracker UI.

## Prerequisites

- Node.js 20+
- npm 10+

## Install dependencies

```bash
cd /Users/obahirov/ai_sandbox/git/adventure_guides/ag_pin_activity_tracker/frontend
npm install
```

## Run locally

```bash
npm run dev
```

Open: `http://localhost:3000`

- Home: `/`
- Tracker shell: `/tracker`

### Local mock progress data (tracker layout preview)

The tracker service layer supports a mock hierarchy payload so you can preview layout states on localhost without a backend.

- In development, mock progress is enabled by default when `NEXT_PUBLIC_USE_MOCK_PROGRESS` is not set.
- Force enable mock mode:

```bash
NEXT_PUBLIC_USE_MOCK_PROGRESS=true npm run dev
```

- Force real API mode (disable mock):

```bash
NEXT_PUBLIC_USE_MOCK_PROGRESS=false npm run dev
```

## Test

```bash
npm run test
```

## E2E (Playwright)

Install browser binaries once:

```bash
npx playwright install
```

Run E2E tests:

```bash
npm run test:e2e
```

Run E2E with Playwright UI mode:

```bash
npm run test:e2e:ui
```

## Build

```bash
npm run build
```

## Type-check

```bash
npm run typecheck
```

## Verification pipelines

Local pre-PR verification:

```bash
npm run test:verify
```

CI-style full verification (includes E2E):

```bash
npm run test:verify:ci
```