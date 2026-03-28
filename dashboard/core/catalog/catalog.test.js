import test from 'node:test';
import assert from 'node:assert/strict';

import { validateCatalogStructure } from './validator.js';
import { normalizeCatalog, groupByCategory } from './normalizer.js';

test('validateCatalogStructure reports missing required fields', () => {
    const input = {
        libraryA: [
            {
                category: 'components',
                component: 'button',
                variations: [],
            },
        ],
    };

    const { errors } = validateCatalogStructure(input);
    assert.ok(errors.some((error) => error.includes('.group is required')));
});

test('normalizeCatalog hides component with empty valid variations', () => {
    const input = {
        libraryA: [
            {
                group: 'library',
                category: 'components',
                component: 'button',
                variations: [{ slug: '', name: 'Broken variation' }],
            },
        ],
    };

    const { normalized, warnings } = normalizeCatalog(input);
    assert.equal(normalized.libraryA[0].hide, true);
    assert.ok(warnings.some((warning) => warning.includes('component will be hidden')));
});

test('groupByCategory groups by group and category', () => {
    const components = [
        {
            group: 'library',
            category: 'components',
            component: 'button',
            variations: [{ slug: 'a', name: 'A', hide: false, images: [] }],
        },
        {
            group: 'library',
            category: 'components',
            component: 'card',
            variations: [{ slug: 'b', name: 'B', hide: false, images: [] }],
        },
    ];

    const grouped = groupByCategory(components);
    assert.equal(grouped.library.components.length, 2);
});
