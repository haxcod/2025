// const nodemailer = require("nodemailer");
const SibApiV3Sdk = require("sib-api-v3-sdk");
const otpModel = require('../models/otp.model');
const userModel = require('../models/user.model')


const defaultClient = SibApiV3Sdk.ApiClient.instance;
defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// Initialize Transactional Email API
const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();



const sendEmail = async (email) => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("User not found with this email");
    }
    const otpRequests = await otpModel.find({ userId: user._id });
    if (otpRequests.length >= 3) {
        throw new Error("OTP request limit exceeded. Please try again after 1 hour.");
    }


    const sender = {
        email: process.env.SENDER_EMAIL,
        name: process.env.SENDER_NAME,
    };

    const emailData = {
        sender,
        to: [{ email: email }],
        subject: "Your OTP Code",
        htmlContent: `
          <div style="text-align:center; font-family:Arial, sans-serif; padding:20px;">
            <h2 style="color:#333;">Your OTP Code</h2>
            <p style="font-size:18px; color:#555;">Use this OTP to verify your account:</p>
            <h1 style="font-size:28px; color:#007bff; font-weight:bold;">${otp}</h1>
            <p style="color:#999;">This OTP is valid for 10 minutes.</p>
          </div>
        `,
    };

    try {
        await otpModel.create({ userId: user._id, email, otp });
        await emailApi.sendTransacEmail(emailData);
        return { success: true, message: "OTP sent successfully" };
    } catch (error) {
        console.error("❌ Error response from Brevo:", error.response?.body || error.message);
        throw error;
    }

};

const verifyOTP = async (email, otp) => {
    try {
        const otpRecord = await otpModel.findOne({ email, otp });

        if (!otpRecord) {
            throw new Error('Invalid OTP or OTP expired');
        }

        // If OTP is valid, delete it after verification
        await otpModel.deleteOne({ _id: otpRecord._id });

        return { success: true, message: "OTP verified successfully" };

    } catch (error) {
        console.error("❌ Error verifying OTP:", error);
        throw new Error(error.message || "Error verifying OTP");
    }
};

module.exports = { sendEmail, verifyOTP };
