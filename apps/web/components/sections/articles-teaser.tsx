import Link from "next/link";
import { Badge, Button, Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";
import { RevealGroup } from "@/components/common/reveal";
import { getArticles } from "@/services/article.service";

export async function ArticlesTeaser() {
  const articles = await getArticles();
  if (articles.length === 0) return null;

  return (
    <Section
      eyebrow="Writing"
      title="Articles"
      description="Notes on building this kind of system."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        <RevealGroup>
          {articles.slice(0, 3).map((article) => (
            <Link key={article.slug} href={`/articles/${article.slug}`}>
              <Card className="h-full">
                <CardHeader>
                  <Badge className="w-fit">{article.category}</Badge>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.excerpt}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </RevealGroup>
      </div>
      <div className="mt-8">
        <Button asChild variant="ghost">
          <Link href="/articles">All articles</Link>
        </Button>
      </div>
    </Section>
  );
}
