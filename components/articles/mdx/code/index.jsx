'use client';

import s from './mdx-code.module.css';
import { useEffect, useState } from 'react';
import cn from 'classnames';

export default function MDXCode({ className, children, ...rest }) {
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
