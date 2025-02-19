import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function Grid({ children, cols = 1, gap = 'md', className, ...props }: GridProps) {
  return (
    <div
      className={cn(
        'grid',
        {
          'grid-cols-1': cols === 1,
          'grid-cols-1 md:grid-cols-2': cols === 2,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3': cols === 3,
          'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': cols === 4,
          'gap-4': gap === 'sm',
          'gap-6': gap === 'md',
          'gap-8': gap === 'lg',
        },
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface GridItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GridItem({ children, className, ...props }: GridItemProps) {
  return (
    <div className={cn('relative flex flex-col gap-4', className)} {...props}>
      {children}
    </div>
  );
}
