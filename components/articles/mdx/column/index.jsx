import cn from 'classnames';

const Column = ({ children, className }) => {
  const classes = cn('w-full px-4 mb-4 md:w-1/2 md:mb-0', className);

  return <div className={classes}>{children}</div>;
};

export default Column;
