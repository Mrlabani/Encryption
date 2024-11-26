const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (e.g., CSS)
app.use(express.static('public'));

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Handle the homepage request
app.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});

// Handle form submission for encoding/decoding
app.post('/process', (req, res) => {
  const { text, type, action } = req.body;
  let result;

  try {
    if (action === 'encode') {
      if (type === 'base64') {
        result = Buffer.from(text).toString('base64');
      } else if (type === 'marshal') {
        result = JSON.stringify(text); // Placeholder for Marshal encoding
      }
    } else if (action === 'decode') {
      if (type === 'base64') {
        result = Buffer.from(text, 'base64').toString('utf-8');
      } else if (type === 'marshal') {
        result = JSON.parse(text); // Placeholder for Marshal decoding
      }
    }

    res.render('index', { result, error: null });
  } catch (error) {
    res.render('index', { result: null, error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
