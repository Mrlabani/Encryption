const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., CSS)
app.use(express.static('public'));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle form submission for encoding/decoding
app.post('/process', (req, res) => {
  const { text, type, action } = req.body;
  let result;

  try {
    if (action === 'encode') {
      if (type === 'base64') {
        result = Buffer.from(text).toString('base64');
      }
    } else if (action === 'decode') {
      if (type === 'base64') {
        result = Buffer.from(text, 'base64').toString('utf-8');
      }
    }

    res.redirect(`/?result=${encodeURIComponent(result)}`);
  } catch (error) {
    res.redirect(`/?error=${encodeURIComponent(error.message)}`);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
