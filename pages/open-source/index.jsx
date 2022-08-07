import { Container, GitHubProfile, Footer, Header, RepositoryPreview, Title } from 'components';
import { NextSeo } from 'next-seo';

import { profileFetcher } from 'pages/api/open-source/profile';

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const profile = await profileFetcher();

  const { repositories = [] } = profile;
  delete profile['repositories'];

  return {
    props: {
      profile,
      repositories
    }
  };
}

export default function OpenSourcePage({ profile, repositories }) {
  // repositories missing in destructuring
  const { avatar, bio, company, email, username, location, url } = profile;

  console.log(repositories);
  return (
    <>
      <NextSeo
        title="Open Source"
        description="Open Source projects made with ❤️ by Mateo Nunez."
        openGraph={{
          title: "Mateo's Open Source Projects by GitHub"
        }}
      />
      <Header />

      <Container clean>
        <Title>Open Source</Title>

        <div className="flex flex-col">
          <GitHubProfile
            avatar={avatar}
            bio={bio}
            company={company}
            email={email}
            username={username}
            location={location}
            url={url}
            className="mb-12"
          />

          {/* Repositories  */}
          <div className="container">
            {repositories.map(repository => (
              <RepositoryPreview key={repository.name} {...repository} />
            ))}
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}
