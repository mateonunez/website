'use client';

import { useEffect } from 'react';
import s from 'styles/pages/404.module.css';

export default function Eror({ error, reset }) {
  useEffect(() => {}, [error]);

  return (
    <>
      <div className={s.root}>
        <h2 className="title">Error unexpected. Can you fix me?</h2>

        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </>
  );
}
