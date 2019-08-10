const express = require('express');
const router = express.Router();

const db = require('../data/db-config.js');

// GET /api/cars/
router.get('/', async (req, res) => {

  try {
    const cars = await db('cars');
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({message: 'Database error', error: err})
  }
});


// GET /api/cars/1
router.get('/:id', async (req, res) => {
  const {id} = req.params;

  try {
    const [car] = await db('cars').where({id});

    if (car) {
      res.status(200).json(car)
    } else {
      res.status(404).json({message: `Car with ID ${id} not found`});
    }
  } catch (err) {
    res.status(500).json({message: 'Database error', error: err})
  }
});

// POST /api/cars/
router.post('/', async (req, res) => {
  const newCar = req.body;
  try {
    const carId = await db('cars').insert(newCar);
    res.status(201).json({id: carId});
  } catch (err) {
    res.status(500).json({message: 'Database error', error: err})
  }
});




module.exports = router;
