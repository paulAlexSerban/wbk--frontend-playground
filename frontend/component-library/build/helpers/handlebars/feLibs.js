const process = require("process");
const { env } = process;

module.exports = function (group, category, name, variation, type) {
    const path = `${env.BASE_URL}${
        env.BASE_URL.length !== 0 ? "/component-library" : ""
    }/${group}/${category}/${name}/${variation}`;

    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" async defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css"><script src="${path}.js" async defer></script>`,
    };

    return feLibs[type];
};
