const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Your db.js file

const app = express();
const routes = require('./routes'); // or './routes.js'

// Middleware
app.use(cors());

app.use(express.json()); // Replaces body-parser

app.use(routes);

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
