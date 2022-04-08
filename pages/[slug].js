import { useEffect } from 'react'

import Card from '@components/Card'

import {
    getAllPersistedArticles,
    getPersistedArticle,
} from '@queries/headlines'
import Head from 'next/head'

export default function Article({
    article: { title, content, description, url, urlToImage },
}) {
    const handleReadMore = () => {
        const readMoreLink = document.getElementById('read-more-link')
        const transformClass = ['md:bottom-10', 'bottom-16']
        if (
            window.innerHeight + window.pageYOffset >=
            document.body.offsetHeight
        ) {
            readMoreLink.classList.remove('hidden')
            readMoreLink.classList.add(...transformClass)
        } else {
            readMoreLink.classList.add('hidden')
            readMoreLink.classList.remove(...transformClass)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleReadMore)
        window.addEventListener('resize', handleReadMore)
        return () => {
            window.removeEventListener('scroll')
            window.removeEventListener('resize')
        }
    })
    return (
        <>
            <Head>
                <meta property="og:title" content={title} />
                <meta property="og:image" content={urlToImage} />
                <meta property="og:description" content={description} />
            </Head>
            <main>
                <img
                    className="h-96 w-full"
                    src={urlToImage}
                    width={1980}
                    height={400}
                />
                <article className="px-10">
                    <h1 className="md:text-6xl text-3xl py-20 text-left">
                        {title}
                    </h1>
                    <div className="relative flex flex-col place-items-center">
                        <p className="md:px-20 md:leading-normal px-0 text-2xl">
                            {content.split('[')[0]}
                        </p>
                        <div className="h-36 w-full absolute bottom-0 bg-gradient-to-b from-transparent to-white" />
                        <a
                            id="read-more-link"
                            className="self-center absolute bottom-0 px-4 py-2 rounded bg-blue-400 text-white"
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Read More
                        </a>
                    </div>
                </article>
            </main>
        </>
    )
}

Article.propTypes = {
    article: Card.propTypes.article,
}

export async function getStaticProps({ params: { slug } }) {
    let article
    try {
        article = await getPersistedArticle({ slug })
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
    const paths = articles.map(({ slug }) => ({
        params: { slug },
    }))
    return {
        paths,
        fallback: false,
    }
}
