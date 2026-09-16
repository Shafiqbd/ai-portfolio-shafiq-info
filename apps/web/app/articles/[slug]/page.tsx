import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { getArticleBySlug, getArticles } from "@/services/article.service";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <Section eyebrow={article.category} title={article.title}>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Badge>{article.readingTimeMinutes} min read</Badge>
        {article.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <p className="max-w-2xl text-foreground-muted">{article.excerpt}</p>

      {/* Full MDX body rendering is wired up once the first real article
          (data/articles/*.mdx, referenced by article.contentPath) exists —
          no MDX toolchain to maintain for zero articles. */}

      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href="/articles">Back to all articles</Link>
        </Button>
      </div>
    </Section>
  );
}
