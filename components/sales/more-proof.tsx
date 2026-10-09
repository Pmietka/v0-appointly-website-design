"use client";

import { useState } from "react";

/* Keeps the full wall of proof out of the way until someone asks for it.
   The wall is rendered (and its posters loaded) only after the click. */
export function MoreProof({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  if (open) return <>{children}</>;
  return (
    <div className="pwmore">
      <button type="button" className="pwmore-btn" onClick={() => setOpen(true)}>
        {label}
      </button>
    </div>
  );
}
