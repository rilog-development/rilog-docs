---
id: analytics
title: Analytics
sidebar_label: Analytics
---

# Analytics

The **Analytics** section gives you an aggregated view of what's happening across your application — not just individual events, but trends, error rates, and patterns over time.

## Where to find it

Open an application, then click the **Analytics** icon in the left sidebar (the chart icon). Analytics are computed across all connections for the selected application.

## Metrics

### Success rate

The percentage of HTTP requests that returned a 2xx status code. A healthy app should sit consistently above 99%. Sudden drops indicate a deployment issue or backend problem.

### Error rate

The percentage of requests returning 4xx or 5xx. Broken down by:

- **Client errors (4xx)** — often indicate validation issues or authentication problems on the client side
- **Server errors (5xx)** — indicate backend failures; these should be near zero

### Request volume

Total number of HTTP events captured over time, plotted as a line or bar chart. Use this to understand usage patterns — peak hours, traffic spikes after a release, drop-offs.

### Top failing endpoints

A ranked list of the endpoints that generate the most errors. This is often the most actionable view — if `/api/checkout` has a 12% error rate, that's your first priority.

```
/api/checkout          12.4%  error rate  (47 errors)
/api/users/profile      3.1%  error rate  (12 errors)
/api/products/search    0.8%  error rate   (3 errors)
```

### Error breakdown by type

For JavaScript errors (not HTTP), a breakdown by error type and message. Grouped errors make it clear whether you have 50 instances of the same bug or 50 different bugs.

## Time range

Use the time range selector to scope analytics to the last hour, last 24 hours, last 7 days, or a custom range.

## Using analytics to debug

A common workflow:

1. Open Analytics and notice that `/api/orders` has a high error rate since 14:30.
2. Switch to the Connections view and filter by status `5xx` and method `POST`.
3. Find the failing requests and expand them to see the exact server response.
4. Identify the root cause (e.g. a missing database field after a migration) and deploy a fix.
5. Watch the error rate drop back to zero in real time.
