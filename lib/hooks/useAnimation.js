import gsap from 'gsap';

import { useEffect } from 'react';

export const useTimeline = (options) => gsap.timeline(options);

export const useAnimation = (ref, animation = () => {}, timelines = []) => {
  const timeline = timelines.length === 0 ? gsap.timeline() : timelines[0];

  const { current } = ref;
  const { from, to } = animation();

  useEffect(() => {
    if (!current) {
      return;
    }

    timeline.fromTo(current, from, to);

    return () => timeline.kill();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);
};
