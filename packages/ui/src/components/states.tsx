import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { cn } from "../lib/cn";

export function Spinner({ className }: { className?: string }) {
  return (
    <Loader2
      className={cn("h-5 w-5 animate-spin text-foreground-muted", className)}
      aria-hidden="true"
    />
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-16 text-foreground-muted"
    >
      <Spinner className="h-6 w-6" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <Inbox className="h-8 w-8 text-foreground-muted" aria-hidden="true" />
      <p className="font-medium">{title}</p>
      {description && <p className="max-w-sm text-sm text-foreground-muted">{description}</p>}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center gap-3 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
      <p className="font-medium">{title}</p>
      {description && <p className="max-w-sm text-sm text-foreground-muted">{description}</p>}
    </div>
  );
}
