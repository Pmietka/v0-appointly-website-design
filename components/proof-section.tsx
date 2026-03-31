import Image from "next/image";

const quickStats = [
  {
    stat: "6 new clients",
    label: "Andre said this happened in month two.",
  },
  {
    stat: "6 closed jobs / month",
    label: "Reported by another contractor for three straight months.",
  },
  {
    stat: "24-48 hours",
    label: "Typical on-site claim for first incoming leads after launch.",
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
            Real proof from booked calls and client feedback.
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="border-b border-slate-100 px-8 py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                Booked Appointments
              </p>
              <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                A live calendar is stronger than a generic marketing promise.
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
            <article className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="px-8 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                  Andre
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-slate-950">
                  Direct client proof tied to a clear result.
                </h3>
              </div>
              <div className="border-t border-slate-100 bg-slate-50 p-4 md:p-6">
                <img
                  src="/images/case-studies/andre-text.svg"
                  alt="Andre testimonial graphic"
                  className="h-auto w-full rounded-2xl border border-slate-200 bg-white"
                />
              </div>
            </article>

            <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
              {quickStats.map((point) => (
                <article
                  key={point.stat}
                  className="rounded-3xl border border-[#5f57e8]/16 bg-white p-7 shadow-sm"
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
