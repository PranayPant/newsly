import PropTypes from 'prop-types'
import Socials from '@components/Socials'
import { trackClickEvent } from '@lib/ga'

const Card = ({
    article: { title, slug, content, urlToImage, publishedAt },
}) => {
    const articleLink = encodeURI(`/articles/${slug}`)
    const socialUrl = `https://newsapp.cf/articles/${slug}`
    const modPublishedAt = new Date(Date.parse(publishedAt)).toLocaleTimeString(
        'en-US',
        {
            hour12: true,
            hour: '2-digit',
            minute: '2-digit',
        }
    )
    const modContent = content.split('[')[0]
    const newsLinkEvent = (title) => {
        trackClickEvent({
            action: 'newslink',
            params: {
                search_term: title,
            },
        })
    }
    return (
        <div className="sm:w-96 w-72 m-2 p-3 bg-gray-200 rounded-lg flex-auto flex flex-col">
            <img className="rounded-lg" src={urlToImage} alt={title}></img>
            <div className="flex flex-col flex-auto pt-3">
                <a
                    className="text-2xl font-semibold hover:text-blue-700 hover:underline"
                    href={articleLink}
                    onClick={() => newsLinkEvent(title)}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {title}
                </a>

                <p className="flex-auto pt-5 text-lg">
                    {modContent}{' '}
                    <a
                        className="text-blue-700 hover:underline"
                        href={articleLink}
                        onClick={() => newsLinkEvent(title)}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Read More
                    </a>
                </p>
                <div className="flex pt-3">
                    <div className="flex-auto">
                        <Socials url={socialUrl} title={title} />
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
        slug: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
        urlToImage: PropTypes.string,
        publishedAt: PropTypes.string,
        content: PropTypes.string,
    }).isRequired,
}

export default Card
