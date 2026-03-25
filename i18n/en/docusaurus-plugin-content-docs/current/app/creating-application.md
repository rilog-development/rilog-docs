---
id: creating-application
title: Creating an Application
sidebar_label: Creating an Application
---

# Creating an Application

An **application** in Rilog maps to one of your projects. For example, if you have a SaaS product, you'd create one Rilog application for it. If you also have a marketing site, that might be a second application.

## Steps

1. **Sign in** to [rilog.online](https://www.rilog.online).
2. Click **Create Application** (or the **+** button) in the Application Center.
3. Enter a name for your application. Use something descriptive — you'll see this name in the dashboard and in event lists.
4. Click **Create**.

You'll be taken to the application detail page, where you can see your **App Key**.

## App Key

The App Key is the identifier you pass to `Rilog.init()` in your frontend code. It looks like:

```
rl_live_a7f3c8d2e1b4a9f0c3d7e2a1b5c8d9e0
```

:::tip Keep it safe
While the App Key is a client-side credential (it appears in browser network requests by definition), don't commit it directly to source code. Use environment variables instead — see [Installation](/docs/rilog-lib/installation#environment-variables).
:::

## Multiple applications

You can create as many applications as you need. Common patterns:

- **One app per project** — cleanest separation of data.
- **One app, multiple connections** — useful if you want all environments (dev, staging, prod) in one place but tagged differently using the `environment` config option.

## Deleting an application

Go to the application settings and click **Delete Application**. This permanently removes all associated connections and events. There is no undo.

:::danger
Deleting an application immediately invalidates its App Key. Any running instances of rilog-lib using that key will stop sending events.
:::
