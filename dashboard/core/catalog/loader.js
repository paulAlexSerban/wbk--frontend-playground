import { createCatalogRepository } from './repository.js';
import { validateCatalogStructure } from './validator.js';
import { normalizeCatalog, groupByCategory } from './normalizer.js';

async function loadCatalog({
    sourceDir,
    sourcePolicy = 'preferPackaged',
    repositoryFactory = createCatalogRepository,
}) {
    const repository = repositoryFactory({ sourceDir, sourcePolicy });
    const { componentLists, sourceUsed, diagnostics } = await repository.getComponentLists();

    const { errors } = validateCatalogStructure(componentLists);
    if (errors.length > 0) {
        const message = errors.map((error) => `- ${error}`).join('\n');
        throw new Error(`Invalid component metadata detected:\n${message}`);
    }

    const { normalized, warnings, stats } = normalizeCatalog(componentLists);

    const groupedLibraries = Object.entries(normalized).map(([libraryName, components]) => ({
        [libraryName]: groupByCategory(components),
    }));

    return {
        groupedLibraries,
        warnings,
        stats,
        sourceUsed,
        diagnostics,
    };
}

export { loadCatalog };
