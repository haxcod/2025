const userService = require('../services/user.service');

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                message: "JWT token missing",
                success: false,
                data: {},
                err: "Missing authentication token"
            });
        }

        const response = userService.verifyJWT(token);
        if (!response) {
            return res.status(401).json({
                message: "JWT token not verified",
                success: false,
                data: {},
                err: "Invalid authentication details"
            });
        }
       
        const user = await userService.getUserById(response.user._id);
        if (!user) {
            return res.status(404).json({
                message: "JWT for an invalid user",
                success: false,
                data: {},
                err: "User not found"
            });
        }

        // req.user = user._id;
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
            data: {},
            err: error.message
        });
    }
};

module.exports = {
    isAuthenticated
};
