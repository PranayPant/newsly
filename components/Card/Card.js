import PropTypes from 'prop-types'
import Socials from '@components/Socials'

const Card = ({
    article: { author, title, description, url, urlToImage, publishedAt },
}) => {
    if (!urlToImage || !title || !description || !publishedAt) {
        return <></>
    }
    const modPublishedAt = new Date(Date.parse(publishedAt)).toLocaleTimeString(
        'en-US',
        {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
        }
    )
    return (
        <div className="sm:w-96 w-72 m-2 p-3 bg-gray-200 rounded-lg flex-auto flex flex-col">
            <img className="rounded-lg" src={urlToImage} alt={title}></img>
            <div className=" flex flex-col flex-auto pt-3">
                <a
                    className="text-2xl hover:text-blue-700 hover:underline"
                    href={url}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {title}
                </a>

                <span className="flex-auto pt-5 text-lg">{description}</span>
                <div className="flex pt-3">
                    <div className="flex-auto">
                        <Socials url={url} title={title} />
                    </div>
                    <span className="text-xs h-fit self-end">
                        Updated at {modPublishedAt}
                    </span>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    article: PropTypes.shape({
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
    }).isRequired,
}

export default Card
