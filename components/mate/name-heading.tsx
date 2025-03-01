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
          'pt-2 pb-4',
          'font-incompleeta font-bold leading-none cursor-none select-none',
          'text-5xl md:text-6xl lg:text-9xl',
          'animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
          className,
        )}
        style={
          {
            '--x': `${position.x}px`,
            '--y': `${position.y}px`,
            background: isHovered
              ? 'radial-gradient(circle var(--heading-gradient-size) at var(--x) var(--y), var(--heading-gradient-color), transparent var(--heading-gradient-opacity))'
              : 'none',
            backgroundClip: isHovered ? 'text' : 'none',
            WebkitBackgroundClip: isHovered ? 'text' : 'none',
            color: isHovered ? 'transparent' : 'var(--heading-text-color)',
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
        'my-2',
        'text-sm sm:text-md md:text-lg lg:text-xl',
        'font-medium tracking-wide',
        'drop-shadow-md hover:drop-shadow-lg transition-all duration-700 ease-in-out',
        'relative z-10 text-foreground/80 opacity-0 translate-y-4 animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
        className,
      )}
      {...props}
    >
      <span className="relative inline-block transition-colors duration-700 ease-in-out">{children}</span>
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
    <div className={cn('text-center', className)}>
      <div className="relative">
        <div className="absolute inset-1 bg-gradient-to-br from-neutral-200/10 via-amber-500/15 to-neutral-200/10 blur-2xl opacity-55 group-hover:opacity-90 transition-all duration-500 ease-in-out rounded-full" />
        <MemoizedGradientHeading aria-label={`Name: ${name}`}>{name}</MemoizedGradientHeading>
      </div>
      <div className="relative">
        <MemoizedSubtitle aria-label={`Title: ${title}`}>{title}</MemoizedSubtitle>
      </div>
    </div>
  );
});
NameHeading.displayName = 'NameHeading';

const MemoizedGradientHeading = memo(GradientHeading);
const MemoizedSubtitle = memo(Subtitle);

export default NameHeading;
