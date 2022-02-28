import {
    FacebookIcon,
    FacebookShareButton,
    PinterestIcon,
    PinterestShareButton,
    TwitterIcon,
    TwitterShareButton,
    LinkedinIcon,
    LinkedinShareButton,
} from 'react-share'

import PropTypes from 'prop-types'

const ShareButton = ({ className, social, size, url, title }) => {
    const Button = () => {
        switch (social) {
            case 'facebook':
                return (
                    <FacebookShareButton url={url} quote={title}>
                        <FacebookIcon size={size} round />
                    </FacebookShareButton>
                )
            case 'pinterest':
                return (
                    <PinterestShareButton url={url} quote={title}>
                        <PinterestIcon size={size} round />
                    </PinterestShareButton>
                )
            case 'twitter':
                return (
                    <TwitterShareButton url={url} quote={title}>
                        <TwitterIcon size={size} round />
                    </TwitterShareButton>
                )
            case 'linkedin':
                return (
                    <LinkedinShareButton url={url} quote={title}>
                        <LinkedinIcon size={size} round />
                    </LinkedinShareButton>
                )
        }
    }
    return (
        <div className={`inline ${className}`}>
            <Button />
        </div>
    )
}

ShareButton.propTypes = {
    className: PropTypes.string,
    social: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string,
    size: PropTypes.number,
}

ShareButton.defaultProps = {
    className: '',
    title: '',
    size: 32,
}

export default ShareButton
