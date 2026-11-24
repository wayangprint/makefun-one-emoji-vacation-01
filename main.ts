import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Dream Vacation — entry: Mount Fuji.
// A single code point (U+1F5FB), no variation selector, no ZWJ, no
// combining sequence: one iconic, instantly readable dream destination.
// A snow-capped Fuji at a glance is a postcard — a specific place a
// stranger can picture booking a flight to, not a generic holiday sign.
const ENTRY = "🗻";

// Gate (RULES.txt): /output/entry.txt must be UTF-8 text of 1-8
// characters, not only whitespace. This entry is exactly one emoji,
// written with no trailing newline, so the file is byte-identical
// to the entry string itself. The brief also forbids a variation
// selector (U+FE0F), a zero-width joiner (U+200D) and any combined
// sequence, so those are checked explicitly: U+1F5FB on its own is a
// single code point and renders as emoji without a selector.
if ([...ENTRY].length !== 1) {
  throw new Error(`Entry must be exactly one emoji, got ${[...ENTRY].length} code points`);
}
if (ENTRY.includes("\uFE0F") || ENTRY.includes("\u200D")) {
  throw new Error("Entry must not contain a variation selector or ZWJ");
}
const codePoint = ENTRY.codePointAt(0);
if (codePoint === undefined || codePoint < 0x1f300 || codePoint > 0x1faff) {
  throw new Error(`Entry must be a single emoji code point, got U+${codePoint?.toString(16).toUpperCase()}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("Entry must not be only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(ENTRY);
