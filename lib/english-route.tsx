import type { Metadata } from 'next';
import type { ReactNode } from 'react';

type LocaleParams = { locale: string; [key: string]: string };
type ParamBag = Record<string, string | string[] | undefined>;

type LocaleModule = {
  default: (props: { params: Promise<LocaleParams> }) => ReactNode | Promise<ReactNode>;
  generateMetadata?: (props: { params: Promise<LocaleParams> }) => Metadata | Promise<Metadata>;
  generateStaticParams?: () => Array<Record<string, string>> | Promise<Array<Record<string, string>>>;
};

async function readParams(params: Promise<ParamBag> | ParamBag | undefined): Promise<ParamBag> {
  if (!params) return {};
  if (typeof (params as Promise<ParamBag>).then === 'function') return (params as Promise<ParamBag>);
  return params as ParamBag;
}

function withEnglish(extra: ParamBag): LocaleParams {
  const localeParams: LocaleParams = { locale: 'en' };
  for (const [key, value] of Object.entries(extra)) {
    if (key === 'locale') continue;
    if (typeof value === 'string') localeParams[key] = value;
  }
  return localeParams;
}

/** Render an existing `[locale]` page at the unprefixed English URL. */
export function bindEnglish(mod: LocaleModule) {
  async function generateMetadata({ params }: { params: Promise<ParamBag> }) {
    if (!mod.generateMetadata) return {};
    const extra = await readParams(params);
    return mod.generateMetadata({ params: Promise.resolve(withEnglish(extra)) });
  }

  async function Page({ params }: { params: Promise<ParamBag> }) {
    const extra = await readParams(params);
    return mod.default({ params: Promise.resolve(withEnglish(extra)) });
  }

  async function generateStaticParams() {
    if (!mod.generateStaticParams) return [];
    const rows = await mod.generateStaticParams();
    const seen = new Set<string>();
    const out: Array<Record<string, string>> = [];
    for (const row of rows) {
      const rest: Record<string, string> = {};
      for (const [key, value] of Object.entries(row)) {
        if (key !== 'locale' && typeof value === 'string') rest[key] = value;
      }
      const id = JSON.stringify(rest);
      if (seen.has(id)) continue;
      seen.add(id);
      out.push(rest);
    }
    return out;
  }

  return { generateMetadata, Page, generateStaticParams };
}
