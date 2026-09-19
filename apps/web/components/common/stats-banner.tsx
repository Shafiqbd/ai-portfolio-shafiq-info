import { Card } from "@shafiq-info/ui";
import { RevealGroup } from "@/components/common/reveal";

type StatItem = {
  icon: React.ElementType;
  value: string;
  label: string;
};

export function StatsBanner({ stats }: { stats: StatItem[] }) {
  if (stats.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <RevealGroup>
        {stats.map((stat) => (
          <Card key={stat.label} sparkle className="p-5 text-center">
            <stat.icon className="mx-auto mb-2 h-5 w-5 text-accent" aria-hidden="true" />
            <p className="text-gradient-brand text-2xl font-bold sm:text-3xl">{stat.value}</p>
            <p className="text-xs text-foreground-muted">{stat.label}</p>
          </Card>
        ))}
      </RevealGroup>
    </div>
  );
}
