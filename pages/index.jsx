import PropTypes from 'prop-types'
import headlinesApi from '@queries/headlines'

export default function Home({ data: { articles } }) {
    return (
        <div>
            <header className="flex justify-center prose-2xl py-10">
                <h1>Newsly</h1>
            </header>
            <main className="flex flex-wrap justify-evenly">
                {articles.map(
                    ({
                        author,
                        title,
                        description,
                        url,
                        urlToImage,
                        publishedAt,
                    }) => {
                        if (
                            !urlToImage ||
                            !title ||
                            !description ||
                            !publishedAt
                        ) {
                            return <></>
                        }
                        const modPublishedAt = new Date(
                            Date.parse(publishedAt)
                        ).toLocaleTimeString('en-US', {
                            hour12: true,
                            hour: '2-digit',
                            minute: '2-digit',
                        })
                        return (
                            <div
                                className="w-96 m-2 p-3 bg-gray-200 rounded-lg flex flex-col"
                                key={`${author}${title}`}
                            >
                                <img
                                    className="max-h-96 w-96 rounded-lg"
                                    src={urlToImage}
                                    alt={title}
                                ></img>
                                <div className=" flex flex-col flex-auto pt-3">
                                    <a
                                        className="text-2xl hover:text-blue-700 hover:underline"
                                        href={url}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                    >
                                        {title}
                                    </a>

                                    <span className="flex-auto pt-5 text-lg">
                                        {description}
                                    </span>
                                    <span className="pt-3 inline-flex self-end text-xs">
                                        Updated at {modPublishedAt}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                )}
            </main>
        </div>
    )
}

Home.propTypes = {
    data: PropTypes.shape({
        status: PropTypes.string,
        totalResults: PropTypes.number,
        articles: PropTypes.arrayOf(
            PropTypes.shape({
                source: PropTypes.shape({
                    id: PropTypes.string,
                    name: PropTypes.string,
                }),
                author: PropTypes.string,
                title: PropTypes.string,
                description: PropTypes.string,
                url: PropTypes.string,
                urlToImage: PropTypes.string,
                publishedAt: PropTypes.string,
                content: PropTypes.string,
            })
        ),
    }).isRequired,
}

export async function getStaticProps() {
    const data = await headlinesApi()
    return {
        props: {
            data,
        },
        // revalidate every 10 min
        revalidate: 600,
    }
}
