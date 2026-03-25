---
id: api
title: API Reference
sidebar_label: API Reference
---

# API Reference

All methods are available on the default export from `@rilog-development/rilog-lib`.

```typescript
import rilog from '@rilog-development/rilog-lib';
```

---

## `rilog.init({ key, config? })`

Initialises the library and starts all automatic interceptors. Must be called once, as early as possible in your application lifecycle.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `key` | `string` | ✅ | App Key from the Rilog dashboard |
| `config` | `TRilogInitConfig` | ❌ | Additional settings (see [Configuration](/docs/rilog-lib/configuration)) |

**Returns:** `void`

```typescript
rilog.init({
  key: 'YOUR_APP_KEY',
  config: {
    ignoredRequests: ['/api/health'],
    disableClickInterceptor: false,
  },
});
```

---

## `rilog.interceptRequestAxios(request)`

Called inside an axios request interceptor. Pass the axios request config object.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `request` | `InternalAxiosRequestConfig` | ✅ | Axios request config object |

**Returns:** `void`

```typescript
import axios from 'axios';
import rilog from '@rilog-development/rilog-lib';

axios.interceptors.request.use((request) => {
  rilog.interceptRequestAxios(request);
  return request;
});
```

---

## `rilog.interceptResponseAxios(response)`

Called in both the success and error handlers of an axios response interceptor.

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `response` | `AxiosResponse \| AxiosError` | ✅ | Axios response or error object |

**Returns:** `void`

```typescript
axios.interceptors.response.use(
  (response) => {
    rilog.interceptResponseAxios(response);
    return response;
  },
  (error) => {
    rilog.interceptResponseAxios(error);
    return Promise.reject(error);
  }
);
```

---

## `rilog.logData(data, { label })`

Manually log a custom debug message. Automatically captures a stack trace from the call site (source maps improve readability).

**Parameters**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `data` | `any` | ✅ | Any value; objects are serialised automatically |
| `label` | `string` | ✅ | Label for filtering events in the dashboard |

**Returns:** `void`

```typescript
rilog.logData(
  { userId: 'usr_456', step: 'checkout', total: 149.99 },
  { label: 'purchase-flow' }
);
```

---

## TypeScript types

```typescript
interface TRilogInitConfig {
  ignoredRequests?: string[];
  sensetiveRequsts?: string[];
  sensetiveDataRequests?: string[];
  headers?: string[];
  localStorage?: string[];
  disableFetchInterceptor?: boolean;
  disableClickInterceptor?: boolean;
  disableConsoleInterceptor?: boolean;
  selfServer?: ISelfServer;
  onPushEvent?: (event: unknown) => void;
  onSaveEvents?: (events: unknown[]) => void;
}

interface ISelfServer {
  url: string;
  headers?: Record<string, string>;
}
```
