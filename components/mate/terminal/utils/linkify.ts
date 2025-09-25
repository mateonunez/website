export type LinkMatch = {
  start: number;
  end: number;
  value: string;
  href: string;
  isExternal: boolean;
};

export type TextSegment =
  | { type: 'text'; value: string }
  | { type: 'link'; value: string; href: string; isExternal: boolean };

export function extractLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  const urlRegex = /https?:\/\/[^\s]+/g;
  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

  let urlMatch: RegExpExecArray | null = urlRegex.exec(text);
  while (urlMatch !== null) {
    matches.push({
      start: urlMatch.index,
      end: urlRegex.lastIndex,
      value: urlMatch[0],
      href: urlMatch[0],
      isExternal: true,
    });
    urlMatch = urlRegex.exec(text);
  }

  let emailMatch: RegExpExecArray | null = emailRegex.exec(text);
  while (emailMatch !== null) {
    matches.push({
      start: emailMatch.index,
      end: emailRegex.lastIndex,
      value: emailMatch[0],
      href: `mailto:${emailMatch[0]}`,
      isExternal: false,
    });
    emailMatch = emailRegex.exec(text);
  }

  matches.sort((a, b) => a.start - b.start);
  return matches;
}

export function segmentText(text: string): TextSegment[] {
  const links = extractLinks(text);
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const link of links) {
    if (link.start < lastIndex) continue;
    const before = text.slice(lastIndex, link.start);
    if (before) segments.push({ type: 'text', value: before });
    segments.push({ type: 'link', value: link.value, href: link.href, isExternal: link.isExternal });
    lastIndex = link.end;
  }

  const after = text.slice(lastIndex);
  if (after) segments.push({ type: 'text', value: after });

  return segments.length ? segments : [{ type: 'text', value: text }];
}
