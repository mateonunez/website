import cn from 'classnames';
import type { JSX } from 'react';

const Column = ({ children, className }: { children: JSX.Element; className: string }): JSX.Element => {
  const classes = cn('w-full px-4 mb-4 md:w-1/2 md:mb-0', className);

  return <div className={classes}>{children}</div>;
};

export default Column;
