// ------------------------------------------------
// UTIL: TO KEBAB CASE
// ------------------------------------------------

export function toKebabCase(str: string): string {
  return str
    .normalize("NFC")
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1-$2") // fooBar, foo2Bar → foo-bar, foo2-bar
    .replace(/(\p{Lu}+)(\p{Lu}\p{Ll})/gu, "$1-$2") // XMLHttp → XML-Http
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, "-") // any separator/punctuation, collapsed
    .replace(/^-+|-+$/g, "") // trim
    .toLowerCase();
}
