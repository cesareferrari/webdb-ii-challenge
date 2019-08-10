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


## Create API
