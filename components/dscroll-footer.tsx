import { BOOKING_URL, PHONE_DISPLAY, PHONE_HREF } from "@/components/site-nav";

/**
 * Footer for pages built on the .dscroll design system (homepage, case
 * studies). Links every floor coating service page and top guide so none of
 * them depend on the blog index alone.
 */
export function DscrollFooter() {
  return (
    <footer>
      <div className="wrap">
        <p className="fn">Appointly Solutions</p>
        <p className="fh">More booked jobs. <span className="hl">Less chasing leads.</span></p>
        <p className="fcall">
          Questions? Call us at{" "}
          <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
        </p>
        <div className="flinks">
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Book a Call</a>
          <a href={PHONE_HREF}>Call {PHONE_DISPLAY}</a>
          <a href="/case-studies">Case Studies</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About</a>
          <a href="/faq">FAQ</a>
          <a href="/blog">Blog</a>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
        <nav className="fexplore" aria-label="Floor coating contractor resources">
          <p className="fexplore-title">For floor coating contractors</p>
          <div className="fexplore-cols">
            <div>
              <p className="fexplore-h">Services</p>
              <a href="/floor-coating-leads">Floor coating leads, booked as estimates</a>
              <a href="/epoxy-flooring-leads">Epoxy flooring leads</a>
              <a href="/exclusive-floor-coating-leads">Exclusive floor coating leads</a>
              <a href="/appointment-setting-for-contractors">Appointment setting for contractors</a>
              <a href="/floor-coating-marketing-agency-alternative">Marketing agency alternative</a>
              <a href="/floor-coating-leads-small-markets">Small market coverage</a>
            </div>
            <div>
              <p className="fexplore-h">Guides</p>
              <a href="/blog/floor-coating-pricing-and-margins">Floor coating pricing and margins</a>
              <a href="/blog/what-is-a-booked-floor-coating-estimate-worth">What a booked estimate is worth</a>
              <a href="/blog/garage-floor-coating-leads-cost-and-sources">Garage floor coating leads: cost and sources</a>
              <a href="/blog/how-to-close-more-floor-coating-estimates">How to close more estimates</a>
              <a href="/blog/polyaspartic-vs-epoxy-garage-floors">Polyaspartic vs epoxy</a>
              <a href="/blog/how-to-start-a-floor-coating-business">How to start a floor coating business</a>
            </div>
          </div>
        </nav>
      </div>
    </footer>
  );
}
