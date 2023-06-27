import formatString from "@/core/utils/formatStrings";

const envName = process.env.ENV_NAME;
console.log("env_namepv", process.env.ENV_NAME)
const baseUrl = {
    development: "https://component-library.localhost",
    gh_pages: `${process.env.BASE_URL}/component-library`
}


function Variation({ variation, groupName, categoryName, componentName }) {
  return (
      <li>
          <a
              href={`${baseUrl[envName]}/${groupName}/${categoryName}/${componentName}/${variation.slug}.html`}
              alt={variation.description}
          >
              {variation.name}
          </a>
      </li>
  );
}

function Component({ component, groupName, categoryName }) {
  return (
      <li>
          <details>
              <summary>{formatString(component.component)} {component.version !== '1.0.0' && <small>(v{component.version})</small>}</summary>
              <ul>
                  {component.variations.map((variation, index) => (
                      <Variation
                          key={index}
                          variation={variation}
                          groupName={groupName}
                          categoryName={categoryName}
                          componentName={component.component}
                      />
                  ))}
              </ul>
          </details>
      </li>
  );
}

function Category({ categoryName, categoryContent, groupName }) {
  return (
      <li>
          <details open>
              <summary>{formatString(categoryName)}</summary>
              <ul>
                  {categoryContent.map((component, index) => (
                      <Component
                          key={index}
                          component={component}
                          groupName={groupName}
                          categoryName={categoryName}
                      />
                  ))}
              </ul>
          </details>
      </li>
  );
}

function Group({ groupName, groupContent }) {
  return (
      <li>
              <h2>{formatString(groupName)}</h2>
              <ul>
              {Object.entries(groupContent).map(([categoryName, categoryContent], index) => (
                  <Category
                      key={index}
                      categoryName={categoryName}
                      categoryContent={categoryContent}
                      groupName={groupName}
                  />
              ))}
              </ul>
      </li>
  );
}

export default function Index({ data }) {
  return (
      <main className="index">
          <ul>
              {Object.entries(data).map(([groupName, groupContent], index) => (
                  <Group key={index} groupName={groupName} groupContent={groupContent} />
              ))}
          </ul>
      </main>
  );
}



export async function getStaticProps({}) {
    const fetchFile = async (url) => {
        try {
            const response = await fetch(url);

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // If you're fetching a JSON file, you can convert the response to JSON like so
            const data = await response.json();

            return data;
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    };

    const gh_pagesComponentList = `${baseUrl[envName]}/componentList.json`

    const componentListRaw = await fetchFile(gh_pagesComponentList);

    function transformArray(arr) {
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
  
          // Add the component to the category
          result[item.group][item.category].push({
              component: item.component,
              variations: item.variations,
              version: item.version,
          });
      });
  
      return result;
  }
  

    const componentList = transformArray(componentListRaw);

    return {
        props: {
            data: componentList,
        },
    };
}
