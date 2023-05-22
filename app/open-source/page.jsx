'use client';

import s from 'styles/pages/open-source/page.module.css';

import { Container, Fade, Sponsors, Title } from 'components';
import { WordAnimator } from 'components';
import { profileFetcher } from 'lib/fetchers/open-source/fetcher';
import meta from 'lib/config/metadata.js';
import config from 'lib/config';
import Image from 'next/image';

// TODO: Add SEO
/*
export const metadata = {
  title: '> open source',
  description: `Open Source projects made with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'open source', 'github', 'projects'],
  other: [
    {
      name: 'followers',
      content: 'https://api.github.com/users/mateonunez/followers'
    }
  ]
};
*/
export default async function OpenSourcePage() {
  const words = ['Art', 'People', 'Code', 'Passion', 'You'];

  const profile = await profileFetcher();
  const { sponsors = [], followers = [] } = profile;

  followers.sort(() => Math.random() - 0.5);
  const followersShown = followers.slice(0, config.munber + 1);

  delete profile['repositories'];
  delete profile['followers'];
  delete profile['sponsors'];

  // const { avatar, bio, company, email, username, location, url } = profile;

  return (
    <>
      <Container>
        <Title variant="title-secondary">Open Source Is About...</Title>

        <div className={s.welcomeContainer}>
          <div />
          <WordAnimator words={words} clickable />
          <div />
        </div>
      </Container>

      {/* Sponsors */}
      <Container clean name="you">
        <div className={s.thanksContainer}>
          <Fade direction="left" clean className="w-full">
            <h2 className="text-4xl font-bold text-center">Thank you.</h2>

            <Sponsors sponsors={sponsors} />
          </Fade>
        </div>
      </Container>

      {/* Followers */}
      <Container clean>
        <div className={s.followersContainer}>
          <Fade direction="left" delay={0.5} className="w-2/3">
            <h2 className="text-4xl font-bold text-center">Still You</h2>
            <article className="prose text-center lg:prose-xl" style={{ margin: '2rem' }}>
              Thanks to every single person that has contributed on growing this passion of mine.
            </article>

            {/* You can be here */}
            <div className={s.followers}>
              {followersShown.map(follower => (
                <div key={`follower-${follower.username}`} className="p-4 m-4">
                  <a
                    href={follower.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <Image
                      src={follower.avatar}
                      alt={follower.username}
                      className="w-24 h-24 shadow-lg"
                      height={128}
                      width={128}
                    />
                    <span className="mt-2 text-sm text-center text-caption">
                      @{follower.username}
                    </span>
                  </a>
                </div>
              ))}
            </div>

            {/* Y'all */}
            <div className="text-center">
              <a
                href="https://github.com/mateonunez?tab=followers"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-bold text-center">
                and {followers.length - followersShown.length} more...
              </a>
            </div>
          </Fade>
        </div>
      </Container>
    </>
  );
}
