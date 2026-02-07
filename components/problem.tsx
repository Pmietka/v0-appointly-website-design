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
    text: "You're paying for leads, but response time kills conversions",
  },
  {
    icon: PhoneOff,
    text: "New inquiries come in while you're on jobs\u2014they cool off fast",
  },
  {
    icon: UserX,
    text: "Too many \"leads\" are unqualified (wrong area, wrong budget, renters, tiny jobs)",
  },
  {
    icon: MessageCircleOff,
    text: "Follow-up is inconsistent, so good prospects slip away",
  },
  {
    icon: AlertTriangle,
    text: "You don't have a tight system that turns inquiries into booked estimates",
  },
];

export function Problem() {
  return (
    <section id="problem" className="py-20 md:py-28 bg-card">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Empathy text */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sound Familiar?
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-foreground text-balance">
              The Insulation Contractor Reality
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
              You{"'"}re great at what you do. But between running jobs, managing
              crews, and trying to follow up with every inquiry, qualified
              homeowners are slipping through the cracks every single day.
            </p>
          </div>

          {/* Right: Problem list */}
          <div className="flex flex-col gap-4">
            {problems.map((p) => (
              <div
                key={p.text}
                className="flex items-start gap-4 rounded-xl border border-border bg-background p-5"
              >
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-destructive/10">
                  <p.icon className="h-5 w-5 text-destructive" />
                </div>
                <p className="text-sm leading-relaxed text-foreground pt-2">
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
