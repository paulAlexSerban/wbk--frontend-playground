const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const templates = require('./templates');
const utils = require('./utils');

const source = path.join(__dirname, '..', 'package', 'libraries');
const destination = path.join(__dirname, '..', 'package', 'libraries');

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const generateHTML = (componentLists) => {
    const transformedComponentLists = Object.entries(componentLists).map(([dir, components]) => {
        return {
            [dir]: utils.transformArrayToObj(components),
        };
    });

    fs.promises.writeFile(`${destination}/index.json`, JSON.stringify(transformedComponentLists, null, 2));

    const libraryHTML = transformedComponentLists
        .map((library) => templates.generateLibraryHTML(library, BASE_URL))
        .join('');

    let htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
    ${templates.headHTML}
    <body class="container">
        ${templates.headerHTML}
        <main>
        ${libraryHTML}
        </main>
        ${templates.footerHTML}
    </body>
</html>
    `;

    return htmlTemplate;
};

const init = async () => {
    try {
        const componentLists = await utils.processDirectories(source);
        const htmlContent = generateHTML(componentLists);

        await fs.promises.writeFile(`${destination}/index.html`, htmlContent);
        // console.log('index.html has been generated!');
    } catch (err) {
        console.error('Error:', err);
    }
};

init();
