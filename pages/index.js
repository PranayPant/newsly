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
                    name="description"
                    content="Get all your news stories here. Updated every 30 minutes, top headlines in the US."
                />
                <meta
                    property="og:image"
                    content="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLEMiDWtfT3tgMfKhM37oJg9vthWl3dkmI8Q&usqp=CAU"
                />
                <title>Newsly: The News Hub</title>
                <link rel="canonical" href="https://newsapp.cf" />
            </Head>
            <header className="flex justify-center text-center sm:text-6xl text-4xl p-10">
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
    let finalArticles = []
    try {
        finalArticles = await persistArticles(articles)
    } catch (err) {
        console.log('Error inserting articles:', err.response.data)
    }
    return {
        props: {
            articles: finalArticles,
        },
        // revalidate every 30 min
        revalidate: 1800,
    }
}
