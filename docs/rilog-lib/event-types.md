---
id: event-types
title: Типи подій
sidebar_label: Типи подій
---

# Типи подій

Rilog перехоплює та зберігає п'ять категорій подій. Чотири з них фіксуються автоматично, одна — вручну.

| Тип | Тригер | Автоматично |
|---|---|---|
| `REQUEST` | HTTP-запити через `fetch` або axios | Так |
| `CLICK` | Кліки на елементах `<button>` та `<a>` | Так |
| `CONSOLE_ERROR` | Виклики `console.error()` | Так |
| `CONSOLE_WARN` | Виклики `console.warn()` | Так |
| `DEBUG_MESSAGE` | Ручний виклик `rilog.logData()` | Ні |

---

## REQUEST (HTTP-запит)

Фіксується автоматично для кожного `fetch`-запиту. Для axios потрібне ручне підключення через `rilog.interceptRequestAxios()` та `rilog.interceptResponseAxios()`.

| Поле | Опис |
|---|---|
| `method` | HTTP метод (`GET`, `POST`, `PUT`, `DELETE` тощо) |
| `url` | Повний URL запиту |
| `requestHeaders` | Заголовки запиту (лише ті, що вказані в `config.headers`) |
| `requestBody` | Тіло запиту |
| `status` | HTTP код статусу відповіді |
| `responseBody` | Тіло відповіді |

```json
{
  "type": "REQUEST",
  "method": "POST",
  "url": "https://api.myapp.com/users",
  "requestBody": { "email": "user@example.com" },
  "status": 201,
  "responseBody": { "id": "usr_123" }
}
```

---

## CLICK (Клік)

Фіксується автоматично при кліку на будь-який елемент `<button>` або `<a>`.

```json
{
  "type": "CLICK",
  "target": "button",
  "text": "Submit"
}
```

Вимкнути: `config.disableClickInterceptor: true`

---

## CONSOLE_ERROR

Фіксується при кожному виклику `console.error()`. Оригінальний вивід у DevTools **зберігається**.

```json
{
  "type": "CONSOLE_ERROR",
  "args": ["Something went wrong", { "code": 500 }]
}
```

---

## CONSOLE_WARN

Фіксується при кожному виклику `console.warn()`. Оригінальний вивід у DevTools **зберігається**.

```json
{
  "type": "CONSOLE_WARN",
  "args": ["Deprecated API used"]
}
```

Вимкнути обидва console-перехоплювачі: `config.disableConsoleInterceptor: true`

---

## DEBUG_MESSAGE (кастомна подія)

Надсилається вручну через `rilog.logData()`. Використовується для логування довільних даних у потрібних місцях коду. Автоматично захоплює stack trace з місця виклику (потрібні source maps для читабельних посилань).

```typescript
rilog.logData({ userId: 'usr_456', step: 'checkout' }, { label: 'purchase-flow' });
```

| Параметр | Тип | Обов'язково | Опис |
|---|---|---|---|
| `data` | `any` | Так | Будь-яке значення; об'єкти серіалізуються автоматично |
| `label` | `string` | Так | Мітка для фільтрації подій у дашборді |

```json
{
  "type": "DEBUG_MESSAGE",
  "label": "purchase-flow",
  "data": { "userId": "usr_456", "step": "checkout" }
}
```
