'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { useAnimations } from '@/lib/hooks/use-animations';
import { forwardRef, type ReactNode } from 'react';

export interface AnimatedContainerProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'staggerContainer' | 'scaleUp' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  customVariants?: Variants;
  staggerItems?: boolean;
}

export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  (
    {
      children,
      animation = 'fadeIn',
      delay = 0,
      duration,
      className = '',
      customVariants,
      staggerItems = false,
      ...props
    },
    ref,
  ) => {
    const animations = useAnimations();

    // Select the animation variant
    let variants: Variants;
    if (customVariants) {
      variants = customVariants;
    } else if (animation === 'none') {
      // If no animation is needed, use a simple pass-through variant
      variants = {
        hidden: {},
        visible: {},
      };
    } else {
      variants = animations[animation];
    }

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={variants}
        transition={duration ? { ...animations.transition.spring, duration } : undefined}
        {...(delay > 0 && {
          transition: {
            delay,
            ...animations.transition.spring,
          },
        })}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

AnimatedContainer.displayName = 'AnimatedContainer';

// For individual items in a staggered animation
export interface AnimatedItemProps extends Omit<HTMLMotionProps<'div'>, 'variants'> {
  children: ReactNode;
  className?: string;
  customVariants?: Variants;
  delay?: number;
}

export const AnimatedItem = forwardRef<HTMLDivElement, AnimatedItemProps>(
  ({ children, className = '', customVariants, delay, ...props }, ref) => {
    const animations = useAnimations();

    return (
      <motion.div
        ref={ref}
        className={className}
        variants={customVariants || animations.staggerItem}
        {...(delay > 0 && {
          transition: {
            delay,
            ...animations.transition.spring,
          },
        })}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

AnimatedItem.displayName = 'AnimatedItem';
