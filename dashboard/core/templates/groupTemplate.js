// groupTemplate.js
// Generates HTML for a group and its categories
const { generateCategoryHTML } = require('./categoryTemplate');
const utils = require('../../utils');

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
                <div>
                    <h3>${utils.capitalize(groupName)}</h3>
                        ${generateCategoryHTML(baseUrl, dir, groupName, categories)}
                </div>
            `
        )
        .join('');
}

module.exports = {
    generateGroupHTML,
};
