import Link from 'next/link';
import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

const methods = [
  {
    href: '/methods/kpi-poc',
    en: 'KPI POC',
    ru: 'KPI-пилот',
    dEn: '2 weeks · one UC · Go/No-Go',
    dRu: '2 недели · один сценарий · решение «идём / не идём»',
  },
  {
    href: '/methods/shadow-mode',
    en: 'Shadow mode',
    ru: 'Режим черновика',
    dEn: 'Draft → rising auto-approve %',
    dRu: 'Черновик → рост доли автоподтверждений',
  },
  {
    href: '/methods/audit-lane',
    en: 'Audit lane',
    ru: 'Журнал действий',
    dEn: 'who / when / why / source',
    dRu: 'кто / когда / зачем / из какого источника',
  },
  {
    href: '/methods/express-audit',
    en: 'Express audit',
    ru: 'Экспресс-аудит',
    dEn: '€500–900 · written findings',
    dRu: '€500–900 · письменное заключение',
  },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/methods',
    title: locale === 'ru' ? 'Методы — Semper In Motu' : 'Methods — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Как работаем: KPI-пилот, режим черновика, журнал действий, экспресс-аудит.'
        : 'How we work: KPI POC, shadow mode, audit lane, express audit.',
  });
}

export default async function MethodsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Методы' : 'Methods'}</div>
          <h1>{isRu ? 'Как работаем' : 'How we work'}</h1>
          <p className="lead">
            {isRu
              ? 'Проблема → данные → анализ → разработка → ИИ → промышленная эксплуатация. Не театр демо.'
              : 'Problem → data → analysis → engineering → AI → production. No demo theatre.'}
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          {methods.map((m) => (
            <Link key={m.href} className="card ops-card" href={localePath(locale, m.href)}>
              <h3>{isRu ? m.ru : m.en}</h3>
              <p>{isRu ? m.dRu : m.dEn}</p>
              <span className="more">→</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
