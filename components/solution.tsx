import {
  MapPin,
  Megaphone,
  ShieldCheck,
  CreditCard,
  ArrowRight,
  Smartphone,
} from "lucide-react";

const steps = [
  {
    icon: MapPin,
    title: "GMB Optimization",
    description:
      "We claim and optimize your Google Business Profile so you rank in the local 3-pack. More visibility, more inbound calls from homeowners already searching.",
  },
  {
    icon: Megaphone,
    title: "Facebook Lead Gen Ads",
    description:
      "We build and run hyper-local Facebook ad campaigns targeting homeowners in your service area who are actively looking for insulation help.",
  },
  {
    icon: ShieldCheck,
    title: "Lead Qualification",
    description:
      "Every lead is screened before it reaches you. We verify homeowner status, service area, project scope, and budget. No tire-kickers.",
  },
  {
    icon: Smartphone,
    title: "NFC Review Card System",
    description:
      "We send you physical NFC cards to hand to satisfied customers. One tap sends a Google review request directly to their phone, feeding your GMB ranking over time.",
  },
  {
    icon: CreditCard,
    title: "You Pay Only When We Deliver",
    description:
      "Once a qualified lead is delivered to you, you're charged. If we don't deliver, you don't pay. No monthly retainer. No long-term contract. No lead, no charge.",
  },
];

export function Solution() {
  return (
    <section id="solution" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            Our System
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-balance text-gray-900 md:text-4xl lg:text-5xl">
            The Pay-Per-Lead <span className="text-[#5f57e8]">System</span>
          </h2>
          <p className="mt-4 leading-relaxed text-gray-600">
            A done-for-you system that builds your online presence, generates exclusive
            leads, and only charges you when we deliver so you can focus on closing jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5f57e8]/10">
                  <step.icon className="h-5 w-5 text-[#5f57e8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Step {index + 1}
                </span>
              </div>

              <h3 className="mb-2 font-display text-base font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{step.description}</p>
            </div>
          ))}

          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#5f57e8] p-6">
            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-widest text-white/60">
                The Result
              </span>
              <h3 className="mb-3 font-display text-xl font-bold leading-tight text-white">
                Exclusive Leads. Zero Shared. Zero Retainer.
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                One contractor per market. Every lead pre-qualified. You only pay when
                we deliver. Simple accountability.
              </p>
            </div>

            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-6 inline-flex self-start items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5f57e8] transition-opacity hover:opacity-90"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
