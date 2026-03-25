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

Once connected, Rilog automatically captures HTTP requests and responses (fetch automatically, axios — via additional interceptors), clicks on buttons and links, and `console.error` / `console.warn` calls. You see everything in real time in the dashboard without writing any custom backend infrastructure.

## Why Rilog?

Traditional monitoring tools are either too complex (requiring agents, infrastructure configuration, or devops expertise) or too basic (only catching unhandled exceptions). Rilog sits in the middle: easy to set up, but powerful enough to give you real answers when something goes wrong in production.

**The main pain point it solves:** With Rilog App you can learn about errors in web applications before users or testers report them. You can also trace the entire path a user took before a particular bug occurred.

## Core concepts

### Application

You create an application in the dashboard, get an App Key, and use that key in `rilog-lib`.

### Connection

A **connection** represents one running instance of your application connected to Rilog. A connection exists within a single open browser session. Each user of your application will have their own unique connection.

### Event

An **event** is any captured unit of data: an HTTP request, a button click, a console message, or a custom debug message.

## Architecture overview

```
Your web app
  └── rilog-lib (installed as npm package)
        ├── Intercepts fetch (and axios via manual interceptors)
        ├── Tracks clicks on <button> and <a> elements
        ├── Captures console.error() and console.warn()
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
