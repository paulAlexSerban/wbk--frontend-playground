import fs from "fs";
import path from "path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import attrs from "markdown-it-attrs";
import markdownItMermaid from 'markdown-it-mermaid';
import highlight from "markdown-it-highlightjs";
import GenericTemplate from "@/templates/GenericTemplate";
import ComponentContainer from "@/components/ComponentContainer";
import Script from "next/script";
import { getCmpStylesheets } from "../../library/getCmpStylesheets";

export default function ComponentPage({ frontmatter, content, cmpStyles, stylesheets }) {
  const marked = new MarkdownIt({
    html: true,
  });
  marked.use(markdownItMermaid)
  marked.use(highlight, {});

  marked.use(attrs);


  return (
    <GenericTemplate title={frontmatter.title} stylesheets={stylesheets}>
      <style jsx>{`${stylesheets[frontmatter.assets["main-css"]]}`}</style>
      {frontmatter.assets["main-js"] && <Script src={`/javascript/${frontmatter.type}/${frontmatter.assets["main-js"]}`} />}
      <ComponentContainer cmpCss={frontmatter.assets["main-css"]} cmpJs={frontmatter.assets["main-js"]}>
        <div dangerouslySetInnerHTML={{ __html: marked.render(content) }}></div>
      </ComponentContainer>
    </GenericTemplate>
  );
}

export async function getStaticPaths() {
  const components = [];

  const collectionDir = fs.readdirSync(path.join("collection"));
  collectionDir.forEach((directory) => {
    const files = fs.readdirSync(path.join("collection", directory));
    components.push({ [directory]: files });
  });
  let paths = [];
  components.map((dirname) => {
    for (let dir in dirname) {
      dirname[dir].map((file) => {
        paths.push({ params: { slug: [dir, file.replace(".md", "")] } });
      });
    }
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(path.join("collection", slug.join("/") + ".md"), "utf-8");
  const { data: frontmatter, content } = matter(markdownWithMeta);
  const cmpStyles = fs.readFileSync(path.join("public/css", frontmatter.type, frontmatter.assets["main-css"]), "utf-8");
  return {
    props: {
      frontmatter,
      cmpStyles,
      content,
      slug,
      stylesheets: getCmpStylesheets()
    },
  };
}
