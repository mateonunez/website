import { Footer, Header, Title } from 'components';
import { NextSeo } from 'next-seo';
import { profileFetcher } from 'pages/api/open-source/profile';
import { Profile as GitHubProfile } from 'components/github/cards/profile';
import { readmeFetcher } from 'pages/api/open-source/readme';
export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const profile = await profileFetcher();

  const { repositories = [] } = profile;

  const readme = await readmeFetcher();
  console.log({ readme });
  // `
  // curl \
  //   -H "Accept: application/vnd.github+json" \
  //   -H "Authorization: token <TOKEN>" \
  //   https://api.github.com/repos/OWNER/REPO/contents/PATH
  // `
  return {
    props: {
      profile,
      repositories
    }
  };
}

export default function OpenSourcePage({ profile }) {
  // repositories missing in destructuring
  const { avatar, bio, company, email, username, location, url } = profile;

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

      <Title>Open Source</Title>

      <GitHubProfile
        avatar={avatar}
        bio={bio}
        company={company}
        email={email}
        username={username}
        location={location}
        url={url}
      />

      <Footer />
    </>
  );
}
