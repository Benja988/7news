/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hintflow.site',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/api/*', '/login', '/register', '/profile', '/admin'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/'],
      },
    ],
    additionalSitemaps: [
      'https://hintflow.site/server-sitemap.xml', // For dynamic content
    ],
  },
  transform: async (config, path) => {
    const priorities = {
      '/': 1.0,
      '/about': 0.8,
      '/newsroom': 0.8,
      '/contact': 0.7,
      '/careers': 0.6,
      '/articles': 0.9,
      '/categories': 0.8,
    };

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
