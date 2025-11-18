/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false },
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/services/enterprise',
        permanent: true,
      },
      {
        source: '/services/development',
        destination: '/services/ekaer',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    // The locales you want to support in your app
    locales: ['en', 'de'],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
  eslint: {
    dirs: ['pages', 'providers', 'locales', 'components'], // Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  images: {
    domains: ['localhost', 'wesner-corporate-site.vercel.app'],
  },
};

module.exports = nextConfig;
