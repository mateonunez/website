import s from 'styles/pages/blog/[slug].module.css';

export default function ArticleLayout({ children }) {
  return (
    <div className={s.root}>
      {children}
    </div>
  );
}
