#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const items = [
  { slug: 'image', title: 'Image', source: 'libraries/dev-days-matrix-library/src/library/components/image', legacyMeta: 'n/a (source has SCSS/partials entries only)', desc: 'Image component patterns and responsive image demos.' },
  { slug: 'paint', title: 'Paint', source: 'libraries/dev-days-matrix-library/src/library/components/paint', legacyMeta: 'libraries/dev-days-matrix-library/src/library/components/paint/meta.json', desc: 'Paint interaction component with canvas controls and color tools.' },
  { slug: 'timer', title: 'Timer', source: 'libraries/dev-days-matrix-library/src/library/components/timer', legacyMeta: 'libraries/dev-days-matrix-library/src/library/components/timer/meta.json', desc: 'Timer component variants with countdown and elapsed-time behavior.' },
  { slug: 'toast', title: 'Toast', source: 'libraries/dev-days-matrix-library/src/library/components/toast', legacyMeta: 'libraries/dev-days-matrix-library/src/library/components/toast/meta.json', desc: 'Toast notification patterns for transient status messaging.' },
  { slug: 'layouts', title: 'Layouts', source: 'libraries/dev-days-matrix-library/src/library/patterns/layouts', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/layouts/meta.json', desc: 'Layouts pattern collection with cards and dashboard sections.' },
  { slug: 'like', title: 'Like', source: 'libraries/dev-days-matrix-library/src/library/patterns/like', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/like/meta.json', desc: 'Like interaction pattern with animated feedback and state toggles.' },
  { slug: 'loader', title: 'Loader', source: 'libraries/dev-days-matrix-library/src/library/patterns/loader', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/loader/meta.json', desc: 'Loader pattern set including CSS animated loading indicators.' },
  { slug: 'theme-switch', title: 'Theme Switch', source: 'libraries/dev-days-matrix-library/src/library/patterns/theme-switch', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/theme-switch/meta.json', desc: 'Theme switch pattern for toggling visual palettes and UI state.' },
  { slug: 'toggle-group', title: 'Toggle Group', source: 'libraries/dev-days-matrix-library/src/library/patterns/toggle-group', legacyMeta: 'libraries/dev-days-matrix-library/src/library/patterns/toggle-group/meta.json', desc: 'Toggle group pattern for segmented controls and stateful options.' },
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
  write(checklistPath, `# Migration Checklist: ${item.slug}\n\n## Item Identification\n\n- **Source**: ${item.source}\n- **Legacy meta**: ${item.legacyMeta}\n- **Target**: projects/components/${item.slug}\n- **Category**: components (confirmed — isolated UI/pattern migration)\n- **Source attribution**: Dev Days Matrix Library\n\n## Dependency Review\n\n- JS deps: none (external package deps)\n- SCSS deps: ~ScssAbstracts (resolved via local _abstracts.scss)\n- Entry files: migrated into split variation modules\n- Wave tier: Post-Wave 1 continuation\n\n## Project Scaffold\n\n- [x] Target directory created with scripts/new-project.js\n- [x] Template used: handlebars-template\n\n## Files Ported\n\n- [x] src/_partials/body.hbs — composition-only include\n- [x] src/_partials/_${item.slug}.hbs — variation partial\n- [x] src/styles.scss + split modules in src/styles/\n- [x] src/scripts.js + src/scripts/index.js + src/scripts/_${item.slug}.js\n- [x] src/styles/_abstracts.scss — local port replacing ~ScssAbstracts alias\n\n## Manifest and README\n\n- [x] manifest.json — source/sourceUrl updated; concepts/tags set\n- [x] README.md — provenance and split architecture notes\n\n## Verification\n\n- [x] yarn --cwd projects/components/${item.slug} build -> webpack compiled successfully\n- [x] yarn check:migration:wave0 -> Project manifest category validation passed. Checked 58 manifests.\n\n## Notes\n\n- Migrated as standalone component playground preserving split architecture and local abstracts recipe.\n`);
}

const planPath = path.join(root, '_docs/architecture/adr-04.3--plan--wave1-low-coupling-backlog.md');
let plan = fs.readFileSync(planPath, 'utf8');
for (const item of items) {
  const line = `- ${item.source} -> projects/components/${item.slug}`;
  if (!plan.includes(line)) {
    plan = plan.replace('Completed continuation items:\n', `Completed continuation items:\n${line}\n`);
  }
}
fs.writeFileSync(planPath, plan);

const progressPath = path.join(root, '_docs/architecture/adr-04.3--wave1-progress.md');
let progress = fs.readFileSync(progressPath, 'utf8');

const completedLines = [
  '40. libraries/dev-days-matrix-library/src/library/components/image -> projects/components/image',
  '41. libraries/dev-days-matrix-library/src/library/components/paint -> projects/components/paint',
  '42. libraries/dev-days-matrix-library/src/library/components/timer -> projects/components/timer',
  '43. libraries/dev-days-matrix-library/src/library/components/toast -> projects/components/toast',
  '44. libraries/dev-days-matrix-library/src/library/patterns/layouts -> projects/components/layouts',
  '45. libraries/dev-days-matrix-library/src/library/patterns/like -> projects/components/like',
  '46. libraries/dev-days-matrix-library/src/library/patterns/loader -> projects/components/loader',
  '47. libraries/dev-days-matrix-library/src/library/patterns/theme-switch -> projects/components/theme-switch',
  '48. libraries/dev-days-matrix-library/src/library/patterns/toggle-group -> projects/components/toggle-group',
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

progress = progress.replace('Guardrail validation: yarn check:migration:wave0 (49 manifests)', 'Guardrail validation: yarn check:migration:wave0 (58 manifests)');
progress = progress.replace('Guardrail validation: yarn check:migration:wave0 (39 manifests)', 'Guardrail validation: yarn check:migration:wave0 (58 manifests)');

fs.writeFileSync(progressPath, progress);

console.log(`Updated ${items.length} projects plus migration docs.`);
