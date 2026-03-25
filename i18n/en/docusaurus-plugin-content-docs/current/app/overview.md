---
id: overview
title: Rilog App Overview
sidebar_label: Overview
---

# Rilog App

The **Rilog App** at [rilog.online](https://www.rilog.online) is the dashboard where all your logged events land. It's a web application — no installation required, just a browser.

## What you can do in the app

- **Create and manage applications** — logical containers for your projects, each with their own connection key.
- **Browse connections** — each running instance of your app that has rilog-lib installed appears as a connection.
- **View events in real time** — see HTTP requests, errors, page views, and custom events as they happen.
- **Filter events** — by status code, HTTP method, event type, time range, and more.
- **Inspect event details** — expand any event to see full request/response headers and bodies in a formatted code view.
- **View analytics** — error rates, request success rates, most-failing endpoints, traffic over time.
- **Share events** — generate a public link to any event snapshot for bug reports or team discussion.
- **Leave comments** — annotate events with notes for your team.

## Navigation

The app is structured around three levels:

```
Account
  └── Applications (your projects)
        └── Connections (running instances)
              └── Events (individual log entries)
```

Use the left sidebar to navigate between sections. The top breadcrumb shows your current position.
