const process = require('process');
const manifest = require('../../../manifest.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

function slugify(text) {
  return text
    .toString()                     // Ensure it's a string
    .toLowerCase()                  // Convert to lowercase
    .trim()                         // Remove leading/trailing whitespace
    .normalize('NFD')               // Decompose combined graphemes (e.g., separating "é" into "e" and "´")
    .replace(/[\u0300-\u036f]/g, '') // Remove the accent marks
    .replace(/[^a-z0-9 -]/g, '')    // Remove any character that isn't a letter, number, or space/hyphen
    .replace(/\s+/g, '-')           // Replace spaces with a single hyphen
    .replace(/-+/g, '-');           // Replace multiple hyphens with a single hyphen
}

const getPath = () => {
    const projectName = manifest.name && slugify(manifest.name)
    return NODE_ENV === 'production' && projectName ? `${projectName}/` : '';
};

module.exports = function (type) {
    const feLibs = {
        css: `<link rel="stylesheet" href="${getPath()}styles.css">`,
        js: `<script src="${getPath()}scripts.js" defer></script>`,
        all: `<link rel="stylesheet" href="${getPath()}styles.css">
             <script src="${getPath()}scripts.js" defer></script>`,
    };

    console.log('\n');
    feLibs[type].split('\n').forEach((line) => {
        console.log('[ handlebars - INFO ]: injecting FE library:', line.trim());
    });
    return feLibs[type];
};

