# Appointly Solutions — Site Audit & Repositioning Findings

Audit date: 2026-06-01. Stack: **Next.js 16.1.6 (App Router only)**, React 19, TypeScript 5.7,
Tailwind 3.4, shadcn/ui. Hosting: Vercel. This audit is read-only; no source files were changed.

> **Context.** Appointly Solutions is a Meta-ads appointment-booking agency for home-service
> contractors: we run the ads, follow up to qualify prospects, and book appointments straight
> onto the contractor's calendar on a pay-for-performance basis. The live site is two
> generations out of date — it positions **insulation** as the headline service (the business
> has moved to **floor coatings** as the featured niche, with insulation now secondary), and it
> sells a **pay-per-lead** model (the business now sells **booked appointments** / pay for
> performance, with no pricing anywhere). This document inventories every conflict and proposes a
> prioritized change plan.

## 1. Page & route inventory

| URL | Source | Purpose | Type |
|---|---|---|---|
| `/` | `app/page.tsx` | Homepage: hero, stats, results, proof, problem, solution, featured posts, CTA | Static |
| `/blog` | `app/blog/page.tsx` | Blog index (featured + full list) | Static |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Blog post template (15 posts via `generateStaticParams`) | Dynamic |
| `/about` | `app/about/page.tsx` | Company/about | Static |
| `/how-it-works` | `app/how-it-works/page.tsx` | Process explanation | Static |
| `/faq` | `app/faq/page.tsx` | FAQ (+ FAQPage schema) | Static |
| `/insulation-contractor-leads` | `app/insulation-contractor-leads/page.tsx` | **Core commercial page** (insulation) | Static |
| `/exclusive-insulation-leads` | `app/exclusive-insulation-leads/page.tsx` | Exclusivity angle | Static |
| `/pay-per-lead-insulation` | `app/pay-per-lead-insulation/page.tsx` | Pricing/PPL model (also the nav "Pricing" target) | Static |
| `/insulation-marketing-agency` | `app/insulation-marketing-agency/page.tsx` | Agency-alternative angle | Static |
| `/spray-foam-contractor-leads` | `app/spray-foam-contractor-leads/page.tsx` | Spray-foam sub-niche | Static |
| `/insulation-contractor-leads-small-markets` | `app/insulation-contractor-leads-small-markets/page.tsx` | Small-market angle | Static |
| `/appointment-setting-for-contractors` | `app/appointment-setting-for-contractors/page.tsx` | Booked-estimate workflow (niche-neutral) | Static |
| `/privacy` | `app/privacy/page.tsx` | Legal | Static |
| `/terms` | `app/terms/page.tsx` | Legal | Static |
| `/thank-you` | `app/thank-you/page.tsx` | Post-booking page (noindex; disallowed in robots) | Static |
| `/sitemap.xml` | `app/sitemap.ts` | Dynamic sitemap | Generated |
| `/robots.txt` | `app/robots.ts` | Dynamic robots | Generated |

**Dynamic content source:** blog posts are Markdown in `content/blog/` (`NN-slug.md`). Slug =
filename minus numeric prefix (`lib/blog.ts:36`). Title/description from frontmatter or first
H1/paragraph. Publish dates are **synthesized** weekly backward from `2026-03-31` by file order
(`lib/blog.ts:9,138`) — not real dates.

## 2. Outdated messaging map (insulation-as-headline + leads/pay-per-lead)

Scale: ~230 occurrences of "insulation" and ~1,697 of "lead(s)" across `.tsx/.ts/.md`.
High-visibility, must-fix locations:

**Global metadata & schema — `app/layout.tsx`**
- `:17` title, `:19` description, `:20-27` keywords — "Pay-Per-Lead for Insulation Contractors".
- `:43-45` OG title/description, `:54` OG image **alt**, `:60-62` Twitter title/description.
- `:90` Organization schema description ("exclusive, pre-qualified leads … pay-per-lead basis").
- `:104-105` LocalBusiness schema description ("Pay-per-lead insulation contractor marketing").
- `:113` **`priceRange: "Pay Per Lead"`** (pricing in schema — must go).

