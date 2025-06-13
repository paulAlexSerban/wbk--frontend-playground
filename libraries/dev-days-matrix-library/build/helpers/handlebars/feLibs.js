const process = require('process');
const projectName = require('../../../package.json').name;

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = function (group, category, name, variation, type) {
    const path =
        NODE_ENV === 'development'
            ? `/${group}/${category}/${name}/${variation}`
            : `${BASE_URL}/${projectName}/${group}/${category}/${name}/${variation}`;
    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css">
             <script src="${path}.js" defer></script>`,
    };

    return feLibs[type];
};
