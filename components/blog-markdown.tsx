import { slugifyHeading } from "@/lib/blog";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHref(href: string) {
  const trimmed = href.trim();

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("mailto:") ||
    trimmed.startsWith("tel:")
  ) {
    return trimmed;
  }

  return "#";
}

function renderInline(raw: string) {
  const tokens: string[] = [];
  let working = raw;

  working = working.replace(/`([^`]+)`/g, (_, code: string) => {
    const token = `@@CODE${tokens.length}@@`;
    tokens.push(
      `<code class="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.92em] text-slate-800">${escapeHtml(code)}</code>`,
    );
    return token;
  });

  working = working.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => {
    const token = `@@LINK${tokens.length}@@`;
    const safeHref = sanitizeHref(href);
    const isExternal = safeHref.startsWith("http://") || safeHref.startsWith("https://");
    tokens.push(
      `<a class="font-medium text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary))]/30 underline-offset-4 hover:decoration-[hsl(var(--primary))]" href="${escapeHtml(safeHref)}"${isExternal ? ' target="_blank" rel="noreferrer noopener"' : ""}>${escapeHtml(label)}</a>`,
    );
    return token;
  });

  let html = escapeHtml(working);
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
  html = html.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em class="italic text-slate-900">$2</em>');

  tokens.forEach((token, index) => {
    html = html.replace(`@@CODE${index}@@`, token).replace(`@@LINK${index}@@`, token);
  });

  return html;
}

function renderParagraph(lines: string[]) {
  return `<p class="text-base leading-8 text-slate-600 md:text-lg">${renderInline(lines.join(" ").trim())}</p>`;
}

// The first paragraph is the answer-first summary, so it reads a size up.
function renderLeadParagraph(lines: string[]) {
  return `<p class="text-lg leading-8 text-slate-800 md:text-xl md:leading-9">${renderInline(lines.join(" ").trim())}</p>`;
}

// A paragraph that opens with a bold label, like `**Best for:** ...` or
// `**If you run your own ads,** ...`.
const labeledParagraph = /^\*\*([^*]+?[:,])\*\*\s*(\S[\s\S]*)$/;
const noteLabel = /^(disclosure|note):$/i;
const cautionLabel = /pin down|limitation|catch|assessment|breaks|watch out/i;
const highlightLabel = /^best for:$/i;
const maxFactLabelLength = 28;

function renderNote(label: string, text: string) {
  return `<aside class="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 md:px-6">
<p class="text-sm leading-7 text-slate-600"><strong class="font-semibold text-slate-900">${renderInline(label)}</strong> ${renderInline(text)}</p>
</aside>`;
}

// Short labels render as rows of one card. Long labels, which read as
// sentences, render as a grid of option cards that keep the bold lead inline.
function renderLabeledGroup(paragraphs: string[]) {
  const items = paragraphs.map((text) => {
    const match = text.match(labeledParagraph)!;
    return { label: match[1], text: match[2] };
  });

  if (items.length === 1) {
    const [{ label, text }] = items;
    return noteLabel.test(label) ? renderNote(label, text) : renderParagraph([paragraphs[0]]);
  }

  const isFactCard = items.every(
    ({ label }) => label.endsWith(":") && label.length <= maxFactLabelLength,
  );

  if (!isFactCard) {
    return `<div class="grid gap-4 md:grid-cols-2">${paragraphs
      .map(
        (text) =>
          `<div class="rounded-2xl border border-slate-200 bg-slate-50 p-5 md:p-6"><p class="text-base leading-7 text-slate-600">${renderInline(text)}</p></div>`,
      )
      .join("")}</div>`;
  }

  return `<dl class="overflow-hidden rounded-2xl border border-slate-200 divide-y divide-slate-200">${items
    .map(({ label, text }) => {
      const name = label.replace(/:$/, "");
      const caution = cautionLabel.test(name);
      const highlight = highlightLabel.test(label);
      const rowClass = caution ? "bg-amber-50" : highlight ? "bg-emerald-50" : "bg-white";
      const labelClass = caution
        ? "text-amber-800"
        : highlight
          ? "text-emerald-800"
          : "text-slate-500";
      return `<div class="grid gap-1.5 px-5 py-4 md:grid-cols-[170px_minmax(0,1fr)] md:gap-6 md:px-6 md:py-5 ${rowClass}">
<dt class="text-xs font-semibold uppercase tracking-[0.16em] md:pt-1.5 ${labelClass}">${renderInline(name)}</dt>
<dd class="text-base leading-7 text-slate-700">${renderInline(text)}</dd>
</div>`;
    })
    .join("")}</dl>`;
}

function renderHeading(level: number, text: string, id?: string) {
  const classes =
    level === 2
      ? "mt-14 scroll-mt-32 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
      : level === 3
        ? "mt-10 scroll-mt-32 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
        : "mt-8 scroll-mt-32 text-xl font-bold tracking-tight text-slate-950 md:text-2xl";
  const idAttr = id ? ` id="${escapeHtml(id)}"` : "";

  return `<h${level}${idAttr} class="${classes}">${renderInline(text)}</h${level}>`;
}

const takeawaysHeading = /^key takeaways$/i;
const faqHeading = /^(frequently asked questions|faq)$/i;

function renderTakeaways(items: string[], id: string) {
  return `<aside id="${escapeHtml(id)}" data-key-takeaways class="mt-10 scroll-mt-32 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
