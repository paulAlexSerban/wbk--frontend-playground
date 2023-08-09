import paths from "@/core/commons/paths";
import { base } from "./variation.module.scss";
export default function Variation({ variation, groupName, categoryName, componentName, library }) {
    let basePath = "";
    if (library === "generic") {
        basePath = paths.userComponentLibraryUrl;
    } else if (library === "frontend-mentor") {
        basePath = paths.userFrontendMentorLibrary;
    } else if (library === "big-frontend") {
        basePath = paths.userBigFrontendLibrary;
    } else if (library === "dev-days-matrix") {
        basePath = paths.userDevDaysMatrix;
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
