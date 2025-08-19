'use client';

import Link from 'next/link';
import type { JSX } from 'react';
import { Button } from '@/components/ui/button';
import personal from '@/lib/config/personal';
import { getFooterSocialLinks, getSocialLinkUrl } from '@/lib/config/social';

export function Footer(): JSX.Element {
  const footerSocialLinks = getFooterSocialLinks();

  return (
    <footer className="w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 md:px-6 py-4 md:py-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Source code{' '}
              <Link
                href={`${getSocialLinkUrl('GitHub')}/website`}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              >
                here
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-row items-center">
            {footerSocialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-md hover:bg-muted"
                  asChild
                >
                  <Link href={link.href} target="_blank" rel="noreferrer" aria-label={`Visit ${link.name}`}>
                    <Icon className="h-4 w-4" />
                    <span className="sr-only">{link.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
        <div className="mt-4 md:mt-6 border-t pt-4 md:pt-6 text-center md:text-left md:px-6 lg:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {personal.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