**Homepage — `app/page.tsx`**
- `:18,20` title/description; `:32,34` OG; `:49-50,57` Service schema (`serviceType`/`name`/
  `audienceType` all insulation+PPL); `:96` SEO-links copy ("pay-per-lead model"); `:107` "Fresh
  articles for insulation contractors."

**Core components**
- `components/hero.tsx:9` eyebrow "Lead Generation for Insulation Contractors"; `:14` headline
  "…qualified insulation leads."
- `components/stats.tsx:15` "qualified leads delivered per month"; `:20` "ROI on lead cost";
  `:25` "close rate on qualified leads".
- `components/results.tsx:8,17` testimonial role "Insulation contractor"; `:35` "What insulation
  contractors actually say".
- `components/problem.tsx:12,41` insulation-framed problem copy.
- `components/solution.tsx:21` "attic insulation, spray foam, or removal work"; `:91` "pricing
  model … tied to actual delivery".
- `components/proof-section.tsx:14` "first lead arriving"; `:27` "leads turn into real estimate
  conversations".
- `components/cta.tsx:26` "…kind of insulation work you want more of".
- `components/navbar.tsx:11` "Pricing" → `/pay-per-lead-insulation`; `:50,:81` button "Book A Call".
- `components/footer.tsx:13-18` solution links ("Insulation Leads/Exclusive Leads/Pay Per
  Lead/…"); `:46-47` "Exclusive, qualified insulation leads…"; `:117` "Performance-based lead
  generation".

**Page metadata (each commercial + about page)** carries insulation+PPL titles/descriptions,
e.g. `app/about/page.tsx:36` "You pay per qualified lead delivered.", `:43` "…buy leads with
less risk."; `app/insulation-contractor-leads/page.tsx:48,50`; the entire
`app/pay-per-lead-insulation/page.tsx`, `app/exclusive-insulation-leads/page.tsx`,
`app/spray-foam-contractor-leads/page.tsx`, etc.

**Cross-link graph — `lib/seo-resources.ts`** is entirely insulation/PPL-keyed
(`homepageResources`, `commercialResources`, `getBlogCommercialResources`).

## 3. Pricing references (none should remain on positioning surfaces)

- `app/layout.tsx:113` schema `priceRange: "Pay Per Lead"` — remove.
- `components/navbar.tsx:11` nav label "Pricing" pointing at the PPL page.
- Blog posts contain explicit industry dollar figures: `01-pay-per-lead-…` ($100/lead,
  $2,000–5,000/mo, $10k–20k/mo), `02-exclusive-…` ($50–75, $100–150+/lead), `04-…-without-seo-
  retainer`, `09-…-without-word-of-mouth`, `14-how-much-should-…-pay-per-lead`. Per decision:
  reframe per-lead→per-appointment; retained third-party benchmarks to be listed for sign-off.

## 4. Call-to-action audit

- **Destination is consistent and functional everywhere:**
  `https://client.getappointly.co/strategy-calendar` (external scheduler). No broken/`#`/
  placeholder CTAs found.
- **Labels are inconsistent and lack "free":** navbar `components/navbar.tsx:50,81` "Book A
  Call"; homepage `components/cta.tsx:44` "Book a Call Now"; every commercial/info page hero +
  bottom CTA "Book a Strategy Call" (e.g. `insulation-contractor-leads/page.tsx:100,193`,
  `about/page.tsx:94,239`, `faq/page.tsx:189`, etc.); thank-you `:75` "Book A Call", `:164`
  "View or Reschedule Your Booking".
- **Booking URL is hardcoded** per page (`const bookingUrl = …`) and again in the navbar — no
  single source of truth.
- **Footer has no booking CTA** — only `mailto:patrick@getappointly.co` (`footer.tsx:49-53`).
- Secondary internal CTAs ("See How It Works", "Read the FAQ", etc.) are fine.

## 5. Blog & SEO inventory (15 posts — audience is RIGHT, niche focus is WRONG)

All 15 posts are **contractor-facing** (the correct buyer type — contractors who hire agencies).
Topic focus is insulation/spray-foam/general; **zero floor-coatings content.** Recommendation
column never deletes a ranking page.

| # / slug | Topic | Focus | Recommendation |
|---|---|---|---|
| 01 pay-per-lead-insulation-contractor-leads | PPL vs retainer | Insulation/PPL | Reframe (per-lead→per-appointment) |
| 02 exclusive-insulation-leads-no-monthly-fee | Exclusivity | Insulation | Reframe |
| 03 spray-foam-lead-generation-pay-per-lead | Spray foam | Spray foam/PPL | Reframe |
| 04 get-more-insulation-jobs-without-seo-retainer | No-retainer growth | Insulation | Reframe |
| 05 contractor-lead-generation-no-retainer | No-retainer model | General | Reframe (general → appointments) |
| 06 google-my-business-optimization-… | GBP | Insulation | Keep; light reframe |
| 07 facebook-ads-for-insulation-contractors | Meta ads | Insulation | Keep; light reframe |
| 08 insulation-contractor-marketing-guarantees-leads | Guarantees | Insulation | Reframe |
| 09 get-insulation-jobs-without-word-of-mouth | Beyond referrals | Insulation | Reframe |
| 10 get-more-spray-foam-jobs-fast | Velocity | Spray foam | Reframe |
| 11 why-insulation-contractors-ditching-seo-agencies | Agency alt | Insulation | Keep; light reframe |
| 12 nfc-review-cards-…-more-google-reviews | Reviews | Insulation | Keep; light reframe |
| 13 insulation-contractor-digital-marketing-budget | Budget | Insulation | Reframe |
| 14 how-much-should-insulation-contractors-pay-per-lead | Pricing benchmarks | Insulation/PPL | Reframe to per-appointment; flag $ |
| 15 spring-marketing-plan-insulation-contractors | Seasonal | Insulation | Keep; light reframe (reinforces "seasonal niche") |

**Plus 4–6 NEW floor-coatings posts** (contractor-facing) to seed the featured niche.

## 6. Information-architecture review

Current IA is **flat and single-niche**: all commercial pages live at root, and nav
(`navbar.tsx:9`), footer (`footer.tsx:12`), and cross-links (`seo-resources.ts`) are hardcoded
to insulation. It cannot cleanly host multiple niches without edits in many places.

**Proposed (keep URLs):** a niche **registry** (`lib/niches.ts`) describing each niche
(`slug`, `name`, `status: "featured" | "secondary" | "coming-soon"`, its commercial pages, its
related-link set, its blog tag). Nav/footer/related-links render from the registry.
- `floor-coatings` → `featured` (new pages, see plan).
- `insulation` → `secondary` (existing URLs unchanged, copy reframed).
- `driveway-concrete`, `painting` → defined as `coming-soon` and **not rendered** anywhere yet.

This makes adding a future niche a content/registry addition, not a rebuild.

## 7. Technical & SEO hygiene

**Healthy:** unique per-page titles/descriptions; canonicals on every page; rich JSON-LD
(Organization, LocalBusiness, WebSite, Service, BlogPosting, FAQPage); `app/sitemap.ts` +
`app/robots.ts` (thank-you disallowed, noindex set); no broken/placeholder links; GA4
(`G-MM0NQN3HP0`); `next/font` subset-optimized; no raw `<img>`.

**Issues to fix:**
- **Dead duplicate content:** `blogs/Blog Posts/` (15 files, identical to `content/blog/`) is
  **never served** — `lib/blog.ts:6` fallback path is `"Blogs/Blog Posts"` (capital B) which
  doesn't match the lowercase folder on Linux's case-sensitive FS. Remove the duplicate and the
  unused fallback; canonicalize on `content/blog/`.
- **Pricing in schema:** `app/layout.tsx:113` `priceRange: "Pay Per Lead"`.
- **Stale positioning** in every meta/OG/Twitter/JSON-LD block (Sec. 2).
- **Images unoptimized:** `next.config.mjs` sets `images.unoptimized: true`;
  `public/images/case-studies/ghl-calendar.png` ≈ **1.8 MB**, `appointly-logo.png` ≈ 247 KB.
  Compress; OG image `appointly-og.png` (41 KB) is fine but its content/alt is stale.
- **Sitemap** lists only insulation pages — must add floor-coatings pages/posts and re-balance
  priorities once the featured niche exists.
- No redirects config — correct, since URLs are preserved.

## 8. Brand consistency

- Name "Appointly Solutions" and logo (`appointly-logo.png/.svg`, `BrandMark`) are consistent.
- Stale brand lines: footer tagline `footer.tsx:117` "Performance-based lead generation"; footer
  blurb `:46-47`. Contact `patrick@getappointly.co` and social links
  (instagram/appointlychicago, facebook, linkedin) are current.
- No client names appear (good — keep all proof anonymized).

---

## Proposed Change Plan (Phase 2 — executes only after approval)

Priority order top→bottom. Each group = one or more small commits.

### A. Copy & messaging (highest SEO/brand impact)
1. **Shared constants** — add `lib/site.ts` with `BOOKING_URL` and `CTA_LABEL = "Book a free
   strategy call"`; replace per-page hardcoded `bookingUrl` and navbar/footer/CTA labels with it.
2. **Global metadata/schema** (`app/layout.tsx`) — rewrite title/description/keywords/OG/Twitter/
   OG-alt and Organization + LocalBusiness descriptions to the new positioning; **delete the
   `priceRange` field**.
3. **Homepage** (`app/page.tsx` + `hero/stats/results/proof-section/problem/solution/cta`) —
   keep it **general home-service-contractor** but **feature floor coatings**: end-to-end "ads →
   qualify → booked on your calendar → you run the estimate, do the job, collect the cash";
   stats/proof reframed from "leads" to "booked appointments"; blog heading generalized.
4. **Risk reversal** — add "pay for performance — when we do well, you do well" messaging on
   homepage + each niche hub (no numbers).
5. **Anonymized client proof** — add a results/testimonial block ("an epoxy & garage coating
   contractor we work with": closed the first two appointments we sent, ~60% close rate on
   appointments we send, calendar kept consistently full). Plausible contractor voice, no $.
6. **CTA standardization** — every CTA reads **"Book a free strategy call"** → `BOOKING_URL`;
   add a booking CTA to the footer.

### B. Structural — niche model, URLs preserved
7. **`lib/niches.ts` registry** (Sec. 6); make `navbar.tsx`/`footer.tsx`/`seo-resources.ts`
   data-driven from it.
8. **Floor-coatings niche pages (full niche now)** — create hub + supporting pages mirroring the
   insulation set, appointment-framed. Proposed slugs (final list confirmed before creation,
   since URLs are permanent): `/floor-coating-contractor-marketing` (hub),
   `/epoxy-floor-coating-appointments`, `/garage-floor-coating-appointments`,
   `/exclusive-floor-coating-appointments`, `/floor-coating-marketing-agency`. Reuse
   `/appointment-setting-for-contractors` as the shared, niche-neutral workflow page.
9. **Insulation pages** — keep every URL; reframe copy/meta to appointment/pay-for-performance
   and position insulation as a **secondary seasonal** niche.

### C. SEO & blog
10. **Reframe all 15 posts in place** (no URL changes) per the table in Sec. 5; per-lead→per-
    appointment; insulation as secondary niche.
11. **Add 4–6 floor-coatings posts** (contractor-facing) under `content/blog/` with new numeric
    prefixes; add `niche:`/`audience:` frontmatter (parser already reads frontmatter).
12. **Blog index** (`app/blog/page.tsx`) — optionally group/filter by niche using the new tag.
13. **Sitemap** (`app/sitemap.ts`) — add floor-coatings pages + new posts; set floor-coatings as
    the highest-priority niche; keep insulation entries.
14. **seo-resources** — add floor-coatings cross-link sets; keep existing insulation links valid.

### D. Technical fixes
15. **Remove dead `blogs/Blog Posts/`** and the broken fallback in `lib/blog.ts` (canonicalize on
    `content/blog/`).
16. **Image optimization** — compress `ghl-calendar.png` and the logo; refresh `appointly-og.png`
    + its alt to the new positioning; revisit `images.unoptimized`.
17. **Final sweep** — grep to confirm no "pay per lead"/"per lead"/`priceRange`/our-offer dollar
    figures remain in pages/components/schema/meta; list any retained third-party blog benchmarks
    for sign-off.

### Open items to confirm at Phase 2 start
- Final floor-coatings **slug list** (permanent URLs).
- Whether to fully strip vs. lightly reframe the dollar benchmarks inside the 4–5 pricing-heavy
  posts (exact lines will be shown).
