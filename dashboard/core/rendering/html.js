function escapeHtml(value) {
    const raw = value === undefined || value === null ? '' : String(value);
    return raw
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function escapeAttribute(value) {
    return escapeHtml(value);
}

function escapeInlineScriptContent(value) {
    const raw = value === undefined || value === null ? '' : String(value);
    // Prevent early script tag termination when embedding raw JS in HTML.
    return raw.replace(/<\/script/gi, '<\\/script');
}

function createInlineScriptTag(scriptContent) {
    return `<script>${escapeInlineScriptContent(scriptContent)}</script>`;
}

export {
    escapeHtml,
    escapeAttribute,
    escapeInlineScriptContent,
    createInlineScriptTag,
};