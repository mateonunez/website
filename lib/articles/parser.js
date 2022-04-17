import fs from 'fs';
import path from 'path';
import urlJoin from 'url-join';

import matter from 'gray-matter';
import removeMarkdown from 'remove-markdown';
import readingTime from 'reading-time';

import config from 'lib/config';

import { serialize } from 'next-mdx-remote/serialize';

// remark/rehype markdown plugins
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';

export const getArticleSlugs = () =>
  fs
    .readdirSync(path.join(process.cwd(), './articles'))
    .filter(file => /\.mdx?$/.test(file))
    .map(file => file.replace(/\.mdx?$/, ''));

export const getAllArticles = () =>
  getArticleSlugs()
    .map(slug => getArticleData({ slug }).frontMatter)
    .sort((a, b) => (a.date > b.date ? -1 : 1));

export const getLastArticle = () => getAllArticles()[0];

export const getArticleData = ({ slug }) => {
  const fullPath = path.join(process.cwd(), './articles', `${slug}.mdx`);
  const raw = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(raw);

  return {
    frontMatter: {
      ...data,
      title: removeMarkdown(data.title),
      slug,
      permalink: urlJoin(config.baseUrl, `/articles/${slug}`),
      date: new Date(data.date).toISOString(),
      readingTime: Math.ceil(readingTime(content).minutes)
    },
    content
  };
};

export const getArticle = async ({ slug }) => {
  const { frontMatter, content } = await getArticleData({ slug });

  const source = await serialize(content, {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [[remarkGfm]],
      rehypePlugins: [[rehypeSlug], [rehypePrism, { ignoreMissing: true }]]
    }
  });

  const { compiledSource } = source;

  return {
    frontMatter,
    source: {
      compiledSource
    }
  };
};
