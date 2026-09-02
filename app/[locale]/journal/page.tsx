import type { Metadata } from 'next';
import { type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  return pageMetadata({
    locale,
    path: '/journal',
    title: 'Journal — Semper In Motu',
    description: 'Semper In Motu Journal: ops AI, data and method notes.',
  });
}

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = (await params).locale as Locale;
  const isRu = locale === 'ru' || locale === 'be';

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">Journal</div>
          <h1>{isRu ? 'Заметки о системах' : 'Notes on systems'}</h1>
          <p className="lead">
            Ops AI, data and method. TG:{' '}
            <a href="https://t.me/N_FT210993" rel="noopener">
              @N_FT210993
            </a>
            .
          </p>
        </div>
      </section>
      <section className="section">
        <div className="wrap post-list">
          <article className="post">
            <span className="tag">Method</span>
            <h3>Audit, provenance, human-in-the-loop</h3>
            <p className="muted">
              {isRu
                ? 'Агент без следа — демо, не система. Одна логика для TMS и DWH.'
                : 'Why an agent without a trace is a demo, not a system. The same logic applies to a TMS and a data warehouse.'}
            </p>
          </article>
          <article className="post">
            <span className="tag">Ops</span>
            <h3>{isRu ? 'От звонка к CRM без «ещё одного чатбота»' : 'From a call to CRM records without “another chatbot”'}</h3>
            <p className="muted">
              {isRu
                ? 'Conversation intelligence как writeback с approve.'
                : 'Conversation intelligence as an approved writeback — not an answer for its own sake.'}
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
