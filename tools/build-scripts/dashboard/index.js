const fs = require('fs');
const path = require('path');
const source = path.join(__dirname, '../../..', 'package', 'libraries');
const dest = path.join(__dirname, '../../..', 'package', 'libraries');
const dotenv = require('dotenv');
dotenv.config();
const BASE_URL = process.env.BASE_URL;

const date = new Date();

// split string by - and capitalize each word in the string then join them back together
const capitalize = (str) => {
    return str
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const transformArrayToObj = (arr) => {
    // Create a result object instead of an array
    let result = {};

    // Iterate over the input array
    arr.forEach((item) => {
        // Find or create the group in the result object
        if (!result[item.group]) {
            result[item.group] = {};
        }

        // Find or create the category in the group
        if (!result[item.group][item.category]) {
            result[item.group][item.category] = [];
        }

        const itemObj = {
            name: item.name,
            version: item.version,
            component: item.component,
            variations: item.variations,
        };

        if (item.hide) {
            itemObj.hide = item.hide;
        }

        // Add the component to the category
        result[item.group][item.category].push(itemObj);
    });

    return result;
};

const readJsonFile = async (filePath) => {
    try {
        const jsonContent = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(jsonContent);
    } catch (err) {
        console.error('Error reading the JSON file:', err);
        return null;
    }
};

const processDirectories = async (source) => {
    const componentLists = {};
    try {
        const files = await fs.promises.readdir(source);

        for (const file of files) {
            const dirPath = path.join(source, file);
            const stats = await fs.promises.stat(dirPath);

            if (stats.isDirectory()) {
                const jsonFiles = (await fs.promises.readdir(dirPath)).filter(
                    (f) => path.extname(f).toLowerCase() === '.json'
                );

                for (const jsonFile of jsonFiles) {
                    const filePath = path.join(dirPath, jsonFile);
                    const obj = await readJsonFile(filePath);
                    if (obj) {
                        componentLists[file] = obj;
                    }
                }
            }
        }
    } catch (err) {
        console.error('Error reading the directory:', err);
    }
    return componentLists;
};

// Function to generate the HTML for a single component
const generateComponentHTML = (dir, groupName, categoryName, component) => {
    return component.variations
        .map(
            (variation) => `
                <li>
                    <a href="${BASE_URL}${dir}/${groupName}/${categoryName}/${component.component}/${variation.slug}.html">${variation.name}</a>
                </li>
            `
        )
        .join('');
};

// Function to generate the HTML for a category
const generateCategoryHTML = (dir, groupName, categoryContent) => {
    return Object.entries(categoryContent)
        .map(
            ([categoryName, components]) => `
      <details>
          <summary><h4>${capitalize(categoryName)}</h4></summary>
          <ul>
              ${components
                  .map((component) => {
                      if (!component.hide) {
                          return generateComponentHTML(dir, groupName, categoryName, component);
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
const generateGroupHTML = (dir, groupContent) => {
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
      <details>
          <summary><h3>${capitalize(groupName)}</h3></summary>
          <ul>
              ${generateCategoryHTML(dir, groupName, categories)}
          </ul>
      </details>
  `
        )
        .join('');
};

// Function to generate the HTML for a library
const generateLibraryHTML = (library) => {
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
              <section>
                  <h2>${capitalize(dir)}</h2>
                  <ul>
                      ${generateGroupHTML(dir, groups)}
                  </ul>
              </section>
          `
        )
        .join('');
};

const generateHTML = (componentLists) => {
    const transformedComponentLists = Object.entries(componentLists).map(([dir, components]) => {
        return {
            [dir]: transformArrayToObj(components),
        };
    });

    fs.promises.writeFile(`${dest}/index.json`, JSON.stringify(transformedComponentLists, null, 2));

    const headHTML = `
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>JavaScript Component Library</title>
          <!-- Bootstrap CSS -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
              rel="stylesheet">
          <style>
            summary {
              display: flex;
            }
          </style>
        </head>
      `;
    const headerHTML = `
      <header class="row">
        <h1 class="col display-2">JavaScript Component Library</h1>
      </header>
    `;

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
    const libraryHTML = transformedComponentLists.map(generateLibraryHTML).join('');

    let htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
          ${headHTML}
          <body class="container">
              ${headerHTML}
                <main>
                ${libraryHTML}
                </main>
              ${footerHTML}
          </body
      </html>
    `;

    return htmlTemplate;
};

const init = async () => {
    try {
        const componentLists = await processDirectories(source);
        const htmlContent = generateHTML(componentLists);

        await fs.promises.writeFile(`${dest}/index.html`, htmlContent);
        console.log('index.html has been generated!');
    } catch (err) {
        console.error('Error:', err);
    }
};

init();
