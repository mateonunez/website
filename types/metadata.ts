export interface Author {
  name: string;
  twitter: string;
  github: string;
  email: string;
  website: string;
}

export interface OpenGraphImage {
  url: string;
  width: number;
  height: number;
  alt: string;
}

export interface OpenGraph {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: OpenGraphImage[];
  locale: string;
  type: string;
}

export interface Icons {
  icon: string;
  shortcut: string;
  apple: string;
}

export interface Twitter {
  card: string;
  title: string;
  description: string;
  creator: string;
}

export interface Metadata {
  title: {
    template: string;
    default: string;
  };
  description: string;
  keywords: string[];
  author: Author;
  authors: Author[];
  colorSchema: string;
  metadataBase: URL;
  openGraph: OpenGraph;
  icons: Icons;
  manifest: string;
  twitter: Twitter;
}
