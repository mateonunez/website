import * as components from 'components/articles/mdx';

import { Container, Footer, Header, Title } from 'components';
import { Profile as GitHubProfile } from 'components/github/cards/profile';
import { MDXRemote } from 'next-mdx-remote';
import { NextSeo } from 'next-seo';

import { readmeFetcher } from 'pages/api/open-source/readme';
import { profileFetcher } from 'pages/api/open-source/profile';
import { compileSource, minifySource, parseArticleData } from 'lib/articles/parser';

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  const profile = await profileFetcher();

  const { repositories = [] } = profile;
  delete profile['repositories'];

  const { text: raw = '' } = await readmeFetcher();
  const { content } = parseArticleData({ raw });
  const compiledSource = await compileSource({ content });
  const minifiedSource = await minifySource({ compiledSource });

  return {
    props: {
      profile,
      repositories,
      source: minifiedSource
    }
  };
}

export default function OpenSourcePage({ profile, repositories, source }) {
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

        {/* Readme  */}
        <Container clean className="flex h-full mt-12">
          <MDXRemote compiledSource={source} components={components} />
        </Container>
      </div>

      <Footer />
    </>
  );
}
