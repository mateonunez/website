import Link from 'next/link';
import s from './followers.module.css';

import Image from 'next/image';
import config from '@/lib/config';
import type { JSX } from 'react';
import type { GitHubUser } from '@/types/github';

export default function Followers({ followers }: { followers: GitHubUser['followers'] }): JSX.Element {
  const followersShown = followers.edges.sort(() => Math.random() - 0.5).slice(0, config.munber - 1);

  return (
    <>
      <div className={s.root}>
        <article className={s.description}>
          Thanks to every single person that has contributed on growing this passion of mine.
        </article>

        <div className={s.followersContainer}>
          {followersShown.map((follower) => (
            <div key={`follower-${follower.node.login}`} className={s.followerContainer}>
              <Link href={follower.node.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-center">
                <Image
                  src={follower.node.avatarUrl}
                  alt={follower.node.login}
                  className="h-32 w-32 rounded-full shadow-lg"
                  width={128}
                  height={128}
                />
                <span className="mt-2 text-center text-caption text-sm">@{follower.node.login}</span>
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
            and {followers.edges.length - followersShown.length} more...
            <span className="text-emoji text-xs">(thank you ❤️)</span>
          </a>
        </div>

        {/* Consider following me section */}
      </div>
    </>
  );
}
