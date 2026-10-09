// Tells Bing (and every other IndexNow search engine: Yandex, Seznam, Naver)
// which pages changed, so they recrawl in minutes instead of waiting for the
// next sitemap crawl. Bing's index also feeds ChatGPT search and Copilot.
//
// Reads the live sitemap and submits every URL whose lastmod falls inside the
// last few days. lastmod comes from app/sitemap.ts, so keep those dates honest.
//
//   node scripts/indexnow.mjs              URLs changed in the last 3 days
//   node scripts/indexnow.mjs --days 7     URLs changed in the last 7 days
//   node scripts/indexnow.mjs --all        every URL in the sitemap
//   node scripts/indexnow.mjs --dry-run    print the list, submit nothing
//
// Runs automatically after each production deploy (.github/workflows/indexnow.yml).

const HOST = "getappointly.co";
const SITE = `https://${HOST}`;
// Public by design: search engines fetch public/<key>.txt to confirm we own the
// site. Rotate it by replacing both this value and that file.
const KEY = "df79c3dd2cf41f3c4ab73162b8179712";

const args = process.argv.slice(2);
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");
const daysArg = args.indexOf("--days");
const days = daysArg >= 0 ? Number(args[daysArg + 1]) : 3;

const res = await fetch(`${SITE}/sitemap.xml`);
if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`);
const xml = await res.text();

const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
const urls = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
  .map(([, block]) => ({
    loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
  }))
  .filter((u) => u.loc && (all || (u.lastmod && Date.parse(u.lastmod) >= cutoff)))
  .map((u) => u.loc);

if (urls.length === 0) {
  console.log(`No sitemap URLs changed in the last ${days} days. Nothing to submit.`);
  process.exit(0);
}

console.log(`${urls.length} URL(s):\n${urls.join("\n")}`);
if (dryRun) process.exit(0);

const submit = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList: urls }),
});

// 200 and 202 both mean accepted (202: key not verified yet, which is normal
// on the very first submission).
if (submit.status !== 200 && submit.status !== 202) {
  throw new Error(`IndexNow returned ${submit.status}: ${await submit.text()}`);
}
console.log(`Submitted to IndexNow (HTTP ${submit.status}).`);
