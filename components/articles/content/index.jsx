import s from './content.module.css';

export default function ArticleContent({ children }) {
  'use client';

  return (
    <div className={s.root}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
