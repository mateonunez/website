'use client';

import s from './follower-card.module.css';
import { forwardRef, useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Image from 'next/image';
import { Fade } from '@/components';

interface Follower {
  url: string;
  username: string;
  avatar: string;
}

interface FollowerCardProps {
  follower: Follower;
  delay: number;
  variant?: 'default' | 'full';
}

const FollowerCard = forwardRef<HTMLDivElement, FollowerCardProps>(({ follower, delay, variant = 'default' }, ref) => {
  const [usernameVisible, setUsernameVisible] = useState<boolean>(false);

  const classNames = cn(s.root, {
    [s.root_default]: variant === 'default',
    [s.root_full]: variant === 'full',
  });

  return (
    <div className={classNames} ref={ref}>
      <Link
        href={follower.url}
        passHref
        target="_blank"
        rel="noopener noreferrer"
        title={follower.username}
        aria-label={follower.username}
      >
        <Image
          className={s.image}
          src={follower.avatar}
          alt={follower.username}
          height={48}
          width={48}
          quality={60}
          onLoadingComplete={(): void => {
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
  );
});
// Add display name for better debugging
FollowerCard.displayName = 'FollowerCard';

export default FollowerCard;
