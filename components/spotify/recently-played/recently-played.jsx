'use client';

import s from './recently-played.module.css';

import { ChevronUp, Container, Title, TrackCard } from 'components';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';

export default function RecentlyPlayed({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextIndex = () => {
    if (currentIndex >= items.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const prevIndex = () => {
    if (currentIndex <= 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  // Listen to keydown events
  useEffect(() => {
    window.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') {
        nextIndex();
      }

      if (event.key === 'ArrowLeft') {
        prevIndex();
      }
    });

    return () => {
      window.removeEventListener('keydown', event => {
        if (event.key === 'ArrowRight') {
          nextIndex();
        }

        if (event.key === 'ArrowLeft') {
          prevIndex();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const recentlyTrack = useMemo(() => {
    return items[currentIndex];
  }, [currentIndex, items]);

  return (
    <>
      <Container>
        <Title variant="subtitle">Recently Played</Title>
      </Container>

      {items.length > 0 && (
        <div className={s.root}>
          <button
            className={s.navigator}
            onClick={() => {
              prevIndex();
            }}
            aria-label="Less Tracks"
            style={{
              left: '10px'
            }}>
            <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
          </button>

          {/* <div
              className={s['track-container']}
              ref={trackContainerRef}
              onTouchMove={event => {
                const direction = prevScrollPos > event.touches[0].clientX ? 'right' : 'left';

                scroll(trackContainerRef, direction);
                setPrevScrollPos(event.touches[0].clientX);
              }}> */}
          <Container clean>
            <TrackCard item={recentlyTrack} currentIndex={currentIndex} />
          </Container>
          {/* </div> */}

          <button
            className={s.navigator}
            onClick={() => {
              nextIndex();
            }}
            aria-label="More Tracks"
            style={{
              right: '10px'
            }}>
            <ChevronUp className="w-6 h-6 transition duration-500 transform rotate-90 hover:scale-110" />
          </button>
        </div>
      )}
    </>
  );
}
