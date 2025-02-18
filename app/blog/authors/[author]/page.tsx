import s from '@/styles/pages/blog/authors/[author].module.css';

import { Container, Title } from '@/components';
import { getAllArticles } from '@/lib/articles/parser';
import ArticlePreview from '@/components/legacy/articles/preview';
import { kebapCase } from '@/lib/helpers/string';
import type { Metadata } from 'next';
import type { JSX } from 'react';

export async function generateMetadata({ params }: { params: Promise<{ author: string }> }): Promise<Metadata> {
  const { author } = await params;

  return {
    title: `> blog - ${author}`,
  };
}

export default async function BlogAuthor({ params }: { params: Promise<{ author: string }> }): Promise<JSX.Element> {
  const { author } = await params;

  const articles = (await getAllArticles()).filter((article) => kebapCase(article.frontmatter.author.name) === author);

  return (
    <Container clean>
      {/* Capitalize author */}
      <Title>{author.at(0).toUpperCase() + author.slice(1)}</Title>

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
