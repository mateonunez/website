import type { MotionProps } from 'framer-motion';

export function filterMotionProps<T extends Record<string, any>>(props: T): Omit<T, keyof MotionProps> {
  const filteredProps = { ...props };
  const motionPropKeys: (keyof MotionProps)[] = [
    // Animation props
    'animate',
    'initial',
    'exit',
    'transition',
    'variants',
    'whileHover',
    'whileTap',
    'whileFocus',
    'whileDrag',
    'whileInView',

    'onAnimationStart',
    'onAnimationComplete',
    'onUpdate',
    'onPan',
    'onPanStart',
    'onPanEnd',
    'onTap',
    'onTapStart',
    'onTapCancel',
    'onHoverStart',
    'onHoverEnd',
    'onDrag',
    'onDragStart',
    'onDragEnd',
    'onViewportEnter',
    'onViewportLeave',
    'onLayoutAnimationStart',
    'onLayoutAnimationComplete',

    // Layout props
    'layout',
    'layoutId',
    'layoutDependency',
    'layoutScroll',

    // Other props
    'transformTemplate',
    'onBeforeLayoutMeasure',
  ];

  for (const key of motionPropKeys) {
    if (key in filteredProps) {
      delete filteredProps[key as keyof T];
    }
  }

  return filteredProps;
}

export function extractHTMLProps<T extends Record<string, any>>(props: T): Omit<T, keyof MotionProps> {
  return filterMotionProps(props);
}
