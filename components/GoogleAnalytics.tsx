import { googleAnalyticsSnippet } from '@/lib/google-analytics';

export function GoogleAnalytics() {
  return <script id="google-analytics" dangerouslySetInnerHTML={{ __html: googleAnalyticsSnippet() }} />;
}
