import GenericTemplate from "@/templates/GenericTemplate";
import { getCollection } from "../library/collection";
import { getCmpStylesheets } from "../library/getCmpStylesheets";
import Link from "next/link";

export default function Home({ collection, stylesheets }) {
  return (
    <GenericTemplate stylesheets={stylesheets}>
      <div className="pat-link-list__base">
        <ul className="cmp-list-unordered__base">
          {collection.map((post, index) => {
            const cmpHref = `collection/${post.directory}/${post.slug}`;
            const cmpName = post.frontmatter.title;

            return (
              <li className="cmp-list-unordered__item" key={index}>
                <Link href={cmpHref}>
                  <a className="cmp-link__base">{cmpName}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </GenericTemplate>
  );
}

export async function getStaticProps({}) {
  return {
    props: {
      collection: getCollection(),
      stylesheets: getCmpStylesheets()
    },
  };
}
