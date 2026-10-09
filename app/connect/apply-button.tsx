"use client";

/* Opens the qualification survey from anywhere on the page. The modal itself
   lives in ApplyClient, which listens for this event, so server rendered
   sections can carry a call to action without becoming client components. */
export const OPEN_APPLY_EVENT = "appointly:open-apply";

export function ApplyButton({ top = "Check Availability", main }: { top?: string; main: string }) {
  return (
    <button
      type="button"
      className="ctabtn ctabtn-inline"
      onClick={() => window.dispatchEvent(new Event(OPEN_APPLY_EVENT))}
    >
      <span className="ctabtn-top">{top}</span>
      <span className="ctabtn-main">{main}</span>
    </button>
  );
}
