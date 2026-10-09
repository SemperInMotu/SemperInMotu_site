import Link from 'next/link';
import type { Metadata } from 'next';
import { asLocale, localePath } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = asLocale((await params).locale);
  return pageMetadata({
    locale,
    path: '/solutions',
    title: locale === 'ru' ? 'Решения — Semper In Motu' : 'Solutions — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Контуры бизнеса: логистика, продажи, операции — ИИ с аудитом.'
        : 'Business contours: logistics, sales ops, operations — AI with audit.',
  });
}

const items = [
  {
    href: '/solutions/logistics',
    en: { t: 'Logistics', d: 'TMS/CRM · SMART · OTIF — our strongest proof.' },
    ru: { t: 'Логистика', d: 'TMS/CRM · SMART · своевременность доставок — наш главный доказанный опыт.' },
  },
  {
    href: '/solutions/sales-ops',
    en: { t: 'Sales ops', d: 'Calls → extract → approve → CRM.' },
    ru: { t: 'Продажи', d: 'Звонки → извлечение → подтверждение → CRM.' },
  },
  {
    href: '/solutions/operations',
    en: { t: 'Operations', d: 'Exception desk · SOP Q&A · HITL.' },
    ru: { t: 'Операции', d: 'Стол исключений · ответы по регламентам · человек в контуре.' },
  },
] as const;

export default async function SolutionsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Решения' : 'Solutions'}</div>
          <h1>{isRu ? 'Где в бизнесе это живёт' : 'Where this lives in the business'}</h1>
          <p className="lead">
            {isRu
              ? 'Не отрасли ради списка — контуры, в которых уже умеем сдавать результат.'
              : 'Not a vanity industry list — contours where we already ship.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-3">
          {items.map((i) => {
            const c = isRu ? i.ru : i.en;
            return (
              <Link key={i.href} className="card ops-card" href={localePath(locale, i.href)}>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
                <span className="more">{isRu ? 'Открыть →' : 'Open →'}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
