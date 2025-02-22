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
        'prose dark:prose-invert w-full max-w-none',
        // Responsive typography
        'prose-p:leading-relaxed',
        'sm:prose-p:text-base prose-p:text-sm',
        'prose-headings:font-display prose-headings:font-bold',
        'prose-h1:text-3xl sm:prose-h1:text-4xl prose-h1:mb-4',
        'prose-h2:text-2xl sm:prose-h2:text-3xl',
        'prose-h3:text-xl sm:prose-h3:text-2xl',
        'prose-h4:text-lg sm:prose-h4:text-xl',
        // Lead
        'prose-lead:text-muted-foreground prose-lead:text-base sm:prose-lead:text-lg',
        // Links
        'prose-a:font-medium prose-a:text-amber-600 dark:prose-a:text-amber-400',
        'hover:prose-a:text-amber-500 dark:hover:prose-a:text-amber-300 transition-colors',
        'prose-a:underline prose-a:decoration-amber-600/50 dark:prose-a:decoration-amber-400/50',
        'prose-a:underline-offset-2',
        // Code blocks
        'prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:text-white',
        'prose-pre:rounded-md prose-pre:p-4 prose-pre:overflow-x-auto',
        'prose-pre:max-w-full',
        // Inline code
        'prose-code:rounded prose-code:bg-muted prose-code:px-1 prose-code:py-0.5',
        'prose-code:text-foreground dark:prose-code:text-foreground',
        'prose-code:before:content-none prose-code:after:content-none',
        // HR
        'prose-hr:border-border prose-hr:my-8',
        // Lists
        'prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 marker:text-muted-foreground',
        'prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6 marker:text-muted-foreground',
        'prose-li:my-2',
        // Nested lists
        'prose-ul ul, prose-ol ol { margin-top: 0.5rem; margin-bottom: 0.5rem; }',
        // Blockquotes
        'prose-blockquote:border-l-4 prose-blockquote:border-amber-500 dark:prose-blockquote:border-amber-400',
        'prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground',
        'prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/20 prose-blockquote:p-4 prose-blockquote:rounded-r',
        // Images
        'prose-img:rounded-lg prose-img:shadow-md',
        'prose-img:w-full prose-img:max-w-full',
        // Tables
        'prose-table:w-full prose-table:border-collapse',
        'prose-thead:bg-muted prose-thead:text-muted-foreground',
        'prose-th:px-4 prose-th:py-2 prose-th:border prose-th:border-border',
        'prose-td:px-4 prose-td:py-2 prose-td:border prose-td:border-border',
        // Custom spacing
        '[&>*:first-child]:!mt-0 [&>*:last-child]:!mb-0',
        // Dark mode consistency
        'dark:prose-invert',
        className,
      )}
    >
      {children}
    </article>
  );
}
