'use client';

import { MotionConfig } from 'framer-motion';
import type * as React from 'react';

export function MotionProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
