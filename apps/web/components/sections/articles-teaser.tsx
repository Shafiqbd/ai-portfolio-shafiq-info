import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/common/section";
import { getArticles } from "@/services/article.service";
import { ArticlesGrid } from "./articles-grid";

export async function ArticlesTeaser() {
  const articles = await getArticles();
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <Section>
      <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            From My Keyboard
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Latest Articles <span className="text-gradient-brand">&amp; Insights</span>
          </h2>
        </div>

        <Link
          href="/articles"
          className="hover:shadow-glow hidden h-28 w-28 shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-accent/40 text-center text-sm font-medium transition-all duration-300 hover:scale-105 sm:flex"
        >
          <span>
            View All
            <br />
            Articles
          </span>
          <ArrowRight className="h-4 w-4 text-accent" aria-hidden="true" />
        </Link>
      </div>

      <ArticlesGrid featured={featured} rest={rest} />
    </Section>
  );
}
