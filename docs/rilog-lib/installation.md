---
id: installation
title: Встановлення
sidebar_label: Встановлення
---

# Встановлення

## Вимоги

- Браузерний JavaScript застосунок (React, Vue, Angular, Next.js, plain JS тощо)
- Акаунт Rilog та дійсний App Key (отримується при створенні проєкту на [rilog.online](http://www.rilog.online))

## Встановлення пакету

```bash
npm install @rilog-development/rilog-lib
# або
yarn add @rilog-development/rilog-lib
```

## Базова ініціалізація

```javascript
import rilog from '@rilog-development/rilog-lib';

rilog.init({ key: 'your-app-key' });
```

## Налаштування для конкретних фреймворків

### React / Vite

Розмістіть виклик ініціалізації у файлі точки входу, до `ReactDOM.createRoot`:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import rilog from '@rilog-development/rilog-lib';
import App from './App';

rilog.init({ key: 'YOUR_APP_KEY' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Next.js (App Router)

Створіть client-компонент, який ініціалізує rilog, і рендеріть його у root layout:

```tsx
// components/RilogProvider.tsx
'use client';

import { useEffect } from 'react';
import rilog from '@rilog-development/rilog-lib';

export default function RilogProvider() {
  useEffect(() => {
    rilog.init({ key: process.env.NEXT_PUBLIC_RILOG_KEY! });
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
import rilog from '@rilog-development/rilog-lib';
import App from './App.vue';

rilog.init({ key: 'YOUR_APP_KEY' });

createApp(App).mount('#app');
```

### Angular

```ts
// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import rilog from '@rilog-development/rilog-lib';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

rilog.init({ key: 'YOUR_APP_KEY' });

bootstrapApplication(AppComponent, appConfig);
```

## Змінні середовища

Зберігайте App Key поза вихідним кодом за допомогою змінних середовища:

```bash
# .env
VITE_RILOG_KEY=your-app-key
NEXT_PUBLIC_RILOG_KEY=your-app-key
```

```ts
// Vite
rilog.init({ key: import.meta.env.VITE_RILOG_KEY });

// Next.js
rilog.init({ key: process.env.NEXT_PUBLIC_RILOG_KEY! });
```
