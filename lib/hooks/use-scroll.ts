import config from '@/lib/config';
import type { RefObject } from 'react';

export default function useScroll(ref: RefObject<HTMLElement>, direction: 'left' | 'right'): void {
  const { current } = ref;

  if (current) {
    current.scroll({
      left:
        direction === 'left'
          ? current.scrollLeft - current.clientWidth - config.munber
          : // biome-ignore lint/nursery/noNestedTernary: it's safe
            direction === 'right'
            ? current.scrollLeft + current.clientWidth + config.munber
            : 0,
      behavior: 'smooth',
    });
  }
}
