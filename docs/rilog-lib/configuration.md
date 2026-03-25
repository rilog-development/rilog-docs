---
id: configuration
title: Конфігурація
sidebar_label: Конфігурація
---

# Конфігурація

`rilog.init()` приймає об'єкт з двома полями: обов'язковим `key` та опціональним `config`.

```typescript
rilog.init({
  key: 'your-app-key',
  config: { ... }, // опціонально
});
```

## Повна довідка конфігурації

```typescript
rilog.init({
  // Обов'язково
  key: 'your-app-key',

  // Опціонально
  config: {
    // Фільтрація запитів
    ignoredRequests: ['https://analytics.example.com', '/api/ping'],

    // Приховування чутливих даних
    sensetiveRequsts: ['/api/login'],          // замінює заголовки І тіло на 'sensitive'
    sensetiveDataRequests: ['/api/payments'],  // замінює лише тіло на 'sensitive'

    // Заголовки та localStorage
    headers: ['x-request-id', 'x-trace-id'],  // які заголовки зберігати
    localStorage: ['theme', 'locale'],         // які ключі localStorage зберігати

    // Вимкнення перехоплювачів
    disableFetchInterceptor: false,     // вимкнути fetch-перехоплення
    disableClickInterceptor: false,     // вимкнути перехоплення кліків
    disableConsoleInterceptor: false,   // вимкнути перехоплення console.warn/error

    // Власний сервер
    selfServer: {
      url: 'https://your-backend.com/rilog',
      headers: { Authorization: 'Bearer token' },
    },

    // Хуки
    onPushEvent: (event) => { console.log('New event:', event); },
    onSaveEvents: (events) => { console.log('Saving events:', events); },
  },
});
```

## Параметри конфігурації

### `key` (обов'язково)

Тип: `string`

Ключ застосунку, який отримується при створенні проєкту в дашборді Rilog. Прив'язує події до конкретного проєкту.

---

### `ignoredRequests`

Тип: `string[]` | За замовчуванням: `[]`

Список URL-рядків. HTTP-запити до цих URL не будуть збережені.

```typescript
ignoredRequests: ['https://www.google-analytics.com', '/api/health']
```

---

### `sensetiveRequsts`

Тип: `string[]` | За замовчуванням: `[]`

Запити, у яких **заголовки та тіло** повністю замінюються рядком `'sensitive'`. Використовуйте для endpoint'ів з обліковими даними (наприклад, `/api/login`).

---

### `sensetiveDataRequests`

Тип: `string[]` | За замовчуванням: `[]`

Запити, у яких замінюється лише **тіло** на `'sensitive'` (заголовки зберігаються). Підходить для endpoint'ів з платіжними даними або PII.

---

### `headers`

Тип: `string[]` | За замовчуванням: `[]`

Allowlist заголовків запиту, які будуть збережені. За замовчуванням жодні заголовки не зберігаються.

```typescript
headers: ['x-request-id', 'x-correlation-id']
```

---

### `localStorage`

Тип: `string[]` | За замовчуванням: `[]`

Allowlist ключів `localStorage`, значення яких додаються до подій. За замовчуванням нічого не зберігається.

```typescript
localStorage: ['user_id', 'locale']
```

---

### `disableFetchInterceptor`

Тип: `boolean` | За замовчуванням: `false`

Вимикає автоматичне перехоплення `fetch`-запитів. Axios перехоплюється окремо — вручну через `rilog.interceptRequestAxios()` і `rilog.interceptResponseAxios()`.

---

### `disableClickInterceptor`

Тип: `boolean` | За замовчуванням: `false`

Вимикає перехоплення кліків на елементах `<button>` та `<a>`.

---

### `disableConsoleInterceptor`

Тип: `boolean` | За замовчуванням: `false`

Вимикає перехоплення викликів `console.error()` і `console.warn()`. Оригінальний вивід у DevTools зберігається.

---

### `selfServer`

Тип: `{ url: string; headers?: Record<string, string> }` | За замовчуванням: `undefined`

Надсилає події на власний бекенд замість (або разом із) сховищем Rilog. Ваш endpoint отримує `POST`-запит з тілом `{ events: string }`, де значення — JSON-масив об'єктів подій.

```typescript
selfServer: {
  url: 'https://your-backend.com/rilog-events',
  headers: { 'X-Api-Key': 'secret' },
}
```

---

### `onPushEvent`

Тип: `(event: RilogEvent) => void` | За замовчуванням: `undefined`

Callback, що викликається щоразу, коли перехоплюється нова подія. Корисно для дебагу або кастомної обробки.

---

### `onSaveEvents`

Тип: `(events: RilogEvent[]) => void` | За замовчуванням: `undefined`

Callback, що викликається перед відправкою батчу подій у сховище.

---

## Підключення axios

`fetch`-запити перехоплюються автоматично. Axios потребує ручного підключення через interceptors. Додайте цей код одразу після `rilog.init()`:

```typescript
import axios from 'axios';
import rilog from '@rilog-development/rilog-lib';

axios.interceptors.request.use((request) => {
  rilog.interceptRequestAxios(request);
  return request;
});

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

:::tip
Якщо у вас кілька axios-інстансів, додайте interceptors до кожного з них окремо.
:::
