import s from './recently-played.module.css';

import config from 'lib/config';

import { ChevronUp, Container, Fade, Title, TrackCard } from 'components';
import { useRef } from 'react';
import { useScroll } from 'lib/hooks';
import { useState } from 'react';

export default function RecentlyPlayed({ items }) {
  const trackContainerRef = useRef();
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const scroll = useScroll;

  return (
    <>
      <Container clean>
        <Fade>
          <Title>Recently Played</Title>
        </Fade>

        {items.length > 0 && (
          <div className={s.root}>
            <button
              className={s.navigator}
              onClick={() => {
                scroll(trackContainerRef, 'left');
              }}
              aria-label="Less Tracks">
              <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
            </button>

            <div
              className={s['track-container']}
              ref={trackContainerRef}
              onTouchMove={event => {
                const direction = prevScrollPos > event.touches[0].clientX ? 'right' : 'left';

                scroll(trackContainerRef, direction);
                setPrevScrollPos(event.touches[0].clientX);
              }}>
              {items.map((item, key) => (
                <Fade key={`${item.id}-${key}`} delay={key + config.munber / 100} clean>
                  <TrackCard item={item} delay={key + config.munber / 100} />
                </Fade>
              ))}
            </div>

            <button
              className={s.navigator}
              onClick={() => {
                scroll(trackContainerRef, 'right');
              }}
              aria-label="More Tracks">
              <ChevronUp className="w-6 h-6 transition duration-500 transform rotate-90 hover:scale-110" />
            </button>
          </div>
        )}
      </Container>
    </>
  );
}
