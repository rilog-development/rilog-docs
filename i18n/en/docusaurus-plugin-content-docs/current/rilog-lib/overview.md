---
id: overview
title: rilog-lib Overview
sidebar_label: Overview
---

# rilog-lib

`@rilog-development/rilog-lib` is the client-side JavaScript/TypeScript library that connects your web application to the Rilog platform.

## What it does

Once initialised with your app key, the library runs silently in the background and:

- **Intercepts HTTP traffic** — wraps `fetch` and `XMLHttpRequest` globally to capture every request your app makes, including the URL, method, request headers, request body, response status, response headers, and response body.
- **Catches JavaScript errors** — hooks into `window.onerror` and `window.onunhandledrejection` to capture stack traces and contextual data for every unhandled error.
- **Tracks page navigation** — listens to the History API and `popstate` events to log route changes in SPAs.
- **Buffers and sends asynchronously** — events are batched and sent to the Rilog backend in the background, so there's no impact on your app's main thread or user experience.

## What it does NOT do

- Does not block requests or responses — it only observes.
- Does not send data synchronously — all transmissions are async and non-blocking.
- Does not capture passwords or sensitive fields unless you explicitly configure it to (and you shouldn't).
- Does not require any server-side changes to your application.

## Compatibility

| Environment | Support |
|---|---|
| React 16+ | ✅ |
| Vue 2 / Vue 3 | ✅ |
| Angular 12+ | ✅ |
| Next.js (client-side) | ✅ |
| Svelte / SvelteKit (client) | ✅ |
| Plain HTML + JS | ✅ |
| Node.js / SSR | ⚠️ Partial (HTTP capture only) |

## Package info

- **NPM**: [@rilog-development/rilog-lib](https://www.npmjs.com/package/@rilog-development/rilog-lib)
- **Size**: lightweight, minimal dependencies
- **TypeScript**: full type definitions included

## Quick links

- [Installation](/docs/rilog-lib/installation)
- [Configuration](/docs/rilog-lib/configuration)
- [API Reference](/docs/rilog-lib/api)
- [Event Types](/docs/rilog-lib/event-types)
