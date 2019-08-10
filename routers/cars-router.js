const express = require('express');
const router = express.Router();

const db = require('../data/db-config.js');

// GET api/cars/
router.get('/', async (req, res) => {
  const cars = await db('cars');
  
  res.status(200).json(cars);
});


module.exports = router;
