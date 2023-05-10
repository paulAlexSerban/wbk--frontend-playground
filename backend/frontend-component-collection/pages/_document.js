import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/svgs/hammer.svg" type="image/svg+xml" />
                    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />

                    <link rel="stylesheet" href="/css/page/base.page.layer.css" />
                    <link rel="stylesheet" href="/css/template/generic.template.layer.css" />

                    <meta name="theme-color" content="#fafafa" />

                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Mohave:wght@400;700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="container">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
