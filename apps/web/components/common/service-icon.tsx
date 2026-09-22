import {
  BriefcaseBusiness,
  BrainCircuit,
  Calculator,
  Code2,
  Plug,
  RefreshCw,
  ServerCog,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@shafiq-info/ui";

const ICON_MAP: Record<string, LucideIcon> = {
  Code2,
  Wrench,
  Calculator,
  BrainCircuit,
  ServerCog,
  BriefcaseBusiness,
  Plug,
  RefreshCw,
};

export function ServiceIcon({
  icon,
  className,
  iconClassName,
}: {
  icon?: string;
  className?: string;
  iconClassName?: string;
}) {
  const Icon = (icon && ICON_MAP[icon]) || Sparkles;
  return (
    <span
      className={cn(
        "bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-control text-white",
        className,
      )}
    >
      <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden="true" />
    </span>
  );
}
