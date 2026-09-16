import { Card, CardDescription, CardHeader, CardTitle } from "@shafiq-info/ui";
import { Section } from "@/components/common/section";

const PILLARS = [
  {
    title: "AI-native development",
    description:
      "Every meaningful feature on this site goes through spec → plan → implementation → automated verification → review before it ships.",
  },
  {
    title: "Grounded, not hallucinated",
    description:
      "Ask Shafiq AI answers only from a structured, reviewed knowledge base — it can decline to answer, but it can't invent facts.",
  },
  {
    title: "Structured knowledge, not a PDF",
    description:
      "Profile, experience, projects, and services are typed data first — the AI assistant and the pages themselves read from the same source.",
  },
];

export function AiEngineering() {
  return (
    <Section
      eyebrow="How this site is built"
      title="AI Engineering"
      description="AI isn't a chatbot bolted on top here — it's part of how this site is built and how it answers questions about my work."
    >
      <div className="grid gap-6 sm:grid-cols-3">
        {PILLARS.map((pillar) => (
          <Card key={pillar.title}>
            <CardHeader>
              <CardTitle>{pillar.title}</CardTitle>
              <CardDescription>{pillar.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </Section>
  );
}
