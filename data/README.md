# Demo data — review checklist

This directory is the Phase-1 data source behind `apps/web/services/*.service.ts`
(see the content model in the plan). Everything here is a **draft seeded from
shafiq.info.bd** and the project brief — it must be reviewed and corrected by
Shafiq before anything ships. Gaps that couldn't be verified are left empty
rather than guessed.

**`articles.json`, `case-studies.json`, and `gallery.json` currently hold
placeholder/sample content** (generic engineering-topic articles, a plausible
but illustrative Nayanogor Somity case study, and abstract gradient tiles
instead of real screenshots) — added on request to preview the full page
designs before real content exists. All of it needs to be replaced with
real, Shafiq-reviewed content before this ships publicly; none of it should
be treated as verified fact about actual work performed.

**`projects.json` now holds 6 real projects with real screenshots**
(Nayanogor Somity, Alahazrat Academy, SawariBD Booking App, the PrideBook
Pro Garments ERP System, MMS, and DMS), replacing the earlier placeholder
list scraped from shafiq.info.bd — see below for what's still outstanding
on each.

## Outstanding TODOs

- **profile.json** — `socialLinks[].url` are empty; the live site shows the
  icons (GitHub, Stack Overflow, LinkedIn, Facebook) but not the exact
  handles/URLs. `avatarUrl` and `resumeUrl` point at asset paths that don't
  exist yet — the Hero currently renders an animated initials placeholder
  (`components/sections/animated-profile.tsx`) instead of a real photo; swap
  in a real headshot via `next/image` once one exists.
- **experiences.json** — now has 4 real roles (IT Consultants PLC, Pridesys
  IT ltd., Rotnogorva Farida Zaman School & College, Techqul) with real
  `address` values, but all 4 still share the exact same placeholder
  `responsibilities`, `technologies`, and `milestoneStage` text — copied
  from the original single-entry seed. The Experience section will keep
  looking repetitive until each entry gets its own real responsibilities/
  stack/milestone label. Two entries also have malformed `endDate` values
  (`"20222-05-30"` on Pridesys, `"20220-03-30"` on Rotnogorva — an extra
  digit in the year) that render as garbage dates; likely meant to be
  `2022-05-30` / `2022-03-30`.
- **projects.json** — 6 real projects, all `featured: true`, each with a
  real `thumbnailUrl` under `apps/web/public/images/projects/<folder>/
banner_img.{png,jpg}` rendered directly in the Featured Projects cards.
  `liveUrl`/`githubUrl` are still omitted on all 6 (unknown) — cards fall
  back to "Read case study"/"View details" when `liveUrl` is missing, and
  hide the "Code" button when `githubUrl` is missing, so add real URLs when
  you have them rather than placeholders. Only `nayanogor-somity` has a
  `caseStudySlug` (pointing at the one real case-studies.json entry) — the
  other 5 had dangling `caseStudySlug` values (pointing at case studies that
  don't exist, which would 404) that were removed rather than guessed at;
  add a real slug back once each project has a written case study.
- **case-studies.json** — holds one **placeholder** case study, renamed from
  "Smart Somity" to **Nayanogor Somity** to match the real project it
  actually describes (plausible content, but not verified against how the
  system actually works) — for design-preview purposes. The other 5 projects
  (Alahazrat Academy, SawariBD, PrideBook Pro, MMS, DMS) still need their own
  real Problem/Context/Architecture/Decisions/Impact write-ups before
  shipping; none exist yet.
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