<p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Key takeaways</p>
<ul class="mt-4 space-y-3">${items
    .map(
      (item) =>
        `<li class="flex gap-3 text-base leading-7 text-slate-800 md:text-lg"><span aria-hidden="true" class="mt-[0.6em] h-2 w-2 shrink-0 rounded-full bg-slate-950"></span><span>${renderInline(item)}</span></li>`,
    )
    .join("")}</ul>
</aside>`;
}

function renderFaqItem(question: string, answerHtml: string) {
  return `<div class="py-6 first:pt-0 last:pb-0">
<h3 class="text-lg font-semibold leading-snug text-slate-950 md:text-xl">${renderInline(question)}</h3>
<div class="mt-3 space-y-4 [&>p]:text-base [&>p]:leading-7 [&>p]:text-slate-600">${answerHtml}</div>
</div>`;
}

function renderList(items: string[], ordered = false) {
  if (ordered) return renderOrderedList(items);

  return `<ul class="space-y-3 list-disc pl-6 text-base leading-8 text-slate-600 md:text-lg">${items
    .map((item) => `<li class="pl-1">${renderInline(item)}</li>`)
    .join("")}</ul>`;
}

const boldLead = /^\*\*([^*]+)\*\*\s*(\S[\s\S]*)$/;

function numberBadge(number: number) {
  return `<span aria-hidden="true" class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white">${number}</span>`;
}

// Numbered steps. When every item opens with a bold lead, each step becomes a
// card with the lead as its title.
function renderOrderedList(items: string[]) {
  const leads = items.map((item) => item.match(boldLead));

  if (leads.every(Boolean)) {
    return `<ol class="space-y-4">${leads
      .map(
        (match, index) => `<li class="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 md:p-6">${numberBadge(index + 1)}<div class="min-w-0">
<p class="text-lg font-semibold leading-7 text-slate-950">${renderInline(match![1])}</p>
<p class="mt-2 text-base leading-7 text-slate-600">${renderInline(match![2])}</p>
</div></li>`,
      )
      .join("")}</ol>`;
  }

  return `<ol class="space-y-4">${items
    .map(
      (item, index) =>
        `<li class="flex gap-4">${numberBadge(index + 1)}<span class="min-w-0 text-base leading-8 text-slate-600 md:text-lg">${renderInline(item)}</span></li>`,
    )
    .join("")}</ol>`;
}

const fieldNoteLabel = /^\*\*From the field:?\*\*:?\s*/i;

// `> **From the field:** ...` renders as a labeled callout for an anonymized
// pattern from client accounts. Any other blockquote renders as a quote.
function renderBlockquote(lines: string[]) {
  if (fieldNoteLabel.test(lines[0] ?? "")) {
    const text = [lines[0].replace(fieldNoteLabel, ""), ...lines.slice(1)].filter(Boolean);
    return `<aside data-field-note class="rounded-2xl border border-amber-200 bg-amber-50 px-6 py-6 md:px-8">
<p class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-800"><span aria-hidden="true" class="h-2 w-2 rounded-full bg-amber-500"></span>From the field</p>
<p class="mt-3 text-base leading-8 text-slate-800 md:text-lg">${renderInline(text.join(" ").trim())}</p>
</aside>`;
  }

  return `<blockquote class="border-l-4 border-[hsl(var(--primary))] bg-[hsl(var(--primary))]/[0.08] px-6 py-5 text-slate-700">${renderParagraph(lines)}</blockquote>`;
}

function splitTableRow(row: string) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string) {
  return /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?$/.test(line.trim());
}

