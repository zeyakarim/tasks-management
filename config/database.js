require('dotenv').config();
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

// Validate essential configuration
if (!config) {
    throw new Error(`No database configuration found for environment: ${env}`);
}

const sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: config.port || 5432, // Default PostgreSQL port
    dialect: 'postgres',
    dialectOptions: {
        ssl: env === 'production' ? { // Only enforce SSL in production
            require: true,
            rejectUnauthorized: false // Warning: Set to true in production with valid certificates
        } : false
    },
    pool: {
        max: parseInt(process.env.SEQUELIZE_POOL_MAX) || 5,
        min: parseInt(process.env.SEQUELIZE_POOL_MIN) || 0,
        acquire: parseInt(process.env.SEQUELIZE_POOL_ACQUIRE) || 30000,
        idle: parseInt(process.env.SEQUELIZE_POOL_IDLE) || 10000
    },
    logging: (sql, queryExecutionTime) => {
        const timeLimit = parseInt(process.env.SEQUELIZE_QUERY_TIMELIMIT) || 1000;
            if (queryExecutionTime > timeLimit) {
            console.warn(`[Slow Query] ${queryExecutionTime}ms: ${sql}`);
        }
        if (process.env.SEQUELIZE_LOG_ALL_QUERIES === 'true') {
            console.log(`[Query] ${sql}`);
        }
    },
    dialectModule: require('pg'),
    define: {
        timestamps: true, // Enable createdAt and updatedAt by default
        underscored: true // Use snake_case for column names
    },
    benchmark: true // Enable query timing
});

// Test connection
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log(`✅ Database connection established to ${config.database} as ${config.username}`);
        
        // Sync models based on environment
        if (env === 'development') {
            await sequelize.sync({ alter: true }); // Safe for development
            console.log('🔄 Database schema synchronized (alter)');
        } else if (env === 'test') {
            await sequelize.sync({ force: true }); // Reset for tests
            console.log('🔄 Database schema synchronized (force)');
        }
        // In production, you should use migrations instead of sync()
    } catch (error) {
        console.error('❌ Database initialization failed:', error);
        process.exit(1); // Exit with failure
    }
}

initializeDatabase();

module.exports = sequelize;