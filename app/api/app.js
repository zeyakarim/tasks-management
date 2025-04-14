const express = require('express');
const taskManagementRoutes = require('./tasks-management/routes');
const userRoutes = require('./users/routes');
const cookieParser = require('cookie-parser');

const cors = require('cors');
// initialize the application
const app = express();

app.use(
    cors({
        credentials: true,
        origin: process.env.origin || "http://localhost:5173", // Default for dev
        contentType: ['application/json', 'multipart/form-data'],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
            "X-Forwarded-For",
        ],
    })
);
  
app.use(
    express.json({
      limit: '1024mb',
    }),
);

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use('/api/tasks', taskManagementRoutes);

app.use('/api/users', userRoutes);

module.exports = app;