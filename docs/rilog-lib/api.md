---
id: api
title: Довідка API
sidebar_label: Довідка API
---

# Довідка API

Всі методи доступні через default export з `@rilog-development/rilog-lib`.

```typescript
import rilog from '@rilog-development/rilog-lib';
```

---

## `rilog.init({ key, config? })`

Ініціалізує бібліотеку і запускає всі автоматичні перехоплювачі. Повинен викликатися один раз, якомога раніше в lifecycle застосунку.

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `key` | `string` | ✅ | Ключ застосунку з дашборду Rilog |
| `config` | `TRilogInitConfig` | ❌ | Додаткові налаштування (дивіться [Конфігурація](/docs/rilog-lib/configuration)) |

**Повертає:** `void`

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

Викликається всередині axios request interceptor. Передайте об'єкт конфігурації запиту axios.

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `request` | `InternalAxiosRequestConfig` | ✅ | Об'єкт конфігурації axios-запиту |

**Повертає:** `void`

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

Викликається в обох обробниках axios response interceptor — для успішних відповідей і для помилок.

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `response` | `AxiosResponse \| AxiosError` | ✅ | Об'єкт відповіді або помилки axios |

**Повертає:** `void`

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

Вручну записати кастомне debug-повідомлення. Автоматично захоплює stack trace з місця виклику (для читабельних посилань потрібні source maps).

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `data` | `any` | ✅ | Будь-яке значення; об'єкти серіалізуються автоматично |
| `label` | `string` | ✅ | Мітка для фільтрації подій у дашборді |

**Повертає:** `void`

```typescript
rilog.logData(
  { userId: 'usr_456', step: 'checkout', total: 149.99 },
  { label: 'purchase-flow' }
);
```

---

## TypeScript типи

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
