import PropTypes from 'prop-types'
import headlinesApi from '@queries/headlines'

export default function Home({data: {articles}}) {
  return (
      <div>
          <header className="flex justify-center prose-2xl py-10">
              <h1>Newsly</h1>
          </header>
          <main className="flex flex-wrap">
              {articles.map(
                  ({
                      author,
                      title,
                      description,
                      url,
                      urlToImage,
                      publishedAt,
                      content,
                  }) => (
                      <div
                          className="w-96 m-2 p-3 flex-auto bg-gray-200 rounded-lg flex flex-col"
                          key={`${author}${title}`}
                      >
                          <img
                              className="w-full rounded-lg"
                              src={urlToImage}
                              alt={title}
                          ></img>
                          <div className="flex flex-col">
                              <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer noopener"
                              >
                                  {title}
                              </a>
                              <span>{description}</span>
                              <div className="flex">
                                  <span>{author}</span>
                                  <span>{publishedAt}</span>
                              </div>
                              <p className="text-ellipsis">{content}</p>
                          </div>
                      </div>
                  )
              )}
          </main>
      </div>
  )
}

Home.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    totalResults: PropTypes.number,
    articles: PropTypes.arrayOf(PropTypes.shape({
      source: PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      }),
      author: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      url: PropTypes.string,
      urlToImage: PropTypes.string,
      publishedAt: PropTypes.string,
      content: PropTypes.string,
    }))
  }).isRequired
}

export async function getStaticProps(){
  const data = await headlinesApi()
  return {
    props: {
      data
    },
    // revalidate every 12 hours
    revalidate: 43200
  }
}
