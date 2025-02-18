'use client';

import { type ReactNode, useState, useRef, useEffect, type HTMLAttributes, type RefObject, type JSX } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import cn from 'classnames';

gsap.registerPlugin(ScrollTrigger);

type Direction = 'top' | 'right' | 'bottom' | 'left';

interface FadeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  trigger?: RefObject<HTMLElement>;
  className?: string;
  clean?: boolean;
  repeat?: number;
}

interface DirectionConfig {
  x: number;
  y: number;
}

export default function Fade({
  children,
  direction = 'top',
  distance = 50,
  delay = 0,
  duration = 1.3,
  trigger,
  className = '',
  clean = false,
  repeat = 0,
  ...rest
}: FadeProps): JSX.Element {
  const classNames = cn(
    {
      block: !clean,
      'mx-auto': !clean,
    },
    className,
  );

  const [isRendered, setIsRendered] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return (): void => {};

    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut',
      },
      ...(trigger?.current && { scrollTrigger: { trigger: trigger.current } }),
    });

    const fadeDirection: DirectionConfig = { x: 0, y: 0 };
    switch (direction) {
      case 'top':
        fadeDirection.y = distance;
        break;
      case 'right':
        fadeDirection.x = distance;
        break;
      case 'bottom':
        fadeDirection.y = -distance;
        break;
      case 'left':
        fadeDirection.x = -distance;
        break;
      default:
        fadeDirection.x = 0;
        break;
    }

    timeline.fromTo(
      ref.current,
      {
        ...fadeDirection,
        opacity: 0,
      },
      {
        opacity: 1,
        delay,
        duration,
        y: 0,
        x: 0,
      },
    );

    return (): gsap.core.Timeline => timeline.kill();
  }, [direction, distance, delay, duration, trigger, repeat]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className={classNames} ref={ref} {...rest}>
      {isRendered && children}
    </div>
  );
}
