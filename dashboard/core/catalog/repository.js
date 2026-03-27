import { SOURCE_STRATEGIES } from './sourceStrategies.js';

function resolveSourceOrder(sourcePolicy, strategies) {
    if (sourcePolicy === 'packagedOnly') {
        return [strategies.packaged];
    }
    if (sourcePolicy === 'fallbackOnly') {
        return [strategies.distFallback];
    }
    return [strategies.packaged, strategies.distFallback];
}

function createCatalogRepository({ sourceDir, sourcePolicy = 'preferPackaged', strategies = SOURCE_STRATEGIES }) {
    const sourceOrder = resolveSourceOrder(sourcePolicy, strategies).filter(Boolean);

    async function getComponentLists() {
        const diagnostics = [];

        for (const source of sourceOrder) {
            try {
                const componentLists = await source.read(sourceDir);
                diagnostics.push(`Checked source: ${source.label}`);

                if (Object.keys(componentLists).length > 0) {
                    return {
                        componentLists,
                        sourceUsed: source,
                        diagnostics,
                    };
                }
            } catch (err) {
                if (err.code === 'ENOENT') {
                    diagnostics.push(`Source missing: ${source.label}`);
                    continue;
                }
                throw err;
            }
        }

        return {
            componentLists: {},
            sourceUsed: null,
            diagnostics,
        };
    }

    return {
        getComponentLists,
    };
}

export {
    resolveSourceOrder,
    createCatalogRepository,
};