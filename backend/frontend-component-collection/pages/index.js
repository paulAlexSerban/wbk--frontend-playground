import GenericTemplate from "@/templates/GenericTemplate";
import { getCollection } from "../library/collection";
import { getCmpStylesheets } from "../library/getCmpStylesheets";
import Link from "next/link";

export default function Home({ collection, stylesheets }) {
  return (
    <GenericTemplate stylesheets={stylesheets}>
      <div className="layout-ram">
        {Object.keys(collection).map((dir, dirIndex) => {
          return (
            <div className="pat-link-list__base">
            <h3>{dir}</h3>
              <ul className="cmp-list-unordered__base" key={dirIndex}>

                {collection[dir].map((post, postIndex) => {
                  const cmpHref = `collection/${post.directory}/${post.slug}`;
                  const cmpName = post.frontmatter.title;
                  return (
                    <li className="cmp-list-unordered__item" key={postIndex}>
                      <Link href={cmpHref}>
                        <a className="cmp-link__base">{cmpName}</a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </GenericTemplate>
  );
}

export async function getStaticProps({}) {
  return {
    props: {
      collection: getCollection(),
      stylesheets: getCmpStylesheets(),
    },
  };
}
