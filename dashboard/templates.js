const utils = require('./utils');

// Function to generate the HTML for a single component
const generateComponentHTML = (baseUrl, dir, groupName, categoryName, component) => {
    return component.variations
        .map(
            (variation) => `
                            <li>
                                <a href="${baseUrl}/${dir}/${groupName}/${categoryName}/${component.component}/${variation.slug}.html">${variation.name}</a>
                            </li>
          `
        )
        .join('');
};

// Function to generate the HTML for a category
const generateCategoryHTML = (baseUrl, dir, groupName, categoryContent) => {
    return Object.entries(categoryContent)
        .map(
            ([categoryName, components]) => `
                    <details open class='col-6'>
                        <summary><h4>${utils.capitalize(categoryName)}</h4></summary>
                        <ul>
                            ${components
                                .map((component) => {
                                    if (!component.hide) {
                                        return generateComponentHTML(baseUrl, dir, groupName, categoryName, component);
                                    }
                                })
                                .join('')}
                        </ul>
                    </details>
`
        )
        .join('');
};

// Function to generate the HTML for a group
const generateGroupHTML = (baseUrl, dir, groupContent) => {
    // // filter group content but maintain object format
    // const filteredGroupContent = Object.entries(groupContent).reduce((acc, [groupName, categories]) => {
    //     const filteredCategories = Object.entries(categories).reduce((acc, [categoryName, components]) => {
    //         const filteredComponents = components.filter((component) => !component.hide);
    //         if (filteredComponents.length) {
    //             acc[categoryName] = filteredComponents;
    //         }
    //         return acc;
    //     }, {});
    //     if (Object.keys(filteredCategories).length) {
    //         acc[groupName] = filteredCategories;
    //     }
    //     return acc;
    // }, {});

    return Object.entries(groupContent)
        .map(
            ([groupName, categories]) => `
                <details open class='col-sm-12 col-lg-6 border border-secondary'>
                    <summary><h3>${utils.capitalize(groupName)}</h3></summary>
                    <ul class='row'>
                        ${generateCategoryHTML(baseUrl, dir, groupName, categories)}
                    </ul>
                </details>
`
        )
        .join('');
};

// Function to generate the HTML for a library
const generateLibraryHTML = (library, baseUrl) => {
    // filter library content but maintain object format
    const filteredLibrary = Object.entries(library).reduce((acc, [dir, groups]) => {
        const filteredGroups = Object.entries(groups).reduce((acc, [groupName, categories]) => {
            const filteredCategories = Object.entries(categories).reduce((acc, [categoryName, components]) => {
                const filteredComponents = components.filter((component) => !component.hide);
                if (filteredComponents.length) {
                    acc[categoryName] = filteredComponents;
                }
                return acc;
            }, {});
            if (Object.keys(filteredCategories).length) {
                acc[groupName] = filteredCategories;
            }
            return acc;
        }, {});
        if (Object.keys(filteredGroups).length) {
            acc[dir] = filteredGroups;
        }
        return acc;
    }, {});
    return Object.entries(filteredLibrary)
        .map(
            ([dir, groups], idx) => `
            <section class='container'>
                <h2 class="px-2 row bg-secondary text-light">${utils.capitalize(dir)}</h2>
                <ul class="px-2 row">
                    ${generateGroupHTML(baseUrl, dir, groups)}
                </ul>
            </section>
        `
        )
        .join('');
};

const headHTML = `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Workbook | Frontend Playground</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            summary {
                display: flex;
            }
        </style>
    </head>
`;

const headerHTML = `
        <header class="row">
            <h1 class="col display-2">Workbook | Frontend Playground</h1>
        </header>
`;

const date = new Date();

const footerHTML = `
        <footer class="py-3 my-4">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="https://www.linkedin.com/in/paulalexs/" class="nav-link px-2 text-body-secondary">LinkedIn</a></li>
                <li class="nav-item"><a href="https://github.com/paulAlexSerban" class="nav-link px-2 text-body-secondary">Github</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/" class="nav-link px-2 text-body-secondary">Site</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/portfolio/" class="nav-link px-2 text-body-secondary">Portfolio</a></li>
                <li class="nav-item"><a href="https://paulserban.eu/blog/" class="nav-link px-2 text-body-secondary">Blog</a></li>
            </ul>
            <p class="text-center text-body-secondary">© ${date.getFullYear()} paulserban.eu | Generated on ${date.toLocaleString()}</p>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
            integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
            crossorigin="anonymous"
            async defer></script>
        </footer>
`;

module.exports = {
    headHTML,
    headerHTML,
    footerHTML,
    generateComponentHTML,
    generateCategoryHTML,
    generateGroupHTML,
    generateLibraryHTML,
};
