import s from './title.module.css';

import cn from 'classnames';
import { forwardRef } from 'react';

const Title = ({ className, children, element = 'h2', variant = 'title' }, ref) => {
  const classNames = cn(s[variant], className);

  const Component = element;

  return (
    <Component ref={ref} className={classNames}>
      {children}
    </Component>
  );
};

export default forwardRef(Title);
