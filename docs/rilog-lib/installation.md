---
id: installation
title: Встановлення
sidebar_label: Встановлення
---

# Встановлення

## Вимоги

- Node.js 14 або новіший (для build toolchain)
- Браузерний JavaScript застосунок (React, Vue, Angular, Next.js, plain JS тощо)
- Акаунт Rilog та дійсний App Key

## Встановлення через npm

```bash
npm install @rilog-development/rilog-lib
```

## Встановлення через yarn

```bash
yarn add @rilog-development/rilog-lib
```

## Встановлення через pnpm

```bash
pnpm add @rilog-development/rilog-lib
```

## Налаштування для конкретних фреймворків

### React / Vite

Розмістіть виклик ініціалізації у файлі точки входу, до `ReactDOM.createRoot`:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Rilog from '@rilog-development/rilog-lib';
import App from './App';

Rilog.init({ appKey: 'YOUR_APP_KEY' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js (App Router)

Створіть client-компонент, який ініціалізує Rilog, і рендеріть його у root layout:

```tsx
// components/RilogProvider.tsx
'use client';

import { useEffect } from 'react';
import Rilog from '@rilog-development/rilog-lib';

export default function RilogProvider() {
  useEffect(() => {
    Rilog.init({ appKey: process.env.NEXT_PUBLIC_RILOG_KEY! });
  }, []);

  return null;
}
```

```tsx
// app/layout.tsx
import RilogProvider from '@/components/RilogProvider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RilogProvider />
        {children}
      </body>
    </html>
  );
}
```

### Vue 3

```ts
// src/main.ts
import { createApp } from 'vue';
import Rilog from '@rilog-development/rilog-lib';
import App from './App.vue';

Rilog.init({ appKey: 'YOUR_APP_KEY' });

createApp(App).mount('#app');
```

### Angular

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import Rilog from '@rilog-development/rilog-lib';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

Rilog.init({ appKey: 'YOUR_APP_KEY' });

bootstrapApplication(AppComponent, appConfig);
```

### Plain HTML

```html
<script type="module">
  import Rilog from 'https://cdn.jsdelivr.net/npm/@rilog-development/rilog-lib/dist/index.js';
  Rilog.init({ appKey: 'YOUR_APP_KEY' });
</script>
```

## Змінні середовища

Зберігайте App Key поза вихідним кодом за допомогою змінних середовища:

```bash
# .env
VITE_RILOG_KEY=rl_live_xxxxxxxxxxxx
NEXT_PUBLIC_RILOG_KEY=rl_live_xxxxxxxxxxxx
```

```ts
Rilog.init({ appKey: import.meta.env.VITE_RILOG_KEY });
// або для Next.js:
Rilog.init({ appKey: process.env.NEXT_PUBLIC_RILOG_KEY! });
```

:::caution
App Key — це клієнтські облікові дані: вони ідентифікують ваш застосунок, але не надають доступ на запис даних. Все одно гарна практика — використовувати змінні середовища і не зберігати їх у публічних репозиторіях.
:::
