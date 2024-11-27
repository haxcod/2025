const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema(
    {
        mobile: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[6-9]\d{9}$/.test(v), // Validates Indian mobile numbers
                message: (props) => `${props.value} is not a valid mobile number.`,
            },
        },
        account: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^\d{9,18}$/.test(v), // Validates account numbers between 9-18 digits
                message: (props) => `${props.value} is not a valid account number.`,
            },
        },
        ifsc: {
            type: String,
            required: true,
            validate: {
                validator: (v) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v), // Validates IFSC codes
                message: (props) => `${props.value} is not a valid IFSC code.`,
            },
        },
        holder: {
            type: String,
            required: true,
            trim: true, // Removes extra spaces
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const bankModel = mongoose.model('Bank', bankSchema);

module.exports = bankModel;
