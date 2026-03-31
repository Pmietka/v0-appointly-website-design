import Link from "next/link";

type Resource = {
  href: string;
  title: string;
  description: string;
};

export function SeoResourceLinks({
  eyebrow = "Related Resources",
  title,
  description,
  resources,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  resources: Resource[];
}) {
  return (
    <section className="section-divider bg-[#f8f9ff] py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <Link
              key={resource.href}
              href={resource.href}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#5f57e8]">
                Learn more
              </p>
              <h3 className="mt-4 text-xl font-bold tracking-tight text-slate-950">
                {resource.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {resource.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#5f57e8]">
                Visit page
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
