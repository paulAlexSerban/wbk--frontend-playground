module.exports = function (group, category, name, variation, type) {

        let path = `/${group}/${category}/${name}/${variation}`;


    const feLibs = {
        css: `<link rel="stylesheet" href="${path}.css">`,
        js: `<script src="${path}.js" async defer></script>`,
        all: `<link rel="stylesheet" href="${path}.css"><script src="${path}.js" async defer></script>`,
    };

    return feLibs[type];
};
