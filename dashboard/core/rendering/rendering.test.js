import test from 'node:test';
import assert from 'node:assert/strict';

import { escapeHtml, escapeAttribute } from './html.js';
import { buildPreviewUrl, buildImageUrl, buildCardId } from './paths.js';

test('escapeHtml and escapeAttribute encode unsafe characters', () => {
    const raw = `<script>alert('x')</script> & "test"`;
    const escaped = '&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt; &amp; &quot;test&quot;';

    assert.equal(escapeHtml(raw), escaped);
    assert.equal(escapeAttribute(raw), escaped);
});

test('buildPreviewUrl encodes path segments', () => {
    const url = buildPreviewUrl('http://localhost:3000/', 'dev lib', 'library', 'ui parts', 'button', 'primary state');
    assert.equal(url, 'http://localhost:3000/wbk--frontend-forge/ui%20parts/button/primary%20state.html');
});

test('buildImageUrl and buildCardId are deterministic', () => {
    assert.equal(
        buildImageUrl('http://localhost:3000/', 'hero-banner', '960_720'),
        'http://localhost:3000/assets/images/hero-banner-960_720.webp'
    );

    assert.equal(
        buildCardId('Dev Library', 'System', 'UI Parts', 'Fancy/Button', 2),
        'dev-library-system-ui-parts-fancy-button-2'
    );
});
