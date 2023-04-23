import { promises } from 'fs';
import path from 'path';
import urlJoin from 'url-join';

import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';
import { minify } from 'terser';

import config from 'lib/config';

import { serialize } from 'next-mdx-remote/serialize';

// remark/rehype markdown plugins
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';

export async function getArticleSlugs() {
  const fullPath = path.join(process.cwd(), './articles');
  const articles = await promises.readdir(fullPath);
  const slugs = articles
    .filter(file => /\.mdx?$/.test(file))
    .map(file => file.replace(/\.mdx?$/, ''));
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
  return await getAllArticles()[0];
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

  return {
    frontMatter: {
      ...data,
      title: removeMarkdown(data.title),
      slug,
      permalink: urlJoin(config.baseUrl, `/articles/${slug}`),
      date: data?.date ? new Date(data.date)?.toISOString() : new Date().toISOString(),
      readingTime: Math.ceil(readingTime(content).minutes)
    },
    content
  };
}

export async function getArticle({ slug }) {
  const { frontMatter, content } = await getArticleData({ slug });

  const compiledSource = await compileSource({ content });
  const minifiedSource = await minifySource({ compiledSource });

  return {
    frontMatter,
    source: minifiedSource
  };
}

async function compileSource({ content }) {
  const { compiledSource } = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
      rehypePlugins: [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]]
    }
  });

  return compiledSource;
}

async function minifySource({ compiledSource }) {
  const { code } = await minify(compiledSource, {
    ecma: 2020,
    module: true,
    parse: {
      bare_returns: true
    },
    compress: {
      defaults: true
    },
    sourceMap: false
  });

  return code;
}
