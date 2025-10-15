'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { trackContent, trackPageView } from '@/lib/analytics';

export function usePageViewTracking() {
  const pathname = usePathname();
  const lastPathname = useRef<string | null>(null);

  useEffect(() => {
    if (pathname && pathname !== lastPathname.current) {
      trackPageView(pathname, document.title);
      lastPathname.current = pathname;
    }
  }, [pathname]);
}

export function useScrollDepthTracking(title: string, isArticle: boolean = false) {
  const hasTracked25 = useRef(false);
  const hasTracked50 = useRef(false);
  const hasTracked75 = useRef(false);
  const hasTracked100 = useRef(false);

  useEffect(() => {
    if (!isArticle) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent >= 95 && !hasTracked100.current) {
        hasTracked100.current = true;
        trackContent.articleCompleted(title, 100);
      }
      if (scrollPercent >= 75 && !hasTracked75.current) {
        hasTracked75.current = true;
        trackContent.articleScrolled(title, 75);
      }
      if (scrollPercent >= 50 && !hasTracked50.current) {
        hasTracked50.current = true;
        trackContent.articleScrolled(title, 50);
      }
      if (scrollPercent >= 25 && !hasTracked25.current) {
        hasTracked25.current = true;
        trackContent.articleScrolled(title, 25);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [title, isArticle]);
}

export function useTimeOnPage(pageName: string) {
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    startTime.current = Date.now();

    return () => {
      const timeSpent = Date.now() - startTime.current;
      if (timeSpent > 3000) {
        trackContent.timeOnPage(pageName, Math.round(timeSpent / 1000));
      }
    };
  }, [pageName]);
}
