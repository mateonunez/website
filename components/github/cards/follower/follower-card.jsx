import { forwardRef } from 'react';
import s from './follower-card.module.css';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { Fade } from 'components';
import { useState } from 'react';

// eslint-disable-next-line no-unused-vars
const FollowerCard = ({ follower, delay, variant = 'default' }, ref) => {
  const [usernameVisible, setUsernameVisible] = useState(false);

  const classNames = cn(s.root, {
    [s.root_default]: variant === 'default',
    [s.root_full]: variant === 'full'
  });

  return (
    <>
      <div className={classNames}>
        <Link
          href={follower.url}
          passHref
          target="_blank"
          rel="noopener noreferrer"
          title={`${follower.username}`}
          aria-label={`${follower.username}`}>
          <Image
            className={s.image}
            src={follower.avatar}
            alt={follower.username}
            height={48}
            width={48}
            layout="responsive"
            quality={60}
            onLoadingComplete={() => {
              setUsernameVisible(true);
            }}
          />
        </Link>

        {usernameVisible && (
          <Fade className={s['follower-container']} direction="bottom" delay={delay}>
            <div className={s.follower}>{follower.username}</div>
          </Fade>
        )}
      </div>
    </>
  );
};

export default forwardRef(FollowerCard);
