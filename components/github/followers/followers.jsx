import { ChevronUp, Container, Fade, FollowerCard, Title } from 'components';
import config from 'lib/config';
import { useCallback } from 'react';
import { useRef } from 'react';
import s from './followers.module.css';

export default function Followers({ followers }) {
  const followerContainerRef = useRef();

  // Create a
  const scrollFollowersContainer = useCallback(
    direction => {
      const { current } = followerContainerRef;

      if (current) {
        current.scroll({
          left:
            direction === 'left'
              ? current.scrollLeft - current.clientWidth - config.munber
              : direction === 'right'
              ? current.scrollLeft + current.clientWidth - config.munber
              : 0,
          behavior: 'smooth'
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [followerContainerRef.current]
  );

  return (
    <>
      <Container clean>
        <Title className={s.title}>Thank you all!</Title>

        {/* Left scroller */}

        {/* Content */}
        {followers.length > 0 && (
          <div className={s.root}>
            <button
              className={s.navigator}
              onClick={() => {
                scrollFollowersContainer('left');
              }}
              onTouchStart={() => {
                scrollFollowersContainer('left');
              }}
              aria-label="Less Followers">
              <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
            </button>

            <div
              className={s['follower-container']}
              ref={followerContainerRef}
              onTouchStart={() => {
                // TODO: Add touch and swipe direction detection
                scrollFollowersContainer('right');
              }}>
              {followers.map((follower, key) => (
                <Fade key={`${follower.id}-${key}`} delay={key + config.munber / 100} clean>
                  <FollowerCard follower={follower} delay={key + config.munber / 100} />
                </Fade>
              ))}
            </div>

            <button
              className={s.navigator}
              onClick={() => {
                scrollFollowersContainer('right');
              }}
              onTouchStart={() => {
                scrollFollowersContainer('right');
                console.log('here');
              }}
              aria-label="More Followers">
              <ChevronUp className="w-6 h-6 transition duration-500 transform rotate-90 hover:scale-110" />
            </button>
          </div>
        )}

        {/* Right scroller */}
      </Container>
    </>
  );
}
