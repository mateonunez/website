'use client';

import { memo, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { personal } from '@/lib/config/personal';

const GradientHeading = memo(
  ({
    children,
    className,
    ...props
  }: { children: string; className?: string } & HTMLAttributes<HTMLHeadingElement>) => {
    return (
      <h1
        className={cn(
          'mt-2 sm:mt-4 md:mt-6 lg:mt-8',
          'font-prompt cursor-pointer',
          'font-bold',
          'text-5xl',
          'md:text-6xl',
          'lg:text-8xl',
          'drop-shadow-md hover:drop-shadow-lg transition-all duration-700 ease-in-out',
          'relative z-10 text-foreground/80 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
          'text-amber-500',
          className,
        )}
        style={{ textShadow: 'none' }}
        {...props}
      >
        <span className="relative inline-block transition-colors duration-700 ease-in-out">
          {children}
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-amber-500/40 rounded-full blur-md scale-x-95 group-hover:scale-x-100 group-hover:bg-amber-500/60 transition-all duration-700 ease-in-out" />
        </span>
      </h1>
    );
  },
);
GradientHeading.displayName = 'GradientHeading';

const Subtitle = memo(
  ({
    children,
    className,
    ...props
  }: { children: string; className?: string } & HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        'mt-2 sm:mt-4 md:mt-6 lg:mt-8',
        'text-sm',
        'sm:text-md',
        'md:text-lg',
        'lg:text-xl',
        'font-medium tracking-wide',
        'drop-shadow-md hover:drop-shadow-lg transition-all duration-700 ease-in-out',
        'relative z-10 text-foreground/80 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
        className,
      )}
      {...props}
    >
      <span className="relative inline-block transition-colors duration-700 ease-in-out">
        {children}
        <span className="absolute -inset-1 bg-gradient-to-r from-amber-200/10 via-amber-400/15 to-amber-200/10 blur-lg rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
      </span>
    </p>
  ),
);
Subtitle.displayName = 'Subtitle';

interface NameHeadingProps {
  name?: string;
  title?: string;
  className?: string;
}

const NameHeading = memo(({ name = personal.name, title = personal.alternativeTitle, className }: NameHeadingProps) => {
  return (
    <div
      className={cn(
        'text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24 relative group transition-transform duration-500 ease-in-out group-hover:scale-[1.01]',
        className,
      )}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/10 via-amber-300/15 to-amber-500/10 blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500 ease-in-out rounded-full" />
        <MemoizedGradientHeading aria-label={`Name: ${name}`}>{name}</MemoizedGradientHeading>
      </div>
      <MemoizedSubtitle aria-label={`Title: ${title}`}>{title}</MemoizedSubtitle>
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-amber-500/70 via-amber-300/80 to-amber-500/70 rounded-full opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:w-28" />
    </div>
  );
});
NameHeading.displayName = 'NameHeading';

const MemoizedGradientHeading = memo(GradientHeading);
const MemoizedSubtitle = memo(Subtitle);

export default NameHeading;
