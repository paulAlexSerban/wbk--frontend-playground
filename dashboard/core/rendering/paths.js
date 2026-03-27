function sanitizeIdSegment(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function joinUrl(baseUrl, ...segments) {
    const normalizedBase = String(baseUrl ?? '').replace(/\/+$/, '');
    const pathPart = segments.map((segment) => encodeURIComponent(String(segment ?? ''))).join('/');
    return `${normalizedBase}/${pathPart}`;
}

function buildPreviewUrl(baseUrl, dir, groupName, categoryName, componentSlug, variationSlug) {
    return `${joinUrl(
        baseUrl,
        'wbk--frontend-playground',
        'libraries',
        dir,
        groupName,
        categoryName,
        componentSlug,
        variationSlug
    )}.html`;
}

function buildImageUrl(baseUrl, filename, size) {
    const safeName = String(filename || 'default-background');
    return joinUrl(baseUrl, 'assets', 'images', `${safeName}-${size}.webp`);
}

function buildCardId(dir, groupName, categoryName, componentSlug, index) {
    return [dir, groupName, categoryName, componentSlug, index]
        .map((value) => sanitizeIdSegment(value))
        .join('-');
}

export {
    buildPreviewUrl,
    buildImageUrl,
    buildCardId,
};