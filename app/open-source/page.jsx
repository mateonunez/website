import s from 'styles/pages/open-source/page.module.css';

import { Container, Fade, Followers, Sponsors, Title } from 'components';
import { WordAnimator } from 'components';
import { profileFetcher } from 'lib/fetchers/open-source/fetcher';
import meta from 'lib/config/metadata.js';

// TODO: Add SEO
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
  const words = ['Art', 'People', 'Code', 'Passion', 'You'];

  const profile = await profileFetcher();
  const { sponsors = [], followers = [] } = profile;

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
      <Container clean name="people">
        <div className={s.followersContainer}>
          <Fade direction="left" delay={0.5} className="w-full">
            <h2 className="text-4xl font-bold text-center">Still You</h2>

            <Followers followers={followers} />
          </Fade>
        </div>
      </Container>
    </>
  );
}
