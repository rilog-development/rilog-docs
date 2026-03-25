---
id: quick-start
title: Швидкий старт
sidebar_label: Швидкий старт
---

# Швидкий старт

Підключіть Rilog до свого застосунку менш ніж за 5 хвилин.

## Крок 1 — Створіть акаунт

Перейдіть на [rilog.online](https://www.rilog.online) і зареєструйтесь. Це безкоштовно, кредитна картка не потрібна.

## Крок 2 — Створіть застосунок

Після входу натисніть **Створити додаток** (або кнопку **+**) в розділі Додатки. Дайте йому назву (наприклад, `my-frontend-app`) та опис.

Ви отримаєте унікальний **Ключ додатку** — скопіюйте його, він знадобиться на наступному кроці.

## Крок 3 — Встановіть rilog-lib

У директорії вашого проєкту:

```bash
npm install @rilog-development/rilog-lib
# або
yarn add @rilog-development/rilog-lib
```

## Крок 4 — Ініціалізуйте бібліотеку

Викличте `rilog.init()` якомога раніше у точці входу вашого застосунку — до будь-якого іншого коду.

```typescript
// main.ts / index.ts / App.tsx
import rilog from "@rilog-development/rilog-lib";

rilog.init({
  key: "YOUR_APP_KEY_HERE",
});
```

:::tip Точка входу важлива
Для React: розмістіть у `main.tsx` або `index.tsx`, до `ReactDOM.createRoot`.
Для Vue: розмістіть у `main.ts`, до `createApp`.
Для Next.js: використовуйте `_app.tsx` або client-компонент з `'use client'`.
:::

## Крок 5 — Підключіть axios (опціонально)

Якщо ваш застосунок використовує axios, додайте interceptors вручну — `fetch` перехоплюється автоматично, axios ні.

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

Розмістіть цей код одразу після `rilog.init()` у точці входу застосунку.

## Крок 6 — Відкрийте дашборд

Виконайте кілька дій у своєму застосунку (покликайте, зробіть API-запит, спровокуйте помилку). Ви побачите, як події з'являються в дашборді протягом секунд.

Поверніться на [rilog.online](https://www.rilog.online), відкрийте свій застосунок і ви побачите список зʼєднань. Відкрийте зʼєднання і подивіться сформований список подій.

---

## Мінімальний робочий приклад

```typescript
import rilog from "@rilog-development/rilog-lib";

// Ініціалізація один раз при старті застосунку
rilog.init({ key: "YOUR_APP_KEY" });

// З цього моменту rilog-lib автоматично фіксує:
// - HTTP-запити (fetch і axios)
// - Кліки на <button> і <a>
// - Виклики console.error() і console.warn()

// Ви також можете логувати кастомні повідомлення вручну:
rilog.logData(
  { step: "profile-setup", userId: "123" },
  { label: "onboarding" }
);
```

## Наступні кроки

- [Параметри конфігурації](/docs/rilog-lib/configuration) — налаштуйте, що фіксується
- [Повна довідка API](/docs/rilog-lib/api) — всі доступні методи
- [Типи подій](/docs/rilog-lib/event-types) — зрозумійте, що містить кожна подія
