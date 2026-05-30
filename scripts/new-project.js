#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');
const TEMPLATES_DIR = path.join(PROJECTS_DIR, '_project-templates');

const EXCLUDED_DIRS = new Set(['node_modules', 'dist', '.git']);
const EXCLUDED_FILES = new Set(['.DS_Store']);

function printUsage() {
    console.log(`Usage:
  node scripts/new-project.js --name "My Project" --category interactions --template handlebars-template

Options:
  --name, -n         Human readable project name (required)
  --category, -c     Target category under /projects (required)
  --template, -t     Template folder inside /projects/_project-templates (required)
  --slug, -s         Target folder slug (optional, defaults from --name)
  --description, -d  Manifest description (optional)
  --source           Manifest source label (optional, default: Frontend Forge)
  --source-url       Manifest source URL (optional, default: http://localhost:3000)
  --dry-run          Print actions without writing files
  --help, -h         Show this help
`);
}

function parseArgs(argv) {
    const args = {
        name: '',
        category: '',
        template: '',
        slug: '',
        description: '',
        source: 'Frontend Forge',
        sourceUrl: 'http://localhost:3000',
        dryRun: false,
        help: false,
    };

    for (let i = 2; i < argv.length; i += 1) {
        const token = argv[i];

        if (token === '--help' || token === '-h') {
            args.help = true;
            continue;
        }

        if (token === '--dry-run') {
            args.dryRun = true;
            continue;
        }

        const next = argv[i + 1];
        if (!next || next.startsWith('-')) {
            throw new Error(`Missing value for ${token}`);
        }

        switch (token) {
            case '--name':
            case '-n':
                args.name = next.trim();
                i += 1;
                break;
            case '--category':
            case '-c':
                args.category = next.trim();
                i += 1;
                break;
            case '--template':
            case '-t':
                args.template = next.trim();
                i += 1;
                break;
            case '--slug':
            case '-s':
                args.slug = next.trim();
                i += 1;
                break;
            case '--description':
            case '-d':
                args.description = next.trim();
                i += 1;
                break;
            case '--source':
                args.source = next.trim();
                i += 1;
                break;
            case '--source-url':
                args.sourceUrl = next.trim();
                i += 1;
                break;
            default:
                throw new Error(`Unknown argument: ${token}`);
        }
    }

    return args;
}

function toSlug(input) {
    return input
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function isInternalCategory(category) {
    return category.startsWith('_');
}

async function pathExists(targetPath) {
    try {
        await fs.access(targetPath);
        return true;
    } catch {
        return false;
    }
}

async function copyTemplateDir(srcDir, destDir, dryRun) {
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    if (!dryRun) {
        await fs.mkdir(destDir, { recursive: true });
    }

    for (const entry of entries) {
        if (entry.isDirectory() && EXCLUDED_DIRS.has(entry.name)) {
            continue;
        }

        if (entry.isFile() && EXCLUDED_FILES.has(entry.name)) {
            continue;
        }

        const sourcePath = path.join(srcDir, entry.name);
        const destinationPath = path.join(destDir, entry.name);

        if (entry.isDirectory()) {
            await copyTemplateDir(sourcePath, destinationPath, dryRun);
            continue;
        }

        if (entry.isFile()) {
            if (dryRun) {
                continue;
            }
            await fs.copyFile(sourcePath, destinationPath);
        }
    }
}

async function patchPackageJson(projectDir, category, slug, dryRun) {
    const packageJsonPath = path.join(projectDir, 'package.json');
    if (!(await pathExists(packageJsonPath))) {
        return;
    }

    const raw = await fs.readFile(packageJsonPath, 'utf8');
    const data = JSON.parse(raw);
    data.name = `@wbk--frontend-forge/${category}__${slug}`;

    if (!dryRun) {
        await fs.writeFile(packageJsonPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    }
}

async function patchManifestJson(projectDir, inputs, slug, dryRun) {
    const manifestPath = path.join(projectDir, 'manifest.json');
    if (!(await pathExists(manifestPath))) {
        return;
    }

    const raw = await fs.readFile(manifestPath, 'utf8');
    const data = JSON.parse(raw);

    data.name = inputs.name;
    data.category = inputs.category;
    data.source = inputs.source;
    data.sourceUrl = inputs.sourceUrl;
    if (inputs.description) {
        data.description = inputs.description;
    }

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
        data.tags = [slug];
    }

    if (!dryRun) {
        await fs.writeFile(manifestPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    }
}

async function listTemplates() {
    const entries = await fs.readdir(TEMPLATES_DIR, { withFileTypes: true });
    return entries
        .filter((entry) => entry.isDirectory())
        .map((entry) => entry.name)
        .sort();
}

async function main() {
    let args;
    try {
        args = parseArgs(process.argv);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        printUsage();
        process.exit(1);
    }

    if (args.help) {
        printUsage();
        process.exit(0);
    }

    if (!args.name || !args.category || !args.template) {
        console.error('Error: --name, --category, and --template are required.');
        printUsage();
        process.exit(1);
    }

    if (isInternalCategory(args.category)) {
        console.error('Error: target category cannot start with "_".');
        process.exit(1);
    }

    const templateDir = path.join(TEMPLATES_DIR, args.template);
    const categoryDir = path.join(PROJECTS_DIR, args.category);
    const slug = args.slug ? toSlug(args.slug) : toSlug(args.name);

    if (!slug) {
        console.error('Error: computed slug is empty. Provide a valid --name or --slug.');
        process.exit(1);
    }

    if (!(await pathExists(templateDir))) {
        const templates = await listTemplates();
        console.error(`Error: template "${args.template}" does not exist.`);
        console.error(`Available templates: ${templates.join(', ') || '(none found)'}`);
        process.exit(1);
    }

    if (!(await pathExists(categoryDir))) {
        console.error(`Error: category "${args.category}" does not exist under /projects.`);
        process.exit(1);
    }

    const destinationDir = path.join(categoryDir, slug);
    if (await pathExists(destinationDir)) {
        console.error(`Error: destination already exists: ${destinationDir}`);
        process.exit(1);
    }

    console.log(`Template:     ${args.template}`);
    console.log(`Category:     ${args.category}`);
    console.log(`Project name: ${args.name}`);
    console.log(`Slug:         ${slug}`);
    console.log(`Target:       ${destinationDir}`);
    if (args.dryRun) {
        console.log('Mode:         dry-run (no files written)');
    }

    await copyTemplateDir(templateDir, destinationDir, args.dryRun);
    await patchPackageJson(destinationDir, args.category, slug, args.dryRun);
    await patchManifestJson(destinationDir, args, slug, args.dryRun);

    console.log(args.dryRun ? 'Dry run completed.' : 'Project created successfully.');
}

main().catch((error) => {
    console.error(`Unhandled error: ${error.message}`);
    process.exit(1);
});
