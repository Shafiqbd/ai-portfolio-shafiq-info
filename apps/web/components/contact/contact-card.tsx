"use client";

import { Mail, MapPin, Clock, Quote } from "lucide-react";
import { handleSpotlightMove } from "@/lib/spotlight";
import { getSocialItems } from "@/lib/social-links";
import { ContactForm } from "./contact-form";
import type { Availability, Profile } from "@shafiq-info/types";

const AVAILABILITY_LABEL: Record<Availability, string> = {
  available: "Available for work",
  open: "Open to opportunities",
  unavailable: "Not currently available",
};

export function ContactCard({ profile }: { profile: Profile }) {
  const infoItems = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: MapPin, label: "Location", value: profile.location },
    { icon: Clock, label: "Availability", value: AVAILABILITY_LABEL[profile.availability] },
  ];

  const socialItems = getSocialItems(profile);

  return (
    <div
      onMouseMove={handleSpotlightMove}
      style={{ "--spotlight-size": "360px" } as React.CSSProperties}
      className="group shadow-glow relative overflow-hidden rounded-3xl border border-transparent p-6 transition-all duration-300 [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box] sm:p-10"
    >
      <div className="spotlight-effect" aria-hidden="true" />
      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div className="flex flex-1 flex-col gap-4">
          {infoItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-4"
            >
              <span className="bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-sm text-foreground-muted hover:text-accent">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground-muted">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          {socialItems.length > 0 && (
            <div className="rounded-2xl border border-border bg-background/40 p-4">
              <p className="mb-3 text-sm font-semibold">Connect With Me</p>
              <div className="flex gap-3">
                {socialItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent hover:shadow-glow"
                  >
                    <item.Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {profile.tagline && (
            <div className="relative flex flex-col gap-2 rounded-2xl border border-border bg-background/40  p-6">
              <Quote className="h-5 w-5 text-accent/60" aria-hidden="true" />
              <p className="text-balance text-sm italic leading-relaxed text-foreground-muted">
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>
          )}
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
