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
    const insertPromises = articles
        .filter(
            ({ title, content, urlToImage, publishedAt }) =>
                urlToImage && title && content && publishedAt
        )
        .map((article) =>
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
}

export async function getPersistedArticle(title) {
    const {
        data: { document },
    } = await axios.post(
        process.env.DB_API_FIND_ONE_ENDPOINT,
        {
            dataSource: process.env.CLUSTER_NAME,
            database: process.env.DB_NAME,
            collection: 'headlines',
            filter: {
                title,
            },
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

export async function fetchRedisArticles() {
    const { data } = await axios.get(
        `${process.env.REDIS_API_ENDPOINT}/get/articles`,
        {
            headers: {
                Authorization: `Bearer ${process.env.REDIS_API_TOKEN}`,
            },
        }
    )
    return data
}

export async function insertRedisArticles(articles, exp = 1800) {
    const { data } = await axios.post(
        `${process.env.REDIS_API_ENDPOINT}`,
        ['SET', 'articles', JSON.stringify(articles), 'EX', exp],
        {
            headers: {
                Authorization: `Bearer ${process.env.REDIS_API_TOKEN}`,
            },
        }
    )
    return data
}
