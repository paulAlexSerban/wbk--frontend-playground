#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const AUDIT_PATH = path.join(
  ROOT_DIR,
  '_docs',
  'architecture',
  'adr-04.2--library-items-js-scss-dependency-audit.md'
);
const OUTPUT_PATH = path.join(
  ROOT_DIR,
  '_docs',
  'architecture',
  'adr-04.3--plan--wave1-low-coupling-backlog.md'
);

const WAVE1_NAMESPACES = [
  'libraries/dev-days-matrix-library/src/library/components/',
  'libraries/dev-days-matrix-library/src/library/patterns/',
  'libraries/dev-days-matrix-library/src/system/templates/'
];

function parseSections(content) {
  const sections = [];
  const parts = content.split(/^### /m).slice(1);

  for (const part of parts) {
    const lines = part.split('\n');
    const itemPath = lines[0].trim();

    const getValue = (label) => {
      const line = lines.find((entry) => entry.startsWith(`- ${label}:`));
      if (!line) return '';
      return line.slice(line.indexOf(':') + 1).trim();
    };

    const jsEntry = Number(getValue('JS entry files'));
    const scssEntry = Number(getValue('SCSS entry files'));
    const jsDeps = getValue('JS deps');
    const scssDeps = getValue('SCSS deps');

    sections.push({
      itemPath,
      jsEntry,
      scssEntry,
      jsDeps,
      scssDeps,
      noJsDeps: jsDeps === '(none detected)',
      noScssDeps: scssDeps === '(none detected)',
    });
  }

  return sections;
}

function isWave1Namespace(itemPath) {
  return WAVE1_NAMESPACES.some((prefix) => itemPath.startsWith(prefix));
}

function getProposedCategory(itemPath) {
  if (itemPath.includes('/src/library/components/')) return 'components';
  if (itemPath.includes('/src/library/patterns/')) return 'components';
  if (itemPath.includes('/src/system/templates/')) return 'systems';
  return 'review-required';
}

function toSlug(itemPath) {
  const raw = itemPath.split('/').pop() || '';
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function rankNamespace(itemPath) {
  if (itemPath.includes('/src/library/components/')) return 1;
  if (itemPath.includes('/src/library/patterns/')) return 2;
  if (itemPath.includes('/src/system/templates/')) return 3;
  return 9;
}

function formatCandidateLine(index, item) {
  return `${index}. ${item.itemPath} -> projects/${item.proposedCategory}/${item.slug}`;
}

async function main() {
  const raw = await fs.readFile(AUDIT_PATH, 'utf8');
  const records = parseSections(raw)
    .filter((item) => isWave1Namespace(item.itemPath))
    .map((item) => ({
      ...item,
      proposedCategory: getProposedCategory(item.itemPath),
      slug: toSlug(item.itemPath),
    }));

  const strictWave1 = records
    .filter((item) => item.noJsDeps && item.noScssDeps)
    .filter((item) => item.jsEntry <= 1 && item.scssEntry <= 1)
    .sort((a, b) => rankNamespace(a.itemPath) - rankNamespace(b.itemPath) || a.itemPath.localeCompare(b.itemPath));

  const stretchWave1 = records
    .filter((item) => item.noJsDeps && item.noScssDeps)
    .filter((item) => !(item.jsEntry <= 1 && item.scssEntry <= 1))
    .sort((a, b) => rankNamespace(a.itemPath) - rankNamespace(b.itemPath) || a.itemPath.localeCompare(b.itemPath));

  const lines = [];
  lines.push('# ADR-04.3 Plan: Wave 1 Low-Coupling Backlog');
  lines.push('');
  lines.push('## Status');
  lines.push('Draft');
  lines.push('');
  lines.push('## Date');
  lines.push(new Date().toISOString().slice(0, 10));
  lines.push('');
  lines.push('## Selection Rules');
  lines.push('- Source constrained to: src/library/components, src/library/patterns, src/system/templates');
  lines.push('- Strict Wave 1 set: JS deps none, SCSS deps none, JS entry files <= 1, SCSS entry files <= 1');
  lines.push('- Stretch set: deps none but multi-entry, migrate after strict set');
  lines.push('- Category assignment follows ADR-04 defaults and still requires per-item review');
  lines.push('');

  lines.push('## Strict Wave 1 Candidates (Start Here)');
  lines.push('');
  if (strictWave1.length === 0) {
    lines.push('- None found under current rules.');
  } else {
    strictWave1.forEach((item, i) => {
      lines.push(formatCandidateLine(i + 1, item));
    });
  }
  lines.push('');

  lines.push('## Stretch Wave 1 Candidates (No Deps, Multi-Entry)');
  lines.push('');
  if (stretchWave1.length === 0) {
    lines.push('- None found under current rules.');
  } else {
    stretchWave1.forEach((item, i) => {
      lines.push(formatCandidateLine(i + 1, item));
    });
  }
  lines.push('');

  lines.push('## Execution Notes');
  lines.push('- Use scripts/new-project.js for every scaffold action.');
  lines.push('- For each candidate, create a completed copy of migration-item-checklist-template.md.');
  lines.push('- Run yarn check:migration:wave0 after each migration batch.');

  await fs.writeFile(OUTPUT_PATH, `${lines.join('\n')}\n`, 'utf8');
  console.log(OUTPUT_PATH);
  console.log(`strict=${strictWave1.length}`);
  console.log(`stretch=${stretchWave1.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
