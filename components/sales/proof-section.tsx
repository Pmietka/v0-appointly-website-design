import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { MuxVideo } from "@/app/case-studies/cfc-interactive";
import { buildWall, featuredStories } from "@/lib/proof-wall";
import { ProofWall } from "./proof-wall";

/* ============================================================================
   The proof block shared by /connect and /lander: the three full video case
   studies up top, then the full wall underneath: numbers, every clip
   grouped by client, client quotes and calendars. Styles in app/sales.css.
   ============================================================================ */

export function FeaturedStories() {
  return (
    <div className="pwfeats">
      {featuredStories().map((s) => (
        <article className="pwfeat" key={s.slug}>
          <MuxVideo variant="card" clip={s.clip} label={s.label} />
          <div className="pwfeat-body">
            <div className="pwfeat-hd">
              <Image
                className={`pwfeat-logo${s.logo.dark ? " dark" : ""}`}
                src={s.logo.src}
                alt={`${s.company} logo`}
                width={s.logo.width}
                height={s.logo.height}
                sizes="140px"
                loading="lazy"
              />
              <span>{s.market}</span>
            </div>
            <div className="pwfeat-lead">
              <b>{s.lead.value}</b>
              <span>{s.lead.label}</span>
            </div>
            <div className="pwfeat-stats">
              {s.stats.map((x) => (
                <div key={x.label}><b>{x.value}</b><span>{x.label}</span></div>
              ))}
            </div>
            <p className="pwfeat-owner">{s.owner}, {s.company}</p>
            <a className="pwfeat-link" href={`/case-studies/${s.slug}`} target="_blank" rel="noopener noreferrer">
              Watch the full case study <ArrowUpRight aria-hidden />
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ProofSection({
  id = "proof",
  eyebrow,
  title,
  sub,
  tint = false,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  tint?: boolean;
  /** Rendered under the wall, e.g. a call to action. */
  children?: React.ReactNode;
}) {
  const wall = buildWall();
  const clips = wall.videos.reduce((n, g) => n + g.tiles.length, 0) + featuredStories().length;
  return (
    <section className={`sec pwsec${tint ? " tint" : ""}`} id={id}>
      <div className="wrap pwwide">
        <div className="pwhead">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          {sub && <p className="sub">{sub}</p>}
          <p className="pwcount">
            <span><b>{clips}</b> interview clips</span>
            <span><b>{wall.messages.length}</b> client quotes</span>
            <span><b>3</b> full case studies</span>
          </p>
        </div>
        <FeaturedStories />
        <ProofWall wall={wall} />
        {children}
      </div>
    </section>
  );
}
