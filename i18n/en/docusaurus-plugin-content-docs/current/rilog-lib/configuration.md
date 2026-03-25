---
id: configuration
title: Configuration
sidebar_label: Configuration
---

# Configuration

`Rilog.init()` accepts a configuration object. The only required field is `appKey`.

## Full configuration reference

```typescript
Rilog.init({
  // Required
  appKey: 'rl_live_xxxxxxxxxxxx',

  // Optional — control what gets captured
  captureHttp: true,         // log all HTTP requests (default: true)
  captureErrors: true,       // log unhandled JS errors (default: true)
  capturePageViews: true,    // log route/page changes (default: true)

  // Optional — filter requests
  ignoreUrls: [
    'https://analytics.example.com',
    /\/health/,              // regex also supported
  ],

  // Optional — strip sensitive data from request bodies
  sanitizeBody: true,        // default: false

  // Optional — environment tag (shown in dashboard)
  environment: 'production', // 'development' | 'staging' | 'production'

  // Optional — disable in development
  enabled: process.env.NODE_ENV === 'production',

  // Optional — custom user context attached to all events
  user: {
    id: 'usr_123',
    email: 'user@example.com',
  },
});
```

## Configuration options

### `appKey` (required)

Type: `string`

Your unique application key from the Rilog dashboard. This identifies which application events belong to.

### `captureHttp`

Type: `boolean` | Default: `true`

When `true`, rilog-lib wraps the global `fetch` and `XMLHttpRequest` to log every HTTP request and response, including status code, headers, timing, and body.

### `captureErrors`

Type: `boolean` | Default: `true`

When `true`, hooks into `window.onerror` and `window.onunhandledrejection` to capture JavaScript errors with their stack traces.

### `capturePageViews`

Type: `boolean` | Default: `true`

When `true`, listens to the History API (`pushState`, `replaceState`) and `popstate` to log navigation events in single-page applications.

### `ignoreUrls`

Type: `(string | RegExp)[]` | Default: `[]`

A list of URL strings or regular expressions. HTTP requests whose URL matches any entry in this list will not be logged. Useful for filtering out noise from analytics beacons, health checks, or third-party services you don't care about.

```typescript
ignoreUrls: [
  'https://www.google-analytics.com',
  /\/api\/ping/,
  'intercom.io',
]
```

### `sanitizeBody`

Type: `boolean` | Default: `false`

When `true`, rilog-lib redacts common sensitive field names (`password`, `token`, `secret`, `authorization`, `credit_card`, `cvv`) from request and response bodies before sending them to Rilog. Enable this for any endpoint that might carry credentials.

### `environment`

Type: `string` | Default: `undefined`

A string label attached to every event (e.g. `'production'`, `'staging'`). Visible in the dashboard, useful for filtering events by environment when multiple connections share an app.

### `enabled`

Type: `boolean` | Default: `true`

When `false`, the library does nothing — no event capture, no network calls. Use this to disable logging in development without removing the `init` call.

```typescript
Rilog.init({
  appKey: 'YOUR_KEY',
  enabled: process.env.NODE_ENV !== 'development',
});
```

### `user`

Type: `{ id?: string; email?: string; name?: string; [key: string]: unknown }` | Default: `undefined`

Optional user context attached to every event. Useful for correlating events with specific users. You can update this at any time after init (e.g. after the user logs in).

```typescript
// After user logs in
Rilog.setUser({ id: 'usr_456', email: 'alice@example.com' });
```

## Updating config after init

Some properties can be updated at runtime:

```typescript
// Update user context (e.g. after login)
Rilog.setUser({ id: 'usr_789', email: 'bob@example.com' });

// Clear user context (e.g. after logout)
Rilog.clearUser();

// Temporarily disable logging
Rilog.disable();

// Re-enable
Rilog.enable();
```
