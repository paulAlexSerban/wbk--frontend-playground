import paths from "@/core/commons/paths";
import { base } from "./variation.module.scss";
export default function Variation({ variation, groupName, categoryName, componentName, library }) {
    let basePath = "";
    if (library === "generic") {
        basePath = paths.userComponentLibraryUrl;
    } else if (library === "frontend-mentor") {
        basePath = paths.userFrontendMentorLibrary;
    }
    return (
        <li className={base}>
            <a
                href={`${basePath}/${groupName}/${categoryName}/${componentName}/${variation.slug}.html`}
                alt={variation.description}
            >
                {variation.name}
            </a>
        </li>
    );
}
