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

Після входу натисніть **Create Application** (або кнопку **+**) в Application Center. Дайте йому назву (наприклад, `my-frontend-app`).

Ви отримаєте унікальний **App Key** — скопіюйте його, він знадобиться на наступному кроці.

## Крок 3 — Встановіть rilog-lib

У директорії вашого проєкту:

```bash
npm install @rilog-development/rilog-lib
# або
yarn add @rilog-development/rilog-lib
```

## Крок 4 — Ініціалізуйте бібліотеку

Викличте `Rilog.init()` якомога раніше у точці входу вашого застосунку — до будь-якого іншого коду.

```typescript
// main.ts / index.ts / App.tsx
import Rilog from '@rilog-development/rilog-lib';

Rilog.init({
  appKey: 'YOUR_APP_KEY_HERE',
});
```

:::tip Точка входу важлива
Для React: розмістіть у `main.tsx` або `index.tsx`, до `ReactDOM.createRoot`.
Для Vue: розмістіть у `main.ts`, до `createApp`.
Для Next.js: використовуйте `_app.tsx` або client-компонент з `'use client'`.
:::

## Крок 5 — Відкрийте дашборд

Поверніться на [rilog.online](https://www.rilog.online), відкрийте свій застосунок і перейдіть до його **Connection**.

Виконайте кілька дій у своєму застосунку (покликайте, зробіть API-запит, спровокуйте помилку). Ви побачите, як події з'являються в дашборді протягом секунд.

---

## Мінімальний робочий приклад

```typescript
import Rilog from '@rilog-development/rilog-lib';

// Ініціалізація один раз при старті застосунку
Rilog.init({ appKey: 'rl_live_xxxxxxxxxxxx' });

// З цього моменту rilog-lib автоматично фіксує:
// - Всі виклики fetch() і XMLHttpRequest
// - Необроблені JavaScript помилки
// - Події навігації між сторінками

// Ви також можете логувати кастомні події:
Rilog.logEvent({
  type: 'custom',
  message: 'User completed onboarding',
  data: { step: 'profile-setup', userId: '123' },
});
```

## Наступні кроки

- [Параметри конфігурації](/docs/rilog-lib/configuration) — налаштуйте, що фіксується
- [Повна довідка API](/docs/rilog-lib/api) — всі доступні методи
- [Типи подій](/docs/rilog-lib/event-types) — зрозумійте, що містить кожна подія
