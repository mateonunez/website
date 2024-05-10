'use client';

import s from './sponsors.module.css';

import Image from 'next/image';
import { RepositoryPreview } from 'components';
import Link from 'next/link';

export default function Sponsors({ sponsors }) {
  return (
    <>
      <div className={s.root}>
        <article className={s.description}>
          Special thanks to my sponsors, thanks to them who help me carry out all my projects and dreams. Thank you for
          your support and for believing in me.
        </article>

        <div className={s.sponsorsContainer}>
          {sponsors.map((sponsor) => (
            <div key={`sponsor-${sponsor.username}`} className={s.sponsorContainer}>
              <Link href={sponsor.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-center">
                <Image
                  src={sponsor.avatar}
                  alt={sponsor.username}
                  className="h-64 w-64 rounded-full shadow-lg"
                  width={512}
                  height={512}
                />
                <span className="block pt-4 font-black">@{sponsor.username}</span>
              </Link>

              <div className="px-4 text-sm lg:px-2">
                <RepositoryPreview
                  key={sponsor.repositories[0].name}
                  className={s.sponsorRepository}
                  {...sponsor.repositories[0]}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Consider sposoring me section */}
        <div className={s.considerSponsoringContainer}>
          <h2 className="text-center font-bold text-4xl">You love my work?</h2>

          <article className={s.description}>
            If you like my work and want to support me, consider sponsoring me on GitHub.
          </article>

          <div className="m-4 flex w-1/2 flex-col items-center justify-center p-4" style={{ margin: 'auto' }}>
            <Link
              href="https://github.com/sponsors/mateonunez"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-center font-bold text-lg"
            >
              <Image
                src="https://github.githubassets.com/images/modules/site/sponsors/pixel-mona-heart.gif"
                alt="Sponsor me"
                className="h-24 w-24 shadow-lg"
                width={128}
                height={128}
              />
              Sponsor Me
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
