import cn from 'classnames';
import s from './Title.module.css';

const Title = ({ className, children, element = 'h1', clean }) => {
  const classNames = cn(s.root, className, {
    'mx-auto max-w-8-xl px-4': !clean
  });

  const Component = element;

  return (
    <>
      <Component className={classNames}>{children}</Component>
    </>
  );
};

export default Title;
