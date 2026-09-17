import Link from 'next/link';
import type { Metadata } from 'next';
import { alfakitUrl, localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/engage',
    title: 'Engage — Semper In Motu',
    description: 'How to buy: discovery, express audit, KPI POC, build, retainer.',
  });
}

export default async function EngagePage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  const rows = isRu
    ? [
        ['Discovery', '30 мин'],
        ['Express audit', '€500–900'],
        ['KPI POC', '2 нед, фикс'],
        ['Build', 'после диагностики'],
        ['Retainer / Care', 'Domino → alfakit.by; ops AI — отдельный контур'],
      ]
    : [
        ['Discovery', '30 min'],
        ['Express audit', '€500–900'],
        ['KPI POC', '2 weeks, fixed'],
        ['Build', 'after diagnostics'],
        ['Retainer / Care', 'Domino → alfakit.by; ops AI — separate contour'],
      ];

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Engage</div>
          <h1>{isRu ? 'Как купить' : 'How to buy'}</h1>
          <p className="lead">
            {isRu
              ? 'Можно с одной задачи. Полный путь — не обязательный пакет.'
              : 'A single task is enough. The full path is optional, not a forced bundle.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap panel">
          <table className="list-clean" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map(([a, b]) => (
                <tr key={a}>
                  <td style={{ padding: '0.5rem 0.75rem 0.5rem 0', fontWeight: 600 }}>{a}</td>
                  <td style={{ padding: '0.5rem 0', opacity: 0.85 }}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="cta-row" style={{ marginTop: '1.25rem' }}>
            <Link className="btn btn-ink" href={localePath(locale, '/contact')}>
              {isRu ? 'Написать' : 'Contact'}
            </Link>
            <Link className="btn btn-line" href={localePath(locale, '/methods/express-audit')}>
              Express audit →
            </Link>
            <a className="btn btn-line" href={alfakitUrl(locale)}>
              alfakit.by →
            </a>
          </div>
          <p className="fine" style={{ marginTop: '1.25rem' }}>
            {isRu
              ? 'Не для кого: чат GPT без системы записи · L3 на критичных операциях · пилот без KPI.'
              : 'Not for: GPT chat with no system of record · L3 on critical ops · pilots without KPI.'}
          </p>
        </div>
      </section>
    </main>
  );
}
