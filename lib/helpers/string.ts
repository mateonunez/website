const kebapCase = (str: string): string =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join('-');

const initials = (str: string): string =>
  str
    .match(/(?<=\s|^)\p{L}\p{Mn}*/gu)
    ?.filter((_, i, array) => i === 0 || i === array.length - 1)
    .join('') || '';

export { kebapCase, initials };
