// groupTemplate.js
// Generates HTML for a group and its categories
import { generateCategoryHTML } from './categoryTemplate.js';
import utils from '../../utils/index.js';

/**
 * Generate HTML for a group and its categories.
 * @param {string} baseUrl
 * @param {string} dir
 * @param {object} groupContent
 * @returns {string}
 */
function generateGroupHTML(baseUrl, dir, groupContent) {
    return Object.entries(groupContent)
        .map(
            ([groupName, categories]) => `
                ${generateCategoryHTML(baseUrl, dir, groupName, categories)}
            `
        )
        .join('');
}

export {
    generateGroupHTML,
};
