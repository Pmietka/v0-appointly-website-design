#!/usr/bin/env node
// Checks every JSON-LD block in the prerendered HTML after `npm run build`:
// it must parse, and each node must carry the fields Google and AI search
// tools need for its type. FAQPage answers must also appear as visible text,
// since FAQ rich results are only valid when the answers are on the page.
//
// Usage: npm run build && npm run validate:jsonld

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = ".next/server/app";

const required = {
  Organization: ["name", "url", "logo"],
  LocalBusiness: ["name", "address"],
  WebSite: ["name", "url"],
  Person: ["name"],
  Service: ["name", "provider"],
  FAQPage: ["mainEntity"],
  Question: ["name", "acceptedAnswer"],
  Answer: ["text"],
  BreadcrumbList: ["itemListElement"],
  ListItem: ["position"],
  Article: ["headline", "author", "datePublished"],
  BlogPosting: ["headline", "author", "datePublished"],
  Dataset: ["name", "description"],
  CollectionPage: ["name", "url"],
  WebPage: ["name", "url"],
  PostalAddress: ["addressLocality"],
};

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith(".html") ? [path] : [];
  });
}

const decode = (s) =>
  s
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");

const visibleText = (html) =>
  decode(
    html
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, "");

const errors = [];
let blocks = 0;
let nodes = 0;

function check(node, file, path) {
  if (Array.isArray(node)) return node.forEach((n, i) => check(n, file, `${path}[${i}]`));
  if (!node || typeof node !== "object") return;
  const types = [].concat(node["@type"] ?? []);
  // A bare {"@id": ...} is a reference to a node defined elsewhere.
  const isReference = Object.keys(node).every((k) => k === "@id" || k === "@type");
  if (types.length && !isReference) {
    nodes++;
    // Breadcrumb items link with "item"; carousel style lists use "url".
    if (types.includes("ListItem") && node.item === undefined && node.url === undefined) {
      errors.push(`${file} ${path} ListItem needs "item" or "url"`);
    }
    for (const type of types) {
      for (const field of required[type] ?? []) {
        const value = node[field];
        if (value === undefined || value === null || value === "" || (Array.isArray(value) && !value.length)) {
          errors.push(`${file} ${path} ${type} is missing "${field}"`);
        }
      }
    }
  }
  for (const [key, value] of Object.entries(node)) {
    if (key !== "@context") check(value, file, `${path}.${key}`);
  }
}

for (const file of htmlFiles(root)) {
  const rel = relative(root, file);
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const text = visibleText(html);
  for (const [, raw] of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    blocks++;
    let data;
    try {
      data = JSON.parse(raw);
    } catch (err) {
      errors.push(`${rel} JSON-LD does not parse: ${err.message}`);
      continue;
    }
    check(data, rel, "$");
    const faqs = [].concat(data).flatMap((d) => (d["@graph"] ?? [d]).filter((n) => n["@type"] === "FAQPage"));
    for (const faq of faqs) {
      for (const q of faq.mainEntity ?? []) {
        const answer = q.acceptedAnswer?.text ?? "";
        // Compared without whitespace, since inline tags like links leave
        // stray spaces in the stripped page text.
        if (!text.includes(answer.replace(/\s+/g, ""))) {
          errors.push(`${rel} FAQ answer is not visible on the page: "${q.name}"`);
        }
      }
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`\n${errors.length} problem(s) in ${blocks} JSON-LD blocks.`);
  process.exit(1);
}
console.log(`JSON-LD OK: ${blocks} blocks, ${nodes} typed nodes, all required fields present.`);
