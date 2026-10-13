import type { ResultCaseStudy } from "@/lib/results";

/** One client result card for /results. Data lives in lib/results.ts. */
export function ResultCaseStudyCard({ study }: { study: ResultCaseStudy }) {
  const stats = [
    { label: "Booked appointments per month", value: study.monthlyAppointments },
    { label: "Close rate", value: study.closeRate },
    { label: "Cost per sold job", value: study.costPerSoldJob },
  ];

  return (
    <article className="glass-card rounded-3xl p-8 md:p-10">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        {study.city}
      </p>
      <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{study.company}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {study.clientName},{" "}
        <a
          href={study.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-opacity hover:opacity-80"
        >
          {study.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
        </a>
      </p>
      <dl className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="mt-1 font-display text-2xl font-bold text-foreground">{stat.value}</dd>
          </div>
        ))}
      </dl>
      <blockquote className="mt-6 text-sm leading-7 text-muted-foreground md:text-base">
        &ldquo;{study.quote}&rdquo;
      </blockquote>
    </article>
  );
}
