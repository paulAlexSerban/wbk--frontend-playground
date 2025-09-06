// componentTemplate.js
// Generates HTML for a single component's variations

/**
 * Generate HTML for a single component's variations.
 * @param {string} baseUrl
 * @param {string} dir
 * @param {string} groupName
 * @param {string} categoryName
 * @param {object} component
 * @returns {string}
 */
function generateComponentHTML(baseUrl, dir, groupName, categoryName, component) {
    return component.variations
        .map(
            (variation) => `
                <div class="col-md-4 mb-4 item-card" data-category="${categoryName}">
                    <div class="card shadow-sm h-100" onclick="openDetail('${variation.name}','${variation.description}', '${baseUrl}/${dir}/${groupName}/${categoryName}/${component.component}/${variation.slug}.html')">
                        <div class="card-body">
                            <h5 class="card-title">${variation.name}</h5>
                            <p class="card-text">${variation.description}</p>
                        </div>
                    </div>
                </div>
            `
        )
        .join('');
}

module.exports = {
    generateComponentHTML,
};
