import fs from "fs";
import path from "path";

export const getCmpStylesheets = () => {
    const stylesheets = {};

    const stylesheetsDirectory = fs.readdirSync(path.join("public", "css"));
    stylesheetsDirectory.forEach((directory) => {
        const cssFiles = fs.readdirSync(path.join("public", "css", directory));
        cssFiles.forEach((file) => {
            const cssRules = fs.readFileSync(path.join("public", "css", directory, file), "utf-8");
            stylesheets[file] = cssRules;
        });
    });

    return stylesheets;
};
