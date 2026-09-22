import { site } from "@shafiq-info/config";
import { FacebookIcon, LinkedinIcon, XIcon } from "@/components/common/brand-icons";

/**
 * Social share row for the article detail page. Share targets open the
 * platforms' own share endpoints in a new tab — no SDK, no tracking.
 */
export function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const url = `${site.url}/articles/${slug}`;
  const shareTargets = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      Icon: FacebookIcon,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Icon: LinkedinIcon,
    },
    {
      label: "X (Twitter)",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      Icon: XIcon,
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-foreground-muted">Share</span>
      {shareTargets.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elevated text-foreground-muted transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent hover:shadow-glow active:scale-95"
        >
          <Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
}
