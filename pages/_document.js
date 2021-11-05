import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="it">
        <Head /> {/* Insert in head SEO parameters */}
        <body>
          <Main />
          <NextScript />
          {/* Insert Google Tag Manager */}
        </body>
      </Html>
    );
  }
}
