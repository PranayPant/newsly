import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta
                    name="description"
                    content="Get all your news stories here. Updated every 10 minutes, top headlines in the US."
                />
                <meta name="keywords" content="news, headlines, stories, us" />
                <meta name="author" content="Pranay Pant" />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
