export interface LanguagePreference {
  readonly tag: string;
  readonly quality: number;
  readonly order: number;
}
export function parseAcceptLanguage(header: string): LanguagePreference[] {
  if (typeof header !== 'string') throw new TypeError('Header must be text');
  if (header.length > 8192) throw new RangeError('Header too long');
  if (!header.trim()) return [];
  return header
    .split(',')
    .map((item, order) => {
      const [rawTag, ...params] = item.trim().split(';'),
        tag = rawTag!.trim().toLowerCase();
      if (tag !== '*' && !/^[a-z]{1,8}(?:-[a-z0-9]{1,8})*$/.test(tag))
        throw new RangeError('Invalid language tag');
      let quality = 1;
      for (const param of params) {
        const m = /^\s*q\s*=\s*(0(?:\.\d{0,3})?|1(?:\.0{0,3})?)\s*$/i.exec(param);
        if (!m) throw new RangeError('Invalid quality parameter');
        quality = Number(m[1]);
      }
      return { tag, quality, order };
    })
    .sort((a, b) => b.quality - a.quality || a.order - b.order);
}
export function negotiateLanguage(header: string, supported: readonly string[]): string | null {
  if (!Array.isArray(supported) || !supported.every((x) => typeof x === 'string'))
    throw new TypeError('Supported languages must be strings');
  const prefs = parseAcceptLanguage(header),
    available = supported.map((x) => x.toLowerCase());
  for (const pref of prefs) {
    if (pref.quality === 0) continue;
    if (pref.tag === '*') return supported[0] ?? null;
    const exact = available.indexOf(pref.tag);
    if (exact >= 0) return supported[exact]!;
    const primary = pref.tag.split('-')[0]!,
      match = available.findIndex((x) => x === primary || x.startsWith(primary + '-'));
    if (match >= 0) return supported[match]!;
  }
  return null;
}
