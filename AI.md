# Ask Shafiq AI

## Phase 1 (current)

`apps/web/services/ai.service.ts` matches a visitor's question against
`data/faq.json` by keyword overlap and returns either a pre-written, reviewed
answer or nothing. It cannot fabricate an answer — there is no generative
step yet, so there's no hallucination risk. The FAQ entries are grounded only
in verified facts from `data/profile.json`, `data/experiences.json`,
`data/services.json`, etc.

The UI shell (floating "Ask Shafiq AI" button + panel) is scoped to Phase 1's
frontend roadmap (milestone M11) — it exists as an interface even before the
answers behind it are AI-generated.

## Phase 12 (target)

```
User Question
      ↓
Query Processing
      ↓
Embedding
      ↓
PostgreSQL + pgvector
      ↓
Relevant Knowledge (profile, experience, projects, case studies, articles,
                     services, education, certifications, FAQ)
      ↓
LLM
      ↓
Grounded Answer
```

PostgreSQL + pgvector is used instead of a separate vector database, per the
plan's "don't introduce unnecessary complexity" principle — the app already
needs PostgreSQL for `apps/api`.

`askShafiq(question: string): Promise<FaqEntry | undefined>` is the stable
signature both phases share; only the implementation behind it changes.

## Guardrails (apply to every phase, not just Phase 1)

- Answers must be grounded in the structured knowledge base — never invent
  facts about Shafiq's experience, projects, or availability.
- No prompt injection surface: user input is never concatenated into a
  system prompt without sanitization once Phase 12's LLM step exists.
- Rate limiting on the AI endpoint is required before Phase 12 ships (see
  `DEPLOYMENT.md` / `apps/api` once built).
