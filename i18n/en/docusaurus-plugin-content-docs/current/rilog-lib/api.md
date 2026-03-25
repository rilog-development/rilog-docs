---
id: api
title: API Reference
sidebar_label: API Reference
---

# API Reference

All methods are available on the default export from `@rilog-development/rilog-lib`.

```typescript
import Rilog from '@rilog-development/rilog-lib';
```

---

## `Rilog.init(config)`

Initialises the library. Must be called once, as early as possible in your application lifecycle.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `config` | `RilogConfig` | ✅ | Configuration object (see [Configuration](/docs/rilog-lib/configuration)) |

**Returns:** `void`

```typescript
Rilog.init({
  appKey: 'rl_live_xxxxxxxxxxxx',
  environment: 'production',
  captureHttp: true,
  captureErrors: true,
});
```

---

## `Rilog.logEvent(event)`

Manually send a custom event to Rilog. Use this for business-logic events that aren't captured automatically (e.g. user completed onboarding, feature flag resolved, payment initiated).

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event.type` | `string` | ✅ | Event type identifier (e.g. `'custom'`, `'business'`) |
| `event.message` | `string` | ✅ | Human-readable description of the event |
| `event.data` | `Record<string, unknown>` | ❌ | Arbitrary payload attached to the event |
| `event.level` | `'info' \| 'warn' \| 'error'` | ❌ | Severity level (default: `'info'`) |

**Returns:** `void`

```typescript
// Log a business event
Rilog.logEvent({
  type: 'custom',
  message: 'User completed checkout',
  data: {
    orderId: 'ord_9xk2f',
    total: 149.99,
    currency: 'USD',
    itemCount: 3,
  },
});

// Log a warning
Rilog.logEvent({
  type: 'custom',
  level: 'warn',
  message: 'Feature flag not found, using default',
  data: { flag: 'new-checkout-flow' },
});
```

---

## `Rilog.setUser(user)`

Attach user context to all subsequent events. Call this after your user authenticates.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `user.id` | `string` | ❌ | Unique user identifier |
| `user.email` | `string` | ❌ | User email |
| `user.name` | `string` | ❌ | Display name |
| Additional fields | `unknown` | ❌ | Any extra key-value pairs |

**Returns:** `void`

```typescript
// After login
Rilog.setUser({
  id: 'usr_123',
  email: 'alice@example.com',
  name: 'Alice',
  plan: 'pro',
});
```

---

## `Rilog.clearUser()`

Remove the current user context. Call this on logout.

**Returns:** `void`

```typescript
// On logout
Rilog.clearUser();
```

---

## `Rilog.enable()`

Re-enable event capture after it was disabled. No-op if already enabled.

**Returns:** `void`

---

## `Rilog.disable()`

Temporarily stop capturing events. Events that occur while disabled are not queued — they are dropped.

**Returns:** `void`

```typescript
// Disable during a sensitive operation
Rilog.disable();
await sensitiveOperation();
Rilog.enable();
```

---

## `Rilog.flush()`

Force-send any buffered events immediately. By default events are batched and sent periodically; call `flush()` if you need to guarantee delivery before a page unload.

**Returns:** `Promise<void>`

```typescript
window.addEventListener('beforeunload', () => {
  Rilog.flush();
});
```

---

## TypeScript types

```typescript
interface RilogConfig {
  appKey: string;
  captureHttp?: boolean;
  captureErrors?: boolean;
  capturePageViews?: boolean;
  ignoreUrls?: (string | RegExp)[];
  sanitizeBody?: boolean;
  environment?: string;
  enabled?: boolean;
  user?: RilogUser;
}

interface RilogUser {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: unknown;
}

interface RilogCustomEvent {
  type: string;
  message: string;
  level?: 'info' | 'warn' | 'error';
  data?: Record<string, unknown>;
}
```
