// pages/404.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '../components/header';
import { Footer } from '../components/footer';
function Episodes({ response }) {

  const episodes = response.videos;

  const meta = {
    meta: {
      title : 'Episode List',
      description: "A list of all the VT2U Episodes! Binge Away",
      og: 'image'
    }
  }

  return(
    <>
      <Head>
        <meta property="og:title" content={meta.title} />
        <meta property="og:site_name" content="VT2U - Adventures in Vermont and Beyond" />
        <meta property="og:description" content={meta.description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@vermont2u" />
        <meta property="og:image" content={meta.og} />
      </Head>
      <Header/>
      <div className="prose lg:prose-lg mx-auto px-4 py-8">
        <h2>Episode List:</h2>

          {episodes.map((episode) => (
            <div>
              <Image src={episode.thumbnail} width={300} height={100} />
              <Link href={`https://www.youtube.com/watch?v=${episode.id}`}>
              <p>{episode.title}</p>
              <p>{episode.description}</p>
              </Link>
            </div>
          ))}

      </div>
      <Footer/>
    </>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3000/api/youtube')
  const response = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      response
    }
  }
}

export default Episodes