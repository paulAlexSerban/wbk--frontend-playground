module.exports = function (type) {
    const feLibs = {
        css: `<link rel="stylesheet" href="styles.css">`,
        js: `<script src="scripts.js" defer></script>`,
        all: `<link rel="stylesheet" href="styles.css">
             <script src="scripts.js" defer></script>`,
    };

    console.log('\n');
    feLibs[type].split('\n').forEach((line) => {
        console.log('[ handlebars - INFO ]: injecting FE library:', line.trim());
    });
    return feLibs[type];
};
