import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function useLocale() {
  const { i18n } = useDocusaurusContext();
  return i18n.currentLocale;
}

function useT() {
  const locale = useLocale();
  return function t<T>(en: T, uk: T): T {
    return locale === 'uk' ? uk : en;
  };
}

export default function Home(): ReactNode {
  const t = useT();
  return (
    <Layout
      title={t(
        'Rilog — Analytics. Logging. Monitoring.',
        'Rilog — Аналітика. Логування. Моніторинг.'
      )}
      description={t(
        'Connect rilog-lib in 5 minutes and get full visibility into events, errors and user behaviour in one place.',
        'Підключіть rilog-lib за 5 хвилин і отримайте повну видимість подій, помилок і поведінки користувачів в одному місці.'
      )}
    >
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <EventTypesSection />
        <InstallSection />
      </main>
    </Layout>
  );
}

/* ===== HERO ===== */
function HeroSection() {
  const t = useT();
  return (
    <section className="hero-section">
      <div className="hero-badge">🚀 Now in open beta</div>
      <h1 className="hero-title">
        {t('Analytics.', 'Аналітика.')}<br />
        <span>{t('Logging.', 'Логування.')}</span><br />
        {t('Monitoring.', 'Моніторинг.')}
      </h1>
      <p className="hero-subtitle">
        {t(
          <>Connect <strong>rilog-lib</strong> in under 5 minutes and get full visibility into events, errors and user behaviour — all in one place. No complex setup, no infrastructure headaches.</>,
          <>Підключіть <strong>rilog-lib</strong> менш ніж за 5 хвилин та отримайте повний огляд подій, помилок та поведінки користувачів — все в одному місці. Без складного налаштування, без головних болів, пов'язаних з інфраструктурою.</>
        )}
      </p>
      <div className="hero-actions">
        <Link className="btn-primary" to="/docs/quick-start">
          {t('Quick Start →', 'Швидкий старт →')}
        </Link>
        <Link className="btn-secondary" to="/docs/intro">
          {t('Documentation', 'Документація')}
        </Link>
      </div>

      {/* Dashboard Preview */}
      <div className="dashboard-preview" style={{ maxWidth: 860, margin: '3rem auto 0' }}>
        <div className="dashboard-preview-bar">
          <div className="dot dot-red" />
          <div className="dot dot-yellow" />
          <div className="dot dot-green" />
          <span style={{ marginLeft: '0.75rem', fontSize: '0.78rem', color: '#6b7280' }}>
            {t('Rilog — connections page', 'Rilog — сторінка зʼєднань')}
          </span>
        </div>
        <div className="dashboard-preview-content">
          <img src="/img/main_banner.png" alt="Rilog Dashboard" style={{ width: '100%', display: 'block' }} />
        </div>
      </div>

      <div className="hero-stats" style={{ marginTop: '3rem' }}>
        <div className="stat-item">
          <div className="stat-number">5 min</div>
          <div className="stat-label">{t('to get started', 'максимум для налаштування')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">6+</div>
          <div className="stat-label">{t('event types tracked', 'різних типів подій')}</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">Real-time</div>
          <div className="stat-label">{t('error analytics', 'аналітика помилок')}</div>
        </div>
      </div>
    </section>
  );
}

/* ===== FEATURES ===== */
function FeaturesSection() {
  const t = useT();
  const features = [
    {
      icon: '🔍',
      title: 'HTTP Request Logging',
      desc: t(
        'Capture every request and response — status codes, headers, payload, timing — without touching your existing routes.',
        'Фіксуйте кожен запит і відповідь — коди стану, заголовки, корисне навантаження, час — без зміни існуючих маршрутів.'
      ),
    },
    {
      icon: '🚨',
      title: 'Error Monitoring',
      desc: t(
        'Errors are automatically captured and grouped by type — from console errors to failed requests.',
        'По кожній сторінці застосунку відслідковуються різні типи помилок від console errors до помилок в запитах.'
      ),
    },
    {
      icon: '📊',
      title: 'Analytics',
      desc: t(
        'See success rates, error rates, top failing endpoints and usage trends in one clean view.',
        'Переглядайте показники успішності, показники помилок, найчастіші точки збоїв та тенденції.'
      ),
    },
    {
      icon: '👤',
      title: 'User Behaviour',
      desc: t(
        'Track what users are doing — page visits, interactions, navigation flows — and understand how your app is really used.',
        'Відстежуйте дії користувачів — відвідування сторінок, взаємодії, процеси навігації — і розумійте, як насправді використовується ваш додаток.'
      ),
    },
    {
      icon: '🔗',
      title: 'Shareable Snapshots',
      desc: t(
        'Share any logged event with your team via a public link. Perfect for bug reports, debugging sessions, or code reviews.',
        'Поділіться будь-якою зареєстрованою подією зі своєю командою через публічне посилання. Ідеально для звітів про помилки, налагодження або перевірки коду.'
      ),
    },
    {
      icon: '⚡',
      title: 'Zero Config Start',
      desc: t(
        'Install, pass your key, done. Rilog works out of the box with sensible defaults you can override when needed.',
        'Встановіть, передайте свій ключ — і все. Rilog працює одразу після встановлення з розумними налаштуваннями за замовчуванням, які ви можете змінити за потреби.'
      ),
    },
  ];

  return (
    <section className="features-section">
      <div className="section-header">
        <div className="section-tag">Features</div>
        <h2 className="section-title">
          {t(
            'Everything you need to understand your app',
            'Все, що потрібно для розуміння вашого застосунку'
          )}
        </h2>
        <p className="section-desc">
          {t(
            'From low-level HTTP logs to high-level user analytics — Rilog gives you the full picture without the operational overhead.',
            'Від низькорівневих HTTP-логів до високорівневої аналітики користувачів — Rilog надає вам повну картину без операційних витрат.'
          )}
        </p>
      </div>
      <div className="features-grid">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== HOW IT WORKS ===== */
function HowItWorksSection() {
  const t = useT();
  return (
    <section className="how-section">
      <div className="section-header">
        <div className="section-tag">How it works</div>
        <h2 className="section-title">
          {t('Up and running in 3 steps', 'Підключення в 3 кроки')}
        </h2>
        <p className="section-desc">
          {t(
            'No servers to provision. No agents to install. Just a lightweight library and your connection key.',
            'Не потрібно налаштовувати сервери. Не потрібно встановлювати агенти. Тільки легка бібліотека та ваш ключ підключення.'
          )}
        </p>
      </div>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-title">
            {t('Create an app in Rilog', 'Створіть додаток в Rilog')}
          </div>
          <div className="step-desc">
            {t(
              'Sign up, create a new application in the Rilog dashboard, and copy your unique connection key. Takes about 30 seconds.',
              'Зареєструйтесь, створіть новий застосунок у дашборді Rilog та скопіюйте свій унікальний ключ підключення. Це займає близько 30 секунд.'
            )}
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-title">
            {t('Install rilog-lib', 'Встановіть rilog-lib')}
          </div>
          <div className="step-desc">
            {t(
              'Add the library to your project with npm or yarn, then initialise it with your key. Rilog starts capturing events immediately.',
              'Додайте бібліотеку до свого проєкту за допомогою npm або yarn, а потім ініціалізуйте її своїм ключем. Rilog одразу почне записувати події.'
            )}
          </div>
          <div className="step-code">
            <div><span style={{ color: '#f0b429' }}>import</span> Rilog <span style={{ color: '#f0b429' }}>from</span> <span style={{ color: '#b8f0e8' }}>'@rilog-development/rilog-lib'</span></div>
            <div>&nbsp;</div>
            <div>Rilog.<span style={{ color: '#3ecfbf' }}>init</span>({'{'} appKey: <span style={{ color: '#b8f0e8' }}>'YOUR_KEY'</span> {'}'})</div>
          </div>
        </div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-title">
            {t('Watch events flow in', 'Спостерігайте за потоком подій')}
          </div>
          <div className="step-desc">
            {t(
              'Open your Rilog dashboard. HTTP requests, errors and custom events start appearing in real time. Filter, inspect, share.',
              'Відкрийте дашборд Rilog. HTTP-запити, помилки і кастомні події починають з\'являтися в реальному часі. Фільтруйте, перевіряйте, діліться.'
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== EVENT TYPES ===== */
function EventTypesSection() {
  const t = useT();
  const events = [
    { icon: '🌐', label: 'HTTP Requests' },
    { icon: '🚨', label: 'JS Errors' },
    { icon: '🖱️', label: t('User Interactions', 'User Interactions') },
    { icon: '📡', label: t('Custom Events', 'Custom Events') },
  ];

  return (
    <section className="events-section">
      <div className="section-header">
        <div className="section-tag">Event Types</div>
        <h2 className="section-title">
          {t('Log what matters to you', 'Логуйте те, що важливо для вас')}
        </h2>
        <p className="section-desc">
          {t(
            'rilog-lib captures a wide range of event types automatically and lets you fire custom events whenever you need them.',
            'rilog-lib автоматично фіксує широкий спектр типів подій і дозволяє надсилати кастомні події коли завгодно.'
          )}
        </p>
      </div>
      <div className="events-grid">
        {events.map((e) => (
          <div className="event-pill" key={e.label}>
            <span className="event-pill-icon">{e.icon}</span>
            <span className="event-pill-text">{e.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ===== INSTALL CTA ===== */
function InstallSection() {
  const t = useT();
  return (
    <section className="install-section">
      <h2 className="install-title">
        {t('Start logging in minutes', 'Почніть логувати за хвилини')}
      </h2>
      <p className="install-subtitle">
        {t(
          'Free to start. No credit card required. Works with any JavaScript framework.',
          'Безкоштовний старт. Кредитна картка не потрібна. Працює з будь-яким JavaScript фреймворком.'
        )}
      </p>
      <div className="install-box">
        <span>$</span>
        <span>npm install @rilog-development/rilog-lib</span>
      </div>
      <div className="install-actions">
        <Link className="btn-light" to="/docs/quick-start">
          {t('Start guide', 'Швидкий старт')}
        </Link>
        <a className="btn-outline-light" href="https://www.rilog.online" target="_blank" rel="noopener noreferrer">
          {t('Open Rilog App →', 'Відкрити Rilog App →')}
        </a>
      </div>
    </section>
  );
}
