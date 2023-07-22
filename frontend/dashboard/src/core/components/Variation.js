import paths from "@/core/commons/paths";

export default function Variation({ variation, groupName, categoryName, componentName }) {
    return (
        <li>
            <a href={`${paths.userComponentLibraryUrl}/${groupName}/${categoryName}/${componentName}/${variation.slug}.html`}
               alt={variation.description}>
                {variation.name}
            </a>
        </li>
    );
}
