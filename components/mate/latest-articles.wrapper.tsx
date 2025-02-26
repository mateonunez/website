import dynamic from 'next/dynamic';
import { ArticlePreviewSkeleton } from './article-preview.skeleton';

const LatestArticles = dynamic(
  () => import('@/components/mate/latest-articles.container').then((mod) => mod.LatestArticlesContainer),
  {
    loading: () => (
      <div className="space-y-6">
        <ArticlePreviewSkeleton />
        <ArticlePreviewSkeleton />
      </div>
    ),
  },
);

export default function LatestArticlesWrapper() {
  return <LatestArticles />;
}
