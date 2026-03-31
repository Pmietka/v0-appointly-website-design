const proofPoints = [
  {
    stat: "6 new clients",
    label: "Generated in month two for one contractor",
  },
  {
    stat: "6 closed jobs / month",
    label: "Sustained for three straight months by another client",
  },
  {
    stat: "24-48 hours",
    label: "Typical window to see first incoming leads after launch",
  },
];

export function ProofSection() {
  return (
    <section className="section-divider py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="glass-card rounded-3xl p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              Proof That Matters
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl">
              Stronger SEO needs stronger evidence on the page.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Search visibility is easier to win and easier to convert when the page
              shows real outcomes, lead standards, and who the offer is built for.
              Appointly Solutions is positioned around qualified lead flow, exclusive
              markets, and booked estimate opportunities instead of vanity traffic.
            </p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              These proof points come from the testimonials and operating claims already
              used across the site, now surfaced closer to your key money pages so both
              visitors and search engines see clearer trust signals.
            </p>
          </article>

          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
            {proofPoints.map((point) => (
              <article
                key={point.stat}
                className="rounded-3xl border border-[#7d87f7]/20 bg-[#7d87f7]/[0.08] p-7 shadow-[0_0_60px_rgba(125,135,247,0.08)]"
              >
                <p className="font-display text-3xl font-bold text-foreground">
                  {point.stat}
                </p>
                <p className="mt-3 text-sm leading-7 text-[#e6e9ff]/80 md:text-base">
                  {point.label}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
