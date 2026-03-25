import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'category',
      label: '🚀 Початок роботи',
      collapsed: false,
      items: ['intro', 'quick-start'],
    },
    {
      type: 'category',
      label: '📦 rilog-lib',
      collapsed: false,
      items: [
        'rilog-lib/overview',
        'rilog-lib/installation',
        'rilog-lib/configuration',
        'rilog-lib/api',
        'rilog-lib/event-types',
      ],
    },
    {
      type: 'category',
      label: '🖥️ Rilog App',
      collapsed: false,
      items: [
        'app/overview',
        'app/creating-application',
        'app/connections',
        'app/event-viewer',
        'app/analytics',
        'app/sharing',
      ],
    },
  ],
};

export default sidebars;
