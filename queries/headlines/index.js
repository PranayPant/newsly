import axios from 'axios'
import keyword_extractor from 'keyword-extractor'

export async function fetchHeadlines() {
    const { data } = await axios.get(
        `${process.env.HEADLINES_API_ENDPOINT}?country=us`,
        {
            headers: {
                'X-Api-Key': `${process.env.HEADLINES_API_KEY}`,
            },
        }
    )

    return data.articles.filter(
        ({ title, content, urlToImage, publishedAt }) =>
            urlToImage && title && content && publishedAt
    )
}

export async function persistArticles(articles) {
    const insertArticles = articles
        .filter(
            ({ title, content, urlToImage, publishedAt }) =>
                urlToImage && title && content && publishedAt
        )
        .map((article) => {
            const title = article.title
                .substring(0, article.title.lastIndexOf('-'))
                .trim()
            const keywords = keyword_extractor.extract(title, {
                language: 'english',
                remove_digits: true,
                return_changed_case: true,
                remove_duplicates: true,
            })
            return {
                ...article,
                title,
                keywords,
                slug: keywords.join('-'),
            }
        })
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
    const results = await Promise.allSettled(insertPromises)
    console.log(
        'Insert results',
        results.map(({ status }) => status)
    )
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

export async function getLatestArticles({ limit = 20, projection = {} }) {
    const {
        data: { documents },
    } = await axios.post(
        process.env.DB_API_FIND_MANY_ENDPOINT,
        {
            dataSource: process.env.CLUSTER_NAME,
            database: process.env.DB_NAME,
            collection: 'headlines',
            sort: { publishedAt: -1 },
            projection,
            limit,
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
