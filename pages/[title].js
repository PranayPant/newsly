import PropTypes from 'prop-types'
import Head from 'next/head'
import Card from '@components/Card'
import {
    getAllPersistedArticles,
    getPersistedArticle,
} from '@queries/headlines'

export default function Article({ article }) {
    return (
        <div>
            <Card
                key={`${article.author}${article.title}`}
                article={article}
                wrapperClass="p-0 m-0 sm:w-screen w-screen"
                imgClass="rounded-none"
                bodyClass="pt-10"
                contentClass="px-5"
                titleClass="self-center"
                socialsClass="hidden"
                timestampClass="hidden"
            />
            <div>
                <h2 className="p-10 text-2xl">More news...</h2>
            </div>
        </div>
    )
}

Article.propTypes = {
    article: Card.propTypes.article,
}

export async function getStaticProps({ params: { title } }) {
    let article
    try {
        article = await getPersistedArticle(title)
    } catch (err) {
        console.log('Error getting article:', err)
    }
    return {
        props: {
            article,
        },
    }
}

export async function getStaticPaths() {
    let articles = []
    try {
        articles = await getAllPersistedArticles()
    } catch (err) {
        console.log('Error retrieving articles:', err)
    }
    const paths = articles.map(({ title }) => ({ params: { title } }))
    return {
        paths: paths || [],
        fallback: false,
    }
}
