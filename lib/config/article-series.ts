export interface ArticleSeries {
  name: string;
  description: string;
  articles: {
    title: string;
    slug: string;
    order: number;
  }[];
}

export const articleSeries: Record<string, ArticleSeries> = {
  'node-test-runner': {
    name: 'You Should Use node:test',
    description: 'A comprehensive guide to migrating to and using the Node.js native test runner',
    articles: [
      {
        title: 'You should use `node:test` - Act One',
        slug: 'you-should-use-node-test-act-one',
        order: 1,
      },
      {
        title: 'You should use `node:test` - Act Two',
        slug: 'you-should-use-node-test-act-two',
        order: 2,
      },
    ],
  },
};

export function getArticleSeries(slug: string): ArticleSeries | null {
  for (const series of Object.values(articleSeries)) {
    if (series.articles.some((article) => article.slug === slug)) {
      return series;
    }
  }
  return null;
}

export function getSeriesOrder(slug: string, series?: ArticleSeries | null): number | null {
  const targetSeries = series ?? getArticleSeries(slug);
  if (!targetSeries) return null;

  const article = targetSeries.articles.find((article) => article.slug === slug);
  return article?.order ?? null;
}
