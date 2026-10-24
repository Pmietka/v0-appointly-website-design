import Image from "next/image";

const quickStats = [
  {
    stat: "97% show rate",
    label: "Of booked appointments across all our clients. No shows are credited automatically.",
  },
  {
    stat: "60% close rate",
    label: "Our clients' average close rate on the appointments we book, across markets and products.",
  },
  {
    stat: "24-48 hours",
    label: "Typical time from campaign launch to your first booked estimate.",
  },
];

export function ProofSection() {
  return (
    <section className="section-divider py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Results
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            Proof that the appointments turn into real jobs.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
            <div className="border-b border-slate-100 px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Booked Appointments
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                This is what the estimate calendar looks like after launch.
              </h3>
            </div>
            <div className="bg-slate-50 p-4 md:p-6">
              <Image
                src="/images/case-studies/ghl-calendar.png"
                alt="Calendar showing multiple booked appointments across a work week."
                width={1312}
                height={768}
                className="h-auto w-full rounded-2xl border border-slate-200"
              />
            </div>
          </article>

          <div className="grid gap-6">
            <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-md">
              <div className="px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                  Mark T., AFAB Services, Port St. Lucie, FL
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                  $35k closed in one month, at a 57% close rate.
                </h3>
                <blockquote className="mt-4 text-base leading-7 text-slate-600">
                  &ldquo;You&apos;ve already paved the ground. I just go in and sweep it up.
                  You guys are doing a great job.&rdquo;
                </blockquote>
                <a href="/case-studies/afab-services" className="mt-4 inline-block text-sm font-semibold text-primary hover:opacity-80">
                  Read the AFAB Services case study
                </a>
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {quickStats.map((point) => (
                <article
                  key={point.stat}
                  className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm"
                >
                  <p className="font-display text-3xl font-bold text-slate-950">
                    {point.stat}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
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
