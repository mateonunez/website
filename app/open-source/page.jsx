import s from 'styles/pages/open-source/page.module.css';

import { Container, Fade, RepositoryPreview, Title } from 'components';
import { WordAnimator } from 'components';
import { profileFetcher } from 'lib/fetchers/open-source/fetcher';
import meta from 'lib/config/metadata.js';
import config from 'lib/config';

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

export default async function OpenSourcePage() {
  const words = ['', 'Art', 'People', 'Code', 'Passion', 'You'];

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
        <Title variant="title-secondary">Open Source Is...</Title>

        <div className={s.welcomeContainer}>
          <div />
          <WordAnimator words={words} clickable />
          <div />
        </div>
      </Container>

      {/* Sponsors */}
      <Container clean id="you">
        <div className={s.thanksContainer}>
          <Fade direction="left" delay={0.5} clean className="w-full">
            <div class="flex flex-col items-center justify-center w-full p-4 m-4">
              <h2 className="text-4xl font-bold text-center">Thank you.</h2>

              <article className="prose lg:prose-xl" style={{ margin: '2rem' }}>
                Special thanks to my sponsors, thanks to them who help me carry out all my projects
                and dreams. Thank you for your support and for believing in me.
              </article>

              {/* Create a section for the sponsors */}
              <div className="flex flex-wrap items-center justify-between w-full">
                {sponsors.map(sponsor => (
                  <div
                    key={sponsor.login}
                    className="flex flex-col items-center justify-center w-1/2 p-4 m-4"
                    style={{ margin: 'auto' }}>
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-lg font-bold text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sponsor.avatar}
                        alt={sponsor.username}
                        className="w-24 h-24 rounded-full shadow-lg"
                      />
                      @{sponsor.username}
                    </a>

                    <div className="text-sm">
                      <RepositoryPreview
                        key={sponsor.repositories[0].name}
                        style={{ maxWidth: '21rem' }}
                        {...sponsor.repositories[0]}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Consider sposoring me section */}
              <div className="flex flex-col items-center justify-center w-full p-4 m-4">
                <h2 className="text-4xl font-bold text-center">Consider sponsoring me.</h2>

                <article className="prose lg:prose-xl" style={{ margin: '2rem' }}>
                  If you like my work and want to support me, consider sponsoring me on GitHub.
                </article>

                <div className="flex flex-wrap items-center justify-between w-full">
                  <div
                    className="flex flex-col items-center justify-center w-1/2 p-4 m-4"
                    style={{ margin: 'auto' }}>
                    <a
                      href="https://github.com/sponsors/mateonunez"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-lg font-bold text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://github.githubassets.com/images/modules/site/sponsors/pixel-mona-heart.gif"
                        alt="Sponsor me"
                        className="w-24 h-24 rounded-full shadow-lg"
                      />
                      Sponsor me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </Container>

      {/* Followers */}
      <Container clean>
        <div className={s.followersContainer}>
          <Fade direction="left" delay={0.5} className="w-2/3">
            <h2 className="text-4xl font-bold text-center">Followers</h2>
            <article className="prose text-center lg:prose-xl" style={{ margin: '2rem' }}>
              Thanks to every single person that has contributed on growing this passion of mine.
            </article>

            {/* You can be here */}
            <div className={s.followers}>
              {followersShown.map(follower => (
                <div key={follower.login} className="p-4 m-4">
                  <a
                    href={follower.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={follower.avatar}
                      alt={follower.username}
                      className="w-24 h-24 rounded-full shadow-lg"
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
