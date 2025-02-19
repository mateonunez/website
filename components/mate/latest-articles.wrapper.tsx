import { fetchLatestArticles } from '@/lib/articles/fetcher';
import { ArticlePreview } from '@/components/mate/article-preview';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function LatestArticlesWrapper() {
  const articles = await fetchLatestArticles(2);
  return (
    <div className="space-y-6">
      {articles.map((article) => (
        <ArticlePreview
          key={article.frontmatter.slug}
          title={article.frontmatter.title}
          description={article.frontmatter.description}
          author={article.frontmatter.author}
          date={article.frontmatter.date}
          image={article.frontmatter.image}
          slug={article.frontmatter.slug}
          tags={article.frontmatter.tags}
        />
      ))}
      <div className="mt-6 text-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/blog">View all articles</Link>
        </Button>
      </div>
    </div>
  );
}
