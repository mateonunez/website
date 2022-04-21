import { useRef, useEffect } from 'react';

import { gsap } from 'gsap';

export default function Fade({
  children,
  direction = 'top',
  distance = 50,
  delay = 0,
  duration = 1.3,
  ...rest
}) {
  const ref = useRef();

  useEffect(() => {
    const timeline = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power2.inOut'
      }
    });

    const fadeDirection =
      direction === 'top'
        ? { y: distance }
        : direction === 'right'
        ? { x: distance }
        : direction === 'bottom'
        ? { y: -distance }
        : direction === 'left'
        ? { x: -distance }
        : { x: 0 };

    timeline.fromTo(
      ref.current,
      {
        ...fadeDirection,
        opacity: 0
      },
      {
        opacity: 1,
        delay,
        duration,
        y: 0,
        x: 0
      }
    );

    return () => timeline.kill();
  }, []);

  return (
    <div className="block mx-auto" ref={ref} {...rest}>
      {children}
    </div>
  );
}
