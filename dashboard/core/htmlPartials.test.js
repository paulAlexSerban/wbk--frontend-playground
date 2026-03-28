import test from 'node:test';
import assert from 'node:assert/strict';

import { buildFooterHTML, buildTopNavbarHTML } from './htmlPartials.js';
import { escapeInlineScriptContent, createInlineScriptTag } from './rendering/html.js';

test('escapeInlineScriptContent neutralizes closing script tags in embedded content', () => {
    const script = "console.log('ok');\n</script>\nconsole.log('still in script');";
    const escaped = escapeInlineScriptContent(script);

    assert.equal(escaped.includes('</script>'), false);
    assert.equal(escaped.includes('<\\/script>'), true);
});

test('createInlineScriptTag wraps sanitized script content', () => {
    const tag = createInlineScriptTag("const x = '</script>'; ");

    assert.match(tag, /^<script>[\s\S]*<\\\/script>[\s\S]*<\/script>$/);
    assert.equal(tag.includes('</script></script>'), false);
});

test('buildFooterHTML includes provided date and inline script', () => {
    const mockDate = new Date('2026-03-27T12:00:00.000Z');
    const footer = buildFooterHTML(mockDate, "console.log('footer-script');");

    assert.match(footer, /2026/);
    assert.match(footer, /footer-script/);
    assert.match(footer, /<script>/);
});

test('buildTopNavbarHTML includes phase 4 filter controls', () => {
    const navbar = buildTopNavbarHTML();

    assert.match(navbar, /id="sidebarToggle"/);
    assert.match(navbar, /id="searchInput"/);
    assert.match(navbar, /id="libraryFilter"/);
    assert.match(navbar, /id="sortSelect"/);
    assert.match(navbar, /id="resetFilters"/);
});
