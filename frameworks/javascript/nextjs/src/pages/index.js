import Head from 'next/head';
export default function Home() {
    return (
        <>
            <Head>
                <title>Frontend Playground</title>
                <meta name="description" content="Frontend Playground: Multi-SSG Framework Showcase" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>Frontend Playground</h1>

                <div>
                    <h2>System</h2>
                    <div>
                        <h3>Templates</h3>
                        <ul>
                            <li>
                                <a href="/system/templates/generic-base">Generic Base Template</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
