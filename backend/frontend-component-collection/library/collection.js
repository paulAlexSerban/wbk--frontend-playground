import fs from "fs";
import path from "path";
import matter from "gray-matter";

const components = [];

const collectionDir = fs.readdirSync(path.join("collection"));
collectionDir.forEach((directory) => {
    const files = fs.readdirSync(path.join("collection", directory));
    components.push({ [directory]: files });
});

export const getCollection = () => {
    const collection = {};
    components.map((dirname) => {
        for (let dir in dirname) {
            collection[dir] = [];

            dirname[dir].map((file) => {
                const slug = file.replace(".md", "");
                const markdownWithMeta = fs.readFileSync(path.join("collection", dir, file), "utf-8");
                const { data: frontmatter } = matter(markdownWithMeta);
                collection[dir].push({
                    directory: dir,
                    slug,
                    frontmatter,
                });
            });
        }
    });
    return collection;
};
