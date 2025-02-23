import { Button } from '@/components/ui/button';
import { getFooterSocialLinks, getSocialLinkUrl } from '@/lib/config/social';
import Link from 'next/link';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
  const footerSocialLinks = getFooterSocialLinks();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-8">
        <div className="flex flex-col px-8 pt-4 md:flex-row">
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
        <div className="flex flex-row items-center px-8">
          {footerSocialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Button
                key={link.name}
                variant="ghost"
                size="icon"
                className="size-8 rounded-full hover:bg-muted"
                asChild
              >
                <Link href={link.href} target="_blank" rel="noreferrer" aria-label={`Visit ${link.name}`}>
                  <Icon className="size-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              </Button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center px-8 py-4">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Mateo Nunez
        </p>
      </div>
    </footer>
  );
}
