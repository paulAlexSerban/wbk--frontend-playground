// Main entry for generating dashboard index.html and index.json
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const { buildHtmlDocument } = require('./htmlBuilder');
const { loadComponentData } = require('./dataLoader');

const { generateLibraryHTML } = require('./templates/libraryTemplate');
const { generateSidebarHTML } = require('./templates/sidebarTemplate');
const { generateModalHTML } = require('./templates/modalTemplate');
const { headHTML, headerHTML, footerHTML, topNavbarHTML } = require('./htmlPartials');

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const source = path.join(__dirname, '..', '..', 'package', 'libraries');
const destination = path.join(__dirname, '..', '..', 'package', 'libraries');

async function generateIndex() {
    try {
        const transformedComponentLists = await loadComponentData(source);
        await fs.promises.writeFile(
            path.join(destination, 'index.json'),
            JSON.stringify(transformedComponentLists, null, 2)
        );
        const libraryHTML = transformedComponentLists.map((library) => generateLibraryHTML(library, BASE_URL)).join('');
        const htmlContent = buildHtmlDocument({
            head: headHTML,
            topNavbar: topNavbarHTML,
            header: headerHTML,
            sidebar: generateSidebarHTML(),
            cards: libraryHTML,
            modal: generateModalHTML,
            footer: footerHTML,
        });
        await fs.promises.writeFile(path.join(destination, 'index.html'), htmlContent);
        // console.log('index.html has been generated!');
    } catch (err) {
        console.error('Error:', err);
    }
}

module.exports = generateIndex;
