import { cn } from '@/lib/utils';
import type { JSX, ReactNode } from 'react';

interface RowProps {
  children: ReactNode;
  className?: string;
  gutter?: 'none' | 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const gutterStyles = {
  none: '',
  sm: '-mx-2',
  md: '-mx-4',
  lg: '-mx-6',
} as const;

export function Row({ children, className, gutter = 'md', align = 'start', justify = 'start' }: RowProps): JSX.Element {
  return (
    <div className={cn('flex flex-wrap', gutterStyles[gutter], `items-${align}`, `justify-${justify}`, className)}>
      {children}
    </div>
  );
}
