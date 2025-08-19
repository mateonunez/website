import type { Article } from '@/types/article';
import { getAllArticles } from './parser';

export async function fetchLatestArticles(limit = 5): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}
