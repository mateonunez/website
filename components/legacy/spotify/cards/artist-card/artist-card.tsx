import s from './artist-card.module.css';

import Link from 'next/link';

import config from '@/lib/config';
import type { JSX } from 'react';
import Fade from '@/components/legacy/animations/fade';
import Title from '@/components/legacy/common/title/title';

export default function ArtistCard({ item, delay = 0 }: { item: any; delay?: number }): JSX.Element {
  return (
    <>
      <div className={s.root}>
        {/* biome-ignore lint/nursery/noImgElement: refactor needed */}
        <img src={item.thumbnail} alt={item.title} className={s.image} />

        <Link
          href={item.url}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          title={`${item.name} [${item.genres}]`}
          aria-label={`${item.name} [${item.genres}]`}
        >
          <Fade className={s['name-container']} delay={delay + config.munber / 100}>
            <Title element="h3" variant="naked" className={s.name}>
              {item.name}
            </Title>
          </Fade>
        </Link>
      </div>
    </>
  );
}
