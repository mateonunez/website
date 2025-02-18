import s from '@/styles/pages/blog/index.module.css';

import { Container, Title } from '@/components';
import { getAllArticles } from '@/lib/articles/parser';
import ArticlePreview from '@/components/legacy/articles/preview';
import meta from '@/lib/config/metadata';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export const metadata: Metadata = {
  title: '> blog',
  description: `Articles written with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'blog', 'articles'],
};

export default async function Blog(): Promise<JSX.Element> {
  const articles = await getAllArticles();

  return (
    <Container clean>
      <Title>Blog</Title>

      <div className={s.root}>
        <div className="container">
          {articles.map((article) => (
            <ArticlePreview key={article.frontmatter.slug} {...article.frontmatter} />
          ))}
        </div>
      </div>
    </Container>
  );
}
