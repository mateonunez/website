'use client';

import s from './content.module.css';

export default function ArticleContent({ children }) {
  return (
    <div className={s.root}>
      <div className="container">
        {children}
      </div>
    </div>
  );
}
