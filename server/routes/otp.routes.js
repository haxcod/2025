const otpController = require('../controllers/otp.controller');

const routes = (data)=>{
    data.post('/api/v1/send-otp',otpController.sendOTP);
    data.post('/api/v1/verify-otp',otpController.verifyOTP);
}

module.exports =routes