const otpService = require('../services/otp.service');

const sendOTP = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email are required" });
    }

    try {
        const infoResponse = await otpService.sendEmail(email);
        console.log("✅ Email Sent Successfully:", infoResponse);

        res.status(200).json({ success: true, message: "OTP sent successfully", infoResponse });
    } catch (error) {
        console.error("❌ Error Sending OTP:", error.response?.body || error.message);

        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
            error: error.response?.body || error.message
        });
    }
};


const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    try {
        await otpService.verifyOTP(email, otp); // Service function already throws error if OTP is invalid

        res.status(200).json({ success: true, message: "OTP verified successfully" });

    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        res.status(400).json({ success: false, message: error.message });
    }
};

module.exports = { sendOTP, verifyOTP };
