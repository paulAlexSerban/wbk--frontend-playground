const fs = require('fs');
const { resolveFromCwd } = require('../../internal/paths');

const DEFAULT_ENTRY_PATHS = {
    scripts: 'src/scripts.js',
    styles: 'src/styles.scss',
};

function normalizeEntryMap(entry) {
    if (!entry || typeof entry !== 'object') {
        return DEFAULT_ENTRY_PATHS;
    }

    return {
        ...DEFAULT_ENTRY_PATHS,
        ...entry,
    };
}

function resolveEntry(options = {}) {
    const cwd = options.cwd || process.cwd();
    const entryResolver = options.entryResolver;

    if (typeof entryResolver === 'function') {
        return entryResolver(cwd);
    }

    const mappedEntries = normalizeEntryMap(options.entry);
    const entries = {};

    Object.entries(mappedEntries).forEach(([entryName, entryPath]) => {
        const absolutePath = resolveFromCwd(cwd, entryPath);
        if (absolutePath && fs.existsSync(absolutePath)) {
            entries[entryName] = absolutePath;
            return;
        }
        console.warn(`Warning: ${entryPath} file not found. Skipping ${entryName} entry point.`);
    });

    return entries;
}

module.exports = {
    resolveEntry,
    DEFAULT_ENTRY_PATHS,
};
