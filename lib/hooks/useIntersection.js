import { useState, useEffect } from 'react';

export default function useIntersection(ref, rootMargin = '0px') {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const { current } = ref;

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log(entry);
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      observer.unobserve(current);
    };
  }, []);

  return isIntersecting;
}