import headlinesApi from '@queries/headlines'

export default function Home({data}) {
  return (
   <main>
     <header>
        <h1>Hello World</h1>
     </header>
   </main>
  )
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
