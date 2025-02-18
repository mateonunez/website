import { useState, useEffect, cloneElement, createElement } from 'react';

export function Frame({ component, ...rest }) {
  return createElement(component, rest);
}

export function Keyframes({ children, onFinished, component = 'span', ...rest }) {
  const [frameNum, setFrameNum] = useState(0);

  useEffect(() => {
    const runOnEndEvent = () => {
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

    return () => clearTimeout(timer);
  }, [children, frameNum, onFinished]);

  const frame = children[frameNum];
  if (!frame) {
    return null;
  }

  return cloneElement(frame, { component, ...rest, ...frame.props });
}
