import axios from 'axios'
export default async () => {
    const {data} = await axios.get(`${process.env.HEADLINES_API_ENDPOINT}?country=us`, {headers: {
        'X-Api-Key': `${process.env.HEADLINES_API_KEY}`
    }})
    return data
}