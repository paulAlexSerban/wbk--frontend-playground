import React from "react";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import getAllSlugs from "@/utils/getAllSlugs";
const readFile = promisify(fs.readFile);
import formatString from "@/core/utils/formatStrings";
import Head from 'next/head';

export default function ComponentPage({ slug, htmlContent, styles, scripts, componentName}) {
    return (
        <div>
            <Head>
                <title>{componentName}</title>
                <style>{styles}</style>
                <script async defer dangerouslySetInnerHTML={{ __html: scripts }} />
            </Head>

            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            <div className="Makrup">
            <h2>Markup</h2>
            <pre>
            {htmlContent}
            </pre>
            </div>


        </div>
    );
}

export async function getStaticPaths() {
    const paths = getAllSlugs();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    const slug = params.slug;
    const component = params.slug.split(".")[1].split("--")[0];
    const componentName = formatString(component.replace(/(a.)|(m.)|(o.)|(t.)/, ""));
    const cmpSlug = slug.replace(/(a.)|(m.)|(o.)|(t.)/, "");
    const filePath = path.resolve("..", "component-library", "dist", component, `${cmpSlug}.html`);
    const stylesPath = path.resolve("..", "component-library", "dist", component, `style.css`);
    const scriptsPath = path.resolve("..", "component-library", "dist", component, `script.js`);
    const htmlContent = await readFile(filePath, "utf-8");
    const styles = await readFile(stylesPath, "utf-8");
    const scripts = await readFile(scriptsPath, "utf-8");

    return {
        props: {
            slug,
            htmlContent,
            styles,
            scripts,
            componentName
        },
    };
}
