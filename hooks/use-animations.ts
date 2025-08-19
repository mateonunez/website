import type { Variants } from 'framer-motion';

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const fadeInUpVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.1, staggerChildren: 0.05 },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const scaleUpVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

// Standard hover animations
export const hoverScaleVariants = {
  scale: 1.05,
  transition: { type: 'spring' as 'spring', stiffness: 400, damping: 10 },
};

// useAnimations hook to provide standardized animations
export const useAnimations = () => {
  return {
    fadeIn: fadeInVariants,
    fadeInUp: fadeInUpVariants,
    staggerContainer: staggerContainerVariants,
    staggerItem: staggerItemVariants,
    scaleUp: scaleUpVariants,
    hover: {
      scale: hoverScaleVariants,
    },
    transition: {
      spring: { type: 'spring' as 'spring', stiffness: 400, damping: 10 },
      smooth: { duration: 0.3, ease: 'easeInOut' as 'easeInOut' },
    },
  };
};

export default useAnimations;
