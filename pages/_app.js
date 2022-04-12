import '../styles/globals.css'
import Script from 'next/script'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { trackPageView } from '@lib/ga'

function MyApp({ Component, pageProps }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            trackPageView(url)
        }
        router.events.on('routeChangeComplete', handleRouteChange)
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>

            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
