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
