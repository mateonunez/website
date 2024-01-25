import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';
import config from 'lib/config';
import { serialize } from 'next-mdx-remote/serialize';
// import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';


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
  const { frontMatter, content } = getArticleData({ slug });
  const compiledSource = await compileSource({ content, slug });
  const article = {
    frontMatter,
    source: compiledSource,
  };

  return article;
}
// const remarkPlugins = [[remarkGfm]];
const rehypePlugins = [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]];
const serializeOptions = {
  parserFormatter: false,
  mdxOptions: {
    // remarkPlugins, is not compatible with the current mdx-js version
    rehypePlugins,
  },
}

const compiledSourcesCached = new Map()
async function compileSource({ content, slug }) {
  const isCompiledSourceCached = compiledSourcesCached.has(slug);
  if (isCompiledSourceCached) {
    console.log('hit!');
    return compiledSourcesCached.get(slug);
  }

  const { compiledSource } = await serialize(content, serializeOptions);
  compiledSourcesCached.set(slug, compiledSource);
  return compiledSource;
}
