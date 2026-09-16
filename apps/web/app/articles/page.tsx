import type { Metadata } from "next";
import Link from "next/link";
import { Badge, Card, CardDescription, CardHeader, CardTitle, EmptyState } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
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
        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <Card className="h-full transition-colors hover:border-accent">
                <CardHeader>
                  <Badge className="w-fit">{article.category}</Badge>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
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
