const process = require("process");

module.exports = function (group, category, name, variation, type) {
    const path = `${process.env.BASE_URL}${
        process.env.BASE_URL.length !== 0 ? "/component-library" : ""
    }/${group}/${category}/${name}/${variation}`;

    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" async defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css"><script src="${path}.js" async defer></script>`,
    };

    return feLibs[type];
};
