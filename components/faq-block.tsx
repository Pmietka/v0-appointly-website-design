export type FaqItem = { question: string; answer: string };

/**
 * Visible question and answer list with FAQPage JSON-LD. Used on service
 * pages so both Google and AI answer engines can lift direct answers.
 */
export function FaqBlock({
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  items,
}: {
  title?: string;
  eyebrow?: string;
  items: FaqItem[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="section-divider py-20 md:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-foreground md:text-4xl">{title}</h2>
        <dl className="mt-10 divide-y divide-slate-200">
          {items.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="text-lg font-semibold text-slate-950">{item.question}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
