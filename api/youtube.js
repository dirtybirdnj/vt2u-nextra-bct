const { google } = require('googleapis');

export default async (req, res) => {
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const apiKey = process.env.YOUTUBE_API_KEY;

  if (!channelId || !apiKey) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

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

    const videos = response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    res.status(200).json({ videos });
  } catch (err) {
    console.error('Error retrieving videos:', err.message);
    res.status(500).json({ error: 'Failed to retrieve videos' });
  }
};