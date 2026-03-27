import fs from 'fs';
import path from 'path';

async function readComponentList(filePath) {
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

async function readPackaged(sourceDir) {
    const entries = await fs.promises.readdir(sourceDir, { withFileTypes: true });
    const directories = entries.filter((entry) => entry.isDirectory());
    const componentLists = {};

    await Promise.all(
        directories.map(async (entry) => {
            const filePath = path.join(sourceDir, entry.name, 'componentList.json');
            const componentList = await readComponentList(filePath);
            if (componentList) {
                componentLists[entry.name] = componentList;
            }
        })
    );

    return componentLists;
}

async function readDistFallback(sourceDir) {
    const projectRoot = path.resolve(sourceDir, '..', '..');
    const librariesDir = path.join(projectRoot, 'libraries');
    const entries = await fs.promises.readdir(librariesDir, { withFileTypes: true });
    const directories = entries.filter((entry) => entry.isDirectory());
    const componentLists = {};

    await Promise.all(
        directories.map(async (entry) => {
            const filePath = path.join(librariesDir, entry.name, 'dist', 'componentList.json');
            const componentList = await readComponentList(filePath);
            if (componentList) {
                componentLists[entry.name] = componentList;
            }
        })
    );

    return componentLists;
}

const SOURCE_STRATEGIES = {
    packaged: {
        name: 'packaged',
        label: 'package/wbk--frontend-playground/libraries/*/componentList.json',
        read: readPackaged,
    },
    distFallback: {
        name: 'distFallback',
        label: 'libraries/*/dist/componentList.json',
        read: readDistFallback,
    },
};

export {
    SOURCE_STRATEGIES,
};