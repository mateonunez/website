import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="antialiased text-gray-400 bg-gray-900">
          <Main />
          <NextScript />
          {/* Insert Google Tag Manager */}
        </body>
      </Html>
    );
  }
}
