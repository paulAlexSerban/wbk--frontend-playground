import test from 'node:test';
import assert from 'node:assert/strict';

import { generateSidebarHTML } from './sidebarTemplate.js';

test('generateSidebarHTML contains dynamic category list and mobile close control', () => {
    const html = generateSidebarHTML();

    assert.match(html, /id="categorySidebar"/);
    assert.match(html, /id="categoryFilterList"/);
    assert.match(html, /id="sidebarClose"/);
    assert.match(html, /data-filter-category="all"/);
});
