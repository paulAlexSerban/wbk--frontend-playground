import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { formatIntegrityErrors, verifyGeneratedArtifacts } from './integrity.js';
import { resolveDashboardCatalogPaths } from '../core/catalog/packagePaths.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..');
const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

async function runIntegrityChecks() {
    const { destinationDir, repositorySegment, catalogSegment } = await resolveDashboardCatalogPaths({
        projectRoot,
        catalogSegment: 'projects',
    });
    process.env.DASHBOARD_REPOSITORY_SEGMENT = repositorySegment;
    process.env.DASHBOARD_CATALOG_SEGMENT = catalogSegment;

    const indexJsonPath = path.join(destinationDir, 'index.json');
    const indexHtmlPath = path.join(destinationDir, 'index.html');

    const [catalogContent, htmlContent] = await Promise.all([
        fs.promises.readFile(indexJsonPath, 'utf-8'),
        fs.promises.readFile(indexHtmlPath, 'utf-8'),
    ]);

    const result = await verifyGeneratedArtifacts({
        catalog: JSON.parse(catalogContent),
        htmlContent,
        baseUrl,
        destinationDir,
    });

    if (result.errors.length > 0) {
        throw new Error(`Dashboard integrity checks failed:\n${formatIntegrityErrors(result.errors)}`);
    }

    console.log(
        `Dashboard integrity checks passed: ${result.summary.visibleEntries} visible entries, ${result.summary.checkedPreviewTargets} preview targets.`
    );
}

runIntegrityChecks().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
});
