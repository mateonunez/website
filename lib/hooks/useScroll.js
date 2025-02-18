import config from '@/lib/config';

export default function useScroll(ref, direction) {
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
