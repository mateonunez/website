'use client';

import { useScrollDepthTracking } from '@/hooks/use-analytics';

interface ArticleAnalyticsProps {
  title: string;
}

export function ArticleAnalytics({ title }: ArticleAnalyticsProps) {
  useScrollDepthTracking(title, true);
  return null;
}
