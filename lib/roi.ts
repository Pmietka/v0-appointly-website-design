import { FEE_MAX } from "@/lib/offer";

/**
 * ROI math for the /pricing calculator. The interactive component and the
 * plain text worked example on the page both call this, so the numbers a
 * reader (or an AI tool) sees in the HTML always match the calculator.
 */

export type RoiInputs = {
  /** Monthly ad spend, funded by the client at cost. */
  adSpend: number;
  bookedAppointments: number;
  /** Per appointment fee, $125 to $175 depending on the client. */
  fee: number;
  /** 0 to 1. */
  showRate: number;
  /** Share of shown appointments graded C, 0 to 1. Credited, not paid. */
  cGradeRate: number;
  /** Contractor's close rate on shown appointments, 0 to 1. */
  closeRate: number;
  averageTicket: number;
  /** Gross margin on a job before marketing, 0 to 1. */
  grossMargin: number;
};

export type RoiResult = {
  shownAppointments: number;
  billedAppointments: number;
  appointmentFees: number;
  totalMarketingCost: number;
  jobsSold: number;
  revenue: number;
  grossProfitBeforeMarketing: number;
  grossProfitAfterMarketing: number;
  costPerJobSold: number;
};

/**
 * Defaults. Show and close rate are the averages across all Appointly clients.
 * Ad spend and appointment volume come from the Clean Floor Coatings case
 * study, average ticket from our client results, the fee is the top of the
 * range, and gross margin is the low end of the 50 to 60% range in our pricing
 * and margins guide.
 */
export const ROI_DEFAULTS: RoiInputs = {
  adSpend: 2600,
  bookedAppointments: 37,
  fee: FEE_MAX,
  showRate: 0.97,
  cGradeRate: 0,
  closeRate: 0.6,
  averageTicket: 3500,
  grossMargin: 0.5,
};

export function calcRoi(i: RoiInputs): RoiResult {
  const shownAppointments = i.bookedAppointments * i.showRate;
  // No shows and appointments graded C are credited, so only shown appointments
  // that were not graded C cost a fee.
  const billedAppointments = shownAppointments * (1 - i.cGradeRate);
  const appointmentFees = billedAppointments * i.fee;
  const totalMarketingCost = i.adSpend + appointmentFees;
  const jobsSold = shownAppointments * (1 - i.cGradeRate) * i.closeRate;
  const revenue = jobsSold * i.averageTicket;
  const grossProfitBeforeMarketing = revenue * i.grossMargin;
  return {
    shownAppointments,
    billedAppointments,
    appointmentFees,
    totalMarketingCost,
    jobsSold,
    revenue,
    grossProfitBeforeMarketing,
    grossProfitAfterMarketing: grossProfitBeforeMarketing - totalMarketingCost,
    costPerJobSold: jobsSold > 0 ? totalMarketingCost / jobsSold : 0,
  };
}

export const usd = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export const pct = (n: number) => `${Math.round(n * 100)}%`;

export const one = (n: number) => n.toLocaleString("en-US", { maximumFractionDigits: 1 });
