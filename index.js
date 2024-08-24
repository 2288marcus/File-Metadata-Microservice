var express = require('express');
var cors = require('cors');
var multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// POST endpoint to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const file = req.file;

  // If no file is uploaded, send an error response
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  // Respond with file details
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
