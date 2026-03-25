---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /intro
---

# What is Rilog?

**Rilog** is a lightweight observability platform for web applications. It consists of two parts that work together:

- **rilog-lib** — a JavaScript/TypeScript library you install in your app
- **Rilog App** — a web dashboard at [rilog.online](https://www.rilog.online) where you view all captured data

Once connected, Rilog automatically captures HTTP requests and responses, JavaScript errors, page views, and user interactions. You see everything in real time in the dashboard without writing any custom backend infrastructure.

## Why Rilog?

Traditional monitoring tools are either too complex (requiring agents, infrastructure configuration, or devops expertise) or too basic (only catching unhandled exceptions). Rilog sits in the middle: easy to set up, but powerful enough to give you real answers when something goes wrong in production.

**The main pain point it solves:** you deploy an update, a user reports a bug, and you have no idea what API call failed or what the server actually returned. With Rilog, you open the dashboard, filter by time or status code, and see the exact request — headers, body, response — in seconds.

## Core concepts

### Connection
A **connection** represents one instance of your application connected to Rilog. Each connection has a unique key (your `appKey`). You can have multiple connections per project — for example, one for staging and one for production.

### Event
An **event** is any logged unit of data. Events have a type (HTTP request, error, page view, etc.), a timestamp, and associated payload (headers, body, stack trace, etc.).

### Application
An **application** in the Rilog App is a logical grouping of connections. You create an application in the dashboard, get an API key, and use that key in `rilog-lib`.

## Architecture overview

```
Your web app
  └── rilog-lib (installed as npm package)
        ├── Intercepts fetch / XMLHttpRequest
        ├── Catches JS errors (window.onerror)
        ├── Tracks page views (History API)
        └── Sends events → Rilog backend API

Rilog backend
  └── Stores events, builds analytics

Rilog App (rilog.online)
  └── Displays events, filters, analytics, sharing
```

## What's next?

- [Quick Start](/docs/quick-start) — get up and running in 5 minutes
- [rilog-lib overview](/docs/rilog-lib/overview) — understand what the library does
- [Rilog App guide](/docs/app/overview) — learn how to use the dashboard
