'use client';

import s from './last-activity.module.css';

export default function LastActivity({ contributions }) {
  console.log({ contributions });
  return (
    <>
      <div className={s.root}>
        <article className="prose prose-lg text-gray-200" />
      </div>
    </>
  );
}
