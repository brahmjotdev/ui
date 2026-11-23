#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const watched = new Set([".ts", ".tsx", ".mts", ".css"]);

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

function changedSourceFiles() {
  const status = spawnSync("git", ["status", "--porcelain=v1", "-uall"], {
    cwd: root,
    encoding: "utf8",
  });
  if (status.status !== 0) return [];

  const files = [];
  for (const line of status.stdout.split("\n")) {
    if (line.length < 4) continue;
    const body = line.slice(3);
    const picked = body.includes(" -> ") ? body.split(" -> ").at(-1) : body;
    const cleaned = picked.replaceAll('"', "").trim();
    if (watched.has(path.extname(cleaned))) files.push(cleaned);
  }
  return files;
}

function outputOf(result) {
  return [result.stdout, result.stderr, result.error && result.error.message]
    .filter((part) => typeof part === "string" && part.length > 0)
    .join("\n")
    .slice(-6000);
}

function followUp(script, result) {
  const message = [
    `Verification failed (\`npm run ${script}\`). Fix these errors before finishing.`,
    "",
    outputOf(result) || "The command failed without output.",
  ].join("\n");
  process.stdout.write(JSON.stringify({ followup_message: message }));
}

function run(script) {
  return spawnSync("npm", ["run", script], {
    cwd: root,
    encoding: "utf8",
    timeout: 150_000,
  });
}

const raw = await readStdin();
let payload = {};
try {
  payload = raw.trim() ? JSON.parse(raw) : {};
} catch {
  process.exit(0);
}

if (payload.status !== "completed") process.exit(0);
if (changedSourceFiles().length === 0) process.exit(0);

const typecheck = run("typecheck");
if (typecheck.error || typecheck.status !== 0) {
  followUp("typecheck", typecheck);
  process.exit(0);
}

const test = run("test");
if (test.error || test.status !== 0) {
  followUp("test", test);
  process.exit(0);
}

process.exit(0);
