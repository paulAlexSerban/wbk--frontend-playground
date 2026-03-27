// Main entry for generating dashboard index.html and index.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import { buildHtmlDocument } from './htmlBuilder.js';
import { loadComponentData } from './dataLoader.js';

import { generateLibraryHTML } from './templates/libraryTemplate.js';
import { generateSidebarHTML } from './templates/sidebarTemplate.js';
import { generateModalHTML } from './templates/modalTemplate.js';
import { headHTML, headerHTML, footerHTML, topNavbarHTML } from './htmlPartials.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

const source = path.join(__dirname, '..', '..', 'package', 'wbk--frontend-playground', 'libraries');
const destination = path.join(__dirname, '..', '..', 'package', 'wbk--frontend-playground', 'libraries');

async function generateIndex() {
    console.log('Generating dashboard index...');
    try {
        await fs.promises.mkdir(destination, { recursive: true });
        const transformedComponentLists = await loadComponentData(source);
        if (transformedComponentLists.length === 0) {
            throw new Error(
                'No component data found. Build libraries first or ensure componentList.json exists in package/libraries or libraries/*/dist.'
            );
        }
        await fs.promises.writeFile(
            path.join(destination, 'index.json'),
            JSON.stringify(transformedComponentLists, null, 2)
        );
        console.log('index.json has been generated!');
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

export default generateIndex;
