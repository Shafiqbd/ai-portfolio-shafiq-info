"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { handleSpotlightMove } from "@/lib/spotlight";
import type { Article } from "@shafiq-info/types";

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Compact numbered list-row card — the right-hand design from the home
 * articles teaser, also used by the related-articles carousel. Rows carry
 * their own top border; wrap them in a `border-b` container for a closed
 * list look.
 */
export function ArticleRow({ article, index }: { article: Article; index: number }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      onMouseMove={handleSpotlightMove}
      style={{ "--spotlight-size": "130px" } as React.CSSProperties}
      className="group hover:shadow-glow relative flex items-center gap-4 border-t border-border py-5 transition-shadow duration-300"
    >
      <div className="spotlight-effect" aria-hidden="true" />
      <span className="relative font-mono text-sm text-foreground-muted">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
        {article.coverImageUrl ? (
          <Image src={article.coverImageUrl} alt={article.title} fill className="object-cover" />
        ) : (
          <div className="bg-mesh h-full w-full" aria-hidden="true" />
        )}
      </div>
      <div className="relative flex-1">
        <p className="font-mono text-xs uppercase tracking-wide text-accent">{article.category}</p>
        <h4 className="font-semibold leading-snug">{article.title}</h4>
        <p className="mt-1 text-xs text-foreground-muted">{formatDate(article.publishedAt)}</p>
      </div>
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors group-hover:border-accent group-hover:text-accent">
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}
