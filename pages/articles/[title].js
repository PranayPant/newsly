import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Article() {
    const router = useRouter()
    const { title, description, content, url, urlToImage } = router.query

    if (!urlToImage || !url || !title || !content) {
        return <></>
    }
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
