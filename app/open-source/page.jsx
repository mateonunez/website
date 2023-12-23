import s from 'styles/pages/open-source/page.module.css';

import { Container, Fade, Followers, GitHubProfile, Sponsors, Title } from 'components';
import { WordAnimator } from 'components';
import { profileFetcher } from 'lib/fetchers/open-source/fetcher';
import meta from 'lib/config/metadata.js';

// TODO: improve SEO
export const metadata = {
  title: '> open source',
  description: `Open Source projects made with ❤️ by ${meta.author.name} and the Community. ${meta.description}`,
  keywords: [...meta.keywords, 'open source', 'github', 'projects', 'followers', 'sponsors'],
  other: [
    {
      name: 'followers',
      content: 'https://api.github.com/users/mateonunez/followers',
    },
  ],
};

export default async function OpenSourcePage() {
  const words = ['Art', 'People', 'Code', 'Passion', 'You'];

  const profile = await profileFetcher();
  const { sponsors = [], followers = [] } = profile;

  profile.repositories = undefined;
  profile.followers = undefined;
  profile.sponsors = undefined;

  return (
    <>
      {/* Welcome */}
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
      <Container clean name="people">
        <div className={s.genericContainer}>
          <Fade direction="left" delay={0.5} className="w-full">
            <h2 className="text-4xl font-bold text-center">Still You</h2>

            <Followers followers={followers} />
          </Fade>
        </div>
      </Container>

      {/* Profile */}
      <Container clean name="passion">
        <div className={s.genericContainer}>
          <Fade direction="left" delay={0.5} className="w-full">
            <h2 className="text-4xl font-bold text-center">About me</h2>

            <GitHubProfile {...profile} />
          </Fade>
        </div>
      </Container>

      {/* Last activity, Work in progress */}
      {/* <Container clean name="passion">
        <div className={s.genericContainer}>
          <Fade direction="left" delay={0.5} className="w-full">
            <h2 className="text-4xl font-bold text-center">Last Activity</h2>

            <LastActivity contributions={contributions} />
          </Fade>
        </div>
      </Container> */}
    </>
  );
}
