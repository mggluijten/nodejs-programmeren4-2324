const express = require('express');
const userRoutes = require('./src/routes/user.routes');
const logger = require('tracer').console();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Logging middleware for all requests
app.all('*', (req, res, next) => {
    logger.info(`REQUEST: ${req.method} ${req.url}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// API information route
app.get('/api/info', (req, res) => {
    const info = {
        name: 'My Nodejs Express server',
        version: '0.0.1',
        description: 'This is a simple Nodejs Express server'
    };
    res.json(info);
});

// User routes
app.use(userRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).json({
        status,
        message: error.message || 'Internal Server Error',
        data: {}
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
