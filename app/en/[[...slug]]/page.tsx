import { journalPosts } from '@/lib/journal';
import { localePath } from '@/lib/i18n';
import { enAliasPaths } from '@/lib/sitemap-nav';

export function generateStaticParams() {
  const paths = new Set<string>([...enAliasPaths, ...journalPosts.map((post) => post.href)]);
  return [...paths].map((path) => ({
    slug: path.split('/').filter(Boolean),
  }));
}

export default async function EnglishAlias({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const path = slug?.length ? `/${slug.join('/')}` : '/';
  const dest = localePath('en', path);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={`https://semperinmotu.com${dest}`} />
        <meta name="robots" content="noindex" />
        <meta httpEquiv="refresh" content={`0; url=${dest}`} />
        <title>Redirecting…</title>
        <script dangerouslySetInnerHTML={{ __html: `location.replace(${JSON.stringify(dest)})` }} />
      </head>
      <body>
        <p>
          <a href={dest}>Continue</a>
        </p>
      </body>
    </html>
  );
}
