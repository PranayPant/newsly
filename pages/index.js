import PropTypes from 'prop-types'
import Head from 'next/head'

import { fetchHeadlines, persistArticles } from '@queries/headlines'
import Card from '@components/Card'

export default function Home({ articles }) {
    return (
        <div>
            <Head>
                <meta
                    name="description"
                    content="Get all your news stories here. Updated every 30 minutes, top headlines in the US."
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
