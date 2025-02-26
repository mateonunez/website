'use client';

import { Button } from '@/components/ui/button';
import { getFooterSocialLinks, getSocialLinkUrl } from '@/lib/config/social';
import Link from 'next/link';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
  const footerSocialLinks = getFooterSocialLinks();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row">
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
                  className="h-9 w-9 rounded-full hover:bg-muted"
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
        <div className="mt-6 border-t pt-6 text-center md:text-left">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Mateo Nunez</p>
        </div>
      </div>
    </footer>
  );
}
