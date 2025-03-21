import { cn } from '@/lib/utils';
import type { ComponentPropsWithoutRef } from 'react';

export function ComponentWrapper({
  className,
  name,
  children,
  ...props
}: ComponentPropsWithoutRef<'div'> & { name: string }) {
  return (
    <div className={cn('flex flex-col rounded-lg border', className)} {...props}>
      <div className="border-b px-4 py-3 md:px-6 md:py-4">
        <div className="text-sm font-medium">{name}</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-4 md:p-6 [&>div]:max-w-full">
        {children}
      </div>
    </div>
  );
}
