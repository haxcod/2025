const nodemailer = require("nodemailer");
// const SibApiV3Sdk = require("sib-api-v3-sdk");
const otpModel = require('../models/otp.model');
const userModel = require('../models/user.model')


// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// defaultClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

// // Initialize Transactional Email API
// const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    secureConnection: false,
    auth: {
        user: process.env.EMAIL_USERNAME, // Your email
        pass: process.env.EMAIL_PASSWORD, // You
    },
});

const sendEmail = async (email) => {
    console.log(email);

    const otp = Math.floor(100000 + Math.random() * 900000);
    const user = await userModel.findOne({ email });

    if (!user) {
        throw new Error("User not found with this email");
    }

    // Limit OTP requests to 3 per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const otpRequests = await otpModel.find({ userId: user._id, createdAt: { $gte: oneHourAgo } });

    if (otpRequests.length >= 3) {
        throw new Error("OTP request limit exceeded. Please try again after 1 hour.");
    }

    // Save OTP to DB
    await otpModel.create({ userId: user._id, email, otp });


    // Email content
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: "Your OTP Code",
        html: `
    <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; 
                box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); font-family: 'Arial', sans-serif; text-align: center;">
        <h2 style="color: #333; font-size: 24px; margin-bottom: 10px;">🔐 Secure Your Account</h2>
        <p style="color: #666; font-size: 16px; margin-bottom: 20px;">Use the OTP below to verify your account.</p>
        
        <div style="background: #f4f4f4; padding: 15px; border-radius: 8px; display: inline-block;">
            <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px; margin: 0;">${otp}</h1>
        </div>

        <p style="color: #999; font-size: 14px; margin-top: 15px;">This OTP is valid for <strong>10 minutes</strong>.</p>

        <a href="#" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #007bff; 
                          color: #ffffff; font-size: 16px; font-weight: bold; text-decoration: none; 
                          border-radius: 5px;">Verify Now</a>

        <p style="color: #777; font-size: 12px; margin-top: 20px;">If you didn't request this, please ignore this email.</p>
    </div>
`

    };

    // Send email in the background
    process.nextTick(async () => {
        try {
            await transporter.sendMail(mailOptions);
            console.log("✅ OTP sent successfully");
        } catch (error) {
            console.error("❌ Error sending OTP:", error.message);
        }
    });

    return { success: true, message: "OTP request received. Email is being sent in the background." };
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
