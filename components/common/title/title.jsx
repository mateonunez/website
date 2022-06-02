import cn from 'classnames';
import s from './Title.module.css';

const Title = ({ className, children, element = 'h1' }) => {
  const classNames = cn(s.root, className);

  const Component = element;

  return (
    <>
      <Component className={classNames}>{children}</Component>
    </>
  );
};

export default Title;
