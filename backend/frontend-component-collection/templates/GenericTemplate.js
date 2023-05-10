import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function GenericTemplate({
    title,
    keywords,
    description,
    children,
    ogTitle,
    ogType,
    ogUrl,
    ogImage,
    stylesheets,
}) {
    return (
        <div>
            <Head>
                <meta charSet="utf-8" />
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <meta name="keywords" content={keywords} />
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

                <meta property="og:title" content={title} />
                <meta property="og:type" content="openGraph component title" />
                <meta property="og:url" content="openGraph page url" />
                <meta property="og:image" content="openGraph component screenshot image" />
            </Head>

            <Header pageHeader={title} styles={stylesheets["header.mod.css"]} />

            <main className="mod-main__base row">{children}</main>

            <Footer />
        </div>
    );
}

GenericTemplate.defaultProps = {
    title: "Frontend Component Library",
    keywords: "frontend, component, library",
    description: "A collection of built components ready to be integrated and customized in any project.",
};
