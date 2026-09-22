import type { Metadata } from "next";
import { EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { ArticleCard } from "@/components/articles/article-card";
import { getArticles } from "@/services/article.service";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Technical writing on full-stack engineering, architecture, and AI-native development.",
};

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <Section eyebrow="Writing" title="Articles" titleAs="h1">
      {articles.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RevealGroup>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </RevealGroup>
        </div>
      ) : (
        <EmptyState
          title="No articles published yet"
          description="Technical write-ups are on the way — check back soon."
        />
      )}
    </Section>
  );
}
