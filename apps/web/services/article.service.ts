import type { Article } from "@shafiq-info/types";
import articlesData from "@data/articles.json";

const articles = articlesData as Article[];

export async function getArticles(): Promise<Article[]> {
  return articles;
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return articles.find((article) => article.slug === slug);
}
