const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require('./config')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false, // Set to true if your server requires valid certificates
        },
    },
    pool: {
        max: parseInt(process.env.Sequelize_Pool_Max) || 5,
        min: 0,
        acquire: parseInt(process.env.Sequelize_Pool_Acquire) || 30000,
        idle: 10000,
    },
    logging: (sql, queryExecutionTime) => {
        // log for slow queries
        if (queryExecutionTime > (parseInt(process.env.Sequelize_Query_TimeLimit) || 1000)) {
            console.log(`Slow query (execution time ${queryExecutionTime} ms): ${sql}`);
        }
    },
    dialectModule: require('pg'),
});

sequelize
    .authenticate()
    .then(() => {
        console.log(`Connection has been established successfully to, \nDatabase Name: ${config.database} \nUser Name: ${config.username}`);
    })
    .catch((err) => {
        console.error(`Unable to connect to the database ${config.database}:`, err);
    });

sequelize
    .sync()
    .then(() => {
        console.log('Table synchronized successfully!');
    })
    .catch((error) => {
        console.error('Unable to create table:', error);
    });

module.exports = sequelize;