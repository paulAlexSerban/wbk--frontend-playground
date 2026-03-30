// Main entry for generating dashboard index.html and index.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { buildHtmlDocument } from './htmlBuilder.js';
import { loadComponentData } from './dataLoader.js';
import { resolveDashboardCatalogPaths } from './catalog/packagePaths.js';
import { formatIntegrityErrors, verifyGeneratedArtifacts } from '../quality/integrity.js';

import { generateLibraryHTML } from './templates/libraryTemplate.js';
import { generateSidebarHTML } from './templates/sidebarTemplate.js';
import { headHTML, headerHTML, footerHTML, topNavbarHTML } from './htmlPartials.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function generateIndex() {
    console.log('Generating dashboard index...');
    try {
        const { sourceDir, destinationDir, repositorySegment, catalogSegment } = await resolveDashboardCatalogPaths({
            projectRoot,
            catalogSegment: 'projects',
        });

        process.env.DASHBOARD_REPOSITORY_SEGMENT = repositorySegment;
        process.env.DASHBOARD_CATALOG_SEGMENT = catalogSegment;

        await fs.promises.mkdir(destinationDir, { recursive: true });
        const transformedComponentLists = await loadComponentData(sourceDir);
        if (transformedComponentLists.length === 0) {
            throw new Error(
                'No project data found. Run package:projects first or ensure manifest.json exists in package/<repo>/projects or projects/*/*.'
            );
        }
        await fs.promises.writeFile(
            path.join(destinationDir, 'index.json'),
            JSON.stringify(transformedComponentLists, null, 2)
        );
        console.log('index.json has been generated!');
        const libraryHTML = transformedComponentLists.map((library) => generateLibraryHTML(library, BASE_URL)).join('');
        const htmlContent = buildHtmlDocument({
            head: headHTML,
            topNavbar: topNavbarHTML,
            header: headerHTML,
            sidebar: generateSidebarHTML(),
            cards: libraryHTML,
            footer: footerHTML,
        });
        await fs.promises.writeFile(path.join(destinationDir, 'index.html'), htmlContent);

        const integrityResult = await verifyGeneratedArtifacts({
            catalog: transformedComponentLists,
            htmlContent,
            baseUrl: BASE_URL,
            destinationDir,
        });

        if (integrityResult.errors.length > 0) {
            throw new Error(`Dashboard integrity checks failed:\n${formatIntegrityErrors(integrityResult.errors)}`);
        }

        console.log('index.html has been generated!');
        console.log(
            `Dashboard integrity checks passed: ${integrityResult.summary.visibleEntries} visible entries, ${integrityResult.summary.checkedPreviewTargets} preview targets.`
        );
    } catch (err) {
        console.error('Error:', err);
        process.exitCode = 1;
    }
}

export default generateIndex;
