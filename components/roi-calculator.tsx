"use client";

import { useState } from "react";

import { FEE_MAX, FEE_MIN } from "@/lib/offer";
import { ROI_DEFAULTS, calcRoi, one, usd, type RoiInputs } from "@/lib/roi";

type Field = {
  key: keyof RoiInputs;
  label: string;
  min: number;
  max: number;
  step: number;
  /** Percent fields are edited as whole numbers and stored as 0 to 1. */
  percent?: boolean;
  prefix?: string;
};

const FIELDS: Field[] = [
  { key: "adSpend", label: "Monthly ad spend (you fund it, at cost)", min: 0, max: 20000, step: 100, prefix: "$" },
  { key: "bookedAppointments", label: "Booked appointments per month", min: 0, max: 120, step: 1 },
  { key: "fee", label: `Fee per booked appointment ($${FEE_MIN} to $${FEE_MAX})`, min: FEE_MIN, max: FEE_MAX, step: 5, prefix: "$" },
  { key: "showRate", label: "Show rate", min: 0, max: 100, step: 1, percent: true },
  { key: "cGradeRate", label: "Appointments you grade C (credited)", min: 0, max: 100, step: 1, percent: true },
  { key: "closeRate", label: "Your close rate on shown appointments", min: 0, max: 100, step: 1, percent: true },
  { key: "averageTicket", label: "Average ticket", min: 0, max: 20000, step: 100, prefix: "$" },
  { key: "grossMargin", label: "Gross margin before marketing", min: 0, max: 100, step: 1, percent: true },
];

/**
 * Interactive ROI calculator for /pricing. The server renders it with the
 * defaults, and the same defaults and formulas are written out as plain text
 * next to it so the numbers are readable without JavaScript.
 */
export function RoiCalculator() {
  const [inputs, setInputs] = useState<RoiInputs>(ROI_DEFAULTS);
  const r = calcRoi(inputs);

  const set = (f: Field, raw: string) => {
    const n = Number(raw);
    if (Number.isNaN(n)) return;
    const clamped = Math.min(f.max, Math.max(f.min, n));
    setInputs((prev) => ({ ...prev, [f.key]: f.percent ? clamped / 100 : clamped }));
  };

  const outputs = [
    { label: "Total marketing cost (ad spend plus appointment fees)", value: usd(r.totalMarketingCost) },
    { label: "Appointment fees", value: `${usd(r.appointmentFees)} (${one(r.billedAppointments)} billed)` },
    { label: "Jobs sold", value: one(r.jobsSold) },
    { label: "Cost per job sold", value: usd(r.costPerJobSold), hero: true },
    { label: "Revenue", value: usd(r.revenue) },
    { label: "Gross profit after all marketing costs", value: usd(r.grossProfitAfterMarketing), hero: true },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form className="glass-card grid gap-4 rounded-3xl p-6 md:p-8" onSubmit={(e) => e.preventDefault()}>
        {FIELDS.map((f) => {
          const value = f.percent ? Math.round(inputs[f.key] * 100) : inputs[f.key];
          return (
            <label key={f.key} className="grid gap-1.5 text-sm font-medium text-foreground">
              {f.label}
              <span className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2">
                {f.prefix && <span className="text-muted-foreground">{f.prefix}</span>}
                <input
                  type="number"
                  inputMode="decimal"
                  className="w-full bg-transparent outline-none"
                  min={f.min}
                  max={f.max}
                  step={f.step}
                  value={value}
                  onChange={(e) => set(f, e.target.value)}
                />
                {f.percent && <span className="text-muted-foreground">%</span>}
              </span>
            </label>
          );
        })}
      </form>

      <div className="grid content-start gap-4" aria-live="polite">
        {outputs.map((o) => (
          <div
            key={o.label}
            className={
              o.hero
                ? "rounded-3xl border border-primary/20 bg-primary/10 p-6"
                : "rounded-3xl border border-gray-200 bg-white p-6"
            }
          >
            <p className="text-sm text-muted-foreground">{o.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-foreground">{o.value}</p>
          </div>
        ))}
        <button
          type="button"
          onClick={() => setInputs(ROI_DEFAULTS)}
          className="justify-self-start text-sm font-semibold text-primary hover:opacity-80"
        >
          Reset to the example numbers
        </button>
      </div>
    </div>
  );
}
