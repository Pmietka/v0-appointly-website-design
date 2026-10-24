#!/usr/bin/env node
// Fails when a page, post, or llms.txt drifts from the offer in lib/offer.ts:
// old prices, a fee described without ad spend, or retired claims that sent
// AI answer engines the wrong story. Usage: npm run check:offer

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["app", "components", "lib", "content", "public/llms.txt"];
const skip = [/transcript/, /legacy-home/, /components\/(stats|hero|results|solution)\.tsx$/, /lib\/offer\.ts$/, /scripts\//];

const banned = [
  { re: /\$199\b(?!,)/, why: "retired price; the fee is $125 to $175" },
  { re: /\bno monthly fee\b/i, why: 'say "no monthly management fee" and name ad spend' },
  { re: /\bpay per show\b/i, why: "billing happens at booking; no shows are credited" },
  { re: /\bflat fee (?:per|for each|for every) (?:booked|qualified)/i, why: "fee is $125 to $175 per booked appointment, plus ad spend at cost" },
  { re: /\bset per market\b/i, why: "the fee is set per client" },
  { re: /\byou keep everything\b|\bthey keep everything\b/i, why: "use the ownership wording in lib/offer.ts" },
  { re: /cover the ad spend ourselves/i, why: "clients fund their own ad spend" },
  { re: /\b(?:we|appointly(?: solutions)?|jacob) (?:call|calls|contact|contacts)\b[^.]{0,40}within minutes\b/i, why: "a text and a call within one minute" },
  { re: /\bone (?:floor coating |coating )?contractor per city\b/i, why: 'say "per market"' },
];

const files = (p) => {
  if (statSync(p).isFile()) return [p];
  return readdirSync(p).flatMap((n) => files(join(p, n)));
};

const problems = [];
for (const file of roots.flatMap(files)) {
  if (!/\.(tsx?|md|txt)$/.test(file) || skip.some((s) => s.test(file))) continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      for (const { re, why } of banned) {
        if (re.test(line)) problems.push(`${file}:${i + 1}  ${line.trim().slice(0, 100)}\n    ${why}`);
      }
    });
}

if (problems.length) {
  console.error(`Offer drift found (${problems.length}):\n\n${problems.join("\n")}`);
  process.exit(1);
}
console.log("Offer copy is consistent.");
