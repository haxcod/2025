const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[6-9]\d{9}$/.test(v), // Validates Indian mobile numbers
                message: (props) => `${props.value} is not a valid mobile number.`,
            },
        },
        amount: {
            type: Number, // Changed to Number for monetary values
            required: true,
            min: [0, 'Amount cannot be negative.'], // Ensures a non-negative amount
        },
        type: {
            type: String,
            required: true,
            enum: ['credit', 'debit'], // Restricts to 'credit' or 'debit'
            message: '{VALUE} is not a valid transaction type.',
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
