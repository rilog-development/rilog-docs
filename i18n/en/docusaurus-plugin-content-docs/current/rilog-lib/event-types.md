---
id: event-types
title: Event Types
sidebar_label: Event Types
---

# Event Types

Rilog captures several categories of events. Each event is stored with its type, timestamp, and a type-specific payload.

## HTTP Request

Captured automatically for every `fetch()` and `XMLHttpRequest` call made by your app.

| Field | Description |
|---|---|
| `method` | HTTP method (`GET`, `POST`, `PUT`, `DELETE`, etc.) |
| `url` | Full request URL |
| `requestHeaders` | Request headers as key-value pairs |
| `requestBody` | Parsed request body (JSON, FormData, text) |
| `status` | HTTP response status code |
| `responseHeaders` | Response headers |
| `responseBody` | Parsed response body |
| `duration` | Request duration in milliseconds |
| `timestamp` | ISO timestamp when the request was initiated |

```json
{
  "type": "http",
  "method": "POST",
  "url": "https://api.myapp.com/users/login",
  "requestHeaders": { "Content-Type": "application/json" },
  "requestBody": { "email": "user@example.com" },
  "status": 200,
  "responseBody": { "userId": "usr_123", "token": "[REDACTED]" },
  "duration": 142
}
```

## JavaScript Error

Captured automatically for all unhandled errors and unhandled promise rejections.

| Field | Description |
|---|---|
| `message` | Error message string |
| `stackTrace` | Full stack trace |
| `filename` | Source file where the error occurred |
| `line` | Line number |
| `column` | Column number |
| `type` | Error constructor name (`TypeError`, `RangeError`, etc.) |

```json
{
  "type": "error",
  "level": "error",
  "message": "Cannot read properties of undefined (reading 'map')",
  "stackTrace": "at ProductList (ProductList.tsx:42:18)\n  at render...",
  "filename": "http://localhost:3000/src/components/ProductList.tsx",
  "line": 42,
  "column": 18
}
```

## Page View

Captured automatically when your SPA navigates to a new route.

| Field | Description |
|---|---|
| `url` | New URL after navigation |
| `previousUrl` | URL before navigation |
| `title` | Document title at time of navigation |
| `referrer` | Referring URL (for first load) |

```json
{
  "type": "pageview",
  "url": "/products/shoes",
  "previousUrl": "/products",
  "title": "Shoes — MyShop"
}
```

## Custom Event

Sent manually via `Rilog.logEvent()`. Fully flexible — you define the shape.

| Field | Description |
|---|---|
| `type` | Always `'custom'` (or your own string) |
| `message` | Human-readable description |
| `level` | `'info'`, `'warn'`, or `'error'` |
| `data` | Your arbitrary payload |

```json
{
  "type": "custom",
  "level": "info",
  "message": "User completed onboarding",
  "data": {
    "step": "profile-setup",
    "userId": "usr_456",
    "duration_seconds": 47
  }
}
```

## Console Log (optional)

When enabled, captures `console.warn` and `console.error` calls with their arguments.

| Field | Description |
|---|---|
| `level` | `'warn'` or `'error'` |
| `args` | Array of serialised arguments passed to console |

## Event metadata

Every event — regardless of type — also includes these common fields:

| Field | Description |
|---|---|
| `id` | Unique event ID (UUID) |
| `connectionKey` | App Key that sent the event |
| `timestamp` | ISO 8601 timestamp |
| `environment` | Environment label (if configured) |
| `userAgent` | Browser user agent string |
| `user` | Current user context (if set via `Rilog.setUser()`) |
| `sessionId` | Anonymous session identifier (resets on page reload) |
