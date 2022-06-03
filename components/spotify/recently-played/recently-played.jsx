import s from './recently-played.module.css';

import { ChevronUp, Container, Fade, Title, TrackCard } from 'components';
import { useCallback, useRef } from 'react';
import config from 'lib/config';

export default function RecentlyPlayed({ items }) {
  const trackContainerRef = useRef();

  const scrollTrackContainer = useCallback(
    direction => {
      const { current } = trackContainerRef;

      if (current) {
        console.log('here', direction);

        current.scroll({
          left:
            direction === 'left'
              ? current.scrollLeft - current.clientWidth - config.munber
              : current.scrollLeft + current.clientWidth - config.munber,
          behavior: 'smooth'
        });
      }
    },
    [trackContainerRef.current]
  );

  return (
    <>
      <Container clean>
        <Fade>
          <Title>Recently Played</Title>
        </Fade>

        <div className={s.root}>
          <button
            className="mr-4"
            onClick={() => {
              scrollTrackContainer('left');
            }}>
            <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
          </button>

          <div className={s['track-container']} ref={trackContainerRef}>
            {items.map((item, key) => (
              <Fade key={key} delay={key + config.munber / 100} clean>
                <TrackCard item={item} delay={key + config.munber / 100} />
              </Fade>
            ))}
          </div>

          <button
            className="ml-4"
            onClick={() => {
              scrollTrackContainer('right');
            }}>
            <ChevronUp className="w-6 h-6 transition duration-500 transform rotate-90 hover:scale-110" />
          </button>
        </div>
      </Container>
    </>
  );
}
