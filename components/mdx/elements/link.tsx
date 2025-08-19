import NextLink from 'next/link';
import type { AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Link({ href = '', className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href.startsWith('http') || href.startsWith('mailto:');

  const classes = cn('font-medium underline underline-offset-4', 'hover:text-primary transition-colors', className);

  if (isExternal) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${href}`}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...props} aria-label={`Visit ${href}`}>
      {children}
    </NextLink>
  );
}
