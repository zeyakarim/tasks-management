require('dotenv').config(); // this is important!
module.exports = {
    "development": {
        "username": process.env.DEV_PGUSER,
        "password": process.env.DEV_PGPASSWORD,
        "database": process.env.DEV_PGDB,
        "host": process.env.DEV_PGHOST,
        "dialect": 'postgres'
    },
    "test": {
        "username": process.env.TEST_PGUSER,
        "password": process.env.TEST_PGPASSWORD,
        "database": process.env.TEST_PGDB,
        "host": process.env.TEST_PGHOST,
        "dialect": 'postgres'
    },
    "production": {
        "username": process.env.PGUSER,
        "password": process.env.PGPASSWORD,
        "database": process.env.PGDB,
        "host": process.env.PGHOST,
        "dialect": 'postgres'
    }
}