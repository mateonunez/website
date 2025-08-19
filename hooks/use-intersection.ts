import { type RefObject, useEffect, useState } from 'react';

export default function useIntersection(ref: RefObject<HTMLElement>, rootMargin = '0px'): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const { current } = ref;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      },
    );

    if (current) {
      observer.observe(current);
    }

    return (): void => {
      observer.unobserve(current);
    };
  }, []);

  return isIntersecting;
}
