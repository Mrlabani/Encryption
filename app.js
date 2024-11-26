const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Home route - serves the index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Process the form input
app.post('/process', (req, res) => {
  const { text, action, type } = req.body;
  let result;

  if (type === 'base64') {
    if (action === 'encode') {
      result = Buffer.from(text).toString('base64');
    } else if (action === 'decode') {
      try {
        result = Buffer.from(text, 'base64').toString('utf-8');
      } catch (error) {
        return res.redirect('/?error=Invalid Base64 Input');
      }
    }
  }

  // Redirect back with the result
  if (result) {
    return res.redirect(`/?result=${encodeURIComponent(result)}`);
  } else {
    return res.redirect('/?error=An unexpected error occurred.');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
