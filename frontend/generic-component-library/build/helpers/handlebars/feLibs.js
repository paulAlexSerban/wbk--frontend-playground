const process = require('process');
const { env } = process;
const projectName = require('../../../package.json').name.split('/')[1];
const { NODE_ENV } = env;
module.exports = function (group, category, name, variation, type) {
    const path = `${env.BASE_URL}${NODE_ENV === 'development' ? '' : projectName + '/'}${group}/${category}/${name}${
        variation !== '' ? '/' + variation : ''
    }`;

    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css">
             <script src="${path}.js" defer></script>`,
    };

    return feLibs[type];
};
