import test from 'node:test';
import assert from 'node:assert/strict';

import { loadCatalog } from './loader.js';

test('loadCatalog throws when catalog structure is invalid', async () => {
    const repositoryFactory = () => ({
        getComponentLists: async () => ({
            componentLists: { libA: [{ category: 'components', component: 'button', variations: [] }] },
            sourceUsed: { name: 'packaged', label: 'packaged' },
            diagnostics: [],
        }),
    });

    await assert.rejects(
        () => loadCatalog({ sourceDir: '/tmp/mock', repositoryFactory }),
        /Invalid component metadata detected/
    );
});

test('loadCatalog returns grouped libraries and warnings', async () => {
    const repositoryFactory = () => ({
        getComponentLists: async () => ({
            componentLists: {
                libA: [
                    {
                        group: 'library',
                        category: 'components',
                        component: 'button',
                        variations: [{ slug: 'basic', name: 'Basic Button' }],
                    },
                    {
                        group: 'library',
                        category: 'components',
                        component: 'broken',
                        variations: [],
                    },
                ],
            },
            sourceUsed: { name: 'packaged', label: 'packaged' },
            diagnostics: ['Checked source: packaged'],
        }),
    });

    const result = await loadCatalog({ sourceDir: '/tmp/mock', repositoryFactory });

    assert.equal(result.groupedLibraries.length, 1);
    assert.ok(result.groupedLibraries[0].libA.library.components);
    assert.equal(result.stats.libraryCount, 1);
    assert.equal(result.stats.componentCount, 2);
    assert.ok(result.warnings.length > 0);
});
