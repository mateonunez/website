import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import readingTime from 'reading-time';
import config from 'lib/config';
import { serialize } from 'next-mdx-remote/serialize';

export async function getArticleSlugs() {
  const fullPath = path.join(process.cwd(), './articles');
  const articles = readdirSync(fullPath);
  const slugs = articles.filter((file) => /\.mdx?$/.test(file)).map((file) => file.replace(/\.mdx?$/, ''));
  return slugs;
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs();
  const articles = [];
  for (const slug of slugs) {
    const article = await getArticle({ slug });
    articles.push(article);
  }
  return articles.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export async function getLastArticle() {
  const [lastArticle] = await getAllArticles();
  return lastArticle;
}

export function getRawArticle(slug) {
  const fullPath = path.join(process.cwd(), './articles', `${slug}.mdx`);
  const articleRaw = readFileSync(fullPath, 'utf8');
  return articleRaw;
}

export async function getArticle({ slug }) {
  const rawArticle = getRawArticle(slug);
  const { compiledSource, frontmatter } = await compile(rawArticle)

  const permalink = new URL(`/articles/${slug}`, config.baseUrl).toString();
  const timeToRead = readingTime(rawArticle);

  return {
    compiledSource,
    frontmatter: {
      ...frontmatter,
      slug,
      permalink,
      date: frontmatter.date ? new Date(frontmatter.date)?.toISOString() : new Date().toISOString(),
      readingTime: Math.ceil(timeToRead.minutes)
    }
  }
}

export function compile(articleRaw, options = { parseFrontmatter: true }) {
  return serialize(articleRaw, options);
}
