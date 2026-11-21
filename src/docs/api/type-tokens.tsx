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

const COLORED_KINDS = new Set<TypeTokenKind>([
  "union",
  "keyword",
  "function",
  "paren",
  "string",
  "literal",
  "qualified",
  "punctuation",
]);

const ANGLE_INNER_KINDS = new Set<TypeTokenKind>([
  "string",
  "identifier",
  "keyword",
]);

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
  "true",
  "false",
]);

const TOKEN_RE =
  /"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|=>|\||[()[\]{},:;<>.]|\s+|\d+(?:\.\d+)?|[A-Za-z_$][\w$]*/g;

const QUALIFIED_ROOTS = new Set(["React"]);

const CLASSIFY_RULES: {
  test: (value: string) => boolean;
  kind: TypeTokenKind;
}[] = [
  { test: (v) => v === "|", kind: "union" },
  { test: (v) => v === "=>", kind: "function" },
  { test: (v) => v === "(" || v === ")", kind: "paren" },
  { test: (v) => v === "." || /^\s+$/.test(v), kind: "plain" },
  { test: (v) => KEYWORDS.has(v), kind: "keyword" },
  {
    test: (v) =>
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'")),
    kind: "string",
  },
  { test: (v) => /^\d/.test(v), kind: "literal" },
  { test: (v) => /^[\[\]{},:;<>]$/.test(v), kind: "punctuation" },
];

// ------------------------------------------------
// HELPERS
// ------------------------------------------------

function classifyToken(value: string): TypeTokenKind {
  return CLASSIFY_RULES.find((rule) => rule.test(value))?.kind ?? "identifier";
}

function cloneTokens(tokens: TypeToken[]): TypeToken[] {
  return tokens.map((token) => ({ ...token }));
}

function skipPlain(tokens: TypeToken[], index: number, step: 1 | -1): number {
  let i = index;
  while (i >= 0 && i < tokens.length && tokens[i].kind === "plain") {
    i += step;
  }
  return i;
}

function markQualified(tokens: TypeToken[]): TypeToken[] {
  let inQualified = false;

  return tokens.map((token) => {
    if (token.kind === "identifier" && QUALIFIED_ROOTS.has(token.value)) {
      inQualified = true;
      return { ...token, kind: "qualified" as const };
    }

    if (inQualified && token.value === ".") {
      return token;
    }

    if (inQualified && token.kind === "identifier") {
      return { ...token, kind: "qualified" as const };
    }

    inQualified = false;
    return token;
  });
}

/** Paint simple `<X>` args: brackets + inner share blue (string or keyword). */
function markAngleArgs(tokens: TypeToken[]): TypeToken[] {
  const next = cloneTokens(tokens);

  for (let i = 0; i < next.length; i++) {
    if (next[i].value !== "<") continue;

    const j = skipPlain(next, i + 1, 1);
    if (j >= next.length || !ANGLE_INNER_KINDS.has(next[j].kind)) continue;

    const k = skipPlain(next, j + 1, 1);
    if (k >= next.length || next[k].value !== ">") continue;

    const paint: TypeTokenKind =
      next[j].kind === "string" ? "string" : "keyword";

    next[i] = { ...next[i], kind: paint };
    next[j] = { ...next[j], kind: paint };
    next[k] = { ...next[k], kind: paint };
  }

  return next;
}

function findMatchingOpenParen(tokens: TypeToken[], close: number): number {
  let depth = 0;
  for (let k = close; k >= 0; k--) {
    if (tokens[k].value === ")") depth++;
    if (tokens[k].value !== "(") continue;
    depth--;
    if (depth === 0) return k;
  }
  return -1;
}

function paintIdentifiersAsParen(
  tokens: TypeToken[],
  open: number,
  close: number,
) {
  for (let m = open + 1; m < close; m++) {
    if (tokens[m].kind === "identifier") {
      tokens[m] = { ...tokens[m], kind: "paren" };
    }
  }
}

/** Paint arrow-fn param names the same as `()`. */
function markArrowParams(tokens: TypeToken[]): TypeToken[] {
  const next = cloneTokens(tokens);

  for (let i = 0; i < next.length; i++) {
    if (next[i].value !== "=>") continue;

    const close = skipPlain(next, i - 1, -1);
    if (close < 0 || next[close].value !== ")") continue;

    const open = findMatchingOpenParen(next, close);
    if (open < 0) continue;

    paintIdentifiersAsParen(next, open, close);
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

  return markArrowParams(markAngleArgs(markQualified(tokens)));
}

function isEventPropName(name: string): boolean {
  return /^on[A-Z]/.test(name);
}

// ------------------------------------------------
// COMPONENTS
// ------------------------------------------------

function TypeTokens({ type }: { type: string }) {
  return (
    <span data-api-prop-type>
      {tokenizeType(type).map((token, index) => {
        if (!COLORED_KINDS.has(token.kind)) {
          return <span key={index}>{token.value}</span>;
        }
        return (
          <span key={index} data-token={token.kind}>
            {token.value}
          </span>
        );
      })}
    </span>
  );
}

function APIName({ name }: { name: string }) {
  return (
    <span data-api-name={isEventPropName(name) ? "event" : "prop"}>
      {name}
    </span>
  );
}

// ------------------------------------------------
// EXPORTS
// ------------------------------------------------

export { TypeTokens, APIName };
