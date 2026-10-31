// ------------------------------------------------
// TYPES
// ------------------------------------------------

type TypeTokenKind =
  | "union"
  | "keyword"
  | "function"
  | "paren"
  | "string"
  | "literal"
  | "qualified"
  | "identifier"
  | "punctuation"
  | "plain";

interface TypeToken {
  kind: TypeTokenKind;
  value: string;
}

const API_TYPE_CLASS: Record<TypeTokenKind, string> = {
  union: "docs-api-type-union",
  keyword: "docs-api-type-keyword",
  function: "docs-api-type-function",
  paren: "docs-api-type-paren",
  string: "docs-api-type-string",
  literal: "docs-api-type-literal",
  qualified: "docs-api-type-qualified",
  identifier: "",
  punctuation: "docs-api-type-punctuation",
  plain: "",
};

// ------------------------------------------------
// CATALOG
// ------------------------------------------------

const KEYWORDS = new Set([
  "string",
  "boolean",
  "number",
  "undefined",
  "null",
  "void",
  "never",
  "any",
  "unknown",
  "text",
]);

const TOKEN_RE =
  /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|=>|\||[()[\]{},:;<>.]|\s+|\d+(?:\.\d+)?|[A-Za-z_$][\w$]*/g;

const QUALIFIED_ROOTS = new Set(["React"]);

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function classifyToken(value: string): TypeTokenKind {
  if (value === "|") return "union";
  if (value === "=>") return "function";
  if (value === "(" || value === ")") return "paren";
  if (value === "." || /^\s+$/.test(value)) return "plain";
  if (KEYWORDS.has(value)) return "keyword";
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return "string";
  }
  if (/^\d/.test(value)) return "literal";
  if (/^[\[\]{},:;<>]$/.test(value)) return "punctuation";
  return "identifier";
}

function markQualified(tokens: TypeToken[]): TypeToken[] {
  let inQualified = false;

  return tokens.map((token) => {
    if (token.kind === "identifier" && QUALIFIED_ROOTS.has(token.value)) {
      inQualified = true;
      return { ...token, kind: "qualified" };
    }

    if (inQualified && token.value === ".") {
      return token;
    }

    if (inQualified && token.kind === "identifier") {
      return { ...token, kind: "qualified" };
    }

    inQualified = false;
    return token;
  });
}

/** Paint `<"tag">` / `<'tag'>` generics the same as the string. */
function markStringGenerics(tokens: TypeToken[]): TypeToken[] {
  const next = tokens.map((token) => ({ ...token }));

  for (let i = 0; i < next.length; i++) {
    if (next[i].value !== "<") continue;

    let j = i + 1;
    while (j < next.length && next[j].kind === "plain") j++;
    if (j >= next.length || next[j].kind !== "string") continue;

    let k = j + 1;
    while (k < next.length && next[k].kind === "plain") k++;
    if (k >= next.length || next[k].value !== ">") continue;

    next[i] = { ...next[i], kind: "string" };
    next[k] = { ...next[k], kind: "string" };
  }

  return next;
}

/** Paint arrow-fn param names the same as `()`. */
function markArrowParams(tokens: TypeToken[]): TypeToken[] {
  const next = tokens.map((token) => ({ ...token }));

  for (let i = 0; i < next.length; i++) {
    if (next[i].value !== "=>") continue;

    let close = i - 1;
    while (close >= 0 && next[close].kind === "plain") close--;
    if (close < 0 || next[close].value !== ")") continue;

    let depth = 0;
    let open = -1;
    for (let k = close; k >= 0; k--) {
      if (next[k].value === ")") depth++;
      if (next[k].value === "(") {
        depth--;
        if (depth === 0) {
          open = k;
          break;
        }
      }
    }
    if (open < 0) continue;

    for (let m = open + 1; m < close; m++) {
      if (next[m].kind === "identifier") {
        next[m] = { ...next[m], kind: "paren" };
      }
    }
  }

  return next;
}

function tokenizeType(type: string): TypeToken[] {
  const tokens: TypeToken[] = [];
  let lastIndex = 0;

  for (const match of type.matchAll(TOKEN_RE)) {
    const index = match.index ?? 0;
    if (index > lastIndex) {
      tokens.push({ kind: "plain", value: type.slice(lastIndex, index) });
    }
    const value = match[0];
    tokens.push({ kind: classifyToken(value), value });
    lastIndex = index + value.length;
  }

  if (lastIndex < type.length) {
    tokens.push({ kind: "plain", value: type.slice(lastIndex) });
  }

  return markArrowParams(markStringGenerics(markQualified(tokens)));
}

function isEventPropName(name: string): boolean {
  return /^on[A-Z]/.test(name);
}

// ------------------------------------------------
// COMPONENTS
// ------------------------------------------------

function TypeTokens({ type }: { type: string }) {
  return (
    <>
      {tokenizeType(type).map((token, index) => {
        const className = API_TYPE_CLASS[token.kind];
        if (!className) {
          return <span key={index}>{token.value}</span>;
        }
        return (
          <span key={index} className={className}>
            {token.value}
          </span>
        );
      })}
    </>
  );
}

function PropName({ name }: { name: string }) {
  const className = isEventPropName(name)
    ? "docs-api-name-event"
    : "docs-api-name";

  return <span className={className}>{name}</span>;
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { tokenizeType, isEventPropName, TypeTokens, PropName };
