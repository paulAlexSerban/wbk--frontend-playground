const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, '../../..', 'package', 'libraries');
const dest = path.join(__dirname, '../../..', 'package', 'libraries');
const dotenv = require('dotenv');
dotenv.config();
const BASE_URL = process.env.BASE_URL;
const templates = require('./templates');
const utils = require('./utils');

const generateHTML = (componentLists) => {
    const transformedComponentLists = Object.entries(componentLists).map(([dir, components]) => {
        return {
            [dir]: utils.transformArrayToObj(components),
        };
    });

    fs.promises.writeFile(`${dest}/index.json`, JSON.stringify(transformedComponentLists, null, 2));

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
          </body
      </html>
    `;

    return htmlTemplate;
};

const init = async () => {
    try {
        const componentLists = await utils.processDirectories(source);
        const htmlContent = generateHTML(componentLists);

        await fs.promises.writeFile(`${dest}/index.html`, htmlContent);
        console.log('index.html has been generated!');
    } catch (err) {
        console.error('Error:', err);
    }
};

init();
