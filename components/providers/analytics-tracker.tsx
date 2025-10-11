'use client';

import { usePageViewTracking } from '@/hooks/use-analytics';

export function AnalyticsTracker() {
  usePageViewTracking();
  return null;
}
