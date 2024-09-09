const express = require('express');
const axios = require('axios');
const router = express.Router();

// Pexels API key (Replace 'your-pexels-api-key' with your actual API key)
const PEXELS_API_KEY = 'your-pexels-api-key';

// Route to get random text from Lipsum
router.get('/random-text', async (req, res) => {
  try {
    const response = await axios.get('https://www.lipsum.com/feed/json');
    const randomText = response.data.feed.lipsum;
    res.json({ text: randomText });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random text' });
  }
});

// Route to get a random image from Pexels
router.get('/random-image', async (req, res) => {
  try {
    const response = await axios.get('https://api.pexels.com/v1/search?query=nature&per_page=1', {
      headers: {
        Authorization: PEXELS_API_KEY
      }
    });
    const imageUrl = response.data.photos[0].src.original;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image from Pexels' });
  }
});

// Route to get a random GIF (using hardcoded URLs from Motion Elements)
router.get('/random-gif', (req, res) => {
  const randomGifs = [
    'https://static.motionelements.com/stock-video/free/gif/14789265/seamless-loop-world-earth-rotating-3d-gif.gif',
    'https://static.motionelements.com/stock-video/free/gif/15298417/abstract-flying-shiny-particles-gif.gif',
    'https://static.motionelements.com/stock-video/free/gif/15831282/animation-sci-fi-starry-night-sky-timelapse-gif.gif'
  ];
  const randomIndex = Math.floor(Math.random() * randomGifs.length);
  const gifUrl = randomGifs[randomIndex];
  res.json({ gifUrl });
});

module.exports = router;
