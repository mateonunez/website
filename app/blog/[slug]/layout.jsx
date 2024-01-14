'use client';

import s from 'styles/pages/blog/[slug].module.css';

export default function BlogArticle({ children }) {
  return (
    <div className={s.root}>
      {children}
    </div>
  );
}
