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
    path: '/capabilities/engineering',
    title: locale === 'ru' ? 'Разработка ИИ — Semper In Motu' : 'AI Engineering — Semper In Motu',
    description:
      locale === 'ru'
        ? 'Агенты, интеграции, путь от черновика к промышленной эксплуатации с аудитом и человеком в контуре.'
        : 'Agents, integrations, shadow-to-prod delivery with audit and human-in-the-loop.',
  });
}

export default async function EngineeringCapabilityPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = asLocale((await params).locale);
  const isRu = locale === 'ru';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{isRu ? 'Практики' : 'Capabilities'}</div>
          <h1>{isRu ? 'Разработка ИИ' : 'AI Engineering'}</h1>
          <p className="lead">
            {isRu
              ? 'Гипотезу превращаем в сервис: приём данных → решение → запись в систему → журнал. Сначала черновик, потом промышленная эксплуатация.'
              : 'Turn a hypothesis into a service: ingest → decide → writeback → log. Shadow before prod.'}
          </p>
          <div className="cta-row">
            <Link className="btn btn-ink" href={`${localePath(locale, '/contact')}?topic=engineering`}>
              {isRu ? 'Обсудить разработку' : 'Discuss a build'}
            </Link>
            <Link className="btn btn-ghost" href={localePath(locale, '/products/poc')}>
              {isRu ? 'KPI-пилот →' : 'KPI POC →'}
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wrap grid-2">
          <div className="panel">
            <h2>{isRu ? 'Что сдаём' : 'What we deliver'}</h2>
            <ul className="list-clean">
              {isRu ? (
                <>
                  <li>Цепочка обработки + интеграции</li>
                  <li>Агенты как конечные автоматы (не бесконечный «думающий» цикл)</li>
                  <li>Подтверждение человеком · журнал действий</li>
                  <li>Проверки качества в CI · стоимость и задержки</li>
                  <li>Интерфейс для промышленной работы — где нужен</li>
                </>
              ) : (
                <>
                  <li>Pipeline + integrations</li>
                  <li>Agents as state machines (not endless ReAct)</li>
                  <li>HITL approve · audit lane</li>
                  <li>Eval in CI · cost / latency</li>
                  <li>Production UI where needed</li>
                </>
              )}
            </ul>
          </div>
          <div className="panel">
            <h2>{isRu ? 'Не берём' : 'We decline'}</h2>
            <ul className="list-clean">
              <li>{isRu ? 'Чат-бот без системы учёта' : 'Chatbot with no system of record'}</li>
              <li>{isRu ? 'Полная автономия на критичных операциях' : 'L3 autonomy on critical ops'}</li>
              <li>{isRu ? 'Пилот без метрики' : 'Pilots without a metric'}</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