function renderTable(rows: string[]) {
  const [header, ...body] = rows.map(splitTableRow);
  const head = `<thead class="bg-slate-50"><tr>${header
    .map(
      (cell) =>
        `<th scope="col" class="border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-600">${renderInline(cell)}</th>`,
    )
    .join("")}</tr></thead>`;
  const rowsHtml = body
    .map(
      (cells) =>
        `<tr class="even:bg-slate-50/60">${cells
          .map((cell, index) =>
            index === 0
              ? `<th scope="row" class="border-b border-slate-100 px-4 py-3 text-left align-top text-sm font-semibold leading-6 text-slate-950 md:text-base">${renderInline(cell)}</th>`
              : `<td class="border-b border-slate-100 px-4 py-3 align-top text-sm leading-6 text-slate-600 md:text-base">${renderInline(cell)}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");

  return `<div class="overflow-x-auto rounded-2xl border border-slate-200"><table class="w-full min-w-[640px] border-collapse">${head}<tbody class="[&>tr:last-child>*]:border-b-0">${rowsHtml}</tbody></table></div>`;
}

function renderCodeBlock(lines: string[]) {
  return `<pre class="overflow-x-auto rounded-2xl bg-slate-950 px-6 py-5 text-sm leading-7 text-slate-100"><code>${escapeHtml(lines.join("\n"))}</code></pre>`;
}

export function BlogMarkdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  const seenIds = new Map<string, number>();
  let index = 0;
  let faqMode = false;
  let faqItems: string[] = [];
  let faqQuestion: string | null = null;
  let faqAnswer: string[] = [];
  let labeledGroup: string[] = [];

  const headingId = (text: string) => {
    const base = slugifyHeading(text) || "section";
    const count = seenIds.get(base) ?? 0;
    seenIds.set(base, count + 1);
    return count ? `${base}-${count + 1}` : base;
  };

  const flushFaqItem = () => {
    if (faqQuestion) {
      faqItems.push(renderFaqItem(faqQuestion, faqAnswer.join("")));
    }
    faqQuestion = null;
    faqAnswer = [];
  };

  const closeFaq = () => {
    if (!faqMode) return;
    flushFaqItem();
    if (!faqItems.length) {
      faqMode = false;
      return;
    }
    blocks.push(
      `<div class="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">${faqItems.join("")}</div>`,
    );
    faqItems = [];
    faqMode = false;
  };

  // In FAQ mode, paragraphs belong to the current question instead of the page.
  const push = (html: string) => {
    if (faqMode && faqQuestion) {
      faqAnswer.push(html);
    } else {
      blocks.push(html);
    }
  };

  const flushLabeledGroup = () => {
    if (!labeledGroup.length) return;
    push(renderLabeledGroup(labeledGroup));
    labeledGroup = [];
  };

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (!labeledParagraph.test(trimmed)) {
      flushLabeledGroup();
    }

    if (trimmed === "---") {
      blocks.push('<hr class="my-12 border-slate-200" />');
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push(renderCodeBlock(codeLines));
      continue;
    }

    if (
      trimmed.startsWith("|") &&
      index + 1 < lines.length &&
      isTableSeparator(lines[index + 1])
    ) {
      const tableRows: string[] = [trimmed];
      index += 2;

      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableRows.push(lines[index].trim());
        index += 1;
      }

      push(renderTable(tableRows));
      continue;
    }

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();

      if (level === 2) {
        closeFaq();
        const id = headingId(text);

        if (takeawaysHeading.test(text)) {
          const items: string[] = [];
          index += 1;
          while (index < lines.length && !/^#{2,4}\s+/.test(lines[index].trim())) {
            const item = lines[index].trim().match(/^(?:[-*]|\d+\.)\s+(.+)$/);
            if (item) items.push(item[1]);
            index += 1;
          }
          blocks.push(renderTakeaways(items, id));
          continue;
        }

        blocks.push(renderHeading(2, text, id));
        if (faqHeading.test(text)) {
          faqMode = true;
        }
        index += 1;
        continue;
      }

      if (faqMode && level === 3) {
        flushFaqItem();
        faqQuestion = text;
        index += 1;
        continue;
      }

      blocks.push(renderHeading(level, text));
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      push(renderBlockquote(quoteLines));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      push(renderList(items, false));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      push(renderList(items, true));
      continue;
    }

    const paragraphLines: string[] = [line.trim()];
    index += 1;

    while (index < lines.length) {
      const next = lines[index];
      const nextTrimmed = next.trim();

      if (
        !nextTrimmed ||
        nextTrimmed === "---" ||
        nextTrimmed.startsWith("```") ||
        /^#{2,4}\s+/.test(nextTrimmed) ||
        /^>\s?/.test(nextTrimmed) ||
        /^[-*]\s+/.test(nextTrimmed) ||
        /^\d+\.\s+/.test(nextTrimmed) ||
        nextTrimmed.startsWith("|")
      ) {
        break;
      }

      paragraphLines.push(next.trim());
      index += 1;
    }

    const paragraph = paragraphLines.join(" ").trim();
    if (labeledParagraph.test(paragraph)) {
      labeledGroup.push(paragraph);
    } else if (!blocks.length && !faqMode) {
      blocks.push(renderLeadParagraph(paragraphLines));
    } else {
      push(renderParagraph(paragraphLines));
    }
  }

  flushLabeledGroup();
  closeFaq();

  return (
    <div
      className="space-y-8"
      dangerouslySetInnerHTML={{ __html: blocks.join("") }}
    />
  );
}

