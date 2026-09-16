# Demo data — review checklist

This directory is the Phase-1 data source behind `apps/web/services/*.service.ts`
(see the content model in the plan). Everything here is a **draft seeded from
shafiq.info.bd** and the project brief — it must be reviewed and corrected by
Shafiq before anything ships. Gaps that couldn't be verified are left empty
rather than guessed.

**`articles.json`, `case-studies.json`, and `gallery.json` currently hold
placeholder/sample content** (generic engineering-topic articles, a plausible
but illustrative Smart Somity case study, and abstract gradient tiles instead
of real screenshots) — added on request to preview the full page designs
before real content exists. All of it needs to be replaced with real,
Shafiq-reviewed content before this ships publicly; none of it should be
treated as verified fact about actual work performed.

## Outstanding TODOs

- **profile.json** — `socialLinks[].url` are empty; the live site shows the
  icons (GitHub, Stack Overflow, LinkedIn, Facebook) but not the exact
  handles/URLs. `avatarUrl` and `resumeUrl` point at asset paths that don't
  exist yet — the Hero currently renders an animated initials placeholder
  (`components/sections/animated-profile.tsx`) instead of a real photo; swap
  in a real headshot via `next/image` once one exists.
- **experiences.json** — the spec's career-milestone story (CSE → ... →
  International Engineering) still needs earlier roles/education context to
  fill out the full timeline. Each entry also supports an optional
  `location` field (shown under the role/dates on the Experience timeline)
  that's currently unset on every entry — add real city/country (or
  "Remote") per role when known.
- **projects.json** — the 6 projects match what's live on shafiq.info.bd.
  `liveUrl`/`githubUrl` are omitted (unknown), `features` are empty, and
  `thumbnailUrl` paths don't have real assets yet.
- **case-studies.json** — holds one **placeholder** Smart Somity case study
  (plausible but not verified against how the system actually works) for
  design-preview purposes. The spec's other flagship case studies (Sawaribd,
  German Butcher) still need real source material — Sawaribd and German
  Butcher aren't on the live site at all yet. Replace the Smart Somity entry
  with the real Problem/Context/Architecture/Decisions/Impact before shipping.
- **articles.json** — holds 3 **placeholder** articles (generic engineering
  topics matching Shafiq's stack) for design-preview purposes; no MDX body is
  wired up yet (see the article `[slug]` page). Replace with real writing
  before shipping.
- **gallery.json** — abstract gradient tiles (no real screenshots exist yet)
  labeled with engineering-discipline captions rather than pretending to be
  real project photos. Swap for real screenshots when available.
- **services.json** — seeded from the spec's proposed service list (§16), not
  the live site's older list. `deliveredVia.url` for TechQul-delivered
  services is empty pending the actual TechQul URL.
- **education.json** / **certifications.json** — institution/degree/cert name
  are from the spec; exact start/end years and issue date are omitted rather
  than guessed (`startYear`/`issuedDate` are optional in the type for this
  reason).
- **resume.json** — the three variants from the spec (§21) are stubbed with
  empty `fileUrl`s; the Resume page shows "not available yet" until real
  PDFs are supplied.
