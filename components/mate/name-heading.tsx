'use client';

import {
  type CSSProperties,
  memo,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type TouchEvent,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { cn } from '@/lib/utils';
import { personal } from '@/lib/config/personal';
import { useSidebar } from '../ui/sidebar';

const GradientHeading = memo(
  ({
    children,
    className,
    ...props
  }: { children: string; className?: string } & HTMLAttributes<HTMLHeadingElement>) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isTapped, setIsTapped] = useState(false);
    const [initialTapPosition, setInitialTapPosition] = useState({ x: 0, y: 0 });
    const tapTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const { isMobile } = useSidebar();

    const setTapPosition = useCallback(
      (x: number, y: number) => {
        setPosition({ x, y });
        if (!isTapped) {
          setInitialTapPosition({ x, y });
        }
      },
      [isTapped],
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent<HTMLHeadingElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setTapPosition(x, y);
        setIsHovered(true);
      },
      [setTapPosition],
    );

    const handleMouseLeave = useCallback(() => {
      setIsHovered(false);
    }, []);

    const handleTouchStart = useCallback(
      (e: TouchEvent<HTMLHeadingElement>) => {
        e.stopPropagation();
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        setTapPosition(x, y);
        setIsTapped(true);
      },
      [setTapPosition],
    );

    const handleTouchMove = useCallback(
      (e: TouchEvent<HTMLHeadingElement>) => {
        if (!isTapped) return;
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        setTapPosition(x, y);
      },
      [isTapped, setTapPosition],
    );

    const handleTouchEnd = useCallback(() => {
      tapTimeoutRef.current = setTimeout(() => {
        setIsTapped(false);
      }, 1500);
    }, []);

    useEffect(() => {
      return () => {
        if (tapTimeoutRef.current) clearTimeout(tapTimeoutRef.current);
      };
    }, []);

    useEffect(() => {
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') {
          setIsTapped(false);
          setIsHovered(false);
        }
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);
      return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent | TouchEvent) => {
        if (headingRef.current && !headingRef.current.contains(event.target as Node)) {
          setIsTapped(false);
          if (!isMobile) setIsHovered(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside as any);
      document.addEventListener('touchstart', handleClickOutside as any);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside as any);
        document.removeEventListener('touchstart', handleClickOutside as any);
      };
    }, [isMobile]);

    const isActive = isHovered || isTapped;
    const gradientSize = isMobile ? 'var(--heading-gradient-size-mobile)' : 'var(--heading-gradient-size)';
    const displayPosition = {
      x: !isTapped ? position.x : position.x * 0.7 + initialTapPosition.x * 0.3,
      y: !isTapped ? position.y : position.y * 0.7 + initialTapPosition.y * 0.3,
    };

    return (
      <div className="relative">
        <h1
          ref={headingRef}
          className={cn(
            'pt-2 pb-4',
            'font-incompleeta font-bold leading-none select-none',
            'text-5xl md:text-6xl lg:text-9xl',
            'animate-[fadeIn_0.8s_ease-out_0.2s_forwards]',
            isActive ? 'cursor-none' : 'cursor-pointer',
            className,
          )}
          style={
            {
              '--x': `${displayPosition.x}px`,
              '--y': `${displayPosition.y}px`,
              backgroundImage: isActive
                ? `radial-gradient(circle ${gradientSize} at var(--x) var(--y), var(--heading-gradient-color), transparent var(--heading-gradient-opacity))`
                : 'none',
              backgroundClip: isActive ? 'text' : 'none',
              WebkitBackgroundClip: isActive ? 'text' : 'none',
              color: isActive ? 'transparent' : 'var(--heading-text-color)',
              transition: 'color 0.5s ease-in-out, background 0.5s ease-in-out',
            } as CSSProperties
          }
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          {...props}
        >
          {children}
        </h1>
      </div>
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
        <GradientHeading aria-label={`Name: ${name}`}>{name}</GradientHeading>
      </div>
      <div className="relative">
        <Subtitle aria-label={`Title: ${title}`}>{title}</Subtitle>
      </div>
    </div>
  );
});
NameHeading.displayName = 'NameHeading';

export default NameHeading;
