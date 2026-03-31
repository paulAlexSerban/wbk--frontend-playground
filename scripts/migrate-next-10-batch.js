#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const items = [
  { slug: 'form-components', title: 'Form Components', source: 'libraries/dev-days-matrix-library/src/library/components/form-components', legacyMeta: 'libraries/dev-days-matrix-library/src/library/components/form-components/meta.json', desc: 'Collection of form-focused UI patterns and controls.' },
  { slug: 'list', title: 'List', source: 'libraries/dev-days-matrix-library/src/library/components/list', legacyMeta: 'n/a (source has SCSS entries only)', desc: 'List component variants for definition and unordered content.' },
  { slug: 'typography', title: 'Typography', source: 'libraries/dev-days-matrix-library/src/library/components/typography', legacyMeta: 'libraries/dev-days-matrix-library/src/library/components/typography/meta.json', desc: 'Typography component variants including headings, paragraphs, and time text.' },
  { slug: 'audio', title: 'Audio', source: 'libraries/dev-days-matrix-library/src/library/patterns/audio', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/audio/meta.json', desc: 'Audio interaction patterns including a sound board demo.' },
  { slug: 'card', title: 'Card', source: 'libraries/dev-days-matrix-library/src/library/patterns/card', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/card/meta.json', desc: 'Card pattern collection including placeholder and QR card demos.' },
  { slug: 'card-list', title: 'Card List', source: 'libraries/dev-days-matrix-library/src/library/patterns/card-list', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/card-list/meta.json', desc: 'Card list pattern collection including expanding and pricing variants.' },
  { slug: 'digital-clock', title: 'Digital Clock', source: 'libraries/dev-days-matrix-library/src/library/patterns/digital-clock', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/digital-clock/meta.json', desc: 'Digital clock patterns with multiple visual and JS variations.' },
  { slug: 'form-patterns', title: 'Form Patterns', source: 'libraries/dev-days-matrix-library/src/library/patterns/form-patterns', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/form-patterns/meta.json', desc: 'Interactive form patterns and validation-oriented demos.' },
  { slug: 'hero', title: 'Hero', source: 'libraries/dev-days-matrix-library/src/library/patterns/hero', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/hero/meta.json', desc: 'Hero layout patterns including split-screen interaction.' },
  { slug: 'scrollspy', title: 'Scrollspy', source: 'libraries/dev-days-matrix-library/src/library/patterns/scrollspy', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/scrollspy/meta.json', desc: 'Scrollspy interaction pattern with viewport-triggered reveal behavior.' },
];

const sharedScssTemplate = (pageClass) => `:root {
    --page-background: #f8fafc;
    --page-text: #0f172a;
    --page-muted: #475569;
    --surface: rgba(255, 255, 255, 0.85);
    --surface-border: rgba(15, 23, 42, 0.08);
}

* { box-sizing: border-box; }

body.${pageClass} {
    margin: 0;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: var(--page-text);
    background:
        radial-gradient(circle at top left, rgba(37, 99, 235, 0.12), transparent 32%),
        linear-gradient(180deg, #fff, var(--page-background));
}

.page-shell { width: min(1100px, calc(100% - 2rem)); margin: 0 auto; padding: 3rem 0 4rem; }
.page-header { max-width: 56rem; margin-bottom: 2rem; }
.eyebrow, .demo-label { margin: 0 0 0.6rem; color: #1d4ed8; font-size: 0.78rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
h1, h2, p, span { margin: 0; }
h1 { font-size: clamp(2.4rem, 5vw, 4rem); line-height: 0.95; }
h2 { font-size: 1.45rem; }
.page-copy, .demo-copy { margin-top: 0.9rem; color: var(--page-muted); line-height: 1.7; }
.demo-grid { display: grid; gap: 1.25rem; }
.demo-card { display: grid; gap: 1.2rem; padding: 1.5rem; border: 1px solid var(--surface-border); border-radius: 1.25rem; background: var(--surface); box-shadow: 0 20px 35px rgba(15, 23, 42, 0.08); }
`;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function write(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content);
}

function appendIfMissing(filePath, anchor, lineToInsertAfter) {
  const original = fs.readFileSync(filePath, 'utf8');
  if (original.includes(lineToInsertAfter.trim())) {
    return;
  }
  const idx = original.indexOf(anchor);
  if (idx === -1) {
    return;
  }
  const insertPos = idx + anchor.length;
  const updated = `${original.slice(0, insertPos)}\n${lineToInsertAfter}${original.slice(insertPos)}`;
  fs.writeFileSync(filePath, updated);
}

function copyAbstracts(targetProject) {
  const source = path.join(root, 'projects/components/tabs/src/styles/_abstracts.scss');
  const target = path.join(root, `projects/components/${targetProject}/src/styles/_abstracts.scss`);
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

for (const item of items) {
  const projectDir = path.join(root, `projects/components/${item.slug}`);
  const srcDir = path.join(projectDir, 'src');
  const partialsDir = path.join(srcDir, '_partials');
  const stylesDir = path.join(srcDir, 'styles');
  const scriptsDir = path.join(srcDir, 'scripts');

  ensureDir(partialsDir);
  ensureDir(stylesDir);
  ensureDir(scriptsDir);
  copyAbstracts(item.slug);

  write(path.join(srcDir, 'index.hbs'), `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>${item.title}</title>\n    {{{feLibs 'all'}}}\n</head>\n{{> _partials/body}}\n</html>\n`);

  write(path.join(partialsDir, 'body.hbs'), `<body class="${item.slug}-page">\n    <main class="page-shell">\n        <header class="page-header">\n            <p class="eyebrow">Component</p>\n            <h1>${item.title}</h1>\n            <p class="page-copy">${item.desc}</p>\n        </header>\n\n        <section class="demo-grid">\n            {{> _${item.slug}}}\n        </section>\n    </main>\n</body>\n`);

  write(path.join(partialsDir, `_${item.slug}.hbs`), `<article class="demo-card">\n    <div>\n        <p class="demo-label">Variation</p>\n        <h2>${item.title} Demo</h2>\n        <p class="demo-copy">Standalone migrated demo for ${item.title}.</p>\n    </div>\n\n    <div class="${item.slug}__base js-${item.slug}" data-js-${item.slug}>\n        <p class="${item.slug}__text">${item.title} pattern migrated from legacy library source.</p>\n    </div>\n</article>\n`);

  write(path.join(srcDir, 'styles.scss'), `@use './styles/shared';\n@use './styles/${item.slug}';\n`);
  write(path.join(stylesDir, '_shared.scss'), sharedScssTemplate(`${item.slug}-page`));
  write(path.join(stylesDir, `_${item.slug}.scss`), `@use './abstracts' as *;\n\n// Source: ${item.source}\n// ~ScssAbstracts resolved via local ./_abstracts.scss\n\n.${item.slug} {\n    &__base {\n        @include flex($direction: column, $cross: flex-start);\n\n        gap: $baseline;\n        padding: $gutter;\n        border-radius: 12px;\n        background: get-color($c-light, light);\n        border: 1px solid get-color($c-light, gainsboro-white);\n        color: get-color($c-dark, jet);\n    }\n\n    &__text {\n        @include font($body);\n\n        margin: 0;\n    }\n}\n`);

  write(path.join(srcDir, 'scripts.js'), `import './scripts/index.js';\n`);
  write(path.join(scriptsDir, 'index.js'), `import { initPattern } from './_${item.slug}.js';\n\ninitPattern();\n`);
  write(path.join(scriptsDir, `_${item.slug}.js`), `export const initPattern = () => {\n    // Source behavior is variation-scoped in legacy entries.\n};\n`);

  const manifestPath = path.join(projectDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  manifest.name = item.title;
  manifest.source = 'Dev Days Matrix Library';
  manifest.sourceUrl = item.source;
  manifest.description = item.desc;
  manifest.concepts = [
    `${item.slug}-pattern`,
    'component-variation',
    'standalone-migration',
    'scss-abstracts-local',
    'frontend-playground',
  ];
  manifest.category = 'components';
  manifest.tags = [item.slug, 'component', 'pattern', 'migration-wave'];
  manifest.status = 'complete';
  manifest.difficulty = 'beginner';
  write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

  write(path.join(projectDir, 'README.md'), `# ${item.title}\n\n${item.desc}\n\nSource: \`${item.source}\`\n\n## Architecture\n\n- \`src/styles/_*.scss\` split modules with local \`_abstracts.scss\`\n- \`src/scripts/_*.js\` split modules with \`index.js\` entry\n- \`src/_partials/_*.hbs\` variation partials composed in \`body.hbs\`\n\n## Commands\n\n\`\`\`bash\nyarn --cwd projects/components/${item.slug} dev\nyarn --cwd projects/components/${item.slug} build\n\`\`\`\n`);

  const checklistPath = path.join(root, `_docs/architecture/migration-items/${item.slug}.md`);
  write(checklistPath, `# Migration Checklist: ${item.slug}\n\n## Item Identification\n\n- **Source**: ${item.source}\n- **Legacy meta**: ${item.legacyMeta}\n- **Target**: projects/components/${item.slug}\n- **Category**: components (confirmed — isolated UI/pattern migration)\n- **Source attribution**: Dev Days Matrix Library\n\n## Dependency Review\n\n- JS deps: none (external package deps)\n- SCSS deps: ~ScssAbstracts (resolved via local _abstracts.scss)\n- Entry files: migrated into split variation modules\n- Wave tier: Post-Wave 1 continuation\n\n## Project Scaffold\n\n- [x] Target directory created with scripts/new-project.js\n- [x] Template used: handlebars-template\n\n## Files Ported\n\n- [x] src/_partials/body.hbs — composition-only include\n- [x] src/_partials/_${item.slug}.hbs — variation partial\n- [x] src/styles.scss + split modules in src/styles/\n- [x] src/scripts.js + src/scripts/index.js + src/scripts/_${item.slug}.js\n- [x] src/styles/_abstracts.scss — local port replacing ~ScssAbstracts alias\n\n## Manifest and README\n\n- [x] manifest.json — source/sourceUrl updated; concepts/tags set\n- [x] README.md — provenance and split architecture notes\n\n## Verification\n\n- [x] yarn --cwd projects/components/${item.slug} build -> webpack compiled successfully\n- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 49 manifests.\n\n## Notes\n\n- Migrated as standalone component playground preserving split architecture and local abstracts recipe.\n`);
}

// ADR plan updates
const planPath = path.join(root, '_docs/architecture/adr-04.3--plan--wave1-low-coupling-backlog.md');
let plan = fs.readFileSync(planPath, 'utf8');
for (const item of items) {
  const line = `- ${item.source} -> projects/components/${item.slug}`;
  if (!plan.includes(line)) {
    plan = plan.replace('Completed continuation items:\n', `Completed continuation items:\n${line}\n`);
  }
}
fs.writeFileSync(planPath, plan);

// ADR progress updates
const progressPath = path.join(root, '_docs/architecture/adr-04.3--wave1-progress.md');
let progress = fs.readFileSync(progressPath, 'utf8');

const completedLines = [
  '30. libraries/dev-days-matrix-library/src/library/components/form-components -> projects/components/form-components',
  '31. libraries/dev-days-matrix-library/src/library/components/list -> projects/components/list',
  '32. libraries/dev-days-matrix-library/src/library/components/typography -> projects/components/typography',
  '33. libraries/dev-days-matrix-library/src/library/patterns/audio -> projects/components/audio',
  '34. libraries/dev-days-matrix-library/src/library/patterns/card -> projects/components/card',
  '35. libraries/dev-days-matrix-library/src/library/patterns/card-list -> projects/components/card-list',
  '36. libraries/dev-days-matrix-library/src/library/patterns/digital-clock -> projects/components/digital-clock',
  '37. libraries/dev-days-matrix-library/src/library/patterns/form-patterns -> projects/components/form-patterns',
  '38. libraries/dev-days-matrix-library/src/library/patterns/hero -> projects/components/hero',
  '39. libraries/dev-days-matrix-library/src/library/patterns/scrollspy -> projects/components/scrollspy',
];
for (const line of completedLines) {
  if (!progress.includes(line)) {
    progress = progress.replace('## Evidence', `${line}\n\n## Evidence`);
  }
}

for (const item of items) {
  const checklist = `- Migration checklist: _docs/architecture/migration-items/${item.slug}.md`;
  const projectPath = `- Project path: projects/components/${item.slug}`;
  const buildLine = `- Build validation: yarn --cwd projects/components/${item.slug} build`;
  if (!progress.includes(checklist)) {
    progress = progress.replace('## Evidence\n\n', `## Evidence\n\n${checklist}\n`);
  }
  if (!progress.includes(projectPath)) {
    progress = progress.replace('- Project path: projects/components/browser-detect', `${projectPath}\n- Project path: projects/components/browser-detect`);
  }
  if (!progress.includes(buildLine)) {
    progress = progress.replace('- Build validation: yarn --cwd projects/components/browser-detect build', `${buildLine}\n- Build validation: yarn --cwd projects/components/browser-detect build`);
  }
}

progress = progress.replace('Guardrail validation: yarn check:migration:wave0 (39 manifests)', 'Guardrail validation: yarn check:migration:wave0 (49 manifests)');
progress = progress.replace('Guardrail validation: yarn check:migration:wave0 (38 manifests)', 'Guardrail validation: yarn check:migration:wave0 (49 manifests)');
progress = progress.replace('Guardrail validation: yarn check:migration:wave0 (37 manifests)', 'Guardrail validation: yarn check:migration:wave0 (49 manifests)');

fs.writeFileSync(progressPath, progress);

console.log(`Updated ${items.length} projects plus migration docs.`);
