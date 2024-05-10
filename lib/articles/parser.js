import { promises } from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';

import config from 'lib/config';

import { serialize } from 'next-mdx-remote/serialize';

// remark/rehype markdown plugins
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';

export async function getArticleSlugs() {
  const fullPath = path.join(process.cwd(), './articles');
  const articles = await promises.readdir(fullPath);
  const slugs = articles.filter((file) => /\.mdx?$/.test(file)).map((file) => file.replace(/\.mdx?$/, ''));
  return slugs;
}

export async function getAllArticles() {
  const slugs = await getArticleSlugs();
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
async function getArticleData({ slug }) {
  if (articlesCache.has(slug)) {
    return articlesCache.get(slug);
  }

  const fullPath = path.join(process.cwd(), './articles', `${slug}.mdx`);
  const raw = await promises.readFile(fullPath, 'utf8');
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
  const compiledSource = await compileSource({ content });
  const article = {
    frontMatter,
    source: compiledSource,
  };

  return article;
}

const remarkPlugins = [[remarkGfm]];
const rehypePlugins = [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]];
const serializeOptions = {
  parserFormatter: false,
  mdxOptions: {
    remarkPlugins,
    rehypePlugins,
  },
};

async function compileSource({ content }) {
  const { compiledSource } = await serialize(content, serializeOptions);

  return compiledSource;
}
