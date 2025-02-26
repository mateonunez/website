import gsap from 'gsap';
import { useEffect, type RefObject } from 'react';

interface GSAPTimelineVars extends gsap.TimelineVars {
  [key: string]: any;
}

interface AnimationProps {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

type AnimationFunction = () => AnimationProps;

export const useTimeline = (options?: GSAPTimelineVars): gsap.core.Timeline => {
  return gsap.timeline(options);
};

export const useAnimation = (
  ref: RefObject<HTMLElement>,
  animation: AnimationFunction = () => ({ from: {}, to: {} }),
  timelines: gsap.core.Timeline[] = [],
): void => {
  const timeline = timelines.length === 0 ? gsap.timeline() : timelines[0];
  const { current } = ref;
  const { from, to } = animation();

  useEffect(() => {
    if (!current) {
      return;
    }

    timeline.fromTo(current, from, to);

    return (): void => {
      timeline.kill();
    };
  }, [current, timeline, from, to]);
};
