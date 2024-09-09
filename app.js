const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const app = express();

// Middleware for parsing form data and JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Custom middleware for logging
const logger = (req, res, next) => {
  console.log(`${req.method} request to ${req.url} at ${new Date().toISOString()}`);
  next();
};
app.use(logger);

// Routes
app.use('/api', apiRoutes);

// Route to render the form
app.get('/request-content', (req, res) => {
  res.render('requestContent');
});

// Handle form submission and render content
app.post('/generate-content', async (req, res) => {
  const { contentType } = req.body;
  let content = {};

  try {
    if (contentType === 'text') {
      const response = await axios.get('https://www.lipsum.com/feed/json');
      content = response.data.feed;
    } else if (contentType === 'image') {
      const response = await axios.get('http://localhost:3000/api/random-image');
      content = response.data;
    } else if (contentType === 'gif') {
      const response = await axios.get('http://localhost:3000/api/random-gif');
      content = response.data;
    }
    res.render('showContent', { contentType, content });
  } catch (error) {
    res.status(500).send('Error fetching content');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
