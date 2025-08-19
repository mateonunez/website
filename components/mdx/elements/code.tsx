import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CodeProps extends HTMLAttributes<HTMLPreElement | HTMLElement> {
  className?: string;
}

export function Code({ className, ...props }: CodeProps) {
  const isInline = !className?.includes('language-');

  if (isInline) {
    return <code className={cn('relative font-mono text-sm', className)} {...props} />;
  }

  return <pre className={cn('overflow-x-auto p-4', 'font-mono text-sm', className)} {...props} />;
}
