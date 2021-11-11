import Head from 'next/head';

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Mateo's homepage" />
        <meta name="author" content="Mateo Nunez" />
        <meta name="author" content="mateonunez" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" /> {/* apple */}
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" /> {/* favicon */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@mateonunez95" />
        <meta name="twitter:creator" content="@mateonunez95" />
        <meta name="twitter:image" content="/card.png" /> {/* card */}
        <meta property="og:site_name" content="Mateo Nunez's Homepage" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/card.png" /> {/* card */}
        <title>Mateo Nunez - Homepage</title>
      </Head>

      {/* Navbar??? */}

      <main>{children}</main>
    </>
  );
}
