import s from './container.module.css';
import cn from 'classnames';

export default function Container({ className, children, element = 'div', clean }) {
  const classNames = cn(s.root, className, {
    'mx-auto max-w-8-xl px-4': !clean
  });

  const Component = element;

  return (
    <>
      <Component className={classNames}>{children}</Component>
    </>
  );
}
