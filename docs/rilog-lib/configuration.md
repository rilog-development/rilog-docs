---
id: configuration
title: Конфігурація
sidebar_label: Конфігурація
---

# Конфігурація

`Rilog.init()` приймає об'єкт конфігурації. Єдине обов'язкове поле — `appKey`.

## Повна довідка конфігурації

```typescript
Rilog.init({
  // Обов'язково
  appKey: 'rl_live_xxxxxxxxxxxx',

  // Опціонально — що фіксувати
  captureHttp: true,         // логувати всі HTTP-запити (за замовчуванням: true)
  captureErrors: true,       // логувати необроблені JS помилки (за замовчуванням: true)
  capturePageViews: true,    // логувати зміни маршрутів/сторінок (за замовчуванням: true)

  // Опціонально — фільтрація запитів
  ignoreUrls: [
    'https://analytics.example.com',
    /\/health/,              // regex також підтримується
  ],

  // Опціонально — видалення чутливих даних з тіл запитів
  sanitizeBody: true,        // за замовчуванням: false

  // Опціонально — мітка середовища (відображається в дашборді)
  environment: 'production', // 'development' | 'staging' | 'production'

  // Опціонально — вимкнути у розробці
  enabled: process.env.NODE_ENV === 'production',

  // Опціонально — контекст користувача, що додається до всіх подій
  user: {
    id: 'usr_123',
    email: 'user@example.com',
  },
});
```

## Параметри конфігурації

### `appKey` (обов'язково)

Тип: `string`

Ваш унікальний ключ застосунку з дашборду Rilog. Ідентифікує, до якого застосунку належать події.

### `captureHttp`

Тип: `boolean` | За замовчуванням: `true`

Коли `true`, rilog-lib обгортає глобальні `fetch` і `XMLHttpRequest`, щоб логувати кожен HTTP-запит і відповідь, включаючи код статусу, заголовки, час і тіло.

### `captureErrors`

Тип: `boolean` | За замовчуванням: `true`

Коли `true`, підключається до `window.onerror` і `window.onunhandledrejection`, щоб фіксувати JavaScript помилки зі stack traces.

### `capturePageViews`

Тип: `boolean` | За замовчуванням: `true`

Коли `true`, слухає History API (`pushState`, `replaceState`) і `popstate`, щоб логувати події навігації в single-page застосунках.

### `ignoreUrls`

Тип: `(string | RegExp)[]` | За замовчуванням: `[]`

Список рядків URL або регулярних виразів. HTTP-запити, URL яких збігається з будь-яким записом у цьому списку, не будуть логуватися. Корисно для фільтрації шуму від аналітичних beacon, health check або сторонніх сервісів.

```typescript
ignoreUrls: [
  'https://www.google-analytics.com',
  /\/api\/ping/,
  'intercom.io',
]
```

### `sanitizeBody`

Тип: `boolean` | За замовчуванням: `false`

Коли `true`, rilog-lib замінює поширені чутливі імена полів (`password`, `token`, `secret`, `authorization`, `credit_card`, `cvv`) у тілах запитів і відповідей перед відправкою до Rilog. Увімкніть для будь-якого endpoint, який може містити облікові дані.

### `environment`

Тип: `string` | За замовчуванням: `undefined`

Рядкова мітка, що додається до кожної події (наприклад, `'production'`, `'staging'`). Відображається в дашборді, корисна для фільтрації подій за середовищем, коли кілька з'єднань спільно використовують застосунок.

### `enabled`

Тип: `boolean` | За замовчуванням: `true`

Коли `false`, бібліотека нічого не робить — ні фіксації подій, ні мережевих запитів. Використовуйте для вимкнення логування у розробці без видалення виклику `init`.

```typescript
Rilog.init({
  appKey: 'YOUR_KEY',
  enabled: process.env.NODE_ENV !== 'development',
});
```

### `user`

Тип: `{ id?: string; email?: string; name?: string; [key: string]: unknown }` | За замовчуванням: `undefined`

Опціональний контекст користувача, що додається до кожної події. Корисно для зіставлення подій з конкретними користувачами. Ви можете оновити це в будь-який час після init (наприклад, після входу користувача).

```typescript
// Після входу користувача
Rilog.setUser({ id: 'usr_456', email: 'alice@example.com' });
```

## Оновлення конфігурації після init

Деякі властивості можна оновлювати під час виконання:

```typescript
// Оновити контекст користувача (наприклад, після входу)
Rilog.setUser({ id: 'usr_789', email: 'bob@example.com' });

// Очистити контекст користувача (наприклад, після виходу)
Rilog.clearUser();

// Тимчасово вимкнути логування
Rilog.disable();

// Увімкнути знову
Rilog.enable();
```
