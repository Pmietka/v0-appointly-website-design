import Image from "next/image";

const quickStats = [
  {
    stat: "6 new clients",
    label: "Andre reported this in month two after getting Appointly leads.",
  },
  {
    stat: "6 closed jobs / month",
    label: "Another contractor said Appointly helped sustain this for three straight months.",
  },
  {
    stat: "24-48 hours",
    label: "Typical timeline cited on-site for first incoming leads after launch.",
  },
];

export function ProofSection() {
  return (
    <section className="section-divider py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Case Studies
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Proof works harder when people can actually see it.
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
            These examples make the offer more believable for both visitors and search
            engines. Instead of only claiming lead quality, the page now shows a booked
            calendar view and a direct client statement tied to the results you reference.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-100 px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                Booked Appointments
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                Real calendar activity is stronger proof than generic claims.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                This calendar screenshot gives the site a concrete visual signal that the
                system is producing booked conversations, not just raw inquiries.
              </p>
            </div>
            <div className="bg-slate-50 p-4 md:p-6">
              <Image
                src="/images/case-studies/ghl-calendar.png"
                alt="Booked appointment calendar showing multiple scheduled estimate calls across a work week."
                width={1312}
                height={768}
                className="h-auto w-full rounded-2xl border border-slate-200"
                priority={false}
              />
            </div>
          </article>

          <div className="grid gap-6">
            <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                  Andre Case Study
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                  Direct client proof with a named outcome.
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Andre&apos;s testimonial supports the result already referenced elsewhere
                  on the site and gives the lead-gen pages a more specific trust asset.
                </p>
              </div>
              <div className="border-t border-slate-100 bg-slate-50 p-4 md:p-6">
                <img
                  src="/images/case-studies/andre-text.svg"
                  alt="Andre testimonial case study graphic."
                  className="h-auto w-full rounded-2xl border border-slate-200 bg-white"
                />
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {quickStats.map((point) => (
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
      </div>
    </section>
  );
}
