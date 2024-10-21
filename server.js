// Load environment variables from .env file
const dotenv = require('dotenv');
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Create the express app
const server = express();

// Middleware to handle CORS and JSON request bodies
server.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

server.use(bodyParser.json());

// Example route
server.post('/api/authenticate', async (req, res) => {
  const { code } = req.body;
  const clientId = process.env["GITHUB_CLIENT_ID"];
  const clientSecret = process.env["GITHUB_CLIENT_SECRET"];

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// Start the server
const port = process.env["PORT"] || 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});