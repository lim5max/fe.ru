/**
 * Normalize SVG icons:
 * - Force preserveAspectRatio="xMidYMid meet"
 * - Convert width/height="100%" to width/height="24"
 * - Leave numeric width/height (e.g., 16, 20, 32) as-is
 * - Add preserveAspectRatio attribute if missing
 *
 * Usage:
 *   node scripts/normalize-svgs.js
 */

const fs = require("fs");
const path = require("path");

const ICONS_DIR = path.join(process.cwd(), "public", "icons");

function normalizeSvgContent(svg) {
  let updated = svg;

  // 1) Normalize preserveAspectRatio values
  updated = updated.replace(
    /preserveAspectRatio\s*=\s*"(none|xMidYMid\s+slice)"/gi,
    'preserveAspectRatio="xMidYMid meet"'
  );

  // 2) Add preserveAspectRatio if missing on <svg ...>
  if (!/preserveAspectRatio\s*=/.test(updated)) {
    updated = updated.replace(
      /<svg\b([^>]*)>/i,
      (full, attrs) => `<svg preserveAspectRatio="xMidYMid meet"${attrs}>`
    );
  }

  // 3) Replace width/height="100%" with pixel size 24 for consistency
  updated = updated.replace(/width\s*=\s*"100%"/gi, 'width="24"');
  updated = updated.replace(/height\s*=\s*"100%"/gi, 'height="24"');

  // 4) Some files may use single quotes. Normalize those too.
  updated = updated.replace(/width\s*=\s*'100%'/gi, 'width="24"');
  updated = updated.replace(/height\s*=\s*'100%'/gi, 'height="24"');

  return updated;
}

function main() {
  if (!fs.existsSync(ICONS_DIR)) {
    console.error("Icons directory not found:", ICONS_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(ICONS_DIR)
    .filter((f) => f.toLowerCase().endsWith(".svg"));
  const changed = [];

  for (const file of files) {
    const fp = path.join(ICONS_DIR, file);
    const content = fs.readFileSync(fp, "utf8");
    const updated = normalizeSvgContent(content);

    if (updated !== content) {
      fs.writeFileSync(fp, updated, "utf8");
      changed.push(file);
    }
  }

  console.log(`Normalized ${changed.length} SVGs.`);
  if (changed.length) {
    console.log("Files:", changed.join(", "));
  } else {
    console.log("No changes were necessary.");
  }
}

main();
