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
    <div className="flex flex-col items-center text-center p-10">
      <div className="text-7xl md:text-8xl font-black leading-none font-display" style={{ color: "#c8e63c" }}>
        {count}{stat.suffix}
      </div>
      <p className="mt-5 text-white/80 text-base font-medium max-w-[200px]">
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
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28" style={{ backgroundColor: "#0a2336" }}>
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/40 mb-3">
            By the Numbers
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Results That Speak for Themselves
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
