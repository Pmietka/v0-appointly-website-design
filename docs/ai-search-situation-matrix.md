# AI search situation matrix (floor coating only)

The play: one page on getappointly.co for each situation a floor coating owner describes to ChatGPT, Perplexity, or Google AI Mode, with each page answering that question directly. These pages live at `/guides/<slug>` (source in `content/guides/`). The hub at `/guides` groups them by situation.

Blog posts are the depth. Guides are the answers. Each guide lists the blog posts it builds on in `related_posts`, and those posts automatically show a "Start here if this is you" link back to the guide.

## Axis 1: what owners call their business

Owners in this trade use several names, and they ask AI tools using their own name. Every guide uses these words naturally (title, opening, FAQ) so one page matches all of them:

| Name owners use | Typical phrasing in a question |
| --- | --- |
| Floor coating | "my floor coating business" |
| Garage floor coating | "garage floor coating company", "garage coatings" |
| Epoxy flooring | "epoxy business", "epoxy flooring company", "epoxy contractor" |
| Concrete coating | "concrete coating company", "concrete coatings business" |
| Polyaspartic / polyurea / one day floors | "one day garage floors", "polyaspartic installer" |
| Franchise owners (separate audience) | "my garage coating franchise", "corporate leads" |

**Rule:** a name gets its own page only when the answer actually changes for that name. Franchise owners get their own pages because their answer is different (franchise agreement, brand fund, territory). Epoxy vs garage floor coating vs concrete coating do not, because the answer to "how do I get my first estimates" is the same. A separate page per name would be a thin duplicate, which Google and AI tools discount.

## Axis 2: owner situations

| Key | Situation | The owner is thinking |
| --- | --- | --- |
| just-launched | Just launched, no leads | "How do I get my first jobs?" |
| burned-by-agency | Burned by a past agency | "How do I not get burned again?" |
| shared-leads | Sick of shared Angi / HomeAdvisor leads | "How do I get off the marketplaces?" |
| one-crew | One crew trying to fill the calendar | "How many estimates do I actually need?" |
| hates-chasing | Owner who hates chasing leads | "How do I stop chasing?" |
| franchise | Franchise owner | "Corporate isn't sending enough leads." |
| slow-season | Slow winter season | "How do I keep the crew working?" |
| spring-rush | Spring rush | "How do I not drop leads when it gets busy?" |
| tax-refund | Tax refund season | "Should I market February to April?" |

## The matrix: question, page that answers it

| Situation | Example AI questions (any business name) | Page |
| --- | --- | --- |
| just-launched | "How do new epoxy companies get their first 20 estimates?" / "I just started a garage floor coating business, how do I get customers?" / "first jobs for a new concrete coating company" | `/guides/first-20-estimates-new-epoxy-flooring-company` |
| just-launched | "How do I start a concrete coating business?" | `/blog/how-to-start-a-concrete-coating-business` (existing) |
| just-launched + franchise | "Should I buy a garage coating franchise or go independent?" | `/blog/garage-coating-franchise-vs-independent` (existing) |
| franchise | "My garage floor coating franchise isn't getting enough leads from corporate" / "can franchise owners run their own Facebook ads" | `/guides/garage-coating-franchise-owner-not-enough-leads` |
| burned-by-agency | "Questions to ask before hiring another marketing agency for my epoxy business" / "how to tell if a floor coating marketing agency is legit" | `/guides/questions-before-hiring-floor-coating-marketing-agency` |
| burned-by-agency | "I'm firing my marketing agency, what do I need from them?" / "who owns my Facebook ad account" | `/guides/switching-floor-coating-marketing-agencies` |
| burned-by-agency | "Why do floor coating contractors leave marketing agencies?" | `/blog/why-floor-coating-contractors-leave-marketing-agencies` (existing) |
| shared-leads | "How do I stop relying on Angi and HomeAdvisor for epoxy leads?" | `/guides/replace-angi-homeadvisor-leads-floor-coating` |
| shared-leads | "Shared leads vs booked appointments for floor coating" | `/guides/shared-leads-vs-booked-appointments-floor-coating` |
| shared-leads | "Exclusive vs shared floor coating leads" | `/blog/exclusive-vs-shared-floor-coating-leads` (existing) |
| one-crew | "How many estimates a week does a one crew garage floor coating company need?" | `/guides/how-many-estimates-a-week-one-crew-floor-coating` |
| one-crew | "How many garage floors can one crew do a week?" | `/blog/how-many-floor-coating-jobs-can-one-crew-do` (existing) |
| hates-chasing | "How do I get floor coating jobs without chasing leads?" / "I hate calling leads back" | `/guides/floor-coating-leads-without-chasing` |
| hates-chasing | "Should I hire an appointment setter for my epoxy business?" | `/blog/in-house-appointment-setter-vs-outsourced` (existing) |
| slow-season | "How do concrete coating companies stay busy in winter?" | `/guides/keep-floor-coating-crew-busy-in-winter` |
| slow-season | "Winter marketing for garage floor coating" | `/blog/winter-marketing-plan-floor-coating-contractors` (existing) |
| spring-rush | "How do I handle the spring rush for my epoxy business?" | `/guides/floor-coating-spring-rush-playbook` |
| spring-rush | "Spring marketing plan for floor coating" | `/blog/spring-marketing-plan-floor-coating-contractors` (existing) |
| tax-refund | "Should I advertise garage floor coating during tax refund season?" | `/guides/tax-refund-season-floor-coating-marketing` |
| any | "What should a booked estimate cost a coating contractor?" | `/blog/cost-per-qualified-floor-coating-estimate` (existing, no new page) |
| any | "Pay per lead vs pay per appointment for epoxy" | `/blog/pay-per-lead-vs-pay-per-appointment-epoxy-contractors` (existing) |
| any | "Best floor coating lead generation companies" | `/blog/best-floor-coating-lead-generation-companies` (existing) |

