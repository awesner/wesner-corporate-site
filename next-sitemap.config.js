/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.wesner-software.de',
  generateRobotsTxt: true,

  exclude: [
    '/api/*',
    '/404',
    '/de/404',
    '/en/404',
    '/500',
    '/de/500',
    '/en/500',

    '/auth/*',
    '/de/auth/*',
    '/en/auth/*',

    '/umsetzung',
    '/de/umsetzung',
    '/en/umsetzung',
    '/umsetzungsplan',
    '/de/umsetzungsplan',
    '/en/umsetzungsplan',

    '/case-studies',
    '/de/case-studies',
    '/en/case-studies',
    '/case-studies/*',
    '/de/case-studies/*',
    '/en/case-studies/*',
  ],

  // Verbot zum Scannen von ROBOTS.TXT
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/404',
          '/de/404',
          '/en/404',
          '/500',
          '/de/500',
          '/en/500',
          '/auth/',
          '/de/auth/',
          '/en/auth/',
          '/umsetzung',
          '/de/umsetzung',
          '/en/umsetzung',
          '/umsetzungsplan',
          '/de/umsetzungsplan',
          '/en/umsetzungsplan',
          '/case-studies',
          '/de/case-studies',
          '/en/case-studies',
          '/case-studies/',
          '/de/case-studies/',
          '/en/case-studies/',
        ],
      },
    ],
  },
};
