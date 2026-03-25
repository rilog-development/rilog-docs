---
id: api
title: Довідка API
sidebar_label: Довідка API
---

# Довідка API

Всі методи доступні через default export з `@rilog-development/rilog-lib`.

```typescript
import Rilog from '@rilog-development/rilog-lib';
```

---

## `Rilog.init(config)`

Ініціалізує бібліотеку. Повинен викликатися один раз, якомога раніше в lifecycle застосунку.

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `config` | `RilogConfig` | ✅ | Об'єкт конфігурації (дивіться [Конфігурація](/docs/rilog-lib/configuration)) |

**Повертає:** `void`

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

Вручну надіслати кастомну подію до Rilog. Використовуйте для бізнес-логічних подій, які не фіксуються автоматично (наприклад, користувач завершив онбординг, feature flag визначено, платіж ініційовано).

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `event.type` | `string` | ✅ | Ідентифікатор типу події (наприклад, `'custom'`, `'business'`) |
| `event.message` | `string` | ✅ | Опис події зрозумілою мовою |
| `event.data` | `Record<string, unknown>` | ❌ | Довільні дані, прикріплені до події |
| `event.level` | `'info' \| 'warn' \| 'error'` | ❌ | Рівень важливості (за замовчуванням: `'info'`) |

**Повертає:** `void`

```typescript
// Логувати бізнес-подію
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

// Логувати попередження
Rilog.logEvent({
  type: 'custom',
  level: 'warn',
  message: 'Feature flag not found, using default',
  data: { flag: 'new-checkout-flow' },
});
```

---

## `Rilog.setUser(user)`

Прикріпити контекст користувача до всіх наступних подій. Викликайте після автентифікації користувача.

**Параметри**

| Параметр | Тип | Обов'язковий | Опис |
|---|---|---|---|
| `user.id` | `string` | ❌ | Унікальний ідентифікатор користувача |
| `user.email` | `string` | ❌ | Email користувача |
| `user.name` | `string` | ❌ | Ім'я для відображення |
| Додаткові поля | `unknown` | ❌ | Будь-які додаткові пари ключ-значення |

**Повертає:** `void`

```typescript
// Після входу
Rilog.setUser({
  id: 'usr_123',
  email: 'alice@example.com',
  name: 'Alice',
  plan: 'pro',
});
```

---

## `Rilog.clearUser()`

Видалити поточний контекст користувача. Викликайте при виході.

**Повертає:** `void`

```typescript
// При виході
Rilog.clearUser();
```

---

## `Rilog.enable()`

Повторно увімкнути фіксацію подій після вимкнення. Нічого не робить, якщо вже увімкнено.

**Повертає:** `void`

---

## `Rilog.disable()`

Тимчасово зупинити фіксацію подій. Події, що виникають під час вимкнення, не ставляться в чергу — вони відкидаються.

**Повертає:** `void`

```typescript
// Вимкнути під час чутливої операції
Rilog.disable();
await sensitiveOperation();
Rilog.enable();
```

---

## `Rilog.flush()`

Примусово надіслати всі буферизовані події негайно. За замовчуванням події пакуються й надсилаються періодично; викликайте `flush()`, якщо потрібно гарантувати доставку перед вивантаженням сторінки.

**Повертає:** `Promise<void>`

```typescript
window.addEventListener('beforeunload', () => {
  Rilog.flush();
});
```

---

## TypeScript типи

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
