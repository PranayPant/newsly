import Card from '@components/Card'
import {
    getAllPersistedArticles,
    getPersistedArticle,
} from '@queries/headlines'

export default function Article({ article }) {
    return <Card key={`${article.author}${article.title}`} article={article} />
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
    console.log(
        'built paths',
        paths.map((p) => p.params.title)
    )
    return {
        paths,
        fallback: false,
    }
}
