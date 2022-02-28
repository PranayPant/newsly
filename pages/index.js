import PropTypes from 'prop-types'
import Head from 'next/head'

import headlinesApi from '@queries/headlines'
import Card from '@components/Card'

export default function Home({ data: { articles } }) {
    return (
        <div>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <title>Newsly: The News Hub</title>
            </Head>
            <header className="flex justify-center text-center sm:text-9xl text-6xl py-10">
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
    data: PropTypes.shape({
        status: PropTypes.string,
        totalResults: PropTypes.number,
        articles: PropTypes.arrayOf(Card.propTypes.article),
    }).isRequired,
}

export async function getStaticProps() {
    const data = await headlinesApi()
    return {
        props: {
            data,
        },
        // revalidate every 10 min
        revalidate: 600,
    }
}
