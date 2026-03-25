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
  ],
};

export default sidebars;
