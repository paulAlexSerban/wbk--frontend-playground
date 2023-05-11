import path from "path";
import fs from "fs";

export default function getAllSlugs() {
    const filenames = [];
    const categoriesPaths = path.resolve("..", "component-library", "src");
    const categories = fs.readdirSync(categoriesPaths);

    for (const category of categories) {
        const components = fs.readdirSync(path.resolve(categoriesPaths, category));
        for (const component of components) {
            const componentVariations = fs.readdirSync(path.resolve(categoriesPaths, category, component, "markup"));
            for (const variant of componentVariations) {
                const cleanedVariant = variant.replace(".entry.hbs", "");
                filenames.push({
                    params: {
                        slug: `${category[0]}.${cleanedVariant}`,
                        component
                    },
                });
            }
        }
    }

    return filenames;
}
