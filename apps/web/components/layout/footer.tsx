import Link from "next/link";
import Image from "next/image";
import { Quote } from "lucide-react";
import { footerExploreeNav, footerResourceNav, site, type NavItem } from "@shafiq-info/config";
import { CtaBanner } from "@/components/common/cta-banner";
import { getProfile } from "@/services/profile.service";
import { getSocialItems } from "@/lib/social-links";
import { FooterBackToTop } from "./footer-back-to-top";

/*
 * Brand copy from the approved footer design. The quote text itself comes
 * from profile.tagline (data/profile.json) — if one changes, revisit the
 * other so quote and attribution stay paired.
 */
const MOTTO = ["Ideas", "Tech", "Real Impact"] as const;
const BRAND_BLURB =
  "Full Stack Software Engineer, Learner and Creator sharing knowledge and building solutions for a better tomorrow.";

/** The five platforms shown in the footer row; Stack Overflow stays on the Home floating rail only. */
const FOOTER_SOCIAL_PLATFORMS = ["GitHub", "LinkedIn", "YouTube", "Facebook", "Email"];

export async function Footer() {
  const profile = await getProfile();
  const socialItems = getSocialItems(profile).filter((item) =>
    FOOTER_SOCIAL_PLATFORMS.includes(item.label),
  );

  return (
    <footer className="border-t border-border">
      <div className="site-container mx-auto px-6 pt-12">
        <CtaBanner />

        <div className="grid gap-x-8 gap-y-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.8fr_1.4fr] lg:gap-x-0">
          {/* Brand */}
          <div >
            <Link
              href="/"
              aria-label={site.name}
              className="inline-block w-fit rounded-control bg-[#0a0b0d] px-2.5 py-2 transition-transform duration-300 hover:scale-110 hover:drop-shadow-[0_0_12px_rgba(9,160,74,0.6)]"
            >
              <Image src="/images/logo/logo.webp" alt={site.name} width={256} height={92} className="h-18 lg:h-11  w-auto" />
            </Link>
            <p className="mt-4 flex flex-wrap items-center gap-x-3 text-[11px] font-medium uppercase tracking-[0.35em] text-foreground-muted">
              {MOTTO.map((word, index) => (
                <span key={word} className="flex items-center gap-x-3">
                  {index > 0 && (
                    <span className="text-accent" aria-hidden="true">
                      •
                    </span>
                  )}
                  {word}
                </span>
              ))}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground-muted">{BRAND_BLURB}</p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {socialItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={item.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elevated text-foreground-muted transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent hover:shadow-glow active:scale-95"
                  >
                    <item.Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterLinkColumn title="Explore" items={footerExploreeNav} />
          <div className="lg:ml-10">
        <FooterLinkColumn title="Resources" items={footerResourceNav} />
          </div>
  

          {/* Quote + footer art */}
          <div className="relative lg:pl-10">
            <div className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-full shadow-glow">
              <Quote className="h-5 w-5 fill-white text-white" aria-hidden="true" />
            </div>
            <blockquote className="mt-5 max-w-sm">
              <p className="text-lg italic leading-relaxed">{profile.tagline}</p>
              <cite className="mt-3 block text-sm not-italic text-foreground-muted">{profile.philosophy}</cite>
            </blockquote>

            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 select-none lg:block">
              <div className="dot-grid absolute bottom-3 left-8 h-20 w-24 opacity-40" />
              <div className="absolute right-0 -top-5 -rotate-6 text-right font-script text-xl leading-tight text-accent/80">
                <span className="block">Better</span>
                <span className="block">People</span>
                <span className="block">Brighter Tomorrow</span>
              </div>
              <div className="absolute bottom-0 right-4">
                <span className="absolute -top-3 right-28 block h-4 w-4 rounded-full bg-accent/80" />
                <svg viewBox="0 0 220 64" className="w-64 text-accent" fill="currentColor">
                  <path opacity="0.3" d="M30 64 L88 20 L126 50 L172 24 L220 64 Z" />
                  <path opacity="0.55" d="M0 64 L52 32 L92 58 L148 28 L196 64 Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 md:flex-row">
          <p className="text-xs text-foreground-muted">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <p className="hidden text-xs text-foreground-muted xl:block"><span className="font-medium text-foreground-muted mr-2">Built with:</span> • Next.js • TypeScript • Tailwind CSS • Nestjs • PostgreSQL</p>
            <FooterBackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, items }: { title: string; items: NavItem[] }) {
  return (
    <nav aria-label={title} className="">
      <h3 className="text-base font-semibold">{title}</h3>
      <span aria-hidden="true" className="bg-gradient-brand mt-2 block h-0.5 w-8 rounded-full" />
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex text-sm text-foreground-muted transition-all duration-200 hover:translate-x-1 hover:text-foreground"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
