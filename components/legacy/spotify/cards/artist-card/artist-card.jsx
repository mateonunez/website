import s from './artist-card.module.css';

import Link from 'next/link';

import { Fade, Title } from '@/components';
import config from '@/lib/config';

export default function ArtistCard({ item, delay = 0 }) {
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
