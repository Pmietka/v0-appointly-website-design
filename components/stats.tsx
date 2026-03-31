"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const stats: StatItem[] = [
  {
    value: 47,
    suffix: "+",
    label: "qualified leads delivered per month",
  },
  {
    value: 8,
    suffix: "x",
    label: "average contractor ROI on lead cost",
  },
  {
    value: 60,
    suffix: "%",
    label: "average close rate on qualified leads",
  },
];

function StatCard({ stat, started }: { stat: StatItem; started: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(stat.value * eased));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [stat.value, started]);

  return (
    <div className="flex flex-col items-center px-8 py-10 text-center md:px-10">
      <div className="font-display text-7xl font-black leading-none text-[#4669a8] md:text-8xl">
        {count}
        {stat.suffix}
      </div>
      <p className="mt-5 max-w-[220px] text-base font-medium text-slate-600">
        {stat.label}
      </p>
    </div>
  );
}

export function Stats() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#e8f0ff] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#6b84b8]">
            By the Numbers
          </p>
          <h2 className="font-display text-3xl font-bold text-slate-950 md:text-4xl">
            Results That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 divide-y divide-[#c8d6f1] rounded-[32px] border border-[#c8d6f1] bg-white/55 md:grid-cols-3 md:divide-y-0 md:divide-x">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
