'use client';

import s from './mdx-code.module.css';

import { type JSX, useEffect, useState } from 'react';

import cn from 'classnames';

export default function MDXCode({
  className,
  children,
  ...rest
}: { className: string; children: JSX.Element; rest: any }): JSX.Element {
  const [prismInjected, setPrismInjected] = useState(false);

  useEffect(() => {
    const isInjected = className?.split(' ')?.includes('code-highlight');
    setPrismInjected(isInjected);
  }, [className]);

  return (
    <code className={cn(prismInjected ? s.block : s.inline)} {...rest}>
      {children}
    </code>
  );
}
