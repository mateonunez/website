import type { ReactNode } from 'react';
import type { Article } from './article';

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface HeroProps extends BaseProps {
  article: Article;
}

export interface AboutProps extends BaseProps {}

export interface MainLayoutProps extends BaseProps {}
