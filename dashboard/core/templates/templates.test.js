import test from 'node:test';
import assert from 'node:assert/strict';

import { generateLibraryHTML } from './libraryTemplate.js';

function createVariation(overrides = {}) {
    return {
        slug: 'basic',
        name: 'Basic',
        description: 'Basic variation',
        hide: false,
        images: [],
        ...overrides,
    };
}

function createComponent(overrides = {}) {
    return {
        group: 'library',
        category: 'components',
        component: 'button',
        version: '1.0.0',
        hide: false,
        variations: [createVariation()],
        ...overrides,
    };
}

test('generateLibraryHTML filters hidden components at library/group/category levels', () => {
    const library = {
        'demo-library': {
            library: {
                components: [
                    createComponent({ component: 'visible-button' }),
                    createComponent({ component: 'hidden-button', hide: true }),
                ],
            },
        },
    };

    const html = generateLibraryHTML(library, 'http://localhost:3000');

    assert.match(html, /visible-button/);
    assert.doesNotMatch(html, /hidden-button/);
});

test('generateLibraryHTML output escapes unsafe category and variation values', () => {
    const library = {
        'demo-library': {
            library: {
                '<unsafe-category>': [
                    createComponent({
                        category: '<unsafe-category>',
                        variations: [
                            createVariation({
                                name: '<img src=x onerror=alert(1)>',
                                description: 'desc & more',
                            }),
                        ],
                    }),
                ],
            },
        },
    };

    const html = generateLibraryHTML(library, 'http://localhost:3000');

    assert.match(html, /&lt;unsafe-category&gt;/);
    assert.match(html, /&lt;img src=x onerror=alert\(1\)&gt;/);
    assert.match(html, /desc &amp; more/);
    assert.doesNotMatch(html, /<img src=x onerror=alert\(1\)>/);
});

test('generateLibraryHTML includes lazy image loading attributes', () => {
    const library = {
        'demo-library': {
            library: {
                components: [
                    createComponent({
                        variations: [
                            createVariation({
                                images: [{ filename: 'hero', alt: 'Hero image', caption: 'caption' }],
                            }),
                        ],
                    }),
                ],
            },
        },
    };

    const html = generateLibraryHTML(library, 'http://localhost:3000');

    assert.match(html, /loading="lazy"/);
    assert.match(html, /decoding="async"/);
});
