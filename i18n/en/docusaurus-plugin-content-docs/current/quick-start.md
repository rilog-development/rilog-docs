---
id: quick-start
title: Quick Start
sidebar_label: Quick Start
---

# Quick Start

Get Rilog running in your application in under 5 minutes.

## Step 1 — Create an account

Go to [rilog.online](https://www.rilog.online) and register. It's free, no credit card required.

## Step 2 — Create an application

After logging in, click **Create Application** in the dashboard. Give it a name (e.g. `my-frontend-app`).

You'll receive a unique **App Key** — copy it, you'll need it in the next step.

## Step 3 — Install rilog-lib

In your project directory:

```bash
npm install @rilog-development/rilog-lib
# or
yarn add @rilog-development/rilog-lib
```

## Step 4 — Initialise the library

Call `rilog.init()` as early as possible in your application entry point — before any other code runs.

```typescript
// main.ts / index.ts / App.tsx
import rilog from '@rilog-development/rilog-lib';

rilog.init({
  key: 'YOUR_APP_KEY_HERE',
});
```

:::tip Entry point matters
For React: put it in `main.tsx` or `index.tsx`, before `ReactDOM.createRoot`.
For Vue: put it in `main.ts`, before `createApp`.
For Next.js: use `_app.tsx` or a client component with `'use client'`.
:::

## Step 5 — Set up axios (optional)

If your app uses axios, add interceptors manually — `fetch` is intercepted automatically, axios is not.

```typescript
import axios from 'axios';
import rilog from '@rilog-development/rilog-lib';

axios.interceptors.request.use((request) => {
  rilog.interceptRequestAxios(request);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    rilog.interceptResponseAxios(response);
    return response;
  },
  (error) => {
    rilog.interceptResponseAxios(error);
    return Promise.reject(error);
  }
);
```

Place this code immediately after `rilog.init()` in your app entry point.

## Step 6 — Open the dashboard

Go back to [rilog.online](https://www.rilog.online), open your application, and navigate to its **Connection**.

Trigger some actions in your app (click around, make an API call). You should see events flowing into the dashboard within seconds.

---

## Minimal working example

```typescript
import rilog from '@rilog-development/rilog-lib';

// Initialise once at app startup
rilog.init({ key: 'YOUR_APP_KEY' });

// From this point, rilog-lib automatically captures:
// - HTTP requests (fetch and axios)
// - Clicks on <button> and <a> elements
// - console.error() and console.warn() calls

// You can also log custom debug messages manually:
rilog.logData(
  { step: 'profile-setup', userId: '123' },
  { label: 'onboarding' }
);
```

## Next steps

- [Configuration options](/docs/rilog-lib/configuration) — customise what gets captured
- [Full API reference](/docs/rilog-lib/api) — all available methods
- [Event types](/docs/rilog-lib/event-types) — understand what each event contains
