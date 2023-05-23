const ListItem = ({ item, itemIndex, onClick }) => {
    const singleVariation = item.variations.length === 1;
    const anchorProps = (variation) => ({
        href: `http://localhost:9000/${item.componentSlug}/${variation.slug}.html`,
        onClick,
        'data-component-name': variation.name,
    });

    return (
        <li key={itemIndex}>
            {singleVariation ? (
                <a {...anchorProps(item.variations[0])}>{item.componentName}</a>
            ) : (
                <details>
                    <summary>{item.componentName}</summary>
                    <ul>
                        {item.variations.map((variation, variationIndex) => (
                            <li key={variationIndex}>
                                <a {...anchorProps(variation)}>{variation.name}</a>
                            </li>
                        ))}
                    </ul>
                </details>
            )}
        </li>
    );
};

export default function ComponentList({ title, list, onClick }) {
    return (
        <>
            <h2>{title}</h2>
            <ul>
                {list.map((item, itemIndex) => (
                    <ListItem key={itemIndex} item={item} onClick={onClick} />
                ))}
            </ul>
        </>
    );
}
