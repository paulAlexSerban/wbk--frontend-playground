// dataLoader.js
// Handles loading and transforming component data for the dashboard

import { loadCatalog } from './catalog/loader.js';

/**
 * Loads and transforms all project metadata from the source directory.
 * @param {string} sourceDir - Absolute path to the packaged repository directory
 * @returns {Promise<Array<Object>>} Array of transformed component lists by directory
 */
async function loadComponentData(sourceDir) {
    const { groupedLibraries, warnings, stats, sourceUsed, diagnostics } = await loadCatalog({
        sourceDir,
        sourcePolicy: 'preferPackaged',
    });

    if (sourceUsed?.name === 'packaged') {
        console.log(`Dashboard data source: ${sourceUsed.label}`);
    } else if (sourceUsed?.name === 'distFallback') {
        console.warn(`Dashboard data source fallback in use: ${sourceUsed.label} (packaged projects source missing).`);
    } else {
        diagnostics.forEach((entry) => console.warn(entry));
    }

    if (warnings.length > 0) {
        const warningPreview = warnings
            .slice(0, 10)
            .map((warning) => `- ${warning}`)
            .join('\n');
        const overflow = warnings.length > 10 ? `\n- ...and ${warnings.length - 10} more warning(s)` : '';
        console.warn(`Metadata warnings (${warnings.length}):\n${warningPreview}${overflow}`);
    }

    console.log(`Metadata summary: ${stats.libraryCount} project bundles, ${stats.componentCount} components`);

    return groupedLibraries;
}

export { loadComponentData };
