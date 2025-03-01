'use client';

import { type CSSProperties, memo, useState, type HTMLAttributes, type MouseEvent } from 'react';
import { cn } from '@/lib/utils';
import { personal } from '@/lib/config/personal';

const GradientHeading = memo(
  ({
    children,
    className,
    ...props
  }: { children: string; className?: string } & HTMLAttributes<HTMLHeadingElement>) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    return (
      <h1
        className={cn(
          'mt-4 sm:mt-6 md:mt-8 lg:mt-10',
          'pb-2 sm:pb-3 md:pb-4 lg:pb-5',
          'font-incompleeta font-bold cursor-pointer',
          'text-5xl md:text-6xl lg:text-9xl',
          'drop-shadow-md hover:drop-shadow-lg transition-all duration-700 ease-in-out',
          'relative z-10 text-foreground/80',
          'animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
          'text-amber-500',
          className,
        )}
        style={
          {
            '--x': `${position.x}px`,
            '--y': `${position.y}px`,
            background: isHovered
              ? 'radial-gradient(circle 150px at var(--x) var(--y), var(--amber-500), transparent 50%)'
              : 'none',
            backgroundClip: isHovered ? 'text' : 'none',
            WebkitBackgroundClip: isHovered ? 'text' : 'none',
            color: isHovered ? 'transparent' : 'var(--amber-500)',
            transition: 'color 0.5s ease-in-out, background 0.5s ease-in-out',
          } as CSSProperties
        }
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        {children}
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
        'mt-2 sm:mt-3 md:mt-4 lg:mt-5',
        'text-sm sm:text-md md:text-lg lg:text-xl',
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
        'text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 relative group transition-transform duration-500 ease-in-out group-hover:scale-[1.01]',
        className,
      )}
    >
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/5 via-amber-300/10 to-amber-500/6 blur-xl opacity-60 group-hover:opacity-80 transition-all duration-500 ease-in-out rounded-full" />
        <MemoizedGradientHeading aria-label={`Name: ${name}`}>{name}</MemoizedGradientHeading>
      </div>
      <MemoizedSubtitle aria-label={`Title: ${title}`}>{title}</MemoizedSubtitle>
      <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 rounded-full opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:w-28" />
    </div>
  );
});
NameHeading.displayName = 'NameHeading';

const MemoizedGradientHeading = memo(GradientHeading);
const MemoizedSubtitle = memo(Subtitle);

export default NameHeading;
