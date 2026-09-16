# Demo data — review checklist

This directory is the Phase-1 data source behind `apps/web/services/*.service.ts`
(see the content model in the plan). Everything here is a **draft seeded from
shafiq.info.bd** and the project brief — it must be reviewed and corrected by
Shafiq before anything ships. Nothing in this directory is fabricated (no
invented metrics, clients, or project details); gaps are left empty rather
than guessed.

## Outstanding TODOs

- **profile.json** — `socialLinks[].url` are empty; the live site shows the
  icons (GitHub, Stack Overflow, LinkedIn, Facebook) but not the exact
  handles/URLs. `avatarUrl` and `resumeUrl` point at asset paths that don't
  exist yet.
- **experiences.json** — only the current role (IT Consultants PLC) is
  captured. The spec's career-milestone story (CSE → ... → International
  Engineering) needs earlier roles/education context to fill out the full
  timeline.
- **projects.json** — the 6 projects match what's live on shafiq.info.bd.
  `liveUrl`/`githubUrl` are omitted (unknown), `features` are empty, and
  `thumbnailUrl` paths don't have real assets yet.
- **case-studies.json** — intentionally empty. The spec's flagship case
  studies (Smart Somity, Sawaribd, German Butcher) need Problem/Context/
  Architecture/Decisions/Impact content that only Shafiq can supply — Sawaribd
  and German Butcher aren't on the live site at all yet.
- **articles.json** / **gallery.json** — intentionally empty; no articles or
  gallery assets exist yet.
- **services.json** — seeded from the spec's proposed service list (§16), not
  the live site's older list. `deliveredVia.url` for TechQul-delivered
  services is empty pending the actual TechQul URL.
- **education.json** / **certifications.json** — institution/degree/cert name
  are from the spec; exact start/end years and issue date are omitted rather
  than guessed (`startYear`/`issuedDate` are optional in the type for this
  reason).
