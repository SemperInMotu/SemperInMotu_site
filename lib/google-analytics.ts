export const GA_MEASUREMENT_ID = 'G-86FR8M650L';

const LOOPBACK_HOSTS = ['localhost', '127.0.0.1', '::1', '[::1]'] as const;

/** Loads gtag only off loopback, so local dev and local static preview stay quiet. */
export function googleAnalyticsSnippet(id: string = GA_MEASUREMENT_ID): string {
  const hosts = LOOPBACK_HOSTS.map((host) => JSON.stringify(host)).join(',');
  const measurementId = JSON.stringify(id);
  return `
(function () {
  var host = location.hostname;
  if ([${hosts}].indexOf(host) !== -1) return;
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ${measurementId});
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(${measurementId});
  document.head.appendChild(s);
})();
`.trim();
}
