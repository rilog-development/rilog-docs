---
id: sharing
title: Sharing Events
sidebar_label: Sharing Events
---

# Sharing Events

Any event in Rilog can be shared as a **public snapshot** — a read-only link that anyone can open in a browser, no Rilog account required.

## Creating a share link

1. Open a connection and find the event you want to share.
2. Click the **Share** button (the link icon) in the Actions column.
3. Rilog generates a public URL. Copy it to your clipboard.

The shared page shows the full event detail — headers, body, stack trace, timestamp — in the same formatted code view as the app, but without editing or navigation controls.

## Use cases

**Bug reports** — instead of copy-pasting a wall of JSON into a GitHub issue, share a Rilog link. Your backend colleague can see the exact request and response without any setup.

**Code review** — share a real HTTP exchange as context when reviewing an API change. "This is the before" + "this is the after" makes the review concrete.

**Team debugging sessions** — paste a share link into Slack. Everyone on the call is looking at the same data.

**Support tickets** — if you have internal support tooling, link directly to the Rilog event so support engineers don't have to reproduce the issue.

## Public vs private

By default, shared event links are **public** — accessible by anyone with the URL, without authentication. The URL is a long random token (not guessable), so it's practically private in terms of discoverability, but treat it like a secret link.

Shared links show:
- Event type, timestamp, and status
- Request URL, method, headers, body
- Response status, headers, body
- Stack trace (for error events)
- Any comments left on the event

Shared links do **not** show:
- Other events from the same connection
- Account information
- Analytics data

## Comments

You and your team can leave comments on any event — including shared events. Comments are visible to anyone with the share link, making them a lightweight way to annotate what was happening ("this error only appears with Safari 17 on iOS") or track resolution status.

To add a comment:
1. Open an event (in the app or via share link).
2. Type in the comment box on the right panel.
3. Click **Post**.
