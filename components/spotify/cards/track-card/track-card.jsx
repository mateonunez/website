import s from './track-card.module.css';

import Image from 'next/image';
import { useState, forwardRef } from 'react';
import { Fade, Title } from 'components';
import config from 'lib/config';
import Link from 'next/link';
import { dateFromNowForHumans } from 'lib/helpers/date';

// eslint-disable-next-line no-unused-vars
const TrackCard = ({ item, delay = 0, variant = 'default' }, ref) => {
  const [playedAtIsVisible, setPlayedAtIsVisible] = useState(false);

  return (
    <>
      <div className={s.root}>
        <Link href={item.url} passHref>
          <a
            target="_blank"
            rel="noopener noreferrer"
            title={`${item.title} by: ${item.artist}`}
            aria-label={`${item.title} by: ${item.artist}`}>
            <div
              onMouseEnter={() => {
                setPlayedAtIsVisible(true);
              }}
              onMouseLeave={() => {
                setPlayedAtIsVisible(false);
              }}>
              <div className="absolute inset-0 gradient blend-darken" />

              <Image
                className={s.image}
                src={item.thumbnail}
                alt={item.title}
                height="320"
                width="260"
                layout="responsive"
              />

              <Fade className={s['title-container']} delay={delay + config.munber / 100}>
                <Title element="h3" variant="naked" className={s.title}>
                  {item.title}
                </Title>
              </Fade>
            </div>
          </a>
        </Link>

        <Fade
          className={s['artist-container']}
          direction="bottom"
          delay={delay + config.munber / 33}>
          <div className={s.artist}>{item.artist}</div>

          {playedAtIsVisible && variant.default && (
            <Fade className="mt-1" delay={0} duration={config.munber / 100} direction="top">
              <div className={s['played-at']}>{dateFromNowForHumans(item.playedAt)}</div>
            </Fade>
          )}
        </Fade>
      </div>
    </>
  );
};

export default forwardRef(TrackCard);
