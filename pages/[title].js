import PropTypes from 'prop-types'
import Head from 'next/head'
import Card from '@components/Card'
import {
    getAllPersistedArticles,
    getPersistedArticle,
} from '@queries/headlines'

export default function Article({ article }) {
    return <>{JSON.stringify(article)}</>
}

Article.propTypes = {
    article: Card.propTypes.article,
}

export async function getStaticProps({ params: { title } }) {
    const article = await getPersistedArticle(title)
    return {
        props: {
            article,
        },
    }
}

export async function getStaticPaths() {
    const articles = await getAllPersistedArticles()
    console.log('Fetched articles', articles)
    const paths = articles.map(({ title }) => ({ params: { title } }))
    return {
        paths,
        fallback: false,
    }
}
