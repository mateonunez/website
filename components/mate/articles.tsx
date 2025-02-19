import { getAllArticles } from '@/lib/articles/parser';
import { ArticlePreview } from './article-preview';

export async function Articles() {
  const articles = await getAllArticles();
  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-lg text-muted-foreground">
          Welcome to my personal blog! Here, the community, and I share our thoughts and experiences.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticlePreview
            key={article.frontmatter.slug}
            title={article.frontmatter.title}
            description={article.frontmatter.description}
            date={article.frontmatter.date}
            slug={article.frontmatter.slug}
            author={article.frontmatter.author}
            image={article.frontmatter.image}
            tags={article.frontmatter.tags}
          />
        ))}
      </div>
    </div>
  );
}
