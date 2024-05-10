import Link from 'next/link';
import s from './followers.module.css';

import Image from 'next/image';
import config from 'lib/config';

export default function Followers({ followers }) {
  followers.sort(() => Math.random() - 0.5);
  const followersShown = followers.slice(0, config.munber - 1);

  return (
    <>
      <div className={s.root}>
        <article className={s.description}>
          Thanks to every single person that has contributed on growing this passion of mine.
        </article>

        <div className={s.followersContainer}>
          {followersShown.map((follower) => (
            <div key={`follower-${follower.username}`} className={s.followerContainer}>
              <Link href={follower.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-center">
                <Image
                  src={follower.avatar}
                  alt={follower.username}
                  className="h-32 w-32 rounded-full shadow-lg"
                  width={128}
                  height={128}
                />
                <span className="mt-2 text-center text-caption text-sm">@{follower.username}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className={s.youAllContainer}>
          <a
            href="https://github.com/mateonunez?tab=followers"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center font-black text-sm"
          >
            and {followers.length - followersShown.length} more...{' '}
            <span className="text-emoji text-xs">(thank you ❤️)</span>
          </a>
        </div>

        {/* Consider following me section */}
      </div>
    </>
  );
}
