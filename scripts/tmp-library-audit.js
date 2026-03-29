import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const libRoot = path.join(root, 'libraries', 'dev-days-matrix-library', 'src');

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

function toRel(filePath) {
  return path.relative(root, filePath).split(path.sep).join('/');
}

function parseJsDeps(content) {
  const deps = new Set();
  const importRe = /import\s+(?:[^'";]+\s+from\s+)?['"]([^'"]+)['"]/g;
  const requireRe = /require\(\s*['"]([^'"]+)['"]\s*\)/g;
  let match;

  while ((match = importRe.exec(content)) !== null) {
    deps.add(match[1]);
  }
  while ((match = requireRe.exec(content)) !== null) {
    deps.add(match[1]);
  }

  return Array.from(deps).sort();
}

function parseScssDeps(content) {
  const deps = new Set();
  const scssRe = /@(use|import|forward)\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = scssRe.exec(content)) !== null) {
    deps.add(`${match[1]}:${match[2]}`);
  }

  return Array.from(deps).sort();
}

const metaFiles = walk(libRoot).filter((file) => file.endsWith('/meta.json')).sort();
const records = [];

for (const metaPath of metaFiles) {
  const itemDir = path.dirname(metaPath);
  const itemFiles = walk(itemDir);
  const jsFiles = itemFiles.filter((file) => file.endsWith('.js'));
  const scssFiles = itemFiles.filter((file) => file.endsWith('.scss'));
  const jsEntryFiles = jsFiles.filter((file) => file.includes('.entry.js'));
  const scssEntryFiles = scssFiles.filter((file) => file.includes('.entry.scss'));

  const jsDeps = new Set();
  const scssDeps = new Set();

  for (const jsFile of jsFiles) {
    const content = fs.readFileSync(jsFile, 'utf8');
    for (const dep of parseJsDeps(content)) {
      jsDeps.add(dep);
    }
  }

  for (const scssFile of scssFiles) {
    const content = fs.readFileSync(scssFile, 'utf8');
    for (const dep of parseScssDeps(content)) {
      scssDeps.add(dep);
    }
  }

  records.push({
    item: toRel(itemDir),
    entryJsCount: jsEntryFiles.length,
    entryScssCount: scssEntryFiles.length,
    jsFileCount: jsFiles.length,
    scssFileCount: scssFiles.length,
    jsDeps: Array.from(jsDeps).sort(),
    scssDeps: Array.from(scssDeps).sort(),
  });
}

const namespaceCounts = new Map();
for (const record of records) {
  const parts = record.item.split('/');
  const srcIndex = parts.indexOf('src');
  const namespaceParts = srcIndex >= 0 ? parts.slice(srcIndex, srcIndex + 3) : parts.slice(0, 3);
  const key = namespaceParts.join('/');
  namespaceCounts.set(key, (namespaceCounts.get(key) || 0) + 1);
}

const lines = [];
lines.push('# ADR-04.2: Library Items JS and SCSS Dependency Audit');
lines.push('');
lines.push('## Status');
lines.push('Accepted');
lines.push('');
lines.push('## Date');
lines.push(new Date().toISOString().slice(0, 10));
lines.push('');
lines.push('## Scope');
lines.push('- Library: libraries/dev-days-matrix-library');
lines.push(`- Items discovered from meta.json: ${records.length}`);
lines.push('');
lines.push('## Item counts by namespace');
lines.push('');
for (const [key, count] of Array.from(namespaceCounts.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
  lines.push(`- ${key}: ${count}`);
}
lines.push('');
lines.push('## Per-item dependency notes');
lines.push('');

for (const record of records) {
  lines.push(`### ${record.item}`);
  lines.push('');
  lines.push(`- JS entry files: ${record.entryJsCount}`);
  lines.push(`- SCSS entry files: ${record.entryScssCount}`);
  lines.push(`- JS files total: ${record.jsFileCount}`);
  lines.push(`- SCSS files total: ${record.scssFileCount}`);
  lines.push(`- JS deps: ${record.jsDeps.length ? record.jsDeps.join(', ') : '(none detected)'}`);
  lines.push(`- SCSS deps: ${record.scssDeps.length ? record.scssDeps.join(', ') : '(none detected)'}`);
  lines.push('');
}

const outPath = path.join(root, '_docs', 'architecture', 'adr-04.2--library-items-js-scss-dependency-audit.md');
fs.writeFileSync(outPath, lines.join('\n'));
console.log(outPath);
console.log(`items=${records.length}`);
