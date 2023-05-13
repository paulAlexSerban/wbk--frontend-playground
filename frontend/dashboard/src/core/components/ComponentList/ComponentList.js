import { useRef } from "react";

export default function ComponentList({ title, list, onClick }) {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {list.map((item, itemIndex) =>
                    item.variations.map((variation, variationIndex) => {
                        return (
                            <li key={variationIndex}>
                                <a
                                    href={`http://localhost:9000/${item.componentName}/${variation.slug}.html`}
                                    onClick={onClick}
                                    data-component-name={variation.name}
                                >
                                    {variation.name}
                                </a>
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
}
