import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="description" content="Free Web tutorials" />
                <meta name="keywords" content="HTML, CSS, JavaScript" />
                <meta name="author" content="John Doe" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
