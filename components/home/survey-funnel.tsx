"use client";

import { useCallback, useState, type ReactNode } from "react";

import { OpenSurveyProvider } from "@/components/booking-link";
import { QualifyModal } from "@/components/qualify-modal";
import { getBookingParams } from "@/lib/tracking";

/* The /connect funnel for the homepage ad variants. Every BookingLink inside
   opens the qualification survey (same modal, lead delivery, pixel and GA4
   events, duplicate guard and prefilled calendar as /connect). Like /connect,
   the modal mounts on first open and then stays mounted, so closing it never
   throws away a submitted survey. */
export function SurveyFunnel({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [landingPage, setLandingPage] = useState("");

  const openModal = useCallback(() => {
    setLandingPage((prev) => prev || getBookingParams().landing_page || window.location.pathname);
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <OpenSurveyProvider value={openModal}>
      {children}
      {landingPage && (
        <QualifyModal open={open} onClose={closeModal} extraAnswers={{ landing_page: landingPage }} />
      )}
    </OpenSurveyProvider>
  );
}
