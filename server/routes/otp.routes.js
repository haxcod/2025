const otpController = require('../controllers/otp.controller');
const authMiddleware = require('../middleware/auth.middleware')
const routes = (data) => {
    data.post('/api/v1/send-otp',authMiddleware.isAuthenticated, otpController.sendOTP);
    data.post('/api/v1/verify-otp',authMiddleware.isAuthenticated, otpController.verifyOTP);
}

module.exports = routes