import getAllSlugs from "@/utils/getAllSlugs";
import formatString from "@/core/utils/formatStrings";

function ComponentList({ title, list }) {
    return (
      <>
        <h2>{title}</h2>
        <ul>
          {list.map((item) => (
            <li key={item.slug}>
              <a href={`/components/${item.slug}`}>{item.formattedName}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }

export default function Index({ componentList }) {
    return (
        <main>
        <h1>Component Library</h1>
        <ComponentList title="Atoms" list={componentList.atoms} />
        <ComponentList title="Molecules" list={componentList.molecules} />
        <ComponentList title="Organisms" list={componentList.organisms} />
        <ComponentList title="Templates" list={componentList.templates} />
      </main>
    );
}

export async function getStaticProps({}) {
    return {
        props: {
            componentList: getComponentList(),
        },
    };
}

const getComponentList = () => {
    const slugs = getAllSlugs();
    const componentList = { atoms: [], molecules: [], organisms: [], templates: [] };
    slugs.forEach((item) => {
        if (item.params.slug.includes("a.")) {
            const { slug } = item.params;
            componentList.atoms.push({
                slug: slug,
                cmpName: slug.replace("a.", ""),
                formattedName: formatString(slug.replace("a.", "")),
            });
        }
        if (item.params.slug.includes("m.")) {
            const { slug } = item.params;
            componentList.molecules.push({
                slug: slug,
                cmpName: slug.replace("m.", ""),
                formattedName: formatString(slug.replace("m.", "")),
            });
        }
        if (item.params.slug.includes("o.")) {
            const { slug } = item.params;
            componentList.organisms.push({
                slug: slug,
                cmpName: slug.replace("o.", ""),
                formattedName: formatString(slug.replace("o.", "")),
            });
        }
        if (item.params.slug.includes("t.")) {
            const { slug } = item.params;
            componentList.templates.push({
                slug: slug,
                cmpName: slug.replace("t.", ""),
                formattedName: formatString(slug.replace("t.", "")),
            });
        }
    });
    return componentList;
};
