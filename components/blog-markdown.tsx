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
  const tag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";

  return `<${tag} class="space-y-3 ${listClass} pl-6 text-base leading-8 text-slate-600 md:text-lg">${items
    .map((item) => `<li class="pl-1">${renderInline(item)}</li>`)
    .join("")}</${tag}>`;
}

function renderBlockquote(lines: string[]) {
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
  const head = `<thead><tr>${header
    .map(
      (cell) =>
        `<th scope="col" class="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">${renderInline(cell)}</th>`,
    )
    .join("")}</tr></thead>`;
  const rowsHtml = body
    .map(
      (cells) =>
        `<tr>${cells
          .map(
            (cell) =>
              `<td class="border-b border-slate-100 px-4 py-3 align-top text-sm leading-7 text-slate-600 md:text-base">${renderInline(cell)}</td>`,
          )
          .join("")}</tr>`,
    )
    .join("");

  return `<div class="overflow-x-auto rounded-2xl border border-slate-200"><table class="w-full border-collapse">${head}<tbody>${rowsHtml}</tbody></table></div>`;
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

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
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

    push(renderParagraph(paragraphLines));
  }

  closeFaq();

  return (
    <div
      className="space-y-8"
      dangerouslySetInnerHTML={{ __html: blocks.join("") }}
    />
  );
}

