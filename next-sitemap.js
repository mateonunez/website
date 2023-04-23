const fs = require('fs');
const path = require('path');

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://mateonunez.dev',
  generateRobotsTxt: true,
  additionalPaths: () => {
    const result = [];
    const articleSlugs = fs
      .readdirSync(path.join(process.cwd(), './articles'))
      .filter(file => /\.mdx?$/.test(file))
      .map(file => file.replace(/\.mdx?$/, ''));

    for (const slug of articleSlugs) {
      result.push({
        loc: `/blog/${slug}`,
        changefreq: 'yearly',
        priority: 0.7,
        lastmod: new Date().toISOString()
      });
    }

    return result;
  }
};
