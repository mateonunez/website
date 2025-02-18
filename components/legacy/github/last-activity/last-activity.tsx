'use client';

import s from './last-activity.module.css';

import type { JSX } from 'react';

export default function LastActivity(): JSX.Element {
  return (
    <>
      <div className={s.root}>
        <article className="prose prose-lg text-gray-200" />
      </div>
    </>
  );
}
