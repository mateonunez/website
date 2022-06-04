import cn from 'classnames';
import s from './title.module.css';

const Title = ({ className, children, element = 'h2', variant = 'title' }) => {
  const classNames = cn(s[variant], className);

  const Component = element;

  return (
    <>
      <Component className={classNames}>{children}</Component>
    </>
  );
};

export default Title;
