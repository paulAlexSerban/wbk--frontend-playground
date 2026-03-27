import test from 'node:test';
import assert from 'node:assert/strict';

import { buildHtmlDocument } from './htmlBuilder.js';

test('buildHtmlDocument includes summary and empty-state containers', () => {
    const html = buildHtmlDocument({
        head: '<head></head>',
        sidebar: '<nav></nav>',
        topNavbar: '<nav></nav>',
        cards: '<div class="item-card"></div>',
        footer: '<footer></footer>',
    });

    assert.match(html, /id="resultsSummary"/);
    assert.match(html, /id="activeFilters"/);
    assert.match(html, /id="emptyState"/);
    assert.match(html, /id="cardContainer"/);
});
