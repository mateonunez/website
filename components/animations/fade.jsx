'use client';

import { useState, useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import cn from 'classnames';

gsap.registerPlugin(ScrollTrigger);

export default function Fade({
  children,
  direction = 'top',
  distance = 50,
  delay = 0,
  duration = 1.3,
  trigger,
  className = '',
  clean = false,
  repeat = false,
  ...rest
}) {
  const classNames = cn(
    {
      block: !clean,
      'mx-auto': !clean,
    },
    className,
  );

  const [isRendered, setIsRendered] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut',
      },
      ...(trigger?.current && { scrollTrigger: { trigger: trigger.current } }),
    });

    let fadeDirection = { x: 0, y: 0 };
    switch (direction) {
      case 'top':
        fadeDirection = { y: distance };
        break;
      case 'right':
        fadeDirection = { x: distance };
        break;
      case 'bottom':
        fadeDirection = { y: -distance };
        break;
      case 'left':
        fadeDirection = { x: -distance };
        break;
      default:
        fadeDirection = { x: 0 };
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

    return () => timeline.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeat]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <div className={classNames} ref={ref} {...rest}>
      {isRendered && children}
    </div>
  );
}
