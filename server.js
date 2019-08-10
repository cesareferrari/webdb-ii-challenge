const express = require('express');
const server = express();

server.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the Cars API</h1>');
});

module.exports = server;
