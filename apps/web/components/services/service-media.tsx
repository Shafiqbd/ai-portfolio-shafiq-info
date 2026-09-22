import Image from "next/image";
import { cn } from "@shafiq-info/ui";
import { ServiceIcon } from "@/components/common/service-icon";
import type { Service } from "@shafiq-info/types";

/**
 * Showcase media for a service: autoplaying video, cover image, or a branded
 * gradient fallback when no media exists. Shared by the home services teaser
 * and the service detail page banner. Pass `className` to override the
 * default 16:9 sizing (e.g. a shorter crop on the detail page).
 */
export function ServiceMedia({ service, className }: { service: Service; className?: string }) {
  if (service.media?.type === "video") {
    return (
      <video
        src={service.media.url}
        autoPlay
        muted
        loop
        playsInline
        className={cn("shadow-glow aspect-video w-full rounded-xl object-cover", className)}
      />
    );
  }

  if (service.media?.type === "image") {
    // Banner images are designed graphics with text baked in — never crop
    // them. Natural ratio, but capped so wide banners don't get towering;
    // when the cap binds they scale down proportionally and center.
    return (
      <Image
        src={service.media.url}
        alt={service.title}
        width={1920}
        height={1080}
        className={cn(
          "shadow-glow mx-auto h-auto max-h-120 w-auto max-w-full rounded-xl",
          className,
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "shadow-glow relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-transparent [background:linear-gradient(var(--background-elevated),var(--background-elevated))_padding-box,var(--gradient-brand-soft)_border-box]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="bg-mesh animate-mesh-drift pointer-events-none absolute inset-0 opacity-60 blur-2xl"
      />
      <ServiceIcon
        icon={service.icon}
        className="relative h-20 w-20 rounded-2xl"
        iconClassName="h-10 w-10"
      />
    </div>
  );
}
