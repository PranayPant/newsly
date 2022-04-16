import Head from 'next/head'

import { getLatestArticles, getPersistedArticle } from '@queries/headlines'

export default function Article({
    title,
    description,
    content,
    url,
    urlToImage,
}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:image" content={urlToImage} />
                <meta
                    property="og:description"
                    content={description || title}
                />
                <link rel="canonical" href={url} />
            </Head>
            <main>
                <div className="flex justify-center bg-slate-200">
                    <img
                        className="h-48 md:h-96"
                        src={urlToImage}
                        width={800}
                    />
                </div>

                <article className="px-10 relative flex flex-col">
                    <h1 className="md:text-6xl text-3xl md:py-20 py-10 text-left">
                        {title}
                    </h1>
                    <p className="md:px-20 md:leading-normal px-0 text-2xl">
                        {content.split('[')[0]}
                    </p>
                    <div className="h-36 w-full absolute bottom-0 bg-gradient-to-b from-transparent to-white" />
                    <a
                        id="read-more-link"
                        className="inline self-center absolute bottom-5 px-4 py-2 rounded bg-blue-400 text-white"
                        href={url}
                    >
                        Read More
                    </a>
                </article>
            </main>
        </>
    )
}

export async function getStaticProps({ params: { slug } }) {
    const { title, description, content, url, urlToImage } =
        await getPersistedArticle({ slug })
    return {
        props: {
            title,
            description,
            content,
            url,
            urlToImage,
        },
        revalidate: 1800,
    }
}

export async function getStaticPaths() {
    const latestArticles = await getLatestArticles({ projection: { slug: 1 } })
    const paths = latestArticles.map(({ slug }) => ({ params: { slug } }))
    return {
        paths,
        fallback: 'blocking',
    }
}
