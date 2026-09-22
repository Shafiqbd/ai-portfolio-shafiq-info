"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";
import { handleSpotlightMove } from "@/lib/spotlight";
import type { Article } from "@shafiq-info/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  /** Shows the "Featured" badge over the cover image. */
  featured?: boolean;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      onMouseMove={handleSpotlightMove}
      style={{ "--spotlight-size": "360px" } as React.CSSProperties}
      className="group hover:shadow-glow relative flex h-full flex-col overflow-hidden rounded-xl border border-border transition-all duration-300 hover:border-accent/40"
    >
      <div className="spotlight-effect" aria-hidden="true" />
      <div className="relative aspect-video w-full overflow-hidden">
        {article.coverImageUrl ? (
          <Image
            src={article.coverImageUrl}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-mesh h-full w-full" aria-hidden="true" />
        )}
        {featured && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
            <Star className="h-3 w-3 fill-accent text-accent" aria-hidden="true" />
            Featured
          </span>
        )}
        <span className="absolute right-4 top-4 rounded-full bg-background/80 px-3 py-1 text-xs text-foreground-muted backdrop-blur">
          {formatDate(article.publishedAt)}
        </span>
      </div>
      <div className="relative flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">{article.category}</p>
        <h3 className="text-xl font-semibold tracking-tight">{article.title}</h3>
        <p className="text-sm text-foreground-muted">{article.shortDescription}</p>
        <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent">
          Read Article
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
