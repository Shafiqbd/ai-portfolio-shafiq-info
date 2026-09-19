import { cn } from "@shafiq-info/ui";
import { getProfile } from "@/services/profile.service";
import { getSocialItems } from "@/lib/social-links";

export async function FloatingSocial() {
  const profile = await getProfile();
  const items = getSocialItems(profile);

  if (items.length === 0) return null;

  return (
    <div className="fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 2xl:flex">
      <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs uppercase tracking-widest text-foreground-muted">
        Connect Me
      </span>
      <span className="bg-gradient-brand h-8 w-0.5 rounded-full" aria-hidden="true" />
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            aria-label={item.label}
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background-elevated text-foreground-muted transition-all duration-300 ease-out",
              "hover:shadow-glow hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent active:scale-95",
            )}
          >
            <item.Icon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6" />
          </a>
        ))}
      </div>
    </div>
  );
}
