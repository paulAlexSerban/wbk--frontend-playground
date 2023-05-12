import getComponentLibrary from "@/utils/getComponentLibrary";
import formatString from "@/core/utils/formatStrings";

function ComponentList({ title, list }) {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {list.map((item, index) =>
                    item.variations.map((variation, index) => (
                        <li key={index}>
                            <a href={`http://localhost:9000/${item.componentName}/${variation.slug}.html`}>
                                {formatString(variation.name)}
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}

export default function Index({ atoms, molecules, organisms, templates }) {
    return (
        <main>
            <h1>Component Library</h1>
            {atoms.length && <ComponentList title="Atoms" list={atoms} />}
            {molecules.length && <ComponentList title="Molecules" list={molecules} />}
            {organisms.length && <ComponentList title="Organisms" list={organisms} />}
            {templates.length && <ComponentList title="Templates" list={templates} />}
            <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="1200"
                height="900"
                src="http://localhost:9000/button/button--primary.html"
            ></iframe>
        </main>
    );
}

export async function getStaticProps({}) {
    const getAtoms = getComponentLibrary().atoms.map((item) => item);
    const getMolecules = getComponentLibrary().molecules.map((item) => item);
    const getOrganisms = getComponentLibrary().organisms.map((item) => item);
    const getTemplates = getComponentLibrary().templates.map((item) => item);

    return {
        props: {
            atoms: getAtoms,
            molecules: getMolecules,
            organisms: getOrganisms,
            templates: getTemplates,
        },
    };
}
