import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge, Button } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { JsonLd } from "@/components/common/json-ld";
import { ShareButtons } from "@/components/articles/share-buttons";
import { RelatedArticlesCarousel } from "@/components/articles/related-articles-carousel";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { getArticleBySlug, getArticles } from "@/services/article.service";
import { getProfile } from "@/services/profile.service";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

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
  return { title: article.title, description: article.shortDescription };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [article, profile, articles] = await Promise.all([
    getArticleBySlug(slug),
    getProfile(),
    getArticles(),
  ]);
  if (!article) notFound();

  // Same category first, then everything else the author has written.
  const related = articles
    .filter((a) => a.slug !== article.slug)
    .sort((a, b) => Number(b.category === article.category) - Number(a.category === article.category));

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Articles", path: "/articles" },
          { name: article.title, path: `/articles/${article.slug}` },
        ])}
      />
      <Section eyebrow={article.category} title={article.title} titleAs="h1">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <Badge>{article.readingTimeMinutes} min read</Badge>
          <Badge>{formatDate(article.publishedAt)}</Badge>
          {article.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        {/* Banner image */}
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-card sm:aspect-21/9">
          {article.coverImageUrl ? (
            <Image
              src={article.coverImageUrl}
              alt={article.title}
              fill
              priority
              sizes="(min-width: 80rem) 1216px, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="bg-mesh h-full w-full" aria-hidden="true" />
          )}
        </div>

        {/* Author + share */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-border object-cover"
            />
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-foreground-muted">{profile.title}</p>
            </div>
          </div>
          <ShareButtons slug={article.slug} title={article.title} />
        </div>

        {/* Body ships as an HTML string in data/articles.json (repo-authored,
            not user input) — rendered as-is and styled via .article-content. */}
        <article className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight">Related Articles</h2>
            <RelatedArticlesCarousel articles={related} />
          </div>
        )}

        <div className="mt-12">
          <Button asChild variant="ghost">
            <Link href="/articles">Back to all articles</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
