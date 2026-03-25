---
id: event-types
title: Типи подій
sidebar_label: Типи подій
---

# Типи подій

Rilog фіксує кілька категорій подій. Кожна подія зберігається з типом, міткою часу та специфічними для типу даними.

## HTTP Request (HTTP-запит)

Фіксується автоматично для кожного виклику `fetch()` і `XMLHttpRequest` у вашому застосунку.

| Поле | Опис |
|---|---|
| `method` | HTTP метод (`GET`, `POST`, `PUT`, `DELETE` тощо) |
| `url` | Повний URL запиту |
| `requestHeaders` | Заголовки запиту у форматі ключ-значення |
| `requestBody` | Розібране тіло запиту (JSON, FormData, text) |
| `status` | HTTP код статусу відповіді |
| `responseHeaders` | Заголовки відповіді |
| `responseBody` | Розібране тіло відповіді |
| `duration` | Тривалість запиту в мілісекундах |
| `timestamp` | ISO мітка часу початку запиту |

```json
{
  "type": "http",
  "method": "POST",
  "url": "https://api.myapp.com/users/login",
  "requestHeaders": { "Content-Type": "application/json" },
  "requestBody": { "email": "user@example.com" },
  "status": 200,
  "responseBody": { "userId": "usr_123", "token": "[REDACTED]" },
  "duration": 142
}
```

## JavaScript Error (JavaScript помилка)

Фіксується автоматично для всіх необроблених помилок і необроблених promise rejection.

| Поле | Опис |
|---|---|
| `message` | Рядок повідомлення помилки |
| `stackTrace` | Повний stack trace |
| `filename` | Вихідний файл, де виникла помилка |
| `line` | Номер рядка |
| `column` | Номер колонки |
| `type` | Назва конструктора помилки (`TypeError`, `RangeError` тощо) |

```json
{
  "type": "error",
  "level": "error",
  "message": "Cannot read properties of undefined (reading 'map')",
  "stackTrace": "at ProductList (ProductList.tsx:42:18)\n  at render...",
  "filename": "http://localhost:3000/src/components/ProductList.tsx",
  "line": 42,
  "column": 18
}
```

## Page View (Перегляд сторінки)

Фіксується автоматично, коли ваш SPA переходить до нового маршруту.

| Поле | Опис |
|---|---|
| `url` | Новий URL після навігації |
| `previousUrl` | URL до навігації |
| `title` | Заголовок документа в момент навігації |
| `referrer` | URL реферера (для першого завантаження) |

```json
{
  "type": "pageview",
  "url": "/products/shoes",
  "previousUrl": "/products",
  "title": "Shoes — MyShop"
}
```

## Custom Event (Кастомна подія)

Надсилається вручну через `Rilog.logEvent()`. Повністю гнучка — ви самі визначаєте структуру.

| Поле | Опис |
|---|---|
| `type` | Завжди `'custom'` (або ваш власний рядок) |
| `message` | Опис зрозумілою мовою |
| `level` | `'info'`, `'warn'` або `'error'` |
| `data` | Ваші довільні дані |

```json
{
  "type": "custom",
  "level": "info",
  "message": "User completed onboarding",
  "data": {
    "step": "profile-setup",
    "userId": "usr_456",
    "duration_seconds": 47
  }
}
```

## Console Log (опціонально)

Коли увімкнено, фіксує виклики `console.warn` і `console.error` з їхніми аргументами.

| Поле | Опис |
|---|---|
| `level` | `'warn'` або `'error'` |
| `args` | Масив серіалізованих аргументів, переданих до console |

## Метадані події

Кожна подія — незалежно від типу — також містить ці загальні поля:

| Поле | Опис |
|---|---|
| `id` | Унікальний ідентифікатор події (UUID) |
| `connectionKey` | App Key, що надіслав подію |
| `timestamp` | ISO 8601 мітка часу |
| `environment` | Мітка середовища (якщо налаштовано) |
| `userAgent` | Рядок user agent браузера |
| `user` | Поточний контекст користувача (якщо встановлено через `Rilog.setUser()`) |
| `sessionId` | Анонімний ідентифікатор сесії (скидається при перезавантаженні сторінки) |
