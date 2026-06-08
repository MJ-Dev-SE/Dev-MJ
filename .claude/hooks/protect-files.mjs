#!/usr/bin/env node
// PreToolUse hook: blocks Write/Edit/MultiEdit on files listed in .claude/protected-files.txt
// Reads the tool call as JSON on stdin; denies the call if the target path matches a pattern.
// Read/verification operations never reach this hook (matcher only fires on edit tools).

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LIST_FILE = path.join(HERE, "..", "protected-files.txt");
const PROJECT_ROOT = path.resolve(HERE, "..", "..");

// --- read stdin ---
function readStdin() {
  try {
    return readFileSync(0, "utf8");
  } catch {
    return "";
  }
}

// --- load patterns ---
function loadPatterns() {
  let raw;
  try {
    raw = readFileSync(LIST_FILE, "utf8");
  } catch {
    return []; // no list = nothing protected
  }
  return raw
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
}

// --- glob -> RegExp (anchored, "/"-aware) ---
function globToRegExp(glob) {
  // Patterns without a slash match by basename anywhere -> prefix with **/
  const pattern = glob.includes("/") ? glob : "**/" + glob;
  let re = "";
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (c === "*") {
      if (pattern[i + 1] === "*") {
        // ** = any chars including "/"; consume an optional following slash
        re += ".*";
        i++;
        if (pattern[i + 1] === "/") i++;
      } else {
        re += "[^/]*"; // * = any chars except "/"
      }
    } else if (c === "?") {
      re += "[^/]";
    } else if ("\\^$+.()|{}[]".includes(c)) {
      re += "\\" + c; // escape regex metachars
    } else {
      re += c;
    }
  }
  return new RegExp("^(?:.*/)?" + re + "$", "i");
}

// --- normalize a file path to project-relative, forward slashes ---
function toRelative(filePath) {
  if (!filePath) return "";
  const abs = path.resolve(PROJECT_ROOT, filePath);
  let rel = path.relative(PROJECT_ROOT, abs);
  if (!rel || rel.startsWith("..")) rel = filePath; // outside project: match raw
  return rel.split(path.sep).join("/");
}

function allow() {
  process.exit(0); // silent allow
}

function deny(filePath, pattern) {
  const out = {
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason:
        `"${filePath}" is a protected file (matches "${pattern}" in .claude/protected-files.txt). ` +
        `This file is reserved for manual edits — Claude may read/verify it but not modify it. ` +
        `If this change is intended, the user should edit it by hand or remove the pattern from the list.`,
    },
  };
  process.stdout.write(JSON.stringify(out));
  process.exit(0);
}

// --- main ---
let payload;
try {
  payload = JSON.parse(readStdin() || "{}");
} catch {
  allow(); // unparseable input: don't block
}

const input = payload.tool_input || {};
// Edit/Write use file_path; MultiEdit also uses file_path for the whole batch.
const targets = [];
if (typeof input.file_path === "string") targets.push(input.file_path);
if (Array.isArray(input.edits)) {
  // MultiEdit edits share the top-level file_path; nothing extra to collect.
}

if (targets.length === 0) allow();

const patterns = loadPatterns().map((g) => ({ glob: g, re: globToRegExp(g) }));

for (const target of targets) {
  const rel = toRelative(target);
  for (const { glob, re } of patterns) {
    if (re.test(rel)) deny(target, glob);
  }
}

allow();
