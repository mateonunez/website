import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';

export type BlogBreadcrumbProps = React.HTMLAttributes<HTMLElement> & {
  items: {
    label: string;
    href?: string;
  }[];
  separator?: React.ReactNode;
  isCompact?: boolean;
};

const defaultSeparator = <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />;

export function BlogBreadcrumb({
  items,
  separator = defaultSeparator,
  className,
  isCompact = false,
  ...props
}: BlogBreadcrumbProps) {
  const listItems = [
    {
      label: 'Home',
      href: '/',
    },
    ...items,
  ];

  if (isCompact && listItems.length > 2) {
    const firstItem = listItems[0];
    const lastItem = listItems.at(-1);
    return (
      <nav aria-label="Breadcrumb" className={cn('flex w-full items-center overflow-x-auto', className)} {...props}>
        <ol className="flex w-full items-center">
          <li className="flex items-center">
            <Link
              href={firstItem.href ?? '/'}
              className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors duration-200"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only sm:not-sr-only">{firstItem.label}</span>
            </Link>
          </li>
          <li className="flex items-center mx-2" aria-hidden="true">
            {separator}
          </li>
          <li className="flex items-center">
            <span className="text-sm font-medium truncate">{lastItem.label}</span>
          </li>
        </ol>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex w-full items-center overflow-x-auto scrollbar-hide', className)}
      {...props}
    >
      <ol className="flex w-full items-center space-x-2">
        {listItems.map((item, index) => {
          const isLast = index === listItems.length - 1;
          return (
            <React.Fragment key={index}>
              <li className="flex items-center">
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors duration-200 hover:underline"
                  >
                    {index === 0 && <Home className="h-3 w-3 sm:h-4 sm:w-4" aria-hidden="true" />}
                    <span className={index === 0 ? 'sr-only sm:not-sr-only' : ''}>{item.label}</span>
                  </Link>
                ) : (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </li>
              {!isLast && (
                <li className="flex items-center" aria-hidden="true">
                  {separator}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
