import Link from "next/link";
import { Link2 } from "lucide-react";
import { primaryNav, site } from "@shafiq-info/config";
import { getProfile } from "@/services/profile.service";

// lucide-react doesn't ship brand icons — a generic link glyph avoids pulling
// in a separate brand-icon package for what's currently an empty list
// (see data/README.md: socialLinks.url is TODO).
export async function Footer() {
  const profile = await getProfile();
  const socialLinks = profile.socialLinks.filter((link) => link.url);

  return (
    <footer className="border-t border-border">
      <div className="container mx-auto flex flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-mono text-sm font-semibold">{site.name}</p>
          <p className="max-w-xs text-sm text-foreground-muted">{profile.tagline}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {socialLinks.length > 0 && (
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="inline-flex h-9 w-9 items-center justify-center rounded-control text-foreground-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="container mx-auto text-xs text-foreground-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
