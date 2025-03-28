const mongoose = require('mongoose');


const otpSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,  // ✅ Fixed typo
    },
    otp: {
        type: Number,
        required: true,  // ✅ Fixed typo
    },
    email: {
        type: String,
        ref: "User",
        required: true,  // ✅ Fixed typo
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 10 * 60 * 1000), // ✅ Expires in 10 minutes
        index: { expires: '10m' } // ✅ Automatic deletion
    }
}, { timestamps: true });

const otpModal = mongoose.model("otp", otpSchema)

module.exports = otpModal
