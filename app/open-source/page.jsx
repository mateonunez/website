import { Container, Fade, Followers, GitHubProfile, RepositoryPreview, Title } from 'components';

import { profileFetcher } from 'pages/api/open-source/profile';

export default async function OpenSourcePage() {
  const profile = await profileFetcher();

  const { repositories = [], followers = [] } = profile;

  delete profile['repositories'];
  delete profile['followers'];

  followers.sort(() => Math.random() - 0.5);

  const { avatar, bio, company, email, username, location, url } = profile;

  return (
    <>
      {/* <NextSeo
        title="Open Source"
        description="Open Source projects made with ❤️ by Mateo Nunez."
        openGraph={{
          title: "Mateo's Open Source Projects by GitHub"
        }}
      /> */}
      <Container clean>
        <Title>Open Source</Title>

        <div className="flex flex-col">
          <Container>
            <Fade delay={0.3}>
              <GitHubProfile
                avatar={avatar}
                bio={bio}
                company={company}
                email={email}
                username={username}
                location={location}
                url={url}
                className="mb-24"
              />
            </Fade>
          </Container>

          {/* Followers  */}
          <Container>
            <Fade delay={1.3}>
              <Followers followers={followers} />
            </Fade>
          </Container>

          {/* Repositories  */}
          <Container>
            <Fade delay={3}>
              {repositories.map(repository => (
                <RepositoryPreview key={repository.name} {...repository} />
              ))}
            </Fade>
          </Container>
        </div>
      </Container>
    </>
  );
}
