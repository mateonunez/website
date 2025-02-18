export interface ArticleAuthor {
  name: string;
  url: string;
  image: string;
}

export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  slug: string;
  permalink: string;
  readingTime: number;
  tags: string[];
  categories: string[];
  image: string;
  author: ArticleAuthor;
  [key: string]: unknown;
}

export interface Article {
  compiledSource: string;
  frontmatter: ArticleFrontmatter;
}
