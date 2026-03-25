---
id: configuration
title: Configuration
sidebar_label: Configuration
---

# Configuration

`rilog.init()` accepts an object with two fields: the required `key` and an optional `config`.

```typescript
rilog.init({
  key: 'your-app-key',
  config: { ... }, // optional
});
```

## Full configuration reference

```typescript
rilog.init({
  // Required
  key: 'your-app-key',

  // Optional
  config: {
    // Request filtering
    ignoredRequests: ['https://analytics.example.com', '/api/ping'],

    // Hiding sensitive data
    sensetiveRequsts: ['/api/login'],          // replaces headers AND body with 'sensitive'
    sensetiveDataRequests: ['/api/payments'],  // replaces body only with 'sensitive'

    // Headers and localStorage
    headers: ['x-request-id', 'x-trace-id'],  // which headers to store
    localStorage: ['theme', 'locale'],         // which localStorage keys to store

    // Disable interceptors
    disableFetchInterceptor: false,     // disable fetch interception
    disableClickInterceptor: false,     // disable click interception
    disableConsoleInterceptor: false,   // disable console.warn/error interception

    // Self-hosted server
    selfServer: {
      url: 'https://your-backend.com/rilog',
      headers: { Authorization: 'Bearer token' },
    },

    // Hooks
    onPushEvent: (event) => { console.log('New event:', event); },
    onSaveEvents: (events) => { console.log('Saving events:', events); },
  },
});
```

## Configuration options

### `key` (required)

Type: `string`

The App Key obtained when creating a project in the Rilog dashboard. Links events to a specific project.

---

### `ignoredRequests`

Type: `string[]` | Default: `[]`

A list of URL strings. HTTP requests to these URLs will not be stored.

```typescript
ignoredRequests: ['https://www.google-analytics.com', '/api/health']
```

---

### `sensetiveRequsts`

Type: `string[]` | Default: `[]`

Requests where both **headers and body** are fully replaced with the string `'sensitive'`. Use for endpoints with credentials (e.g. `/api/login`).

---

### `sensetiveDataRequests`

Type: `string[]` | Default: `[]`

Requests where only the **body** is replaced with `'sensitive'` (headers are kept). Suitable for endpoints with payment data or PII.

---

### `headers`

Type: `string[]` | Default: `[]`

An allowlist of request headers to store. By default no headers are stored.

```typescript
headers: ['x-request-id', 'x-correlation-id']
```

---

### `localStorage`

Type: `string[]` | Default: `[]`

An allowlist of `localStorage` keys whose values are attached to events. By default nothing is stored.

```typescript
localStorage: ['user_id', 'locale']
```

---

### `disableFetchInterceptor`

Type: `boolean` | Default: `false`

Disables automatic `fetch` request interception. Axios is intercepted separately — manually via `rilog.interceptRequestAxios()` and `rilog.interceptResponseAxios()`.

---

### `disableClickInterceptor`

Type: `boolean` | Default: `false`

Disables interception of clicks on `<button>` and `<a>` elements.

---

### `disableConsoleInterceptor`

Type: `boolean` | Default: `false`

Disables interception of `console.error()` and `console.warn()` calls. Original output in DevTools is preserved.

---

### `selfServer`

Type: `{ url: string; headers?: Record<string, string> }` | Default: `undefined`

Sends events to your own backend instead of (or alongside) Rilog storage. Your endpoint receives a `POST` request with the body `{ events: string }`, where the value is a JSON array of event objects.

```typescript
selfServer: {
  url: 'https://your-backend.com/rilog-events',
  headers: { 'X-Api-Key': 'secret' },
}
```

---

### `onPushEvent`

Type: `(event: RilogEvent) => void` | Default: `undefined`

Callback fired each time a new event is intercepted. Useful for debugging or custom processing.

---

### `onSaveEvents`

Type: `(events: RilogEvent[]) => void` | Default: `undefined`

Callback fired before a batch of events is sent to storage.

---

## Axios setup

`fetch` requests are intercepted automatically. Axios requires manual wiring via interceptors. Add this code immediately after `rilog.init()`:

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

:::tip
If you have multiple axios instances, add interceptors to each one separately.
:::
