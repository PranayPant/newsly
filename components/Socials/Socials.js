import PropTypes from 'prop-types'
import ShareButton from './ShareButton'

const Socials = ({ socials, url, title }) => {
    return (
        <>
            {socials.map((social) => (
                <ShareButton
                    key={social}
                    url={url}
                    title={title}
                    social={social}
                    buttonClass="pr-2"
                />
            ))}
        </>
    )
}

Socials.propTypes = {
    socials: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    url: PropTypes.string.isRequired,
}

Socials.defaultProps = {
    socials: ['facebook', 'pinterest', 'twitter', 'linkedin'],
    title: '',
}

export default Socials
