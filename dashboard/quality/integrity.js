import fs from 'fs';
import path from 'path';

import { buildCardId, buildPreviewUrl } from '../core/rendering/paths.js';

function getCatalogSegment() {
    return process.env.DASHBOARD_CATALOG_SEGMENT || 'projects';
}

function collectVisibleEntries(catalog, baseUrl) {
    const entries = [];

    catalog.forEach((libraryEntry) => {
        Object.entries(libraryEntry).forEach(([dir, groups]) => {
            Object.entries(groups).forEach(([groupName, categories]) => {
                Object.entries(categories).forEach(([categoryName, components]) => {
                    if (!Array.isArray(components)) {
                        return;
                    }

                    components
                        .filter((component) => !component.hide)
                        .forEach((component) => {
                            (component.variations || [])
                                .filter((variation) => !variation.hide)
                                .forEach((variation, index) => {
                                    const cardId = buildCardId(
                                        dir,
                                        groupName,
                                        categoryName,
                                        component.component,
                                        index
                                    );

                                    entries.push({
                                        dir,
                                        groupName,
                                        categoryName,
                                        componentSlug: component.component,
                                        variationSlug: variation.slug,
                                        cardId,
                                        previewUrl: buildPreviewUrl(
                                            baseUrl,
                                            dir,
                                            groupName,
                                            categoryName,
                                            component.component,
                                            variation.slug
                                        ),
                                    });
                                });
                        });
                });
            });
        });
    });

    return entries;
}

function countMatches(value, pattern) {
    return [...value.matchAll(pattern)].length;
}

function findDuplicateValues(values) {
    const counts = new Map();

    values.forEach((value) => {
        counts.set(value, (counts.get(value) || 0) + 1);
    });

    return Array.from(counts.entries())
        .filter(([, count]) => count > 1)
        .map(([value, count]) => ({ value, count }));
}

function buildPreviewRootPrefix() {
    return '../../../';
}

function toPathname(value) {
    const raw = String(value || '').trim();
    if (!raw) {
        return '';
    }

    if (raw.startsWith('http://') || raw.startsWith('https://')) {
        try {
            return new URL(raw).pathname || '';
        } catch {
            return '';
        }
    }

    return raw;
}

function normalizeRelativeAssetPath(assetPath, entry) {
    const normalized = toPathname(assetPath);
    const catalogSegment = getCatalogSegment();

    if (!normalized || normalized.startsWith('//')) {
        return null;
    }

    if (normalized.startsWith('data:') || normalized.startsWith('#')) {
        return null;
    }

    if (normalized.startsWith('/')) {
        if (catalogSegment === 'libraries') {
            const libraryPrefix = `/libraries/${entry.dir}/`;
            const libraryPrefixIndex = normalized.indexOf(libraryPrefix);
            if (libraryPrefixIndex >= 0) {
                return normalized.slice(libraryPrefixIndex + libraryPrefix.length);
            }
            return null;
        }

        const projectPrefix = `/${catalogSegment}/${entry.categoryName}/${entry.componentSlug}/`;
        const projectPrefixIndex = normalized.indexOf(projectPrefix);
        if (projectPrefixIndex >= 0) {
            return normalized.slice(projectPrefixIndex + projectPrefix.length);
        }

        return null;
    }

    if (!normalized.startsWith('../')) {
        return normalized;
    }

    const previewRoot = buildPreviewRootPrefix();
    return normalized.startsWith(previewRoot) ? normalized.slice(previewRoot.length) : normalized;
}

function collectAssetReferences(previewHtml) {
    const stylesheetMatches = [...previewHtml.matchAll(/<link[^>]+rel=['"]stylesheet['"][^>]+href=['"]([^'"]+)['"]/gi)];
    const scriptMatches = [...previewHtml.matchAll(/<script[^>]+src=['"]([^'"]+)['"]/gi)];

    return Array.from(new Set([...stylesheetMatches, ...scriptMatches].map((match) => match[1]).filter(Boolean)));
}

function buildPreviewFilePath(destinationDir, entry) {
    const catalogSegment = getCatalogSegment();

    if (catalogSegment === 'libraries') {
        return path.join(
            destinationDir,
            entry.dir,
            entry.groupName,
            entry.categoryName,
            entry.componentSlug,
            `${entry.variationSlug}.html`
        );
    }

    return path.join(
        destinationDir,
        entry.categoryName,
        entry.componentSlug,
        `${entry.variationSlug}.html`
    );
}

async function verifyGeneratedArtifacts({ catalog, htmlContent, baseUrl, destinationDir }) {
    const errors = [];
    const visibleEntries = collectVisibleEntries(catalog, baseUrl);

    if (visibleEntries.length === 0) {
        errors.push('Generated catalog has no visible component variations.');
    }

    const requiredMarkers = ['id="categorySidebar"', 'id="cardContainer"', 'id="resultsSummary"', 'id="emptyState"'];
    requiredMarkers.forEach((marker) => {
        if (!htmlContent.includes(marker)) {
            errors.push(`Generated HTML is missing required marker ${marker}.`);
        }
    });

    const htmlCardCount = countMatches(htmlContent, /class="[^"]*\bitem-card\b[^"]*"/g);
    if (htmlCardCount !== visibleEntries.length) {
        errors.push(
            `Generated HTML contains ${htmlCardCount} visible cards, but index.json describes ${visibleEntries.length} visible variations.`
        );
    }

    const duplicateSlugKeys = findDuplicateValues(
        visibleEntries.map((entry) =>
            [entry.dir, entry.groupName, entry.categoryName, entry.componentSlug, entry.variationSlug].join('::')
        )
    );
    duplicateSlugKeys.forEach(({ value, count }) => {
        errors.push(`Duplicate visible variation slug detected (${count}x): ${value}`);
    });

    const htmlIds = [...htmlContent.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
    findDuplicateValues(htmlIds).forEach(({ value, count }) => {
        errors.push(`Duplicate generated HTML id detected (${count}x): ${value}`);
    });

    for (const entry of visibleEntries) {
        const previewPath = buildPreviewFilePath(destinationDir, entry);
        if (!htmlContent.includes(entry.previewUrl)) {
            errors.push(`Generated HTML is missing preview link: ${entry.previewUrl}`);
        }

        try {
            await fs.promises.access(previewPath, fs.constants.F_OK);
            const previewHtml = await fs.promises.readFile(previewPath, 'utf-8');
            const assetReferences = collectAssetReferences(previewHtml);

            for (const assetReference of assetReferences) {
                const relativeAssetPath = normalizeRelativeAssetPath(assetReference, entry);
                if (!relativeAssetPath) {
                    continue;
                }

                const resolvedAssetPath = path.resolve(path.dirname(previewPath), relativeAssetPath);
                try {
                    await fs.promises.access(resolvedAssetPath, fs.constants.F_OK);
                } catch {
                    errors.push(`Broken preview asset: ${previewPath} -> ${assetReference}`);
                }
            }
        } catch {
            errors.push(`Broken preview target: ${previewPath}`);
        }
    }

    return {
        errors,
        summary: {
            visibleEntries: visibleEntries.length,
            htmlCardCount,
            checkedPreviewTargets: visibleEntries.length,
        },
    };
}

function formatIntegrityErrors(errors) {
    return errors.map((error) => `- ${error}`).join('\n');
}

export { collectVisibleEntries, verifyGeneratedArtifacts, formatIntegrityErrors };
