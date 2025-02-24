import { cn } from '@/lib/utils';
import type { JSX, ReactNode } from 'react';

type ColumnWidth = 'full' | '1/2' | '1/3' | '1/4' | '2/3' | '3/4';

interface ColumnProps {
  children: ReactNode;
  className?: string;
  gutter?: 'none' | 'sm' | 'md' | 'lg';
  width?: {
    default?: ColumnWidth;
    sm?: ColumnWidth;
    md?: ColumnWidth;
    lg?: ColumnWidth;
    xl?: ColumnWidth;
  };
  offset?: {
    default?: ColumnWidth;
    sm?: ColumnWidth;
    md?: ColumnWidth;
    lg?: ColumnWidth;
    xl?: ColumnWidth;
  };
}

const gutterStyles = {
  none: 'px-0',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
} as const;

const widthStyles: Record<ColumnWidth, string> = {
  full: 'w-full',
  '1/2': 'w-1/2',
  '1/3': 'w-1/3',
  '1/4': 'w-1/4',
  '2/3': 'w-2/3',
  '3/4': 'w-3/4',
} as const;

const offsetStyles: Record<ColumnWidth, string> = {
  full: 'ml-0',
  '1/2': 'ml-1/2',
  '1/3': 'ml-1/3',
  '1/4': 'ml-1/4',
  '2/3': 'ml-2/3',
  '3/4': 'ml-3/4',
} as const;

export function Column({
  children,
  className,
  gutter = 'md',
  width = { default: 'full', md: '1/2' },
  offset,
}: ColumnProps): JSX.Element {
  const widthClasses = Object.entries(width).map(([breakpoint, size]) => {
    const prefix = breakpoint === 'default' ? '' : `${breakpoint}:`;
    return `${prefix}${widthStyles[size]}`;
  });

  const offsetClasses = offset
    ? Object.entries(offset).map(([breakpoint, size]) => {
        const prefix = breakpoint === 'default' ? '' : `${breakpoint}:`;
        return `${prefix}${offsetStyles[size]}`;
      })
    : [];

  return <div className={cn('mb-4', gutterStyles[gutter], widthClasses, offsetClasses, className)}>{children}</div>;
}
