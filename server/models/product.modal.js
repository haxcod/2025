const mongoose = require('mongoose');

const myProductSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[6-9]\d{9}$/.test(v), // Validates Indian mobile numbers
                message: (props) => `${props.value} is not a valid mobile number.`,
            },
        },
        fundName: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        revenueDays: {
            type: Number,
            required: true,
        },
        dailyEarnings: {
            type: Number,
            required: true,
        },
        totalRevenue: {
            type: Number,
            required: true,
        },
        currentPrice: {
            type: Number,
            required: true,
        },
        vip: {
            type: Boolean,
            required: true,
        },
        expireDate: {
            type: Date, // Use `Date` type if you'll parse dates correctly
            required: true,
        },
        claimed: {
            type: Number,
            default: '0'
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const productSchema = new mongoose.Schema({
    fundId: { type: String, required: true, unique: true },
    fundName: { type: String, required: true },
    status: { type: String, required: true },
    revenueDays: { type: Number, required: true },
    dailyEarnings: { type: Number, required: true },
    totalRevenue: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    vip: { type: Number, required: true },
    availability: { type: String, enum: ["Active", "Inactive"], required: true },
    purchaseCount: { type: Number, required: true }
});


const myProduct = mongoose.model('myProduct', myProductSchema);

const Product = mongoose.model('product', productSchema);

module.exports = { myProduct, Product };
