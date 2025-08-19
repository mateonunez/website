import type { RefObject } from 'react';
import config from '@/lib/config';

export default function useScroll(ref: RefObject<HTMLElement>, direction: 'left' | 'right'): void {
  const { current } = ref;

  if (current) {
    current.scroll({
      left:
        direction === 'left'
          ? current.scrollLeft - current.clientWidth - config.munber
          : direction === 'right'
            ? current.scrollLeft + current.clientWidth + config.munber
            : 0,
      behavior: 'smooth',
    });
  }
}
