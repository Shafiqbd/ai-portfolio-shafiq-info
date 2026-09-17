"use client";

import {
  Atom,
  Triangle,
  Braces,
  Component,
  Wind,
  PanelsTopLeft,
  Hash,
  FileCode,
  Paintbrush,
  Server,
  Hexagon,
  Webhook,
  Database,
  Container,
  Zap,
  Workflow,
  PenTool,
  Image as ImageIcon,
  Layers,
  Bot,
  Brain,
  Sparkles,
  FileCode2,
  Layers3,
  Binary,
  Leaf,
  GitBranch,
  HardDrive,
  ServerCog,
  MousePointerClick,
  ScanSearch,
  Code2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent, Card } from "@shafiq-info/ui";
import { RevealGroup } from "@/components/common/reveal";
import type { SkillCategory } from "@shafiq-info/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Atom,
  Triangle,
  Braces,
  Component,
  Wind,
  PanelsTopLeft,
  Hash,
  FileCode,
  Paintbrush,
  Server,
  Hexagon,
  Webhook,
  Database,
  Container,
  Zap,
  Workflow,
  PenTool,
  Image: ImageIcon,
  Layers,
  Bot,
  Brain,
  Sparkles,
  FileCode2,
  Layers3,
  Binary,
  Leaf,
  GitBranch,
  HardDrive,
  ServerCog,
  MousePointerClick,
  ScanSearch,
};

function SkillCard({ name, icon }: { name: string; icon?: string }) {
  const Icon = (icon && ICON_MAP[icon]) || Code2;
  return (
    <Card sparkle className="flex items-center gap-3 p-4 hover:-translate-y-0.5">
      <span className="bg-gradient-brand flex h-10 w-10 shrink-0 items-center justify-center rounded-control text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="font-medium text-foreground">{name}</span>
    </Card>
  );
}

export function TechStackTabs({ categories }: { categories: SkillCategory[] }) {
  const allSkills = Array.from(
    new Map(categories.flatMap((category) => category.skills).map((skill) => [skill.name, skill])).values(),
  );

  const tabs: SkillCategory[] = [{ category: "All Skills", skills: allSkills }, ...categories];

  return (
    <Tabs defaultValue="All Skills">
      <TabsList className="h-auto flex-wrap justify-start gap-2 border-none bg-transparent p-0">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.category}
            value={tab.category}
            className="rounded-control border border-border px-4 py-2 text-sm data-[state=active]:border-transparent data-[state=active]:bg-gradient-brand data-[state=active]:text-white data-[state=active]:shadow-glow"
          >
            {tab.category}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.category} value={tab.category}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <RevealGroup>
              {tab.skills.map((skill) => (
                <SkillCard key={skill.name} name={skill.name} icon={skill.icon} />
              ))}
            </RevealGroup>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
