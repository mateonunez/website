import s from './mdx-code.module.css';

export default function MDXCode({ children, ...rest }) {
  return (
    <>
      <div className={s.root}>
        <div className={s.code} {...rest}>
          {children}
        </div>
      </div>
    </>
  );
}
