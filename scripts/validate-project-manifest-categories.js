#!/usr/bin/env node

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, out = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath, out);
      continue;
    }

    out.push(fullPath);
  }

  return out;
}

async function getValidCategories() {
  const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => !name.startsWith('_'))
    .sort();
}

function asPosix(filePath) {
  return filePath.split(path.sep).join('/');
}

function getTopCategoryFromManifestPath(manifestPath) {
  const relative = path.relative(PROJECTS_DIR, manifestPath);
  const [category] = relative.split(path.sep);
  return category;
}

async function main() {
  if (!(await pathExists(PROJECTS_DIR))) {
    console.error('Error: projects directory does not exist.');
    process.exit(1);
  }

  const validCategories = await getValidCategories();
  const validSet = new Set(validCategories);

  const allFiles = await walk(PROJECTS_DIR);
  const manifestFiles = allFiles
    .filter((filePath) => filePath.endsWith('manifest.json'))
    .filter((filePath) => !asPosix(filePath).includes('/dist/'))
    .filter((filePath) => !asPosix(filePath).includes('/_project-templates/'))
    .sort();

  const errors = [];

  for (const manifestPath of manifestFiles) {
    let manifest;

    try {
      const raw = await fs.readFile(manifestPath, 'utf8');
      manifest = JSON.parse(raw);
    } catch (error) {
      errors.push(`${asPosix(path.relative(ROOT_DIR, manifestPath))}: invalid JSON (${error.message})`);
      continue;
    }

    const manifestCategory = manifest.category;
    const folderCategory = getTopCategoryFromManifestPath(manifestPath);
    const relPath = asPosix(path.relative(ROOT_DIR, manifestPath));

    if (typeof manifestCategory !== 'string' || manifestCategory.trim() === '') {
      errors.push(`${relPath}: missing or empty manifest.category`);
      continue;
    }

    if (!validSet.has(manifestCategory)) {
      errors.push(
        `${relPath}: manifest.category "${manifestCategory}" does not match an existing /projects category`
      );
    }

    if (manifestCategory !== folderCategory) {
      errors.push(
        `${relPath}: manifest.category "${manifestCategory}" does not match folder category "${folderCategory}"`
      );
    }
  }

  if (errors.length > 0) {
    console.error('Project manifest category validation failed.');
    console.error('');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Project manifest category validation passed. Checked ${manifestFiles.length} manifests.`);
  console.log(`Valid categories: ${validCategories.join(', ')}`);
}

main().catch((error) => {
  console.error(`Unhandled error: ${error.message}`);
  process.exit(1);
});
