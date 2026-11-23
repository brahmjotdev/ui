#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const extensions = new Set([".ts", ".tsx", ".mts", ".css", ".md"]);

function readStdin() {
  return new Promise((resolve) => {
    if (process.stdin.isTTY) {
      resolve("");
      return;
    }
    const chunks = [];
    process.stdin.on("data", (chunk) => chunks.push(chunk));
    process.stdin.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    process.stdin.on("error", () => resolve(""));
  });
}

function pickPath(payload) {
  if (!payload || typeof payload !== "object") return "";
  const toolInput = payload.tool_input;
  const candidates = [
    payload.file_path,
    payload.path,
    payload.filePath,
    payload.uri,
    toolInput && toolInput.file_path,
    toolInput && toolInput.path,
  ];
  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) return value;
  }
  return "";
}

const raw = await readStdin();
let payload = {};
try {
  payload = raw.trim() ? JSON.parse(raw) : {};
} catch {
  process.exit(0);
}

const filePath = pickPath(payload);
if (!filePath) process.exit(0);

const absolute = path.resolve(root, filePath);
const relative = path.relative(root, absolute);
if (relative.startsWith("..") || path.isAbsolute(relative)) process.exit(0);
if (relative.split(path.sep).includes("node_modules")) process.exit(0);
if (relative === ".next" || relative.startsWith(`.next${path.sep}`)) process.exit(0);
if (!extensions.has(path.extname(absolute))) process.exit(0);

try {
  if (!fs.statSync(absolute).isFile()) process.exit(0);
} catch {
  process.exit(0);
}

const prettier = path.join(root, "node_modules", ".bin", "prettier");
spawnSync(prettier, ["--write", "--ignore-unknown", absolute], {
  cwd: root,
  stdio: "ignore",
});

process.exit(0);
