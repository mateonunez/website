import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc';
import readingTime from 'reading-time';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import mdxComponents from '@/components/mdx';
import config from '@/lib/config';
import personal from '@/lib/config/personal';
import type { Article, ArticleFrontmatter } from '@/types/article';

export async function getArticleSlugs(): Promise<string[]> {
  const fullPath = path.join(process.cwd(), './articles');
  const articles = readdirSync(fullPath);
  const slugs = articles.filter((file) => /\.mdx?$/.test(file)).map((file) => file.replace(/\.mdx?$/, ''));
  return slugs;
}

export async function getAllArticles(): Promise<Article[]> {
  const slugs = await getArticleSlugs();
  const articles: Article[] = [];
  for (const slug of slugs) {
    const article = await getArticle({ slug });
    articles.push(article);
  }
  return articles.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export async function getLastArticle(): Promise<Article> {
  const [lastArticle] = await getAllArticles();
  return lastArticle;
}

export async function getRelatedArticles(currentArticle: ArticleFrontmatter): Promise<Article[]> {
  const allArticles = await getAllArticles();
  const related = allArticles
    .filter((article) => article.frontmatter.slug !== currentArticle.slug)
    .filter((article) => article.frontmatter.tags.some((tag) => currentArticle.tags.includes(tag)));

  return related.slice(0, config.article.relatedArticles);
}

export function getRawArticle(slug: string): string {
  const fullPath = path.join(process.cwd(), './articles', `${slug}.mdx`);
  const articleRaw = readFileSync(fullPath, 'utf8');
  return articleRaw;
}

export async function getArticle({ slug }: { slug: string }): Promise<Article> {
  const rawArticle = getRawArticle(slug);
  const { content, frontmatter } = await compile(rawArticle);

  const permalink = new URL(`/articles/${slug}`, config.baseUrl).toString();
  const timeToRead = readingTime(rawArticle);

  const defaultAuthor = {
    name: personal.name,
    url: `https://github.com/${personal.social.github}`,
    image: new URL(personal.assets.avatar, personal.website).toString(),
  };

  return {
    content,
    frontmatter: {
      title: frontmatter.title as string,
      description: frontmatter.description as string,
      date: frontmatter.date ? new Date(frontmatter.date as string).toISOString() : new Date().toISOString(),
      slug,
      permalink,
      readingTime: Math.ceil(timeToRead.minutes),
      tags: (frontmatter.tags as string[]) || [],
      categories: (frontmatter.categories as string[]) || [],
      image: (frontmatter.image as string) || '/card.png',
      author: (frontmatter.author as ArticleFrontmatter['author']) || defaultAuthor,
      translated: frontmatter.translated || false,
    },
  };
}

export async function compile(articleRaw: string) {
  const { content, frontmatter } = await compileMDX({
    source: articleRaw,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [[rehypeSlug]],
      },
    },
  });

  return { content, frontmatter };
}
