import Link from 'next/link';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { FormSentStatus } from '@/components/FormSentStatus';
import { contactCopy, pick } from '@/lib/copy';
import { localePath, siteUrl, type Locale } from '@/lib/i18n';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = pick(contactCopy, locale as Locale);
  return pageMetadata({
    locale: locale as Locale,
    path: '/contact',
    title: copy.title,
    description: copy.description,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = raw as Locale;
  const copy = pick(contactCopy, locale);

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">{copy.eyebrow}</div>
          <h1>{copy.h1}</h1>
          <p className="lead" dangerouslySetInnerHTML={{ __html: copy.leadHtml }} />
        </div>
      </section>
      <section className="section">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <Suspense fallback={null}>
            <FormSentStatus locale={locale} />
          </Suspense>
          <form
            className="panel lead-form"
            action="https://formsubmit.co/info@semperinmotu.com"
            method="POST"
          >
            <input type="hidden" name="_subject" value="semperinmotu.com — enquiry" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={`${siteUrl(locale, '/contact')}?sent=1`} />
            <input
              type="text"
              name="_honey"
              defaultValue=""
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: -9999, height: 0, width: 0, opacity: 0 }}
            />
            <label htmlFor="topic">{copy.topic}</label>
            <select id="topic" name="topic" required defaultValue="ops">
              {copy.topics.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <label htmlFor="name">{copy.name}</label>
            <input id="name" name="name" required autoComplete="name" />
            <label htmlFor="email">{copy.email}</label>
            <input id="email" name="email" type="email" required autoComplete="email" />
            <label htmlFor="company">{copy.company}</label>
            <input id="company" name="company" autoComplete="organization" />
            <label htmlFor="message">{copy.message}</label>
            <textarea id="message" name="message" required />
            <div className="form-actions">
              <button className="btn btn-ink" type="submit">
                {copy.send}
              </button>
            </div>
            <ul className="channels" style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
              <li>
                <a href="https://t.me/N_FT210993" rel="noopener">
                  Telegram
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vitalykhoruzhko" rel="noopener">
                  LinkedIn
                </a>
              </li>
            </ul>
            <p className="form-note fine">{copy.privacy}</p>
          </form>
        </div>
      </section>
    </main>
  );
}
