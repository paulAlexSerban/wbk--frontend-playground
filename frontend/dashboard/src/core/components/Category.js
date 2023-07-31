import formatString from "@/core/utils/formatStrings";
import Component from "@/core/components/Component";
import { base } from "./category.module.scss";
export default function Category({ categoryName, categoryContent, groupName, library }) {
    return (
        <li className={base}>
            <details>
                <summary>{formatString(categoryName)}</summary>
                <ul>
                    {categoryContent.map((component, index) => (
                        <Component
                            key={index}
                            component={component}
                            groupName={groupName}
                            categoryName={categoryName}
                            library={library}
                        />
                    ))}
                </ul>
            </details>
        </li>
    );
}
