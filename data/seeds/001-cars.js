const faker = require('faker');

const createCar = () => ({
  vin: faker.random.uuid(),
  make: faker.random.arrayElement(['Ford', 'GM', 'Toyota', 'Chevrolet', 'Subaru']),
  model: faker.random.word(),
  mileage: faker.random.number(),
  transmission: faker.random.arrayElement(['manual', 'automatic', '']),
  title: faker.random.arrayElement(['clean', 'salvage', ''])
});

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries

      const fakeCars = [];
      const fakeCarsNumber = 20;

      for (let i = 0; i < fakeCarsNumber; i++) {
        fakeCars.push(createCar());
      }

      return knex('cars').insert(fakeCars);
    });
};
