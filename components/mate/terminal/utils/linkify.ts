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

const URL_REGEX = /https?:\/\/[^\s]+/g;
const EMAIL_REGEX = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

export function extractLinks(text: string): LinkMatch[] {
  const matches: LinkMatch[] = [];

  let urlMatch: RegExpExecArray | null = URL_REGEX.exec(text);
  while (urlMatch !== null) {
    matches.push({
      start: urlMatch.index,
      end: URL_REGEX.lastIndex,
      value: urlMatch[0],
      href: urlMatch[0],
      isExternal: true,
    });
    urlMatch = URL_REGEX.exec(text);
  }

  let emailMatch: RegExpExecArray | null = EMAIL_REGEX.exec(text);
  while (emailMatch !== null) {
    matches.push({
      start: emailMatch.index,
      end: EMAIL_REGEX.lastIndex,
      value: emailMatch[0],
      href: `mailto:${emailMatch[0]}`,
      isExternal: false,
    });
    emailMatch = EMAIL_REGEX.exec(text);
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
