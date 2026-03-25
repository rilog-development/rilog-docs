---
id: installation
title: Installation
sidebar_label: Installation
---

# Installation

## Requirements

- Node.js 14 or later (for the build toolchain)
- A browser-based JavaScript application (React, Vue, Angular, Next.js, plain JS, etc.)
- A Rilog account and a valid App Key

## Install via npm

```bash
npm install @rilog-development/rilog-lib
```

## Install via yarn

```bash
yarn add @rilog-development/rilog-lib
```

## Install via pnpm

```bash
pnpm add @rilog-development/rilog-lib
```

## Framework-specific setup

### React / Vite

Put the initialisation call in your entry file, before `ReactDOM.createRoot`:

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

Create a client component that initialises Rilog and render it in your root layout:

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

## Environment variables

Keep your App Key out of source code by using an environment variable:

```bash
# .env
VITE_RILOG_KEY=rl_live_xxxxxxxxxxxx
NEXT_PUBLIC_RILOG_KEY=rl_live_xxxxxxxxxxxx
```

```ts
Rilog.init({ appKey: import.meta.env.VITE_RILOG_KEY });
// or for Next.js:
Rilog.init({ appKey: process.env.NEXT_PUBLIC_RILOG_KEY! });
```

:::caution
App Keys are client-side credentials — they identify your app but don't grant write access to data. Still, it's good practice to use environment variables and keep them out of public repositories.
:::
