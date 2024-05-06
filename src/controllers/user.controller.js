const userService = require('../services/user.service');

let userController = {
    create: (req, res, next) => {
        const user = req.body;
        userService.create(user, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    getAll: (req, res, next) => {
        userService.getAll((error, success) => {
            console.log('Controller Data:', success.data);  // Logging to check data integrity
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: 200,
                    message: success.message,
                    data: success.data  // This should be the full user data
                });
            }
        });
    },
    
    

    getById: (req, res, next) => {
        const userId = parseInt(req.params.userId);
        userService.getById(userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            if (success) {
                res.status(200).json({
                    status: success.status,
                    message: success.message,
                    data: success.data
                });
            }
        });
    },

    update: (req, res, next) => {
        const userId = parseInt(req.params.userId);
        userService.update(userId, req.body, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            res.status(200).json(success);
        });
    },

    delete: (req, res, next) => {
        const userId = parseInt(req.params.userId);
        userService.delete(userId, (error, success) => {
            if (error) {
                return next({
                    status: error.status,
                    message: error.message,
                    data: {}
                });
            }
            res.status(200).json(success);
        });
    }
};

module.exports = userController;
