/** @type {import('next').NextConfig} */
const htmlOps = ['data', 'smart', 'poc', 'alfakit'];

const nextConfig = {
  trailingSlash: true,
  async redirects() {
    const redirects = [];

    for (const page of htmlOps) {
      redirects.push({
        source: `/ops/${page}.html`,
        destination: `/ops/${page}/`,
        permanent: true,
      });
      for (const locale of ['ru', 'be']) {
        redirects.push({
          source: `/${locale}/ops/${page}.html`,
          destination: `/${locale}/ops/${page}/`,
          permanent: true,
        });
      }
    }

    const heritagePaths = ['', 'research', 'report', 'start'];
    for (const sub of heritagePaths) {
      const tail = sub ? `/${sub}` : '';
      redirects.push({
        source: `/heritage${tail}`,
        destination: `https://heritavia.vitalykhoruzhko.com${tail}`,
        permanent: true,
      });
      redirects.push({
        source: `/heritage${tail}/`,
        destination: `https://heritavia.vitalykhoruzhko.com${tail}/`,
        permanent: true,
      });
      for (const locale of ['ru', 'be']) {
        redirects.push({
          source: `/${locale}/heritage${tail}`,
          destination: `https://heritavia.vitalykhoruzhko.com/${locale}${tail}`,
          permanent: true,
        });
        redirects.push({
          source: `/${locale}/heritage${tail}/`,
          destination: `https://heritavia.vitalykhoruzhko.com/${locale}${tail}/`,
          permanent: true,
        });
      }
    }

    redirects.push({
      source: '/en/:path*',
      destination: '/:path*',
      permanent: true,
    });

    return redirects;
  },
};

export default nextConfig;
