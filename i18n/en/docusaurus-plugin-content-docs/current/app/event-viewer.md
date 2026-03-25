---
id: event-viewer
title: Event Viewer
sidebar_label: Event Viewer
---

# Event Viewer

The Event Viewer is where you inspect individual events in detail. Click the **expand** icon (or the row itself) on any event in the connection table to open the detail panel.

## Event table columns

| Column | Description |
|---|---|
| **Status** | HTTP status code badge (green for 2xx, red for 4xx/5xx) |
| **Method** | HTTP method (GET, POST, etc.) |
| **Request** | Endpoint path |
| **Request Time** | When the request was made |
| **Headers** | Preview of request headers |
| **Request Data** | Preview of request body |
| **Response Time** | When the response was received |
| **Response Data** | Preview of response body |
| **Actions** | Copy, Share, etc. |

## Expanded event detail

Clicking on a row expands it in-place to show full detail:

### Headers tab

Displays all request and response headers as formatted JSON. You can copy the entire header block with the copy icon.

```json
{
  "Authorization": "Bearer eyJhbGc...",
  "Content-Type": "application/json",
  "X-Request-Id": "req_7f3a9b"
}
```

### Request Data tab

Shows the parsed request body. For JSON payloads this is formatted and syntax-highlighted. For FormData, fields are shown as key-value pairs.

### Response Data tab

Shows the parsed response body from the server. Errors here (e.g. `{ "error": "Unauthorized" }`) are exactly what your backend returned, giving you full visibility.

### Error events

For JavaScript errors, the expanded view shows:

- **Error message**
- **Full stack trace** with clickable file references
- **File / line / column** where the error originated

## Copying event data

Use the **Copy** button next to any section header to copy that section as JSON to your clipboard. This makes it easy to paste into a GitHub issue or Slack message.

## Navigating events

Use the **←** and **→** arrow icons inside the expanded view (or keyboard arrow keys) to move to the previous or next event without closing the panel.
