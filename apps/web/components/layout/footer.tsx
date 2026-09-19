import Link from "next/link";
import Image from "next/image";
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
      <div className="site-container mx-auto flex flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col gap-3">
          <Link
            href="/"
            aria-label={site.name}
            className="inline-block w-fit rounded-control bg-[#0a0b0d] px-2.5 py-2 transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(9,160,74,0.6)]"
          >
            <Image
              src="/images/logo/logo.webp"
              alt={site.name}
              width={256}
              height={92}
              className="h-9 w-auto"
            />
          </Link>
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
      </div>

      <div className="border-t border-border px-6 py-4">
        <p className="site-container mx-auto text-xs text-foreground-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
