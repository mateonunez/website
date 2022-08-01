import { Footer, Header, Title } from 'components';
import { NextSeo } from 'next-seo';

export async function getServerSideProps({ res }) {
  res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {}
  };
}

export default function OpenSourcePage() {
  return (
    <>
      <NextSeo
        title="Open Source"
        description="Open Source projects made with ❤️ by Mateo Nunez."
        openGraph={{
          title: "Mateo's Open Source Projects"
        }}
      />
      <Header />

      <Title>Open Source</Title>

      <Footer />
    </>
  );
}
