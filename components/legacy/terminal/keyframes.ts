import { useState, useEffect, cloneElement, createElement, type ReactElement, type ElementType } from 'react';

interface FrameProps {
  component: ElementType;
  duration?: number;
  [key: string]: unknown;
}

export function Frame({ component, ...rest }: FrameProps): ReactElement {
  return createElement(component, rest);
}

interface KeyframesProps {
  children: ReactElement<FrameProps>[];
  onFinished?: () => void;
  component?: ElementType;
  [key: string]: unknown;
}

export function Keyframes({ children, onFinished, component = 'span', ...rest }: KeyframesProps): ReactElement | null {
  const [frameNum, setFrameNum] = useState<number>(0);

  useEffect(() => {
    const runOnEndEvent = (): void => {
      if (onFinished && typeof onFinished === 'function') {
        onFinished();
      }
    };

    const currentFrame = children[frameNum];
    if (!currentFrame) {
      runOnEndEvent();
      return;
    }

    const delay = currentFrame.props.duration || 0;
    const timer = setTimeout(() => {
      if (frameNum < children.length - 1) {
        setFrameNum(frameNum + 1);
      } else {
        runOnEndEvent();
      }
    }, delay);

    return (): void => clearTimeout(timer);
  }, [children, frameNum, onFinished]);

  const frame = children[frameNum];
  if (!frame) {
    return null;
  }

  return cloneElement(frame, {
    component,
    ...rest,
    ...frame.props,
  });
}
