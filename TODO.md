# Todo

## Create Database

Add the knex and sqlite3 libraries to your repository.

```
yarn add knex sqlite3
```

Configure knwx with knexfile

Add a knexfile.js with the following command.

```
knex init
```
We can delete test and production environments.


Add correct database location to knexfile, including exact filename

```
// the exact location of our db
    connection: {
      filename: './data/car-dealer.db3',
    },
```

Add useNullAsDefault to knexfile

```
development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3,
    },

// must add this to prevent bugs:

    useNullAsDefault: true,
  }
```

Add a location for the migration files to knexfile. There is no need to create the data directory first, it will be created by knex.


```
development: {
    client: 'sqlite3',
    connection: {
      filename: './data/car-dealer.db3',
    },
    useNullAsDefault: true,

// generates migration files in a data/migrations/ folder

    migrations: {
      directory: './data/migrations'
    }
  }
```

Add location for the seed files. There is no need to create the data
directory first, it will be created by knex.

```
development: {
    client: 'sqlite3',
    connection: {
      filename: './data/produce.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations'
    },

// Location for seed files

    seeds: {
      directory: './data/seeds'
    }
  }
```

Add first migration file to create the table

```
knex migrate:make create-cars
```

Inside the migration file, add the table and columns:

See also: https://knexjs.org/#Migrations for documentation

```
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.text('vin', 128).unique().notNullable();
    tbl.string('make').notNullable();
    tbl.string('model').notNullable();
    tbl.integer('mileage').notNullable();
    tbl.string('transmission');
    tbl.string('title');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
```

Run the migration with this command:
If the database doesn't exist it will be created.

```
knex migrate:latest
```

To roll back the migration use `knex migrate:rollback`


## Seed database

Make sure you added the location for the seed files (see above)

To generate a seed file, type this:

```
 knex seed:make 001-cars
```

Give a sequence to the seed files.


This is the structure for the seed file:

```
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { vin: '12344434154', make: 'Ford', model: 'Fusion', ... },
        { vin: '12344434154', make: 'Ford', model: 'Fusion', ... },
        { vin: '12344434154', make: 'Ford', model: 'Fusion', ... },
      ]);
    });
};

```

Add items to the seed file and run this command to apply it:

```
knex seed:run
```

Confirm everything is working with SqliteStudio.


## Using Faker to seed data

You can use Faker to seed data.
[Faker homepage](https://github.com/Marak/faker.js)

Create a faker constant and use it to add items to an array in a loop and
populate the database with this array.

```
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
```




## Create API

Add the express module:

```
yarn add express
```

Create index.js as the entry point of the application. index.js defines a server
constant that imports the server from the server.js file, in the same directory.

```
const server = require('./server.js');

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
```

Create server.js
In it create a server and set up a get route for the root of the application.
Define a router that requires a cars-router.js file.
Export the server at the end of the file.

```
const express = require('express');
const server = express();
const carsRouter = require('./routers/cars-router.js');

server.use(express.json());
server.use('/api/cars', carsRouter);

server.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to the Cars API</h1>');
});

module.exports = server;
```

Create /routers/car-router.js
Define a new router and export it at the end of the file.
Create a new const that points to the database and requires the db-config.js
file with all the configurations for the database.

Define all the routes in this file.

```
const express = require('express');
const router = express.Router();

const db = require('../data/db-config.js');

// GET api/cars/
router.get('/', async (req, res) => {
  const cars = await db('cars');
  
  res.status(200).json(cars);
});


module.exports = router;
```


Create data/db-config.js
This file allows the connection to the database.

```
const knex = require('knex');

const configOptions = require('../knexfile.js').development;

module.exports = knex(configOptions);
```


Test that API works with Postman.
