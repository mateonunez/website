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

      {articles.length > 0 && !articles[0].frontmatter.translated && (
        <div className="featured-section mb-8">
          <ArticlePreview
            key={articles[0].frontmatter.slug}
            title={articles[0].frontmatter.title}
            description={articles[0].frontmatter.description}
            date={articles[0].frontmatter.date}
            slug={articles[0].frontmatter.slug}
            author={articles[0].frontmatter.author}
            image={articles[0].frontmatter.image}
            tags={articles[0].frontmatter.tags}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {articles
          .slice(1)
          .filter((article) => !article.frontmatter.translated)
          .map((article) => (
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
