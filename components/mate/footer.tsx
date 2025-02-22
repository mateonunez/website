import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getFooterSocialLinks, getSocialLinkUrl } from '@/lib/config/social';
import type { JSX } from 'react';

export function Footer(): JSX.Element {
  const footerSocialLinks = getFooterSocialLinks();

  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col gap-4 py-6 md:py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Source code{' '}
              <a
                href={`${getSocialLinkUrl('GitHub')}/website`}
                target="_blank"
                rel="noreferrer"
                className="font-medium underline underline-offset-4 transition-colors hover:text-primary"
              >
                here
              </a>
              .
            </p>
          </div>
          <div className="flex items-center justify-end gap-2">
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
                  <a href={link.href} target="_blank" rel="noreferrer" aria-label={`Visit ${link.name}`}>
                    <Icon className="size-4" />
                    <span className="sr-only">{link.name}</span>
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
        <Separator className="my-2" />
        <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Mateo Nunez
          </p>
        </div>
      </div>
    </footer>
  );
}
