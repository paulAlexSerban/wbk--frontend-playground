import test from 'node:test';
import assert from 'node:assert/strict';

import { createCatalogRepository, resolveSourceOrder } from './repository.js';

test('resolveSourceOrder returns preferred packaged-first strategy by default', () => {
    const strategies = {
        packaged: { name: 'packaged' },
        distFallback: { name: 'distFallback' },
    };

    const order = resolveSourceOrder('preferPackaged', strategies).map((entry) => entry.name);
    assert.deepEqual(order, ['packaged', 'distFallback']);
});

test('repository returns packaged source when available', async () => {
    const strategies = {
        packaged: {
            name: 'packaged',
            label: 'packaged',
            read: async () => ({
                libA: [{ group: 'library', category: 'components', component: 'x', variations: [] }],
            }),
        },
        distFallback: {
            name: 'distFallback',
            label: 'dist',
            read: async () => ({
                libB: [{ group: 'library', category: 'components', component: 'y', variations: [] }],
            }),
        },
    };

    const repository = createCatalogRepository({ sourceDir: '/tmp/mock', strategies });
    const result = await repository.getComponentLists();

    assert.equal(result.sourceUsed?.name, 'packaged');
    assert.ok(result.componentLists.libA);
});

test('repository falls back when packaged source is empty', async () => {
    const strategies = {
        packaged: {
            name: 'packaged',
            label: 'packaged',
            read: async () => ({}),
        },
        distFallback: {
            name: 'distFallback',
            label: 'dist',
            read: async () => ({
                libB: [{ group: 'library', category: 'components', component: 'y', variations: [] }],
            }),
        },
    };

    const repository = createCatalogRepository({ sourceDir: '/tmp/mock', strategies });
    const result = await repository.getComponentLists();

    assert.equal(result.sourceUsed?.name, 'distFallback');
    assert.ok(result.componentLists.libB);
});

test('repository packagedOnly policy does not call fallback strategy', async () => {
    let fallbackCalled = false;
    const strategies = {
        packaged: {
            name: 'packaged',
            label: 'packaged',
            read: async () => ({}),
        },
        distFallback: {
            name: 'distFallback',
            label: 'dist',
            read: async () => {
                fallbackCalled = true;
                return {};
            },
        },
    };

    const repository = createCatalogRepository({ sourceDir: '/tmp/mock', sourcePolicy: 'packagedOnly', strategies });
    const result = await repository.getComponentLists();

    assert.equal(result.sourceUsed, null);
    assert.equal(fallbackCalled, false);
});
