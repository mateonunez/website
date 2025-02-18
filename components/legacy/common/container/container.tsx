import type { JSX, ElementType, ReactNode } from 'react';
import s from './container.module.css';
import cn from 'classnames';

interface ContainerProps {
  className?: string;
  children: ReactNode;
  element?: ElementType;
  clean?: boolean;
}

export default function Container({
  className,
  children,
  element = 'div',
  clean = false,
}: ContainerProps): JSX.Element {
  const classNames = cn(s.root, className, {
    'mx-auto max-w-8-xl px-4': !clean,
  });

  const Component = element;

  return <Component className={classNames}>{children}</Component>;
}
