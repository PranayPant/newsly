import PropTypes from 'prop-types'
import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { pageview } from '@lib/ga'
import headlinesApi from '@queries/headlines'
import Card from '@components/Card'

export default function Home({ data: { articles } }) {
    const router = useRouter()
    useEffect(() => {
        const handleRouteChange = (url) => {
            pageview(url)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)

        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])

    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Newsly: The News Hub</title>
            </Head>
            <header className="flex justify-center text-center sm:text-9xl text-6xl p-10">
                <h1>Newsly: The News Hub</h1>
            </header>
            <main className="flex flex-wrap justify-evenly">
                {articles.map((article) => (
                    <Card
                        key={`${article.author}${article.title}`}
                        article={article}
                    />
                ))}
            </main>
        </div>
    )
}

Home.propTypes = {
    articles: PropTypes.arrayOf(Card.propTypes.article).isRequired,
}

export async function getStaticProps() {
    const { articles } = await fetchHeadlines()
    try {
        await persistArticles(articles)
    } catch (err) {
        console.log('Error inserting articles:', err.response.data)
    }
    return {
        props: {
            articles,
        },
        // revalidate every 30 min
        revalidate: 1800,
    }
}
