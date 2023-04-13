// pages/404.js
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

import { Header } from '../components/header';
import { Footer } from '../components/footer';

const { google } = require('googleapis');
const decode = require('decode-html')

function Episodes({ episodes }) {

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
              <h2>{episode.title}</h2>
            <div className="flex">

              <Image src={episode.thumbnail} width={480} height={360} />
              <div>

                <small>{episode.description}</small>
                <Link href={`https://www.youtube.com/watch?v=${episode.id}`}>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Watch Now</button>
                </Link>
              </div>


              </div>
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
  // const res = await fetch(process.env.VERCEL_URL)
  // const response = await res.json()


  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;

  // if (!channelId || !apiKey) {
  //   return res.status(400).json({ error: 'Missing required fields' });
  // }

  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,
  });

  try {
    const response = await youtube.search.list({
      part: 'snippet',
      channelId,
      type: 'video',
      maxResults: 50
    });

    //console.log(response.data.items[0])

    const episodes = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: decode(item.snippet.title),
      description: decode(item.snippet.description),
      thumbnail: item.snippet.thumbnails.high.url,
      published: item.snippet.publishTime
    }));



      // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
    return {
      props: {
        episodes
      }
    }

  } catch (err) {
    console.error('Error retrieving videos:', err.message);
    res.status(500).json({ error: 'Failed to retrieve videos' });
  }


}

export default Episodes;