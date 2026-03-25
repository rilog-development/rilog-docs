---
id: event-types
title: Event Types
sidebar_label: Event Types
---

# Event Types

Rilog intercepts and stores five categories of events. Four are captured automatically, one is sent manually.

| Type | Trigger | Automatic |
|---|---|---|
| `REQUEST` | HTTP requests via `fetch` or axios | Yes |
| `CLICK` | Clicks on `<button>` and `<a>` elements | Yes |
| `CONSOLE_ERROR` | `console.error()` calls | Yes |
| `CONSOLE_WARN` | `console.warn()` calls | Yes |
| `DEBUG_MESSAGE` | Manual call via `rilog.logData()` | No |

---

## REQUEST (HTTP request)

Captured automatically for every `fetch` request. For axios, manual wiring is required via `rilog.interceptRequestAxios()` and `rilog.interceptResponseAxios()`.

| Field | Description |
|---|---|
| `method` | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.) |
| `url` | Full request URL |
| `requestHeaders` | Request headers (only those listed in `config.headers`) |
| `requestBody` | Request body |
| `status` | HTTP response status code |
| `responseBody` | Response body |

```json
{
  "type": "REQUEST",
  "method": "POST",
  "url": "https://api.myapp.com/users",
  "requestBody": { "email": "user@example.com" },
  "status": 201,
  "responseBody": { "id": "usr_123" }
}
```

---

## CLICK

Captured automatically on every click on a `<button>` or `<a>` element.

```json
{
  "type": "CLICK",
  "target": "button",
  "text": "Submit"
}
```

To disable: `config.disableClickInterceptor: true`

---

## CONSOLE_ERROR

Captured on every `console.error()` call. Original output in DevTools **is preserved**.

```json
{
  "type": "CONSOLE_ERROR",
  "args": ["Something went wrong", { "code": 500 }]
}
```

---

## CONSOLE_WARN

Captured on every `console.warn()` call. Original output in DevTools **is preserved**.

```json
{
  "type": "CONSOLE_WARN",
  "args": ["Deprecated API used"]
}
```

To disable both console interceptors: `config.disableConsoleInterceptor: true`

---

## DEBUG_MESSAGE (custom event)

Sent manually via `rilog.logData()`. Used to log arbitrary data at specific points in your code. Automatically captures a stack trace from the call site (source maps improve readability).

```typescript
rilog.logData({ userId: 'usr_456', step: 'checkout' }, { label: 'purchase-flow' });
```

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `any` | Yes | Any value; objects are serialised automatically |
| `label` | `string` | Yes | Label for filtering events in the dashboard |

```json
{
  "type": "DEBUG_MESSAGE",
  "label": "purchase-flow",
  "data": { "userId": "usr_456", "step": "checkout" }
}
```
