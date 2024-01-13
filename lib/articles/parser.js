import { readFileSync, readdirSync } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';
import config from 'lib/config';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';

const compiledArticles = new Map();

export function getArticleSlugs() {
  const fullPath = path.join(process.cwd(), './articles');
  const articles = readdirSync(fullPath);
  const slugs = articles.filter((file) => /\.mdx?$/.test(file)).map((file) => file.replace(/\.mdx?$/, ''));
  return slugs;
}

export async function getAllArticles() {
  const slugs = getArticleSlugs();
  const articles = [];
  for (const slug of slugs) {
    const { frontMatter } = await getArticleData({ slug });
    articles.push(frontMatter);
  }
  return articles.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getLastArticle() {
  const [lastArticle] = await getAllArticles();
  return lastArticle;
}

const articlesCache = new Map();
function getArticleData({ slug }) {
  if (articlesCache.has(slug)) {
    return articlesCache.get(slug);
  }

  const fullPath = path.join(process.cwd(), './articles', `${slug}.mdx`);
  const raw = readFileSync(fullPath, 'utf8');
  // const response = await fetch('https://raw.githubusercontent.com/mateonunez/website/main/articles/asterism-the-bf-of-lyra.mdx')
  // const raw = await response.text();
  const parsedData = parseArticleData({ raw, slug });

  articlesCache.set(slug, parsedData);

  return parsedData;
}

function parseArticleData({ raw, slug = '' }) {
  const { data, content } = matter(raw);

  const baseUrl = new URL(config.baseUrl);
  const articlePath = `/articles/${slug}`;
  const permalink = new URL(articlePath, baseUrl).toString();

  return {
    frontMatter: {
      ...data,
      title: removeMarkdown(data.title),
      slug,
      permalink: permalink,
      date: data?.date ? new Date(data.date)?.toISOString() : new Date().toISOString(),
      readingTime: Math.ceil(readingTime(content).minutes),
    },
    content,
  };
}

export async function getArticle({ slug }) {
  const { frontMatter, content } = await getArticleData({ slug });

  if (compiledArticles.has(slug)) {
    console.log('hit cache');
    return {
      frontMatter,
      source: compiledArticles.get(slug),
    };
  }

  // const compiledSource = await compileSource({ content });
  compiledArticles.set(slug, content);

  return {
    frontMatter,
    source: content,
  };
}

async function compileSource({ content }) {
  const { compiledSource } = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
      rehypePlugins: [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]],
    },
  });

  return compiledSource;
}
