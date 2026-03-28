function isNonEmptyString(value) {
    return typeof value === 'string' && value.trim().length > 0;
}

function validateCatalogStructure(componentLists) {
    const errors = [];

    if (!componentLists || typeof componentLists !== 'object' || Array.isArray(componentLists)) {
        errors.push('Component list source must be an object keyed by library directory.');
        return { errors };
    }

    for (const [libraryName, components] of Object.entries(componentLists)) {
        if (!Array.isArray(components)) {
            errors.push(`[${libraryName}] must contain an array of components`);
            continue;
        }

        components.forEach((component, componentIndex) => {
            const pointer = `${libraryName}[${componentIndex}]`;

            if (!component || typeof component !== 'object' || Array.isArray(component)) {
                errors.push(`${pointer}: component must be an object`);
                return;
            }

            if (!isNonEmptyString(component.group)) {
                errors.push(`${pointer}.group is required and must be a non-empty string`);
            }
            if (!isNonEmptyString(component.category)) {
                errors.push(`${pointer}.category is required and must be a non-empty string`);
            }
            if (!isNonEmptyString(component.component)) {
                errors.push(`${pointer}.component is required and must be a non-empty string`);
            }
            if (!Array.isArray(component.variations)) {
                errors.push(`${pointer}.variations must be an array`);
            }
        });
    }

    return { errors };
}

export { validateCatalogStructure };
