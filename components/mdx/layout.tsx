import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface MDXLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MDXLayout({ children, className }: MDXLayoutProps) {
  return (
    <article
      className={cn(
        'prose dark:prose-invert max-w-none',
        // Base colors
        'prose-foreground',
        'dark:prose-foreground',
        // Headings
        'prose-headings:scroll-mt-20 prose-headings:font-display prose-headings:font-bold',
        'prose-headings:text-foreground dark:prose-headings:text-foreground',
        'prose-h1:text-4xl prose-h1:mb-4',
        'prose-h2:text-3xl',
        'prose-h3:text-2xl',
        'prose-h4:text-xl',
        // Lead
        'prose-lead:text-muted-foreground',
        // Links
        'prose-a:font-medium',
        'hover:prose-a:text-amber-500 dark:hover:prose-a:text-amber-400',
        'prose-a:underline prose-a:decoration-amber-600/50 dark:prose-a:decoration-amber-400/50',
        'prose-a:underline-offset-2',
        // Code blocks
        'prose-pre:shadow-sm dark:prose-pre:shadow-none',
        // max-width of code blocks
        'prose-pre:max-w-full',
        // Inline code
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5',
        'prose-code:text-foreground dark:prose-code:text-foreground',
        'prose-code:before:content-none prose-code:after:content-none',
        // HR
        'prose-hr:border-border',
        // Lists
        'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 marker:text-muted-foreground',
        'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 marker:text-muted-foreground',
        // Blockquotes
        'prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-6',
        'prose-blockquote:italic prose-blockquote:text-muted-foreground',
        // Custom spacing
        '[&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0',
        className,
      )}
    >
      {children}
    </article>
  );
}
