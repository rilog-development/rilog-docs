import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Rilog',
  tagline: 'Analytics. Logging. Monitoring.',
  favicon: 'img/favicon.ico',

  headTags: [
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/img/favicon-32x32.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/img/favicon-16x16.png' } },
    { tagName: 'link', attributes: { rel: 'apple-touch-icon', sizes: '180x180', href: '/img/apple-touch-icon.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/img/android-chrome-192x192.png' } },
    { tagName: 'link', attributes: { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/img/android-chrome-512x512.png' } },
  ],

  future: {
    v4: true,
  },

  url: 'https://rilog.online',
  baseUrl: '/',

  organizationName: 'rilog',
  projectName: 'rilog-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'uk',
    locales: ['uk', 'en'],
    localeConfigs: {
      uk: { label: 'Українська', direction: 'ltr' },
      en: { label: 'English', direction: 'ltr' },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/rilog-social.png',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'Rilog',
        src: 'img/logo.svg',
        href: '/',
      },
      items: [
        { to: '/docs/intro', label: 'Документація', position: 'left' },
        { to: '/docs/quick-start', label: 'Швидкий старт', position: 'left' },
        { to: '/docs/rilog-lib/overview', label: 'rilog-lib', position: 'left' },
        {
          href: 'https://www.npmjs.com/package/@rilog-development/rilog-lib',
          label: 'NPM',
          position: 'left',
        },
        {
          href: 'https://www.rilog.online',
          label: 'Відкрити додаток',
          position: 'right',
          className: 'navbar-cta-button',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Документація',
          items: [
            { label: 'Вступ', to: '/docs/intro' },
            { label: 'Швидкий старт', to: '/docs/quick-start' },
            { label: 'rilog-lib', to: '/docs/rilog-lib/overview' },
            { label: 'Rilog App', to: '/docs/app/overview' },
          ],
        },
        {
          title: 'Ресурси',
          items: [
            { label: 'NPM Package', href: 'https://www.npmjs.com/package/@rilog-development/rilog-lib' },
            { label: 'Відкрити Rilog App', href: 'https://www.rilog.online' },
          ],
        },
        {
          title: 'Підтримка',
          items: [
            { label: "Зворотний зв'язок", href: 'https://www.rilog.online' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Rilog. All rights reserved.`,
    },
    prism: {
      theme: prismThemes.vsDark,
      darkTheme: prismThemes.vsDark,
      additionalLanguages: ['bash', 'typescript', 'javascript', 'json'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
