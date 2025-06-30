import { NextResponse } from 'next/server';
import { getAllArticles } from '@/lib/articles/parser';
import config from '@/lib/config';
import personal from '@/lib/config/personal';

export async function GET() {
  try {
    const articles = await getAllArticles();

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${personal.site.name}</title>
    <description>${personal.site.description}</description>
    <link>${config.baseUrl}</link>
    <language>en-us</language>
    <managingEditor>${personal.email} (${personal.name})</managingEditor>
    <webMaster>${personal.email} (${personal.name})</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${config.baseUrl}/api/rss" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.frontmatter.title}]]></title>
      <description><![CDATA[${article.frontmatter.description}]]></description>
      <link>${article.frontmatter.permalink}</link>
      <guid isPermaLink="true">${article.frontmatter.permalink}</guid>
      <pubDate>${new Date(article.frontmatter.date).toUTCString()}</pubDate>
      <author>${article.frontmatter.author.name}</author>
      ${article.frontmatter.tags.map(tag => `<category>${tag}</category>`).join('\n      ')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
