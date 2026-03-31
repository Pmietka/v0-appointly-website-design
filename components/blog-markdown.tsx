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
      `<a class="font-medium text-[#5f57e8] underline decoration-[#5f57e8]/30 underline-offset-4 hover:decoration-[#5f57e8]" href="${escapeHtml(safeHref)}"${isExternal ? ' target="_blank" rel="noreferrer noopener"' : ""}>${escapeHtml(label)}</a>`,
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

function renderHeading(level: number, text: string) {
  const classes =
    level === 2
      ? "mt-14 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl"
      : level === 3
        ? "mt-10 text-2xl font-bold tracking-tight text-slate-950 md:text-3xl"
        : "mt-8 text-xl font-bold tracking-tight text-slate-950 md:text-2xl";

  return `<h${level} class="${classes}">${renderInline(text)}</h${level}>`;
}

function renderList(items: string[], ordered = false) {
  const tag = ordered ? "ol" : "ul";
  const listClass = ordered ? "list-decimal" : "list-disc";

  return `<${tag} class="space-y-3 ${listClass} pl-6 text-base leading-8 text-slate-600 md:text-lg">${items
    .map((item) => `<li class="pl-1">${renderInline(item)}</li>`)
    .join("")}</${tag}>`;
}

function renderBlockquote(lines: string[]) {
  return `<blockquote class="border-l-4 border-[#5f57e8] bg-[#5f57e8]/[0.06] px-6 py-5 text-slate-700">${renderParagraph(lines)}</blockquote>`;
}

function renderCodeBlock(lines: string[]) {
  return `<pre class="overflow-x-auto rounded-2xl bg-slate-950 px-6 py-5 text-sm leading-7 text-slate-100"><code>${escapeHtml(lines.join("\n"))}</code></pre>`;
}

export function BlogMarkdown({ content }: { content: string }) {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let index = 0;

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

    const heading = trimmed.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      blocks.push(renderHeading(heading[1].length, heading[2]));
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push(renderBlockquote(quoteLines));
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push(renderList(items, false));
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push(renderList(items, true));
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
        /^\d+\.\s+/.test(nextTrimmed)
      ) {
        break;
      }

      paragraphLines.push(next.trim());
      index += 1;
    }

    blocks.push(renderParagraph(paragraphLines));
  }

  return (
    <div
      className="space-y-8"
      dangerouslySetInnerHTML={{ __html: blocks.join("") }}
    />
  );
}

