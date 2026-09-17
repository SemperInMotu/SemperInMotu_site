import Link from 'next/link';
import type { Metadata } from 'next';
import { localePath, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/capabilities/engineering',
    title: 'AI Engineering — Semper In Motu',
    description: 'Agents, integrations, shadow-to-prod delivery with audit and human-in-the-loop.',
  });
}

export default async function EngineeringCapabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Capabilities</div>
          <h1>AI Engineering</h1>
          <p className="lead">
            {isRu
              ? 'Гипотезу превращаем в сервис: ingest → decide → writeback → log. Shadow mode до prod.'
              : 'Turn a hypothesis into a service: ingest → decide → writeback → log. Shadow before prod.'}
          </p>
          <div className="cta-row">
            <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=engineering`}>
              {isRu ? 'Обсудить build' : 'Discuss a build'}
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/products/poc')}>
              KPI POC →
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Что сдаём' : 'What we deliver'}</h2>
            <ul className="list-clean">
              <li>Pipeline + integrations</li>
              <li>Agents as state machines (not endless ReAct)</li>
              <li>HITL approve · audit lane</li>
              <li>Eval in CI · cost / latency</li>
              <li>Production UI where needed</li>
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Не берём' : 'We decline'}</h2>
            <ul className="list-clean">
              <li>{isRu ? 'Чатбот без системы записи' : 'Chatbot with no system of record'}</li>
              <li>L3 autonomy on critical ops</li>
              <li>{isRu ? 'Пилот без метрики' : 'Pilotots without a metric'}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
