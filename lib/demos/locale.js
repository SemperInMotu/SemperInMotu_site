export function detectLang() {
  if (typeof window === 'undefined') return 'en';
  const m = window.location.pathname.match(/^\/(en|ru|be)(?=\/|$)/);
  return m ? m[1] : 'en';
}

export function localePrefix(lang = detectLang()) {
  return lang === 'en' ? '' : `/${lang}`;
}
