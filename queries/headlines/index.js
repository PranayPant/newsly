import axios from 'axios'

export async function fetchHeadlines() {
    const { data } = await axios.get(
        `${process.env.HEADLINES_API_ENDPOINT}?country=us`,
        {
            headers: {
                'X-Api-Key': `${process.env.HEADLINES_API_KEY}`,
            },
        }
    )
    return data
}

export async function persistArticles(articles) {
    let insertArticles = articles.filter(
        ({ title, content, urlToImage, publishedAt }) =>
            urlToImage && title && content && publishedAt
    )
    const oldCount = (await updateArticlesCount(insertArticles.length)) || 1
    insertArticles = insertArticles.map((article, i) => ({
        ...article,
        slug: `${oldCount + i}`,
    }))
    const insertPromises = insertArticles.map((article) =>
        axios.post(
            process.env.DB_API_INSERT_ONE_ENDPOINT,
            {
                dataSource: process.env.CLUSTER_NAME,
                database: process.env.DB_NAME,
                collection: 'headlines',
                document: article,
            },
            {
                headers: {
                    'api-key': process.env.DB_API_KEY,
                },
            }
        )
    )
    await Promise.allSettled(insertPromises)
    return insertArticles
}

export async function getPersistedArticle(params) {
    const {
        data: { document },
    } = await axios.post(
        process.env.DB_API_FIND_ONE_ENDPOINT,
        {
            dataSource: process.env.CLUSTER_NAME,
            database: process.env.DB_NAME,
            collection: 'headlines',
            filter: params,
        },
        {
            headers: {
                'api-key': process.env.DB_API_KEY,
            },
        }
    )
    return document
}

export async function getAllPersistedArticles() {
    const {
        data: { documents },
    } = await axios.post(
        process.env.DB_API_FIND_MANY_ENDPOINT,
        {
            dataSource: process.env.CLUSTER_NAME,
            database: process.env.DB_NAME,
            collection: 'headlines',
        },
        {
            headers: {
                'api-key': process.env.DB_API_KEY,
            },
        }
    )
    return documents
}

async function updateArticlesCount(articlesCount) {
    const { data } = await axios.post(
        `${process.env.REDIS_API_ENDPOINT}/pipeline`,
        [
            ['GET', 'articlesCount'],
            ['INCRBY', 'articlesCount', articlesCount],
        ],
        {
            headers: {
                Authorization: `Bearer ${process.env.REDIS_API_TOKEN}`,
            },
        }
    )
    // return old count
    return data[0].result
}
