import s from '@/styles/pages/blog/tags/[tag].module.css';

import { Container, Title } from '@/components';
import { getAllArticles } from '@/lib/articles/parser';
import { kebapCase } from '@/lib/helpers/string';
import ArticlePreview from '@/components/legacy/articles/preview';
import type { Metadata } from 'next';
import type { JSX } from 'react';
export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag } = await params;

  return {
    title: `> blog - ${tag}`,
  };
}

export default async function BlogTag({ params }: { params: Promise<{ tag: string }> }): Promise<JSX.Element> {
  const { tag } = await params;

  const articles = (await getAllArticles()).filter((article) => {
    return article.frontmatter.tags.map((tag) => kebapCase(tag)).includes(tag);
  });

  return (
    <Container clean>
      <Title>{tag}</Title>

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
