'use client';

import { Github, Star, X } from 'lucide-react';
import Link from 'next/link';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import personal from '@/lib/config/personal';
import { cn } from '@/lib/utils';
import { githubStarBannerCookie } from '@/lib/utils/cookies/github-star-banner.cookie';

export function GithubStarBanner(): JSX.Element | null {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    const shouldShow = githubStarBannerCookie.shouldShowBanner();
    setIsVisible(shouldShow);
  }, []);

  const handleDismiss = () => {
    setIsAnimatingOut(true);
    githubStarBannerCookie.set();
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) {
    return null;
  }

  const repoUrl = `https://github.com/${personal.social.github}/website`;

  return (
    <div
      className={cn(
        'sticky top-[64px] z-40 w-full border-b bg-primary/10 backdrop-blur-md supports-backdrop-filter:bg-primary/5 transition-all duration-300',
        isAnimatingOut ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0',
      )}
    >
      <div className="w-full px-4 md:px-6 py-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="flex items-center gap-2 text-sm text-foreground flex-1 min-w-0">
            <Github className="h-4 w-4 shrink-0 text-primary" />
            <span className="hidden md:block truncate">
              If you find this website useful, consider starring it on GitHub.
            </span>
            <span className="md:hidden truncate">Consider starring it on GitHub.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button size="sm" variant="default" asChild className="gap-1.5 whitespace-nowrap">
              <Link href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Star on GitHub">
                <Star className="h-3.5 w-3.5 shrink-0" />
                <span>Star</span>
              </Link>
            </Button>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="h-8 w-8 p-0 shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
