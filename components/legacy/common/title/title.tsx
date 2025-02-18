import { type ElementType, type ReactNode, forwardRef } from 'react';
import s from './title.module.css';
import cn from 'classnames';

interface TitleProps {
  className?: string;
  children: ReactNode;
  element?: ElementType;
  variant?: 'title' | 'subtitle' | 'heading' | 'title-secondary' | 'naked';
}

const Title = forwardRef<HTMLElement, TitleProps>(({ className, children, element = 'h2', variant = 'title' }, ref) => {
  const classNames = cn(s[variant], className);
  const Component = element;

  return (
    <Component ref={ref} className={classNames}>
      {children}
    </Component>
  );
});

Title.displayName = 'Title';

export default Title;
