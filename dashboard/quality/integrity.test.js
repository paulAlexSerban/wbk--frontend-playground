import fs from 'fs';
import os from 'os';
import path from 'path';
import test from 'node:test';
import assert from 'node:assert/strict';

import { collectVisibleEntries, verifyGeneratedArtifacts } from './integrity.js';

function createCatalog() {
    return [
        {
            'demo-library': {
                projects: {
                    components: [
                        {
                            component: 'button',
                            hide: false,
                            variations: [
                                {
                                    slug: 'primary',
                                    hide: false,
                                },
                            ],
                        },
                    ],
                },
            },
        },
    ];
}

test('collectVisibleEntries flattens visible variations into preview records', () => {
    const entries = collectVisibleEntries(createCatalog(), 'http://localhost:3000');

    assert.equal(entries.length, 1);
    assert.equal(entries[0].cardId, 'demo-library-projects-components-button-0');
    assert.match(entries[0].previewUrl, /projects\/components\/button\/primary\.html$/);
});

test('verifyGeneratedArtifacts passes for matching html, preview files, and catalog', async () => {
    const destinationDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'dashboard-quality-'));

    await fs.promises.mkdir(path.join(destinationDir, 'components', 'button'), {
        recursive: true,
    });
    await fs.promises.mkdir(path.join(destinationDir, 'components', 'button'), {
        recursive: true,
    });
    await fs.promises.writeFile(path.join(destinationDir, 'components', 'button', 'styles.css'), 'body {}');
    await fs.promises.writeFile(
        path.join(destinationDir, 'components', 'button', 'primary.html'),
        '<html><head><link rel="stylesheet" href="styles.css"></head></html>'
    );

    const htmlContent = `
        <nav id="categorySidebar"></nav>
        <p id="resultsSummary"></p>
        <section id="emptyState"></section>
        <div id="cardContainer">
            <div class="item-card"></div>
        </div>
        <div id="carousel-demo-library-projects-components-button-0"></div>
        <a href="http://localhost:3000/wbk-frontend-forge/projects/components/button/primary.html">Preview</a>
    `;

    const result = await verifyGeneratedArtifacts({
        catalog: createCatalog(),
        htmlContent,
        baseUrl: 'http://localhost:3000',
        destinationDir,
    });

    assert.deepEqual(result.errors, []);
    assert.equal(result.summary.visibleEntries, 1);
});

test('verifyGeneratedArtifacts reports missing preview targets and duplicate ids', async () => {
    const destinationDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'dashboard-quality-'));
    const htmlContent = `
        <nav id="categorySidebar"></nav>
        <p id="resultsSummary"></p>
        <section id="emptyState"></section>
        <div id="cardContainer">
            <div class="item-card"></div>
        </div>
        <div id="duplicate-id"></div>
        <div id="duplicate-id"></div>
    `;

    const result = await verifyGeneratedArtifacts({
        catalog: createCatalog(),
        htmlContent,
        baseUrl: 'http://localhost:3000',
        destinationDir,
    });

    assert.match(result.errors.join('\n'), /Broken preview target:/);
    assert.match(result.errors.join('\n'), /Duplicate generated HTML id detected/);
    assert.match(result.errors.join('\n'), /Generated HTML is missing preview link/);
});

test('verifyGeneratedArtifacts reports missing preview asset references', async () => {
    const destinationDir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'dashboard-quality-'));

    await fs.promises.mkdir(path.join(destinationDir, 'components', 'button'), {
        recursive: true,
    });
    await fs.promises.writeFile(
        path.join(destinationDir, 'components', 'button', 'primary.html'),
        '<html><head><link rel="stylesheet" href="styles.css"></head></html>'
    );

    const htmlContent = `
        <nav id="categorySidebar"></nav>
        <p id="resultsSummary"></p>
        <section id="emptyState"></section>
        <div id="cardContainer">
            <div class="item-card"></div>
        </div>
        <a href="http://localhost:3000/wbk-frontend-forge/projects/components/button/primary.html">Preview</a>
    `;

    const result = await verifyGeneratedArtifacts({
        catalog: createCatalog(),
        htmlContent,
        baseUrl: 'http://localhost:3000',
        destinationDir,
    });

    assert.match(result.errors.join('\n'), /Broken preview asset:/);
});
