import { getAllArticles } from '@/lib/articles/parser';
import { ArticlePreview } from './article-preview';

export async function Articles() {
  const articles = await getAllArticles();

  // Filter non-translated articles once (server-side, so useMemo not needed)
  const nonTranslatedArticles = articles.filter((article) => !article.frontmatter.translated);
  const featuredArticle = nonTranslatedArticles[0];
  const remainingArticles = nonTranslatedArticles.slice(1);

  return (
    <div>
      <div className="mb-6 text-center">
        <p className="text-lg text-muted-foreground">
          Welcome to my personal blog! Here, the community, and I share our thoughts and experiences.
        </p>
      </div>

      {featuredArticle && (
        <div className="featured-section mb-8">
          <ArticlePreview
            key={featuredArticle.frontmatter.slug}
            title={featuredArticle.frontmatter.title}
            description={featuredArticle.frontmatter.description}
            date={featuredArticle.frontmatter.date}
            slug={featuredArticle.frontmatter.slug}
            author={featuredArticle.frontmatter.author}
            image={featuredArticle.frontmatter.image}
            tags={featuredArticle.frontmatter.tags}
            priority
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {remainingArticles.map((article) => (
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
