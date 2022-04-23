import { fetchHeadlines } from '@queries/headlines'
export default async function handler(req, res) {
    const { articles } = await fetchHeadlines()
    res.status(200).json(articles)
}
