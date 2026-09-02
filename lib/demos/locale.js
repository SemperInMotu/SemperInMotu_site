const BASE =
  typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : '';

function pathnameWithoutBase() {
  if (typeof window === 'undefined') return '/';
  let path = window.location.pathname;
  if (BASE && path.startsWith(BASE)) {
    path = path.slice(BASE.length) || '/';
  }
  return path;
}

export function detectLang() {
  if (typeof window === 'undefined') return 'en';
  const m = pathnameWithoutBase().match(/^\/(en|ru|be)(?=\/|$)/);
  return m ? m[1] : 'en';
}

export function localePrefix(lang = detectLang()) {
  return `/${lang}`;
}
