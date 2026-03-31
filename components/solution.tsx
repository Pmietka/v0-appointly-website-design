import {
  MapPin,
  Megaphone,
  ShieldCheck,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { Smartphone } from "lucide-react";

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
      "We send you physical NFC cards to hand to satisfied customers. One tap sends a Google review request directly to their phone — feeding your GMB ranking over time.",
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
    <section id="solution" className="py-24 md:py-32 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-gray-500 mb-4">
            Our System
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-balance leading-tight">
            The Pay-Per-Lead{" "}
            <span className="text-[#5f57e8]">
              System
            </span>
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            A done-for-you system that builds your online presence, generates exclusive
            leads, and only charges you when we deliver — so you can focus on closing jobs.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-[#5f57e8]/10">
                  <s.icon className="h-5 w-5 text-[#5f57e8]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  Step {i + 1}
                </span>
              </div>

              <h3 className="font-display text-base font-semibold text-gray-900 mb-2">
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {s.description}
              </p>
            </div>
          ))}

          {/* Highlight card */}
          <div className="relative flex flex-col justify-between rounded-2xl p-6 overflow-hidden bg-[#5f57e8]">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/60 mb-3 block">
                The Result
              </span>
              <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">
                Exclusive Leads. Zero Shared. Zero Retainer.
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                One contractor per market. Every lead pre-qualified. You only pay when
                we deliver. Simple accountability.
              </p>
            </div>

            <a
              href="https://client.getappointly.co/strategy-calendar"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#5f57e8] hover:opacity-90 transition-opacity self-start"
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
