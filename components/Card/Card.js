import PropTypes from 'prop-types'
import Socials from '@components/Socials'
import { trackClickEvent } from '@lib/ga'

const Card = ({
    article: { title, content, url, urlToImage, publishedAt },
    wrapperClass,
    imgClass,
    bodyClass,
    footerClass,
    titleClass,
    contentClass,
    socialsClass,
    timestampClass,
}) => {
    if (!urlToImage || !title || !content || !publishedAt) {
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
        <div
            className={`sm:w-96 w-72 m-2 p-3 bg-gray-200 rounded-lg flex-auto flex flex-col ${wrapperClass}`}
        >
            <img
                className={`rounded-lg ${imgClass}`}
                src={urlToImage}
                alt={title}
            ></img>
            <div className={`flex flex-col flex-auto pt-3 ${bodyClass}`}>
                <a
                    className={`text-2xl font-semibold hover:text-blue-700 hover:underline ${titleClass}`}
                    href={`/${title}`}
                    onClick={() => newsLinkEvent(title)}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    {title}
                </a>

                <p className={`flex-auto pt-5 text-lg ${contentClass}`}>
                    {modContent}{' '}
                    <a
                        className={`text-blue-700 hover:underline`}
                        href={`/${title}`}
                        onClick={() => newsLinkEvent(title)}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        Read More
                    </a>
                </p>
                <div className={`flex pt-3 ${footerClass}`}>
                    <div className={`flex-auto ${socialsClass}`}>
                        <Socials url={url} title={title} />
                    </div>
                    <span
                        className={`text-xs h-fit self-end ${timestampClass}`}
                    >
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
    wrapperClass: PropTypes.string,
    imgClass: PropTypes.string,
    bodyClass: PropTypes.string,
    footerClass: PropTypes.string,
    titleClass: PropTypes.string,
    contentClass: PropTypes.string,
    socialsClass: PropTypes.string,
    timestampClass: PropTypes.string,
}

Card.defaultProps = {
    wrapperClass: '',
    imgClass: '',
    bodyClass: '',
    footerClass: '',
    titleClass: '',
    contentClass: '',
    socialsClass: '',
    timestampClass: '',
}

export default Card
