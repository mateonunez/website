import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MainProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function Main({ children, className, containerClassName }: MainProps) {
  return (
    <main className={cn('flex-1 overflow-auto mx-auto max-w-7xl', className)}>
      <div className={cn('container mx-auto p-6', containerClassName)}>{children}</div>
    </main>
  );
}
