import s from './my-story.module.css';

import type { JSX } from 'react';

export default function MyStory(): JSX.Element {
  return (
    <>
      <div className={s.root}>
        <article className="prose prose-lg text-gray-200">
          <p>
            I started my journey in the Open Source world in 2018, when I was 16 years old. I was a student at the time,
            and I was learning how to code. I was learning how to code because I wanted to make a living out of it, but
            I didn&apos;t know how to start.
          </p>
        </article>
      </div>
    </>
  );
}
