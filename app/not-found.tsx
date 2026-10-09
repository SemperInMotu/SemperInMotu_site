const bounce = `
(function () {
  var path = location.pathname;
  if (/\\/sitemap\\/?$/.test(path)) return;
  location.replace('/sitemap/');
})();
`;

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Page not found — Semper In Motu</title>
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content="0; url=/sitemap/" />
        <script dangerouslySetInnerHTML={{ __html: bounce }} />
      </head>
      <body>
        <p>
          Page not found. <a href="/sitemap/">Sitemap</a>
        </p>
      </body>
    </html>
  );
}
