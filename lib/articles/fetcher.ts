import { getAllArticles } from './parser';
import type { Article } from '@/types/article';

export async function fetchLatestArticles(limit = 5): Promise<Article[]> {
  const articles = await getAllArticles();
  return articles.slice(0, limit);
}
