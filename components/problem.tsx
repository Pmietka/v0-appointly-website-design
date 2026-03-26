import {
  Clock,
  PhoneOff,
  UserX,
  MessageCircleOff,
  AlertTriangle,
} from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Slow Response Kills Deals",
    text: "You're paying for leads, but response time kills conversions. Homeowners move on in minutes.",
  },
  {
    icon: PhoneOff,
    title: "Missed Calls While on Jobs",
    text: "New inquiries come in while you're on jobs — they cool off fast and go to your competitor.",
  },
  {
    icon: UserX,
    title: "Unqualified Time-Wasters",
    text: "Too many \"leads\" are unqualified — wrong area, wrong budget, renters, or jobs too small.",
  },
  {
    icon: MessageCircleOff,
    title: "Inconsistent Follow-Up",
    text: "Follow-up is inconsistent, so good prospects slip away before they ever book an estimate.",
  },
  {
    icon: AlertTriangle,
    title: "No System to Convert",
    text: "You don't have a tight system that turns raw inquiries into booked estimates on autopilot.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 md:py-32 section-divider relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/30 to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-destructive/[0.04] blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Empathy text */}
          <div className="lg:sticky lg:top-32">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-3 px-3 py-1 rounded-full border border-destructive/20 bg-destructive/[0.06]">
              Sound Familiar?
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
              The Insulation{" "}
              <span className="bg-gradient-to-r from-destructive to-orange-400 bg-clip-text text-transparent">
                Contractor
              </span>{" "}
              Reality
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg text-base">
              You{"'"}re great at what you do. But between running jobs, managing
              crews, and trying to follow up with every inquiry — qualified
              homeowners are slipping through the cracks every single day.
            </p>

            <div className="mt-8 p-5 rounded-2xl border border-destructive/15 bg-destructive/[0.04]">
              <p className="text-sm font-semibold text-destructive/90 leading-relaxed">
                The average insulation contractor loses{" "}
                <span className="text-destructive font-bold">3–5 qualified leads per week</span>{" "}
                simply due to slow response times and no follow-up system.
              </p>
            </div>
          </div>

          {/* Right: Problem list */}
          <div className="flex flex-col gap-3">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-destructive/20 hover:bg-destructive/[0.03] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl bg-destructive/10 border border-destructive/20 group-hover:bg-destructive/15 transition-colors">
                  <p.icon className="h-4.5 w-4.5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-destructive/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{p.title}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
