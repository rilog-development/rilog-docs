---
id: connections
title: Connections
sidebar_label: Connections
---

# Connections

A **connection** is created automatically the first time a rilog-lib instance sends an event using a given App Key. You don't create connections manually — they appear as soon as your app is running.

## What is a connection?

Think of a connection as a running session of your application. Each time your app starts and sends its first event, Rilog records a connection with metadata about the browser, device, and environment.

A single application can have many connections — for example, if 50 different users are running your app simultaneously, each user's session is a separate connection.

## Connection list

On the application page, you see a list of all connections. Each entry shows:

- **Connection name / ID** — auto-generated identifier (or the `environment` label you configured)
- **Last update** — when the most recent event was received
- **Successful requests** — count of 2xx HTTP events
- **Failed requests** — count of 4xx / 5xx HTTP events
- **Browser** — detected from the user agent

Click any connection to open its event log.

## Connection detail

Inside a connection you can see:

- **Summary stats** at the top (success rate, error count, last active)
- **Event table** with all events from this connection, newest first
- **Filters** to narrow down by status, method, or event type
- **Pagination** for connections with many events

## Filtering events

Use the filter bar above the event table to narrow down what you see:

| Filter | Options |
|---|---|
| **Status** | All, 2xx Success, 4xx Client Error, 5xx Server Error |
| **HTTP Method** | All, GET, POST, PUT, DELETE, PATCH |
| **Event Type** | All, HTTP, Error, Page View, Custom |

Filters are combined (AND logic). For example: `Status: 5xx` + `Method: POST` shows only failed POST requests.

## Clearing connection data

You can clear all events from a connection by clicking **Clear Data** in the top-right corner of the connection view. This is useful for resetting a test or staging connection before a demo.

:::caution
Clearing data is permanent. It removes all events for that connection and cannot be undone.
:::
