import fs from 'fs';
import path from 'path';

function pickRepositoryDirectory(packageEntries) {
    const configuredDirectory = process.env.DASHBOARD_PACKAGE_REPOSITORY_DIR;
    if (configuredDirectory) {
        return configuredDirectory;
    }

    const directories = packageEntries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort((a, b) => a.localeCompare(b));

    return directories[0] || null;
}

async function resolveDashboardCatalogPaths({ projectRoot }) {
    const packageRoot = path.join(projectRoot, 'package');
    const packageEntries = await fs.promises.readdir(packageRoot, { withFileTypes: true });
    const repositoryDirectory = pickRepositoryDirectory(packageEntries);

    if (!repositoryDirectory) {
        throw new Error(`Unable to resolve packaged repository directory in ${packageRoot}`);
    }

    const sourceDir = path.join(packageRoot, repositoryDirectory);
    const destinationDir = sourceDir;

    return {
        repositoryDirectory,
        sourceDir,
        destinationDir,
        repositorySegment: process.env.DASHBOARD_REPOSITORY_SEGMENT || repositoryDirectory,
    };
}

export { resolveDashboardCatalogPaths };
