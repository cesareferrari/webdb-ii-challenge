const express = require('express');
const server = express();
const carsRouter = require('./routers/cars-router.js');

server.use(express.json());
server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the Cars API</h1>');
});

module.exports = server;
