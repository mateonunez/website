import Link from 'next/link';
import { ArticlePreview } from '@/components/mate/article-preview';
import { AnimatedContainer, AnimatedItem } from '@/components/ui/animated-container';
import { Button } from '@/components/ui/button';
import { fetchLatestArticles } from '@/lib/articles/fetcher';

export async function LatestArticlesContainer() {
  const articles = await fetchLatestArticles(2);
  return (
    <AnimatedContainer animation="staggerContainer" className="space-y-6">
      {articles.map((article, index) => (
        <AnimatedItem key={article.frontmatter.slug} delay={index * 0.1}>
          <ArticlePreview
            title={article.frontmatter.title}
            description={article.frontmatter.description}
            author={article.frontmatter.author}
            date={article.frontmatter.date}
            image={article.frontmatter.image}
            slug={article.frontmatter.slug}
            tags={article.frontmatter.tags}
            priority={index === 0}
          />
        </AnimatedItem>
      ))}
      <AnimatedItem delay={0.3}>
        <div className="flex justify-center mt-6">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog">View all articles</Link>
          </Button>
        </div>
      </AnimatedItem>
    </AnimatedContainer>
  );
}
