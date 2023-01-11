import { ChevronUp, Container, Fade, FollowerCard, Title } from 'components';
import config from 'lib/config';
import { useScroll } from 'lib/hooks';
import { useRef, useState } from 'react';
import s from './followers.module.css';

export default function Followers({ followers }) {
  const followerContainerRef = useRef();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const scroll = useScroll;

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
                scroll(followerContainerRef, 'left');
              }}
              aria-label="Less Followers">
              <ChevronUp className="w-6 h-6 font-black transition duration-500 transform -rotate-90" />
            </button>

            <div
              className={s['follower-container']}
              ref={followerContainerRef}
              onTouchMove={event => {
                const direction = prevScrollPos > event.touches[0].clientX ? 'right' : 'left';

                scroll(followerContainerRef, direction);
                setPrevScrollPos(event.touches[0].clientX);
              }}>
              {followers.map((follower, key) => (
                <Fade key={`${follower.id}-${key}`} delay={key + config.munber / 100} clean>
                  <FollowerCard follower={follower} delay={key + 1} />
                </Fade>
              ))}
            </div>

            <button
              className={s.navigator}
              onClick={() => {
                scroll(followerContainerRef, 'right');
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
