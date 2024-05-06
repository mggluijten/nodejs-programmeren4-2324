const express = require('express');
const userRoutes = require('./src/routes/user.routes');
const logger = require('tracer').console();

const app = express();

// express.json zorgt dat we de body van een request kunnen lezen
app.use(express.json());

const port = process.env.PORT || 3000;

app.all('*', (req, res, next) => {
    logger.info(`REQUEST: ${req.method} ${req.url}`);
    next();
});

app.get('/', function (req, res) {
    res.json({ message: 'Hello World' });
});

app.get('/api/info', (req, res) => {
    const info = {
        name: 'My Nodejs Express server',
        version: '0.0.1',
        description: 'This is a simple Nodejs Express server'
    };
    res.json(info);
});

// Hier komen alle routes
app.use(userRoutes);

// Hier komt de route error handler te staan!
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    });
});

// Hier komt je Express error handler te staan!
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    });
});

// Only one app.listen() should be present
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
