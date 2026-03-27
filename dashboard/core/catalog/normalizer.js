function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function toSafeString(value, fallback = '') {
    if (typeof value === 'string') {
        return value.trim();
    }
    if (value === undefined || value === null) {
        return fallback;
    }
    return String(value).trim();
}

function normalizeVariation(variation, pointer, warnings) {
    if (!variation || typeof variation !== 'object' || Array.isArray(variation)) {
        warnings.push(`${pointer}: variation ignored because it is not an object`);
        return null;
    }

    const slug = toSafeString(variation.slug);
    const name = toSafeString(variation.name);

    if (!isNonEmptyString(slug)) {
        warnings.push(`${pointer}.slug is missing; variation ignored`);
    }
    if (!isNonEmptyString(name)) {
        warnings.push(`${pointer}.name is missing; variation ignored`);
    }
    if (!isNonEmptyString(slug) || !isNonEmptyString(name)) {
        return null;
    }

    const images = Array.isArray(variation.images)
        ? variation.images
              .filter((image) => image && typeof image === 'object' && !Array.isArray(image))
              .map((image, imageIndex) => ({
                  filename: toSafeString(image.filename),
                  alt: toSafeString(image.alt, name || slug || `image-${imageIndex + 1}`),
                  caption: toSafeString(image.caption),
              }))
        : [];

    return {
        ...variation,
        slug,
        name,
        description: toSafeString(variation.description, 'No description available'),
        hide: Boolean(variation.hide),
        images,
    };
}

function normalizeComponent(component, pointer, warnings) {
    const group = toSafeString(component.group);
    const category = toSafeString(component.category);
    const componentSlug = toSafeString(component.component);
    const name = toSafeString(component.name, componentSlug);

    const variations = component.variations
        .map((variation, variationIndex) =>
            normalizeVariation(variation, `${pointer}.variations[${variationIndex}]`, warnings)
        )
        .filter(Boolean);

    if (variations.length === 0) {
        warnings.push(`${pointer}.variations has no valid entries; component will be hidden`);
    }

    return {
        ...component,
        group,
        category,
        component: componentSlug,
        name,
        version: toSafeString(component.version, '1.0.0'),
        description: toSafeString(component.description, 'No description available'),
        hide: Boolean(component.hide) || variations.length === 0,
        variations,
    };
}

function normalizeCatalog(componentLists) {
    const warnings = [];

    const normalized = Object.entries(componentLists).reduce((acc, [libraryName, components]) => {
        const normalizedComponents = components.map((component, componentIndex) =>
            normalizeComponent(component, `${libraryName}[${componentIndex}]`, warnings)
        );

        if (normalizedComponents.length > 0) {
            acc[libraryName] = normalizedComponents;
        }
        return acc;
    }, {});

    const stats = {
        libraryCount: Object.keys(normalized).length,
        componentCount: Object.values(normalized).reduce((count, components) => count + components.length, 0),
    };

    return {
        normalized,
        warnings,
        stats,
    };
}

function groupByCategory(components) {
    return components.reduce((acc, component) => {
        const { group, category } = component;
        if (!acc[group]) acc[group] = {};
        if (!acc[group][category]) acc[group][category] = [];
        acc[group][category].push(component);
        return acc;
    }, {});
}

export {
    normalizeCatalog,
    groupByCategory,
};