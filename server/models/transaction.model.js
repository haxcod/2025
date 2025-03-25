const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: [true, "Mobile number is required."],
            validate: {
                validator: (v) => /^[6-9]\d{9}$/.test(v), // Validates Indian mobile numbers
                message: (props) => `${props.value} is not a valid mobile number.`,
            },
        },
        amount: {
            type: Number,
            required: [true, "Amount is required."],
            min: [0, "Amount cannot be negative."],
        },
        type: {
            type: String,
            required: [true, "Transaction type is required."],
            enum: {
                values: ['credit', 'debit', 'buy', 'revenue'],
                message: "Transaction type must be 'credit', 'debit', 'buy', or 'revenue'.",
            },
        },
        description: {
            type: String,
            default: "", // Now optional
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending',
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