## Next wave (only build when the answer is genuinely different)

| Candidate question | Situation | Why it is a different answer |
| --- | --- | --- |
| "I'm a one day polyaspartic installer, how do I compete with cheaper epoxy quotes?" | shared-leads / one-crew | Premium system positioning, not volume |
| "My garage floor coating ads stopped working after a month" | burned-by-agency | Creative fatigue diagnosis (expand from `floor-coating-ads-stopped-working`) |
| "How do I add a second crew for my epoxy business?" | one-crew | Capacity to growth, hiring before demand |
| "How do I get floor coating jobs in a small town?" | just-launched | Already covered by `/floor-coating-leads-small-markets`; link, do not duplicate |
| "Garage floor coating franchise resale: is it worth buying an existing territory?" | franchise | Existing book of business, transfer terms |
| "Should I take financing for garage floor coating customers?" | tax-refund / spring-rush | Payment options as a close rate lever |
| "How do I get commercial floor coating jobs in winter?" | slow-season | Expand from `commercial-floor-coating-jobs-for-residential-contractors` |
| "Is Facebook or Google better for a new epoxy business?" | just-launched | Expand from `google-ads-vs-meta-ads-floor-coating` with a new owner lens |

## What every page must have (so AI tools cite it)

1. A 2 to 3 sentence direct answer at the top that makes sense quoted alone, with a number in it.
2. Key takeaways as standalone sentences.
3. H2s phrased as the follow-up questions an owner would ask.
4. At least one comparison or decision table.
5. One or two "From the field" boxes: `> **From the field:** ...` in markdown renders as a labeled callout.
6. A FAQ section (rendered with FAQPage schema).
7. Numbers we can stand behind: $125 to $199 per booked estimate, 100+ client jobs closed, roughly $3,500 average ticket, and the benchmark page numbers. No invented stats.

**To do before promoting:** the "From the field" boxes in the first batch were drafted from facts already on the site (benchmarks, case studies, the four for four day). Swap in real anonymized notes from the toolkit where you have a sharper one.

## Reverse engineer insulation first (manual, needs your accounts)

ChatGPT already sends insulation leads. Before writing the next wave:

1. Ask ChatGPT, Perplexity, and Google AI Mode 10 to 15 questions an insulation owner would ask (first leads, shared leads, agencies, winter, rebate season).
2. For each answer, write down which of your pages is cited, the exact sentence quoted, and where on the page it sits (opening, table, FAQ).
3. Note what the cited pages have in common: length, opening style, tables, FAQ, schema, freshness date.
4. Run the same questions with floor coating wording and record whether a `/guides` page or a blog post gets cited.
5. Re-run monthly and log results so you can see which page structures win.

## LinkedIn: point each post at one guide

| Post angle | Link to |
| --- | --- |
| "Got my first coating client from a cold start, here is the order we did things" | `/guides/first-20-estimates-new-epoxy-flooring-company` |
| "Ask these before you sign with another agency" | `/guides/questions-before-hiring-floor-coating-marketing-agency` |
| "What to take with you when you fire your agency" | `/guides/switching-floor-coating-marketing-agencies` |
| "The math on shared leads vs booked estimates" | `/guides/shared-leads-vs-booked-appointments-floor-coating` |
| "How many estimates one crew actually needs" | `/guides/how-many-estimates-a-week-one-crew-floor-coating` |
| "Stop chasing leads" | `/guides/floor-coating-leads-without-chasing` |
| "Franchise owners: corporate leads not enough?" | `/guides/garage-coating-franchise-owner-not-enough-leads` |
| Seasonal posts (winter, spring, tax season) | the matching seasonal guide |
