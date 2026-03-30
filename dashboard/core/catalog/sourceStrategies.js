import fs from 'fs';
import path from 'path';

function isObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}

async function readManifest(filePath) {
    try {
        const content = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        }
        throw err;
    }
}

async function collectManifestPaths(rootDir) {
    const entries = await fs.promises.readdir(rootDir, { withFileTypes: true });
    const manifestPaths = [];

    for (const entry of entries) {
        if (entry.name.startsWith('.')) {
            continue;
        }

        const absolutePath = path.join(rootDir, entry.name);
        if (entry.isDirectory()) {
            const nestedPaths = await collectManifestPaths(absolutePath);
            manifestPaths.push(...nestedPaths);
            continue;
        }

        if (entry.isFile() && entry.name === 'manifest.json') {
            manifestPaths.push(absolutePath);
        }
    }

    return manifestPaths;
}

function toComponentEntry({ manifest, category, slug }) {
    const safeManifest = isObject(manifest) ? manifest : {};
    const name = String(safeManifest.name || slug).trim();
    const description = String(safeManifest.description || 'No description available').trim();

    return {
        group: 'projects',
        category,
        component: slug,
        name,
        version: '1.0.0',
        description,
        hide: false,
        tags: Array.isArray(safeManifest.tags) ? safeManifest.tags : [],
        concepts: Array.isArray(safeManifest.concepts) ? safeManifest.concepts : [],
        source: safeManifest.source,
        sourceUrl: safeManifest.sourceUrl,
        variations: [
            {
                slug: 'index',
                name,
                description,
                hide: false,
                images: [],
            },
        ],
    };
}

async function buildManifestCatalog(projectsRootDir) {
    const manifestPaths = await collectManifestPaths(projectsRootDir);
    const componentLists = {};

    for (const manifestPath of manifestPaths) {
        const relativeDir = path.relative(projectsRootDir, path.dirname(manifestPath));
        const segments = relativeDir.split(path.sep).filter(Boolean);
        if (segments.length < 2) {
            continue;
        }

        const [category, slug] = segments;
        if (category.startsWith('_')) {
            continue;
        }

        const manifest = await readManifest(manifestPath);
        if (!manifest) {
            continue;
        }

        const projectKey = `${category}__${slug}`;
        componentLists[projectKey] = [toComponentEntry({ manifest, category, slug })];
    }

    return componentLists;
}

async function readPackagedProjects(sourceDir) {
    return buildManifestCatalog(sourceDir);
}

async function readWorkspaceProjectsFallback(sourceDir) {
    const projectRoot = path.resolve(sourceDir, '..', '..', '..');
    const workspaceProjectsDir = path.join(projectRoot, 'projects');

    return buildManifestCatalog(workspaceProjectsDir);
}

const SOURCE_STRATEGIES = {
    packaged: {
        name: 'packaged',
        label: 'package/<repo>/projects/**/manifest.json',
        read: readPackagedProjects,
    },
    distFallback: {
        name: 'distFallback',
        label: 'projects/**/manifest.json',
        read: readWorkspaceProjectsFallback,
    },
};

export { SOURCE_STRATEGIES };
