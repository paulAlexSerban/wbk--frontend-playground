const process = require('process');
const manifest = require('../../../manifest.json');

const NODE_ENV = process.env.NODE_ENV || 'development';

const getPath = () => {
    const projectName = manifest.name && manifest.name.toLowerCase()
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

